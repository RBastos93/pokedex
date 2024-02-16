import { createAction, props } from '@ngrx/store';

import { Pokemon } from '../interfaces/pokemon.model';

const prefix = '[Pokemon Component]';

export const getPokemons = createAction(`${prefix} Get pokemons`, props<{ offset?: number; limit?: number }>());

export const getPokemonsSuccess = createAction(`${getPokemons.type} Success`, props<{ pokemons: Pokemon[] }>());

export const getCountPokemon = createAction(`${prefix} Get count pokemon`, props<{ count: number }>());

export const addComment = createAction(`${prefix} Add comment in pokemon`, props<{ pokemon: Pokemon }>());

export const removeComment = createAction(`${prefix} Remove comment in pokemon`, props<{ pokemon: Pokemon }>());

export const favoritePokemon = createAction(`${prefix} Favorite a pokemon`, props<{ pokemon: Pokemon }>());
