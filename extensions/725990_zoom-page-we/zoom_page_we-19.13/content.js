/************************************************************************/
/*                                                                      */
/*      Zoom Page WE - Generic WebExtension - Content Pages             */
/*                                                                      */
/*      Javascript for Content Pages                                    */
/*                                                                      */
/*      Last Edit - 16 Apr 2023                                         */
/*                                                                      */
/*      Copyright (C) 2014-2023 DW-dev                                  */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE.txt file and http://www.gnu.org/licenses/           */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/* Refer to Google Chrome developer documentation:                      */
/*                                                                      */
/*  https://developer.chrome.com/extensions/content_scripts             */
/*  https://developer.chrome.com/extensions/messaging                   */
/*                                                                      */
/*  https://developer.chrome.com/extensions/match_patterns              */
/*                                                                      */
/*  https://developer.chrome.com/extensions/runtime                     */
/*  https://developer.chrome.com/extensions/storage                     */
/*                                                                      */
/************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;
var ffVersion;

var platformOS;

var zoomMode,browserPerSite,cssFullZoom;
var enableScaling,onloadScaling;
var enableCtrl789,enableRightWheel,modifyCtrlWheel;
var defaultOtherLevel,autoMinLevel,autoMaxLevel;
var adjustTextFont,textFontFamily;
var adjustLineSpace,lineSpaceFactor;
var applyToDynamic;

var zm_bps_cssFullZoom;

var zoomType = 0;
var zoomLevel = 100;
var fontSize = 0;

var frameIndex;

var observer,timeout;

var observerFinished = false;
var timeoutFinished = false;
var storageFinished = false;

var initialized = false;
var prepared = false;

var iterCount,iterLimit,iterString;

var naturalWidth,naturalHeight;

var fitToWindow = false;

var rightZoom = false;
var scrollTimeout = null;

var equalCursorData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABmSURBVDhP3Y9bDoAgDAS5/6U124dZaEvRTyfZBLtTDCPhWnKMLKz4HMIO02vgqJrDUgh1KSIAnLM49h2wugeursxY3QNXV2as/v4EwEIIdSUi7YCjas3zN8bnlJZqIZu95n+XjHEDh3Yl6fGNCcUAAAAASUVORK5CYII=";

var debugEnable = false;

/************************************************************************/

/* Initialize on script load */

/* Determine frame index */

if (window.parent == window.top)
{
    for (frameIndex = 0; frameIndex < window.parent.length; frameIndex++)
    {
        if (window.parent.frames[frameIndex] == window) break;
    }
}
else frameIndex = "#";

if (debugEnable) console.log("[" + frameIndex + "] " + "STARTED");

/* Hide document contents in case text zoom or minimum font size will be applied */
/* Wait for <head> element to be created before appending <style> element */
/* or if observer skipped or no <head> element wait for timeout to expire */

observer = new MutationObserver(
function(mutations)
{
    mutations.forEach(
    function(mutation)
    {
        var i,style;
        
        for (i = 0; i < mutation.addedNodes.length; i++)
        {
            if (mutation.addedNodes[i].nodeType == 1 && mutation.addedNodes[i].localName == "head")
            {
                /* Hide document contents */
                
                style = document.createElement("style");
                style.id = "zoompage-initialize-style";
                style.type = "text/css";
                style.textContent = "html { opacity: 0.0 }";
                document.head.appendChild(style);
                
                /* Stop observer and timeout */
                
                observer.disconnect();
                window.clearTimeout(timeout);
                
                /* Wait for page to load */
                
                observerFinished = true;
                
                if (debugEnable) console.log("[" + frameIndex + "] " + "OBSERVER FINISHED");
                
                if (storageFinished) waitResponse();
            }
        }
    });
});

observer.observe(document.documentElement,{ childList: true });
 
timeout = window.setTimeout(
function()
{
    /* Stop observer */
    
    observer.disconnect();
    
    /* Wait for page to load */
    
    timeoutFinished = true;
    
    if (debugEnable) console.log("[" + frameIndex + "] " + "TIMEOUT FINISHED");
    
    if (storageFinished) waitResponse();
},0);

