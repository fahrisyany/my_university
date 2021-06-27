import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Card from './Card';

afterEach(() => {
    cleanup()
})

test('renders Card component', () => {
    render(<Card data={[]} index={0} handleFavorite={jest.fn()} />);
    const linkElement = screen.getAllByTestId(/Card/i);
    expect(linkElement).toBeInTheDocument();
});
