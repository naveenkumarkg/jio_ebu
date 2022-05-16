import { Action } from '@ngrx/store';
import { BusinessFormActionTypes } from './types';

export class SetBusinessInfoAction implements Action {
    readonly type = BusinessFormActionTypes.SET_BUSINESS_FORM;
    constructor(readonly payload: any) {}
}

export class SubmitBusinessFormAction implements Action {
    readonly type = BusinessFormActionTypes.SUBMIT_BUSINESS_FORM;
    constructor() {}
}

export class SubmitBusinessSuccessAction implements Action {
    readonly type = BusinessFormActionTypes.SUBMIT_BUSINESS_SUCCESS;
    constructor(readonly payload: any) {}
}

export class SubmitBusinessErrorAction implements Action {
    readonly type = BusinessFormActionTypes.SUBMIT_BUSINESS_ERROR;
    constructor(readonly payload: any) {}
}

export type BusinessFormAction = SetBusinessInfoAction | SubmitBusinessFormAction | SubmitBusinessSuccessAction | SubmitBusinessErrorAction;
