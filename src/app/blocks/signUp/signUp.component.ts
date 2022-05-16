import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SignUpActionTypes } from 'src/app/state/actions/types/sign-up.enum';
import { SetSignUpAction, SetSignUpRetries } from 'src/app/state/actions/sign-up.action';
import { getSignUpRetriesSelector } from 'src/app/state/selectors';

@Component({
    selector: 'mtn-sign-up',
    templateUrl: './signUp.component.html',
    styleUrls: ['./signUp.component.scss'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
    inputCardForm: FormGroup;
    showBanner = true;
    errorMessage: string;
    isError = false;
    signupRetries = 0;
    enable = true;
    get inputCellphoneValid(): boolean {
        if (this.inputCardForm.get('cellphone')[`controls`][`inputNumberArray`]) {
            return this.inputCardForm.get('cellphone')[`controls`][`inputNumberArray`].valid;
        }
        return false;
    }

    get cellphone(): FormArray {
        /* tslint:disable:no-string-literal */
        return this.inputCardForm.get('cellphone')['controls'].inputNumberArray as FormArray;
    }

    constructor(private store: Store<any>, private router: Router, private actionsSubject$: ActionsSubject) {}

    ngOnInit(): void {
        this.inputCardForm = new FormGroup({
            cellphone: new FormGroup({}),
        });
        this.inputCardForm.valueChanges.subscribe(val => {
            this.resetErrorMessage();
        });
        this.getError();
        this.getSignUpRetries();
    }

    ngAfterViewInit(): void {
        this.cellphone.patchValue(['0']);
    }

    getError(): any {
        this.actionsSubject$.pipe(filter(action => action.type === SignUpActionTypes.SIGN_UP_ERROR)).subscribe(error => {
            const getStatusCode = error['payload'];
            if (Number(getStatusCode?.statusCode)) {
                this.setServerErrorMsg();
                this.errorMessage = 'USE A VALID PREPAID MTN CELLPHONE NUMBER AND TRY AGAIN.';
            } else if (!Number(getStatusCode?.statusCode) && getStatusCode?.subscriberType !== 'P') {
                this.setServerErrorMsg();
                this.errorMessage = 'USE A VALID PREPAID MTN CELLPHONE NUMBER AND TRY AGAIN.';
            } else if (!Number(getStatusCode?.statusCode) && getStatusCode.customerSegment === 'EBU') {
                this.setServerErrorMsg();
                this.errorMessage = 'THIS NUMBER IS ALREADY LINKED TO A SKHOKHO ACCOUNT. PLEASE USE A DIFFERENT PREPAID CELLPHONE NUMBER';
            }
        });
    }

    getSignUpRetries(): any {
        this.store.select(getSignUpRetriesSelector).subscribe(retries => {
            this.signupRetries = retries;
        });
    }

    sendToOtp(): any {
        const contact = '27' + this.inputCardForm.value['cellphone']['inputNumberArray'].join('').slice(1);
        this.store.dispatch(new SetSignUpAction(contact));
        this.signupRetries++;
        this.store.dispatch(new SetSignUpRetries(this.signupRetries));
    }

    resetErrorMessage(): void {
        this.isError = false;
        this.errorMessage = '';
    }

    ValidateCellphone(event): void {
        if (event) {
            this.enable = false;
        } else {
            this.enable = true;
        }
    }
    serverError(): any {
        return (control: AbstractControl) => {
            return this.isError ? { serverError: this.isError } : null;
        };
    }

    setServerErrorMsg(): void {
        this.isError = true;
        this.inputCardForm.get('cellphone')[`controls`][`inputNumberArray`].setValidators([this.serverError()]);
        this.inputCardForm.get('cellphone')[`controls`][`inputNumberArray`].markAsDirty();
    }
}
