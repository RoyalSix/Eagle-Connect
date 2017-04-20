import * as types from '../Actions/actionTypes';

export function homeReducer(state = {
    day:"wednesday",
    time:"10:30 AM"
}, action) {
    switch (action.type) {
        default:
            return state;
            break;
    }
}

export default homeReducer;