interface Pokemon {
    name: string;
    url: string;
}

interface ResponsePokemon {
    count: number;
    next: string;
    previous: string | null;
    results: Pokemon[];
}

interface Ability {
    ability: {
        name: string;
        url: string;
    };
}

interface Type {
    type: {
        name: string;
        url: string;
    };
}
interface PokemonDetails extends Pokemon {
    height: number;
    weight: number;
    abilities: Ability[];
    types: Type[];
    imageUrl?: string;
}

export {
    Pokemon,
    ResponsePokemon,
    PokemonDetails,
}
