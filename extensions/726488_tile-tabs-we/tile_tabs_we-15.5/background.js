/************************************************************************/
/*                                                                      */
/*      Tile Tabs WE - Generic WebExtension - Background Page           */
/*                                                                      */
/*      Javascript for Background Page                                  */
/*                                                                      */
/*      Last Edit - 28 Feb 2023                                         */
/*                                                                      */
/*      Copyright (C) 2015-2023 DW-dev                                  */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE.txt file and http://www.gnu.org/licenses/           */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Refer to Google Chrome developer documentation:                     */
/*                                                                      */
/*  https://developer.chrome.com/extensions/overview                    */
/*  https://developer.chrome.com/extensions/content_scripts             */
/*  https://developer.chrome.com/extensions/messaging                   */
/*  https://developer.chrome.com/extensions/optionsV2                   */
/*  https://developer.chrome.com/extensions/contentSecurityPolicy       */
/*                                                                      */
/*  https://developer.chrome.com/extensions/manifest                    */
/*  https://developer.chrome.com/extensions/declare_permissions         */
/*  https://developer.chrome.com/extensions/match_patterns              */
/*                                                                      */
/*  https://developer.chrome.com/extensions/browserAction               */
/*  https://developer.chrome.com/extensions/commands                    */
/*  https://developer.chrome.com/extensions/contextMenus                */
/*  https://developer.chrome.com/extensions/extension                   */
/*  https://developer.chrome.com/extensions/notifications               */
/*  https://developer.chrome.com/extensions/runtime                     */
/*  https://developer.chrome.com/extensions/storage                     */
/*  https://developer.chrome.com/extensions/tabs                        */
/*  https://developer.chrome.com/extensions/windows                     */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Chrome API Limitations                                              */
/*                                                                      */
/*  1. chrome.windows.create creates black window if tabId and url      */
/*     parameters are both null for popup window.                       */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Firefox API Limitations                                             */
/*                                                                      */
/*  1. chrome.windows.create does not support focused parameter for     */
/*     normal or popup window. (not a problem for current design)       */
/*                                                                      */
/*  2. chrome.windows.create does not support left/top parameters       */
/*     for popup window, which is always centred on the screen.         */
/*     (see Bug 1275222) (workaround is to update window position)      */
/*                                                                      */
/*  3. chrome.windows.create fails with 'browser.ownerGlobal is null'   */
/*     exception, if the parent window is in maximized state.           */
/*     (workaround is to convert window to normal state)                */
/*                                                                      */
/*  4. chrome.tabs.move fails silently when trying to move pinned       */
/*     tabs after any unpinned tabs or when trying to move unpinned     */
/*     tabs before any pinned tabs.                                     */
/*                                                                      */
/*  5. chrome.tabs.onUpdated listener causes tabId's to change with     */
/*     Firefox 57.0-60.0. Instead use chrome.tabs.onActivated and       */
/*     chrome.webNavigation.onDOMContentLoaded.                         */
/*                                                                      */
/*  6. On Windows 10, if windows are without Title Bar, then            */
/*     toggling popup window to normal window causes black areas        */
/*     (see Bug 1273153)  (workaround is to update window position)     */
/*                                                                      */
/*  7. On Windows 10, if windows are without Title Bar, then:           */
/*     - normal windows are slightly larger than with Title Bar         */
/*     - popup windows are slightly smaller than normal windows         */
/*     (see Bug 1284273) (user can set other margins options)           */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Notes on Tile Tabs WE Operation                                     */
/*                                                                      */
/*  1. The basic idea is to provide 'split browser' functionality,      */
/*     to allow viewing of multiple tabs in a tiled layout within       */
/*     the area of the parent browser window.                           */
/*                                                                      */
/*  2. A window may have an invisible margin surrounding the visible    */
/*     border edge. The tree of Tile objects representing the layout    */
/*     uses coordinates based on the visible area of tiled windows.     */
/*     The margin width is dependent on the operating system            */
/*     (e.g. 7 pixels for Windows 10, 0 pixels for Linux & Mac OS X).   */
/*                                                                      */
/*  3. A window has a minimum width that is dependent on the browser,   */
/*     operating system and the number of tabs in the window.           */
/*                                                                      */
/*  4. A window has a minimum height that is dependent on the browser,  */
/*     operating system and the number of toolbars in the window.       */
/*                                                                      */
/*  5. The minimum width and height for tiled windows are determined    */
/*     before creation of the tiles in the layout.                      */
/*                                                                      */
/*  6. The synchronize scroll feature is available only in tiled        */
/*     windows displayed in the tiled view.                             */
/*                                                                      */
/*  7. The open link in next/previous tab feature is available only     */
/*     in tiled windows displayed in the tiled view.                    */
/*                                                                      */
/*  8. Operations involving multiple windows are performed in a way     */
/*     that ensures a single completion point. This is done using       */
/*     recursive functions to traverse the layout (which also act as    */
/*     closures) and window counts.                                     */
/*                                                                      */
/*  9. Resizing adjacent tiles by dragging their edges is quite         */
/*     awkward to implement, since the Chrome API does not provide      */
/*     a chrome.windows.onUpdated.addListener function.                 */
/*                                                                      */
/* 10. A timer-driven 'tile event handler' function monitors changes    */
/*     in the left/top/width/height properties of the tiled windows.    */
/*     This handler has been designed to minimize the  overheads of     */
/*     polling, whilst retaining reasonable user responsiveness.        */
/*                                                                      */
/* 11. In Chrome, removing tiles using chrome.tabs.remove causes        */
/*     problems when mixed with tab moves and window updates.  For a    */
/*     short period after the callback function is called, querying     */
/*     tabs using chrome.tabs.query still returns the removed tab.      */
/*                                                                      */
/************************************************************************/

/*******************************************************************************************/
/*                                                                                         */
/*  Layout String Formats                                                                  */
/*                                                                                         */
/*  Layout  Debut  Record                                                                  */
/*   Type    Ver   Format                                                                  */
/*                                                                                         */
/*    all    1.0   layouttype,windowcount;                                                 */
/*                                                                                         */
/*    all    1.0   hsplit,ratio,childcount;                                                */
/*    all    1.0   vsplit,ratio,childcount;                                                */
/*                                                                                         */
/*     0*    1.0   window,ratio;                                                           */
/*     1*    1.0   window,ratio,{taburl};                                                  */
/*     2     6.0   window,ratio,windowtype;                                                */
/*     3     6.0   window,ratio,windowtype,{taburl};                                       */
/*     4*    6.1   window,ratio,windowtype;                                                */
/*     5*    6.1   window,ratio,windowtype,{taburl},scrollx,scrolly;                       */
/*     6    14.0   window,ratio,windowtype,{taburl},zoomlevel;                             */
/*     7    14.0   window,ratio,windowtype,{taburl},scrollx,scrolly,scrolllock;            */
/*     8    14.0   window,ratio,windowtype,{taburl},scrollx,scrolly,scrolllock,zoomlevel;  */
/*                                                                                         */
/*  * No longer used for saving                                                            */
/*                                                                                         */
/*******************************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

var enableInspect = false;
var enableEventHandler = true;

var isFirefox;
var ffVersion;

var platformOS;

var windowMinWidth,windowMinHeight;

var keepopenPage,blankPage,newtabPage;

var badgeColors = new Array("#5070C0","#C04040","#408040","#804080","#B06000","#707000","#008080","#707070");

var doubleClose,showSubmenu,showAllTabs,showQuickMenu,quickMenuPosn,showQuickMenuCtrl,showToolbars,removeTwoTiles,toggleAllTiles;
var assignExist,assignLeft,autoCloseNew,autoCloseOpen,autoCloseUser;
var openDefault;
var defaultType,customUrl;
var openLinks;
var reloadPages;
var syncActive;
var zoomPerTab;
var topMargin,lrbMarginNormal,lrbMarginPopup,maxAdjust;
var openScrollDelay,openZoomDelay;
var reapplyScrollLock;

var layouts = new Array();

var recentNames = new Array();

var buttonDoubleTimeout = null;
var buttonIgnoreTimeout = null;

var dialogWindowId = -1;
var dialogParentWindowId = -1;

var newLayoutSubmenu = false;
var tileTabSubmenu = false;

var createdTabId = -1;
var createdWindowId = -1;

var intervalTimer = null;
var pollInterval = 100;  /* 100ms */  /* time between calls to event handler */
var idleCounter = -1;

var resizeHoriz,resizeBefore;

var deferTimeout = 50;  /* 50 ms */  /* allow time for event handler to stop */

/************************************************************************/

/* Layout object constructor */

function Layout()
{
    this.parentWindowId = -1;
    this.parentWindowIncognito = false;
    this.parentWindowKeepOpenTabId = -1;
    
    this.badgeColor = badgeColors[0];
    
    this.rootTile = null;
    this.windowCount = 0;
    
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
    
    this.tiledView = false;
    this.syncScroll = false;
    this.expandedTile = null;
    this.lastFocusedTile = null;
    
    this.genCloseTabIdList = new Array();  /* generated tabs to be closed when layout is hidden */
    this.newCloseTabIdList = new Array();  /* new layout tabs to be closed when layout is closed */
    this.openCloseTabIdList = new Array();  /* open layout tabs to be closed when layout is closed */
    this.userCloseTabIdList = new Array();  /* user created tabs to be closed when layout is hidden */
    
    this.pinnedTabIdList = new Array();  /* tabs to be pinned when layout is hiddden or tile removed */
    this.pinnedTabPosList = new Array();  /* tab positions to be reinstated when layout is hiddden or tile removed */
}

/************************************************************************/

/* Tile object constructor */

function Tile()
{
    this.parentTile = null;
    this.type = "window";  /* window, hsplit or vsplit */
    
    /* Tile position and szie*/
    
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
    this.ratio = 1;
    
    /* Window tile */
    
    this.windowType = showToolbars ? "normal" : "popup";  /* type of window for tile, normal or popup */
    this.windowId = -1;  /* id of window for tile, -1 = no window */
    
    this.tabType = -1;  /* type of assigned tab for tile, -1 = no assigned tab, 0 = existing tab, 1 = generated tab, 2 = tab created by Open Layout */
    this.tabId = -1;  /* id of assigned tab for tile */
    this.tabPos = -1;  /* position of assigned tab when returning to parent window, -1 = after last tab */
    this.tabPinned = false;  /* whether assigned tab is pinned in parent window */
    
    this.scrollX = 0;  /* latest scroll X position */
    this.scrollY = 0;  /* latest scroll Y position */
    this.scrollLock = false;  /* lock scroll positions */
    this.scrollInit = false;  /* initialize scroll positions on first page load after opening layout */
    this.scrollXInit = 0;  /* initial scroll X position */
    this.scrollYInit = 0;  /* initial scroll Y position */
    
    this.zoomLevel = 100;  /* latest zoom level */
    this.zoomInit = false;  /* initialize zoom level on first page load after opening layout */
    this.zoomLevelInit = 100;  /* initial zoom level */
    
    /* Split tile */
    
    this.childTiles = new Array();
    
    /* Temporary properties */
    
    this.tabUrl = "";  /* used when opening layout */
}

/************************************************************************/

/* Initialize on browser startup */

chrome.runtime.getPlatformInfo(
function(PlatformInfo)   
{
    platformOS = PlatformInfo.os;
    
    chrome.storage.local.set({ "environment-platformos": platformOS });
    
    isFirefox = (navigator.userAgent.indexOf("Firefox") >= 0);
    
    chrome.storage.local.set({ "environment-isfirefox": isFirefox });
    
    if (isFirefox)
    {
        chrome.runtime.getBrowserInfo(
        function(info)
        {
            ffVersion = info.version.substr(0,info.version.indexOf("."));
            
            chrome.storage.local.set({ "environment-ffversion": ffVersion });
            
            initialize();
        });
    }
    else initialize();
});

function initialize()
{
    newtabPage = (isFirefox) ? "about:newtab" : "chrome:newtab";
    blankPage = chrome.runtime.getURL("blank.html");
    keepopenPage = chrome.runtime.getURL("keepopen.html");
    
    windowMinWidth = (isFirefox) ? 302 : 296;
    windowMinHeight = (isFirefox) ? 178 : 111;
    
    chrome.storage.local.get(null,
    function(object)
    {
        /* Initialize or migrate options */
        
        /* General options */
        
        if (!("options-doubleclose" in object)) object["options-doubleclose"] = true;
        if (!("options-showsubmenu" in object)) object["options-showsubmenu"] = true;
        if (!("options-showalltabs" in object)) object["options-showalltabs"] = false;
        if (!("options-showquickmenu" in object)) object["options-showquickmenu"] = true;
        if (!("options-quickmenuposn" in object)) object["options-quickmenuposn"] = "0";
        if (!("options-showquickmenuctrl" in object)) object["options-showquickmenuctrl"] = true;
        if (!("options-showtoolbars" in object)) object["options-showtoolbars"] = true;
        if (!("options-removetwotiles" in object)) object["options-removetwotiles"] = true;
        if (!("options-togglealltiles" in object)) object["options-togglealltiles"] = 
            ("options-settoggleall" in object) ? object["options-settoggleall"] : false;  /* Version 7.0-14.0 */
        
        if (!("options-assignexist" in object)) object["options-assignexist"] = true;
        if (!("options-assignleft" in object)) object["options-assignleft"] = false;
        if (!("options-autoclosenew" in object)) object["options-autoclosenew"] = false;
        if (!("options-autocloseopen" in object)) object["options-autocloseopen"] = false;
        if (!("options-autocloseuser" in object)) object["options-autocloseuser"] = false;
        
        if (!("options-opendefault" in object)) object["options-opendefault"] = false;
        
        /* Page Settings options */
        
        if (!("options-defaulttype" in object)) object["options-defaulttype"] = 0;
        if (!("options-customurl" in object)) object["options-customurl"] =
            ("options-defaultpage" in object) ? object["options-defaultpage"] : "";  /* Version 7.0-15.3 */
        
        if (!("options-openlinks" in object)) object["options-openlinks"] = 3;
        
        if (!("options-reloadpages" in object)) object["options-reloadpages"] = false;
        
        if (!("options-syncactive" in object)) object["options-syncactive"] = false;
        
        if (!("options-zoompertab" in object)) object["options-zoompertab"] = false;
        
        /* Advanced options */
        
        if (platformOS == "win")
        {
            if (!("options-topmargin" in object)) object["options-topmargin"] = 0;
            if (!("options-lrbmarginnormal" in object)) object["options-lrbmarginnormal"] = isFirefox ? 5 : 7;
            if (!("options-lrbmarginpopup" in object)) object["options-lrbmarginpopup"] = 7;
            if (!("options-maxadjust" in object)) object["options-maxadjust"] = isFirefox ? 3 : 1;
        }
        else  /* "linux", "mac" or other platform */
        {
            if (!("options-topmargin" in object)) object["options-topmargin"] = 0;
            if (!("options-lrbmarginnormal" in object)) object["options-lrbmarginnormal"] = 0;
            if (!("options-lrbmarginpopup" in object)) object["options-lrbmarginpopup"] = 0;
            if (!("options-maxadjust" in object)) object["options-maxadjust"] = 0;
        }
        
        if (!("options-openscrolldelay" in object)) object["options-openscrolldelay"] = 0.0;
        if (!("options-openzoomdelay" in object)) object["options-openzoomdelay"] = 0.0;
        
        if (!("options-reapplyscrolllock" in object)) object["options-reapplyscrolllock"] = false;
        
        /* Layout settings */
        
        if (!("layout-defaultdesign" in object)) object["layout-defaultdesign"] = "2vert";
        if (!("layout-defaultname" in object)) object["layout-defaultname"] = "";
        
        if (!("layout-recentnames" in object)) object["layout-recentnames"] = new Array();
        
        if (!("layout-savetabs" in object)) object["layout-savetabs"] = false;
        if (!("layout-savescroll" in object)) object["layout-savescroll"] = false;
        if (!("layout-savezoom" in object)) object["layout-savezoom"] = false;
        
        /* Reinstate settings */
        
        if (!("reinstate-flag" in object)) object["reinstate-flag"] = false;
        
        /* Update stored options */
        
        chrome.storage.local.set(object);
        
        /* Initialize local options */
        
        doubleClose = object["options-doubleclose"];
        showSubmenu = object["options-showsubmenu"];
        showAllTabs = object["options-showalltabs"];
        showQuickMenu = object["options-showquickmenu"];
        quickMenuPosn = object["options-quickmenuposn"];
        showQuickMenuCtrl = object["options-showquickmenuctrl"];
        showToolbars = object["options-showtoolbars"];
        removeTwoTiles = object["options-removetwotiles"];
        toggleAllTiles = object["options-togglealltiles"];
        
        assignExist = object["options-assignexist"];
        assignLeft = object["options-assignleft"];
        autoCloseNew = object["options-autoclosenew"];
        autoCloseOpen = object["options-autocloseopen"];
        autoCloseUser = object["options-autocloseuser"];
        
        openDefault = object["options-opendefault"];
        
        defaultType = object["options-defaulttype"];
        customUrl = object["options-customurl"];
        
        openLinks = object["options-openlinks"];
        
        reloadPages = object["options-reloadpages"];
        
        syncActive = object["options-syncactive"];
        
        zoomPerTab = object["options-zoompertab"];

        topMargin = object["options-topmargin"];
        lrbMarginNormal = object["options-lrbmarginnormal"];
        lrbMarginPopup = object["options-lrbmarginpopup"];
        maxAdjust = object["options-maxadjust"];
        
        openScrollDelay = object["options-openscrolldelay"];
        openZoomDelay = object["options-openzoomdelay"];
        
        reapplyScrollLock = object["options-reapplyscrolllock"];
        
        /* Initialize and validate recent names */
        
        recentNames = object["layout-recentnames"];
        
        updateRecentNames([""],false);
        
        /* Add context menu items */
        
        createContextMenu();
        
        /* Add listeners */
        
        addListeners();
        
        /* Reinstate window size */
        
        chrome.windows.getLastFocused({ },
        function(focuswin)
        {
            if (object["reinstate-flag"])
            {
                if (object["reinstate-state"] == "maximized")
                {
                    chrome.windows.update(focuswin.id,{ state: "maximized" },
                    function(focuswin)
                    {
                        if (openDefault) createDefaultLayout(focuswin);
                    });
                }
                else
                {
                    chrome.windows.update(focuswin.id,{ state: "normal",
                                                        left: object["reinstate-left"], top: object["reinstate-top"],
                                                        width: object["reinstate-width"], height: object["reinstate-height"] },
                    function(focuswin)
                    {
                        if (openDefault) createDefaultLayout(focuswin);
                    });
                }
                
                chrome.storage.local.set({ "reinstate-flag": false });
            }
            else
            {
                if (openDefault) createDefaultLayout(focuswin);
            }
        });
    });
}

/************************************************************************/

/* Add listeners */

