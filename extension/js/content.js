/**
 * Created by Oleg on 14.02.2017.
 */

function grabPhones() {
    var phonesDom = $(selectors.phoneBlock).find(selectors.textPhones);
    if (!phonesDom.length) {
        phonesDom = $(selectors.phoneBlock).find(selectors.textOnePhone);
    }
    var phones = [];
    for (var i = 0; i < phonesDom.length; i++) {
        var currentPhone = $(phonesDom).eq(i).text();
        currentPhone = '38' + currentPhone.replace(/\+380/ig, '0').replace(/\s/ig, '').replace(/-/ig, '');
        phones.push(currentPhone);
    }
    return phones;
}

function sendData() {
    return {
        phones: grabPhones(),
        url: location.pathname
    }
}

var selectors = {
    phoneBlock: '.contact-button.link-phone',
    getPhone: '.spoiler',
    textOnePhone: 'strong',
    textPhones: 'strong span'
};

// lets get phones
// $(selectors.phoneBlock).find(selectors.getPhone).click();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    response(sendData());
});
