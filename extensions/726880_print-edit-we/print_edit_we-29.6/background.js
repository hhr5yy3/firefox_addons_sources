/************************************************************************/
/*                                                                      */
/*      Print Edit WE - Generic WebExtension - Background Page          */
/*                                                                      */
/*      Javascript for Background Page                                  */
/*                                                                      */
/*      Last Edit - 26 Jul 2023                                         */
/*                                                                      */
/*      Copyright (C) 2010-2023 DW-dev                                  */
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
/*  https://developer.chrome.com/extensions/downloads                   */
/*  https://developer.chrome.com/extensions/notifications               */
/*  https://developer.chrome.com/extensions/pageCapture                 */
/*  https://developer.chrome.com/extensions/runtime                     */
/*  https://developer.chrome.com/extensions/storage                     */
/*  https://developer.chrome.com/extensions/tabs                        */
/*  https://developer.chrome.com/extensions/webNavigation               */
/*  https://developer.chrome.com/extensions/webRequest                  */
/*  https://developer.chrome.com/extensions/windows                     */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Manifest Host Permissions                                           */
/*                                                                      */
/*  In order to listen for XMLHttpRequest and WebSocket requests on     */
/*  http:, https: and file: pages using chrome.webRequest listeners,    */
/*  the host permissions in the manifest file must be:                  */
/*                                                                      */
/*  Firefox - "<all_urls>" or                                           */
/*          - "http:", "https", "ws:", "wss:", "activeTab"              */
/*                                                                      */
/*  Chrome  - "<all_urls>" only                                         */
/*          - Chrome Web Store does not recognize "ws:" or "wss:"       */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Main Frame and Sub-Frame Content Scripts                            */
/*                                                                      */
/*  1. Main Frame - Main Content Script                                 */
/*                                                                      */
/*     - any page in main frame                                         */
/*                                                                      */
/*  2. Accessible Sub-Frames - Main Content Script                      */
/*                                                                      */
/*     - same-origin page in  <frame>                                   */
/*     - same-origin page in  <iframe>                                  */
/*     - same-origin page in  <iframe sandbox="...">  +ASO              */
/*                                                                      */
/*  3. Non-Accessible Scriptable Sub-Frames - Frame Content Script      */
/*                                                                      */
/*     - same-origin page in  <iframe sandbox="...">  -ASO +AS          */
/*     - cross-origin page in <frame>                                   */
/*     - cross-origin page in <iframe>                                  */
/*     - cross-origin page in <iframe sandbox="...">  +AS               */
/*                                                                      */
/*  4. Non-Accessible Non-Scriptable Sub-Frames - No Content Script     */
/*                                                                      */
/*     - same-origin page in  <iframe sandbox="...">  -ASO -AS          */
/*     - cross-origin page in <iframe sandbox="...">  +AS               */
/*                                                                      */
/*  5. Sandbox Option Abbreviations                                     */
/*                                                                      */
/*     +AS = with 'allow-scripts'                                       */
/*     -AS = without 'allow-scripts'                                    */
/*     +ASO = with 'allow-same-origin'                                  */
/*     -ASO = without 'allow-same-origin'                               */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Tab Current Modes                                                   */
/*                                                                      */
/*   undefined = Tab does not exist or URL never committed              */
/*          -3 = Tab closed                                             */
/*          -2 = URL committed                                          */
/*          -1 = Script loaded and GUI initialized                      */
/*           0 = Transitioning - blocking web requests                  */
/*           1 = Suspended - blocking web requests                      */
/*           2 = Editing - blocking web requests                        */
/*                                                                      */
/************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;
var ffVersion;

var platformOS;

var savePageId = "";

var zoomPageId = "";

var doubleClose,showSubmenu;

var savedFileName,replaceSpaces,replaceChar,maxFileNameLength;

var tabCurModes = new Array();

var restoreZoomFactor = new Array();

var saveAsPDFActive = new Array();

var buttonDoubleTimeout = null;

var debugEnable = false;

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
            
            savePageId = "savepage-we@DW-dev";
            zoomPageId = "zoompage-we@DW-dev";
            
            chrome.storage.local.set({ "environment-savepageid": savePageId });
            
            initialize();
        });
    }
    else
    {
        chrome.management.getSelf(
        function(extensionInfo)
        {
            savePageId = (extensionInfo.installType == "normal") ? "dhhpefjklgkmgeafimnjhojgjamoafof" : "blimmiepcfbdegadmdfklomfacdmdono" ;
            zoomPageId = (extensionInfo.installType == "normal") ? "bcdjhkphgmiapajkphennjfgoehpodpk" : "gcoafiobmljnbdeojhfobbjhfejjglhg";
            
            chrome.storage.local.set({ "environment-savepageid": savePageId });
            
            initialize();
        });
    }
});

function initialize()
{
    chrome.storage.local.get(null,
    function(object)
    {
        var contexts = new Array();
        
        /* Initialize or migrate options */
        
        /* General options */
        
        if (!("options-button-doubleclose" in object)) object["options-button-doubleclose"] = true;
        if (!("options-context-showsubmenu" in object)) object["options-context-showsubmenu"] = true;
        if (!("options-hide-select" in object)) object["options-hide-select"] = false;
        if (!("options-format-inspect" in object)) object["options-format-inspect"] = true;
        if (!("options-undo-reinstate" in object)) object["options-undo-reinstate"] = true;
        if (!("options-textpieces-breaks" in object)) object["options-textpieces-breaks"] = true;
        if (!("options-viewmore-enable" in object)) object["options-viewmore-enable"] = false;
        if (!("options-textpieces-enable" in object)) object["options-textpieces-enable"] = false;
        if (!("options-webstyle-enable" in object)) object["options-webstyle-enable"] = false;
        if (!("options-graphics-delete" in object)) object["options-graphics-delete"] = false;
        if (!("options-images-nobreaks" in object)) object["options-images-nobreaks"] = true;
        if (!("options-fonts-noligatures" in object)) object["options-fonts-noligatures"] = true;
        if (!("options-links-hideshowurls" in object)) object["options-links-hideshowurls"] =
            ("options-links-nourls" in object) ? object["options-links-nourls"] : false;  /* Version 24.1-27.0 */
        if (!("options-links-urlsvisibility" in object)) object["options-links-urlsvisibility"] = "0";
        if (!("options-preview-autoclose" in object)) object["options-preview-autoclose"] = false;
        if (!("options-close-donotask" in object)) object["options-close-donotask"] = false;
        if (!("options-unload-askonly" in object)) object["options-unload-askonly"] = false;
        
        if (!("options-select-border" in object)) object["options-select-border"] = false;
        if (!("options-select-area" in object)) object["options-select-area"] = true;
        if (!("options-capture-snap" in object)) object["options-capture-snap"] = true;
        
        /* Save As HTML options */
        
        if (!("options-savehtml-saveditems" in object)) object["options-savehtml-saveditems"] =
            ("options-savehtml-newaction" in object) ? object["options-savehtml-newaction"] : 1;  /* Version 23.12-29.2  */
        
        /* Save As MHTML options */
        
        if (!("options-savemhtml-savedfilename" in object)) object["options-savemhtml-savedfilename"] = "%TITLE%";
        
        if (!("options-savemhtml-replacespaces" in object)) object["options-savemhtml-replacespaces"] = false;
        
        if (!("options-savemhtml-replacechar" in object)) object["options-savemhtml-replacechar"] = "-";
        
        if (!("options-savemhtml-maxfilenamelength" in object)) object["options-savemhtml-maxfilenamelength"] = 150;
        
        /* Save As PDF options */
        
        if (!("options-savepdf-papersize" in object)) object["options-savepdf-papersize"] =
            ("options-layout-papersize" in object) ? object["options-layout-papersize"] : 1;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-orientation" in object)) object["options-savepdf-orientation"] =
            ("options-layout-orientation" in object) ? object["options-layout-orientation"] : 0;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-paperwidth" in object)) object["options-savepdf-paperwidth"] = 8.3;
            
        if (!("options-savepdf-paperheight" in object)) object["options-savepdf-paperheight"] = 11.7;
            
        if (!("options-savepdf-scaling" in object)) object["options-savepdf-scaling"] =
            ("options-layout-scaling" in object) ? object["options-layout-scaling"] : 100;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-shrinktofit" in object)) object["options-savepdf-shrinktofit"] =
            ("options-layout-shrinktofit" in object) ? object["options-layout-shrinktofit"] : true;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-backgroundcolors" in object)) object["options-savepdf-backgroundcolors"] =
            ("options-background-colors" in object) ? object["options-background-colors"] : false;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-backgroundimages" in object)) object["options-savepdf-backgroundimages"] =
            ("options-background-images" in object) ? object["options-background-images"] : false;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-edgeleft" in object)) object["options-savepdf-edgeleft"] = 0.0;
            
        if (!("options-savepdf-edgeright" in object)) object["options-savepdf-edgeright"] = 0.0;
            
        if (!("options-savepdf-edgetop" in object)) object["options-savepdf-edgetop"] = 0.0;
            
        if (!("options-savepdf-edgebottom" in object)) object["options-savepdf-edgebottom"] = 0.0;
            
        if (!("options-savepdf-marginleft" in object)) object["options-savepdf-marginleft"] =
            ("options-margin-left" in object) ? object["options-margin-left"] : 0.5;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-marginright" in object)) object["options-savepdf-marginright"] =
            ("options-margin-right" in object) ? object["options-margin-right"] : 0.5;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-margintop" in object)) object["options-savepdf-margintop"] =
            ("options-margin-top" in object) ? object["options-margin-top"] : 0.5;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-marginbottom" in object)) object["options-savepdf-marginbottom"] =
            ("options-margin-bottom" in object) ? object["options-margin-bottom"] : 0.5;  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-headerleft" in object)) object["options-savepdf-headerleft"] =
            ("options-header-left" in object) ? object["options-header-left"] : "&T";  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-headercenter" in object)) object["options-savepdf-headercenter"] =
            ("options-header-center" in object) ? object["options-header-center"] : "";  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-headerright" in object)) object["options-savepdf-headerright"] =
            ("options-header-right" in object) ? object["options-header-right"] : "&U";  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-footerleft" in object)) object["options-savepdf-footerleft"] =
            ("options-footer-left" in object) ? object["options-footer-left"] : "&PT";  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-footercenter" in object)) object["options-savepdf-footercenter"] =
            ("options-footer-center" in object) ? object["options-footer-center"] : "";  /* Version 19.0-20.1 */
            
        if (!("options-savepdf-footerright" in object)) object["options-savepdf-footerright"] =
            ("options-footer-right" in object) ? object["options-footer-right"] : "&D";  /* Version 19.0-20.1 */
        
        if (!("options-savepdf-savedfilename" in object)) object["options-savepdf-savedfilename"] = "%TITLE%";
        
        if (!("options-savepdf-replacespaces" in object)) object["options-savepdf-replacespaces"] = false;
        
        if (!("options-savepdf-replacechar" in object)) object["options-savepdf-replacechar"] = "-";
        
        if (!("options-savepdf-maxfilenamelength" in object)) object["options-savepdf-maxfilenamelength"] = 150;

        /* Format Properties - States */
        
        if (!("format-position" in object)) object["format-position"] = false;
        if (!("format-left" in object)) object["format-left"] = false;
        if (!("format-top" in object)) object["format-top"] = false;
        if (!("format-width" in object)) object["format-width"] = false;
        if (!("format-height" in object)) object["format-height"] = false;
        if (!("format-margin-l" in object)) object["format-margin-l"] = false;
        if (!("format-margin-r" in object)) object["format-margin-r"] = false;
        if (!("format-margin-t" in object)) object["format-margin-t"] = false;
        if (!("format-margin-b" in object)) object["format-margin-b"] = false;
        if (!("format-padding-l" in object)) object["format-padding-l"] = false;
        if (!("format-padding-r" in object)) object["format-padding-r"] = false;
        if (!("format-padding-t" in object)) object["format-padding-t"] = false;
        if (!("format-padding-b" in object)) object["format-padding-b"] = false;
        if (!("format-float" in object)) object["format-float"] = false;
        if (!("format-clear" in object)) object["format-clear"] = false;
        if (!("format-pagebreak" in object)) object["format-pagebreak"] = false;
        
        if (!("format-color" in object)) object["format-color"] = false;
        if (!("format-background" in object)) object["format-background"] = false;
        if (!("format-fontfamily" in object)) object["format-fontfamily"] = false;
        if (!("format-fontstyle" in object)) object["format-fontstyle"] = false;
        if (!("format-fontsize" in object)) object["format-fontsize"] = false;
        if (!("format-lineheight" in object)) object["format-lineheight"] = false;
        if (!("format-verticalalign" in object)) object["format-verticalalign"] = false;
        if (!("format-textalign" in object)) object["format-textalign"] = false;
        if (!("format-textdecoration" in object)) object["format-textdecoration"] = false;
        if (!("format-texttransform" in object)) object["format-texttransform"] = false;
        if (!("format-liststyle" in object)) object["format-liststyle"] = false;
        if (!("format-tableborder" in object)) object["format-tableborder"] = false;
        if (!("format-whitespace" in object)) object["format-whitespace"] = false;
        if (!("format-border" in object)) object["format-border"] = false;
        if (!("format-outline" in object)) object["format-outline"] = false;
        if (!("format-overflow" in object)) object["format-overflow"] = false;
        
        /* Format Properties - Values */
        
        if (!("format-position-value" in object)) object["format-position-value"] = "static";
        if (!("format-left-value" in object)) object["format-left-value"] = "auto";
        if (!("format-top-value" in object)) object["format-top-value"] = "auto";
        if (!("format-width-value" in object)) object["format-width-value"] = "auto";
        if (!("format-height-value" in object)) object["format-height-value"] = "auto";
        if (!("format-margin-l-value" in object)) object["format-margin-l-value"] = "0px";
        if (!("format-margin-r-value" in object)) object["format-margin-r-value"] = "0px";
        if (!("format-margin-t-value" in object)) object["format-margin-t-value"] = "0px";
        if (!("format-margin-b-value" in object)) object["format-margin-b-value"] = "0px";
        if (!("format-padding-l-value" in object)) object["format-padding-l-value"] = "0px";
        if (!("format-padding-r-value" in object)) object["format-padding-r-value"] = "0px";
        if (!("format-padding-t-value" in object)) object["format-padding-t-value"] = "0px";
        if (!("format-padding-b-value" in object)) object["format-padding-b-value"] = "0px";
        if (!("format-float-value" in object)) object["format-float-value"] = "none";
        if (!("format-clear-value" in object)) object["format-clear-value"] = "none";
        if (!("format-pagebreak-value" in object)) object["format-pagebreak-value"] = "auto";
        
        if (!("format-color-value" in object)) object["format-color-value"] = "black";
        if (!("format-background-value" in object)) object["format-background-value"] = "transparent";
        if (!("format-fontfamily-value" in object)) object["format-fontfamily-value"] = "Arial";
        if (!("format-fontstyle-value" in object)) object["format-fontstyle-value"] = "normal";
        if (!("format-fontsize-value" in object)) object["format-fontsize-value"] = "10px";
        if (!("format-lineheight-value" in object)) object["format-lineheight-value"] = "1.0";
        if (!("format-verticalalign-value" in object)) object["format-verticalalign-value"] = "baseline";
        if (!("format-textalign-value" in object)) object["format-textalign-value"] = "left";
        if (!("format-textdecoration-value" in object)) object["format-textdecoration-value"] = "none";
        if (!("format-texttransform-value" in object)) object["format-texttransform-value"] = "none";
        if (!("format-liststyle-value" in object)) object["format-liststyle-value"] = "none";
        if (!("format-tableborder-value" in object)) object["format-tableborder-value"] = "collapse";
        if (!("format-whitespace-value" in object)) object["format-whitespace-value"] = "normal";
        if (!("format-border-value" in object)) object["format-border-value"] = "0px";
        if (!("format-outline-value" in object)) object["format-outline-value"] = "0px";
        if (!("format-overflow-value" in object)) object["format-overflow-value"] = "visible";
        
        /* Format Controls */
        
        if (!("format-subelements" in object)) object["format-subelements"] = false;
        if (!("format-important" in object)) object["format-important"] = false;
        if (!("format-restrict" in object)) object["format-restrict"] = false;
        if (!("format-restrict-mode" in object)) object["format-restrict-mode"] = "only";
        if (!("format-restrict-type" in object)) object["format-restrict-type"] = "div";
        
        /* Format Show Properties */
        
        if (!("format-showprops" in object)) object["format-showprops"] = false;
        
        /* Text Insert Type */
        
        if (!("text-insert-type" in object)) object["text-insert-type"] = "ib";
        
        /* Help Show Pane */
        
        if (!("help-showpane" in object)) object["help-showpane"] = "button";
        
        /* Update stored options */
        
        chrome.storage.local.set(object);
        
        /* Initialize local options */
        
        doubleClose = object["options-button-doubleclose"];
        showSubmenu = object["options-context-showsubmenu"];
        
        if (isFirefox)
        {
            savedFileName = object["options-savepdf-savedfilename"];
            replaceSpaces = object["options-savepdf-replacespaces"];
            replaceChar = object["options-savepdf-replacechar"];
            maxFileNameLength = object["options-savepdf-maxfilenamelength"];
        }
        else
        {
            savedFileName = object["options-savemhtml-savedfilename"];
            replaceSpaces = object["options-savemhtml-replacespaces"];
            replaceChar = object["options-savemhtml-replacechar"];
            maxFileNameLength = object["options-savemhtml-maxfilenamelength"];
        }
        
        /* Create context menu items */
        
        contexts = showSubmenu ? [ "all" ] : [ "browser_action" ];
        
        chrome.contextMenus.create({ id: "startclose", title: "Start Editing", contexts: contexts, enabled: true });
        chrome.contextMenus.create({ id: "suspendresume", title: "Suspend Editing", contexts: contexts, enabled: false });
        chrome.contextMenus.create({ id: "printpreview", title: "Print Preview", contexts: contexts, enabled: true });
        chrome.contextMenus.create({ id: "print", title: "Print...", contexts: contexts, enabled: true });
        
        if (!isFirefox)
        {
            chrome.contextMenus.create({ id: "saveasmhtml", title: "Save As MHTML", contexts: contexts, enabled: true });
        }
        
        if (isFirefox && ((ffVersion >= 75 && platformOS != "mac") || (ffVersion >= 81 && platformOS == "mac")))
        {
            chrome.contextMenus.create({ id: "saveaspdf", title: "Save As PDF", contexts: contexts, enabled: true });
        }
        
        /* Update browser action and context menus for first tab */
        
        chrome.tabs.query({ lastFocusedWindow: true, active: true },
        function(tabs)
        {
            updateBrowserAction(tabs[0].id,tabs[0].url);
            
            updateContextMenus();
        });
        
        /* Add listeners */
        
        addListeners();
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
        var contexts = new Array();
        
        if ("options-button-doubleclose" in changes) doubleClose = changes["options-button-doubleclose"].newValue;
        if ("options-context-showsubmenu" in changes) showSubmenu = changes["options-context-showsubmenu"].newValue;
        
        if (isFirefox)
        {
            if ("options-savepdf-savedfilename" in changes) savedFileName = changes["options-savepdf-savedfilename"].newValue;
            if ("options-savepdf-replacespaces" in changes) replaceSpaces = changes["options-savepdf-replacespaces"].newValue;
            if ("options-savepdf-replacechar" in changes) replaceChar = changes["options-savepdf-replacechar"].newValue;
            if ("options-savepdf-maxfilenamelength" in changes) maxFileNameLength = changes["options-savepdf-maxfilenamelength"].newValue;
        }
        else
        {
            if ("options-savemhtml-savedfilename" in changes) savedFileName = changes["options-savemhtml-savedfilename"].newValue;
            if ("options-savemhtml-replacespaces" in changes) replaceSpaces = changes["options-savemhtml-replacespaces"].newValue;
            if ("options-savemhtml-replacechar" in changes) replaceChar = changes["options-savemhtml-replacechar"].newValue;
            if ("options-savemhtml-maxfilenamelength" in changes) maxFileNameLength = changes["options-savemhtml-maxfilenamelength"].newValue;
        }
        
        if ("options-context-showsubmenu" in changes)
        {
            contexts = showSubmenu ? [ "all" ] : [ "browser_action" ];
            
            chrome.contextMenus.update("startclose",{ contexts: contexts });
            chrome.contextMenus.update("suspendresume",{ contexts: contexts });
            chrome.contextMenus.update("printpreview",{ contexts: contexts });
            chrome.contextMenus.update("print",{ contexts: contexts });
            
            if (!isFirefox)
            {
                chrome.contextMenus.update("saveasmhtml",{ contexts: contexts });
            }
            
            if (isFirefox && ((ffVersion >= 75 && platformOS != "mac") || (ffVersion >= 81 && platformOS == "mac")))
            {
                chrome.contextMenus.update("saveaspdf",{ contexts: contexts });
            }
        }
    });
    
    /* Browser action listener */
    
    chrome.browserAction.onClicked.addListener(
    function(tab)
    {
        if (doubleClose && buttonDoubleTimeout != null)
        {
            window.clearTimeout(buttonDoubleTimeout);
            buttonDoubleTimeout = null;
            
            initiateAction(tab,true);
        }
        else
        {
            initiateAction(tab,false);
            
            buttonDoubleTimeout = window.setTimeout(
            function()
            {
                window.clearTimeout(buttonDoubleTimeout);
                buttonDoubleTimeout = null;
            },400);  /* allow time to detect double-click */
        }
    });
    
    /* Keyboard command listener */
    
    chrome.commands.onCommand.addListener(
    function(command)
    {
        chrome.tabs.query({ lastFocusedWindow: true, active: true },
        function(tabs)
        {
            if (command == "printpreview")
            {
                if (isFirefox && ffVersion >= 56) chrome.tabs.printPreview();
                else chrome.tabs.executeScript(tabs[0].id,{ code: "window.print();" });
            }
        });
    });
    
    /* Context menu listener */
    
    chrome.contextMenus.onClicked.addListener(
    function(info,tab)
    {
        if (info.menuItemId == "startclose")
        {
            initiateAction(tab,true);
        }
        else if (info.menuItemId == "suspendresume")
        {
            initiateAction(tab,false);
        }
        else if (info.menuItemId == "printpreview")
        {
            if (isFirefox && ffVersion >= 56) chrome.tabs.printPreview();
            else chrome.tabs.executeScript(tab.id,{ code: "window.print();" });
        }
        else if (info.menuItemId == "print")
        {
            if (isFirefox && ffVersion >= 56) chrome.tabs.print();
            else chrome.tabs.executeScript(tab.id,{ code: "window.print();" });
        }
        else if (info.menuItemId == "saveasmhtml")
        {
            if (!isFirefox) savePageAsMHTML(tab,false);
        }
        else if (info.menuItemId == "saveaspdf")
        {
            if (isFirefox && ((ffVersion >= 75 && platformOS != "mac") || (ffVersion >= 81 && platformOS == "mac"))) savePageAsPDF(tab,false);
        }
    });
    
    /* Tab event listeners */
    
    chrome.tabs.onActivated.addListener(  /* tab selected */
    function(activeInfo)
    {
        chrome.tabs.get(activeInfo.tabId,
        function(tab)
        {
            if (chrome.runtime.lastError == null)  /* in case tab does not exist */
            {
                updateBrowserAction(tab.id,tab.url);
                
                updateContextMenus();
            }
        });
    });
    
    chrome.tabs.onUpdated.addListener(  /* URL updated */
    function(tabId,changeInfo,tab)
    {
        updateBrowserAction(tab.id,tab.url);
        
        updateContextMenus();
    });
    
    chrome.tabs.onRemoved.addListener(
    function(tabId,removeInfo)
    {
        tabCurModes[tabId] = -3;  /* closed */
        
        updateContextMenus();
    });
    
    /* Web navigation listeners */
    
    chrome.webNavigation.onCommitted.addListener(
    function(details)
    {
        if (details.frameId == 0)
        {
            tabCurModes[details.tabId] = -2;  /* URL committed */
            
            updateBrowserAction(details.tabId,details.url);
            
            updateContextMenus();
        }
    });
    
    chrome.webNavigation.onCompleted.addListener(  /* page loaded */
    function(details)
    {
        /* Firefox - listener called as if page load when download popup window opens - see Bug 1441474 */
        
        chrome.tabs.get(details.tabId,
        function(tab)
        {
            if (chrome.runtime.lastError == null)  /* in case tab does not exist */
            {
                if (details.frameId == 0 && details.url != tab.url) return;  /* Firefox - workaround for when download popup window opens */
                
                if (details.frameId == 0)
                {
                    updateBrowserAction(details.tabId,details.url);
                    
                    updateContextMenus();
                }
            }
        });
    });
    
    /* Web request listeners */
    
    chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        if (debugEnable) webRequestLog("oBR-1",details);
        
        if (typeof tabCurModes[details.tabId] == "undefined" || tabCurModes[details.tabId] < 0) return;  /* not blocking HTTP */
        
        if (debugEnable) webRequestLog("oBR-2",details);
        
        if (details.type == "main_frame")  /* main-frame request (reload or navigation) */
        {
            tabCurModes[details.tabId] = -2;  /* url committed */
            
            updateBrowserAction(details.tabId,details.url);
            
            updateContextMenus();
            
            return;  /* leave page */
        }
        else  /* sub-frame or resource request */
        {
            if (saveAsPDFActive[details.tabId] && (details.type == "font" || details.type == "image" || details.type == "imageset")) return;  /* Save As PDF - allow request */
            
            return { cancel: true };  /* cancel request */
        }
    }
    ,{ urls: ["<all_urls>"] },["blocking"]);
    
    chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details)
    {
        if (debugEnable) webRequestLog("oBS-1",details);
        
        if (typeof tabCurModes[details.tabId] == "undefined" || tabCurModes[details.tabId] < 0) return;  /* not blocking HTTP */
        
        if (debugEnable) webRequestLog("oBS-2",details);
        
        if (details.type == "main_frame")  /* main-frame request (reload or navigation) */
        {
            /* onBeforeRequest leave failed */
            
            tabCurModes[details.tabId] = -2;  /* url committed */
            
            updateBrowserAction(details.tabId,details.url);
            
            updateContextMenus();
            
            alertNotify("Print Edit WE warning: PE-BS-1\n" +
                        "Please e-mail support at: dw-dev@gmx.com");
                        
            return;  /* leave page */
        }
        else  /* sub-frame or resource request */
        {
            if (saveAsPDFActive[details.tabId] && (details.type == "font" || details.type == "image" || details.type == "imageset")) return;  /* Save As PDF - allow request */
            
            /* onBeforeRequest cancel failed */
            
            alertNotify("Print Edit WE warning: PE-BS-2\n" +
                        "Resource type: " + details.type + "\n" +
                        "Please e-mail support at: dw-dev@gmx.com");
                        
            return { cancel: true };  /* cancel request */
        }
    }
    ,{ urls: ["<all_urls>"] },["blocking"]);
    
    chrome.webRequest.onSendHeaders.addListener(
    function(details)
    {
        if (debugEnable) webRequestLog("oSH-1",details);
        
        if (typeof tabCurModes[details.tabId] == "undefined" || tabCurModes[details.tabId] < 0) return;  /* not blocking HTTP */
        
        if (debugEnable) webRequestLog("oSH-2",details);
        
        if (details.type == "main_frame")  /* main-frame request (reload or navigation) */
        {
            /* onBeforeSendHeaders leave failed */
            
            chrome.tabs.sendMessage(details.tabId,{ type: "removeBeforeUnload" },checkError);  /* avoid multiple unload prompts */
            
            chrome.tabs.remove(details.tabId);  /* terminate print edit session */
            
            tabCurModes[details.tabId] = -3;  /* closed */
            
            updateContextMenus();
            
            alertNotify("Print Edit WE error: PE-SH-1\n" +
                        "Please e-mail support at: dw-dev@gmx.com");
        }
        else  /* sub-frame or resource request */
        {
            if (saveAsPDFActive[details.tabId] && (details.type == "font" || details.type == "image" || details.type == "imageset")) return;  /* Save As PDF - allow request */
            
            if (tabCurModes[details.tabId] == 0) return;  /* transitioning - allow request */
            
            /* onBeforeSendHeaders cancel failed */
            
            chrome.tabs.sendMessage(details.tabId,{ type: "removeBeforeUnload" },checkError);  /* avoid multiple unload prompts */
            
            chrome.tabs.remove(details.tabId);  /* terminate print edit session */
            
            tabCurModes[details.tabId] = -3;  /* closed */
            
            updateContextMenus();
            
            alertNotify("Print Edit WE error: PE-SH-2\n" +
                        "Resource type: " + details.type + "\n" +
                        "Please e-mail support at: dw-dev@gmx.com");
        }
    }
    ,{ urls: ["<all_urls>"] });
    
    /* Message received listener */
    
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        switch (message.type)
        {
            /* Messages from content script */
            
            case "scriptLoaded":
                
                chrome.tabs.sendMessage(sender.tab.id,{ type: "initializeGUI" },checkError);
                
                break;
                
            case "setCurMode":
                
                tabCurModes[sender.tab.id] = message.curmode;
                
                updateBrowserAction(sender.tab.id,sender.tab.url);
                
                updateContextMenus();
                
                break;
                
            case "frameStart":
                
                chrome.tabs.sendMessage(sender.tab.id,{ type: "frameStart" },checkError);
                    
                break;
                
            case "frameFinish":
                
                chrome.tabs.sendMessage(sender.tab.id,{ type: "frameFinish" },checkError);
                    
                break;
                
            case "backupZoom":
                
                chrome.tabs.getZoom(sender.tab.id,
                function(zoomFactor)
                {
                    restoreZoomFactor[sender.tab.id] = zoomFactor;
                });
                
                break;
                
            case "resetZoom":
                
                chrome.tabs.setZoom(sender.tab.id,1.0,
                function()
                {
                    chrome.runtime.sendMessage(zoomPageId,{ type: "externalReset" },checkError);
                });
                
                break;
                
            case "restoreZoom":
                
                chrome.tabs.setZoom(sender.tab.id,restoreZoomFactor[sender.tab.id],
                function()
                {
                });
                
                break;
                
            case "saveHTML":
                
                /* Include 'action' argument for backwards compatibility with earlier versions of Save Page WE */
                
                chrome.runtime.sendMessage(savePageId,{ type: "externalSaveStart", action: message.saveditems, saveditems: message.saveditems, swapdevices: message.swapdevices },
                function(object)
                {
                    if (chrome.runtime.lastError != null)
                    {
                        chrome.tabs.sendMessage(sender.tab.id,{ type: "saveDone", savetype: 0, success: false },checkError);
                        
                        alertNotify("To use the 'Save As HTML' feature,\n" +
                                    "'Save Page WE' (version 14.0 or later)\n" +
                                    "must be installed and enabled.");
                    }
                });
                
                break;
                
            case "saveMHTML":  /* not available for Firefox */
                
                savePageAsMHTML(sender.tab,true);
                
                break;
                
            case "savePDF":  /* not available for Firefox < 56 on Windows/Linux or for Firefox < 81 on Mac OS X or for Chrome */
                
                savePageAsPDF(sender.tab,true);
                
                break;
                
            case "printPreview":
                
                if (isFirefox && ffVersion >= 56) chrome.tabs.printPreview();
                else chrome.tabs.executeScript(sender.tab.id,{ code: "window.print();" });
                
                break;
                
            case "openOptions":
                
                chrome.runtime.openOptionsPage();
                
                break;
                
            case "getPDFFileName":
                
                /* Firefox - chrome.tabs.saveAsPDF() did not support toFileName parameter until Firefox 75 - see Bug 1483590 */
                
                var filename;
                
                filename = getSavedFileName(sender.tab.url,sender.tab.title,"");  /* chrome.tabs.saveAsPDF() added .pdf until Firefox 75 */
                
                sendResponse({ filename: filename });
                
                break;
        }
    });
    
    /* External message received listener */
    
    chrome.runtime.onMessageExternal.addListener(
    function(message,sender,sendResponse)
    {
        switch (message.type)
        {
            /* Messages from another add-on */
            
            case "externalSaveDone":
                
                if (sender.id == savePageId)
                {
                    chrome.tabs.sendMessage(message.tabid,{ type: "saveDone", savetype: 0, success: message.success },checkError);
                }
                
                break;
        }
    });
}

