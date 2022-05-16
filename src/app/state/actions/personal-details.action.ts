import { Action } from '@ngrx/store';
import { PersonalDetails } from 'src/app/shared/model/personal-details.model';
import { personalDetailsTypes } from './types';

export class SetPersonalDetailsAction implements Action {
    readonly type = personalDetailsTypes.SET_PERSONAL_DETAILS;
    constructor(readonly payload: PersonalDetails) {}
}
