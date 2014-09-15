var Item = require('bitshadowmachine').Item,
    System = require('bitshadowmachine').System,
    Utils = require('bitshadowmachine').Utils,
    Vector = require('bitshadowmachine').Vector;

/**
 * Creates a new Mover.
 *
 * Movers are the root object for any item that moves. They are not
 * aware of other Movers or stimuli. They have no means of locomotion
 * and change only due to external forces. You will never directly
 * implement Mover.
 *
 * @constructor
 * @extends Item
 */
function Mover() {
  Item.call(this);
}
Utils.extend(Mover, Item);

/**
 * Initializes an instance of Mover.
 * @param  {Object} world An instance of World.
 * @param  {Object} opt_options A map of initial properties.
 * @param {string|Array} [opt_options.color = 255, 255, 255] Color.
 * @param {number} [opt_options.borderRadius = 100] Border radius.
 * @param {number} [opt_options.borderWidth = 2] Border width.
 * @param {string} [opt_options.borderStyle = 'solid'] Border style.
 * @param {Array} [opt_options.borderColor = 60, 60, 60] Border color.
 * @param {boolean} [opt_options.pointToDirection = true] If true, object will point in the direction it's moving.
 * @param {Object} [opt_options.parent = null] A parent object. If set, object will be fixed to the parent relative to an offset distance.
 * @param {boolean} [opt_options.pointToParentDirection = true] If true, object points in the direction of the parent's velocity.
 * @param {number} [opt_options.offsetDistance = 30] The distance from the center of the object's parent.
 * @param {number} [opt_options.offsetAngle = 0] The rotation around the center of the object's parent.
 * @param {function} [opt_options.afterStep = null] A function to run after the step() function.
 * @param {function} [opt_options.isStatic = false] Set to true to prevent object from moving.
 * @param {Object} [opt_options.parent = null] Attach to another Flora object.
 */
Mover.prototype.init = function(world, opt_options) {
  Mover._superClass.init.call(this, world, opt_options);

  var options = opt_options || {};

  this.color = options.color || [255, 255, 255];
  this.borderRadius = options.borderRadius || 0;
  this.borderWidth = options.borderWidth || 0;
  this.borderStyle = options.borderStyle || 'none';
  this.borderColor = options.borderColor || [0, 0, 0];
  this.pointToDirection = typeof options.pointToDirection === 'undefined' ? true : options.pointToDirection;
  this.parent = options.parent || null;
  this.pointToParentDirection = typeof options.pointToParentDirection === 'undefined' ? true : options.pointToParentDirection;
  this.offsetDistance = typeof options.offsetDistance === 'undefined' ? 0 : options.offsetDistance;
  this.offsetAngle = options.offsetAngle || 0;
  this.isStatic = !!options.isStatic;

  this._friction = new Vector();
};

Mover.prototype.step = function() {

  var i, max, x = this.location.x,
      y = this.location.y;

  this.beforeStep.call(this);

  if (this.isStatic) {
    return;
  }

  // start apply forces

  if (this.world.c) { // friction
    this._friction.x = this.velocity.x;
    this._friction.y = this.velocity.y;
    this._friction.mult(-1);
    this._friction.normalize();
    this._friction.mult(this.world.c);
    this.applyForce(this._friction);
  }
  this.applyForce(this.world.gravity); // gravity

  // attractors
  var attractors = System.getAllItemsByName('Attractor');
  for (i = 0, max = attractors.length; i < max; i += 1) {
    if (this.id !== attractors[i].id) {
      this.applyForce(attractors[i].attract(this));
    }
  }

  // repellers
  var repellers = System.getAllItemsByName('Repeller');
  for (i = 0, max = repellers.length; i < max; i += 1) {
    if (this.id !== repellers[i].id) {
      this.applyForce(repellers[i].attract(this));
    }
  }

  // draggers
  var draggers = System.getAllItemsByName('Dragger');
  for (i = 0, max = draggers.length; i < max; i += 1) {
    if (this.id !== draggers[i].id && Utils.isInside(this, draggers[i])) {
      this.applyForce(draggers[i].drag(this));
    }
  }

  if (this.applyAdditionalForces) {
    this.applyAdditionalForces.call(this);
  }

  this.velocity.add(this.acceleration); // add acceleration

  this.velocity.limit(this.maxSpeed, this.minSpeed);

  this.location.add(this.velocity); // add velocity

  if (this.pointToDirection) { // object rotates toward direction
    if (this.velocity.mag() > 0.1) {
      this.angle = Utils.radiansToDegrees(Math.atan2(this.velocity.y, this.velocity.x));
    }
  }

  if (this.wrapWorldEdges) {
    this._wrapWorldEdges();
  } else if (this.checkWorldEdges) {
    this._checkWorldEdges();
  }

  if (this.controlCamera) {
    this._checkCameraEdges(x, y, this.location.x, this.location.y);
  }

  if (this.parent) { // parenting

    if (this.offsetDistance) {

      r = this.offsetDistance; // use angle to calculate x, y
      theta = Utils.degreesToRadians(this.parent.angle + this.offsetAngle);
      x = r * Math.cos(theta);
      y = r * Math.sin(theta);

      this.location.x = this.parent.location.x;
      this.location.y = this.parent.location.y;
      this.location.add(new Vector(x, y)); // position the child

      if (this.pointToParentDirection) {
        this.angle = Utils.radiansToDegrees(Math.atan2(this.parent.velocity.y, this.parent.velocity.x));
      }

    } else {
      this.location.x = this.parent.location.x;
      this.location.y = this.parent.location.y;
    }
  }

  this.acceleration.mult(0);

  if (this.life < this.lifespan) {
    this.life += 1;
  } else if (this.lifespan !== -1) {
    System.remove(this);
    return;
  }

  this.afterStep.call(this);
};

module.exports = Mover;
