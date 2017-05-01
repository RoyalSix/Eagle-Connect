import * as types from '../Actions/actionTypes';

export function homeReducer(state = {
    loggedIn: false,
    username:null
}, action) {
    switch (action.type) {
        case types.RECEIVE_FB_USERNAME:
            return {
                loggedIn:true,
                username:action.name
            }
        default:
            return state;
            break;
    }
}

export default homeReducer;