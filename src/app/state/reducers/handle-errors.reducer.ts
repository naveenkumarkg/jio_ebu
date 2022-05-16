import { AccountActionTypes, OtpActionTypes } from '../actions/types';

export interface HandleErrorsStateInterface {
    account: {};
    sendOtp: {};
    validateOtp: {};
}

export const initialHandleErrorsState = {
    account: {
        message: '',
    },
    sendOtp: {
        message: '',
    },
    validateOtp: {
        message: '',
    },
};

export function handleErrorsAppReducer(
    state: HandleErrorsStateInterface = initialHandleErrorsState,
    action: any
): HandleErrorsStateInterface {
    let error: string;
    switch (action.type) {
        case OtpActionTypes.SEND_OTP_ERROR:
            error = action.payload.error ? action.payload.error.error : action.payload;
            return {
                ...state,
                sendOtp: error,
            };
        case OtpActionTypes.VALIDATE_OTP_ERROR:
            error = action.payload.error ? action.payload.error.error : action.payload;
            return {
                ...state,
                validateOtp: error,
            };
        case AccountActionTypes.RETRIEVE_ACCOUNT_DETAILS_ERROR:
            error = action.payload.error ? action?.payload?.error?.error : action.payload;
            return {
                ...state,
                account: error,
            };
        default:
            return state;
    }
}
