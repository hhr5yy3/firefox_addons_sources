/************************************************************************/
/*                                                                      */
/*      Print Edit WE - Generic WebExtension - Content Pages            */
/*                                                                      */
/*      Javascript for Editing Content Pages (all frames)               */
/*                                                                      */
/*      Last Edit - 21 Dec 2019                                         */
/*                                                                      */
/*      Copyright (C) 2019 DW-dev                                       */
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

/* Loaded into all frames (including iframes) of all content pages */

/* Shares global variable/function namespace with other content scripts */

/* Use wrapper function to separate namespace from main content script */

"use strict";

frameScript();

function frameScript()
{

/************************************************************************/

/* Global variables */

var imagesNoBreaks;

var styleAnimations = "body, body * { animation: none !important; -webkit-animation: none !important; transition-property: none !important; }";

/************************************************************************/

/* Initialize on script load */

if (document.readyState != "loading") onLoadPage();
else
{
    window.addEventListener("DOMContentLoaded",
    function(event)
    {
        if (document.readyState != "loading") onLoadPage();
    },false);
}

/************************************************************************/

/* Initialize on page load */

function onLoadPage()
{
    var win;
    
    if (window == window.top)  /* main frame */
    {
        // console.log("top: " + document.URL.substr(0,100));
        
        return;
    }
    else  /* sub frame */
    {
        for (win = window; win.frameElement != null; win = win.frameElement.ownerDocument.defaultView) ;
        
        if (win == window.top)  /* same-origin - and same-origin ancestors */
        {
            // console.log("same-origin: " + document.URL.substr(0,100));
            
            return;
        }
        else  /* cross-origin - or cross-origin ancestors - or same-origin ancestors with sandbox without allow-same-origin */
        {
            // console.log("cross-origin: " + document.URL.substr(0,100));
            
            chrome.storage.local.get(null,
            function(object)
            {
                imagesNoBreaks = object["options-images-nobreaks"];
                
                /* Add listeners */
                
                addListeners();
            });
        }
    }
}

/************************************************************************/

/* Add listeners */

function addListeners()
{
    /* Storage changed listener */
    
    chrome.storage.onChanged.addListener(
    function(changes,areaName)
    {
        if ("options-images-nobreaks" in changes) imagesNoBreaks = changes["options-images-nobreaks"].newValue;
    });
    
    /* Message received listener */
    
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        switch (message.type)
        {
            /* Messages from background page */
            
            case "frameStart":
                
                startEditing();
                
                break;
                
            case "frameFinish":
                
                finishEditing();
                
                break;
        }
    });
}

/************************************************************************/

/* Start editing cross-origin frame */

function startEditing()
{
    var selection;
    
    /* Add window mouse listeners */
    
    window.addEventListener("mouseover",onEventDisable,true);
    window.addEventListener("mouseout",onEventDisable,true);
    window.addEventListener("mouseenter",onEventDisable,true);
    window.addEventListener("mouseleave",onEventDisable,true);
    window.addEventListener("mousedown",onEventDisable,true);
    window.addEventListener("mousemove",onEventDisable,true);
    window.addEventListener("mouseup",onEventDisable,true);
    window.addEventListener("click",onEventDisable,true);
    window.addEventListener("dblclick",onEventDisable,true);
    window.addEventListener("contextmenu",onEventDisable,true);
    window.addEventListener("wheel",onEventDisable,true);
    
    /* Add window touch listeners */
    
    window.addEventListener("touchstart",onEventDisable,true);
    window.addEventListener("touchend",onEventDisable,true);
    window.addEventListener("touchmove",onEventDisable,true);
    window.addEventListener("touchcancel",onEventDisable,true);
    
    /* Add window keyboard listeners */
    
    window.addEventListener("keydown",onEventDisable,true);
    window.addEventListener("keyup",onEventDisable,true);
    window.addEventListener("keypress",onEventDisable,true);
    
    /* Add window scroll and resize/zoom listeners */
    
    window.addEventListener("scroll",onEventDisable,true);
    window.addEventListener("resize",onEventDisable,true);
    
    /* Clear any text selections */
    
    selection = window.getSelection();  /* returns null in some google ads iframes */
    if (selection && selection.rangeCount > 0) selection.removeAllRanges();
    
    /* Prepare elements before starting */
    
    prepareBeforeStart(document.body);
}

/************************************************************************/

/* Finish editing cross-origin frame */

function finishEditing()
{
    /* Restore elements after finishing */
    
    restoreAfterFinish(document.body);
    
    /* Remove window scroll and resize/zoom listeners */
    
    window.removeEventListener("scroll",onEventDisable,true);
    window.removeEventListener("resize",onEventDisable,true);
    
    /* Remove window keydown listener */
    
    window.removeEventListener("keydown",onEventDisable,true);
    window.removeEventListener("keyup",onEventDisable,true);
    window.removeEventListener("keypress",onEventDisable,true);
    
    /* Remove window touch listeners */
    
    window.removeEventListener("touchstart",onEventDisable,true);
    window.removeEventListener("touchend",onEventDisable,true);
    window.removeEventListener("touchmove",onEventDisable,true);
    window.removeEventListener("touchcancel",onEventDisable,true);
    
    /* Remove window mouse listeners */
    
    window.removeEventListener("mouseover",onEventDisable,true);
    window.removeEventListener("mouseout",onEventDisable,true);
    window.removeEventListener("mouseenter",onEventDisable,true);
    window.removeEventListener("mouseleave",onEventDisable,true);
    window.removeEventListener("mousedown",onEventDisable,true);
    window.removeEventListener("mousemove",onEventDisable,true);
    window.removeEventListener("mouseup",onEventDisable,true);
    window.removeEventListener("click",onEventDisable,true);
    window.removeEventListener("dblclick",onEventDisable,true);
    window.removeEventListener("contextmenu",onEventDisable,true);
    window.removeEventListener("wheel",onEventDisable,true);
}

