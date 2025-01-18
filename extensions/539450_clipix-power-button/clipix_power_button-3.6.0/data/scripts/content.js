/* ----------------------------------------*/
/* Content Script - Trunk version: Firefox, Branches: Chrome, Safari
/* ----------------------------------------*/
var CPBContent = {
    Options: null,
    Iframe: null,
    IframeSrc: "/BrowserExtensions/PowerButton/v3/",
    HoverButon: null,
    HoverButtonVisible: false,
    JCropApi: null,

    IsBlackList: false,
    IsGrayList: false,
    IsNoHoverList: false,

    Initialize: function (options) {
        if (window.top === window) {

            if (options) CPBContent.Options = options;

            // Debug mode
            if (CPBContent.Options && CPBContent.Options.ConsoleDebug) CPBTools.DebugMode = true;
            CPBTools.Debug("CPBContent.Initialize", "Start");

            // Initialize Messaging
            CPBMessaging.Initialize(CPBContent.OnDirectCallMessage);

            // Content Specific ?
            if (typeof (CPBContentSpecific) != "undefined" && CPBContentSpecific) {
                CPBTools.Debug("CPBContent.Initialize", "CPBContentSpecific exists");
                CPBContentSpecific.Initialize();
            }

            // Render/Hide the button
            if (CPBContent.Options) {

                var currentLocation = document.location.hostname + document.location.pathname;
                CPBContent.IsBlackList = $.grep(CPBContent.Options.BlackListWebsites, function (e) { return currentLocation.match(new RegExp(e, "i")); }).length > 0;
                CPBContent.IsGrayList = $.grep(CPBContent.Options.GrayListWebsites, function (e) { return currentLocation.match(new RegExp(e, "i")); }).length > 0;
                CPBContent.IsNoHoverList = $.grep(CPBContent.Options.NoHoverListWebsites, function (e) { return currentLocation.match(new RegExp(e, "i")); }).length > 0;

                // Hover
                if (!CPBContent.IsNoHoverList && !CPBContent.IsBlackList) CPBContent.RenderHoverButton(CPBContent.Options.ModeImageHover);

            }
        }
    },
    OnDirectCallMessage: function (payload) {
        if (!payload.message) return;
        CPBTools.Debug("CPBContent.OnDirectCallMessage", payload.message);
        switch (payload.message) {
            case "showFloatButton":
                CPBContent.Options.UserNotificationCount = payload.argument;
                if (!CPBContent.IsBlackList) CPBContent.RenderButton(true, true, CPBContent.IsGrayList);
                break;
            case "clipButton":
                CPBContent.ActionCallClipButton(payload.argument, "selected");
                break;
            case "capture":
                CPBContent.ActionCapture();
                break;
            case "captureCrop":
                CPBContent.ActionCaptureCrop();
                break;
        }
    },
    InsertContentScript: function (scripts, callback) {

        var count = scripts.length;
        var checkAndCallback = function () {
            if (count === 0 && callback) callback();
        };

        scripts.forEach(function (js) {
            // Firefox
            var script = document.createElement('script');
            script.textContent = js;
            (document.head || document.documentElement).appendChild(script);
            script.remove();

        });
        checkAndCallback();

    },
    RenderButton: function (isShow, isShowOpen, isNoInClipix) {
        if (isShow && $("clipixPB").length > 0) isShow = false;
        if (isShow) {
            if (CPBContent.Iframe) return;

            // Use Template engine ?
            var toolbar = $("<clipixPB />").attr({
                "id": "clipixPowerButton",
                "class": "clipixPB-container clipixPB-toolbar"
            });

            var part1Div = $("<div/>").attr("class", "clipixPB-group inClipix");
            
            // Import only if specific script is present
            if (typeof (CPBContentSpecific) != "undefined" && CPBContentSpecific) {
                var btnImportClips = $("<div />").attr({
                    "class": "clipixPB-button inClipix importClips tooltip-bottom",
                    "data-tooltip": CPBContent.Options.Resources.tipImportClips
                }).appendTo(part1Div);
            }
            // Notification only showing if > 0
            if (CPBContent.Options.UserNotificationCount > 0) {
                var count = $("<span>").attr("class", "counter").html(CPBContent.Options.UserNotificationCount);
                var btnNotifications = $("<div />").attr({
                    "class": "clipixPB-button inClipix notifications tooltip-bottom",
                    "data-tooltip": CPBContent.Options.Resources.tipNotifications
                }).append(count)
                  .appendTo(part1Div);
            }
            part1Div.appendTo(toolbar);

            var part2Div = $("<div/>").attr("class", "clipixPB-group outClipix");
            var btnClipCrop = $("<div />").attr({
                "class": "clipixPB-button clipCrop tooltip-bottom",
                "data-tooltip": CPBContent.Options.Resources.tipClipCrop,
                "data-tooltip2": CPBContent.Options.Resources.tipClipCropShortcut
            }).appendTo(part2Div);
            var btnClipShot = $("<div />").attr({
                "class": "clipixPB-button clipShot tooltip-bottom",
                "data-tooltip": CPBContent.Options.Resources.tipClipShot,
                "data-tooltip2": CPBContent.Options.Resources.tipClipShotShortcut
            }).appendTo(part2Div);
            var btnClipButton = $("<div />").attr({
                "class": "clipixPB-button clipButton tooltip-bottom",
                "data-tooltip": CPBContent.Options.Resources.tipButtonClip
            }).append(CPBContent.Options.Resources.btnSaveIt).appendTo(part2Div);
            var btnSettings = $("<div />").attr("class", "clipixPB-buttonsup wrenchButton").appendTo(part2Div);
            part2Div.appendTo(toolbar);

            if (isNoInClipix) toolbar.addClass("isNoInClipix");
            $("body").append(toolbar);

            // Toolbar events
            var dragTimer = null;
            $(toolbar)
                .addClass(CPBContent.Options.Resources.toolbarClass)
                .draggable({
                    axis: 'y',
                    containment: 'window',
                    //delay: 500,
                    scroll: false
                })
                .on("mousedown", function () {
                    dragTimer = setTimeout(function () { $(toolbar).addClass("isdragging"); }, 200);
                })
                .on("mouseup", function () {
                    clearTimeout(dragTimer);
                    setTimeout(function () { if ($(toolbar).hasClass("isdragging")) $(toolbar).removeClass("isdragging"); }, 200);
                });
            // Clik Outside close
            $(toolbar).on("click", function (event) { event.stopPropagation(); });
            $("html").one("click", function () {
                CPBContent.RenderButton(false);
            });


            // Button events
            $(btnSettings).on("click", function () {
                // Settings Menu
                CPBTools.Debug("PowerButton Setting", "clicked");

                var settingMenu = $("<div />").addClass("clipixPB-popMenu");
                $(settingMenu).append($("<div />").addClass("clipixPB-menuTitle").text(CPBContent.Options.Resources.lblSettingModeImageHover));
                $(settingMenu).append($("<div />").attr({
                    "class": "clipixPB-menuItem",
                    "data-setting": "Selected"
                }).text(CPBContent.Options.Resources.lblSettingModeImageHover_Selected));
                $(settingMenu).append($("<div />").attr({
                    "class": "clipixPB-menuItem",
                    "data-setting": "All"
                }).text(CPBContent.Options.Resources.lblSettingModeImageHover_All));
                $(settingMenu).append($("<div />").attr({
                    "class": "clipixPB-menuItem",
                    "data-setting": "None"
                }).text(CPBContent.Options.Resources.lblSettingModeImageHover_None));
                settingMenu.find("[data-setting='" + CPBContent.Options.ModeImageHover + "']").addClass("active");
                settingMenu.find(".clipixPB-menuItem").on("click", function () {
                    CPBContent.Options.ModeImageHover = $(this).data("setting");
                    CPBContent.ActionUpdateSetting("ModeImageHover", CPBContent.Options.ModeImageHover);

                    settingMenu.find(".clipixPB-menuItem").removeClass("active");
                    $(this).addClass("active");
                });
                $(part2Div).append(settingMenu);


            });

            $(btnClipButton).on("click", function () {
                // Triggered after mouseup 
                if ($(toolbar).hasClass("isdragging")) {
                    $(toolbar).removeClass("isdragging");
                    return;
                }
                if (!$(toolbar).hasClass("isdragging")) {
                    CPBContent.RenderButton(false);
                    CPBContent.ActionCallClipButton();
                    return false;
                }

            });
            $(btnClipShot).on("click", function () {
                CPBContent.RenderButton(false);
                CPBContent.ActionCapture();
            });
            $(btnClipCrop).on("click", function () {
                CPBContent.RenderButton(false);
                CPBContent.ActionCaptureCrop();
            });
            $(btnNotifications).on("click", function () {
                CPBContent.RenderButton(false);
                CPBContent.ActionOpenUserNotifications();
            });
            $(btnImportClips).on("click", function () {
                CPBContent.RenderButton(false);
                CPBContent.ActionOpenImportClips();

            });

            // Show
            setTimeout(function () { toolbar.addClass("isopen"); }, 10);
        } else {
            // Hide and Destroy
            $("clipixPB")
                .one("transitionend", function () { $(this).remove(); })
                .removeClass("isopen");
        }
    },
    RenderHoverButton: function (mode) {
        if (mode != "None") {

            // -- Precheck ---------------------------------------------------------------------------
            var isClipixWidget = ($("[data-clipix-save],#ClipixWidgetApiContainer").length > 0);
            if (isClipixWidget) {
                // Do not show if CX widget
                CPBTools.Debug("ModeImageHover", "Disabled - Clipix Widget");
                return;
            }


            if (!CPBContent.HoverButon || mode == "Reload") {
                // -- Create Button ---------------------------------------------------------------------------
                CPBTools.Debug("ModeImageHover", "Setting: " + CPBContent.Options.ModeImageHover);
                CPBContent.HoverButon = $("<a/>").attr({
                    "id": "clipixHoverButton",
                    "class": "clipixPB-saveit-icon",
                    "href": document.location.protocol + "//" + CPBContent.Options.ContentServer + "/save-this" // TODO - config
                })
                .on("click", function (event) {
                    event.stopImmediatePropagation();
                    if ($(this).data("image")) {
                        var imgSrc = $(this).data("image").src;
                        CPBContent.ActionCallClipButton(imgSrc, "selected");
                    } else {
                        CPBContent.ActionCallClipButton($(this).attr("data-clipixPB-imgsrc"), "selected");

                    }
                    return false;
                });


                // Specific placeholder or Hover ? 
                var specificFound = $.grep(CPBContent.Options.HoverSpecificWebsites, function (e) { return document.location.hostname.match(e.host); });
                var isProductPage = $("meta[property='og:type']").attr("content") == "product" || $("html [itemtype='http://schema.org/Product']").length > 0;
                // --  Specific (Selected) ---------------------------------------------------------------------------
                if (CPBContent.Options.ModeImageHover == "Selected"
                    && specificFound.length > 0 && specificFound[0].placeHolder) {

                    var currentSpecific = specificFound[0];
                    if (currentSpecific.mode === undefined || currentSpecific.mode == null) currentSpecific.mode = 1; // No mode?  => Mode 1 by default

                    CPBTools.Debug("ModeImageHover", "Specific Mode " + currentSpecific.mode + " - Website: " + document.location.hostname);

                    // 1. Creating the button 
                    var createSpecificButton = function () { };
                    if (currentSpecific.mode == 0) {
                        // -- Specific Mode 0 - Off                           
                    }
                    else if (currentSpecific.mode > 0) {
                        // -- Specific Mode 1 or 2 - ON    
                        var multipleSelectors = currentSpecific.placeHolder.split(";");
                        var isFound = false;
                        for (var i = 0; i < multipleSelectors.length; i++) {
                            if ($(multipleSelectors[i]).length > 0) {

                                if (currentSpecific.mode == 1) {
                                    // -- Specific Mode 1 - Placeholder
                                    createSpecificButton = function () {
                                        $(CPBContent.HoverButon)
                                        .addClass("clipixPB-specific")
                                        .addClass(currentSpecific.cfix)
                                        .appendTo($(multipleSelectors[i]));
                                    };
                                } else {
                                    // -- Specific Mode 2 - Price Selector
                                    createSpecificButton = function () {
                                        $(CPBContent.HoverButon)
                                        .addClass("clipixPB-specific")
                                        .addClass(currentSpecific.cfix)
                                        .insertAfter($(multipleSelectors[i]).first());
                                    };
                                }

                                isFound = true;
                                break;
                            }
                        }

                        if (!isFound) CPBTools.Debug("ModeImageHover", "No placeholder found");
                    }

                    // 2. Delay and Events
                    if (specificFound[0].delay) {
                        CPBTools.Debug("ModeImageHover", "Delayed Specific Website: " + document.location.hostname + " / " + specificFound[0].delay);
                        setTimeout(createSpecificButton, specificFound[0].delay);
                    } else {
                        createSpecificButton();
                    }

                    // Page Fragment FW ?
                    if (specificFound[0].evt) {
                        $(document).one(specificFound[0].evt, function (e) {
                            CPBTools.Debug("ModeImageHover", "Fragment Reload: " + e.type);
                            CPBContent.RenderHoverButton("Reload");
                        });
                    }
                }

                // -- Product Pages (Selected) ---------------------------------------------------------------------------
                else if (CPBContent.Options.ModeImageHover == "Selected" && isProductPage) {

                    CPBTools.Debug("ModeImageHover", "Product Mode");

                    var productSelector = "[itemprop='price']:visible";
                    if ($(productSelector).length > 0) {

                        CPBTools.Debug("ModeImageHover", "Product detected");

                        // Beside Product Selector (Price)
                        var el = $(productSelector)[0];
                        var elemRect = CPBTools.GetElemPos(el);
                        var offsetTop = elemRect.top + ($(el).height() / 2);
                        var offsetLeft = elemRect.left + $(el).width();
                        $(CPBContent.HoverButon)
                            .addClass("clipixPB-product")
                            .css({
                                top: offsetTop - 12 + "px", // 24/2 px Height
                                left: offsetLeft + 10 + "px"
                            })
                            .appendTo("body");
                    }
                    else {
                        CPBTools.Debug("ModeImageHover", "No target found...");
                    }
                }
                // -- Generic: Hover ---------------------------------------------------------------------------
                else {

                    CPBTools.Debug("ModeImageHover", "Classic Mode");

                    // -- Delayed check (pinterest?)
                    setTimeout(function () {
                        CPBTools.Debug("ModeImageHover", "Delayed Check");
                        // Pin Widget ?
                        var isPinWidget = $("body[data-pin-hover], body[data-pinterest-extension-installed]").length > 0;
                        if (isPinWidget) {
                            CPBTools.Debug("ModeImageHover", "Margin Left - Pin Widget");
                            CPBContent.HoverButon.css("margin-left", 60 + "px");
                        }
                    }, 1000);

                    // On All images - Pure JS event is more efficient
                    document.body.addEventListener("mouseover", function (e) {
                        var event = e || window.event;
                        var target = event.target || event.srcElement;
                        if (target && target.tagName == "IMG") {
                            CPBContent.ShowHoverButton(target);
                        } else {
                            CPBContent.HideHoverButton(target);
                        }
                    }, false);

                    $(CPBContent.HoverButon)
                       .addClass("clipixPB-hover")
                       .appendTo("body");
                }


            }

        } else {
            $(CPBContent.HoverButon).remove();
            CPBContent.HoverButon = null;
        }
    },
    ShowHoverButton: function (el) {
        if (CPBContent.ValidateHoverImage(el)) {

            CPBTools.Debug("ShowHoverButton", el.src);
            var elemRect = CPBTools.GetElemPos(el);
            var offsetTop = elemRect.top - CPBTools.GetElemCss(el, "margin-top") + 10;
            var offsetLeft = elemRect.left - CPBTools.GetElemCss(el, "margin-left") + 10; // ($(el).width() / 2) - 35; -- middle ?
            if ($(el).css("position") == "relative") {
                offsetTop -= CPBTools.GetElemCss(el, "top");
                offsetLeft -= CPBTools.GetElemCss(el, "left");
            }

            $(CPBContent.HoverButon).css({
                top: offsetTop + "px",
                left: offsetLeft + "px"
            })
            .data("image", el)
            //.attr("data-clipixPB-imgsrc", el.src)
            .show();
            CPBContent.HoverButtonVisible = true;
        }
    },
    HideHoverButton: function (el) {
        if (el != $(CPBContent.HoverButon)[0] && CPBContent.HoverButtonVisible) {
            $(CPBContent.HoverButon).css({
                top: "-10000px",
                left: "-10000px"
            }).hide();
            CPBContent.HoverButtonVisible = false;
        }
    },
    ValidateHoverImage: function (el) {
        var minSize = 100;
        var minRatio = 3;
        var elH = el.height; //  el.naturalHeight || el.height;
        var elW = el.width; // el.naturalWidth || el.width;
        if (CPBContent.Options.ModeImageHover == "Selected") minSize = 271;

        return (el
                && (elH > minSize && elW > minSize)                         // Min Size
                && !(elW / elH < minRatio && elH / elW < (1 / minRatio)));  // Min Ratio
        //&& !el.src.match(/^data/));                                // No Base64
    },
    ActionOpenUserNotifications: function () {

        // Send Reset Notification counter
        CPBMessaging.SendMessage("resetUserNotification");

        var url = "//" + CPBContent.Options.ContentServer + "/UserConnections.aspx?tab=notifications";
        var win = window.open(url, '_blank');
        win.focus();
    },
    ActionOpenImportClips: function () {
        CPBContent.ActionCreateIframe("ImportClips_v3_4.aspx");
    },
    ActionUpdateSetting: function (setting, value) {
        switch (setting) {
            case "ModeImageHover":
                CPBMessaging.SendMessage("updateSettingModeImageHover", value);
                break;
        }

    },
    ActionCallClipButton: function (imageSrc, mode, callback) {
        if (!CPBContent.Options) return; // No option, not initialized

        // Params
        window.CPBParams = [];
        window.CPBParams.push(["version", CPBContent.Options.Version]);
        if (imageSrc) window.CPBParams.push([(mode == "selected") ? "selectedImageSrc" : "captureImageSrc", imageSrc]);
        if (callback) window.CPBParams.push(["callback", callback]);

        window.wrappedJSObject.CPBParams = cloneInto(CPBParams, window);

        if (typeof ClipixSave !== 'undefined') {
            ClipixSave.Initialize();
        } else {
            CPBMessaging.SendMessage("startClipixButton", location.href, function (result) {
                CPBContent.InsertContentScript([result]);
            });
        }

    },
    ActionCapture: function () {

        // Remove Crop if it exists 
        if ($(".clipixPB-coverDiv").length > 0 && CPBContent.JCropApi) {
            CPBContent.JCropApi.destroy();
            $(".clipixPB-coverDiv").remove();
        }

        var flashDiv = $("<div>").attr({ "class": "clipixPB-flashDiv" });
        $("body").append(flashDiv);
        flashDiv
        .animate({ opacity: 0.5 }, 100, function () {
            CPBMessaging.SendMessage("playShutterSound");
            $(this).animate({ opacity: 0 }, 100,
                function () {
                    $(this).remove();
                    CPBMessaging.SendMessage("captureTab", null, function (result) {
                        CPBContent.ActionCallClipButton(result);
                    });
                });
        });

    },
    ActionCaptureCrop: function () {

        if ($(".clipixPB-coverDiv").length > 0) return; // Crop exists already

        var coverDiv = $("<div>").attr({ "class": "clipixPB-coverDiv" });
        $("body").append(coverDiv);

        coverDiv.Jcrop({
            onSelect: function (c) {

                if (CPBContent.JCropApi && c.w < 10 && c.h < 10) {
                    // Cancel
                    CPBContent.JCropApi.destroy();
                    $("clipixPB").show();
                    return;
                }

                var coords = JSON.parse(JSON.stringify(c)); // Clone

                if (!CPBContent.Options.IsCaptureCropRelative) {
                    coords.y += $(window).scrollTop();
                    coords.y2 += $(window).scrollTop();
                }

                // Zoom Factor
                if (window.devicePixelRatio > 1) {
                    var tx = Math.round(coords.x * (window.devicePixelRatio -1)); 
                    var ty = Math.round(coords.y * (window.devicePixelRatio -1));
                    coords.x += tx; 
                    coords.x2 += (tx*2); 
                    coords.y += ty; 
                    coords.y2 += (ty*2);  
                    coords.w = Math.round(coords.w * window.devicePixelRatio);
                    coords.h = Math.round(coords.h * window.devicePixelRatio);
                }

                var jsonString = JSON.stringify(coords);

                CPBTools.Debug("CPBContent.ActionCaptureCrop", "Coord" + jsonString);
                if (coords && coords.w && coords.h) {
                    CPBContent.JCropApi.destroy();
                    CPBMessaging.SendMessage("playShutterSound");
                    CPBMessaging.SendMessage("captureTab", coords, function (result) {
                        CPBContent.ActionCallClipButton(result, "capture");
                    });
                }
            },
            bgColor: 'black',
            bgOpacity: .4,
            //setSelect: [100, 100, 50, 50]
            setSelect: [1, 1, 1, 1],
            minSize: [1, 1]
            //aspectRatio: 0.5
        }, function () { CPBContent.JCropApi = this; });

    },

    ActionCreateIframe: function (page) {

        var iframeSrc = document.location.protocol + "//" + CPBContent.Options.ContentServer + CPBContent.IframeSrc + page + "?t=" + (new Date).getTime();
        iframeSrc += "&locationUrl=" + encodeURI(window.location.href);

        if (CPBContent.Iframe) {
            // Iframe is already open
            //CPBContent.Iframe.src = iframeSrc;
            CPBContent.ActionIframeSendMessage("cpbIframeNavigate", page);
            return;
        }

        var iframeWidth = 350;
        var iframeHeight = 500;
        var iframeElem = $("<iframe>");
        iframeElem
            .attr({
                id: "ClipixPowerButtonIframe",
                "class": "clipixPB-container clipixPB-iframe",
                src: iframeSrc,
                frameBorder: "0"
            })
            .css({
                display: "block",
                position: "fixed",
                height: iframeHeight + "px",
                width: iframeWidth + "px",
                top: "0",
                bottom: "0",
                right: "-" + iframeWidth + "px",
                margin: "0",
                clip: "auto",
                zIndex: "2147483646"
            })
            .on("load", function () {
                if ($(this)[0] != null) {
                    CPBContent.Iframe = $(this)[0];
                    CPBContent.ActionIframeSendMessage("cpbIframeIn", "initialize");
                }
            });

        $(window).on("message", CPBContent.ActionIframeReceiveMessage);

        // Rendering
        if ($("body").length > 0) {
            $("body").append(iframeElem);
            $("body").addClass("clipixPB-hasiframe");
            setTimeout(function () { $("#ClipixPowerButtonIframe").addClass("isopen") }, 250);
        }
    },
    ActionDestroyIframe: function () {
        if (CPBContent.Iframe) {
            $(CPBContent.Iframe).remove();

            $("body").removeClass("clipixPB-hasiframe");

            CPBContent.Iframe = null;
            $(window).off("message", CPBContent.ActionIframeReceiveMessage);
        }
    },
    ActionIframeSendMessage: function (message, param) {
        if (CPBContent.Iframe) {
            var composedMessage = message + "|" + param;
            CPBTools.Debug("ActionIframeSendMessage", composedMessage);

            CPBContent.Iframe.contentWindow.postMessage(composedMessage, CPBContent.Iframe.src);
        }
    },
    ActionIframeReceiveMessage: function (event) {

        if (event && event.originalEvent
            && CPBContent.Iframe
            && CPBContent.Iframe.src.indexOf(event.originalEvent.origin, 0) == 0) {

            var message = event.originalEvent.data;
            CPBTools.Debug("ActionIframeReceiveMessage", message);
            if (typeof message === 'string' && message.indexOf("|") > -1) {

                var msgCommand = message.split("|")[0];
                var msgParam = message.split("|")[1];

                switch (msgCommand) {
                    // -- CPB Iframe ------------------------------------------------                                                                                                                                                                                                   
                    case "cpbIframeOut":
                        if (msgParam == "close") {
                            CPBTools.Debug("Close Window", "");
                            CPBContent.ActionDestroyIframe();
                        }
                        break;
                    // -- Import Clips ------------------------------------------------                                                                                                                                                                                                                         
                    case "importClipsOut":
                        //var param = message.split(";")[1];
                        if (typeof (CPBContentSpecific) != "undefined" && CPBContentSpecific) {
                            if (msgParam == "stop")
                                CPBContentSpecific.RequestStopExecute();
                            else if (msgParam == "check")
                                CPBContentSpecific.CheckPage();
                            else if (msgParam == "readContinue")
                                CPBContentSpecific.Execute(true);
                            else if (msgParam == "readContinueStop")
                                CPBContentSpecific.Execute(true, true);
                            else
                                CPBContentSpecific.Execute();
                        }
                        break;
                }
            }
        }

    }
};

