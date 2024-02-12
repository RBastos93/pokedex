import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PokemonListResolver } from './module/pokemons/shared/resolvers/pokemon-list.resolver';
import { pokemonReducer } from './module/pokemons/shared/store/pokemon.reducers';
import { PokemonEffects } from './module/pokemons/shared/store/pokemon.effects';

export const appRoutes: Route[] = [
    { path: '',  pathMatch: 'full', redirectTo: '/home', },
    {
        path: 'home',
        loadComponent: () => import('./module/home/home.component').then(c => c.HomeComponent),
        resolve: { pokemons: PokemonListResolver },
        providers: [
            importProvidersFrom(
                StoreModule.forFeature('pokemon', pokemonReducer),
                EffectsModule.forFeature([PokemonEffects]),
            )
        ],
    }
];
