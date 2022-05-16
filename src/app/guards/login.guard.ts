import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {
    constructor(private router: Router, private sessionStorage: SessionStorageService) {}

    canActivate(): boolean {
        const token = this.sessionStorage.retrieve('enterprise_token');

        if (!token) {
            this.router.navigateByUrl('');
            return false;
        }
        return true;
    }
}
