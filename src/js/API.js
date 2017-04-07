
/**
 * @description Abstracted the methods to recieve the string of an html website from the url
 * 
 * @param {string} url 
 * @param {function} callback 
 */
export function getJSONFromURL(url, callback) {
    var encodedURL = encodeURI(url);
    fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2F${encodedURL}%22&format=json`).then((response) => response.text()).then((htmlString) => {
        if (JSON.parse(htmlString).query) {
            var object = JSON.parse(htmlString).query.results.body;
            callback(object)
        } else {
            callback(null)
        }
    });
}