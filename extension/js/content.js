/**
 * Created by Oleg on 14.02.2017.
 */

function grabPhones() {
    return $(selectors.phoneBlock).find(selectors.textPhone).map(function () {
        return $(this).text();
    });
}

var selectors = {
    phoneBlock: '.contact-button.link-phone',
    getPhone: '.spoiler',
    textPhone: 'strong span',
    message: '.message',
    addToBlacklist: '.addToBlacklist'
};

// chrome.runtime.sendMessage(grabPhones());

// lets get phones
$(selectors.phoneBlock).find(selectors.getPhone).click();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    response(grabPhones());
});
