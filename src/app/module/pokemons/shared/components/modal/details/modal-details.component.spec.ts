import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ModalDetailsComponent } from './modal-details.component';

describe('ModalDetailsComponent', () => {
    let component: ModalDetailsComponent,
        fixture: ComponentFixture<ModalDetailsComponent>;

    const activatedRouteStub: Partial<ActivatedRoute> = {
            params: of({ id: 3 }),
            data: of({}),
        },
        modalServiceStub: Partial<NgbModal> = {
            open: jest.fn().mockReturnValue({
                componentInstance: {},
                result: new Promise((resolve) => resolve(true))
            } as NgbModalRef),
        };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ModalDetailsComponent,
            ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: NgbModal, useValue: modalServiceStub },
            ]
        });

        fixture = TestBed.createComponent(ModalDetailsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });
});
