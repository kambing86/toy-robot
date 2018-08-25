import {expect} from 'chai';
import {checkInRange, FACING, IPosition, Robot} from './Robot';
import {Table} from './Table';

describe('Robot.checkInRange', () => {
  it('should return true if the value is within range', () => {
    expect(checkInRange(0, 0, 1)).to.equal(true);
    expect(checkInRange(1, 0, 1)).to.equal(true);
  });

  it('should return false if the value is out of range', () => {
    expect(checkInRange(-1, 0, 1)).to.equal(false);
    expect(checkInRange(2, 0, 1)).to.equal(false);
  });
});

describe('Robot', () => {
  const table = new Table(5, 5);
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
    robot.assignTable(table);
  });

  describe('assignTable method', () => {
    it('should reset position and facing direction if assign to new table', () => {
      const position: IPosition = {x: 1, y: 1, facing: FACING.NORTH};
      robot.place(position);
      robot.move();
      const newPosition = {...position, y: position.y + 1};
      expect(robot.report()).to.eql({...position, y: position.y + 1});

      robot.assignTable(new Table(10, 10));
      expect(robot.report()).to.eql({x: 0, y: 0, facing: FACING.NORTH});
    });
  });

  describe('place method', () => {
    it('should place in correct position and report correctly if the position is valid', () => {
      let position: IPosition = {x: 1, y: 1, facing: FACING.NORTH};
      robot.place(position);
      expect(robot.report()).to.eql(position);

      position = {x: 2, y: 2, facing: FACING.EAST};
      robot.place(position);
      expect(robot.report()).to.eql(position);

      position = {x: 2, y: 2, facing: FACING.SOUTH};
      robot.place(position);
      expect(robot.report()).to.eql(position);

      position = {x: 2, y: 2, facing: FACING.WEST};
      robot.place(position);
      expect(robot.report()).to.eql(position);
    });

    it('should ignore and report correctly if the position is invalid', () => {
      const position1 = {x: 1, y: 1, facing: FACING.EAST};
      robot.place(position1);
      expect(robot.report()).to.eql(position1);

      const position2 = {x: 10, y: 10, facing: FACING.WEST};
      robot.place(position2);
      expect(robot.report()).to.eql(position1);
    });
  });

  describe('move method', () => {
    it('should move y+1 and report correctly if facing NORTH', () => {
      const position: IPosition = {x: 1, y: 1, facing: FACING.NORTH};
      robot.place(position);
      robot.move();
      expect(robot.report()).to.eql({...position, y: position.y + 1});
    });

    it('should move x+1 and report correctly if facing EAST', () => {
      const position: IPosition = {x: 1, y: 1, facing: FACING.EAST};
      robot.place(position);
      robot.move();
      expect(robot.report()).to.eql({...position, x: position.x + 1});
    });

    it('should move y-1 and report correctly if facing SOUTH', () => {
      const position: IPosition = {x: 1, y: 1, facing: FACING.SOUTH};
      robot.place(position);
      robot.move();
      expect(robot.report()).to.eql({...position, y: position.y - 1});
    });

    it('should move x-1 and report correctly if facing WEST', () => {
      const position: IPosition = {x: 1, y: 1, facing: FACING.WEST};
      robot.place(position);
      robot.move();
      expect(robot.report()).to.eql({...position, x: position.x - 1});
    });

    it('should not move and report correctly if no place to move', () => {
      let position: IPosition = {x: 0, y: 4, facing: FACING.NORTH};
      robot.place(position);
      robot.move();
      expect(robot.report()).to.eql(position);

      position = {x: 4, y: 0, facing: FACING.EAST};
      robot.place(position);
      robot.move();
      expect(robot.report()).to.eql(position);

      position = {x: 4, y: 0, facing: FACING.SOUTH};
      robot.place(position);
      robot.move();
      expect(robot.report()).to.eql(position);

      position = {x: 0, y: 4, facing: FACING.WEST};
      robot.place(position);
      robot.move();
      expect(robot.report()).to.eql(position);
    });
  });

  describe('left method', () => {
    it('should face WEST if it faced NORTH', () => {
      const position: IPosition = {x: 0, y: 0, facing: FACING.NORTH};
      robot.place(position);
      robot.left();
      expect(robot.report()).to.eql({...position, facing: FACING.WEST});
    });

    it('should face SOUTH if it faced WEST', () => {
      const position: IPosition = {x: 0, y: 0, facing: FACING.WEST};
      robot.place(position);
      robot.left();
      expect(robot.report()).to.eql({...position, facing: FACING.SOUTH});
    });

    it('should face EAST if it faced SOUTH', () => {
      const position: IPosition = {x: 0, y: 0, facing: FACING.SOUTH};
      robot.place(position);
      robot.left();
      expect(robot.report()).to.eql({...position, facing: FACING.EAST});
    });

    it('should face NORTH if it faced EAST', () => {
      const position: IPosition = {x: 0, y: 0, facing: FACING.EAST};
      robot.place(position);
      robot.left();
      expect(robot.report()).to.eql({...position, facing: FACING.NORTH});
    });
  });

  describe('right method', () => {
    it('should face EAST if it faced NORTH', () => {
      const position: IPosition = {x: 0, y: 0, facing: FACING.NORTH};
      robot.place(position);
      robot.right();
      expect(robot.report()).to.eql({...position, facing: FACING.EAST});
    });

    it('should face SOUTH if it faced EAST', () => {
      const position: IPosition = {x: 0, y: 0, facing: FACING.EAST};
      robot.place(position);
      robot.right();
      expect(robot.report()).to.eql({...position, facing: FACING.SOUTH});
    });

    it('should face WEST if it faced SOUTH', () => {
      const position: IPosition = {x: 0, y: 0, facing: FACING.SOUTH};
      robot.place(position);
      robot.right();
      expect(robot.report()).to.eql({...position, facing: FACING.WEST});
    });

    it('should face NORTH if it faced WEST', () => {
      const position: IPosition = {x: 0, y: 0, facing: FACING.WEST};
      robot.place(position);
      robot.right();
      expect(robot.report()).to.eql({...position, facing: FACING.NORTH});
    });
  });

  describe('report method', () => {
    it('should always report correctly', () => {
      const position: IPosition = {x: 1, y: 1, facing: FACING.NORTH};
      robot.place(position);
      expect(robot.report()).to.eql(position);
    });
  });
});
