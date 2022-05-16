import { BusinessFormAction } from '../actions';
import { BusinessFormActionTypes } from '../actions/types';

export const initialBusinessState = {
    businessForm: null,
    successData: null,
    errorData: null,
};

export function businessFormReducer(state: any = initialBusinessState, action: BusinessFormAction): any {
    switch (action.type) {
        case BusinessFormActionTypes.SET_BUSINESS_FORM:
            return {
                ...state,
                businessForm: action.payload,
            };
        case BusinessFormActionTypes.SUBMIT_BUSINESS_SUCCESS:
            return {
                ...state,
                successData: action.payload,
            };
        case BusinessFormActionTypes.SUBMIT_BUSINESS_ERROR:
            return {
                ...state,
                errorData: action.payload,
            };
        default:
            return state;
    }
}
