import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('renders with initial value', () => {
    render(<SearchInput initSearchTerm="pikachu" />);

    expect(screen.getByDisplayValue('pikachu')).toBeTruthy();
  });

  it('triggers change on enter', () => {
    const onChange = jest.fn();
    const searchTerm = 'pikachu';

    render(<SearchInput initSearchTerm={searchTerm} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it('does not fire on keydown other than enter', () => {
    const onChange = jest.fn();
    const searchTerm = 'pikachu';

    render(<SearchInput initSearchTerm={searchTerm} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Space' });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('triggers change on click button', () => {
    const onChange = jest.fn();
    const searchTerm = 'pikachu';

    render(<SearchInput initSearchTerm={searchTerm} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it('displays an error on empty search term', () => {
    const onChange = jest.fn();

    render(<SearchInput onChange={onChange} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('error')).toBeTruthy();
  });
  
});
