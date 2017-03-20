import * as types from '../Actions/actionTypes';

export function chapelReducer(state = {
    chapels: [],
    loadingChapels: false
}, action) {
    switch (action.type) {
        case types.START_CHAPEL_LOAD:
            return {
                ...state,
                loadingChapels: true
            }
            break;
        case types.RECIEVE_CHAPEL_LOAD:
            return {
                ...state,
                loadingChapels: false,
                chapels:action.chapels
            }
        default:
            return state;
            break;
    }
}

export default chapelReducer;