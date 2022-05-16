// import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { getSelectedWorkTitleSelector } from 'src/app/state/selectors';
@Component({
    selector: 'mtn-business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
    stepperCount = 0;
    workTitle = '';

    constructor(private store: Store<any>, private router: Router) {
        this.getWorkTitle();
        this.getRoutInstence();
    }

    ngOnInit(): void {}

    getWorkTitle(): void {
        this.store.select(getSelectedWorkTitleSelector).subscribe(title => {
            this.workTitle = title.toLowerCase();
        });
    }

    getRoutInstence(): void {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            switch (event.url.split('/')[3]) {
                case 'personal-details':
                    this.stepperCount = 0;
                    break;
                case 'business-details':
                    this.stepperCount = 1;
                    break;
            }
        });
    }
}
