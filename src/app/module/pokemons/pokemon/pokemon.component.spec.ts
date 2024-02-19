import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '../shared/services/pokemon.service';
import { faker } from '@faker-js/faker';
import { PokemonComponent } from './pokemon.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

describe('PokemonComponent', () => {
    let component: PokemonComponent,
        fixture: ComponentFixture<PokemonComponent>,
        store: MockStore;

    const pokemonServiceStub: Partial<PokemonService> = {
            getImageOfPokemon: () => 'image-url',
        },
        modalServiceStub: Partial<NgbModal> = {
            open: jest.fn().mockReturnValue({
                componentInstance: {},
            } as NgbModalRef),
        };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                PokemonComponent,
            ],
            providers: [
                { provide: PokemonService, useValue: pokemonServiceStub },
                { provide: NgbModal, useValue: modalServiceStub },
                { provide: ActivatedRoute, useValue: {} },
                provideMockStore({}),
            ]
        });

        fixture = TestBed.createComponent(PokemonComponent);
        component = fixture.componentInstance;

        store = TestBed.inject(MockStore);

        component.pokemon = {
            name: faker.person.firstName(),
            url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        };

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('#getPokemoId should return the id of pokemon', () => {
        const id = component.getPokemonId();
        fixture.detectChanges();

        expect(id).toEqual(component.pokemonId);
    });

    it('#getImage should return the url of the pokemon image', () => {
        jest.spyOn(pokemonServiceStub, 'getImageOfPokemon');

        const imageUrl = component.getImage();
        fixture.detectChanges();

        expect(imageUrl).toEqual('image-url');
        expect(pokemonServiceStub.getImageOfPokemon).toHaveBeenCalled();
    });

    it('#favoritePokemon should dispatch the favorite pokemon', () => {
        jest.spyOn(store, 'dispatch');

        component.favoritePokemon();
        fixture.detectChanges();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('#removeComment should dispatch event to remove comment', () => {
        jest.spyOn(store, 'dispatch');

        component.removeComment();
        fixture.detectChanges();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('#openModalAddComment should open the modal of add comment', () => {
        component.openModalAddComment();
        fixture.detectChanges();

        expect(modalServiceStub.open).toHaveBeenCalledTimes(1);
        expect(component.currentDialog.componentInstance.pokemon).toEqual(component.pokemon);
        expect(component.currentDialog.componentInstance.pokemonId).toEqual(component.pokemonId);
    });
});
