import { Alert } from 'react-native';
import daysOfWeek from './daysOfWeek';
import chapelPictures from './chapelPictures';
import firebase from './modules/firebase';
const storage = firebase.storage();
var database = firebase.database();
const TWELVE_HOURS = 4.32e+7;
import badWords from 'badwords-list';
const badWordArray = badWords.array;
const badWordRegex = badWords.regex;


/**
 * @description Abstracted the methods to recieve the JSON object of an html website from the url
 * 
 * @param {string} url - http:// ommitted
 * @param {function} callback - callback of function after recieveing data
 */
export function getJSONFromURL(url, callback) {
    var encodedURL = encodeURI(url);
    fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2F${encodedURL}%22&format=json`).then((response) => response.text()).then((htmlString) => {
        if (JSON.parse(htmlString).query) {
            var object = JSON.parse(htmlString).query.results;
            callback(object)
        } else {
            callback(null)
        }
    });
}

/**
 * @description Abstracted the methods to recieve the string of an html website from the url
 * 
 * @param {string} url 
 * @param {function} callback 
 */
export function getHTMLFromURL(url, callback) {
    fetch(url).then((response) => response.text()).then((htmlString) => callback(htmlString));
}

export function getTime() {
    var timeOfDay = "AM";
    function pad(n) {
        return (n < 10) ? '0' + n : n;
    }


    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();

    if (hours > 12) {
        hours -= 12;
        timeOfDay = "PM"
    } else if (hours === 0) {
        hours = 12;
    }

    var todisplay = hours + ':' + pad(minutes) + " " + timeOfDay;
    return todisplay
}

export function getTimeFromDateObject(time) {
    var timeOfDay = "AM";
    function pad(n) {
        return (n < 10) ? '0' + n : n;
    }

    var hours = time.getHours();
    var minutes = time.getMinutes();

    if (hours > 12) {
        hours -= 12;
        timeOfDay = "PM"
    } else if (hours === 0) {
        hours = 12;
    }

    var todisplay = hours + ':' + pad(minutes) + " " + timeOfDay;
    return todisplay
}

export function getDay() {
    var dayAbbr = Date().split(" ")[0];
    return daysOfWeek[dayAbbr];
}

export function convertArrayToMapDining(dataArray, day) {
    var diningCategoryMap = {}; // Create the blank map
    dataArray.forEach(function (diningItem) {
        try {
            const dayOfWeek = diningItem.Day;
            const foodTime = diningItem.FoodTime;
            if (day == dayOfWeek) {
                if (foodTime.split(' and ')) {
                    for (var foodTimeSplit of foodTime.split(' and ')) {
                        if (!diningCategoryMap[foodTimeSplit]) diningCategoryMap[foodTimeSplit] = [];
                        if (!diningCategoryMap[foodTimeSplit].includes(diningItem)) diningCategoryMap[foodTimeSplit].push(diningItem);
                    }
                } else {
                    if (!diningCategoryMap[foodTime]) diningCategoryMap[foodTime] = [];
                     if (!diningCategoryMap[foodTime].includes(diningItem)) diningCategoryMap[foodTime].push(diningItem);
                }
            }
        } catch (e) {
        }
    });
    return diningCategoryMap;
}

export function convertArrayToMapChapels(dataArray) {
    var chapelCategoryMap = {}; // Create the blank map
    var thisWeekChapels = [];
    var nextWeekChapels = [];
    var thisWeekSortedChapels = {};
    var nextWeekSortedChapels = {};
    dataArray.forEach(function (chapelItem) {
        chapelItem["picture"] = chapelPictures[chapelItem.location];
        const dayOfWeek = daysOfWeek[chapelItem.date.split(',')[0]];
        if (!thisWeekSortedChapels[dayOfWeek] || nextWeekSortedChapels["Next " + dayOfWeek]) {
            thisWeekSortedChapels[dayOfWeek] = [];
            nextWeekSortedChapels["Next " + dayOfWeek] = [];
        }
        const chapelDate = new Date(chapelItem.date + " 2017");
        var now = new Date()
        now.setHours(12)
        now.setMinutes(0)
        now.setSeconds(0)
        now.setMilliseconds(0)
        const end_of_week = getThisWeek(now);
        const end_of_next_week = getNextWeek(now);

        if (chapelDate >= now && chapelDate <= end_of_week) {
            thisWeekChapels.push(chapelItem);
        } else if (chapelDate >= end_of_week && chapelDate <= end_of_next_week) {
            nextWeekChapels.push(chapelItem);
        } else {
            var date_month = chapelItem.date.split(',')[1]
            if (!chapelCategoryMap[dayOfWeek + date_month]) chapelCategoryMap[dayOfWeek + date_month] = [];
            chapelCategoryMap[dayOfWeek + date_month].push(chapelItem);
        }

    });
    for (var chapelSorted of thisWeekChapels) {
        const day = daysOfWeek[chapelSorted.date.split(',')[0]];
        thisWeekSortedChapels[day].push(chapelSorted);
    }
    for (var chapelSorted of nextWeekChapels) {
        const day = daysOfWeek[chapelSorted.date.split(',')[0]];
        nextWeekSortedChapels["Next " + day].push(chapelSorted);
    }
    return { ...thisWeekSortedChapels, ...nextWeekSortedChapels, ...chapelCategoryMap };

}

export function getThisWeek(now) {
    var end_of_week = new Date(now.getTime() + (Math.abs(7 - now.getDay()) + 7) * 24 * 60 * 60 * 1000)
    end_of_week.setHours(23)
    end_of_week.setMinutes(59)
    end_of_week.setSeconds(59)
    return end_of_week;
}

export function getNextWeek(now) {
    var end_of_next_week = new Date(now.getTime() + (Math.abs(7 - now.getDay()) + 14) * 24 * 60 * 60 * 1000)
    end_of_next_week.setHours(23)
    end_of_next_week.setMinutes(59)
    end_of_next_week.setSeconds(59)
    return end_of_next_week;
}

export function postMessage(message, username, callback, testMode = false) {
    fetch(`http://www.purgomalum.com/service/xml?text=${message}`).then((response) => response.text()).then((htmlString) => {
        let filteredText = htmlString.match(/<result>(.*)<\/result>/)[1];
        if (!message.match(badWordRegex) && message == filteredText) {
            database.ref(`boardMessages/`).push({
                message,
                username,
                time: Date()
            }).then((snapshot) => {
                return callback(snapshot.key)
            }).catch((err) => { console.log(err) });
        } else if (!testMode) {
            Alert.alert(
                'Oops! You used a rude or inappropriate word.',
                'If you use another you may be banned.',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false }
            )
        }
        callback();
    });

}


