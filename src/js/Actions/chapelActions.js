import * as types from './actionTypes';
import { DOMParser } from 'react-native-html-parser';
import HTMLParser from 'fast-html-parser';

export function startChapelLoad() {
    return function (dispatch) {
        dispatch({
            type: types.START_CHAPEL_LOAD,
            loadingChapels: true
        })
        return getChapels((chapels) => {
            dispatch(recieveChapels(chapels))
        })
    }
}

export function recieveChapels(chapels) {
    return {
        type: types.RECIEVE_CHAPEL_LOAD,
        loadingChapels: false,
        chapels: chapels
    }
}

export function getChapels(callback) {
    fetch('https://www.biola.edu/chapel').then((response) => response.text()).then(function (htmlString) {
        let doc = new DOMParser().parseFromString(htmlString, 'text/html');
        var chapelUnorderedList = doc.getElementsByClassName('chapel-list');
        var chapelList = [];
        for (var i = 0; i < chapelUnorderedList.length; i++) {
            var chapelListItems = chapelUnorderedList[i].querySelect('li');
            for (var j = 0; j < chapelListItems.length; j++) {
                var chapelSplit = chapelListItems[j].childNodes;
                var date = "";
                var title = "";
                var speaker = ""; 
                var location = "";
                try {
                    date = chapelSplit[0].textContent;
                    location = chapelSplit[1].querySelect('.location')[0].textContent;
                    title = chapelSplit[1].querySelect('a')[0].textContent;
                    speaker = chapelSplit[1].querySelect('.subtitle')[0].textContent;
                } catch (e) {
                }
                chapelList.push({
                    date,
                    title,
                    speaker,
                    location
                });
            }
        }
        callback(chapelList);
    });
} 