
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