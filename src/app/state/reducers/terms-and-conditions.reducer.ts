import { termsAndConditionsTypes } from '../actions/types/terms-and-conditions.enum';

export const initialTermsState = {
    terms: null,
};

export function termsAndConditionsReducer(state: any = initialTermsState, action: any): any {
    switch (action.type) {
        case termsAndConditionsTypes.GET_TERMS_AND_CONDITIONS_SUCCESS:
            return {
                ...state,
                terms: action.payload,
            };
        case termsAndConditionsTypes.GET_TERMS_AND_CONDITIONS_ERROR:
            return {
                ...state,
                terms: action.payload,
            };
        default:
            return state;
    }
}
