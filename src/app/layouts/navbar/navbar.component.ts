import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getHeaderSelector } from '../../state/selectors';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'mtn-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
    navItems: any;

    constructor(private store: Store<any>) {
        this.loadHeader();
    }

    ngOnInit(): void {}

    loadHeader(): Subscription {
        return this.store.select(getHeaderSelector).subscribe(data => {
            this.navItems = data !== null ? data : [];
        });
    }
}
