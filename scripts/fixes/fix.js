/* eslint-env node */
import { executeDockerFixes, isDockerRunning } from './dockerFixes.js';
import { executeGeneralFixes } from './generalFixes.js';
import { executePostFix } from './postFix.js';

const args = process.argv.slice(2);

const fixes = {
  docker: executeDockerFixes,
  general: executeGeneralFixes
};

const executeFixes = (fixesToRun, callback, index = 0) => {
  if (index < fixesToRun.length) {
    fixesToRun[index](() => executeFixes(fixesToRun, callback, index + 1));
  } else if (callback) {
    callback();
    if (args.indexOf('docker') === -1 && !isDockerRunning()) {
      console.error('\x1b[33m%s\x1b[0m', 'Docker is not running, Docker-related fixes will not be applied.');
    }
  }
};

let fixesToRun = args.map(arg => fixes[arg]).filter(Boolean);

// If no specific fix is requested, run all
if (fixesToRun.length === 0) {
  fixesToRun = Object.values(fixes);
}

// Execute requested or all fixes, then run post-fix tasks
executeFixes(fixesToRun, executePostFix, 0);
