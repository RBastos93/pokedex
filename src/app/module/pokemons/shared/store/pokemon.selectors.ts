import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IPokemonState } from './pokemon.model';

export const selectPokemonState = createFeatureSelector<IPokemonState>('pokemon');
export const selectPokemonList = createSelector(selectPokemonState, ({ pokemons }) => pokemons);
export const selectPokemonIsLoading = createSelector(selectPokemonState, ({ isLoading }) => isLoading);
export const selectCountPokemon = createSelector(selectPokemonState, ({ count }) => count);
