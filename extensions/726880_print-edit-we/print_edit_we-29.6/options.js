/************************************************************************/
/*                                                                      */
/*      Print Edit WE - Generic WebExtension - Options Page             */
/*                                                                      */
/*      Javascript for Options Page                                     */
/*                                                                      */
/*      Last Edit - 26 Jul 2023                                         */
/*                                                                      */
/*      Copyright (C) 2013-2023 DW-dev                                  */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE.txt file and http://www.gnu.org/licenses/           */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Refer to Google Chrome developer documentation:                     */
/*                                                                      */
/*  https://developer.chrome.com/extensions/optionsV2                   */
/*                                                                      */
/*  https://developer.chrome.com/extensions/storage                     */
/*                                                                      */
/************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;
var ffVersion;

var platformOS;

var savePageId;

/************************************************************************/

/* Listener for options page load */

document.addEventListener("DOMContentLoaded",onLoadPage,false);

/************************************************************************/

/* Initialize on page load */

function onLoadPage(event)
{
    /* Load options from local storage */
    
    chrome.storage.local.get(null,
    function(object)
    {
        /* Load environment */
        
        isFirefox = object["environment-isfirefox"];
        
        if (isFirefox) ffVersion = object["environment-ffversion"];
        
        platformOS = object["environment-platformos"];
        
        if (!isFirefox) document.body.setAttribute("savemhtml","");
        
        if (isFirefox && ((ffVersion >= 56 && platformOS != "mac") || (ffVersion >= 81 && platformOS == "mac"))) document.body.setAttribute("savepdf","");
	    
        if (isFirefox && ((ffVersion >= 59 && platformOS != "mac") || (ffVersion >= 81 && platformOS == "mac"))) document.body.setAttribute("hfedges","");
	    
        if (isFirefox && ffVersion >= 60) document.body.setAttribute("shortcuts","");
        
        if (platformOS == "win") document.body.setAttribute("windows","");
        
        savePageId = object["environment-savepageid"];
        
        /* General options */
        
        document.getElementById("options-button-doubleclose").checked = object["options-button-doubleclose"];
        document.getElementById("options-context-showsubmenu").checked = object["options-context-showsubmenu"];
        document.getElementById("options-hide-select").checked = object["options-hide-select"];
        document.getElementById("options-format-inspect").checked = object["options-format-inspect"];
        document.getElementById("options-undo-reinstate").checked = object["options-undo-reinstate"];
        document.getElementById("options-textpieces-breaks").checked = object["options-textpieces-breaks"];
        document.getElementById("options-textpieces-enable").checked = object["options-textpieces-enable"];
        document.getElementById("options-viewmore-enable").checked = object["options-viewmore-enable"];
        document.getElementById("options-webstyle-enable").checked = object["options-webstyle-enable"];
        document.getElementById("options-graphics-delete").checked = object["options-graphics-delete"];
        document.getElementById("options-images-nobreaks").checked = object["options-images-nobreaks"];
        document.getElementById("options-fonts-noligatures").checked = object["options-fonts-noligatures"];
        document.getElementById("options-links-hideshowurls").checked = object["options-links-hideshowurls"];
        document.getElementById("options-links-urlsvisibility").value = object["options-links-urlsvisibility"];
        document.getElementById("options-preview-autoclose").checked = object["options-preview-autoclose"];
        document.getElementById("options-close-donotask").checked = object["options-close-donotask"];
        document.getElementById("options-unload-askonly").checked = object["options-unload-askonly"];
        
        document.getElementById("options-select-border").checked = object["options-select-border"];
        document.getElementById("options-select-area").checked = object["options-select-area"];
        document.getElementById("options-capture-snap").checked = object["options-capture-snap"];
        
        document.getElementById("options-links-urlsvisibility").disabled = !document.getElementById("options-links-hideshowurls").checked;
        
        /* Save As HTML options */
        
        document.getElementById("options-savehtml-saveditems").elements["items"].value = object["options-savehtml-saveditems"];
        
        /* Save As MHTML options */
        
        document.getElementById("options-savemhtml-savedfilename").value = object["options-savemhtml-savedfilename"];
        document.getElementById("options-savemhtml-replacespaces").checked = object["options-savemhtml-replacespaces"];
        document.getElementById("options-savemhtml-replacechar").value = object["options-savemhtml-replacechar"];
        document.getElementById("options-savemhtml-maxfilenamelength").value = object["options-savemhtml-maxfilenamelength"];
        
        document.getElementById("options-savemhtml-replacechar").disabled = !document.getElementById("options-savemhtml-replacespaces").checked;

        /* Save As PDF options */
        
        document.getElementById("options-savepdf-papersize").value = object["options-savepdf-papersize"];
        document.getElementById("options-savepdf-orientation").value = object["options-savepdf-orientation"];
        document.getElementById("options-savepdf-paperwidth").value = object["options-savepdf-paperwidth"];
        document.getElementById("options-savepdf-paperheight").value = object["options-savepdf-paperheight"];
        document.getElementById("options-savepdf-scaling").value = object["options-savepdf-scaling"];
        document.getElementById("options-savepdf-shrinktofit").checked = object["options-savepdf-shrinktofit"];
        
        document.getElementById("options-savepdf-backgroundcolors").checked = object["options-savepdf-backgroundcolors"];
        document.getElementById("options-savepdf-backgroundimages").checked = object["options-savepdf-backgroundimages"];
        
        document.getElementById("options-savepdf-edgeleft").value = object["options-savepdf-edgeleft"];
        document.getElementById("options-savepdf-edgeright").value = object["options-savepdf-edgeright"];
        document.getElementById("options-savepdf-edgetop").value = object["options-savepdf-edgetop"];
        document.getElementById("options-savepdf-edgebottom").value = object["options-savepdf-edgebottom"];
        
        document.getElementById("options-savepdf-marginleft").value = object["options-savepdf-marginleft"];
        document.getElementById("options-savepdf-marginright").value = object["options-savepdf-marginright"];
        document.getElementById("options-savepdf-margintop").value = object["options-savepdf-margintop"];
        document.getElementById("options-savepdf-marginbottom").value = object["options-savepdf-marginbottom"];
        
        document.getElementById("options-savepdf-headerleft").value = object["options-savepdf-headerleft"];
        document.getElementById("options-savepdf-headercenter").value = object["options-savepdf-headercenter"];
        document.getElementById("options-savepdf-headerright").value = object["options-savepdf-headerright"];
        document.getElementById("options-savepdf-footerleft").value = object["options-savepdf-footerleft"];
        document.getElementById("options-savepdf-footercenter").value = object["options-savepdf-footercenter"];
        document.getElementById("options-savepdf-footerright").value = object["options-savepdf-footerright"];
        
        document.getElementById("options-savepdf-savedfilename").value = object["options-savepdf-savedfilename"];
        document.getElementById("options-savepdf-replacespaces").checked = object["options-savepdf-replacespaces"];
        document.getElementById("options-savepdf-replacechar").value = object["options-savepdf-replacechar"];
        document.getElementById("options-savepdf-maxfilenamelength").value = object["options-savepdf-maxfilenamelength"];
        
        document.getElementById("options-savepdf-paperwidth").disabled = (document.getElementById("options-savepdf-papersize").value != 8);
        document.getElementById("options-savepdf-paperheight").disabled = (document.getElementById("options-savepdf-papersize").value != 8);
        document.getElementById("options-savepdf-scaling").disabled = document.getElementById("options-savepdf-shrinktofit").checked;
        document.getElementById("options-savepdf-replacechar").disabled = !document.getElementById("options-savepdf-replacespaces").checked;
        
        /* Keyboard shortcuts */
        
        if (isFirefox && ffVersion >= 60)
        {
            chrome.commands.getAll(
            function(commands)
            {
                var i;
                
                for (i = 0; i < commands.length; i++)
                {
                    if (commands[i].name == "_execute_browser_action") document.getElementById("options-shortcuts-browseraction").value = commands[i].shortcut;
                    else if (commands[i].name == "printpreview") document.getElementById("options-shortcuts-printpreview").value = commands[i].shortcut;
                }
            });
        }
        
        /* Add listeners for click on tab buttons */
        
        document.getElementById("options-tabbar-general").addEventListener("click",showGeneralTab,false);
        document.getElementById("options-tabbar-savehtml").addEventListener("click",showSaveHTMLTab,false);
        document.getElementById("options-tabbar-savemhtml").addEventListener("click",showSaveMHTMLTab,false);
        document.getElementById("options-tabbar-savepdf").addEventListener("click",showSavePDFTab,false);
        document.getElementById("options-tabbar-shortcuts").addEventListener("click",showShortcutsTab,false);
        
        /* Add listener for click on show urls after links checkbox */
        
        document.getElementById("options-links-hideshowurls").addEventListener("click",onClickShowUrls,false);
        
        /* Add listener for click on MHTML replace spaces checkbox */
        
        document.getElementById("options-savemhtml-replacespaces").addEventListener("click",onClickMHTMLReplaceSpaces,false);
        
        /* Add listener for change of paper size */
        
        document.getElementById("options-savepdf-papersize").addEventListener("change",onChangePaperSize,false);
        
        /* Add listener for click on PDF shrink-to-fit checkbox */
        
        document.getElementById("options-savepdf-shrinktofit").addEventListener("click",onClickPDFShrinkToFit,false);
        
        /* Add listener for click on PDF replace spaces checkbox */
        
        document.getElementById("options-savepdf-replacespaces").addEventListener("click",onClickPDFReplaceSpaces,false);
        
        /* Add listener for click on save button */
        
        document.getElementById("options-save-button").addEventListener("click",onClickSave,false);
        
        /* Add listener for click on reset all button */
        
        document.getElementById("options-resetall-button").addEventListener("click",onClickResetAll,false);
        
        /* Wait for page layout to complete */
        
        document.getElementById("options").style.setProperty("opacity","0","");
        
        window.setTimeout(
        function()
        {
            var width1,width2,width3,width4,width5,height1,height2,height3,height4,height5,receiverId;
            
            /* Equalize widths of tabs */
            
            width1 = window.getComputedStyle(document.getElementById("options-tab-general"),null).getPropertyValue("width");
            width2 = window.getComputedStyle(document.getElementById("options-tab-savehtml"),null).getPropertyValue("width");
            width3 = window.getComputedStyle(document.getElementById("options-tab-savemhtml"),null).getPropertyValue("width");
            width4 = window.getComputedStyle(document.getElementById("options-tab-savepdf"),null).getPropertyValue("width");
            width5 = window.getComputedStyle(document.getElementById("options-tab-shortcuts"),null).getPropertyValue("width");
            
            width1 = width1.substr(0,width1.length-2);
            width2 = width2.substr(0,width2.length-2);
            width3 = width3.substr(0,width3.length-2);
            width4 = width4.substr(0,width4.length-2);
            width5 = width5.substr(0,width5.length-2);
            
            width1 = Math.max(width1,width2,width3,width4,width5);
            
            document.getElementById("options-tab-general").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-savehtml").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-savemhtml").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-savepdf").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-shortcuts").style.setProperty("width",width1 + "px","");
            
            /* Equalize heights of tabs */
            
            height1 = window.getComputedStyle(document.getElementById("options-tab-general"),null).getPropertyValue("height");
            height2 = window.getComputedStyle(document.getElementById("options-tab-savehtml"),null).getPropertyValue("height");
            height3 = window.getComputedStyle(document.getElementById("options-tab-savemhtml"),null).getPropertyValue("height");
            height4 = window.getComputedStyle(document.getElementById("options-tab-savepdf"),null).getPropertyValue("height");
            height5 = window.getComputedStyle(document.getElementById("options-tab-shortcuts"),null).getPropertyValue("height");
            
            height1 = height1.substr(0,height1.length-2);
            height2 = height2.substr(0,height2.length-2);
            height3 = height3.substr(0,height3.length-2);
            height4 = height4.substr(0,height4.length-2);
            height5 = height5.substr(0,height5.length-2);
            
            height1 = Math.max(height1,height2,height3,height4,height5);
            
            document.getElementById("options-tab-general").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-savehtml").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-savemhtml").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-savepdf").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-shortcuts").style.setProperty("height",height1 + "px","");
            
            /* Show general tab */
            
            showGeneralTab();
            
            /* Check if Save Page WE is installed and enabled (needs 14.0 or later) */
            
            chrome.runtime.sendMessage(savePageId,{ type: "externalSaveCheck" },
            function(object)
            {
                if (chrome.runtime.lastError != null)
                {
                    document.getElementById("options-tabbar-savehtml").setAttribute("notify","");
                    document.getElementById("options-savehtml-notification").setAttribute("notify","");
                }
            });
            
            document.getElementById("options").style.setProperty("opacity","1","");
        },50);
    });
}

