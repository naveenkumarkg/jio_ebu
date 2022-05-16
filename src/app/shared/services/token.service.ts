import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TokenService {
    constructor(private http: HttpClient, private $sessionStorage: SessionStorageService) {}
    public getSessionToken(TransactionId: string): Observable<any> {
        return this.http
            .get(`${environment.ENTERPRISE_API_URL}/v1/authenticate/${TransactionId}/${environment.SOURCE_IDENTIFIER}`, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    this.$sessionStorage.store('enterprise_token', response.body?.token);
                    return response.body;
                })
            );
    }
}
