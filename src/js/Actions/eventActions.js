
import * as types from './actionTypes';
//Using constants instead of strings to differentiate types of actions
import { DOMParser } from 'react-native-html-parser';
//This is an external library used to parse html. React native does not 
//support this natively

//Creating action that will start the load
export function startEventLoad() {
    return function (dispatch) {
        dispatch({
            type: types.START_EVENT_LOAD,
            loadingEvents: true
        })

        return getEvents((events) => {
            dispatch(receiveEventLoad(events))
        })
    }
}

//Creating action that will send the events to the store
export function receiveEventLoad(events) {
    return {
        type: types.RECEIVE_EVENT_LOAD,
        loadingEvents: false,
        events: events
    }
}

//Creating action that will get HTML data
export function getEvents(callback) {
    getHTMLFromURL('https://www.biola.edu/events/search?page=%5Binsert', function (htmlString) {

        //Document created for parsing html
        let doc = new DOMParser().parseFromString(htmlString, 'text/html');
        //Get parent class name for each event item on website
        //This is the common class name for each event 
        var eventNodes = doc.getElementsByClassName('event-item event-list-item');
        //Get parent class name for each event item on website
        //This is the common class name for each event

        var allEvents = getArrayOfEventsFromNodeList(eventNodes);
        callback(allEvents);
    });
}

//Function with job of getting the raw HTML from website
//And returns it in a callback
export function getArrayOfEventsFromNodeList(nodeList) {
    //Create array for events
    var eventList = [];

    //Create loop
    for (var i = 0; i < nodeList.length; i++) {
        //For first loop, run until items are found 
        var eventListItems = nodeList[i].querySelect('li');
        //date and time
        var eventTitleItems = nodeList[i].querySelect('.title');
        //title
        var eventSubtitleItems = nodeList[i].querySelect('.subtitle');
        //subtitle

        //Initialize values as empty strings        
        var date = "";
        var time = "";
        var title = "";
        var speaker = "";

        //Variable to check <a> tags for titles
        var check = "";

        try {
            //Use text content to make title, speaker, date, and time
            date = eventListItems[1].textContent;
            time = eventListItems[2].textContent;

            // check = eventTitleItems[0].textContent;
            
            // //If the first <a> tag is NOT null, make that the title
            // if (check == "")
            // {
            //     title = eventTitleItems[1].textContent;
            // }

            // else
            // {
            //     title = eventTitleItems[0].textContent;
            // }

            title = eventTitleItems[0].textContent;
            speaker = eventSubtitleItems[0].textContent;

        } catch (e) {

        }

        //Push the content of these variables back to the array
        eventList.push({
            date,
            time,
            title,
            speaker
        });
    }

    //Return array at end of function
    return eventList;
}

//Function to fetch HTML from url 
export function getHTMLFromURL(url, callback) {
    fetch(url).then((response) => response.text()).then((htmlString) => callback(htmlString));
}