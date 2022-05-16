import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { getEmailFromAccountDetailsSelector, getOtpSendFailure, getValidateOtpFailure } from '../../state/selectors';
import { ReSendOtpAction, SendOtpAction, ValidateOtpAction } from '../../state/actions';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'mtn-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
    sendOtp: any;
    isError = false;
    isValid = false;
    msisdn: any;
    validateOtpForm: FormGroup;
    errorMessage: string;
    email: string;
    emailMasked: string;
    sendNewOtp = false;
    isNewOtp = false;
    newOtpText = '';
    cellNumber: string;
    cellNumberMasked: string;
    maskedValue = '... ...';

    constructor(private store: Store<any>, private titleService: Title) {
        this.createValidateOtpForm();
        this.getOtpSendErrorStatus();
        this.getAccountDetails();
        this.getValidateOtpErrorStatus();
    }

    ngOnInit(): void {
        this.titleService.setTitle('Contract Upgrade - OTP - MTN South Africa');
    }

    createValidateOtpForm(): void {
        this.validateOtpForm = new FormGroup({});
    }

    getAccountDetails(): void {
        this.store.select(getEmailFromAccountDetailsSelector).subscribe(response => {
            this.cellNumber = response?.accountDetails;
            this.cellNumberMasked = this.maskcellPhoneNum(this.cellNumber);
        });
    }
    getOtpSendErrorStatus(): void {
        this.errorMessage = '';
        this.store.select(getOtpSendFailure).subscribe(response => {
            if (this.validateOtpForm.dirty) {
                if (response?.name === 'Error' || Number(response?.statusCode) === 200) {
                    // tslint:disable-next-line: quotemark
                    this.errorMessage = "You've used incorrect OTP. Try again";
                    this.isError = true;
                    this.isValid = false;
                } else if (Number(response?.statusCode) === 205) {
                    this.errorMessage = '3 failed OTP log in attempts. Request a new one below';
                    this.isError = true;
                    this.isValid = false;
                    this.sendNewOtp = true;
                } else if (Number(response?.statusCode) === 201) {
                    this.errorMessage = 'Your OTP has expired request a new one';
                    this.isError = true;
                    this.isValid = false;
                    this.sendNewOtp = true;
                }
            }
        });
    }

    getValidateOtpErrorStatus(): void {
        this.errorMessage = '';
        this.store.select(getValidateOtpFailure).subscribe(response => {
            if (this.validateOtpForm.dirty) {
                if (Number(response?.statusCode) === 202 || Number(response?.statusCode) === 200) {
                    // tslint:disable-next-line: quotemark
                    this.errorMessage = "You've used incorrect OTP. Try again";
                    this.isError = true;
                    this.isValid = false;
                } else if (Number(response?.statusCode) === 205) {
                    this.errorMessage = '3 failed OTP log in attempts. Request a new one below';
                    this.isError = true;
                    this.isValid = false;
                } else if (Number(response?.statusCode) === 201) {
                    this.errorMessage = 'Your OTP has expired request a new one';
                    this.isError = true;
                    this.isValid = false;
                }
            }
        });
    }
    resendOtp(): void {
        this.isValid = true;
        this.isError = false;
        this.store.dispatch(new ReSendOtpAction());
    }
    resendsendNewOtp(): void {
        this.isError = false;
        this.isNewOtp = true;
        this.newOtpText = 'new';
        this.store.dispatch(new SendOtpAction());
        this.validateOtpForm.reset();
    }

    validateOtp(): void {
        this.store.dispatch(new ValidateOtpAction(this.validateOtpForm.get('inputOtpArray')?.value?.join('')));
    }
    checkInput(event): void {
        if (this.validateOtpForm.valid) {
            this.isError = false;
        }
    }

    onKeyDownEvent(event): void {
        this.validateOtp();
    }

    maskcellPhoneNum(phone: string): string {
        const zer = ['0'];
        const phoneToSplit = zer.concat(phone.slice(2).split(''));
        const finalMask = phoneToSplit.slice(6).join('');
        return finalMask;
    }
}
