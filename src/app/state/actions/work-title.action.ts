import { Action } from '@ngrx/store';
import { WorkTitleActionTypes } from './types/work-title.enum';

export class SetWorkTitleAction implements Action {
    readonly type = WorkTitleActionTypes.SET_WORK_TITLE;
    constructor(readonly payload: any) {}
}

export class SetCurrentWorkTitleAction implements Action {
    readonly type = WorkTitleActionTypes.SET_CURRENT_WORK_TITLE;
    constructor(readonly payload: any) {}
}
export type WorkTitleAction = SetWorkTitleAction | SetCurrentWorkTitleAction;
