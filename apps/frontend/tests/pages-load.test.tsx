// pages-load.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
import axios from 'axios';

// Mock network requests globally in your test file
jest.mock('axios');

// Define mock data for nodes and edges
const mockGraphData = {
  nodes: [
    // Add mock nodes here
    { nodeId: '1', xcoord: 0, ycoord: 0, floor: '1', building: 'TestBuilding', nodeType: 'TestType', longName: 'Test Node 1', shortName: 'TN1' },
    // Add more nodes as needed
  ],
  edges: [
    // Add mock edges here
    { startNodeID: '1', endNodeID: '2' },
    // Add more edges as needed
  ],
};

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();

  // Setup mock for axios.get to return mockGraphData
  (axios.get as jest.Mock).mockImplementation((url) => {
    if (url === "/api/graph") {
      return Promise.resolve({ data: mockGraphData });
    }
    // Handle other URLs or return a default mock response
    return Promise.resolve({ data: {} });
  });
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
  test('Non-existent path shows "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/non-existent-path"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).toBeInTheDocument();
  });

  test('Root path does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/BwhHomepage" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/BwhHomepage"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/DataUpload" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/DataUpload"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/Home" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/Home"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/FlowerService" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/FlowerService"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/CleaningService" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/CleaningService"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/ReligiousService" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/ReligiousService"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/LanguageService" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/LanguageService"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/ExternalTransportation" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/ExternalTransportation"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/InternalTransportation" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/InternalTransportation"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/ServiceList" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/ServiceList"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/ServiceLog" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/ServiceLog"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/UserPage" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/UserPage"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/DataManager" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/DataManager"]}>
      <App />
    </MemoryRouter>
  );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });

  test('"/AboutPage" does not show "Page not found"', async () => {
    render(
      <MemoryRouter initialEntries={["/AboutPage"]}>
        <App />
      </MemoryRouter>
    );
      expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
  });
});

