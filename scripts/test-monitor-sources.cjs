const { test } = require('node:test');
const assert = require('node:assert/strict');
const { visibleText, inspect, report } = require('./monitor-sources.cjs');
const url = 'https://example.com/pricing';
const sources = new Map([[url, ['model-a', 'model-b']]]);
const now = '2026-10-18T00:00:00.000Z';
const page = { digest: 'new-digest', finalUrl: url, characters: 400 };
const old = { schemaVersion: 1, sources: { [url]: { digest: 'old-digest', finalUrl: url, characters: 400, observedAt: '2026-10-17T00:00:00.000Z', health: 'ok' } } };

test('first run creates a baseline, not a claimed policy change', async () => {
  const result = await inspect(sources, { sources: {} }, async () => page, now);
  assert.equal(result.results[0].status, 'baseline');
  assert.equal(result.needsReview, true);
  assert.equal(result.results.length, 1); // two catalog records share one request
  assert.match(report(result, now), /首次建立对照/);
});
test('unchanged page preserves baseline date and does not request review', async () => {
  const result = await inspect(sources, old, async () => ({ ...page, digest: 'old-digest' }), now);
  assert.equal(result.needsReview, false);
  assert.deepEqual(result.next, old);
});
test('changed page requests review without changing catalog records', async () => {
  const result = await inspect(sources, old, async () => page, now);
  assert.equal(result.results[0].status, 'changed');
  assert.equal(result.next.sources[url].digest, 'new-digest');
  assert.equal(old.sources[url].digest, 'old-digest');
  assert.match(report(result, now), /不修改网站中的模型/);
});
test('HTTP failure retains old fingerprint and reports inability to judge', async () => {
  const result = await inspect(sources, old, async () => { throw new Error('HTTP_403'); }, now);
  assert.equal(result.results[0].status, 'failed');
  assert.equal(result.next.sources[url].digest, 'old-digest');
  assert.equal(result.needsReview, true);
  assert.match(report(result, now), /无法判断/);
});
test('same acknowledged error does not request review every day', async () => {
  const baseline = structuredClone(old); baseline.sources[url].health = 'HTTP_403';
  const result = await inspect(sources, baseline, async () => { throw new Error('HTTP_403'); }, now);
  assert.equal(result.needsReview, false);
  assert.deepEqual(result.next, baseline);
});
test('recovery is reported even if the content is unchanged', async () => {
  const baseline = structuredClone(old); baseline.sources[url].health = 'TIMEOUT';
  const result = await inspect(sources, baseline, async () => ({ ...page, digest: 'old-digest' }), now);
  assert.equal(result.needsReview, true);
  assert.equal(result.results[0].recovered, true);
});
test('removed source requests review and is removed from candidate baseline', async () => {
  const result = await inspect(new Map(), old, async () => page, now);
  assert.equal(result.needsReview, true);
  assert.deepEqual(result.removed, [url]);
  assert.deepEqual(result.next.sources, {});
});
test('scripts, comments, and layout whitespace do not affect normalized text', () => {
  const a = visibleText('<p>Free &amp; paid</p><script>window.foo = 1</script>');
  const b = visibleText('<!-- updated --> <div>Free &amp; paid</div><script>window.foo = 2</script>');
  assert.equal(a, b);
});
