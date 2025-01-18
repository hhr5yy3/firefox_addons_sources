/************************************************************************/
/*                                                                      */
/*      Tile Tabs WE - Generic WebExtension - Content Pages             */
/*                                                                      */
/*      Javascript for Content Pages                                    */
/*                                                                      */
/*      Last Edit - 14 Mar 2023                                         */
/*                                                                      */
/*      Copyright (C) 2015-2023 DW-dev                                  */
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

var guiContainer = null;

var showQuickMenu,quickMenuPosn,showQuickMenuCtrl;
var openLinks;

var ignoreScrollEvent = false;

var scrollLockTimer;

var menuIconData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOuAAADrgBakH1WwAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAAAArSURBVDhPY0hoeEASAml48OADJsIqPuAasKJB6geSELoNBLkjVgMJqOEBAGB/U0+/JG2mAAAAAElFTkSuQmCC";
var checkMarkData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAb0lEQVQ4T2OYcOIbSWioamhYexnOJqwhLLvG2Ni4ZetdCJeABojq3Alr4SIIDUB7ka0GIkzVQITQEJBYYGljD9eDVTUQITR07XvlFhAJ0YNLNRCh+AGiB6gUl2ogQvc0RA8u1UCEroEgGnQaTnwDAHhfLm8ArxBJAAAAAElFTkSuQmCC";

/************************************************************************/

/* Initialize on script load */

chrome.storage.local.get(null,
function(object)
{
    /* Load environment */
    
    isFirefox = object["environment-isfirefox"];
    
    /* Load options */
    
    showQuickMenu = object["options-showquickmenu"];
    quickMenuPosn = object["options-quickmenuposn"];
    showQuickMenuCtrl = object["options-showquickmenuctrl"];
    
    openLinks = object["options-openlinks"];
    
    /* Add listeners */
    
    addListeners();
    
    /* Wait for page to load and then load quick menu */
    
    if (document.readyState != "loading") loadQuickMenu();
    else
    {
        window.addEventListener("load",
        function(event)
        {
            if (document.readyState != "loading") loadQuickMenu();
        },false);
    }
});

/************************************************************************/

/* Add listeners */

function addListeners()
{
    /* Storage changed listener */
    
    chrome.storage.onChanged.addListener(
    function(changes,areaName)
    {
        if ("options-showquickmenu" in changes) showQuickMenu = changes["options-showquickmenu"].newValue;
        if ("options-quickmenuposn" in changes) quickMenuPosn = changes["options-quickmenuposn"].newValue;
        if ("options-showquickmenuctrl" in changes) showQuickMenuCtrl = changes["options-showquickmenuctrl"].newValue;
        
        if ("options-openlinks" in changes) openLinks = changes["options-openlinks"].newValue;
    });
    
    /* Message received listener */
    
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        switch (message.type)
        {
            /* Messages from background page */
            
            case "addQuickMenu":
                
                addQuickMenu(message.expanded,message.scrolllock,message.syncscroll);
                
                break;
                
            case "removeQuickMenu":
                
                removeQuickMenu();
                
                break;
                
            case "addListeners":
                
                document.addEventListener("click",onClick,true);
                document.addEventListener("auxclick",onAuxClick,true);
                if (isFirefox) document.addEventListener("mousedown",onMouseDown,true);  /* Firefox - workaround */
                document.addEventListener("contextmenu",onContextMenu,true);
                document.addEventListener("scroll",onScroll,true);
                
                break;
                
            case "removeListeners":
                
                document.removeEventListener("click",onClick,true);
                document.removeEventListener("auxclick",onAuxClick,true);
                if (isFirefox) document.removeEventListener("mousedown",onMouseDown,true);  /* Firefox - workaround */
                document.removeEventListener("contextmenu",onContextMenu,true);
                document.removeEventListener("scroll",onScroll,true);
                
                break;
                
            case "setAbsScrollPosn":
                
                ignoreScrollEvent = true;
                
                window.scrollTo(message.scrollx,message.scrolly);
                
                break;
                
            case "setRelScrollPosn":
                
                ignoreScrollEvent = true;
                
                window.scrollBy(message.deltax,message.deltay);
                
                break;
                
            case "addScrollLock":
                
                scrollLockTimer = window.setInterval(
                function(scrollx,scrolly)
                {
                    if (window.pageXOffset != scrollx || window.pageYOffset != scrolly) window.scrollTo(scrollx,scrolly);
                },1000,message.scrollx,message.scrolly);
                
                break;
                
            case "removeScrollLock":
                
                window.clearInterval(scrollLockTimer);
                
                break;
        }
    });
}

/************************************************************************/

/* Quick menu functions */

