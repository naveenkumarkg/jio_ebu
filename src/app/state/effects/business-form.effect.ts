import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Business, DocumentRefs, UserDetails } from '../../shared/model';
import { environment } from 'src/environments/environment';
import { BusinessFormService } from '../../shared/services/business-form.service';
import { BusinessFormActionTypes, BusinessOwnerDetailsActionTypes } from '../actions/types';
import { loadBusinessInformationSelector } from '../selectors';
import { LoadTransactionIDSuccess, OpenModalAction, SubmitBusinessErrorAction, SubmitBusinessSuccessAction } from '../actions';
import { dashboardDefaultRoute, TransactionIdGenerator } from 'src/app/shared';
import { Router } from '@angular/router';

@Injectable()
export class BusinessFormEffect {
    submitBusinessData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessFormActionTypes.SUBMIT_BUSINESS_FORM),
            withLatestFrom(this.store.select(loadBusinessInformationSelector)),
            mergeMap(([, { transactionId, workTitle, accountDetails, personalDetails, businessDetails, agentInfo }]) => {
                const userDetails = new UserDetails(
                    personalDetails?.customerName ?? '',
                    personalDetails?.customerSurname ?? '',
                    accountDetails,
                    workTitle === 'Employee' ? workTitle : 'BusinessOwner',
                    businessDetails?.businessName,
                    personalDetails?.idType ?? '',
                    personalDetails?.idNumber ?? '',
                    businessDetails?.isCustomerLinkToPrimary,
                    businessDetails?.businessReferenceNumber ?? '',
                    businessDetails?.termsAndConditions,
                    agentInfo?.channelName ?? '',
                    businessDetails?.businessValidationDocument,
                    businessDetails?.customerIdDocument,
                    businessDetails?.businessSupportingDocuments,
                    businessDetails?.accountIdentifier ?? '',
                    agentInfo?.brcAgentNumber ?? '',
                    agentInfo?.informalAgentNumber ?? ''
                );
                const business = new Business(transactionId, environment.SOURCE_IDENTIFIER, userDetails);

                return this.businessFormService.submitBusinessDetails(business).pipe(
                    map(response => {
                        if (!response.statusCode) {
                            this.router.navigate([dashboardDefaultRoute, 'application-success']);
                            this.store.dispatch(new LoadTransactionIDSuccess(TransactionIdGenerator.generateTransactionId()));
                            return new SubmitBusinessSuccessAction(response);
                        }
                        this.store.dispatch(new OpenModalAction('api-failed'));
                        return new SubmitBusinessErrorAction(response);
                    }),
                    catchError(error => {
                        this.store.dispatch(new OpenModalAction('api-failed'));
                        return of(new SubmitBusinessErrorAction(error));
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private businessFormService: BusinessFormService,
        private store: Store<any>
    ) {}
}
