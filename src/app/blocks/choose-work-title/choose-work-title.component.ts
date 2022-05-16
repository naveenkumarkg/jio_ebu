import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { dashboardApplicationDirectRoute, dashboardBusinessDirectRoute, dashboardDefaultRoute } from 'src/app/shared';
import { SetWorkTitleAction } from '../../state/actions/work-title.action';
import { getSelectedWorkTitleSelector } from 'src/app/state/selectors';

@Component({
    selector: 'mtn-choose-work-title',
    templateUrl: './choose-work-title.component.html',
    styleUrls: ['./choose-work-title.component.scss'],
})
export class ChooseWorkTitleComponent implements OnInit {
    workTitles: any = ['Business Owner', 'Employee'];
    selectedWorkTitle: any;

    constructor(private store: Store<any>, private router: Router) {}

    ngOnInit(): void {
        this.getSelectedWorkTitle();
    }

    onKeyDownEvent(event): void {
        this.onNext();
    }

    onChange(event): void {
        this.selectedWorkTitle = event;
    }

    onNext(): void {
        this.store.dispatch(new SetWorkTitleAction(this.selectedWorkTitle));
        this.router.navigate([dashboardApplicationDirectRoute, 'personal-details']);
    }

    getSelectedWorkTitle(): void {
        this.store.select(getSelectedWorkTitleSelector).subscribe(workTitle => {
            if (workTitle) {
                this.selectedWorkTitle = workTitle;
            } else {
                this.selectedWorkTitle = 'Business Owner';
            }
        });
    }
}
