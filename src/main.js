var Utils = require('bitshadowmachine').Utils;

var BitShadowItems = {
  Agent: require('./agent'),
  Food: require('./food'),
  Mover: require('./mover'),
  Oscillator: require('./oscillator'),
  Particle: require('./particle'),
  Point: require('./point'),
  Sensor: require('./sensor'),
  Stimulus: require('./stimulus'),
  Walker: require('./walker'),
  configure: function(System) {
  	var sys = require('bitshadowmachine').System;

  	for (i in System) {
  		if (System.hasOwnProperty(i)) {
  			sys[i] = System[i];
  		}
  	}

  }
};

// TODO: add...

//Attractor: require('./attractor'),
//Connector: require('./connector'),
//Dragger: require('./dragger'),
//FlowField: require('./flowfield'),
//ParticleSystem: require('./particlesystem'),
//Repeller: require('./repeller'),


module.exports = BitShadowItems;
