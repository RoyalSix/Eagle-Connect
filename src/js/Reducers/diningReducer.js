import * as types from '../Actions/actionTypes';

export function diningReducer(state = {
    loadingDining:false,
    diningItems:{}
}, action) {
    switch (action.type) {
        default:
            return state;
            break;
    }
}

export default diningReducer;