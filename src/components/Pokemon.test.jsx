import React from 'react';
import { render, screen } from '@testing-library/react';
import Pokemon from './Pokemon';
import { zapdosMock, pikachuMock } from '../__mocks__/pokemonMocks';

describe('Pokemon', () => {
  it('renders provided properties', () => {
    const { container } = render(<Pokemon {...pikachuMock} />);

    expect(screen.getByText(pikachuMock.name)).toBeTruthy();
    expect(screen.getByTestId('image').getAttribute('src')).toBe(pikachuMock.image);
    expect(container).toHaveTextContent(pikachuMock.types);
  });

  it('renders pokemon with multiple types', () => {
    const { container } = render(<Pokemon {...zapdosMock} />);

    expect(container).toHaveTextContent(zapdosMock.types.join(', '));
  });
});
