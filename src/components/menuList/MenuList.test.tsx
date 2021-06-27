import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import MenuList from './MenuList';

afterEach(() => {
    cleanup()
})

test('renders MenuList component', () => {
    render(<MenuList menuList={[]} />);
    const linkElement = screen.getAllByTestId(/MenuList/i);
    expect(linkElement).toBeInTheDocument();
});
