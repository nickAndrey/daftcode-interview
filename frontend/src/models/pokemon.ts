export type Pokemon = {
  id: string
  name: string
  avatar: string
  sprites: PokemonSprites
  flavor_text_entries: { flavor_text: string; language: { name: string } }[]
  habitat: { name: string }
  shape: { name: string }
  color: { name: string }
  height: number
  weight: number
  base_experience: number
  abilities: { ability: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
}

type PokemonSprites = {
  front_default: string | null
  front_shiny: string | null
  other: {
    'official-artwork': {
      front_default: string | null
      front_shiny: string | null
    }
    dream_world: {
      front_default: string | null
    }
    home: {
      front_default: string | null
      front_shiny: string | null
    }
  }
  versions: {
    'generation-v': {
      'black-white': {
        animated: {
          front_default: string | null
          front_shiny: string | null
        }
      }
    }
  }
}
