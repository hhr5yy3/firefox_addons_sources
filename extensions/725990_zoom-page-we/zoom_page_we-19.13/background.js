/************************************************************************/
/*                                                                      */
/*      Zoom Page WE - Generic WebExtension - Background Page           */
/*                                                                      */
/*      Javascript for background page                                  */
/*                                                                      */
/*      Last Edit - 16 Apr 2023                                         */
/*                                                                      */
/*      Copyright (C) 2009-2023 DW-dev                                  */
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
/*  https://developer.chrome.com/extensions/contextMenus                */
/*  https://developer.chrome.com/extensions/notifications               */
/*  https://developer.chrome.com/extensions/runtime                     */
/*  https://developer.chrome.com/extensions/storage                     */
/*  https://developer.chrome.com/extensions/tabs                        */
/*  https://developer.chrome.com/extensions/webNavigation               */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Full/Text Zoom is applied to these pages:                           */
/*                                                                      */
/*  - Zoomable                                                          */
/*    |                                                                 */
/*    +- SiteZoomable                                                   */
/*    |  |                                                              */
/*    |  +- Scriptable                      (full zoom or text zoom)    */
/*    |  |  |                                                           */
/*    |  |  +- http: or https: or file:     (per-site or per-tab)       */
/*    |  |     except                                                   */
/*    |  |       - Firefox                                              */
/*    |  |         - https://addons.mozilla.org                         */
/*    |  |       - Chrome                                               */
/*    |  |         - https://chrome.google.com/webstore                 */
/*    |  |         - https://www.google. ... /_/chrome/newtab           */
/*    |  |         - https://www.google. ... sourceid=chrome-instant    */
/*    |  |                                                              */
/*    |  +- Firefox                         (full zoom - not CSS)       */
/*    |     |                                                           */
/*    |     +- https://addons.mozilla.org   (per-site or per-tab)       */
/*    |     |                                                           */
/*    |     +- moz-extension:               (per-site or per-tab)       */
/*    |     |                                                           */
/*    |     +- about:                       (per-site or per-tab)       */
/*    |        except                                                   */
/*    |          - about:blank                                          */
/*    |                                                                 */
/*    +- Firefox                            (full zoom - not CSS)       */
/*       |                                                              */
/*       +- all pages                       (per-tab)                   */
/*          except                                                      */
/*            - about:blank                                             */
/*            - resource:                                               */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Minimum Font Size is applied to these pages:                        */
/*                                                                      */
/*  - Scriptable                            (minimum font size)         */
/*    |                                                                 */
/*    +- http: or https: or file:           (per-site or per-tab)       */
/*       except                                                         */
/*         - Firefox                                                    */
/*           - https://addons.mozilla.org                               */
/*         - Chrome                                                     */
/*           - https://chrome.google.com/webstore                       */
/*           - https://www.google. ... /_/chrome/newtab                 */
/*           - https://www.google. ... sourceid=chrome-instant          */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Subsites can be defined for these pages:                            */
/*                                                                      */
/*  - http: or https: or file:                                          */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Subsites are defined based on levels of descendant pages:           */
/*                                                                      */
/*    Subsite Type                                                      */
/*                                                                      */
/*        *                       0     Page where subsite defined      */
/*                                            (subsite root)            */
/*        >                     1 1 1                                   */
/*                                                                      */
/*        > 1                 2 2 2 2 2                                 */
/*                                                                      */
/*        > 2               3 3 3 3 3 3 3                               */
/*                       /-----------------\                            */
/*        > 3           / 4 4 4 4 4 4 4 4 4 \    Subsite Type > 3       */
/*                     /                     \                          */
/*        > 4         / 5 5 5 5 5 5 5 5 5 5 5 \    Includes all         */
/*                   /                         \    descendants         */
/*        > 5       / 6 6 6 6 6 6 6 6 6 6 6 6 6 \    except first       */
/*                 /                             \    3 levels          */
/*        > 6     / 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 \    (1,2,3)          */
/*               /                 .               \                    */
/*              /                  .                \                   */
/*             /                   .                 \                  */
/*            /---------------------------------------\                 */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Subsites are defined groups of pages within a website:              */
/*                                                                      */
/*    Type  Symbol  Pages Included In Subsite                           */
/*                                                                      */
/*     0     ~      No subsite defined                                  */
/*     1     *      This page and all descendant pages                  */
/*     2     >      All descendant pages                                */
/*     3     > 1    All descendant pages except for first level         */
/*     4     > 2    All descendant pages except for first 2 levels      */
/*     5     > 3    All descendant pages except for first 3 levels      */
/*     6     > 4    All descendant pages except for first 4 levels      */
/*     7     > 5    All descendant pages except for first 5 levels      */
/*     8     > 6    All descendant pages except for first 6 levels      */
/*                                                                      */
/************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;
var ffVersion;

var platformOS;

var printEditId = "";

var chromeLevels = "25 33 50 67 75 80 90 100 110 125 150 175 200 250 300 400 500";
var firefoxLevels = "30 50 67 80 90 100 110 120 133 150 170 200 240 300";

var initialSizes = "0 9 10 11 12 13 14 15 16 17 18 20 22 24 26 28";

var subsiteSymbols = new Array("~","\u2606",">",">1",">2",">3",">4",">5",">6");

var minLevel,maxLevel;

var zoomMode,browserPerSite,applyAutoFit,imagePerTab,cssFullZoom,separateSites,allowSubsites,resetOnLoad;
var defaultType;
var showBadge,showStates,showSubmenu,ignoreBrowserZoom;
var zoomLevels;
var defaultFullLevel;
var defaultTextLevel,defaultOtherLevel;
var zoomAction,fixedValue,smallAdjust,smallValue;
var fontSizes;
var defaultSize;

var zm_bps_applyAutoFit,zm_bps_imagePerTab,zm_bps_cssFullZoom,zm_bps_separateSites,zm_bps_allowSubsites;

var perTabReadyStates = new Array();
var perTabResizeFlags = new Array();
var perTabContentTypes = new Array();

var perTabZoomTypes = new Array();

var perSiteZoomTypes = new Object();
var perSiteZoomTypesNotIncognito = new Object();

var perTabZoomLevels = new Array();

var perSiteZoomLevels = new Object();
var perSiteZoomLevelsNotIncognito = new Object();

var perTabFontSizes = new Array();

var perSiteFontSizes = new Object();
var perSiteFontSizesNotIncognito = new Object();

var subsiteTypes = new Object();
var subsiteTypesNotIncognito = new Object();

var activeTabId = null;

var resizeFinishTimeout = null;
var resizeIgnoreTimeout = null;

var debugEnable = false;
var debugHistory = "";

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
            
            printEditId = "printedit-we@DW-dev";
            
            initialize();
        });
    }
    else
    {
        chrome.management.getSelf(
        function(extensionInfo)
        {
            printEditId = (extensionInfo.installType == "normal") ? "olnblpmehglpcallpnbgmikjblmkopia" : "bhigaknpknggjcoimdncfafkoloiflih";  /* normal or development (unpacked) */
            
            initialize();
        });
    }
});

