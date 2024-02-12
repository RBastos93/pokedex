import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon, ResponsePokemon } from '../interfaces/pokemon.model';

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
}
