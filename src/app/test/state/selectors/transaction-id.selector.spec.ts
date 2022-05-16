import { getTransactionIDSelector } from '../../../state/selectors/index';

describe('TransactioIdSelector', () => {
    let transState;

    beforeEach(() => {
        transState = {
            transactionId: {
                transactionId: '1234',
            },
        };
    });

    it('should return transaction ID', () => {
        expect(getTransactionIDSelector(transState)).toEqual('1234');
    });
});
