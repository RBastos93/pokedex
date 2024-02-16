import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PokemonListResolver } from './module/pokemons/shared/resolvers/pokemon-list.resolver';
import { pokemonReducer } from './module/pokemons/shared/store/pokemon.reducers';
import { PokemonEffects } from './module/pokemons/shared/store/pokemon.effects';
import { PokemonDetailsResolver } from './module/pokemons/shared/resolvers/pokemon-details.resolver';

export const appRoutes: Route[] = [
    { path: '',  pathMatch: 'full', redirectTo: '/pokedex', },
    {
        path: 'pokedex',
        loadComponent: () => import('./module/home/home.component').then(m => m.HomeComponent),
        resolve: { pokemons: PokemonListResolver },
        providers: [
            importProvidersFrom(
                StoreModule.forFeature('pokemon', pokemonReducer),
                EffectsModule.forFeature([PokemonEffects]),
            )
        ],
        children: [
            {
                path: 'pokemon/:id',
                loadComponent: () => import('./module/pokemons/shared/components/modal/details/modal-details.component').then(m => m.ModalComponent),
                resolve: { pokemonDetails: PokemonDetailsResolver },
            },
        ]
    }
];
