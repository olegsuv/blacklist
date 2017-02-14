/**
 * Created by Oleg on 14.02.2017.
 */

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        var phones = $('.contact-button.link-phone strong span').map(function () {
            return $(this).text()
        });

        sendResponse(phones);
    }
});