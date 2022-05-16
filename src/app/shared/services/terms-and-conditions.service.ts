import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Terms } from '../model/terms.model';

@Injectable({ providedIn: 'root' })
export class TermsService {
    constructor(private http: HttpClient) {}
    public getTermsAndConditions(terms: Terms): Observable<any> {
        const { transactionId, sourceIdentifier, type } = terms;
        return this.http
            .get(
                `${environment.CMS_API_URL}/generic/v1/media/${transactionId}/${sourceIdentifier}?mediaType=ebu-skhokho-terms-conditions`,
                {
                    observe: 'response',
                }
            )
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }
}
