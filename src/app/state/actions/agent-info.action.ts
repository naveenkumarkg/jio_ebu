import { Action } from '@ngrx/store';
import { AgentInfoActionTypes } from './types';

export class SetAgentInfoAction implements Action {
    readonly type = AgentInfoActionTypes.SET_AGENT_FORM;
    constructor(readonly payload: any) {}
}

export class SubmitAgentInfoAction implements Action {
    readonly type = AgentInfoActionTypes.SUBMIT_AGENT_FORM;
    constructor() {}
}

export class SubmitAgentInfoSuccessAction implements Action {
    readonly type = AgentInfoActionTypes.SUBMIT_AGENT_SUCCESS;
    constructor(readonly payload: any) {}
}

export class SubmitAgentInfoErrorAction implements Action {
    readonly type = AgentInfoActionTypes.SUBMIT_AGENT_ERROR;
    constructor(readonly payload: any) {}
}

export type AgentInfoAction = SetAgentInfoAction | SubmitAgentInfoAction | SubmitAgentInfoSuccessAction | SubmitAgentInfoErrorAction;
