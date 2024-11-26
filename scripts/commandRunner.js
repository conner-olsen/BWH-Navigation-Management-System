/* eslint-env node */
import { spawn } from 'child_process';

export function executeCommands(commands, callback) {
  let i = 0;
  const next = () => {
    if (i < commands.length) {
      const [cmd, ...args] = commands[i++].split(' ');
      const proc = spawn(cmd, args, { shell: true, stdio: 'inherit' });
      proc.on('exit', next);
    } else {
      callback();
    }
  };
  next();
}
