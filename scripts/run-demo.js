/* eslint-env node */
import { executeCommands } from './commandRunner.js';
import { spawn } from 'child_process';
import { readFile } from 'fs/promises';
import { setTimeout } from 'timers/promises';

const MAX_ATTEMPTS = 30;
const SLEEP_INTERVAL = 2000; // milliseconds
const API_BASE_URL = 'http://localhost:3000/api';
const DB_CONTAINER = 'bwh-navigation-management-system-database-1';

async function waitForBackend() {
  console.log('Waiting for backend to start...');
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (response.ok) {
        console.log('Backend is ready!');
        return true;
      }
    } catch (error) {
      // Ignore errors and continue polling
    }
    console.log(`Attempt ${attempt} of ${MAX_ATTEMPTS}: Backend not ready yet...`);
    await setTimeout(SLEEP_INTERVAL);
  }
  console.error('Backend failed to start after maximum attempts');
  return false;
}

async function waitForDatabase() {
  console.log('Waiting for database to start...');
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const cmd = `docker exec ${DB_CONTAINER} pg_isready -U dev`;
        const proc = spawn(cmd, { shell: true });
        proc.on('exit', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject();
          }
        });
      });
      console.log('Database is ready!');
      return true;
    } catch (error) {
      // Ignore errors and continue polling
    }
    console.log(`Attempt ${attempt} of ${MAX_ATTEMPTS}: Database not ready yet...`);
    await setTimeout(SLEEP_INTERVAL);
  }
  console.error('Database failed to start after maximum attempts');
  return false;
}

async function sendCsv(endpoint, file) {
  console.log(`Sending ${file} to ${endpoint}...`);

  try {
    const csvData = await readFile(file, 'utf-8');
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ csvString: csvData })
    });
    const body = await response.text();

    if (response.ok) {
      console.log(`Successfully populated ${endpoint}`);
      return true;
    } else {
      console.error(`Error populating ${endpoint}: ${body}`);
      return false;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
}

async function populateDatabase() {
  console.log('Starting database population...');

  const csvFiles = [
    { endpoint: 'node-populate', file: 'apps/backend/data/csv/nodes.csv' },
    { endpoint: 'edge-populate', file: 'apps/backend/data/csv/edges.csv' }
  ];

  for (const { endpoint, file } of csvFiles) {
    const success = await sendCsv(endpoint, file);
    if (!success) {
      console.error(`Failed to populate ${endpoint}`);
      return false;
    }
  }

  // Populate employees and users
  console.log('Populating employees and users...');
  try {
    const response = await fetch(`${API_BASE_URL}/populate-employee`, { method: 'PATCH' });
    const body = await response.text();

    if (response.ok) {
      console.log('Database population complete!');
      return true;
    } else {
      console.error(`Error populating employees and users: ${body}`);
      return false;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
}

async function main() {
  // Setup and start the development environment
  const setupCommands = [
    'yarn setup',
    'yarn run dev &'
  ];

  executeCommands(setupCommands, async () => {
    // Wait for database to be ready
    const dbReady = await waitForDatabase();
    if (!dbReady) {
      console.error('Failed to connect to database');
      process.exit(1);
    }
    await setTimeout(5000); // Extra time for database

    // Reset database and run migrations
    const migrationCommands = [
      'cd packages/database/ && yarn prisma migrate reset --force --skip-generate'
    ];
    executeCommands(migrationCommands, async () => {
      await setTimeout(10000); // Time for migrations

      // Wait for backend to be ready
      const backendReady = await waitForBackend();
      if (!backendReady) {
        console.error('Failed to connect to backend');
        process.exit(1);
      }
      await setTimeout(5000); // Extra time for backend

      // Populate database
      const success = await populateDatabase();
      if (!success) {
        process.exit(1);
      } else {
        console.log('Database populated successfully!');
        process.exit(0);
      }
    });
  });
}

// Start the script
main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});