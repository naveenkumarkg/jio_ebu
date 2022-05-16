import { createSelector } from '@ngrx/store';
import { Documents } from 'src/app/shared/model/business-document.model';
import { getTransactionIDSelector } from './transaction-id.selector';

export const getbusinessOwnerDetailsSelector = (state: any) => state.documents?.documentRequest;
export const getOwnerIdSelector = (state: any) => state.documents?.ownerId;
export const getRegistrationIdSelector = (state: any) => state.documents?.registrationId;
export const getRecomendationDocSelector = (state: any) => state.documents?.recomendationDoc;
export const getAffiliateDocSelector = (state: any) => state.documents?.affiliateDoc;

export const loadBusinessDocumentRequestSelector = createSelector(
    getbusinessOwnerDetailsSelector,
    getTransactionIDSelector,
    (businessDocuments: Documents, transactionId: string) => {
        return {
            businessDocuments,
            transactionId,
        };
    }
);
