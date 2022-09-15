const Y_PADDING_BUFFER = 0.1;

export class GraphBounds {
  constructor(coordArray) {
    let x = [];
    let y = [];
    coordArray.forEach((element) => {
      x.push(element.x);
      y.push(element.y);
    });

    this.xMin = Math.min(...x);
    this.xMax = Math.max(...x);
    this.yMin = Math.min(...y);
    this.yMax = Math.max(...y);
    this.xPadding = Math.round((this.xMax - this.xMin) / 2);
    this.yPadding = (this.yMax - this.yMin) * Y_PADDING_BUFFER;
  }
}