chrome.storage.local.get(null,
function(object)
{
    /* Load environment */
    
    isFirefox = object["environment-isfirefox"];
    
    if (isFirefox) ffVersion = object["environment-ffversion"];
    
    platformOS = object["environment-platformos"];
    
    /* Load options */
    
    zoomMode = object["options-zoommode"];
    browserPerSite = object["options-browserpersite"];
    cssFullZoom = object["options-cssfullzoom"];
    
    enableScaling = object["options-enablescaling"];
    onloadScaling = object["options-onloadscaling"];
    
    enableCtrl789 = object["options-enablectrl789"];
    enableRightWheel = (platformOS == "win") ? object["options-enablerightwheel"] : false;
    modifyCtrlWheel = object["options-modifyctrlwheel"];
    
    defaultOtherLevel = object["options-defaultotherlevel"];
    autoMinLevel = object["options-autominlevel"];
    autoMaxLevel = object["options-automaxlevel"];
    
    adjustTextFont = object["options-adjusttextfont"];
    textFontFamily = object["options-textfontfamily"];
    
    adjustLineSpace = object["options-adjustlinespace"];
    lineSpaceFactor = object["options-linespacefactor"];
    
    applyToDynamic = object["options-applytodynamic"];
    
    zm_bps_cssFullZoom = !(zoomMode == 0 && browserPerSite) && cssFullZoom;
    
    /* Add listeners */
    
    addListeners();
    
    /* Wait for page to load */
    
    storageFinished = true;
    
    if (debugEnable) console.log("[" + frameIndex + "] " + "STORAGE FINISHED");
    
    if (observerFinished || timeoutFinished) waitResponse();
});

/************************************************************************/

/* Add listeners */

