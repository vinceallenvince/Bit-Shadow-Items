var Utils = require('bitshadowmachine').Utils;

var BitShadowItems = {
  Agent: require('./agent'),
  Mover: require('./mover'),
  Oscillator: require('./oscillator'),
  Particle: require('./particle'),
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
//Agent: require('./agent'),
//Attractor: require('./attractor'),
//Connector: require('./connector'),
//Dragger: require('./dragger'),
//FlowField: require('./flowfield'),
//ParticleSystem: require('./particlesystem'),
//Point: require('./point'),
//RangeDisplay: require('./rangedisplay'),
//Repeller: require('./repeller'),
//Sensor: require('./sensor'),
//Stimulus: require('./stimulus'),
//Walker: require('./walker')

module.exports = BitShadowItems;