function initialize()
{
    minLevel = isFirefox ? 30 : 25;
    maxLevel = isFirefox ? 300 : 500;
    
    if (isFirefox)
    {
        chrome.tabs.query({ lastFocusedWindow: true, active: true },
        function(tabs)
        {
            chrome.tabs.setZoom(tabs[0].id,0.001,  /* 0.1% */
            function()
            {
                var matches = new Array();
                
                if (chrome.runtime.lastError != null)
                {
                    /* e.g. "Zoom value 0.001 out of range (must be between 0.3 and 3)" */
                    
                    matches = chrome.runtime.lastError.message.match(/.*between ([\d\.]*) and ([\d\.]*)/i);
                    
                    minLevel = matches[1]*100;
                    maxLevel = matches[2]*100;
                }
            });
        });
    }
    
    chrome.storage.local.get(null,
    function(object)
    {
        var site,subsite;
        var contexts = new Array();
        
        /* Initialize or migrate options */
        
        if (!("options-zoommode" in object)) object["options-zoommode"] = 0;
        
        if (!("options-browserpersite" in object)) object["options-browserpersite"] = false;
        
        if (!("options-applyautofit" in object)) object["options-applyautofit"] = false;
        
        if (!("options-imagepertab" in object)) object["options-imagepertab"] = false;
        
        if (!("options-cssfullzoom" in object)) object["options-cssfullzoom"] = !isFirefox;
        
        if (!("options-separatesites" in object)) object["options-separatesites"] =
            ("options-applyseparate" in object) ? object["options-applyseparate"] : !isFirefox;
        
        if (!("options-allowsubsites" in object)) object["options-allowsubsites"] = false;
        
        if (!("options-resetonload" in object)) object["options-resetonload"] = !isFirefox;
        
        if (!("options-defaulttype" in object)) object["options-defaulttype"] = 0;
        
        if (!("options-enablescaling" in object)) object["options-enablescaling"] = true;
        
        if (!("options-onloadscaling" in object)) object["options-onloadscaling"] =
            ("options-applyscaling" in object) ? object["options-applyscaling"] : false;  /* Version 13.4 or earlier */
        
        if (!("options-showbadge" in object)) object["options-showbadge"] = true; 
        
        if (!("options-showstates" in object)) object["options-showstates"] = true; 
        
        if (!("options-showsubmenu" in object)) object["options-showsubmenu"] = true;
        
        if (!("options-enablectrl789" in object)) object["options-enablectrl789"] = true;
        
        if (!("options-enablerightwheel" in object)) object["options-enablerightwheel"] = false;
        
        if (!("options-modifyctrlwheel" in object)) object["options-modifyctrlwheel"] =
            ("options-customctrlwheel" in object) ? object["options-customctrlwheel"] : false;  /* Version 19.3 or earlier */
        
        if (!("options-ignorebrowserzoom" in object)) object["options-ignorebrowserzoom"] = false;
        
        if (!("options-zoomlevels" in object)) object["options-zoomlevels"] = isFirefox ? firefoxLevels.split(" ").map(Number) : chromeLevels.split(" ").map(Number);
        
        if (!("options-defaultfulllevel" in object)) object["options-defaultfulllevel"] = 100;
        
        if (!("options-defaulttextlevel" in object)) object["options-defaulttextlevel"] = 100;
        
        if (!("options-defaultotherlevel" in object)) object["options-defaultotherlevel"] = 100;
        
        if (!("options-autominlevel" in object)) object["options-autominlevel"] = 67;
        
        if (!("options-automaxlevel" in object)) object["options-automaxlevel"] = 150;
        
        if (!("options-zoomaction" in object)) object["options-zoomaction"] =
            ("options-zoominout" in object) ? object["options-zoominout"] : 0;  /* Version 19.3 or earlier */
        
        if (!("options-fixedvalue" in object)) object["options-fixedvalue"] =
            ("options-zoomstep" in object) ? object["options-zoomstep"] : 10;  /* Version 19.3 or earlier */
        
        if (!("options-smalladjust" in object)) object["options-smalladjust"] = false;
        
        if (!("options-smallvalue" in object)) object["options-smallvalue"] = 5;
        
        if (!("options-fontsizes" in object)) object["options-fontsizes"] = initialSizes.split(" ").map(Number);
        
        if (!("options-defaultsize" in object)) object["options-defaultsize"] = 0;
        
        if (!("options-adjusttextfont" in object)) object["options-adjusttextfont"] = false;
        
        if (!("options-textfontfamily" in object)) object["options-textfontfamily"] = "Arial";
        
        if (!("options-adjustlinespace" in object)) object["options-adjustlinespace"] = false;
        
        if (!("options-linespacefactor" in object)) object["options-linespacefactor"] = 1.2;
        
        if (!("options-applytodynamic" in object)) object["options-applytodynamic"] = true;
        
        if (!("persite-zoomtypes" in object)) object["persite-zoomtypes"] = new Object();
        
        if (!("persite-zoomlevels" in object)) object["persite-zoomlevels"] = new Object();
        
        if (!("persite-fontsizes" in object)) object["persite-fontsizes"] = new Object();
        
        if (!("subsite-types" in object)) object["subsite-types"] = new Object();
        
        /* Update stored options */
        
        chrome.storage.local.set(object);
        
        /* Initialize local options */
        
        zoomMode = object["options-zoommode"];
        browserPerSite = object["options-browserpersite"];
        applyAutoFit = object["options-applyautofit"];
        imagePerTab = object["options-imagepertab"];
        cssFullZoom = object["options-cssfullzoom"];
        separateSites = object["options-separatesites"];
        allowSubsites = object["options-allowsubsites"];
        resetOnLoad = object["options-resetonload"];
        
        defaultType = object["options-defaulttype"];
        
        showBadge = object["options-showbadge"];
        showStates = object["options-showstates"];
        showSubmenu = object["options-showsubmenu"];
        ignoreBrowserZoom = object["options-ignorebrowserzoom"];
        
        zoomLevels = object["options-zoomlevels"];
        
        defaultFullLevel = object["options-defaultfulllevel"];
        defaultTextLevel = object["options-defaulttextlevel"];
        defaultOtherLevel = object["options-defaultotherlevel"];
        
        zoomAction = object["options-zoomaction"];
        fixedValue = object["options-fixedvalue"];
        smallAdjust = object["options-smalladjust"];
        smallValue = object["options-smallvalue"];
        
        fontSizes = object["options-fontsizes"];
        
        defaultSize = object["options-defaultsize"];
        
        zm_bps_applyAutoFit = !(zoomMode == 0 && browserPerSite) && applyAutoFit;
        zm_bps_imagePerTab = !(zoomMode == 1 || browserPerSite) && imagePerTab;
        zm_bps_cssFullZoom = !(zoomMode == 0 && browserPerSite) && cssFullZoom;
        zm_bps_separateSites = !(zoomMode == 1 || browserPerSite) && separateSites;
        zm_bps_allowSubsites = !(zoomMode == 1 || browserPerSite) && allowSubsites;
        
        /* Initialize per site zoom types, zoom levels and font sizes */
        
        perSiteZoomTypesNotIncognito = object["persite-zoomtypes"];
        
        for (site in perSiteZoomTypesNotIncognito)
        {
            if (perSiteZoomTypesNotIncognito.hasOwnProperty(site)) perSiteZoomTypes[site] = perSiteZoomTypesNotIncognito[site];
        }
        
        perSiteZoomLevelsNotIncognito = object["persite-zoomlevels"];
        
        for (site in perSiteZoomLevelsNotIncognito)
        {
            if (perSiteZoomLevelsNotIncognito.hasOwnProperty(site)) perSiteZoomLevels[site] = perSiteZoomLevelsNotIncognito[site];
        }
        
        perSiteFontSizesNotIncognito = object["persite-fontsizes"];
        
        for (site in perSiteFontSizesNotIncognito)
        {
            if (perSiteFontSizesNotIncognito.hasOwnProperty(site)) perSiteFontSizes[site] = perSiteFontSizesNotIncognito[site];
        }
        
        /* Initialize sub-site types */
        
        subsiteTypesNotIncognito = object["subsite-types"];
        
        for (subsite in subsiteTypesNotIncognito)
        {
            if (subsiteTypesNotIncognito.hasOwnProperty(subsite)) subsiteTypes[subsite] = subsiteTypesNotIncognito[subsite];
        }
        
        /* Add context menu items */
        
        contexts = showSubmenu ? [ "all" ] : [ "browser_action" ];
        
        chrome.contextMenus.create({ id: "zoomin", title: "Zoom In", contexts: contexts, enabled: true });
        chrome.contextMenus.create({ id: "zoomout", title: "Zoom Out", contexts: contexts, enabled: true });
        chrome.contextMenus.create({ id: "zoomreset", title: "Zoom Reset", contexts: contexts, enabled: true });
        chrome.contextMenus.create({ id: "zoomtype", title: "Zoom Type", contexts: contexts, enabled: true });
        chrome.contextMenus.create({ id: "zoomautofit", title: "Zoom AutoFit", contexts: contexts, enabled: true });
        chrome.contextMenus.create({ id: "fontreset", title: "Font Reset", contexts: contexts, enabled: true });
        
        /* Check Firefox browser.zoom.siteSpecific preference is correctly set */
        
        if (isFirefox && ffVersion <= 74)
        {
            chrome.tabs.query({ lastFocusedWindow: true, active: true },
            function(tabs)
            {
                chrome.tabs.getZoomSettings(tabs[0].id,
                function(zoomSettings)
                {
                    if (zoomSettings.scope == "per-origin" && (zoomMode == 1 || !browserPerSite))
                    {
                        console.log("Zoom Page\n" +
                                    "When 'Let browser manage per-site full zoom' is not applied,\n"+
                                    "please set 'browser.zoom.siteSpecific' to 'false'\n" +
                                    "in 'about:config' preferences.\n ");
                    }
                    else if (zoomSettings.scope == "per-tab" && (zoomMode == 0 && browserPerSite))
                    {
                        console.log("Zoom Page\n" +
                                    "When 'Let browser manage per-site full zoom' is applied,\n"+
                                    "please set 'browser.zoom.siteSpecific' to 'true'\n" +
                                    "in 'about:config' preferences.\n ");
                    }
                });
            });
        }
        
        /* Set Firefox browser.zoom.full and browser.zoom.siteSpecific preferences */
        
        if (isFirefox && ffVersion >= 75)
        {
            browser.browserSettings.zoomFullPage.set({ value: true });
            
            browser.browserSettings.zoomSiteSpecific.set({ value: zoomMode == 0 && browserPerSite });
        }
        
        /* Update per tab states and apply zoom for first tab */
        
        chrome.tabs.query({ lastFocusedWindow: true, active: true },
        function(tabs)
        {
            var scope;
            
            debugHistory += "Startup(" + tabs[0].id + ")";
            debugHistory += "[" + getSiteZoomType(tabs[0].url) + "," + getSiteZoomLevel(tabs[0].url) + "%]";
            debugHistory += "{" + getHost(tabs[0].url) + "}\n";
            
            if (!isFirefox && zoomablePage(tabs[0].id,tabs[0].url))
            {
                scope = (zoomMode == 0 && browserPerSite) ? "per-origin" : "per-tab";
                
                chrome.tabs.setZoomSettings(tabs[0].id,{ mode: "automatic", scope: scope });
            }
            
            activeTabId = tabs[0].id;
            
            perTabReadyStates[tabs[0].id] = tabs[0].status;
            
            definePerTabValues(tabs[0].id,tabs[0].url);  /* Firefox - values will be undefined for first load in first tab if page non-scriptable */
            
            webNavigationLoading(tabs[0].id,tabs[0].url,tabs[0].discarded,true);
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
        
        if ("options-zoommode" in changes) zoomMode = changes["options-zoommode"].newValue;
        if ("options-browserpersite" in changes) browserPerSite = changes["options-browserpersite"].newValue;
        if ("options-applyautofit" in changes) applyAutoFit = changes["options-applyautofit"].newValue;
        if ("options-imagepertab" in changes) imagePerTab = changes["options-imagepertab"].newValue;
        if ("options-cssfullzoom" in changes) cssFullZoom = changes["options-cssfullzoom"].newValue;
        if ("options-separatesites" in changes) separateSites = changes["options-separatesites"].newValue;
        if ("options-allowsubsites" in changes) allowSubsites = changes["options-allowsubsites"].newValue;
        if ("options-resetonload" in changes) resetOnLoad = changes["options-resetonload"].newValue;
        
        if ("options-defaulttype" in changes) defaultType = changes["options-defaulttype"].newValue; 
        
        if ("options-showbadge" in changes) showBadge = changes["options-showbadge"].newValue;
        if ("options-showstates" in changes) showStates = changes["options-showstates"].newValue;
        if ("options-showsubmenu" in changes) showSubmenu = changes["options-showsubmenu"].newValue;
        if ("options-ignorebrowserzoom" in changes) ignoreBrowserZoom = changes["options-ignorebrowserzoom"].newValue;
        
        if ("options-zoomlevels" in changes) zoomLevels = changes["options-zoomlevels"].newValue;
        
        if ("options-defaultfulllevel" in changes) defaultFullLevel = changes["options-defaultfulllevel"].newValue;
        if ("options-defaulttextlevel" in changes) defaultTextLevel = changes["options-defaulttextlevel"].newValue;
        if ("options-defaultotherlevel" in changes) defaultOtherLevel = changes["options-defaultotherlevel"].newValue;
        
        if ("options-zoomaction" in changes) zoomAction = changes["options-zoomaction"].newValue;
        if ("options-fixedvalue" in changes) fixedValue = changes["options-fixedvalue"].newValue;
        if ("options-smalladjust" in changes) smallAdjust = changes["options-smalladjust"].newValue;
        if ("options-smallvalue" in changes) smallValue = changes["options-smallvalue"].newValue;
        
        if ("options-fontsizes" in changes) fontSizes = changes["options-fontsizes"].newValue;
        
        if ("options-defaultsize" in changes) defaultSize = changes["options-defaultsize"].newValue;
        
        /* Call to chrome.storage.local.set(object) during initialize() causes all properties to appear in changes */
        /* Check if property values really have changed to avoid substantial additional processing during startup  */
        /* Note reapplyZoomToAllTabs() calls setZoomTypeLevel() which triggers chrome.tabs.onZoomChange() listener */
        
        if ("options-zoommode" in changes)
        {
            if (changes["options-zoommode"].newValue != changes["options-zoommode"].oldValue)
            {
                if (isFirefox && ffVersion >= 75)
                {
                    browser.browserSettings.zoomFullPage.set({ value: true });
                    
                    browser.browserSettings.zoomSiteSpecific.set({ value: zoomMode == 0 && browserPerSite });
                }
                
                if (!isFirefox)
                {
                    chrome.tabs.query({ },
                    function(tabs)
                    {
                        var i,scope;
                        
                        for (i = 0; i < tabs.length; i++)
                        {
                            if (zoomablePage(tabs[i].id,tabs[i].url))
                            {
                                scope = (zoomMode == 0 && browserPerSite) ? "per-origin" : "per-tab";
                                
                                chrome.tabs.setZoomSettings(tabs[i].id,{ mode: "automatic", scope: scope });
                            }
                        }
                    });
                }
                
                reapplyZoomToAllTabs();
            }
        }
        
        if ("options-browserpersite" in changes)
        {
            if (changes["options-browserpersite"].newValue != changes["options-browserpersite"].oldValue)
            {
                if (isFirefox && ffVersion >= 75)
                {
                    browser.browserSettings.zoomFullPage.set({ value: true });
                    
                    browser.browserSettings.zoomSiteSpecific.set({ value: zoomMode == 0 && browserPerSite });
                }
                
                if (!isFirefox)
                {
                    chrome.tabs.query({ },
                    function(tabs)
                    {
                        var i,scope;
                        
                        for (i = 0; i < tabs.length; i++)
                        {
                            if (zoomablePage(tabs[i].id,tabs[i].url))
                            {
                                scope = (zoomMode == 0 && browserPerSite) ? "per-origin" : "per-tab";
                                
                                chrome.tabs.setZoomSettings(tabs[i].id,{ mode: "automatic", scope: scope });
                            }
                        }
                    });
                }
                
                reapplyZoomToAllTabs();
            }
        }
        
        if ("options-cssfullzoom" in changes)
        {
            if (changes["options-cssfullzoom"].newValue != changes["options-cssfullzoom"].oldValue)
            {
                reapplyZoomToAllTabs();
            }
        }
        
        if ("options-showbadge" in changes)
        {
            if (changes["options-showbadge"].newValue != changes["options-showbadge"].oldValue)
            {
                chrome.tabs.query({ lastFocusedWindow: true, active: true },
                function(tabs)
                {
                    definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
                    
                    if (zoomablePage(tabs[0].id,tabs[0].url))
                    {
                        updateBrowserAction(tabs[0].id,tabs[0].url);
                        
                        updateContextMenus();
                    }
                });
            }
        }
        
        if ("options-showstates" in changes)
        {
            if (changes["options-showstates"].newValue != changes["options-showstates"].oldValue)
            {
                chrome.tabs.query({ lastFocusedWindow: true, active: true },
                function(tabs)
                {
                    definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
                    
                    if (zoomablePage(tabs[0].id,tabs[0].url))
                    {
                        updateBrowserAction(tabs[0].id,tabs[0].url);
                        
                        updateContextMenus();
                    }
                });
            }
        }
        
        if ("options-showsubmenu" in changes)
        {
            if (changes["options-showsubmenu"].newValue != changes["options-showsubmenu"].oldValue)
            {
                contexts = showSubmenu ? [ "all" ] : [ "browser_action" ];
                
                chrome.contextMenus.update("zoomin",{ contexts: contexts });
                chrome.contextMenus.update("zoomout",{ contexts: contexts });
                chrome.contextMenus.update("zoomreset",{ contexts: contexts });
                chrome.contextMenus.update("zoomtype",{ contexts: contexts });
                chrome.contextMenus.update("zoomautofit", { contexts: contexts });
                chrome.contextMenus.update("fontreset", { contexts: contexts });
            }
        }
        
        zm_bps_applyAutoFit = !(zoomMode == 0 && browserPerSite) && applyAutoFit;
        zm_bps_imagePerTab = !(zoomMode == 1 || browserPerSite) && imagePerTab;
        zm_bps_cssFullZoom = !(zoomMode == 0 && browserPerSite) && cssFullZoom;
        zm_bps_separateSites = !(zoomMode == 1 || browserPerSite) && separateSites;
        zm_bps_allowSubsites = !(zoomMode == 1 || browserPerSite) && allowSubsites;
    });
    
    /* Context menu listener */
    
    chrome.contextMenus.onClicked.addListener(
    function(clickData,tab)
    {
        if (clickData.menuItemId == "zoomin") zoomIn(isFirefox ? (clickData.modifiers.indexOf("Shift") >= 0) : false);
        else if (clickData.menuItemId == "zoomout") zoomOut(isFirefox ? (clickData.modifiers.indexOf("Shift") >= 0) : false);
        else if (clickData.menuItemId == "zoomreset") zoomReset();
        else if (clickData.menuItemId == "zoomtype") zoomType();
        else if (clickData.menuItemId == "zoomautofit") zoomAutoFit();
        else if (clickData.menuItemId == "fontreset") fontReset();
    });
    
    /* Tab event listeners */
    
    chrome.tabs.onCreated.addListener(
    function(tab)
    {
        var scope; 
        
        /* Chrome - not called for first tab */
        
        debugHistory += "Created(" + tab.id + ")\n";
        
        if (!isFirefox && zoomablePage(tab.id,tab.url))
        {
            scope = (zoomMode == 0 && browserPerSite) ? "per-origin" : "per-tab";
            
            chrome.tabs.setZoomSettings(tab.id,{ mode: "automatic", scope: scope });
        }
        
        definePerTabValues(tab.id,tab.url);  /* will be undefined */
    });
    
    chrome.tabs.onActivated.addListener(
    function(activeInfo)
    {
        if (resizeIgnoreTimeout != null) window.clearTimeout(resizeIgnoreTimeout);
        resizeIgnoreTimeout = window.setTimeout(function() { resizeIgnoreTimeout = null; },200);
        
        chrome.tabs.sendMessage(activeInfo.tabId,{ type: "tabactivated" },checkError);
        
        chrome.tabs.get(activeInfo.tabId,
        function(tab)
        {
            if (chrome.runtime.lastError == null)  /* in case tab does not exist */
            {
                debugHistory += "Activated(" + tab.id + ")";
                debugHistory += "[" + getSiteZoomType(tab.url) + "," + getSiteZoomLevel(tab.url) + "%]";
                debugHistory += "{" + getHost(tab.url) + "}\n";
                
                activeTabId = tab.id;
                
                definePerTabValues(tab.id,tab.url);  /* Firefox - values will be undefined for pending tab */
                
                if (tab.url == "about:newtab")  /* Firefox - webNavigation.onCompleted not called for about:newtab page */
                {
                    perTabReadyStates[tab.id] = "complete";
                    
                    webNavigationLoading(tab.id,tab.url,tab.discarded,true);
                }
                
                if (typeof perTabResizeFlags[tab.id] != "undefined" && perTabResizeFlags[tab.id])  /* browser window resized since tab last activated */
                {
                    webNavigationLoading(tab.id,tab.url,tab.discarded,(tab.status == "complete"));
                }
                
                perTabResizeFlags[tab.id] = false;
                
                updateBrowserAction(tab.id,tab.url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tab.id], zoomlevel: perTabZoomLevels[tab.id] },checkError);
                
                chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tab.id] },checkError);
            }
        });
    });
    
    chrome.tabs.onUpdated.addListener(
    function(tabId,changeInfo,tab)
    {
        var scope;
        
        debugHistory += "Updated(" + tabId + ")";
        debugHistory += "[" + getSiteZoomType(tab.url) + "," + getSiteZoomLevel(tab.url) + "%]";
        debugHistory += "{" + getHost(tab.url) + "}\n";
        
        definePerTabValues(tabId,tab.url);  /* in case undefined */
        
        if (typeof changeInfo.url != "undefined")
        {
            if (!isFirefox && zoomablePage(tab.id,tab.url))
            {
                scope = (zoomMode == 0 && browserPerSite) ? "per-origin" : "per-tab";
                
                chrome.tabs.setZoomSettings(tab.id,{ mode: "automatic", scope: scope },
                function()
                {
                    webNavigationLoading(tab.id,tab.url,tab.discarded,(tab.status == "complete"));
                });
            }
            else webNavigationLoading(tab.id,tab.url,tab.discarded,(tab.status == "complete"));
        }
        
        updateBrowserAction(tabId,tab.url);
        
        updateContextMenus();
        
        if (tab.active)
        {
            chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabId], zoomlevel: perTabZoomLevels[tabId] },checkError);
            
            chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabId] },checkError);
        }
    });
    
    chrome.tabs.onZoomChange.addListener(
    function(zoomChangeInfo)
    {
        chrome.tabs.get(zoomChangeInfo.tabId,
        function(tab)
        {
            var level,brokenpage;
            
            debugHistory += "ZoomChange(" + tab.id + ")";
            debugHistory += "<" + perTabReadyStates[tab.id] + ">";
            debugHistory += "[~" + Math.round(zoomChangeInfo.newZoomFactor*100) + "%~]";
            debugHistory += "{" + getHost(tab.url) + "}\n";
            
            definePerTabValues(tab.id,tab.url);  /* in case undefined */
            
            if (zoomablePage(tab.id,tab.url))
            {
                if (perTabZoomTypes[tab.id] == 0 && !zm_bps_cssFullZoom)
                {
                    level = Math.round(zoomChangeInfo.newZoomFactor*100);
                    
                    if (level != perTabZoomLevels[tab.id])  /* zoom level changed */
                    {
                        if (typeof perTabReadyStates[tab.id] != "undefined" &&  /* tab not pending */
                            (typeof tab.discarded == "undefined" || !tab.discarded))  /* tab not discarded */
                        {
                            brokenpage = isFirefox && (tab.url == "about:compat" || tab.url.substr(0,7) == "chrome:");  /* Firefox - webNavigation.onCompleted not called for these pages */
                            
                            if ((!brokenpage && perTabReadyStates[tab.id] != "complete") || ignoreBrowserZoom)  /* tab loading - probably transient change - revert change */
                            {
                                setZoomTypeLevel(tab.id,tab.url,perTabZoomTypes[tab.id],perTabZoomLevels[tab.id],false,1,
                                function(tabId,url)
                                {
                                    updateBrowserAction(tab.id,tab.url);
                                    
                                    updateContextMenus();
                                    
                                    if (tab.active)
                                    {
                                        chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tab.id], zoomlevel: perTabZoomLevels[tab.id] },checkError);
                                    }
                                });
                            }
                            else  /* tab loaded - either Zoom Page WE change echoed by browser or change initiated from browser zoom controls - update to reflect change */
                            {
                                perTabZoomLevels[tab.id] = level;
                                
                                if (zoomMode == 0 && siteZoomablePage(tab.id,tab.url) && !(imagePage(tab.id) && zm_bps_imagePerTab)) updateSiteZoomLevel(tab.url,tab.incognito,level);  /* Per-Site */
                                
                                updateBrowserAction(tab.id,tab.url);
                                
                                updateContextMenus();
                                
                                if (tab.active)
                                {
                                    chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tab.id], zoomlevel: perTabZoomLevels[tab.id] },checkError);
                                }
                            }
                        }
                    }
                    else
                    {
                        updateBrowserAction(tab.id,tab.url);
                        
                        updateContextMenus();
                        
                        if (tab.active)
                        {
                            chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tab.id], zoomlevel: perTabZoomLevels[tab.id] },checkError);
                        }
                    }
                }
            }
        });
    });
    
    /* Web navigation listeners */
    
    chrome.webNavigation.onCommitted.addListener(
    function(details)
    {
        debugHistory += "Committed(" + details.tabId + ")";
        debugHistory += "<" + details.frameId + ">";
        debugHistory += "[" + getSiteZoomType(details.url) + "," + getSiteZoomLevel(details.url) + "%]";
        debugHistory += "{" + getHost(details.url) + "}\n";
        
        chrome.tabs.get(details.tabId,
        function(tab)
        {
            if (chrome.runtime.lastError == null)  /* in case tab does not exist */
            {
                if (details.frameId == 0)  /* top-level frame - main document */
                {
                    delete perTabContentTypes[tab.id];
                    
                    perTabReadyStates[tab.id] = "loading";
                    
                    definePerTabValues(tab.id,tab.url);  /* Chrome - values will be undefined for first load in first tab */
                    
                    if (!isFirefox && details.transitionQualifiers.indexOf("forward_back") >= 0)
                    {
                        /* Chrome - page from backwards/forwards cache becomes unresponsive if zoom scope is set to per-tab during page load */
                        /*        - workaround is to reload page bypassing the backwards/forwards cache - but not bypassing the main cache */
                        
                        chrome.tabs.reload(details.tabId,{ bypassCache: false });
                    }
                    else webNavigationLoading(tab.id,tab.url,tab.discarded,false);
                }
            }
        });
    });
    
    chrome.webNavigation.onDOMContentLoaded.addListener(
    function(details)
    {
        debugHistory += "DOMloaded(" + details.tabId + ")";
        debugHistory += "<" + details.frameId + ">";
        debugHistory += "[" + getSiteZoomType(details.url) + "," + getSiteZoomLevel(details.url) + "%]";
        debugHistory += "{" + getHost(details.url) + "}\n";
        
        chrome.tabs.get(details.tabId,
        function(tab)
        {
            if (chrome.runtime.lastError == null)  /* in case tab does not exist */
            {
                if (details.frameId == 0)  /* top-level frame - main document */
                {
                    perTabReadyStates[tab.id] = "interactive";
                    
                    definePerTabValues(tab.id,details.url);  /* in case undefined */
                    
                    webNavigationLoading(tab.id,tab.url,tab.discarded,false);
                }
            }
        });
    });
    
    chrome.webNavigation.onCompleted.addListener(
    function(details)
    {
        /* Firefox - listener called as if page load when download popup window opens - see Bug 1441474 */
        
        debugHistory += "Completed(" + details.tabId + ")";
        debugHistory += "<" + details.frameId + ">";
        debugHistory += "[" + getSiteZoomType(details.url) + "," + getSiteZoomLevel(details.url) + "%]";
        debugHistory += "{" + getHost(details.url) + "}\n";
        
        chrome.tabs.get(details.tabId,
        function(tab)
        {
            if (chrome.runtime.lastError == null)  /* in case tab does not exist */
            {
                if (details.frameId == 0 && getHost(details.url) != getHost(tab.url)) return;  /* Firefox - workaround for when download popup window opens */
                
                if (details.frameId == 0)  /* top-level frame - main document */
                {
                    /* delay update of perTabReadyStates so this zoom is ignored in chrome.tabs.onZoomChange listener */
                    
                    window.setTimeout(function(tabId) { perTabReadyStates[tabId] = "complete"; },100,tab.id);
                    
                    definePerTabValues(tab.id,tab.url);  /* in case undefined */
                    
                    webNavigationLoading(tab.id,tab.url,tab.discarded,true);
                }
            }
        });
    });
    
    /* Message received listener */
    
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        var textStrings = new Array();
        var siteData = new Object();
        
        switch (message.type)
        {
            /* Messages from popup script or content scripts */
            
            case "fontreset":
                
                fontReset();
                
                break;
                
            case "zoomreset":
                
                zoomReset();
                
                break;
                
            case "zoomautofit":
                
                zoomAutoFit();
                
                break;
                
            case "zoomtype":
                
                zoomType();
                
                break;
                
            case "zoomin":
                
                zoomIn(message.shift);
                
                break;
                
            case "zoomout":
                
                zoomOut(message.shift);
                
                break;
                
            /* Messages from popup script */
            
            case "popupopened":
                
                chrome.tabs.query({ lastFocusedWindow: true, active: true },
                function(tabs)
                {
                    if (debugEnable) chrome.runtime.sendMessage({ type: "debugenable" },checkError);
                    
                    chrome.runtime.sendMessage({ type: "contenttype", contenttype: perTabContentTypes[tabs[0].id] },checkError);
                    
                    definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
                    
                    chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabs[0].id], zoomlevel: perTabZoomLevels[tabs[0].id] },checkError);
                    
                    chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabs[0].id] },checkError);
                    
                    chrome.runtime.sendMessage({ type: "newsubsitetype", subsitetype: getSubsiteType(tabs[0].url) },checkError);
                });
                
                break;
                
            case "debug":
                
                console.log("Zoom Page WE Debug History:\n" + debugHistory);
                
                debugHistory = "";
                
                break;
                
            case "subsiteclear":
                
                subsiteClear();
                
                break;
                
            case "subsitetypeselect":
                
                subsiteTypeSelect(message.subsitetype);
                
                break;
                
            case "fontup":
                
                fontUp();
                
                break;
                
            case "fontdown":
                
                fontDown();
                
                break;
                
            case "fontsizeselect":
                
                fontSizeSelect(message.fontsize);
                
                break;
                
            case "zoomlevelselect":
                
                zoomLevelSelect(message.zoomlevel);
                
                break;
                
            /* Messages from content scripts */
            
            case "scriptloaded":  /* content script loaded */
                
                if (sender.frameId == 0) perTabContentTypes[sender.tab.id] = message.contenttype;
                
                if (typeof perTabContentTypes[sender.tab.id] != "undefined" && perTabContentTypes[sender.tab.id].substr(0,5) == "image")
                {
                    delete perTabZoomTypes[sender.tab.id];
                    delete perTabZoomLevels[sender.tab.id];
                    delete perTabFontSizes[sender.tab.id];
                }
                
                definePerTabValues(sender.tab.id,sender.tab.url);  /* in case undefined */
                
                sendResponse({ zoomtype: perTabZoomTypes[sender.tab.id], zoomlevel: perTabZoomLevels[sender.tab.id], fontsize: perTabFontSizes[sender.tab.id] });
                
                updateBrowserAction(sender.tab.id,sender.tab.url);
                
                updateContextMenus();
                
                break;
                
            case "initialized":  /* DOM content loaded or later */
                
                definePerTabValues(sender.tab.id,sender.tab.url);  /* in case undefined */
                
                webNavigationLoading(sender.tab.id,sender.tab.url,sender.tab.discarded,false);
                
                break;
                
            case "imageloaded":  /* standalone image document loaded */
                
                if (sender.frameId == 0)
                {
                    /* delay update of perTabReadyStates so this zoom is ignored in chrome.tabs.onZoomChange listener */
                    
                    window.setTimeout(function(tabId) { perTabReadyStates[tabId] = "complete"; },100,sender.tab.id);
                    
                    definePerTabValues(sender.tab.id,sender.tab.url);  /* in case undefined */
                    
                    webNavigationLoading(sender.tab.id,sender.tab.url,sender.tab.discarded,false);
                }
                
                break;
                
            case "autofitrepeat":
                
                if (sender.frameId == 0)
                {
                    setZoomTypeLevel(sender.tab.id,sender.tab.url,perTabZoomTypes[sender.tab.id],message.zoomlevel,false,2,
                    function(tabId,url)
                    {
                        chrome.tabs.sendMessage(tabId,{ type: "autofititerate", setsite: message.setsite },{ frameId: 0 },checkError);
                    });
                }
                
                break;
                
            case "autofitfinish":
                
                if (sender.frameId == 0)
                {
                    if (message.setsite)
                    {
                        if (zoomMode == 0 && siteZoomablePage(sender.tab.id,sender.tab.url)) updateSiteZoomLevel(sender.tab.url,sender.tab.incognito,perTabZoomLevels[sender.tab.id]);
                    }
                    else
                    {
                        if (zoomMode == 0 && siteZoomablePage(sender.tab.id,sender.tab.url))
                        {
                            window.setTimeout(  /* allow time for setZoomTypeLevel() to complete */
                            function()
                            {
                                clearSiteZoomLevel(sender.tab.url);
                            },10);
                        }
                    }
                    
                    updateBrowserAction(sender.tab.id,sender.tab.url);
                    
                    updateContextMenus();
                    
                    if (sender.tab.id == activeTabId)
                    {
                        chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[sender.tab.id], zoomlevel: perTabZoomLevels[sender.tab.id] },checkError);
                    }
                }
                
                break;
                
            case "resize":
                
                if (sender.frameId == 0)
                {
                    if (sender.tab.id == activeTabId)
                    {
                        handleBrowserResize(sender.tab.id,sender.tab.url,sender.tab.discarded);
                    }
                }
                
                break;
                
            /* Messages from options script */
            
            case "getsitedata":
                
                textStrings[0] = "{";
                textStrings[1] = "  \"persitezoomtypes\":" + JSON.stringify(perSiteZoomTypesNotIncognito) + ",";
                textStrings[2] = "  \"persitezoomlevels\":" + JSON.stringify(perSiteZoomLevelsNotIncognito) + ",";
                textStrings[3] = "  \"persitefontsizes\":" + JSON.stringify(perSiteFontSizesNotIncognito) + ",";
                textStrings[4] = "  \"subsitetypes\":" + JSON.stringify(subsiteTypesNotIncognito);
                textStrings[5] = "}";
                
                sendResponse({ text: textStrings.join("\n") });
                
                break;
                
            case "setsitedata":
            case "clearsitedata":
                
                if (message.type == "setsitedata")
                {
                    /* Merge imported per-site data into existing per-site data in memory */
                    
                    try
                    {
                        siteData = JSON.parse(message.text);
                        
                        if (!siteData.persitezoomtypes || !siteData.persitezoomlevels || !siteData.persitefontsizes || !siteData.subsitetypes) throw false;
                        
                        Object.assign(perSiteZoomTypes,siteData.persitezoomtypes);
                        Object.assign(perSiteZoomLevels,siteData.persitezoomlevels);
                        Object.assign(perSiteFontSizes,siteData.persitefontsizes);
                        Object.assign(subsiteTypes,siteData.subsitetypes);
                        
                        Object.assign(perSiteZoomTypesNotIncognito,siteData.persitezoomtypes);
                        Object.assign(perSiteZoomLevelsNotIncognito,siteData.persitezoomlevels);
                        Object.assign(perSiteFontSizesNotIncognito,siteData.persitefontsizes);
                        Object.assign(subsiteTypesNotIncognito,siteData.subsitetypes);
                        
                        sendResponse({ imported: true });
                    }
                    catch (e) { sendResponse({ imported: false }); }
                }
                else  /* message.type == "clearsitedata" */
                {
                    /* Clear all existing per-site data in memory */
                    
                    Object.keys(perSiteZoomTypes).forEach(function(key) { delete perSiteZoomTypes[key]; });
                    Object.keys(perSiteZoomLevels).forEach(function(key) { delete perSiteZoomLevels[key]; });
                    Object.keys(perSiteFontSizes).forEach(function(key) { delete perSiteFontSizes[key]; });
                    Object.keys(subsiteTypes).forEach(function(key) { delete subsiteTypes[key]; });
                    
                    Object.keys(perSiteZoomTypesNotIncognito).forEach(function(key) { delete perSiteZoomTypesNotIncognito[key]; });
                    Object.keys(perSiteZoomLevelsNotIncognito).forEach(function(key) { delete perSiteZoomLevelsNotIncognito[key]; });
                    Object.keys(perSiteFontSizesNotIncognito).forEach(function(key) { delete perSiteFontSizesNotIncognito[key]; });
                    Object.keys(subsiteTypesNotIncognito).forEach(function(key) { delete subsiteTypesNotIncognito[key]; });
                }
                
                /* Update all per-site data in local storage */
                
                chrome.storage.local.set(
                {
                    "persite-zoomtypes": perSiteZoomTypesNotIncognito,
                    "persite-zoomlevels": perSiteZoomLevelsNotIncognito,
                    "persite-fontsizes": perSiteFontSizesNotIncognito,
                    "subsite-types": subsiteTypesNotIncognito
                });
                
                /* Update zoom type, zoom level and font size for existing tabs */
                
                if (zoomMode == 0)  /* Per-Site */
                {
                    chrome.tabs.query({ },
                    function(tabs)
                    {
                        var i;
                        
                        for (i = 0; i < tabs.length; i++)
                        {
                            definePerTabValues(tabs[i].id,tabs[i].url);  /* in case undefined */
                            
                            if (siteZoomablePage(tabs[i].id,tabs[i].url))
                            {
                                setZoomTypeLevel(tabs[i].id,tabs[i].url,getSiteZoomType(tabs[i].url),getSiteZoomLevel(tabs[i].url),false,3,
                                function(tabId,url)
                                {
                                    updateBrowserAction(tabId,url);
                                    
                                    updateContextMenus();
                                    
                                    if (tabId == activeTabId)
                                    {
                                        chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabId], zoomlevel: perTabZoomLevels[tabId] },checkError);
                                    }
                                });
                                
                                setFontSize(tabs[i].id,tabs[i].url,getSiteFontSize(tabs[i].url),1,
                                function(tabId,url)
                                {
                                    updateBrowserAction(tabId,url);
                                    
                                    updateContextMenus();
                                    
                                    if (tabId == activeTabId)
                                    {
                                        chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabId] },checkError);
                                    }
                                });
                            }
                        }
                    });
                }
                
                break;
        }
    });
    
    /* External message received listener */
    
    if (!isFirefox || ffVersion >= 54)
    {
        chrome.runtime.onMessageExternal.addListener(
        function(message,sender,sendResponse)
        {
            switch (message.type)
            {
                /* Messages from another add-on */
                
                case "externalReset":
                    
                    if (sender.id == printEditId)
                    {
                        chrome.tabs.query({ lastFocusedWindow: true, active: true },
                        function(tabs)
                        {
                            definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
                            
                            if (zoomablePage(tabs[0].id,tabs[0].url))
                            {
                                setZoomTypeLevel(tabs[0].id,tabs[0].url,0,100,false,4,
                                function(tabId,url)
                                {
                                    if (zoomMode == 0 && siteZoomablePage(tabs[0].id,tabs[0].url))
                                    {
                                        updateSiteZoomType(tabs[0].url,tabs[0].incognito,perTabZoomTypes[tabs[0].id]);
                                        
                                        updateSiteZoomLevel(tabs[0].url,tabs[0].incognito,perTabZoomLevels[tabs[0].id]);
                                    }
                                    
                                    updateBrowserAction(tabs[0].id,tabs[0].url);
                                    
                                    updateContextMenus();
                                    
                                    chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabs[0].id], zoomlevel: perTabZoomLevels[tabs[0].id] },checkError);
                                });
                            }
                            
                            if (scriptablePage(tabs[0].url))
                            {
                                setFontSize(tabs[0].id,tabs[0].url,0,2,
                                function(tabId,url)
                                {            
                                    if (zoomMode == 0) updateSiteFontSize(tabs[0].url,tabs[0].incognito,perTabFontSizes[tabs[0].id]);
                                    
                                    updateBrowserAction(tabs[0].id,tabs[0].url);
                                    
                                    updateContextMenus();
                                    
                                    chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabs[0].id] },checkError);
                                });
                            }
                        });
                    }
                    
                    break;
            }
        });
    }
}

