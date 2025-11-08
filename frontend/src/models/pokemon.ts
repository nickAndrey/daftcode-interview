export type Pokemon = {
  name: string
  avatar: string
  sprites: {
    front_default: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
    }
  }[]
}
