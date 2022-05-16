import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusinessDocument, RemoveDocument } from '../model/business-document.model';

@Injectable({ providedIn: 'root' })
export class BusinessService {
    constructor(private http: HttpClient) {}

    public uploadDocumentDetails(file: BusinessDocument): Observable<any> {
        return this.http
            .post(`${environment.ENTERPRISE_API_URL}/wcc/v2/document-upload/`, file, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }

    public removeDocumentDetails(file: RemoveDocument): Observable<any> {
        return this.http
            .post(`${environment.ENTERPRISE_API_URL}/wcc/v1/document-remove/`, file, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }
}
