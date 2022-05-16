import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubmitSentryLogSuccess, SubmitSentryLogError } from '../actions';
import { SentryLogsActionTypes } from '../actions/types';
import { SentryService } from 'src/app/shared/services/sentry.service';

@Injectable()
export class SentryLogEffects {
    sentryLog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SentryLogsActionTypes.SUBMIT_SENTRY_LOG),
            mergeMap((action: any) => {
                return this.sentryService.postSentryData(action.payload).pipe(
                    map(response => {
                        return new SubmitSentryLogSuccess(response);
                    }),
                    catchError(error => of(new SubmitSentryLogError(error)))
                );
            })
        )
    );
    constructor(private actions$: Actions, private sentryService: SentryService) {}
}
