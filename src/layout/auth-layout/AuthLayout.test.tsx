import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import AuthLayout from './AuthLayout';


afterEach(() => {
    cleanup()
})

test('renders AuthLayout', () => {
    render(<AuthLayout />);
    const linkElement = screen.getAllByTestId(/AuthLayout/i);
    expect(linkElement).toBeInTheDocument();
});
