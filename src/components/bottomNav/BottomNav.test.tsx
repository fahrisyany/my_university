import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import BottomNav from './BottomNav';


afterEach(() => {
    cleanup()
})

test('renders BottomNav component', () => {
    render(<BottomNav />);
    const linkElement = screen.getAllByTestId(/BottomNav/i);
    expect(linkElement).toBeInTheDocument();
});
