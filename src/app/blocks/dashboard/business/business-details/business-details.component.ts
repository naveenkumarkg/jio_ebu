import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputNumberComponent, MtnStepperComponent } from '@mtn-components/vivid';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { dashboardApplicationDirectRoute, dashboardBusinessDirectRoute, dashboardDefaultRoute } from 'src/app/shared';
import { UploadBusinessDocumentRequestAction } from 'src/app/state/actions/business-owner-details.action';
import { DOCUMENTS_TYPES } from 'src/app/shared/util/constants/document.constants';
import { BusinessOwnerDetails, DocumentDetails, DocumentRefs } from 'src/app/shared/model/business-document.model';
import { combineLatest } from 'rxjs';
import { getOwnerIdSelector, getpersonalDetailsSelector, getRegistrationIdSelector } from 'src/app/state/selectors';
import { SetBusinessInfoAction, SubmitBusinessFormAction, OpenModalAction } from 'src/app/state/actions';

@Component({
    selector: 'mtn-business-details',
    templateUrl: './business-details.component.html',
    styleUrls: ['./../business.component.scss'],
})
export class BusinessDetailsComponent implements OnInit, AfterViewInit {
    businessdetailsForm: FormGroup;
    passport: boolean;
    documentValid = true;
    businessNumber = '';
    businessname = '';
    ownerId: any = {};
    documentId: any = {};
    selectedIdType: string;
    isTermsandConditionsChecked: boolean;

    // Validation Messages
    validationMessages: object = {
        businessName: {
            pattern: 'Business Name is invalid',
            maxLength: ' Only 2 to 26 characters allowed.',
        },
        fileOwnerDocumentId: {
            required: 'Please select a file',
            notSupportedFileType: 'Incorrect file format. Upload a jpeg, jpg, png or pdf.',
            fileSizeExceed: 'This document exceeds 5MB.',
            serverError: 'Failed to upload the document, try again',
        },
        fileRegistrationDocumentId: {
            required: 'Please select a file',
            notSupportedFileType: 'Incorrect file format. Upload a jpeg, jpg, png or pdf.',
            fileSizeExceed: 'This document exceeds 5MB.',
            serverError: 'Failed to upload the document, try again',
        },
    };
    // Form error status messages
    formStatus = {
        businessName: '',
        fileOwnerDocumentId: '',
        fileRegistrationDocumentId: '',
    };

    recepientDetailsData: any;
    ownerIdDoc: any;
    registrationIdDoc: any;
    isFileOwnerIdServerError = false;
    isFileRegistrationIdServerError = false;

    get registrationId(): FormGroup {
        return this.businessdetailsForm.get('registrationId') as FormGroup;
    }

    get validRegistrationId(): boolean {
        return this.registrationId.valid as boolean;
    }

    get fileOwnerDocumentId(): AbstractControl {
        return this.businessdetailsForm?.controls.fileOwnerDocumentId;
    }

    get fileRegistrationDocumentId(): AbstractControl {
        return this.businessdetailsForm?.controls.fileRegistrationDocumentId;
    }

    nativeFileOwnerDocumentId: any;
    nativeFileRegistrationDocumentId: any;
    isFileRegistrationDocumentIdLoading = false;
    isFileOwnerDocumentIdLoading = false;

    constructor(
        private store: Store<any>,
        private stepper: MtnStepperComponent,
        private router: Router,
        private actionsSubject$: ActionsSubject
    ) {}

    ngOnInit(): void {
        this.buildRecepientForm();
        this.getSelectedIdType();
        this.getBusinessDocuments();
        this.getdocumentuploadstatuserror();
        if (this.stepper) {
            if (this.businessdetailsForm.valid && this.registrationId.valid) {
                this.stepper.progress = 100;
            } else {
                this.stepper.progress = 80;
            }
        }
    }

    ngAfterViewInit(): void {}

