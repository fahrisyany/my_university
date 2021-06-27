import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import HomePage from './HomePage';


afterEach(() => {
    cleanup()
})

test('renders HomePage page', () => {
    render(<HomePage />);
    const linkElement = screen.getAllByTestId(/HomePage/i);
    expect(linkElement).toBeInTheDocument();
});
