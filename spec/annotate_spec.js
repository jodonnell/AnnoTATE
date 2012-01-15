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
	var endPoint = new Point(3, 3);
	annotate.startDrawing(startPoint);
	annotate.drawing(endPoint);
	annotate.stopDrawing();

	expect(annotate.getStorage()).toEqual([[startPoint.toArray(), endPoint.toArray()]]);
    });
    
    
});
