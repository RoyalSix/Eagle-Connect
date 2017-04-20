import * as types from '../Actions/actionTypes';

export function navigationReducer(state = {
    currentTab:0
}, action) {
    switch (action.type) {
        case types.CHANGE_TAB:
        return {
            ...state,
           currentTab: action.currentTab
        }
        default:
            return state;
            break;
    }
}

export default navigationReducer;