import { Pokemon } from '../interfaces/pokemon.model';

export interface IPokemonState {
    pokemons: Pokemon[];
    isLoading: boolean;
}
