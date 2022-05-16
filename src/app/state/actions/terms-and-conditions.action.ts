import { Action } from '@ngrx/store';
import { termsAndConditionsTypes } from './types/terms-and-conditions.enum';

export class GetTermsAndConditionsAction implements Action {
    readonly type = termsAndConditionsTypes.GET_TERMS_AND_CONDITIONS;
    constructor(readonly payload: any) {}
}
export class GetTermsAndConditionsSuccessAction implements Action {
    readonly type = termsAndConditionsTypes.GET_TERMS_AND_CONDITIONS_SUCCESS;
    constructor(readonly payload: any) {}
}
export class GetTermsAndConditionsErrorAction implements Action {
    readonly type = termsAndConditionsTypes.GET_TERMS_AND_CONDITIONS_ERROR;
    constructor(readonly payload: any) {}
}
