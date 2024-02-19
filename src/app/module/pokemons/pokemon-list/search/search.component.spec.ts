import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent,
        fixture: ComponentFixture<SearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SearchComponent
            ],
        });

        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeDefined();
    });

    it('#onFilter.emit should emit filter', fakeAsync(() => {
        jest.spyOn(component.onFilter, 'emit');

        component.form.controls['filter'].setValue('name');
        fixture.detectChanges();

        tick(600);

        expect(component.onFilter.emit).toHaveBeenCalledTimes(1);
        expect(component.onFilter.emit).toHaveBeenCalledWith('name');
    }));
});