function addListeners()
{
    /* Storage changed listener */
    
    chrome.storage.onChanged.addListener(
    function(changes,areaName)
    {
        var i;
        
        if ("options-doubleclose" in changes) doubleClose = changes["options-doubleclose"].newValue;
        if ("options-showsubmenu" in changes) showSubmenu = changes["options-showsubmenu"].newValue;
        if ("options-showalltabs" in changes) showAllTabs = changes["options-showalltabs"].newValue;
        if ("options-showquickmenu" in changes) showQuickMenu = changes["options-showquickmenu"].newValue;
        if ("options-quickmenuposn" in changes) quickMenuPosn = changes["options-quickmenuposn"].newValue;
        if ("options-showquickmenuctrl" in changes) showQuickMenuCtrl = changes["options-showquickmenuctrl"].newValue;
        if ("options-showtoolbars" in changes) showToolbars = changes["options-showtoolbars"].newValue;
        if ("options-removetwotiles" in changes) removeTwoTiles = changes["options-removetwotiles"].newValue;
        if ("options-togglealltiles" in changes) toggleAllTiles = changes["options-togglealltiles"].newValue;
        
        if ("options-assignexist" in changes) assignExist = changes["options-assignexist"].newValue;
        if ("options-assignleft" in changes) assignLeft = changes["options-assignleft"].newValue;
        if ("options-autoclosenew" in changes) autoCloseNew = changes["options-autoclosenew"].newValue;
        if ("options-autocloseopen" in changes) autoCloseOpen = changes["options-autocloseopen"].newValue;
        if ("options-autocloseuser" in changes) autoCloseUser = changes["options-autocloseuser"].newValue;
        
        if ("options-opendefault" in changes) openDefault = changes["options-opendefault"].newValue;
        
        if ("options-defaulttype" in changes) defaultType = changes["options-defaulttype"].newValue;
        if ("options-customurl" in changes) customUrl = changes["options-customurl"].newValue;
        
        if ("options-openlinks" in changes) openLinks = changes["options-openlinks"].newValue;
        
        if ("options-reloadpages" in changes) reloadPages = changes["options-reloadpages"].newValue;
        
        if ("options-syncactive" in changes) syncActive = changes["options-syncactive"].newValue;
        
        if ("options-zoompertab" in changes) zoomPerTab = changes["options-zoompertab"].newValue;

        if ("options-topmargin" in changes) topMargin = changes["options-topmargin"].newValue;
        if ("options-lrbmarginnormal" in changes) lrbMarginNormal = changes["options-lrbmarginnormal"].newValue;
        if ("options-lrbmarginpopup" in changes) lrbMarginPopup = changes["options-lrbmarginpopup"].newValue;
        if ("options-maxadjust" in changes) maxAdjust = changes["options-maxadjust"].newValue;
        
        if ("options-openscrolldelay" in changes) openScrollDelay = changes["options-openscrolldelay"].newValue;
        if ("options-openzoomdelay" in changes) openZoomDelay = changes["options-openzoomdelay"].newValue;
        
        if ("options-reapplyscrolllock" in changes) reapplyScrollLock = changes["options-reapplyscrolllock"].newValue;
        
        if ("options-showsubmenu" in changes)
        {
            createContextMenu();
            
            chrome.windows.getLastFocused({ },
            function(focuswin)
            {
                if (focuswin.id == chrome.windows.WINDOW_ID_NONE) return;  /* all browser windows have lost focus */
                
                updateContextMenuItems(focuswin.id);
            });
        }
        
        if ("options-showquickmenu" in changes || "options-quickmenuposn" in changes || "options-showquickmenuctrl" in changes)
        {
            for (i = 0; i < layouts.length; i++)
            {
                if (layouts[i].tiledView) setQuickMenuForAllTabsInLayout(layouts[i].rootTile);
            }
        }
        
        if ("options-zoompertab" in changes)
        {
            if (!isFirefox)
            {
                for (i = 0; i < layouts.length; i++)
                {
                    if (layouts[i].tiledView) setZoomModeForAllTabsInLayout(layouts[i].rootTile);
                }
            }
        }
    });
    
    /* Browser action listener */
    
    chrome.browserAction.onClicked.addListener(
    function(tab)
    {
        if (buttonIgnoreTimeout != null) return;
        
        chrome.windows.getLastFocused({ populate: true },
        function(focuswin)
        {
            var layout;
            
            layout = findLayoutByWindowId(focuswin.id);
            
            if (doubleClose && buttonDoubleTimeout != null)
            {
                window.clearTimeout(buttonDoubleTimeout);
                
                buttonDoubleTimeout = null;
                
                if (layout != null && layout.parentWindowId == focuswin.id)  /* parent window */
                {
                    if (layout.tiledView) hideLayout(layout,true);  /* hide then close */
                    else closeLayout(layout);
                }
                else if (layout != null)  /* tiled window */
                {
                    hideLayout(layout,true);
                }
                else ;  /* other window */
            }
            else
            {
                buttonDoubleTimeout = window.setTimeout(
                function()
                {
                    buttonDoubleTimeout = null;
                    
                    buttonIgnoreTimeout = window.setTimeout(function() { buttonIgnoreTimeout = null; },1000);
                    
                    if (layout != null && layout.parentWindowId == focuswin.id)  /* parent window */
                    {
                        if (layout.tiledView) hideLayout(layout,false);
                        else
                        {
                            chrome.windows.get(layout.parentWindowId,{ },
                            function(parentwin)
                            {
                                setLayoutDimensions(layout,parentwin,
                                function()
                                {
                                    adjustLayout(layout);
                                    showLayout(layout);
                                });
                            });
                        }
                    }
                    else if (layout != null)  /* tiled window */
                    {
                        hideLayout(layout,false);
                    }
                    else  /* other window */
                    {
                        createDefaultLayout(focuswin);
                    }
                    
                },(doubleClose) ? 400 : 0);  /* allow time to detect double-click */
            }
        });
    });
    
    /* Keyboard command listener */
    
    chrome.commands.onCommand.addListener(
    function(command)
    {
        chrome.windows.getLastFocused({ populate: true },
        function(focuswin)
        {
            var layout;
            
            layout = findLayoutByWindowId(focuswin.id);
            
            switch (command)
            {
                case "newcloselayout":
                    
                    if (layout != null)  /* parent or tiled window */
                    {
                        if (layout.tiledView) hideLayout(layout,true);  /* hide then close */
                        else closeLayout(layout);
                    }
                    else  /* other window */
                    {
                        createDefaultLayout(focuswin);
                    }
                    
                    break;
                    
                case "hideshowlayout":
                    
                    if (layout.rootTile != null)
                    {
                        if (layout.tiledView) hideLayout(layout,false);
                        else
                        {
                            chrome.windows.get(layout.parentWindowId,{ },
                            function(parentwin)
                            {
                                setLayoutDimensions(layout,parentwin,
                                function()
                                {
                                    adjustLayout(layout);
                                    showLayout(layout);
                                });
                            });
                        }
                    }
                    
                    break;
                    
                case "refreshlayout":
                    
                    if (layout != null && layout.tiledView)
                    {
                        refreshLayout(layout);
                    }
                    
                    break;
                    
                case "toggletoolbars":
                    
                    if (layout != null && layout.tiledView)
                    {
                        if (toggleAllTiles) toggleToolbarsAll(layout);
                        else toggleToolbars(layout);
                    }
                    
                    break;
            }
        });
    });
    
    /* Context menu listener */
    
    chrome.contextMenus.onClicked.addListener(
    function(info,tab)
    {
        chrome.windows.getLastFocused({ populate: true },
        function(focuswin)
        {
            var i,recentName,tabId,pos,selpos,layout,direction,tabUrl,tile;
            
            if (info.menuItemId.substr(-2) == "-b" || info.menuItemId.substr(-2) == "-c")
                info.menuItemId = info.menuItemId.substr(0,info.menuItemId.length-2);
            
            if (info.menuItemId.substr(0,17) == "newlayout-recent-")
            {
                recentName = info.menuItemId.substr(17);
                info.menuItemId = info.menuItemId.substr(0,16);
            }
            
            if (info.menuItemId.substr(0,8) == "tiletab-" && (i = info.menuItemId.lastIndexOf("-tab")) >= 12)
            {
                tabId = Number(info.menuItemId.substr(i+5));
                info.menuItemId = info.menuItemId.substr(0,i+4);
            }
            
            if (info.menuItemId.substr(0,8) == "tiletab-" && (i = info.menuItemId.lastIndexOf("-duptab")) >= 12)
            {
                tabId = Number(info.menuItemId.substr(i+8));
                info.menuItemId = info.menuItemId.substr(0,i+7);
            }
            
            for (pos = 0; pos < focuswin.tabs.length; pos++)
            {
                if (focuswin.tabs[pos].active) selpos = pos;  /* selected tab */
            }
            
            layout = findLayoutByWindowId(focuswin.id);
            
            switch (info.menuItemId)
            {
                case "newcloselayout":
                    
                    if (layout.tiledView) hideLayout(layout,true);  /* hide then close */
                    else closeLayout(layout);
                    
                    break;
                    
                case "newlayout-default":
                    
                    createDefaultLayout(focuswin);
                    
                    break;
                    
                case "newlayout-recent":
                    
                    chrome.storage.local.get(null,
                    function(object)
                    {
                        var layoutString;
                        
                        layout = addLayout();
                        layout.windowCount = 0;
                        layout.parentWindowId = focuswin.id;
                        layout.parentWindowIncognito = focuswin.incognito;
                        
                        setReinstateData(focuswin);
                        
                        setLayoutDimensions(layout,focuswin,
                        function()
                        {
                            layoutString = object["layout-string-" + recentName];
                            
                            if (layoutString != null) openLayoutReply(layout,recentName,layoutString);
                        });
                    });
                    
                    break;
                    
                case "newlayout-1only":
                case "newlayout-2vert":
                case "newlayout-2horiz":
                case "newlayout-3vert":
                case "newlayout-3horiz":
                case "newlayout-4vertgrid":
                case "newlayout-4horizgrid":
                case "newlayout-6vertgrid":
                case "newlayout-6horizgrid":
                case "newlayout-allvert":
                case "newlayout-allhoriz":
                case "newlayout-allvertgrid":
                case "newlayout-allhorizgrid":
                    
                    layout = addLayout();
                    layout.windowCount = 0;
                    layout.parentWindowId = focuswin.id;
                    layout.parentWindowIncognito = focuswin.incognito;
                    
                    setReinstateData(focuswin);
                    
                    setLayoutDimensions(layout,focuswin,
                    function()
                    {
                        createLayout(layout,info.menuItemId.substr(10),focuswin);
                    });
                    
                    break;
                    
                case "hideshowlayout":
                    
                    if (layout.tiledView) hideLayout(layout,false);
                    else
                    {
                        chrome.windows.get(layout.parentWindowId,{ },
                        function(parentwin)
                        {
                            setLayoutDimensions(layout,parentwin,
                            function()
                            {
                                adjustLayout(layout);
                                showLayout(layout);
                            });
                        });
                    }
                    
                    break;
                    
                case "refreshlayout":
                    
                    refreshLayout(layout);
                    
                    break;
                    
                case "toggletoolbars-this":
                    
                    toggleToolbars(layout);
                    
                    break;
                    
                case "toggletoolbars-all":
                    
                    toggleToolbarsAll(layout);
                    
                    break;
                    
                case "tiletab-above-thistab":
                case "tiletab-left-thistab":
                case "tiletab-right-thistab":
                case "tiletab-below-thistab":
                    
                    direction = info.menuItemId.substr(8,5);
                    
                    if (direction == "left-") direction = "left";
                    
                    if (tab.index == selpos)
                    {
                        chrome.tabs.create({ url: tab.url, active: false },
                        function (tab)
                        {
                            if (layout == null)
                            {
                                layout = addLayout();
                                layout.windowCount = 0;
                                layout.parentWindowId = focuswin.id;
                                layout.parentWindowIncognito = focuswin.incognito;
                                
                                setReinstateData(focuswin);
                                
                                setLayoutDimensions(layout,focuswin,
                                function()
                                {
                                    addTileFirst(layout);
                                    addTileOther(layout,layout.rootTile,direction);
                                    adjustLayout(layout);
                                    newLayout(layout,0,false,tab.index,direction);
                                });
                            }
                            else addTile(layout,direction,tab.id,null);
                        });
                    }
                    else
                    {
                        if (layout == null)
                        {
                            layout = addLayout();
                            layout.windowCount = 0;
                            layout.parentWindowId = focuswin.id;
                            layout.parentWindowIncognito = focuswin.incognito;
                            
                            setReinstateData(focuswin);
                            
                            setLayoutDimensions(layout,focuswin,
                            function()
                            {
                                addTileFirst(layout);
                                addTileOther(layout,layout.rootTile,direction);
                                adjustLayout(layout);
                                newLayout(layout,0,false,tab.index,direction);
                            });
                        }
                        else addTile(layout,direction,tab.id,null);
                    }
                    
                    break;
                    
                case "tiletab-above-link":
                case "tiletab-left-link":
                case "tiletab-right-link":
                case "tiletab-below-link":
                    
                    direction = info.menuItemId.substr(8,5);
                    
                    if (direction == "left-") direction = "left";
                    
                    if (layout == null)
                    {
                        chrome.tabs.create({ url: info.linkUrl, active: false },
                        function (tab)
                        {
                            layout = addLayout();
                            layout.windowCount = 0;
                            layout.parentWindowId = focuswin.id;
                            layout.parentWindowIncognito = focuswin.incognito;
                            
                            setReinstateData(focuswin);
                            
                            setLayoutDimensions(layout,focuswin,
                            function()
                            {
                                addTileFirst(layout);
                                addTileOther(layout,layout.rootTile,direction);
                                adjustLayout(layout);
                                newLayout(layout,0,false,tab.index,direction);
                            });
                        });
                    }
                    else addTile(layout,direction,null,info.linkUrl);
                    
                    break;
                    
                case "tiletab-above-newtab":
                case "tiletab-left-newtab":
                case "tiletab-right-newtab":
                case "tiletab-below-newtab":
                    
                    direction = info.menuItemId.substr(8,5);
                    
                    if (direction == "left-") direction = "left";
                    
                    if (layout == null)
                    {
                        tabUrl = defaultPageUrl(focuswin.tabs[selpos].url);
                        
                        chrome.tabs.create({ url: tabUrl, active: false },
                        function (tab)
                        {
                            layout = addLayout();
                            layout.windowCount = 0;
                            layout.parentWindowId = focuswin.id;
                            layout.parentWindowIncognito = focuswin.incognito;
                            
                            setReinstateData(focuswin);
                            
                            setLayoutDimensions(layout,focuswin,
                            function()
                            {
                                addTileFirst(layout);
                                addTileOther(layout,layout.rootTile,direction);
                                adjustLayout(layout);
                                newLayout(layout,0,false,tab.index,direction);
                            });
                        });
                    }
                    else addTile(layout,direction,null,null);
                    
                    break;
                    
                case "tiletab-above-duptab":
                case "tiletab-left-duptab":
                case "tiletab-right-duptab":
                case "tiletab-below-duptab":
                    
                    direction = info.menuItemId.substr(8,5);
                    
                    if (direction == "left-") direction = "left";
                    
                    if (layout == null)
                    {
                        chrome.tabs.create({ url: tab.url, active: false },
                        function (tab)
                        {
                            layout = addLayout();
                            layout.windowCount = 0;
                            layout.parentWindowId = focuswin.id;
                            layout.parentWindowIncognito = focuswin.incognito;
                            
                            setReinstateData(focuswin);
                            
                            setLayoutDimensions(layout,focuswin,
                            function()
                            {
                                addTileFirst(layout);
                                addTileOther(layout,layout.rootTile,direction);
                                adjustLayout(layout);
                                newLayout(layout,0,false,tab.index,direction);
                            });
                        });
                    }
                    else addTile(layout,direction,null,tab.url);
                    
                    break;
                    
                case "tiletab-above-tab":
                case "tiletab-left-tab":
                case "tiletab-right-tab":
                case "tiletab-below-tab":
                    
                    direction = info.menuItemId.substr(8,5);
                    
                    if (direction == "left-") direction = "left";
                    
                    if (layout == null)
                    {
                        chrome.tabs.get(tabId,
                        function(tab)
                        {
                            layout = addLayout();
                            layout.windowCount = 0;
                            layout.parentWindowId = focuswin.id;
                            layout.parentWindowIncognito = focuswin.incognito;
                            
                            setReinstateData(focuswin);
                            
                            setLayoutDimensions(layout,focuswin,
                            function()
                            {
                                addTileFirst(layout);
                                addTileOther(layout,layout.rootTile,direction);
                                adjustLayout(layout);
                                newLayout(layout,0,false,tab.index,direction);
                            });
                        });
                    }
                    else addTile(layout,direction,tabId,null);
                    
                    break;
                    
                case "bookmarklayout":
                    
                    bookmarkLayout(layout);
                    
                    break;
                    
                case "opensavelayout":
                    
                    if (layout != null && layout.parentWindowId != -1)
                    {
                        chrome.windows.get(layout.parentWindowId,{ },
                        function(parentwin)
                        {
                            setReinstateData(parentwin);
                            saveLayout();
                        });
                    }
                    else
                    {
                        setReinstateData(focuswin);
                        if (layout == null) openLayout();
                        else saveLayout();
                    }
                    
                    break;
                    
                case "deletelayouts":
                    
                    if (layout != null && layout.parentWindowId != -1)
                    {
                        chrome.windows.get(layout.parentWindowId,{ },
                        function(parentwin)
                        {
                            setReinstateData(parentwin);
                            deleteLayouts();
                        });
                    }
                    else
                    {
                        setReinstateData(focuswin);
                        deleteLayouts();
                    }
                    
                    break;
                    
                case "defaultlayout-saved":
                    
                    if (layout != null && layout.parentWindowId != -1)
                    {
                        chrome.windows.get(layout.parentWindowId,{ },
                        function(parentwin)
                        {
                            setReinstateData(parentwin);
                            defaultLayout();
                        });
                    }
                    else
                    {
                        setReinstateData(focuswin);
                        defaultLayout();
                    }
                    
                    break;
                    
                case "defaultlayout-1only":
                case "defaultlayout-2vert":
                case "defaultlayout-2horiz":
                case "defaultlayout-3vert":
                case "defaultlayout-3horiz":
                case "defaultlayout-4vertgrid":
                case "defaultlayout-4horizgrid":
                case "defaultlayout-6vertgrid":
                case "defaultlayout-6horizgrid":
                case "defaultlayout-allvert":
                case "defaultlayout-allhoriz":
                case "defaultlayout-allvertgrid":
                case "defaultlayout-allhorizgrid":
                    
                    clearDefaultLayoutCheckMarks();
                    
                    chrome.contextMenus.update(info.menuItemId + "-b",{ checked: true });
                    chrome.contextMenus.update(info.menuItemId + "-c",{ checked: true });
                    
                    chrome.storage.local.set({ "layout-defaultdesign": info.menuItemId.substr(14), "layout-defaultname": "" });
                    
                    break;
                    
                case "addtile-above":
                case "addtile-left":
                case "addtile-right":
                case "addtile-below":
                    
                    direction = info.menuItemId.substr(8);
                    addTile(layout,direction,null,null);
                    
                    break;
                    
                case "removetile":
                    
                    removeTile(layout);
                    
                    break;
                    
                case "expandcontracttile":
                    
                    if (findTileByWindowId(layout.rootTile,focuswin.id) == layout.expandedTile) contractTile(layout);
                    else expandTile(layout);
                    
                    break;
                    
                case "equalizetiles":
                    
                    equalizeTiles(layout);
                    
                    break;
                    
                case "inspecttile-this":
                case "inspecttile-before":
                case "inspecttile-after":
                case "inspecttile-parent":
                case "inspecttile-gparent":
                case "inspecttile-ggparent":
                    
                    inspectTile(layout,info.menuItemId.substr(12));
                    
                    break;
                    
                case "scrolllock":
                    
                    tile = findTileByWindowId(layout.rootTile,focuswin.id);
                    
                    tile.scrollLock = !tile.scrollLock;
                    
                    setQuickMenuForAllTabsInWindow(tile.windowId,showQuickMenu || showQuickMenuCtrl);
                    
                    chrome.contextMenus.update("scrolllock-b",{ checked: tile.scrollLock });
                    chrome.contextMenus.update("scrolllock-c",{ checked: tile.scrollLock });
                    
                    if (tile.scrollLock) chrome.tabs.sendMessage(tile.tabId,{ type: "addScrollLock", scrollx: tile.scrollX, scrolly: tile.scrollY },checkError);
                    else chrome.tabs.sendMessage(tile.tabId,{ type: "removeScrollLock" },checkError);
                    
                    break;
                    
                case "syncscroll":
                    
                    layout.syncScroll = !layout.syncScroll;
                    
                    setQuickMenuForAllTabsInLayout(layout.rootTile);
                    
                    chrome.contextMenus.update("syncscroll-b",{ checked: layout.syncScroll });
                    chrome.contextMenus.update("syncscroll-c",{ checked: layout.syncScroll });
                    
                    break;
            }
        });
    });
    
    /* Tab event listeners */
    
    chrome.tabs.onCreated.addListener(
    function(tab)
    {
        createdTabId = tab.id;
        
        window.setTimeout(function() { createdTabId = -1; },isFirefox ? 500 : 100);
    });
    
    chrome.tabs.onUpdated.addListener(
    function(tabId,changeInfo,tab)
    {
        var layout,tile;
        
        if (!isFirefox && zoomPerTab)
        {
            layout = findLayoutByWindowId(tab.windowId);
            
            if (layout != null)
            {
                tile = findTileByWindowId(layout.rootTile,tab.windowId);
            
                if (tile != null) chrome.tabs.setZoomSettings(tabId,{ mode: "automatic", scope: "per-tab" });
            }
        }
    });
    
    chrome.tabs.onActivated.addListener(  /* tab selected */
    function(tabId,changeInfo,tab)
    {
        removeTileTabSubmenu();
        createTileTabSubmenu();
    });
    
    chrome.tabs.onAttached.addListener(  /* tab moved into window */
    function(tabId,attachInfo)
    {
        var layout,tile;
        
        layout = findLayoutByWindowId(attachInfo.newWindowId);
        
        if (layout != null && layout.parentWindowId == attachInfo.newWindowId)  /* parent window */
        {
            if (layout.tiledView) setBadgeForAllTabsInWindow(attachInfo.newWindowId,2);
            else setBadgeForAllTabsInWindow(attachInfo.newWindowId,1);
            
            chrome.tabs.sendMessage(tabId,{ type: "removeListeners" },checkError);
            
            chrome.tabs.sendMessage(tabId,{ type: "removeQuickMenu" },checkError);
        }
        else if (layout != null)  /* tiled window */
        {
            tile = findTileByWindowId(layout.rootTile,attachInfo.newWindowId);
            
            setBadgeForAllTabsInWindow(attachInfo.newWindowId,3);
            
            chrome.tabs.sendMessage(tabId,{ type: "addListeners" },checkError);
            
            if (showQuickMenu || showQuickMenuCtrl)
            {
                chrome.tabs.sendMessage(tabId,{ type: "addQuickMenu", expanded: (tile == layout.expandedTile),
                                                scrolllock: tile.scrollLock, syncscroll: layout.syncScroll },checkError);
            }
            else chrome.tabs.sendMessage(tabId,{ type: "removeQuickMenu" },checkError);
        }
        else  /* other window */
        {
            setBadgeForAllTabsInWindow(attachInfo.newWindowId,0);
            
            chrome.tabs.sendMessage(tabId,{ type: "removeListeners" },checkError);
            
            chrome.tabs.sendMessage(tabId,{ type: "removeQuickMenu" },checkError);
        }
    });
    
    chrome.tabs.onZoomChange.addListener(
    function(zoomChangeInfo)
    {
        chrome.tabs.get(zoomChangeInfo.tabId,
        function(tab)
        {
            var layout,tile;
            
            if (chrome.runtime.lastError == null)  /* in case tab does not exist */
            {
                layout = findLayoutByWindowId(tab.windowId);
                
                if (layout != null)
                {
                    tile = findTileByWindowId(layout.rootTile,tab.windowId);
                    
                    if (tile != null)
                    {
                        tile.zoomLevel = zoomChangeInfo.newZoomFactor*100;
                    }
                }
            }
        });
    });
    
    /* Window event listeners */
    
    chrome.windows.onCreated.addListener(
    function(win)
    {
        createdWindowId = win.id;
        
        window.setTimeout(function() { createdWindowId = -1; },isFirefox ? 500 : 100);
    });
    
    chrome.windows.onFocusChanged.addListener(  /* fired when browser window gains focus or when all browser windows lose focus */
    function(windowId)
    {
        if (windowId == chrome.windows.WINDOW_ID_NONE) return;  /* all browser windows have lost focus */
        
        updateContextMenuItems(windowId);
        
        if (dialogWindowId != -1) chrome.windows.update(dialogWindowId,{ focused: true });  /* keep dialog window on top */
    });
    
    chrome.windows.onRemoved.addListener(  /* window closed */
    function(windowId)
    {
        var layout,tile;
        
        /* Event is fired when 'window' is closed as a result of the following actions: */
        /* 1. User clicking on close (x) button of 'window' or close (x) button of last tab in 'window' */
        /* 2. User dragging last tab out of 'window' and releasing in another window */
        /* 3. Program moving last tab out of tiled 'window' by calling chrome.tabs.move - as in hideLayout(), toggleToolbars(), toggleToolbarsAll() or removeTile() */
        /* 4. User dragging any tab out of window and releasing in another window causing temporary drag 'window' to close */
        /* 5. User clicking on open/save/delete/cancel button of dialog 'window' */
        /* 6. Program removing a dialog 'window' by calling chrome.windows.remove() */
        
        layout = findLayoutByWindowId(windowId);
        
        if (layout != null && windowId == layout.parentWindowId)  /* parent window */  /* cases 1 or 2 */ 
        {
            layout.parentWindowId = -1;
            layout.parentWindowKeepOpenTabId = -1;
        }
        else if (layout != null)  /* tiled window */  /* cases 1 or 2 */
        {
            stopEventHandler();
            
            window.setTimeout(  /* allow time for tileEventHandler() to complete */
            function()
            {
                if (layout.windowCount == 1)
                {
                    closeLayout(layout);
                }
                else if (layout.windowCount == 2 && removeTwoTiles)
                {
                    tile = findTileByWindowId(layout.rootTile,windowId);
                    
                    layout.lastFocusedTile = removeTileOther(layout,tile);
                    
                    chrome.windows.remove(layout.rootTile.windowId);
                    
                    closeLayout(layout);
                }
                else
                {
                    tile = findTileByWindowId(layout.rootTile,windowId);
                    
                    setBadgeForAllTabsInWindow(layout.parentWindowId,2);
                    
                    layout.lastFocusedTile = removeTileOther(layout,tile);
                        
                    adjustLayout(layout);
                    
                    _refreshLayout(layout,false);  /* will restart tile event handler */
                }
            },deferTimeout);
        }
        else if (windowId == dialogWindowId)  /* dialog window */  /* cases 1, 5 or 6 */
        {
            dialogWindowId = -1;
            dialogParentWindowId = -1;
        }
        else  /* other window */  /* cases 1, 2, 3 or 4 */
        {
            /* no action */
        }
        
        if (windowId == dialogParentWindowId)  /* dialog parent window */  /* cases 1, 2 or 3 */
        {
            chrome.windows.remove(dialogWindowId);
            
            dialogWindowId = -1;
            dialogParentWindowId = -1;
        }
    });
    
    /* Web navigation listeners */
    
    chrome.webNavigation.onDOMContentLoaded.addListener(  /* page DOM content loaded */
    function(details)
    {
        if (details.frameId == 0)
        {
            chrome.tabs.get(details.tabId,
            function(tab)
            {
                var tabId,layout,tile;
                
                if (chrome.runtime.lastError == null)  /* in case tab does not exist */
                {
                    tabId = tab.id;
                    
                    layout = findLayoutByWindowId(tab.windowId);
                    
                    if (layout != null && layout.parentWindowId == tab.windowId)  /* parent window */
                    {
                        if (layout.tiledView) setBadgeForAllTabsInWindow(tab.windowId,2);
                        else setBadgeForAllTabsInWindow(tab.windowId,1);
                        
                        chrome.tabs.sendMessage(tabId,{ type: "removeListeners" },checkError);
                        
                        chrome.tabs.sendMessage(tabId,{ type: "removeQuickMenu" },checkError);
                    }
                    else if (layout != null)  /* tiled window */
                    {
                        tile = findTileByWindowId(layout.rootTile,tab.windowId);
                        
                        setBadgeForAllTabsInWindow(tab.windowId,3);
                        
                        chrome.tabs.sendMessage(tabId,{ type: "addListeners" },checkError);
                        
                        if (showQuickMenu || showQuickMenuCtrl)
                        {
                            chrome.tabs.sendMessage(tabId,{ type: "addQuickMenu", expanded: (tile == layout.expandedTile),
                                                            scrolllock: tile.scrollLock, syncscroll: layout.syncScroll },checkError);
                        }
                        else chrome.tabs.sendMessage(tabId,{ type: "removeQuickMenu" },checkError);
                        
                        removeTileTabSubmenu();
                        createTileTabSubmenu();
                    }
                    else  /* other window */
                    {
                        setBadgeForAllTabsInWindow(tab.windowId,0);
                        
                        chrome.tabs.sendMessage(tabId,{ type: "removeListeners" },checkError);
                        
                        chrome.tabs.sendMessage(tabId,{ type: "removeQuickMenu" },checkError);
                        
                        removeTileTabSubmenu();
                        createTileTabSubmenu();
                    }
                }
            });
        }
    });
    
    /* Web request listeners */
    
    chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        if (details.type == "main_frame")  /* main-frame request (reload or navigation) */
        {
            if (details.url.substr(0,22) == "http://-tile-tabs-we-/")  /* layout bookmark opened */
            {
                chrome.windows.getLastFocused({ },
                function(focuswin)
                {
                    var keepopen,layout,layoutString;
                    
                    keepopen = false;
                    
                    if (focuswin.id == createdWindowId)  /* layout bookmark opened in new tab in new window */
                    {
                        chrome.tabs.update(details.tabId, { url: keepopenPage });
                        
                        keepopen = true;
                        
                        createdWindowId = -1;
                    }
                    else if (details.tabId == createdTabId)  /* layout bookmark opened in new tab */
                    {
                        chrome.tabs.remove(details.tabId);
                        
                        createdTabId = -1;
                    }
                    else ;  /* layout bookmark opened in existing tab */
                    
                    layout = findLayoutByWindowId(focuswin.id);
                    
                    if (layout == null)  /* not parent or tiled window */
                    {
                        layout = addLayout();
                        
                        layout.windowCount = 0;
                        
                        layout.parentWindowId = focuswin.id;
                        layout.parentWindowIncognito = focuswin.incognito;
                        if (keepopen) layout.parentWindowKeepOpenTabId = details.tabId;
                        
                        setReinstateData(focuswin);
                        
                        setLayoutDimensions(layout,focuswin,
                        function()
                        {
                            layoutString = decodeURIComponent(details.url.substr(22));
                            
                            window.setTimeout(function() { applyLayoutString(layout,layoutString); },0);  /* break execution otherwise Firefox fails */
                        });
                    }
                });
                
                return { redirectUrl: "javascript:void(0);" };  /* do nothing */
            }
        }
    }
    ,{ urls: ["<all_urls>"] },["blocking"]);
    
    /* Message received listener */
    
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        var i,layout,tile;
        
        layout = findLayoutByWindowId(sender.tab.windowId);
        
        if (layout != null) tile = findTileByWindowId(layout.rootTile,sender.tab.windowId);
        
        switch (message.type)
        {
            /* Messages from content scripts */
            
            case "scriptLoaded":
                
                if (layout != null && tile != null)  /* tiled window */
                {
                    chrome.tabs.sendMessage(sender.tab.id,{ type: "addListeners" },checkError);
                    
                    if (showQuickMenu || showQuickMenuCtrl)
                    {
                        chrome.tabs.sendMessage(sender.tab.id,{ type: "addQuickMenu", expanded: (tile == layout.expandedTile),
                                                                scrolllock: tile.scrollLock, syncscroll: layout.syncScroll },checkError);
                    }
                    else chrome.tabs.sendMessage(sender.tab.id,{ type: "removeQuickMenu" },checkError);
                    
                    if (tile.scrollInit)  /* only for Open Layout */
                    {
                        window.setTimeout(
                        function()
                        {
                            tile.scrollInit = false;
                            
                            tile.scrollX = tile.scrollXInit;
                            tile.scrollY = tile.scrollYInit;
                            
                            chrome.tabs.sendMessage(sender.tab.id,{ type: "setAbsScrollPosn", scrollx: tile.scrollXInit, scrolly: tile.scrollYInit },checkError);
                            
                            if (reapplyScrollLock)
                            {
                                if (tile.scrollLock) chrome.tabs.sendMessage(tile.tabId,{ type: "addScrollLock", scrollx: tile.scrollXInit, scrolly: tile.scrollYInit },checkError);
                                else chrome.tabs.sendMessage(tile.tabId,{ type: "removeScrollLock" },checkError);
                            }
                        },openScrollDelay*1000);
                    }
                    else
                    {
                        chrome.tabs.sendMessage(sender.tab.id,{ type: "setAbsScrollPosn", scrollx: tile.scrollX, scrolly: tile.scrollY },checkError);
                        
                        if (reapplyScrollLock)
                        {
                            if (tile.scrollLock) chrome.tabs.sendMessage(tile.tabId,{ type: "addScrollLock", scrollx: tile.scrollX, scrolly: tile.scrollY },checkError);
                            else chrome.tabs.sendMessage(tile.tabId,{ type: "removeScrollLock" },checkError);
                        }
                    }
                    
                    if (tile.zoomInit)  /* only for Open Layout */
                    {
                        window.setTimeout(
                        function()
                        {
                            tile.zoomInit = false;
                            
                            chrome.tabs.setZoom(sender.tab.id,tile.zoomLevelInit/100);
                        },openZoomDelay*1000);
                    }
                }
                else
                {
                    chrome.tabs.sendMessage(sender.tab.id,{ type: "removeListeners" },checkError);
                    
                    chrome.tabs.sendMessage(sender.tab.id,{ type: "removeQuickMenu" },checkError);
                }
                
                break;
                
                
            case "openInNext":
                
                if (layout != null && tile != null)  /* tiled window */
                {
                    if (layout.tiledView)  /* tiled window */
                    {
                        for (i = 0; i < tile.parentTile.childTiles.length; i++) if (tile.parentTile.childTiles[i] == tile) break;
                        
                        if (message.prev)  /* open in previous tile */
                        {
                            if (i == 0) i = tile.parentTile.childTiles.length-1; else i--;
                        }
                        else  /* open in next tile */
                        {
                            if (i == tile.parentTile.childTiles.length-1) i = 0; else i++;
                        }
                        
                        chrome.tabs.query({ windowId: tile.parentTile.childTiles[i].windowId, active: true },
                        function(tabs)
                        {
                            chrome.tabs.update(tabs[0].id, { url: message.url });
                        });
                    }
                }
                
                break;
                
            case "onScroll":
                
                chrome.windows.getLastFocused({ },
                function(focuswin)
                {
                    var i,deltaX,deltaY;
                    
                    if (layout != null && tile != null)  /* tiled window */
                    {
                        if (layout.tiledView)  /* tiled view */
                        {
                            deltaX = message.scrollx-tile.scrollX;
                            deltaY = message.scrolly-tile.scrollY;
                            
                            if (!tile.scrollLock)
                            {
                                if (layout.syncScroll && (!syncActive || sender.tab.windowId == focuswin.id))
                                {
                                    for (i = 0; i < tile.parentTile.childTiles.length; i++)
                                    {
                                        if (tile.parentTile.childTiles[i] != tile && tile.parentTile.childTiles[i].type == "window")
                                        {
                                            if (!tile.parentTile.childTiles[i].scrollLock)
                                            {
                                                tile.parentTile.childTiles[i].scrollX += deltaX;
                                                tile.parentTile.childTiles[i].scrollY += deltaY;
                                                
                                                chrome.tabs.sendMessage(tile.parentTile.childTiles[i].tabId,{ type: "setRelScrollPosn", deltax: deltaX, deltay: deltaY },checkError);
                                            }
                                        }
                                    }
                                }
                                
                                tile.scrollX += deltaX;
                                tile.scrollY += deltaY;
                            }
                            else chrome.tabs.sendMessage(sender.tab.id,{ type: "setAbsScrollPosn", scrollx: tile.scrollX, scrolly: tile.scrollY },checkError);
                        }
                    }
                });
                
                break;
                
            case "closeLayout":
                
                if (layout.tiledView) hideLayout(layout,true);  /* hide then close */
                else closeLayout(layout);
                
                break;
                
            case "hideLayout":
                
                hideLayout(layout,false);
                
                break;
                
            case "refreshLayout":
                
                refreshLayout(layout);
                
                break;
                
            case "toggleToolbars":
                
                toggleToolbars(layout);
                
                break;
                
            case "toggleToolbarsAll":
                
                toggleToolbarsAll(layout);
                
                break;
                
            case "bookmarkLayout":
                
                bookmarkLayout(layout);
                
                break;
                
            case "saveLayout":
                
                saveLayout(layout);
                
                break;
                
            case "syncScroll":
                
                layout.syncScroll = !layout.syncScroll;
                
                setQuickMenuForAllTabsInLayout(layout.rootTile);
                
                chrome.contextMenus.update("syncscroll-b",{ checked: layout.syncScroll });
                chrome.contextMenus.update("syncscroll-c",{ checked: layout.syncScroll });
                
                break;
                
            case "addTile":
                
                addTile(layout,message.direction,null,null);
                
                break;
                
            case "removeTile":
                
                removeTile(layout);
                
                break;
                
            case "expandTile":
                
                if (findTileByWindowId(layout.rootTile,sender.tab.windowId) == layout.expandedTile) contractTile(layout);
                else expandTile(layout);
                
                break;
                
            case "equalizeTiles":
                
                equalizeTiles(layout);
                
                break;
                
            case "scrollLock":
                
                tile.scrollLock = !tile.scrollLock;
                
                setQuickMenuForAllTabsInLayout(layout.rootTile);
                
                chrome.contextMenus.update("scrolllock-b",{ checked: tile.scrollLock });
                chrome.contextMenus.update("scrolllock-c",{ checked: tile.scrollLock });
                
                if (tile.scrollLock) chrome.tabs.sendMessage(tile.tabId,{ type: "addScrollLock", scrollx: tile.scrollX, scrolly: tile.scrollY },checkError);
                else chrome.tabs.sendMessage(tile.tabId,{ type: "removeScrollLock" },checkError);
                
                break;
                
            /* Messages from scripts in dialog pages */
            
            case "openLayoutReply":
                
                if (message.result)
                {
                    chrome.windows.update(dialogParentWindowId,{ focused: true },
                    function(focuswin)
                    {
                        chrome.storage.local.get(null,
                        function(object)
                        {
                            var layoutString;
                            
                            layout = addLayout();
                            
                            layout.windowCount = 0;
                            
                            layout.parentWindowId = focuswin.id;
                            layout.parentWindowIncognito = focuswin.incognito;
                            
                            setReinstateData(focuswin);
                            
                            setLayoutDimensions(layout,focuswin,
                            function()
                            {
                                layoutString = object["layout-string-" + message.layoutname];
                                
                                window.setTimeout(function() { openLayoutReply(layout,message.layoutname,layoutString); },0);  /* break execution otherwise Firefox fails */
                            });
                        });
                        
                        chrome.windows.remove(dialogWindowId);
                        
                        dialogWindowId = -1;
                        dialogParentWindowId = -1;
                    });
                }
                else
                {
                    chrome.windows.remove(dialogWindowId);
                    
                    dialogWindowId = -1;
                    dialogParentWindowId = -1;
                }
                
                break;
                
            case "saveLayoutReply":
                
                if (message.result)
                {
                    layout = findLayoutByWindowId(dialogParentWindowId);
                    
                    saveLayoutReply(layout,message.layoutname,message.layouttype);
                }
                
                chrome.windows.remove(dialogWindowId);
                
                dialogWindowId = -1;
                dialogParentWindowId = -1;
                
                break;
                
            case "deleteLayoutsReply":
                
                if (message.result)
                {
                    deleteLayoutsReply(message.layoutnames);
                }
                
                chrome.windows.remove(dialogWindowId);
                
                dialogWindowId = -1;
                dialogParentWindowId = -1;
                
                break;
                
            case "defaultLayoutReply":
                
                if (message.result) defaultLayoutReply(message.layoutname);
                
                chrome.windows.remove(dialogWindowId);
                
                dialogWindowId = -1;
                dialogParentWindowId = -1;
                
                break;
        }
    });
}