/************************************************************************/

/* Initiate action function */

function initiateAction(tab,startclose)
{
    var i;
    var resources = new Array("toolbar","inspect-panel","select-menu","deleteexcept-menu","format-panel",
                              "text-panel","save-menu","savepdf-panel","tools-menu","help-panel");
    
    /* Workarounds for Yahoo! Mail print window */
    /* Firefox - url scheme is "wyciwyg:" */
    /* Chrome - url is "" */
    /* Chrome - executeScript() needs "matchAboutBlank: true" */
    
    if (!(allowedScheme(tab.url) || tab.url.substr(0,8) == "wyciwyg:" || tab.url == "") || specialPage(tab.url))
    {
        alertNotify("Cannot be used with this page.");
    }
    else if (tab.status != "complete")
    {
        alertNotify("Page is not ready.");
    }
    else
    {
        if (typeof tabCurModes[tab.id] == "undefined" || tabCurModes[tab.id] <= -2 )  /* script not loaded */
        {
            for (i = 0; i < resources.length; i++)
            {
                chrome.tabs.insertCSS(tab.id,{ file: "/" + resources[i] + ".css", cssOrigin: "author" });
            }
            
            chrome.tabs.executeScript(tab.id,{ file: "content.js", matchAboutBlank: true });
            
            chrome.tabs.executeScript(tab.id,{ file: "content-frame.js", matchAboutBlank: true, allFrames: true });
        }
        else if (tabCurModes[tab.id] == -1)  /* script loaded and GUI initialized */
        {
            chrome.tabs.sendMessage(tab.id,{ type: "startEditing" },checkError);
        }
        else if (tabCurModes[tab.id] == 0)  /* transitioning */
        {
        }
        else if (tabCurModes[tab.id] == 1 || tabCurModes[tab.id] == 2)  /* suspended or editing */
        {
            if (startclose) chrome.tabs.sendMessage(tab.id,{ type: "closeEditing" },checkError);
            else chrome.tabs.sendMessage(tab.id,{ type: "toggleMode" },checkError);
        }
    }
}

