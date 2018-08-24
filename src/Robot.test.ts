import {expect} from 'chai';
import {checkInRange, FACING, Robot} from './Robot';
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
    robot = new Robot(table);
  });

  describe('place method', () => {
    it('should place in correct position and report correctly if the position is valid', () => {
      robot.place({x: 1, y: 1, facing: FACING.NORTH});
      expect(robot.report()).to.equal('1,1,NORTH');
      robot.place({x: 2, y: 2, facing: FACING.EAST});
      expect(robot.report()).to.equal('2,2,EAST');
      robot.place({x: 3, y: 3, facing: FACING.SOUTH});
      expect(robot.report()).to.equal('3,3,SOUTH');
      robot.place({x: 4, y: 4, facing: FACING.WEST});
      expect(robot.report()).to.equal('4,4,WEST');
    });

    it('should ignore and report correctly if the position is invalid', () => {
      robot.place({x: 1, y: 1, facing: FACING.EAST});
      expect(robot.report()).to.equal('1,1,EAST');
      robot.place({x: 10, y: 10, facing: FACING.WEST});
      expect(robot.report()).to.equal('1,1,EAST');
    });
  });

  describe('move method', () => {
    it('should move y+1 and report correctly if facing NORTH', () => {
      robot.place({x: 1, y: 1, facing: FACING.NORTH});
      robot.move();
      expect(robot.report()).to.equal('1,2,NORTH');
    });
    it('should move x+1 and report correctly if facing EAST', () => {
      robot.place({x: 1, y: 1, facing: FACING.EAST});
      robot.move();
      expect(robot.report()).to.equal('2,1,EAST');
    });
    it('should move y-1 and report correctly if facing SOUTH', () => {
      robot.place({x: 1, y: 1, facing: FACING.SOUTH});
      robot.move();
      expect(robot.report()).to.equal('1,0,SOUTH');
    });
    it('should move x-1 and report correctly if facing WEST', () => {
      robot.place({x: 1, y: 1, facing: FACING.WEST});
      robot.move();
      expect(robot.report()).to.equal('0,1,WEST');
    });
    it('should not move and report correctly if no place to move', () => {
      robot.place({x: 0, y: 4, facing: FACING.NORTH});
      robot.move();
      expect(robot.report()).to.equal('0,4,NORTH');
      robot.place({x: 4, y: 0, facing: FACING.EAST});
      robot.move();
      expect(robot.report()).to.equal('4,0,EAST');
      robot.place({x: 4, y: 0, facing: FACING.SOUTH});
      robot.move();
      expect(robot.report()).to.equal('4,0,SOUTH');
      robot.place({x: 0, y: 4, facing: FACING.WEST});
      robot.move();
      expect(robot.report()).to.equal('0,4,WEST');
    });
  });

  describe('left method', () => {
    it('should face WEST if it faced NORTH', () => {
      robot.place({x: 0, y: 0, facing: FACING.NORTH});
      robot.left();
      expect(robot.report()).to.equal('0,0,WEST');
    });

    it('should face SOUTH if it faced WEST', () => {
      robot.place({x: 0, y: 0, facing: FACING.WEST});
      robot.left();
      expect(robot.report()).to.equal('0,0,SOUTH');
    });

    it('should face EAST if it faced SOUTH', () => {
      robot.place({x: 0, y: 0, facing: FACING.SOUTH});
      robot.left();
      expect(robot.report()).to.equal('0,0,EAST');
    });

    it('should face NORTH if it faced EAST', () => {
      robot.place({x: 0, y: 0, facing: FACING.EAST});
      robot.left();
      expect(robot.report()).to.equal('0,0,NORTH');
    });
  });

  describe('right method', () => {
    it('should face EAST if it faced NORTH', () => {
      robot.place({x: 0, y: 0, facing: FACING.NORTH});
      robot.right();
      expect(robot.report()).to.equal('0,0,EAST');
    });

    it('should face SOUTH if it faced EAST', () => {
      robot.place({x: 0, y: 0, facing: FACING.EAST});
      robot.right();
      expect(robot.report()).to.equal('0,0,SOUTH');
    });

    it('should face WEST if it faced SOUTH', () => {
      robot.place({x: 0, y: 0, facing: FACING.SOUTH});
      robot.right();
      expect(robot.report()).to.equal('0,0,WEST');
    });

    it('should face NORTH if it faced WEST', () => {
      robot.place({x: 0, y: 0, facing: FACING.WEST});
      robot.right();
      expect(robot.report()).to.equal('0,0,NORTH');
    });
  });

  describe('report method', () => {
    it('should always report correctly', () => {
      robot.place({x: 1, y: 1, facing: FACING.NORTH});
      expect(robot.report()).to.equal('1,1,NORTH');
    });
  });
});
