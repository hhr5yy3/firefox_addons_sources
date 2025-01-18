var messageMarks = []; // Task #1541
document.documentElement.setAttribute("addonKey", "chrome_addon");

window.addEventListener("message", function (event) {
    //console.info('Window message', event);
    
    if (event.source != window) {
        return;
    }
    
    if (event.data.data && event.data.type && (event.data.type == "EverHelperExtMessage")) {
        var data = event.data.data;
        
        if (!data.action) {
            return;
        }
        
        if(event.data.mark && messageMarks.indexOf(event.data.mark) !== -1) return; //console.info('RECURSION!'); // Task #1541
        
        //chrome.extension.sendMessage( data, function( response ){ // ff
        chrome.runtime.sendMessage(data, function (response) {
            var responseData = {
                action: "_response"
            };
            
            for (var k in response) {
                responseData[k] = response[k];
            }
        
            var mark = 'm_' + String(Math.random());
            messageMarks.unshift(mark);
            messageMarks = messageMarks.slice(0, 100);
            
            window.postMessage({
                type: "EverHelperExtMessage"
                , responseToId: event.data.id
                , data: responseData
                , mark: mark
            }, "*");
        });
    }
}, false);