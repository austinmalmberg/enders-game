class Geometry {

  static findIntersect(p1, p2, p3, p4) {
    let denominator = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);

    // lines are parallel
    if (denominator == 0)
      return null;

    let t = ( (p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x) ) / denominator;

    if (0 <= t && t <= 1) {

      return {
        x: p1.x + ( t * (p2.x - p1.x) ),
        y: p1.y + ( t * (p2.y - p1.y) )
      };
    }

    return null;
  }
}
