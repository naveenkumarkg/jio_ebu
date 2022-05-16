import { Action } from '@ngrx/store';
import { BusinessOwnerDetailsActionTypes } from './types/business-owner-details.enum';

export class SetOwnerDocumentIdAction implements Action {
    readonly type = BusinessOwnerDetailsActionTypes.SET_OWNER_DOCUMENTID;
    constructor(readonly payload: any) {}
}

export class SetRegistrationDocumentIdAction implements Action {
    readonly type = BusinessOwnerDetailsActionTypes.SET_REGISTRATION_DOCUMENTID;
    constructor(readonly payload: any) {}
}

export class SetRecommendationDocumentIdAction implements Action {
    readonly type = BusinessOwnerDetailsActionTypes.SET_RECOMMENDATION_DOCUMENTID;
    constructor(readonly payload: any) {}
}

export class SetAffiliationDocumentIdAction implements Action {
    readonly type = BusinessOwnerDetailsActionTypes.SET_AFFILIATION_DOCUMENTID;
    constructor(readonly payload: any) {}
}

export class UploadBusinessDocumentRequestAction implements Action {
    readonly type = BusinessOwnerDetailsActionTypes.UPLOAD_DOCUMENT_REQUEST;
    constructor(readonly payload: any) {}
}

export type BusinessAction =
    | SetOwnerDocumentIdAction
    | SetRegistrationDocumentIdAction
    | SetRecommendationDocumentIdAction
    | SetAffiliationDocumentIdAction
    | UploadBusinessDocumentRequestAction;
