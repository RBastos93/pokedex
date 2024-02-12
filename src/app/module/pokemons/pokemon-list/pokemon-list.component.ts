import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as pokemonsActions from './../shared/store/index';
import { SearchComponent } from './search/search.component';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from '../shared/interfaces/pokemon.model';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SearchComponent,
        PokemonComponent,
    ],
})
export class PokemonListComponent implements OnInit {
    pokemons: any = [];
    pokemons$!: Observable<Pokemon[]>;

    constructor(private readonly store: Store) {}

    ngOnInit(): void {
        this.pokemons$ = this.store.pipe(select(pokemonsActions.selectPokemonList));
    }
}
