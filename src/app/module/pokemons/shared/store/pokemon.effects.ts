import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import * as pokemonActions from './index';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces/pokemon.model';

@Injectable()
export class PokemonEffects {
    constructor(private readonly actions$: Actions, private readonly pokemonService: PokemonService) {}

    getPokemons$ = createEffect(
        () => this.actions$.pipe(
            ofType(pokemonActions.getPokemons.type),
            switchMap(() => this.pokemonService.getPokemons()),
            map((pokemons: Pokemon[]) => pokemonActions.getPokemonsSuccess({pokemons})),
        )
    );
}
