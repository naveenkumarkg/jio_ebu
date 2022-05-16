import { NavigationActionTypes } from '../actions/types';

export const initialFooterState = {
    header: null,
    footer: null,
};

export function navigationReducer(state: any = initialFooterState, action: any): any {
    switch (action.type) {
        case NavigationActionTypes.LOAD_HEADER_SUCCESS:
            return {
                ...state,
                header: action.payload,
            };
        case NavigationActionTypes.LOAD_FOOTER_SUCCESS:
            return {
                ...state,
                footer: action.payload,
            };
        default:
            return state;
    }
}
