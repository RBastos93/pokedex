import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockSelector, MockStore, provideMockStore } from '@ngrx/store/testing';
import { faker } from '@faker-js/faker';

import { IPokemonState } from '../shared/store/pokemon.model';
import { selectCountPokemon, selectPokemonList } from '../shared/store';
import { initialPokemonsState } from '../shared/store/pokemon.reducers';
import { Pokemon } from '../shared/interfaces/pokemon.model';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
    let component: PokemonListComponent,
        fixture: ComponentFixture<PokemonListComponent>,
        store: MockStore<IPokemonState>;

    const mockSelector: MockSelector[] = [
        {
            selector: selectCountPokemon,
            value: 105
        },
        {
            selector: selectPokemonList,
            value: [
                { name: 'name', url: faker.internet.url() },
            ],
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PokemonListComponent,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ActivatedRoute, useValue: {} },
                provideMockStore({ initialState: initialPokemonsState, selectors: mockSelector}),
            ]
        });

        fixture = TestBed.createComponent(PokemonListComponent);
        component = fixture.componentInstance;

        store = TestBed.inject(MockStore);

        store.refreshState();

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('#filter should filter the pokemon list by name', (done) => {
        component.onFilter('name');
        fixture.detectChanges();

        component.pokemons$.subscribe({
            next: (pokemons: Pokemon[]) => {
                expect(pokemons[0].name).toEqual('name');
                expect(pokemons).toHaveLength(1);

                done();
            },
            error: done.fail,
        });
    });

    it('#getOffsetToRequest should return the calculated offset to send to the endpoint', () => {
        const offset = component.getOffsetToRequest(1);
        fixture.detectChanges();

        expect(offset).toEqual({ offset: 10 });
    });

    it('#nextPage must dispatch the event to get the pokemons on the next page', () => {
        jest.spyOn(store, 'dispatch');
        jest.spyOn(component, 'getOffsetToRequest');

        component.nextPage(2);
        fixture.detectChanges();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(component.getOffsetToRequest).toHaveBeenCalledTimes(1);
        expect(component.getOffsetToRequest).toHaveBeenCalledWith(1);
    });

    it('#previousPage must dispatch the event to get the pokemons on the previous page', () => {
        jest.spyOn(store, 'dispatch');
        jest.spyOn(component, 'getOffsetToRequest');

        component.previousPage(1);
        fixture.detectChanges();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(component.getOffsetToRequest).toHaveBeenCalledTimes(1);
        expect(component.getOffsetToRequest).toHaveBeenCalledWith(0);
    });
});
