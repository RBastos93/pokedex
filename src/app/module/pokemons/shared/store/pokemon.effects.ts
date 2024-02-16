import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { getPokemons, getPokemonsSuccess } from './pokemon.actions';
import { PokemonService } from '../services/pokemon.service';
import { ResponsePokemon } from '../interfaces/pokemon.model';

@Injectable()
export class PokemonEffects {
    constructor(private readonly actions$: Actions, private readonly pokemonService: PokemonService) {}

    getPokemons$ = createEffect(
        () => this.actions$.pipe(
            ofType(getPokemons.type),
            switchMap(({ offset, limit }) => this.pokemonService.getPokemons(offset, limit)),
            map(({ results }: ResponsePokemon) => getPokemonsSuccess({ pokemons: results })),
        )
    );
}
