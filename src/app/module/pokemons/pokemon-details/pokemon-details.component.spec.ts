import { ComponentFixture, TestBed } from '@angular/core/testing';

import { faker } from '@faker-js/faker';

import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonDetailsComponent } from './pokemon-details.component';

describe('PokemonDetails', () => {
    let component: PokemonDetailsComponent,
        fixture: ComponentFixture<PokemonDetailsComponent>;

    const pokemonServiceStub: Partial<PokemonService> = {
        getImageOfPokemon: () => 'image-url',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                PokemonDetailsComponent,
            ],
            providers: [
                { provide: PokemonService, useValue: pokemonServiceStub },
            ]
        });

        fixture = TestBed.createComponent(PokemonDetailsComponent);
        component = fixture.componentInstance;

        component.pokemonDetails = {
            name: faker.person.firstName(),
            height: faker.number.int(),
            weight: faker.number.int(),
            abilities: [],
            types: [],
            url: faker.internet.url(),
        };

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('#getImage should return the url of the pokemon image', () => {
        jest.spyOn(pokemonServiceStub, 'getImageOfPokemon');

        const imageUrl = component.getImage();
        fixture.detectChanges();

        expect(imageUrl).toEqual('image-url');
        expect(pokemonServiceStub.getImageOfPokemon).toHaveBeenCalled();
    });
});
