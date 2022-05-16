import { Action } from '@ngrx/store';
import { tokenActionTypes } from './types/token.enum';

export class GetSessionTokenAction implements Action {
    readonly type = tokenActionTypes.GET_SESSION_TOKEN;
    constructor() {}
}
export class GetSessionTokenSuccessAction implements Action {
    readonly type = tokenActionTypes.GET_SESSION_TOKEN_SUCCESS;
    constructor(readonly payload: any) {}
}
export class GetSessionTokenErrorAction implements Action {
    readonly type = tokenActionTypes.GET_SESSION_TOKEN_ERROR;
    constructor(readonly payload: any) {}
}
