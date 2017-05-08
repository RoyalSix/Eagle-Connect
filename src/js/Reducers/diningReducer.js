//COMPLETE

import * as types from '../Actions/actionTypes';

export function diningReducer(state = {
    dining: [],
    loadingDining: false
}, action) {
    switch (action.type) {
        case types.START_DINING_LOAD:

            return {
                ...state,
                loadingDining: true
            }
            break;
        case types.RECEIVE_DINING_LOAD:
            return {
                ...state,
                loadingDining: false,
                dining:action.dining
            }
        default:
            return state;
            break;
    }
} 

export default diningReducer;