/************************************************************************/

/* Create layout function */

function createLayout(layout,design,focuswin)
{
    var i,j,maxcols,maxrows,maxtiles,cols,rows;
    
    switch (design)
    {
        case "1only":
            
            addTileFirst(layout);
            
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "2vert":
            
            addTileFirst(layout);
            addTileOther(layout,layout.rootTile,"right");
            
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "2horiz":
            
            addTileFirst(layout);
            addTileOther(layout,layout.rootTile,"below");
            
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "3vert":
            
            addTileFirst(layout);
            addTileOther(layout,layout.rootTile,"right");
            addTileOther(layout,layout.rootTile.childTiles[1],"right");
            samesizeTile(layout.rootTile,false);
            
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "3horiz":
            
            addTileFirst(layout);
            addTileOther(layout,layout.rootTile,"below");
            addTileOther(layout,layout.rootTile.childTiles[1],"below");
            samesizeTile(layout.rootTile,false);
            
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "4vertgrid":
            
            addTileFirst(layout);
            addTileOther(layout,layout.rootTile,"right");
            addTileOther(layout,layout.rootTile.childTiles[0],"below");
            addTileOther(layout,layout.rootTile.childTiles[1],"below");
            
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "4horizgrid":
            
            addTileFirst(layout);
            addTileOther(layout,layout.rootTile,"below");
            addTileOther(layout,layout.rootTile.childTiles[0],"right");
            addTileOther(layout,layout.rootTile.childTiles[1],"right");
            
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "6vertgrid":
            
            addTileFirst(layout);
            addTileOther(layout,layout.rootTile,"right");
            addTileOther(layout,layout.rootTile.childTiles[1],"right");
            addTileOther(layout,layout.rootTile.childTiles[0],"below");
            addTileOther(layout,layout.rootTile.childTiles[1],"below");
            addTileOther(layout,layout.rootTile.childTiles[2],"below");
            
            samesizeTile(layout.rootTile,true);
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "6horizgrid":
            
            addTileFirst(layout);
            addTileOther(layout,layout.rootTile,"below");
            addTileOther(layout,layout.rootTile.childTiles[1],"below");
            addTileOther(layout,layout.rootTile.childTiles[0],"right");
            addTileOther(layout,layout.rootTile.childTiles[1],"right");
            addTileOther(layout,layout.rootTile.childTiles[2],"right");
            
            samesizeTile(layout.rootTile,true);
            adjustLayout(layout);
            newLayout(layout,0,false,-1,"");
            
            break;
            
        case "allvert":
            
            maxcols = Math.floor(focuswin.width/windowMinWidth);
            
            if (maxcols > focuswin.tabs.length) cols = focuswin.tabs.length;
            else cols = maxcols;
            
            addTileFirst(layout);
            
            if (cols > 1) addTileOther(layout,layout.rootTile,"right");
            for (i = 2; i < cols; i++) addTileOther(layout,layout.rootTile.childTiles[i-1],"right");
            
            samesizeTile(layout.rootTile,false);
            adjustLayout(layout);
            newLayout(layout,0,true,-1,"");
            
            break;
            
        case "allhoriz":
            
            maxrows = Math.floor(focuswin.width/windowMinWidth);
            
            if (maxrows > focuswin.tabs.length) rows = focuswin.tabs.length;
            else rows = maxrows;
            
            addTileFirst(layout);
            
            if (rows > 1) addTileOther(layout,layout.rootTile,"below");
            for (i = 2; i < rows; i++) addTileOther(layout,layout.rootTile.childTiles[i-1],"below");
            
            samesizeTile(layout.rootTile,false);
            adjustLayout(layout);
            newLayout(layout,0,true,-1,"");
            
            break;
            
        case "allvertgrid":
            
            maxcols = Math.floor(focuswin.width/windowMinWidth);
            maxrows = Math.floor(focuswin.height/windowMinHeight);
            maxtiles = maxrows*maxcols;
            
            if (maxtiles > focuswin.tabs.length) maxtiles = focuswin.tabs.length;
            
            cols = rows = 0;
            while (cols*rows < maxtiles)
            {
                if (cols < maxcols) cols++;
                if (rows < maxrows  && cols*rows < maxtiles) rows++;
            }
            
            addTileFirst(layout);
            
            if (cols > 1) addTileOther(layout,layout.rootTile,"right");
            for (i = 2; i < cols; i++) addTileOther(layout,layout.rootTile.childTiles[i-1],"right");
            
            if (rows > 1)
            {
                for (i = 0; i < cols; i++)
                {
                    addTileOther(layout,layout.rootTile.childTiles[i],"below");
                    for (j = 2; j < rows; j++) addTileOther(layout,layout.rootTile.childTiles[i].childTiles[j-1],"below");
                }
            }
            
            samesizeTile(layout.rootTile,true);
            adjustLayout(layout);
            newLayout(layout,0,true,-1,"");
            
            break;
            
        case "allhorizgrid":
            
            maxcols = Math.floor(focuswin.width/windowMinWidth);
            maxrows = Math.floor(focuswin.height/windowMinHeight);
            maxtiles = maxrows*maxcols;
            
            if (maxtiles > focuswin.tabs.length) maxtiles = focuswin.tabs.length;
            
            cols = rows = 0;
            while (cols*rows < maxtiles)
            {
                if (rows < maxrows) rows++;
                if (cols < maxcols  && cols*rows < maxtiles) cols++;
            }
            
            addTileFirst(layout);
            
            if (rows > 1) addTileOther(layout,layout.rootTile,"below");
            for (i = 2; i < rows; i++) addTileOther(layout,layout.rootTile.childTiles[i-1],"below");
            
            if (cols > 1)
            {
                for (i = 0; i < rows; i++)
                {
                    addTileOther(layout,layout.rootTile.childTiles[i],"right");
                    for (j = 2; j < cols; j++) addTileOther(layout,layout.rootTile.childTiles[i].childTiles[j-1],"right");
                }
            }
            
            samesizeTile(layout.rootTile,true);
            adjustLayout(layout);
            newLayout(layout,0,true,-1,"");
            
            break;
    }
}

/************************************************************************/

/* Layout functions */

function addLayout()
{
    var i,j,layout;
    
    layout = new Layout();
    
    layouts[layouts.length] = layout;
    
    layout.badgeColor = badgeColors[0];
    
    for (i = 0; i < badgeColors.length; i++)
    {
        for (j = 0; j < layouts.length-1; j++)
            if (layouts[j].badgeColor == badgeColors[i]) break;
        
        if (j == layouts.length-1)
        {
            layout.badgeColor = badgeColors[i];
            
            break;
        }
    }
    
    return layout;
}

function removeLayout(layout)
{
    var i;
    
    for (i = 0; layouts[i] != layout; i++) ;
    
    for (i = i; i < layouts.length-1; i++) layouts[i] = layouts[i+1];
    
    layouts.length--;
}

function visibleLayouts()
{
    var i;
    
    for (i = 0; i < layouts.length; i++)
    {
        if (layouts[i].tiledView) return true;
    }
    
    return false;
}

/************************************************************************/

/* Add tile functions */

function addTileFirst(layout)
{
    layout.rootTile = new Tile();
    layout.rootTile.left = layout.left;
    layout.rootTile.top = layout.top;
    layout.rootTile.width = layout.width;
    layout.rootTile.height = layout.height;
    
    layout.windowCount++;
    
    return  layout.rootTile;
}

