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

export {
    Pokemon,
    ResponsePokemon,
}
