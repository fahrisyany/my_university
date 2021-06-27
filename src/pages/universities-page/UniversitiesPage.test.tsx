import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import UniversitiesPage from './UniversitiesPage';


afterEach(() => {
    cleanup()
})

test('renders UniversitiesPage page', () => {
    render(<UniversitiesPage />);
    const linkElement = screen.getAllByTestId(/UniversitiesPage/i);
    expect(linkElement).toBeInTheDocument();
});
