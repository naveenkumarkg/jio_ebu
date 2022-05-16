import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MasterAccountsDetails, SingUpInfo } from '../model/sign-up.model';

@Injectable({ providedIn: 'root' })
export class SignUpService {
    isAuthenticate = false;
    constructor(private http: HttpClient) {}

    public getSignUpDetails(signUp: SingUpInfo): Observable<any> {
        const { transactionId, sourceIdentifier, msisdn } = signUp;
        return this.http
            .get(`${environment.ENTERPRISE_API_URL}/v1/subscriber-attributes/${transactionId}/${sourceIdentifier}?msisdn=${msisdn}`, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }

    public customerSearch(signUp: SingUpInfo): Observable<any> {
        const { transactionId, sourceIdentifier, msisdn } = signUp;
        return this.http
            .get(`${environment.ENTERPRISE_API_URL}/v1/customer-search/${transactionId}/${sourceIdentifier}?msisdn=${msisdn}`, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }
    public masterAccountDetails(details: MasterAccountsDetails): Observable<any> {
        const { transactionId, sourceIdentifier, customerIdentifier, msisdn } = details;
        return this.http
            .get(
                `${environment.ENTERPRISE_API_URL}/v1/master-customer-account-details/${transactionId}/${sourceIdentifier}?customerIdentifier=${customerIdentifier}&msisdn=${msisdn}`,
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

    isAuthenticateState(): boolean {
        this.isAuthenticate = true;
        return this.isAuthenticate;
    }
}
