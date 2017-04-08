import * as types from '../Actions/actionTypes';

export function newReducer(state = {
    news:{},
    startLoading:false
}, action) {
    switch (action.type) {
        default:
            return state;
            break;
    }
}

export default newReducer;