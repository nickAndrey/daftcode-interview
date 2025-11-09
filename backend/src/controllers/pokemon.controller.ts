import { Request, Response } from 'express';
import { Pokemon } from '../types/pokemon';
import { cacheManager } from '../utils/cache';

const pokemonApi = process.env.POKEMON_API_URL;

function transformPokemonsData(data: Pokemon[]) {
  return data.map((item) => {
    const id = item.url.split('/').filter(Boolean).at(-1)!;
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return {
      id,
      avatar,
      name: item.name,
      url: item.url,
    };
  });
}

export async function getPokemonList(req: Request, res: Response) {
  const limit = (req.query.limit as string) || '20';
  const search = (req.query.search as string) || '';

  const filter = (pokemons: Pokemon[]) => {
    const normalizedSearch = search.toLowerCase();
    if (!normalizedSearch) return pokemons.slice(0, Number(limit));

    const filteredData = pokemons
      .filter((item) => item.name.toLowerCase().startsWith(normalizedSearch))
      .sort((a, b) =>
        a.name
          .toLowerCase()
          .localeCompare(b.name.toLowerCase(), 'en', { sensitivity: 'base' })
      );

    return filteredData.slice(0, Number(limit));
  };

  const cached = cacheManager.list.get('all');
  if (cached) return res.status(200).json(filter(cached));

  const pokemonsRes = await fetch(`${pokemonApi}/pokemon?limit=2000`);
  const pokemonsData = (await pokemonsRes.json()) as { results: Pokemon[] };

  const transformedData = transformPokemonsData(pokemonsData.results);
  cacheManager.list.set('all', transformedData);

  res.status(200).json(filter(transformedData));
}

export async function getPokemonDetails(req: Request, res: Response) {
  const { name } = req.params;

  const cached = cacheManager.details.get(name);

  if (cached) {
    return res.status(200).json(cached);
  }

  const pokemonRes = await fetch(`${pokemonApi}/pokemon/${name}`);
  const pokemonData = await pokemonRes.json();

  let speciesData: Record<string, unknown> = {};
  const speciesRes = await fetch(`${pokemonApi}/pokemon-species/${name}`);

  if (speciesRes.ok) {
    speciesData = await speciesRes.json();
  } else {
    const speciesRes = await fetch(
      `${pokemonApi}/pokemon-species/${name.split('-').at(0)}`
    );
    speciesData = await speciesRes.json();
  }

  cacheManager.details.set(name, { ...pokemonData, ...speciesData });
  res.status(200).json({ ...pokemonData, ...speciesData });
}

export async function getPopularPokemons(req: Request, res: Response) {
  const mostRecognizedPokemon = [
    'Pikachu',
    'Charizard',
    'Eevee',
    'Jigglypuff',
    'Meowth',
    'Mewtwo',
    'Squirtle',
    'Bulbasaur',
    'Snorlax',
    'Lucario',
    'Gengar',
    'Psyduck',
    'Greninja',
    'Dragonite',
    'Gardevoir',
    'Lapras',
    'Ditto',
    'Machamp',
  ];

  const recognizedMap = new Map(
    mostRecognizedPokemon.map((name, index) => [name.toLowerCase(), index])
  );

  const handleSortPokemons = (pokemons: Pokemon[]) => {
    return pokemons
      .sort((a, b) => {
        const indexA = recognizedMap.get(a.name.toLowerCase());
        const indexB = recognizedMap.get(b.name.toLowerCase());

        if (indexA !== undefined && indexB !== undefined)
          return indexA - indexB;
        if (indexA !== undefined) return -1;
        if (indexB !== undefined) return 1;
        return a.name.localeCompare(b.name);
      })
      .slice(0, recognizedMap.size);
  };

  const cached = cacheManager.list.get('all');
  if (cached) return res.status(200).json(handleSortPokemons(cached));

  const pokemonsRes = await fetch(`${pokemonApi}/pokemon?limit=2000`);
  const pokemonsData = (await pokemonsRes.json()) as { results: Pokemon[] };

  const transformedData = transformPokemonsData(pokemonsData.results);
  cacheManager.list.set('all', transformedData);

  res.status(200).json(handleSortPokemons(transformedData));
}
