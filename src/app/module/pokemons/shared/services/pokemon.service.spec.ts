import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take } from 'rxjs';

import { provideMockStore } from '@ngrx/store/testing';

import { PokemonDetails, ResponsePokemon } from '../interfaces/pokemon.model';
import { PokemonService } from './pokemon.service';
import { enviroment } from 'src/environments/environment';

describe('PokemonService', () => {
    let pokemonService: PokemonService,
        httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                PokemonService,
                provideMockStore({}),
            ]
        });

        pokemonService = TestBed.inject(PokemonService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should create the service', () => {
        expect(pokemonService).toBeDefined();
    });

    it('#getPokemons should return the list of pokemons', (done) => {
        pokemonService.getPokemons()
            .pipe(take(1))
            .subscribe({
                next: ({ count, results }: ResponsePokemon) => {
                    expect(count).toEqual(150);
                    expect(results.length).toBeGreaterThan(0);

                    done();
                },
                error: done.fail,
            });

        httpTestingController.expectOne({
            method: 'GET',
            url: `${enviroment.BASE_URL}/pokemon?offset=0&limit=10`,

        }).flush({ count: 150, results: [{}] });
    });

    it('#getPokemonDetails should return the pokemon details', (done) => {
        pokemonService.getPokemonDetails(1)
            .pipe(take(1))
            .subscribe({
                next: (pokemonDetails: PokemonDetails) => {
                    expect(pokemonDetails.height).toEqual(10);
                    expect(pokemonDetails.weight).toEqual(5);

                    done();
                },
                error: done.fail,
            });

        httpTestingController.expectOne({
            method: 'GET',
            url: `${enviroment.BASE_URL}/pokemon/1`,

        })
        .flush(
            {
                height: 10,
                weight: 5,
                abilities: [],
                types: [],
                imageUrl: 'url',
            }
        );
    });

    it('#getImageOfPokemon should return the image url', () => {
        expect(pokemonService.getImageOfPokemon(1))
            .toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png')
    });
});
