var test = require('tape'),
    Walker, obj;

test('load Walker.', function(t) {
  Walker = require('../src/walker');
  t.ok(Walker, 'object loaded');
  t.end();
});