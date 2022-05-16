import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SignUpActionTypes } from '../actions/types';
import { SetSignUpAction, SetSignUpActionSuccess, SetSignUpActionError, SetSignUpNumber, OpenModalAction } from '../actions';
import { SingUpInfo } from '../../shared/model';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SignUpService } from '../../shared/services/sign-up.service';
import { getSignUpRetriesAndTransectionIdSelector } from '../selectors';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable()
export class SignUpEffect {
    signUpInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType<SetSignUpAction>(SignUpActionTypes.SIGN_UP),
            withLatestFrom(this.store.select(getSignUpRetriesAndTransectionIdSelector)),
            switchMap(([action, { signUpRetries, transactionId }]) => {
                const request = new SingUpInfo(transactionId, environment.SOA_SOURCE_IDENTIFIER, action.payload);

                return this.signUpService.getSignUpDetails(request).pipe(
                    map(response => {
                        this.store.dispatch(new SetSignUpNumber(action.payload));
                        if (Number(response?.statusCode)) {
                            return new SetSignUpActionError(response);
                        }
                        if (!this.checkSubscriberType(response)) {
                            return new SetSignUpActionError(response);
                        }
                        return new SetSignUpActionSuccess(response);
                    }),
                    catchError(error => {
                        return of(new SetSignUpActionError(JSON.parse(error.error.error.message)));
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private store: Store<any>, private signUpService: SignUpService) {}

    checkSubscriberType(response): boolean {
        return response.subscriberType === 'P' && response.customerSegment === 'CBU';
    }
}
