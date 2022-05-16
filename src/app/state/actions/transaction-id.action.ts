import { Action } from '@ngrx/store';
import { TransactionIDActionTypes } from './types';

export class LoadTransactionIDSuccess implements Action {
    readonly type = TransactionIDActionTypes.LOAD_SUCCESS;
    constructor(readonly payload: any) {}
}

export class SetTransactionID implements Action {
    readonly type = TransactionIDActionTypes.GET_TRANSACTION_ID;
}

export class ClearTransactionID implements Action {
    readonly type = TransactionIDActionTypes.CLEAR_TRANSACTION_ID;
}

export type TransactionIDAction = LoadTransactionIDSuccess | SetTransactionID | ClearTransactionID;
