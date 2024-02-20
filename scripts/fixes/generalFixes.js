/* eslint-env node */
import { executeCommands } from './commandRunner.js';

export function executeGeneralFixes(callback) {
  // General cleanup commands
  const commands = ['yarn cache clean', 'rm -rf node_modules'];

  executeCommands(commands, callback);
}
