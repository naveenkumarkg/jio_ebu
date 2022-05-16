import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MtnStepperComponent } from '@mtn-components/vivid';
import { Store } from '@ngrx/store';
import { chooseWorkTitle, dashboardApplicationDirectRoute, getIdType } from 'src/app/shared';
import { PersonalDetails } from 'src/app/shared/model/personal-details.model';
import { SetCurrentWorkTitleAction, SetPersonalDetailsAction } from 'src/app/state/actions';
import { getCurrentWorkTitleSelector, getpersonalDetailsSelector, getSelectedWorkTitleSelector } from 'src/app/state/selectors';

@Component({
    selector: 'mtn-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit, AfterViewInit {
    detailsForm: FormGroup;
    selectedWorkTitle: string;
    validSaIdNumber = true;

    get idNumber(): FormGroup {
        return this.detailsForm.get('idNumber') as FormGroup;
    }

    get idNumberValue(): string {
        return this.idNumber?.value?.inputNumberArray?.join('');
    }

    get inputArray(): FormArray {
        /* tslint:disable:no-string-literal */
        return this.idNumber['controls'].inputNumberArray as FormArray;
    }

    get validPassportNumber(): boolean {
        if (!this.isIdNumberSelected) {
            const regex = /^(?!.*?[À-ÖØ-öø-ÿ]).*?[-\/,a-zA-Z0-9]+\d/;
            const value = this.idNumber.value.inputNumberArray.join('');
            // return this.passportInputLength() >= 4 && this.checkSpecialChar(value);
            return this.passportInputLength() >= 4 && regex.test(value);
        }
        return false;
    }

    isIdNumberSelected = true;
    // isValidIdNumber:boolean = false;
    focusIdInputNumber = false;

    constructor(private store: Store<any>, private router: Router, private stepper: MtnStepperComponent) {}

    ngOnInit(): void {
        this.buildDetailsFormGroup();
        if (this.stepper) {
            if (this.detailsForm.valid && (this.validPassportNumber || this.isValidIdNumber)) {
                this.stepper.progress = 50;
            } else {
                this.stepper.progress = 0;
            }
        }
    }

    changedIdNumberValidation(event): void {
        this.validSaIdNumber = event;
    }

    ngAfterViewInit(): void {
        this.getSelectedWorkTitle();
        this.getPersonalDetails();
    }

    buildDetailsFormGroup(): void {
        this.detailsForm = new FormGroup({
            firstName: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.maxLength(26),
                    Validators.minLength(2),
                    Validators.pattern(/^[^!@#$%^&*()_+=;.><?/,`~"1234567890]*$/),
                ],
            }),
            surName: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.maxLength(26),
                    Validators.minLength(2),
                    Validators.pattern(/^[^!@#$%^&*()_+=;.><?/,`~"1234567890]*$/),
                ],
            }),
            isSAID: new FormControl(true),
            idNumber: new FormGroup({}),
        });
        this.detailsFormValueChange();
    }

    detailsFormValueChange(): void {
        this.detailsForm.valueChanges.subscribe(value => {
            let validFieldCount = 0;
            const totalFieldCount = 3;
            if (this.detailsForm.get('firstName').value && this.detailsForm.get('firstName').valid) {
                validFieldCount++;
            }
            if (this.detailsForm.get('surName').value && this.detailsForm.get('surName').valid) {
                validFieldCount++;
            }
            if (this.validPassportNumber) {
                validFieldCount++;
            }
            if (validFieldCount === totalFieldCount) {
                this.stepper.progress = 50;
            } else {
                this.stepper.progress = 15 * validFieldCount;
            }
        });
    }

    //   ValidateIdNumber(e): void {
    //      if (e) {
    //         this.isValidIdNumber = true
    //    }
    //        else
    //       {
    //           this.isValidIdNumber = false;
    //        }
    //  }

    get isValidIdNumber(): boolean {
        if (this.idNumber.get('inputNumberArray')) {
            return this.idNumber.get('inputNumberArray').valid;
        }
    }

    onInputChanges(): void {
        // const passport = this.idNumber.value.inputNumberArray.join('');
        // if (!this.isIdNumberSelected && passport.length === 9) {
        //     this.isValidIdNumber = true;
        // }
    }

    changeOption(value): void {
        this.isIdNumberSelected = value;
    }

    onNext(): void {
        if (
            ((this.isValidIdNumber && this.isIdNumberSelected) || (this.validPassportNumber && !this.isIdNumberSelected)) &&
            this.detailsForm.get('firstName').valid &&
            this.detailsForm.get('surName').valid
        ) {
            const personalDetails = new PersonalDetails(
                this.detailsForm.get('firstName').value,
                this.detailsForm.get('surName').value,
                getIdType(this.isIdNumberSelected),
                this.idNumber.value.inputNumberArray.join('')
            );

            this.store.dispatch(new SetPersonalDetailsAction(personalDetails));
            this.router.navigate([dashboardApplicationDirectRoute, 'business-details']);
        } else {
            this.detailsForm.markAsDirty();
            this.detailsForm.updateValueAndValidity();
        }
    }

    getPersonalDetails(): void {
        this.store.select(getpersonalDetailsSelector).subscribe(details => {
            if (details) {
                this.detailsForm.patchValue({
                    firstName: details.customerName,
                    surName: details.customerSurname,
                });
                setTimeout(() => {
                    this.inputArray.patchValue(details?.idNumber?.split(''));
                    this.focusIdInputNumber = details?.idNumber.length > 0 ? true : false;
                    // this.ValidateIdNumber(true);
                }, 500);
                this.isIdNumberSelected = details?.idType === 'RSAID';
            } else {
                this.detailsForm.reset();
            }
        });
    }
    onPrevStep(): void {
        this.router.navigate([chooseWorkTitle]);
    }

    passportInputLength(): number {
        return this.idNumber.value.inputNumberArray?.join('')?.length;
    }

    OnInputChange(value): void {
        const trimValue = this.detailsForm.get(value).value.trim();
        this.detailsForm.get(value).setValue(trimValue);
    }

    getSelectedWorkTitle(): void {
        this.store.select(getSelectedWorkTitleSelector).subscribe(workTitle => {
            if (workTitle) {
                this.selectedWorkTitle = workTitle;
            }
        });
    }

    inputChange(e): void {
        const arrValue = this.idNumber?.value?.inputNumberArray?.join('');
        this.clearInputValue();
        this.inputArray.patchValue(arrValue.split(''));
    }

    clearInputValue(): void {
        const controls = this.inputArray['controls'];
        controls.forEach(control => {
            control.setValue('');
        });
    }

    checkSpecialChar(value): boolean {
        const specialChars = '<>@!#$%^&*()_+[]{}?:;|\'"\\,./~`-=';
        specialChars.split('').forEach(char => {
            if (value.includes(char)) {
                return false;
            }
        });
        return true;
    }
}
