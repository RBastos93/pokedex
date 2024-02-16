import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { getPokemons } from '../store';

export const PokemonListResolver: ResolveFn<any> = (): void => inject(Store).dispatch(getPokemons({}));
