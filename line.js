var Line = Class.extend({
    init: function(point) {
	this.points = [];
	if (point)
	    this.addPoint(point);
    },

    load: function(points) {
	this.points = points;
    },

    addPoint: function(point) {
	this.points.push(point);
    },

    explodePoints: function() {
	var points = [];
	for (var i = 0; i < this.points.length; i++) {
	    points.push([this.points[i].x, this.points[i].y]);
	}
	return points;
    }
});
