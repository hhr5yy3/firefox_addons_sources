var CPBContentSpecific = {
    MaxPinDataLimitPerBatch: 2500,
    WarnPinDataLimitPerBatch: 0,
    MaxPinPage: 100,
    LastBookmark: null,

    PinboardUrl: null,
    PinboardId: null,
    PinboardName: null,
    TotalPinCount: null,
    LoadedPins: null,
    StopRequested: false,

    AttributeImported: "cxpb_import",

    //SelectorPinCount: ".BoardPage .PinCount .value, .BoardHeader .pinsAndFollowerCount .pinCount, .BoardHeader .pinsAndFollowerCount .value:first",
    //SelectorBoardName: ".BoardPage .boardName",
    //SelectorPin: ".Pin:not([cxpb_import])",
    //SelectorPinUrl: ".pinHolder a.pinImageWrapper",

    AjaxRequests: [],

    Initialize: function () {

    },
    SendMessageToUI: function (message, param1, param2, param3) {
        // Send Message       
        if (param1) message += ";" + param1;
        if (param2) message += ";" + param2;
        if (param3) message += ";" + param3;

        CPBContent.ActionIframeSendMessage("importClipsIn", message);
    },
    CheckPage: function (callback) {

        CPBContentSpecific.GetPinboardData(document.location.pathname, function (data) {
            var nbPins = -1;
            var boardName = "";
            var boardId = null;
            var boardUrl = null;
            if (data && data.type == "board") {
                nbPins = data.pin_count;
                boardName = data.name;
                boardId = data.id;
                boardUrl = data.url;
            }
            CPBContentSpecific.PinboardName = boardName;
            CPBContentSpecific.TotalPinCount = nbPins;
            CPBContentSpecific.PinboardId = boardId;
            CPBContentSpecific.PinboardUrl = boardUrl;

            CPBContentSpecific.SendMessageToUI("check", nbPins, boardName);
            if (callback) callback((nbPins > 0));
        });

    },
    RequestStopExecute: function () {
        CPBTools.Debug("RequestStopExecute");
        CPBContentSpecific.StopRequested = true;

        // Stop all ajax request
        $.each(CPBContentSpecific.AjaxRequests, function (idx, jqXhr) {
            if (jqXhr) jqXhr.abort();
        });
    },

    CheckStopExecute: function () {
        var result = false;
        if (CPBContentSpecific.StopRequested) {
            result = true;
            CPBContentSpecific.InitializeExecute();
        }
        return result;
    },

    InitializeExecute: function () {
        $(document).scrollTop(0);
        $("[" + CPBContentSpecific.AttributeImported + "]").removeAttr(CPBContentSpecific.AttributeImported);
        CPBContentSpecific.LoadedPins = [];
        //CPBContentSpecific.PinboardName = null;
        CPBContentSpecific.PinboardId = null;
        CPBContentSpecific.PinboardUrl = null;
        CPBContentSpecific.LastBookmark = null;
    },
    Execute: function (isContinue, isStopRead) {

        // End of Scan
        var endScan = function () {

            var url = location.href;

            // Step 3 - Import
            // Send Message To UI
            CPBContentSpecific.SendMessageToUI("import", url, CPBContentSpecific.PinboardName, CPBContentSpecific.LoadedPins.length);

            // Start Import Clips
            CPBContentSpecific.ServerImportClips(url, CPBContentSpecific.PinboardName, CPBContentSpecific.LoadedPins);

        };

        // - new --------------------------------------------------    
        var getAllPins = function (newBookmark, pinData) {

            // Check Stop
            if (CPBContentSpecific.CheckStopExecute()) return false;

            // Store in memory
            $.each(pinData, function (key, value) {
                if (value.type == "pin") {
                    CPBContentSpecific.LoadedPins.push({
                        id: value.id,
                        description: value.description.replace(/(<([^>]+)>)/ig, ""),
                        imageUrl: value.images.orig.url,
                        websiteUrl: value.link,
                        price: value.price_value,
                        currencyCode: value.price_currency
                    });
                }
            });

            // send progress every PAGE
            var loadedPinData = CPBContentSpecific.LoadedPins.length;
            CPBContentSpecific.SendMessageToUI("read", loadedPinData, CPBContentSpecific.TotalPinCount);

            // Is Over the max batch ?
            var div = Math.floor(loadedPinData / CPBContentSpecific.MaxPinDataLimitPerBatch);
            if (div > CPBContentSpecific.WarnPinDataLimitPerBatch) {

                CPBContentSpecific.WarnPinDataLimitPerBatch = div; // Save warn                
                CPBContentSpecific.LastBookmark = newBookmark; // Save last bookmark for next executions

                //Send message
                CPBContentSpecific.SendMessageToUI("readBatch", loadedPinData);

                //Exit loop
                return false;
            }

            // Next loop if not end
            if (newBookmark == "-end-") {
                endScan();
            }
            else {
                CPBContentSpecific.GetPinterestBoardFeed(CPBContentSpecific.PinboardUrl, CPBContentSpecific.PinboardId, newBookmark, getAllPins);
            }
        };

        if (!isContinue) {
            // Init
            CPBContentSpecific.InitializeExecute();

            // Check PinCount fisrt
            CPBContentSpecific.CheckPage(function (result) {
                if (result) {
                    // Inial call
                    CPBContentSpecific.StopRequested = false;

                    // Step 2 - Read
                    CPBContentSpecific.SendMessageToUI("read");
                    CPBContentSpecific.GetPinterestBoardFeed(CPBContentSpecific.PinboardUrl, CPBContentSpecific.PinboardId, CPBContentSpecific.LastBookmark, getAllPins);
                }
            });

        } else {
            //Continue Call
            if (!isStopRead) {
                // Step 2 - Read
                CPBContentSpecific.SendMessageToUI("read");
                CPBContentSpecific.GetPinterestBoardFeed(CPBContentSpecific.PinboardUrl, CPBContentSpecific.PinboardId, CPBContentSpecific.LastBookmark, getAllPins);
            } else {
                endScan();
            }
        }

    },
    GetPinboardData: function (pinboardUrl, callback) {
        $.ajax({
            url: document.location.origin + pinboardUrl,
            success: function (data) {
                if (callback) {
                    var pwsData = (new DOMParser().parseFromString(data, "text/html")).getElementById("__PWS_DATA__");
                    var result = {};
                    if (pwsData) {
                        try {
                            var data = JSON.parse(pwsData.text);
                            if (data && data.props && data.props.initialReduxState && data.props.initialReduxState.boards) {
                                // Boards data?
                                var boards = data.props.initialReduxState.boards;
                                var bdata = (boards.content) ? boards.content[Object.keys(boards.content)[0]] : boards[Object.keys(boards)[0]];

                                if (bdata && bdata.type == "board") {

                                    result.type = bdata.type;
                                    result.pin_count = bdata.pin_count;
                                    result.name = bdata.name;
                                    result.id = bdata.id;
                                    result.url = bdata.url;
                                }
                            }
                        }
                        catch (err) {
                            // Wrong data...
                        }
                    }
                    callback(result);
                }
            }
        });
    },
    GetPinterestBoardFeed: function (url, boardId, bookmark, callback) {

        var requestData = {
            "options": {
                "board_id": boardId,
                "bookmarks": [bookmark],
                "page_size": CPBContentSpecific.MaxPinPage
            }
        };

        var xhr =
            $.ajax({
                url: document.location.origin + "/resource/BoardFeedResource/get/",
                data: {
                    source_url: url,
                    data: JSON.stringify(requestData)
                },
                success: function (data) {
                    var newBookmark = data.resource.options.bookmarks[0];
                    var pinData = data.resource_response.data;
                    if (callback) callback(newBookmark, pinData);
                },
                complete: function (jqXhr) {
                    var index = CPBContentSpecific.AjaxRequests.indexOf(jqXhr);
                    if (index > -1) {
                        CPBContentSpecific.AjaxRequests.splice(index, 1);
                    }
                }
            });


        // Save ajax request for cancelling
        CPBContentSpecific.AjaxRequests.push(xhr);
    },

    ServerImportClips: function (pageUrl, folderName, pinsData) {

        CPBContentSpecific.SendMessageToUI("importData", pageUrl, folderName, JSON.stringify(pinsData));
    }

};
