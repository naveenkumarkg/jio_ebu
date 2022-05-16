import { Component, OnInit } from '@angular/core';
import { getFooterSelector } from '../../state/selectors';
import { ActionsSubject, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { NavigationActionTypes } from 'src/app/state/actions/types';
import footer from './footer.data';

@Component({
    selector: 'mtn-custom-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
    footers: any;
    public footer = footer;

    constructor(private store: Store<any>, private actionsSubject$: ActionsSubject) {}

    ngOnInit(): void {
        this.loadFooter();
    }

    loadFooter(): void {
        this.actionsSubject$.pipe(filter(action => action.type === NavigationActionTypes.LOAD_FOOTER_SUCCESS)).subscribe(res => {
            this.store.select(getFooterSelector).subscribe(data => {
                this.footers = data !== null ? data : [];
            });
        });
    }
}
