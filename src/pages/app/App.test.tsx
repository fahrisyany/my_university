import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App page', () => {
  render(<App />);
  const linkElement = screen.getAllByTestId(/App page/i);
  expect(linkElement).toBeInTheDocument();
});
