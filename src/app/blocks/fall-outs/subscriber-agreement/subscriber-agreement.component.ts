import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { TERMS_AND_CONDITIONS } from 'src/app/shared/util/constants/terms-and-conditions.constant';
import { CloseModalAction, OpenModalAction } from 'src/app/state/actions/modal.action';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { termsAndConditionsSelector } from 'src/app/state/selectors/terms-and-conditions.selector';
import { GetTermsAndConditionsAction } from 'src/app/state/actions/terms-and-conditions.action';

@Component({
    selector: 'mtn-subscriber-agreement',
    templateUrl: './subscriber-agreement.component.html',
    styleUrls: ['./subscriber-agreement.component.scss'],
})
export class SubscriberAgreementComponent implements OnInit {
    termTypes = TERMS_AND_CONDITIONS;
    iAgreeSelected = false;
    isOrderSubmited = false;

    selectedTermsType = this.termTypes[0].type;
    @ViewChild('pdf', { static: true }) pdf: ElementRef;

    originalPdfUrl = '';
    pdfTitle = '';

    constructor(private store: Store, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.selectTermsAndConditions(this.termTypes[0].type);
        this.getTermsAndConditions();
    }

    onKeyDownEvent(id): void {
        switch (id) {
            case 'terms-and-conditions':
                this.iAgreeSelected = false;
                this.submitOrder(); // TODO - what to do if I agree is selected
                break;
            default:
                this.closeModal(id);
                break;
        }
    }

    submitOrder(): void {}

    tAndCButtonActivate(): boolean {
        if (this.iAgreeSelected && !this.isOrderSubmited) {
            return true;
        }

        if (this.isOrderSubmited) {
            return false;
        }

        if (this.iAgreeSelected && this.isOrderSubmited) {
            return true;
        }

        return false;
    }

    tAndCButtonDeactivate(): boolean {
        if (!this.iAgreeSelected) {
            return true;
        }
        if (this.isOrderSubmited) {
            return true;
        }

        if (!this.iAgreeClicked && this.isOrderSubmited) {
            return true;
        }

        return false;
    }

    closeModal(id): void {
        this.iAgreeSelected = false;
        this.store.dispatch(new CloseModalAction(id));
    }

    iAgreeClicked(event): void {
        this.iAgreeSelected = event;
        this.isOrderSubmited = false;
    }

    downloadOrPrintAsPdf(): void {
        const a = document.createElement('a');
        a.href = this.originalPdfUrl;
        a.target = '_blank';
        a.download = this.pdfTitle;
        document.body.appendChild(a);
        a.click();
    }

    selectTermsAndConditions(type): void {
        this.iAgreeSelected = false;
        this.selectedTermsType = type;
        this.store.dispatch(new GetTermsAndConditionsAction(type));
    }

    getTermsAndConditions(): void {
        this.store.select(termsAndConditionsSelector).subscribe(terms => {
            if (terms !== null) {
                // this.renderer.removeAttribute(this.pdf.nativeElement, 'src');
                // this.renderer.setAttribute(this.pdf.nativeElement, 'src', terms[0]?.url + '#toolbar=0');
                this.originalPdfUrl = terms[0]?.url;
                this.pdfTitle = terms[0]?.name;
            }
        });
    }
}
