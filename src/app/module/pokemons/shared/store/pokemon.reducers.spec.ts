import { faker } from '@faker-js/faker';

import { Pokemon } from '../interfaces/pokemon.model';
import { addComment, favoritePokemon, getCountPokemon, getPokemons, getPokemonsSuccess, removeComment } from './pokemon.actions';
import { initialPokemonsState, pokemonReducer } from './pokemon.reducers';
import { IPokemonState } from './pokemon.model';

describe('pokemonReducer', () => {
    const pokemons: Pokemon[] = [
        { name: 'pikachu', url: 'url', comment: faker.lorem.paragraph() },
        { name: faker.person.firstName(), url: faker.internet.url() },
    ];

    it('unknown action', () => {
        const state = pokemonReducer(initialPokemonsState, { type: 'Unknow' });

        expect(state).toBe(initialPokemonsState);
    });

    it('#getPokemons should be looking for the list of pokemon and the property isLoading is equal true', () => {
        const state = pokemonReducer(initialPokemonsState, getPokemons);

        expect(state).toEqual({ ...initialPokemonsState, isLoading: true });
    });

    it('#getPokemonsSuccess should return a list of pokemons', () => {
        const newState: IPokemonState = {
            count: 0,
            pokemons,
            isLoading: true,
        };

        const state = pokemonReducer(initialPokemonsState, getPokemonsSuccess(newState));

        expect(state).toEqual({ ...newState, isLoading: false });
        expect(state).not.toBe(initialPokemonsState);
    });

    it('#getCountPokemon should return the count of pokemons', () => {
        const newState: IPokemonState = {
            count: 15,
            pokemons: [],
            isLoading: false
        };

        const state = pokemonReducer(initialPokemonsState, getCountPokemon(newState));

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialPokemonsState);
    });

    it('#addComment should return add comment in pokemon', () => {
        const newState: IPokemonState = {
                ...initialPokemonsState,
                pokemons
            },
            pokemon: Pokemon = {
                name: 'pikachu',
                url: 'url',
                comment: faker.lorem.paragraph(),
            };

        const state = pokemonReducer(newState, addComment({ pokemon }));

        expect(state.pokemons[0]).toEqual(pokemon);
        expect(state).not.toBe(initialPokemonsState);
        expect(state).not.toBe(newState);
    });

    it('#removeComment should return remove comment in pokemon', () => {
        const pokemon: Pokemon = {
                name: 'pikachu',
                url: 'url',
                comment: '',
            },
            newState: IPokemonState = {
                ...initialPokemonsState,
                pokemons
            };

        const state = pokemonReducer(newState, removeComment({ pokemon }));

        expect(state.pokemons[0].comment).toEqual('');
        expect(state).not.toBe(initialPokemonsState);
        expect(state).not.toBe(newState);
    });

    it('#favoritePokemon should favorite pokemon', () => {
        const pokemon: Pokemon = {
                name: 'pikachu',
                url: 'url',
                comment: '',
                isFavorite: true,
            },
            newState: IPokemonState = {
                ...initialPokemonsState,
                pokemons
            };

        const state = pokemonReducer(newState, favoritePokemon({ pokemon }));

        expect(state.pokemons[0].isFavorite).toBeTruthy();
        expect(state).not.toBe(initialPokemonsState);
        expect(state).not.toBe(newState);
    });

    it('#favoritePokemon should unfavorite pokemon', () => {
        const pokemon: Pokemon = {
                name: 'pikachu',
                url: 'url',
                comment: '',
                isFavorite: false,
            },
            newState: IPokemonState = {
                ...initialPokemonsState,
                pokemons
            };

        const state = pokemonReducer(newState, favoritePokemon({ pokemon }));

        expect(state.pokemons[0].isFavorite).toBeFalsy();
        expect(state).not.toBe(initialPokemonsState);
        expect(state).not.toBe(newState);
    });
});
