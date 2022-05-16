import { NavigationActionTypes } from './types';
import { Action } from '@ngrx/store';

export class SetHeaderActionSuccess implements Action {
    readonly type = NavigationActionTypes.LOAD_HEADER_SUCCESS;
    constructor(readonly payload: any) {}
}

export class SetHeaderActionError implements Action {
    readonly type = NavigationActionTypes.LOAD_HEADER_ERROR;
    constructor(readonly payload: any) {}
}

export class SetFooterActionSuccess implements Action {
    readonly type = NavigationActionTypes.LOAD_FOOTER_SUCCESS;
    constructor(readonly payload: any) {}
}

export class SetFooterActionError implements Action {
    readonly type = NavigationActionTypes.LOAD_FOOTER_ERROR;
    constructor(readonly payload: any) {}
}
