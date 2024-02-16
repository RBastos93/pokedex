import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pk-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class PaginationComponent {
    @Input() totalItems: number;
    @Input() itemPerPage: number;
    @Input() skipPages: number = 6;
    @Output() nextPage: EventEmitter<number> = new EventEmitter<number>();
    @Output() previousPage: EventEmitter<number> = new EventEmitter<number>();
    currentPage: number = 1;
    skip: number = this.skipPages;
    back: number = 0;

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.itemPerPage);
    }

    get pages(): number[] {
        return Array.from({ length: this.totalPages}, (_, index) => index + 1);
    }

    backNumberOfPages(turnAPage?: boolean) {
        this.back -= this.skipPages;
        this.skip -= this.skipPages;
        !turnAPage && this.goToPage(this.back ? this.back : 1);
    }

    skipNumberOfPages(skipAPage?: boolean) {
        !skipAPage && this.goToPage(this.skip);
        this.back += this.skipPages;
        this.skip += this.skipPages;
    }

    goToPage(page: number) {
        this.currentPage = page;

        this.nextPage.emit(page);
    }

    next() {
        this.nextPage.emit(++this.currentPage);

        this.currentPage === this.skip && this.skipNumberOfPages(true);
    }

    previous() {
        this.previousPage.emit(--this.currentPage);

        (this.currentPage === (this.back - 1)) && this.backNumberOfPages(true);
    }
}
