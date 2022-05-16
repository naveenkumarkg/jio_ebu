import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SendOtpRequest, ValidateOtpRequest } from '../model';

@Injectable({ providedIn: 'root' })
export class OtpService {
    constructor(private http: HttpClient) {}

    public sendOtp(sendOtpRequest: SendOtpRequest): Observable<any> {
        return this.http
            .post(`${environment.ENTERPRISE_API_URL}/v1/send-otp`, sendOtpRequest, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }

    public reSendOtp(sendOtpRequest: SendOtpRequest): Observable<any> {
        return this.http
            .post(`${environment.ENTERPRISE_API_URL}/v1/resend-otp`, sendOtpRequest, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }

    public validateOtp(validateOtpRequest: ValidateOtpRequest): Observable<any> {
        return this.http
            .post(`${environment.ENTERPRISE_API_URL}/v1/validate-otp`, validateOtpRequest, {
                observe: 'response',
            })
            .pipe(
                map((response: any) => {
                    return response.body;
                })
            );
    }
}
