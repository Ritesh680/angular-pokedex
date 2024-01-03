export {};
declare global {
  interface DropdownProps {
    label: string;
    value: string | number;
    disabled?: boolean;
  }

  interface GetPokemons {
    count: number;
    next: string;
    previous: null;
    results: Result[];
  }

  interface Result {
    name: string;
    url: string;
  }

  interface PokemonData {
    abilities: Ability[];
    base_experience: number;
    forms: Result[];
    height: number;
    id: number;
    name: string;
    order: number;
    sprites: Sprites;
    weight: number;
    types: Types[];
    stats: Stats[];
    moves: Moves[];
  }

  interface Moves {
    move: Result;
  }
  interface Ability {
    ability: Result;
    is_hidden: boolean;
    slot: number;
  }
  export interface Sprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: OtherSprites;
  }
  interface Types {
    slot: number;
    type: Result;
  }
  interface OtherSprites {
    dream_world: DreamWorld;
    home: Home;
    'official-artwork': OfficialArtwork;
  }
  interface DreamWorld {
    front_default: string;
    front_female: null;
  }

  interface Home {
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
  }

  interface OfficialArtwork {
    front_default: string;
    front_shiny: string;
  }
  interface Stats {
    base_stat: number;
    effort: number;
    stat: Result;
  }

  type StatType =
    | 'hp'
    | 'attack'
    | 'special-attack'
    | 'defense'
    | 'special-defense';

  interface MoveDetails {
    id: number;
    name: string;
    power: number;
  }
}
