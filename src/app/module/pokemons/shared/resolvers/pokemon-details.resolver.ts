import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { PokemonService } from '../services/pokemon.service';
import { PokemonDetails } from '../interfaces/pokemon.model';

export const PokemonDetailsResolver: ResolveFn<PokemonDetails> = (route: ActivatedRouteSnapshot): Observable<PokemonDetails> => inject(PokemonService).getPokemonDetails(route.params['id']);
