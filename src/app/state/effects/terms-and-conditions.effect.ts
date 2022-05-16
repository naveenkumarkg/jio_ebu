import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Terms } from 'src/app/shared/model/terms.model';
import { TermsService } from 'src/app/shared/services/terms-and-conditions.service';
import { environment } from '../../../environments/environment';
import {
    GetTermsAndConditionsAction,
    GetTermsAndConditionsErrorAction,
    GetTermsAndConditionsSuccessAction,
} from '../actions/terms-and-conditions.action';
import { termsAndConditionsTypes } from '../actions/types/terms-and-conditions.enum';
import { loadTransectionIDSelector } from '../selectors';
@Injectable()
export class TermsEffect {
    getTermsAndConditionsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType<GetTermsAndConditionsAction>(termsAndConditionsTypes.GET_TERMS_AND_CONDITIONS),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(loadTransectionIDSelector)))),
            mergeMap(([action, { transactionId }]) => {
                const req = new Terms(transactionId, environment.SOURCE_IDENTIFIER, action.payload);
                return this.termsService.getTermsAndConditions(req).pipe(
                    map(response => {
                        return new GetTermsAndConditionsSuccessAction(response);
                    }),
                    catchError(error => of(new GetTermsAndConditionsErrorAction(error)))
                );
            })
        )
    );

    constructor(private actions$: Actions, private termsService: TermsService, private store: Store<any>) {}
}
