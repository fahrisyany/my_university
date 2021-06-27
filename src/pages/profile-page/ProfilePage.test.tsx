import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';


afterEach(() => {
    cleanup()
})

test('renders ProfilePage page', () => {
    render(<ProfilePage />);
    const linkElement = screen.getAllByTestId(/ProfilePage/i);
    expect(linkElement).toBeInTheDocument();
});
