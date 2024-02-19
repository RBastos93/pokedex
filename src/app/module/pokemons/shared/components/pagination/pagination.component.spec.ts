import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    let component: PaginationComponent,
        fixture: ComponentFixture<PaginationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PaginationComponent,
            ]
        });

        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should the create the component', () => {
        expect(component).toBeDefined();
    });

    it('#totalPages should add the totalPages and create the list of pages', () => {
        expect(component.totalPages).toBeNaN();
        expect(component.pages).toHaveLength(0);

        component.totalItems = 130;
        component.itemPerPage = 10;

        fixture.detectChanges();

        expect(component.totalPages).toEqual(13);
        expect(component.pages).toHaveLength(13);
    });

    it('#backNumberOfPages must return the number of 6 pages', () => {
        jest.spyOn(component, 'goToPage');

        component.back = 12;
        component.skip = 18;

        fixture.detectChanges();

        expect(component.back).toEqual(12);
        expect(component.skip).toEqual(18);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).not.toHaveBeenCalled();

        component.backNumberOfPages();
        fixture.detectChanges();

        expect(component.back).toEqual(6);
        expect(component.skip).toEqual(12);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).toHaveBeenCalledTimes(1);
        expect(component.goToPage).toHaveBeenCalledWith(6);
    });

    it('#backNumberOfPages must return the number of 1 pages if skip property equals 0', () => {
        jest.spyOn(component, 'goToPage');

        component.back = 6;
        component.skip = 12;

        fixture.detectChanges();

        expect(component.back).toEqual(6);
        expect(component.skip).toEqual(12);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).not.toHaveBeenCalled();

        component.backNumberOfPages();
        fixture.detectChanges();

        expect(component.back).toEqual(0);
        expect(component.skip).toEqual(6);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).toHaveBeenCalledTimes(1);
        expect(component.goToPage).toHaveBeenCalledWith(1);
    });


    it('#backNumberOfPages if the turnAPage parameter is true, it does not call the function goToPage', () => {
        jest.spyOn(component, 'goToPage');

        component.back = 6;
        component.skip = 12;

        fixture.detectChanges();

        expect(component.back).toEqual(6);
        expect(component.skip).toEqual(12);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).not.toHaveBeenCalled();

        component.backNumberOfPages(true);
        fixture.detectChanges();

        expect(component.back).toEqual(0);
        expect(component.skip).toEqual(6);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).toHaveBeenCalledTimes(0);
    });

    it('#skipNumberOfPages must skip the number of 6 pages', () => {
        jest.spyOn(component, 'goToPage');

        component.back = 6;
        component.skip = 12;

        fixture.detectChanges();

        expect(component.back).toEqual(6);
        expect(component.skip).toEqual(12);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).not.toHaveBeenCalled();

        component.skipNumberOfPages();
        fixture.detectChanges();

        expect(component.back).toEqual(12);
        expect(component.skip).toEqual(18);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).toHaveBeenCalledTimes(1);
    });

    it('#skipNumberOfPages if the skipAPage parameter is true, it does not call the function goToPage', () => {
        jest.spyOn(component, 'goToPage');

        component.back = 6;
        component.skip = 12;

        fixture.detectChanges();

        expect(component.back).toEqual(6);
        expect(component.skip).toEqual(12);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).not.toHaveBeenCalled();

        component.skipNumberOfPages(true);
        fixture.detectChanges();

        expect(component.back).toEqual(12);
        expect(component.skip).toEqual(18);
        expect(component.skipPages).toEqual(6);
        expect(component.goToPage).toHaveBeenCalledTimes(0);
    });

    it('#goToPage must go to selected page', () => {
        jest.spyOn(component.nextPage, 'emit');

        expect(component.currentPage).toEqual(1);
        expect(component.nextPage.emit).not.toHaveBeenCalled();

        component.goToPage(10);
        fixture.detectChanges();

        expect(component.currentPage).toEqual(10);
        expect(component.nextPage.emit).toHaveBeenCalledTimes(1);
        expect(component.nextPage.emit).toHaveBeenCalledWith(10);
    });

    it('#next should go to the next page', () => {
        jest.spyOn(component.nextPage, 'emit');

        expect(component.currentPage).toEqual(1);
        expect(component.nextPage.emit).not.toHaveBeenCalled();

        component.next();
        fixture.detectChanges();

        expect(component.currentPage).toEqual(2);
        expect(component.nextPage.emit).toHaveBeenCalledTimes(1);
        expect(component.nextPage.emit).toHaveBeenCalledWith(2);
    });

    it('#next should go to the next page and if (currentPage) is equal the (skip) call function skipNumberOfPages', () => {
        jest.spyOn(component.nextPage, 'emit');
        jest.spyOn(component, 'skipNumberOfPages');

        expect(component.currentPage).toEqual(1);
        expect(component.nextPage.emit).not.toHaveBeenCalled();

        component.skip = 2;
        component.next();
        fixture.detectChanges();

        expect(component.currentPage).toEqual(2);
        expect(component.nextPage.emit).toHaveBeenCalledTimes(1);
        expect(component.nextPage.emit).toHaveBeenCalledWith(2);
        expect(component.skipNumberOfPages).toHaveBeenCalledTimes(1);
        expect(component.skipNumberOfPages).toHaveBeenCalledWith(true);
    });

    it('#previous should return to previous page', () => {
        jest.spyOn(component.previousPage, 'emit');

        expect(component.currentPage).toEqual(1);
        expect(component.previousPage.emit).not.toHaveBeenCalled();

        component.currentPage = 2;
        component.previous();
        fixture.detectChanges();

        expect(component.currentPage).toEqual(1);
        expect(component.previousPage.emit).toHaveBeenCalledTimes(1);
        expect(component.previousPage.emit).toHaveBeenCalledWith(1);
    });

    it('#next should return to previous page and if (currentPage) is equal the (skip) call function backNumberOfPages', () => {
        jest.spyOn(component.previousPage, 'emit');
        jest.spyOn(component, 'backNumberOfPages');

        expect(component.currentPage).toEqual(1);
        expect(component.previousPage.emit).not.toHaveBeenCalled();

        component.currentPage = 2;
        component.back = 2;
        component.previous();
        fixture.detectChanges();

        expect(component.currentPage).toEqual(1);
        expect(component.previousPage.emit).toHaveBeenCalledTimes(1);
        expect(component.previousPage.emit).toHaveBeenCalledWith(1);
        expect(component.backNumberOfPages).toHaveBeenCalledTimes(1);
        expect(component.backNumberOfPages).toHaveBeenCalledWith(true);
    });
});
