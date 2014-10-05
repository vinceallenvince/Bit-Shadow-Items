var test = require('tape'),
    Agent, obj;

test('load Agent.', function(t) {
  Agent = require('../src/agent');
  t.ok(Agent, 'object loaded');
  t.end();
});