import { personalDetailsTypes } from '../actions/types';

export const initialPersonalDetailsState = {
    personalDetails: null,
};

export function PersonalDetailsReducer(state: any = initialPersonalDetailsState, action: any): any {
    switch (action.type) {
        case personalDetailsTypes.SET_PERSONAL_DETAILS:
            return {
                ...state,
                personalDetails: action.payload,
            };
        default:
            return state;
    }
}
