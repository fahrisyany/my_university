import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import InputButton from './InputButton';
import TuneIcon from '@material-ui/icons/Tune';


afterEach(() => {
    cleanup()
})

test('renders InputButton component', () => {
    render(<InputButton value={"string"} handleOnChange={jest.fn()} toggleAction={jest.fn()} icon={<TuneIcon />} placeholder={'string'} id={'string'} />);
    const linkElement = screen.getAllByTestId(/InputButton/i);
    expect(linkElement).toBeInTheDocument();
});
