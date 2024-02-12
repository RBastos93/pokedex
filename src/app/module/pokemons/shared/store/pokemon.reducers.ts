import { createReducer, on } from '@ngrx/store';

import * as pokemonActions from './index';
import { IPokemonState } from './pokemon.model';

export  const initialPokemonsState: IPokemonState = {
    pokemons: [],
    isLoading: false,
};

export const pokemonReducer = createReducer<IPokemonState>(
    initialPokemonsState,
    on(pokemonActions.getPokemons, (state) => ({ ...state, isLoading: true })),
    on(pokemonActions.getPokemonsSuccess, (state, { pokemons }) => ({ ...state, isLoading: true, pokemons })),
);
