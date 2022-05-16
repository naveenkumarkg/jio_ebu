import { SetHeaderActionSuccess, SetHeaderActionError, SetFooterActionSuccess, SetFooterActionError } from '../../../state/actions';
import { navigationReducer, initialFooterState } from '../../../state/reducers';

describe('Header and footer actions', () => {
    describe('SetHeaderActionSuccess', () => {
        it('should set header actions in the store', () => {
            const action = new SetHeaderActionSuccess(null);
            const state = navigationReducer(initialFooterState, action);
            expect(state.header).toEqual(null);
        });
    });

    describe('SetHeaderActionError', () => {
        it('should set header actions in the store', () => {
            const action = new SetHeaderActionError(null);
            const state = navigationReducer(initialFooterState, action);
            expect(state).toEqual(initialFooterState);
        });
    });

    describe('SetFooterActionSuccess', () => {
        it('should set footer actions in the store', () => {
            const action = new SetFooterActionSuccess(null);
            const state = navigationReducer(initialFooterState, action);
            expect(state.footer).toEqual(null);
        });
    });

    describe('SetFooterActionError', () => {
        it('should get footer actions in the store', () => {
            const action = new SetFooterActionError(null);
            const state = navigationReducer(initialFooterState, action);
            expect(state).toEqual(initialFooterState);
        });
    });
});
