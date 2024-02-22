/* eslint-env node */

// vitest-wrapper.js
const { exec } = require('child_process');

// Get the arguments passed to the script
const args = process.argv.slice(2);

// We only care about the first argument (the test file path)
const testFilePath = args[0];

// Run vitest with the test file path and automatically provide 'q\n' as input
exec(`printf "q\n" | yarn vitest ${testFilePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});