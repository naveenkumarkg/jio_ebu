import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InitialActionTypes } from '../actions/types/initial.enum';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavigationService } from '../../shared';
import { SetFooterActionError, SetFooterActionSuccess, SetHeaderActionError, SetHeaderActionSuccess } from '../actions';
import { Store } from '@ngrx/store';
import { getTransactionIDSelector } from '../selectors';
import { Navigation } from 'src/app/shared/model';
import { environment } from 'src/environments/environment';
import { TransactionIDActionTypes } from '../actions/types';

@Injectable()
export class NavigationEffect {
    getHeader$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TransactionIDActionTypes.LOAD_SUCCESS),
            withLatestFrom(this.store.select(getTransactionIDSelector)),
            switchMap(([, transactionId]) => {
                const req = new Navigation(environment.SOURCE_IDENTIFIER, transactionId, 'sso-header');
                return this.navigationService.getNavigationRest(req).pipe(
                    map(response => {
                        window.scroll(0, 0);
                        return new SetHeaderActionSuccess(response);
                    }),
                    catchError(error => of(new SetHeaderActionError(error)))
                );
            })
        )
    );

    getFooter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TransactionIDActionTypes.LOAD_SUCCESS),
            withLatestFrom(this.store.select(getTransactionIDSelector)),
            switchMap(([, transactionId]) => {
                const req = new Navigation(
                    environment.SOURCE_IDENTIFIER,
                    transactionId ? transactionId : environment.SOURCE_IDENTIFIER,
                    'sso-footer'
                );
                return this.navigationService.getNavigationRest(req).pipe(
                    map(response => {
                        window.scroll(0, 0);
                        return new SetFooterActionSuccess(response);
                    }),
                    catchError(error => of(new SetFooterActionError(error)))
                );
            })
        )
    );

    constructor(private actions$: Actions, private navigationService: NavigationService, private store: Store<any>) {}
}
