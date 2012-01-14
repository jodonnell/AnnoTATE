describe("Point", function() {
  var point;

  beforeEach(function() {
    point = new Point(5, 10);
  });

  it("should have an x and a y", function() {
      point = new Point(5, 10);
      expect(point.x).toEqual(5);
      expect(point.y).toEqual(10);
  });

});
