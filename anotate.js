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

    mouseDown: function() {
	var me = this;
	$('#drawCanvas').on('mousedown', function(e) {
	    me.buttonDepressed = true;
	    me.lastX = e.pageX;
	    me.lastY = e.pageY;
	    this.save(e.pageX, e.pageY);
	});
    },

    mouseUp: function() {
	var me = this;
	$('#drawCanvas').on('mouseup', function() {
	    me.buttonDepressed = false;
	});
    },

    mouseMove: function() {
	var me = this;
	$('#drawCanvas').on('mousemove', function(e) {
	    if (!me.buttonDepressed)
		return;

	    me.drawLine(e.pageX, e.pageY);
	    me.save(e.pageX, e.pageY);

	    me.lastX = e.pageX;
	    me.lastY = e.pageY;
	});
    },

    drawLine: function(x, y) {
	var context = $("#drawCanvas")[0].getContext("2d");
	context.moveTo(this.lastX, this.lastY);
	context.lineTo(x, y);
	context.strokeStyle = "#e00";
	context.stroke();
    },

    save: function(x, y) {
	this.history.push([x, y]);
	localStorage.setItem('history', JSON.stringify(this.history));
    },

    load: function() {
	this.history = JSON.parse(localStorage.getItem('history')) || [];
	for (var i = 0; i < this.history.length; i++) {
	    var x = this.history[i][0];
	    var y = this.history[i][1];

	    if (i > 0) {
		this.lastX = this.history[i - 1][0];
		this.lastY = this.history[i - 1][1];
	    }
	    else {
		this.lastX = x;
		this.lastY = y;
	    }
	    this.drawLine(x, y);
	}
    },

    keyDown: function() {
	var me = this;
	$('body').on('keydown', function(e) {
            code = (e.keyCode ? e.keyCode : e.which);
	    if (code === 65 && e.altKey) { // alt-a
		me.toggleCanvas();
	    }
	});
    }
});
var a = new Draw();
