import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'pk-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class TestComponent {
    obj = {name: ['1'], title: 'title'};
}