/************************************************************************/

/* Select tab */

function showGeneralTab(event)
{
    document.getElementById("options-tabbar-general").setAttribute("selected","");
    document.getElementById("options-tabbar-savehtml").removeAttribute("selected");
    document.getElementById("options-tabbar-savemhtml").removeAttribute("selected");
    document.getElementById("options-tabbar-savepdf").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","block","");
    document.getElementById("options-tab-savehtml").style.setProperty("display","none","");
    document.getElementById("options-tab-savemhtml").style.setProperty("display","none","");
    document.getElementById("options-tab-savepdf").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showSaveHTMLTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-savehtml").setAttribute("selected","");
    document.getElementById("options-tabbar-savemhtml").removeAttribute("selected");
    document.getElementById("options-tabbar-savepdf").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-savehtml").style.setProperty("display","block","");
    document.getElementById("options-tab-savemhtml").style.setProperty("display","none","");
    document.getElementById("options-tab-savepdf").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showSaveMHTMLTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-savehtml").removeAttribute("selected");
    document.getElementById("options-tabbar-savemhtml").setAttribute("selected","");
    document.getElementById("options-tabbar-savepdf").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-savehtml").style.setProperty("display","none","");
    document.getElementById("options-tab-savemhtml").style.setProperty("display","block","");
    document.getElementById("options-tab-savepdf").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showSavePDFTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-savehtml").removeAttribute("selected");
    document.getElementById("options-tabbar-savemhtml").removeAttribute("selected");
    document.getElementById("options-tabbar-savepdf").setAttribute("selected","");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-savehtml").style.setProperty("display","none","");
    document.getElementById("options-tab-savemhtml").style.setProperty("display","none","");
    document.getElementById("options-tab-savepdf").style.setProperty("display","block","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showShortcutsTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-savehtml").removeAttribute("selected");
    document.getElementById("options-tabbar-savemhtml").removeAttribute("selected");
    document.getElementById("options-tabbar-savepdf").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").setAttribute("selected","");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-savehtml").style.setProperty("display","none","");
    document.getElementById("options-tab-savemhtml").style.setProperty("display","none","");
    document.getElementById("options-tab-savepdf").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","block","");
}

