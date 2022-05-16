import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SubmitSentryLog } from '../state/actions';
import { TransactionIdGenerator } from '../shared';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error): void {
        const store = this.injector.get(Store);
        const sentryRequestBody = this.getCustomSentryLogRequest(error);
        store.dispatch(new SubmitSentryLog(sentryRequestBody));
    }

    private getCustomSentryLogRequest(err): any {
        const router = this.injector.get(Router);

        return {
            event_id: TransactionIdGenerator.generateTransactionId(),
            sdk: {
                name: 'sentry.javascript.browser',
                packages: [
                    {
                        name: 'npm:@sentry/browser',
                        version: '5.6.3',
                    },
                ],
                version: '5.6.3',
                integrations: [
                    'InboundFilters',
                    'FunctionToString',
                    'TryCatch',
                    'Breadcrumbs',
                    'GlobalHandlers',
                    'LinkedErrors',
                    'UserAgent',
                ],
            },
            platform: 'javascript',
            request: {
                url: router.url,
                headers: {
                    'User-Agent': window.navigator.userAgent,
                },
            },
            exception: {
                values: [
                    {
                        type: 'Error',
                        value: err.message,
                    },
                ],
            },
        };
    }
}
