import { fetchPokemon } from "./pokemonApi";
import pickachuResponseMock from "../__mocks__/pikachuResponseMock";

describe("pokemonApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null for empty search", async () => {
    const result = await fetchPokemon();

    expect(result).toBe(null);
  });

  it("returns null in case of error", async () => {
    fetch.mockResolvedValue({ ok: false });

    const result = await fetchPokemon("pikall");

    expect(result).toBe(null);
  });

  it("returns expected properties", async () => {
    fetch.mockResponse(JSON.stringify(pickachuResponseMock))

    const result = await fetchPokemon("pikachu");

    expect(result).toEqual(expect.objectContaining({
      name: expect.any(String),
      image: expect.any(String),
      types: expect.any(Array),
    }));
  });
});

