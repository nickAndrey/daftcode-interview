import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const pokemonApi = process.env.POKEMON_API_URL;

const pokemonListCache = {
  data: null,
  timestamp: null,
};

const validateCache = () => {
  if (!pokemonListCache.timestamp) return false;

  const now = Date.now();
  const age = now - pokemonListCache.timestamp;

  return age < 24 * 60 * 60 * 1000; // 24h
};

async function fetchPokemonList() {
  const response = await fetch(`${pokemonApi}/pokemon?limit=2000`);
  const responseJson = await response.json();
  return {
    ...responseJson,
    results: responseJson.results.map((item) => {
      const id = item.url.split('/').filter(Boolean).pop();

      return {
        ...item,
        avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    }),
  };
}

async function fetchSinglePokemon(name) {
  const response = await fetch(`${pokemonApi}/pokemon/${name}`);
  const responseJson = await response.json();
  return responseJson;
}

app.get('/api/pokemons', async (req, res) => {
  try {
    const isCacheValid = validateCache();

    if (!isCacheValid) {
      pokemonListCache.data = await fetchPokemonList();
      pokemonListCache.timestamp = Date.now();
    }
    res.json(pokemonListCache.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch pokemons' });
  }
});

app.get('/api/pokemons/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const response = await fetchSinglePokemon(name);
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: 'Pokemon not found' });
  }
});

app.get('/', (req, res) => {
  res.send('Express backend up and maybe even running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
