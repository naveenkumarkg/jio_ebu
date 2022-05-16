import { TransactionIDAction } from '../actions';
import { TransactionIDActionTypes } from '../actions/types';

export const initialSessionState = {
    transactionId: '',
};

export function transactionIDReducer(state = initialSessionState, action: TransactionIDAction): any {
    if (action.type === TransactionIDActionTypes.LOAD_SUCCESS) {
        return {
            ...state,
            transactionId: action.payload,
        };
    } else if (action.type === TransactionIDActionTypes.CLEAR_TRANSACTION_ID) {
        return {
            ...initialSessionState,
        };
    } else {
        return state;
    }
}
