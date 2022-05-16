import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { agentRoute } from 'src/app/shared';
import { CloseModalAction } from './../../../state/actions';

@Component({
    selector: 'mtn-submission-failure',
    templateUrl: './submission-failure.component.html',
})
export class SubmissionFailureComponent implements OnInit {
    constructor(private store: Store<any>, private router: Router) {}

    ngOnInit(): void {}

    moveToAgent(): void {
        this.router.navigate([agentRoute]);
        this.store.dispatch(new CloseModalAction('api-failed'));
    }

    closeModal(): void {
        this.store.dispatch(new CloseModalAction('api-failed'));
    }
}
