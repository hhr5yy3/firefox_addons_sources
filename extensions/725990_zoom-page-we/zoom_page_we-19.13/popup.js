/************************************************************************/
/*                                                                      */
/*      Zoom Page WE - Generic WebExtension - Popup Page                */
/*                                                                      */
/*      Javascript for Popup Page                                       */
/*                                                                      */
/*      Last Edit - 16 Apr 2023                                         */
/*                                                                      */
/*      Copyright (C) 2016-2023 DW-dev                                  */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE.txt file and http://www.gnu.org/licenses/           */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/* Refer to Google Chrome developer documentation:                      */
/*                                                                      */
/*  https://developer.chrome.com/extensions/messaging                   */
/*                                                                      */
/*  https://developer.chrome.com/extensions/runtime                     */
/*  https://developer.chrome.com/extensions/storage                     */
/*  https://developer.chrome.com/extensions/tabs                        */
/*                                                                      */
/************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;

var zoomMode,browserPerSite,cssFullZoom,allowSubsites;
var zoomLevels;
var defaultFullLevel,defaultTextLevel;
var fontSizes;
var defaultSize;

var zm_bps_cssFullZoom,zm_bps_allowSubsites;

var zoomType = 0;
var zoomLevel = 100;
var fontSize = 0;
var subsiteType = 0;

/************************************************************************/

/* Listener for popup page load */

document.addEventListener("DOMContentLoaded",onLoadPage,false);

/************************************************************************/

/* Initialize on page load */

