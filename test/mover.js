var test = require('tape'),
    Mover, obj;

test('load Mover.', function(t) {
  Mover = require('../src/mover');
  t.ok(Mover, 'object loaded');
  t.end();
});