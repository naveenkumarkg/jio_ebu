import { OtpActionTypes } from './types';
import { Action } from '@ngrx/store';

export class SendOtpAction implements Action {
    readonly type = OtpActionTypes.SEND_OTP;
    constructor() {}
}

export class SendOtpActionSuccess implements Action {
    readonly type = OtpActionTypes.SEND_OTP_SUCCESS;
    constructor(readonly payload: any) {}
}

export class ReSendOtpAction implements Action {
    readonly type = OtpActionTypes.RE_SEND_OTP;
    constructor() {}
}

export class SetOtpDestinationAction implements Action {
    readonly type = OtpActionTypes.SET_OTP_DESTINATION;
    constructor(readonly payload: any) {}
}

export class ValidateOtpAction implements Action {
    readonly type = OtpActionTypes.VALIDATE_OTP;
    constructor(readonly payload: any) {}
}

export class SendOtpActionError implements Action {
    readonly type = OtpActionTypes.SEND_OTP_ERROR;
    constructor(readonly payload: any) {}
}

export class ResendOtpActionSuccess implements Action {
    readonly type = OtpActionTypes.RESEND_OTP_SUCCESS;
    constructor(readonly payload: any) {}
}

export class ResendOtpActionError implements Action {
    readonly type = OtpActionTypes.RESEND_OTP_ERROR;
    constructor(readonly payload: any) {}
}

export class ValidateOtpActionSuccess implements Action {
    readonly type = OtpActionTypes.VALIDATE_OTP_SUCCESS;
    constructor(readonly payload: any) {}
}

export class ValidateOtpActionError implements Action {
    readonly type = OtpActionTypes.VALIDATE_OTP_ERROR;
    constructor(readonly payload: any) {}
}

export class SetOtpKeyAction implements Action {
    readonly type = OtpActionTypes.SET_OTP_KEY;
    constructor(readonly payload: any) {}
}