/************************************************************************/

/* Enable or Disable options */

function onClickShowUrls(event)
{
    document.getElementById("options-links-urlsvisibility").disabled = !document.getElementById("options-links-hideshowurls").checked;
}

function onClickMHTMLReplaceSpaces(event)
{
    document.getElementById("options-savemhtml-replacechar").disabled = !document.getElementById("options-savemhtml-replacespaces").checked;
}

function onChangePaperSize(event)
{
    document.getElementById("options-savepdf-paperwidth").disabled = (document.getElementById("options-savepdf-papersize").value != 8);
    document.getElementById("options-savepdf-paperheight").disabled = (document.getElementById("options-savepdf-papersize").value != 8);
}

function onClickPDFShrinkToFit(event)
{
    document.getElementById("options-savepdf-scaling").disabled = document.getElementById("options-savepdf-shrinktofit").checked;
}

function onClickPDFReplaceSpaces(event)
{
    document.getElementById("options-savepdf-replacechar").disabled = !document.getElementById("options-savepdf-replacespaces").checked;
}
/************************************************************************/

/* Save options */

function onClickSave(event)
{
    /* Save As MHTML - Validate saved file name and replacement character */
    
    document.getElementById("options-savemhtml-savedfilename").value = document.getElementById("options-savemhtml-savedfilename").value.trim();
    
    if (document.getElementById("options-savemhtml-savedfilename").value == "")
        document.getElementById("options-savemhtml-savedfilename").value = "%TITLE%";
    
    if (document.getElementById("options-savemhtml-replacechar").value == "")
        document.getElementById("options-savemhtml-replacechar").value = "-";
    
    /* Save As PDF - Validate saved file name and replacement character */
    
    document.getElementById("options-savepdf-savedfilename").value = document.getElementById("options-savepdf-savedfilename").value.trim();
    
    if (document.getElementById("options-savepdf-savedfilename").value == "")
        document.getElementById("options-savepdf-savedfilename").value = "%TITLE%";
    
    if (document.getElementById("options-savepdf-replacechar").value == "")
        document.getElementById("options-savepdf-replacechar").value = "-";
    
    /* Save As PDF - Validate scaling */
    
    if (document.getElementById("options-savepdf-scaling").value == "")
        document.getElementById("options-savepdf-scaling").value = "100";
    
    /* Save options to local storage */
    
    chrome.storage.local.set(
    {
        /* General options */
        
        "options-button-doubleclose": document.getElementById("options-button-doubleclose").checked,
        "options-context-showsubmenu": document.getElementById("options-context-showsubmenu").checked,
        "options-hide-select": document.getElementById("options-hide-select").checked,
        "options-format-inspect": document.getElementById("options-format-inspect").checked,
        "options-undo-reinstate": document.getElementById("options-undo-reinstate").checked,
        "options-textpieces-breaks": document.getElementById("options-textpieces-breaks").checked,
        "options-textpieces-enable": document.getElementById("options-textpieces-enable").checked,
        "options-viewmore-enable": document.getElementById("options-viewmore-enable").checked,
        "options-webstyle-enable": document.getElementById("options-webstyle-enable").checked,
        "options-graphics-delete": document.getElementById("options-graphics-delete").checked,
        "options-images-nobreaks": document.getElementById("options-images-nobreaks").checked,
        "options-fonts-noligatures": document.getElementById("options-fonts-noligatures").checked,
        "options-links-hideshowurls": document.getElementById("options-links-hideshowurls").checked,
        "options-links-urlsvisibility": document.getElementById("options-links-urlsvisibility").value,
        "options-preview-autoclose": document.getElementById("options-preview-autoclose").checked,
        "options-close-donotask": document.getElementById("options-close-donotask").checked,
        "options-unload-askonly": document.getElementById("options-unload-askonly").checked,
        
        "options-select-border": document.getElementById("options-select-border").checked,
        "options-select-area": document.getElementById("options-select-area").checked,
        "options-capture-snap": document.getElementById("options-capture-snap").checked,
        
        /* Save As HTML options */
        
        "options-savehtml-saveditems": +document.getElementById("options-savehtml-saveditems").elements["items"].value,
        
        /* Save As MHTML options */
        
        "options-savemhtml-savedfilename": document.getElementById("options-savemhtml-savedfilename").value,
        "options-savemhtml-replacespaces": document.getElementById("options-savemhtml-replacespaces").checked,
        "options-savemhtml-replacechar": document.getElementById("options-savemhtml-replacechar").value,
        "options-savemhtml-maxfilenamelength": document.getElementById("options-savemhtml-maxfilenamelength").value,
        
        /* Save As PDF options */
        
        "options-savepdf-papersize": +document.getElementById("options-savepdf-papersize").value,
        "options-savepdf-orientation": +document.getElementById("options-savepdf-orientation").value,
        "options-savepdf-paperwidth": +document.getElementById("options-savepdf-paperwidth").value,
        "options-savepdf-paperheight": +document.getElementById("options-savepdf-paperheight").value,
        "options-savepdf-scaling": +document.getElementById("options-savepdf-scaling").value,
        "options-savepdf-shrinktofit": document.getElementById("options-savepdf-shrinktofit").checked,
        
        "options-savepdf-backgroundcolors": document.getElementById("options-savepdf-backgroundcolors").checked,
        "options-savepdf-backgroundimages": document.getElementById("options-savepdf-backgroundimages").checked,
        
        "options-savepdf-edgeleft": +document.getElementById("options-savepdf-edgeleft").value,
        "options-savepdf-edgeright": +document.getElementById("options-savepdf-edgeright").value,
        "options-savepdf-edgetop": +document.getElementById("options-savepdf-edgetop").value,
        "options-savepdf-edgebottom": +document.getElementById("options-savepdf-edgebottom").value,
        
        "options-savepdf-marginleft": +document.getElementById("options-savepdf-marginleft").value,
        "options-savepdf-marginright": +document.getElementById("options-savepdf-marginright").value,
        "options-savepdf-margintop": +document.getElementById("options-savepdf-margintop").value,
        "options-savepdf-marginbottom": +document.getElementById("options-savepdf-marginbottom").value,
        
        "options-savepdf-headerleft": document.getElementById("options-savepdf-headerleft").value,
        "options-savepdf-headercenter": document.getElementById("options-savepdf-headercenter").value,
        "options-savepdf-headerright": document.getElementById("options-savepdf-headerright").value,
        "options-savepdf-footerleft": document.getElementById("options-savepdf-footerleft").value,
        "options-savepdf-footercenter": document.getElementById("options-savepdf-footercenter").value,
        "options-savepdf-footerright": document.getElementById("options-savepdf-footerright").value,
        
        "options-savepdf-savedfilename": document.getElementById("options-savepdf-savedfilename").value,
        "options-savepdf-replacespaces": document.getElementById("options-savepdf-replacespaces").checked,
        "options-savepdf-replacechar": document.getElementById("options-savepdf-replacechar").value,
        "options-savepdf-maxfilenamelength": document.getElementById("options-savepdf-maxfilenamelength").value
    });
    
    /* Keyboard shortcuts */
    
    if (isFirefox && ffVersion >= 60)
    {
        try
        {
            chrome.commands.update({ name: "_execute_browser_action", shortcut: document.getElementById("options-shortcuts-browseraction").value });
        }
        catch (e)
        {
            chrome.commands.reset("_execute_browser_action");
            document.getElementById("options-shortcuts-browseraction").value = "Alt+P";
        }
        
        try
        {
            chrome.commands.update({ name: "printpreview", shortcut: document.getElementById("options-shortcuts-printpreview").value });
        }
        catch (e)
        {
            chrome.commands.reset("printpreview");
            document.getElementById("options-shortcuts-printpreview").value = "Alt+Shift+P";
        }
    }
    
    /* Display saved status for short period */
    
    document.getElementById("options-save-button").innerText = "Saved";
    document.getElementById("options-save-button").style.setProperty("font-weight","bold","");
    
    window.setTimeout(function()
    {
        document.getElementById("options-save-button").innerText = "Save";
        document.getElementById("options-save-button").style.setProperty("font-weight","normal","");
    }
    ,1000);
}

