
/**
 * @description Abstracted the methods to recieve the string of an html website from the url
 * 
 * @param {string} url 
 * @param {function} callback 
 */
export function getHTMLFromURL(url, callback) {
    fetch(url).then((response) => response.text()).then((htmlString) => callback(htmlString));
}