function addTileOther(layout,tile,direction)
{
    var i,pc,newTile,modTile;
    
    /* If 'tile.type' is 'window', then 'direction' can be any direction */
    /* If 'tile.type' is 'vsplit', then 'direction' must be 'left' or 'right' */
    /* If 'tile.type' is 'hsplit', then 'direction' must be 'above' or 'below' */
     
    if (tile.parentTile == null && tile.type != "window")
    {
        layout.rootTile = new Tile();
        layout.rootTile.type = (direction == "left" || direction == "right") ? "vsplit" : "hsplit";
        layout.rootTile.left = layout.left;
        layout.rootTile.top = layout.top;
        layout.rootTile.width = layout.width;
        layout.rootTile.height = layout.height;
        layout.rootTile.childTiles[0] = tile;
        tile.parentTile = layout.rootTile;
    }
    
    if (tile.parentTile != null &&
        ( (tile.parentTile.type == "vsplit" && (direction == "left" || direction == "right")) ||
          (tile.parentTile.type == "hsplit" && (direction == "above" || direction == "below")) ) )   /* add sibling window tile to parent tile */
    {
        for (pc = 0; pc < tile.parentTile.childTiles.length; pc++) if (tile.parentTile.childTiles[pc] == tile) break;
        tile = tile.parentTile;
        
        switch (direction)
        {
            case "left":
                
                for (i = tile.childTiles.length-1; i >= pc; i--)
                    tile.childTiles[i+1] = tile.childTiles[i];
                
                tile.childTiles[pc] = new Tile();
                tile.childTiles[pc].parentTile = tile;
                tile.childTiles[pc].width = Math.floor((tile.childTiles[pc+1].width)/2);
                tile.childTiles[pc].height = tile.height;
                tile.childTiles[pc].left = tile.childTiles[pc+1].left;
                tile.childTiles[pc].top = tile.top;
                tile.childTiles[pc+1].left = tile.childTiles[pc+1].left+Math.floor((tile.childTiles[pc+1].width)/2);
                tile.childTiles[pc+1].width = tile.childTiles[pc+1].width-Math.floor((tile.childTiles[pc+1].width)/2);
                
                for (i = 0; i < tile.childTiles.length; i++)
                    tile.childTiles[i].ratio = tile.childTiles[i].width/tile.width;
                
                if (tile.childTiles[pc+1].type != "window")
                    resizeTile(tile.childTiles[pc+1],tile.childTiles[pc+1].width,tile.height,tile.childTiles[pc+1].left,tile.top);
                
                break;
                
            case "right":
                
                for (i = tile.childTiles.length-1; i > pc; i--)
                    tile.childTiles[i+1] = tile.childTiles[i];
                
                tile.childTiles[pc+1] = new Tile();
                tile.childTiles[pc+1].parentTile = tile;
                tile.childTiles[pc+1].width = tile.childTiles[pc].width-Math.floor((tile.childTiles[pc].width)/2);
                tile.childTiles[pc+1].height = tile.height;
                tile.childTiles[pc+1].left = tile.childTiles[pc].left+Math.floor((tile.childTiles[pc].width)/2);
                tile.childTiles[pc+1].top = tile.top;
                tile.childTiles[pc].width = Math.floor((tile.childTiles[pc].width)/2);
                
                for (i = 0; i < tile.childTiles.length; i++)
                    tile.childTiles[i].ratio = tile.childTiles[i].width/tile.width;
                
                if (tile.childTiles[pc].type != "window")
                    resizeTile(tile.childTiles[pc],tile.childTiles[pc].width,tile.height,tile.childTiles[pc].left,tile.top);
                
                break;
                
            case "above":
                
                for (i = tile.childTiles.length-1; i >= pc; i--)
                    tile.childTiles[i+1] = tile.childTiles[i];
                
                tile.childTiles[pc] = new Tile();
                tile.childTiles[pc].parentTile = tile;
                tile.childTiles[pc].width = tile.width;
                tile.childTiles[pc].height = Math.floor((tile.childTiles[pc+1].height)/2);
                tile.childTiles[pc].left = tile.left;
                tile.childTiles[pc].top = tile.childTiles[pc+1].top;
                tile.childTiles[pc+1].top = tile.childTiles[pc+1].top+Math.floor((tile.childTiles[pc+1].height)/2);
                tile.childTiles[pc+1].height = tile.childTiles[pc+1].height-Math.floor((tile.childTiles[pc+1].height)/2);
                
                for (i = 0; i < tile.childTiles.length; i++)
                    tile.childTiles[i].ratio = tile.childTiles[i].height/tile.height;
                
                if (tile.childTiles[pc+1].type != "window")
                    resizeTile(tile.childTiles[pc+1],tile.width,tile.childTiles[pc+1].height,tile.left,tile.childTiles[pc+1].top);
                
                break;
                
            case "below":
                
                for (i = tile.childTiles.length-1; i > pc; i--)
                    tile.childTiles[i+1] = tile.childTiles[i];
                
                tile.childTiles[pc+1] = new Tile();
                tile.childTiles[pc+1].parentTile = tile;
                tile.childTiles[pc+1].width = tile.width;
                tile.childTiles[pc+1].height = tile.childTiles[pc].height-Math.floor((tile.childTiles[pc].height)/2);
                tile.childTiles[pc+1].left = tile.left;
                tile.childTiles[pc+1].top = tile.childTiles[pc].top+Math.floor((tile.childTiles[pc].height)/2);
                tile.childTiles[pc].height = Math.floor((tile.childTiles[pc].height)/2);
                
                for (i = 0; i < tile.childTiles.length; i++)
                    tile.childTiles[i].ratio = tile.childTiles[i].height/tile.height;
                
                if (tile.childTiles[pc].type != "window")
                    resizeTile(tile.childTiles[pc],tile.width,tile.childTiles[pc].height,tile.left,tile.childTiles[pc].top);
                
                break;
        }
        
        newTile = (direction == "left" || direction == "above") ? tile.childTiles[pc] : tile.childTiles[pc+1];
        modTile = (direction == "left" || direction == "above") ? tile.childTiles[pc+1] : tile.childTiles[pc];
    }
    else /* split this window tile into two child window tiles */
    {
        tile.childTiles[0] = new Tile();
        tile.childTiles[0].parentTile = tile;
        tile.childTiles[0].width = (direction == "left" || direction == "right") ? Math.floor(tile.width/2) : tile.width;
        tile.childTiles[0].height = (direction == "left" || direction == "right") ? tile.height : Math.floor(tile.height/2);
        tile.childTiles[0].left = tile.left;
        tile.childTiles[0].top = tile.top;
        tile.childTiles[0].ratio = 1/2;
        tile.childTiles[0].windowType = (direction == "left" || direction == "above") ? (showToolbars ? "normal" : "popup") : tile.windowType;
        tile.childTiles[0].windowId = (direction == "left" || direction == "above") ? -1 : tile.windowId;
        tile.childTiles[0].tabType = (direction == "left" || direction == "above") ? -1 : tile.tabType;
        tile.childTiles[0].tabId = (direction == "left" || direction == "above") ? -1 : tile.tabId;
        tile.childTiles[0].tabPos = (direction == "left" || direction == "above") ? -1 : tile.tabPos;
        tile.childTiles[0].tabPinned = (direction == "left" || direction == "above") ? false : tile.tabPinned;
        tile.childTiles[0].scrollX = (direction == "left" || direction == "above") ? 0 : tile.scrollX;
        tile.childTiles[0].scrollY = (direction == "left" || direction == "above") ? 0 : tile.scrollY;
        tile.childTiles[0].scrollLock = (direction == "left" || direction == "above") ? false : tile.scrollLock;
        tile.childTiles[0].zoomLevel = (direction == "left" || direction == "above") ? 100 : tile.zoomLevel;
        
        tile.childTiles[1] = new Tile();
        tile.childTiles[1].parentTile = tile;
        tile.childTiles[1].width = (direction == "left" || direction == "right") ? tile.width-tile.childTiles[0].width : tile.width;
        tile.childTiles[1].height = (direction == "left" || direction == "right") ? tile.height : tile.height-tile.childTiles[0].height;
        tile.childTiles[1].left = (direction == "left" || direction == "right") ? tile.left+tile.childTiles[0].width : tile.left;
        tile.childTiles[1].top = (direction == "left" || direction == "right") ? tile.top : tile.top+tile.childTiles[0].height;
        tile.childTiles[1].ratio = 1/2;
        tile.childTiles[1].windowType = (direction == "left" || direction == "above") ? tile.windowType : (showToolbars ? "normal" : "popup");
        tile.childTiles[1].windowId = (direction == "left" || direction == "above") ? tile.windowId : -1;
        tile.childTiles[1].tabType = (direction == "left" || direction == "above") ? tile.tabType : -1;
        tile.childTiles[1].tabId = (direction == "left" || direction == "above") ? tile.tabId : -1;
        tile.childTiles[1].tabPos = (direction == "left" || direction == "above") ? tile.tabPos : -1;
        tile.childTiles[1].tabPinned = (direction == "left" || direction == "above") ? tile.tabPinned : false;
        tile.childTiles[1].scrollX = (direction == "left" || direction == "above") ? tile.scrollX : 0;
        tile.childTiles[1].scrollY = (direction == "left" || direction == "above") ? tile.scrollY : 0;
        tile.childTiles[1].scrollLock = (direction == "left" || direction == "above") ? tile.scrollLock : false;
        tile.childTiles[1].zoomLevel = (direction == "left" || direction == "above") ? tile.zoomLevel : 100;
        
        tile.type = (direction == "left" || direction == "right") ? "vsplit" : "hsplit";
        tile.tabType = -1;
        tile.tabId = -1;
        tile.tabPos = -1;
        tile.tabPinned = false;
        
        newTile = (direction == "left" || direction == "above") ? tile.childTiles[0] : tile.childTiles[1];
        modTile = (direction == "left" || direction == "above") ? tile.childTiles[1] : tile.childTiles[0];
    }
    
    layout.windowCount++;
    
    return { newTile: newTile, modTile: modTile };
}

/************************************************************************/
    
/* Remove tile function */

function removeTileOther(layout,tile)
{
    var i,num,pc,gpc,gptile,ptile,stile,ftile;
    
    ptile = tile.parentTile;
    
    for (pc = 0; pc < ptile.childTiles.length; pc++) if (ptile.childTiles[pc] == tile) break;
    
    if (pc == 0) stile = ptile.childTiles[1]; else stile = ptile.childTiles[pc-1];  /* sibling tile */
    
    if (ptile.childTiles.length == 2)  /* exactly 2 children */
    {
        if (stile.type == "window")  /* 2 window tiles */
        {
            ptile.type = "window";
            ptile.windowType = stile.windowType;
            ptile.windowId = stile.windowId;
            ptile.tabType = stile.tabType;
            ptile.tabId = stile.tabId;
            ptile.tabPos = stile.tabPos;
            ptile.tabPinned = stile.tabPinned;
            ptile.scrollX = stile.scrollX;
            ptile.scrollY = stile.scrollY;
            ptile.scrollLock = stile.scrollLock;
            ptile.zoomLevel = stile.zoomLevel;
            
            ptile.childTiles.length = 0;
            
            layout.windowCount--;
            
            return stile;
        }
        else  /* 1 window tile and 1 hsplit/vsplit tile */
        {
            for (ftile = stile.childTiles[0]; ftile.type != "window"; ftile = tile.childTiles[0]);
            
            if (ptile.parentTile == null) /* at root */
            {
                if (ptile.type == "hsplit")  /* horizontal split */
                {
                    stile.height = ptile.height;
                    stile.top = ptile.top;
                    stile.ratio = 1;
                    stile.parentTile = null;
                }
                else  /* vertical split */
                {
                    stile.width = ptile.width;
                    stile.left = ptile.left;
                    stile.ratio = 1;
                    stile.parentTile = null;
                }
                
                ptile.childTiles.length = 0;
                
                resizeTile(stile,stile.width,stile.height,stile.left,stile.top);
                
                layout.rootTile = stile;
            }
            else  /* not at root */
            {
                num = stile.childTiles.length;
                gptile = ptile.parentTile;
                
                for (gpc = 0; gpc < gptile.childTiles.length; gpc++) if (gptile.childTiles[gpc] == ptile) break;
                
                for (i = gptile.childTiles.length-1; i > gpc; i--)
                {
                    gptile.childTiles[i+num-1] = gptile.childTiles[i];
                }
                
                for (i = 0; i < num; i++) gptile.childTiles[gpc+i] = stile.childTiles[i];
                
                if (gptile.type == "hsplit")  /* horizontal split */
                {
                    for (i = 0; i < num; i++)
                    {
                        gptile.childTiles[gpc+i].parentTile = gptile;
                        gptile.childTiles[gpc+i].width = gptile.width;
                        gptile.childTiles[gpc+i].left = gptile.left;
                    }
                    
                    for (i = 0; i < gptile.childTiles.length; i++)
                      gptile.childTiles[i].ratio = gptile.childTiles[i].height/gptile.height;
                }
                else  /* vertical split */
                {
                    for (i = 0; i < num; i++)
                    {
                        gptile.childTiles[gpc+i].parentTile = gptile;
                        gptile.childTiles[gpc+i].height = gptile.height;
                        gptile.childTiles[gpc+i].top = gptile.top;
                    }
                    
                    for (i = 0; i < gptile.childTiles.length; i++)
                        gptile.childTiles[i].ratio = gptile.childTiles[i].width/gptile.width;
                }
                
                stile.childTiles.length = 0;
                ptile.childTiles.length = 0;
                
                resizeTile(gptile,gptile.width,gptile.height,gptile.left,gptile.top);
            }
            
            layout.windowCount--;
            
            return ftile;
        }
    }
    else  /* more than 2 children */
    {
        for (ftile = stile; ftile.type != "window"; ftile = tile.childTiles[0]);
        
        if (ptile.type == "hsplit")  /* horizontal split */
        {
            stile.height += tile.height;
            if (pc == 0) stile.top = tile.top;
            
            for (i = 0; i < ptile.childTiles.length; i++) if (i != pc)
                ptile.childTiles[i].ratio = ptile.childTiles[i].height/ptile.height;
        }
        else  /* vertical split */
        {
            stile.width += tile.width;
            if (pc == 0) stile.left = tile.left;
            
            for (i = 0; i < ptile.childTiles.length; i++) if (i != pc)
                ptile.childTiles[i].ratio = ptile.childTiles[i].width/ptile.width;
        }
        
        for (i = pc; i < ptile.childTiles.length-1; i++)
        {
            ptile.childTiles[i] = ptile.childTiles[i+1];
        }
        
        ptile.childTiles.length--;
        
        resizeTile(ptile,ptile.width,ptile.height,ptile.left,ptile.top);
        
        layout.windowCount--;
        
        return ftile;
    }
}

function removeTileLast(layout)
{
    layout.rootTile = null;
    
    layout.windowCount--;
}
    
/************************************************************************/

/* Resize tile functions */

function samesizeTile(tile,nested)
{
    var i;
    
    if (tile.type == "window")  /* window tile */
    {
    }
    else  /* split tile */
    {
        for (i = 0; i < tile.childTiles.length; i++)
        {
            tile.childTiles[i].ratio = 1/tile.childTiles.length;
            if (nested) samesizeTile(tile.childTiles[i],nested);
        }
    }
}

function resizeTile(tile,newWidth,newHeight,newLeft,newTop)
{
    var i,width,height,prewidth,preheight;
    
    if (tile.type == "window")  /* window tile */
    {
        tile.width = newWidth;
        tile.height = newHeight;
        tile.left = newLeft;
        tile.top = newTop;
    }
    else  /* split tile */
    {
        if (tile.type == "hsplit")  /* horizontal split */
        {
            preheight = 0;
            for (i = 0; i < tile.childTiles.length-1; i++)
            {
                height = Math.floor(newHeight*tile.childTiles[i].ratio);
                resizeTile(tile.childTiles[i],newWidth,height,newLeft,newTop+preheight);
                preheight += height;
            }
            resizeTile(tile.childTiles[i],newWidth,newHeight-preheight,newLeft,newTop+preheight);
        }
        else  /* vertical split */
        {
            prewidth = 0;
            for (i = 0; i < tile.childTiles.length-1; i++)
            {
                width = Math.floor(newWidth*tile.childTiles[i].ratio);
                resizeTile(tile.childTiles[i],width,newHeight,newLeft+prewidth,newTop);
                prewidth += width;
            }
            resizeTile(tile.childTiles[i],newWidth-prewidth,newHeight,newLeft+prewidth,newTop);
        }
        
        tile.width = newWidth;
        tile.height = newHeight;
        tile.left = newLeft;
        tile.top = newTop;
    }
}

/************************************************************************/

/* Adjust layout/tile functions */

function adjustLayout(layout)
{
    /* Adjust layout to take account of window minimum width - calculate tile ratios and layout size */
    
    decreaseTile(layout.rootTile);  /* reduce layout to minimum possible size */
    
    if (layout.rootTile.width > layout.width)  layout.width = layout.rootTile.width;
    if (layout.rootTile.height > layout.height)  layout.height = layout.rootTile.height;
    
    increaseTile(layout.rootTile,layout.width,layout.height,layout.left,layout.top);  /* increase layout to fit parent window */
    
    layout.rootTile.width = layout.width;
    layout.rootTile.height = layout.height;
    layout.rootTile.left = layout.left;
    layout.rootTile.top = layout.top;
}

function decreaseTile(tile)
{
    var i;
    
    if (tile.type == "window")  /* window tile */
    {
        tile.width = windowMinWidth;
        tile.height = windowMinHeight;
    }
    else  /* split tile */
    {
        if (tile.type == "hsplit")  /* horizontal split */
        {
            tile.width = 0;
            tile.height = 0;
            
            for (i = 0; i < tile.childTiles.length; i++)
            {
                decreaseTile(tile.childTiles[i]);
                
                tile.height += tile.childTiles[i].height;
                
                if (tile.childTiles[i].width > tile.width) tile.width = tile.childTiles[i].width;
            }
            
            for (i = 0; i < tile.childTiles.length; i++) tile.childTiles[i].width = tile.width;
        }
        else  /* vertical split */
        {
            tile.width = 0;
            tile.height = 0;
            
            for (i = 0; i < tile.childTiles.length; i++)
            {
                decreaseTile(tile.childTiles[i]);
                
                tile.width += tile.childTiles[i].width;
                
                if (tile.childTiles[i].height > tile.height) tile.height = tile.childTiles[i].height;
            }
            
            for (i = 0; i < tile.childTiles.length; i++) tile.childTiles[i].height = tile.height;
        }
    }
}

function increaseTile(tile,newWidth,newHeight,newLeft,newTop)
{
    var i,width,height,lastNotMin,sumMinRatios,sumMinWidths,sumMinHeights,sumNewWidths,sumNewHeights,sumAllWidths,sumAllHeights;
    
    if (tile.type == "window")  /* window tile */
    {
        tile.width = newWidth;
        tile.height = newHeight;
        tile.left = newLeft;
        tile.top = newTop;
    }
    else  /* split tile */
    {
        if (tile.type == "hsplit")  /* horizontal split */
        {
            lastNotMin = -1;
            sumMinHeights = 0;
            sumMinRatios = 0;
            
            for (i = 0; i < tile.childTiles.length; i++)
            {
                if (tile.childTiles[i].height >= newHeight*tile.childTiles[i].ratio)  /* minimum height >= original proportion of new height */
                {
                    sumMinHeights += tile.childTiles[i].height;
                    sumMinRatios += tile.childTiles[i].ratio;
                }
                else lastNotMin = i;
            }
            
            sumNewHeights = 0;
            sumAllHeights = 0;
            
            for (i = 0; i < tile.childTiles.length; i++)
            {
                if (tile.childTiles[i].height < newHeight*tile.childTiles[i].ratio)  /* minimum height < original proportion of new height */
                {
                    if (i != lastNotMin)
                    {
                        height = Math.floor((newHeight-sumMinHeights)*tile.childTiles[i].ratio/(1-sumMinRatios));
                        
                        sumNewHeights += height;
                    }
                    else height = newHeight-sumMinHeights-sumNewHeights;
                }
                else height = tile.childTiles[i].height;
                
                tile.childTiles[i].ratio = height/newHeight;
                
                increaseTile(tile.childTiles[i],newWidth,height,newLeft,newTop+sumAllHeights);
                
                sumAllHeights += height;
            }
        }
        else  /* vertical split */
        {
            lastNotMin = -1;
            sumMinWidths = 0;
            sumMinRatios = 0;
            
            for (i = 0; i < tile.childTiles.length; i++)
            {
                if (tile.childTiles[i].width >= newWidth*tile.childTiles[i].ratio)  /* minimum width >= original proportion of new width */
                {
                    sumMinWidths += tile.childTiles[i].width;
                    sumMinRatios += tile.childTiles[i].ratio;
                }
                else lastNotMin = i;
            }
            
            sumNewWidths = 0;
            sumAllWidths = 0;
            
            for (i = 0; i < tile.childTiles.length; i++)
            {
                if (tile.childTiles[i].width < newWidth*tile.childTiles[i].ratio)  /* minimum width < original proportion of new width */
                {
                    if (i != lastNotMin)
                    {
                        width = Math.floor((newWidth-sumMinWidths)*tile.childTiles[i].ratio/(1-sumMinRatios));
                        
                        sumNewWidths += width;
                    }
                    else width = newWidth-sumMinWidths-sumNewWidths;
                }
                else width = tile.childTiles[i].width;
                
                tile.childTiles[i].ratio = width/newWidth;
                
                increaseTile(tile.childTiles[i],width,newHeight,newLeft+sumAllWidths,newTop);
                
                sumAllWidths += width;
            }
        }
        
        tile.width = newWidth;
        tile.height = newHeight;
        tile.left = newLeft;
        tile.top = newTop;
    }
}

/************************************************************************/

/* Layout find function */

function findLayoutByWindowId(windowId)
{
    var i;
    
    for (i = 0; i < layouts.length; i++)
    {
        if (layouts[i].parentWindowId == windowId) return layouts[i];  /* parent window */
        else if (layouts[i].rootTile != null && findTileByWindowId(layouts[i].rootTile,windowId) != null) return layouts[i];  /* tile window */
    }
    
    return null;
}

/************************************************************************/

/* Tile find functions */

function findTileByWindowId(tile,windowId)
{
    var i,foundTile;
    
    if (tile.type == "window")  /* window tile */
    {
        if (tile.windowId == windowId) return tile;
        
        return null;
    }
    else  /* split tile */
    {
        for (i = 0; i < tile.childTiles.length; i++)
            if ((foundTile = findTileByWindowId(tile.childTiles[i],windowId)) != null) return foundTile;
        
        return null;
    }
}

function findTileByTabId(tile,tabId)
{
    var i,foundTile;
    
    if (tile.type == "window")  /* window tile */
    {
        if (tile.tabId == tabId) return tile;
        
        return null;
    }
    else  /* split tile */
    {
        for (i = 0; i < tile.childTiles.length; i++)
            if ((foundTile = findTileByTabId(tile.childTiles[i],tabId)) != null) return foundTile;
        
        return null;
    }
}

/************************************************************************/

/* Dimension and coordinate functions */

function setReinstateData(parentwin)
{
    chrome.storage.local.set({ "reinstate-flag": true, "reinstate-state": parentwin.state,
                               "reinstate-left": parentwin.left, "reinstate-top": parentwin.top,
                               "reinstate-width": parentwin.width, "reinstate-height": parentwin.height });
}

function setLayoutDimensions(layout,parentwin,callback)
{
    layout.left = parentwin.left+lrbMarginNormal;
    layout.top = parentwin.top+topMargin;
    layout.width = parentwin.width-lrbMarginNormal*2;
    layout.height = parentwin.height-topMargin-lrbMarginNormal;
    
    if (parentwin.state == "maximized")
    {
        layout.left += maxAdjust;
        layout.top += lrbMarginNormal+maxAdjust;
        layout.width -= maxAdjust*2;
        layout.height -= lrbMarginNormal+maxAdjust*2;
    }
    
    /* Convert maximized window to normal window */
    
    chrome.windows.update(parentwin.id,{ left: getParentWindowLeft(layout), top: getParentWindowTop(layout),
                                         width: getParentWindowWidth(layout), height: getParentWindowHeight(layout) },
    function(parentwin)
    {
        callback();
    });
}

function getParentWindowLeft(layout)
{
    return layout.left-lrbMarginNormal;
}

function getParentWindowTop(layout)
{
    return layout.top-topMargin;
}

function getParentWindowWidth(layout)
{
    return layout.width+lrbMarginNormal*2;
}

function getParentWindowHeight(layout)
{
    return layout.height+topMargin+lrbMarginNormal;
}

function getTiledWindowLeft(tile)
{
    return (tile.windowType == "normal") ? tile.left-lrbMarginNormal : tile.left-lrbMarginPopup;
}

function getTiledWindowTop(tile)
{
    return tile.top-topMargin;
}

function getTiledWindowWidth(tile)
{
    return (tile.windowType == "normal") ? tile.width+lrbMarginNormal*2 : tile.width+lrbMarginPopup*2;
}

function getTiledWindowHeight(tile)
{
    return (tile.windowType == "normal") ? tile.height+topMargin+lrbMarginNormal : tile.height+topMargin+lrbMarginPopup;
}

function getTileMinWidth(tile)
{
    var i,width,maxwidth,sumwidth;
    
    if (tile.type == "window")  /* window tile */
    {
        return windowMinWidth;
    }
    else if (tile.type == "vsplit") /* splitter tile */
    {
        sumwidth = 0;
        
        for (i = 0; i < tile.childTiles.length; i++)
        {
            sumwidth += getTileMinWidth(tile.childTiles[i]);
        }
        
        return sumwidth;
    }
    else if (tile.type == "hsplit") /* splitter tile */
    {
        maxwidth = 0;
        
        for (i = 0; i < tile.childTiles.length; i++)
        {
            width = getTileMinWidth(tile.childTiles[i]);
            
            if (width > maxwidth) maxwidth = width;
        }
        
        return maxwidth;
    }
}

function getTileMinHeight(tile)
{
    var i,height,maxheight,sumheight;
    
    if (tile.type == "window")  /* window tile */
    {
        return windowMinHeight;
    }
    else if (tile.type == "hsplit") /* splitter tile */
    {
        sumheight = 0;
        
        for (i = 0; i < tile.childTiles.length; i++)
        {
            sumheight += getTileMinHeight(tile.childTiles[i]);
        }
        
        return sumheight;
    }
    else if (tile.type == "vsplit") /* splitter tile */
    {
        maxheight = 0;
        
        for (i = 0; i < tile.childTiles.length; i++)
        {
            height = getTileMinHeight(tile.childTiles[i]);
            
            if (height > maxheight) maxheight = height;
        }
        
        return maxheight;
    }
}

/************************************************************************/

/* Create default layout function */

function createDefaultLayout(focuswin)
{
    chrome.storage.local.get(null,
    function(object)
    {
        var layout,defaultDesign,defaultName,layoutString;
        
        layout = addLayout();
        
        layout.windowCount = 0;
        
        layout.parentWindowId = focuswin.id;
        layout.parentWindowIncognito = focuswin.incognito;
        
        setReinstateData(focuswin);
        
        setLayoutDimensions(layout,focuswin,
        function()
        {
            defaultDesign = object["layout-defaultdesign"];
            defaultName = object["layout-defaultname"];
            if (defaultName != "") layoutString = object["layout-string-" + defaultName];
            
            if (defaultDesign == "saved" && defaultName != "" && layoutString != null) openLayoutReply(layout,defaultName,layoutString);
            else createLayout(layout,defaultDesign,focuswin);
        });
    });
}

/************************************************************************/

