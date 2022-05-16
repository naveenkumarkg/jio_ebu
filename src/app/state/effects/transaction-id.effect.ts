import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { concatMap, mergeMap, withLatestFrom } from 'rxjs/operators';
import { LoadTransactionIDSuccess } from '../actions';
import { Store } from '@ngrx/store';
import { getTransactionIDSelector } from '../selectors';
import { TransactionIdGenerator } from '../../shared/';
import { BusinessFormActionTypes, InitialActionTypes } from '../actions/types';

@Injectable()
export class TransactionIDEffect {
    transactionID$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InitialActionTypes.LOADING_EFFECTS),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(getTransactionIDSelector)))),
            mergeMap(([, transactionId]) => {
                if (typeof transactionId !== 'undefined' && transactionId !== '') {
                    return of(new LoadTransactionIDSuccess(transactionId));
                }
                return of(new LoadTransactionIDSuccess(TransactionIdGenerator.generateTransactionId()));
            })
        )
    );

    constructor(private actions$: Actions, private store: Store<any>) {}
}
