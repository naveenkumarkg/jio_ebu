import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SetFeedbackSuccessAction, SetFeedbackErrorAction, OpenModalAction, SetFeedbackAction } from '../actions';
import { Store } from '@ngrx/store';
import { FeedbackActionTypes } from '../actions/types';
import { of } from 'rxjs';
import { withLatestFrom, concatMap, mergeMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getEmailFromAccountDetailsSelector } from '../selectors';
import { FeedbackService } from '../../shared/services/feedback.service';
import { FeedbackRequest } from 'src/app/shared/model';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class FeedbackEffect {
    feedback$ = createEffect(() =>
        this.actions$.pipe(
            ofType<SetFeedbackAction>(FeedbackActionTypes.SET_FEEDBACK),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(getEmailFromAccountDetailsSelector)))),
            mergeMap(([action, { transactionId, accountDetails }]) => {
                const date = new Date();
                const currentDate = date.toISOString().slice(0, 10);
                const currentTime = date.toString().split(' ')[4];
                const feedbackDateTime = currentDate + ' ' + currentTime;
                const feedbackRequest = new FeedbackRequest(
                    transactionId,
                    environment.SOA_SOURCE_IDENTIFIER,
                    accountDetails,
                    action?.payload?.feedback.feedbackRating + 1,
                    action?.payload?.feedback.feedbackComment,
                    feedbackDateTime,
                    [{ keyword: action?.payload?.rating }]
                );
                return this.feedbackService.sendFeedback(feedbackRequest).pipe(
                    map(response => {
                        this.$sessionStorage.clear('enterprise_token');
                        window.open('https://www.mtnbusiness.co.za/en/Pages/default.aspx', '_self');
                        return new SetFeedbackSuccessAction(response);
                    }),
                    catchError(error => {
                        this.store.dispatch(new OpenModalAction('api-failed'));
                        return of(new SetFeedbackErrorAction(error));
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private feedbackService: FeedbackService,
        private $sessionStorage: SessionStorageService
    ) {}
}
