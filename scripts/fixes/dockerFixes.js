/* eslint-env node */
import { spawnSync } from 'child_process';
import { platform } from 'os';
import { executeCommands } from '../commandRunner.js';

export function isDockerRunning() {
  const result = spawnSync('docker', ['info'], { stdio: 'ignore' });
  return result.status === 0;
}

export function executeDockerFixes(callback) {
  if (!isDockerRunning()) {
    if (process.argv.includes('docker')) {
      console.error('Docker is not running. Cannot apply Docker-specific fixes.');
      process.exit(1);
    } else {
      callback();
      return;
    }
  }

  // Docker commands
  const commands = [
    platform() === 'win32' ? 'docker ps -q | ForEach-Object { docker stop $_ }' : 'docker ps -q | xargs -r docker stop',
    'docker container prune --force',
    'docker network prune --force',
    'docker volume prune --force',
    'docker image prune --all --force'
  ];

  executeCommands(commands, callback);
}
