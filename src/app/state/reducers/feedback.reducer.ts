import { FeedbackAction } from '../actions/feedback.action';
import { FeedbackActionTypes } from '../actions/types/feedback.enum';

export const initialFeedbackState = {
    feedbackRating: '',
    feedbackComment: '',
    feedbackResponse: '',
};

export function feedbackReducer(state: any = initialFeedbackState, action: FeedbackAction): any {
    switch (action.type) {
        case FeedbackActionTypes.SET_FEEDBACK:
            return {
                ...state,
                feedbackRating: action.payload.feedbackRating,
                feedbackComment: action.payload.feedbackComment,
            };
        case FeedbackActionTypes.SET_FEEDBACK_SUCCESS:
            return {
                ...state,
                feedbackResponse: action.payload,
            };
        case FeedbackActionTypes.SET_FEEDBACK_ERROR:
            return {
                ...state,
                feedbackResponse: action.payload,
            };
        default:
            return state;
    }
}