/************************************************************************/

/* Subsite functions */

function subsiteClear()
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        updateSubsiteType(tabs[0].url,tabs[0].incognito,1);
        
        clearSiteZoomType(tabs[0].url);
        clearSiteZoomLevel(tabs[0].url);
        clearSiteFontSize(tabs[0].url);
        
        clearSubsiteType(tabs[0].url);
        
        chrome.runtime.sendMessage({ type: "newsubsitetype", subsitetype: 0 },checkError);
        
        setZoomTypeLevel(tabs[0].id,tabs[0].url,getSiteZoomType(tabs[0].url),getSiteZoomLevel(tabs[0].url),false,5,
        function(tabId,url)
        {
            updateBrowserAction(tabs[0].id,tabs[0].url);
            
            updateContextMenus();
            
            chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabs[0].id], zoomlevel: perTabZoomLevels[tabs[0].id] },checkError);
        });
        
        setFontSize(tabs[0].id,tabs[0].url,getSiteFontSize(tabs[0].url),3,
        function(tabId,url)
        {
            updateBrowserAction(tabs[0].id,tabs[0].url);
            
            updateContextMenus();
            
            chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabs[0].id] },checkError);
        });
    });
}

function subsiteTypeSelect(subsitetype)
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        var hastype,haslevel,hassize,type,level,size;
        
        hastype = hasSiteZoomType(tabs[0].url);
        haslevel = hasSiteZoomLevel(tabs[0].url);
        hassize = hasSiteFontSize(tabs[0].url);
        
        type = getSiteZoomType(tabs[0].url);
        level = getSiteZoomLevel(tabs[0].url);
        size = getSiteFontSize(tabs[0].url);
        
        updateSubsiteType(tabs[0].url,tabs[0].incognito,1);
        
        if (hastype) updateSiteZoomType(tabs[0].url,tabs[0].incognito,type);
        if (haslevel) updateSiteZoomLevel(tabs[0].url,tabs[0].incognito,level);
        if (hassize) updateSiteFontSize(tabs[0].url,tabs[0].incognito,size);
        
        updateSubsiteType(tabs[0].url,tabs[0].incognito,subsitetype);
        
        chrome.runtime.sendMessage({ type: "newsubsitetype", subsitetype: subsitetype },checkError);
        
        updateBrowserAction(tabs[0].id,tabs[0].url);
        
        updateContextMenus();
    });
}

