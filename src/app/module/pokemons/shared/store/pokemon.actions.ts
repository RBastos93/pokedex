import { createAction, props } from '@ngrx/store';

import { Pokemon } from '../interfaces/pokemon.model';

const prefix = '[Pokemon Component]';

export const getPokemons = createAction(`${prefix} Get pokemons`);

export const getPokemonsSuccess = createAction(`${getPokemons.type} Success`, props<{ pokemons: Pokemon[] }>());

export const addComment = createAction(`${prefix} Add comment in pokemon`);

export const addCommentSuccess = createAction(`${addComment.type} Success`, props<{ pokemon: Partial<Pokemon> }>());
