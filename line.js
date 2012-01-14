var Line = Class.extend({
    init: function() {
	this.points = [];
    },

    load: function(points) {
	this.points = points;
    },

    addPoint: function(point) {
	this.points.push(point);
    },

    explodePoints: function() {
	var points = [];
	for (var x = 0; x < this.points.length; x++) {
	    points.push([this.points[x].x, this.points[x].y]);
	}
	return points;
    }
});
