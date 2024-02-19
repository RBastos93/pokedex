import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'pk-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})

export class SearchComponent implements OnInit {
    @Output() filter: EventEmitter<string> = new EventEmitter<string>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            filter: ['', [ Validators.required, Validators.minLength(1) ]],
        });
    }

    ngOnInit(): void {
        this.form.controls['filter'].valueChanges
            .pipe(debounceTime(500))
            .subscribe((filter: string) => this.filter.emit(filter));
    }
}