/************************************************************************/

/* Allowed scheme function */

function allowedScheme(url)
{
    return (url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:");
}

/************************************************************************/

/* Special page function */

function specialPage(url)
{
    return (url.substr(0,6) == "about:" || url.substr(0,7) == "chrome:" || url.substr(0,12) == "view-source:" ||
            url.substr(0,14) == "moz-extension:" || url.substr(0,26) == "https://addons.mozilla.org" || url.substr(0,27) == "https://support.mozilla.org" ||
            url.substr(0,17) == "chrome-extension:" || url.substr(0,34) == "https://chrome.google.com/webstore");
}

/************************************************************************/

/* Update browser action function */

function updateBrowserAction(tabId,url)
{
    /* Cannot catch errors in chrome.browserAction functions in cases where tabs have closed */
    /* Workaround is to delay and then make sure tab exists before calling these functions */
    
    window.setTimeout(
    function()
    {
        chrome.tabs.get(tabId,
        function(tab)
        {
            if (chrome.runtime.lastError == null && typeof tab != "undefined" && tab.url != "about:blank")  /* tab not closed or about:blank */
            {
                /* Workarounds for Yahoo! Mail print window */
                /* Firefox - url scheme is "wyciwyg:" */
                /* Chrome - url is "" */
                
                if ((allowedScheme(url) || url.substr(0,8) == "wyciwyg:" || url == "") && !specialPage(url) && tab.status == "complete")
                {
                    chrome.browserAction.enable(tabId);
                    
                    if (!isFirefox || ffVersion <= 54) chrome.browserAction.setIcon({ tabId: tabId, path: "icon16.png"});  /* Chrome or Firefox 54- - icon not changed */
                    
                    if (typeof tabCurModes[tabId] == "undefined" || tabCurModes[tabId] <= 0)  /* not editing or suspended */
                    {
                        chrome.browserAction.setTitle({ tabId: tabId, title: "Print Edit WE" });
                        chrome.browserAction.setBadgeText({ tabId: tabId, text: "" });
                        chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: "#000000" });
                    }
                    else if (tabCurModes[tabId] == 1)  /* suspended */
                    {
                        chrome.browserAction.setTitle({ tabId: tabId, title: "Print Edit WE - Suspended" });
                        chrome.browserAction.setBadgeText({ tabId: tabId, text: "Sus" });
                        chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: "#E00000" });
                    }
                    else if (tabCurModes[tabId] == 2)  /* editing */
                    {
                        chrome.browserAction.setTitle({ tabId: tabId, title: "Print Edit WE - Editing" });
                        chrome.browserAction.setBadgeText({ tabId: tabId, text: "Edit" });
                        chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: "#0000E0" });
                    }
                }
                else  /* special page or load not complete */
                {
                    chrome.browserAction.disable(tabId);
                    
                    if (!isFirefox || ffVersion <= 54) chrome.browserAction.setIcon({ tabId: tabId, path: "icon16-disabled.png"});  /* Chrome or Firefox 54- - icon not changed */
                    
                    if (tab.status != "complete") chrome.browserAction.setTitle({ tabId: tabId, title: "Print Edit WE - page is not ready" });
                    else chrome.browserAction.setTitle({ tabId: tabId, title: "Print Edit WE - cannot be used with this page" });
                    chrome.browserAction.setBadgeText({ tabId: tabId, text: "" });
                    chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: "#000000" });
                }
            }
        });
    },10);
}

