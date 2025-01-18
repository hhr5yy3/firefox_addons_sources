CONTEXT_ITEM_CLICKED_EVENT = "PearltreesMenuItemClicked";

if (window.top === window && typeof PearltreesContextItem === 'undefined') { //not in an iframe

    PearltreesContextItem = {

        currentSourcePageUrl: "",
        currentLayout: "",
        currentTitle: "",
        currentContentText: "",
        isInit : false,
        excludedLink : false,

        init : function () {
            if (!PearltreesContextItem.isInit) {
                PearltreesContextItem.isInit = true;
//                PealtreesPearlItButton.log("CI " + typeof PTAddonConfig);
//                PealtreesPearlItButton.log("CI " + PTAddonConfig.CS_EXCLUDED_PATTERN);
                if (!PearltreesContentHelper.isExcludedSite(location.href)) {
                    PearltreesContextItem.listenToBackgroundCommandEvent();
                    PearltreesContextItem.listenToRightClick();
                }
            }
            if (PearltreesContextItem.isSafariEnv()) {
                safari.self.addEventListener("message", function (messageEvent) {
                    if (messageEvent.name == "alertMessage") {
                        alert(messageEvent.message);
                    }
                }, false);
            }
            if (PearltreesContextItem.isFirefoxEnv()) {
                self.port.on('alertMessage', function(data) {
                    alert(data);
                });
            }
        },

        listenToRightClick : function() {
            jUtils.listen(jUtils.getBody(), 'contextmenu',
                function(event) {
                    PearltreesContextItem.handleRightClick(event);
                }
            );
    //        jUtils.listen(window, 'contextmenu',
    //            function(event) {
    //                PearltreesContextItem.handleRightClick(event);
    //            }
    //        );
        },

        handleRightClick : function(event) {
            PearltreesContextItem.excludedLink = false;
            PearltreesContextItem.collectDataToPearl(event, function() {
                if (PearltreesContextItem.currentLayout == "video") {//do not pearl video for now
                    PearltreesContextItem.setToCurrentPage();
                }
                if (PearltreesContextItem.isFirefoxEnv()) {
                    self.port.emit('contextMenuOpen', PearltreesContextItem.currentLayout, PearltreesContextItem.currentSourcePageUrl, PearltreesContextItem.currentLayout == PearltreesContentHelper.TEXT_LAYOUT ? encodeURIComponent(PearltreesContextItem.currentContentText) : PearltreesContextItem.currentContentText);
                }
            });
        },

        collectDataToPearl : function(event, onCollected) {
            var selectedText = jUtils.getSelectionText();
            var getATagParent = PearltreesContextItem.findATagParentNode(event.target);
            var isTargetInALink = getATagParent != null;
            var isSelectedByRightClickOnLink = isTargetInALink && (selectedText.toString() == getATagParent.innerText); //fix bug Safari
            if (!isSelectedByRightClickOnLink && selectedText && !selectedText.isCollapsed) {
                var selectedTextInStr = selectedText.toString();
                if (PearltreesContextItem.isChromeEnv() || PearltreesContextItem.isSafariEnv()) {
                    selectedTextInStr = encodeURIComponent(selectedTextInStr);
                }
                PearltreesContextItem.collect(selectedTextInStr, PearltreesContentHelper.TEXT_LAYOUT, document.URL);
                onCollected();
                return;
            }

            var callbackSpecialSite = function(target, url, layout, pageUrl, origin, offset) {
                PearltreesContextItem.collect(url, layout, pageUrl ? pageUrl : document.URL);
                onCollected();
            }
            if (PearltreesContentHelper.isSpecialSiteImage(event.target, callbackSpecialSite, "window", true)) {
                return;
            }

            var acceptSmallImage = true;
            PearltreesContentHelper.isImagePearlabled(event.target,
                function(img, url) {//callbackYes
                    PearltreesContextItem.collect(url, PearltreesContentHelper.IMAGE_LAYOUT, document.URL);
                    onCollected();
                },
                function() {//callbackNo
                    PearltreesContentHelper.isVideoPearlabled(event.target, "window",
                        function(target, url, layout, origin) {
                            PearltreesContextItem.collect(url, layout, document.URL);
                            onCollected();
                        },
                        function() {
                            var linkRightClicked = PearltreesContentHelper.isLinkPearlabled(event.target);
                            linkRightClicked = linkRightClicked.replace("^", "%5E"); //bug yahoo
                            if (linkRightClicked) {
                                PearltreesContextItem.excludedLink = PearltreesContentHelper.isExcludedSite(linkRightClicked);
                                PearltreesContextItem.collect(linkRightClicked, PearltreesContentHelper.LINK_LAYOUT, document.URL);
                                onCollected();
                                return;
                            }
                            PearltreesContextItem.setToCurrentPage();
                            onCollected();
                        }
                    );
                },
                acceptSmallImage
            )
        },

        collect: function(content, layout, pageUrl) {
            PearltreesContextItem.currentContentText = content;
            PearltreesContextItem.currentLayout = layout;
            PearltreesContextItem.currentSourcePageUrl = pageUrl;
            PearltreesContextItem.currentTitle = null;
        },

        findATagParentNode : function(target) {
            if (!target) {
                return null;
            }
            if (target.tagName && target.tagName.toLowerCase() == "a") {
                return target;
            }
            if (target.parentNode) {
                return PearltreesContextItem.findATagParentNode(target.parentNode);
            }
            return null;
        },

        setToCurrentPage: function() {
            PearltreesContextItem.currentSourcePageUrl = document.URL;
            PearltreesContextItem.currentTitle = document.title.replace(/^\s*|\s*$/g,'');
            PearltreesContextItem.currentLayout = "";
            PearltreesContextItem.currentContentText = "";
        },

        listenToBackgroundCommandEvent : function() {
            if (PearltreesContextItem.isChromeEnv()) {
                chrome.runtime.onMessage.addListener(
                    function(request, sender, sendResponse) {
                        if (request.action == CONTEXT_ITEM_CLICKED_EVENT) {
                            PearltreesContextItem.completeWithInformationsFromChromeBackgroundIfIframe(request.info);
                            PearltreesContextItem.pearlWithCollectedData();
                        }
                    }
                );
            }
            if (PearltreesContextItem.isSafariEnv()) {
                safari.self.addEventListener("message",
                    function(event) {
                        if (event.name == CONTEXT_ITEM_CLICKED_EVENT && event.message == document.URL)
                            PearltreesContextItem.pearlWithCollectedData();
                    },
                    false
                );
            }
        },

        pearlWithCollectedData : function() {
            if (PearltreesContextItem.excludedLink) {
                PearltreesContextItem.alertSomething("excludedSite");
                return;
            }
            if (PearltreesContextItem.isChromeEnv() || PearltreesContextItem.isSafariEnv()) {
                pearltreesOverlay.showOverlay();
                PealtreesPearlItButton.requestUserButtonParametersWithCallBack(function(data) {
                    jUtils.setInputValue(PealtreesPearlItButton.PEARL_BUTTON_FAKE_FORM_ID, 'url', PearltreesContextItem.currentSourcePageUrl);
                    jUtils.setInputValue(PealtreesPearlItButton.PEARL_BUTTON_FAKE_FORM_ID, 'title', PearltreesContextItem.currentLayout ? document.title.replace(/^\s*|\s*$/g,'') : null);
                    jUtils.setInputValue(PealtreesPearlItButton.PEARL_BUTTON_FAKE_FORM_ID, 'layout', PearltreesContextItem.currentLayout);
                    jUtils.setInputValue(PealtreesPearlItButton.PEARL_BUTTON_FAKE_FORM_ID, 'buttonParams', data);
                    jUtils.setInputValue(PealtreesPearlItButton.PEARL_BUTTON_FAKE_FORM_ID, 'text', PearltreesContextItem.currentContentText);
                    document.getElementById(PealtreesPearlItButton.PEARL_BUTTON_FAKE_FORM_ID).submit();
                });
            }
        },

        alertSomething: function(key){
            if (PearltreesContextItem.isChromeEnv()) {
                chrome.runtime.sendMessage({messageKey: key}, function(response) {
                    alert(response.message);
                });
            }
            if (PearltreesContextItem.isSafariEnv()) {
                safari.self.tab.dispatchMessage("alertMessage", key);
            }
            if (PearltreesContextItem.isFirefoxEnv()) {
                self.port.emit("alertMessage", key);
            }
        },

        completeWithInformationsFromChromeBackgroundIfIframe: function(info) {
            if (info.frameUrl) {
                if (info.selectionText && !info.linkUrl) {
                    PearltreesContextItem.collect(info.selectionText, PearltreesContentHelper.TEXT_LAYOUT, document.URL);
                    return;
                }
                if (info.mediaType == 'image' && info.srcUrl) {
                    PearltreesContextItem.collect(info.srcUrl, PearltreesContentHelper.IMAGE_LAYOUT, document.URL);
                    return;
                }
                if (info.linkUrl) {
                    PearltreesContextItem.collect(info.linkUrl, PearltreesContentHelper.LINK_LAYOUT, document.URL);
                    return;
                }
            }
        },

        flushCurrentData: function() {
            PearltreesContextItem.currentContentText = "";
            PearltreesContextItem.currentLayout = "";
            PearltreesContextItem.currentContentText = "";
        },

        /* ENV */
        pearlerType : "chrome",
        isFirefoxEnv : function() {
            return PealtreesPearlItButton.pearlerType == "firefox";
        },

        isSafariEnv : function() {
            return PealtreesPearlItButton.pearlerType == "safari";
        },

        isChromeEnv : function() {
            return PealtreesPearlItButton.pearlerType == "chrome";
        }
    }

	if (typeof PearltreesContentHelper !== 'undefined' && typeof PealtreesPearlItButton !== 'undefined' && PealtreesPearlItButton.isLoaded) {
		PearltreesContextItem.init();
	}
}

