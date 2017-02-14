/**
 * Created by Oleg on 14.02.2017.
 */

// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);
    alert(domContent);
}

// When the browser-action button is clicked...
chrome.browserAction.getPopup.addListener(function (tab) {
    alert('clicked');
    chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
});
