import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

export const PokemonDetaisResolver: ResolveFn<any> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any => {
        return inject(PokemonService).getPokemonDetails(route.params['id']);
    };