function onLoadPage()
{
    chrome.storage.local.get(null,
    function(object)
    {
        var i,select,option;
        
        /* Load environment */
        
        isFirefox = object["environment-isfirefox"];
        
        if (isFirefox) document.body.setAttribute("isfirefox","");
        
        /* Load options */
        
        zoomMode = object["options-zoommode"];
        browserPerSite = object["options-browserpersite"];
        cssFullZoom = object["options-cssfullzoom"];
        allowSubsites = object["options-allowsubsites"];
        
        zm_bps_cssFullZoom = !(zoomMode == 0 && browserPerSite) && cssFullZoom;
        zm_bps_allowSubsites = !(zoomMode == 1 || browserPerSite) && allowSubsites;
        
        zoomLevels = object["options-zoomlevels"];
        
        defaultFullLevel = object["options-defaultfulllevel"];
        defaultTextLevel = object["options-defaulttextlevel"];
        
        fontSizes = object["options-fontsizes"];
        
        defaultSize = object["options-defaultsize"];
        
        /* Initialize zoom levels <select> element */
        
        select = document.getElementById("popup-zoomlevel");
        
        for (i = 0; i < zoomLevels.length; i++)
        {
            option = document.createElement("option");
            
            option.textContent = zoomLevels[i] + "%";
            
            if (zoomLevels[i] == defaultFullLevel) option.style.setProperty("font-weight","bold","");
            
            select.appendChild(option);
        }
        
        option = document.createElement("option");  /* append hidden <option> element to hold value to be displayed in <select> element */
        option.textContent = "";
        select.appendChild(option);
        
        select.selectedIndex = -1;
        
        /* Initialize font sizes <select> element */
        
        select = document.getElementById("popup-fontsize");
        
        for (i = 0; i < fontSizes.length; i++)
        {
            option = document.createElement("option");
            
            if (fontSizes[i] == 0) option.textContent = "Off";
            else option.textContent = fontSizes[i] + "px";
            
            if (fontSizes[i] == defaultSize) option.style.setProperty("font-weight","bold","");
            
            select.appendChild(option);
        }
        
        select.selectedIndex = -1;
        
        /* Initialize sub-site types <select> element */
        
        select = document.getElementById("popup-subsitetype");
        
        select.selectedIndex = -1;
        
        /* Disable buttons if page is not zoomable or scriptable */
        
        chrome.tabs.query({ lastFocusedWindow: true, active: true },
        function(tabs)
        {
            if (!zoomablePage(tabs[0].url))
            {
                document.getElementById("popup-subsiteclear").disabled = true;
                document.getElementById("popup-subsitetype").disabled = true;
                document.getElementById("popup-fontreset").disabled = true;
                document.getElementById("popup-fontsize").disabled = true;
                document.getElementById("popup-zoomreset").disabled = true;
                document.getElementById("popup-zoomautofit").disabled = true;
                document.getElementById("popup-zoomtype").disabled = true;
                document.getElementById("popup-zoomin").disabled = true;
                document.getElementById("popup-zoomout").disabled = true;
                document.getElementById("popup-zoomlevel").disabled = true;
            }
            
            if (!scriptablePage(tabs[0].url))
            {
                document.getElementById("popup-fontreset").disabled = true;
                document.getElementById("popup-fontsize").disabled = true;
                document.getElementById("popup-zoomautofit").disabled = true;
                document.getElementById("popup-zoomtype").disabled = true;
            }
            
            if (tabs[0].url.substr(0,5) != "http:" && tabs[0].url.substr(0,6) != "https:" && tabs[0].url.substr(0,5) != "file:")
            {
                document.getElementById("popup-subsiteclear").disabled = true;
                document.getElementById("popup-subsitetype").disabled = true;
            }
            
            chrome.runtime.sendMessage({ type: "popupopened" });
        });
        
        /* Add event listeners */
        
        document.getElementById("popup-debug").addEventListener("click",onDebug,false);
        
        document.getElementById("popup-expand").addEventListener("click",onExpand,false);
        
        document.getElementById("popup-subsiteclear").addEventListener("click",onSubsiteClear,false);
        document.getElementById("popup-subsitetype").addEventListener("change",onSubsiteType,false);
        document.getElementById("popup-fontreset").addEventListener("click",onFontReset,false);
        document.getElementById("popup-fontsize").addEventListener("change",onFontSize,false);
        document.getElementById("popup-zoomreset").addEventListener("click",onZoomReset,false);
        document.getElementById("popup-zoomautofit").addEventListener("click",onZoomAutoFit,false);
        document.getElementById("popup-zoomtype").addEventListener("click",onZoomType,false);
        document.getElementById("popup-zoomin").addEventListener("click",onZoomIn,false);
        document.getElementById("popup-zoomout").addEventListener("click",onZoomOut,false);
        document.getElementById("popup-zoomlevel").addEventListener("change",onZoomLevel,false);
        
        document.getElementById("popup-font").addEventListener("wheel",onWheelFont,true);
        document.getElementById("popup-zoom").addEventListener("wheel",onWheelZoom,true);
        
        /* Add window focused listener */
        
        chrome.windows.onFocusChanged.addListener(  /* fired when browser window gains focus or when all browser windows lose focus */
        function(windowId)
        {
            if (!isFirefox) window.close();  /* Chrome - does not close popup when another window is focused */
        });
        
        /* Add message received listener */
        
        chrome.runtime.onMessage.addListener(
        function(message,sender,sendResponse)
        {
            var i,button,select,option;
            
            switch (message.type)
            {
                /* Messages from background page */
                
                case "debugenable":
                    
                    document.getElementById("popup-debug").style.setProperty("display","block","");
                    
                    break;
                    
                case "contenttype":
                    
                    if (message.contenttype == "image/svg+xml")
                    {
                        document.getElementById("popup-subsiteclear").disabled = true;
                        document.getElementById("popup-subsitetype").disabled = true;
                        document.getElementById("popup-fontreset").disabled = true;
                        document.getElementById("popup-fontsize").disabled = true;
                        document.getElementById("popup-zoomautofit").disabled = true;
                        document.getElementById("popup-zoomtype").disabled = true;
                    }
                    
                    break;
                    
                case "newzoomtypelevel":
                    
                    zoomType = (typeof message.zoomtype == "undefined") ? 0 : message.zoomtype;
                    zoomLevel = (typeof message.zoomlevel == "undefined") ? 100 : message.zoomlevel;
                    
                    button = document.getElementById("popup-zoomtype");
                    
                    select = document.getElementById("popup-zoomlevel");
                    
                    select.children[select.children.length-1].textContent = zoomLevel + "%";  /* configure appended hidden <option> element */
                    
                    select.children[select.children.length-1].style.setProperty("display","none","");
                    
                    select.value = zoomLevel + "%";
                    
                    if (zoomType == 0)
                    {
                        button.textContent = "Full";
                        
                        if (isFirefox && button.disabled)
                        {
                            button.style.setProperty("color","#6060C0","");
                            button.style.setProperty("background-color","#D0D0DF","");
                        }
                        else
                        {
                            button.style.setProperty("color","#4040C0","");
                            button.style.setProperty("background-color","#F0F0FF","");
                        }
                        
                        select.style.setProperty("color","#4040C0","");
                        select.style.setProperty("background-color","#F0F0FF","");
                    }
                    else
                    {
                        button.textContent = "Text";
                        button.style.setProperty("color","#C02020","");
                        button.style.setProperty("background-color","#FFF0F0","");
                        
                        select.style.setProperty("color","#C02020","");
                        select.style.setProperty("background-color","#FFF0F0","");
                    }
                    
                    for (i = 0; i < zoomLevels.length-1; i++)
                    {
                        option = select.children[i];
                        
                        if ((zoomType == 0 && zoomLevels[i] == defaultFullLevel)) option.style.setProperty("font-weight","bold","");
                        else if ((zoomType == 1 && zoomLevels[i] == defaultTextLevel)) option.style.setProperty("font-weight","bold","");
                        else option.style.removeProperty("font-weight");
                    }
                    
                    break;
                    
                case "newfontsize":
                    
                    fontSize = (typeof message.fontsize == "undefined") ? 0 : message.fontsize;
                    
                    select = document.getElementById("popup-fontsize");
                    
                    if (fontSize == 0) select.value = "Off";
                    else select.value = fontSize + "px";
                    
                    if (isFirefox && select.disabled)
                    {
                        select.style.setProperty("color","#60A060","");
                        select.style.setProperty("background-color","#D0D8D0","");
                    }
                    else
                    {
                        select.style.setProperty("color","#00A000","");
                        select.style.setProperty("background-color","#F0FFF0","");
                    }
                    
                    for (i = 0; i < fontSizes.length; i++)
                    {
                        option = select.children[i];
                        
                        if (fontSizes[i] == defaultSize) option.style.setProperty("font-weight","bold","");
                        else option.style.removeProperty("font-weight");
                    }
                    
                    break;
                    
                case "newsubsitetype":
                    
                    subsiteType = (typeof message.subsitetype == "undefined") ? 0 : message.subsitetype;
                    
                    select = document.getElementById("popup-subsitetype");
                    
                    select.value = document.getElementById("popup-subsitetype").children[subsiteType].value;
                    
                    if (isFirefox && select.disabled)
                    {
                        select.style.setProperty("color","#A080A0","");
                        select.style.setProperty("background-color","#DFD0DF","");
                    }
                    else
                    {
                        select.style.setProperty("color","#A000A0","");
                        select.style.setProperty("background-color","#FFF0FF","");
                    }
                    
                    if (subsiteType > 0)
                    {
                        document.getElementById("popup-expand").style.setProperty("display","none","");
                        document.getElementById("popup-subsite").style.setProperty("display","block","");
                    }
                    
                    break;
            }
        });
        
        chrome.tabs.query({ lastFocusedWindow: true, active: true },
        function(tabs)
        {
            chrome.tabs.getZoomSettings(tabs[0].id,
            function(zoomSettings)
            {
                if (zoomSettings.scope == "per-tab" && zoomMode == 0 && zm_bps_allowSubsites)
                {
                    document.getElementById("popup-expand").style.setProperty("display","block","");
                }
            });
        });
    });
}

