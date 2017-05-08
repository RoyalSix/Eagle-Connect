import * as types from '../Actions/actionTypes';

export function newReducer(state = {
    news: {},
    loadingNews: false
}, action) {
    switch (action.type) {
        case types.START_NEWS_LOAD:
            //This types.XXXX should be the same as
            //the corresponding action you are dispatching
            return {
                ...state,
                loadingNews: true
            }
            /*...state is javascript ES6 syntax for the spread operator
             * Just think of it as copying over everything from the state
             * and merging it will the new fields specified
             * {@see http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html}
             * for more information
             */
            break;
        case types.RECIEVE_NEWS_LOAD:
            return {
                ...state,
                loadingNews: false,
                news: action.news
            }
        default:
            return state;
            break;
    }
}

export default newReducer;