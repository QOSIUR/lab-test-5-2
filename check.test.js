const test = require('node:test');
const assert = require('node:assert');
const { resolveBirthDate } = require('./check.js');
const { TODAY, cases } = require('./cases.js');

for (const c of cases) {
  const shown = c.input.length > 30 ? `${c.input.slice(0, 30)}…` : c.input;
  test(`${c.cls} ${c.kind}: "${shown}" — ${c.note}`, () => {
    assert.deepStrictEqual(resolveBirthDate(c.input, TODAY), c.expected);
  });
}
