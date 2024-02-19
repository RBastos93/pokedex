import { createReducer, on } from '@ngrx/store';

import { addComment, favoritePokemon, getCountPokemon, getPokemons, getPokemonsSuccess, removeComment  } from './pokemon.actions';
import { IPokemonState } from './pokemon.model';
import { Pokemon } from '../interfaces/pokemon.model';

export const initialPokemonsState: IPokemonState = {
    pokemons: [],
    isLoading: false,
    count: 0,
};

const pokemonIsEqual = (pokemOfArray: Pokemon, pokemon: Pokemon): boolean => (pokemOfArray.name === pokemon.name);

const mapPokemonList = (pokemon: Pokemon, pokemonOfArray: Pokemon) => (pokemonIsEqual(pokemonOfArray, pokemon)) ? pokemon : pokemonOfArray;

export const pokemonReducer = createReducer<IPokemonState>(
    initialPokemonsState,
    on(getPokemons, (state) => ({ ...state, isLoading: true })),
    on(getPokemonsSuccess, (state, { pokemons }) => ({ ...state, pokemons, isLoading: false })),
    on(getCountPokemon, (state, { count }) => ({ ...state, count })),
    on(addComment, (state, { pokemon }) => ({
        ...state,
        pokemons: state.pokemons.map(mapPokemonList.bind(this, pokemon)),
    })),
    on(removeComment, (state, { pokemon }) => ({
        ...state,
        pokemons: state.pokemons.map(mapPokemonList.bind(this, pokemon)),
    })),
    on(favoritePokemon, (state, { pokemon }) => ({
        ...state,
        pokemons: state.pokemons.map(mapPokemonList.bind(this, pokemon)),
    })),
);
