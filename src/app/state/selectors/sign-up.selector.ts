import { createSelector } from '@ngrx/store';
import { getTransactionIDSelector } from './transaction-id.selector';

export const getSignUpSelector = (state: any) => state.signUp.signUpDetails;
export const getSignUpNumber = (state: any) => state.signUp.setSignUpNumber;
export const getMasterAccountSelector = (state: any) => state.masterAccount.accounts;
export const getSignUpRetriesSelector = (state: any) => state.signUp.signupRetries;

export const getSignupNumberAndTransectionIdSelector = createSelector(
    getSignUpNumber,
    getSignUpRetriesSelector,
    getTransactionIDSelector,
    (signUpNumber: string, signUpRetries: number, transactionId: string) => {
        return {
            signUpNumber,
            signUpRetries,
            transactionId,
        };
    }
);

export const getSignUpRetriesAndTransectionIdSelector = createSelector(
    getSignUpRetriesSelector,
    getTransactionIDSelector,
    (signUpRetries: number, transactionId: string) => {
        return {
            signUpRetries,
            transactionId,
        };
    }
);
