import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';


afterEach(() => {
    cleanup()
})

test('renders MainLayout', () => {
    render(<MainLayout />);
    const linkElement = screen.getAllByTestId(/MainLayout/i);
    expect(linkElement).toBeInTheDocument();
});
