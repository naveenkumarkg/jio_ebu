import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SessionStorageService } from 'ngx-webstorage';
import { SetFeedbackAction, SetAgentInfoAction, SetWorkTitleAction } from 'src/app/state/actions';

@Component({
    selector: 'mtn-application-success',
    templateUrl: './application-success.component.html',
    styleUrls: ['./application-success.component.scss'],
})
export class ApplicationSuccessComponent implements OnInit, AfterViewInit {
    feedbackForm: FormGroup;
    feedbackKeyword = ['poor', 'ok', 'good', 'great', 'epic'];

    constructor(private store: Store<any>, private $sessionStorage: SessionStorageService) {}

    ngOnInit(): void {
        this.feedbackForm = new FormGroup({
            feedbackRating: new FormControl('', Validators.compose([Validators.required])),
            feedbackComment: new FormControl({ value: '', disabled: true }),
        });
    }

    ngAfterViewInit(): void {
        this.feedbackForm.get('feedbackRating').valueChanges.subscribe(x => {
            if (this.feedbackForm.get('feedbackRating').valid) {
                this.feedbackForm.get('feedbackComment').enable();
            }
        });
        this.$sessionStorage.clear('enterprise_token');
        this.store.dispatch(new SetAgentInfoAction(null));
        this.store.dispatch(new SetWorkTitleAction(null));
    }

    done(): void {
        const feedbackRequest = {
            feedback: this.feedbackForm.value,
            rating: this.feedbackKeyword[this.feedbackForm.value.feedbackRating],
        };

        if (this.feedbackForm.get('feedbackRating').valid) {
            this.store.dispatch(new SetFeedbackAction(feedbackRequest));
        } else {
            window.open('https://www.mtnbusiness.co.za/en/Pages/default.aspx', '_self');
        }
    }
}
