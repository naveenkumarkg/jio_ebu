import { transactionIDReducer } from '../../../state/reducers/index';

describe('transactionIDReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const initState = '';
            const action = {} as any;
            const state = transactionIDReducer(undefined, action);
            expect(state.transactionId).toBe(initState);
        });
    });
});
