import * as types from '../Actions/actionTypes';

export function navigationReducer(state = {
    currentTab: 0,
    day: null,
    time: null,
    tomorrow:null
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
        case types.SET_DAY:
            return {
                ...state,
                day: action.day,
                tomorrow: action.tomorrow
            }
        default:
            return state;
            break;
    }
}

export default navigationReducer;