function addListeners()
{
    /* Key event listeners */
    
    document.addEventListener("keydown",onKeyDown,true);
    
    /* Mouse event listeners */
    
    document.addEventListener("contextmenu",onContextMenu,true);
    document.addEventListener("wheel",onWheel,{ passive: false, capture: true });  /* Firefox - wheel event listener is now passive by default - see  Bug 1691727 */
    
    /* Resize event listeners */
    
    window.addEventListener("resize",onResize,true);
    
    /* Storage changed listener */
    
    chrome.storage.onChanged.addListener(
    function(changes,areaName)
    {
        var image;
        
        if ("options-zoommode" in changes) zoomMode = changes["options-zoommode"].newValue;
        if ("options-browserpersite" in changes) browserPerSite = changes["options-browserpersite"].newValue;
        if ("options-cssfullzoom" in changes) cssFullZoom = changes["options-cssfullzoom"].newValue;
        
        if ("options-enablescaling" in changes) enableScaling = changes["options-enablescaling"].newValue;
        if ("options-onloadscaling" in changes) onloadScaling = changes["options-onloadscaling"].newValue;
        
        if ("options-enablectrl789" in changes) enableCtrl789 = changes["options-enablectrl789"].newValue;
        if ("options-enablerightwheel" in changes) enableRightWheel = (platformOS == "win") ? changes["options-enablerightwheel"].newValue : false;
        if ("options-modifyctrlwheel" in changes) modifyCtrlWheel = changes["options-modifyctrlwheel"].newValue;
        
        if ("options-defaultotherlevel" in changes) defaultOtherLevel = changes["options-defaultotherlevel"].newValue;
        if ("options-autominlevel" in changes) autoMinLevel = changes["options-autominlevel"].newValue;
        if ("options-automaxlevel" in changes) autoMaxLevel = changes["options-automaxlevel"].newValue;
        
        if ("options-adjusttextfont" in changes) adjustTextFont = changes["options-adjusttextfont"].newValue;
        if ("options-textfontfamily" in changes) textFontFamily = changes["options-textfontfamily"].newValue;
        
        if ("options-adjustlinespace" in changes) adjustLineSpace = changes["options-adjustlinespace"].newValue;
        if ("options-linespacefactor" in changes) lineSpaceFactor = changes["options-linespacefactor"].newValue;
        
        if ("options-applytodynamic" in changes) applyToDynamic = changes["options-applytodynamic"].newValue;
        
        if ("options-enablescaling" in changes)
        {
            if (document.contentType.substr(0,5) == "image" && document.contentType != "image/svg+xml")
            {
                image = document.body.children[0];
                
                image.removeEventListener("mouseup",onMouseUpImage,true);
                
                image.style.removeProperty("cursor");
                
                if (enableScaling)
                {
                    image.addEventListener("mouseup",onMouseUpImage,true);
                    
                    setImageCursor();
                }
            }
        }
        
        zm_bps_cssFullZoom = !(zoomMode == 0 && browserPerSite) && cssFullZoom;
    });
    
    /* Message received listener */
    
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        var style;
        
        switch (message.type)
        {
            /* Messages from background page for all frames */
            
            case "setzoomtypelevel":
                
                if (!initialized) break;
                
                zoomType = message.zoomtype;
                zoomLevel = message.zoomlevel;
                
                /* Set CSS full zoom level */
                
                style = document.getElementById("zoompage-zoomlevel-style");
                
                if (style == null && message.zoomtype == 0 && message.zoomlevel != 100 && zm_bps_cssFullZoom)
                {
                    /* Add style element for CSS full zoom */
                    
                    style = document.createElement("style");
                    style.id = "zoompage-zoomlevel-style";
                    style.type = "text/css";
                    document.head.appendChild(style);
                }
                
                if (style != null)
                {
                    if (message.zoomtype == 0 && zm_bps_cssFullZoom)
                    {
                        if (!isFirefox) style.textContent = "body { zoom: " + (message.zoomlevel/100) + "; }";
                        else style.textContent = "body { transform-origin: left top; transform: scale(" + (message.zoomlevel/100) + "," + (message.zoomlevel/100) + "); }";
                    }
                    else style.textContent = "";
                }
                
                /* Set text zoom level */
                
                style = document.getElementById("zoompage-fontsize-style");
                
                if (style == null && message.zoomtype == 1 && message.zoomlevel != defaultOtherLevel)
                {
                    /* Prepare document for text zoom and minimum font size */
                    
                    if (!prepared) prepareDocument();
                    
                    prepared = true;
                    
                    /* Add style element for text zoom and minimum font size */
                    
                    style = document.createElement("style");
                    style.id = "zoompage-fontsize-style";
                    style.type = "text/css";
                    document.head.appendChild(style);
                }
                
                if (style != null)
                {
                    style.textContent = buildFontSizeRules(message.zoomtype,message.zoomlevel,fontSize);
                }
                
                break;
                
            case "setfontsize":
                
                if (!initialized) break;
                
                fontSize = message.fontsize;
                
                /* Set minimum font size */
                
                style = document.getElementById("zoompage-fontsize-style");
                
                if (style == null && message.fontsize > 0)
                {
                    /* Prepare document for text zoom and minimum font size */
                    
                    if (!prepared) prepareDocument();
                    
                    prepared = true;
                    
                    /* Add style element for text zoom and minimum font size */
                    
                    style = document.createElement("style");
                    style.id = "zoompage-fontsize-style";
                    style.type = "text/css";
                    document.head.appendChild(style);
                }
                
                if (style != null)
                {
                    style.textContent = buildFontSizeRules(zoomType,zoomLevel,message.fontsize);
                }
                
                break;
                
            case "tabactivated":
                
                rightZoom = false;
                
                scrollTimeout = window.setTimeout(function() { scrollTimeout = null; },200);  /* in case previous active tab was scrolling - start inertia scroll timeout */
                
                break;
                
            /* Messages from background page only for main frame */
            
            case "autofitstart":
                
                autofitIterate(message.setsite,true);
                
                break;
                
            case "autofititerate":
                
                autofitIterate(message.setsite,false);
                
                break;
        }
    });
}

/************************************************************************/

/* Wait for response from background page */

function waitResponse()
{
    var timeout;
    
    timeout = window.setTimeout(
    function()
    {
        if (debugEnable) console.log("[" + frameIndex + "] " + "RESPONSE TIMEOUT");
        
        waitPageLoad(false);
    },100);
    
    chrome.runtime.sendMessage({ type: "scriptloaded", contenttype: document.contentType },
    function(response)
    {
        var prepare;
        
        if (debugEnable) console.log("[" + frameIndex + "] " + "RESPONSE RECEIVED");
        
        if (chrome.runtime.lastError != null)
        {
            if (debugEnable) console.log("[" + frameIndex + "] " + "RESPONSE LASTERROR: " + chrome.runtime.lastError.message);
        }
        else
        {
            window.clearTimeout(timeout);
            
            if (chrome.runtime.lastError != null) prepare = false;
            else if (document.contentType == "image/svg+xml") prepare = false;
            else prepare = ((response.zoomtype == 1 && response.zoomlevel != defaultOtherLevel) || response.fontsize > 0);
            
            waitPageLoad(prepare);
        }
    });
}

/************************************************************************/