function loadQuickMenu()
{
    var xhr,parser,resourcedoc;
    
    /* Create GUI Container element */
    
    guiContainer = document.createElement("div");
    guiContainer.setAttribute("id","tiletabs-gui-container");
    guiContainer.style.setProperty("position","static","important");
    
    /* Load HTML resource file into GUI Container element */
    
    xhr = new XMLHttpRequest();
    xhr.open("GET",chrome.runtime.getURL("quickmenu.html"),true);
    xhr.onload = complete;
    xhr.send();
    
    function complete()
    {
        if (xhr.status == 200)
        {
            /* Parse file document */
            
            parser = new DOMParser();
            resourcedoc = parser.parseFromString(xhr.responseText,"text/html");
            
            /* Append quick menu elements to GUI container */
            
            guiContainer.appendChild(resourcedoc.getElementById("tiletabs-quickmenu"));
            
            /* Script and page and quick menu loaded */
            
            chrome.runtime.sendMessage({ type: "scriptLoaded" });
        }
    }
}

function addQuickMenu(expanded,scrollLock,syncScroll)
{
    var horizontal = new Array("left","right","left","right");
    var vertical = new Array("top","top","bottom","bottom");
    
    if (guiContainer && guiContainer.children[0] && guiContainer.parentNode == null)
    {
        document.documentElement.appendChild(guiContainer);
        
        if (showQuickMenu) document.getElementById("tiletabs-menuicon").style.setProperty("display","block","important");
        else document.getElementById("tiletabs-menuicon").style.setProperty("display","none","important");
        
        document.getElementById("tiletabs-menubox").style.setProperty("display","none","important");
        
        document.getElementById("tiletabs-menuicon").addEventListener("mouseenter",onMouseEnterMenuIcon,false);
        document.getElementById("tiletabs-menubox").addEventListener("mouseleave",onMouseLeaveMenuBox,false);
        
        document.getElementById("tiletabs-menuclose").addEventListener("click",onClickMenuClose,false);
        document.getElementById("tiletabs-menuhide").addEventListener("click",onClickMenuHide,false);
        document.getElementById("tiletabs-menurefresh").addEventListener("click",onClickMenuRefresh,false);
        document.getElementById("tiletabs-menutoggle").addEventListener("click",onClickMenuToggle,false);
        document.getElementById("tiletabs-menutoggleall").addEventListener("click",onClickMenuToggleAll,false);
        document.getElementById("tiletabs-menubookmark").addEventListener("click",onClickMenuBookmark,false);
        document.getElementById("tiletabs-menusave").addEventListener("click",onClickMenuSave,false);
        document.getElementById("tiletabs-menusync").addEventListener("click",onClickMenuSync,false);
        
        document.getElementById("tiletabs-menuabove").addEventListener("click",onClickMenuAbove,false);
        document.getElementById("tiletabs-menuleft").addEventListener("click",onClickMenuLeft,false);
        document.getElementById("tiletabs-menuright").addEventListener("click",onClickMenuRight,false);
        document.getElementById("tiletabs-menubelow").addEventListener("click",onClickMenuBelow,false);
        document.getElementById("tiletabs-menuremove").addEventListener("click",onClickMenuRemove,false);
        document.getElementById("tiletabs-menuexpand").addEventListener("click",onClickMenuExpand,false);
        document.getElementById("tiletabs-menuequalize").addEventListener("click",onClickMenuEqualize,false);
        document.getElementById("tiletabs-menulock").addEventListener("click",onClickMenuLock,false);
    }
    
    document.getElementById("tiletabs-menuicon").style.removeProperty("top");
    document.getElementById("tiletabs-menuicon").style.removeProperty("bottom");
    document.getElementById("tiletabs-menuicon").style.removeProperty("left");
    document.getElementById("tiletabs-menuicon").style.removeProperty("right");
    
    document.getElementById("tiletabs-menuicon").style.setProperty(horizontal[quickMenuPosn],"0px","important");
    document.getElementById("tiletabs-menuicon").style.setProperty(vertical[quickMenuPosn],"0px","important");
    
    document.getElementById("tiletabs-menubox").style.removeProperty("top");
    document.getElementById("tiletabs-menubox").style.removeProperty("bottom");
    document.getElementById("tiletabs-menubox").style.removeProperty("left");
    document.getElementById("tiletabs-menubox").style.removeProperty("right");
    
    document.getElementById("tiletabs-menubox").style.setProperty(horizontal[quickMenuPosn],"0px","important");
    document.getElementById("tiletabs-menubox").style.setProperty(vertical[quickMenuPosn],"0px","important");
    
    document.getElementById("tiletabs-menuexpand").innerText = expanded ? "Contract Tile" : "Expand Tile";
    
    document.getElementById("tiletabs-menulock").setAttribute("scrolllock",scrollLock);
    
    document.getElementById("tiletabs-menusync").setAttribute("syncscroll",syncScroll);
}

