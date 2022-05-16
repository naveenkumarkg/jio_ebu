import { LoadMasterAccounts } from '../actions/master-account-details.action';
import { MasterAccountTypes } from '../actions/types';

export const initialMasterAccountState = {
    accounts: null,
};

export function MasterAccountReducer(state: any = initialMasterAccountState, action: LoadMasterAccounts): any {
    switch (action.type) {
        case MasterAccountTypes.LOAD_MASTER_ACCOUNTS_SUCCESS:
            return {
                ...state,
                accounts: action.payload,
            };
        case MasterAccountTypes.LOAD_MASTER_ACCOUNTS_ERROR:
            return {
                ...state,
                accounts: action.payload,
            };
        default:
            return state;
    }
}