/************************************************************************/

/* Prepare before starting and restore after finishing functions */

function prepareBeforeStart(element)
{
    var i,style,selection;
    
    if (element.localName == "body")
    {
        /* Prevent animations and transitions on all elements */
        
        style = element.ownerDocument.createElement("style");
        style.id = "printedit-style-animations";
        style.type = "text/css";
        style.textContent = styleAnimations;
        element.ownerDocument.head.appendChild(style);
    }
    else if (element.localName == "img")
    {
        /* Prevent page breaks inside images */
        
        backupStyleProperty(element,"page-break-inside","pagebreak");
        
        if (imagesNoBreaks) element.style.setProperty("page-break-inside","avoid","important");
    }
    else if (element.localName == "input" || element.localName == "button" || element.localName == "textarea" ||
             element.localName == "select" || element.localName == "optgroup" || element.localName == "option" || 
             element.localName == "keygen")
    {
        /* Disable <input>/<button>/<textarea>/<select>/<optgroup>/<option>/<keygen> elements */
        
        if (element.hasAttribute("disabled")) element.setAttribute("printedit-restore-disabled",element.getAttribute("disabled"));
        
        element.setAttribute("disabled","disabled");
    }
    else if (element.localName == "object" || element.localName == "embed")
    {
        /* Disable mouse events inside <object> or <embed> element */
        
        backupStyleProperty(element,"pointer-events","pointer");
        
        element.style.setProperty("pointer-events","none","important");
        
        return;  /* skip children */
    }
   
    if (element.localName == "iframe" || element.localName == "frame")
    {
        /* Disable mouse events inside <iframe> or <frame> element */
        
        backupStyleProperty(element,"pointer-events","pointer");
        
        element.style.setProperty("pointer-events","none","important");
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                prepareBeforeStart(element.children[i]);
    }
}

function restoreAfterFinish(element)
{
    var i,style;
    
    if (element.localName == "body")
    {
        /* Allow animations and transitions on all elements */
        
        style = element.ownerDocument.getElementById("printedit-style-animations");
        element.ownerDocument.head.removeChild(style);
    }
    else if (element.localName == "img")
    {
        /* Allow page breaks inside images */
        
        restoreStyleProperty(element,"page-break-inside","pagebreak");
    }
    else if (element.localName == "input" || element.localName == "button" || element.localName == "textarea" ||
             element.localName == "select" || element.localName == "optgroup" || element.localName == "option" ||
             element.localName == "keygen")
    {
        /* Re-enable <input>/<button>/<textarea>/<select>/<optgroup>/<option>/<keygen> elements */
        
        if (element.hasAttribute("printedit-restore-disabled"))
        {
            element.setAttribute("disabled",element.getAttribute("printedit-restore-disabled"));
            
            element.removeAttribute("printedit-restore-disabled");
        }
        else element.removeAttribute("disabled");
    }
    else if (element.localName == "object" || element.localName == "embed")
    {
        /* Re-enable mouse events inside <object> or <embed> element */
        
        restoreStyleProperty(element,"pointer-events","pointer");
        
        return;  /* skip children */
    }
   
    if (element.localName == "iframe" || element.localName == "frame")
    {
        /* Re-enable mouse events inside <iframe> or <frame> element */
        
        restoreStyleProperty(element,"pointer-events","pointer");
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                restoreAfterFinish(element.children[i]);
    }
}

/************************************************************************/

/* Backup and Restore style attribute property functions */

function backupStyleProperty(element,prop,key)
{
    element.setAttribute("printedit-restore-" + key + "-v",element.style.getPropertyValue(prop));
    element.setAttribute("printedit-restore-" + key + "-p",element.style.getPropertyPriority(prop));
}

function restoreStyleProperty(element,prop,key)
{
    if (element.hasAttribute("printedit-restore-" + key + "-v"))
    {
        element.style.setProperty(prop,element.getAttribute("printedit-restore-" + key + "-v"),element.getAttribute("printedit-restore-" + key + "-p"));
        
        element.removeAttribute("printedit-restore-" + key + "-v");
        element.removeAttribute("printedit-restore-" + key + "-p");
        
        if (element.hasAttribute("style") && element.getAttribute("style") == "") element.removeAttribute("style");
    }
}

/************************************************************************/

/*  Any event disable event handler */

function onEventDisable(event)
{
    /* prevents default action and stops propagation */
    
    if (event.cancelable) event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

/************************************************************************/

}
