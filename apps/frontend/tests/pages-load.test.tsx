// pages-load.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
// import axios from 'axios';
require("leaked-handles");

// Mock network requests globally in your test file
jest.mock('axios');
jest.mock('vaul');

// Inside your test or beforeEach block, specify the mock implementation
import axios from 'axios';
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();

  // Setup mock for axios.get (or other methods as needed)
  (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: {} }));
});

// Suppress console.error messages for the duration of your tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {
    // nothing
  });
});

afterAll(() => {
  // Use type assertion to inform TypeScript about the mocked nature of console.error
  (console.error as jest.MockedFunction<typeof console.error>).mockRestore();
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