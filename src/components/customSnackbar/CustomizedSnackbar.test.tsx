import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { CustomizedSnackbars } from './CustomizedSnackbar';


afterEach(() => {
    cleanup()
})

test('renders CustomizedSnackbars component', () => {
    render(<CustomizedSnackbars />);
    const linkElement = screen.getAllByTestId(/CustomizedSnackbar/i);
    expect(linkElement).toBeInTheDocument();
});