/************************************************************************/

/* Reset All options */

function onClickResetAll(event)
{
    /* General options */
    
    document.getElementById("options-button-doubleclose").checked = true;
    document.getElementById("options-context-showsubmenu").checked = true;
    document.getElementById("options-hide-select").checked = false;
    document.getElementById("options-format-inspect").checked = true;
    document.getElementById("options-undo-reinstate").checked = true;
    document.getElementById("options-textpieces-breaks").checked = true;
    document.getElementById("options-textpieces-enable").checked = false;
    document.getElementById("options-viewmore-enable").checked = false;
    document.getElementById("options-webstyle-enable").checked = false;
    document.getElementById("options-graphics-delete").checked = false;
    document.getElementById("options-images-nobreaks").checked = true;
    document.getElementById("options-fonts-noligatures").checked = true;
    document.getElementById("options-links-hideshowurls").checked = false;
    document.getElementById("options-links-urlsvisibility").value = "0";
    document.getElementById("options-preview-autoclose").checked = false;
    document.getElementById("options-close-donotask").checked = false;
    document.getElementById("options-unload-askonly").checked = false;
    
    document.getElementById("options-select-border").checked = false;
    document.getElementById("options-select-area").checked = true;
    document.getElementById("options-capture-snap").checked = true;
    
    document.getElementById("options-links-urlsvisibility").disabled = true;
    
    /* Save As HTML options */
    
    document.getElementById("options-savehtml-saveditems").elements["items"].value = 1;
    
    /* Save As MHTML options */
    
    document.getElementById("options-savemhtml-savedfilename").value = "%TITLE%";
    document.getElementById("options-savemhtml-replacespaces").checked = false;
    document.getElementById("options-savemhtml-replacechar").value = "-";
    document.getElementById("options-savemhtml-maxfilenamelength").value = 150;
    
    document.getElementById("options-savemhtml-replacechar").disabled = true;
    
    /* Save As PDF options */
    
    document.getElementById("options-savepdf-papersize").value = 1;
    document.getElementById("options-savepdf-orientation").value = 0;
    document.getElementById("options-savepdf-paperwidth").value = 8.3;
    document.getElementById("options-savepdf-paperheight").value = 11.7;
    document.getElementById("options-savepdf-scaling").value = 100;
    document.getElementById("options-savepdf-shrinktofit").checked = true;
    
    document.getElementById("options-savepdf-backgroundcolors").checked = false;
    document.getElementById("options-savepdf-backgroundimages").checked = false;
    
    document.getElementById("options-savepdf-edgeleft").value = 0.0;
    document.getElementById("options-savepdf-edgeright").value = 0.0;
    document.getElementById("options-savepdf-edgetop").value = 0.0;
    document.getElementById("options-savepdf-edgebottom").value = 0.0;
    
    document.getElementById("options-savepdf-marginleft").value = 0.5;
    document.getElementById("options-savepdf-marginright").value = 0.5;
    document.getElementById("options-savepdf-margintop").value = 0.5;
    document.getElementById("options-savepdf-marginbottom").value = 0.5;
    
    document.getElementById("options-savepdf-headerleft").value = "&T";
    document.getElementById("options-savepdf-headercenter").value = "";
    document.getElementById("options-savepdf-headerright").value = "&U";
    document.getElementById("options-savepdf-footerleft").value = "&PT";
    document.getElementById("options-savepdf-footercenter").value = "";
    document.getElementById("options-savepdf-footerright").value = "&D";
    
    document.getElementById("options-savepdf-savedfilename").value = "%TITLE%";
    document.getElementById("options-savepdf-replacespaces").checked = false;
    document.getElementById("options-savepdf-replacechar").value = "-";
    document.getElementById("options-savepdf-maxfilenamelength").value = 150;
    
    document.getElementById("options-savepdf-paperwidth").disabled = true;
    document.getElementById("options-savepdf-paperheight").disabled = true;
    document.getElementById("options-savepdf-scaling").disabled = true;
    document.getElementById("options-savepdf-replacechar").disabled = true;
    
    /* Keyboard shortcuts */
    
    if (isFirefox && ffVersion >= 60)
    {
        document.getElementById("options-shortcuts-browseraction").value = "Alt+P";
        document.getElementById("options-shortcuts-printpreview").value = "Alt+Shift+P";
    }
    
    /* Display reset status for short period */
    
    document.getElementById("options-resetall-button").innerText = "Reset";
    document.getElementById("options-resetall-button").style.setProperty("font-weight","bold","");
    
    window.setTimeout(function()
    {
        document.getElementById("options-resetall-button").innerText = "Reset All";
        document.getElementById("options-resetall-button").style.setProperty("font-weight","normal","");
    }
    ,1000);
}

/************************************************************************/
