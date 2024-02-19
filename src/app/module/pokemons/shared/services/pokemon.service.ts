import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Store } from '@ngrx/store';

import { enviroment } from 'src/environments/environment';
import { PokemonDetails, ResponsePokemon } from '../interfaces/pokemon.model';
import { getCountPokemon } from '../store';

@Injectable({ providedIn: 'root' })
export class PokemonService {
    BASE_URL: string = enviroment.BASE_URL;

    constructor(private http: HttpClient, private store: Store<{ count: number }>) {}

    getPokemons(offset = 0, limit = 10): Observable<ResponsePokemon> {
        return this.http.get<ResponsePokemon>(`${this.BASE_URL}/pokemon`, { params: { offset, limit } })
            .pipe(
                tap(({ count }) => this.store.dispatch(getCountPokemon({ count }))),
            );
    }

    getPokemonDetails(pokemonId: number): Observable<PokemonDetails>  {
        return this.http.get<PokemonDetails>(`${this.BASE_URL}/pokemon/${pokemonId}`);
    }

    getImageOfPokemon(pokemonId: number): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
    }
}
