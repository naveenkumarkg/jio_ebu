import { Action } from '@ngrx/store';
import { ModalActionTypes } from './types/modal.enum';

// Open modal
export class OpenModalAction implements Action {
    readonly type = ModalActionTypes.OPEN_MODAL;
    constructor(readonly payload: any) {}
}

// Close modal
export class CloseModalAction implements Action {
    readonly type = ModalActionTypes.CLOSE_MODAL;
    constructor(readonly payload: any) {}
}
