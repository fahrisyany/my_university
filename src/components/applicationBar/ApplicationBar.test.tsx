import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import ApplicationBar from './ApplicationBar';


afterEach(() => {
    cleanup()
})

test('renders ApplicationBar component', () => {
    render(<ApplicationBar />);
    const linkElement = screen.getAllByTestId(/ApplicationBar/i);
    expect(linkElement).toBeInTheDocument();
});
