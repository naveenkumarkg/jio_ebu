import { Injectable } from '@angular/core';
import { ModalService } from '@mtn-components/vivid';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { CloseModalAction, OpenModalAction } from '../actions/modal.action';
import { ModalActionTypes } from '../actions/types/modal.enum';

@Injectable()
export class ModalEffect {
    openModalEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<OpenModalAction>(ModalActionTypes.OPEN_MODAL),
                tap(action => {
                    this.modalService.open(action.payload);
                    document.getElementById(action.payload).focus();
                    window.scroll(0, 0);
                })
            ),
        { dispatch: false }
    );

    closeModalEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<CloseModalAction>(ModalActionTypes.CLOSE_MODAL),
                tap(action => {
                    this.modalService.close(action.payload);
                })
            ),
        { dispatch: false }
    );

    closeCModalEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<CloseModalAction>(ModalActionTypes.CLOSE_MODAL),
                tap(action => {
                    this.modalService.close(action.payload);
                })
            ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, public modalService: ModalService) {}
}
