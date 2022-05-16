import { SignUpActionTypes } from './types';
import { Action } from '@ngrx/store';

export class SetSignUpAction implements Action {
    readonly type = SignUpActionTypes.SIGN_UP;
    constructor(readonly payload: any) {}
}

export class SetSignUpActionSuccess implements Action {
    readonly type = SignUpActionTypes.SIGN_UP_SUCCESS;
    constructor(readonly payload: any) {}
}

export class SetSignUpActionError implements Action {
    readonly type = SignUpActionTypes.SIGN_UP_ERROR;
    constructor(readonly payload: any) {}
}

export class SetSignUpNumber implements Action {
    readonly type = SignUpActionTypes.SET_SIGN_UP_NUMBER;
    constructor(readonly payload: any) {}
}

export class SetSignUpRetries implements Action {
    readonly type = SignUpActionTypes.SET_SIGN_UP_RETRIES;
    constructor(readonly payload: number) {}
}