/* Set badge, listeners and quick menu functions */

function setBadgeForAllTabsInWindow(windowId,type)
{
    chrome.tabs.query({ windowId: windowId },
    function(tabs)
    {
        var layout,pos,path,title,text,color;
        
        layout = findLayoutByWindowId(windowId);
        
        if (type == 0)  /* other window */
        {
            path = "icon16.png";
            title = "Tile Tabs WE";
            text = "";
            color = "#000000";
        }
        else if (type == 1)  /* parent window - tiles hidden */
        {
            path = "icon16.png";
            title = "Tile Tabs WE - Parent Window";
            text = "P";
            color = layout.badgeColor;
        }
        else if (type == 2)  /* parent window - tiles shown */
        {
            path = "icon16.png";
            title = "Tile Tabs WE - Parent Window - " + layout.windowCount + " Tiles";
            text = "" + layout.windowCount;
            color = layout.badgeColor;
        }
        else if (type == 3)  /* tiled window */
        {
            path = "icon16.png";
            title = "Tile Tabs WE - Tiled Window";
            text = "T";
            color = layout.badgeColor;
        }
        
        /* Cannot catch errors in chrome.browserAction functions in cases where tabs have closed */
        /* Workaround is to delay and then make sure tabs exist before calling these functions */
        
        window.setTimeout(
        function()
        {
            for (pos = 0; pos < tabs.length; pos++)
            {
                chrome.tabs.get(tabs[pos].id,
                function(tab)
                {
                    if (chrome.runtime.lastError == null && typeof tab != "undefined" && tab.url != "about:blank")  /* tab not closed or about:blank */
                    {
                        chrome.browserAction.setIcon({ tabId: tab.id, path: path});
                        chrome.browserAction.setTitle({ tabId: tab.id, title: title });
                        chrome.browserAction.setBadgeText({ tabId: tab.id, text: text });
                        chrome.browserAction.setBadgeBackgroundColor({ tabId: tab.id, color: color });
                    }
                });
            }
        },10);
    });
}

function setListenersForAllTabsInWindow(windowId,enable)
{
    chrome.tabs.query({ windowId: windowId },
    function(tabs)
    {
        var pos;
        
        for (pos = 0; pos < tabs.length; pos++)
        {
            if (enable) chrome.tabs.sendMessage(tabs[pos].id,{ type: "addListeners" },checkError);
            else chrome.tabs.sendMessage(tabs[pos].id,{ type: "removeListeners" },checkError);
        }
    });
}

function setQuickMenuForAllTabsInWindow(windowId,enable)
{
    chrome.tabs.query({ windowId: windowId },
    function(tabs)
    {
        var layout,tile,pos;
        
        if (enable)  /* tiled window */
        {
            layout = findLayoutByWindowId(windowId);
            tile = findTileByWindowId(layout.rootTile,windowId);
        }
        
        for (pos = 0; pos < tabs.length; pos++)
        {
            if (enable)
            {
                chrome.tabs.sendMessage(tabs[pos].id,{ type: "addQuickMenu", expanded: (tile == layout.expandedTile),
                                                       scrolllock: tile.scrollLock, syncscroll: layout.syncScroll },checkError);
            }
            else chrome.tabs.sendMessage(tabs[pos].id,{ type: "removeQuickMenu" },checkError);
        }
    });
}

function setQuickMenuForAllTabsInLayout(tile)
{
    var i;
    
    if (tile.type == "window")
    {
        setQuickMenuForAllTabsInWindow(tile.windowId,showQuickMenu || showQuickMenuCtrl);
    }
    else  /* split tile */
    {
        for (i = 0; i < tile.childTiles.length; i++)
            setQuickMenuForAllTabsInLayout(tile.childTiles[i]);
    }
}

function setZoomModeForAllTabsInWindow(windowId,pertab)
{
    chrome.tabs.query({ windowId: windowId },
    function(tabs)
    {
        var pos;
        
        for (pos = 0; pos < tabs.length; pos++)
        {
            if (validTabUrlScheme(tabs[pos].url))
            {
                if (pertab) chrome.tabs.setZoomSettings(tabs[pos].id,{ mode: "automatic", scope: "per-tab" });
                else chrome.tabs.setZoomSettings(tabs[pos].id,{ mode: "automatic", scope: "per-origin" });
            }
        }
    });
}

function setZoomModeForAllTabsInLayout(tile)
{
    var i;
    
    if (tile.type == "window")
    {
        setZoomModeForAllTabsInWindow(tile.windowId,zoomPerTab);
    }
    else  /* split tile */
    {
        for (i = 0; i < tile.childTiles.length; i++)
            setZoomModeForAllTabsInLayout(tile.childTiles[i]);
    }
}

/************************************************************************/

/* Button/Context menu functiona */

function createContextMenu()
{
    var contexts = new Array();
    
    chrome.contextMenus.removeAll();
    
    newLayoutSubmenu = false;
    tileTabSubmenu = false;
    
    contexts = showSubmenu ? [ "all" ] : [ "browser_action" ];
    
    /* All menus */
    
    chrome.contextMenus.create({ id: "newcloselayout", title: "New Layout", contexts: contexts, enabled: true });
    chrome.contextMenus.create({ id: "hideshowlayout", title: "Hide Layout", contexts: contexts, enabled: false });
    chrome.contextMenus.create({ id: "refreshlayout", title: "Refresh Layout", contexts: contexts, enabled: false });
    chrome.contextMenus.create({ id: "toggletoolbars", title: "Toggle Toolbars", contexts: contexts, enabled: false });
    chrome.contextMenus.create({ id: "tiletab", title: "Tile Tab", contexts: contexts, enabled: true });
    
    /* New Layout submenu */
    
    createNewLayoutSubmenu();
    
    /* Toggle Toolbars submenu */
    
    chrome.contextMenus.create({ id: "toggletoolbars-this", parentId: "toggletoolbars", title: "This Tile", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "toggletoolbars-all", parentId: "toggletoolbars", title: "All Tiles", contexts: [ "all" ], enabled: true });
    
    /* Tile Tab submenu */
    
    createTileTabSubmenu();
    
    /* Button context menu */
    
    createRemainderOfContextMenu("-b");
    
    /* Content context menu */
    
    createRemainderOfContextMenu("-c");
    
    /* Tab context menu */
    
    if (isFirefox) createTabContextMenu();
}

