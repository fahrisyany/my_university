import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Carousel from './Carousel';


afterEach(() => {
    cleanup()
})

test('renders Carousel component', () => {
    render(<Carousel imagesArray={[]} />);
    const linkElement = screen.getAllByTestId(/Carousel/i);
    expect(linkElement).toBeInTheDocument();
});
