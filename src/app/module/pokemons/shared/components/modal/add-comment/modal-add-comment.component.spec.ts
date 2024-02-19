import { ComponentFixture, TestBed } from '@angular/core/testing';

import { faker } from '@faker-js/faker';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PokemonService } from '../../../services/pokemon.service';
import { ModalAddCommentComponent } from './modal-add-comment.component';
import { Pokemon } from '../../../interfaces/pokemon.model';

describe('ModalAddComment', () => {
    let component: ModalAddCommentComponent,
        fixture: ComponentFixture<ModalAddCommentComponent>,
        store: MockStore;

    const pokemonServiceStub: Partial<PokemonService> = {
            getImageOfPokemon: jest.fn().mockReturnValue('image-url'),
        },
        ngbModalStub: Partial<NgbModal> = {
            dismissAll: jest.fn(),
        },
        pokemonMock: Pokemon = {
            name: faker.person.firstName(),
            url: faker.internet.url(),
        };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ModalAddCommentComponent,
            ],
            providers: [
                { provide: PokemonService, useValue: pokemonServiceStub },
                { provide: NgbModal, useValue: ngbModalStub },
                provideMockStore({}),
            ]
        });

        fixture = TestBed.createComponent(ModalAddCommentComponent);
        component = fixture.componentInstance;

        store = TestBed.inject(MockStore);

        component.pokemon = pokemonMock;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('#getImage should return the image url of the pokemon', () => {
        const imageUrl = component.getImage();
        fixture.detectChanges();

        expect(imageUrl).toEqual('image-url');
        expect(pokemonServiceStub.getImageOfPokemon).toHaveBeenCalled();
    });

    it('#saveComment should save the inserted comment', () => {
        jest.spyOn(store, 'dispatch');

        component.saveComment();
        fixture.detectChanges();

        expect(ngbModalStub.dismissAll).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});
