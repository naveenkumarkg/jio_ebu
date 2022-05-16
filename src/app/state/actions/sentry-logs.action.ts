import { Action } from '@ngrx/store';
import { SentryLogsActionTypes } from './types';

export class SubmitSentryLog implements Action {
    readonly type = SentryLogsActionTypes.SUBMIT_SENTRY_LOG;
    constructor(readonly payload: any) {}
}

export class SubmitSentryLogSuccess implements Action {
    readonly type = SentryLogsActionTypes.SUBMIT_SUCCESS;
    constructor(readonly payload: any) {}
}

export class SubmitSentryLogError implements Action {
    readonly type = SentryLogsActionTypes.SUBMIT_ERROR;
    constructor(readonly payload: any) {}
}

export type SentryLogsAction = SubmitSentryLog | SubmitSentryLogError | SubmitSentryLogSuccess;
