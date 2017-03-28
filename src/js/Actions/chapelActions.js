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
        var currentWeekChapelsNodes = doc.getElementsByClassName('chapel-list active');
        var otherChapelsNodes = doc.getElementsByClassName('chapel-list');
        var activeChapels = getArrayOfChapelsFromNodeList(currentWeekChapelsNodes);
        var otherChapels = getArrayOfChapelsFromNodeList(otherChapelsNodes);
        var allChapels = activeChapels.concat(otherChapels);
        callback(allChapels);
    });
}

export function getArrayOfChapelsFromNodeList(nodeList) {
    var chapelList = [];
    for (var i = 0; i < nodeList.length; i++) {
        var chapelListItems = nodeList[i].querySelect('li');
        for (var j = 0; j < chapelListItems.length; j++) {
            var chapelSplit = chapelListItems[j].childNodes;
            var date = "";
            var title = "";
            var speaker = "";
            var location = "";
            try {
                title = chapelSplit[1].querySelect('.title')[0].textContent
                date = chapelSplit[0].textContent;
                location = chapelSplit[1].querySelect('.location')[0].textContent;
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
    return chapelList;
}