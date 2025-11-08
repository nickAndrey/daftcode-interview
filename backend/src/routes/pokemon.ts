import { Router } from 'express';
import {
  getPokemonDetails,
  getPokemonList,
} from '../controllers/pokemon.controller';

export const router = Router();

router.get('/', getPokemonList);
router.get('/:name', getPokemonDetails);