function createRemainderOfContextMenu(bc)
{
    var parentId;
    var contexts = new Array();
    
    if (bc == "-b")  /* Button context menu */
    {
        parentId = "manage-b";
        
        contexts = [ "all" ];
        
        chrome.contextMenus.create({ id: "manage-b", title: "Manage Layouts and Tiles", contexts: [ "browser_action" ], enabled: true });
    }
    else  /* Content context menu */
    {
        parentId = null;
        
        contexts = showSubmenu ? [ "audio", "editable", "frame", "image", "link", "page", "selection", "video" ] : [ "page_action" ];
        
        chrome.contextMenus.create({ type: "separator", contexts: contexts, enabled: true });
    }
    
    chrome.contextMenus.create({ id: "bookmarklayout" + bc, parentId: parentId, title: "Bookmark Layout", contexts: contexts, enabled: true });
    chrome.contextMenus.create({ id: "opensavelayout" + bc, parentId: parentId, title: "Open Layout...", contexts: contexts, enabled: true });
    chrome.contextMenus.create({ id: "deletelayouts" + bc, parentId: parentId, title: "Delete Layouts...", contexts: contexts, enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout" + bc, parentId: parentId, title: "Default Layout", contexts: contexts, enabled: true });
    
    chrome.contextMenus.create({ type: "separator", parentId: parentId, contexts: contexts, enabled: true });
    
    chrome.contextMenus.create({ id: "addtile" + bc, parentId: parentId, title: "Add Tile", contexts: contexts, enabled: false });
    chrome.contextMenus.create({ id: "removetile" + bc, parentId: parentId, title: "Remove Tile", contexts: contexts, enabled: false });
    chrome.contextMenus.create({ id: "expandcontracttile" + bc, parentId: parentId, title: "Expand Tile", contexts: contexts, enabled: false });
    chrome.contextMenus.create({ id: "equalizetiles" + bc, parentId: parentId, title: "Equalize Tiles", contexts: contexts, enabled: false });
    if (enableInspect) chrome.contextMenus.create({ id: "inspecttile" + bc, parentId: parentId, title: "Inspect Tile", contexts: contexts, enabled: true });
    
    chrome.contextMenus.create({ type: "separator", parentId: parentId, contexts: contexts, enabled: true });
    
    chrome.contextMenus.create({ id: "scrolllock" + bc, parentId: parentId, title: "Scroll Lock", type: "checkbox", contexts: contexts, enabled: false, checked: false });
    
    chrome.contextMenus.create({ id: "syncscroll" + bc, parentId: parentId, title: "Sync Scroll", type: "checkbox", contexts: contexts, enabled: false, checked: false });
    
    /* Add Tile submenu */
    
    parentId = "addtile" + bc;
    
    chrome.contextMenus.create({ id: "addtile-above" + bc, parentId: parentId, title: "Above", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "addtile-left" + bc, parentId: parentId, title: "Left", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "addtile-right" + bc, parentId: parentId, title: "Right", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "addtile-below" + bc, parentId: parentId, title: "Below", contexts: [ "all" ], enabled: true });
    
    /* Inspect Tile submenu */
    
    if (enableInspect)
    {
        parentId = "inspecttile" + bc;
        
        chrome.contextMenus.create({ id: "inspecttile-this" + bc, parentId: parentId, title: "This", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "inspecttile-before" + bc, parentId: parentId, title: "Before", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "inspecttile-after" + bc, parentId: parentId, title: "After", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "inspecttile-parent" + bc, parentId: parentId, title: "Parent", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "inspecttile-gparent" + bc, parentId: parentId, title: "G Parent", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "inspecttile-ggparent" + bc, parentId: parentId, title: "GG Parent", contexts: [ "all" ], enabled: true });
    }
    
    /* Default Layout submenu */
    
    parentId = "defaultlayout" + bc;
    
    chrome.contextMenus.create({ id: "defaultlayout-saved" + bc, type: "checkbox", parentId: parentId, title: "Saved Layout...", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-sep-1" + bc, type: "separator", parentId: parentId, contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-1only" + bc, type: "checkbox", parentId: parentId, title: "1 Tab - Only", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-sep-2" + bc, type: "separator", parentId: parentId, contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-2vert" + bc, type: "checkbox", parentId: parentId, title: "2 Tabs - Vertical", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-2horiz" + bc, type: "checkbox", parentId: parentId, title: "2 Tabs - Horizontal", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-sep-3" + bc, type: "separator", parentId: parentId, contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-3vert" + bc, type: "checkbox", parentId: parentId, title: "3 Tabs - Vertical", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-3horiz" + bc, type: "checkbox", parentId: parentId, title: "3 Tabs - Horizontal", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-sep-4" + bc, type: "separator", parentId: parentId, contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-4vertgrid" + bc, type: "checkbox", parentId: parentId, title: "4 Tabs - Vertical Grid", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-4horizgrid" + bc, type: "checkbox", parentId: parentId, title: "4 Tabs - Horizontal Grid", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-sep-6" + bc, type: "separator", parentId: parentId, contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-6vertgrid" + bc, type: "checkbox", parentId: parentId, title: "6 Tabs - Vertical Grid", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-6horizgrid" + bc, type: "checkbox", parentId: parentId, title: "6 Tabs - Horizontal Grid", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-sep-all" + bc, type: "separator", parentId: parentId, contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-allvert" + bc, type: "checkbox", parentId: parentId, title: "All Tabs - Vertical", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-allhoriz" + bc, type: "checkbox", parentId: parentId, title: "All Tabs - Horizontal", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-allvertgrid" + bc, type: "checkbox", parentId: parentId, title: "All Tabs - Vertical Grid", contexts: [ "all" ], enabled: true });
    chrome.contextMenus.create({ id: "defaultlayout-allhorizgrid" + bc, type: "checkbox", parentId: parentId, title: "All Tabs - Horizontal Grid", contexts: [ "all" ], enabled: true });
    
    chrome.storage.local.get(null,
    function(object)
    {
        chrome.contextMenus.update("defaultlayout-" + object["layout-defaultdesign"] + "-b",{ checked: true });
        chrome.contextMenus.update("defaultlayout-" + object["layout-defaultdesign"] + "-c",{ checked: true });
    });
}

function createTabContextMenu()
{
    chrome.contextMenus.create({ id: "tiletab-thistab", title: "Tile Tab", contexts: [ "tab" ], enabled: true });
    
    chrome.contextMenus.create({ id: "tiletab-above-thistab", parentId: "tiletab-thistab", title: "Above", contexts: [ "tab" ], enabled: true });
    chrome.contextMenus.create({ id: "tiletab-left-thistab", parentId: "tiletab-thistab", title: "Left", contexts: [ "tab" ], enabled: true });
    chrome.contextMenus.create({ id: "tiletab-right-thistab", parentId: "tiletab-thistab", title: "Right", contexts: [ "tab" ], enabled: true });
    chrome.contextMenus.create({ id: "tiletab-below-thistab", parentId: "tiletab-thistab", title: "Below", contexts: [ "tab" ], enabled: true });
}

function createNewLayoutSubmenu()
{
    var i,title;
    
    if (!newLayoutSubmenu)
    {
        chrome.contextMenus.create({ id: "newlayout-default", parentId: "newcloselayout", title: "Default Layout", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-sep-recent", type: "separator", parentId: "newcloselayout", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-recent", parentId: "newcloselayout", title: "Recent Layouts", contexts: [ "all" ], enabled: (recentNames.length > 0) });
        chrome.contextMenus.create({ id: "newlayout-sep-1", type: "separator", parentId: "newcloselayout", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-1only", parentId: "newcloselayout", title: "1 Tab - Only", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-sep-2", type: "separator", parentId: "newcloselayout", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-2vert", parentId: "newcloselayout", title: "2 Tabs - Vertical", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-2horiz", parentId: "newcloselayout", title: "2 Tabs - Horizontal", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-sep-3", type: "separator", parentId: "newcloselayout", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-3vert", parentId: "newcloselayout", title: "3 Tabs - Vertical", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-3horiz", parentId: "newcloselayout", title: "3 Tabs - Horizontal", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-sep-4", type: "separator", parentId: "newcloselayout", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-4vertgrid", parentId: "newcloselayout", title: "4 Tabs - Vertical Grid", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-4horizgrid", parentId: "newcloselayout", title: "4 Tabs - Horizontal Grid", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-sep-6", type: "separator", parentId: "newcloselayout", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-6vertgrid", parentId: "newcloselayout", title: "6 Tabs - Vertical Grid", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-6horizgrid", parentId: "newcloselayout", title: "6 Tabs - Horizontal Grid", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-sep-all", type: "separator", parentId: "newcloselayout", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-allvert", parentId: "newcloselayout", title: "All Tabs - Vertical", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-allhoriz", parentId: "newcloselayout", title: "All Tabs - Horizontal", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-allvertgrid", parentId: "newcloselayout", title: "All Tabs - Vertical Grid", contexts: [ "all" ], enabled: true });
        chrome.contextMenus.create({ id: "newlayout-allhorizgrid", parentId: "newcloselayout", title: "All Tabs - Horizontal Grid", contexts: [ "all" ], enabled: true });
        
        for (i = 0; i < recentNames.length; i++)
        {
            title = recentNames[i].replace(/~/g," ");
            title = (title.length > 30) ? title.substr(0,30) + "..." : title;
            
            chrome.contextMenus.create({ id: "newlayout-recent-" + recentNames[i], parentId: "newlayout-recent", title: title, contexts: [ "all" ], enabled: true });
        }
        
        newLayoutSubmenu = true;
    }
}

function removeNewLayoutSubmenu()
{
    if (newLayoutSubmenu)
    {
        chrome.contextMenus.remove("newlayout-default");
        chrome.contextMenus.remove("newlayout-sep-recent");
        chrome.contextMenus.remove("newlayout-recent");
        chrome.contextMenus.remove("newlayout-sep-1");
        chrome.contextMenus.remove("newlayout-1only");
        chrome.contextMenus.remove("newlayout-sep-2");
        chrome.contextMenus.remove("newlayout-2vert");
        chrome.contextMenus.remove("newlayout-2horiz");
        chrome.contextMenus.remove("newlayout-sep-3");
        chrome.contextMenus.remove("newlayout-3vert");
        chrome.contextMenus.remove("newlayout-3horiz");
        chrome.contextMenus.remove("newlayout-sep-4");
        chrome.contextMenus.remove("newlayout-4vertgrid");
        chrome.contextMenus.remove("newlayout-4horizgrid");
        chrome.contextMenus.remove("newlayout-sep-6");
        chrome.contextMenus.remove("newlayout-6vertgrid");
        chrome.contextMenus.remove("newlayout-6horizgrid");
        chrome.contextMenus.remove("newlayout-sep-all");
        chrome.contextMenus.remove("newlayout-allvert");
        chrome.contextMenus.remove("newlayout-allhoriz");
        chrome.contextMenus.remove("newlayout-allvertgrid");
        chrome.contextMenus.remove("newlayout-allhorizgrid");
        
        newLayoutSubmenu = false;
    }
}

function createTileTabSubmenu()
{
    if (!tileTabSubmenu)
    {
        chrome.contextMenus.create({ id: "tiletab-above", parentId: "tiletab", title: "Above", contexts: [ "all" ], enabled: true },checkMenuError);
        chrome.contextMenus.create({ id: "tiletab-left", parentId: "tiletab", title: "Left", contexts: [ "all" ], enabled: true },checkMenuError);
        chrome.contextMenus.create({ id: "tiletab-right", parentId: "tiletab", title: "Right", contexts: [ "all" ], enabled: true },checkMenuError);
        chrome.contextMenus.create({ id: "tiletab-below", parentId: "tiletab", title: "Below", contexts: [ "all" ], enabled: true },checkMenuError);
        
        chrome.windows.getAll({ populate: true },
        function(wins)
        {
            var i,j,layout,title,enabled;
            
            /* Menu items for link, new tab and duplicate tab */
            
            createTileTabSubmenuItem("link",null,"Link",[ "link" ],true);
            
            createTileTabSubmenuItem("newtab",null,"New Tab",[ "all" ],true);
            
            for (i = 0; i < wins.length; i++)
            {
                if (wins[i].focused)
                {
                    for (j = 0; j < wins[i].tabs.length; j++)
                    {
                        if (wins[i].tabs[j].active)
                        {
                            createTileTabSubmenuItem("duptab-" + wins[i].tabs[j].id,null,"Duplicate Tab",[ "all" ],true);
                        }
                    }
                }
            }
            
            /* Menu items for tabs in parent windows */
            
            for (i = 0; i < wins.length; i++)
            {
                layout = findLayoutByWindowId(wins[i].id);
                
                if (layout != null && layout.parentWindowId == wins[i].id)  /* parent window */
                {
                    createTileTabSubmenuItem("sep-" + i,"separator",null,[ "all" ],true);
                    
                    for (j = 0; j < wins[i].tabs.length; j++)
                    {
                        title = (wins[i].tabs[j].title.length > 60) ? wins[i].tabs[j].title.substr(0,60) + "..." : wins[i].tabs[j].title;
                        
                        enabled = (wins[i].tabs[j].url != keepopenPage);
                        
                        if (title != "") createTileTabSubmenuItem("tab-" + wins[i].tabs[j].id,null,title,[ "all" ],enabled);
                    }
                }
            }
            
            /* Menu items for tabs in other not parent/tiled windows */
            
            if (showAllTabs)
            {
                for (i = 0; i < wins.length; i++)
                {
                    layout = findLayoutByWindowId(wins[i].id);
                    
                    if (layout == null)  /* not parent or tiled window */
                    {
                        createTileTabSubmenuItem("sep-" + i,"separator",null,[ "all" ],true);
                        
                        for (j = 0; j < wins[i].tabs.length; j++)
                        {
                            enabled = !(wins[i].focused && wins[i].tabs[j].active);
                            
                            title = (wins[i].tabs[j].title.length > 60) ? wins[i].tabs[j].title.substr(0,60) + "..." : wins[i].tabs[j].title;
                            
                            if (title != "") createTileTabSubmenuItem("tab-" + wins[i].tabs[j].id,null,title,[ "all" ],enabled);
                        }
                    }
                }
            }
            
            tileTabSubmenu = true;
        });
    }
}

function createTileTabSubmenuItem(item,type,title,context,enabled)
{
    chrome.contextMenus.create({ id: "tiletab-above-" + item, type: type, parentId: "tiletab-above", title: title, contexts: context, enabled: enabled },checkMenuError);
    chrome.contextMenus.create({ id: "tiletab-left-" + item, type: type, parentId: "tiletab-left", title: title, contexts: context, enabled: enabled },checkMenuError);
    chrome.contextMenus.create({ id: "tiletab-right-" + item, type: type, parentId: "tiletab-right", title: title, contexts: context, enabled: enabled },checkMenuError);
    chrome.contextMenus.create({ id: "tiletab-below-" + item, type: type, parentId: "tiletab-below", title: title, contexts: context, enabled: enabled },checkMenuError);
}

function removeTileTabSubmenu()
{
    if (tileTabSubmenu)
    {
        chrome.contextMenus.remove("tiletab-above");
        chrome.contextMenus.remove("tiletab-left");
        chrome.contextMenus.remove("tiletab-right");
        chrome.contextMenus.remove("tiletab-below");
        
        tileTabSubmenu = false;
    }
}

function clearDefaultLayoutCheckMarks()
{
    chrome.contextMenus.update("defaultlayout-saved-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-saved-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-1only-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-1only-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-2vert-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-2vert-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-2horiz-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-2horiz-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-3vert-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-3vert-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-3horiz-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-3horiz-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-4vertgrid-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-4vertgrid-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-4horizgrid-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-4horizgrid-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-6vertgrid-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-6vertgrid-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-6horizgrid-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-6horizgrid-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-allvert-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-allvert-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-allhoriz-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-allhoriz-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-allvertgrid-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-allvertgrid-c",{ checked: false });
    chrome.contextMenus.update("defaultlayout-allhorizgrid-b",{ checked: false });
    chrome.contextMenus.update("defaultlayout-allhorizgrid-c",{ checked: false });
}

function updateContextMenuItems(windowId)
{
    var layout,tile;
    
    layout = findLayoutByWindowId(windowId);
    
    if (layout != null && layout.parentWindowId == windowId)  /* parent window */
    {
        chrome.contextMenus.update("newcloselayout",{ title: "Close Layout", enabled: true });
        
        if (layout.tiledView) chrome.contextMenus.update("hideshowlayout",{ title: "Hide Layout", enabled: true });
        else chrome.contextMenus.update("hideshowlayout",{ title: "Show Layout", enabled: true });
        
        if (layout.tiledView) chrome.contextMenus.update("refreshlayout",{ enabled: true });
        else chrome.contextMenus.update("refreshlayout",{ enabled: false });
        
        chrome.contextMenus.update("toggletoolbars",{ enabled: false });
        
        chrome.contextMenus.update("tiletab",{ enabled: false });
        
        chrome.contextMenus.update("bookmarklayout-b",{ enabled: true });
        chrome.contextMenus.update("bookmarklayout-c",{ enabled: true });
        
        chrome.contextMenus.update("opensavelayout-b",{ title: "Save Layout...", enabled: true });
        chrome.contextMenus.update("opensavelayout-c",{ title: "Save Layout...", enabled: true });
        
        chrome.contextMenus.update("deletelayouts-b",{ enabled: true });
        chrome.contextMenus.update("deletelayouts-c",{ enabled: true });
        
        chrome.contextMenus.update("defaultlayout-b",{ enabled: true });
        chrome.contextMenus.update("defaultlayout-c",{ enabled: true });
        
        chrome.contextMenus.update("addtile-b",{ enabled: false });
        chrome.contextMenus.update("addtile-c",{ enabled: false });
        
        chrome.contextMenus.update("removetile-b",{ enabled: false });
        chrome.contextMenus.update("removetile-c",{ enabled: false });
        
        chrome.contextMenus.update("expandcontracttile-b",{ title: "Expand Tile", enabled: false });
        chrome.contextMenus.update("expandcontracttile-c",{ title: "Expand Tile", enabled: false });
        
        chrome.contextMenus.update("equalizetiles-b",{ enabled: false });
        chrome.contextMenus.update("equalizetiles-c",{ enabled: false });
        
        if (enableInspect) chrome.contextMenus.update("inspecttile-b",{ enabled: false });
        if (enableInspect) chrome.contextMenus.update("inspecttile-c",{ enabled: false });
        
        chrome.contextMenus.update("scrolllock-b",{ enabled: false, checked: false });
        chrome.contextMenus.update("scrolllock-c",{ enabled: false, checked: false });
        
        if (layout.tiledView) chrome.contextMenus.update("syncscroll-b",{ enabled: true, checked: layout.syncScroll });
        else chrome.contextMenus.update("syncscroll-b",{ enabled: false, checked: false });
        
        if (layout.tiledView) chrome.contextMenus.update("syncscroll-c",{ enabled: true, checked: layout.syncScroll });
        else chrome.contextMenus.update("syncscroll-c",{ enabled: false, checked: false });
        
        if (isFirefox) chrome.contextMenus.update("tiletab-thistab",{ enabled: false });
        
        removeNewLayoutSubmenu();
        
        removeTileTabSubmenu();
    }
    else if (layout != null)  /* tiled window */
    {
        tile = findTileByWindowId(layout.rootTile,windowId);
        
        chrome.contextMenus.update("newcloselayout",{ title: "Close Layout", enabled: true });
        
        chrome.contextMenus.update("hideshowlayout",{ title: "Hide Layout", enabled: true });
        
        chrome.contextMenus.update("refreshlayout",{ enabled: true });
        
        chrome.contextMenus.update("toggletoolbars",{ enabled: true });
        
        chrome.contextMenus.update("tiletab",{ enabled: true });
        
        chrome.contextMenus.update("bookmarklayout-b",{ enabled: true });
        chrome.contextMenus.update("bookmarklayout-c",{ enabled: true });
        
        chrome.contextMenus.update("opensavelayout-b",{ title: "Save Layout...", enabled: true });
        chrome.contextMenus.update("opensavelayout-c",{ title: "Save Layout...", enabled: true });
        
        chrome.contextMenus.update("deletelayouts-b",{ enabled: true });
        chrome.contextMenus.update("deletelayouts-c",{ enabled: true });
        
        chrome.contextMenus.update("defaultlayout-b",{ enabled: true });
        chrome.contextMenus.update("defaultlayout-c",{ enabled: true });
        
        chrome.contextMenus.update("addtile-b",{ enabled: true });
        chrome.contextMenus.update("addtile-c",{ enabled: true });
        
        chrome.contextMenus.update("removetile-b",{ enabled: true });
        chrome.contextMenus.update("removetile-c",{ enabled: true });
        
        if (tile == layout.expandedTile)
        {
            chrome.contextMenus.update("expandcontracttile-b",{ title: "Contract Tile", enabled: (layout.windowCount >= 2) });
            chrome.contextMenus.update("expandcontracttile-c",{ title: "Contract Tile", enabled: (layout.windowCount >= 2) });
        }
        else
        {
            chrome.contextMenus.update("expandcontracttile-b",{ title: "Expand Tile", enabled: (layout.windowCount >= 2) });
            chrome.contextMenus.update("expandcontracttile-c",{ title: "Expand Tile", enabled: (layout.windowCount >= 2) });
        }
        
        chrome.contextMenus.update("equalizetiles-b",{ enabled: (layout.windowCount >= 2) });
        chrome.contextMenus.update("equalizetiles-c",{ enabled: (layout.windowCount >= 2) });
        
        if (enableInspect) chrome.contextMenus.update("inspecttile-b",{ enabled: true });
        if (enableInspect) chrome.contextMenus.update("inspecttile-c",{ enabled: true });
        
        chrome.contextMenus.update("scrolllock-b",{ enabled: true, checked: tile.scrollLock });
        chrome.contextMenus.update("scrolllock-c",{ enabled: true, checked: tile.scrollLock });
        
        chrome.contextMenus.update("syncscroll-b",{ enabled: true, checked: layout.syncScroll });
        chrome.contextMenus.update("syncscroll-c",{ enabled: true, checked: layout.syncScroll });
        
        if (isFirefox) chrome.contextMenus.update("tiletab-thistab",{ enabled: true });
        
        removeNewLayoutSubmenu();
        
        removeTileTabSubmenu();
        createTileTabSubmenu();
    }
    else  /* other window */
    {
        chrome.contextMenus.update("newcloselayout",{ title: "New Layout", enabled: true });
        
        chrome.contextMenus.update("hideshowlayout",{ title: "Hide Layout", enabled: false });
        
        chrome.contextMenus.update("refreshlayout",{ enabled: false });
        
        chrome.contextMenus.update("toggletoolbars",{ enabled: false });
        
        chrome.contextMenus.update("tiletab",{ enabled: true });
        
        chrome.contextMenus.update("bookmarklayout-b",{ enabled: false });
        chrome.contextMenus.update("bookmarklayout-c",{ enabled: false });
        
        chrome.contextMenus.update("opensavelayout-b",{ title: "Open Layout...", enabled: true });
        chrome.contextMenus.update("opensavelayout-c",{ title: "Open Layout...", enabled: true });
        
        chrome.contextMenus.update("deletelayouts-b",{ enabled: true });
        chrome.contextMenus.update("deletelayouts-c",{ enabled: true });
        
        chrome.contextMenus.update("defaultlayout-b",{ enabled: true });
        chrome.contextMenus.update("defaultlayout-c",{ enabled: true });
        
        chrome.contextMenus.update("addtile-b",{ enabled: false });
        chrome.contextMenus.update("addtile-c",{ enabled: false });
        
        chrome.contextMenus.update("removetile-b",{ enabled: false });
        chrome.contextMenus.update("removetile-c",{ enabled: false });
        
        chrome.contextMenus.update("expandcontracttile-b",{ title: "Expand Tile", enabled: false });
        chrome.contextMenus.update("expandcontracttile-c",{ title: "Expand Tile", enabled: false });
        
        chrome.contextMenus.update("equalizetiles-b",{ enabled: false });
        chrome.contextMenus.update("equalizetiles-c",{ enabled: false });
        
        if (enableInspect) chrome.contextMenus.update("inspecttile-b",{ enabled: false });
        if (enableInspect) chrome.contextMenus.update("inspecttile-c",{ enabled: false });
        
        chrome.contextMenus.update("scrolllock-b",{ enabled: false, checked: false });
        chrome.contextMenus.update("scrolllock-c",{ enabled: false, checked: false });
        
        chrome.contextMenus.update("syncscroll-b",{ enabled: false, checked: false });
        chrome.contextMenus.update("syncscroll-c",{ enabled: false, checked: false });
        
        if (isFirefox) chrome.contextMenus.update("tiletab-thistab",{ enabled: true });
        
        removeNewLayoutSubmenu();
        createNewLayoutSubmenu();
        
        removeTileTabSubmenu();
        createTileTabSubmenu();
    }
}

function updateRecentNames(layoutNames,add)
{
    /* Remove multiple layout names and optionally add first layout name */
    
    chrome.storage.local.get(null,
    function(object)
    {
        var i;
        
        for (i = 0; i < recentNames.length; i++)
        {
            if (layoutNames.indexOf(recentNames[i]) >= 0)  /* remove specified layout name from recent names  */
            {
                recentNames.splice(i,1);
                i--;
            }
            else  /* remove unspecified layout name from recent names if there is no corresponding layout string */
            {
                if (!object.hasOwnProperty("layout-string-" + recentNames[i]))
                {
                    recentNames.splice(i,1);
                    i--;
                }
            }
        }
        
        if (add) recentNames.unshift(layoutNames[0]);  /* add first specified layout name at start of recent names */
        
        if (recentNames.length > 10) recentNames.length = 10;
        
        chrome.storage.local.set({ "layout-recentnames": recentNames });
    });
}

/************************************************************************/

/* Default Page URL function */

function defaultPageUrl(currenttaburl)
{
    var url;
    
    if (defaultType == 0) url = newtabPage;
    else if (defaultType == 1) url = blankPage;
    else if (defaultType == 2) url = customUrl.replace(/\/$/,"");
    else if (defaultType == 3) url = currenttaburl;
    
    if (url == "") url = newtabPage;
    
    url = validateTabUrlScheme(url);
    
    return url;
}

/************************************************************************/

/* Validate URL functions */

function validateTabUrlScheme(url)
{
    if (url == newtabPage) return url;
    
    if (!validTabUrlScheme(url)) return newtabPage;
    
    return url;
}

function validTabUrlScheme(url)
{
    if (url.substr(0,6) == "about:" || url.substr(0,7) == "chrome:" || url.substr(0,5) == "data:" || url.substr(0,11) == "javascript:") return false;
    
    return true;
}

/************************************************************************/

/* New layout */

function newLayout(layout,layoutType,allTabs,tileTabPos,tileTabDir)
{
    stopEventHandler();
    
    layout.tiledView = true;
    layout.expandedTile = null;
    
    chrome.windows.getLastFocused({ populate: true },
    function(focuswin)
    {
        var multiple,pos,selpos,startpos,endpos;
        var assigntabposlist = new Array();  /* positions of tabs when assigning from parent window */
        var returntabposlist = new Array();  /* positions of tabs when returning to parent window */
        
        setBadgeForAllTabsInWindow(focuswin.id,2);
        
        setListenersForAllTabsInWindow(focuswin.id,false);
        
        setQuickMenuForAllTabsInWindow(focuswin.id,false);
        
        if (!isFirefox) setZoomModeForAllTabsInWindow(focuswin.id,false);
        
        multiple = false;
        
        for (pos = 0; pos < focuswin.tabs.length; pos++)
        {
            if (focuswin.tabs[pos].active) selpos = pos;  /* selected tab */
            else if (focuswin.tabs[pos].highlighted) multiple = true;  /* highlighted tab */
        }
        
        if (tileTabPos >= 0)  /* Tile Tab - assign selected tab and tab chosen by Tile Tab */
        {
            if (tileTabDir == "above" || tileTabDir == "left")
            {
                assigntabposlist.push(tileTabPos);
                assigntabposlist.push(selpos);
                
                returntabposlist.push((tileTabPos < selpos) ? tileTabPos : tileTabPos-1);
                returntabposlist.push(selpos);
            }
            else
            {
                assigntabposlist.push(selpos);
                assigntabposlist.push(tileTabPos);
                
                returntabposlist.push((tileTabPos < selpos) ? selpos-1 : selpos);
                returntabposlist.push(tileTabPos);
            }
        }
        else if (allTabs)  /* New Layout - assign all tabs */
        {
            for (pos = 0; pos < focuswin.tabs.length; pos++)
            {
                assigntabposlist.push(pos);
                returntabposlist.push(pos);
            }
        }
        else if (multiple)  /* New Layout - assign selected tab and highlighted tabs */
        {
            for (pos = 0; pos < focuswin.tabs.length; pos++)
            {
                if (focuswin.tabs[pos].highlighted && assigntabposlist.length < layout.windowCount)
                {
                    assigntabposlist.push(pos);
                    returntabposlist.push(pos);
                }
            }
            
            if (assigntabposlist.indexOf(selpos) < 0)
            {
                assigntabposlist.splice(-1,1,selpos);
                returntabposlist.splice(-1,1,selpos);
            }
        }
        else if (assignExist)  /* New/Open Layout - assign selected tab and tabs from left or right of selected tab */
        {
            if (assignLeft)
            {
                if (selpos+1 >= layout.windowCount) { startpos = selpos-layout.windowCount+1; endpos = selpos; }
                else if (focuswin.tabs.length >= layout.windowCount) { startpos = 0; endpos = layout.windowCount-1; }
                else { startpos = 0; endpos = focuswin.tabs.length-1; }
                
                for (pos = startpos; pos <= endpos; pos++)
                {
                    assigntabposlist.push(pos);
                    returntabposlist.push(pos);
                }
            }
            else
            {
                if (focuswin.tabs.length-selpos >= layout.windowCount) { startpos = selpos; endpos = startpos+layout.windowCount; }
                else if (focuswin.tabs.length >= layout.windowCount) { startpos = focuswin.tabs.length-layout.windowCount; endpos = focuswin.tabs.length-1; }
                else { startpos = 0; endpos = focuswin.tabs.length-1; }
                
                for (pos = startpos; pos <= endpos; pos++)
                {
                    assigntabposlist.push(pos);
                    returntabposlist.push(pos);
                }
            }
        }
        
        if ((layoutType == 0 || layoutType == 2 || layoutType == 4) && assigntabposlist.length >= focuswin.tabs.length)  /* prevent parent window closing */
        {
            chrome.tabs.create({ windowId: focuswin.id, url: keepopenPage },
            function(newtab)
            {
                layout.parentWindowKeepOpenTabId = newtab.id;
                
                createTiles();
            });
        }
        else createTiles();
        
        function createTiles()
        {
            var tile,assignCount,createCount;
            
            for (tile = layout.rootTile; tile.type != "window"; tile = tile.childTiles[0]);
            
            chrome.windows.create({ type: tile.windowType, url: "about:blank",
                                    left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile), width: 50, height: 50 },
            function(newwin)  /* determine window minimum height */
            {
                chrome.windows.update(newwin.id,{ left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile), width: 50, height: 50 },
                function(win)  /* necessary to get correct window minimum height */
                {
                    windowMinWidth = (tile.windowType == "normal") ? win.width-lrbMarginNormal*2 : win.width-lrbMarginPopup*2;
                    windowMinHeight = (tile.windowType == "normal") ? win.height-topMargin-lrbMarginNormal : win.height-topMargin-lrbMarginPopup;
                    
                    chrome.windows.remove(newwin.id);
                });
            });
            
            assignCount = 0;
            createCount = 0;
            
            createTile(layout.rootTile);
            
            function createTile(tile)
            {
                var i,tabId,tabUrl;
                
                if (tile.type == "window")  /* window tile */
                {
                    if (layoutType == 0 || layoutType == 2 || layoutType == 4)  /* without tabs */
                    {
                        if (assignCount < assigntabposlist.length)  /* assign existing tab */
                        {
                            pos = assigntabposlist[assignCount];
                            tile.tabType = 0;  /* existing tab */
                            tile.tabId = focuswin.tabs[pos].id;
                            tile.tabPos = returntabposlist[assignCount];  /* position of tab when returning to parent window */
                            tile.tabPinned = focuswin.tabs[pos].pinned;
                            tabId = tile.tabId;
                            tabUrl = null;
                        }
                        else  /* assign generated tab */
                        {
                            tile.tabType = 1;  /* generated tab */
                            tile.tabId = -1;  /* not yet known */
                            tile.tabPos = -1;  /* after last tab */
                            tile.tabPinned = false;  /* not pinned */
                            tabId = null;
                            tabUrl = defaultPageUrl(focuswin.tabs[selpos].url);
                        }
                        
                        if (tile.tabPos == selpos) layout.lastFocusedTile = tile;
                        
                        assignCount++;
                    }
                    else  /* layoutType == 1 || layoutType == 3 || layoutType >= 5 */  /* with tabs */
                    {
                        tile.tabType = 2;  /* tab created by Open Layout */
                        tile.tabId = -1;  /* not yet known */
                        tile.tabPos = -1;  /* after last tab */
                        tile.tabPinned = false;  /* not pinned */
                        tabId = null;
                        tabUrl = tile.tabUrl;
                    }
                    
                    chrome.tabs.update(tabId,{ active: true },
                    function(tab)  /* Firefox - necessary if selected tabs have not been loaded after session restore (tab.discarded true) */
                    {
                        chrome.windows.create({ type: tile.windowType, tabId: tabId, url: tabUrl, incognito: layout.parentWindowIncognito,
                                                left: getTiledWindowLeft(tile)+1, top: getTiledWindowTop(tile)+1,
                                                width: getTiledWindowWidth(tile)-2, height: getTiledWindowHeight(tile)-2 },
                        function(newwin)
                        {
                            chrome.windows.update(newwin.id,{ left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile),
                                                              width: getTiledWindowWidth(tile), height: getTiledWindowHeight(tile) },
                            function(win)  /* Firefox - necessary to correctly position/size both normal (no title) and popup windows */
                            {
                                tile.windowId = newwin.id;
                                tile.tabId = newwin.tabs[0].id;
                                
                                setBadgeForAllTabsInWindow(newwin.id,3);
                                
                                setListenersForAllTabsInWindow(newwin.id,true);
                                
                                setQuickMenuForAllTabsInWindow(newwin.id,showQuickMenu || showQuickMenuCtrl);
                                
                                if (!isFirefox) setZoomModeForAllTabsInWindow(newwin.id,zoomPerTab);
                                
                                if (++createCount == layout.windowCount) createFinish();
                            });
                        });
                    });
                }
                else  /* split tile */
                {
                    for (i = 0; i < tile.childTiles.length; i++)
                        createTile(tile.childTiles[i]);
                }
            }
        }
        
        function createFinish()
        {
            var tile;
            
            if (layout.lastFocusedTile == null)
            {
                for (tile = layout.rootTile; tile.type != "window"; tile = tile.childTiles[0]);
                
                layout.lastFocusedTile = tile;
            }
            
            chrome.windows.update(layout.lastFocusedTile.windowId,{ focused: true },
            function(win)
            {
                setBadgeForAllTabsInWindow(layout.parentWindowId,2);
                
                updateContextMenuItems(layout.lastFocusedTile.windowId);
                
                startEventHandler();
            });
        }
    });
}

/************************************************************************/

/* Show layout */

function showLayout(layout)
{
    stopEventHandler();

    layout.tiledView = true;
    layout.expandedTile = null;
    
    chrome.windows.get(layout.parentWindowId,{ populate: true },
    function(parentwin)
    {
        var count,pos,selpos;
        
        setBadgeForAllTabsInWindow(layout.parentWindowId,2);
        
        setListenersForAllTabsInWindow(layout.parentWindowId,false);
        
        setQuickMenuForAllTabsInWindow(layout.parentWindowId,false);
        
        if (!isFirefox) setZoomModeForAllTabsInWindow(layout.parentWindowId,false);
        
        count = 0;
        for (pos = 0; pos < parentwin.tabs.length; pos++)
        {
            if (parentwin.tabs[pos].active) selpos = pos;  /* selected tab */
            if (findTileByTabId(layout.rootTile,parentwin.tabs[pos].id) != null) count++;
        }
        
        if (count == parentwin.tabs.length)  /* prevent parent window closing */
        {
            chrome.tabs.create({ windowId: parentwin.id, url: keepopenPage },
            function(newtab)
            {
                layout.parentWindowKeepOpenTabId = newtab.id;
                
                showTiles();
            });
        }
        else showTiles();
        
        function showTiles()
        {
            var showCount;
            
            showCount = 0;
            
            showTile(layout.rootTile);
            
            function showTile(tile)
            {
                var i,pos,tabId,tabUrl;
                
                if (tile.type == "window")
                {
                    for (pos = 0; pos < parentwin.tabs.length; pos++)
                        if (parentwin.tabs[pos].id == tile.tabId) break;
                    
                    if (pos < parentwin.tabs.length)
                    {
                        if (tile.tabType == 0 || tile.tabType == 2)
                        {
                            tile.tabPos = pos;  /* update position of primary tab in parent window */
                            tile.tabPinned = parentwin.tabs[pos].pinned;  /* update pinned state of primary tab in parent window */
                        }
                        tabId = tile.tabId;
                        tabUrl = null;
                    }
                    else  /* assign generated tab */
                    {
                        tile.tabType = 1;  /* generated tab */
                        tile.tabId = -1;  /* not yet known */
                        tile.tabPos = -1;  /* after last tab */
                        tile.tabPinned = false;  /* not pinned */
                        tabId = null;
                        tabUrl = defaultPageUrl(parentwin.tabs[selpos].url);
                    }
                    
                    chrome.windows.create({ type: tile.windowType, tabId: tabId, url: tabUrl, incognito: layout.parentWindowIncognito,
                                            left: getTiledWindowLeft(tile)+1, top: getTiledWindowTop(tile)+1,
                                            width: getTiledWindowWidth(tile)-2, height: getTiledWindowHeight(tile)-2 },
                    function(newwin)
                    {
                        chrome.windows.update(newwin.id,{ left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile),
                                                          width: getTiledWindowWidth(tile), height: getTiledWindowHeight(tile) },
                        function(win)  /* Firefox - necessary to correctly position/size  normal (no title) and popup windows */
                        {
                            tile.windowId = newwin.id;
                            tile.tabId = newwin.tabs[0].id;
                            
                            setBadgeForAllTabsInWindow(newwin.id,3);
                            
                            setListenersForAllTabsInWindow(newwin.id,true);
                            
                            setQuickMenuForAllTabsInWindow(newwin.id,showQuickMenu || showQuickMenuCtrl);
                            
                            if (!isFirefox) setZoomModeForAllTabsInWindow(newwin.id,zoomPerTab);
                            
                            if (++showCount == layout.windowCount) showFinish();
                        });
                    });
                }
                else  /* split tile */
                {
                    for (i = 0; i < tile.childTiles.length; i++)
                        showTile(tile.childTiles[i]);
                }
            }
            
            function showFinish()
            {
                chrome.windows.update(layout.lastFocusedTile.windowId,{ focused: true },
                function(win)
                {
                    setBadgeForAllTabsInWindow(layout.parentWindowId,2);
                    
                    updateContextMenuItems(win.id);
                    
                    startEventHandler();
                });
            }
        }
    });
}

/************************************************************************/

/* Hide layout */