function removeQuickMenu()
{
    if (guiContainer && guiContainer.children[0] && guiContainer.parentNode != null)
    {
        document.getElementById("tiletabs-menuicon").removeEventListener("mouseenter",onMouseEnterMenuIcon,false);
        document.getElementById("tiletabs-menuclose").removeEventListener("mouseleave",onMouseLeaveMenuBox,false);
        
        document.getElementById("tiletabs-menuclose").removeEventListener("click",onClickMenuClose,false);
        document.getElementById("tiletabs-menuhide").removeEventListener("click",onClickMenuHide,false);
        document.getElementById("tiletabs-menurefresh").removeEventListener("click",onClickMenuRefresh,false);
        document.getElementById("tiletabs-menutoggle").removeEventListener("click",onClickMenuToggle,false);
        document.getElementById("tiletabs-menutoggleall").removeEventListener("click",onClickMenuToggleAll,false);
        document.getElementById("tiletabs-menubookmark").removeEventListener("click",onClickMenuBookmark,false);
        document.getElementById("tiletabs-menusave").removeEventListener("click",onClickMenuSave,false);
        document.getElementById("tiletabs-menusync").removeEventListener("click",onClickMenuSync,false);
        
        document.getElementById("tiletabs-menuabove").removeEventListener("click",onClickMenuAbove,false);
        document.getElementById("tiletabs-menuleft").removeEventListener("click",onClickMenuLeft,false);
        document.getElementById("tiletabs-menuright").removeEventListener("click",onClickMenuRight,false);
        document.getElementById("tiletabs-menubelow").removeEventListener("click",onClickMenuBelow,false);
        document.getElementById("tiletabs-menuremove").removeEventListener("click",onClickMenuRemove,false);
        document.getElementById("tiletabs-menuexpand").removeEventListener("click",onClickMenuExpand,false);
        document.getElementById("tiletabs-menuequalize").removeEventListener("click",onClickMenuEqualize,false);
        document.getElementById("tiletabs-menulock").removeEventListener("click",onClickMenuLock,false);
        
        document.documentElement.removeChild(guiContainer);
    }
}

function cornerQuickMenu()
{
    var horizontal = new Array("left","right","left","right");
    var vertical = new Array("top","top","bottom","bottom");
    
    document.getElementById("tiletabs-menubox").style.removeProperty("top");
    document.getElementById("tiletabs-menubox").style.removeProperty("bottom");
    document.getElementById("tiletabs-menubox").style.removeProperty("left");
    document.getElementById("tiletabs-menubox").style.removeProperty("right");
    
    document.getElementById("tiletabs-menubox").style.setProperty(horizontal[quickMenuPosn],"0px","important");
    document.getElementById("tiletabs-menubox").style.setProperty(vertical[quickMenuPosn],"0px","important");
    
    document.getElementById("tiletabs-menubox").style.setProperty("display","none","important");
    
    if (showQuickMenu) document.getElementById("tiletabs-menuicon").style.setProperty("display","block","important");
}

function contextQuickMenu(clientX,clientY)
{
    document.getElementById("tiletabs-menubox").style.removeProperty("top");
    document.getElementById("tiletabs-menubox").style.removeProperty("bottom");
    document.getElementById("tiletabs-menubox").style.removeProperty("left");
    document.getElementById("tiletabs-menubox").style.removeProperty("right");
    
    if (clientX < 10) clientX = 10;
    if (clientX > window.innerWidth-217) clientX = window.innerWidth-217;
    
    if (clientY < 10) clientY = 10;
    if (clientY > window.innerHeight-150) clientY = window.innerHeight-150;
    
    document.getElementById("tiletabs-menubox").style.setProperty("left",(clientX-10) + "px","important");
    document.getElementById("tiletabs-menubox").style.setProperty("top",(clientY-10) + "px","important");
    
    document.getElementById("tiletabs-menubox").style.setProperty("display","block","important");
}

/************************************************************************/

/* Mouse event functions */

function onMouseEnterMenuIcon(event)
{
    document.getElementById("tiletabs-menuicon").style.setProperty("display","none","important");
    
    document.getElementById("tiletabs-menubox").style.setProperty("display","block","important");
}

function onMouseLeaveMenuBox(event)
{
    cornerQuickMenu();
}

function onClickMenuClose(event)
{
    chrome.runtime.sendMessage({ type: "closeLayout" });
    
    cornerQuickMenu();
}

function onClickMenuHide(event)
{
    chrome.runtime.sendMessage({ type: "hideLayout" });
    
    cornerQuickMenu();
}

function onClickMenuRefresh(event)
{
    chrome.runtime.sendMessage({ type: "refreshLayout" });
    
    cornerQuickMenu();
}

function onClickMenuToggle(event)
{
    chrome.runtime.sendMessage({ type: "toggleToolbars" });
    
    cornerQuickMenu();
}

