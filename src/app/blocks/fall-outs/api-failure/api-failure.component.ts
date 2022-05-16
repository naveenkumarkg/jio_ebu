import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloseModalAction } from './../../../state/actions';
import { Router } from '@angular/router';
import { agentRoute } from 'src/app/shared';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
    selector: 'mtn-api-failure',
    templateUrl: './api-failure.component.html',
})
export class ApiFailureComponent implements OnInit {
    constructor(private store: Store<any>, private router: Router, private $sessionStorage: SessionStorageService) {}

    ngOnInit(): void {}

    closeModal(): void {
        this.store.dispatch(new CloseModalAction('api-failed'));
    }

    moveToAgent(): void {
        this.$sessionStorage.clear('enterprise_token');
        this.router.navigate([agentRoute]);
        this.store.dispatch(new CloseModalAction('api-failed'));
    }
}
