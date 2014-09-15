var test = require('tape'),
    Oscillator, obj;

test('load Oscillator.', function(t) {
  Oscillator = require('../src/oscillator');
  t.ok(Oscillator, 'object loaded');
  t.end();
});