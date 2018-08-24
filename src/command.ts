import {FACING, Robot} from './Robot';

const PLACE_REGEX = /^PLACE (\d),(\d),([^,]+)$/;

export function execute(robot: Robot, command: string): void {
  switch (true) {
    case PLACE_REGEX.test(command):
      const matches = PLACE_REGEX.exec(command);
      if (matches) {
        const [, match1, match2, match3] = matches;
        const facing = FACING[match3];
        if (facing !== undefined) {
          robot.place({x: parseInt(match1, 10), y: parseInt(match2, 10), facing});
        }
      }
      break;
    case command === 'MOVE':
      robot.move();
      break;
    case command === 'LEFT':
      robot.left();
      break;
    case command === 'RIGHT':
      robot.right();
      break;
    case command === 'REPORT':
      console.log(robot.report());
      break;
  }
}