/************************************************************************/

/* Debug click function */

function onDebug(event)
{
    chrome.runtime.sendMessage({ type: "debug" });
}

/************************************************************************/

/* Expand click function */

function onExpand(event)
{
    document.getElementById("popup-expand").style.setProperty("display","none","");
    document.getElementById("popup-subsite").style.setProperty("display","block","");
}

/************************************************************************/

/* Button click functions */

function onSubsiteClear(event)
{
    document.getElementById("popup-subsiteclear").blur();
    
    chrome.runtime.sendMessage({ type: "subsiteclear" });
}

function onSubsiteType(event)
{
    document.getElementById("popup-subsitetype").blur();
    
    if (event.target.selectedIndex == 0) chrome.runtime.sendMessage({ type: "subsiteclear" });
    else chrome.runtime.sendMessage({ type: "subsitetypeselect", subsitetype: event.target.selectedIndex });
}

function onFontReset(event)
{
    var i,select,option;
    
    document.getElementById("popup-fontreset").blur();
    
    if (event.ctrlKey)
    {
        defaultSize = fontSize;
        
        chrome.storage.local.set({ "options-defaultsize": defaultSize });
        
        select = document.getElementById("popup-fontsize");
        
        for (i = 0; i < fontSizes.length; i++)
        {
            option = select.children[i];
            
            if (fontSizes[i] == defaultSize) option.style.setProperty("font-weight","bold","");
            else option.style.removeProperty("font-weight");
        }
    }
    else
    {
        chrome.runtime.sendMessage({ type: "fontreset" });
    }
}

function onFontSize(event)
{
    document.getElementById("popup-fontsize").blur();
    
    chrome.runtime.sendMessage({ type: "fontsizeselect", fontsize: fontSizes[event.target.selectedIndex] });
}

