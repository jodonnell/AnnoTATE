var width = $(document).width();
var height = $(document).height();
$('body').append('<canvas id="drawCanvas" width="' + width + '" height="' + height + '"></canvas>');
$("#drawCanvas").css('position', 'absolute');
$("#drawCanvas").css('top', '0px');
$("#drawCanvas").css('left', '0px');
$("#drawCanvas").css('z-index', '1000000000');
//$("#drawCanvas").css('pointer-events', 'none');

$('#drawCanvas').on('mousedown', function() {
    var context = $("#drawCanvas")[0].getContext("2d");
    context.moveTo(0, 0);
    context.lineTo(100, 100);
    context.strokeStyle = "#e00";
    context.stroke();
})
