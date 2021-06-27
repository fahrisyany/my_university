import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import RegisterSuccessPage from './RegisterSuccessPage';


afterEach(() => {
    cleanup()
})

test('renders RegisterSuccessPage page', () => {
    render(<RegisterSuccessPage />);
    const linkElement = screen.getAllByTestId(/RegisterSuccessPage/i);
    expect(linkElement).toBeInTheDocument();
});
