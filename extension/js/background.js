/**
 * Created by Oleg on 14.02.2017.
 */

chrome.runtime.onMessage.addListener(function (tab) {
    alert('background chrome.runtime.onMessage 1');
    console.log('background chrome.runtime.onMessage 1', tab);
});

chrome.runtime.onMessage.addListener(function (msg, sender) {
    alert('background chrome.runtime.onMessage 2');
    console.log('background chrome.runtime.onMessage 2', msg, sender, sender.tab.id);
});