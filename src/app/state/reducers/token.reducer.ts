import { tokenActionTypes } from '../actions/types/token.enum';

export const initialTokenState = {
    tokenResponseData: null,
};

export function tokenReducer(state: any = initialTokenState, action: any): any {
    switch (action.type) {
        case tokenActionTypes.GET_SESSION_TOKEN:
            return {
                ...state,
                tokenResponseData: action.payload,
            };
        case tokenActionTypes.GET_SESSION_TOKEN_SUCCESS:
            return {
                ...state,
                tokenResponseData: action.payload,
            };
        case tokenActionTypes.GET_SESSION_TOKEN_ERROR:
            return {
                ...state,
                tokenResponseData: action.payload,
            };
        default:
            return state;
    }
}
