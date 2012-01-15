describe("Annotate", function() {
    var annotate;

    beforeEach(function() {
	annotate = new Annotate();
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
	annotate.startDrawing(startPoint);
	annotate.drawing(midPoint);
	annotate.drawing(endPoint);
	annotate.stopDrawing();

	var lines = [[startPoint.toArray(), midPoint.toArray(), endPoint.toArray()]];

	expect(annotate.getStorage()).toEqual(lines);
	expect(annotate.history).toEqual(lines);
    });

    it("should be able to draw multiple lines", function() {
	var startPoint = new Point(1, 1);
	var midPoint = new Point(3, 3);
	var endPoint = new Point(5, 4);

	annotate.startDrawing(startPoint);
	annotate.drawing(midPoint);
	annotate.drawing(endPoint);
	annotate.stopDrawing();

	var startPoint2 = new Point(3, 3);
	var endPoint2 = new Point(4, 4);

	annotate.startDrawing(startPoint2);
	annotate.drawing(endPoint2);
	annotate.stopDrawing();

	var lines = [[startPoint.toArray(), midPoint.toArray(), endPoint.toArray()],
		   [startPoint2.toArray(), endPoint2.toArray()]];

	expect(annotate.getStorage()).toEqual(lines);
	expect(annotate.history).toEqual(lines);
    });

});
