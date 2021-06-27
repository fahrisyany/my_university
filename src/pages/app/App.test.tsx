import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';

afterEach(() => {
  cleanup()
})

test('renders App page', () => {
  render(<App />);
  const linkElement = screen.getAllByTestId(/App page/i);
  expect(linkElement).toBeInTheDocument();
});