function onZoomReset(event)
{
    var i,select,option;
    
    document.getElementById("popup-zoomreset").blur();
    
    if (event.ctrlKey)
    {
        if (zoomType == 0)
        {
            defaultFullLevel = zoomLevel;
            
            chrome.storage.local.set({ "options-defaultfulllevel": defaultFullLevel });
        }
        else
        {
            defaultTextLevel = zoomLevel;
        
            chrome.storage.local.set({ "options-defaulttextlevel": defaultTextLevel });
        }
        
        select = document.getElementById("popup-zoomlevel");
        
        for (i = 0; i < zoomLevels.length-1; i++)
        {
            option = select.children[i];
            
            if ((zoomType == 0 && zoomLevels[i] == defaultFullLevel)) option.style.setProperty("font-weight","bold","");
            else if ((zoomType == 1 && zoomLevels[i] == defaultTextLevel)) option.style.setProperty("font-weight","bold","");
            else option.style.removeProperty("font-weight");
        }
    }
    else
    {
        chrome.runtime.sendMessage({ type: "zoomreset" });
    }
}

function onZoomAutoFit(event)
{
    document.getElementById("popup-zoomautofit").blur();
    
    chrome.runtime.sendMessage({ type: "zoomautofit" });
}

function onZoomType(event)
{
    document.getElementById("popup-zoomtype").blur();
    
    chrome.runtime.sendMessage({ type: "zoomtype" });
}

function onZoomIn(event)
{
    document.getElementById("popup-zoomin").blur();
    
    chrome.runtime.sendMessage({ type: "zoomin", shift: event.shiftKey });
}

function onZoomOut(event)
{
    document.getElementById("popup-zoomout").blur();
    
    chrome.runtime.sendMessage({ type: "zoomout", shift: event.shiftKey });
}

function onZoomLevel(event)
{
    document.getElementById("popup-zoomlevel").blur();
    
    chrome.runtime.sendMessage({ type: "zoomlevelselect", zoomlevel: zoomLevels[event.target.selectedIndex] });
}

/************************************************************************/

/* Wheel rotate functions */

function onWheelFont(event)
{
    if (event.deltaY < 0) chrome.runtime.sendMessage({ type: "fontup" });
    else if (event.deltaY > 0) chrome.runtime.sendMessage({ type: "fontdown" });
}

function onWheelZoom(event)
{
    if (event.deltaY < 0) chrome.runtime.sendMessage({ type: "zoomin", shift: event.shiftKey });
    else if (event.deltaY > 0) chrome.runtime.sendMessage({ type: "zoomout", shift: event.shiftKey });
}

/************************************************************************/

/* Utility functions */

function zoomablePage(url)
{
    /* Can (and should) browser apply Full Zoom to this page ? */
    /* Chrome - scriptable pages */
    /* Firefox - all pages - except for a few pages that should not be zoomed */
    
    if (siteZoomablePage(url)) return true;
    
    if (isFirefox)
    {
        if (document.getElementById("popup-zoomtype").textContent == "Full" && !zm_bps_cssFullZoom)  /* browser full zoom */
        {
            if (url.substr(0,11) != "about:blank" &&
                url.substr(0,9) != "resource:") return true;
        }
    }
    
    return false;
}

function siteZoomablePage(url)
{
    /* Can (and should) browser apply Per-Site Full Zoom to this page ? */
    /* Chrome - scriptable pages */
    /* Firefox - scriptable pages - plus pages where Firefox can apply full zoom */
    
    if (scriptablePage(url)) return true;
    
    if (isFirefox)
    {
        if (document.getElementById("popup-zoomtype").textContent == "Full" && !zm_bps_cssFullZoom)  /* browser full zoom */
        {
            if (url.substr(0,26) == "https://addons.mozilla.org" || url.substr(0,27) == "https://support.mozilla.org" ||
                url.substr(0,14) == "moz-extension:" ||
                (url.substr(0,6) == "about:" && url.substr(0,11) != "about:blank")) return true;
        }
    }
    
    return false;
}

function scriptablePage(url)
{
    /* Can content script be loaded into this page ? */
    /* Content script is required for Minimum Font Size, AutoFit, CSS Full Zoom and Text Zoom */
    /* Chrome & Firefox - http:, https: and file: pages - except for a few pages where content script cannot or should not be loaded */
    
    if (isFirefox)
    {
        if ((url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:") &&
            url.substr(0,26) != "https://addons.mozilla.org" && url.substr(0,27) != "https://support.mozilla.org") return true;
    }
    else /* Chrome */
    {
        if ((url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:") &&
            url.substr(0,34) != "https://chrome.google.com/webstore" &&
            (url.substr(0,19) != "https://www.google." || url.indexOf("/_/chrome/newtab") < 0) &&
            (url.substr(0,19) != "https://www.google." || url.indexOf("sourceid=chrome-instant") < 0)) return true;
    }
    
    return false;
}

/************************************************************************/
