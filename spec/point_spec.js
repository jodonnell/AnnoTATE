describe("Point", function() {
    var point;

    beforeEach(function() {
	point = new Point(5, 10);
    });

    it("should have an x and a y", function() {
	expect(point.x).toEqual(5);
	expect(point.y).toEqual(10);
    });

    it("should have be able to turn into an array", function() {
	expect(point.toArray()).toEqual([5, 10]);
    });
});
