//for page:  http://stackoverflow.com/questions/39607538/google-chrome-extension-manifest-loading-jquery
//PreventDefault: https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow-cancelation
//StopPropagation: http://stackoverflow.com/questions/7095826/stoppropagation-without-jquery
//prevent clicks: http://stackoverflow.com/questions/1755815/disable-all-click-events-on-page-javascript
//where did the right click happen: http://stackoverflow.com/questions/7703697/how-to-retrieve-the-element-where-a-contextmenu-has-been-executed
var __OurStickysOnPage = {
    contextEvent: null,
    onLoad: function() {
        loadNotes();
        sendMessage({
                action: 'isShowingNotes'
            },
            function(isShowingNotes) {
                showingNotes = isShowingNotes;
                if (!showingNotes) {
                    hideNotes();
                }
            }
        );
    },
    init: function() {
        document.addEventListener("contextmenu", function(event) {
            //right click
            __OurStickysOnPage.contextEvent = event;
        }, true);
        switch (document.readyState) {
            case 'loading':
                // The document is still loading.
            case "interactive":
                // The document has finished loading. We can now access the DOM elements.
                __OurStickysOnPage.onLoad();
                break;
            case "complete":
                // The page is fully loaded.
            default:
                __OurStickysOnPage.onLoad();
        }
        window.addEventListener('resize', adjustNotePointers);
        //listening for messages
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (typeof request === "string") {
                    request = {
                        'action': request
                    };
                }
                switch (request.action) {
                    case 'createNote':
                        sendResponse('created');
                        captureMyNotesClick(__OurStickysOnPage.contextEvent);
                        __OurStickysOnPage.contextEvent = false;
                        break;
                    case 'is_active':
                        sendResponse(true);
                        break;
                    case 'move_to_page':
                        var params = {
                            url: window.location.href,
                            key: request.key,
                        };
                        loadNotes(params.key, params.url);
                        sendResponse(true);
                        break;
                    case 'reloadNotes':
                        __stickys.clearFromPage();
                        loadNotes();
                        sendResponse(true);
                        break;
                    case 'reloadNote':
                        var key_note = request.key;
                        loadNotes(key_note);
                        sendResponse(true);
                        break;
                    case 'loadNotes':
                        loadNotes();
                        sendResponse(true);
                        break;
                    case 'hideAll':
                        hideNotes();
                        showingNotes = false;
                        sendResponse(true);
                        break;
                    case 'hideByChannels':
                        hideNotesByChannels();
                        sendResponse(true);
                        break;
                    case 'showAll':
                        showNotes();
                        showingNotes = true;
                        sendResponse(true);
                        break;
                }
            }
        );
    }
};
__OurStickysOnPage.init();