function waitPageLoad(prepare)
{
    var style;
    
    if (debugEnable) console.log("[" + frameIndex + "] " + "PREPARE: " + prepare);
    
    /* Show document contents if text zoom and minimum font size will not be applied */
    
    if (!prepare)
    {
        style = document.getElementById("zoompage-initialize-style");
        if (style) document.head.removeChild(style);
    }
    
    /* Wait for DOM content to load before initializing */
    
    if (document.readyState == "complete")
    {
        initializeDocument(prepare);
        
        initialized = true;
        
        chrome.runtime.sendMessage({ type: "initialized" });
        
        if (document.contentType.substr(0,5) == "image" && document.contentType != "image/svg+xml")
        {
            chrome.runtime.sendMessage({ type: "imageloaded" });
            
            initializeImage();
        }
    }
    else if (document.readyState == "interactive")
    {
        initializeDocument(prepare);
        
        initialized = true;
        
        chrome.runtime.sendMessage({ type: "initialized" });
        
        window.addEventListener("load",
        function(event)
        {
            if (document.contentType.substr(0,5) == "image" && document.contentType != "image/svg+xml")
            {
                chrome.runtime.sendMessage({ type: "imageloaded" });
                
                initializeImage();
            }
        },false);
    }
    else  /* document.readyState == "loading" */
    {
        window.addEventListener("DOMContentLoaded",
        function(event)
        {
            initializeDocument(prepare);
            
            initialized = true;
            
            chrome.runtime.sendMessage({ type: "initialized" });
        },false);
        
        window.addEventListener("load",
        function(event)
        {
            if (!initialized)  /* in case DOMContentLoaded event missed or not fired */
            {
                initializeDocument(prepare);
                
                initialized = true;
                
                chrome.runtime.sendMessage({ type: "initialized" });
            }
            
            if (document.contentType.substr(0,5) == "image" && document.contentType != "image/svg+xml")
            {
                chrome.runtime.sendMessage({ type: "imageloaded" });
                
                initializeImage();
            }
        },false);
    }
}

/************************************************************************/

/* Initialize document on load */

function initializeDocument(prepare)
{
    var style;
    
    if (prepare)
    {
        /* Prepare document for text zoom and minimum font size */
        
        prepareDocument();
        
        prepared = true;
    }
    
    /* Show document contents - always do this even if prepare not true */
    
    window.setTimeout(  /* allow time for CSS to be applied */
    function()
    {
        while ((style = document.getElementById("zoompage-initialize-style")) != null)
        {
            document.head.removeChild(style);
        }
    },50);
}

/************************************************************************/

/* Prepare document for text zoom and minimum font size */

function prepareDocument()
{
    var observer;
    var starttime,endtime;
    var elements;  /* NodeList */
    
    starttime = performance.now();
    
    /* Make list of all elements in document that can contain visible text nodes */
    
    elements = document.querySelectorAll("body, body *, frameset, frameset *");
    
    /* Add font size attribute to elements */
    
    addFontSizeAttribute(elements);
    
    /* Add mutation observer to detect added nodes in document */
    
    observer = new MutationObserver(
    function(mutations)
    {
        var elementcount,starttime,endtime;
        
        elementcount = 0;
        starttime = performance.now();
        
        mutations.forEach(
        function(mutation)
        {
            var i,stylefontsize,stylepriority,origfontsize;
            var elements;  /* NodeList */
            
            for (i = 0; i < mutation.addedNodes.length; i++)
            {
                if (mutation.addedNodes[i].nodeType == 1)
                {
                    /* Remember style font-size property and priority for mutation target element */
                    
                    stylefontsize = mutation.target.style.getPropertyValue("font-size");
                    stylepriority = mutation.target.style.getPropertyPriority("font-size");
                    
                    /* Apply original font-size to mutation target element */
                    
                    if (mutation.target.hasAttribute("zoompage-fontsize"))
                    {
                        origfontsize = mutation.target.getAttribute("zoompage-fontsize");
                        mutation.target.style.setProperty("font-size",origfontsize + "px","important");
                    }
                    
                    /* Make list of elements beneath added node that can contain visible text nodes */
                    
                    elements = mutation.addedNodes[i].querySelectorAll("body, body *, frameset, frameset *");
                    
                    /* Remove font size attribute from added elements - in case they were previously part of document */
                    
                    removeFontSizeAttribute(elements);
                    removeFontSizeAttribute([mutation.addedNodes[i]]);  /* added node not included in elements */
                    
                    /* Add font size attribute to added elements */
                    
                    addFontSizeAttribute(elements);
                    addFontSizeAttribute([mutation.addedNodes[i]]);  /* added node not included in elements */
                    
                    /* Reinstate style font-size property and priority for mutation target element */
                    
                    if (stylefontsize == "") mutation.target.style.removeProperty("font-size");
                    else mutation.target.style.setProperty("font-size",stylefontsize + "px",stylepriority);
                    
                    elementcount += elements.length;
                }
            }
        });
        
        endtime = performance.now();
        
        if (debugEnable) console.log("Mutation Time: " + (endtime-starttime).toFixed(1) + "ms  -  Element Count: " + elementcount);
    });
    
    if (applyToDynamic) observer.observe(document.body,{ childList: true, subtree: true });  /* <body> or top-level <frameset> */
    
    endtime = performance.now();
    
    if (debugEnable) console.log("Prepare Time: " + (endtime-starttime).toFixed(1) + "ms  -  Element Count: " + elements.length);
    
    /* Content size may have changed - scroll to anchor position */
    
    if (location.hash) location.hash = location.hash;
}

