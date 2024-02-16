import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Pokemon } from '../shared/interfaces/pokemon.model';
import { PokemonService } from '../shared/services/pokemon.service';
import { favoritePokemon, removeComment } from '../shared/store';
import { ModalAddCommentComponent } from '../shared/components/modal/add-comment/modal-add-comment.component';

@Component({
    selector: 'pk-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class PokemonComponent implements OnInit {
    @Input() pokemon: Pokemon;
    pokemonId: number;
    currentDialog: NgbModalRef;

    constructor(
        private pokemonService: PokemonService,
        private store: Store<{ pokemons: Pokemon[]}>,
        private modalService: NgbModal,
    ) {}

    ngOnInit(): void {
        this.pokemonId = this.getPokemonId();
    }

    getPokemonId(): number {
        return parseInt(this.pokemon.url.split('/')[6]);
    }

    getImage(): string {
        return this.pokemonService.getImageOfPokemon(this.pokemonId);
    }

    favoritePokemon() {
        this.store.dispatch(favoritePokemon({ pokemon: { ...this.pokemon, isFavorite: !this.pokemon.isFavorite } }));
    }

    removeComment() {
        this.store.dispatch(removeComment({ pokemon: { ...this.pokemon, comment: '' } }));
    }

    openModalAddComment() {
        this.currentDialog = this.modalService.open(ModalAddCommentComponent, { centered: true });
        this.currentDialog.componentInstance.pokemon = this.pokemon;
        this.currentDialog.componentInstance.pokemonId = this.pokemonId;
    }
}
