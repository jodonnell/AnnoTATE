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

    
    
});