/************************************************************************/

/* Auto Fit Zoom */

/************************************************************************/
/*                                                                      */
/*  innerWidth  - width of window including scrollbar if any            */
/*              - window.innerWidth                                     */
/*                                                                      */
/*  clientWidth - width of visible content excluding scrollbar if any   */
/*              - window.innerWidth less width of scrollbar if any      */
/*              - html.clientWidth or body.clientWidth                  */
/*                                                                      */
/*  scrollWidth - width of document content                             */
/*              - html.scrollWidth or body.scrollWidth                  */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Firefox Browser Zoom - html.scrollWidth == or >= html.clientWidth   */
/*                       - body.scrollWidth == or >= body.clientWidth   */
/*                                                                      */
/*  Firefox CSS Zoom     - html.scrollWidth == or >= html.clientWidth   */
/*                       - body.scrollWidth always == body.clientWidth  */
/*                                                                      */
/*  Chrome Browser Zoom  - html.scrollWidth == or >= html.clientWidth   */
/*                       - body.scrollWidth always ~= body.clientWidth  */
/*                                                                      */
/*  ChromeCSS Zoom       - html.scrollWidth == or >= html.clientWidth   */
/*                       - body.scrollWidth always == body.clientWidth  */
/*                                                                      */
/************************************************************************/

function autofitIterate(setsite,start)
{
    var clientWidth,scrollWidth,scrollBarWidth;
    
    /* Reduce zoom level until content fits window */
    
    scrollBarWidth = Math.ceil(17/(zoomLevel/100));
    
    clientWidth = document.body.parentNode.clientWidth;
    scrollWidth = document.body.parentNode.scrollWidth;
    
    if (start)
    {
        iterCount = -1;
        iterLimit = 1;
        iterString = "";
    }
    
    iterCount++;
    iterString += iterCount + ":  " + clientWidth + " - " + scrollWidth + " - " + scrollBarWidth + " - " + zoomLevel + "% | ";
    
    /* Add scroll bar width to client width because some responsive pages assume full inner window width is available */
    
    if (iterCount == 0 && scrollWidth <= clientWidth && zoomLevel != autoMaxLevel)
    {
        iterLimit++;
        
        zoomLevel = autoMaxLevel;
        
        chrome.runtime.sendMessage({ type: "autofitrepeat", zoomlevel: zoomLevel, setsite: setsite });
    }
    else if (iterCount < iterLimit && scrollWidth > clientWidth+scrollBarWidth && zoomLevel > autoMinLevel)
    {
        /* Calculate fit-to-width zoom level */ 
        
        if (zoomType == 0 && zm_bps_cssFullZoom)
        {
            if (isFirefox) zoomLevel = Math.round((clientWidth/scrollWidth)*zoomLevel);
            else zoomLevel = Math.floor((clientWidth/scrollWidth)*zoomLevel*0.98);
        }
        else zoomLevel = Math.floor((clientWidth/scrollWidth)*zoomLevel*0.98);
        
        if (zoomLevel < autoMinLevel) zoomLevel = autoMinLevel;
        
        chrome.runtime.sendMessage({ type: "autofitrepeat", zoomlevel: zoomLevel, setsite: setsite });
    }
    else
    {
        if (debugEnable) console.log(iterString);
        
        chrome.runtime.sendMessage({ type: "autofitfinish", setsite: setsite });
    }
}

