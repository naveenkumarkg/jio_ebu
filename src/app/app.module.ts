import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injectable, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './layouts/error/error.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SignUpComponent } from './blocks/signUp/signUp.component';
import { StateManagementModule } from './state/state.module';
import * as Sentry from '@sentry/browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SecuritySharedModule } from './shared/shared.module';
import { ModalService, ModalModule, InputAccountSelectionModule, VividFooterModule, VividNavModule } from '@mtn-components/vivid';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { OtpComponent } from './blocks/otp/otp.component';
import { PaymentComponent } from './blocks/payment/payment.component';
import { CookieBannerComponent } from './blocks/cookie-banner/cookie-banner.component';
import { CookieModalComponent } from './blocks/cookie-modal/cookie-modal.component';
import { ChooseWorkTitleComponent } from './blocks/choose-work-title/choose-work-title.component';
import { ApplicationSuccessComponent } from './blocks/application-success/application-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiFailureComponent } from './blocks/fall-outs/api-failure/api-failure.component';
import { SubmissionFailureComponent } from './blocks/fall-outs/submission-failure/submission-failure.component';
import { DashboardComponent } from './blocks/dashboard/dashboard.component';
import { BusinessComponent } from './blocks/dashboard/business/business.component';
import { BusinessDetailsComponent } from './blocks/dashboard/business/business-details/business-details.component';
import { HomeComponent } from './blocks/home/home.component';
import { EmployeeDetailsComponent } from './blocks/dashboard/business/employee-details/employee-details.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PersonalDetailsComponent } from './blocks/dashboard/business/personal-details/personal-details.component';
import { SignUpFailureComponent } from './blocks/fall-outs/sign-up-failure/sign-up-failure.component';
import { AgentInfoComponent } from './blocks/agent-info/agent-info.component';
import { AuthExpiredInterceptor } from './interceptors/auth-expired.interceptor';
import { SubscriberAgreementComponent } from './blocks/fall-outs/subscriber-agreement/subscriber-agreement.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GlobalErrorHandler } from './interceptors/global-errorhandler.interceptor';
import { SessionTimeoutComponent } from './blocks/fall-outs/session-timeout/session-timeout.component';

Sentry.init({
    integrations: [
        new Sentry.Integrations.Breadcrumbs({
            console: false,
        }),
    ],
    dsn: '',
    maxValueLength: 700,
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
    constructor() {}

    handleError(error): void {
        Sentry.captureException(error.originalError || error);
    }
}

@NgModule({
    declarations: [
        MainComponent,
        ErrorComponent,
        HomeComponent,
        NavbarComponent,
        MainComponent,
        FooterComponent,
        SignUpComponent,
        PaymentComponent,
        CookieBannerComponent,
        CookieModalComponent,
        OtpComponent,
        ChooseWorkTitleComponent,
        ApplicationSuccessComponent,
        ApiFailureComponent,
        SubmissionFailureComponent,
        DashboardComponent,
        BusinessComponent,
        BusinessDetailsComponent,
        EmployeeDetailsComponent,
        PersonalDetailsComponent,
        SignUpFailureComponent,
        AgentInfoComponent,
        SubscriberAgreementComponent,
        SessionTimeoutComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        SecuritySharedModule.forRoot(),
        NgxWebstorageModule.forRoot(),
        StateManagementModule.forRoot(),
        HttpClientModule,
        CdkStepperModule,
        ModalModule,
        InputAccountSelectionModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PdfViewerModule,
        VividFooterModule,
        VividNavModule,
    ],
    providers: [
        ModalService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
        },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ],
    bootstrap: [MainComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
