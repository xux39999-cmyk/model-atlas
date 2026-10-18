const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');

const root = path.join(__dirname, '..');
const directory = path.join(root, 'monitoring');
const hash = text => createHash('sha256').update(text).digest('hex');
const readJson = (file, fallback) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback;

// Only compare normalized text. A difference is NOT evidence of a policy change.
function visibleText(html) {
  return html.replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, number) => {
      const code = number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : ' ';
    }).replace(/&(nbsp|amp|lt|gt|quot|apos);/gi, (_, name) => ({nbsp:' ',amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"})[name.toLowerCase()])
    .replace(/\s+/g, ' ').trim();
}

async function download(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'ModelAtlas-SourceMonitor/1.0', Accept: 'text/html, text/plain;q=0.9' }
    });
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    const contentType = response.headers.get('content-type') || '';
    if (!/text\/(html|plain)|application\/xhtml\+xml/i.test(contentType)) throw new Error('UNSUPPORTED_CONTENT');
    let bytes = 0; const chunks = [];
    for await (const chunk of response.body) {
      bytes += chunk.length;
      if (bytes > 2 * 1024 * 1024) { controller.abort(); throw new Error('PAGE_TOO_LARGE'); }
      chunks.push(chunk);
    }
    const text = visibleText(Buffer.concat(chunks).toString('utf8'));
    if (text.length < 250) throw new Error('TOO_LITTLE_TEXT');
    if (/just a moment|verify you are human|checking your browser|access denied|captcha/i.test(text.slice(0, 1500))) throw new Error('ACCESS_CHALLENGE');
    return { digest: hash(text), finalUrl: response.url, characters: text.length };
  } finally { clearTimeout(timer); }
}

function collectSources() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'dist/models-data.js'), 'utf8'), sandbox, { timeout: 1000 });
  const sources = new Map();
  for (const record of sandbox.window.MODEL_ATLAS_DATA.records) {
    const url = new URL(record.source);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Only public HTTPS source URLs are supported.');
    if (!sources.has(record.source)) sources.set(record.source, []);
    sources.get(record.source).push(record.key);
  }
  return sources;
}

async function inspect(sources, previous, fetchPage, now) {
  const next = { schemaVersion: 1, sources: {} }; const results = [];
  // Sequential requests keep the daily check small and gentle to source websites.
  for (const [url, records] of sources) {
    const old = previous.sources?.[url];
    try {
      const page = await fetchPage(url);
      const status = !old?.digest ? 'baseline' : old.digest === page.digest ? 'unchanged' : 'changed';
      next.sources[url] = {
        digest: page.digest, finalUrl: page.finalUrl, characters: page.characters,
        observedAt: status === 'unchanged' ? old.observedAt : now,
        health: 'ok'
      };
      results.push({ url, records, status, recovered: old?.health && old.health !== 'ok' });
    } catch (error) {
      const code = error.name === 'AbortError' ? 'TIMEOUT' : /^HTTP_\d+$|^TOO_LITTLE_TEXT$|^ACCESS_CHALLENGE$|^PAGE_TOO_LARGE$|^UNSUPPORTED_CONTENT$/.test(error.message) ? error.message : 'NETWORK_ERROR';
      next.sources[url] = { ...(old || {}), health: code };
      results.push({ url, records, status: 'failed', error: code, newFailure: old?.health !== code });
    }
  }
  const removed = Object.keys(previous.sources || {}).filter(url => !sources.has(url));
  const needsReview = removed.length > 0 || results.some(r => ['baseline', 'changed'].includes(r.status) || r.recovered || r.newFailure);
  return { next, results, removed, needsReview };
}

function report(run, now) {
  const names = { baseline: '首次建立对照', changed: '页面文本有变化，待核实', unchanged: '页面文本未变化', failed: '检查失败，无法判断' };
  const lines = [ '# 官方来源检查报告', '', `检查时间（UTC）：${now}`, '',
    '**这不是政策核查结论。页面变化可能来自导航、日期或改版；页面未变化也不保证模型政策正确。**', '',
    '本次不修改网站中的模型、免费额度、状态或 checkedAt。首次运行只建立网页指纹，不能回溯过去的变化。动态网页可能无法完整读取，失败时保留旧指纹，不将失败当成政策未变化。', '',
    ...run.results.flatMap(r => [`## ${names[r.status]}${r.recovered ? '（访问已恢复）' : ''}`, `- 来源：${r.url}`, `- 关联资料：${r.records.join('、')}`, ...(r.error ? [`- 原因：${r.error}`] : []), '']),
    ...run.removed.flatMap(url => ['## 已不在当前目录的来源', `- ${url}`, '']),
    '## 审核时做什么', '', '1. 优先打开“页面文本有变化”的官方链接，检查模型名称、额度、期限和地区等条款。',
    '2. 需要改政策时，另行修改 dist/models-data.js，填写证据，重新核查后才更新那条 checkedAt。',
    '3. 合并这份报告只表示接受新的网页对照指纹；不会自动更新模型政策。失败项在访问恢复前仍不能判断。',
    '4. 无变化时不产生新的审核申请；相同失败在首次提醒后保留在每次运行摘要中。', '' ];
  return lines.join('\n');
}

async function main() {
  const now = new Date().toISOString();
  const previous = readJson(path.join(directory, 'baseline.json'), { schemaVersion: 1, sources: {} });
  if (previous.schemaVersion !== 1 || !previous.sources) throw new Error('Invalid source-monitor baseline.');
  const run = await inspect(collectSources(), previous, download, now);
  const markdown = report(run, now);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'latest-report.md'), markdown);
  // This candidate baseline is only published through a review branch, never pushed directly to main.
  if (run.needsReview) fs.writeFileSync(path.join(directory, 'baseline.json'), JSON.stringify(run.next, null, 2) + '\n');
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `needs_review=${run.needsReview}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
  console.log(JSON.stringify({ sources: run.results.length, changed: run.results.filter(r=>r.status==='changed').length, failed: run.results.filter(r=>r.status==='failed').length, needsReview: run.needsReview }));
}

module.exports = { visibleText, inspect, report, download, collectSources };
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
