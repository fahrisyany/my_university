import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Loader from './Loader';


afterEach(() => {
    cleanup()
})

test('renders Loader component', () => {
    render(<Loader />);
    const linkElement = screen.getAllByTestId(/Loader/i);
    expect(linkElement).toBeInTheDocument();
});
