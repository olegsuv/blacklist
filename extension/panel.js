/**
 * Created by Oleg on 14.02.2017.
 */

var data = {
    "message": "Hello world",
    "status": "info",
    "items": [{
        "comment": "1",
        "url": "\/obyavlenie\/bez-predoplaty-smartfon-bluboo-maya-god-garantii-IDnWPuA.html",
        "phones": ["380504641717"]
    }],
    "success": true
};

$("#result").html($.templates("#panelView").render(data));