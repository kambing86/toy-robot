import {Table} from './Table';

export enum FACING {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}
export const TOTAL_FACING = 4;

/**
 * check if the given value is within given min and max (inclusive)
 *
 * @export
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function checkInRange(value: number, min: number, max: number): boolean {
  if (value < min || value > max) {
    return false;
  }
  return true;
}

export interface IPosition {
  x: number;
  y: number;
  facing: FACING;
}

export class Robot {
  private _x = 0;
  private _y = 0;
  private _facing = FACING.NORTH;
  private _table?: Table;

  /**
   * assign table to the robot
   *
   * @param {Table} table
   * @memberof Robot
   */
  assignTable(table: Table): void {
    this._table = table;
    this.place({x: 0, y: 0, facing: FACING.NORTH});
  }

  /**
   * place the robot to x and y position with facing direction
   * stay in current state if command is invalid
   * then return true if the command is valid, else return false
   *
   * @param {IPosition} {x, y, facing}
   * @returns {boolean}
   * @memberof Robot
   */
  place({x, y, facing}: IPosition): boolean {
    if (facing >= 0 && facing <= 3) {
      const moved = this.moveIfValid(x, y);
      if (moved) {
        this._facing = facing;
      }
      return moved;
    }
    return false;
  }

  /**
   * move the robot one unit towards current facing direction
   * stay in current state if command is invalid
   * then return true if the command is valid, else return false
   *
   * @returns {boolean}
   * @memberof Robot
   */
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

  /**
   * rotate the robot 90 degress to left
   *
   * @memberof Robot
   */
  left(): void {
    this._facing = (this._facing - 1 + TOTAL_FACING) % TOTAL_FACING;
  }

  /**
   * rotate the robot 90 degress to left
   *
   * @memberof Robot
   */
  right(): void {
    this._facing = (this._facing + 1) % TOTAL_FACING;
  }

  /**
   * return the current status of the robot
   *
   * @returns {IPosition}
   * @memberof Robot
   */
  report(): IPosition {
    return {
      x: this._x,
      y: this._y,
      facing: this._facing,
    };
  }

  /**
   * private method to move to new position
   * before moving, check if the new position is valid
   * move the robot if it is valid
   * then return true if the new position is valid, else return false
   *
   * @private
   * @param {number} newX
   * @param {number} newY
   * @returns {boolean}
   * @memberof Robot
   */
  private moveIfValid(newX: number, newY: number): boolean {
    if (this._table === undefined) {
      return false;
    }
    if (checkInRange(newX, 0, this._table.x - 1) && checkInRange(newY, 0, this._table.y - 1)) {
      this._x = newX;
      this._y = newY;
      return true;
    }
    return false;
  }
}
