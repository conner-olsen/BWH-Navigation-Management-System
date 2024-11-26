/* eslint-env node */
import { spawn } from 'child_process';
import { executeCommands } from '../commandRunner.js';

const PROJECT_PREFIX = 'bwh-navigation-management-system';
const PROJECT_IMAGES = [
  `${PROJECT_PREFIX}-frontend`,
  `${PROJECT_PREFIX}-backend`
];

function executeDockerCommand(command) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, { shell: true });
    let output = '';

    proc.stdout.on('data', (data) => {
      output += data.toString();
    });

    proc.stderr.on('data', (data) => {
      output += data.toString();
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Command failed with code ${code}: ${output}`));
      }
    });
  });
}

async function cleanProjectDocker() {
  try {
    // Stop project containers
    console.log('Stopping project containers...');
    const containerCommand = `docker ps -a --filter "name=${PROJECT_PREFIX}" --format "{{.ID}}"`;
    const containers = await executeDockerCommand(containerCommand);
    
    if (containers.trim()) {
      const stopCommands = [
        `docker stop ${containers.trim().split('\n').join(' ')}`,
        `docker rm ${containers.trim().split('\n').join(' ')}`
      ];
      executeCommands(stopCommands, async () => {
        // Remove project images
        console.log('Removing project images...');
        for (const image of PROJECT_IMAGES) {
          try {
            await executeDockerCommand(`docker rmi ${image}:latest`);
          } catch (error) {
            // Ignore errors if image doesn't exist
          }
        }

        // Remove project network
        console.log('Removing project network...');
        try {
          await executeDockerCommand(`docker network rm ${PROJECT_PREFIX}_default`);
        } catch (error) {
          // Ignore error if network doesn't exist
        }

        // Remove project volumes
        console.log('Removing project volumes...');
        const volumeCommand = `docker volume ls --filter "name=${PROJECT_PREFIX}" --format "{{.Name}}"`;
        const volumes = await executeDockerCommand(volumeCommand);
        if (volumes.trim()) {
          await executeDockerCommand(`docker volume rm ${volumes.trim().split('\n').join(' ')}`);
        }

        console.log('Project Docker cleanup completed successfully!');
      });
    } else {
      console.log('No project containers found to clean up.');
    }
  } catch (error) {
    console.error('Error during Docker cleanup:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
cleanProjectDocker();