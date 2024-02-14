import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { PokemonDetailsComponent } from 'src/app/module/pokemons/pokemon-details/pokemon-details.component';

@Component({
    selector: 'pk-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class ModalComponent implements OnDestroy {
    destroy = new Subject<any>();
    currentDialog!: NgbModalRef;

    constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute, router: Router, private location: Location) {
        this.activatedRoute.params.pipe(
            takeUntil(this.destroy)
        ).subscribe((params) => {
            this.currentDialog = this.modalService.open(PokemonDetailsComponent, { centered: true });
            this.currentDialog.componentInstance.pokemonId = params['id'];

            this.activatedRoute.data.subscribe(
                ({ pokemonDetails }) => this.currentDialog.componentInstance.pokemonDetails = pokemonDetails
            )

            this.currentDialog.result.then(
                () => this.location.back(),
                () => this.location.back(),
            );
        });
    }

    ngOnDestroy(): void {
        this.destroy.next(undefined);
    }
}
