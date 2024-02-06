// To run the test, run the following command:
// npm test

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Click to change text/i);
  expect(linkElement).toBeInTheDocument();
});
