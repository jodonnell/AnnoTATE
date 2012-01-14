var Draw = Class.extend({
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

    startDraw: function(startPoint) {
	this.buttonDepressed = true;

	this.lastPoint = startPoint;

	this.line = new Line();
	this.line.addPoint(startPoint);
    },

    stopDraw: function() {
	this.buttonDepressed = false;
	this.save();
    },

    drawing: function(point) {
	if (!this.buttonDepressed)
	    return;

	this.drawLine(point);
	this.line.addPoint(point);

	this.lastPoint = point;
    },

    drawLine: function(point) {
	var context = $("#drawCanvas")[0].getContext("2d");
	context.moveTo(this.lastPoint.x, this.lastPoint.y);
	context.lineTo(point.x, point.y);
	context.strokeStyle = "#e00";
	context.stroke();
    },

    save: function() {
	this.history.push(this.line.explodePoints());
	localStorage.setItem('history', JSON.stringify(this.history));
    },

    load: function() {
	this.history = JSON.parse(localStorage.getItem('history')) || [];
	// for (var i = 0; i < this.history.length; i++) {
	//     var x = this.history[i][0];
	//     var y = this.history[i][1];

	//     if (i > 0) {
	// 	this.lastX = this.history[i - 1][0];
	// 	this.lastY = this.history[i - 1][1];
	//     }
	//     else {
	// 	this.lastX = x;
	// 	this.lastY = y;
	//     }

	//     if (!(this.lastX == -1 || x == -1))
	// 	this.drawLine(x, y);
	// }
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
	    me.startDraw(new Point(e.pageX, e.pageY));
	});
    },

    mouseUp: function() {
	var me = this;
	$('#drawCanvas').on('mouseup', function() {
	    me.stopDraw();
	});
    },

    mouseMove: function() {
	var me = this;
	$('#drawCanvas').on('mousemove', function(e) {
	    me.drawing(new Point(e.pageX, e.pageY));
	});
    }
});
var a = new Draw();
