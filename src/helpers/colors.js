class Colors {

  static getP5Notation(colors) {

    if (colors.length == 3)
      return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;

    else if (colors.length == 4)
        return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`;

    return colors;
  }
}
