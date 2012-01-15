var Point = Class.extend({
    init: function(x, y) {
	this.x = x;
	this.y = y;
    },

    toArray: function() {
	return [this.x, this.y];
    }
});
