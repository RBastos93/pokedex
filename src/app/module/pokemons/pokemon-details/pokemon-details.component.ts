import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { PokemonDetails } from '../shared/interfaces/pokemon.model';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
    selector: 'pk-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['pokemon-details.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class PokemonDetailsComponent {
    @Input() pokemonId: number;
    @Input() pokemonDetails: PokemonDetails;

    constructor(private pokemonService: PokemonService) {}

    getImage() {
        return this.pokemonService.getImageOfPokemon(this.pokemonId);
    }
}
