// pages-load.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
import axios from 'axios';

// Mock network requests globally in your test file
jest.mock('axios');

// Inside your test or beforeEach block, specify the mock implementation
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();

  // Setup mock for axios.get (or other methods as needed)
  (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: {} }));
});

// Suppress all console output and logs for this test file
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  // Restore the original console functions
  jest.restoreAllMocks();
});

// Automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);


describe('Page load tests', () => {
  test('Root path does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/BwhHomepage" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/BwhHomepage"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/DataUpload" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/DataUpload"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/HomeOUTDATED" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/HomeOUTDATED"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/Home" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/Home"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/FlowerService" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/FlowerService"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/CleaningService" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/CleaningService"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/ReligiousService" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/ReligiousService"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/LanguageService" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/LanguageService"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/ExternalTransportation" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/ExternalTransportation"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/InternalTransportation" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/InternalTransportation"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/ServiceList" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/ServiceList"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/ServiceLog" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/ServiceLog"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/UserPage" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/UserPage"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/EmployeeManager" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/EmployeeManager"]}>
      <App />
    </MemoryRouter>
  );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/AboutPage" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/AboutPage"]}>
        <App />
      </MemoryRouter>
    );
    await expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });
});