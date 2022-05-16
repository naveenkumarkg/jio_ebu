import { WorkTitleActionTypes } from '../actions/types/work-title.enum';
import { WorkTitleAction } from '../actions/work-title.action';

export const initialWorkTitleState = {
    selectedWorkTitle: '',
    currentWorkTitle: '',
};

export function workTitleReducer(state: any = initialWorkTitleState, action: WorkTitleAction): any {
    switch (action.type) {
        case WorkTitleActionTypes.SET_WORK_TITLE:
            return {
                ...state,
                selectedWorkTitle: action.payload,
            };
        case WorkTitleActionTypes.SET_CURRENT_WORK_TITLE:
            return {
                ...state,
                currentWorkTitle: action.payload,
            };
        default:
            return state;
    }
}
