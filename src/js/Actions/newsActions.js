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
        return getNewsItems((news) => {
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

export function getNewsItems(callback){
    //newsobjects = {};

    //API.getJSONFromURL('chimes.biola.edu/news/feed',function(results){
    getHTMLFromURL('chimes.biola.edu/news/feed', function(results){

        var main = results.rss.channel.item;
        debugger;

        //API.each(main, function(i, val){ });
        
        let doc = new DOMParser().parserFromString(results, 'text/html');
        
        var newsNodes = doc.getElementsByClassName('results')
        var newsobjects = getArrayofNewsItems(newsNodes)

         callback(newsobjects);
         debugger;
     });
}

export function getArrayofNewsItems(nodeList) {
    var newsList = [];
    debugger;

    for(var i = 0; i < nodeList.length; i++){
        var newsListItems = nodeList[i].querySelect('li');

        //var newsListItems = nodeList[i].querySelect('.meta');
        //var newsTitleItems = nodeList[i].querySelect('h2');
        //var newsSubtitleItems = nodeList[i].querySelect('.blurb');

        for (var j = 0; j < nodeListItems.length; j++){
            var newsSplit = newsSplitItems[j].childNodes;

            var date = "";
            var title = "";
            var author = "";
            var description = "";
            var link = "";

            try{
                title = newsSplit[1].querySelect('.title')[0].textContent;
                date = newsSplit[1].querySelect('.pubDate')[0].textContent;
                link = newsSplit[1].querySelect('.link')[0].textContent;
                description = newsSplit[1].querySelect('.description')[0].textContent;
                author = newsSplit[1].querySelect('.dc:creator')[0].textContent;
            } catch (e){
            }

            newsList.push({
                title, 
                link,
                description,
                author,
                date
            });

        }
    }
    return newsList;
}

export function getHTMLFromURL(url, callback){
    fetch(url).then((response)=> response.text()).then((htmlstring)=> callback(htmlString));
}
