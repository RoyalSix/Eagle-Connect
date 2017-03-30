import * as types from '../Actions/actionTypes';

//Create reducer to receive data from action
export function eventReducer(state = {
}, action) {
    switch (action.type) {
        default:
            return state;
            break;
    }
}

export default eventReducer;