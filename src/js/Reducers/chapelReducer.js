import * as types from '../Actions/actionTypes';
//This will give us constant strings so that we are not 
//Just creating types out of thin air that may or may not be used somewhere else

//This is the initial state that will be in the store for the chapelReducer
//You should have every field here that you might expect to present state
//sometime during the lifetime of the app
export function chapelReducer(state = {
    chapels: [],
    loadingChapels: false
}, action) {
    switch (action.type) {
        case types.START_CHAPEL_LOAD:
        //This types.XXXX should be the same as
        //the corresponding action you are dispatching
            return {
                ...state,
                loadingChapels: true
            }
            /*...state is javascript ES6 syntax for the spread operator
             * Just think of it as copying over everything from the state
             * and merging it will the new fields specified
             * {@see http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html}
             * for more information
             */
            break;
        case types.RECIEVE_CHAPEL_LOAD: 
            return {
                ...state,
                loadingChapels: false,
                chapels:action.chapels
            }
        default:
            return state;
            break;
    }
}

export default chapelReducer;