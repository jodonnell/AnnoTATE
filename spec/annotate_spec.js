describe("Annotate", function() {
  var annotate;

  beforeEach(function() {
    annotate = new Annotate();
  });

  it("should be able to load some points", function() {
      var points = [new Point(1, 1)];
      line.load(points);
      expect(line.points).toEqual(points);
  });
});
