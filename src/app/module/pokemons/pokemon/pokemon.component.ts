import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../shared/interfaces/pokemon.model';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class PokemonComponent {
    @Input() pokemon: Pokemon;
    @Input() pokemonId: number;

    constructor(private pokemonService: PokemonService) {}

    getImage() {
        return this.pokemonService.getImageOfPokemon(this.pokemonId);
    }
}
