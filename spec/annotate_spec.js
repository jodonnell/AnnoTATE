describe("Annotate", function() {
    var annotate;

    var drawPoints = function(startPoint, points) {
	annotate.startDrawing(startPoint);
	for (var i = 0; i < points.length; i++)
	    annotate.drawing(points[i]);
	annotate.stopDrawing();
    };

    beforeEach(function() {
	annotate = new Annotate();
    });

    afterEach(function() {
	annotate.clearCanvas();
    });

    it("should be able to clear the history", function() {
	localStorage.setItem('history', '1');
	annotate.clearCanvas()
	expect(localStorage.getItem('history')).toEqual(null);
    });

    it("should be able to draw", function() {
	var startPoint = new Point(1, 1);
	var midPoint = new Point(3, 3);
	var endPoint = new Point(5, 4);
	drawPoints(startPoint, [midPoint, endPoint]);

	var lines = [[startPoint.toArray(), midPoint.toArray(), endPoint.toArray()]];
	expect(annotate.getStorage()).toEqual(lines);
	expect(annotate.history).toEqual(lines);
    });

    it("should be able to draw multiple lines", function() {
	var startPoint = new Point(1, 1);
	var midPoint = new Point(3, 3);
	var endPoint = new Point(5, 4);

	drawPoints(startPoint, [midPoint, endPoint]);

	var startPoint2 = new Point(3, 3);
	var endPoint2 = new Point(4, 4);

	drawPoints(startPoint2, [endPoint2]);

	var lines = [[startPoint.toArray(), midPoint.toArray(), endPoint.toArray()],
		   [startPoint2.toArray(), endPoint2.toArray()]];

	expect(annotate.getStorage()).toEqual(lines);
	expect(annotate.history).toEqual(lines);
    });
});
