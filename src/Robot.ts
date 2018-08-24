import {Table} from './Table';

export enum FACING {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}
export const TOTAL_FACING = 4;

export function checkInRange(value, min, max) {
  if (value < min || value > max) {
    return false;
  }
  return true;
}

export class Robot {
  private _x = 0;
  private _y = 0;
  private _facing = FACING.NORTH;
  private _table: Table;

  constructor(table: Table) {
    this._table = table;
  }

  place({x, y, facing}: {x: number; y: number; facing: FACING}): boolean {
    if (facing >= 0 && facing <= 3) {
      const moved = this.moveIfValid(x, y);
      if (moved) {
        this._facing = facing;
      }
      return moved;
    }
    return false;
  }
  move(): boolean {
    let newX = this._x;
    let newY = this._y;
    switch (this._facing) {
      case FACING.NORTH:
        newY += 1;
        break;
      case FACING.EAST:
        newX += 1;
        break;
      case FACING.SOUTH:
        newY -= 1;
        break;
      case FACING.WEST:
        newX -= 1;
        break;
    }
    return this.moveIfValid(newX, newY);
  }
  left(): void {
    this._facing = (this._facing - 1 + TOTAL_FACING) % TOTAL_FACING;
  }
  right(): void {
    this._facing = (this._facing + 1) % TOTAL_FACING;
  }
  report(): string {
    return `${this._x},${this._y},${FACING[this._facing]}`;
  }

  private moveIfValid(newX: number, newY: number): boolean {
    if (checkInRange(newX, 0, this._table.x - 1) && checkInRange(newY, 0, this._table.y - 1)) {
      this._x = newX;
      this._y = newY;
      return true;
    }
    return false;
  }
}
