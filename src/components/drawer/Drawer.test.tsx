import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Drawer } from './Drawer';


afterEach(() => {
    cleanup()
})

test('renders Drawer component', () => {
    render(<Drawer />);
    const linkElement = screen.getAllByTestId(/Drawer/i);
    expect(linkElement).toBeInTheDocument();
});
