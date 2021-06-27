import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import PasswordPage from './PasswordPage';


afterEach(() => {
    cleanup()
})

test('renders PasswordPage page', () => {
    render(<PasswordPage />);
    const linkElement = screen.getAllByTestId(/PasswordPage/i);
    expect(linkElement).toBeInTheDocument();
});
