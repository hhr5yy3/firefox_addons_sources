/************************************************************************/
/*                                                                      */
/*      Print Edit WE - Generic WebExtension - Content Pages            */
/*                                                                      */
/*      Javascript for Editing Content Pages (main frame)               */
/*                                                                      */
/*      Last Edit - 26 Jul 2023                                         */
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
/*  https://developer.chrome.com/extensions/xhr                         */
/*                                                                      */
/*  https://developer.chrome.com/extensions/match_patterns              */
/*                                                                      */
/*  https://developer.chrome.com/extensions/runtime                     */
/*  https://developer.chrome.com/extensions/storage                     */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Current Mode                                                        */
/*                                                                      */
/*          -2 = URL committed                                          */
/*          -1 = Script loaded and GUI initialized                      */
/*           0 = Transitioning - blocking web requests                  */
/*           1 = Suspended - blocking web requests                      */
/*           2 = Editing - blocking web requests                        */
/*                                                                      */
/************************************************************************/

/* Shares global variable/function namespace with other content scripts */

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;
var ffVersion;

var platformOS;

var hideSelect,formatInspect,undoReinstate,textpiecesBreaks,textpiecesEnable,viewmoreEnable,webstyleEnable,graphicsDelete; 
var imagesNoBreaks,fontsNoLigatures,linksHideShowUrls,linksUrlsVisibility,previewAutoClose,closeDoNotAsk,unloadAskOnly;
var selectBorder,selectArea,captureSnap;

var guiContainer = null;
var toolbarHeight = 31;

var curMode = -2;

var popupOpen = 0;  /* 0 = none, 1 = inspect panel, 2 = select menu, 3 = delete except menu, 4 = format panel, 5 = text panel,
                       6 = save panel, 7 = PDF setup panel, 8 = tools menu, 9 = help panel, 10 = format and inspect panels */

var downFlag = false;
var downKeys = 0;
var downPageX = 0;
var downPageY = 0;

var captureBox = null;
var captureWindow = null;
var captureWidth = 0;
var captureHeight = 0;
var captureLeft = 0;
var captureTop = 0;

var downPanel = null;
var downOffsetX = 0;
var downOffsetY =0;

var scrollIncX = 0;
var scrollIncY = 0;
var scrollScreenX = 0;
var scrollScreenY = 0;
var scrollTimeout = null;

var formatFirstCmd = false;

var textContainer = "";
var textPieceValue = "";
var textInsertValue = "";
var textInsertType = "";
var textFirstCmd = false;

var printMediaQuery;

var saveCmdNumber = 0;
var saveInProgress = false;

var cmdNumber = 0;

var highlightStack = new Array();

var highlightElement = null;
var highlightBox = null;

var selectCount = new Array();
var selectElement = new Array();  /* two dimensional */
var selectBox = new Array();

var captureAll = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4zjOaXUAAAACpJREFUKFONyKENAAAIA7D9tP9vA08qEDVNMv1hClOYwhSmMIUpTGFe0wVvY3eJZ3Uc2wAAAABJRU5ErkJggg==";
var captureGraphicsLeft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAAXSURBVChTY8AO/htjYqxgVCFtFP43BgBisTvFbKwfDwAAAABJRU5ErkJggg==";
var captureGraphicsRight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAAXSURBVChTY2Bg+G+MibGCUYX0U8jAAAAOTDvFe4Ki3gAAAABJRU5ErkJggg==";
var captureDeleteTop = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4zjOaXUAAAABhJREFUKFNjYGD4b0wcxiqIDY8CygEDAwBpEBfp7rnlRgAAAABJRU5ErkJggg==";
var captureDeleteBottom = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4zjOaXUAAAABZJREFUKFNjGAXUAv+NicNYBdHxf2MAxf8X6T4nSAgAAAAASUVORK5CYII=";

var hiddenElements = new Array("area","base","datalist","head","link","meta","param","rp","script","source","style","template","track","title");  /* W3C HTML5 10.3.1 Hidden Elements */

var styleAnimations = "body, body *, #printedit-gui-container, #printedit-gui-container * { animation: none !important; -webkit-animation: none !important; transition-property: none !important; }";

var styleLigatures = "body, body * { font-variant-ligatures: none !important; }";

var styleLinksUrlsHide = "@media print { a[href]:after { content: none !important; } }";
var styleLinksUrlsShow = "@media print { a[href]:after { content: ' [' attr(href) ']' !important; word-break: break-all !important; } }";

var styleLineBreaks = "body span[printedit-break-wrapper] { margin-left: -10px !important; border-left: 10px solid transparent !important; }" +
                      "body span[printedit-break-wrapper] span { position: relative !important; pointer-events: none !important; }" +
                      "body span[printedit-break-wrapper] span::before { content: '' !important; display: inline-block !important; position: absolute !important;" +
                          "left: 0px !important; top: 10% !important; width: 9px !important; height: calc(90% - 1px) !important; margin-left: -10px !important;" +
                          "border-width: 0px 1px 1px 0px !important; border-style: solid !important; border-color: red !important; }" +
                      "body span[printedit-break-wrapper] span::after { content: '' !important; display: inline-block !important; position: absolute !important;" +
                          "left: -3px !important; top: calc(100% - 4px) !important; width: 1px !important; height: 1px !important; margin-left: -10px !important;" +
                          "background-clip: content-box !important; background-color: red !important;" +
                          "border-width: 3px !important; border-style: solid !important; border-color: transparent !important; border-right-color: red !important; }";

var styleViewMore = "body, body * { display: inline !important; opacity: 1 !important; visibility: visible !important;}" +
                    "body, body :is(address,article,aside,blockquote,center,details,dd,dir,dl,div,dt,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,listing,main,menu,multicol,nav,ol,p,plaintext,pre,section,summary,ul,xmp) { display: block !important; }" +
                    "body marquee { display: inline-block !important; }" +
                    "body li { display: list-item !important; }" +
                    "body slot { display: contents !important; }" +
                    "body table { display: table !important; }" +
                    "body caption { display: table-caption !important; }" +
                    "body tr { display: table-row !important; }" +
                    "body col { display: table-column !important; }" +
                    "body colgroup { display: table-column-group !important; }" +
                    "body tbody { display: table-row-group !important; }" +
                    "body thead { display: table-header-group !important; }" +
                    "body tfoot { display: table-footer-group !important; }" +
                    "body :is(td,th) { display: table-cell !important; }" +
                    "body ruby { display: ruby !important; }" +
                    "body rb { display: ruby-base !important; }" +
                    "body rt { display: ruby-text !important; }" +
                    "body rtc { display: ruby-text-container !important; }" +
                    "body :is(area,base,basefont,datalist,link,meta,noembed,noframes,param,rp,script,source,style,template,title,track) { display: none !important; }" +
                    "body audio:not([controls]), body dialog:not([open]) { display: none !important; }";

/* Firefox - chrome.tabs.saveAsPDF() did not support toFileName parameter until Firefox 75 - see Bug 1483590 */

var backupTitle;
var backupHeaderLeft,backupHeaderCenter,backupHeaderRight;
var backupFooterLeft,backupFooterCenter,backupFooterRight;

/************************************************************************/

/* Initialize on script load */

chrome.storage.local.get(null,
function(object)
{
    /* Load environment */
    
    isFirefox = object["environment-isfirefox"];
    
    if (isFirefox) ffVersion = object["environment-ffversion"];
    
    platformOS = object["environment-platformos"];
    
    if (isFirefox) document.documentElement.setAttribute("isfirefox","");
    
    /* Load options */
    
    hideSelect = object["options-hide-select"];
    formatInspect = object["options-format-inspect"];
    undoReinstate = object["options-undo-reinstate"];
    textpiecesBreaks = object["options-textpieces-breaks"];
    textpiecesEnable = object["options-textpieces-enable"];
    viewmoreEnable = object["options-viewmore-enable"];
    webstyleEnable = object["options-webstyle-enable"];
    graphicsDelete = object["options-graphics-delete"];
    imagesNoBreaks = object["options-images-nobreaks"];
    fontsNoLigatures = object["options-fonts-noligatures"];
    linksHideShowUrls = object["options-links-hideshowurls"];
    linksUrlsVisibility = object["options-links-urlsvisibility"];
    previewAutoClose = object["options-preview-autoclose"];
    closeDoNotAsk = object["options-close-donotask"];
    unloadAskOnly = object["options-unload-askonly"];
    
    selectBorder = object["options-select-border"];
    selectArea = object["options-select-area"];
    captureSnap = object["options-capture-snap"];
    
    /* Add listeners */
    
    addListeners();
    
    /* Script loaded */
    
    chrome.runtime.sendMessage({ type: "scriptLoaded" });
});

/************************************************************************/

/* Add listeners */

function addListeners()
{
    /* Storage changed listener */
    
    chrome.storage.onChanged.addListener(
    function(changes,areaName)
    {
        /* Reload options */
        
        if ("options-hide-select" in changes) hideSelect = changes["options-hide-select"].newValue;
        if ("options-format-inspect" in changes) formatInspect = changes["options-format-inspect"].newValue;
        if ("options-undo-reinstate" in changes) undoReinstate = changes["options-undo-reinstate"].newValue;
        if ("options-textpieces-breaks" in changes) textpiecesBreaks = changes["options-textpieces-breaks"].newValue;
        if ("options-textpieces-enable" in changes) textpiecesEnable = changes["options-textpieces-enable"].newValue;
        if ("options-viewmore-enable" in changes) viewmoreEnable = changes["options-viewmore-enable"].newValue;
        if ("options-webstyle-enable" in changes) webstyleEnable = changes["options-webstyle-enable"].newValue;
        if ("options-graphics-delete" in changes) graphicsDelete = changes["options-graphics-delete"].newValue;
        if ("options-preview-autoclose" in changes)previewAutoClose = changes["options-preview-autoclose"].newValue;
        if ("options-close-donotask" in changes) closeDoNotAsk = changes["options-close-donotask"].newValue;
        if ("options-unload-askonly" in changes) unloadAskOnly = changes["options-unload-askonly"].newValue;
        
        if ("options-select-border" in changes) selectBorder = changes["options-select-border"].newValue;
        if ("options-select-area" in changes) selectArea = changes["options-select-area"].newValue;
        if ("options-capture-snap" in changes) captureSnap = changes["options-capture-snap"].newValue;
        
        /* Re-draw highlight and select boxes */
        
        if ("options-select-border" in changes || "options-select-area" in changes)
        {
            if (curMode == 2)  /* editing */
            {
                showHighlightBox();
                showSelectBoxes();
            }
        }
        
        /* Enable or disable line breaks */
        
        if ("options-textpieces-breaks" in changes)
        {
            if (document.getElementById("printedit-textpieces").hasAttribute("checked"))
            {
                if (curMode >= 1)
                {
                    disableTextPieces(document.body);
                    enableTextPieces(document.body,textpiecesBreaks);
                }
            }
        }
    });
    
    /* Message received listener */
    
    chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        switch (message.type)
        {
            /* Messages from background page */
            
            case "initializeGUI":
                
                if (allowedScheme(document.URL)) loadGUI();
                
                break;
                
            case "startEditing":
                
                backupScrollSettings();
                
                backupZoomLevels();
                
                beginBlocking();
                
                break;
                
            case "closeEditing":
                
                if (curMode > 0 )  /* editing or suspended */
                {
                    finishEditing();
                }
                
                break;
                
            case "toggleMode":
                
                if (curMode == 1)  /* suspended */
                {
                    resumeEditing();
                }
                else if (curMode == 2)  /* editing */
                {
                    suspendEditing();
                }
                
                break;
                
            case "saveDone":
                
                cmdSaveDone(message.savetype,message.success);
                
                break;
                
            case "removeBeforeUnload":
                
                window.onbeforeunload = null;
                
                break;
        }
    });
}

/************************************************************************/

/* Allowed scheme */

function allowedScheme(url)
{
    return (url.substr(0,5) == "http:" || url.substr(0,6) == "https:" || url.substr(0,5) == "file:");
}

/************************************************************************/

/* Load GUI */

function loadGUI()
{
    var i,count,parser,resourcedoc;
    var xhr = new Array();
    var resources = new Array("toolbar","inspect-panel","deleteexcept-menu","select-menu","format-panel",
                              "text-panel","save-menu","savepdf-panel","tools-menu","help-panel");
    
    /* Create GUI Container element */
    
    guiContainer = document.createElement("div");
    guiContainer.setAttribute("id","printedit-gui-container");
    guiContainer.style.setProperty("position","static","important");
    
    /* Load HTML resource files into GUI Container element */
    
    count = 0;
    
    for (i = 0; i < resources.length; i++)
    {
        request(i);
    }
    
    function request(i)
    {
        xhr[i] = new XMLHttpRequest();
        xhr[i].open("GET",chrome.runtime.getURL(resources[i] + ".html"),true);
        xhr[i].onload = complete;
        xhr[i].send();
        
        function complete()
        {
            if (xhr[i].status == 200)
            {
                /* Parse file document */
                
                parser = new DOMParser();
                resourcedoc = parser.parseFromString(xhr[i].responseText,"text/html");
                
                /* Append print edit toolbar, menus and panels */
                
                guiContainer.appendChild(resourcedoc.getElementById("printedit-" + resources[i]));
                
                if (++count == resources.length)
                {
                    /* Backup scroll settings */
                    
                    backupScrollSettings();
                    
                    /* Backup zoom levels */
                    
                    backupZoomLevels();
                    
                    /* Initialize GUI */
                    
                    initializeGUI();
                    
                    /* Add GUI listeners */
                    
                    addGUIListeners();
                    
                    /* Set current mode to script loaded and GUI initialized */
                    
                    curMode = -1;
                    
                    chrome.runtime.sendMessage({ type: "setCurMode", curmode: curMode });
                    
                    beginBlocking();
                }
            }
        }
    }
}

/************************************************************************/

/* Initialize GUI */

function initializeGUI()
{
    var select,selectwidth,deselect,deselectwidth;
    var toolbar,textarea;
    var buttonRect = new Object();
    
    /* Insert print edit toolbar, menus and panels */
    
    insertGUIContainer();
    
    /* Show toolbar */
    
    toolbar = document.getElementById("printedit-toolbar");
    toolbar.style.setProperty("display","flex","important");
    
    /* Equalize widths of select and deselect buttons */
    
    select = document.getElementById("printedit-select");
    buttonRect = select.getBoundingClientRect();
    selectwidth = buttonRect.width;
    
    deselect = document.getElementById("printedit-deselect");
    buttonRect = deselect.getBoundingClientRect();
    deselectwidth = buttonRect.width;
    
    if (selectwidth < deselectwidth) select.style.setProperty("width",(deselectwidth-10)+"px","important");
    else deselect.style.setProperty("width",(selectwidth-10)+"px","important");
    
    deselect.style.setProperty("display","none","important");
    
    /* Set first show flag for panels */
    
    document.getElementById("printedit-format-panel").firstShow = true;
    document.getElementById("printedit-text-panel").firstShow = true;
    document.getElementById("printedit-savepdf-panel").firstShow = true;
    document.getElementById("printedit-help-panel").firstShow = true;
    
    /* Workaround to allow <textarea> in Text Panel to shrink below original width */  /*???*/
    
    textarea = document.getElementById("printedit-text-textarea");
    textarea.resizeStarted = false;
    textarea.addEventListener("mousedown",observeTextArea,true);
    
    function observeTextArea(event)
    {
        textarea.originalWidth = textarea.clientWidth;
        textarea.addEventListener("mousemove",resizeTextArea,true);
        window.addEventListener("mouseup",ignoreTextArea,true);
    }
    
    function resizeTextArea(event)
    {
        var width;
        
        if (!textarea.resizeStarted)
        {
            if (textarea.clientWidth != textarea.originalWidth)
            {
                textarea.resizeStarted = true;
                textarea.resizeStartX = event.clientX;
            }
        }
        else
        {
            width = textarea.originalWidth+(event.clientX-textarea.resizeStartX);
            if (width < textarea.originalWidth) textarea.style.setProperty("width",width+"px","important");
        }
    }
    
    function ignoreTextArea(event)
    {
        textarea.resizeStarted = false;
        textarea.removeEventListener("mousemove",resizeTextArea,true);
        window.removeEventListener("mouseup",ignoreTextArea,true);
    }
    
    /* Hide save as menu items and help panel items for Firefox/Chrome */
    
    if (isFirefox)
    {
        document.getElementById("printedit-save-mhtml").style.setProperty("display","none","important");
        document.getElementById("printedit-save-separator-1").style.setProperty("display","none","important");
        
        document.getElementById("printedit-help-save-chrome").style.setProperty("display","none","important");
        
        /* Save as PDF not available for Firefox < 56 on Windows/Linux or for Firefox < 81 on Mac OS X */
        
        if ((ffVersion >= 56 && platformOS != "mac") || (ffVersion >= 81 && platformOS == "mac"))
        {
            document.getElementById("printedit-help-save-firefox").style.setProperty("display","none","important");
        }
        else
        {
            document.getElementById("printedit-save-separator-2").style.setProperty("display","none","important");
            document.getElementById("printedit-save-pdf").style.setProperty("display","none","important");
        
            document.getElementById("printedit-help-save-pdf-firefox").style.setProperty("display","none","important");
        }
    }
    else  /* Chrome */
    {
        /* Save As PDF not available for Chrome */
        
        document.getElementById("printedit-save-separator-2").style.setProperty("display","none","important");
        document.getElementById("printedit-save-pdf").style.setProperty("display","none","important");
        
        document.getElementById("printedit-help-save-firefox").style.setProperty("display","none","important");
        document.getElementById("printedit-help-save-pdf-firefox").style.setProperty("display","none","important");
    }
    
    /* Disable edit and undo buttons */
    
    disableEditButtons();
    disableUndoButtons();
    
    /* Disable other buttons */
    
    disableOtherButtons();
    
    /* Load panel settings from local storage */
    
    chrome.storage.local.get(null,
    function(object)
    {
        /* Format properties states */
        
        document.getElementById("printedit-format-position").checked = object["format-position"];
        document.getElementById("printedit-format-left").checked = object["format-left"];
        document.getElementById("printedit-format-top").checked = object["format-top"];
        document.getElementById("printedit-format-width").checked = object["format-width"];
        document.getElementById("printedit-format-height").checked = object["format-height"];
        document.getElementById("printedit-format-margin-l").checked = object["format-margin-l"];
        document.getElementById("printedit-format-margin-r").checked = object["format-margin-r"];
        document.getElementById("printedit-format-margin-t").checked = object["format-margin-t"];
        document.getElementById("printedit-format-margin-b").checked = object["format-margin-b"];
        document.getElementById("printedit-format-padding-l").checked = object["format-padding-l"];
        document.getElementById("printedit-format-padding-r").checked = object["format-padding-r"];
        document.getElementById("printedit-format-padding-t").checked = object["format-padding-t"];
        document.getElementById("printedit-format-padding-b").checked = object["format-padding-b"];
        document.getElementById("printedit-format-border").checked = object["format-border"];
        document.getElementById("printedit-format-outline").checked = object["format-outline"];
        document.getElementById("printedit-format-overflow").checked = object["format-overflow"];
        
        document.getElementById("printedit-format-color").checked = object["format-color"];
        document.getElementById("printedit-format-background").checked = object["format-background"];
        document.getElementById("printedit-format-fontfamily").checked = object["format-fontfamily"];
        document.getElementById("printedit-format-fontstyle").checked = object["format-fontstyle"];
        document.getElementById("printedit-format-fontsize").checked = object["format-fontsize"];
        document.getElementById("printedit-format-lineheight").checked = object["format-lineheight"];
        document.getElementById("printedit-format-verticalalign").checked = object["format-verticalalign"];
        document.getElementById("printedit-format-textalign").checked = object["format-textalign"];
        document.getElementById("printedit-format-textdecoration").checked = object["format-textdecoration"];
        document.getElementById("printedit-format-texttransform").checked = object["format-texttransform"];
        document.getElementById("printedit-format-liststyle").checked = object["format-liststyle"];
        document.getElementById("printedit-format-tableborder").checked = object["format-tableborder"];
        document.getElementById("printedit-format-whitespace").checked = object["format-whitespace"];
        document.getElementById("printedit-format-float").checked = object["format-float"];
        document.getElementById("printedit-format-clear").checked = object["format-clear"];
        document.getElementById("printedit-format-pagebreak").checked = object["format-pagebreak"];
        
        /* Format properties values */
        
        document.getElementById("printedit-format-position-value").textContent = object["format-position-value"];
        document.getElementById("printedit-format-left-value").textContent = object["format-left-value"];
        document.getElementById("printedit-format-top-value").textContent = object["format-top-value"];
        document.getElementById("printedit-format-width-value").textContent = object["format-width-value"];
        document.getElementById("printedit-format-height-value").textContent = object["format-height-value"];
        document.getElementById("printedit-format-margin-l-value").textContent = object["format-margin-l-value"];
        document.getElementById("printedit-format-margin-r-value").textContent = object["format-margin-r-value"];
        document.getElementById("printedit-format-margin-t-value").textContent = object["format-margin-t-value"];
        document.getElementById("printedit-format-margin-b-value").textContent = object["format-margin-b-value"];
        document.getElementById("printedit-format-padding-l-value").textContent = object["format-padding-l-value"];
        document.getElementById("printedit-format-padding-r-value").textContent = object["format-padding-r-value"];
        document.getElementById("printedit-format-padding-t-value").textContent = object["format-padding-t-value"];
        document.getElementById("printedit-format-padding-b-value").textContent = object["format-padding-b-value"];
        document.getElementById("printedit-format-border-value").textContent = object["format-border-value"];
        document.getElementById("printedit-format-outline-value").textContent = object["format-outline-value"];
        document.getElementById("printedit-format-overflow-value").textContent = object["format-overflow-value"];
        
        document.getElementById("printedit-format-color-value").textContent = object["format-color-value"];
        document.getElementById("printedit-format-background-value").textContent = object["format-background-value"];
        document.getElementById("printedit-format-fontfamily-value").textContent = object["format-fontfamily-value"];
        document.getElementById("printedit-format-fontstyle-value").textContent = object["format-fontstyle-value"];
        document.getElementById("printedit-format-fontsize-value").textContent = object["format-fontsize-value"];
        document.getElementById("printedit-format-lineheight-value").textContent = object["format-lineheight-value"];
        document.getElementById("printedit-format-verticalalign-value").textContent = object["format-verticalalign-value"];
        document.getElementById("printedit-format-textalign-value").textContent = object["format-textalign-value"];
        document.getElementById("printedit-format-textdecoration-value").textContent = object["format-textdecoration-value"];
        document.getElementById("printedit-format-texttransform-value").textContent = object["format-texttransform-value"];
        document.getElementById("printedit-format-liststyle-value").textContent = object["format-liststyle-value"];
        document.getElementById("printedit-format-tableborder-value").textContent = object["format-tableborder-value"];
        document.getElementById("printedit-format-whitespace-value").textContent = object["format-whitespace-value"];
        document.getElementById("printedit-format-float-value").textContent = object["format-float-value"];
        document.getElementById("printedit-format-clear-value").textContent = object["format-clear-value"];
        document.getElementById("printedit-format-pagebreak-value").textContent = object["format-pagebreak-value"];
        
        /* Format controls */
        
        document.getElementById("printedit-format-subelements").checked = object["format-subelements"];
        document.getElementById("printedit-format-important").checked = object["format-important"];
        document.getElementById("printedit-format-restrict").checked = object["format-restrict"];
        document.getElementById("printedit-format-restrict-mode").value = object["format-restrict-mode"];
        document.getElementById("printedit-format-restrict-type").value = object["format-restrict-type"];
        
        /* Format show properties */
        
        if (object["format-showprops"]) cmdFormatToggleProps();
        
        /* Text insert type */
        
        textInsertType = object["text-insert-type"];
        
        /* Save As PDF settings */
        
        document.getElementById("printedit-savepdf-papersize").value = object["options-savepdf-papersize"];
        document.getElementById("printedit-savepdf-orientation").value = object["options-savepdf-orientation"];
        document.getElementById("printedit-savepdf-paperwidth").value = object["options-savepdf-paperwidth"];
        document.getElementById("printedit-savepdf-paperheight").value = object["options-savepdf-paperheight"];
        document.getElementById("printedit-savepdf-scaling").value = object["options-savepdf-scaling"];
        document.getElementById("printedit-savepdf-shrinktofit").checked = object["options-savepdf-shrinktofit"];
        
        document.getElementById("printedit-savepdf-backgroundcolors").checked = object["options-savepdf-backgroundcolors"];
        document.getElementById("printedit-savepdf-backgroundimages").checked = object["options-savepdf-backgroundimages"];
        
        document.getElementById("printedit-savepdf-paperwidth").disabled = (document.getElementById("printedit-savepdf-papersize").value != 8);
        document.getElementById("printedit-savepdf-paperheight").disabled = (document.getElementById("printedit-savepdf-papersize").value != 8);
        document.getElementById("printedit-savepdf-scaling").disabled = document.getElementById("printedit-savepdf-shrinktofit").checked;
        
        /* Help show pane */
        
        document.getElementById("printedit-help-radio-" + object["help-showpane"]).checked = true;
        
        document.getElementById("printedit-help-" + object["help-showpane"]).setAttribute("printedit-showpane","");
    });
}

/************************************************************************/

/* Add GUI listeners */

