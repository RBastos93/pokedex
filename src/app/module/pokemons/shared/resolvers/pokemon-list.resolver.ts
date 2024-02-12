import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import * as pokemonActions from './../store/index';

export const PokemonListResolver: ResolveFn<any> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any => {
        return inject(Store).dispatch(pokemonActions.getPokemons());
    };
