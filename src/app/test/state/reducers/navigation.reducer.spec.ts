import { navigationReducer } from '../../../state/reducers/index';

describe('navigationReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const initState = null;
            const action = {} as any;
            const state = navigationReducer(undefined, action);
            expect(state.header).toBe(initState);
        });
    });
});
