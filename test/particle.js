var test = require('tape'),
    Particle, obj;

test('load Particle.', function(t) {
  Particle = require('../src/particle');
  t.ok(Particle, 'object loaded');
  t.end();
});