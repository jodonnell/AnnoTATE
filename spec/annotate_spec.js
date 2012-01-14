describe("Annotate", function() {
  var annotate;

  beforeEach(function() {
    annotate = new Annotate();
  });

  it("should be able to load some points", function() {
      localStorage.setItem('history', '1');
      annotate.clearCanvas()
      expect(localStorage.getItem('history')).toEqual(null);
  });
});
