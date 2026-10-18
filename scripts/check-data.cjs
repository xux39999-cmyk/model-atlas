// Run locally with: node scripts/check-data.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../dist/models-data.js'), 'utf8'), sandbox, { timeout: 1000 });
const catalog = sandbox.window.MODEL_ATLAS_DATA;
const problems = [];
if (!catalog || catalog.schemaVersion !== 1 || !Array.isArray(catalog.records) || !catalog.records.length) {
  throw new Error('Catalog must have schemaVersion 1 and a nonempty records array.');
}
const keys = new Set();
const types = new Set(['free', 'trial', 'unknown']);
const uses = new Set(['编程', '写作', '翻译', '图片理解']);
for (const [index, record] of catalog.records.entries()) {
  const prefix = `Record ${index + 1} (${record?.key || 'missing key'})`;
  if (!record || typeof record !== 'object') { problems.push(`${prefix}: invalid record`); continue; }
  for (const field of ['key', 'name', 'provider', 'quota', 'note', 'limits', 'expiry', 'data', 'conditions', 'source', 'checkedAt']) {
    if (typeof record[field] !== 'string' || !record[field].trim()) problems.push(`${prefix}: missing ${field}`);
  }
  if (keys.has(record.key)) problems.push(`${prefix}: duplicate key`);
  keys.add(record.key);
  if (!/^[a-z0-9-]+$/.test(record.key)) problems.push(`${prefix}: unsafe key`);
  if (!types.has(record.type)) problems.push(`${prefix}: invalid free-policy status`);
  if (record.id !== null && (typeof record.id !== 'string' || !record.id.trim())) problems.push(`${prefix}: invalid model ID`);
  if (!Array.isArray(record.uses) || !record.uses.length || record.uses.some(use => !uses.has(use))) problems.push(`${prefix}: invalid use tags`);
  const date = new Date(record.checkedAt + 'T00:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.checkedAt) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== record.checkedAt) problems.push(`${prefix}: invalid check date`);
  try {
    const url = new URL(record.source);
    if (url.protocol !== 'https:' || url.username || url.password || /[<>"']/.test(record.source)) throw new Error();
  } catch { problems.push(`${prefix}: invalid public HTTPS source`); }
}
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${catalog.records.length} records have unique keys, valid fields, source URLs, status tags, and individual check dates. Policy accuracy still requires human verification.`);
