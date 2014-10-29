var Item = require('bitshadowmachine').Item,
    Utils = require('bitshadowmachine').Utils;

/**
 * Creates a new Point.
 *
 * Points are the most basic Flora item. They represent a fixed point in
 * 2D space and are just an extension of Burner Item with isStatic set to true.
 *
 * @constructor
 * @extends Item
 */
function Point() {
  Item.call(this);
}
Utils.extend(Point, Item);

/**
 * Initializes an instance of Point.
 *
 * @param {Object} [opt_options=] A map of initial properties.
 * @param {Array} [opt_options.color = 200, 200, 200] Color.
 * @param {Array} [opt_options.isStatic = true] Static.
 */
Point.prototype.init = function(world, opt_options) {
  Point._superClass.init.call(this, world, opt_options);

  var options = opt_options || {};

  this.name = options.type || 'Point';
  this.color = options.color || [200, 200, 200];
  this.isStatic = typeof options.isStatic === 'undefined' ? true : options.isStatic;
};

Point.prototype.step = function() {
	this.beforeStep.call(this);
	if (this.parent && !this.isStatic && !this.special) {
		this.location.x = this.parent.location.x;
		this.location.y = this.parent.location.y;
	}
};

module.exports = Point;