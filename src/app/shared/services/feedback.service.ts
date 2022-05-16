import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FeedbackRequest } from '../model';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
    constructor(private http: HttpClient) {}

    public sendFeedback(feedback: FeedbackRequest): Observable<FeedbackRequest> {
        return this.http
            .post(`${environment.ENTERPRISE_API_URL}/v1/review`, feedback, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }
}
