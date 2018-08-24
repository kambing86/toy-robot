import {expect} from 'chai';
import sinon from 'sinon';
import {execute} from './command';
import {FACING, Robot} from './Robot';
import {Table} from './Table';

describe('index.execute', () => {
  const table = new Table(5, 5);
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot(table);
  });

  it('should execute the valid PLACE command with the robot', () => {
    const spy = sinon.spy(robot, 'place');
    execute(robot, 'PLACE 1,2,NORTH');
    expect(spy).to.be.calledOnceWith({x: 1, y: 2, facing: FACING.NORTH});
  });

  it('should execute the valid MOVE command with the robot', () => {
    const spy = sinon.spy(robot, 'move');
    execute(robot, 'MOVE');
    expect(spy).to.be.callCount(1);
  });

  it('should execute the valid LEFT command with the robot', () => {
    const spy = sinon.spy(robot, 'left');
    execute(robot, 'LEFT');
    expect(spy).to.be.callCount(1);
  });

  it('should execute the valid RIGHT command with the robot', () => {
    const spy = sinon.spy(robot, 'right');
    execute(robot, 'RIGHT');
    expect(spy).to.be.callCount(1);
  });

  it('should execute the valid REPORT command with the robot', () => {
    const spy = sinon.spy(robot, 'report');
    execute(robot, 'REPORT');
    expect(spy).to.be.callCount(1);
  });

  it('should not execute the invalid PLACE command with the robot', () => {
    const spy = sinon.spy(robot, 'place');
    execute(robot, 'PLACE ,1,2,NORTH');
    expect(spy).to.be.callCount(0);
    execute(robot, 'PLACE 1,2,NORTH,');
    expect(spy).to.be.callCount(0);
    execute(robot, 'PLACE a,2,NORTH');
    expect(spy).to.be.callCount(0);
    execute(robot, 'PLACE 1,b,NORTH');
    expect(spy).to.be.callCount(0);
    execute(robot, 'PLACE 1,2,NORTHWRONG');
    expect(spy).to.be.callCount(0);
  });
});
