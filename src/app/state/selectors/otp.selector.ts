import { createSelector } from '@ngrx/store';
import { getTransactionIDSelector } from './transaction-id.selector';
import { getSignUpNumber } from './sign-up.selector';
export const getResendOtpSelector = (state: any) => state.otp.resendOtp;
export const getValidateOtpSelector = (state: any) => state.otp.validateOtp;
export const getOtpSelector = (state: any) => state.otp.otp;
export const getOtpSendFailure = (state: any) => state.errors.sendOtp;
export const getValidateOtpFailure = (state: any) => state.errors.validateOtp;
export const getOtpKeySelector = (state: any) => state.otp.otpKey;

export const getEmailFromAccountDetailsSelector = createSelector(
    getTransactionIDSelector,
    getSignUpNumber,
    getOtpKeySelector,
    (transactionId, accountDetails, otpKey) => {
        return {
            transactionId,
            accountDetails,
            otpKey,
        };
    }
);

export const getValidateOtpAttributesSelector = createSelector(
    getTransactionIDSelector,
    getOtpSelector,
    getOtpKeySelector,
    (transactionId, otp, otpKey) => {
        return {
            transactionId,
            otp,
            otpKey,
        };
    }
);
