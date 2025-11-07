import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const pokemonApi = process.env.POKEMON_API_URL;

app.get('/', (req, res) => {
  res.send('Express backend up and maybe even running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
