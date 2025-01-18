chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "inspectElement") {
        try {
            console.log("Inspect", request.element);
            chrome.devtools.inspectedWindow.eval('inspect('+ request.element+')',function (result, isException) {
                console.log("Xpath", result, isException);
                if(isException) {
                    //xPath failed, try attribute backup
                    console.log("Try Attribute");
                    console.log(request.elementAttribute, "inspect($$('[inspectTarget=\""+ request.elementAttribute+"\"]')[0])");
                    chrome.devtools.inspectedWindow.eval("inspect($$('[inspectTarget=\""+ request.elementAttribute+"\"]')[0])",function (result, isException) {
                        console.log("Attribute", result, isException);
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
        sendResponse({"success" : true});
    }
});