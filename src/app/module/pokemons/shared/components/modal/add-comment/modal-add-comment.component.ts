import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { addComment } from '../../../store';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../interfaces/pokemon.model';

@Component({
    selector: 'px-modal-add-comment',
    templateUrl: './modal-add-comment.component.html',
    styleUrls: ['./modal-add-comment.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class ModalAddCommentComponent {
    @Input() pokemon: Pokemon;
    @Input() pokemonId: number;
    form: FormGroup;

    constructor(
        private pokemonService: PokemonService,
        private formBuilder: FormBuilder,
        private store: Store<{ pokemons: Pokemon[] }>,
        private modalService: NgbModal,
    ) {
        this.form = this.formBuilder.group({
            comment: ['', [ Validators.required, Validators.minLength(1) ]],
        });
    }

    getImage(): string {
        return this.pokemonService.getImageOfPokemon(this.pokemonId);
    }

    saveComment() {
        this.store.dispatch(addComment({ pokemon: { ...this.pokemon, ...this.form.value } }));
        this.modalService.dismissAll();
    }
}
