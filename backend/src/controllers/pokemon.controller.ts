import { Request, Response } from 'express';
import { Pokemon } from '../types/pokemon';
import { cacheManager } from '../utils/cache';

const pokemonApi = process.env.POKEMON_API_URL;

function filter<T>(args: {
  limit: string;
  search: string;
  data: T[];
  dataKey: keyof T;
}): T[] {
  const regex = new RegExp(args.search, 'ig');

  if (!args.search) {
    return args.data.slice(0, Number(args.limit));
  }

  return args.data
    .filter((item) => regex.test(item[args.dataKey] as string))
    .slice(0, Number(args.limit));
}

export async function getPokemonList(req: Request, res: Response) {
  const limit = (req.query.limit as string) || '20';
  const search = (req.query.search as string) || '';

  const cached = cacheManager.list.get('all');

  if (cached) {
    return res
      .status(200)
      .json(filter({ data: cached, search, limit, dataKey: 'name' }));
  }

  const pokemonsRes = await fetch(`${pokemonApi}/pokemon?limit=2000`);
  const pokemonsData = (await pokemonsRes.json()) as { results: Pokemon[] };

  const transformedData: Pokemon[] = pokemonsData.results.map((item) => {
    const id = item.url.split('/').filter(Boolean).at(-1)!;
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return {
      id,
      avatar,
      name: item.name,
      url: item.url,
    };
  });

  cacheManager.list.set('all', transformedData);
  res
    .status(200)
    .json(filter({ data: transformedData, search, limit, dataKey: 'name' }));
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
