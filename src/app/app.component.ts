import { Component, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, StoreRootModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';

import { TestComponent } from './test/test.component';
import { EffectsModule } from '@ngrx/effects';
import { pokemonReducer } from './module/pokemons/shared/store/pokemon.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@Component({
    standalone: true,
    imports: [
        RouterModule,
        HttpClientModule,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'pokedex';
}
