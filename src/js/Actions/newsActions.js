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
        getNewsItems((news) => {
            //We have access to chapels here because of the callback
            dispatch(recieveNewsItems(news))
        })
        getExtraNewsItems((news) => {
            //We have access to chapels here because of the callback
            dispatch(recieveNewsItems(news))
        })
    }
}

/**
 * @description - This function is a redux action that sends the chapels to the store
 * So that our components can use it as props
 * The type 'RECIEVE_CHAPEL_LOAD' specifies which reducer will recieve the action.
 * 
 * @param {object} news 
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
    API.getJSONFromURL('chimes.biola.edu/news/feed/', function (htmlString) {
        var main = htmlString.body.rss.channel.item;
        var newsobjects = [];
        for (var newsItem of main) {
            var title = "";
            var description = "";
            var author = "";
            var date = "";

            try {
                var title = newsItem.content.split('http')[0];
                var description = newsItem.description;
                var author = newsItem.creator.content;
                var date = newsItem.pubdate;
            } catch (e) {
            }
            newsobjects.push({
                title,
                description,
                author,
                date
            })
        }
        callback(newsobjects);
    });
}

export function getExtraNewsItems(callback) {
    API.getHTMLFromURL('https://www.parsehub.com/api/v2/projects/t6wjq5ENy15n/last_ready_run/data?api_key=tYB1vcfaP10q', function (htmlString) {
        const newsItems = JSON.parse(htmlString).newsitem;
        var newsobjects = [];
        for (var item of newsItems) {
            var title = "";
            var description = "";
            var author = "";

            try {
                var title = item.header;
                var description = item.description;
                var author = item.author;
            } catch (e) {
            }
            newsobjects.push({
                title,
                description,
                author
            })
        }
        callback(newsobjects);
    });
}