import {DELETE_NEWSPAPER, SET_NEWSPAPERS, START_NEWSPAPER_LOADING, STOP_NEWSPAPER_LOADING} from "../actions/types";

const initialState = { newspapers: [], showNewspapersLoading: { visibility: 'hidden' } };

export default function NewsPaperReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_NEWSPAPERS:
            return payload
                ? {
                    ...state,
                    newspapers: payload
                }
                : state;
        case DELETE_NEWSPAPER:
            return {
                ...state,
                newspapers: state.newspapers.filter((e) => e.newsId !== payload.newsId)
            };
        case STOP_NEWSPAPER_LOADING:
            return {
                ...state,
                showNewspapersLoading: { visibility: 'hidden' }
            };
        case START_NEWSPAPER_LOADING:
            return {
                ...state,
                showNewspapersLoading: { visibility: 'visible' }
            };
        default:
            return state;
    }
}