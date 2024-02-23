import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App'; // Ensure this import is correct

// Helper function to render the component within the MemoryRouter, if necessary
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    // Check if the component is the top-level App component that already includes a Router
    if (ui.type === App) {
        // For the App component, just render it without wrapping in MemoryRouter
        render(ui);
    } else {
        // For other components, wrap them in MemoryRouter
        window.history.pushState({}, 'Test page', route);
        render(ui, { wrapper: MemoryRouter });
    }
};

describe('Route tests', () => {
    test('Homepage loads without React error popup or 404', async () => {
        renderWithRouter(<App />, { route: '/' });
        expect(screen.queryByText(/Page not found/i)).toBeNull();
        // Add more assertions here to check for the absence of the React error popup
    });

    // Repeat this structure for other routes, for example:
    test('BwhHomepage loads successfully', async () => {
        renderWithRouter(<App />, { route: '/BwhHomepage' });
        expect(screen.queryByText(/Page not found/i)).toBeNull();
        // More assertions specific to BwhHomepage
    });

    // Add more tests for other routes...
});

