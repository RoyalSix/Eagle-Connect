/**
 * @file Redux actions for the chapel container
 * {@link http://redux.js.org/docs/basics/Actions.html}
 */

import * as types from './actionTypes';
//Using constants instead of strings to differentiate types of actions
import { DOMParser } from 'react-native-html-parser';
//This is an external library used to parse html. React native does not 
//support this natively
import * as API from '../API'


/**
 * @description - This is a redux action that will initiate a chapel load.
 * This does two things for us:
 *  - This will allow us to have a field in the store that says chapels are loading
 *      if we ever wanted to show a loading screen.
 *  - This will allow us to fetch the chapels from an HTTP request (fetch) and send
 *      them back to the store asychoronously
 */
export function startNewsLoad() {
    return function (dispatch) {
        /*The dispatch fucntion allows us to call other redux actions
         * Also referred to the dispatcher 
         * This will allow us to also to perform asychoronous actions
         * {@link http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators}
         */

        dispatch({
            type: types.START_NEWS_LOAD,
            loadingNews: true
        })

        /**
         * This is the function that gets called to get the chapels, 
         * when the callback is called (once the chapels are received)
         * then recieveChapels will be called with that same data being passed
         * {@link https://medium.freecodecamp.com/javascript-callbacks-explained-using-minions-da272f4d9bcd}
         */
        return getNewsItems((chapels) => {
            //We have access to chapels here because of the callback
            dispatch(recieveNewsItems(chapels))
        })
    }
}

/**
 * @description - This function is a redux action that sends the chapels to the store
 * So that our components can use it as props
 * The type 'RECEIVE_CHAPEL_LOAD' specifies which reducer will recieve the action.
 * 
 * @param {object} chapels 
 */
export function recieveNewsItems(news) {
    return {
        type: types.RECIEVE_NEWS_LOAD,
        loadingNews: false,
        news: news
    }
}


/**
 * @description - This redux action gets the chapels from an html string and returns them
 * in a callback.
 * 
 * @param {function} callback 
 */
export function getNewsItems(callback) {
    callback();
}