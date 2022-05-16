import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MtnStepperComponent } from '@mtn-components/vivid';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { dashboardApplicationDirectRoute, dashboardDefaultRoute } from 'src/app/shared';
import {
    getAffiliateDocSelector,
    getOwnerIdSelector,
    getpersonalDetailsSelector,
    getRecomendationDocSelector,
} from '../../../../state/selectors';
import { DocumentDetails, DocumentRefs } from '../../../../shared/model';
import { DOCUMENTS_TYPES } from '../../../../shared/util/constants/document.constants';
import {
    SetBusinessInfoAction,
    SubmitBusinessFormAction,
    UploadBusinessDocumentRequestAction,
    OpenModalAction,
} from '../../../../state/actions';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'mtn-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./../business.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {
    employeeDetailsForm: FormGroup;
    fb: FormBuilder;
    selectedLinkOption = false;
    orderNumber = '';
    nativeFilePassport: any;
    nativeFileLetter: any;
    nativeFileAffiliationDoc: any;
    selectedIdType: string;
    isValidAccountNumber = false;
    ownerIdDoc: any;
    recomendation: any;
    affiliateDoc: any;
    referenceNumberInvalid = false;

    // Validation Messages
    validationMessages: object = {
        required: 'Please select a file',
        maxLength: 'Only 2 to 26 characters allowed',
        notSupportedFileType: 'Incorrect file format. Upload a jpg, jpeg, png or pdf.',
        fileSizeExceed: 'This document exceeds 5MB',
        serverError: 'Failed to upload the document, try again',
    };
    // Form error status messages
    formStatus = {
        referenceNumber: '',
        fileOwnerId: '',
        fileLetter: '',
        fileAffiliationDoc: '',
    };
    isFileOwnerIdServerError: any;
    isFileAffiliationDocServerError: any;

    constructor(
        private router: Router,
        private stepper: MtnStepperComponent,
        private store: Store,
        private actionsSubject$: ActionsSubject
    ) {}

    ngOnInit(): void {
        this.buildEmployeeFormGroup();
        this.getSelectedIdType();
        this.getBusinessDocuments();
        this.getdocumentuploadstatuserror();
    }

    ngAfterViewInit(): void {
        //  this.employeeDetailsForm.get('referenceNumber').statusChanges.subscribe(c => this.validateReferenceNumber());
    }

    buildEmployeeFormGroup(): void {
        const pattern =
            /^[a-zA-Z0-9À-ÖØ-öø-ÿ](?!.*?[^\na-zA-Z0-9À-ÖØ-öø-ÿ&]{2})(?!.*?[`~^()_[\]{}\|;:"<>\/?\\]).*?[a-zA-Z0-9À-ÖØ-öø-ÿ@&$!£€¥*'+#=%]$/;
        this.employeeDetailsForm = new FormGroup({
            businessName: new FormControl('', {
                validators: [Validators.required, Validators.maxLength(26), Validators.minLength(2), Validators.pattern(pattern)],
            }),
            referenceNumber: new FormControl('', {
                validators: [Validators.required, Validators.maxLength(11), Validators.minLength(9), Validators.pattern(/^[a-zA-Z0-9-]*$/)],
            }),
            linkPhoneOptions: new FormControl(true),
            accountNumber: new FormGroup({}),
            fileOwnerId: new FormControl(null, [Validators.required, this.supportedFileType(), this.checkFileSize()]),
            fileLetter: new FormControl(null, [Validators.required, this.supportedFileType(), this.checkFileSize()]),
            fileAffiliationDoc: new FormControl(null, [Validators.required, this.supportedFileType(), this.checkFileSize()]),
            termsAndConditions: new FormControl(false),
        });
        this.detectFormValueChange();
        this.employeeDetailsForm.statusChanges.subscribe(() => this.doValidation());
        // this.validateAccountRefNumber();
    }

    changeOption(value: any): void {
        this.selectedLinkOption = value;
    }

    onPrevStep(): void {
        this.stepper.progress = 50;
        this.router.navigate([dashboardApplicationDirectRoute, 'personal-details']);
        this.employeeDetailsForm.reset();
    }

    onNextStep(): void {
        if (this.validateForm()) {
            const data = this.employeeDetailsForm.value;
            this.store.dispatch(
                new SetBusinessInfoAction({
                    businessName: data.businessName,
                    isCustomerLinkToPrimary: data.linkPhoneOptions,
                    accountIdentifier: data.referenceNumber,
                    businessReferenceNumber: '',
                    customerIdDocument: new DocumentRefs(this.ownerIdDoc?.documentId ?? ''),
                    businessSupportingDocuments: new DocumentRefs(this.affiliateDoc?.documentId ?? ''),
                    termsAndConditions: data.termsAndConditions,
                })
            );
            this.store.dispatch(new SubmitBusinessFormAction());
            this.stepper.progress = 100;
        }
    }

    getSelectedIdType(): void {
        this.store.select(getpersonalDetailsSelector).subscribe(personalDetails => {
            if (personalDetails) {
                this.selectedIdType = personalDetails.idType;
            }
        });
    }

    fileChangeEvent(type): void {
        const regex = new RegExp('(.*?).(jpg|jpeg|png|pdf)$');
        const val = this.employeeDetailsForm.get(type).value;
        const fileSize = Math.round(val.size / 1024);
        const regexTest = regex.test(val.name.toLowerCase());

        this.employeeDetailsForm.get(type).setValidators([Validators.required, this.supportedFileType(), this.checkFileSize()]);
        this.employeeDetailsForm.get(type).updateValueAndValidity();
        if (fileSize <= 5000 && regexTest) {
            let docType: any;
            if (type === 'fileOwnerId') {
                // this.isFileSignedLetterLoading = true;
                docType = DOCUMENTS_TYPES.filePassportDocumentId;
            } else if (type === 'fileLetter') {
                docType = DOCUMENTS_TYPES.fileLetterDocumentId;
                // this.isFileDirectorIdLoading = true;
            } else {
                docType = DOCUMENTS_TYPES.fileAffiliationDocumentId;
            }

            this.setNativeFile(val, type);
            const reader = new FileReader();
            reader.readAsBinaryString(val);
            reader.onload = () => {
                const data = this._handleReaderLoaded(reader.result);
                this.uploadFile(val, data, docType);
            };
        } else {
            this.employeeDetailsForm.get(type).setValidators([Validators.required, this.supportedFileType(), this.checkFileSize()]);
            this.employeeDetailsForm.get(type).updateValueAndValidity();
        }
    }

    setNativeFile(file, type): void {
        switch (type) {
            case 'filePassport':
                this.nativeFilePassport = file;
                break;
            case 'fileLetter':
                this.nativeFileLetter = file;
                break;
            case 'fileAffiliationDoc':
                this.nativeFileAffiliationDoc = file;
                break;
        }
    }

    _handleReaderLoaded(readerEvt: any): string {
        const base64textString = btoa(readerEvt);
        return base64textString;
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

    uploadFile(data: any, base64String: string, type): void {
        const fileType = this.determineType(type);
        const documentDetails = new DocumentDetails(data.name, fileType, base64String, 'WCC_EBU_Admin', 'WCC_EBUOnline', [
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
    }

    getBusinessDocuments(): void {
        combineLatest([
            this.store.pipe(select(getOwnerIdSelector)),
            this.store.pipe(select(getRecomendationDocSelector)),
            this.store.pipe(select(getAffiliateDocSelector)),
        ]).subscribe(([ownerIdDoc, recomendation, affiliateDoc]) => {
            if (ownerIdDoc && !Number(ownerIdDoc.statusCode)) {
                this.ownerIdDoc = ownerIdDoc?.documentDetails;
            }
            if (recomendation && !Number(recomendation.statusCode)) {
                this.recomendation = recomendation?.documentDetails;
            }

            if (affiliateDoc && !Number(affiliateDoc.statusCode)) {
                this.affiliateDoc = affiliateDoc?.documentDetails;
            }
            if (ownerIdDoc && !ownerIdDoc.hasOwnProperty('statusCode')) {
                this.isFileOwnerIdServerError = true;
                const form = this.employeeDetailsForm.get('fileOwnerId');
                form.setValidators([this.fileOwnerIdServerError(), Validators.required, this.supportedFileType(), this.checkFileSize()]);
                form.updateValueAndValidity();
                form.markAsDirty();
            }
            if (affiliateDoc && !affiliateDoc.hasOwnProperty('statusCode')) {
                this.isFileAffiliationDocServerError = true;
                const form = this.employeeDetailsForm.get('fileAffiliationDoc');
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

    // validateReferenceNumber(): void {
    //     const c = this.referenceNumber.controls;
    //     const contact = this.referenceNumber.value.join('');
    //     this.formStatus.referenceNumber = '';
    //     for (const k in c) {
    //         if (!c[k].valid && c[k].dirty && contact.length < 8) {
    //             // tslint:disable-next-line: forin
    //             for (const e in c[k].errors) {
    //                 this.formStatus.referenceNumber = 'Invalid ID number';
    //             }
    //         }
    //     }
    // }

    doValidation(): void {
        // tslint:disable-next-line: forin
        for (const f in this.formStatus) {
            if (f !== 'accountNumber') {
                this.formStatus[f] = '';
                const c = this.employeeDetailsForm.get(f);
                if (c && c.dirty && !c.valid) {
                    // tslint:disable-next-line: forin
                    for (const e in c.errors) {
                        this.formStatus[f] = this.validationMessages[e];
                    }
                }
            }
        }
    }

    validateForm(): boolean {
        if (
            this.employeeDetailsForm.get('businessName').valid &&
            this.employeeDetailsForm.get('referenceNumber').valid &&
            this.employeeDetailsForm.get('termsAndConditions').value &&
            this.affiliateDoc?.documentId &&
            this.employeeDetailsForm.get('fileAffiliationDoc').valid &&
            this.ownerIdDoc?.documentId &&
            this.employeeDetailsForm.get('fileOwnerId').valid
        ) {
            return true;
        } else {
            return false;
        }
    }

    detectFormValueChange(): void {
        this.employeeDetailsForm.valueChanges.subscribe(value => {
            let validFieldCount = 0;
            const totalFieldCount = 5;
            if (this.employeeDetailsForm.get('businessName').valid) {
                validFieldCount++;
            }
            if (this.employeeDetailsForm.get('termsAndConditions').value === true) {
                validFieldCount++;
            }
            if (this.employeeDetailsForm.get('referenceNumber').valid) {
                validFieldCount++;
            }
            if (this.employeeDetailsForm.get('fileAffiliationDoc').valid) {
                validFieldCount++;
            }
            if (this.employeeDetailsForm.get('fileOwnerId').valid) {
                validFieldCount++;
            }

            if (validFieldCount === totalFieldCount) {
                this.stepper.progress = 100;
            } else {
                this.stepper.progress = (50 / totalFieldCount) * validFieldCount + 50;
            }
        });
    }

    getdocumentuploadstatuserror(): any {
        combineLatest([
            this.actionsSubject$.pipe(select(getRecomendationDocSelector)),
            this.actionsSubject$.pipe(select(getAffiliateDocSelector)),
        ]).subscribe(([ownerId, registrationId]) => {
            if (Number(ownerId?.error?.statusCode) && this.employeeDetailsForm.get('ownerId').value) {
                this.isFileOwnerIdServerError = true;
                const form = this.employeeDetailsForm.get('fileOwnerId');
                form.setValidators([this.fileOwnerIdServerError(), Validators.required, this.supportedFileType(), this.checkFileSize()]);
                form.updateValueAndValidity();
                form.markAsDirty();
            }

            if (Number(registrationId?.error?.statusCode) && this.employeeDetailsForm.get('registrationId').value) {
                this.isFileAffiliationDocServerError = true;
                const form = this.employeeDetailsForm.get('fileAffiliationDoc');
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
            return this.isFileAffiliationDocServerError ? { serverError: this.isFileAffiliationDocServerError } : null;
        };
    }

    determineType(type): any {
        switch (type) {
            case DOCUMENTS_TYPES.filePassportDocumentId: {
                return 'Valid_ID_Proof_S';
            }
            case DOCUMENTS_TYPES.fileOwnerDocumentId: {
                return 'Valid_ID_Proof_S';
            }
            case DOCUMENTS_TYPES.fileAffiliationDocumentId: {
                return 'ProofofEmployment';
            }
        }
    }

    OnInputChange(value): void {
        const trimValue = this.employeeDetailsForm.get(value).value.trim();
        this.employeeDetailsForm.get(value).setValue(trimValue);
    }

    viewTerms(): void {
        this.store.dispatch(new OpenModalAction('terms-and-conditions'));
    }

    // validateAccountRefNumber(): void {
    //     this.employeeDetailsForm.get('referenceNumber').valueChanges.subscribe(changes => {
    //         const regex = /[-\/,a-zA-Z0-9]+\d/;
    //         const acctNumber = changes.inputNumberArray.join('');
    //         if (this.referenceNumber.dirty && (acctNumber.length < 10 || !regex.test(acctNumber))) {
    //             this.referenceNumberInvalid = true;
    //         } else {
    //             this.referenceNumberInvalid = false;
    //         }
    //     });
    // }
}