/************************************************************************/

/* Font functions */

function fontReset()
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (scriptablePage(tabs[0].url))
        {
            setFontSize(tabs[0].id,tabs[0].url,defaultSize,4,
            function(tabId,url)
            {            
                if (zoomMode == 0)  /* Per-Site */
                {
                    window.setTimeout(  /* allow time for setFontSize() to complete */
                    function()
                    {
                        clearSiteFontSize(tabs[0].url);
                    },10);
                }
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabs[0].id] },checkError);
            });
        }
    });
}

function fontUp()
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        var i,size;
        
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (scriptablePage(tabs[0].url))
        {
            for (i = 0; i < fontSizes.length; i++)
                if (fontSizes[i] > perTabFontSizes[tabs[0].id]) break;
            
            if (i > fontSizes.length-1) i = fontSizes.length-1;
            
            size = fontSizes[i];
            
            setFontSize(tabs[0].id,tabs[0].url,size,5,
            function(tabId,url)
            {            
                if (zoomMode == 0) updateSiteFontSize(tabs[0].url,tabs[0].incognito,perTabFontSizes[tabs[0].id]);
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabs[0].id] },checkError);
            });
        }
    });
}

function fontDown()
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        var i,size;
        
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (scriptablePage(tabs[0].url))
        {
            for (i = fontSizes.length-1; i >= 0; i--)
                if (fontSizes[i] < perTabFontSizes[tabs[0].id]) break;
            
            if (i < 0) i = 0;
            
            size = fontSizes[i];
            
            setFontSize(tabs[0].id,tabs[0].url,size,6,
            function(tabId,url)
            {            
                if (zoomMode == 0) updateSiteFontSize(tabs[0].url,tabs[0].incognito,perTabFontSizes[tabs[0].id]);
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabs[0].id] },checkError);
            });
        }
    });
}

