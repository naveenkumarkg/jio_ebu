import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { agentRoute } from 'src/app/shared';

@Component({
    selector: 'mtn-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    onClose(): void {
        this.router.navigate([agentRoute]);
    }
}
