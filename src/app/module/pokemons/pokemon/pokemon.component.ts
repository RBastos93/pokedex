import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../shared/interfaces/pokemon.model';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class PokemonComponent {
    @Input() pokemon!: Pokemon;
    @Input() id!: number;
}