function hideLayout(layout,close)
{
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        layout.tiledView = false;
        layout.expandedTile = null;
        
        layout.genCloseTabIdList.length = 0;
        layout.newCloseTabIdList.length = 0;
        layout.openCloseTabIdList.length = 0;
        layout.userCloseTabIdList.length = 0;
        
        layout.pinnedTabIdList.length = 0;
        layout.pinnedTabPosList.length = 0;
        
        chrome.windows.getLastFocused({ },
        function(focuswin)
        {
            var tile;
            
            layout.lastFocusedTile = findTileByWindowId(layout.rootTile,focuswin.id);
            
            if (layout.lastFocusedTile == null)
            {
                for (tile = layout.rootTile; tile.type != "window"; tile = tile.childTiles[0]);
                
                layout.lastFocusedTile = tile;
            }
            
            if (layout.parentWindowId == -1)  /* parent window has been closed */
            {
                chrome.windows.create({ type: "normal", url: keepopenPage, incognito: layout.parentWindowIncognito,
                                        left: getParentWindowLeft(layout), top: getParentWindowTop(layout),
                                        width: getParentWindowWidth(layout), height: getParentWindowHeight(layout) },
                function(newwin)
                {
                    layout.parentWindowId = newwin.id;
                    layout.parentWindowKeepOpenTabId = newwin.tabs[0].id;
                    
                    hideTiles();
                });
            }
            else hideTiles();
            
            function hideTiles()
            {
                var hideCount;
                
                hideCount = 0;
                
                hideTile(layout.rootTile);
                
                function hideTile(tile)
                {
                    chrome.tabs.query({ windowId: tile.windowId },
                    function(tabs)
                    {
                        var i,moveCount,pos,parentPos;
                        
                        tile.windowId = -1;  /* prevents handling in chrome.windows.onRemoved listener */
                        
                        moveCount = 0;
                        
                        if (tile.type == "window")
                        {
                            for (pos = 0; pos < tabs.length; pos++)
                            {
                                if (tabs[pos].id == tile.tabId)  /* primary tab */
                                {
                                    parentPos = ((tile.tabType == 0 || tile.tabType == 2) && !tile.tabPinned) ? tile.tabPos : -1;
                                    
                                    if (tile.tabType == 0 && autoCloseNew) layout.newCloseTabIdList.push(tabs[pos].id);
                                    if (tile.tabType == 1 && (tabs[pos].url == newtabPage || tabs[pos].url == blankPage)) layout.genCloseTabIdList.push(tabs[pos].id);
                                    if (tile.tabType == 2 && autoCloseOpen) layout.openCloseTabIdList.push(tabs[pos].id);
                                    
                                    if (tile.tabPinned)
                                    {
                                        layout.pinnedTabIdList.push(tabs[pos].id);
                                        layout.pinnedTabPosList.push(tile.tabPos);
                                    }
                                }
                                else
                                {
                                    parentPos = -1;
                                    
                                    if (autoCloseUser) layout.userCloseTabIdList.push(tabs[pos].id);
                                }
                                
                                chrome.tabs.update(tabs[pos].id,{ pinned: false },
                                function(tab)
                                {
                                    chrome.tabs.move(tab.id,{ windowId: layout.parentWindowId, index: parentPos },
                                    function(tab)
                                    {
                                        /* Moving last tab out of window, closes window and fires chrome.windows.onRemoved event */
                                        
                                        if (++moveCount == tabs.length) 
                                        {
                                            if (++hideCount == layout.windowCount) hideFinish();
                                        }
                                    });
                                });
                            }
                        }
                        else  /* split tile */
                        {
                            for (i = 0; i < tile.childTiles.length; i++)
                                hideTile(tile.childTiles[i]);
                        }
                    });
                }
            }
            
            function hideFinish()
            {
                if (layout.parentWindowKeepOpenTabId != -1)
                {
                    chrome.tabs.remove(layout.parentWindowKeepOpenTabId);
                    
                    layout.parentWindowKeepOpenTabId = -1;
                }
                
                while (layout.genCloseTabIdList.length > 0) chrome.tabs.remove(layout.genCloseTabIdList.shift());
                while (layout.userCloseTabIdList.length > 0) chrome.tabs.remove(layout.userCloseTabIdList.shift());
                
                while (layout.pinnedTabIdList.length > 0)
                {
                    chrome.tabs.update(layout.pinnedTabIdList.shift(),{ pinned: true },
                    function(tab)
                    {
                        chrome.tabs.move(tab.id,{ windowId: layout.parentWindowId, index: layout.pinnedTabPosList.shift() });
                    } );
                }
                
                chrome.tabs.update(layout.lastFocusedTile.tabId,{ active: true },
                function(tab)
                {
                    chrome.windows.update(layout.parentWindowId,{ focused: true },
                    function(win)
                    {
                        setBadgeForAllTabsInWindow(layout.parentWindowId,1);
                        
                        setListenersForAllTabsInWindow(layout.parentWindowId,false);
                        
                        setQuickMenuForAllTabsInWindow(layout.parentWindowId,false);
                        
                        if (!isFirefox) setZoomModeForAllTabsInWindow(layout.parentWindowId,false);
                        
                        updateContextMenuItems(layout.parentWindowId);
                        
                        if (close) window.setTimeout(function() { closeLayout(layout); },100);  /* will restart tile event handler if any visible layouts */
                        else if (visibleLayouts()) startEventHandler();
                    });
                });
            }
        });
    },deferTimeout);
}

/************************************************************************/

/* Close layout */

function closeLayout(layout)
{
    var windowId;
    
    stopEventHandler();
    
    layout.tiledView = false;
    layout.syncScroll = false;
    layout.expandedTile = null;
    layout.lastFocusedTile = null;
    
    if (layout.parentWindowId != -1) 
    {
        while (layout.newCloseTabIdList.length > 0) chrome.tabs.remove(layout.newCloseTabIdList.shift());
        while (layout.openCloseTabIdList.length > 0) chrome.tabs.remove(layout.openCloseTabIdList.shift());
        
        setBadgeForAllTabsInWindow(layout.parentWindowId,0);
        
        setListenersForAllTabsInWindow(layout.parentWindowId,false);
        
        setQuickMenuForAllTabsInWindow(layout.parentWindowId,false);
        
        if (!isFirefox) setZoomModeForAllTabsInWindow(layout.parentWindowId,false);
        
        windowId = layout.parentWindowId;
        
        layout.parentWindowId = -1;
        layout.parentWindowIncognito = false;
        
        removeLayout(layout);
        
        updateContextMenuItems(windowId);
        
        chrome.storage.local.get("reinstate-state",
        function(object)
        {
            if (object["reinstate-state"] == "maximized")
            {
                chrome.windows.update(windowId,{ state: "maximized" },
                function(win)
                {
                    if (visibleLayouts()) startEventHandler();
                });
            }
            else if (visibleLayouts()) startEventHandler();
        });
    }
    else
    {
        removeLayout(layout);
        
        if (visibleLayouts()) startEventHandler();
    }
}

/************************************************************************/

/* Refresh Layout */

function refreshLayout(layout)
{
    chrome.windows.getLastFocused({ },
    function(focuswin)
    {
        var tile;
        
        layout.lastFocusedTile = findTileByWindowId(layout.rootTile,focuswin.id);
        
        if (layout.lastFocusedTile == null)
        {
            for (tile = layout.rootTile; tile.type != "window"; tile = tile.childTiles[0]);
            
            layout.lastFocusedTile = tile;
        }
        
        _refreshLayout(layout,true);  /* will restart tile event handler */
    });
}
        
function _refreshLayout(layout,refreshCommand)
{
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        var updateCount;
        
        layout.expandedTile = null;
        
        updateCount = 0;
        
        updateTile(layout.rootTile);
        
        function updateTile(tile)
        {
            var i;
            
            if (tile.type == "window")
            {
                chrome.windows.update(tile.windowId,{ focused: true,
                                                      left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile),
                                                      width: getTiledWindowWidth(tile), height: getTiledWindowHeight(tile) },
                function(win)
                {
                    if (refreshCommand && reloadPages)
                    {
                        chrome.windows.get(tile.windowId,{ populate: true },
                        function (win)
                        {
                            var pos;
                            
                            for (pos = 0; pos < win.tabs.length; pos++)
                            {
                                if (win.tabs[pos].id == tile.tabId)  /* primary tab */
                                {
                                    chrome.tabs.reload(tile.tabId);
                                }
                            }
                        });
                    }
                    
                    setBadgeForAllTabsInWindow(win.id,3);
                    
                    setListenersForAllTabsInWindow(win.id,true);
                    
                    setQuickMenuForAllTabsInWindow(win.id,showQuickMenu || showQuickMenuCtrl);
                    
                    if (!isFirefox) setZoomModeForAllTabsInWindow(win.id,zoomPerTab);
                    
                    if (++updateCount == layout.windowCount)
                    {
                        chrome.windows.update(layout.lastFocusedTile.windowId,{ focused: true },
                        function(win)
                        {
                            updateContextMenuItems(win.id);
                            
                            startEventHandler();
                        });
                    }
                });
            }
            else  /* split tile */
            {
                for (i = 0; i < tile.childTiles.length; i++)
                    updateTile(tile.childTiles[i]);
            }
        }
    },deferTimeout);
}

/************************************************************************/

/* Toggle toolbars */

function toggleToolbars(layout)
{
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        chrome.windows.getLastFocused({ populate: true },
        function(focuswin)
        {
            var tile;
            
            tile = findTileByWindowId(layout.rootTile,focuswin.id);
            
            if (layout.parentWindowId == -1)  /* parent window has been closed */
            {
                chrome.windows.create({ type: "normal", url: keepopenPage, incognito: layout.parentWindowIncognito,
                                        left: getParentWindowLeft(layout), top: getParentWindowTop(layout),
                                        width: getParentWindowWidth(layout), height: getParentWindowHeight(layout) },
                function(newwin)
                {
                    layout.parentWindowId = newwin.id;
                    layout.parentWindowKeepOpenTabId = newwin.tabs[0].id;
                    
                    _toggleToolbars(tile);
                });
            }
            else _toggleToolbars(tile);
            
            function _toggleToolbars(tile)
            {
                var moveCount,pos;
                
                tile.windowId = -1;  /* prevents handling in chrome.windows.onRemoved listener */
                
                moveCount = 0;
                
                for (pos = 0; pos < focuswin.tabs.length; pos++)
                {
                    chrome.tabs.update(focuswin.tabs[pos].id,{ pinned: false },
                    function(tab)
                    {
                        chrome.tabs.move(tab.id,{ windowId: layout.parentWindowId, index: -1 },
                        function(tab)
                        {
                            /* Moving last tab out of window, closes window and fires chrome.windows.onRemoved event */
                            
                            if (++moveCount == focuswin.tabs.length)
                            {
                                if (tile.windowType == "normal") tile.windowType = "popup"; else tile.windowType = "normal";
                                
                                chrome.windows.create({ type: tile.windowType, tabId: tile.tabId, incognito: layout.parentWindowIncognito,  /* focused: false, */  /* Firefox - does not support focused property */
                                                        left: getTiledWindowLeft(tile)+1, top: getTiledWindowTop(tile)+1,
                                                        width: getTiledWindowWidth(tile)-2, height: getTiledWindowHeight(tile)-2 },
                                function(newwin)
                                {
                                    chrome.windows.update(newwin.id,{ left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile),
                                                                      width: getTiledWindowWidth(tile), height: getTiledWindowHeight(tile) },
                                    function(win)  /* Firefox - necessary to correctly position/size both normal (no title) and popup windows */
                                    {
                                        tile.windowId = newwin.id;
                                        tile.tabId = newwin.tabs[0].id;
                                        
                                        setBadgeForAllTabsInWindow(newwin.id,3);
                                        
                                        setListenersForAllTabsInWindow(newwin.id,true);
                                        
                                        setQuickMenuForAllTabsInWindow(newwin.id,showQuickMenu || showQuickMenuCtrl);
                                        
                                        if (!isFirefox) setZoomModeForAllTabsInWindow(newwin.id,zoomPerTab);
                                        
                                        chrome.windows.update(newwin.id,{ focused: true },
                                        function(win)
                                        {
                                            updateContextMenuItems(newwin.id);
                                            
                                            if (layout.expandedTile != null) contractTile(layout);
                                            else startEventHandler();
                                        });
                                    });
                                });
                            }
                        });
                    });
                }
            }
        });
    },deferTimeout);
}

/************************************************************************/

/* Toggle all toolbars */

function toggleToolbarsAll(layout)
{
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        layout.expandedTile = null;
        
        chrome.windows.getLastFocused({ },
        function(focuswin)
        {
            var tile,windowType;
            
            layout.lastFocusedTile = findTileByWindowId(layout.rootTile,focuswin.id);
            
            if (layout.lastFocusedTile == null)
            {
                for (tile = layout.rootTile; tile.type != "window"; tile = tile.childTiles[0]);
                
                layout.lastFocusedTile = tile;
            }
            
            if (layout.lastFocusedTile.windowType == "normal") windowType = "popup"; else windowType = "normal";
            
            if (layout.parentWindowId == -1)  /* parent window has been closed */
            {
                chrome.windows.create({ type: "normal", url: keepopenPage, incognito: layout.parentWindowIncognito,
                                        left: getParentWindowLeft(layout), top: getParentWindowTop(layout),
                                        width: getParentWindowWidth(layout), height: getParentWindowHeight(layout) },
                function(newwin)
                {
                    layout.parentWindowId = newwin.id;
                    layout.parentWindowKeepOpenTabId = newwin.tabs[0].id;
                    
                    _toggleToolbarsAll();
                });
            }
            else _toggleToolbarsAll();
            
            function _toggleToolbarsAll()
            {
                var toggleCount;
                
                toggleCount = 0;
                
                _toggleToolbars(layout.rootTile);
                
                function _toggleToolbars(tile)
                {
                    chrome.tabs.query({ windowId: tile.windowId },
                    function(tabs)
                    {
                        var i,moveCount,pos;
                        
                        tile.windowId = -1;  /* prevents handling in chrome.windows.onRemoved listener */
                        
                        moveCount = 0;
                        
                        if (tile.type == "window")
                        {
                            for (pos = 0; pos < tabs.length; pos++)
                            {
                                chrome.tabs.update(tabs[pos].id,{ pinned: false },
                                function(tab)
                                {
                                    chrome.tabs.move(tab.id,{ windowId: layout.parentWindowId, index: -1 },
                                    function(tab)
                                    {
                                        /* Moving last tab out of window, closes window and fires chrome.windows.onRemoved event */
                                        
                                        if (++moveCount == tabs.length) 
                                        {
                                            tile.windowType = windowType;
                                            
                                            chrome.windows.create({ type: tile.windowType, tabId: tile.tabId, incognito: layout.parentWindowIncognito,
                                                                    left: getTiledWindowLeft(tile)+1, top: getTiledWindowTop(tile)+1,
                                                                    width: getTiledWindowWidth(tile)-2, height: getTiledWindowHeight(tile)-2 },
                                            function(newwin)
                                            {
                                                chrome.windows.update(newwin.id,{ left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile),
                                                                                  width: getTiledWindowWidth(tile), height: getTiledWindowHeight(tile) },
                                                function(win)  /* Firefox - necessary to correctly position/size both normal (no title) and popup windows */
                                                {
                                                    tile.windowId = newwin.id;
                                                    tile.tabId = newwin.tabs[0].id;
                                                    
                                                    setBadgeForAllTabsInWindow(newwin.id,3);
                                                    
                                                    setListenersForAllTabsInWindow(newwin.id,true);
                                                    
                                                    setQuickMenuForAllTabsInWindow(newwin.id,showQuickMenu || showQuickMenuCtrl);
                                                    
                                                    if (!isFirefox) setZoomModeForAllTabsInWindow(newwin.id,zoomPerTab);
                                                    
                                                    if (++toggleCount == layout.windowCount) toggleAllFinish();
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                        }
                        else  /* split tile */
                        {
                            for (i = 0; i < tile.childTiles.length; i++)
                                _toggleToolbars(tile.childTiles[i]);
                        }
                    });
                }
            }
            
            function toggleAllFinish()
            {
                chrome.windows.update(layout.lastFocusedTile.windowId,{ focused: true },
                function(win)
                {
                    updateContextMenuItems(win.id);
                    
                    startEventHandler();
                });
            }
        });
    },deferTimeout);
}

/************************************************************************/

/* Add Tile */

function addTile(layout,direction,tabId,tabUrl)
{
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        layout.expandedTile = null;
        
        chrome.windows.getLastFocused({ populate: true },
        function(focuswin)
        {
            var pos,selpos,tile;
            var tiles = new Object();
            
            for (pos = 0; pos < focuswin.tabs.length; pos++)
            {
                if (focuswin.tabs[pos].active) selpos = pos;  /* selected tab */
            }
            
            tile = findTileByWindowId(layout.rootTile,focuswin.id);
            
            tiles = addTileOther(layout,tile,direction);
            
            chrome.windows.update(focuswin.id,{ left: getTiledWindowLeft(tiles.modTile), top: getTiledWindowTop(tiles.modTile),
                                                width: getTiledWindowWidth(tiles.modTile), height: getTiledWindowHeight(tiles.modTile) },
            function(win)
            {
                if (tabId != null) tabUrl = null;
                else if (tabUrl == null) tabUrl = defaultPageUrl(focuswin.tabs[selpos].url);
                
                chrome.windows.create({ type: tiles.newTile.windowType, tabId: tabId, url: tabUrl, incognito: layout.parentWindowIncognito,
                                        left: getTiledWindowLeft(tiles.newTile)+1, top: getTiledWindowTop(tiles.newTile)+1,
                                        width: getTiledWindowWidth(tiles.newTile)-2, height: getTiledWindowHeight(tiles.newTile)-2 },
                function(newwin)
                {
                    chrome.windows.update(newwin.id,{ left: getTiledWindowLeft(tiles.newTile), top: getTiledWindowTop(tiles.newTile),
                                                      width: getTiledWindowWidth(tiles.newTile), height: getTiledWindowHeight(tiles.newTile) },
                    function(win)  /* Firefox - necessary to correctly position/size both normal (no title) and popup windows */
                    {
                        tiles.newTile.windowId = newwin.id;
                        tiles.newTile.tabType = 1;  /* generated tab */
                        tiles.newTile.tabId = newwin.tabs[0].id;
                        tiles.newTile.tabPos = -1;  /* after last tab */
                        tiles.newTile.tabPinned = false;  /* not pinned */
                        
                        setBadgeForAllTabsInWindow(newwin.id,3);
                        
                        setListenersForAllTabsInWindow(newwin.id,true);
                        
                        setQuickMenuForAllTabsInWindow(newwin.id,showQuickMenu || showQuickMenuCtrl);
                        
                        if (!isFirefox) setZoomModeForAllTabsInWindow(newwin.id,zoomPerTab);
                        
                        setBadgeForAllTabsInWindow(layout.parentWindowId,2);
                        
                        layout.lastFocusedTile = tiles.newTile;
                        
                        adjustLayout(layout);
                        
                        _refreshLayout(layout,false);  /* will restart tile event handler */
                    });
                });
            });
        });
    },deferTimeout);
}

/************************************************************************/

/* Remove Tile */

function removeTile(layout)
{
    if (layout.windowCount == 1 || (layout.windowCount == 2 && removeTwoTiles))
    {
        hideLayout(layout,true);  /* will restart tile event handler if any visible layouts */
        
        return;
    }
    
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        layout.expandedTile = null;
        
        layout.genCloseTabIdList.length = 0;
        layout.newCloseTabIdList.length = 0;
        layout.openCloseTabIdList.length = 0;
        layout.userCloseTabIdList.length = 0;
        
        layout.pinnedTabIdList.length = 0;
        layout.pinnedTabPosList.length = 0;
        
        chrome.windows.getLastFocused({ populate: true },
        function(focuswin)
        {
            var tile;
            
            tile = findTileByWindowId(layout.rootTile,focuswin.id);
            
            if (layout.parentWindowId == -1)  /* parent window has been closed */
            {
                chrome.windows.create({ type: "normal", url: keepopenPage, incognito: layout.parentWindowIncognito,
                                        left: getParentWindowLeft(layout), top: getParentWindowTop(layout),
                                        width: getParentWindowWidth(layout), height: getParentWindowHeight(layout) },
                function(newwin)
                {
                    layout.parentWindowId = newwin.id;
                    layout.parentWindowKeepOpenTabId = newwin.tabs[0].id;
                    
                    _removeTile(tile);
                });
            }
            else _removeTile(tile);
            
            function _removeTile(tile)
            {
                var moveCount,pos,parentPos;
                
                tile.windowId = -1;  /* prevents handling in chrome.windows.onRemoved listener */
                
                moveCount = 0;
                
                for (pos = 0; pos < focuswin.tabs.length; pos++)
                {
                    if (focuswin.tabs[pos].id == tile.tabId)  /* primary tab */
                    {
                        parentPos = ((tile.tabType == 0 || tile.tabType == 2) && !tile.tabPinned) ? tile.tabPos : -1;
                        
                        if (tile.tabType == 0 && autoCloseNew) layout.newCloseTabIdList.push(focuswin.tabs[pos].id);
                        if (tile.tabType == 1 && (focuswin.tabs[pos].url == newtabPage || focuswin.tabs[pos].url == blankPage)) layout.genCloseTabIdList.push(focuswin.tabs[pos].id);
                        if (tile.tabType == 2 && autoCloseOpen) layout.openCloseTabIdList.push(focuswin.tabs[pos].id);
                        
                        if (tile.tabPinned)
                        {
                            layout.pinnedTabIdList.push(focuswin.tabs[pos].id);
                            layout.pinnedTabPosList.push(tile.tabPos);
                        }
                    }
                    else
                    {
                        parentPos = -1;
                        
                        if (autoCloseUser) layout.userCloseTabIdList.push(focuswin.tabs[pos].id);
                    }
                    
                    chrome.tabs.update(focuswin.tabs[pos].id,{ pinned: false },
                    function(tab)
                    {
                        chrome.tabs.move(tab.id,{ windowId: layout.parentWindowId, index: parentPos },
                        function(tab)
                        {
                            /* Moving last tab out of window, closes window and fires chrome.windows.onRemoved event */
                            
                            if (++moveCount == focuswin.tabs.length)
                            {
                                while (layout.genCloseTabIdList.length > 0) chrome.tabs.remove(layout.genCloseTabIdList.shift());
                                while (layout.newCloseTabIdList.length > 0) chrome.tabs.remove(layout.newCloseTabIdList.shift());
                                while (layout.openCloseTabIdList.length > 0) chrome.tabs.remove(layout.openCloseTabIdList.shift());
                                while (layout.userCloseTabIdList.length > 0) chrome.tabs.remove(layout.userCloseTabIdList.shift());
                                
                                while (layout.pinnedTabIdList.length > 0)
                                {
                                    chrome.tabs.update(layout.pinnedTabIdList.shift(),{ pinned: true },
                                    function(tab)
                                    {
                                        chrome.tabs.move(tab.id,{ windowId: layout.parentWindowId, index: layout.pinnedTabPosList.shift() });
                                    } );
                                }
                                
                                setBadgeForAllTabsInWindow(layout.parentWindowId,2);
                                
                                setListenersForAllTabsInWindow(layout.parentWindowId,false);
                                
                                setQuickMenuForAllTabsInWindow(layout.parentWindowId,false);
                                
                                if (!isFirefox) setZoomModeForAllTabsInWindow(layout.parentWindowId,false);
                                
                                layout.lastFocusedTile = removeTileOther(layout,tile);
                                
                                adjustLayout(layout);
                                
                                _refreshLayout(layout,false);  /* will restart tile event handler */
                            }
                        });
                    });
                }
            }
        });
    },deferTimeout);
}

/************************************************************************/

/* Expand Tile */

function expandTile(layout)
{
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        chrome.windows.getLastFocused({ },
        function(focuswin)
        {
            var tile;
            
            tile = layout.expandedTile;
            
            if (tile != null)
            {
                chrome.windows.update(tile.windowId,{ left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile),
                                                      width: getTiledWindowWidth(tile), height: getTiledWindowHeight(tile) },
                function(win)
                {
                    setQuickMenuForAllTabsInWindow(win.id,showQuickMenu || showQuickMenuCtrl);
                });
            }
            
            layout.expandedTile = findTileByWindowId(layout.rootTile,focuswin.id);
            
            chrome.windows.update(focuswin.id,{ left: getParentWindowLeft(layout), top: getParentWindowTop(layout),
                                                width: getParentWindowWidth(layout), height: getParentWindowHeight(layout) },
            function(win)
            {
                setQuickMenuForAllTabsInWindow(win.id,showQuickMenu || showQuickMenuCtrl);
                
                updateContextMenuItems(win.id);
                
                startEventHandler();
            });
        });
    },deferTimeout);
}

/************************************************************************/

/* Contract Tile */

function contractTile(layout)
{
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        var tile;
        
        tile = layout.expandedTile;
        
        layout.expandedTile = null;
        
        chrome.windows.update(tile.windowId,{ left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile),
                                              width: getTiledWindowWidth(tile), height: getTiledWindowHeight(tile) },
        function(win)
        {
            setQuickMenuForAllTabsInWindow(win.id,showQuickMenu || showQuickMenuCtrl);
            
            updateContextMenuItems(win.id);
            
            startEventHandler();
        });
    },deferTimeout);
}

