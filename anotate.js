var Draw = Class.extend({
    init: function() {
	this.createCanvas();
	this.hideCanvas();

	this.buttonDepressed = false;
	this.lastX = 0;
	this.lastY = 0;

	this.mouseDown();
	this.mouseUp();
	this.mouseMove();
	this.keyDown();
    },

    createCanvas: function() {
	var width = $(document).width();
	var height = $(document).height();
	$('body').append('<canvas id="drawCanvas" width="' + width + '" height="' + height + '"></canvas>');
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
	$('#drawCanvas').on('mousedown', function(e) {
	    this.buttonDepressed = true;
	    this.lastX = e.pageX;
	    this.lastY = e.pageY;
	});
    },

    mouseUp: function() {
	$('#drawCanvas').on('mouseup', function() {
	    this.buttonDepressed = false;
	});
    },

    mouseMove: function() {
	$('#drawCanvas').on('mousemove', function(e) {
	    if (!this.buttonDepressed)
		return;

	    var context = $("#drawCanvas")[0].getContext("2d");
	    context.moveTo(this.lastX, this.lastY);
	    context.lineTo(e.pageX, e.pageY);
	    context.strokeStyle = "#e00";
	    context.stroke();

	    this.lastX = e.pageX;
	    this.lastY = e.pageY;
	});
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