function fontSizeSelect(size)
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (scriptablePage(tabs[0].url))
        {
            setFontSize(tabs[0].id,tabs[0].url,size,7,
            function(tabId,url)
            {            
                if (zoomMode == 0) updateSiteFontSize(tabs[0].url,tabs[0].incognito,perTabFontSizes[tabs[0].id]);
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabs[0].id] },checkError);
            });
        }
    });
}

/************************************************************************/

/* Zoom functions */

function zoomReset()
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (zm_bps_applyAutoFit && scriptablePage(tabs[0].url) && !imagePage(tabs[0].id))
        {
            chrome.tabs.sendMessage(tabs[0].id,{ type: "autofitstart", setsite: false },{ frameId: 0 },checkError);
        }
        else if (zoomablePage(tabs[0].id,tabs[0].url))
        {
            setZoomTypeLevel(tabs[0].id,tabs[0].url,defaultType,(defaultType == 0) ? defaultFullLevel : defaultTextLevel,false,6,
            function(tabId,url)
            {
                if (zoomMode == 0 && siteZoomablePage(tabs[0].id,tabs[0].url))  /* Per-Site */
                {
                    window.setTimeout(  /* allow time for setZoomTypeLevel() to complete */
                    function()
                    {
                        clearSiteZoomType(tabs[0].url);
                        
                        clearSiteZoomLevel(tabs[0].url);
                    },10);
                }
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabs[0].id], zoomlevel: perTabZoomLevels[tabs[0].id] },checkError);
            });
        }
    });
}

