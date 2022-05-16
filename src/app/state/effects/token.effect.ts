import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { chooseWorkTitle } from 'src/app/shared';
import { TokenService } from 'src/app/shared/services/token.service';
import { OpenModalAction } from '../actions';
import { GetSessionTokenSuccessAction, GetSessionTokenErrorAction } from '../actions/token.action';
import { OtpActionTypes, tokenActionTypes } from '../actions/types';
import { WorkTitleActionTypes } from '../actions/types/work-title.enum';
import { loadTransectionIDSelector } from '../selectors';
@Injectable()
export class TokenEffect {
    getSessionTokenCallback$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tokenActionTypes.GET_SESSION_TOKEN, OtpActionTypes.VALIDATE_OTP_SUCCESS),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(loadTransectionIDSelector)))),
            mergeMap(([, { transactionId }]) => {
                return this.tokenService.getSessionToken(transactionId).pipe(
                    map(response => {
                        this.router.navigate([chooseWorkTitle]);
                        return new GetSessionTokenSuccessAction(response);
                    }),
                    catchError(error => {
                        this.store.dispatch(new OpenModalAction('api-failed'));
                        return of(new GetSessionTokenErrorAction(error));
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private router: Router, private tokenService: TokenService, private store: Store<any>) {}
}
