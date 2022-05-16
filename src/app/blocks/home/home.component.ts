import { Component, OnInit } from '@angular/core';
import header from './header-data';

@Component({
    selector: 'mtn-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public header = header;
    showBanner = true;
    constructor() {}

    ngOnInit(): void {}

    closeBanner(data): void {
        this.showBanner = data;
    }
}
