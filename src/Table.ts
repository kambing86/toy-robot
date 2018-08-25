export class Table {
  x: number;
  y: number;
  constructor(totalX: number, totalY: number) {
    if (totalX < 1 || totalY < 1) {
      throw new Error('totalX or totalY must be more than 0');
    }
    this.x = totalX;
    this.y = totalY;
  }
}
