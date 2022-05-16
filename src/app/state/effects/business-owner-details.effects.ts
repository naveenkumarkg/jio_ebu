import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { BusinessDocument, RemoveDocument } from 'src/app/shared/model/business-document.model';
import { BusinessService } from 'src/app/shared/services/business.service';
import { DOCUMENTS_TYPES } from 'src/app/shared/util/constants/document.constants';
import { environment } from 'src/environments/environment';
import {
    SetAffiliationDocumentIdAction,
    SetOwnerDocumentIdAction,
    SetRecommendationDocumentIdAction,
    SetRegistrationDocumentIdAction,
    UploadBusinessDocumentRequestAction,
} from '../actions/business-owner-details.action';
import { BusinessOwnerDetailsActionTypes } from '../actions/types';
import { loadTransectionIDSelector } from '../selectors';

@Injectable()
export class BusinessEffect {
    uploadFileDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UploadBusinessDocumentRequestAction>(BusinessOwnerDetailsActionTypes.UPLOAD_DOCUMENT_REQUEST),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(loadTransectionIDSelector)))),
            mergeMap(([action, { transactionId }]) => {
                const req = new BusinessDocument(
                    transactionId,
                    environment.SOA_SOURCE_IDENTIFIER,
                    'MOBILE',
                    action?.payload?.documentDetails
                );

                return this.businessService.uploadDocumentDetails(req).pipe(
                    map(response => {
                        if (
                            action?.payload?.type === DOCUMENTS_TYPES.fileOwnerDocumentId ||
                            action?.payload?.type === DOCUMENTS_TYPES.filePassportDocumentId
                        ) {
                            return new SetOwnerDocumentIdAction(response);
                        }
                        if (action?.payload?.type === DOCUMENTS_TYPES.fileRegistrationDocumentId) {
                            return new SetRegistrationDocumentIdAction(response);
                        }
                        if (action?.payload?.type === DOCUMENTS_TYPES.fileAffiliationDocumentId) {
                            return new SetAffiliationDocumentIdAction(response);
                        }
                        if (action?.payload?.type === DOCUMENTS_TYPES.fileLetterDocumentId) {
                            return new SetRecommendationDocumentIdAction(response);
                        }
                    }),
                    catchError(error => {
                        if (
                            action?.payload?.type === DOCUMENTS_TYPES.fileOwnerDocumentId ||
                            action?.payload?.type === DOCUMENTS_TYPES.filePassportDocumentId
                        ) {
                            return of(new SetOwnerDocumentIdAction(error?.error));
                        }
                        if (action?.payload?.type === DOCUMENTS_TYPES.fileRegistrationDocumentId) {
                            return of(new SetRegistrationDocumentIdAction(error?.error));
                        }
                        if (action?.payload?.type === DOCUMENTS_TYPES.fileAffiliationDocumentId) {
                            return of(new SetAffiliationDocumentIdAction(error?.error));
                        }
                        if (action?.payload?.type === DOCUMENTS_TYPES.fileLetterDocumentId) {
                            return of(new SetRecommendationDocumentIdAction(error?.error));
                        }
                        if (action?.payload?.type === DOCUMENTS_TYPES.fileOwnerDocumentId) {
                            return of(new SetOwnerDocumentIdAction(error?.error));
                        }
                        return of(new SetOwnerDocumentIdAction(error));
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private businessService: BusinessService, private store: Store<any>) {}
}
