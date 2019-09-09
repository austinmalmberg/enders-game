class Colors {

  /**
   * Takes an array and converts it to a color that can be read by
   */
  static getP5Notation(colors) {

    if (typeof colors === 'number') {
      return colors;

    } else if (typeof colors === 'string') {
      return colors;

    } else if (!Array.isArray(colors)) {
      console.log(`Colors.getP5Notation does not current support ${typeof colors} arguments.`);
      return undefined;

    } else if (colors.length === 1) {
      return colors[0];

    } else if (colors.length == 3) {
      return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;

    } else if (colors.length == 4) {
        return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`;

    }
    return colors;
  }
}
