class RayMarch {
  /**
   * Calculates the distance from v1 to a circle at v2 with radius r
   *
   * If the point is inside the circle, this will return a negative number
  */
  static signedDistToCircle(p, circlePos, r) {
    return circlePos.dist(p) - r;
  }

  /**
   * Calculates the distance from v1 to a SQUARE with a center point at v2
   *
   * If the point is inside the circle, this will return a negative number
  */
  static signedDistToSquare(v1, v2, size) {
    const offset = 0

    // distance from v1 to the edge of the box
    const unsignedDist = 0
  }


}
