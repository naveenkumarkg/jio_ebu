import { SignUpActionTypes } from '../actions/types';

export const initialSignUpState = {
    signUpDetails: null,
    setSignUpNumber: '',
    signupRetries: 0,
};

export function signUpReducer(state: any = initialSignUpState, action: any): any {
    switch (action.type) {
        case SignUpActionTypes.SIGN_UP:
            return {
                ...state,
                signUpDetails: action.payload,
            };
        case SignUpActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpDetails: action.payload,
            };
        case SignUpActionTypes.SIGN_UP_ERROR:
            return {
                ...state,
                signUpDetails: action.payload,
            };
        case SignUpActionTypes.SET_SIGN_UP_NUMBER:
            return {
                ...state,
                setSignUpNumber: action.payload,
            };
        case SignUpActionTypes.SET_SIGN_UP_RETRIES:
            return {
                ...state,
                signupRetries: action.payload,
            };
        default:
            return state;
    }
}