/************************************************************************/

/* Text Zoom and Minimum Font Size */

function addFontSizeAttribute(elements)
{
    var i,computedStyle,size;
    
    var voidElements = new Array("area","base","br","col","command","embed","hr","img","link","menuitem","meta","param","source","track","wbr");  /* exclude frame,input,keygen */
    var skipElements = new Array("audio","canvas","noscript","object","script","style","video");
    
    for (i = elements.length-1; i >= 0; i--)
    {
        if (elements[i].hasAttribute("zoompage-fontsize")) continue;  /* element already has font size attribute */
        
        if (voidElements.indexOf(elements[i].localName) >= 0) continue;  /* void elements that cannot have text nodes */
        
        if (skipElements.indexOf(elements[i].localName) >= 0) continue;  /* skip elements with text nodes that are hidden always or hidden if element supported by browser */
        
        computedStyle = window.getComputedStyle(elements[i]);
        
        if (computedStyle != null)
        {
            size = computedStyle.getPropertyValue("font-size");
            
            size = Math.round(size.substr(0,size.length-2));
            
            elements[i].setAttribute("zoompage-fontsize",size);
        }
    }
}

function removeFontSizeAttribute(elements)
{
    var i;
    
    for (i = elements.length-1; i >= 0; i--)
    {
        elements[i].removeAttribute("zoompage-fontsize");
    }
}

function buildFontSizeRules(type,level,minsize)
{
    var rules,size;
    
    rules = "";
    
    for (size = 1; size <= 50; size++)
    {
        if (type == 1 && size < minsize)
        {
            rules += "[zoompage-fontsize=\"" + size + "\"] { font-size: " + (minsize*level/defaultOtherLevel) + "px !important; }";
        }
        else if (type == 1 && size >= minsize)
        {
            rules += "[zoompage-fontsize=\"" + size + "\"] { font-size: " + (size*level/defaultOtherLevel) + "px !important; }";
        }
        else if (type == 0 && size < minsize)
        {
            rules += "[zoompage-fontsize=\"" + size + "\"] { font-size: " + minsize + "px !important; }";
        }
    }
    
    if (type == 1 || minsize > 0)
    {
        if (adjustTextFont) rules += " * { font-family: " + textFontFamily + " !important; }";
        
        if (adjustLineSpace) rules += " * { line-height: " + lineSpaceFactor + "em !important; }";
    }
    
    if (debugEnable) console.log("Font Size Rules: " + rules);
    
    return rules;
}

/************************************************************************/

/* Image functions */

function initializeImage()
{
    if (enableScaling)
    {
        window.setTimeout(
        function()
        {
            var image;
            
            image = document.body.children[0];
            
            naturalWidth = image.naturalWidth;
            naturalHeight = image.naturalHeight;
            
            /* Firefox applies 'image-orientation: from-image;' to take account of images's EXIF data */
            /* but does not swap image.naturalWidth and image.naturalHeight if image has been rotated */
            /* see Bug 1566316 fixed in Firefox 77 */
            
            if (isFirefox && ffVersion <= 76 && Math.abs((image.naturalWidth/image.naturalHeight)-(image.width/image.height)) > 0.01)
            {
                naturalWidth = image.naturalHeight;
                naturalHeight = image.naturalWidth;
            }
            
            image.addEventListener("mouseup",onMouseUpImage,true);
            
            if (naturalWidth > window.innerWidth || naturalHeight > window.innerHeight) fitToWindow = true;
            else fitToWindow = onloadScaling;
            
            adjustImageSize();
            
            setImageCursor();
            
            chrome.runtime.sendMessage({ type: "imagemouseup" });
        },10);
    }
}

function onMouseUpImage(event)
{
    /* mouseup event fires earlier than click event */
    
    if (event.button == 0)
    {
        fitToWindow = !fitToWindow;
        
        adjustImageSize();
        
        setImageCursor();
    }
}
 
