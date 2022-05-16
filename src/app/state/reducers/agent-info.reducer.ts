import { AgentInfoActionTypes } from '../actions/types';
import { AgentInfoAction } from '../actions';

export const initialAgentInfoState = {
    agentInfo: null,
};

export function agentInfoReducer(state: any = initialAgentInfoState, action: AgentInfoAction): any {
    switch (action.type) {
        case AgentInfoActionTypes.SET_AGENT_FORM:
            return {
                ...state,
                agentInfo: action.payload,
            };
        default:
            return state;
    }
}
