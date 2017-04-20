import * as types from '../Actions/actionTypes';

export function homeReducer(state = {
    day:"wednesday",
    time:null
}, action) {
    switch (action.type) {
        case types.SET_TIME:
        return {
            ...state,
            time:action.time
        }
        default:
            return state;
            break;
    }
}

export default homeReducer;