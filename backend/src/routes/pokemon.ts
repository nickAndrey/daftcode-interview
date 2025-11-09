import { Router } from 'express';
import {
  getPokemonDetails,
  getPokemonList,
  getPopularPokemons,
} from '../controllers/pokemon.controller';

export const router = Router();

router.get('/', getPokemonList);
router.get('/popular', getPopularPokemons);
router.get('/:name', getPokemonDetails);
