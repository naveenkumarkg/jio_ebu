import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { OpenModalAction } from '../../state/actions';

@Component({
    selector: 'mtn-cookie-banner',
    templateUrl: './cookie-banner.component.html',
    styleUrls: ['./cookie-banner.component.scss'],
})
export class CookieBannerComponent implements OnInit {
    @Output()
    closeBanner: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private store: Store<any>) {}

    ngOnInit(): void {}

    openCookieModal(): void {
        this.store.dispatch(new OpenModalAction('cookie'));
    }

    bannerClose(): void {
        this.closeBanner.emit(false);
    }
}
