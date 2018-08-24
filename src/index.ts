import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import {execute} from './command';
import {Robot} from './Robot';
import {Table} from './Table';

function init() {
  const table = new Table(5, 5);
  const robot = new Robot(table);
  const argv = yargs.option('data', {required: true}).argv;
  const data = fs.readFileSync(path.join(process.cwd(), argv.data), 'utf8');
  const commands = data.split(/\n/);
  commands.forEach((command) => {
    execute(robot, command);
  });
}

init();
