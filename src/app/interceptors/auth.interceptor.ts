import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            !request ||
            !request.url ||
            (/^http/.test(request.url) &&
                !(environment.ECOMMERCE_API_URL || environment.ENTERPRISE_API_URL) &&
                request.url.startsWith(environment.ECOMMERCE_API_URL || environment.ENTERPRISE_API_URL))
        ) {
            return next.handle(request);
        }

        const token = this.sessionStorage.retrieve('enterprise_token');
        if (!!token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token,
                },
            });
        }
        return next.handle(request);
    }
}