function zoomAutoFit()
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (scriptablePage(tabs[0].url) && !imagePage(tabs[0].id))
        {
            chrome.tabs.sendMessage(tabs[0].id,{ type: "autofitstart", setsite: !zm_bps_applyAutoFit },{ frameId: 0 },checkError);
        }
    });
}

function zoomType()
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (scriptablePage(tabs[0].url))
        {
            setZoomTypeLevel(tabs[0].id,tabs[0].url,1-perTabZoomTypes[tabs[0].id],perTabZoomLevels[tabs[0].id],false,7,
            function(tabId,url)
            {
                if (zoomMode == 0)
                {
                    updateSiteZoomType(tabs[0].url,tabs[0].incognito,perTabZoomTypes[tabs[0].id]);
                    
                    updateSiteZoomLevel(tabs[0].url,tabs[0].incognito,perTabZoomLevels[tabs[0].id]);
                }
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabs[0].id], zoomlevel: perTabZoomLevels[tabs[0].id] },checkError);
            });
        }
    });
}

function zoomIn(shift)
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        var i,level,remainder;
        
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (zoomablePage(tabs[0].id,tabs[0].url))  /* small adjustment */
        {
            if (smallAdjust && shift)
            {
                level = perTabZoomLevels[tabs[0].id];
                level += smallValue;
            }
            else if (zoomAction == 0)  /* to next level */
            {
                for (i = 0; i < zoomLevels.length; i++)
                    if (zoomLevels[i] > perTabZoomLevels[tabs[0].id]) break;
                
                if (i > zoomLevels.length-1) i = zoomLevels.length-1;
                
                level = zoomLevels[i];
            }
            else  /* by fixed step */
            {
                level = perTabZoomLevels[tabs[0].id];
                remainder = level % fixedValue;
                level += fixedValue-remainder;
            }
            
            if (level > maxLevel) level = maxLevel;
            
            setZoomTypeLevel(tabs[0].id,tabs[0].url,perTabZoomTypes[tabs[0].id],level,false,8,
            function(tabId,url)
            {
                if (zoomMode == 0 && siteZoomablePage(tabs[0].id,tabs[0].url) && !(imagePage(tabs[0].id) && zm_bps_imagePerTab)) updateSiteZoomLevel(tabs[0].url,tabs[0].incognito,perTabZoomLevels[tabs[0].id]);
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabs[0].id], zoomlevel: perTabZoomLevels[tabs[0].id] },checkError);
            });
        }
    });
}

function zoomOut(shift)
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        var i,level,remainder;
        
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (zoomablePage(tabs[0].id,tabs[0].url))
        {
            if (smallAdjust && shift)
            {
                level = perTabZoomLevels[tabs[0].id];
                level -= smallValue;
            }
            else if (zoomAction == 0)  /* to next level */
            {
                for (i = zoomLevels.length-1; i >= 0; i--)
                    if (zoomLevels[i] < perTabZoomLevels[tabs[0].id]) break;
                
                if (i < 0) i = 0;
                
                level = zoomLevels[i];
            }
            else  /* by fixed step */
            {
                level = perTabZoomLevels[tabs[0].id];
                remainder = level % fixedValue;
                level -= (remainder == 0) ? fixedValue : remainder;
            }
            
            if (level < minLevel) level = minLevel;
            
            setZoomTypeLevel(tabs[0].id,tabs[0].url,perTabZoomTypes[tabs[0].id],level,false,9,
            function(tabId,url)
            {
                if (zoomMode == 0 && siteZoomablePage(tabs[0].id,tabs[0].url) && !(imagePage(tabs[0].id) && zm_bps_imagePerTab)) updateSiteZoomLevel(tabs[0].url,tabs[0].incognito,perTabZoomLevels[tabs[0].id]);
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabs[0].id], zoomlevel: perTabZoomLevels[tabs[0].id] },checkError);
            });
        }
    });
}

function zoomLevelSelect(level)
{
    chrome.tabs.query({ lastFocusedWindow: true, active: true },
    function(tabs)
    {
        definePerTabValues(tabs[0].id,tabs[0].url);  /* in case undefined */
        
        if (zoomablePage(tabs[0].id,tabs[0].url))
        {
            if (level < minLevel) level = minLevel;
            else if (level > maxLevel) level = maxLevel;
            
            setZoomTypeLevel(tabs[0].id,tabs[0].url,perTabZoomTypes[tabs[0].id],level,false,10,
            function(tabId,url)
            {
                if (zoomMode == 0 && siteZoomablePage(tabs[0].id,tabs[0].url) && !(imagePage(tabs[0].id) && zm_bps_imagePerTab)) updateSiteZoomLevel(tabs[0].url,tabs[0].incognito,perTabZoomLevels[tabs[0].id]);
                
                updateBrowserAction(tabs[0].id,tabs[0].url);
                
                updateContextMenus();
                
                chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabs[0].id], zoomlevel: perTabZoomLevels[tabs[0].id] },checkError);
            });
        }
    });
}

/************************************************************************/

/* Utility functions */

function definePerTabValues(tabId,url)
{
    if (url == "") return;  /* Chrome - initial URL */
    
    if (url == "about:blank") return;  /* Firefox - initial URL */
    
    if (zoomMode == 0 && siteZoomablePage(tabId,url) && !(zm_bps_imagePerTab && imagePage(tabId)))  /* Per-Site */
    {
        if (typeof perTabZoomTypes[tabId] == "undefined") perTabZoomTypes[tabId] = getSiteZoomType(url);
        
        if (typeof perTabZoomLevels[tabId] == "undefined") perTabZoomLevels[tabId] = getSiteZoomLevel(url);
        
        if (typeof perTabFontSizes[tabId] == "undefined") perTabFontSizes[tabId] = getSiteFontSize(url);
    }
    else  /* Per-Tab */
    {
        if (typeof perTabZoomTypes[tabId] == "undefined") perTabZoomTypes[tabId] = (!scriptablePage(url)) ? 0 : defaultType;
        else if (!scriptablePage(url)) perTabZoomTypes[tabId] = 0;
        
        if (typeof perTabZoomLevels[tabId] == "undefined") perTabZoomLevels[tabId] = (((!scriptablePage(url)) ? 0 : defaultType) == 0) ? defaultFullLevel : defaultTextLevel;
        
        if (typeof perTabFontSizes[tabId] == "undefined") perTabFontSizes[tabId] = (!scriptablePage(url)) ? 0 : defaultSize;
        else if (!scriptablePage(url)) perTabFontSizes[tabId] = 0;
    }
}

function reapplyZoomToAllTabs()
{
    chrome.tabs.query({ },
    function(tabs)
    {
        var i;
        
        for (i = 0; i < tabs.length; i++)
        {
            definePerTabValues(tabs[i].id,tabs[i].url);  /* in case undefined */
            
            if (zoomablePage(tabs[i].id,tabs[i].url))
            {
                setZoomTypeLevel(tabs[i].id,tabs[i].url,perTabZoomTypes[tabs[i].id],perTabZoomLevels[tabs[i].id],false,11,
                function(tabId,url)
                {
                    updateBrowserAction(tabId,url);
                    
                    updateContextMenus();
                    
                    if (tabId == activeTabId)
                    {
                        chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabId], zoomlevel: perTabZoomLevels[tabId] },checkError);
                        
                        chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabId] },checkError);
                    }
                });
            }
        }
    });
}

function zoomablePage(tabId,url)
{
    /* Can (and should) browser apply Full Zoom to this page ? */
    /* Chrome - scriptable pages */
    /* Firefox - all pages - except for a few pages that should not be zoomed */
    
    if (siteZoomablePage(tabId,url)) return true;
    
    if (isFirefox)
    {
        if (perTabZoomTypes[tabId] == 0 && !zm_bps_cssFullZoom)  /* browser full zoom */
        {
            if (url.substr(0,11) != "about:blank" &&
                url.substr(0,9) != "resource:") return true;
        }
    }
    
    return false;
}

function siteZoomablePage(tabId,url)
{
    /* Can (and should) browser apply Per-Site Full Zoom to this page ? */
    /* Chrome - scriptable pages */
    /* Firefox - scriptable pages - plus pages where Firefox can apply full zoom */
    
    if (scriptablePage(url)) return true;
    
    if (isFirefox)
    {
        if (perTabZoomTypes[tabId] == 0 && !zm_bps_cssFullZoom)  /* browser full zoom */
        {
            if (url.substr(0,26) == "https://addons.mozilla.org" || url.substr(0,27) == "https://support.mozilla.org" ||
                url.substr(0,14) == "moz-extension:" || url.substr(0,7) == "chrome:" ||
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

function imagePage(tabId)
{
    if (typeof perTabContentTypes[tabId] == "undefined") return false;
    
    if (perTabContentTypes[tabId].substr(0,5) == "image") return true;
    
    return false;
}

function setZoomTypeLevel(tabId,url,type,level,skipsetzoom,callsite,callback)
{
    var browserlevel;
    
    debugHistory += "SetZoomTypeLevel(" + tabId + ")";
    debugHistory += "[" + type + "," + level + "%]";
    debugHistory += "{" + getHost(url) + "}";
    debugHistory += "#" + callsite + "#\n";
    
    if (resizeIgnoreTimeout != null) window.clearTimeout(resizeIgnoreTimeout);
    resizeIgnoreTimeout = window.setTimeout(function() { resizeIgnoreTimeout = null; },200);
    
    chrome.tabs.query({ },
    function(tabs)
    {
        var i,host,tabtotal,tabcount;
        
        for (i = 0; i < tabs.length; i++) if (tabs[i].id == tabId) break;
        if (i == tabs.length) return;  /* tab not found */
        
        if (typeof perTabReadyStates[tabId] == "undefined" ||  /* tab pending */
            (typeof tabs[i].discarded != "undefined" && tabs[i].discarded)) return;  /* tab discarded */
        
        if (type == 1) browserlevel = defaultOtherLevel;
        else browserlevel = zm_bps_cssFullZoom ? 100 : level;
        
        if (zoomMode == 0 && siteZoomablePage(tabId,url) && !(zm_bps_imagePerTab && imagePage(tabId)) && !(zm_bps_applyAutoFit && !hasSiteZoomLevel(url)))  /* Per-Site */
        {
            host = getHost(url);
            
            if (host != "")
            {
                tabtotal = 0;
                tabcount = 0;
                
                for (i = 0; i < tabs.length; i++)
                {
                    if (typeof perTabReadyStates[tabs[i].id] != "undefined" &&  /* tab not pending */
                        (typeof tabs[i].discarded == "undefined" || !tabs[i].discarded))  /* tab not discarded */
                    {
                        if (getHost(tabs[i].url) == host && !(imagePage(tabs[i].id) && zm_bps_imagePerTab))
                        {
                            perTabZoomLevels[tabs[i].id] = level;
                            
                            perTabZoomTypes[tabs[i].id] = type;
                            
                            /* Set CSS full zoom level and text zoom level */
                            
                            if (scriptablePage(tabs[i].url))
                            {
                                chrome.tabs.sendMessage(tabs[i].id,{ type: "setzoomtypelevel", zoomtype: type, zoomlevel: level },checkError);
                            }
                            
                            /* Set browser full zoom level */
                            
                            tabtotal++;
                            
                            if (!skipsetzoom)
                            {
                                chrome.tabs.setZoom(tabs[i].id,browserlevel/100,
                                function()
                                {
                                    if (++tabcount == tabtotal && typeof callback != "undefined") callback(tabId,url);
                                });
                            }
                            else if (++tabcount == tabtotal && typeof callback != "undefined") callback(tabId,url);
                        }
                    }
                }
                
                if (tabtotal == 0 && typeof callback != "undefined") callback(tabId,url);
            }
            else if (typeof callback != "undefined") callback(tabId,url);
        }
        else  /* Per-Tab */
        {
            perTabZoomLevels[tabId] = level;
            
            perTabZoomTypes[tabId] = type;
            
            /* Set CSS full zoom level and text zoom level */
            
            if (scriptablePage(url))
            {
                chrome.tabs.sendMessage(tabId,{ type: "setzoomtypelevel", zoomtype: type, zoomlevel: level },checkError);
            }
            
            /* Set browser full zoom level */
            
            chrome.tabs.setZoom(tabId,browserlevel/100,
            function()
            {
                if (typeof callback != "undefined") callback(tabId,url);
            });
        }
    });
}

function getSiteZoomType(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteZoomTypes[host] != "undefined") return perSiteZoomTypes[host];
    }
    
    return (!scriptablePage(url)) ? 0 : defaultType;
}

function getSiteZoomLevel(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteZoomLevels[host] != "undefined") return perSiteZoomLevels[host];
    }
    
    return (getSiteZoomType(url) == 0) ? defaultFullLevel : defaultTextLevel;
}

