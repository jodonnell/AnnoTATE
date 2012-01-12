var width = $(document).width();
var height = $(document).height();
$('body').append('<canvas id="drawCanvas" width="' + width + '" height="' + height + '"></canvas>');
$("#drawCanvas").css('position', 'absolute');
$("#drawCanvas").css('top', '0px');
$("#drawCanvas").css('left', '0px');
$("#drawCanvas").css('z-index', '1000000000');
//$("#drawCanvas").css('pointer-events', 'none');


var buttonDepressed = false;
var lastX = 0;
var lastY = 0;

$('#drawCanvas').on('mousedown', function(e) {
    buttonDepressed = true;
    lastX = e.pageX;
    lastY = e.pageY;
});

$('#drawCanvas').on('mouseup', function() {
    buttonDepressed = false;
});

$('#drawCanvas').on('mousemove', function(e) {
    if (!buttonDepressed)
	return;

    var context = $("#drawCanvas")[0].getContext("2d");
    context.moveTo(lastX, lastY);
    context.lineTo(e.pageX, e.pageY);
    context.strokeStyle = "#e00";
    context.stroke();

    lastX = e.pageX;
    lastY = e.pageY;
});
