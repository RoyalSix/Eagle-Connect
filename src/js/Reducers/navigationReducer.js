import * as types from '../Actions/actionTypes';

export function navigationReducer(state = {
    currentTab: 0,
    day:"wednesday",
    time:null
}, action) {
    switch (action.type) {
        case types.CHANGE_TAB:
            return {
                ...state,
                currentTab: action.currentTab
            }
        case types.SET_TIME:
            return {
                ...state,
                time: action.time
            }
        default:
            return state;
            break;
    }
}

export default navigationReducer;