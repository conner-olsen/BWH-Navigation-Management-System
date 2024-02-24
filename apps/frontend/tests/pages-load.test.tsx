// pages-load.test.tsx
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';

test('landing on a bad page', () => {
  const badRoute = '/some/bad/route';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  );

  // verify navigation to "no match" route
  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});

// test('navigating to "/BwhHomepage" does not show "Page not found"', () => {
//   render(
//     <MemoryRouter initialEntries={["/BwhHomepage"]}>
//       <App />
//     </MemoryRouter>
//   );

//   // Verify that "Page not found" is not displayed
//   expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
// });