function onClickMenuToggleAll(event)
{
    chrome.runtime.sendMessage({ type: "toggleToolbarsAll" });
    
    cornerQuickMenu();
}

function onClickMenuBookmark(event)
{
    chrome.runtime.sendMessage({ type: "bookmarkLayout" });
    
    cornerQuickMenu();
}

function onClickMenuSave(event)
{
    chrome.runtime.sendMessage({ type: "saveLayout" });
    
    cornerQuickMenu();
}

function onClickMenuSync(event)
{
    chrome.runtime.sendMessage({ type: "syncScroll" });
    
    cornerQuickMenu();
}

function onClickMenuAbove(event)
{
    chrome.runtime.sendMessage({ type: "addTile", direction: "above" });
    
    cornerQuickMenu();
}

function onClickMenuLeft(event)
{
    chrome.runtime.sendMessage({ type: "addTile", direction: "left" });
    
    cornerQuickMenu();
}

function onClickMenuRight(event)
{
    chrome.runtime.sendMessage({ type: "addTile", direction: "right" });
    
    cornerQuickMenu();
}

function onClickMenuBelow(event)
{
    chrome.runtime.sendMessage({ type: "addTile", direction: "below" });
    
    cornerQuickMenu();
}

function onClickMenuRemove(event)
{
    chrome.runtime.sendMessage({ type: "removeTile" });
    
    cornerQuickMenu();
}

function onClickMenuExpand(event)
{
    chrome.runtime.sendMessage({ type: "expandTile" });
    
    cornerQuickMenu();
}

function onClickMenuEqualize(event)
{
    chrome.runtime.sendMessage({ type: "equalizeTiles" });
    
    cornerQuickMenu();
}

function onClickMenuLock(event)
{
    chrome.runtime.sendMessage({ type: "scrollLock" });
    
    cornerQuickMenu();
}

function onClick(event)
{
    var element;
    
    if (typeof event.isTrusted != "undefined" && !event.isTrusted) return;  /* event.isTrusted undefined before Chrome 46 */
    
    if ((openLinks == 1 && event.button == 0 && event.ctrlKey) ||
        (openLinks == 2 && event.button == 1 && !event.ctrlKey) ||  /* for backwards compatibility */
        (openLinks == 3 && event.button == 1 && event.ctrlKey))     /* for backwards compatibility */
    {
        element = event.target;
        while (element && !element.href) element = element.parentNode;
        
        if (element) chrome.runtime.sendMessage({ type: "openInNext", shift: event.shiftKey, url: element.href });
        
        event.preventDefault();
        event.stopPropagation();
    }
}

function onAuxClick(event)
{
    var element;
    
    if (typeof event.isTrusted != "undefined" && !event.isTrusted) return;  /* event.isTrusted undefined before Chrome 46 */
    
    if ((openLinks == 2 && event.button == 1 && !event.ctrlKey) ||
        (openLinks == 3 && event.button == 1 && event.ctrlKey))
    {
        element = event.target;
        while (element && !element.href) element = element.parentNode;
        
        if (element) chrome.runtime.sendMessage({ type: "openInNext", shift: event.shiftKey, url: element.href });
        
        event.preventDefault();
        event.stopPropagation();
    }
}

function onMouseDown(event)  /* Firefox - workaround */
{
    var i;
    
    if (typeof event.isTrusted != "undefined" && !event.isTrusted) return;  /* event.isTrusted undefined before Chrome 46 */
    
    if (showQuickMenu && quickMenuPosn == 0 && event.button == 1)
    {
        /* Firefox - Quick Menu appears after middle-clicking on the page background */
        /* Only happens if windowType is popup and if Quick Menu position is top left */
        /* Workaround is to close Quick Menu shortly after middle-button mouse down event */
        
        for (i = 0; i <= 50; i += 5) window.setTimeout(hideQuickMenu,i);
    }
    
    function hideQuickMenu()
    {
        document.getElementById("tiletabs-menuicon").style.setProperty("display","block","important");
        document.getElementById("tiletabs-menubox").style.setProperty("display","none","important");
    }
}

function onContextMenu(event)
{
    var element;
    
    if (typeof event.isTrusted != "undefined" && !event.isTrusted) return;  /* event.isTrusted undefined before Chrome 46 */
    
    if (showQuickMenuCtrl && (event.ctrlKey || event.metaKey))
    {
        contextQuickMenu(event.clientX,event.clientY);
        
        event.preventDefault();
        event.stopPropagation();
    }
}

function onScroll(event)
{
    if (!ignoreScrollEvent) chrome.runtime.sendMessage({ type: "onScroll", scrollx: window.scrollX, scrolly: window.scrollY });
    
    ignoreScrollEvent = false;
}

/************************************************************************/
