import { AccountNumberOtpActionTypes, EmailOtpActionTypes, OtpActionTypes, SmSOtpActionTypes } from '../actions/types';

export const initialOtpState = {
    msisdn: {
        phoneNumber: null,
    },
    accountNumber: {
        account: null,
        otpSendResult: null,
        otpValidateResult: null,
        resendResult: null,
    },
    email: {
        address: null,
        otpSendResult: null,
        otpValidateResult: null,
        resendResult: null,
    },
    destination: null,
    otp: null,
    otpKey: null,
};

export function otpReducer(state: any = initialOtpState, action: any): any {
    switch (action.type) {
        case SmSOtpActionTypes.SET_OTP:
            return {
                ...state,
                msisdn: action.payload,
            };
        case EmailOtpActionTypes.SET_OTP:
            return {
                ...state,
                email: action.payload,
            };
        case OtpActionTypes.SET_OTP_DESTINATION:
            return {
                ...state,
                destination: action.payload,
            };
        case OtpActionTypes.VALIDATE_OTP:
            return {
                ...state,
                otp: action.payload,
            };
        case OtpActionTypes.SET_OTP_KEY:
            return {
                ...state,
                otpKey: action.payload,
            };
        default:
            return state;
    }
}
