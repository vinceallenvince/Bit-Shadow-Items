var Item = require('bitshadowmachine').Item,
    Mover = require('./mover'),
    Utils = require('bitshadowmachine').Utils,
    Vector = require('bitshadowmachine').Vector;

/**
 * Creates a new Particle object.
 *
 * @constructor
 * @extends Mover
 */
function Particle(opt_options) {
  Mover.call(this);
}
Utils.extend(Particle, Mover);

/**
 * Initializes Particle.
 * @param  {Object} world An instance of World.
 * @param  {Object} [opt_options=] A map of initial properties.
 * @param {Array} [opt_options.color = [200, 200, 200]] Color.
 * @param {number} [opt_options.lifespan = 50] The max life of the object. Set to -1 for infinite life.
 * @param {number} [opt_options.life = 0] The current life value. If greater than this.lifespan, object is destroyed.
 * @param {boolean} {opt_options.fade = true} If true, opacity decreases proportionally with life.
 * @param {boolean} {opt_options.shrink = true} If true, width and height decrease proportionally with life.
 * @param {boolean} [opt_options.checkWorldEdges = false] Set to true to check the object's location against the world's bounds.
 * @param {number} [opt_options.maxSpeed = 4] Maximum speed.
 * @param {number} [opt_options.zIndex = 1] The object's zIndex.
 */
Particle.prototype.init = function(world, opt_options) {
  Particle._superClass.init.call(this, world, opt_options);

  var options = opt_options || {};

  this.color = options.color || [200, 200, 200];
  this.lifespan = typeof options.lifespan === 'undefined' ? 50 : options.lifespan;
  this.life = options.life || 0;
  this.fade = typeof options.fade === 'undefined' ? true : options.fade;
  this.shrink = typeof options.shrink === 'undefined' ? true : options.shrink;
  this.checkWorldEdges = !!options.checkWorldEdges;
  this.maxSpeed = typeof options.maxSpeed === 'undefined' ? 4 : options.maxSpeed;
  this.zIndex = typeof options.zIndex === 'undefined' ? 1 : options.zIndex;

  if (!options.acceleration) {
    this.acceleration = new Vector(1, 1);
    this.acceleration.normalize();
    this.acceleration.mult(this.maxSpeed ? this.maxSpeed : 3);
    this.acceleration.rotate(Utils.getRandomNumber(0, Math.PI * 2, true));
  }
  if (!options.velocity) {
    this.velocity = new Vector();
  }
  this.initScale = this.scale;
};

/**
 * Applies additional forces.
 */
Particle.prototype.afterStep = function() {
  if (this.fade) {
    this.opacity = Utils.map(this.life, 0, this.lifespan, 1, 0);
  }
  if (this.shrink) {
    this.scale = Utils.map(this.life, 0, this.lifespan, this.initScale, 0);
  }
};

module.exports = Particle;
