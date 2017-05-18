import * as types from '../Actions/actionTypes';

export function boardReducer(state = {
    messages: {},
    boardVisibility: false
}, action) {
    switch (action.type) {
        case types.GET_BOARD_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        case types.GET_BOARD_VISIBILITY:
            return {
                ...state,
                boardVisibility: action.visibility
            }
        default:
            return state;
    }
}

export default boardReducer;