export function getBoardMessages(callback) {
    database.ref('boardMessages').on('value', (snapshot) => {
        const data = snapshot.val();
        var updatedData = {};
        for (var messageKey in data) {
            var messageObj = data[messageKey];
            if (new Date() - new Date(messageObj.time) > TWELVE_HOURS) {
                database.ref(`boardMessages/${messageKey}`).remove();
            } else updatedData[messageKey] = messageObj;
        }
        if (updatedData) callback(updatedData);
    })
}

export function getTomorrowDay() {
    const tomorrow = new Date().getDay() + 1 > 7 ? Math.abs((new Date().getDay() + 1) - 7) : new Date().getDay() + 1
    return daysOfWeek[tomorrow];
}

export function getTimeOfDay() {
    var morning_start = new Date();
    morning_start.setHours(7);
    morning_start.setMinutes(0);
    morning_start.setMilliseconds(0);

    var afternoon_start = new Date();
    afternoon_start.setHours(10);
    afternoon_start.setMinutes(30);
    afternoon_start.setMilliseconds(0);

    var night_start = new Date();
    night_start.setHours(4 + 12);
    night_start.setMinutes(30);
    night_start.setMilliseconds(0);

    var night_end = new Date();
    night_end.setHours(7 + 12);
    night_end.setMinutes(30);
    night_end.setMilliseconds(0);

    var currentDate = new Date();
    if (currentDate <= afternoon_start) {
        return "Breakfast";
    } else if (currentDate >= afternoon_start && currentDate <= night_start) {
        return "Lunch";
    }
    else if (currentDate >= night_start) {
        return "Dinner";
    }
}

export function getMessageBoardVisibility(callback) {
    database.ref('showMessageBoard').on('value', (snapshot) => {
        const data = snapshot.val();
        callback(data);
    })
}