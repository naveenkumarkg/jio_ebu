import { createSelector } from '@ngrx/store';
import { getTransactionIDSelector } from './transaction-id.selector';
import { getpersonalDetailsSelector } from './personal-details.selector';
import { getSignUpNumber } from './sign-up.selector';
import { getSelectedWorkTitleSelector } from './work-title.selectors';
import { getAgentInfoSelector } from './agent-info.selector';

export const getBusinessDetailsSelector = (state: any) => state.business.businessForm;

export const loadBusinessInformationSelector = createSelector(
    getTransactionIDSelector,
    getSelectedWorkTitleSelector,
    getSignUpNumber,
    getpersonalDetailsSelector,
    getBusinessDetailsSelector,
    getAgentInfoSelector,
    (transactionId, workTitle, accountDetails, personalDetails, businessDetails, agentInfo) => {
        return {
            transactionId,
            workTitle,
            accountDetails,
            personalDetails,
            businessDetails,
            agentInfo,
        };
    }
);
