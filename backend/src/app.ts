import cors from 'cors';
import express from 'express';
import { router as pokemonRouter } from './routes/pokemon';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pokemons', pokemonRouter);