/************************************************************************/

/* Update context menus function */

function updateContextMenus()
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        if (chrome.runtime.lastError == null && typeof tabs[0] != "undefined" && tabs[0].url != "about:blank")  /* tab not closed or about:blank */
        {
            /* Workarounds for Yahoo! Mail print window */
            /* Firefox - url scheme is "wyciwyg:" */
            /* Chrome - url is "" */
            
            if ((allowedScheme(tabs[0].url) || tabs[0].url.substr(0,8) == "wyciwyg:" || tabs[0].url == "") && !specialPage(tabs[0].url) && tabs[0].status == "complete")
            {
                if (typeof tabCurModes[tabs[0].id] == "undefined" || tabCurModes[tabs[0].id] <= 0)  /* not editing or suspended */
                {
                    chrome.contextMenus.update("startclose",{ title: "Start Editing", enabled: true });
                    chrome.contextMenus.update("suspendresume",{ title: "Suspend Editing", enabled: false });
                }
                else if (tabCurModes[tabs[0].id] == 1)  /* suspended */
                {
                    chrome.contextMenus.update("startclose",{ title: "Close Editing", enabled: true });
                    chrome.contextMenus.update("suspendresume",{ title: "Resume Editing", enabled: true });
               }
                else if (tabCurModes[tabs[0].id] == 2)  /* editing */
                {
                    chrome.contextMenus.update("startclose",{ title: "Close Editing", enabled: true });
                    chrome.contextMenus.update("suspendresume",{ title: "Suspend Editing", enabled: true });
                }
            }
            else
            {
                chrome.contextMenus.update("startclose",{ title: "Start Editing", enabled: false });
                chrome.contextMenus.update("suspendresume",{ title: "Suspend Editing", enabled: false });
            }
            
            chrome.contextMenus.update("printpreview",{ enabled: true });
            chrome.contextMenus.update("print",{ enabled: true });
            
            if (!isFirefox)
            {
                chrome.contextMenus.update("saveasmhtml",{ enabled: true });
            }
            
            if (isFirefox && ((ffVersion >= 75 && platformOS != "mac") || (ffVersion >= 81 && platformOS == "mac")))
            {
                chrome.contextMenus.update("saveaspdf",{ enabled: true });
            }
        }
    });
}

