import { BusinessOwnerDetailsActionTypes } from '../actions/types/';

export const initialBusinessOwnerDetailsState = {
    ownerId: '',
    registrationId: '',
    recomendationDoc: '',
    affiliateDoc: '',
    documentRequest: '',
};
export function businessOwnerDetailsReducer(state: any = initialBusinessOwnerDetailsState, action: any): any {
    switch (action.type) {
        case BusinessOwnerDetailsActionTypes.UPLOAD_DOCUMENT_REQUEST:
            return {
                ...state,
                documentRequest: action.payload,
            };

        case BusinessOwnerDetailsActionTypes.SET_OWNER_DOCUMENTID:
            return {
                ...state,
                ownerId: action.payload,
            };
        case BusinessOwnerDetailsActionTypes.SET_REGISTRATION_DOCUMENTID:
            return {
                ...state,
                registrationId: action.payload,
            };
        case BusinessOwnerDetailsActionTypes.SET_RECOMMENDATION_DOCUMENTID:
            return {
                ...state,
                recomendationDoc: action.payload,
            };
        case BusinessOwnerDetailsActionTypes.SET_AFFILIATION_DOCUMENTID:
            return {
                ...state,
                affiliateDoc: action.payload,
            };

        default:
            return state;
    }
}
