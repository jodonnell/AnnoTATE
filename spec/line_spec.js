describe("Line", function() {
  var line;

  beforeEach(function() {
    line = new Line();
  });

  it("should be able to load some points", function() {
      var points = [new Point(1, 1)];
      line.load(points);
      expect(line.points).toEqual(points);
  });

  it("should be able to add points", function() {
      var point = new Point(1, 1);
      line.addPoint(point);
      expect(line.points).toEqual([point]);
  });

  it("should be able to explode points", function() {
      var points = [new Point(1, 1), new Point(5, 3)];
      line.load(points);

      expect(line.explodePoints()).toEqual([[1, 1], [5, 3]]);
  });
});
