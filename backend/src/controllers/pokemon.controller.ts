import { Request, Response } from 'express';
import { Pokemon } from '../types/pokemon';
import { cacheManager } from '../utils/cache';

const pokemonApi = process.env.POKEMON_API_URL;

export async function getPokemonList(req: Request, res: Response) {
  const cached = cacheManager.list.get('all');

  if (cached) {
    return res.status(200).json(cached);
  }

  const pokemonsRes = await fetch(`${pokemonApi}/pokemon?limit=2000`);
  const pokemonsData = (await pokemonsRes.json()) as { results: Pokemon[] };

  const transformedPokemonsData: Pokemon[] = pokemonsData.results.map(
    (item) => {
      const id = item.url.split('/').filter(Boolean).at(-1)!;
      const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        avatar,
        name: item.name,
        url: item.url,
      };
    }
  );

  cacheManager.list.set('all', transformedPokemonsData);
  res.status(200).json(transformedPokemonsData);
}

export async function getPokemonDetails(req: Request, res: Response) {
  const { name } = req.params;

  const cached = cacheManager.details.get(name);

  if (cached) {
    return res.status(200).json(cached);
  }

  const pokemonRes = await fetch(`${pokemonApi}/pokemon/${name}`);
  const pokemonData = await pokemonRes.json();

  const speciesRes = await fetch(`${pokemonApi}/pokemon-species/${name}`);
  const speciesData = await speciesRes.json();

  cacheManager.details.set(name, { ...pokemonData, ...speciesData });
  res.status(200).json({ ...pokemonData, ...speciesData });
}