/************************************************************************/

/* Equalize Tiles */

function equalizeTiles(layout)
{
    stopEventHandler();
    
    window.setTimeout(  /* allow time for tileEventHandler() to complete */
    function()
    {
        chrome.windows.getLastFocused({ },
        function(focuswin)
        {
            var tile;
            
            tile = findTileByWindowId(layout.rootTile,focuswin.id);
            
            samesizeTile(tile.parentTile,false);
            
            resizeTile(tile.parentTile,tile.parentTile.width,tile.parentTile.height,tile.parentTile.left,tile.parentTile.top);
            
            _refreshLayout(layout,false);  /* will restart tile event handler */
        });
    },deferTimeout);
}

/************************************************************************/

/* Inspect Tile */

function inspectTile(layout,node)
{
    chrome.windows.getLastFocused({ populate: true },
    function(focuswin)
    {
        var i,tile;
        
        tile = findTileByWindowId(layout.rootTile,focuswin.id);
        
        if (node == "this") tile = tile;
        else if (node == "before" && tile.parentTile != null && (i = tile.parentTile.childTiles.indexOf(tile)) > 0) tile = tile.parentTile.childTiles[i-1];
        else if (node == "after" && tile.parentTile != null && (i = tile.parentTile.childTiles.indexOf(tile)) < tile.parentTile.childTiles.length-1) tile = tile.parentTile.childTiles[i+1];
        else if (node == "parent" && tile.parentTile != null) tile = tile.parentTile;
        else if (node == "gparent" && tile.parentTile != null && tile.parentTile.parentTile != null) tile = tile.parentTile.parentTile;
        else if (node == "ggparent" && tile.parentTile != null && tile.parentTile.parentTile != null && tile.parentTile.parentTile.parentTile != null) tile = tile.parentTile.parentTile.parentTile;
        else { console.log("Tile does not exist"); return; }
        
        console.log(tile.type + " > WID:" + tile.windowId + " L:" + tile.left + " T:" + tile.top + " W:" + tile.width + " H:" + tile.height + " R:" + tile.ratio.toFixed(4) +
                                 " TTYP:" + tile.tabType + " TID:" + tile.tabId + " TPOS:" + tile.tabPos + " TPIN:" + tile.tabPinned);
    });
}

/************************************************************************/

/* Bookmark Layout */

function bookmarkLayout(layout)
{
    chrome.tabs.query({ },
    function(tabs)
    {
        var date,datestr;
        
        date = new Date();
        
        datestr = date.toISOString().substr(2,17).replace(/T/," ").replace(/:/g,"-");
        
        chrome.bookmarks.create({ url: ("http://-tile-tabs-we-/" + encodeURIComponent(createLayoutString(layout,3,tabs))), title: "Tile Tabs WE Layout [" + datestr + "]"});
    });
}

/************************************************************************/

/* Open Layout */

function openLayout()
{
    stopEventHandler();
    
    if (dialogWindowId != -1)
    {
        chrome.windows.remove(dialogWindowId);
        
        dialogWindowId = -1;
    }
    
    chrome.windows.getLastFocused({ },
    function(focuswin)
    {
        var left,top,width,height;
        
        dialogParentWindowId = focuswin.id;
        
        width = 440 + lrbMarginNormal*2;
        height = 363 + topMargin + lrbMarginNormal + ((platformOS != "win") ? -28 : 0);  /* less header height if not Windows */
        
        left = Math.floor(focuswin.left+(focuswin.width-width)/2);
        top = Math.floor(focuswin.top+(focuswin.height-height)/2);
        
        chrome.windows.create({ type: "popup", url: chrome.runtime.getURL("openlayout.html"),  /* focused: false, */  /* Firefox - does not support focused property */
                                left: left, top: top, width: width, height: height },
        function(newwin)
        {
            chrome.windows.update(newwin.id,{ left: left, top: top, width: width, height: height },
            function(win)  /* Firefox - necessary to correctly position popup window */
            {
                dialogWindowId = newwin.id;
                
                chrome.tabs.setZoom(newwin.tabs[0].id,1.0);
            });
        });
    });
}

function openLayoutReply(layout,layoutName,layoutString)
{
    updateRecentNames([layoutName],true);
    
    applyLayoutString(layout,layoutString);
}

function applyLayoutString(layout,layoutString)
{
    var j,layoutType;
    
    j = layoutString.indexOf(",");
    layoutType = +layoutString.substr(0,j);
    layoutString = layoutString.substr(j+1);
    
    j = layoutString.indexOf(";");
    layout.windowCount = +layoutString.substr(0,j);
    layoutString = layoutString.substr(j+1);
    
    layout.rootTile = new Tile();
    
    applyTileString(layout.rootTile);
    
    adjustLayout(layout);
    
    newLayout(layout,layoutType,false,-1,"");  /* will restart tile event handler */
    
    function applyTileString(tile)
    {
        var i,j,childCount;
        
        j = layoutString.indexOf(",");
        tile.type = layoutString.substr(0,j);
        layoutString = layoutString.substr(j+1);
        
        if (tile.type == "window")  /* window tile */
        {
            if (layoutType == 0)
            {
                j = layoutString.indexOf(";");
                tile.ratio = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                tile.tabUrl = null;
            }
            else if (layoutType == 1)
            {
                j = layoutString.indexOf(",");
                tile.ratio = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over { */
                
                j = layoutString.indexOf("}");
                tile.tabUrl = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over } */
                
                tile.tabUrl = validateTabUrlScheme(tile.tabUrl);
            }
            else if (layoutType == 2 || layoutType == 4)
            {
                j = layoutString.indexOf(",");
                tile.ratio = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(";");
                tile.windowType = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                tile.tabUrl = null;
            }
            else if (layoutType == 3)
            {
                j = layoutString.indexOf(",");
                tile.ratio = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(",");
                tile.windowType = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over { */
                
                j = layoutString.indexOf("}");
                tile.tabUrl = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over } */
                
                tile.tabUrl = validateTabUrlScheme(tile.tabUrl);
            }
            else if (layoutType == 5)
            {
                j = layoutString.indexOf(",");
                tile.ratio = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(",");
                tile.windowType = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over { */
                
                j = layoutString.indexOf("}");
                tile.tabUrl = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over } */
                
                tile.tabUrl = validateTabUrlScheme(tile.tabUrl);
                
                j = layoutString.indexOf(",");
                tile.scrollXInit = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(";");
                tile.scrollYInit = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                tile.scrollInit = true;
            }
            else if (layoutType == 6)
            {
                j = layoutString.indexOf(",");
                tile.ratio = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(",");
                tile.windowType = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over { */
                
                j = layoutString.indexOf("}");
                tile.tabUrl = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over } */
                
                tile.tabUrl = validateTabUrlScheme(tile.tabUrl);
                
                j = layoutString.indexOf(";");
                tile.zoomLevelInit = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                tile.zoomInit = true;
            }
            else if (layoutType == 7)
            {
                j = layoutString.indexOf(",");
                tile.ratio = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(",");
                tile.windowType = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over { */
                
                j = layoutString.indexOf("}");
                tile.tabUrl = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over } */
                
                tile.tabUrl = validateTabUrlScheme(tile.tabUrl);
                
                j = layoutString.indexOf(",");
                tile.scrollXInit = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(",");
                tile.scrollYInit = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(";");
                tile.scrollLock = (+layoutString.substr(0,j) == 1);
                layoutString = layoutString.substr(j+1);
                
                tile.scrollInit = true;
            }
            else if (layoutType == 8)
            {
                j = layoutString.indexOf(",");
                tile.ratio = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(",");
                tile.windowType = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over { */
                
                j = layoutString.indexOf("}");
                tile.tabUrl = layoutString.substr(0,j);
                layoutString = layoutString.substr(j+2);  /* step over } */
                
                tile.tabUrl = validateTabUrlScheme(tile.tabUrl);
                
                j = layoutString.indexOf(",");
                tile.scrollXInit = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(",");
                tile.scrollYInit = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(",");
                tile.scrollLock = (+layoutString.substr(0,j) == 1);
                layoutString = layoutString.substr(j+1);
                
                j = layoutString.indexOf(";");
                tile.zoomLevelInit = +layoutString.substr(0,j);
                layoutString = layoutString.substr(j+1);
                
                tile.scrollInit = true;
                tile.zoomInit = true;
            }
        }
        else  /* split tile */
        {
            j = layoutString.indexOf(",");
            tile.ratio = +layoutString.substr(0,j);
            layoutString = layoutString.substr(j+1);
            
            j = layoutString.indexOf(";");
            childCount = +layoutString.substr(0,j);
            layoutString = layoutString.substr(j+1);
            
            for (i = 0; i < childCount; i++)
            {
                tile.childTiles[i] = new Tile();
                
                tile.childTiles[i].parentTile = tile;
                
                applyTileString(tile.childTiles[i]);
            }
        }
    }
}

/************************************************************************/

/* Save Layout */

function saveLayout()
{
    if (dialogWindowId != -1)
    {
        chrome.windows.remove(dialogWindowId);
        
        dialogWindowId = -1;
    }
    
    chrome.windows.getLastFocused({ },
    function(focuswin)
    {
        var left,top,width,height;
        
        dialogParentWindowId = focuswin.id;
        
        width = 440 + lrbMarginNormal*2;
        height = 419 + topMargin + lrbMarginNormal + ((platformOS != "win") ? -26 : 0);  /* less header height if not Windows */
        
        left = Math.floor(focuswin.left+(focuswin.width-width)/2);
        top = Math.floor(focuswin.top+(focuswin.height-height)/2);
        
        chrome.windows.create({ type: "popup", url: chrome.runtime.getURL("savelayout.html"),  /* focused: false, */  /* Firefox - does not support focused property */
                                left: left, top: top, width: width, height: height },
        function(newwin)
        {
            chrome.windows.update(newwin.id,{ left: left, top: top, width: width, height: height },
            function(win)  /* Firefox - necessary to correctly position popup window */
            {
                dialogWindowId = newwin.id;
                
                chrome.tabs.setZoom(newwin.tabs[0].id,1.0);
            });
        });
    });
}

function saveLayoutReply(layout,layoutName,layoutType)
{
    chrome.tabs.query({ },
    function(tabs)
    {
        var object = new Object();
        
        updateRecentNames([layoutName],true);
        
        object["layout-string-" + layoutName] = createLayoutString(layout,layoutType,tabs);
        
        chrome.storage.local.set(object);
    });
}

function createLayoutString(layout,layoutType,tabs)
{
    var layoutString;
    
    /* Only layout types 2, 3, 6, 7 & 8 are used for saving */
    
    layoutString = layoutType + "," + layout.windowCount + ";";
    
    createTileString(layout.rootTile);
    
    return layoutString;
    
    function createTileString(tile)
    {
        var i,tabUrl;
        
        if (tile.type == "window")
        {
            tabUrl = "";
            
            for (i = 0; i < tabs.length; i++)
                if (tabs[i].id == tile.tabId) tabUrl = tabs[i].url;
            
            layoutString += "window" + "," + tile.ratio.toFixed(4) + "," + tile.windowType;
            
            if (layoutType == 3)
            {
                layoutString += "," + "{" + tabUrl + "}";
            }
            else if (layoutType == 6)
            {
                layoutString += "," + "{" + tabUrl + "}";
                layoutString += "," + tile.zoomLevel.toFixed(0);
            }
            else if (layoutType == 7)
            {
                layoutString += "," + "{" + tabUrl + "}";
                layoutString += "," + tile.scrollX.toFixed(0);
                layoutString += "," + tile.scrollY.toFixed(0);
                layoutString += "," + (tile.scrollLock ? 1 : 0);
            }
            else if (layoutType == 8)
            {
                layoutString += "," + "{" + tabUrl + "}";
                layoutString += "," + tile.scrollX.toFixed(0);
                layoutString += "," + tile.scrollY.toFixed(0);
                layoutString += "," + (tile.scrollLock ? 1 : 0);
                layoutString += "," + tile.zoomLevel.toFixed(0);
            }
            
            layoutString += ";";
        }
        else  /* split tile */
        {
            layoutString += tile.type + "," + tile.ratio.toFixed(4) + "," + tile.childTiles.length + ";";
            
            for (i = 0; i < tile.childTiles.length; i++)
                createTileString(tile.childTiles[i]);
        }
    }
}

/************************************************************************/

/* Delete Layouts */

function deleteLayouts()
{
    if (dialogWindowId != -1)
    {
        chrome.windows.remove(dialogWindowId);
        
        dialogWindowId = -1;
    }
    
    chrome.windows.getLastFocused({ },
    function(focuswin)
    {
        var left,top,width,height;
        
        dialogParentWindowId = focuswin.id;
        
        width = 440 + lrbMarginNormal*2;
        height = 363 + topMargin + lrbMarginNormal + ((platformOS != "win") ? -28 : 0);  /* less header height if not Windows */
        
        left = Math.floor(focuswin.left+(focuswin.width-width)/2);
        top = Math.floor(focuswin.top+(focuswin.height-height)/2);
        
        chrome.windows.create({ type: "popup", url: chrome.runtime.getURL("deletelayouts.html"), /* focused: false, */  /* Firefox - does not support focused property */
                                left: left, top: top, width: width, height: height },
        function(newwin)
        {
            chrome.windows.update(newwin.id,{ left: left, top: top, width: width, height: height },
            function(win)  /* Firefox - necessary to correctly position popup window */
            {
                dialogWindowId = newwin.id;
                
                chrome.tabs.setZoom(newwin.tabs[0].id,1.0);
            });
        });
    });
}

function deleteLayoutsReply(layoutNames)
{
    var i;
    
    updateRecentNames(layoutNames,false);
    
    for (i = 0; i < layoutNames.length; i++)
    {
        chrome.storage.local.remove("layout-string-" + layoutNames[i]);
    }
}

/************************************************************************/

/* Default Layout */

function defaultLayout()
{
    if (dialogWindowId != -1)
    {
        chrome.windows.remove(dialogWindowId);
        
        dialogWindowId = -1;
    }
    
    chrome.windows.getLastFocused({ },
    function(focuswin)
    {
        var left,top,width,height;
        
        chrome.contextMenus.update("defaultlayout-saved-b",{ checked: false });
        chrome.contextMenus.update("defaultlayout-saved-c",{ checked: false });
        
        dialogParentWindowId = focuswin.id;
        
        width = 440 + lrbMarginNormal*2;
        height = 363 + topMargin + lrbMarginNormal + ((platformOS != "win") ? -28 : 0);  /* less header height if not Windows */
        
        left = Math.floor(focuswin.left+(focuswin.width-width)/2);
        top = Math.floor(focuswin.top+(focuswin.height-height)/2);
        
        chrome.windows.create({ type: "popup", url: chrome.runtime.getURL("defaultlayout.html"), /* focused: false, */  /* Firefox - does not support focused property */
                                left: left, top: top, width: width, height: height },
        function(newwin)
        {
            chrome.windows.update(newwin.id,{ left: left, top: top, width: width, height: height },
            function(win)  /* Firefox - necessary to correctly position popup window */
            {
                dialogWindowId = newwin.id;
                
                chrome.tabs.setZoom(newwin.tabs[0].id,1.0);
            });
        });
    });
}

function defaultLayoutReply(layoutName)
{
    clearDefaultLayoutCheckMarks();
    
    chrome.contextMenus.update("defaultlayout-saved-b",{ checked: true });
    chrome.contextMenus.update("defaultlayout-saved-c",{ checked: true });
    
    chrome.storage.local.set({ "layout-defaultdesign" : "saved", "layout-defaultname": layoutName });
}

/************************************************************************/

/* Window resize event handler functions */

function startEventHandler()
{
    if (enableEventHandler && intervalTimer == null)
    {
        intervalTimer = setInterval(function() { tileEventHandler(); },pollInterval);
    }
}

function stopEventHandler()
{
    if (intervalTimer != null)
    {
        clearInterval(intervalTimer);
        intervalTimer = null;
    }
}

function tileEventHandler()
{
    chrome.windows.getLastFocused({ },
    function(win)
    {
        var i,layout,tile,rtile,diff,stile;
        
        layout = findLayoutByWindowId(win.id);
        
        if (layout == null) return;  /* no layout */
        
        if (layout.tiledView == null) return;  /* layout not visible */
        
        if (layout.expandedTile != null) return;  /* layout has expanded tile */
        
        tile = findTileByWindowId(layout.rootTile,win.id);
        
        if (tile == null) return;  /* not tiled window */
        
        if (win.state != "normal") return;  /* minimized, maximized or fullscreen window */
        
        if (win.left != getTiledWindowLeft(tile) || win.top != getTiledWindowTop(tile) || 
            win.width != getTiledWindowWidth(tile) || win.height != getTiledWindowHeight(tile))  /* update tile for resized tiled window */
        {
            if (win.width != getTiledWindowWidth(tile))  /* horizontal resize */
            {
                resizeHoriz = true;
                
                if (win.left != getTiledWindowLeft(tile))  /* resize left edge */
                {
                    resizeBefore = true;
                    
                    diff = win.width-getTiledWindowWidth(tile);
                    
                    tile.left -= diff;
                    tile.width += diff;
                }
                else  /* resize right edge */
                {
                    resizeBefore = false;
                    
                    diff = win.width-getTiledWindowWidth(tile);
                    
                    tile.width += diff;
                }
            }
            else if (win.height != getTiledWindowHeight(tile))  /* vertical resize */
            {
                resizeHoriz = false;
                
                if (win.top != getTiledWindowTop(tile))  /* resize top edge */
                {
                    resizeBefore = true;
                    
                    diff = win.height-getTiledWindowHeight(tile);
                    
                    tile.top -= diff;
                    tile.height += diff;
                }
                else  /* resize bottom edge */
                {
                    resizeBefore = false;
                    
                    diff = win.height-getTiledWindowHeight(tile);
                    
                    tile.height += diff;
                }
            }
            
            idleCounter = 0;
        }
        else if (idleCounter != -1 && ++idleCounter >= 3)  /* 300 ms delay */
        {
            idleCounter = -1;
            
            if (layout.windowCount >= 2)  /* update tiles for tiled windows adjacent to resized tiled window */
            {        
                rtile = tile;
                
                if (resizeHoriz)
                {
                    if (tile.parentTile.type == "hsplit") diff = tile.width-tile.parentTile.width;
                    else diff = tile.width-Math.round(tile.parentTile.width*tile.ratio);
                    
                    if (resizeBefore) tile.left -= diff;
                    tile.width -= diff;
                    
                    while (rtile.parentTile != null)  /* not at root */
                    {
                        if (rtile.parentTile.type != "vsplit") rtile = rtile.parentTile;
                        else if (rtile.parentTile.childTiles.indexOf(rtile) == (resizeBefore ? 0 : rtile.parentTile.childTiles.length-1)) rtile = rtile.parentTile;
                        else break;
                    }
                    
                    if (rtile.parentTile != null)  /* not at root */
                    {
                        i = rtile.parentTile.childTiles.indexOf(rtile);
                        
                        if (resizeBefore)  /* resize left edge */
                        {
                            stile = rtile.parentTile.childTiles[i-1];
                            
                            if (rtile.width+diff < getTileMinWidth(rtile)) diff = getTileMinWidth(rtile)-rtile.width;
                            else if (stile.width-diff < getTileMinWidth(stile)) diff = stile.width-getTileMinWidth(stile);
                            
                            rtile.left -= diff;
                        }
                        else  /* resize right edge */
                        {
                            stile = rtile.parentTile.childTiles[i+1];
                            
                            if (rtile.width+diff < getTileMinWidth(rtile)) diff = getTileMinWidth(rtile)-rtile.width;
                            else if (stile.width-diff < getTileMinWidth(stile)) diff = stile.width-getTileMinWidth(stile);
                            
                            stile.left += diff;
                        }
                        
                        rtile.width += diff;
                        stile.width -= diff;
                        
                        rtile.ratio = rtile.width/rtile.parentTile.width;
                        stile.ratio = stile.width/stile.parentTile.width;
                   }
                }
                else
                {
                    if (tile.parentTile.type == "vsplit") diff = tile.height-tile.parentTile.height;
                    else diff = tile.height-Math.round(tile.parentTile.height*tile.ratio);
                    
                    if (resizeBefore) tile.top -= diff;
                    tile.height -= diff;
                    
                    while (rtile.parentTile != null)  /* not at root */
                    {
                        if (rtile.parentTile.type != "hsplit") rtile = rtile.parentTile;
                        else if (rtile.parentTile.childTiles.indexOf(rtile) == (resizeBefore ? 0 : rtile.parentTile.childTiles.length-1)) rtile = rtile.parentTile;
                        else break;
                    }
                    
                    if (rtile.parentTile != null)  /* not at root */
                    {
                        i = rtile.parentTile.childTiles.indexOf(rtile);
                        
                        if (resizeBefore)  /* resize top edge */
                        {
                            stile = rtile.parentTile.childTiles[i-1];
                            
                            if (rtile.height+diff < getTileMinHeight(rtile)) diff = getTileMinHeight(rtile)-rtile.height;
                            else if (stile.height-diff < getTileMinHeight(stile)) diff = stile.height-getTileMinHeight(stile);
                            
                            rtile.top -= diff;
                        }
                        else  /* resize bottom edge */
                        {
                            stile = rtile.parentTile.childTiles[i+1];
                            
                            if (rtile.height+diff < getTileMinHeight(rtile)) diff = getTileMinHeight(rtile)-rtile.height;
                            else if (stile.height-diff < getTileMinHeight(stile)) diff = stile.height-getTileMinHeight(stile);
                            
                            stile.top += diff;
                        }
                        
                        rtile.height += diff;
                        stile.height -= diff;
                        
                        rtile.ratio = rtile.height/rtile.parentTile.height;
                        stile.ratio = stile.height/stile.parentTile.height;
                    }
                }
            }
            
            adjustLayout(layout);
            
            redrawLayout(layout);
        }
    });
}

function redrawLayout(layout)
{        
    updateTile(layout.rootTile);
    
    function updateTile(tile)
    {
        var i;
        
        if (tile.type == "window")
        {
            chrome.windows.update(tile.windowId,{ left: getTiledWindowLeft(tile), top: getTiledWindowTop(tile),
                                                  width: getTiledWindowWidth(tile), height: getTiledWindowHeight(tile) },
            function(win)
            {
            });
        }
        else  /* split tile */
        {
            for (i = 0; i < tile.childTiles.length; i++)
                updateTile(tile.childTiles[i]);
        }
    }
}

/************************************************************************/

/* Check for menu create/remove errors */

function checkMenuError()
{
    if (chrome.runtime.lastError != null) ;  /* ignore menu create/remove errors due to CPU overload */
}

/************************************************************************/

/* Check for sendMessage errors */

function checkError()
{
    if (chrome.runtime.lastError == null) ;
    else if (chrome.runtime.lastError.message == "Could not establish connection. Receiving end does not exist.") ;  /* Chrome & Firefox - ignore */
    else if (chrome.runtime.lastError.message == "The message port closed before a response was received.") ;  /* Chrome - ignore */
    else if (chrome.runtime.lastError.message == "Message manager disconnected") ;  /* Firefox - ignore */
    else console.log("Tile Tabs WE - " + chrome.runtime.lastError.message);
}

/************************************************************************/

/* Display alert notification */

function alertNotify(message)
{
    chrome.notifications.create("alert",{ type: "basic", iconUrl: "icon32.png", title: "TILE TABS WE", message: "" + message });
}

/************************************************************************/

/* Display debug notification */

function debugNotify(message)
{
    chrome.notifications.create("debug",{ type: "basic", iconUrl: "icon32.png", title: "TILE TABS WE - DEBUG", message: "" + message });
}

/************************************************************************/