    // Build recepientForm FormGroup
    buildRecepientForm(): void {
        const pattern =
            /^[a-zA-Z0-9À-ÖØ-öø-ÿ](?!.*?[^\na-zA-Z0-9À-ÖØ-öø-ÿ&]{2})(?!.*?[`~^()_[\]{}\|;:"<>\/?\\]).*?[a-zA-Z0-9À-ÖØ-öø-ÿ@&$!£€¥*'+#=%]$/;
        this.businessdetailsForm = new FormGroup({
            businessName: new FormControl(null, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(26),
                // Validators.pattern(/^[a-zA-Z0-9]+[^]*$/),
                Validators.pattern(pattern),
            ]),
            registrationId: new FormGroup({}),
            fileOwnerDocumentId: new FormControl(null, [Validators.required, this.supportedFileType(), this.checkFileSize()]),
            fileRegistrationDocumentId: new FormControl(null, [Validators.required, this.supportedFileType(), this.checkFileSize()]),
            termsAndConditions: new FormControl(false),
        });
        this.detailsFormValueChange();
        this.businessdetailsForm.statusChanges.subscribe(() => this.doValidation());
    }

    detailsFormValueChange(): void {
        this.businessdetailsForm.valueChanges.subscribe(value => {
            let validFieldCount = 0;
            const totalFieldCount = 4;
            if (this.businessdetailsForm.get('businessName').value) {
                validFieldCount++;
            }

            if (this.businessdetailsForm.get('fileOwnerDocumentId').valid && this.businessdetailsForm.get('fileOwnerDocumentId').value) {
                validFieldCount++;
            }
            if (
                this.businessdetailsForm.get('fileRegistrationDocumentId').valid &&
                this.businessdetailsForm.get('fileRegistrationDocumentId').value
            ) {
                validFieldCount++;
            }
            if (this.businessdetailsForm.get('termsAndConditions').value === true) {
                validFieldCount++;
            }

            if (validFieldCount === totalFieldCount) {
                this.stepper.progress = 100;
            } else {
                this.stepper.progress = (50 / totalFieldCount) * validFieldCount + 50;
            }
        });
    }

    doValidation(): void {
        for (const f in this.formStatus) {
            if (f !== '') {
                this.formStatus[f] = '';
                const c = this.businessdetailsForm.get(f);
                if (c && c.dirty && !c.valid && c.touched) {
                    const msg = this.validationMessages[f];
                    for (const e in c.errors) {
                        if (e !== '') {
                            this.formStatus[f] = msg[e];
                        }
                    }
                }
            }
        }
    }

    onNextStep(): void {
        if (this.businessdetailsForm.get('businessName').valid && this.ownerIdDoc?.documentId && this.registrationIdDoc?.documentId) {
            const data = this.businessdetailsForm.value;

            this.store.dispatch(
                new SetBusinessInfoAction({
                    businessName: data.businessName,
                    isCustomerLinkToPrimary: false,
                    accountIdentifier: '',
                    businessReferenceNumber: this.registrationId.value.inputNumberArray?.join('') ?? '',
                    businessValidationDocument: new DocumentRefs(this.registrationIdDoc?.documentId),
                    customerIdDocument: new DocumentRefs(this.ownerIdDoc?.documentId),
                    termsAndConditions: data.termsAndConditions,
                })
            );
            this.store.dispatch(new SubmitBusinessFormAction());
            this.stepper.progress = 100;
        }
    }

    onPrevStep(): void {
        this.stepper.progress = 50;
        this.router.navigate([dashboardApplicationDirectRoute, 'personal-details']);
        this.businessdetailsForm.reset();
    }

    fileChangeEvent(type): void {
        const regex = new RegExp('(.*?).(jpg|jpeg|png|pdf)$');
        const val = this.businessdetailsForm.get(type).value;
        const fileSize = Math.round(val.size / 1024);
        const regexTest = regex.test(val.name.toLowerCase());
        this.businessdetailsForm.get(type).setValidators([Validators.required, this.supportedFileType(), this.checkFileSize()]);
        this.businessdetailsForm.get(type).updateValueAndValidity();
        if (fileSize <= 5000 && regexTest) {
            if (type === 'fileRegistrationDocumentId') {
                this.isFileRegistrationDocumentIdLoading = true;
            } else {
                this.isFileOwnerDocumentIdLoading = true;
            }

            this.setNativeFile(val, type);
            const reader = new FileReader();
            this.documentValid = true;
            reader.readAsBinaryString(val);
            reader.onload = () => {
                const data = this._handleReaderLoaded(reader.result);
                this.uploadFile(
                    val,
                    data,
                    type === 'fileRegistrationDocumentId' ? DOCUMENTS_TYPES.fileRegistrationDocumentId : DOCUMENTS_TYPES.fileOwnerDocumentId
                );
            };
        } else {
            this.documentValid = false;
            this.businessdetailsForm.get(type).setValidators([Validators.required, this.supportedFileType(), this.checkFileSize()]);
            this.businessdetailsForm.get(type).updateValueAndValidity();
        }
    }
    setNativeFile(file, type): void {
        if (type !== 'fileRegistrationDocumentId') {
            this.nativeFileOwnerDocumentId = file;
            return;
        }
        this.nativeFileRegistrationDocumentId = file;
    }

    uploadFile(data: any, base64String: string, type): void {
        const documentDetails = new DocumentDetails(data.name, this.determineType(type), base64String, 'WCC_EBU_Admin', 'WCC_EBUOnline', [
            {
                name: 'xSource',
                value: 'EBU-Prepaid',
            },
        ]);
        this.store.dispatch(
            new UploadBusinessDocumentRequestAction({
                type,
                documentDetails,
            })
        );

        // this.getdocumentuploadstatus();
    }

    supportedFileType(): any {
        return (control: AbstractControl) => {
            if (!control.value) {
                return;
            }
            const fileName = control.value?.name.toLowerCase();
            const regex = new RegExp('(.*?).(jpg|jpeg|png|pdf)$');
            const regexTest = regex.test(fileName);
            return !regexTest ? { notSupportedFileType: true } : null;
        };
    }

    checkFileSize(): any {
        return (control: AbstractControl) => {
            if (!control.value) {
                return;
            }
            const fileSize = control.value?.size;
            const fileSizeKb = Math.round(fileSize / 1024);
            return fileSizeKb >= 5000 ? { fileSizeExceed: true } : null;
        };
    }

    _handleReaderLoaded(readerEvt: any): string {
        const base64textString = btoa(readerEvt);
        return base64textString;
    }

    getBusinessDocuments(): void {
        combineLatest([this.store.pipe(select(getOwnerIdSelector)), this.store.pipe(select(getRegistrationIdSelector))]).subscribe(
            ([ownerIdDoc, registrationIdDoc]) => {
                if (ownerIdDoc && !Number(ownerIdDoc.statusCode)) {
                    this.ownerIdDoc = ownerIdDoc?.documentDetails;
                }
                if (registrationIdDoc && !Number(registrationIdDoc.statusCode)) {
                    this.registrationIdDoc = registrationIdDoc?.documentDetails;
                }

                if (ownerIdDoc && !ownerIdDoc.hasOwnProperty('statusCode')) {
                    this.isFileOwnerIdServerError = true;
                    const form = this.businessdetailsForm.get('fileOwnerDocumentId');
                    form.setValidators([
                        this.fileOwnerIdServerError(),
                        Validators.required,
                        this.supportedFileType(),
                        this.checkFileSize(),
                    ]);
                    form.updateValueAndValidity();
                    form.markAsDirty();
                }
                if (registrationIdDoc && !registrationIdDoc.hasOwnProperty('statusCode')) {
                    this.isFileRegistrationIdServerError = true;
                    const form = this.businessdetailsForm.get('fileRegistrationDocumentId');
                    form.setValidators([
                        this.fileRegistrationIdServerError(),
                        Validators.required,
                        this.supportedFileType(),
                        this.checkFileSize(),
                    ]);
                    form.updateValueAndValidity();
                    form.markAsDirty();
                }
            }
        );
    }

    getSelectedIdType(): void {
        this.store.select(getpersonalDetailsSelector).subscribe(personalDetails => {
            if (personalDetails) {
                this.selectedIdType = personalDetails.idType;
            }
        });
    }

    checkvalue(value): void {
        this.isTermsandConditionsChecked = value;
    }

    getdocumentuploadstatuserror(): any {
        combineLatest([
            this.actionsSubject$.pipe(select(getOwnerIdSelector)),

            this.actionsSubject$.pipe(select(getRegistrationIdSelector)),
        ]).subscribe(([ownerId, registrationId]) => {
            if (Number(ownerId?.error?.statusCode) && this.businessdetailsForm.get('fileOwnerDocumentId').value) {
                this.isFileOwnerIdServerError = true;
                const form = this.businessdetailsForm.get('fileOwnerDocumentId');
                form.setValidators([this.fileOwnerIdServerError(), Validators.required, this.supportedFileType(), this.checkFileSize()]);
                form.updateValueAndValidity();
                form.markAsDirty();
            }

            if (Number(registrationId?.error?.statusCode) && this.businessdetailsForm.get('fileRegistrationDocumentId').value) {
                this.isFileRegistrationIdServerError = true;
                const form = this.businessdetailsForm.get('fileRegistrationDocumentId');
                form.setValidators([
                    this.fileRegistrationIdServerError(),
                    Validators.required,
                    this.supportedFileType(),
                    this.checkFileSize(),
                ]);
                form.updateValueAndValidity();
                form.markAsDirty();
            }
        });
    }

    fileOwnerIdServerError(): any {
        return (control: AbstractControl) => {
            if (!control.value) {
                return;
            }
            return this.isFileOwnerIdServerError ? { serverError: this.isFileOwnerIdServerError } : null;
        };
    }

    fileRegistrationIdServerError(): any {
        return (control: AbstractControl) => {
            if (!control.value) {
                return;
            }
            return this.isFileRegistrationIdServerError ? { serverError: this.isFileRegistrationIdServerError } : null;
        };
    }

    determineType(type): any {
        switch (type) {
            case DOCUMENTS_TYPES.fileOwnerDocumentId: {
                return 'Valid_ID_Proof_S';
            }
            case DOCUMENTS_TYPES.fileRegistrationDocumentId: {
                return 'CompanyRegistrationdocument';
            }
        }
    }

    OnInputChange(value): void {
        const trimValue = this.businessdetailsForm.get(value).value.trim();
        this.businessdetailsForm.get(value).setValue(trimValue);
    }

    viewTerms(): void {
        this.store.dispatch(new OpenModalAction('terms-and-conditions'));
    }
}
