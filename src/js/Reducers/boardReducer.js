import * as types from '../Actions/actionTypes';

export function boardReducer(state = {
    messages: {},
    userName: null,
    boardVisibility: false
}, action) {
    switch (action.type) {
        case types.GET_BOARD_MESSAGES:
            return {
                messages: action.messages
            }
        case types.GET_BOARD_VISIBILITY:
            return {
                boardVisibility: action.visibility
            }
        default:
            return state;
            break;
    }
}

export default boardReducer;