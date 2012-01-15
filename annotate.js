var Annotate = Class.extend({
    init: function() {
	this.buttonDepressed = false;
	this.lastX = 0;
	this.lastY = 0;

	this.createCanvas();
	this.load();
	this.hideCanvas();

	this.mouseDown();
	this.mouseUp();
	this.mouseMove();
	this.keyDown();
    },

    createCanvas: function() {
	var width = $(document).width();
	var height = $(document).height();

	var canvas = '<canvas id="drawCanvas" width="' + width + '" height="' + height + '"></canvas>';
	$('body').append(canvas);
	$("#drawCanvas").css('position', 'absolute');
	$("#drawCanvas").css('top', '0px');
	$("#drawCanvas").css('left', '0px');
	$("#drawCanvas").css('z-index', '1000000000');
    },

    hideCanvas: function() {
	$("#drawCanvas").css('pointer-events', 'none');
	this.hidden = true;
    },

    showCanvas: function() {
	$("#drawCanvas").css('pointer-events', 'auto');
	this.hidden = false;
    },

    toggleCanvas: function() {
	if (this.hidden)
	    this.showCanvas();
	else
	    this.hideCanvas();
    },

    startDrawing: function(startPoint) {
	this.lastPoint = startPoint;
	this.line = new Line(startPoint);
    },

    stopDrawing: function() {
	this.save();
    },

    drawing: function(point) {
	this.drawLine(point);
	this.line.addPoint(point);

	this.lastPoint = point;
    },

    drawLine: function(point) {
	var context = this.getContext();
	context.moveTo(this.lastPoint.x, this.lastPoint.y);
	context.lineTo(point.x, point.y);
	context.strokeStyle = "#e00";
	context.stroke();
    },

    getContext: function() {
	return $("#drawCanvas")[0].getContext("2d");
    },

    save: function() {
	this.history.push(this.line.explodePoints());
	localStorage.setItem('history', JSON.stringify(this.history));
    },

    load: function() {
	this.history = this.getStorage();

	var context = this.getContext();
	for (var i = 0; i < this.history.length; i++) {
	    var line = this.history[i];
	    for (var j = 0; j < line.length; j++) {
		var point = new Point(line[j][0], line[j][1]);

		if (j == 0) {
		    context.moveTo(point.x, point.y);
		}
		else {
		    context.lineTo(point.x, point.y);
		}
		context.strokeStyle = "#e00";
		context.stroke();
	    }
	}
    },

    getStorage: function() {
	return JSON.parse(localStorage.getItem('history')) || [];
    },

    keyDown: function() {
	var me = this;
	$('body').on('keydown', function(e) {
            code = (e.keyCode ? e.keyCode : e.which);
	    if (code === 65 && e.altKey) { // alt-a
		me.toggleCanvas();
	    }
	    if (code === 67 && e.altKey) { // alt-c
		me.clearCanvas();
	    }

	});
    },

    clearCanvas: function() {
	localStorage.removeItem('history');
    },

    mouseDown: function() {
	var me = this;
	$('#drawCanvas').on('mousedown', function(e) {
	    me.buttonDepressed = true;
	    me.startDrawing(new Point(e.pageX, e.pageY));
	});
    },

    mouseUp: function() {
	var me = this;
	$('#drawCanvas').on('mouseup', function() {
	    me.buttonDepressed = false;
	    me.stopDrawing();
	});
    },

    mouseMove: function() {
	var me = this;
	$('#drawCanvas').on('mousemove', function(e) {
	    if (!me.buttonDepressed)
		return;
	    me.drawing(new Point(e.pageX, e.pageY));
	});
    }
});
var a = new Annotate();
