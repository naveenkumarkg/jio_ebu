import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SessionStorageService } from 'ngx-webstorage';
import { agentRoute } from '../shared';
import { OpenModalAction } from 'src/app/state/actions';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
    refreshCode: string;
    constructor(private router: Router, private $sessionStorage: SessionStorageService, private store: Store) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                () => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.handleErrorStatus(err.status);
                    }
                }
            )
        );
    }

    handleErrorStatus(statusCode: number): any {
        if (statusCode === 401) {
            this.store.dispatch(new OpenModalAction('session-timeout'));
            this.$sessionStorage.clear('enterprise_token');
            this.router.navigate([agentRoute]);
        }
        return;
    }
}
