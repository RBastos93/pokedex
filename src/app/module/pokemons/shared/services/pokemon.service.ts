import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { enviroment } from 'src/environments/environment';
import { Pokemon, PokemonDetails, ResponsePokemon } from '../interfaces/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
    BASE_URL: string = enviroment.BASE_URL;

    constructor(private http: HttpClient) {}

    getPokemons(): Observable<Pokemon[]> {
        return this.http.get<ResponsePokemon>(`${this.BASE_URL}/pokemon`)
            .pipe(
                map(({ results }: ResponsePokemon) => results),
            );
    }

    getPokemonDetails(pokemonId: number): Observable<PokemonDetails>  {
        return this.http.get<PokemonDetails>(`${this.BASE_URL}/pokemon/${pokemonId}`);
    }

    getImageOfPokemon(pokemonId: number): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
    }
}