function addGUIListeners()
{
    /* Toolbar button event listeners */
    
    document.getElementById("printedit-select").addEventListener("click",function() { cmdSelect(); },false);
    document.getElementById("printedit-deselect").addEventListener("click",function() { cmdDeselect(); },false);
    document.getElementById("printedit-hide").addEventListener("click",function() { cmdHide(); },false);
    document.getElementById("printedit-delete").addEventListener("click",function() { cmdDelete(); },false);
    document.getElementById("printedit-hideexcept").addEventListener("click",function() { cmdHideExcept(); },false);
    document.getElementById("printedit-deleteexcept").addEventListener("click",function() { cmdDeleteExcept(); },false);
    document.getElementById("printedit-format").addEventListener("click",function() { cmdFormat(); },false);
    document.getElementById("printedit-text").addEventListener("click",function() { cmdText(); },false);
    document.getElementById("printedit-undo").addEventListener("click",function() { cmdUndo(); },false);
    document.getElementById("printedit-undoall").addEventListener("click",function() { cmdUndoAll(); },false);
    document.getElementById("printedit-save").addEventListener("click",function() { cmdSave(); },false);
    document.getElementById("printedit-textpieces").addEventListener("click",function() { cmdTextPieces(); },false);
    document.getElementById("printedit-viewmore").addEventListener("click",function() { cmdViewMore(); },false);
    document.getElementById("printedit-webstyle").addEventListener("click",function() { cmdWebStyle(); },false);
    document.getElementById("printedit-preview").addEventListener("click",function() { cmdPreview(); },false);
    document.getElementById("printedit-close").addEventListener("click",function() { cmdClose(); },false);
    document.getElementById("printedit-tools").addEventListener("click",function() { cmdTools(); },false);
    document.getElementById("printedit-help").addEventListener("click",function() { cmdHelp(); },false);
    
    /* Inspect panel event listeners */
    
    document.getElementById("printedit-inspect-expand").addEventListener("click",function() { cmdExpand(); },false);
    document.getElementById("printedit-inspect-shrink").addEventListener("click",function() { cmdShrink(); },false);
    document.getElementById("printedit-inspect-backwards").addEventListener("click",function() { cmdBackwards(); },false);
    document.getElementById("printedit-inspect-forwards").addEventListener("click",function() { cmdForwards(); },false);
    document.getElementById("printedit-inspect-select").addEventListener("click",function() { cmdSelectElement(); },false);
    document.getElementById("printedit-inspect-close").addEventListener("click",function() { closePopup(true); },false);
    
    /* Select menu event listeners */
    
    document.getElementById("printedit-select-all").addEventListener("click",function() { cmdSelectAll(); },false);
    document.getElementById("printedit-select-graphics").addEventListener("click",function() { cmdSelectGraphics(); },false);
    document.getElementById("printedit-select-pagebreaks").addEventListener("click",function() { cmdSelectPageBreaks(); },false);
    document.getElementById("printedit-select-previous").addEventListener("click",function() { cmdSelectPrevious(); },false);
    
    /* Delete except menu event listeners */
    
    document.getElementById("printedit-deleteexcept-restricted").addEventListener("click",function() { cmdDeleteExceptRestricted(); },false);
    document.getElementById("printedit-deleteexcept-withoutfloat").addEventListener("click",function() { cmdDeleteExceptWithoutFloat(); },false);
    document.getElementById("printedit-deleteexcept-unrestricted").addEventListener("click",function() { cmdDeleteExceptUnrestricted(); },false);
    
    /* Format panel event listeners */
    
    document.getElementById("printedit-format-close").addEventListener("click",function() { closePopup(false); },false);
    
    document.getElementById("printedit-format-textstyle").addEventListener("click",function() { cmdFormatTextStyle(); },false);
    document.getElementById("printedit-format-decoration").addEventListener("click",function() { cmdFormatDecoration(); },false);
    document.getElementById("printedit-format-margins").addEventListener("click",function() { cmdFormatMargins(); },false);
    document.getElementById("printedit-format-dimensions").addEventListener("click",function() { cmdFormatDimensions(); },false);
    document.getElementById("printedit-format-blocklayout").addEventListener("click",function() { cmdFormatBlockLayout(); },false);
    document.getElementById("printedit-format-setall").addEventListener("click",function() { cmdFormatSetAll(true); },false);
    document.getElementById("printedit-format-clearall").addEventListener("click",function() { cmdFormatSetAll(false); },false);
    
    document.getElementById("printedit-format-position").addEventListener("click",function() { cmdFormatToggleState("position"); },false);
    document.getElementById("printedit-format-position-value").addEventListener("click",function() { cmdFormatResetValue("position","static"); },false);
    document.getElementById("printedit-format-position-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("position","static,absolute,fixed,relative,sticky"); },false);
    document.getElementById("printedit-format-position-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("position","static,absolute,fixed,relative,sticky"); },false);
    
    document.getElementById("printedit-format-left").addEventListener("click",function() { cmdFormatToggleState("left"); },false);
    document.getElementById("printedit-format-left-value").addEventListener("click",function() { cmdFormatResetValue("left","auto"); },false);
    document.getElementById("printedit-format-left-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("left","-200px,-150px,-100px,-50px,-30px,-20px,-10px,auto,0px,10px,20px,30px,50px,100px,150px,200px,250px,300px,400px,500px,600px,800px,1000px"); },false);
    document.getElementById("printedit-format-left-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("left","-200px,-150px,-100px,-50px,-30px,-20px,-10px,auto,0px,10px,20px,30px,50px,100px,150px,200px,250px,300px,400px,500px,600px,800px,1000px"); },false);
    
    document.getElementById("printedit-format-top").addEventListener("click",function() { cmdFormatToggleState("top"); },false);
    document.getElementById("printedit-format-top-value").addEventListener("click",function() { cmdFormatResetValue("top","auto"); },false);
    document.getElementById("printedit-format-top-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("top","-200px,-150px,-100px,-50px,-30px,-20px,-10px,auto,0px,10px,20px,30px,50px,100px,150px,200px,250px,300px,400px,500px,600px,800px,1000px"); },false);
    document.getElementById("printedit-format-top-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("top","-200px,-150px,-100px,-50px,-30px,-20px,-10px,auto,0px,10px,20px,30px,50px,100px,150px,200px,250px,300px,400px,500px,600px,800px,1000px"); },false);
    
    document.getElementById("printedit-format-width").addEventListener("click",function() { cmdFormatToggleState("width"); },false);
    document.getElementById("printedit-format-width-value").addEventListener("click",function() { cmdFormatResetValue("width","auto"); },false);
    document.getElementById("printedit-format-width-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("width","auto,10px,15px,20px,25px,30px,40px,50px,60px,80px,100px,150px,200px,250px,300px,400px,500px,600px,800px,1000px"); },false);
    document.getElementById("printedit-format-width-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("width","auto,10px,15px,20px,25px,30px,40px,50px,60px,80px,100px,150px,200px,250px,300px,400px,500px,600px,800px,1000px"); },false);
    
    document.getElementById("printedit-format-height").addEventListener("click",function() { cmdFormatToggleState("height"); },false);
    document.getElementById("printedit-format-height-value").addEventListener("click",function() { cmdFormatResetValue("height","auto"); },false);
    document.getElementById("printedit-format-height-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("height","auto,10px,15px,20px,25px,30px,40px,50px,60px,80px,100px,150px,200px,250px,300px,400px,500px,600px,800px,1000px"); },false);
    document.getElementById("printedit-format-height-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("height","auto,10px,15px,20px,25px,30px,40px,50px,60px,80px,100px,150px,200px,250px,300px,400px,500px,600px,800px,1000px"); },false);
    
    document.getElementById("printedit-format-margin-l").addEventListener("click",function() { cmdFormatToggleState("margin-l"); },false);
    document.getElementById("printedit-format-margin-l-value").addEventListener("click",function() { cmdFormatResetValue("margin-l","0px"); },false);
    document.getElementById("printedit-format-margin-l-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("margin-l","-200px,-150px,-100px,-50px,-30px,-20px,-10px,0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    document.getElementById("printedit-format-margin-l-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("margin-l","-200px,-150px,-100px,-50px,-30px,-20px,-10px,0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    
    document.getElementById("printedit-format-margin-r").addEventListener("click",function() { cmdFormatToggleState("margin-r"); },false);
    document.getElementById("printedit-format-margin-r-value").addEventListener("click",function() { cmdFormatResetValue("margin-r","0px"); },false);
    document.getElementById("printedit-format-margin-r-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("margin-r","-200px,-150px,-100px,-50px,-30px,-20px,-10px,0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    document.getElementById("printedit-format-margin-r-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("margin-r","-200px,-150px,-100px,-50px,-30px,-20px,-10px,0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    
    document.getElementById("printedit-format-margin-t").addEventListener("click",function() { cmdFormatToggleState("margin-t"); },false);
    document.getElementById("printedit-format-margin-t-value").addEventListener("click",function() { cmdFormatResetValue("margin-t","0px"); },false);
    document.getElementById("printedit-format-margin-t-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("margin-t","-200px,-150px,-100px,-50px,-30px,-20px,-10px,0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    document.getElementById("printedit-format-margin-t-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("margin-t","-200px,-150px,-100px,-50px,-30px,-20px,-10px,0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    
    document.getElementById("printedit-format-margin-b").addEventListener("click",function() { cmdFormatToggleState("margin-b"); },false);
    document.getElementById("printedit-format-margin-b-value").addEventListener("click",function() { cmdFormatResetValue("margin-b","0px"); },false);
    document.getElementById("printedit-format-margin-b-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("margin-b","-200px,-150px,-100px,-50px,-30px,-20px,-10px,0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    document.getElementById("printedit-format-margin-b-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("margin-b","-200px,-150px,-100px,-50px,-30px,-20px,-10px,0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    
    document.getElementById("printedit-format-padding-l").addEventListener("click",function() { cmdFormatToggleState("padding-l"); },false);
    document.getElementById("printedit-format-padding-l-value").addEventListener("click",function() { cmdFormatResetValue("padding-l","0px"); },false);
    document.getElementById("printedit-format-padding-l-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("padding-l","0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    document.getElementById("printedit-format-padding-l-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("padding-l","0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    
    document.getElementById("printedit-format-padding-r").addEventListener("click",function() { cmdFormatToggleState("padding-r"); },false);
    document.getElementById("printedit-format-padding-r-value").addEventListener("click",function() { cmdFormatResetValue("padding-r","0px"); },false);
    document.getElementById("printedit-format-padding-r-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("padding-r","0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    document.getElementById("printedit-format-padding-r-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("padding-r","0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    
    document.getElementById("printedit-format-padding-t").addEventListener("click",function() { cmdFormatToggleState("padding-t"); },false);
    document.getElementById("printedit-format-padding-t-value").addEventListener("click",function() { cmdFormatResetValue("padding-t","0px"); },false);
    document.getElementById("printedit-format-padding-t-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("padding-t","0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    document.getElementById("printedit-format-padding-t-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("padding-t","0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    
    document.getElementById("printedit-format-padding-b").addEventListener("click",function() { cmdFormatToggleState("padding-b"); },false);
    document.getElementById("printedit-format-padding-b-value").addEventListener("click",function() { cmdFormatResetValue("padding-b","0px"); },false);
    document.getElementById("printedit-format-padding-b-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("padding-b","0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    document.getElementById("printedit-format-padding-b-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("padding-b","0px,2px,4px,6px,8px,10px,15px,20px,25px,30px,50px,100px,150px,200px"); },false);
    
    document.getElementById("printedit-format-float").addEventListener("click",function() { cmdFormatToggleState("float"); },false);
    document.getElementById("printedit-format-float-value").addEventListener("click",function() { cmdFormatResetValue("float","none"); },false);
    document.getElementById("printedit-format-float-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("float","none,left,right"); },false);
    document.getElementById("printedit-format-float-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("float","none,left,right"); },false);
    
    document.getElementById("printedit-format-clear").addEventListener("click",function() { cmdFormatToggleState("clear"); },false);
    document.getElementById("printedit-format-clear-value").addEventListener("click",function() { cmdFormatResetValue("clear","none"); },false);
    document.getElementById("printedit-format-clear-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("clear","none,left,right,both"); },false);
    document.getElementById("printedit-format-clear-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("clear","none,left,right,both"); },false);
    
    document.getElementById("printedit-format-pagebreak").addEventListener("click",function() { cmdFormatToggleState("pagebreak"); },false);
    document.getElementById("printedit-format-pagebreak-value").addEventListener("click",function() { cmdFormatResetValue("pagebreak","auto"); },false);
    document.getElementById("printedit-format-pagebreak-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("pagebreak","auto,before,after,\u00ACinside"); },false);
    document.getElementById("printedit-format-pagebreak-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("pagebreak","auto,before,after,\u00ACinside"); },false);
    
    document.getElementById("printedit-format-color").addEventListener("click",function() { cmdFormatToggleState("color"); },false);
    document.getElementById("printedit-format-color-value").addEventListener("click",function() { cmdFormatResetValue("color","black"); },false);
    document.getElementById("printedit-format-color-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("color","black,dark,onyx,iron,gray,silver,white,red,green,blue,yellow"); },false);
    document.getElementById("printedit-format-color-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("color","black,dark,onyx,iron,gray,silver,white,red,green,blue,yellow"); },false);
    
    document.getElementById("printedit-format-background").addEventListener("click",function() { cmdFormatToggleState("background"); },false);
    document.getElementById("printedit-format-background-value").addEventListener("click",function() { cmdFormatResetValue("background","transparent"); },false);
    document.getElementById("printedit-format-background-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("background","transparent,white,light,quartz,steel,silver,gray,black,red,green,blue,yellow"); },false);
    document.getElementById("printedit-format-background-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("background","transparent,white,light,quartz,steel,silver,gray,black,red,green,blue,yellow"); },false);
    
    document.getElementById("printedit-format-fontfamily").addEventListener("click",function() { cmdFormatToggleState("fontfamily"); },false);
    document.getElementById("printedit-format-fontfamily-value").addEventListener("click",function() { cmdFormatResetValue("fontfamily","Arial"); },false);
    document.getElementById("printedit-format-fontfamily-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("fontfamily","Arial,Calibri,Courier,Georgia,Times,Verdana"); },false);
    document.getElementById("printedit-format-fontfamily-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("fontfamily","Arial,Calibri,Courier,Georgia,Times,Verdana"); },false);
    
    document.getElementById("printedit-format-fontstyle").addEventListener("click",function() { cmdFormatToggleState("fontstyle"); },false);
    document.getElementById("printedit-format-fontstyle-value").addEventListener("click",function() { cmdFormatResetValue("fontstyle","normal"); },false);
    document.getElementById("printedit-format-fontstyle-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("fontstyle","normal,italic,bold"); },false);
    document.getElementById("printedit-format-fontstyle-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("fontstyle","normal,italic,bold"); },false);
    
    document.getElementById("printedit-format-fontsize").addEventListener("click",function() { cmdFormatToggleState("fontsize"); },false);
    document.getElementById("printedit-format-fontsize-value").addEventListener("click",function() { cmdFormatResetValue("fontsize","10px"); },false);
    document.getElementById("printedit-format-fontsize-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("fontsize","10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,22px,24px,26px,28px,30px,35px,40px,45px,50px,60px,70px,80px,90px,100px"); },false);
    document.getElementById("printedit-format-fontsize-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("fontsize","10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,22px,24px,26px,28px,30px,35px,40px,45px,50px,60px,70px,80px,90px,100px"); },false);
    
    document.getElementById("printedit-format-lineheight").addEventListener("click",function() { cmdFormatToggleState("lineheight"); },false);
    document.getElementById("printedit-format-lineheight-value").addEventListener("click",function() { cmdFormatResetValue("lineheight","1.0"); },false);
    document.getElementById("printedit-format-lineheight-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("lineheight","0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0"); },false);
    document.getElementById("printedit-format-lineheight-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("lineheight","0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0"); },false);
    
    document.getElementById("printedit-format-verticalalign").addEventListener("click",function() { cmdFormatToggleState("verticalalign"); },false);
    document.getElementById("printedit-format-verticalalign-value").addEventListener("click",function() { cmdFormatResetValue("verticalalign","baseline"); },false);
    document.getElementById("printedit-format-verticalalign-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("verticalalign","baseline,sub,super,bottom,middle,top"); },false);
    document.getElementById("printedit-format-verticalalign-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("verticalalign","baseline,sub,super,bottom,middle,top"); },false);
    
    document.getElementById("printedit-format-textalign").addEventListener("click",function() { cmdFormatToggleState("textalign"); },false);
    document.getElementById("printedit-format-textalign-value").addEventListener("click",function() { cmdFormatResetValue("textalign","left"); },false);
    document.getElementById("printedit-format-textalign-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("textalign","left,center,right"); },false);
    document.getElementById("printedit-format-textalign-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("textalign","left,center,right"); },false);
    
    document.getElementById("printedit-format-textdecoration").addEventListener("click",function() { cmdFormatToggleState("textdecoration"); },false);
    document.getElementById("printedit-format-textdecoration-value").addEventListener("click",function() { cmdFormatResetValue("textdecoration","none"); },false);
    document.getElementById("printedit-format-textdecoration-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("textdecoration","none,under,over,through"); },false);
    document.getElementById("printedit-format-textdecoration-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("textdecoration","none,under,over,through"); },false);
    
    document.getElementById("printedit-format-texttransform").addEventListener("click",function() { cmdFormatToggleState("texttransform"); },false);
    document.getElementById("printedit-format-texttransform-value").addEventListener("click",function() { cmdFormatResetValue("texttransform","none"); },false);
    document.getElementById("printedit-format-texttransform-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("texttransform","none,capital,lower,upper"); },false);
    document.getElementById("printedit-format-texttransform-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("texttransform","none,capital,lower,upper"); },false);
    
    document.getElementById("printedit-format-liststyle").addEventListener("click",function() { cmdFormatToggleState("liststyle"); },false);
    document.getElementById("printedit-format-liststyle-value").addEventListener("click",function() { cmdFormatResetValue("liststyle","none"); },false);
    document.getElementById("printedit-format-liststyle-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("liststyle","none,disc,square"); },false);
    document.getElementById("printedit-format-liststyle-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("liststyle","none,disc,square"); },false);
    
    document.getElementById("printedit-format-tableborder").addEventListener("click",function() { cmdFormatToggleState("tableborder"); },false);
    document.getElementById("printedit-format-tableborder-value").addEventListener("click",function() { cmdFormatResetValue("tableborder","collapse"); },false);
    document.getElementById("printedit-format-tableborder-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("tableborder","collapse,0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,12px,14px,16px,18px,20px,25px,30px"); },false);
    document.getElementById("printedit-format-tableborder-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("tableborder","collapse,0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,12px,14px,16px,18px,20px,25px,30px"); },false);
    
    document.getElementById("printedit-format-whitespace").addEventListener("click",function() { cmdFormatToggleState("whitespace"); },false);
    document.getElementById("printedit-format-whitespace-value").addEventListener("click",function() { cmdFormatResetValue("whitespace","normal"); },false);
    document.getElementById("printedit-format-whitespace-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("whitespace","normal,nowrap,pre,pre-line,pre-wrap"); },false);
    document.getElementById("printedit-format-whitespace-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("whitespace","normal,nowrap,pre,pre-line,pre-wrap"); },false);
    
    document.getElementById("printedit-format-border").addEventListener("click",function() { cmdFormatToggleState("border"); },false);
    document.getElementById("printedit-format-border-value").addEventListener("click",function() { cmdFormatResetValue("border","0px"); },false);
    document.getElementById("printedit-format-border-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("border","0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,12px,14px,16px,18px,20px"); },false);
    document.getElementById("printedit-format-border-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("border","0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,12px,14px,16px,18px,20px"); },false);
    
    document.getElementById("printedit-format-outline").addEventListener("click",function() { cmdFormatToggleState("outline"); },false);
    document.getElementById("printedit-format-outline-value").addEventListener("click",function() { cmdFormatResetValue("outline","0px"); },false);
    document.getElementById("printedit-format-outline-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("outline","0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,12px,14px,16px,18px,20px"); },false);
    document.getElementById("printedit-format-outline-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("outline","0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,12px,14px,16px,18px,20px"); },false);
    
    document.getElementById("printedit-format-overflow").addEventListener("click",function() { cmdFormatToggleState("overflow"); },false);
    document.getElementById("printedit-format-overflow-value").addEventListener("click",function() { cmdFormatResetValue("overflow","visible"); },false);
    document.getElementById("printedit-format-overflow-prevvalue").addEventListener("mousedown",function() { cmdFormatPrevValue("overflow","visible,hidden"); },false);
    document.getElementById("printedit-format-overflow-nextvalue").addEventListener("mousedown",function() { cmdFormatNextValue("overflow","visible,hidden"); },false);
    
    document.getElementById("printedit-format-restrict").addEventListener("click",function() { cmdFormatRestrictChange(); },false);
    
    document.getElementById("printedit-format-showprops").addEventListener("click",function() { cmdFormatToggleProps(); },false);
    document.getElementById("printedit-format-hideprops").addEventListener("click",function() { cmdFormatToggleProps(); },false);
    document.getElementById("printedit-format-resetvalues").addEventListener("click",function() { cmdFormatResetValues(); },false);
    document.getElementById("printedit-format-pagebreaks").addEventListener("click",function() { cmdPageBreaks(); },false);
    document.getElementById("printedit-format-apply").addEventListener("click",function() { cmdFormatApply(false); },false);
    document.getElementById("printedit-format-okay").addEventListener("click",function() { cmdFormatApply(true); },false);
    
    /* Text panel event listeners */
    
    document.getElementById("printedit-text-close").addEventListener("click",function() { closePopup(false); },false);
    
    document.getElementById("printedit-text-textarea").addEventListener("input",function() { cmdTextInput(); },false);
    document.getElementById("printedit-text-insert-type").addEventListener("change",function() { cmdTextType(); },false);
    document.getElementById("printedit-text-apply").addEventListener("click",function() { cmdTextApply(false); },false);
    document.getElementById("printedit-text-okay").addEventListener("click",function() { cmdTextApply(true); },false);
    
    /* Save menu event listeners */
    
    document.getElementById("printedit-save-html").addEventListener("click",function() { cmdSaveStart(0); },false);
    document.getElementById("printedit-save-mhtml").addEventListener("click",function() { cmdSaveStart(1); },false);
    document.getElementById("printedit-save-pdf").addEventListener("click",function() { cmdSaveAsPDF(); },false);
    
    /* Save As PDF panel event listeners */
    
    document.getElementById("printedit-savepdf-close").addEventListener("click",function() { closePopup(false); },false);
    
    document.getElementById("printedit-savepdf-papersize").addEventListener("change",function() { cmdSaveAsPDFPaperSize(); },false);
    document.getElementById("printedit-savepdf-shrinktofit").addEventListener("click",function() { cmdSaveAsPDFShrinkToFit(); },false);
    
    document.getElementById("printedit-savepdf-save").addEventListener("click",function() { cmdSaveAsPDFSave(); },false);
    
    /* Help panel event listeners */
    
    document.getElementById("printedit-help-radio-button").addEventListener("click",function() { cmdHelpShowPane("button"); },false);
    document.getElementById("printedit-help-radio-toolbar").addEventListener("click",function() { cmdHelpShowPane("toolbar"); },false);
    document.getElementById("printedit-help-radio-inspect").addEventListener("click",function() { cmdHelpShowPane("inspect"); },false);
    document.getElementById("printedit-help-radio-mouse").addEventListener("click",function() { cmdHelpShowPane("mouse"); },false);
    document.getElementById("printedit-help-radio-keyboard").addEventListener("click",function() { cmdHelpShowPane("keyboard"); },false);
    document.getElementById("printedit-help-close").addEventListener("click",function() { closePopup(false); },false);
    
    /* Tools menu event listeners */
    
    document.getElementById("printedit-tools-fixpagebreaks-all").addEventListener("click",function() { cmdToolsFixPageBreaks("all"); },false);
    document.getElementById("printedit-tools-fixpagebreaks-display").addEventListener("click",function() { cmdToolsFixPageBreaks("display"); },false);
    document.getElementById("printedit-tools-fixpagebreaks-position").addEventListener("click",function() { cmdToolsFixPageBreaks("position"); },false);
    document.getElementById("printedit-tools-fixpagebreaks-float").addEventListener("click",function() { cmdToolsFixPageBreaks("float"); },false);
    document.getElementById("printedit-tools-options").addEventListener("click",function() { cmdToolsOptions(); },false);
    
    /* Create query for print media listener */
    
    if (!isFirefox) printMediaQuery = window.matchMedia("print");
}

/************************************************************************/

/* Begin web request blocking */

function beginBlocking()
{
    /* Set current mode to transitioning - blocking web requests */
    
    curMode = 0;
    
    chrome.runtime.sendMessage({ type: "setCurMode", curmode: curMode });
    
    /* Allow time for any web requests in progress to be sent */
    
    window.setTimeout(
    function()
    {
        /* Start editing */
        
        startEditing();
    },100);
}

/************************************************************************/

/* Backup/Restore scroll settings */

function backupScrollSettings()
{
    /* Backup scroll settings */
    
    backupStyleProperty(document.documentElement,"overflow-x","overflow-x");
    backupStyleProperty(document.documentElement,"overflow-y","overflow-y");
    
    /* Set scroll setting to auto */
    
    document.documentElement.style.setProperty("overflow-x","auto","important");
    document.documentElement.style.setProperty("overflow-y","auto","important");
}

function restoreScrollSettings()
{
    /* Restore scroll settings */
    
    restoreStyleProperty(document.documentElement,"overflow-x","overflow-x");
    restoreStyleProperty(document.documentElement,"overflow-y","overflow-y");
}

/************************************************************************/

/* Backup/Restore zoom levels */

function backupZoomLevels()
{
    /* Backup CSS zoom level */
    
    if (!isFirefox) backupStyleProperty(document.body,"zoom","zoom");
    backupStyleProperty(document.body,"transform","transform-scale");
    
    /* Backup browser zoom level */
    
    chrome.runtime.sendMessage({ type: "backupZoom" });
    
    /* Set CSS zoom level to 100% */
    
    if (!isFirefox) document.body.style.setProperty("zoom","1.0","important");  /* override CSS 'zoom: N;' zooming */
    document.body.style.setProperty("transform","none","important");  /* override CSS 'transform: scale(N,N);' zooming */
    
    /* Set browser zoom to 100% */
    
    chrome.runtime.sendMessage({ type: "resetZoom" });
}

function restoreZoomLevels()
{
    /* Restore CSS zoom level */
    
    if (!isFirefox) restoreStyleProperty(document.body,"zoom","zoom");
    restoreStyleProperty(document.body,"transform","transform-scale");
    
    /* Restore browser zoom level */
    
    chrome.runtime.sendMessage({ type: "restoreZoom" });
}

/************************************************************************/

/* Insert/Remove GUI container */

function insertGUIContainer()
{
    var height;
    
    /* Backup html styling */
    
    backupStyleProperty(document.documentElement,"position","position");
    backupStyleProperty(document.documentElement,"margin","margin");
    backupStyleProperty(document.documentElement,"padding","padding");
    backupStyleProperty(document.documentElement,"border","border");
    backupStyleProperty(document.documentElement,"height","height");
    
    /* Backup body styling */
    
    backupStyleProperty(document.body,"transform","transform-translateY");
    backupStyleProperty(document.body,"-webkit-transform","-webkit-transform-translateY");
    backupStyleProperty(document.body,"height","height");
    
    /* Position document html */
    
    document.documentElement.style.setProperty("position","static","important");
    document.documentElement.style.setProperty("margin","0px","important");
    document.documentElement.style.setProperty("padding","0px","important");
    document.documentElement.style.setProperty("border","0px none","important");
    
    /* Transform body coordinates */
    
    document.body.style.setProperty("transform","translateY(" + toolbarHeight + "px)","important");
    document.body.style.setProperty("-webkit-transform","translateY(" + toolbarHeight + "px)","important");
    
    /* Avoid display issues when body height less than viewport height */
    
    height = window.getComputedStyle(document.body,null).getPropertyValue("height");
    height = height.substr(0,height.length-2);
    
    if (height < window.innerHeight)
    {
        document.documentElement.style.setProperty("height","100%","important");
        document.body.style.setProperty("height","100%","important");
    }
    
    /* Insert print edit toolbar, menus and panels */
    
    document.documentElement.appendChild(guiContainer);
}

function removeGUIContainer()
{
    /* Restore html styling */
    
    restoreStyleProperty(document.documentElement,"position","position");
    restoreStyleProperty(document.documentElement,"margin","margin");
    restoreStyleProperty(document.documentElement,"padding","padding");
    restoreStyleProperty(document.documentElement,"border","border");
    restoreStyleProperty(document.documentElement,"height","height");
    
    /* Restore body styling */
    
    restoreStyleProperty(document.body,"transform","transform-translateY");
    restoreStyleProperty(document.body,"-webkit-transform","-webkit-transform-translateY");
    restoreStyleProperty(document.body,"height","height");
    
    /* Remove print edit toolbar, menus and panels */
    
    document.documentElement.removeChild(guiContainer);
}

/************************************************************************/

/* Initiated from print edit toolbar button */

function startEditing()
{
    var selection,version;
    
    /* Insert print edit toolbar, menus and panels */
    
    if (guiContainer.parentNode == null) insertGUIContainer();
    
    /* Initialize for print edit mode */
    
    cmdNumber = 0;
    selectCount[0] = 0;
    selectElement[0] = new Array();
    
    saveCmdNumber = 0;
    
    /* Get compatibility version for edits made in previous session */
    
    version = "";
    
    if (document.body.hasAttribute("printedit-previous"))
    {
        version = document.body.getAttribute("printedit-previous");
        
        if (version == "") version = "7.0";  /* first version to allow saving edited web page */
    }
    
    /* Set compatibility version - for edits made in current session */
    
    document.body.setAttribute("printedit-previous","16.1");
    
    /* Initialize view more, text pieces and web style buttons */
    
    if (textpiecesEnable) document.getElementById("printedit-textpieces").setAttribute("checked","");
    else document.getElementById("printedit-textpieces").removeAttribute("checked");
    
    if (viewmoreEnable) document.getElementById("printedit-viewmore").setAttribute("checked","");
    else document.getElementById("printedit-viewmore").removeAttribute("checked");
    
    if (webstyleEnable) document.getElementById("printedit-webstyle").setAttribute("checked","");
    else document.getElementById("printedit-webstyle").removeAttribute("checked");
    
    /* Prevent leaving or reloading page */
    
    window.onbeforeunload = onBeforeUnload;
    
    /* Force focus onto main frame */
    
    document.activeElement.blur();
    
    /* Add window focus listeners */
    
    window.addEventListener("focus",onFocus,true);
    window.addEventListener("blur",onBlur,true);
    
    /* Add window mouse listeners */
    
    window.addEventListener("mouseover",onMouseOver,true);
    window.addEventListener("mouseout",onMouseOut,true);
    window.addEventListener("mouseenter",onEventDisable,true);
    window.addEventListener("mouseleave",onEventDisable,true);
    window.addEventListener("mousedown",onMouseDown,true);
    window.addEventListener("mousemove",onMouseMove,true);
    window.addEventListener("mouseup",onMouseUp,true);
    window.addEventListener("click",onClick,true);
    window.addEventListener("auxclick",onAuxClick,true);
    window.addEventListener("dblclick",onDblClick,true);
    window.addEventListener("contextmenu",onContextMenu,true);
    window.addEventListener("wheel",onWheel,true);
    
    /* Add window touch listeners */
    
    window.addEventListener("touchstart",onEventDisable,true);
    window.addEventListener("touchend",onEventDisable,true);
    window.addEventListener("touchmove",onEventDisable,true);
    window.addEventListener("touchcancel",onEventDisable,true);
    
    /* Add window keyboard listeners */
    
    window.addEventListener("keydown",onKeyDown,true);
    window.addEventListener("keyup",onEventDisable,true);
    window.addEventListener("keypress",onKeyPress,true);
    
    /* Add window scroll and resize/zoom listeners */
    
    window.addEventListener("scroll",onScroll,true);
    window.addEventListener("resize",onResize,true);
    
    /* Clear any text selections */
    
    selection = window.getSelection();
    if (selection.rangeCount > 0) selection.removeAllRanges();
    
    /* Prepare elements before starting */
    
    prepareBeforeStart(document.body,version);
    
    /* Prepare cross-origin frames */
    
    chrome.runtime.sendMessage({ type: "frameStart" });
    
    /* Display using screen or print stylesheets for screen device */
    
    if (document.getElementById("printedit-webstyle").hasAttribute("checked")) displayForDifferentDevice("screen");
    else displayForDifferentDevice("print");
    
    /* Select and delete graphics */
    
    if (graphicsDelete)
    {
        cmdSelectGraphics();
        cmdDelete();
    }
    
    /* Set current mode to suspended - blocking web requests */
    
    curMode = 1;
    
    chrome.runtime.sendMessage({ type: "setCurMode", curmode: curMode });
    
    /* Enter editing mode */
    
    resumeEditing();
}

/************************************************************************/

/* Called from startEditing and after print or save */

function resumeEditing()
{
    var selectIndex,element;
    
    /* Add [EDIT] prefix in tab title */
    
    document.title = "[EDIT] " + document.title;
    
    /* Insert print edit toolbar, menus and panels */
    
    if (guiContainer.parentNode == null) insertGUIContainer();
    
    /* Enable other buttons */
    
    enableOtherButtons();
    
    /* Enable text pieces and line breaks */
    
    if (document.getElementById("printedit-textpieces").hasAttribute("checked"))
        enableTextPieces(document.body,textpiecesBreaks);
    
    /* Enable view more */
    
    if (document.getElementById("printedit-viewmore").hasAttribute("checked"))
        enableViewMore(document.body);
    
    /* Create highlight box and set default highlight element */
    
    highlightBox = createBox("highlightbox");
    highlightElement = document.body;
    
    /* Create and show select boxes */
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
    {
        element = selectElement[cmdNumber][selectIndex];
        selectBox[selectIndex] = createBox("selectbox");
        
        showBox(selectBox[selectIndex],element,0,0,0,0,0x0,0x0);
    }
    
    /* Enable edit and undo buttons */
    
    if (selectCount[cmdNumber] > 0) enableEditButtons();
    if (cmdNumber > 0) enableUndoButtons();
    
    /* Prepare elements before resuming */
    
    prepareBeforeResume(document.body);
    
    /* Set current mode to editing - blocking web requests */
    
    curMode = 2;
    
    chrome.runtime.sendMessage({ type: "setCurMode", curmode: curMode });
}

/************************************************************************/

/* Called before save or print and from finishEditing */

function suspendEditing()
{
    /* Restore elements after suspend */
    
    restoreAfterSuspend(document.body);
    
    /* Disable edit and undo buttons */
    
    disableEditButtons();
    disableUndoButtons();
    
    /* Destroy select boxes */
    
    destroySelectBoxes();
    
    /* Destroy highlight box and release highlight element */
    
    destroyBox(highlightBox);
    highlightBox = null;
    highlightElement = null;
    
    /* Disable view more */
    
    disableViewMore(document.body);
    
    /* Disable text pieces and line breaks */
    
    disableTextPieces(document.body);
    
    /* Disable other buttons */
    
    disableOtherButtons();
    
    /* Remove print edit toolbar, menus and panels */
    
    removeGUIContainer();
    
    /* Remove [EDIT] prefix in tab title */
    
    document.title = document.title.substr(7);
    
    /* Set current mode to suspended - blocking web requests */
    
    curMode = 1;
    
    chrome.runtime.sendMessage({ type: "setCurMode", curmode: curMode });
}

/************************************************************************/

/* Initiated from print edit toolbar Close button */

function finishEditing()
{
    /* Close without saving edited web page ? */
    
    if (cmdNumber != saveCmdNumber)
    {
        if (!closeDoNotAsk)
        {
            if (!confirm("PRINT EDIT WE\n\n" +
                         "Do you want to close editing without saving the edited page?\n\n")) return;
        }
    }
    
    /* Undo all commands */
    
    destroySelectBoxes();
    
    while (cmdNumber >= 0)
    {
        deselectElements();
        cmdNumber--;
    }
    
    cmdNumber = -1;
    
    undoCommands(document.body);
    
    cmdNumber = 0;
    
    saveCmdNumber = 0;
    
    /* Leave editing mode */
    
    if (curMode == 2) suspendEditing();
    
    /* Display using screen stylesheets for screen device */
    
    displayForDifferentDevice("");
    
    /* Restore cross-origin frames */
    
    chrome.runtime.sendMessage({ type: "frameFinish" });
    
    /* Restore elements after finishing */
    
    restoreAfterFinish(document.body);
    
    /* Remove window scroll and resize/zoom listeners */
    
    window.removeEventListener("scroll",onScroll,true);
    window.removeEventListener("resize",onResize,true);
    
    /* Remove window keyboard listener */
    
    window.removeEventListener("keydown",onKeyDown,true);
    window.removeEventListener("keyup",onEventDisable,true);
    window.removeEventListener("keypress",onKeyPress,true);
    
    /* Remove window touch listeners */
    
    window.removeEventListener("touchstart",onEventDisable,true);
    window.removeEventListener("touchend",onEventDisable,true);
    window.removeEventListener("touchmove",onEventDisable,true);
    window.removeEventListener("touchcancel",onEventDisable,true);
    
    /* Remove window mouse listeners */
    
    window.removeEventListener("mouseover",onMouseOver,true);
    window.removeEventListener("mouseout",onMouseOut,true);
    window.removeEventListener("mouseenter",onEventDisable,true);
    window.removeEventListener("mouseleave",onEventDisable,true);
    window.removeEventListener("mousedown",onMouseDown,true);
    window.removeEventListener("mousemove",onMouseMove,true);
    window.removeEventListener("mouseup",onMouseUp,true);
    window.removeEventListener("click",onClick,true);
    window.removeEventListener("auxclick",onAuxClick,true);
    window.removeEventListener("dblclick",onDblClick,true);
    window.removeEventListener("contextmenu",onContextMenu,true);
    window.removeEventListener("wheel",onWheel,true);
    
    /* Remove window focus listeners */
    
    window.removeEventListener("focus",onFocus,true);
    window.removeEventListener("blur",onBlur,true);
    
    /* Allow leaving or reloading page */
    
    window.onbeforeunload = null;
    
    /* Remove compatibility version */
    
    document.body.removeAttribute("printedit-previous");
    
    /* Restore original zoom levels */
    
    restoreZoomLevels();
    
    /* Restore original scroll settings */
    
    restoreScrollSettings();
    
    /* Set current mode to GUI initialized and page loaded */
    
    curMode = -1;
    
    chrome.runtime.sendMessage({ type: "setCurMode", curmode: curMode });
}

/************************************************************************/

/* Prepare before start recursive function */

function prepareBeforeStart(element,version)
{
    var i,style,selection;
    
    /* Remove editing undo information from previous session */

    if (element.hasAttribute("printedit-text-inserted"))
    {
        element.removeAttribute("printedit-text-inserted");  /* remove inserted text undo information from previously edited document */
    }
    
    if (element.hasAttribute("printedit-text"))
    {
        element.removeAttribute("printedit-text");  /* remove edited text undo information from previously edited document */
        
        if (version == "7.0" || version == "15.1") element.setAttribute("printedit-text-wrapper","");  /* 15.0 - 16.0 */
    }
    
    if (element.hasAttribute("printedit-style"))
    {
        element.removeAttribute("printedit-style");  /* remove edited style undo information from previously edited document */
    }
    
    /* Prepare specific elements */
    
    if (element.localName == "body")
    {
        /* Prevent animations and transitions on all elements */
        
        style = element.ownerDocument.createElement("style");
        style.id = "printedit-style-animations";
        style.type = "text/css";
        style.textContent = styleAnimations;
        element.ownerDocument.head.appendChild(style);
        
        /* Prevent font ligatures on all elements */
        
        if (fontsNoLigatures)
        {
            style = element.ownerDocument.createElement("style");
            style.id = "printedit-style-ligatures";
            style.type = "text/css";
            style.textContent = styleLigatures;
            element.ownerDocument.head.appendChild(style);
        }
        
        /* Prevent or force insertion of URLs after links in print media */
        
        if (linksHideShowUrls)
        {
            style = element.ownerDocument.createElement("style");
            style.id = "printedit-style-linkshideshowurls";
            style.type = "text/css";
            style.textContent = (linksUrlsVisibility == 0) ? styleLinksUrlsHide : styleLinksUrlsShow;
            element.ownerDocument.head.appendChild(style);
        }
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
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
            {
                /* Add window mouse listeners */
                
                element.contentWindow.addEventListener("mouseover",onMouseOver,true);
                element.contentWindow.addEventListener("mouseout",onMouseOut,true);
                element.contentWindow.addEventListener("mouseenter",onEventDisable,true);
                element.contentWindow.addEventListener("mouseleave",onEventDisable,true);
                element.contentWindow.addEventListener("mousedown",onMouseDown,true);
                element.contentWindow.addEventListener("mousemove",onMouseMove,true);
                element.contentWindow.addEventListener("mouseup",onMouseUp,true);
                element.contentWindow.addEventListener("click",onClick,true);
                element.contentWindow.addEventListener("auxclick",onAuxClick,true);
                element.contentWindow.addEventListener("dblclick",onDblClick,true);
                element.contentWindow.addEventListener("contextmenu",onContextMenu,true);
                element.contentWindow.addEventListener("wheel",onWheel,true);
                
                /* Add window touch listeners */
                
                element.contentWindow.addEventListener("touchstart",onEventDisable,true);
                element.contentWindow.addEventListener("touchend",onEventDisable,true);
                element.contentWindow.addEventListener("touchmove",onEventDisable,true);
                element.contentWindow.addEventListener("touchcancel",onEventDisable,true);
                
                /* Add window keyboard listeners */
                
                element.contentWindow.addEventListener("keydown",onKeyDown,true);
                element.contentWindow.addEventListener("keyup",onEventDisable,true);
                element.contentWindow.addEventListener("keypress",onEventDisable,true);
                
                /* Add window scroll and resize/zoom listeners */
                
                element.contentWindow.addEventListener("scroll",onScroll,true);
                element.contentWindow.addEventListener("resize",onResize,true);
                
                /* Clear any text selections */
                
                selection = element.contentWindow.getSelection();
                if (selection.rangeCount > 0) selection.removeAllRanges();
                
                prepareBeforeStart(element.contentDocument.body,version);
            }
        }
        catch (e)  /* attempting cross-domain web page access */
        {
            /* Disable mouse events inside <iframe> or <frame> element */
            
            backupStyleProperty(element,"pointer-events","pointer");
            
            element.style.setProperty("pointer-events","none","important");
        }
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                prepareBeforeStart(element.children[i],version);
    }
}

/************************************************************************/

/* Prepare before resume recursive function */

function prepareBeforeResume(element)
{
    var i,borderWidth,areaColor,outlineWidth;
    
    /* Prepare specific elements */
    
    if (element.localName == "object" || element.localName == "embed")
    {
        /* Add border and shading to <object> or <embed> element */
        
        backupStyleProperty(element,"border","border");
        backupStyleProperty(element,"outline","outline");
        backupStyleProperty(element,"outline-offset","offset");
        
        if (selectBorder) borderWidth = 2; else borderWidth = 1;
        if (selectArea) areaColor = "rgba(255,160,0,0.1)"; else areaColor = "rgba(0,0,0,0.0)";
        
        if (element.offsetWidth > element.offsetHeight) outlineWidth = Math.ceil((element.offsetHeight+2)/2);
        else outlineWidth = Math.ceil((element.offsetWidth+2)/2);
        
        element.style.setProperty("border",borderWidth + "px dashed rgba(255,160,0,1.0)","important");
        element.style.setProperty("outline",outlineWidth + "px solid " + areaColor,"important");
        element.style.setProperty("outline-offset","-" + outlineWidth + "px","important");
        
        return;  /* skip children */
    }
   
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
            {
                prepareBeforeResume(element.contentDocument.body);
            }
        }
        catch (e)  /* attempting cross-domain web page access */
        {
            /* Add border and shading to <iframe> or <frame> element */
            
            backupStyleProperty(element,"border","border");
            backupStyleProperty(element,"outline","outline");
            backupStyleProperty(element,"outline-offset","offset");
            
            if (selectBorder) borderWidth = 2; else borderWidth = 1;
            if (selectArea) areaColor = "rgba(127,63,0,0.1)"; else areaColor = "rgba(0,0,0,0.0)";
            
            if (element.offsetWidth > element.offsetHeight) outlineWidth = Math.ceil((element.offsetHeight+2)/2);
            else outlineWidth = Math.ceil((element.offsetWidth+2)/2);
            
            element.style.setProperty("border",borderWidth + "px dashed rgba(127,63,0,1.0)","important");
            element.style.setProperty("outline",outlineWidth + "px solid " + areaColor,"important");
            element.style.setProperty("outline-offset","-" + outlineWidth + "px","important");
        }
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                prepareBeforeResume(element.children[i]);
    }
}

/************************************************************************/

/* Restore after suspend recursive function */

function restoreAfterSuspend(element)
{
    var i;
    
    /* Restore specific elements */
    
    if (element.localName == "object" || element.localName == "embed")
    {
        /* Remove border and shading from <object> or <embed> element */
        
        restoreStyleProperty(element,"border","border");
        restoreStyleProperty(element,"outline","outline");
        restoreStyleProperty(element,"outline-offset","offset");
        
        return;  /* skip children */
    }
   
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
            {
                restoreAfterSuspend(element.contentDocument.body);
            }
        }
        catch (e)  /* attempting cross-domain web page access */
        {
            /* Remove border and shading from <iframe> or <frame> element */
            
            restoreStyleProperty(element,"border","border");
            restoreStyleProperty(element,"outline","outline");
            restoreStyleProperty(element,"outline-offset","offset");
        }
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                restoreAfterSuspend(element.children[i]);
    }
}

/************************************************************************/

/* Restore after finish recursive function */

function restoreAfterFinish(element)
{
    var i,style;
    
    /* Restore specific elements */
    
    if (element.localName == "body")
    {
        /* Allow animations and transitions on all elements */
        
        style = element.ownerDocument.getElementById("printedit-style-animations");
        element.ownerDocument.head.removeChild(style);
        
        /* Allow font ligatures on all elements */
        
        style = element.ownerDocument.getElementById("printedit-style-ligatures");
        if (style != null) element.ownerDocument.head.removeChild(style);
        
        /* Allow insertion of URLs after links in print media */
        
        style = element.ownerDocument.getElementById("printedit-style-linkshideshowurls");
        if (style != null) element.ownerDocument.head.removeChild(style);
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
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
            {
                restoreAfterFinish(element.contentDocument.body);
                
                /* Remove window scroll and resize/zoom listeners */
                
                element.contentWindow.removeEventListener("scroll",onScroll,true);
                element.contentWindow.removeEventListener("resize",onResize,true);
                
                /* Remove window keydown listener */
                
                element.contentWindow.removeEventListener("keydown",onKeyDown,true);
                element.contentWindow.removeEventListener("keyup",onEventDisable,true);
                element.contentWindow.removeEventListener("keypress",onEventDisable,true);
                
                /* Remove window touch listeners */
                
                element.contentWindow.removeEventListener("touchstart",onEventDisable,true);
                element.contentWindow.removeEventListener("touchend",onEventDisable,true);
                element.contentWindow.removeEventListener("touchmove",onEventDisable,true);
                element.contentWindow.removeEventListener("touchcancel",onEventDisable,true);
                
                /* Remove window mouse listeners */
                
                element.contentWindow.removeEventListener("mouseover",onMouseOver,true);
                element.contentWindow.removeEventListener("mouseout",onMouseOut,true);
                element.contentWindow.removeEventListener("mouseenter",onEventDisable,true);
                element.contentWindow.removeEventListener("mouseleave",onEventDisable,true);
                element.contentWindow.removeEventListener("mousedown",onMouseDown,true);
                element.contentWindow.removeEventListener("mousemove",onMouseMove,true);
                element.contentWindow.removeEventListener("mouseup",onMouseUp,true);
                element.contentWindow.removeEventListener("click",onClick,true);
                element.contentWindow.removeEventListener("auxclick",onAuxClick,true);
                element.contentWindow.removeEventListener("dblclick",onDblClick,true);
                element.contentWindow.removeEventListener("contextmenu",onContextMenu,true);
                element.contentWindow.removeEventListener("wheel",onWheel,true);
            }
        }
        catch (e)  /* attempting cross-domain web page access */
        {
            /* Re-enable mouse events inside <iframe> or <frame> element */
            
            restoreStyleProperty(element,"pointer-events","pointer");
        }
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

/* Toolbar button functions */

function enableEditButtons()
{
    document.getElementById("printedit-select").setAttribute("disabled","");
    document.getElementById("printedit-select").style.setProperty("display","none","important");
    document.getElementById("printedit-deselect").removeAttribute("disabled");
    document.getElementById("printedit-deselect").style.removeProperty("display");
    
    document.getElementById("printedit-hide").removeAttribute("disabled");
    document.getElementById("printedit-delete").removeAttribute("disabled");
    document.getElementById("printedit-hideexcept").removeAttribute("disabled");
    document.getElementById("printedit-deleteexcept").removeAttribute("disabled");
    document.getElementById("printedit-format").removeAttribute("disabled");
    if (selectCount[cmdNumber] == 1) document.getElementById("printedit-text").removeAttribute("disabled");
    else document.getElementById("printedit-text").setAttribute("disabled","");
}

function disableEditButtons()
{
    document.getElementById("printedit-select").removeAttribute("disabled");
    document.getElementById("printedit-select").style.removeProperty("display");
    document.getElementById("printedit-deselect").setAttribute("disabled","");
    document.getElementById("printedit-deselect").style.setProperty("display","none","important");
    
    document.getElementById("printedit-hide").setAttribute("disabled","");
    document.getElementById("printedit-delete").setAttribute("disabled","");
    document.getElementById("printedit-hideexcept").setAttribute("disabled","");
    document.getElementById("printedit-deleteexcept").setAttribute("disabled","");
    document.getElementById("printedit-format").setAttribute("disabled","");
    document.getElementById("printedit-text").setAttribute("disabled","");
}

function enableUndoButtons()
{
    document.getElementById("printedit-undo").removeAttribute("disabled");
    document.getElementById("printedit-undoall").removeAttribute("disabled");
}

function disableUndoButtons()
{
    document.getElementById("printedit-undo").setAttribute("disabled","");
    document.getElementById("printedit-undoall").setAttribute("disabled","");
}

function enableOtherButtons()
{
    document.getElementById("printedit-select").removeAttribute("disabled");
    document.getElementById("printedit-save").removeAttribute("disabled");
    document.getElementById("printedit-textpieces").removeAttribute("disabled");
    document.getElementById("printedit-viewmore").removeAttribute("disabled");
    document.getElementById("printedit-webstyle").removeAttribute("disabled");
    document.getElementById("printedit-preview").removeAttribute("disabled");
    document.getElementById("printedit-close").removeAttribute("disabled");
    document.getElementById("printedit-tools").removeAttribute("disabled");
    document.getElementById("printedit-help").removeAttribute("disabled");
}

function disableOtherButtons()
{
    document.getElementById("printedit-select").setAttribute("disabled","");
    document.getElementById("printedit-save").setAttribute("disabled","");
    document.getElementById("printedit-textpieces").setAttribute("disabled","");
    document.getElementById("printedit-viewmore").setAttribute("disabled","");
    document.getElementById("printedit-webstyle").setAttribute("disabled","");
    document.getElementById("printedit-preview").setAttribute("disabled","");
    document.getElementById("printedit-close").setAttribute("disabled","");
    document.getElementById("printedit-tools").setAttribute("disabled","");
    document.getElementById("printedit-help").setAttribute("disabled","");
}

/************************************************************************/

/* Toolbar and Popup utility functions */

function insideToolbar(element)
{
    while (element != null && element != document.getElementById("printedit-toolbar")) element = element.parentNode;
    
    return (element != null);
}

function insidePopup(element)
{
    while (element != null && element != document.getElementById("printedit-inspect-panel")
                           && element != document.getElementById("printedit-select-menu")
                           && element != document.getElementById("printedit-deleteexcept-menu")
                           && element != document.getElementById("printedit-format-panel")
                           && element != document.getElementById("printedit-text-panel")
                           && element != document.getElementById("printedit-save-menu")
                           && element != document.getElementById("printedit-savepdf-panel")
                           && element != document.getElementById("printedit-tools-menu")
                           && element != document.getElementById("printedit-help-panel")) element = element.parentNode;
                           
    return (element != null);
}

function showMenuPopup(buttonname,rightalign)
{
    var button,menu;
    var buttonRect = new Object();
    var menuRect = new Object();
    
    button = document.getElementById("printedit-" + buttonname);
    menu = document.getElementById("printedit-" + buttonname + "-menu");
    
    menu.style.setProperty("display","block","important");
    
    buttonRect = button.getBoundingClientRect();
    menuRect = menu.getBoundingClientRect();
    
    if (!rightalign) menu.style.setProperty("left",(buttonRect.left)+"px","important");
    else menu.style.setProperty("left",(buttonRect.right-menuRect.width)+"px","important");
}

function showPanelPopup(buttonname,panelname,rightalign)
{
    var button,panel;
    var buttonRect = new Object();
    var panelRect = new Object();
    
    button = document.getElementById("printedit-" + buttonname);
    panel = document.getElementById("printedit-" + panelname + "-panel");
    
    panel.style.setProperty("display","block","important");
    
    buttonRect = button.getBoundingClientRect();
    panelRect = panel.getBoundingClientRect();
    
    if (panel.firstShow)
    {
        panel.firstShow = false;
        
        if (!rightalign) panel.style.setProperty("left",(buttonRect.left)+"px","important");
        else panel.style.setProperty("left",(buttonRect.right-panelRect.width)+"px","important");
    }
    
    adjustPanelPopup(panelname);
}

function adjustPanelPopup(panelname)
{
    var panel,clientWidth,clientHeight,scrollWidth,scrollHeight;
    var panelRect = new Object();
    
    panel = document.getElementById("printedit-" + panelname + "-panel");
    
    panelRect = panel.getBoundingClientRect();
    
    clientWidth = window.innerWidth;
    clientHeight = window.innerHeight;
    
    scrollWidth = window.document.body.scrollWidth;
    scrollHeight = window.document.body.scrollHeight+toolbarHeight;
    
    if ((scrollHeight > clientHeight && scrollWidth > clientWidth-17) ||
        (scrollWidth > clientWidth && scrollHeight > clientHeight-17))
    {
        clientWidth -= 17;
        clientHeight -= 17;
    }
    else if (scrollHeight > clientHeight) clientWidth -= 17;
    else if (scrollWidth > clientWidth) clientHeight -= 17;
    
    if (panelRect.right > clientWidth) panel.style.setProperty("left",(clientWidth-panelRect.width)+"px","important");
    
    if (panelRect.bottom > clientHeight) panel.style.setProperty("top",(clientHeight-panelRect.height)+"px","important");
}

function closePopup(keepFormatOpen)
{
    document.getElementById("printedit-select").removeAttribute("checked");
    document.getElementById("printedit-deleteexcept").removeAttribute("checked");
    document.getElementById("printedit-text").removeAttribute("checked");
    document.getElementById("printedit-save").removeAttribute("checked");
    document.getElementById("printedit-tools").removeAttribute("checked");
    document.getElementById("printedit-help").removeAttribute("checked");
    
    document.getElementById("printedit-inspect-panel").style.setProperty("display","none","important");
    document.getElementById("printedit-select-menu").style.setProperty("display","none","important");
    document.getElementById("printedit-deleteexcept-menu").style.setProperty("display","none","important");
    document.getElementById("printedit-text-panel").style.setProperty("display","none","important");
    document.getElementById("printedit-save-menu").style.setProperty("display","none","important");
    document.getElementById("printedit-savepdf-panel").style.setProperty("display","none","important");
    document.getElementById("printedit-tools-menu").style.setProperty("display","none","important");
    document.getElementById("printedit-help-panel").style.setProperty("display","none","important");
    
    if (keepFormatOpen) popupOpen = 4;
    else
    {
        document.getElementById("printedit-format").removeAttribute("checked");
        document.getElementById("printedit-format-panel").style.setProperty("display","none","important");
        
        popupOpen = 0;
    }
}

/************************************************************************/

/* Box object constructor */

function Box()
{
    this.container = null;
    this.rects = new Array();
}

/************************************************************************/

/* Create and display boxes functions */

function createBox(type)
{
    var box,zindex;
    
    if (type == "capturebox") zindex = "2147483642";
    else if (type == "highlightbox") zindex = "2147483641";
    else if (type == "selectbox") zindex = "2147483640";
    
    box = new Box();
    
    box.container = document.createElement("div");
    box.container.setAttribute("class","printedit-" + type);
    box.container.style.setProperty("all","initial","important");
    box.container.style.setProperty("display","block","important");
    box.container.style.setProperty("position","absolute","important");
    box.container.style.setProperty("width","0px","important");
    box.container.style.setProperty("height","0px","important");
    box.container.style.setProperty("left","0px","important");
    box.container.style.setProperty("top","0px","important");
    box.container.style.setProperty("background-color","transparent","important");
    box.container.style.setProperty("z-index",zindex,"important");
    box.container.style.setProperty("pointer-events","none","important");
    
    guiContainer.appendChild(box.container);
    
    return box;
}

function destroyBox(box)
{
    var i;
    
    for (i = 0; i < box.rects.length; i++) box.container.removeChild(box.rects[i]);
    box.rects.length = 0;
    
    guiContainer.removeChild(box.container);
    box.container = null;
}

function showBox(box,element,width,height,left,top,pattern,anchor)
{
    var i,zindex,borderColor,borderWidth,borderStyle,areaColor;
    var boundingRect = new Object();
    var rects = new Array();
    
    if (box.container.getAttribute("class") == "printedit-capturebox")
    {
        zindex = "2147483642";
        borderWidth = 1;
        borderColor = "#0000FF";
    }
    else if (box.container.getAttribute("class") == "printedit-highlightbox")
    {
        zindex = "2147483641";
        if (selectBorder) borderWidth = 2; else borderWidth = 1;
        borderStyle = "solid";
        borderColor = "#FF0000";
        areaColor = "rgba(0,0,0,0.0)";
    }
    else if (box.container.getAttribute("class") == "printedit-selectbox")
    {
        zindex = "2147483640";
        if (selectBorder) borderWidth = 2; else borderWidth = 1;
        borderStyle = "dashed";
        borderColor = "#FF0000";
        if (selectArea) areaColor = "rgba(255,0,0,0.1)"; else areaColor = "rgba(0,0,0,0.0)";
    }
    
    for (i = 0; i < box.rects.length; i++) box.container.removeChild(box.rects[i]);
    box.rects.length = 0;
    
    if (box.container.getAttribute("class") == "printedit-capturebox")
    {
        box.container.style.setProperty("width",width + "px","important");
        box.container.style.setProperty("height",height + "px","important");
        box.container.style.setProperty("left",left + "px","important");
        box.container.style.setProperty("top",top + "px","important");
        
        box.rects[0] = document.createElement("div");
        
        box.rects[0].style.setProperty("all","initial","important");
        box.rects[0].style.setProperty("display","block","important");
        box.rects[0].style.setProperty("position","absolute","important");
        box.rects[0].style.setProperty("width",width + "px","important");
        box.rects[0].style.setProperty("height",height + "px","important");
        box.rects[0].style.setProperty("left","0px","important");
        box.rects[0].style.setProperty("top","0px","important");
        box.rects[0].style.setProperty("z-index",zindex,"important");
        box.rects[0].style.setProperty("pointer-events","none","important");
        box.rects[0].style.setProperty("border",borderWidth + "px solid " + borderColor,"important");
        
        if (pattern == 0) box.rects[0].style.setProperty("background","url(" + captureAll + ") repeat","important");
        else if (pattern == 1)
        {
            if (anchor == 0 || anchor == 2) box.rects[0].style.setProperty("background","url(" + captureGraphicsRight + ") repeat left","important");
            else box.rects[0].style.setProperty("background","url(" + captureGraphicsLeft + ") repeat right","important");
        }
        else if (pattern >= 2) 
        {
            if (anchor == 0 || anchor == 1) box.rects[0].style.setProperty("background","url(" + captureDeleteBottom + ") repeat top","important");
            else box.rects[0].style.setProperty("background","url(" + captureDeleteTop + ") repeat bottom","important");
        }
        
        box.container.appendChild(box.rects[0]);
    }
    else
    {
        boundingRect = element.getBoundingClientRect();
        
        width = boundingRect.width;
        height = boundingRect.height;
        left = calculateFrameLeft(element,window)+boundingRect.left;
        top = calculateFrameTop(element,window)+boundingRect.top;
        
        box.container.style.setProperty("width",width + "px","important");
        box.container.style.setProperty("height",height + "px","important");
        box.container.style.setProperty("left",left + "px","important");
        box.container.style.setProperty("top",top + "px","important");
        
        rects = element.getClientRects();
        
        for (i = 0; i < rects.length; i++)
        {
            box.rects[i] = document.createElement("div");
            
            box.rects[i].style.setProperty("all","initial","important");
            box.rects[i].style.setProperty("display","block","important");
            box.rects[i].style.setProperty("position","absolute","important");
            box.rects[i].style.setProperty("width",(rects[i].width-borderWidth*2) + "px","important");
            box.rects[i].style.setProperty("height",(rects[i].height-borderWidth*2) + "px","important");
            if (rects[i].width-borderWidth*2 >= 0) box.rects[i].style.setProperty("left",(rects[i].left-boundingRect.left) + "px","important");
            else box.rects[i].style.setProperty("left",(rects[i].left-boundingRect.left+(rects[i].width-borderWidth*2)/2) + "px","important");
            if (rects[i].height-borderWidth*2 >= 0) box.rects[i].style.setProperty("top",(rects[i].top-boundingRect.top) + "px","important");
            else box.rects[i].style.setProperty("top",(rects[i].top-boundingRect.top+(rects[i].height-borderWidth*2)/2) + "px","important");
            box.rects[i].style.setProperty("z-index",zindex,"important");
            box.rects[i].style.setProperty("pointer-events","none","important");
            box.rects[i].style.setProperty("border",borderWidth + "px " + borderStyle + " " + borderColor,"important");
            box.rects[i].style.setProperty("background-color",areaColor,"important");
            
            box.container.appendChild(box.rects[i]);
        }
    }
}

function hideBox(box)
{
    var i;
    
    for (i = 0; i < box.rects.length; i++) box.container.removeChild(box.rects[i]);
    box.rects.length = 0;
}

/************************************************************************/

/* Highlight management functions */

function showHighlightBox()
{
    if (highlightElement != null)
    {
        showBox(highlightBox,highlightElement,0,0,0,0,0x0,0x0);
        showBox(highlightBox,highlightElement,0,0,0,0,0x0,0x0);  /* occasionally the box sides are in the wrong position after the first call !!! */  /*???*/
    }
}

/************************************************************************/

/* Select management functions */

function showSelectBoxes()
{
    var selectIndex,element;
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
    {
        element = selectElement[cmdNumber][selectIndex];
        
        showBox(selectBox[selectIndex],element,0,0,0,0,0x0,0x0);
    }
}

function destroySelectBoxes()
{
    var selectIndex;
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        destroyBox(selectBox[selectIndex]);
    
    selectBox.length = 0;
}

function deselectElements()
{
    selectCount[cmdNumber] = 0;
    selectElement[cmdNumber].length = 0;
}

function nextCommand()
{
    cmdNumber++;
    selectCount[cmdNumber] = 0;
    selectElement[cmdNumber] = new Array();
}

/************************************************************************/

/* Frame utility functions */

function calculateFrameLeft(element,baseWindow)
{
    var x;
    
    x = element.ownerDocument.defaultView.scrollX;
    
    while (element.ownerDocument.defaultView != baseWindow)
    {
        x -= element.ownerDocument.defaultView.scrollX;
        element = element.ownerDocument.defaultView.frameElement;
        
        if (element.localName == "frame")
        {
            if (isFirefox)
            {
                x += element.offsetLeft;
                return x;
            }
            else
            {
                while (element.parentElement)  /* frame or frameset */
                {
                    x += element.offsetLeft;
                    element = element.parentNode;
                }
            }
            
            return x;
        }
        
        while (element.offsetParent)  /* not body */
        {
            x += element.offsetLeft;
            element = element.offsetParent;
        }
    }
    
    return x;
}

function calculateFrameTop(element,baseWindow)
{
    var y;
    
    y = element.ownerDocument.defaultView.scrollY;
    
    if (baseWindow == window && element.ownerDocument.defaultView != window) y += toolbarHeight;
    
    while (element.ownerDocument.defaultView != baseWindow)
    {
        y -= element.ownerDocument.defaultView.scrollY;
        element = element.ownerDocument.defaultView.frameElement;
        
        if (element.localName == "frame")
        {
            if (isFirefox)
            {
                y += element.offsetTop;
                return y;
            }
            else
            {
                while (element.parentElement)  /* frame or frameset */
                {
                    y += element.offsetTop;
                    element = element.parentNode;
                }
            }
            
            return y;
        }
        
        while (element.offsetParent)  /* not body */
        {
            y += element.offsetTop;
            element = element.offsetParent;
        }
    }
    
    return y;
}

/************************************************************************/

/* Capture select and deselect recursive functions */

function selectCaptured(element)
{
    var i,scrollWidth,scrollHeight,left,right,top,bottom,childLeft,childTop,selectIndex;
    var boundingRect = new Object();
    
    /* Note: clientWidth, clientHeight, scrollWidth, scrollHeight on <body> or <html> are not always correct! */
    
    scrollWidth = captureWindow.document.body.scrollWidth;
    scrollHeight = captureWindow.document.body.scrollHeight;
    
    boundingRect = element.getBoundingClientRect();
    
    left = calculateFrameLeft(element,captureWindow)+boundingRect.left;
    right = left+boundingRect.width;
    top = calculateFrameTop(element,captureWindow)+boundingRect.top;
    bottom = top+boundingRect.height;
    
    if (left < 0) left = 0;
    if (right > scrollWidth-1) right = scrollWidth-1;
    if (top < 0 ) top = 0;
    if (bottom > scrollHeight-1) bottom = scrollHeight-1;
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                selectCaptured(element.contentDocument.body);
        }
        catch (e)  /* attempting cross-domain web page access */
        {
            if (left >= captureLeft && right <= captureLeft+captureWidth &&
                top >= captureTop && bottom <= captureTop+captureHeight)
            {
                /* <iframe> or <frame> within capture area */
                
                select(element);
            }
        }
    }
    else if (element.localName == "object" || element.localName == "embed")
    {
        if (left >= captureLeft && right <= captureLeft+captureWidth &&
            top >= captureTop && bottom <= captureTop+captureHeight)
        {
            /* <object> or <embed> within capture area */
            
            select(element);
        }
    }
    else
    {
        if (left >= captureLeft && right <= captureLeft+captureWidth &&
            top >= captureTop && bottom <= captureTop+captureHeight)
        {
            /* Element within capture area */
            
            for (i = 0; i < element.children.length; i++)
            {
                if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                {
                    boundingRect = element.children[i].getBoundingClientRect();
                    
                    childLeft = calculateFrameLeft(element.children[i],captureWindow)+boundingRect.left;
                    childTop = calculateFrameTop(element.children[i],captureWindow)+boundingRect.top;
                    
                    if (childLeft <= left && childLeft+boundingRect.width >= right &&
                        childTop <= top && childTop+boundingRect.height >= bottom)
                    {
                        /* Child as large as element - don't select element */
                        /* Element would not be de-selectable with highlight box */
                        
                        break;
                    }
                }
            }
            
            if (i >= element.children.length)
            {
                /* Children are all smaller than element - select element */
                
                select(element);
                
                return;
            }
        }
        
        /* Element not within capture area or a child as large as element */
        
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                selectCaptured(element.children[i]);
    }
    
    function select(element)
    {
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        {
            if (selectElement[cmdNumber][selectIndex] == element) return;
        }
        
        selectElement[cmdNumber][selectCount[cmdNumber]] = element;
        selectBox[selectCount[cmdNumber]] = createBox("selectbox");
        
        showBox(selectBox[selectCount[cmdNumber]],element,0,0,0,0,0x0,0x0);
        
        selectCount[cmdNumber]++;
    }
}

function selectCapturedGraphics(element)
{
    var i,scrollWidth,scrollHeight,left,right,top,bottom,selectIndex;
    var boundingRect = new Object();
    
    /* Note: clientWidth, clientHeight, scrollWidth, scrollHeight on <body> or <html> are not always correct! */
    
    scrollWidth = captureWindow.document.body.scrollWidth;
    scrollHeight = captureWindow.document.body.scrollHeight;
    
    boundingRect = element.getBoundingClientRect();
    
    left = calculateFrameLeft(element,captureWindow)+boundingRect.left;
    right = left+boundingRect.width;
    top = calculateFrameTop(element,captureWindow)+boundingRect.top;
    bottom = top+boundingRect.height;
    
    if (left < 0) left = 0;
    if (right > scrollWidth-1) right = scrollWidth-1;
    if (top < 0 ) top = 0;
    if (bottom > scrollHeight-1) bottom = scrollHeight-1;
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                selectCapturedGraphics(element.contentDocument.body);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else if (element.localName == "object" || element.localName == "embed")
    {
        if (left >= captureLeft && right <= captureLeft+captureWidth &&
            top >= captureTop && bottom <= captureTop+captureHeight)
        {
            /* <object> or <embed> within capture area */
            
            select(element);
        }
    }
    else
    {
        if (left >= captureLeft && right <= captureLeft+captureWidth &&
            top >= captureTop && bottom <= captureTop+captureHeight)
        {
            /* Element within capture area */
            
            if (element.localName == "img" || element.localName == "map" || element.localName == "canvas" || element.localName == "svg")
            {
                select(element);
                
                return;
            }
        }
        
        /* Element not within capture area */
        
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                selectCapturedGraphics(element.children[i]);
    }
    
    function select(element)
    {
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        {
            if (selectElement[cmdNumber][selectIndex] == element) return;
        }
        
        selectElement[cmdNumber][selectCount[cmdNumber]] = element;
        selectBox[selectCount[cmdNumber]] = createBox("selectbox");
        
        showBox(selectBox[selectCount[cmdNumber]],element,0,0,0,0,0x0,0x0);
        
        selectCount[cmdNumber]++;
    }
}

function deselectCaptured(element)
{
    var i,scrollWidth,scrollHeight,left,right,top,bottom,selectIndex;
    var boundingRect = new Object();
    
    /* Note: clientWidth, clientHeight, scrollWidth, scrollHeight on <body> or <html> are not always correct! */
    
    scrollWidth = captureWindow.document.body.scrollWidth;
    scrollHeight = captureWindow.document.body.scrollHeight;
    
    boundingRect = element.getBoundingClientRect();
    
    left = calculateFrameLeft(element,captureWindow)+boundingRect.left;
    right = left+boundingRect.width;
    top = calculateFrameTop(element,captureWindow)+boundingRect.top;
    bottom = top+boundingRect.height;
    
    if (left < 0) left = 0;
    if (right > scrollWidth-1) right = scrollWidth-1;
    if (top < 0 ) top = 0;
    if (bottom > scrollHeight-1) bottom = scrollHeight-1;
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                deselectCaptured(element.contentDocument.body);
        }
        catch (e)  /* attempting cross-domain web page access */
        {
            if (left >= captureLeft && right <= captureLeft+captureWidth &&
                top >= captureTop && bottom <= captureTop+captureHeight)
            {
                /* <iframe> or <frame> within capture area */
                
                deselect(element);
            }
        }
    }
    else if (element.localName == "object" || element.localName == "embed")
    {
        if (left >= captureLeft && right <= captureLeft+captureWidth &&
            top >= captureTop && bottom <= captureTop+captureHeight)
        {
            /* <object> or <embed> within capture area */
            
            deselect(element);
        }
    }
    else
    {
        if (left >= captureLeft && right <= captureLeft+captureWidth &&
            top >= captureTop && bottom <= captureTop+captureHeight)
        {
            /* Element within capture area */
            
            deselect(element);
        }
        
        /* Element not within capture area */
        
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                deselectCaptured(element.children[i]);
    }
    
    function deselect(element)
    {
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        {
            if (selectElement[cmdNumber][selectIndex] == element)
            {
                destroyBox(selectBox[selectIndex]);
                
                for (i = selectIndex; i < selectCount[cmdNumber]-1; i++)
                {
                    selectElement[cmdNumber][i] = selectElement[cmdNumber][i+1];
                    selectBox[i] = selectBox[i+1];
                }
                
                selectCount[cmdNumber]--;
                selectElement[cmdNumber].length--;
                selectBox.length--;
                selectIndex--;
            }
        }
    }
}

/************************************************************************/

/* Select Page Breaks recursive select function */

function selectPageBreaks(element)
{
    var i,before,after,inside,selectIndex;
    
    before = window.getComputedStyle(element,null).getPropertyValue("page-break-before");
    after = window.getComputedStyle(element,null).getPropertyValue("page-break-after");
    inside = window.getComputedStyle(element,null).getPropertyValue("page-break-inside");
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                selectPageBreaks(element.contentDocument.body);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else if (element.localName == "object" || element.localName == "embed")
    {
        if (before == "always" || before == "avoid" || after == "always" || after == "avoid" || inside == "avoid")
        {
            select(element);
        }
    }
    else
    {
        if (before == "always" || before == "avoid" || after == "always" || after == "avoid" || inside == "avoid")
        {
            select(element);
            
            return;
        }
        
        /* Element not within capture area */
        
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                selectPageBreaks(element.children[i]);
    }
    
    function select(element)
    {
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        {
            if (selectElement[cmdNumber][selectIndex] == element) return;
        }
        
        selectElement[cmdNumber][selectCount[cmdNumber]] = element;
        selectBox[selectCount[cmdNumber]] = createBox("selectbox");
        
        showBox(selectBox[selectCount[cmdNumber]],element,0,0,0,0,0x0,0x0);
        
        selectCount[cmdNumber]++;
    }
}

/************************************************************************/

/* Hide/Delete/Format recursive edit functions */

function hideExcept(element)
{
    var i,keepNode,selectIndex;
    
    keepNode = false;
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
    {
        if (selectElement[cmdNumber][selectIndex] == element) return true;
    }
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                if (hideExcept(element.contentDocument.body)) keepNode = true;
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                if (hideExcept(element.children[i])) keepNode = true;
    }
    
    if (!keepNode)
    {
        if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
        else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
        
        if (hideSelect)
        {
            element.style.setProperty("opacity","0","important");
        }
        else
        {
            element.style.setProperty("opacity","0","important");
            element.style.setProperty("pointer-events","none","important");
        }
    }
    else
    {
        if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
        else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
        
        /* Reset non-inherited properties for higher level elements */
        
        element.style.setProperty("border","0","important");
        element.style.setProperty("outline","0","important");
        element.style.setProperty("overflow","visible","important");
        
        element.style.setProperty("background","white","important");
    }
    
    return keepNode;
}

function deleteExcept(element,restriction)
{
    var i,selectIndex,keepNode;
    
    keepNode = false;
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
    {
        if (selectElement[cmdNumber][selectIndex] == element)  /* selected element */
        {
            if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
            else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
            
            if (selectCount[cmdNumber] == 1)  /* remove margin if only one selected element */
            {
                element.style.setProperty("margin","0","important");
            }
            
            if (restriction >= 1)  /* without float layout*/
            {
                element.style.setProperty("float","none","important");
            }
            
            return true;
        }
    }
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                if (deleteExcept(element.contentDocument.body,restriction)) keepNode = true;
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                if (deleteExcept(element.children[i],restriction)) keepNode = true;
    }
    
    if (!keepNode)
    {
        if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
        else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
        
        element.style.setProperty("display","none","important");
    }
    else  /* higher level element */
    {
        if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
        else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
        
        /* Reset non-inherited properties for higher level elements */
        
        if (restriction == 2)  /* unrestricted layout */
        {
            element.style.setProperty("min-width","0","important");
            element.style.setProperty("min-height","0","important");
            element.style.setProperty("max-width","none","important");
            element.style.setProperty("max-height","none","important");
            
            element.style.setProperty("left","auto","important");
            element.style.setProperty("top","auto","important");
            element.style.setProperty("width","auto","important");
            element.style.setProperty("height","auto","important");
        }
        
        if (restriction >= 1)  /* without float layout*/
        {
            element.style.setProperty("float","none","important");
        }
        
        /* restricted layout */
        
        element.style.setProperty("position","static","important");
        
        element.style.setProperty("margin","0","important");
        element.style.setProperty("padding","0","important");
        element.style.setProperty("border","0","important");
        element.style.setProperty("outline","0","important");
        
        element.style.setProperty("background","white","important");
        element.style.setProperty("overflow","visible","important");
    }
    
    return keepNode;
}

function formatElement(element)
{
    var i,style,csstext,property,important;
    
    if (document.getElementById("printedit-format-subelements").checked)
    {
        if (element.localName == "iframe" || element.localName == "frame")
        {
            try
            {
                if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                    formatElement(element.contentDocument.body);
            }
            catch (e) {}  /* attempting cross-domain web page access */
        }
        else
        {
            for (i = 0; i < element.children.length; i++)
                if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                    formatElement(element.children[i]);
        }
    }
    
    if (element.hasAttribute("printedit-style") && +element.getAttribute("printedit-style").split("\u204B")[0] == cmdNumber) return;  /* sub-element of multiple nested selected elements */
    
    if (!document.getElementById("printedit-format-restrict").checked || document.getElementById("printedit-format-restrict-mode").value == "except" ||
        (document.getElementById("printedit-format-restrict-mode").value == "only" && document.getElementById("printedit-format-restrict-type").value == element.localName))
    {
        if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
        else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
        
        if (document.getElementById("printedit-format-restrict").checked &&
            document.getElementById("printedit-format-restrict-mode").value == "except" && document.getElementById("printedit-format-restrict-type").value == element.localName)
        {
            /* Apply computed style (with !important) directly on excepted elements - to override style changes inherited from higher-level non-excepted elements */
            
            style = window.getComputedStyle(element,null);
            
            csstext = "";
            
            for (property in style)
            {
                if (style.getPropertyValue(property) != "") csstext += property + ": " + style.getPropertyValue(property) + " !important; ";
            }
            
            element.style.cssText = csstext;
        }
        else
        {
            if (document.getElementById("printedit-format-important").checked) important = "important"; else important = "";
            
            /* Based on Eric Meyer's CSS Reset and Aardvark's features and some useful additions */
            
            if (document.getElementById("printedit-format-position").checked) element.style.setProperty("position",document.getElementById("printedit-format-position-value").textContent,important);
            if (document.getElementById("printedit-format-left").checked) element.style.setProperty("left",document.getElementById("printedit-format-left-value").textContent,important);
            if (document.getElementById("printedit-format-top").checked) element.style.setProperty("top",document.getElementById("printedit-format-top-value").textContent,important);
            if (document.getElementById("printedit-format-width").checked)
            {
                element.style.setProperty("width",document.getElementById("printedit-format-width-value").textContent,important);
                element.style.setProperty("min-width","0",important);
                element.style.setProperty("max-width","none",important);
            }
            if (document.getElementById("printedit-format-height").checked)
            {
                element.style.setProperty("height",document.getElementById("printedit-format-height-value").textContent,important);
                element.style.setProperty("min-height","0",important);
                element.style.setProperty("max-height","none",important);
            }
            if (document.getElementById("printedit-format-margin-l").checked) element.style.setProperty("margin-left",document.getElementById("printedit-format-margin-l-value").textContent,important);
            if (document.getElementById("printedit-format-margin-r").checked) element.style.setProperty("margin-right",document.getElementById("printedit-format-margin-r-value").textContent,important);
            if (document.getElementById("printedit-format-margin-t").checked) element.style.setProperty("margin-top",document.getElementById("printedit-format-margin-t-value").textContent,important);
            if (document.getElementById("printedit-format-margin-b").checked) element.style.setProperty("margin-bottom",document.getElementById("printedit-format-margin-b-value").textContent,important);
            if (document.getElementById("printedit-format-padding-l").checked) element.style.setProperty("padding-left",document.getElementById("printedit-format-padding-l-value").textContent,important);
            if (document.getElementById("printedit-format-padding-r").checked) element.style.setProperty("padding-right",document.getElementById("printedit-format-padding-r-value").textContent,important);
            if (document.getElementById("printedit-format-padding-t").checked) element.style.setProperty("padding-top",document.getElementById("printedit-format-padding-t-value").textContent,important);
            if (document.getElementById("printedit-format-padding-b").checked) element.style.setProperty("padding-bottom",document.getElementById("printedit-format-padding-b-value").textContent,important);
            if (document.getElementById("printedit-format-float").checked) element.style.setProperty("float",document.getElementById("printedit-format-float-value").textContent,important);
            if (document.getElementById("printedit-format-clear").checked) element.style.setProperty("clear",document.getElementById("printedit-format-clear-value").textContent,important);
            if (document.getElementById("printedit-format-pagebreak").checked)
            {
                if (document.getElementById("printedit-format-pagebreak-value").textContent == "auto")
                {
                    element.style.setProperty("page-break-before","auto",important);
                    element.style.setProperty("page-break-after","auto",important);
                    element.style.setProperty("page-break-inside","auto",important);
                }
                else if (document.getElementById("printedit-format-pagebreak-value").textContent == "before") element.style.setProperty("page-break-before","always",important);
                else if (document.getElementById("printedit-format-pagebreak-value").textContent == "after") element.style.setProperty("page-break-after","always",important);
                else if (document.getElementById("printedit-format-pagebreak-value").textContent == "\u00ACinside") element.style.setProperty("page-break-inside","avoid",important);
            }
            
            if (document.getElementById("printedit-format-color").checked)
            {
                if (document.getElementById("printedit-format-color-value").textContent == "dark") element.style.setProperty("color","#202020",important);
                else if (document.getElementById("printedit-format-color-value").textContent == "onyx") element.style.setProperty("color","#404040",important);
                else if (document.getElementById("printedit-format-color-value").textContent == "iron") element.style.setProperty("color","#606060",important);
                else element.style.setProperty("color",document.getElementById("printedit-format-color-value").textContent,important);
            }
            if (document.getElementById("printedit-format-background").checked)
            {
                if (document.getElementById("printedit-format-background-value").textContent == "light") element.style.setProperty("background-color","#F0F0F0",important);
                else if (document.getElementById("printedit-format-background-value").textContent == "quartz") element.style.setProperty("background-color","#E0E0E0",important);
                else if (document.getElementById("printedit-format-background-value").textContent == "steel") element.style.setProperty("background-color","#D0D0D0",important);
                else if (document.getElementById("printedit-format-background-value").textContent == "red") element.style.setProperty("background-color","#FFE0E0",important);
                else if (document.getElementById("printedit-format-background-value").textContent == "green") element.style.setProperty("background-color","#E0FFE0",important);
                else if (document.getElementById("printedit-format-background-value").textContent == "blue") element.style.setProperty("background-color","#E0E0FF",important);
                else if (document.getElementById("printedit-format-background-value").textContent == "yellow") element.style.setProperty("background-color","#FFFFE0",important);
                else element.style.setProperty("background-color",document.getElementById("printedit-format-background-value").textContent,important);
            }
            if (document.getElementById("printedit-format-fontfamily").checked) element.style.setProperty("font-family",document.getElementById("printedit-format-fontfamily-value").textContent,important);
            if (document.getElementById("printedit-format-fontstyle").checked)
            {
                if (document.getElementById("printedit-format-fontstyle-value").textContent == "italic") element.style.setProperty("font-style","italic",important);
                else element.style.setProperty("font-style","normal",important);
                if (document.getElementById("printedit-format-fontstyle-value").textContent == "bold") element.style.setProperty("font-weight","bold",important);
                else element.style.setProperty("font-weight","normal",important);
            }
            if (document.getElementById("printedit-format-fontsize").checked) element.style.setProperty("font-size",document.getElementById("printedit-format-fontsize-value").textContent,important);
            if (document.getElementById("printedit-format-lineheight").checked) element.style.setProperty("line-height",document.getElementById("printedit-format-lineheight-value").textContent,important);
            if (document.getElementById("printedit-format-verticalalign").checked) element.style.setProperty("vertical-align",document.getElementById("printedit-format-verticalalign-value").textContent,important);
            if (document.getElementById("printedit-format-textalign").checked) element.style.setProperty("text-align",document.getElementById("printedit-format-textalign-value").textContent,important);
            if (document.getElementById("printedit-format-textdecoration").checked) element.style.setProperty("text-decoration","none",important);
            if (document.getElementById("printedit-format-texttransform").checked) element.style.setProperty("text-transform","none",important);
            if (document.getElementById("printedit-format-textdecoration").checked)
            {
                if (document.getElementById("printedit-format-textdecoration-value").textContent == "under") element.style.setProperty("text-decoration","underline",important);
                else if (document.getElementById("printedit-format-textdecoration-value").textContent == "over") element.style.setProperty("text-decoration","overline",important);
                else if (document.getElementById("printedit-format-textdecoration-value").textContent == "through") element.style.setProperty("text-decoration","line-through",important);
                else element.style.setProperty("text-decoration","none",important);
            }
            if (document.getElementById("printedit-format-texttransform").checked)
            {
                if (document.getElementById("printedit-format-texttransform-value").textContent == "capital") element.style.setProperty("text-transform","capitalize",important);
                else if (document.getElementById("printedit-format-texttransform-value").textContent == "lower") element.style.setProperty("text-transform","lowercase",important);
                else if (document.getElementById("printedit-format-texttransform-value").textContent == "upper") element.style.setProperty("text-transform","uppercase",important);
                else element.style.setProperty("text-transform","none",important);
            }
            if (document.getElementById("printedit-format-liststyle").checked) element.style.setProperty("list-style",document.getElementById("printedit-format-liststyle-value").textContent,important);
            if (document.getElementById("printedit-format-tableborder").checked)
            {
                if (document.getElementById("printedit-format-tableborder-value").textContent == "collapse") element.style.setProperty("border-collapse","collapse",important);
                else
                {
                    element.style.setProperty("border-collapse","separate",important);
                    element.style.setProperty("border-spacing",document.getElementById("printedit-format-tableborder-value").textContent,important);
                }
            }
            if (document.getElementById("printedit-format-whitespace").checked) element.style.setProperty("white-space",document.getElementById("printedit-format-whitespace-value").textContent,important);
            if (document.getElementById("printedit-format-border").checked) element.style.setProperty("border",document.getElementById("printedit-format-border-value").textContent + " solid #606060",important);
            if (document.getElementById("printedit-format-outline").checked) element.style.setProperty("outline",document.getElementById("printedit-format-outline-value").textContent + " solid #606060",important);
            if (document.getElementById("printedit-format-overflow").checked) element.style.setProperty("overflow",document.getElementById("printedit-format-overflow-value").textContent,important);
        }
    }
}

/************************************************************************/

/* Text Pieces construct function */

function constructTextPieces(container,textstr)
{
    var i,text,span,br;
    
    container.setAttribute("printedit-text-inserted",cmdNumber);
    
    while (container.childNodes.length > 0) container.removeChild(container.childNodes[0]);
    
    while ((i = textstr.indexOf("\n")) >= 0)
    {
        span = document.createElement("span");
        span.setAttribute("printedit-text-wrapper","");
        text = document.createTextNode(textstr.substr(0,i));
        span.appendChild(text);
        container.appendChild(span);
        
        textstr = textstr.substr(i+1);
        
        span = document.createElement("span");
        span.setAttribute("printedit-break-wrapper","");
        span.appendChild(document.createElement("span"));
        br = document.createElement("br");
        br.style.setProperty("line-height","1.8","");
        br.style.setProperty("vertical-align","top","");
        span.appendChild(br);
        container.appendChild(span);
    }
    
    span = document.createElement("span");
    span.setAttribute("printedit-text-wrapper","");
    text = document.createTextNode(textstr);
    span.appendChild(text);
    container.appendChild(span);
}

/************************************************************************/

/* Undo commands recursive function */

function undoCommands(element)
{
    var i;
    var styleFields = new Array();
    var textFields = new Array();
    
    if (element.hasAttribute("printedit-text-inserted"))
    {
        if (cmdNumber == +element.getAttribute("printedit-text-inserted") || cmdNumber == -1)
        {
            element.parentNode.removeChild(element);
            
            return true;  /* element removed */
        }
    }
    
    if (element.hasAttribute("printedit-text"))
    {
        textFields = element.getAttribute("printedit-text").split("\u204B");
        
        if (cmdNumber == +textFields[0])
        {
            element.textContent = textFields[1];
            
            if (textFields.length == 2) element.removeAttribute("printedit-text");
            else element.setAttribute("printedit-text",textFields.slice(2).join("\u204B"));
        }
        else if (cmdNumber == -1)
        {
            element.textContent = textFields[textFields.length-1];
            
            element.removeAttribute("printedit-text");
        }
    }
    
    if (element.hasAttribute("printedit-style"))
    {
        styleFields = element.getAttribute("printedit-style").split("\u204B");
        
        if (cmdNumber == +styleFields[0])
        {
            element.style.cssText = styleFields[1];
            
            if (styleFields.length == 2) element.removeAttribute("printedit-style");
            else element.setAttribute("printedit-style",styleFields.slice(2).join("\u204B"));
        }
        else if (cmdNumber == -1)
        {
            element.style.cssText = styleFields[styleFields.length-1];
            
            element.removeAttribute("printedit-style");
        }
    }
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                undoCommands(element.contentDocument.body);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                if (undoCommands(element.children[i])) i--;
    }
    
    return false;  /* element not removed */
}

/************************************************************************/

/* Text Pieces enable and disable functions */

function enableTextPieces(element,linebreaks)
{
    var i,style,span,text,br;
    
    if (element.localName == "object" || element.localName == "embed") return;
    
    if (element.localName == "body" && linebreaks)
    {
        /* Show line breaks as visible back arrows */
        
        style = document.createElement("style");
        style.id = "printedit-style-linebreaks";
        style.type = "text/css";
        style.textContent = styleLineBreaks;
        element.ownerDocument.head.appendChild(style);
    }
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                enableTextPieces(element.contentDocument.body,linebreaks);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else if (element.hasAttribute("printedit-text-wrapper"));  /* wrapper for text piece */
    else if (element.hasAttribute("printedit-break-wrapper"));  /* wrapper for line break */
    else
    {
        for (i = 0; i < element.childNodes.length; i++)
            if (element.childNodes[i] != null)  /* in case web page not fully loaded before editing */
            {
                if (element.childNodes[i].nodeType == 3)  /* text node */
                {
                    if (element.childNodes[i].nodeValue.search(/[\x21-\x7E\x80-\xFF]/) != -1)
                    {
                        span = document.createElement("span");
                        span.setAttribute("printedit-text-wrapper","");
                        text = element.replaceChild(span,element.childNodes[i]);
                        span.appendChild(text);
                    }
                }
                else if (element.childNodes[i].nodeType == 1 && hiddenElements.indexOf(element.childNodes[i].localName) >= 0);  /* hidden element node */
                else if (element.childNodes[i].nodeType == 1 && element.childNodes[i].localName == "br")  /* break element node */
                {
                    span = document.createElement("span");
                    span.setAttribute("printedit-break-wrapper","");
                    span.appendChild(document.createElement("span"));
                    br = element.replaceChild(span,element.childNodes[i]);
                    span.appendChild(br);
                }
                else if (element.childNodes[i].nodeType == 1)  /* other element node */
                {
                    enableTextPieces(element.childNodes[i],linebreaks);
                }
            }
    }
}

function disableTextPieces(element)
{
    var i,style,span,text,br;
    
    if (element.localName == "object" || element.localName == "embed") return;
    
    if (element.localName == "body")
    {
        /* Hide line breaks */
        
        style = element.ownerDocument.getElementById("printedit-style-linebreaks");
        
        if (style) element.ownerDocument.head.removeChild(style);
    }
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                disableTextPieces(element.contentDocument.body);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
            {
                if (element.children[i].hasAttribute("printedit-text-wrapper"))  /* wrapper for text piece */
                {
                    if (!element.children[i].hasAttribute("printedit-text") && !element.children[i].hasAttribute("printedit-style"))  /* remove wrapper if no text edits made and no styling applied */
                    {
                        span = element.children[i];
                        text = span.removeChild(span.childNodes[0]);
                        element.replaceChild(text,element.children[i]);
                        i--;  /* text node is not in children */
                    }
                }
                else if (element.children[i].hasAttribute("printedit-break-wrapper"))  /* wrapper for line break */
                {
                    if (!element.children[i].hasAttribute("printedit-style"))  /* remove wrapper if no styling applied */
                    {
                        span = element.children[i];
                        span.removeChild(span.childNodes[0]);
                        br = span.removeChild(span.childNodes[0]);
                        element.replaceChild(br,element.children[i]);
                    }
                }
                else disableTextPieces(element.children[i]);
            }
    }
}

/************************************************************************/

/* View More enable and disable functions */

function enableViewMore(element)
{
    var i,style;
    
    if (element.localName == "object" || element.localName == "embed") return;
    
    if (element.localName == "body")
    {
        /* Force display of most invisible elements (cannot override !important in style attributes) */
        
        style = document.createElement("style");
        style.id = "printedit-style-viewmore";
        style.type = "text/css";
        style.textContent = styleViewMore;
        element.ownerDocument.head.appendChild(style);
    }
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                enableViewMore(element.contentDocument.body);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                enableViewMore(element.children[i]);
    }
}

function disableViewMore(element)
{
    var i,style;
    
    if (element.localName == "object" || element.localName == "embed") return;
    
    if (element.localName == "body")
    {
        /* Hide invisible elements */
        
        style = element.ownerDocument.getElementById("printedit-style-viewmore");
        
        if (style) element.ownerDocument.head.removeChild(style);
    }
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                disableViewMore(element.contentDocument.body);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                disableViewMore(element.children[i]);
    }
}

/************************************************************************/

/* Display for different device functions */

function displayForDifferentDevice(device)
{
    var i,j,k,contentDocument,styleSheet,cssRule;
    var contentDocuments = new Array();
    
    /* device == "" - reset print and screen stylesheets for print and screen devices */
    /* device == "print" - apply print stylesheets to both print and screen devices */
    /* device == "screen" - apply screen stylesheets to both print and screen devices */
    
    contentDocuments = getDocuments();
    
    for (i = 0; i < contentDocuments.length; i++)
    {
        contentDocument = contentDocuments[i];
       
        for (j = 0; j < contentDocument.styleSheets.length; j++)
        {
            styleSheet = contentDocument.styleSheets[j];
            
            if (isValidStyleSheet(styleSheet) && !isAlternateStyleSheet(styleSheet))
            {
                /* Change media types for media stylesheet */
                
                changeMediaTypes(styleSheet.media,device);
                
                /* Change media types for @media rules */
                
                try
                {
                    if (styleSheet.cssRules != null)
                    {
                        for (k = 0; k < styleSheet.cssRules.length; k++)
                        {
                            cssRule = styleSheet.cssRules[k];
                            
                            if (cssRule.cssText.substr(0,6) == "@media")
                            {
                                changeMediaTypes(cssRule.media,device);
                            }
                        }
                    }
                }
                catch (e) {}  /* attempting cross-domain stylesheet access in Firefox */
                
                /* Force stylesheet to be re-applied */
                
                styleSheet.disabled = !styleSheet.disabled;
                styleSheet.disabled = !styleSheet.disabled;
            }
        }
    }
}

function getDocuments()  /* this is not recursive */
{
    var i,frames,iframes;
    var documents = new Array();
    
    frames = document.getElementsByTagName("frame");
    iframes = document.getElementsByTagName("iframe");
    
    documents.push(document);
    
    for (i = 0; i < frames.length; i++)
    {
        try
        {
            if (frames[i].contentDocument.body != null)  /* in case web page not fully loaded before editing */
                documents.push(frames[i].contentDocument);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    
    for (i = 0; i < iframes.length; i++)
    {
        try
        {
            if (iframes[i].contentDocument.body != null)  /* in case web page not fully loaded before editing */
                documents.push(iframes[i].contentDocument);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    
    return documents;
}

function isValidStyleSheet(styleSheet)
{
    var styleSheetHref;
    
    styleSheetHref = styleSheet.href;
    
    /* If the style sheet href is set and this is not an internal style sheet */
    
    if (styleSheetHref && styleSheetHref.indexOf("about:PreferenceStyleSheet") != 0 && 
        styleSheetHref.indexOf("chrome://") != 0 && styleSheetHref.indexOf("data:text/css") != 0 &&
        styleSheetHref.indexOf("jar:file://") != 0 && styleSheetHref.indexOf("resource://") != 0) return true;
    
    /* If the style sheet href is not set */
    
    if (!styleSheetHref) return true;
    
    return false;
}

function isAlternateStyleSheet(styleSheet)
{
    var ownerNode;
    
    ownerNode = styleSheet.ownerNode;
    
    if (ownerNode)
    {
        if (ownerNode.nodeType == 7)  /* processing instruction node */
        {
            if (ownerNode.data.indexOf('alternate="yes"') != -1) return true;
        }
        else
        {
            if (ownerNode.hasAttribute("rel") && ownerNode.getAttribute("rel").toLowerCase() == "alternate stylesheet") return true;
        }
    }
    
    return false;
}

function hasMediaType(media,mediaType)
{
    var i,type;
    
    try
    {
        for (i = 0; i < media.length; i++)
        {
            type = media.item(i).toLowerCase();
            if (type == mediaType) return true;
        }
    }
    catch (e) { /* cannot access media.length */ }
    
    return false;
}

function changeMediaTypes(media,device)
{
    /* Reset stylesheet (or @media rule) for device as normal */
    
    if (hasMediaType(media,"printedit-append-screen"))
    {
        media.deleteMedium("screen");
        media.deleteMedium("printedit-append-screen");
    }
    
    if (hasMediaType(media,"printedit-delete-screen"))
    {
        media.appendMedium("screen");
        media.deleteMedium("printedit-delete-screen");
    }
    
    if (hasMediaType(media,"printedit-append-print"))
    {
        media.deleteMedium("print");
        media.deleteMedium("printedit-append-print");
    }
    
    if (hasMediaType(media,"printedit-delete-print"))
    {
        media.appendMedium("print");
        media.deleteMedium("printedit-delete-print");
    }
    
    /* Use print stylesheet (or @media print rule) for screen device */
    
    if (device == "print")
    {
        if (hasMediaType(media,"print"))
        {
            if (!hasMediaType(media,"screen"))
            {
                media.appendMedium("screen");
                media.appendMedium("printedit-append-screen");
            }
        }
        else
        {
            if (hasMediaType(media,"screen"))
            {
                media.deleteMedium("screen");
                media.appendMedium("printedit-delete-screen");
            }
        }
    }
    
    /* Use screen stylesheet (or @media screen rule) for print device */
    
    if (device == "screen")
    {
        if (hasMediaType(media,"screen"))
        {
            if (!hasMediaType(media,"print"))
            {
                media.appendMedium("print");
                media.appendMedium("printedit-append-print");
            }
        }
        else
        {
            if (hasMediaType(media,"print"))
            {
                media.deleteMedium("print");
                media.appendMedium("printedit-delete-print");
            }
        }
    }
}

/************************************************************************/

/* Fix Page Breaks recursive edit function */

function fixPageBreaks(element,type)
{
    /* Firefox - workaround for problems previewing/printing multi-page elements with flex/grid/inline-block/inline-table styling - see Bug 1189855 */
    
    /* Block Elements - elements that have a default style of 'display: block' plus <main> and <table> */
    /* A4 Paper - 8.27" x 11.69" - assume landscape with 1.0" margins - usable height = (8.27 - 2.0) x 96 = 602px - round to 600px */
    
    var i,display,position;
    var blockElements = new Array("address","article","aside","blockquote","body","center","dd","details","div","dl","dt","fieldset","figcaption","figure","footer","form",
                                  "h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","legend","li","main","nav","ol","p","pre","section","summary","table","ul");
    var boundingRect = new Object();
    
    if (blockElements.indexOf(element.localName) >= 0)
    {
        boundingRect = element.getBoundingClientRect();
        
        if (boundingRect.height > 600)
        {
            if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
            else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
            
            display = window.getComputedStyle(element,null).getPropertyValue("display");
            position = window.getComputedStyle(element,null).getPropertyValue("position");
            
            if (type == "all" || type == "display")
            {
                /* avoid display: flex|grid|inline-... */
                
                if (display == "none" || display == "block" || display == "inline" || display == "run-in" || display == "contents" || display == "list-item") ;
                else if (display == "table" || display.substr(0,6) == "table-") ;
                else if (display == "flex" || display == "grid") element.style.setProperty("display","block","important");
                else if (display == "inline-block" || display == "inline-flex" || display == "inline-grid") element.style.setProperty("display","block","important");
                else if (display == "inline-table") element.style.setProperty("display","table","important");
            }
            
            if (type == "all" || type == "position")
            {
                /* avoid position: absolute|fixed|sticky */
                
                if (position != "static") element.style.setProperty("position","relative","important");
            }
            
            if (type == "all" || type == "float")
            {
                /* avoid float: left|right */
                
                element.style.setProperty("float","none","important");
            }
        }
    }
    
    if (element.localName == "iframe" || element.localName == "frame")
    {
        try
        {
            if (element.contentDocument.body != null)  /* in case web page not fully loaded before editing */
                fixPageBreaks(element.contentDocument.body,type);
        }
        catch (e) {}  /* attempting cross-domain web page access */
    }
    else
    {
        for (i = 0; i < element.children.length; i++)
            if (element.children[i] != null)  /* in case web page not fully loaded before editing */
                fixPageBreaks(element.children[i],type);
    }
}

/************************************************************************/

/* Mouse event handlers */

function onMouseOver(event)
{
    var element;
    
    element = event.target;
    
    if (element.localName == "html") element = element.ownerDocument.body;  /* scroll bars or <body> smaller than window */
    
    if (element.parentNode.localName == "input") element = element.parentNode;  /* <input> element has <div> child which is not in children array */
    
    if (!saveInProgress)
    {
        backupStyleProperty(element,"cursor","cursor");
        backupStyleProperty(element,"text-decoration","decoration");
        
        if (element.id != "printedit-text-textarea") element.style.setProperty("cursor","default","important");
        if (element.localName == "a") element.style.setProperty("text-decoration","none","important");
    }
    
    if (curMode == 2)  /* editing */
    {
        if (!downFlag && (popupOpen == 0 || (formatInspect && popupOpen == 4)) && !insideToolbar(element))
        {
            highlightStack.length = 0;
            
            highlightElement = element;
            
            showHighlightBox();
        }
    }
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onMouseOut(event)
{
    /* necessary to handle cursor moving off content area */
    
    var element;
    
    element = event.target;
    
    if (element.localName == "html") element = element.ownerDocument.body;  /* scroll bars or <body> smaller than window */
    
    if (element.parentNode.localName == "input") element = element.parentNode;  /* <input> element has <div> child which is not in children array */
    
    if (!saveInProgress)
    {
        restoreStyleProperty(element,"cursor","cursor");
        restoreStyleProperty(element,"text-decoration","decoration");
    }
    
    if (curMode == 2)  /* editing */
    {
        if (!downFlag && (popupOpen == 0 || (formatInspect && popupOpen == 4)))
        {
            highlightStack.length = 0;
            
            highlightElement = null;
            
            hideBox(highlightBox);
        }
    }
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onMouseDown(event)
{
    /* capture-box set start point */
    /* prevents mousedown actions (if there are any) */
    
    var element,snap,clientWidth,clientHeight,scrollWidth,scrollHeight,marginLeft,marginRight,marginTop,marginBottom,tbH1,tbH2;
    var boundingRect = new Object();
    
    element = event.target;
    
    if (curMode == 2)  /* editing */
    {
        if (element.id.substr(0,23) == "savepage-message-panel-") ;  /* ignore mouse down on Save Page WE message panel */
        else if (!popupOpen && !insideToolbar(element) && event.button == 0)  /* capture select or individual select */
        {
            captureWindow = element.ownerDocument.defaultView;
            
            /* Note: clientWidth, clientHeight, scrollWidth, scrollHeight on <body> or <html> are not always correct! */
            
            clientWidth = captureWindow.innerWidth;
            clientHeight = captureWindow.innerHeight;
            
            scrollWidth = captureWindow.document.body.scrollWidth;
            scrollHeight = captureWindow.document.body.scrollHeight+toolbarHeight;
            
            marginLeft = captureWindow.getComputedStyle(captureWindow.document.body,null).getPropertyValue("margin-left");
            marginRight = captureWindow.getComputedStyle(captureWindow.document.body,null).getPropertyValue("margin-right");
            marginTop = captureWindow.getComputedStyle(captureWindow.document.body,null).getPropertyValue("margin-top");
            marginBottom = captureWindow.getComputedStyle(captureWindow.document.body,null).getPropertyValue("margin-bottom");
            
            scrollWidth += Number(marginLeft.substr(0,marginLeft.length-2))+Number(marginRight.substr(0,marginRight.length-2));
            scrollHeight += Number(marginTop.substr(0,marginTop.length-2))+Number(marginBottom.substr(0,marginBottom.length-2));
            
            if ((scrollHeight > clientHeight && scrollWidth > clientWidth-17) ||
                (scrollWidth > clientWidth && scrollHeight > clientHeight-17))
            {
                clientWidth -= 17;
                clientHeight -= 17;
            }
            else if (scrollHeight > clientHeight) clientWidth -= 17;
            else if (scrollWidth > clientWidth) clientHeight -= 17;
            
            if (event.clientX < clientWidth && event.clientY < clientHeight)  /* not inside scroll bars */
            {
                downFlag = true;
                downKeys = Number(event.ctrlKey)*2+Number(event.shiftKey);
                
                if (captureSnap) snap = 20;
                else snap = 0;
                
                downPageX = event.clientX+captureWindow.scrollX;
                if (downPageX < snap) downPageX = 0;
                else if (downPageX > scrollWidth-snap) downPageX = scrollWidth;
                
                tbH1 = (captureWindow == window) ? toolbarHeight : 0;
                tbH2 = (captureWindow == window) ? 0 : toolbarHeight;
                downPageY = event.clientY+captureWindow.scrollY;
                if (downPageY < tbH1+snap) downPageY = tbH1;
                else if (downPageY > scrollHeight-tbH2-snap) downPageY = scrollHeight-tbH2;
            }
        }
        else if (popupOpen && element.hasAttribute("id") && element.getAttribute("id").match(/printedit-.*-header/))  /* move panel */
        {
            downFlag = true;
            
            downPanel = element.parentNode;
            boundingRect = downPanel.getBoundingClientRect();
            downOffsetX = boundingRect.left-event.clientX;
            downOffsetY = boundingRect.top-event.clientY;
        }
        else if (popupOpen && insidePopup(element)) return;  /* allow default action and event propagation inside popup panels */
        else if (popupOpen && !insidePopup(element))  /* close open popup */
        {
            if (formatInspect)
            {
                if (popupOpen == 4 && event.button == 2) closePopup(true);
                else if (popupOpen == 10) closePopup(true);
                else closePopup(false);
            }
            else closePopup(false);
            
            if (!insideToolbar(element)) showHighlightBox();
        }
    }
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onMouseMove(event)
{
    /* capture-box drag and draw */
    
    var element,clientWidth,clientHeight,scrollWidth,scrollHeight,marginLeft,marginRight,marginTop,marginBottom,innerScreenX,innerScreenY;
    var pageX,pageY,width,height,left,top,anchor,frameLeft,frameTop,frameWidth,frameHeight,clientX,clientY,incX,incY,tbH;
    var boundingRect = new Object();
    
    element = event.target;
    
    if (curMode == 2)  /* editing */
    {
        if (element.id.substr(0,23) == "savepage-message-panel-") ;  /* ignore mouse move over Save Page WE message panel */
        else if (!popupOpen && downFlag && event.button == 0)  /* capture select */
        {
            /* Note: clientWidth, clientHeight, scrollWidth, scrollHeight on <body> or <html> are not always correct! */
            
            clientWidth = captureWindow.innerWidth;
            clientHeight = captureWindow.innerHeight;
            
            scrollWidth = captureWindow.document.body.scrollWidth;
            scrollHeight = captureWindow.document.body.scrollHeight;
            
            marginLeft = captureWindow.getComputedStyle(captureWindow.document.body,null).getPropertyValue("margin-left");
            marginRight = captureWindow.getComputedStyle(captureWindow.document.body,null).getPropertyValue("margin-right");
            marginTop = captureWindow.getComputedStyle(captureWindow.document.body,null).getPropertyValue("margin-top");
            marginBottom = captureWindow.getComputedStyle(captureWindow.document.body,null).getPropertyValue("margin-bottom");
            
            scrollWidth += Number(marginLeft.substr(0,marginLeft.length-2))+Number(marginRight.substr(0,marginRight.length-2));
            scrollHeight += Number(marginTop.substr(0,marginTop.length-2))+Number(marginBottom.substr(0,marginBottom.length-2));
            
            if ((scrollHeight > clientHeight && scrollWidth > clientWidth-17) ||
                (scrollWidth > clientWidth && scrollHeight > clientHeight-17))
            {
                clientWidth -= 17;
                clientHeight -= 17;
            }
            else if (scrollHeight > clientHeight) clientWidth -= 17;
            else if (scrollWidth > clientWidth) clientHeight -= 17;
            
            if (isFirefox)
            {
                tbH = (captureWindow == window) ? 0 : toolbarHeight;
                innerScreenX = captureWindow.mozInnerScreenX;
                innerScreenY = captureWindow.mozInnerScreenY+tbH;
            }
            else
            {
                innerScreenX = window.screenLeft+(window.outerWidth-window.innerWidth)/2;
                if (captureWindow != window) innerScreenX += calculateFrameLeft(captureWindow.document.body,window)-window.scrollX;
                innerScreenY =  window.screenTop+(window.outerHeight-window.innerHeight)-(window.outerWidth-window.innerWidth)/2;
                if (captureWindow != window) innerScreenY += calculateFrameTop(captureWindow.document.body,window)-window.scrollY;
            }
            
            pageX = event.screenX-innerScreenX+captureWindow.scrollX;
            if (pageX < 0) pageX = 0;
            else if (pageX > scrollWidth) pageX = scrollWidth;
            if (pageX >= downPageX) { left = downPageX; width = pageX-downPageX+1; anchor = 0x0; }
            else { left = pageX; width = downPageX-pageX+1;  anchor = 0x1; }
            
            pageY = event.screenY-innerScreenY+captureWindow.scrollY;
            if (pageY < 0) pageY = 0;
            else if (pageY > scrollHeight) pageY = scrollHeight;
            if (pageY >= downPageY) { top = downPageY; height = pageY-downPageY+1; anchor += 0x0; }
            else { top = pageY; height = downPageY-pageY+1; anchor += 0x2; }
            
            if (captureBox == null && (width >= 6 || height >= 6)) captureBox = createBox("capturebox");
            
            if (captureBox != null)
            {
                captureWidth = width;
                captureHeight = height;
                captureLeft = left;
                captureTop = top;
                
                if (captureWindow != window)  /* iframe or frame scrolling */
                {
                    frameWidth = captureWindow.innerWidth;
                    frameHeight = captureWindow.innerHeight;
                    
                    if (scrollHeight > clientHeight) frameWidth -= 17;
                    if (scrollWidth > clientWidth) frameHeight -= 17;
                    
                    if (isFirefox) frameLeft = captureWindow.mozInnerScreenX-window.mozInnerScreenX+window.scrollX;
                    else frameLeft = calculateFrameLeft(captureWindow.document.body,window);
                    
                    left = left-captureWindow.scrollX+frameLeft;
                    if (left < frameLeft)
                    {
                        if (left+width < frameLeft) { width = 0; left = frameLeft; }
                        else if (left+width > frameLeft+frameWidth) { width = frameWidth; left = frameLeft; }
                        else { width = left+width-frameLeft; left = frameLeft; }
                    }
                    else if (left+width > frameLeft+frameWidth)
                    {
                        if (left > frameLeft+frameWidth) { width = 0; left = frameLeft+frameWidth; }
                        else if (left < frameLeft) { width = frameWidth; left = frameLeft; }
                        else { width = frameLeft+frameWidth-left; }
                    }
                    
                    if (isFirefox) frameTop = captureWindow.mozInnerScreenY-window.mozInnerScreenY+window.scrollY+toolbarHeight;
                    else frameTop = calculateFrameTop(captureWindow.document.body,window);
                    
                    top = top-captureWindow.scrollY+frameTop;
                    if (top < frameTop)
                    {
                        if (top+height < frameTop) { height = 0; top = frameTop; }
                        else if (top+height > frameTop+frameHeight) { height = frameHeight; top = frameTop; }
                        else { height = top+height-frameTop; top = frameTop; }
                    }
                    else if (top+height > frameTop+frameHeight)
                    {
                        if (top > frameTop+frameHeight) { height = 0; top = frameTop+frameHeight; }
                        else if (top < frameTop) { height = frameHeight; top = frameTop; }
                        else { height = frameTop+frameHeight-top; }
                    }
                }
                
                showBox(captureBox,null,width,height,left,top,downKeys,anchor);
                hideBox(highlightBox);
                
                clientX = event.screenX-innerScreenX;
                clientY = event.screenY-innerScreenY;
                
                incX = 0;
                if (clientX < 20)
                {
                    incX = clientX-20;
                    if (captureWindow.scrollX <= 0) incX = 0;
                }
                else if (clientX > clientWidth-20)
                {
                    incX = clientX-(clientWidth-20);
                    if (captureWindow.scrollX >= scrollWidth-clientWidth) incX = 0;
                }
                
                tbH = (captureWindow == window) ? toolbarHeight : 0;
                incY = 0;
                if (clientY < 20+tbH)
                {
                    incY = clientY-20-tbH;
                    if (captureWindow.scrollY <= 0) incY = 0;
                }
                else if (clientY > clientHeight-20)
                {
                    incY = clientY-(clientHeight-20);
                    if (captureWindow.scrollY >= scrollHeight-clientHeight) incY = 0;
                }
                
                if (incX != 0 || incY != 0)
                {
                    if (incX >= -10 && incX <= 10) incX = incX/2;
                    else if (incX > 20) incX = 106;
                    else if (incX > 10) incX = 6+(incX-10)*(incX-10);
                    else if (incX < -20) incX = -106;
                    else if (incX < -10) incX = -6-(incX+10)*(incX+10);
                    
                    if (incY >= -10 && incY <= 10) incY = incY/2;
                    else if (incY > 20) incY = 106;
                    else if (incY > 10) incY = 6+(incY-10)*(incY-10);
                    else if (incY < -20) incY = -106;
                    else if (incY < -10) incY = -6-(incY+10)*(incY+10);
                    
                    scrollIncX = incX;
                    scrollIncY = incY;
                    scrollScreenX = event.screenX;
                    scrollScreenY = event.screenY;
                    
                    if (scrollTimeout == null)
                    {
                        scrollTimeout = window.setTimeout(function() { onScrollTimeout(); },10);
                    }
                }
                else
                {
                    if (scrollTimeout != null)
                    {
                        window.clearTimeout(scrollTimeout);
                        scrollTimeout = null;
                    }
                }
            }
        }
        else if (popupOpen && downFlag)  /* move panel */
        {
            boundingRect = downPanel.getBoundingClientRect();
            
            clientWidth = window.innerWidth;
            clientHeight = window.innerHeight;
            
            scrollWidth = document.body.scrollWidth;
            scrollHeight = document.body.scrollHeight;
            
            if ((scrollHeight > clientHeight && scrollWidth > clientWidth-17) ||
                (scrollWidth > clientWidth && scrollHeight > clientHeight-17))
            {
                clientWidth -= 17;
                clientHeight -= 17;
            }
            else if (scrollHeight > clientHeight) clientWidth -= 17;
            else if (scrollWidth > clientWidth) clientHeight -= 17;
            
            clientX = event.clientX+downOffsetX;
            if (clientX < 0) clientX = 0;
            else if (clientX+boundingRect.width > clientWidth) clientX = clientWidth-boundingRect.width;
            
            clientY = event.clientY+downOffsetY;
            if (clientY < toolbarHeight) clientY = toolbarHeight;
            else if (clientY+26 > clientHeight) clientY = clientHeight-26;  /* panel header height == 26 */
            
            downPanel.style.setProperty("left",clientX+"px","important");
            downPanel.style.setProperty("top",clientY+"px","important");
        }
        else if (popupOpen && insidePopup(element)) return;  /* allow default action and event propagation inside popup panels */
    }
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onScrollTimeout()
{
    var event;
    
    scrollTimeout = null;
    
    captureWindow.scrollBy(scrollIncX,scrollIncY); 
   
    event = window.document.createEvent("MouseEvents");
    event.initMouseEvent("mousemove",true,true,window,1,scrollScreenX,scrollScreenY,0,0,false,false,false,false,0,null);
    window.dispatchEvent(event);
}

function onMouseUp(event)
{
    /* handles selection and de-selection of elements */
    /* prevents mouseup activation of <object> and <embed> links */
    
    var i,element,selectIndex;
    
    element = event.target;
    
    if (curMode == 2)  /* editing */
    {
        if (element.id.substr(0,23) == "savepage-message-panel-") ;  /* ignore mouse up on Save Page WE message panel */
        else if (!popupOpen && downFlag && event.button == 0)  /* capture select or individual select */
        {        
            downFlag = false;
            
            if (captureBox != null)
            {
                /* capture-box selection or de-selection of multiple elements */
                
                if (downKeys == 0)  /* selection of all elements within capture area */
                {
                    selectCaptured(captureWindow.document.body);
                }
                else if (downKeys == 1)  /* selection of all graphic elements within capture area */
                {
                    selectCapturedGraphics(captureWindow.document.body);
                }
                else if (downKeys >= 2)  /* de-selection of all elements within capture area */
                {
                    deselectCaptured(captureWindow.document.body);
                }
                
                hideBox(captureBox);
                
                destroyBox(captureBox);
                captureBox = null;
            }
            else if (highlightElement != null)
            {
                /* selection or de-selection of individual element */
                
                for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
                {
                    if (selectElement[cmdNumber][selectIndex] == highlightElement) break;
                }
                
                if (selectIndex < selectCount[cmdNumber])  /* remove selection box */
                {
                    destroyBox(selectBox[selectIndex]);
                    hideBox(highlightBox);
                    
                    for (i = selectIndex; i < selectCount[cmdNumber]-1; i++)
                    {
                        selectElement[cmdNumber][i] = selectElement[cmdNumber][i+1];
                        selectBox[i] = selectBox[i+1];
                    }
                    
                    selectCount[cmdNumber]--;
                    selectElement[cmdNumber].length--;
                    selectBox.length--;
                }
                else  /* add selection box */
                {
                    selectElement[cmdNumber][selectCount[cmdNumber]] = highlightElement;
                    selectBox[selectCount[cmdNumber]] = createBox("selectbox");
                    
                    showBox(selectBox[selectCount[cmdNumber]],highlightElement,0,0,0,0,0x0,0x0);
                    hideBox(highlightBox);
                    
                    selectCount[cmdNumber]++;
                }
            }
            
            captureWindow = null;
            
            if (selectCount[cmdNumber] > 0) enableEditButtons();
            else disableEditButtons();
        }
        else if (popupOpen && downFlag)  /* move panel */
        {
            downFlag = false;
        }
        else if (popupOpen && insidePopup(element)) return;  /* allow default action and event propagation inside popup panels */
    }
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onClick(event)
{
    /* prevents click activation of links */
    /* click event fired for right-clicks in Firefox but not in Chrome */
    
    var element;
    
    element = event.target;
    
    if (curMode == 2)  /* editing */
    {
        if (event.button == 0)  /* left-click */
        {
            if (insidePopup(element) || insideToolbar(element)) return;  /* allow default action and event propagation inside popup panels and toolbar */
            
            if (element.id == "savepage-message-panel-cancel") return;  /* allow Save Page WE user click on message cancel button */
        }
    }
    else if (curMode == 1)  /* suspended */
    {
        if (event.button == 0)  /* left-click */
        {
            if (element.id == "savepage-download-link") return;  /* allow Save Page WE to do simulated click on download link */
            
            if (element.id == "savepage-message-panel-continue") return;  /* allow Save Page WE user click on message continue button */
            if (element.id == "savepage-message-panel-cancel") return;  /* allow Save Page WE user click on message cancel button */
            
            if (element.id == "savepage-lazyload-panel-skip") return;  /* allow Save Page WE user click on lazyload skip button */
            if (element.id == "savepage-lazyload-panel-cancel") return;  /* allow Save Page WE user click on lazyload cancel button */
            
            if (element.id == "savepage-unsaved-panel-continue") return;  /* allow Save Page WE user click on unsaved continue button */
            if (element.id == "savepage-unsaved-panel-cancel") return;  /* allow Save Page WE user click on unsaved cancel button */
            
            if (element.id == "savepage-comments-panel-continue") return;  /* allow Save Page WE user click on comments continue button */
            if (element.id == "savepage-comments-panel-cancel") return;  /* allow Save Page WE user click on comments cancel button */
            
            if (element.id == "savepage-pageinfo-panel-okay") return;  /* allow Save Page WE user click on pageinfo okay button */
            if (element.id == "savepage-pageinfo-panel-open") return;  /* allow Save Page WE user click on pageinfo open button */
        }
    }
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onAuxClick(event)
{
    /* prevents auxiliary click activation of links */
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onDblClick(event)
{
    /* prevents double click activation of links */
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onContextMenu(event)
{
    /* prevents normal context menu popup */
    
    var element,panel,width,height,left,top;
    var boundingRect = new Object();
    
    element = event.target;
    
    if (curMode == 2)  /* editing */
    {
        if (!insidePopup(element) && !insideToolbar(element))
        {
            if (!downFlag && highlightElement != null)
            {
                panel = document.getElementById("printedit-inspect-panel");
                
                panel.style.removeProperty("display");
                
                if (formatInspect && popupOpen == 4) popupOpen = 10;
                else popupOpen = 1;
                
                /* Position inspect panel */
                
                boundingRect = panel.getBoundingClientRect();
                
                width = boundingRect.width;
                height = boundingRect.height;
                
                left = calculateFrameLeft(element,window)+event.clientX-window.scrollX;
                top = calculateFrameTop(element,window)+event.clientY-window.scrollY;
                
                panel.style.setProperty("left",left + "px","important");
                panel.style.setProperty("top",top + "px","important");
                
                panel.style.setProperty("display","block","important");
                
                adjustPanelPopup("inspect");
                
                cmdInspectInitPanel();
            }
        }
    }
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onWheel(event)
{
    /* prevents ctrl+mousewheel zooming */
    
    if (event.ctrlKey) event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

/************************************************************************/

/*  Scroll and Resize event handlers */

function onScroll(event)
{
    /* handles slider or mouse scroll and re-positions select boxes */
    
    showSelectBoxes();
    
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onResize(event)
{
    /* handles window resize and zoom in/out events and re-positions select boxes */
    
    closePopup(false);
    
    window.setTimeout(function() { showSelectBoxes(); },300);
    
    event.stopPropagation();
    event.stopImmediatePropagation();
}

/************************************************************************/

/*  Keyboard event handlers */

function onKeyDown(event)
{
    var textinput,modifiers;
    var selection = new Object();
    
    textinput = (popupOpen == 5 && document.activeElement.id == "printedit-text-textarea") ||
                (popupOpen == 7 && document.activeElement.id == "printedit-savepdf-paperwidth") ||
                (popupOpen == 7 && document.activeElement.id == "printedit-savepdf-paperheight") ||
                (popupOpen == 7 && document.activeElement.id == "printedit-savepdf-scaling");
    
    if (curMode == 2)  /* editing */
    {
        modifiers = event.altKey*4+(event.ctrlKey||event.metaKey)*2+event.shiftKey;
        
        if (!popupOpen)
        {
            if (event.key == "Escape" && modifiers == 0)
            {
                selection = window.getSelection();
                if (selection.rangeCount > 0) selection.removeAllRanges();
                else if (!document.getElementById("printedit-deselect").hasAttribute("disabled")) cmdDeselect();
            }
            
            else if (event.key == "[" && modifiers <= 1 && !document.getElementById("printedit-select").hasAttribute("disabled")) cmdSelectPrevious();
            else if (event.key == "]" && modifiers <= 1 && !document.getElementById("printedit-deselect").hasAttribute("disabled")) cmdDeselect();
            else if (event.key == "ArrowUp" && modifiers == 0) cmdExpand();
            else if (event.key == "ArrowDown" && modifiers == 0) cmdShrink();
            else if (event.key == "ArrowLeft" && modifiers == 0) cmdBackwards();
            else if (event.key == "ArrowRight" && modifiers == 0) cmdForwards();
            else if (event.key == "Enter" && modifiers == 0) cmdSelectElement();
            else if (event.key == "Insert" && modifiers == 0 && !document.getElementById("printedit-hide").hasAttribute("disabled")) cmdHide();
            else if (event.key == "Delete" && modifiers == 0 && !document.getElementById("printedit-delete").hasAttribute("disabled")) cmdDelete();
            else if (event.key == "#" && modifiers <= 1 && !document.getElementById("printedit-format").hasAttribute("disabled")) cmdPageBreaks();
            else if (event.key == "Backspace" && modifiers == 0 && !document.getElementById("printedit-undo").hasAttribute("disabled")) cmdUndo();
            else if (event.key == "Home" && modifiers == 0) window.scrollTo(document.documentElement.scrollLeft,0);
            else if (event.key == "End" && modifiers == 0) window.scrollTo(document.documentElement.scrollLeft,document.documentElement.scrollHeight);
            else if (event.key == "PageUp" && modifiers == 0) window.scrollTo(document.documentElement.scrollLeft,document.documentElement.scrollTop-window.innerHeight);
            else if (event.key == "PageDown" && modifiers == 0) window.scrollTo(document.documentElement.scrollLeft,document.documentElement.scrollTop+window.innerHeight);
            
            else if (event.key.toUpperCase() == "S" && modifiers <= 1 && !document.getElementById("printedit-deselect").hasAttribute("disabled")) cmdDeselect();
            else if (event.key.toUpperCase() == "S" && modifiers <= 1 && !document.getElementById("printedit-select").hasAttribute("disabled")) cmdSelect();
            else if (event.key.toUpperCase() == "H" && modifiers <= 1 && !document.getElementById("printedit-hide").hasAttribute("disabled")) cmdHide();
            else if (event.key.toUpperCase() == "D" && modifiers <= 1 && !document.getElementById("printedit-delete").hasAttribute("disabled")) cmdDelete();
            else if (event.key.toUpperCase() == "I" && modifiers <= 1 && !document.getElementById("printedit-hideexcept").hasAttribute("disabled")) cmdHideExcept();
            else if (event.key.toUpperCase() == "E" && modifiers <= 1 && !document.getElementById("printedit-deleteexcept").hasAttribute("disabled")) cmdDeleteExcept();
            else if (event.key.toUpperCase() == "F" && modifiers <= 1 && !document.getElementById("printedit-format").hasAttribute("disabled")) cmdFormat();
            else if (event.key.toUpperCase() == "T" && modifiers <= 1 && !document.getElementById("printedit-text").hasAttribute("disabled")) cmdText();
            else if (event.key.toUpperCase() == "U" && modifiers <= 1 && !document.getElementById("printedit-undo").hasAttribute("disabled")) cmdUndo();
            else if (event.key.toUpperCase() == "N" && modifiers <= 1 && !document.getElementById("printedit-undoall").hasAttribute("disabled")) cmdUndoAll();
            else if (event.key.toUpperCase() == "V" && modifiers <= 1 && !document.getElementById("printedit-save").hasAttribute("disabled")) cmdSave();
            else if (event.key.toUpperCase() == "X" && modifiers <= 1 && !document.getElementById("printedit-textpieces").hasAttribute("disabled")) cmdTextPieces();
            else if (event.key.toUpperCase() == "M" && modifiers <= 1 && !document.getElementById("printedit-viewmore").hasAttribute("disabled")) cmdViewMore();
            else if (event.key.toUpperCase() == "W" && modifiers <= 1 && !document.getElementById("printedit-webstyle").hasAttribute("disabled")) cmdWebStyle();
            else if (event.key.toUpperCase() == "P" && modifiers <= 1 && curMode == 2) cmdPreview();
            else if (event.key.toUpperCase() == "C" && modifiers <= 1) cmdClose();
            else if (event.key.toUpperCase() == "O" && modifiers <= 1) cmdTools();
            else if (event.key.toUpperCase() == "L" && modifiers <= 1) cmdHelp();
            
            else if (event.key == "a" && modifiers == 2 && !document.getElementById("printedit-select").hasAttribute("disabled")) cmdSelectAll();
            else if (event.key == "p" && modifiers == 2 && curMode == 2) cmdPreview();
            else if (event.key == "s" && modifiers == 2 && !document.getElementById("printedit-save").hasAttribute("disabled")) cmdSaveStart(0);
            else if (event.key == "z" && modifiers == 2 && !document.getElementById("printedit-undo").hasAttribute("disabled")) cmdUndo();
        }
        else
        {
            if (event.key == "Escape" && modifiers == 0)
            {
                closePopup(false);
            }
            else if (popupOpen == 1 || (formatInspect && popupOpen == 10))  /* inspect */
            {
                if (event.key == "ArrowUp" && modifiers == 0) cmdExpand();
                else if (event.key == "ArrowDown" && modifiers == 0) cmdShrink();
                else if (event.key == "ArrowLeft" && modifiers == 0) cmdBackwards();
                else if (event.key == "ArrowRight" && modifiers == 0) cmdForwards();
                else if (event.key == "Enter" && modifiers == 0) cmdSelectElement();
            }
            else if (popupOpen == 2)  /* select */
            {
                if (event.key.toUpperCase() == "A" && modifiers <= 1) cmdSelectAll();
                else if (event.key.toUpperCase() == "G" && modifiers <= 1) cmdSelectGraphics();
                else if (event.key.toUpperCase() == "B" && modifiers <= 1) cmdSelectPageBreaks();
                else if (event.key.toUpperCase() == "P" && modifiers <= 1) cmdSelectPrevious();
            }
            else if (popupOpen == 3)  /* delete except */
            {
                if (event.key.toUpperCase() == "R" && modifiers <= 1) cmdDeleteExceptRestricted();
                else if (event.key.toUpperCase() == "W" && modifiers <= 1) cmdDeleteExceptWithoutFloat();
                else if (event.key.toUpperCase() == "U" && modifiers <= 1) cmdDeleteExceptUnrestricted();
            }
            else if (popupOpen == 6)  /* save */
            {
                if (event.key.toUpperCase() == "H" && modifiers <= 1) cmdSaveStart(0);
                else if (event.key.toUpperCase() == "M" && modifiers <= 1) cmdSaveStart(1);
                else if (event.key.toUpperCase() == "P" && modifiers <= 1) cmdSaveAsPDF();
            }
            else if (popupOpen == 8)  /* tools */
            {
                if (event.key.toUpperCase() == "A" && modifiers <= 1) cmdToolsFixPageBreaks("all");
                else if (event.key.toUpperCase() == "D" && modifiers <= 1) cmdToolsFixPageBreaks("display");
                else if (event.key.toUpperCase() == "P" && modifiers <= 1) cmdToolsFixPageBreaks("position");
                else if (event.key.toUpperCase() == "F" && modifiers <= 1) cmdToolsFixPageBreaks("float");
                else if (event.key.toUpperCase() == "O" && modifiers <= 1) cmdToolsOptions();
            }
        }
    }
    
    if (!textinput) event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

function onKeyPress(event)
{
    var textinput;
    
    textinput = (popupOpen == 5 && document.activeElement.id == "printedit-text-textarea") ||
                (popupOpen == 7 && document.activeElement.id == "printedit-savepdf-paperwidth") ||
                (popupOpen == 7 && document.activeElement.id == "printedit-savepdf-paperheight") ||
                (popupOpen == 7 && document.activeElement.id == "printedit-savepdf-scaling");
    
    if (!textinput) event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
}

/************************************************************************/

/*  Focus event handlers */

function onFocus(event)
{
    /* Element in main frame has gained focus */
    /* Un-focus this element and keep main frame focused */
    
    if (document.activeElement != document.body && 
        document.activeElement.id != "printedit-format-restrict-mode" && document.activeElement.id != "printedit-format-restrict-type" && 
        document.activeElement.id != "printedit-text-insert-type" && document.activeElement.id != "printedit-text-textarea" &&
        document.activeElement.id != "printedit-savepdf-papersize" && document.activeElement.id != "printedit-savepdf-orientation" &&
        document.activeElement.id != "printedit-savepdf-paperwidth" && document.activeElement.id != "printedit-savepdf-paperheight" &&
        document.activeElement.id != "printedit-savepdf-scaling")
    {
        document.activeElement.blur();
        
        // console.log("onFocus: " + document.activeElement.localName);
    }
}

function onBlur(event)
{
    /* Element in main frame has lost focus */
    /* Other element in main frame may gain focus after a short delay */
    /* In this case un-focus the other element and keep the main frame focused */ 
    
    window.setTimeout(
    function()
    {
        if (document.activeElement != document.body &&
            document.activeElement.id != "printedit-format-restrict-mode" && document.activeElement.id != "printedit-format-restrict-type" &&
            document.activeElement.id != "printedit-text-insert-type" && document.activeElement.id != "printedit-text-textarea" &&
            document.activeElement.id != "printedit-savepdf-papersize" && document.activeElement.id != "printedit-savepdf-orientation" &&
            document.activeElement.id != "printedit-savepdf-paperwidth" && document.activeElement.id != "printedit-savepdf-paperheight" &&
            document.activeElement.id != "printedit-savepdf-scaling")
        {
            document.activeElement.blur();
            
            // console.log("onBlur: " + document.activeElement.localName);
        }
    },10);
}

/************************************************************************/

/*  Before Unload event handler */

function onBeforeUnload(event)
{
    /* Can be reload, navigation, tab close or window close */
    
    /* Leave page if there are no unsaved edits */
    
    if (cmdNumber == saveCmdNumber)
    {
        if (unloadAskOnly) return;  /* leave page */
    }
    
    /* Show prompt to leave or stay on page */
    
    return "confirm exit";  /* any string opens prompt */
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

/* Inspect Panel */

function cmdInspectInitPanel()
{
    var i,field,top,bottom,left,right,overflowX,overflowY;
    var rgbString,fontFamily,fontStyle,fontWeight,fontSize,lineHeight;
    var textDecoration,textTransform,borderCollapse,borderSpacing,pageBreakBefore,pageBreakAfter,pageBreakInside;
    var rgbColors = new Array();
    
    /* Inspect header element */
    
    document.getElementById("printedit-inspect-element").textContent = "<" + highlightElement.localName + ">";
    
    /* Inspect element properties */
    
    field = document.getElementById("printedit-inspect-position");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("position");
    
    field = document.getElementById("printedit-inspect-left");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("left");
    
    field = document.getElementById("printedit-inspect-top");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("top");
    
    field = document.getElementById("printedit-inspect-width");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("width");
    
    field = document.getElementById("printedit-inspect-height");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("height");
    
    field = document.getElementById("printedit-inspect-margin-l");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("margin-left");
    
    field = document.getElementById("printedit-inspect-margin-r");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("margin-right");
    
    field = document.getElementById("printedit-inspect-margin-t");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("margin-top");
    
    field = document.getElementById("printedit-inspect-margin-b");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("margin-bottom");
    
    field = document.getElementById("printedit-inspect-padding-l");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("padding-left");
    
    field = document.getElementById("printedit-inspect-padding-r");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("padding-right");
    
    field = document.getElementById("printedit-inspect-padding-t");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("padding-top");
    
    field = document.getElementById("printedit-inspect-padding-b");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("padding-bottom");
    
    field = document.getElementById("printedit-inspect-float");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("float");
    
    field = document.getElementById("printedit-inspect-clear");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("clear");
    
    field = document.getElementById("printedit-inspect-pagebreak");
    pageBreakBefore = window.getComputedStyle(highlightElement,null).getPropertyValue("page-break-before");
    pageBreakAfter = window.getComputedStyle(highlightElement,null).getPropertyValue("page-break-after");
    pageBreakInside = window.getComputedStyle(highlightElement,null).getPropertyValue("page-break-inside");
    field.textContent = "";
    if (pageBreakBefore == "always") field.textContent += " before";  /* 'left' and 'right' reported as 'always' */
    else if (pageBreakBefore == "avoid") field.textContent += " \u00ACbefore";
    if (pageBreakAfter == "always") field.textContent += " after";  /* 'left' and 'right' reported as 'always' */
    else if (pageBreakAfter == "avoid") field.textContent += " \u00ACafter";
    if (pageBreakInside == "avoid") field.textContent += " \u00ACinside";
    if (field.textContent == "") field.textContent = "auto";
    field.textContent = field.textContent.trim();
    if (field.textContent.length > 9) field.textContent = field.textContent.replace(/(?:ore|er|ide)/g,"");
    if (field.textContent.length > 9) field.textContent = field.textContent.replace(/(?:ef|ft|ns)/g,"");
    
    field = document.getElementById("printedit-inspect-color");
    rgbString = window.getComputedStyle(highlightElement,null).getPropertyValue("color");
    if (rgbString == "transparent") rgbColors[4] = "0";
    else if (rgbString.substr(0,4) == "rgba") rgbColors = rgbString.match(/rgba\((\d+),\s(\d+),\s(\d+),\s(\d\.?\d*)\)/);
    else if (rgbString.substr(0,3) == "rgb") { rgbColors = rgbString.match(/rgb\((\d+),\s(\d+),\s(\d+)\)/); rgbColors[4] = "1"; }
    if (+rgbColors[4] == 0) field.textContent = "transparent";
    else if (+rgbColors[1] == 0 && +rgbColors[2] == 0 && +rgbColors[3] == 0 && +rgbColors[4] == 1) field.textContent = "black";
    else if (+rgbColors[1] == 255 && +rgbColors[2] == 255 && +rgbColors[3] == 255 && +rgbColors[4] == 1) field.textContent = "white";
    else
    {
        field.textContent = "#";
        for (i = 1; i <= 3; i++) field.textContent += (rgbColors[i]<16?"0":"") + (+rgbColors[i]).toString(16);
        if (+rgbColors[4] != 1) field.textContent += "/" + (+rgbColors[4]);
    }
    
    field = document.getElementById("printedit-inspect-background");
    rgbString = window.getComputedStyle(highlightElement,null).getPropertyValue("background-color");
    if (rgbString == "transparent") rgbColors[4] = "0";
    else if (rgbString.substr(0,4) == "rgba") rgbColors = rgbString.match(/rgba\((\d+),\s(\d+),\s(\d+),\s(\d\.?\d*)\)/);
    else if (rgbString.substr(0,3) == "rgb") { rgbColors = rgbString.match(/rgb\((\d+),\s(\d+),\s(\d+)\)/); rgbColors[4] = "1"; }
    if (+rgbColors[4] == 0) field.textContent = "transparent";
    else if (+rgbColors[1] == 0 && +rgbColors[2] == 0 && +rgbColors[3] == 0 && +rgbColors[4] == 1) field.textContent = "black";
    else if (+rgbColors[1] == 255 && +rgbColors[2] == 255 && +rgbColors[3] == 255 && +rgbColors[4] == 1) field.textContent = "white";
    else
    {
        field.textContent = "#";
        for (i = 1; i <= 3; i++) field.textContent += (rgbColors[i]<16?"0":"") + (+rgbColors[i]).toString(16);
        if (+rgbColors[4] != 1) field.textContent += "/" + (+rgbColors[4]);
    }
    
    field = document.getElementById("printedit-inspect-fontfamily");
    fontFamily = window.getComputedStyle(highlightElement,null).getPropertyValue("font-family");
    field.textContent = fontFamily.match(/^['"]?([^'",]*)['"]?[,]?/)[1];
    
    field = document.getElementById("printedit-inspect-fontstyle");
    fontStyle = window.getComputedStyle(highlightElement,null).getPropertyValue("font-style");
    fontWeight = window.getComputedStyle(highlightElement,null).getPropertyValue("font-weight");
    if (fontWeight == "bold" || fontWeight >= "700") fontWeight = "bold"; else fontWeight = "normal";
    if (fontWeight == "normal") field.textContent = fontStyle;
    else if (fontStyle == "normal") field.textContent = fontWeight;
    else field.textContent = fontWeight + " " + fontStyle;
    
    field = document.getElementById("printedit-inspect-fontsize");
    fontSize = window.getComputedStyle(highlightElement,null).getPropertyValue("font-size");
    field.textContent = fontSize;
    
    field = document.getElementById("printedit-inspect-lineheight");
    lineHeight = window.getComputedStyle(highlightElement,null).getPropertyValue("line-height");
    if (lineHeight == "normal") field.textContent = "normal";
    else field.textContent = (lineHeight.substr(0,lineHeight.length-2)/fontSize.substr(0,fontSize.length-2)).toFixed(4);
    
    field = document.getElementById("printedit-inspect-verticalalign");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("vertical-align");
    
    field = document.getElementById("printedit-inspect-textalign");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("text-align");
    
    field = document.getElementById("printedit-inspect-textdecoration");
    textDecoration = window.getComputedStyle(highlightElement,null).getPropertyValue("text-decoration");
    field.textContent = "";
    if (textDecoration.indexOf("underline") >= 0) field.textContent += " under";
    if (textDecoration.indexOf("overline") >= 0) field.textContent += " over";
    if (textDecoration.indexOf("line-through") >= 0) field.textContent += " through";
    if (field.textContent == "") field.textContent = "none";
    
    field = document.getElementById("printedit-inspect-texttransform");
    textTransform = window.getComputedStyle(highlightElement,null).getPropertyValue("text-transform");
    if (textTransform.indexOf("capitalize") >= 0) field.textContent = "capital";
    else if (textTransform.indexOf("uppercase") >= 0) field.textContent = "upper";
    else if (textTransform.indexOf("lowercase") >= 0) field.textContent = "lower";
    else field.textContent = "none";
    
    field = document.getElementById("printedit-inspect-liststyle");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("list-style-type");
    
    field = document.getElementById("printedit-inspect-tableborder");
    borderCollapse = window.getComputedStyle(highlightElement,null).getPropertyValue("border-collapse");
    borderSpacing = window.getComputedStyle(highlightElement,null).getPropertyValue("border-spacing");
    borderSpacing = Math.max(borderSpacing.match(/^(\d+)px\s(\d+)px/)[1],borderSpacing.match(/^(\d+)px\s(\d+)px/)[2])+"px";
    if (borderCollapse == "collapse") field.textContent = "collapse";
    else field.textContent = borderSpacing;
    
    field = document.getElementById("printedit-inspect-whitespace");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("white-space");
    
    field = document.getElementById("printedit-inspect-border");
    top = window.getComputedStyle(highlightElement,null).getPropertyValue("border-top-width");
    bottom = window.getComputedStyle(highlightElement,null).getPropertyValue("border-bottom-width");
    left = window.getComputedStyle(highlightElement,null).getPropertyValue("border-left-width");
    right = window.getComputedStyle(highlightElement,null).getPropertyValue("border-right-width");
    field.textContent = Math.max(top.substr(0,top.length-2),bottom.substr(0,bottom.length-2),left.substr(0,left.length-2),right.substr(0,right.length-2))+"px";
    
    field = document.getElementById("printedit-inspect-outline");
    field.textContent = window.getComputedStyle(highlightElement,null).getPropertyValue("outline-width");
    
    field = document.getElementById("printedit-inspect-overflow");
    overflowX = window.getComputedStyle(highlightElement,null).getPropertyValue("overflow-x");
    overflowY = window.getComputedStyle(highlightElement,null).getPropertyValue("overflow-y");
    if (overflowX == "hidden" || overflowY == "hidden") field.textContent = "hidden";
    else if (overflowX == "scroll" || overflowY == "scroll") field.textContent = "scroll";
    else if (overflowX == "auto" || overflowY == "auto") field.textContent = "auto";
    else field.textContent = "visible";
}

/************************************************************************/

/* Format Panel */

function cmdFormatInitPanel()
{
    var headerstr;
    
    /* Format header elements */
    
    headerstr = "<" + selectElement[cmdNumber][0].localName + ">";
    if (selectCount[cmdNumber] > 1) headerstr += " , <" + selectElement[cmdNumber][1].localName + ">";
    if (selectCount[cmdNumber] > 2) headerstr += " , <" + selectElement[cmdNumber][2].localName + ">";
    if (selectCount[cmdNumber] > 3) headerstr += " , ...";
    
    document.getElementById("printedit-format-element").textContent = headerstr;
    
    cmdFormatStateChange();
    
    cmdFormatValueChange();
    
    cmdFormatRestrictChange();
    
    /* First apply/okay command */
    
    formatFirstCmd = true;
}

function cmdFormatTextStyle()
{
    var button,state;
    
    cmdFormatStateChange();
    
    button = document.getElementById("printedit-format-textstyle");
    
    state = (button.getAttribute("printedit-color") != "green");
    
    cmdFormatSetState("color",state);
    cmdFormatSetState("background",state);
    cmdFormatSetState("fontfamily",state);
    cmdFormatSetState("fontsize",state);
    cmdFormatSetState("lineheight",state);
    cmdFormatSetState("textalign",state);
    cmdFormatSetState("whitespace",state);
    
    cmdFormatStateChange();
}

function cmdFormatDecoration()
{
    var button,state;
    
    cmdFormatStateChange();
    
    button = document.getElementById("printedit-format-decoration");
    
    state = (button.getAttribute("printedit-color") != "green");
    
    cmdFormatSetState("border",state);
    cmdFormatSetState("outline",state);
    
    cmdFormatSetState("fontstyle",state);
    cmdFormatSetState("verticalalign",state);
    cmdFormatSetState("textdecoration",state);
    cmdFormatSetState("texttransform",state);
    cmdFormatSetState("liststyle",state);
    
    cmdFormatStateChange();
}

function cmdFormatMargins()
{
    var button,state;
    
    cmdFormatStateChange();
    
    button = document.getElementById("printedit-format-margins");
    
    state = (button.getAttribute("printedit-color") != "green");
    
    cmdFormatSetState("margin-l",state);
    cmdFormatSetState("margin-r",state);
    cmdFormatSetState("margin-t",state);
    cmdFormatSetState("margin-b",state);
    cmdFormatSetState("padding-l",state);
    cmdFormatSetState("padding-r",state);
    cmdFormatSetState("padding-t",state);
    cmdFormatSetState("padding-b",state);
    cmdFormatSetState("overflow",state);
    
    cmdFormatSetState("tableborder",state);
    
    cmdFormatStateChange();
}

function cmdFormatDimensions()
{
    var button,state;
    
    cmdFormatStateChange();
    
    button = document.getElementById("printedit-format-dimensions");
    
    state = (button.getAttribute("printedit-color") != "green");
    
    cmdFormatSetState("width",state);
    cmdFormatSetState("height",state);
    
    cmdFormatStateChange();
}

function cmdFormatBlockLayout()
{
    var button,state;
    
    cmdFormatStateChange();
    
    button = document.getElementById("printedit-format-blocklayout");
    
    state = (button.getAttribute("printedit-color") != "green");
    
    cmdFormatSetState("position",state);
    cmdFormatSetState("left",state);
    cmdFormatSetState("top",state);
    cmdFormatSetState("float",state);
    cmdFormatSetState("clear",state);
    
    cmdFormatSetState("pagebreak",state);
    
    cmdFormatStateChange();
}

function cmdFormatSetAll(state)
{
    /* Format properties states */
    
    cmdFormatSetState("position",state);
    cmdFormatSetState("left",state);
    cmdFormatSetState("top",state);
    cmdFormatSetState("width",state);
    cmdFormatSetState("height",state);
    cmdFormatSetState("margin-l",state);
    cmdFormatSetState("margin-r",state);
    cmdFormatSetState("margin-t",state);
    cmdFormatSetState("margin-b",state);
    cmdFormatSetState("padding-l",state);
    cmdFormatSetState("padding-r",state);
    cmdFormatSetState("padding-t",state);
    cmdFormatSetState("padding-b",state);
    cmdFormatSetState("float",state);
    cmdFormatSetState("clear",state);
    cmdFormatSetState("pagebreak",state);
    
    cmdFormatSetState("color",state);
    cmdFormatSetState("background",state);
    cmdFormatSetState("fontfamily",state);
    cmdFormatSetState("fontstyle",state);
    cmdFormatSetState("fontsize",state);
    cmdFormatSetState("lineheight",state);
    cmdFormatSetState("verticalalign",state);
    cmdFormatSetState("textalign",state);
    cmdFormatSetState("textdecoration",state);
    cmdFormatSetState("texttransform",state);
    cmdFormatSetState("liststyle",state);
    cmdFormatSetState("tableborder",state);
    cmdFormatSetState("whitespace",state);
    cmdFormatSetState("border",state);
    cmdFormatSetState("outline",state);
    cmdFormatSetState("overflow",state);
    
    cmdFormatStateChange();
}

function cmdFormatToggleState(property)
{
    cmdFormatSetState(property,document.getElementById("printedit-format-" + property).checked);
    
    cmdFormatStateChange();
}

function cmdFormatSetState(property,state)
{
    document.getElementById("printedit-format-" + property).checked = state;
}

function cmdFormatStateChange()
{
    var button,count;
    
    /* Text Style button color*/
    
    count = 0;
    button = document.getElementById("printedit-format-textstyle");
    if (document.getElementById("printedit-format-color").checked) count++;
    if (document.getElementById("printedit-format-background").checked) count++;
    if (document.getElementById("printedit-format-fontfamily").checked) count++;
    if (document.getElementById("printedit-format-fontsize").checked) count++;
    if (document.getElementById("printedit-format-lineheight").checked) count++;
    if (document.getElementById("printedit-format-textalign").checked) count++;
    if (document.getElementById("printedit-format-whitespace").checked) count++;
    if (count == 7) button.setAttribute("printedit-color","green");
    else if (count > 0) button.setAttribute("printedit-color","amber");
    else button.removeAttribute("printedit-color");
    
    /* Decoration button color */
    
    count = 0;
    button = document.getElementById("printedit-format-decoration");
    if (document.getElementById("printedit-format-border").checked) count++;
    if (document.getElementById("printedit-format-outline").checked) count++;
    if (document.getElementById("printedit-format-fontstyle").checked) count++;
    if (document.getElementById("printedit-format-verticalalign").checked) count++;
    if (document.getElementById("printedit-format-textdecoration").checked) count++;
    if (document.getElementById("printedit-format-texttransform").checked) count++;
    if (document.getElementById("printedit-format-liststyle").checked) count++;
    if (count == 7) button.setAttribute("printedit-color","green");
    else if (count > 0) button.setAttribute("printedit-color","amber");
    else button.removeAttribute("printedit-color");
    
    /* Margins button color */
    
    count= 0;
    button = document.getElementById("printedit-format-margins");
    if (document.getElementById("printedit-format-margin-l").checked) count++;
    if (document.getElementById("printedit-format-margin-r").checked) count++;
    if (document.getElementById("printedit-format-margin-t").checked) count++;
    if (document.getElementById("printedit-format-margin-b").checked) count++;
    if (document.getElementById("printedit-format-padding-l").checked) count++;
    if (document.getElementById("printedit-format-padding-r").checked) count++;
    if (document.getElementById("printedit-format-padding-t").checked) count++;
    if (document.getElementById("printedit-format-padding-b").checked) count++;
    if (document.getElementById("printedit-format-tableborder").checked) count++;
    if (document.getElementById("printedit-format-overflow").checked) count++;
    if (count == 10) button.setAttribute("printedit-color","green");
    else if (count > 0) button.setAttribute("printedit-color","amber");
    else button.removeAttribute("printedit-color");
    
    /* Dimensions button color */
    
    count= 0;
    button = document.getElementById("printedit-format-dimensions");
    if (document.getElementById("printedit-format-width").checked) count++;
    if (document.getElementById("printedit-format-height").checked) count++;
    if (count == 2) button.setAttribute("printedit-color","green");
    else if (count > 0) button.setAttribute("printedit-color","amber");
    else button.removeAttribute("printedit-color");
    
    /* Block Layout button color */
    
    count= 0;
    button = document.getElementById("printedit-format-blocklayout");
    if (document.getElementById("printedit-format-position").checked) count++;
    if (document.getElementById("printedit-format-left").checked) count++;
    if (document.getElementById("printedit-format-top").checked) count++;
    if (document.getElementById("printedit-format-float").checked) count++;
    if (document.getElementById("printedit-format-clear").checked) count++;
    if (document.getElementById("printedit-format-pagebreak").checked) count++;
    if (count == 6) button.setAttribute("printedit-color","green");
    else if (count > 0) button.setAttribute("printedit-color","amber");
    else button.removeAttribute("printedit-color");
}

function cmdFormatResetValue(property,value)
{
    
    cmdFormatSetValue(property,value);
    
    cmdFormatValueChange();
}

function cmdFormatPrevValue(property,valuestring)
{
    var i,label,interval,delay;
    var values = new Array();
    
    function repeat()
    {
        if (--delay < 0 && i > 0) cmdFormatSetValue(property,values[--i]);
    }
    
    function finish()
    {
        window.clearInterval(interval);
        window.removeEventListener("mouseup",finish,true);
        cmdFormatValueChange();
    }
    
    label = document.getElementById("printedit-format-" + property + "-value");
    values = valuestring.split(",");
    
    for (i = values.length-1; i >= 2; i--)
        if (label.textContent == values[i]) break;
        
    cmdFormatSetValue(property,values[--i]);
    
    interval = window.setInterval(repeat,100);
    delay = 5;
    
    window.addEventListener("mouseup",finish,true);
}

function cmdFormatNextValue(property,valuestring)
{
    var i,label,interval,delay;
    var values = new Array();
    
    function repeat()
    {
        if (--delay < 0 && i < values.length-1) cmdFormatSetValue(property,values[++i]);
    }
    
    function finish()
    {
        window.clearInterval(interval);
        window.removeEventListener("mouseup",finish,true);
        cmdFormatValueChange();
    }
    
    label = document.getElementById("printedit-format-" + property + "-value");
    values = valuestring.split(",");
    
    for (i = 0; i <= values.length-3; i++)
        if (label.textContent == values[i]) break;
    
    cmdFormatSetValue(property,values[++i]);
    
    interval = window.setInterval(repeat,100);
    delay = 5;
    
    window.addEventListener("mouseup",finish,true);
}
    
function cmdFormatSetValue(property,value)
{
    document.getElementById("printedit-format-" + property + "-value").textContent = value;
}

function cmdFormatValueChange()
{
    var changed;
    
    /* Reset Values button state */
    
    changed = document.getElementById("printedit-format-position-value").textContent != "static" ||
              document.getElementById("printedit-format-left-value").textContent != "auto" ||
              document.getElementById("printedit-format-top-value").textContent != "auto" ||
              document.getElementById("printedit-format-width-value").textContent != "auto" ||
              document.getElementById("printedit-format-height-value").textContent != "auto" ||
              document.getElementById("printedit-format-margin-l-value").textContent != "0px" ||
              document.getElementById("printedit-format-margin-r-value").textContent != "0px" ||
              document.getElementById("printedit-format-margin-t-value").textContent != "0px" ||
              document.getElementById("printedit-format-margin-b-value").textContent != "0px" ||
              document.getElementById("printedit-format-padding-l-value").textContent != "0px" ||
              document.getElementById("printedit-format-padding-r-value").textContent != "0px" ||
              document.getElementById("printedit-format-padding-t-value").textContent != "0px" ||
              document.getElementById("printedit-format-padding-b-value").textContent != "0px" ||
              document.getElementById("printedit-format-border-value").textContent != "0px" ||
              document.getElementById("printedit-format-outline-value").textContent != "0px" ||
              document.getElementById("printedit-format-overflow-value").textContent != "visible" ||
              
              document.getElementById("printedit-format-color-value").textContent != "black" ||
              document.getElementById("printedit-format-background-value").textContent != "transparent" ||
              document.getElementById("printedit-format-fontfamily-value").textContent != "Arial" ||
              document.getElementById("printedit-format-fontstyle-value").textContent != "normal" ||
              document.getElementById("printedit-format-fontsize-value").textContent != "10px" ||
              document.getElementById("printedit-format-lineheight-value").textContent != "1.0" ||
              document.getElementById("printedit-format-verticalalign-value").textContent != "baseline" ||
              document.getElementById("printedit-format-textalign-value").textContent != "left" ||
              document.getElementById("printedit-format-textdecoration-value").textContent != "none" ||
              document.getElementById("printedit-format-texttransform-value").textContent != "none" ||
              document.getElementById("printedit-format-liststyle-value").textContent != "none" ||
              document.getElementById("printedit-format-tableborder-value").textContent != "collapse" ||
              document.getElementById("printedit-format-whitespace-value").textContent != "normal" ||
              document.getElementById("printedit-format-float-value").textContent != "none" ||
              document.getElementById("printedit-format-clear-value").textContent != "none" ||
              document.getElementById("printedit-format-pagebreak-value").textContent != "auto";
              
    if (changed) document.getElementById("printedit-format-resetvalues").removeAttribute("disabled");
    else document.getElementById("printedit-format-resetvalues").setAttribute("disabled","true");
}

function cmdFormatRestrictChange()
{
    document.getElementById("printedit-format-restrict-mode").disabled = !document.getElementById("printedit-format-restrict").checked;
    document.getElementById("printedit-format-restrict-type").disabled = !document.getElementById("printedit-format-restrict").checked;
}

function cmdFormatToggleProps()
{
    /* Update show properties attributes */
    
    if (document.getElementById("printedit-format-footer").hasAttribute("printedit-showprops"))
    {
        document.getElementById("printedit-format-footer").removeAttribute("printedit-showprops");
        document.getElementById("printedit-format-properties").removeAttribute("printedit-showprops");
    }
    else
    {
        document.getElementById("printedit-format-footer").setAttribute("printedit-showprops","");
        document.getElementById("printedit-format-properties").setAttribute("printedit-showprops","");
    }
    
    /* Save show properties setting to local storage */
    
    chrome.storage.local.set(
    {
        "format-showprops": document.getElementById("printedit-format-footer").hasAttribute("printedit-showprops")
    });
}

function cmdFormatResetValues()
{
    /* Format properties values */
    
    document.getElementById("printedit-format-position-value").textContent = "static";
    document.getElementById("printedit-format-left-value").textContent = "auto";
    document.getElementById("printedit-format-top-value").textContent = "auto";
    document.getElementById("printedit-format-width-value").textContent = "auto";
    document.getElementById("printedit-format-height-value").textContent = "auto";
    document.getElementById("printedit-format-margin-l-value").textContent = "0px";
    document.getElementById("printedit-format-margin-r-value").textContent = "0px";
    document.getElementById("printedit-format-margin-t-value").textContent = "0px";
    document.getElementById("printedit-format-margin-b-value").textContent = "0px";
    document.getElementById("printedit-format-padding-l-value").textContent = "0px";
    document.getElementById("printedit-format-padding-r-value").textContent = "0px";
    document.getElementById("printedit-format-padding-t-value").textContent = "0px";
    document.getElementById("printedit-format-padding-b-value").textContent = "0px";
    document.getElementById("printedit-format-border-value").textContent = "0px";
    document.getElementById("printedit-format-outline-value").textContent = "0px";
    document.getElementById("printedit-format-overflow-value").textContent = "visible";
    
    document.getElementById("printedit-format-color-value").textContent = "black";
    document.getElementById("printedit-format-background-value").textContent = "transparent";
    document.getElementById("printedit-format-fontfamily-value").textContent = "Arial";
    document.getElementById("printedit-format-fontstyle-value").textContent = "normal";
    document.getElementById("printedit-format-fontsize-value").textContent = "10px";
    document.getElementById("printedit-format-lineheight-value").textContent = "1.0";
    document.getElementById("printedit-format-verticalalign-value").textContent = "baseline";
    document.getElementById("printedit-format-textalign-value").textContent = "left";
    document.getElementById("printedit-format-textdecoration-value").textContent = "none";
    document.getElementById("printedit-format-texttransform-value").textContent = "none";
    document.getElementById("printedit-format-liststyle-value").textContent = "none";
    document.getElementById("printedit-format-tableborder-value").textContent = "collapse";
    document.getElementById("printedit-format-whitespace-value").textContent = "normal";
    document.getElementById("printedit-format-float-value").textContent = "none";
    document.getElementById("printedit-format-clear-value").textContent = "none";
    document.getElementById("printedit-format-pagebreak-value").textContent = "auto";
    
    document.getElementById("printedit-format-resetvalues").setAttribute("disabled","true");
}

function cmdFormatApply(okay)
{
    /* Save format panel settings to local storage */
    
    chrome.storage.local.set(
    {
        /* Format properties states */
        
        "format-position": document.getElementById("printedit-format-position").checked,
        "format-left": document.getElementById("printedit-format-left").checked,
        "format-top": document.getElementById("printedit-format-top").checked,
        "format-width": document.getElementById("printedit-format-width").checked,
        "format-height": document.getElementById("printedit-format-height").checked,
        "format-margin-l": document.getElementById("printedit-format-margin-l").checked,
        "format-margin-r": document.getElementById("printedit-format-margin-r").checked,
        "format-margin-t": document.getElementById("printedit-format-margin-t").checked,
        "format-margin-b": document.getElementById("printedit-format-margin-b").checked,
        "format-padding-l": document.getElementById("printedit-format-padding-l").checked,
        "format-padding-r": document.getElementById("printedit-format-padding-r").checked,
        "format-padding-t": document.getElementById("printedit-format-padding-t").checked,
        "format-padding-b": document.getElementById("printedit-format-padding-b").checked,
        "format-border": document.getElementById("printedit-format-border").checked,
        "format-outline": document.getElementById("printedit-format-outline").checked,
        "format-overflow": document.getElementById("printedit-format-overflow").checked,
        
        "format-color": document.getElementById("printedit-format-color").checked,
        "format-background": document.getElementById("printedit-format-background").checked,
        "format-fontfamily": document.getElementById("printedit-format-fontfamily").checked,
        "format-fontstyle": document.getElementById("printedit-format-fontstyle").checked,
        "format-fontsize": document.getElementById("printedit-format-fontsize").checked,
        "format-lineheight": document.getElementById("printedit-format-lineheight").checked,
        "format-verticalalign": document.getElementById("printedit-format-verticalalign").checked,
        "format-textalign": document.getElementById("printedit-format-textalign").checked,
        "format-textdecoration": document.getElementById("printedit-format-textdecoration").checked,
        "format-texttransform": document.getElementById("printedit-format-texttransform").checked,
        "format-liststyle": document.getElementById("printedit-format-liststyle").checked,
        "format-tableborder": document.getElementById("printedit-format-tableborder").checked,
        "format-whitespace": document.getElementById("printedit-format-whitespace").checked,
        "format-float": document.getElementById("printedit-format-float").checked,
        "format-clear": document.getElementById("printedit-format-clear").checked,
        "format-pagebreak": document.getElementById("printedit-format-pagebreak").checked,
        
        /* Format properties values */
        
        "format-position-value": document.getElementById("printedit-format-position-value").textContent,
        "format-left-value": document.getElementById("printedit-format-left-value").textContent,
        "format-top-value": document.getElementById("printedit-format-top-value").textContent,
        "format-width-value": document.getElementById("printedit-format-width-value").textContent,
        "format-height-value": document.getElementById("printedit-format-height-value").textContent,
        "format-margin-l-value": document.getElementById("printedit-format-margin-l-value").textContent,
        "format-margin-r-value": document.getElementById("printedit-format-margin-r-value").textContent,
        "format-margin-t-value": document.getElementById("printedit-format-margin-t-value").textContent,
        "format-margin-b-value": document.getElementById("printedit-format-margin-b-value").textContent,
        "format-padding-l-value": document.getElementById("printedit-format-padding-l-value").textContent,
        "format-padding-r-value": document.getElementById("printedit-format-padding-r-value").textContent,
        "format-padding-t-value": document.getElementById("printedit-format-padding-t-value").textContent,
        "format-padding-b-value": document.getElementById("printedit-format-padding-b-value").textContent,
        "format-border-value": document.getElementById("printedit-format-border-value").textContent,
        "format-outline-value": document.getElementById("printedit-format-outline-value").textContent,
        "format-overflow-value": document.getElementById("printedit-format-overflow-value").textContent,
        
        "format-color-value": document.getElementById("printedit-format-color-value").textContent,
        "format-background-value": document.getElementById("printedit-format-background-value").textContent,
        "format-fontfamily-value": document.getElementById("printedit-format-fontfamily-value").textContent,
        "format-fontstyle-value": document.getElementById("printedit-format-fontstyle-value").textContent,
        "format-fontsize-value": document.getElementById("printedit-format-fontsize-value").textContent,
        "format-lineheight-value": document.getElementById("printedit-format-lineheight-value").textContent,
        "format-verticalalign-value": document.getElementById("printedit-format-verticalalign-value").textContent,
        "format-textalign-value": document.getElementById("printedit-format-textalign-value").textContent,
        "format-textdecoration-value": document.getElementById("printedit-format-textdecoration-value").textContent,
        "format-texttransform-value": document.getElementById("printedit-format-texttransform-value").textContent,
        "format-liststyle-value": document.getElementById("printedit-format-liststyle-value").textContent,
        "format-tableborder-value": document.getElementById("printedit-format-tableborder-value").textContent,
        "format-whitespace-value": document.getElementById("printedit-format-whitespace-value").textContent,
        "format-float-value": document.getElementById("printedit-format-float-value").textContent,
        "format-clear-value": document.getElementById("printedit-format-clear-value").textContent,
        "format-pagebreak-value": document.getElementById("printedit-format-pagebreak-value").textContent,
        
        /* Format controls */
        
        "format-subelements": document.getElementById("printedit-format-subelements").checked,
        "format-important": document.getElementById("printedit-format-important").checked,
        "format-restrict": document.getElementById("printedit-format-restrict").checked,
        "format-restrict-mode": document.getElementById("printedit-format-restrict-mode").value,
        "format-restrict-type": document.getElementById("printedit-format-restrict-type").value
    });
    
    /* Perform format command */
    
    cmdFormatPerform(okay);
}

/************************************************************************/

/* Text Panel */

function cmdTextInitPanel()
{
    var element,wrapped,headerstr;
    
    element = selectElement[cmdNumber][0];
    wrapped = element.hasAttribute("printedit-text-wrapper");
    
    /* Text header element */
    
    if (wrapped) headerstr = "#text";
    else headerstr = "<" + element.localName + ">";
    
    document.getElementById("printedit-text-element").textContent = headerstr;
    
    /* Text type and content */
    
    if (wrapped)
    {
        document.getElementById("printedit-text-insert-type").removeAttribute("disabled");
        document.getElementById("printedit-text-insert-type").value = "tp";
        document.getElementById("printedit-text-insert-type-tp").style.removeProperty("display");
        
        document.getElementById("printedit-text-textarea").value = element.textContent;
        
        textPieceValue = element.textContent;
        textInsertValue = "";
    }
    else
    {
        document.getElementById("printedit-text-insert-type").removeAttribute("disabled");
        document.getElementById("printedit-text-insert-type").value = textInsertType;
        document.getElementById("printedit-text-insert-type-tp").style.setProperty("display","none","important");
        
        document.getElementById("printedit-text-textarea").value = "";
        
        textInsertValue = "";
    }
    
    /* Focus text area */
    
    document.getElementById("printedit-text-textarea").focus();
    
    /* First apply/okay command */
    
    textFirstCmd = true;
}

function cmdTextInput()
{
    var index,count;
    var matches = new Array();
    
    /* Text content */
    
    if (document.getElementById("printedit-text-insert-type").value == "tp")
    {
        index = document.getElementById("printedit-text-textarea").selectionStart;
        
        matches = document.getElementById("printedit-text-textarea").value.match(/\n/g);  /* may have pasted text containing multiple new lines */
        
        count = (matches == null) ? 0 : matches.length;
        
        document.getElementById("printedit-text-textarea").value = document.getElementById("printedit-text-textarea").value.replace(/\n/g,"");
        
        document.getElementById("printedit-text-textarea").selectionStart = index-count;
        document.getElementById("printedit-text-textarea").selectionEnd = index-count;
        
        textPieceValue = document.getElementById("printedit-text-textarea").value;
    }
    else textInsertValue = document.getElementById("printedit-text-textarea").value;
}

function cmdTextType()
{
    /* Text content */
    
    if (document.getElementById("printedit-text-insert-type").value == "tp")
    {
        document.getElementById("printedit-text-textarea").value = textPieceValue;
    }
    else document.getElementById("printedit-text-textarea").value = textInsertValue;
    
    /* Re-focus text area */
    
    document.getElementById("printedit-text-textarea").focus();
}

function cmdTextApply(okay)
{
    /* Save insert type setting to local storage */
    
    if (document.getElementById("printedit-text-insert-type").value != "tp")
    {
        textInsertType = document.getElementById("printedit-text-insert-type").value;
        
        chrome.storage.local.set(
        {
            "text-insert-type": textInsertType
        });
    }
    
    /* Perform text command */
    
    cmdTextPerform(okay);
}

/************************************************************************/

/* Save As PDF Panel */

function cmdSaveAsPDFShrinkToFit()
{
    document.getElementById("printedit-savepdf-scaling").disabled = document.getElementById("printedit-savepdf-shrinktofit").checked;
}

function cmdSaveAsPDFPaperSize()
{
    document.getElementById("printedit-savepdf-paperwidth").disabled = (document.getElementById("printedit-savepdf-papersize").value != 8);
    document.getElementById("printedit-savepdf-paperheight").disabled = (document.getElementById("printedit-savepdf-papersize").value != 8);
}

function cmdSaveAsPDFSave()
{
    /* Validate scaling */
    
    if (document.getElementById("printedit-savepdf-scaling").value == "")
        document.getElementById("printedit-savepdf-scaling").value = "100";
    
    /* Save options to local storage */
    
    chrome.storage.local.set(
    {
        "options-savepdf-papersize": +document.getElementById("printedit-savepdf-papersize").value,
        "options-savepdf-paperwidth": +document.getElementById("printedit-savepdf-paperwidth").value,
        "options-savepdf-paperheight": +document.getElementById("printedit-savepdf-paperheight").value,
        "options-savepdf-orientation": +document.getElementById("printedit-savepdf-orientation").value,
        "options-savepdf-scaling": +document.getElementById("printedit-savepdf-scaling").value,
        "options-savepdf-shrinktofit": document.getElementById("printedit-savepdf-shrinktofit").checked,
        
        "options-savepdf-backgroundcolors": document.getElementById("printedit-savepdf-backgroundcolors").checked,
        "options-savepdf-backgroundimages": document.getElementById("printedit-savepdf-backgroundimages").checked
    });
    
    /* Perform PDF setup command */
    
    cmdSaveAsPDFPerform();
}

/************************************************************************/

/* Help Panel */

function cmdHelpShowPane(pane)
{
    /* Update show pane attributes */
    
    document.getElementById("printedit-help-button").removeAttribute("printedit-showpane");
    document.getElementById("printedit-help-toolbar").removeAttribute("printedit-showpane");
    document.getElementById("printedit-help-inspect").removeAttribute("printedit-showpane");
    document.getElementById("printedit-help-mouse").removeAttribute("printedit-showpane");
    document.getElementById("printedit-help-keyboard").removeAttribute("printedit-showpane");
    
    document.getElementById("printedit-help-" + pane).setAttribute("printedit-showpane","");
    
    /* Save show pane setting to local storage */
    
    chrome.storage.local.set(
    {
        "help-showpane": pane
    });
}

/************************************************************************/

/* Selection navigation keys/buttons */

function cmdExpand()
{
    var element;
    var boundingRect = new Object();
    
    if (!downFlag && (popupOpen <= 1 || (formatInspect && popupOpen == 10)) && highlightElement != null)
    {
        for (element = highlightElement.parentNode; element.localName != "html"; element = element.parentNode)
        {
            boundingRect = element.getBoundingClientRect();
            if (boundingRect.width > 0 || boundingRect.height > 0) break;
        }
        
        if (element.localName == "html") return;
        
        highlightStack.push(highlightElement);
        
        highlightElement = element;
        
        showHighlightBox();
        
        cmdInspectInitPanel();
    }
}

function cmdShrink()
{
    if (!downFlag && (popupOpen <= 1 || (formatInspect && popupOpen == 10)) && highlightElement != null)
    {
        if (highlightStack.length == 0) return;
        
        highlightElement = highlightStack.pop();
        
        showHighlightBox();
        
        cmdInspectInitPanel();
    }
}

function cmdBackwards()
{
    var element,visible;
    var boundingRect = new Object();
    
    if (!downFlag && (popupOpen <= 1 || (formatInspect && popupOpen == 10)) && highlightElement != null)
    {
        element = highlightElement;
        
        visible = false;
        
        while (!visible)
        {
            if (element.localName == "body")
            {
                while (element.children.length > 0) element = element.children[element.children.length-1];
            }
            else if (element.previousElementSibling != null)
            {
                element = element.previousElementSibling;
                
                while (element.children.length > 0) element = element.children[element.children.length-1];
            }
            else
            {
                if (element.parentElement.localName != "html") element = element.parentElement;
            }
            
            boundingRect = element.getBoundingClientRect();
            visible = (boundingRect.width > 0 || boundingRect.height > 0);
        }
        
        highlightElement = element;
        
        showHighlightBox();
        
        cmdInspectInitPanel();
    }
}

function cmdForwards()
{
    var element,visible;
    var boundingRect = new Object();
    
    if (!downFlag && (popupOpen <= 1 || (formatInspect && popupOpen == 10)) && highlightElement != null)
    {
        element = highlightElement;
        
        visible = false;
        
        while (!visible)
        {
            if (element.children.length > 0)
            {
                element = element.children[0];
            }
            else if (element.nextElementSibling != null)
            {
                element = element.nextElementSibling;
            }
            else
            {
                while (element.nextElementSibling == null && element.parentElement.localName != "html") element = element.parentElement;
                
                if (element.localName != "body") element = element.nextElementSibling;
            }
            
            boundingRect = element.getBoundingClientRect();
            visible = (boundingRect.width > 0 || boundingRect.height > 0);
        }
        
        highlightElement = element;
        
        showHighlightBox();
        
        cmdInspectInitPanel();
    }
}

function cmdSelectElement()
{
    var i,selectIndex;
    
    if (!downFlag && (popupOpen <= 1 || (formatInspect && popupOpen == 10)) && highlightElement != null)
    {
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        {
            if (selectElement[cmdNumber][selectIndex] == highlightElement) break;
        }
        
        if (selectIndex < selectCount[cmdNumber])  /* remove selection box */
        {
            destroyBox(selectBox[selectIndex]);
            hideBox(highlightBox);
            
            for (i = selectIndex; i < selectCount[cmdNumber]-1; i++)
            {
                selectElement[cmdNumber][i] = selectElement[cmdNumber][i+1];
                selectBox[i] = selectBox[i+1];
            }
            
            selectCount[cmdNumber]--;
            selectElement[cmdNumber].length--;
            selectBox.length--;
        }
        else  /* add selection box */
        {
            selectElement[cmdNumber][selectCount[cmdNumber]] = highlightElement;
            selectBox[selectCount[cmdNumber]] = createBox("selectbox");
            
            showBox(selectBox[selectCount[cmdNumber]],highlightElement,0,0,0,0,0x0,0x0);
            hideBox(highlightBox);
            
            selectCount[cmdNumber]++;
        }
        
        if (selectCount[cmdNumber] > 0) enableEditButtons();
        else disableEditButtons();
    }
}

/************************************************************************/

/* Page breaks key/button */

function cmdPageBreaks()
{
    var selectIndex,element;
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
    {
        element = selectElement[cmdNumber][selectIndex];
        
        if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
        else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
        
        element.style.setProperty("page-break-before","always","important");
    }
    
    destroySelectBoxes();
    nextCommand();
    
    disableEditButtons();
    enableUndoButtons();
}

/************************************************************************/

/* Print Edit toolbar button commands */

function cmdDeselect()
{
    if (document.getElementById("printedit-deselect").hasAttribute("disabled")) return;
    
    destroySelectBoxes();
    deselectElements();
    
    disableEditButtons();
}

function cmdSelect()
{
    var selectIndex,element;
    
    if (document.getElementById("printedit-select").hasAttribute("disabled")) return;
    
    document.getElementById("printedit-select-previous").setAttribute("disabled","");
    
    if (cmdNumber > 0)
    {
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber-1]; selectIndex++)
        {
            element = selectElement[cmdNumber-1][selectIndex];
            if (element.style.getPropertyValue("display") != "none" &&
                element.style.getPropertyValue("pointer-events") != "none")
                    document.getElementById("printedit-select-previous").removeAttribute("disabled");
        }
    }
    
    document.getElementById("printedit-select").setAttribute("checked","");
    
    showMenuPopup("select",false);
    
    popupOpen = 2;
}

function cmdSelectAll()
{
    document.getElementById("printedit-select").removeAttribute("checked");
    
    document.getElementById("printedit-select-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    selectElement[cmdNumber][0] = document.body;
    selectBox[0] = createBox("selectbox");
    
    showBox(selectBox[0],document.body,0,0,0,0,0x0,0x0);
    hideBox(highlightBox);
    
    selectCount[cmdNumber]++;
    
    enableEditButtons();
}

function cmdSelectGraphics()
{
    document.getElementById("printedit-select").removeAttribute("checked");
    
    document.getElementById("printedit-select-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    captureWindow = window;
    
    captureWidth = document.body.scrollWidth;
    captureHeight = document.body.scrollHeight;
    captureLeft = 0;
    captureTop = 0;
    
    selectCapturedGraphics(document.body);
    
    captureWindow = null;
    
    if (selectCount[cmdNumber] > 0) enableEditButtons();
}

function cmdSelectPageBreaks()
{
    document.getElementById("printedit-select").removeAttribute("checked");
    
    document.getElementById("printedit-select-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    selectPageBreaks(document.body);
    
    if (selectCount[cmdNumber] > 0) enableEditButtons();
}

function cmdSelectPrevious()
{
    var selectIndex,element;
    
    if (document.getElementById("printedit-select-previous").hasAttribute("disabled")) return;
    
    document.getElementById("printedit-select").removeAttribute("checked");
    
    document.getElementById("printedit-select-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber-1]; selectIndex++)
    {
        element = selectElement[cmdNumber-1][selectIndex];
        
        if (element.style.getPropertyValue("display") == "none" ||
            element.style.getPropertyValue("pointer-events") == "none") continue;
        
        selectElement[cmdNumber][selectCount[cmdNumber]] = element;
        selectBox[selectCount[cmdNumber]] = createBox("selectbox");
        
        showBox(selectBox[selectCount[cmdNumber]],element,0,0,0,0,0x0,0x0);
        
        selectCount[cmdNumber]++;
    }
    
    if (selectCount[cmdNumber] > 0) enableEditButtons();
}

function cmdHide()
{
    var selectIndex,element;
    
    if (document.getElementById("printedit-hide").hasAttribute("disabled")) return;
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
    {
        element = selectElement[cmdNumber][selectIndex];
        
        if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
        else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
        
        if (hideSelect)
        {
            element.style.setProperty("opacity","0","important");
        }
        else
        {
            element.style.setProperty("opacity","0","important");
            element.style.setProperty("pointer-events","none","important");
        }
    }
    
    destroySelectBoxes();
    nextCommand();
    
    disableEditButtons();
    enableUndoButtons();
}

function cmdDelete()
{
    var selectIndex,element;
    
    if (document.getElementById("printedit-delete").hasAttribute("disabled")) return;
    
    for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
    {
        element = selectElement[cmdNumber][selectIndex];
        
        if (!element.hasAttribute("printedit-style")) element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText);
        else element.setAttribute("printedit-style",cmdNumber + "\u204B" + element.style.cssText + "\u204B" + element.getAttribute("printedit-style"));
        
        element.style.setProperty("display","none","important");
    }
    
    destroySelectBoxes();
    nextCommand();
    
    disableEditButtons();
    enableUndoButtons();
}

function cmdHideExcept()
{
    if (document.getElementById("printedit-hideexcept").hasAttribute("disabled")) return;
    
    hideExcept(document.body);
    
    destroySelectBoxes();
    nextCommand();
    
    disableEditButtons();
    enableUndoButtons();
}

function cmdDeleteExcept()
{
    if (document.getElementById("printedit-deleteexcept").hasAttribute("disabled")) return;
    
    document.getElementById("printedit-deleteexcept").setAttribute("checked","");
    
    showMenuPopup("deleteexcept",false);
    
    popupOpen = 3;
}

function cmdDeleteExceptRestricted()
{
    document.getElementById("printedit-deleteexcept").removeAttribute("checked");
    
    document.getElementById("printedit-deleteexcept-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    deleteExcept(document.body,0);
    
    destroySelectBoxes();
    nextCommand();
    
    disableEditButtons();
    enableUndoButtons();
}

function cmdDeleteExceptWithoutFloat()
{
    document.getElementById("printedit-deleteexcept").removeAttribute("checked");
    
    document.getElementById("printedit-deleteexcept-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    deleteExcept(document.body,1);
    
    destroySelectBoxes();
    nextCommand();
    
    disableEditButtons();
    enableUndoButtons();
}

function cmdDeleteExceptUnrestricted()
{
    document.getElementById("printedit-deleteexcept").removeAttribute("checked");
    
    document.getElementById("printedit-deleteexcept-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    deleteExcept(document.body,2);
    
    destroySelectBoxes();
    nextCommand();
    
    disableEditButtons();
    enableUndoButtons();
}

function cmdFormat()
{
    if (document.getElementById("printedit-format").hasAttribute("disabled")) return;
    
    document.getElementById("printedit-format").setAttribute("checked","");
    
    showPanelPopup("format","format",false);
    
    popupOpen = 4;
    
    cmdFormatInitPanel();
}

function cmdFormatPerform(okay)
{
    var selectIndex,element;
    
    if (okay)
    {
        document.getElementById("printedit-format").removeAttribute("checked");
        
        document.getElementById("printedit-format-panel").style.setProperty("display","none","important");
        
        popupOpen = 0;
    }
    
    if (!formatFirstCmd)
    {
        deselectElements();
        cmdNumber--;
    }
    
    /* Perform format command */
    
    if (!formatFirstCmd) undoCommands(document.body);
    
    if (document.getElementById("printedit-format-textstyle").hasAttribute("printedit-color") ||
        document.getElementById("printedit-format-decoration").hasAttribute("printedit-color") ||
        document.getElementById("printedit-format-margins").hasAttribute("printedit-color") ||
        document.getElementById("printedit-format-dimensions").hasAttribute("printedit-color") ||
        document.getElementById("printedit-format-blocklayout").hasAttribute("printedit-color"))
    {
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        {
            element = selectElement[cmdNumber][selectIndex];
            
            formatElement(element);
        }
    }
    
    formatFirstCmd = false;
    
    if (!okay)
    {
        nextCommand();
        
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber-1]; selectIndex++)
        {
            element = selectElement[cmdNumber-1][selectIndex];
            selectElement[cmdNumber][selectIndex] = element;
            
            showBox(selectBox[selectIndex],element,0,0,0,0,0x0,0x0);
            
            selectCount[cmdNumber]++;
        }
    }
    else
    {
        destroySelectBoxes();
        nextCommand();
        
        disableEditButtons();
    }
    
    enableUndoButtons();
}

function cmdText()
{
    if (document.getElementById("printedit-text").hasAttribute("disabled")) return;
    
    document.getElementById("printedit-text").setAttribute("checked","");
    
    showPanelPopup("text","text",false);
    
    popupOpen = 5;
    
    cmdTextInitPanel();
}

function cmdTextPerform(okay)
{
    var element,type,textstr,width;
    
    if (okay)
    {
        document.getElementById("printedit-text").removeAttribute("checked");
        
        document.getElementById("printedit-text-panel").style.setProperty("display","none","important");
        
        popupOpen = 0;
    }
    else document.getElementById("printedit-text-textarea").focus();
    
    if (!textFirstCmd)
    {
        deselectElements();
        cmdNumber--;
    }
    
    /* Perform text command */
    
    element = selectElement[cmdNumber][0];
    
    type = document.getElementById("printedit-text-insert-type").value;
    textstr = document.getElementById("printedit-text-textarea").value;
    width = document.getElementById("printedit-text-textarea").clientWidth-4;
    
    if (textFirstCmd)
    {
        if (type == "tp")  /* Text Piece */
        {
            textContainer = element;
            
            if (!element.hasAttribute("printedit-text")) element.setAttribute("printedit-text",cmdNumber + "\u204B" + element.textContent);
            else element.setAttribute("printedit-text",cmdNumber + "\u204B" + element.textContent + "\u204B" + element.getAttribute("printedit-text"));
            
            element.textContent = textstr;
        }
        else if (type == "ib" || type == "ia")  /* Inline Before or Inline After */
        {
            textContainer = document.createElement("span");
            constructTextPieces(textContainer,textstr);
            
            if (type == "ib") element.parentNode.insertBefore(textContainer,element);
            else element.parentNode.insertBefore(textContainer,element.nextSibling);
        }
        else if (type == "bb" || type == "ba" )  /* Block Before or Block After */
        {
            textContainer = document.createElement("div");
            constructTextPieces(textContainer,textstr);
            
            if (type == "bb") element.parentNode.insertBefore(textContainer,element);
            else element.parentNode.insertBefore(textContainer,element.nextSibling);
        }
        else if (type == "sb" || type == "sa")  /* Sticky Before or Sticky After */
        {
            textContainer = document.createElement("div");
            constructTextPieces(textContainer,textstr);
            
            if (type == "sb") element.parentNode.insertBefore(textContainer,element);
            else element.parentNode.insertBefore(textContainer,element.nextSibling);
            
            textContainer.style.setProperty("width",width+"px","");
            
            textContainer.style.setProperty("margin","4px","");
            textContainer.style.setProperty("padding","8px 10px","");
            textContainer.style.setProperty("border","1px solid #A0A0A0","");
            textContainer.style.setProperty("font-family","Arial,Helvetica","");
            textContainer.style.setProperty("font-size","13px","");
            textContainer.style.setProperty("font-style","normal","");
            textContainer.style.setProperty("font-weight","normal","");
            textContainer.style.setProperty("line-height","16px","");
            textContainer.style.setProperty("word-wrap","break-word","");
            textContainer.style.setProperty("color","#606060","");
            textContainer.style.setProperty("background-color","#FFFFE0","");
        }
    }
    else
    {
        if (type == "tp")  /* Text Piece */
        {
            element.textContent = textstr;
        }
        else
        {
            constructTextPieces(textContainer,textstr);
            
            if (type == "sb" || type == "sa")  /* Sticky Before or Sticky After */
                textContainer.style.setProperty("width",width+"px","");
        }
    }
    
    textFirstCmd = false;
    
    document.getElementById("printedit-text-insert-type").setAttribute("disabled","true");
    
    if (!okay)
    {
        nextCommand();
        
        selectElement[cmdNumber][0] = textContainer;
        
        showBox(selectBox[0],textContainer,0,0,0,0,0x0,0x0);
        
        selectCount[cmdNumber]++;
    }
    else
    {
        destroySelectBoxes();
        nextCommand();
        
        disableEditButtons();
    }
    
    enableUndoButtons();
}

function cmdUndo()
{
    var selectIndex,element;
    
    if (document.getElementById("printedit-undo").hasAttribute("disabled")) return;
    
    destroySelectBoxes();
    deselectElements();
    cmdNumber--;
    
    if (cmdNumber < saveCmdNumber) saveCmdNumber = -1;
    
    undoCommands(document.body);
    
    if (undoReinstate && selectCount[cmdNumber] > 0)  /* no selection boxes if command was Fix Page Breaks */
    {
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        {
            element = selectElement[cmdNumber][selectIndex];
            selectBox[selectIndex] = createBox("selectbox");
            
            showBox(selectBox[selectIndex],element,0,0,0,0,0x0,0x0);
        }
        
        window.setTimeout(function()  /* in case select element positions change after slow re-layout */
        {
            for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
            {
                element = selectElement[cmdNumber][selectIndex];
                
                showBox(selectBox[selectIndex],element,0,0,0,0,0x0,0x0);
            }
        },300);
        
        enableEditButtons();
    }
    else 
    {
        deselectElements();
        
        disableEditButtons();
    }
    
    if (cmdNumber == 0) disableUndoButtons();
}

function cmdUndoAll()
{
    if (document.getElementById("printedit-undoall").hasAttribute("disabled")) return;
    
    destroySelectBoxes();
    
    while (cmdNumber >= 0)
    {
        deselectElements();
        cmdNumber--;
    }
    
    cmdNumber = -1;
    
    undoCommands(document.body);
    
    cmdNumber = 0;
    
    if (cmdNumber < saveCmdNumber) saveCmdNumber = -1;
    
    disableEditButtons();
    disableUndoButtons();
}

function cmdSave()
{
    if (document.getElementById("printedit-save").hasAttribute("disabled")) return;
    
    document.getElementById("printedit-save").setAttribute("checked","");
    
    showMenuPopup("save",false);
    
    popupOpen = 6;
}

function cmdSaveStart(saveType)
{
    var checked;
    
    document.getElementById("printedit-save").removeAttribute("checked");
    
    document.getElementById("printedit-save-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    if (saveType == 1 && isFirefox) return;  /* Save As MHTML not available for Firefox */
    if (saveType == 2 && !isFirefox) return;  /* Save As PDF not available for Chrome */
    
    checked = document.getElementById("printedit-webstyle").hasAttribute("checked");
    
    /* Save edited web page as HTML, MHTML or PDF file */
    
    saveInProgress = true;
    
    suspendEditing();
    
    window.setTimeout(
    function()
    {
        chrome.storage.local.get(null,
        function(object)
        {
            if (saveType == 0)  /* save as HTML */
            {
                chrome.runtime.sendMessage({ type: "saveHTML", saveditems: object["options-savehtml-saveditems"], swapdevices: !checked });
            }
            else if (saveType == 1)  /* save as MHTML (Chrome) */
            {
                chrome.runtime.sendMessage({ type: "saveMHTML" });
            }
            else if (saveType == 2)  /* save as PDF (Firefox) */
            {
                if (ffVersion >= 75)
                {
                    chrome.runtime.sendMessage({ type: "savePDF" });
                }
                else
                {
                    /* Firefox - chrome.tabs.saveAsPDF() did not support toFileName parameter until Firefox 75 - see Bug 1483590 */
                    
                    backupTitle = document.title;
                    
                    chrome.storage.local.get(null,
                    function(object)
                    {
                        backupHeaderLeft = object["options-savepdf-headerleft"];
                        backupHeaderCenter = object["options-savepdf-headercenter"];
                        backupHeaderRight = object["options-savepdf-headerright"];
                        backupFooterLeft = object["options-savepdf-footerleft"];
                        backupFooterCenter = object["options-savepdf-footercenter"];
                        backupFooterRight = object["options-savepdf-footerright"];
                        
                        chrome.storage.local.set(
                        {
                            "options-savepdf-headerleft": object["options-savepdf-headerleft"].replace(/&T/g,document.title),
                            "options-savepdf-headercenter": object["options-savepdf-headercenter"].replace(/&T/g,document.title),
                            "options-savepdf-headerright": object["options-savepdf-headerright"].replace(/&T/g,document.title),
                            "options-savepdf-footerleft": object["options-savepdf-footerleft"].replace(/&T/g,document.title),
                            "options-savepdf-footercenter": object["options-savepdf-footercenter"].replace(/&T/g,document.title),
                            "options-savepdf-footerright": object["options-savepdf-footerright"].replace(/&T/g,document.title)
                        },
                        function()
                        {
                            chrome.runtime.sendMessage({ type: "getPDFFileName" },
                            function(object)
                            {
                                document.title = object.filename;  /* chrome.tabs.saveAsPDF() added .pdf until Firefox 75 */
                                
                                window.setTimeout(function() { chrome.runtime.sendMessage({ type: "savePDF" }); },100);  /* allow time for document.title to propogate */
                            });
                        });
                    });
                }
            }
        });
    },100);  /* allow time for [EDIT] prefix to be removed from tab title */
}

function cmdSaveDone(saveType,success)
{
    if (saveType == 0 || saveType == 1)  /* save as HTML or save as MHTML (Chrome) */
    {
        if (success) saveCmdNumber = cmdNumber;
        
        resumeEditing();
        
        saveInProgress = false;
    }
    else if (saveType == 2)  /* save as PDF (Firefox) */
    {
        if (ffVersion >= 75)
        {
            if (success) saveCmdNumber = cmdNumber;
            
            resumeEditing();
            
            saveInProgress = false;
        }
        else
        {
            /* Firefox - chrome.tabs.saveAsPDF() did not support toFileName parameter until Firefox 75 - see Bug 1483590 */
            
            document.title = backupTitle;
            
            chrome.storage.local.set(
            {
                "options-savepdf-headerleft": backupHeaderLeft,
                "options-savepdf-headercenter": backupHeaderCenter,
                "options-savepdf-headerright": backupHeaderRight,
                "options-savepdf-footerleft": backupFooterLeft,
                "options-savepdf-footercenter": backupFooterCenter,
                "options-savepdf-footerright": backupFooterRight
            },
            function()
            {
                if (success) saveCmdNumber = cmdNumber;
                
                resumeEditing();
                
                saveInProgress = false;
            });
        }
    }
}

function cmdSaveAsPDF()
{
    document.getElementById("printedit-save-menu").style.setProperty("display","none","important");
    
    chrome.storage.local.get(null,
    function(object)
    {
        document.getElementById("printedit-savepdf-papersize").value = object["options-savepdf-papersize"];
        document.getElementById("printedit-savepdf-orientation").value = object["options-savepdf-orientation"];
        document.getElementById("printedit-savepdf-paperwidth").value = object["options-savepdf-paperwidth"];
        document.getElementById("printedit-savepdf-paperheight").value = object["options-savepdf-paperheight"];
        document.getElementById("printedit-savepdf-scaling").value = object["options-savepdf-scaling"];
        document.getElementById("printedit-savepdf-shrinktofit").checked = object["options-savepdf-shrinktofit"];
        
        document.getElementById("printedit-savepdf-backgroundcolors").checked = object["options-savepdf-backgroundcolors"];
        document.getElementById("printedit-savepdf-backgroundimages").checked = object["options-savepdf-backgroundimages"];
        
        document.getElementById("printedit-savepdf-paperwidth").disabled = (document.getElementById("printedit-savepdf-papersize").value != 8);
        document.getElementById("printedit-savepdf-paperheight").disabled = (document.getElementById("printedit-savepdf-papersize").value != 8);
        document.getElementById("printedit-savepdf-scaling").disabled = document.getElementById("printedit-savepdf-shrinktofit").checked;
        
        showPanelPopup("save","savepdf",false);
        
        popupOpen = 7;
    });
}

function cmdSaveAsPDFPerform()
{
    document.getElementById("printedit-save").removeAttribute("checked");
    
    document.getElementById("printedit-savepdf-panel").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    cmdSaveStart(2);
}

function cmdTextPieces()
{
    var i,checked,selectIndex;
    
    if (document.getElementById("printedit-textpieces").hasAttribute("disabled")) return;
    
    checked = document.getElementById("printedit-textpieces").hasAttribute("checked");
    
    if (checked) document.getElementById("printedit-textpieces").removeAttribute("checked");
    else document.getElementById("printedit-textpieces").setAttribute("checked","");
    
    checked = !checked;
    
    if (checked) enableTextPieces(document.body,textpiecesBreaks);
    else
    {
        disableTextPieces(document.body);
        
        for (selectIndex = 0; selectIndex < selectCount[cmdNumber]; selectIndex++)
        {
            if (selectElement[cmdNumber][selectIndex].hasAttribute("printedit-text-wrapper"))
            {
                destroyBox(selectBox[selectIndex]);
                
                for (i = selectIndex; i < selectCount[cmdNumber]-1; i++)
                {
                    selectElement[cmdNumber][i] = selectElement[cmdNumber][i+1];
                    selectBox[i] = selectBox[i+1];
                }
                
                selectCount[cmdNumber]--;
                selectElement[cmdNumber].length--;
                selectBox.length--;
                selectIndex--;
            }
        }
    }
}

function cmdViewMore()
{
    var checked;
    
    if (document.getElementById("printedit-viewmore").hasAttribute("disabled")) return;
    
    checked = document.getElementById("printedit-viewmore").hasAttribute("checked");
    
    if (checked) document.getElementById("printedit-viewmore").removeAttribute("checked");
    else document.getElementById("printedit-viewmore").setAttribute("checked","");
    
    checked = !checked;
    
    if (checked) enableViewMore(document.body);
    else disableViewMore(document.body);
    
    showSelectBoxes();
}

function cmdWebStyle()
{
    var checked;
    
    if (document.getElementById("printedit-webstyle").hasAttribute("disabled")) return;
    
    checked = document.getElementById("printedit-webstyle").hasAttribute("checked");
    
    if (checked) document.getElementById("printedit-webstyle").removeAttribute("checked");
    else document.getElementById("printedit-webstyle").setAttribute("checked","");
    
    checked = !checked;
    
    displayForDifferentDevice((checked)?"screen":"print");
    
    showSelectBoxes();
}

function cmdPreview()
{
    if (document.getElementById("printedit-preview").hasAttribute("disabled")) return;
    
    if (isFirefox)
    {
        suspendEditing();
        
        backupStyleProperty(document.documentElement,"background","background");
        
        document.documentElement.style.setProperty("background","white","important");
        
        window.addEventListener("afterprint",ffResume,false);
        
        chrome.runtime.sendMessage({ type: "printPreview" });
        
        function ffResume(event)
        {
            window.removeEventListener("afterprint",ffResume,false);
            
            restoreStyleProperty(document.documentElement,"background","background");
            
            resumeEditing();
            
            if (previewAutoClose) cmdClose();
        }
    }
    else
    {
        suspendEditing();
        
        backupStyleProperty(document.documentElement,"background","background");
        
        document.documentElement.style.setProperty("background","white","important");
        
        printMediaQuery.addListener(gcResume);
        
        window.print();  /* blocks execution of all content scripts */
        
        function gcResume(media)
        {
            if (!media.matches)
            {
                printMediaQuery.removeListener(gcResume);
                
                restoreStyleProperty(document.documentElement,"background","background");
                
                resumeEditing();
                
                if (previewAutoClose) cmdClose();
            }
        }
    }
}

function cmdClose()
{
    if (document.getElementById("printedit-close").hasAttribute("disabled")) return;
    
    if (curMode > 0 ) finishEditing();
}

function cmdTools()
{
    if (document.getElementById("printedit-tools").hasAttribute("disabled")) return;
    
    document.getElementById("printedit-tools").setAttribute("checked","");
    
    showMenuPopup("tools",true);
    
    popupOpen = 8;
}

function cmdHelp()
{
    if (document.getElementById("printedit-help").hasAttribute("disabled")) return;
    
    document.getElementById("printedit-help").setAttribute("checked","");
    
    showPanelPopup("help","help",true);
    
    popupOpen = 9;
}

function cmdToolsFixPageBreaks(type)
{
    if (document.getElementById("printedit-tools-fixpagebreaks-" + type).hasAttribute("disabled")) return;
    
    document.getElementById("printedit-tools").removeAttribute("checked");
    
    document.getElementById("printedit-tools-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    fixPageBreaks(document.body,type);
    
    destroySelectBoxes();
    deselectElements();
    nextCommand();
    
    disableEditButtons();
    enableUndoButtons();
}

function cmdToolsOptions()
{
    document.getElementById("printedit-tools").removeAttribute("checked");
    
    document.getElementById("printedit-tools-menu").style.setProperty("display","none","important");
    
    popupOpen = 0;
    
    chrome.runtime.sendMessage({ type: "openOptions" });
}

/************************************************************************/
