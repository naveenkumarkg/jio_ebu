import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloseModalAction } from './../../../state/actions';

@Component({
    selector: 'mtn-sign-up-failure',
    templateUrl: './sign-up-failure.component.html',
    styleUrls: ['./sign-up-failure.component.scss'],
})
export class SignUpFailureComponent implements OnInit {
    constructor(private store: Store<any>) {}

    ngOnInit(): void {}

    closeModal(): void {
        this.store.dispatch(new CloseModalAction('signUp-failed'));
    }
}
