import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment.prod';
import {
    NavigationEffect,
    TransactionIDEffect,
    ModalEffect,
    TokenEffect,
    SignUpEffect,
    BusinessFormEffect,
    FeedbackEffect,
    SentryLogEffects,
} from './effects';
import {
    handleErrorsAppReducer,
    navigationReducer,
    PersonalDetailsReducer,
    signUpReducer,
    tokenReducer,
    transactionIDReducer,
    businessOwnerDetailsReducer,
    otpReducer,
    feedbackReducer,
    workTitleReducer,
    businessFormReducer,
    MasterAccountReducer,
    agentInfoReducer,
    sentryLogReducer,
} from './reducers';
import { BusinessEffect } from './effects/business-owner-details.effects';
import { OtpEffect } from './effects';
import { TermsEffect } from './effects/terms-and-conditions.effect';
import { termsAndConditionsReducer } from './reducers/terms-and-conditions.reducer';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            'navigation',
            'transactionId',
            'otp',
            'workTitle',
            'token',
            'feedback',
            'signUp',
            'errors',
            'personalDetails',
            'documents',
            'business',
            'masterAccount',
            'agent',
            'terms',
            'log',
        ],
        rehydrate: true,
        storage: sessionStorage,
        checkStorageAvailability: false,
    })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
    imports: [
        StoreModule.forRoot(
            {
                navigation: navigationReducer,
                transactionId: transactionIDReducer,
                otp: otpReducer,
                workTitle: workTitleReducer,
                token: tokenReducer,
                feedback: feedbackReducer,
                signUp: signUpReducer,
                errors: handleErrorsAppReducer,
                personalDetails: PersonalDetailsReducer,
                documents: businessOwnerDetailsReducer,
                business: businessFormReducer,
                masterAccount: MasterAccountReducer,
                agent: agentInfoReducer,
                terms: termsAndConditionsReducer,
                log: sentryLogReducer,
            },
            {
                metaReducers,
            }
        ),
        EffectsModule.forRoot([
            TokenEffect,
            NavigationEffect,
            OtpEffect,
            TransactionIDEffect,
            ModalEffect,
            SignUpEffect,
            BusinessEffect,
            BusinessFormEffect,
            FeedbackEffect,
            TermsEffect,
            SentryLogEffects,
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            features: {
                pause: false,
                lock: true,
                persist: true,
            },
        }),
    ],
    declarations: [],
    providers: [],
    entryComponents: [],
    exports: [],
})
export class StateManagementModule {
    static forRoot(): ModuleWithProviders<StateManagementModule> {
        return {
            ngModule: StateManagementModule,
        };
    }
}
