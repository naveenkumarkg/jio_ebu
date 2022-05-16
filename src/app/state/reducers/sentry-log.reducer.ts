import { SentryLogsActionTypes } from '../actions/types';
import { SentryLogsAction } from '../actions';

export const initialSentryLogRequestState = null;

export function sentryLogReducer(state: any = initialSentryLogRequestState, action: SentryLogsAction): { log: any } {
    if (action.type === SentryLogsActionTypes.SUBMIT_SUCCESS) {
        return {
            ...state,
            log: action.payload,
        };
    } else {
        return state;
    }
}
