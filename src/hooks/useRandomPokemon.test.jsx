import { renderHook, act } from '@testing-library/react-hooks';
import useRandomPokemon from './useRandomPokemon';
import { fetchPokemon } from '../lib/pokemonApi';
import { pikachuMock } from '../__mocks__/pokemonMocks';

jest.mock('../lib/pokemonApi', () => ({
  fetchPokemon: jest.fn(),
}));

describe('useRandomPokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it ('returns expected initial state', () => {
    const { result } = renderHook(() => useRandomPokemon());
    const [randomPokemon, getRandomPokemon, loading] = result.current;

    expect(loading).toBe(false);
    expect(randomPokemon).toBe(null);
    expect(getRandomPokemon).toBeInstanceOf(Function);
  });

  it ('sets state to loading while fetching a pokemon', () => {
    fetchPokemon.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useRandomPokemon());
    let [, getRandomPokemon] = result.current;

    act(() => {
      getRandomPokemon();
    });

    let [,, loading] = result.current;

    expect(loading).toBe(true);
  });

  it ('sets loading state to false and retrieves a pokemon', async () => {
    fetchPokemon.mockResolvedValue(pikachuMock);

    const { result } = renderHook(() => useRandomPokemon());
    let [, getRandomPokemon] = result.current;

    await act(async () => {
      await getRandomPokemon()
    });

    let [randomPokemon,, loading] = result.current;

    expect(loading).toBe(false);
    expect(randomPokemon).toBe(pikachuMock);
  });
});
