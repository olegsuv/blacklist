/**
 * Created by Oleg on 14.02.2017.
 */

chrome.tabs.onUpdated.addListener(function(tabId) {
    chrome.tabs.sendMessage(tabId, 'url-update');
});