function hasSiteZoomType(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteZoomTypes[host] != "undefined") return true;
    }
    
    return false;
}

function hasSiteZoomLevel(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteZoomLevels[host] != "undefined") return true;
    }
    
    return false;
}

function clearSiteZoomType(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteZoomTypes[host] != "undefined") delete perSiteZoomTypes[host];
        if (typeof perSiteZoomTypesNotIncognito[host] != "undefined") delete perSiteZoomTypesNotIncognito[host];
        
        chrome.storage.local.set(
        {
            "persite-zoomtypes": perSiteZoomTypesNotIncognito
        });
    }
}

function clearSiteZoomLevel(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteZoomLevels[host] != "undefined") delete perSiteZoomLevels[host];
        if (typeof perSiteZoomLevelsNotIncognito[host] != "undefined") delete perSiteZoomLevelsNotIncognito[host];
        
        chrome.storage.local.set(
        {
            "persite-zoomlevels": perSiteZoomLevelsNotIncognito
        });
    }
}

function updateSiteZoomType(url,incognito,type)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        perSiteZoomTypes[host] = type;
        if (!incognito) perSiteZoomTypesNotIncognito[host] = type;
        
        chrome.storage.local.set(
        {
            "persite-zoomtypes": perSiteZoomTypesNotIncognito
        });
    }
}

function updateSiteZoomLevel(url,incognito,level)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        perSiteZoomLevels[host] = level;
        if (!incognito) perSiteZoomLevelsNotIncognito[host] = level;
        
        chrome.storage.local.set(
        {
            "persite-zoomlevels": perSiteZoomLevelsNotIncognito
        });
    }
}

function setFontSize(tabId,url,size,callsite,callback)
{
    debugHistory += "SetFontSize(" + tabId + ")";
    debugHistory += "[" + size + "px]";
    debugHistory += "{" + getHost(url) + "}";
    debugHistory += "#" + callsite + "#\n";
    
    chrome.tabs.query({ },
    function(tabs)
    {
        var i,host;
        
        for (i = 0; i < tabs.length; i++) if (tabs[i].id == tabId) break;
        if (i == tabs.length) return;  /* tab not found */
        
        if (typeof perTabReadyStates[tabId] == "undefined" ||  /* tab pending */
            (typeof tabs[i].discarded != "undefined" && tabs[i].discarded)) return;  /* tab discarded */
        
        if (imagePage(tabId) && perTabReadyStates[tabId] != "complete")
        {
            size = 0;
        }
        
        if (zoomMode == 0 && siteZoomablePage(tabId,url) && !imagePage(tabId))  /* Per-Site */
        {
            host = getHost(url);
            
            if (host != "")
            {
                for (i = 0; i < tabs.length; i++)
                {
                    if (typeof perTabReadyStates[tabs[i].id] != "undefined" &&  /* tab not pending */
                        (typeof tabs[i].discarded == "undefined" || !tabs[i].discarded))  /* tab not discarded */
                    {
                        if (getHost(tabs[i].url) == host && !imagePage(tabs[i].id))
                        {
                            /* Set font size */
                            
                            if (scriptablePage(tabs[i].url))
                            {
                                perTabFontSizes[tabs[i].id] = size;
                                
                                chrome.tabs.sendMessage(tabs[i].id,{ type: "setfontsize", fontsize: size },checkError);
                            }
                        }
                    }
                }
            }
            
            if (typeof callback != "undefined") callback(tabId,url);  /* may need to delay */
        }
        else  /* Per-Tab */
        {
            perTabFontSizes[tabId] = size;
            
            if (scriptablePage(url) && !imagePage(tabId)) chrome.tabs.sendMessage(tabId,{ type: "setfontsize", fontsize: size },checkError);
            
            if (typeof callback != "undefined") callback(tabId,url);  /* may need to delay */
        }
    });
}

function getSiteFontSize(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteFontSizes[host] != "undefined") return perSiteFontSizes[host];
    }
    
    return (!scriptablePage(url)) ? 0 : defaultSize;
}

function hasSiteFontSize(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteFontSizes[host] != "undefined") return true;
    }
    
    return false;
}

function clearSiteFontSize(url)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        if (typeof perSiteFontSizes[host] != "undefined") delete perSiteFontSizes[host];
        if (typeof perSiteFontSizesNotIncognito[host] != "undefined") delete perSiteFontSizesNotIncognito[host];
        
        chrome.storage.local.set(
        {
            "persite-fontsizes": perSiteFontSizesNotIncognito
        });
    }
}

function updateSiteFontSize(url,incognito,size)
{
    var host;
    
    host = getHost(url);
    
    if (host != "")
    {
        perSiteFontSizes[host] = size;
        if (!incognito) perSiteFontSizesNotIncognito[host] = size;
        
        chrome.storage.local.set(
        {
            "persite-fontsizes": perSiteFontSizesNotIncognito
        });
    }
}

