import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SentryService {
    constructor(private http: HttpClient) {}
    public postSentryData(sentryLogRequest): Observable<any> {
        return this.http
            .post(`${environment.ECOMMERCE_API_URL}/v1/save-log/${environment.SENTRY_PROJECT_KEY}`, sentryLogRequest, {
                observe: 'response',
            })
            .pipe(
                map(response => {
                    return response.body;
                })
            );
    }
}
