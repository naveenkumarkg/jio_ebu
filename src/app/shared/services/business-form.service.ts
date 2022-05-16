import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Business } from '../model';

@Injectable({ providedIn: 'root' })
export class BusinessFormService {
    constructor(private http: HttpClient) {}

    public submitBusinessDetails(business: Business): Observable<any> {
        return this.http
            .post(`${environment.ENTERPRISE_API_URL}/v1/user-application/`, business, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }
}
