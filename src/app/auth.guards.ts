import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignUpService } from 'src/app/shared/services/sign-up.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private signUpService: SignUpService) {}

    canActivate(): boolean {
        if (this.signUpService.isAuthenticate) {
            return true;
        } else {
            this.router.navigateByUrl('');
        }
    }
}
