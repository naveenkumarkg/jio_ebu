import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Navigation } from '../model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    constructor(private http: HttpClient) {}

    public getNavigationRest(navigation: Navigation): Observable<any> {
        const { transactionId, sourceIdentifier, menuItem } = navigation;
        return this.http
            .get(`${environment.CMS_API_URL}/generic/v1/menu-items/${transactionId}/${sourceIdentifier}`, {
                params: {
                    menuItem,
                },
                observe: 'response',
            })
            .pipe(
                map(response => {
                    return response.body;
                })
            );
    }
}
