import * as types from '../Actions/actionTypes';

export function boardReducer(state = {
    messages:{}
}, action) {
    switch (action.type) {
        case types.GET_BOARD_MESSAGES: 
        return {
            messages:action.messages
        }
        default:
            return state;
            break;
    }
}

export default boardReducer;