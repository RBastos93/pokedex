import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { PokemonDetailsComponent } from 'src/app/module/pokemons/pokemon-details/pokemon-details.component';

@Component({
    selector: 'pk-modal',
    templateUrl: './modal-details.component.html',
    styleUrls: ['./modal-details.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class ModalDetailsComponent implements OnInit, OnDestroy {
    destroy: Subject<unknown> = new Subject<unknown>();
    currentDialog: NgbModalRef;

    constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute, router: Router, private location: Location) { }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(
            takeUntil(this.destroy)
        ).subscribe((params) => {
            this.currentDialog = this.modalService.open(PokemonDetailsComponent, { centered: true });
            this.currentDialog.componentInstance.pokemonId = params['id'];

            this.activatedRoute.data.subscribe(
                ({ pokemonDetails }) => {
                    this.currentDialog.componentInstance.pokemonDetails = pokemonDetails
                }
            );

            this.currentDialog.result.then(
                () => this.location.back(),
                () => this.location.back(),
            );
        });
    }

    ngOnDestroy(): void {
        this.destroy.unsubscribe();
    }
}
