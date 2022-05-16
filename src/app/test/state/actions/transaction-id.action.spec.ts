import { LoadTransactionIDSuccess, SetTransactionID, ClearTransactionID } from '../../../state/actions';
import { transactionIDReducer, initialSessionState } from '../../../state/reducers';

describe('Transaction ID actions', () => {
    describe('LoadTransactionIDSuccess', () => {
        it('should load transaction actions in the store', () => {
            const action = new LoadTransactionIDSuccess(null);
            const state = transactionIDReducer(initialSessionState, action);
            expect(state.transactionId).toEqual(null);
        });
    });

    describe('SetTransactionID', () => {
        it('should load transaction actions in the store', () => {
            const action = new SetTransactionID();
            const state = transactionIDReducer(initialSessionState, action);
            expect(state.transactionId).toEqual('');
        });
    });

    describe('ClearTransactionID', () => {
        it('should load transaction actions in the store', () => {
            const action = new ClearTransactionID();
            const state = transactionIDReducer(initialSessionState, action);
            expect(state).toEqual(initialSessionState);
        });
    });
});
