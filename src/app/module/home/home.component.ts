import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PokemonListComponent } from '../pokemons/pokemon-list/pokemon-list.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        PokemonListComponent,
        HttpClientModule,
    ]
})
export class HomeComponent {}
