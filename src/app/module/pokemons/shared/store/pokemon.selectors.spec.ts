import { faker } from '@faker-js/faker';
import { IPokemonState } from './pokemon.model';
import { selectCountPokemon, selectPokemonIsLoading, selectPokemonList } from './pokemon.selectors';

describe('pokemonSelector', () => {
    const initialState: IPokemonState = {
        pokemons: [
            { name: faker.person.firstName(), url: faker.internet.url() },
            { name: faker.person.firstName(), url: faker.internet.url() },
        ],
        count: 2,
        isLoading: true,
    };

    it('#selectPokemonList', () => {
        const result = selectPokemonList.projector(initialState);

        expect(result).toBeDefined();
        expect(result).toHaveLength(2);
    });

    it('#selectCountPokemon', () => {
        const result = selectCountPokemon.projector(initialState);

        expect(result).toBeDefined();
        expect(result).toEqual(2);
    });

    it('#selectPokemonIsLoading', () => {
        const result = selectPokemonIsLoading.projector(initialState);

        expect(result).toBeDefined();
        expect(result).toBeTruthy();
    });
});