/************************************************************************/

/* Save page as MHTML function */

function savePageAsMHTML(tab,resume)
{
    chrome.pageCapture.saveAsMHTML({ tabId: tab.id },
    function(binaryBlob)
    {
        var mhtmlBlob,objectURL,filename;
        
        mhtmlBlob = new Blob([binaryBlob],{ type: "mhtml/plain" });
        
        objectURL = window.URL.createObjectURL(mhtmlBlob);
        
        filename = getSavedFileName(tab.url,tab.title,".mhtml");
        
        /* Download MHTML blob as .mhtml file */
        
        chrome.downloads.onChanged.addListener(
        function listener(downloadDelta)
        {
            if (downloadDelta.error && downloadDelta.error.current == "USER_CANCELED")
            {
                chrome.downloads.onChanged.removeListener(listener);
                chrome.tabs.sendMessage(tab.id,{ type: "saveDone", savetype: 1, success: false },checkError);
            }
            else if (downloadDelta.filename && downloadDelta.filename.current.length > 0)
            {
                chrome.downloads.onChanged.removeListener(listener);
                chrome.tabs.sendMessage(tab.id,{ type: "saveDone", savetype: 1, success: true },checkError);
            }
        });
        
        chrome.downloads.download({ url: objectURL, filename: filename },
        function(downloadItemId)
        {
            window.URL.revokeObjectURL(objectURL);
        });
    });
}

