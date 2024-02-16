import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Store, select } from '@ngrx/store';

import { getPokemons, selectCountPokemon, selectPokemonList } from '../shared/store';
import { SearchComponent } from './search/search.component';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { Pokemon } from '../shared/interfaces/pokemon.model';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@Component({
    selector: 'pk-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SearchComponent,
        PokemonComponent,
        PaginationComponent,
    ],
})
export class PokemonListComponent implements OnInit {
    pokemons$: Observable<Pokemon[]>;
    countPokemon: number;
    itemPerPage: number = 10;

    constructor(private readonly store: Store<{ pokemons: [], count: number }>) {}

    ngOnInit(): void {
        this.pokemons$ = this.store.select(selectPokemonList);
        this.store.select(selectCountPokemon)
            .subscribe(count => this.countPokemon = count);
    }

    onFilter(filter: string) {
        this.pokemons$ = this.store.pipe(
            select(selectPokemonList),
            map(
                (pokemons: Pokemon[]) =>
                    pokemons.filter((pokemon: Pokemon) => new RegExp(filter).test(pokemon.name))
            ),
        );
    }

    getOffsetToRequest(page: number): { offset: number } {
        return { offset: (page * this.itemPerPage) };
    }

    nextPage(page: number) {
        this.store.dispatch(getPokemons(this.getOffsetToRequest(--page)));
    }

    previousPage(page: number) {
        this.store.dispatch(getPokemons(this.getOffsetToRequest(--page)));
    }
}
