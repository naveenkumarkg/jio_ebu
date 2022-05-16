import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { CloseModalAction } from 'src/app/state/actions';

@Component({
    selector: 'mtn-cookie-modal',
    templateUrl: './cookie-modal.component.html',
    styleUrls: ['./cookie-modal.component.scss'],
})
export class CookieModalComponent implements OnInit {
    constructor(private store: Store<any>) {}

    ngOnInit(): void {
        //  this.titleService.setTitle('Contract Upgrade - Cookie Banner - MTN South Africa');
    }

    closeModal(): void {
        this.store.dispatch(new CloseModalAction('cookie'));
    }
}