/************************************************************************/

/* Save page as PDF function */

function savePageAsPDF(tab,resume)
{
    chrome.storage.local.get(null,
    function(object)
    {
        var pageSettings = new Object();
        
        /* Paper Sizes: A3, A4, A5, B5, Tabloid, Letter, Statement, Legal */
        
        var paperSizeUnit = new Array(1,1,1,1,0,0,0,0);
        var paperWidth = new Array(297,210,148,176,11.0,8.5,5.5,8.5);
        var paperHeight = new Array(420,297,210,250,17.0,11.0,8.5,14.0);
        
        if (ffVersion >= 75)
        {
            pageSettings.toFileName = getSavedFileName(tab.url,tab.title,".pdf");
        }
        
        if (object["options-savepdf-papersize"] == 8)  /* custom paper size */
        {
            pageSettings.paperSizeUnit = 0;
            pageSettings.paperWidth = object["options-savepdf-paperwidth"];
            pageSettings.paperHeight = object["options-savepdf-paperheight"];
        }
        else
        {
            pageSettings.paperSizeUnit = paperSizeUnit[object["options-savepdf-papersize"]];
            pageSettings.paperWidth = paperWidth[object["options-savepdf-papersize"]];
            pageSettings.paperHeight = paperHeight[object["options-savepdf-papersize"]];
        }
        
        pageSettings.orientation = object["options-savepdf-orientation"];
        pageSettings.scaling = object["options-savepdf-scaling"]/100;
        pageSettings.shrinkToFit = object["options-savepdf-shrinktofit"];
        
        pageSettings.showBackgroundColors = object["options-savepdf-backgroundcolors"];
        pageSettings.showBackgroundImages = object["options-savepdf-backgroundimages"];
        
        if (ffVersion >= 59)
        {
            pageSettings.edgeLeft = object["options-savepdf-edgeleft"];
            pageSettings.edgeRight = object["options-savepdf-edgeright"];
            pageSettings.edgeTop = object["options-savepdf-edgetop"];
            pageSettings.edgeBottom = object["options-savepdf-edgebottom"];
        }
        
        pageSettings.marginLeft = object["options-savepdf-marginleft"];
        pageSettings.marginRight = object["options-savepdf-marginright"];
        pageSettings.marginTop = object["options-savepdf-margintop"];
        pageSettings.marginBottom = object["options-savepdf-marginbottom"];
        
        pageSettings.headerLeft = object["options-savepdf-headerleft"];
        pageSettings.headerCenter = object["options-savepdf-headercenter"];
        pageSettings.headerRight = object["options-savepdf-headerright"];
        pageSettings.footerLeft = object["options-savepdf-footerleft"];
        pageSettings.footerCenter = object["options-savepdf-footercenter"];
        pageSettings.footerRight = object["options-savepdf-footerright"];
        
        if (resume) saveAsPDFActive[tab.id] = true;
        
        chrome.tabs.saveAsPDF(pageSettings,
        function(status)
        {
            if (resume)
            {
                saveAsPDFActive[tab.id] = false;
                
                status = status.toLowerCase();  /* status capitalized in first version of saveAsPDF() */
                
                chrome.tabs.sendMessage(tab.id,{ type: "saveDone", savetype: 2, success: (status == "saved" || status == "replaced") },checkError);
            }
        });
    });
}

