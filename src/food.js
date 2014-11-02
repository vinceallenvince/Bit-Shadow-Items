var Item = require('bitshadowmachine').Item,
    Utils = require('bitshadowmachine').Utils,
    Vector = require('bitshadowmachine').Vector;

/**
 * Creates a new Food.
 *
 * Foods are the most basic Flora item. They represent a fixed point in
 * 2D space and are just an extension of Burner Item with isStatic set to true.
 *
 * @constructor
 * @extends Item
 */
function Food() {
  Item.call(this);
}
Utils.extend(Food, Item);

/**
 * Initializes an instance of Food.
 *
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {Array} [opt_options.color = 200, 200, 200] Color.
 */
Food.prototype.init = function(world, opt_options) {
  Food._superClass.init.call(this, world, opt_options);

  var options = opt_options || {};

  this.name = options.type || 'Food';
  this.color = options.color || [200, 200, 200];
  this.offsetDistance = typeof options.offsetDistance === 'undefined' ? -10 : options.offsetDistance;
  this.offsetAngle = options.offsetAngle || 0;
  this.beforeStep = options.beforeStep || function() {};

	this.offsetVector = new Vector();
};

Food.prototype.step = function() {

	this.beforeStep.call(this);

	if (this.parent) {
		if (this.offsetDistance) {
			var r = this.offsetDistance; // use angle to calculate x, y
	    var theta = Utils.degreesToRadians(this.parent.angle + this.offsetAngle);
	    var x = r * Math.cos(theta);
	    var y = r * Math.sin(theta);

	    this.location.x = this.parent.location.x;
	    this.location.y = this.parent.location.y;
	    this.offsetVector.x = x;
	    this.offsetVector.y = y;
	    this.location.add(this.offsetVector); // position the child
  	} else {
	  	this.location.x = this.parent.location.x;
			this.location.y = this.parent.location.y;
		}
	}
};

module.exports = Food;