function getSubsiteType(url)
{
    var hostpath;
    
    if (url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:")
    {
        if (zm_bps_allowSubsites)
        {
            try
            {
                if (url.substr(0,5) == "file:") hostpath = "#file#" + new URL(url).pathname;
                else hostpath = new URL(url).hostname + new URL(url).pathname;
                
                if (hostpath.substr(-1) == "/") hostpath = hostpath.substr(0,hostpath.length-1);
                
                if (typeof subsiteTypes[hostpath] != "undefined") return subsiteTypes[hostpath];
            }
            catch (e) { }
        }
    }
    
    return 0;
}

function hasSubsiteType(url)
{
    var hostpath;
    
    if (url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:")
    {
        if (zm_bps_allowSubsites)
        {
            try
            {
                if (url.substr(0,5) == "file:") hostpath = "#file#" + new URL(url).pathname;
                else hostpath = new URL(url).hostname + new URL(url).pathname;
                
                if (hostpath.substr(-1) == "/") hostpath = hostpath.substr(0,hostpath.length-1);
                
                if (typeof subsiteTypes[hostpath] != "undefined") return true;
            }
            catch (e) { }
        }
    }
    
    return false;
}

function clearSubsiteType(url)
{
    var hostpath;
    
    if (url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:")
    {
        if (zm_bps_allowSubsites)
        {
            try
            {
                if (url.substr(0,5) == "file:") hostpath = "#file#" + new URL(url).pathname;
                else hostpath = new URL(url).hostname + new URL(url).pathname;
                
                if (hostpath.substr(-1) == "/") hostpath = hostpath.substr(0,hostpath.length-1);
                
                if (typeof subsiteTypes[hostpath] != "undefined") delete subsiteTypes[hostpath];
                if (typeof subsiteTypesNotIncognito[hostpath] != "undefined") delete subsiteTypesNotIncognito[hostpath];
                
                chrome.storage.local.set(
                {
                    "subsite-types": subsiteTypesNotIncognito
                });
            }
            catch (e) { }
        }
        
    }
}

function updateSubsiteType(url,incognito,type)
{
    var hostpath;
    
    if (url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:")
    {
        if (zm_bps_allowSubsites)
        {
            try
            {
                if (url.substr(0,5) == "file:") hostpath = "#file#" + new URL(url).pathname;
                else hostpath = new URL(url).hostname + new URL(url).pathname;
                
                if (hostpath.substr(-1) == "/") hostpath = hostpath.substr(0,hostpath.length-1);
                
                subsiteTypes[hostpath] = type;
                if (!incognito) subsiteTypesNotIncognito[hostpath] = type;
                
                chrome.storage.local.set(
                {
                    "subsite-types": subsiteTypesNotIncognito
                });
            }
            catch (e) { }
        }
    }
}

function getHost(url)
{
    var i,host,maxlength,hostpath,subsite;
    var hostpathsegments = new Array();
    var subsitesegments = new Array();
    
    if (url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:")
    {
        try
        {
            if (url.substr(0,5) == "file:") host = url;
            else
            {
                host = new URL(url).hostname;
                
                if (!zm_bps_separateSites)
                {
                    i = host.lastIndexOf("." + getPublicSuffix(host));
                    i = host.substr(0,i).lastIndexOf(".");
                    if (i >= 0) host = host.substr(i+1);
                }
            }
            
            if (zm_bps_allowSubsites)
            {
                maxlength = 0;
                
                if (url.substr(0,5) == "file:") hostpath = "#file#" + new URL(url).pathname;
                else hostpath = new URL(url).hostname + new URL(url).pathname;
                
                if (hostpath.substr(-1) == "/") hostpath = hostpath.substr(0,hostpath.length-1);
                
                hostpathsegments = hostpath.split("/");
                
                for (subsite in subsiteTypes)
                {
                    if (subsiteTypes.hasOwnProperty(subsite))
                    {
                        if (subsite.length > maxlength)
                        {
                            subsitesegments = subsite.split("/");
                            
                            if (hostpath.indexOf(subsite) == 0 && hostpathsegments.length-subsitesegments.length > subsiteTypes[subsite]-2)
                            {
                                host = "subsite:" + subsite;
                                maxlength = subsite.length;
                            }
                        }
                    }
                }
            }
        }
        catch (e) { host = ""; }
    }
    else if (url.substr(0,14) == "moz-extension:" || url.substr(0,7) == "chrome:" || url.substr(0,6) == "about:")
    {
        host = url.replace(/[?#].*/,"");  /* remove query and fragment */
    }
    else host = "";
    
    return host;
}

function webNavigationLoading(tabId,url,discarded,complete)
{
    if (zoomablePage(tabId,url))
    {
        if (zoomMode == 0 && siteZoomablePage(tabId,url) && !(zm_bps_imagePerTab && imagePage(tabId)))  /* Per-Site */
        {
            if (zm_bps_applyAutoFit && scriptablePage(url) && !hasSiteZoomLevel(url) && !imagePage(tabId))
            {
                if (typeof perTabReadyStates[tabId] != "undefined" &&  /* tab not pending */
                    (typeof discarded == "undefined" || !discarded))  /* tab not discarded */
                {
                    if (complete)
                    {
                        chrome.tabs.sendMessage(tabId,{ type: "autofitstart", setsite: false },{ frameId: 0 },checkError);
                    }
                }
            }
            else
            {
                setZoomTypeLevel(tabId,url,getSiteZoomType(url),getSiteZoomLevel(url),browserPerSite,12,
                function(tabId,url)
                {
                    updateBrowserAction(tabId,url);
                    
                    updateContextMenus();
                    
                    if (tabId == activeTabId)
                    {
                        chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabId], zoomlevel: perTabZoomLevels[tabId] },checkError);
                    }
                });
            }
            
            setFontSize(tabId,url,getSiteFontSize(url),8,
            function(tabId,url)  /* called even if not scriptable page */
            {
                updateBrowserAction(tabId,url);
                
                updateContextMenus();
                
                if (tabId == activeTabId)
                {
                    chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabId] },checkError);
                }
            });
        }
        else  /* Per-Tab */
        {
            if (zm_bps_applyAutoFit && scriptablePage(url) && !imagePage(tabId))
            {
                if (typeof perTabReadyStates[tabId] != "undefined" &&  /* tab not pending */
                    (typeof discarded == "undefined" || !discarded))  /* tab not discarded */
                {
                    if (complete)
                    {
                        chrome.tabs.sendMessage(tabId,{ type: "autofitstart", setsite: false },{ frameId: 0 },checkError);
                    }
                }
            }
            else
            {
                setZoomTypeLevel(tabId,url,perTabZoomTypes[tabId],(resetOnLoad) ? ((perTabZoomTypes[tabId] == 0) ? defaultFullLevel : defaultTextLevel) : perTabZoomLevels[tabId],false,13,
                function(tabId,url)  /* called even if not scriptable page */
                {
                    updateBrowserAction(tabId,url);
                    
                    updateContextMenus();
                    
                    if (tabId == activeTabId)
                    {
                        chrome.runtime.sendMessage({ type: "newzoomtypelevel", zoomtype: perTabZoomTypes[tabId], zoomlevel: perTabZoomLevels[tabId] },checkError);
                    }
                });
            }
            
            setFontSize(tabId,url,(resetOnLoad) ? defaultSize : perTabFontSizes[tabId],9,
            function(tabId,url)
            {
                updateBrowserAction(tabId,url);
                
                updateContextMenus();
                
                if (tabId == activeTabId)
                {
                    chrome.runtime.sendMessage({ type: "newfontsize", fontsize: perTabFontSizes[tabId] },checkError);
                }
            });
        }
    }
    else
    {
        updateBrowserAction(tabId,url);
        
        updateContextMenus();
    }
}

function handleBrowserResize(tabId,url,discarded)
{
    if (resizeIgnoreTimeout != null) return;  /* ignore resizes for short period after chrome.tabs.setZoom() */
    
    if (resizeFinishTimeout != null) window.clearTimeout(resizeFinishTimeout);  /* to update zoom at end of resize */
    
    resizeFinishTimeout = window.setTimeout(
    function(tabId,url)
    {
        var i,complete;
        
        resizeFinishTimeout = null;
        
        for (i = 0; i < perTabResizeFlags.length; i++) if (i != tabId) perTabResizeFlags[i] = true;
        
        complete = (typeof perTabReadyStates[tabId] != "undefined" && perTabReadyStates[tabId] == "complete");
        
        if (zoomMode == 0 && siteZoomablePage(tabId,url) && !(zm_bps_imagePerTab && imagePage(tabId)))  /* Per-Site */
        {
            if (zm_bps_applyAutoFit && scriptablePage(url) && !hasSiteZoomLevel(url) && !imagePage(tabId))
            {
                if (typeof perTabReadyStates[tabId] != "undefined" &&  /* tab not pending */
                    (typeof discarded == "undefined" || !discarded))  /* tab not discarded */
                {
                    if (complete)
                    {
                        chrome.tabs.sendMessage(tabId,{ type: "autofitstart", setsite: false },{ frameId: 0 },checkError);
                    }
                }
            }
        }
        else  /* Per-Tab */
        {
            if (zm_bps_applyAutoFit && scriptablePage(url) && !imagePage(tabId))
            {
                if (typeof perTabReadyStates[tabId] != "undefined" &&  /* tab not pending */
                    (typeof discarded == "undefined" || !discarded))  /* tab not discarded */
                {
                    if (complete)
                    {
                        chrome.tabs.sendMessage(tabId,{ type: "autofitstart", setsite: false },{ frameId: 0 },checkError);
                    }
                }
            }
        }
    },100,tabId,url);
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
            var title,path;
            
            if (chrome.runtime.lastError == null && typeof tab != "undefined" && tab.url != "about:blank")  /* tab not closed or about:blank */
            {
                if (zoomablePage(tabId,url))
                {
                    chrome.browserAction.enable(tabId);
                    
                    if (scriptablePage(url))
                    {
                        if (perTabZoomTypes[tabId] == 0) title = "Zoom Page WE - Full Zoom " + perTabZoomLevels[tabId] + "% - Min Font " + perTabFontSizes[tabId] + "px";
                        else title = "Zoom Page WE - Text Zoom " + perTabZoomLevels[tabId] + "% - Min Font " + perTabFontSizes[tabId] + "px";
                    }
                    else
                    {
                        if (perTabZoomTypes[tabId] == 0) title = "Zoom Page WE - Full Zoom " + perTabZoomLevels[tabId] + "%";
                    }
                    
                    if (hasSubsiteType(url)) title += " - Subsite " + subsiteSymbols[getSubsiteType(url)];
                    
                    chrome.browserAction.setTitle({ tabId: tabId, title: title });
                    
                    if (showStates)
                    {
                        path = "icon16";
                        path += (perTabZoomTypes[tabId] == 0) ? "-full" : "-text";
                        path += (perTabFontSizes[tabId] != 0) ? "-min" : "";
                        path += (hasSubsiteType(url)) ? "-sub" : "";
                        path += (isFirefox) ? "-MF" : "-GC";
                        path += ".png";
                        
                        chrome.browserAction.setIcon({ tabId: tabId, path: path });
                    }
                    else
                    {
                        chrome.browserAction.setIcon({ tabId: tabId, path: "icon16.png"});
                    }
                    
                    if (showBadge)
                    {
                        if (perTabZoomLevels[tabId] >= 100) chrome.browserAction.setBadgeText({ tabId: tabId, text: "" + perTabZoomLevels[tabId] + "" });
                        else chrome.browserAction.setBadgeText({ tabId: tabId, text: "\u00A0" + perTabZoomLevels[tabId] + "\u00A0" });
                        
                        if (perTabZoomTypes[tabId] == 0) chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: "#4040C0" });
                        else chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: "#C02020" });
                    }
                    else
                    {
                        chrome.browserAction.setBadgeText({ tabId: tabId, text: "" });
                        chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: "#000000" });
                    }
                }
                else
                {
                    chrome.browserAction.disable(tabId);
                    
                    if (!isFirefox || ffVersion <= 54) chrome.browserAction.setIcon({ tabId: tabId, path: "icon16-disabled.png"});  /* Chrome or Firefox 54- - icon not changed */
                    
                    chrome.browserAction.setTitle({ tabId: tabId, title: "Zoom Page WE - cannot be used with this page" });
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
            if (zoomablePage(tabs[0].id,tabs[0].url))
            {
                chrome.contextMenus.update("zoomin",{ enabled: true });
                chrome.contextMenus.update("zoomout",{ enabled: true });
                chrome.contextMenus.update("zoomreset",{ enabled: true });
                
                if (scriptablePage(tabs[0].url))
                {
                    chrome.contextMenus.update("zoomtype",{ enabled: true });
                    chrome.contextMenus.update("zoomautofit",{ enabled: true });
                    chrome.contextMenus.update("fontreset",{ enabled: true });
                }
                else
                {
                    chrome.contextMenus.update("zoomtype",{ enabled: false });
                    chrome.contextMenus.update("zoomautofit",{ enabled: false });
                    chrome.contextMenus.update("fontreset",{ enabled: false });
                }
            }
            else
            {
                chrome.contextMenus.update("zoomin",{ enabled: false });
                chrome.contextMenus.update("zoomout",{ enabled: false });
                chrome.contextMenus.update("zoomreset",{ enabled: false });
                chrome.contextMenus.update("zoomtype",{ enabled: false });
                chrome.contextMenus.update("zoomautofit",{ enabled: false });
                chrome.contextMenus.update("fontreset",{ enabled: false });
            }
        }
    });
}

/************************************************************************/

/* Check for sendMessage errors */

function checkError()
{
    if (chrome.runtime.lastError == null) ;
    else if (chrome.runtime.lastError.message == "Could not establish connection. Receiving end does not exist.") ;  /* Chrome & Firefox - ignore */
    else if (chrome.runtime.lastError.message == "The message port closed before a response was received.") ;  /* Chrome - ignore */
    else if (chrome.runtime.lastError.message == "Message manager disconnected") ;  /* Firefox - ignore */
    else console.log("Zoom Page WE - " + chrome.runtime.lastError.message);
}

/************************************************************************/

/* Display alert notification */

function alertNotify(message)
{
    chrome.notifications.create("alert",{ type: "basic", iconUrl: "icon32.png", title: "ZOOM PAGE WE", message: "" + message });
}

/************************************************************************/

/* Display debug notification */

function debugNotify(message)
{
    chrome.notifications.create("debug",{ type: "basic", iconUrl: "icon32.png", title: "ZOOM PAGE WE - DEBUG", message: "" + message });
}

/************************************************************************/
