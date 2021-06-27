import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { SideNav } from './SideNav';


afterEach(() => {
    cleanup()
})

test('renders SideNav page', () => {
    render(<SideNav />);
    const linkElement = screen.getAllByTestId(/SideNav/i);
    expect(linkElement).toBeInTheDocument();
});
