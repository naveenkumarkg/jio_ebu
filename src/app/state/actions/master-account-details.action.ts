import { Action } from '@ngrx/store';
import { MasterAccountTypes } from './types';

export class LoadMasterAccountSuccessAction implements Action {
    readonly type = MasterAccountTypes.LOAD_MASTER_ACCOUNTS_SUCCESS;
    constructor(readonly payload: any) {}
}
export class LoadMasterAccountErrorAction implements Action {
    readonly type = MasterAccountTypes.LOAD_MASTER_ACCOUNTS_ERROR;
    constructor(readonly payload: any) {}
}
export type LoadMasterAccounts = LoadMasterAccountSuccessAction | LoadMasterAccountErrorAction;
