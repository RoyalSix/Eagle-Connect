import daysOfWeek from './daysOfWeek';
import chapelPictures from './chapelPictures';

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

    var todisplay = pad(hours) + ':' + pad(minutes) + " " + timeOfDay;
    return todisplay
}

export function convertArrayToMap(dataArray) {
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
    return {...thisWeekSortedChapels, ...nextWeekSortedChapels, ...chapelCategoryMap};

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