function adjustImageSize()
{
    window.setTimeout(
    function()
    {
        var image;
        
        image = document.body.children[0];
        
        if (debugEnable) console.log("natural: " + naturalWidth + "," + naturalHeight + "  window: " + window.innerWidth + "," + window.innerHeight + "  image: " + image.width + "," + image.height);
        
        if (fitToWindow)
        {
            if (window.innerWidth/window.innerHeight <= naturalWidth/naturalHeight)
            {
                image.width = window.innerWidth;
                image.height = Math.floor(image.width*(naturalHeight/naturalWidth));
            }
            else
            {
                image.height = window.innerHeight;
                image.width = Math.floor(image.height*(naturalWidth/naturalHeight));
            }
        }
        else
        {
            image.width = naturalWidth;
            image.height = naturalHeight;
        }
    },10);
}

function setImageCursor()
{
    window.setTimeout(
    function()
    {
        var image;
        
        image = document.body.children[0];
        
        if (debugEnable) console.log("natural: " + naturalWidth + "," + naturalHeight + "  window: " + window.innerWidth + "," + window.innerHeight + "  image: " + image.width + "," + image.height);
        
        if (image.width < naturalWidth || image.height < naturalHeight)
        {
            image.style.setProperty("cursor","url(" + equalCursorData + ") 6 6,auto","");
            image.title = "Reset image\nto natural size";
        }
        else if (image.width > naturalWidth || image.height > naturalHeight)
        {
            image.style.setProperty("cursor","url(" + equalCursorData + ") 6 6,auto","");
            image.title = "Reset image\nto natural size";
        }
        else if (image.width < window.innerWidth && image.height < window.innerHeight)
        {
            image.style.setProperty("cursor","zoom-in","");
            image.title = "Expand image\nto fit window";
        }
        else if (image.width > window.innerWidth || image.height > window.innerHeight)
        {
            image.style.setProperty("cursor","zoom-out","");
            image.title = "Shrink image\nto fit window";
        }
        else
        {
            image.style.setProperty("cursor","auto","");
            image.title = "";
        }
    },10);
}

/************************************************************************/

/* Key event functions */

function onKeyDown(event)
{
    if ((platformOS != "mac" && event.ctrlKey) || (platformOS == "mac" && event.metaKey))
    {
        if (event.key == "=" || event.key == "+") chrome.runtime.sendMessage({ type: "zoomin", shift: event.shiftKey });
        else if (event.key == "-" || event.key == "_") chrome.runtime.sendMessage({ type: "zoomout", shift: event.shiftKey });
        else if (event.key == "0") chrome.runtime.sendMessage({ type: "zoomreset" });
        
        if (event.key == "=" || event.key == "+" || event.key == "-" || event.key == "_" || event.key == "0") event.preventDefault();
        
        if (enableCtrl789)
        {
            if (event.key == "9") chrome.runtime.sendMessage({ type: "zoomtype" });
            else if (event.key == "8") chrome.runtime.sendMessage({ type: "zoomautofit" });
            else if (event.key == "7") chrome.runtime.sendMessage({ type: "fontreset" });
            
            if (event.key == "9" || event.key == "8" || event.key == "7") event.preventDefault();
        }
    }
}

/************************************************************************/

/* Mouse event functions */

function onContextMenu(event)
{
    if (rightZoom)  /* prevent context menu showing */
    {
        rightZoom = false;
        
        event.preventDefault();
    }
}

function onWheel(event)
{
    if (scrollTimeout != null)  /* scroll page - restart inertia scroll timeout */
    {
        window.clearTimeout(scrollTimeout);
        
        scrollTimeout = window.setTimeout(function() { scrollTimeout = null; },200);
    }
    else if ((event.shiftKey && event.ctrlKey) || (modifyCtrlWheel && event.ctrlKey) || (enableRightWheel && event.buttons == 2))  /* zoom page */
    {
        rightZoom = enableRightWheel && event.buttons == 2;
        
        if (event.deltaY < 0) chrome.runtime.sendMessage({ type: "zoomin", shift: event.shiftKey });
        else if (event.deltaY > 0) chrome.runtime.sendMessage({ type: "zoomout", shift: event.shiftKey });
        
        event.preventDefault();
    }
    else  /* scroll page - start inertia scroll timeout */
    {
        scrollTimeout = window.setTimeout(function() { scrollTimeout = null; },200);
    }
}

/************************************************************************/

/* Resize event functions */

function onResize(event)
{
    if (document.contentType.substr(0,5) == "image" && document.contentType != "image/svg+xml")
    {
        if (enableScaling)
        {
            adjustImageSize();
            
            setImageCursor();
        }
    }
    
    chrome.runtime.sendMessage({ type: "resize" });
    
    event.preventDefault();
}

/************************************************************************/
