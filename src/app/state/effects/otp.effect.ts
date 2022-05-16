import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, concatMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { availableUpgradesRoute, chooseWorkTitle, loginOtpRoute, OtpService } from '../../shared';
import { SendOtpActionError, SendOtpActionSuccess, SetOtpKeyAction, ValidateOtpActionError, ValidateOtpActionSuccess } from '../actions';
import { SendOtpRequest, ValidateOtpRequest } from 'src/app/shared/model';
import {
    AccountNumberOtpActionTypes,
    EmailOtpActionTypes,
    InitialActionTypes,
    MasterAccountTypes,
    OtpActionTypes,
    SignUpActionTypes,
    SmSOtpActionTypes,
} from '../actions/types';
import { getEmailFromAccountDetailsSelector, getOtpKeySelector, getValidateOtpAttributesSelector } from '../selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class OtpEffect {
    setOtpKey$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InitialActionTypes.LOADING_EFFECTS),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(getOtpKeySelector)))),
            mergeMap(([, payload]) => {
                if (payload === null) {
                    const key = new Date().getTime().toString();
                    return of(new SetOtpKeyAction(key));
                }
            })
        )
    );

    sendOTP$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SignUpActionTypes.SIGN_UP_SUCCESS, OtpActionTypes.SEND_OTP),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(getEmailFromAccountDetailsSelector)))),
            mergeMap(([, { transactionId, accountDetails, otpKey }]) => {
                const time = new Date();
                const expiryTime = new Date(time.getTime() + 5 * 60000);
                const getExpiryMin = expiryTime.getMinutes() > 9 ? expiryTime.getMinutes() : '0' + expiryTime.getMinutes();
                const getExpiryHours = expiryTime.getHours() > 9 ? expiryTime.getHours() : '0' + expiryTime.getHours();
                const sendOTP = new SendOtpRequest(
                    transactionId,
                    environment.SOA_SOURCE_IDENTIFIER,
                    'SMS',
                    accountDetails,
                    4,
                    otpKey,
                    300,
                    {
                        messageId: 'OTP_NOTIF',
                        processId: 'OTP_GEN',
                        attributes: {
                            attributeList: {
                                name: 'OTP_EXP',
                                value: getExpiryHours + ':' + getExpiryMin,
                            },
                        },
                    }
                );
                this.router.navigate([loginOtpRoute]);
                return this.otpService.sendOtp(sendOTP).pipe(
                    map(response => {
                        return new SendOtpActionSuccess(response);
                    }),
                    catchError(error => {
                        return of(new SendOtpActionError(error));
                    })
                );
            })
        )
    );

    reSendOTP$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtpActionTypes.RE_SEND_OTP),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(getEmailFromAccountDetailsSelector)))),
            mergeMap(([, { transactionId, accountDetails, otpKey }]) => {
                const sendOTP = new SendOtpRequest(
                    transactionId,
                    environment.SOA_SOURCE_IDENTIFIER,
                    'EMAIL',
                    accountDetails?.accounts[0]?.accountEmailAddress,
                    4,
                    otpKey,
                    300,
                    {
                        messageId: 'OTP_NOTIF',
                        processId: 'OTP_GEN',
                        attributes: {
                            attributeList: {
                                name: 'name',
                                value: `${accountDetails?.accounts[0]?.accountAuthoriserFirstName} ${accountDetails?.accounts[0]?.accountAuthoriserLastName}`,
                            },
                        },
                    }
                );
                return this.otpService.reSendOtp(sendOTP).pipe(
                    map(response => {
                        if (
                            Number(response.statusCode) === 200 ||
                            Number(response.statusCode) === 205 ||
                            Number(response.statusCode) === 201 ||
                            Number(response.statusCode) === 202
                        ) {
                            return new SendOtpActionError(response);
                        }
                        return new SendOtpActionSuccess(response);
                    }),
                    catchError(error => {
                        return of(new SendOtpActionError(error));
                    })
                );
            })
        )
    );

    validateOtp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OtpActionTypes.VALIDATE_OTP),
            concatMap(action => of(action).pipe(withLatestFrom(this.store.select(getValidateOtpAttributesSelector)))),
            mergeMap(([, { transactionId, otpKey, otp }]) => {
                const validate = new ValidateOtpRequest(transactionId, environment.SOA_SOURCE_IDENTIFIER, otpKey, otp);
                return this.otpService.validateOtp(validate).pipe(
                    map(response => {
                        if (
                            Number(response.statusCode) === 202 ||
                            Number(response.statusCode) === 205 ||
                            Number(response.statusCode) === 201 ||
                            Number(response.statusCode) === 202
                        ) {
                            return new ValidateOtpActionError(response);
                        }
                        return new ValidateOtpActionSuccess(response);
                    }),
                    catchError(error => of(new ValidateOtpActionError(error)))
                );
            })
        )
    );

    validateAccounts = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    AccountNumberOtpActionTypes.VALIDATE_OTP_SUCCESS,
                    EmailOtpActionTypes.VALIDATE_OTP_SUCCESS,
                    SmSOtpActionTypes.VALIDATE_OTP_SUCCESS,
                    OtpActionTypes.VALIDATE_OTP_SUCCESS
                )
            ),
        { dispatch: false }
    );
    constructor(private actions$: Actions, private otpService: OtpService, private store: Store<any>, private router: Router) {}
}
