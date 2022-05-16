import { createSelector } from '@ngrx/store';

export const getTransactionIDSelector = (state: any) => state.transactionId.transactionId;
export const loadTransectionIDSelector = createSelector(getTransactionIDSelector, transactionId => {
    return {
        transactionId,
    };
});
