import * as types from '../Actions/actionTypes';

//Create reducer to receive data from action
export function eventReducer(state = {
    loadingEvents: false,
    events:{}
}, action) {
    switch (action.type) {
        case types.START_EVENT_LOAD:
        return {
            ...state,
            loadingEvents:true
        }
                case types.RECEIVE_EVENT_LOAD:
        return {
            ...state,
            events:action.events,
            loadingEvents:false
        }
        default:
            return state;
            break;
    }
}

export default eventReducer;