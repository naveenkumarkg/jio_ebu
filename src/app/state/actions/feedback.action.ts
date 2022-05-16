import { Action } from '@ngrx/store';
import { FeedbackActionTypes } from './types/feedback.enum';

export class SetFeedbackAction implements Action {
    readonly type = FeedbackActionTypes.SET_FEEDBACK;
    constructor(readonly payload: any) {}
}

export class SetFeedbackSuccessAction implements Action {
    readonly type = FeedbackActionTypes.SET_FEEDBACK_SUCCESS;
    constructor(readonly payload: any) {}
}

export class SetFeedbackErrorAction implements Action {
    readonly type = FeedbackActionTypes.SET_FEEDBACK_ERROR;
    constructor(readonly payload: any) {}
}

export type FeedbackAction = SetFeedbackAction | SetFeedbackSuccessAction | SetFeedbackErrorAction;