/************************************************************************/

/* Get saved file name function */

function getSavedFileName(url,title,extension)
{
    var documentURL,host,hostw,path,pathw,file,filew,query,fragment,date,datestr,filename,regex,minlength;
    
    documentURL = new URL(url);
    
    host = documentURL.hostname;
    host = decodeURIComponent(host);
    host = sanitizeString(host);
    
    hostw = host.replace(/^www\./,"");
    
    path = documentURL.pathname;
    path = decodeURIComponent(path);
    path = sanitizeString(path);
    path = path.replace(/^\/|\/$/g,"");
    
    pathw = path.replace(/\.[^.]+$/,"");
    
    file = path.replace(/[^\/]*\//g,"");
    
    filew = file.replace(/\.[^.]+$/,"");
    
    query = documentURL.search.substr(1);
    
    fragment = documentURL.hash.substr(1);
    
    title = sanitizeString(title);
    title = title.trim();
    if (title == "") title = file;
    
    date = new Date();
    datestr = new Date(date.getTime()-(date.getTimezoneOffset()*60000)).toISOString();
    
    filename = savedFileName;
    
    regex = /(%TITLE%|%DATE\((.?)\)%|%TIME\((.?)\)%|%HOST%|%HOSTW%|%PATH%|%PATHW%|%FILE%|%FILEW%|%QUERY\(([^)]*)\)%|%FRAGMENT%)/g;
    
    minlength = filename.replace(regex,"").length;
    
    filename = filename.replace(regex,_replacePredefinedFields);
    
    function _replacePredefinedFields(match,p1,p2,p3,p4,offset,string)
    {
        var date,time,value;
        var params = new Object();
        
        if (p1 == "%TITLE%") return _truncateField(p1,title);
        else if (p1.substr(0,6) == "%DATE(" && p1.substr(-2) == ")%")
        {
            date = datestr.substr(0,10).replace(/-/g,p2);
            return _truncateField(p1,date);
        }
        else if (p1.substr(0,6) == "%TIME(" && p1.substr(-2) == ")%")
        {
            time = datestr.substr(11,8).replace(/:/g,p3);
            return _truncateField(p1,time);
        }
        else if (p1 == "%HOST%") return _truncateField(p1,host);
        else if (p1 == "%HOSTW%") return _truncateField(p1,hostw);
        else if (p1 == "%FILE%") return _truncateField(p1,file);
        else if (p1 == "%FILEW%") return _truncateField(p1,filew);
        else if (p1 == "%PATH%") return _truncateField(p1,path);
        else if (p1 == "%PATHW%") return _truncateField(p1,pathw);
        else if (p1.substr(0,7) == "%QUERY(" && p1.substr(-2) == ")%")
        {
            if (p4 == "") return _truncateField(p1,query);
            params = new URLSearchParams(query);
            value = params.get(p4);
            if (value == null) value = "";
            return _truncateField(p1,value);
        }
        else if (p1 == "%FRAGMENT%") return _truncateField(p1,fragment);
    }
    
    function _truncateField(field,repstr)
    {
        var maxextnlength = 6;
        
        if (repstr.length > maxFileNameLength-maxextnlength-minlength) repstr = repstr.substr(0,maxFileNameLength-maxextnlength-minlength);
        
        minlength += repstr.length;
        
        return repstr;
    }
    
    if (filename == "") filename = extension.substr(1);
    
    if (filename.substr(-extension.length) != extension) filename += extension;
    
    filename = filename.replace(/(\\|\/|:|\*|\?|"|<|>|\|)/g,"_");
    
    if (replaceSpaces) filename = filename.replace(/\s/g,replaceChar);
    
    filename = filename.trim();
    
    return filename;
}

function sanitizeString(string)
{
    var i,charcode;
    
    /* Remove control characters: 0-31 and 255 */ 
    /* Remove other line break characters: 133, 8232, 8233 */ 
    /* Remove zero-width characters: 6158, 8203, 8204, 8205, 8288, 65279 */ 
    /* Change all space characters to normal spaces: 160, 5760, 8192-8202, 8239, 8287, 12288 */
    /* Change all hyphen characters to normal hyphens: 173, 1470, 6150, 8208-8213, 8315, 8331, 8722, 11834, 11835, 65112, 65123, 65293 */
    
    for (i = 0; i < string.length; i++)
    {
        charcode = string.charCodeAt(i);
        
        if (charcode <= 31 || charcode == 255 ||
            charcode == 133 || charcode == 8232 || charcode == 8233 ||
            charcode == 6158 || charcode == 8203 || charcode == 8204 || charcode == 8205 || charcode == 8288 || charcode == 65279)
        {
            string = string.substr(0,i) + string.substr(i+1);
        }
        
        if (charcode == 160 || charcode == 5760 || (charcode >= 8192 && charcode <= 8202) || charcode == 8239 || charcode == 8287 || charcode == 12288)
        {
            string = string.substr(0,i) + " " + string.substr(i+1);
        }
        
        if (charcode == 173 || charcode == 1470 || charcode == 6150 || (charcode >= 8208 && charcode <= 8213) ||
            charcode == 8315 || charcode == 8331 || charcode == 8722 || charcode == 11834 || charcode == 11835 ||
            charcode == 65112 || charcode == 65123 || charcode == 65293)
        {
            string = string.substr(0,i) + "-" + string.substr(i+1);
        }
    }
    
    return string;
}

/************************************************************************/

/* Web Request Log function */

function webRequestLog(tag,details)
{
    var time,tabid,mode,type,url;
    
    time = ("        " + performance.now().toFixed(2)).substr(-8);
    tabid = ("  " + details.tabId).substr(-2);
    mode = (typeof tabCurModes[details.tabId] == "undefined") ? " ?" : ("  " + tabCurModes[details.tabId]).substr(-2);
    type = (details.type + "          ").substr(0,10);
    url = details.url.substr(0,50);
    
    console.log(tag + ":  " + time + "  " + tabid + "   " + mode + "   " + type + "   " + url);
}

/************************************************************************/

/* Check for sendMessage errors */

function checkError()
{
    if (chrome.runtime.lastError == null) ;
    else if (chrome.runtime.lastError.message == "Could not establish connection. Receiving end does not exist.") ;  /* Chrome & Firefox - ignore */
    else if (chrome.runtime.lastError.message == "The message port closed before a response was received.") ;  /* Chrome - ignore */
    else if (chrome.runtime.lastError.message == "Message manager disconnected") ;  /* Firefox - ignore */
    else console.log("Print Edit WE - " + chrome.runtime.lastError.message);
}

/************************************************************************/

/* Display alert notification */

function alertNotify(message)
{
    chrome.notifications.create("alert",{ type: "basic", iconUrl: "icon32.png", title: "PRINT EDIT WE", message: "" + message });
}

/************************************************************************/

/* Display debug notification */

function debugNotify(message)
{
    chrome.notifications.create("debug",{ type: "basic", iconUrl: "icon32.png", title: "PRINT EDIT WE - DEBUG", message: "" + message });
}

/************************************************************************/
