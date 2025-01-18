var fVideoVersion=false;
var fSearchIsOn = false;

var aCheck={};
var allUrls=[];
//var oFilters={};
//var oFiltersAll={};

var curlang = localStorage.getItem("lang");
if ( !curlang)
    curlang = "en";

var oFilters = localStorage.getItem("oFilters");
oFilters = JSON.parse(oFilters);
if (!oFilters)
    oFilters = {};
var oFiltersAll = localStorage.getItem("oFiltersAll");
oFiltersAll = JSON.parse(oFiltersAll);
if (!oFiltersAll)
    oFiltersAll = {};

var nFilterSize = localStorage.getItem("nFilterSize");
if ( nFilterSize)
    nFilterSize = parseInt(nFilterSize);
else
    nFilterSize=0;

var sFilterName = localStorage.getItem("sFilterName");
if ( !sFilterName)
    sFilterName="";

var fnamemode = localStorage.getItem("fnamemode");
if ( !fnamemode)
    fnamemode = "idRadio1";
    
var curtab = localStorage.getItem("curtab");
if ( !curtab)
    curtab = "idLink";
var fShowThumbs = localStorage.getItem("fShowThumbs")=="true";
var cursort = localStorage.getItem("cursort");
var textDE = [];
textDE['idl_1'] = "Dateinamen von Firefox auswählen lassen";
textDE['idl_2'] = "Bei jeder Datei nach einem Dateinamen fragen";
textDE['idl_3'] = "Nach Präfix für alle Dateinamen fragen";
textDE['idl_4'] = "Nach Verzeichnisnamen für alle Datei fragen";
textDE['idl_5'] = "Alle Typen anzeigen";
textDE['idl_6'] = "Web"
textDE['idl_7'] = "Bilder";
textDE['idl_8'] = "Dokumente";
textDE['idl_9'] = "Video/Audio";
textDE['idl_10'] = "Bilder anzeigen";
textDE['idl_11'] = "Downloads anzeigen";
textDE['idl_12'] = "Dateinamen anpassen";
textDE['idl_13'] = "Alle";
textDE['idl_14'] = "Binärdateien";
textDE['idl_15'] = "Externe Links";
textDE['filesize'] = "nur Dateien größer als:"
textDE['filtername'] = "Mit diesem Text in der Adresse:"
textDE["type"] = "Typ";
textDE["desc"] = "Beschreibung";
textDE["url"] = "Adresse";
textDE["size"] = "Größe";
textDE["q1"] = "Wollen Sie wirklich [count] Dateien runterladen und auch soviele Dateinamen eingeben ?";
textDE["q2"] = "Geben Sie einen Verzeichnisnamen für die heruntergeladenen Dateien an.";
textDE["q3"] = "Geben Sie ein Präfix für die Dateinamen der heruntergeladenen Dateien an.";
textDE["q4"] = "Wollen Sie wirklich [count] Dateien runterladen ?";
textDE["q5"] = "Sie wollen alle Dateien dieser Webseite herunterladen. Bitte beachten Sie, daß die Webseite wahrscheinlich nicht vollständig von Ihrer Festplatte gestartet werden kann! Webseiten enthalten Referenzen auf Online-Inhalte. Diese Referenzen müssen von Ihnen angepasst werden.";
textDE["err0"] = "Sie müssen erst eine oder mehrere Dateien in der Liste auswählen (durch Anklicken der Checkbox).";
textDE["tt0"] = "Klicken Sie, um alle markierten Dateien herunterzuladen.";
textDE["tt1"] = "Klicken Sie, um eine Liste alle heruntergeladenen Dateien anzuzeigen.";
textDE["tt2"] = "Klicken Sie zum Sortieren nach \"[name]\"";
textDE["tt3"] = "Klicken Sie um die Liste zu aktualisieren (für den Fall, dass die Webseite weitere Links geladen hat)";
textDE["tt4"] = "Klicken Sie zum Ändern der Einstellungen";
textDE["tt5"] = "Hier finden Sie alle Dateien, die von der aktuellen Webseite geladen wurden";
textDE["tt6"] = "Hier finden Sie Verweise auf andere Webseiten, die von der aktuellen Webseite erreicht werden können";
textDE["noaudio"] = "Ohne Audio";
textDE["onlyaudio"] = "Nur Audio";
var textEN = [];

textEN['idl_1'] = "Let Firefox determin the filename";
textEN['idl_2'] = "Ask for each file for a filename";
textEN['idl_3'] = "Ask for one prefix for all filesnames";
textEN['idl_4'] = "Ask for one foder name for all files";
textEN['idl_5'] = "Show all types";
textEN['idl_6'] = "Web"
textEN['idl_7'] = "Images";
textEN['idl_8'] = "Docs";
textEN['idl_9'] = "Video & Audio";
textEN['idl_10'] = "Show pictures";
textEN['idl_11'] = "Show Downloads";
textEN['idl_12'] = "Determin filenames";
textEN['idl_13'] = "All";
textEN['idl_14'] = "Binary files";
textEN['idl_15'] = "External links";
textEN['filesize'] = "only files bigger than:"
textEN['filtername'] = "URL includes this text:"
textEN["type"] = "Type";
textEN["desc"] = "Description";
textEN["url"] = "Address";
textEN["size"] = "Size";
textEN["q1"] = "Do you want to download [count] files an enter as many filenames ?";
textEN["q2"] = "Enter a foldername for the files to download.";
textEN["q3"] = "Enter a prefix for the filenames of the downloaded files.";
textEN["q4"] = "Do you really want to download [count] files ?";
textEN["q5"] = "You want to download all files of the website. Please note that the website probably can not start completely from your hard drive! Websites contain references to online content. These references must be customized by you. ";
textEN["err0"] = "First you must select one or more files in the list (by clicking the checkbox).";
textEN["tt0"] = "Click to download all selected files.";
textEN["tt1"] = "Click to open an overview of all downloaded files.";
textEN["tt2"] = "Click to sort by \"[name]\"";
textEN["tt3"] = "Click to refresh the list (for the case the website has loaded more files)";
textEN["tt4"] = "Click to change settings";
textEN["tt5"] = "Here you find all files which are loaded by the website";
textEN["tt6"] = "Here you find links to other websites which are referenced by the current site";
textEN["noaudio"] = "no audio";
textEN["onlyaudio"] = "only audio";
//textDE['idhome'] = "Startpage24 Startseite";
var t = textEN;

var OSDetect = 
{
    getOSName:function()
    {
        if ( !this.OS)
            this.OS = this.searchString(this.dataOS) || "unknown";
        return this.OS;
    },
    searchString: function (data) 
    {
	    for (var i=0;i<data.length;i++)	{
		    var dataString = data[i].string;
		    var dataProp = data[i].prop;
		    this.versionSearchString = data[i].versionSearch || data[i].identity;
		    if (dataString) {
			    if (dataString.indexOf(data[i].subString) != -1)
				    return data[i].identity;
		    }
		    else if (dataProp)
			    return data[i].identity;
	    }
    },
    dataOS : [
	    {
		    string: navigator.platform,
		    subString: "Win",
		    identity: "Windows"
	    },
	    {
		    string: navigator.platform,
		    subString: "Mac",
		    identity: "Mac"
	    },
	    {
		       string: navigator.userAgent,
		       subString: "iPhone",
		       identity: "iPhone/iPod"
        },
	    {
		    string: navigator.platform,
		    subString: "Linux",
		    identity: "Linux"
	    }
    ]
};


function removeAllChilds(o) {
    if (!o)
        return;
    var c = o.firstChild;
    while (c) {
        o.removeChild(c);
        c = o.firstChild;
    }
}
function co(type, parent, params, text) {
    var o = document.createElement(type);
    if (text)
        o.textContent = text;
    for (var item in params) {
        o.setAttribute(item, params[item]);
    }
    if (parent)
        parent.appendChild(o);
    return o;
}

function OnShowDownloadfolder()
{
    chrome.runtime.sendMessage({ msg: "OnSP24ShowDownloads"}, function (response)
    {
    });
    window.close(); 
}

function OnRadio(id)
{
    fnamemode = id;
    localStorage.setItem("fnamemode", fnamemode);
}

function OnCheck(o)
{
    if ( o.id == "idShowThumbs")
    {
        fShowThumbs = o.checked;
        localStorage.setItem("fShowThumbs", fShowThumbs?"true":"false");
        showVideoUrls();
        return;
    }
    else if (o.id == "idCheckAll")
    {
        var checked = o.checked;
        for ( var id in aCheck)
        {
            if ( id == "idCheckAll")
                continue;
            var o2 = document.getElementById(id)
            if ( o2 && o2.checked != checked)
            {
                o2.checked = checked;
                OnCheck(o2);
            }
        }
    }
    else
    {
        var i = aCheck[o.id];
        if ( !allUrls[i])
            return;
        allUrls[i].checked = o.checked;
        chrome.runtime.sendMessage({ msg: "msgCheckUrl", tabId: curTabId, "url": allUrls[i].url, "checked": allUrls[i].checked }, function (response)
        {
        });
    }
    refreshCounter();
}

function rtrim(s,c)
{
	var r=s.length -1;
	while(r > 0 && s[r] == c)
	{	r-=1;	}
	return s.substring(0, r+1);
}

function GetFilenameFromUrl(url, ext)
{
    var name1 = url.split('?')[0];
    name = name1.split('/').pop();
    if ( !name)
    {
        name1 = rtrim(name1,'/');
        name = name1.split('/').pop();
        if ( ext)
            name+="."+ext;
    }
    
    if ( name.indexOf('.')<0)
    {
        name+="."+ext;
    }
    return name;
}

function OnDownload(o)
{
    if ( curtab == "idLink" || curtab == "idAll")
    {
        var o = document.getElementById( "idCheckAll");         
        if ( o.checked)
        {
            myPrompt( t["q5"], function(ok)
            {
                if ( ok)
                    OnDownload2(false);
            }, true);
            return;
        }
    }
    OnDownload2(false);
}

function createFilenameFromTitle(title,ext)
{
    var s = "";
    for ( var j = 0; j<title.length;j++)
    {
        var c = title.charAt(j);
        if ( c>='A' && c<='Z')
            s+=c;
        else if ( c>='a' && c<='z')
            s+=c;
        else if ( c>='0' && c<='9')
            s+=c;
        else if ( "- _()".indexOf(c)>=0)
            s+=c;
    }   
    s+="." + ext;
    return s;
}
function OnDownload2(o)
{

    var aDownload=[];
    var aFName=[];
    for ( var id in aCheck)
    {
        if ( id == "idCheckAll")
            continue;
        var i = aCheck[id];
        if ( !allUrls[i] || !allUrls[i].checked)
            continue;
        aDownload.push(allUrls[i].url);
        
        var name;
        if ( curtab == "idImage" || curtab == "idVideo")
            name = createFilenameFromTitle(allUrls[i].desc, allUrls[i].ext);
        else
            name = GetFilenameFromUrl(allUrls[i].url, allUrls[i].ext);
        aFName.push(name);
    }
    
    if ( aDownload.length<=0)
    {
        alert( t["err0"]);
        return;    
    }
    if ( aDownload.length>0)
    {
        var s2="";
        var param= {msg: "msgDownload", tabId:curTabId, "urls":aDownload};
        var praefix="";
        if ( fnamemode == "idRadio4")
        {
            myPrompt( t["q2"], function(prefix){ // Folder
                if (!prefix)
                    return;
                for ( var i = 0; i < aFName.length; i++)
                {
                    aFName[i] = prefix+'\\'+aFName[i];
                }
                param.filenames = aFName;
                chrome.runtime.sendMessage(param, function (response) { });
                window.close();
            })
            return;
        }
        else if ( fnamemode == "idRadio3")
        {
            myPrompt( t["q3"], function(prefix){
                if (!prefix)
                    return;
                for ( var i = 0; i < aFName.length; i++)
                {
                    aFName[i] = prefix+aFName[i];
                }
                param.filenames = aFName;
                chrome.runtime.sendMessage(param, function (response) { });
                window.close();
            })
            return;
        }
        else if ( fnamemode == "idRadio2")
        {
            param.saveAs = true;
            if ( aDownload.length>3)
            {
                myPrompt( t["q1"].replace( "[count]", aDownload.length), function(ok)
                {
                    if (!ok)
                        return;
                    param.filenames = aFName;
                    param.saveAs = true;
                    chrome.runtime.sendMessage(param, function (response) { });
                    window.close();
                }, true)
                return;
           }
        }
        else if ( aDownload.length>3)
        {
            myPrompt( t["q4"].replace( "[count]", aDownload.length), function(ok)
            {
                if (!ok)
                    return;
                param.filenames = aFName;
                chrome.runtime.sendMessage(param, function (response) { });
                window.close();
            }, true)
            return;
        }
        
        for ( var i = 0; i < aFName.length; i++)
        {
            if ( praefix)
                aFName[i] = praefix+aFName[i];
            else
                aFName[i] = aFName[i];
        }
        param.filenames = aFName;
        chrome.runtime.sendMessage(param, function (response) { });
        window.close();
    }
}

var curCallback=false;
function onPrompt( id)
{
    var o = document.getElementById("idPrompt");
    o.style.display = "none";
    if ( !curCallback)
        return;
        
    if ( id == "idPromptOk")
    {
        var o = document.getElementById("idPromptEdit");
        if (o.style.display=="none") 
            curCallback(true);
        else
            curCallback(o.value);
    }
    else
        curCallback( false);
}

function myPrompt( text, callback, noText)
{
    var o = document.getElementById("idPromptText");
    o.textContent = text;
    curCallback = callback;

    o = document.getElementById("idPrompt");
    o.style.display = "block";
    o = document.getElementById("idPromptEdit");
    if ( noText)
        o.style.display="none";
    else
    {
        o.style.display="inline";
        o.focus();
    }
}

function OnTab(id)
{
    curtab=id;
    localStorage.setItem("curtab", curtab);
    
    var a = document.getElementsByClassName("clTab"); 
    for ( var i=0;i < a.length;i++)
    {
        if ( a[i].id == id)
            a[i].className = "clTab clTabActive";
        else
            a[i].className = "clTab";
    }
    
    if ( curtab == "idLink")
        filters=["html","js","css","json","swf","asp","aspx"];
    else if ( curtab == "idImage")
        filters=["bmp","gif","jpg","png","ico"];
    else if ( curtab == "idDoc")
        filters=["pdf","txt","doc","xls","rtf","ppc"];
    else if ( curtab == "idBinary")
        filters=["zip","7z","rar","jar","tar","bz2","exe","msi","rar"];
    else if ( curtab == "idVideo")
        filters=["mp4","flv","webm","m4v","wmv","avi","mov","divx","mp3","wma","wav","aac"];
    else if ( curtab == "idAll")
        filters=["html","js","css","json","asp","aspx","bmp","gif","jpg","png","ico","pdf","txt","doc","xls","rtf","ppc","zip","7z","rar","jar","tar","bz2","exe","msi","rar","mp4","flv","divx","swf","webm","m4v","wmv","avi","mov","mp3","wma","wav","aac"];
    else if ( curtab == "idExtern")
        filters=[];
    
    var a = [];
    var o = document.getElementById("idFilterBoxes");
    removeAllChilds(o);
    for ( i in filters)
    {
        ext = filters[i];
        var o2 = co("div", o, { style: "position:relative;width:70px;margin-right:0px;display:inline-block" });
        var o3 = co("label", o2, { "class": "clCheck", "for": "idFilter_" + ext });
        var o4 = co("input", o3, { "class": "clCheck clFilter", "id": "idFilter_" + ext, "type": "checkbox" });
        if (oFilters[ext])
            o4.checked = true;
        co("span", o3, false,ext);
        a.push( 'idFilter_'+ext);
    }
    setStyle("idSizeDiv","display", ( curtab == "idImage" || curtab == "idVideo")?"inline-block":"none");    
    setStyle("idEditDiv","display", ( curtab == "idAll" || curtab == "idExtern")?"inline-block":"none");    
    setStyle("idAllDiv","display", curtab != "idExtern"?"inline-block":"none");    

    var o = document.getElementById("idInputSize");
    if ( o)
        o.value=nFilterSize;
        
    var o = document.getElementById("idInputName");
    if ( o)
        o.value = sFilterName;

    for ( var i = 0; i < a.length; i++)
    {
        var o = document.getElementById(a[i]);
        if (o)
            o.addEventListener('click',  function (){OnFilter(this);});    
    }
    var o2 = document.getElementById( "idFilterAll");         
    o2.checked = !oFiltersAll[curtab];
    if ( curtab == "idImage")
        setStyle("idShowThumbsDiv","display","block");
    else
        setStyle("idShowThumbsDiv","display","none");
    showVideoUrls();
}

function OnSP24NavigateAddToplink()
{
    window.close();
    chrome.runtime.sendMessage({ msg: "OnSP24AddToplink", tabId: curTabId }, function (response)
    {
    });    
}

function myEncodeURI(q)
{
    var b="";
    var d=0;
    while(d < q.length)
    {
        var e1 = q.charCodeAt(d);
        d++;
        if ( e1 >=48 && e1 <= 57)
            b+=String.fromCharCode(e1);
        else if ( e1 >=97 && e1 <= 122)
            b+=String.fromCharCode(e1);
        else if ( e1 >=65 && e1 <= 90)
            b+=String.fromCharCode(e1);
        else
        {
            b+='('+e1+')';
        }
    }
    return b;
}

 function getTitleFromUrl( d)
 {
    var fname = d.url;
    var j = fname.indexOf( "?");
    if ( j>=0)
        fname = fname.substr(0,j);
    fname = fname.trim("/ ");
    j = fname.lastIndexOf( "/");
    if ( j>=0)
        fname = fname.substr(j+1);

    fname = fname.replace(/%20/g, " ");
    if ( fname == "videoplayback" || fname.length<4)
    {
        if ( !d.title)
            d.title = "video";
        fname = d.title;
    }   
    fname = fname.trim("\n \t\r<>");
    if ( fname.length > 30)      
        fname = fname.substr(0,27)+"...";
        
        
    //fname += " ("+d.mime+") ";
    
    /*if ( d.len<1024*1024)
    {
        var kb = Math.floor(parseInt(d.len)/1024*10);
        kb/=10;
        fname+= kb+"KB";
    }
    else 
    {
        var mb = Math.floor(parseInt(d.len)/1024/1024*10);
        mb/=10;
        fname+= mb+"MB";
    }*/
        
    return fname;
}
 
var curTabId=0;
var videoUrls=0;

function hideControl(id)
{
    var o = document.getElementById(id); 
    if ( o)
    o.style.display = "none";   
}

function formatSize( bytes)
{
    bytes=parseInt(bytes);
    if (!bytes)
        return "";
    if ( bytes<1024)
    {
        return bytes+" B";
    }
    else if ( bytes<1024*1024)
    {
        var kb = Math.floor(bytes/1024*10);
        return Math.floor(kb/10)+"."+(kb%10)+" KB";
    }
    else 
    {
        var mb = Math.floor(bytes/1024/1024*10);
        return Math.floor(mb / 10) + "." + (mb % 10) + " MB";
    }
    return "?";
}

function setClick( id, func)
{
    var o = document.getElementById(id);
    if (o)
        o.addEventListener('click',  func);    
}


function setAttr(id, name, value)
{
    var o = document.getElementById(id);
    if (o)
        o.setAttribute(name, value);
}
function setStyle(id, name, value)
{
    var o = document.getElementById(id);
    if (o)
        o.style[name] = value;
}

function OnSort( id)
{
    if ( id == 'idSortType')
    {
        if ( cursort == 'ta')
            cursort = 'td';
        else if ( cursort == 'td')
            cursort = false;
        else
            cursort = 'ta';
    }
    else  if ( id == 'idSortUrl')
    {
        if ( cursort == 'ua')
            cursort = 'ud';
        else if ( cursort == 'ud')
            cursort = false;
        else
            cursort = 'ua';
    }
    else if ( id == 'idSortDesc')
    {
        if ( cursort == 'da')
            cursort = 'dd';
        else if ( cursort == 'dd')
            cursort = false;
        else
            cursort = 'da';
    }
    else if ( id == 'idSortSize')
    {
        if ( cursort == 'sa')
            cursort = 'sd';
        else if ( cursort == 'sd')
            cursort = false;
        else
            cursort = 'sa';
    }
    else
        cursort = false;
    
    localStorage.setItem("cursort", cursort);
    showVideoUrls();
}

function stringCompare( s1,s2)
{
    s1=s1.toLowerCase();
    s2=s2.toLowerCase();
    if ( s1>s2)
        return 1;
    if ( s1<s2)
        return -1;
    return 0;
}

function showVideoUrls( )
{
    var aGetSize=[];
    if ( allUrls)
    {   
        nFilterSize = refreshSizeFilter();
        sFilterName = refreshNameFilter();
        
        var c1,c2,c3;    
        var fShowSize=false;
        if ( curtab == "idLink")
        {
            c1="RGB(230,230,142)";
            c2="RGB(255,255,182)";
            c3="RGB(255,255,202)";
        }
        else if ( curtab == "idImage")
        {
            c1="RGB(120,215,172)";
            c2="RGB(150,235,192)";
            c3="RGB(170,255,220)";
            fShowSize=true;
        }
        else if ( curtab == "idDoc")
        {
            c1="RGB(255,192,192)";
            c2="RGB(255,212,212)";
            c3="RGB(255,232,232)";
            fShowSize=true;
        }
        else if ( curtab == "idVideo")
        {
            c1="RGB(140,192,255)";
            c2="RGB(170,212,255)";
            c3="RGB(200,232,255)";
            fShowSize=true;
        }
        else if ( curtab == "idAll")
        {
            c1="RGB(192,192,192)";
            c2="RGB(220,220,220)";
            c3="RGB(230,230,230)";
            fShowSize=true;
        }
        else if ( curtab == "idBinary")
        {
            c1="RGB(192,160,255)";
            c2="RGB(222,180,255)";
            c3="RGB(242,200,255)";
            fShowSize=true;
        }
        else if ( curtab == "idExtern")
        {
            c1="RGB(204,204,204)";
            c2="RGB(220,220,220)";
            c3="RGB(230,230,230)";
            fShowSize=true;
        }
    
        var o = document.getElementById("idHeader");
        removeAllChilds(o);
        var o2 = co("div", o, { "class": "clItem", "style": "width:700px;overflow:hidden" });
        var o3 = co("table", o2, { "id": "idTable2"});

        var o4 = co("tr", o3, { "style": "background:" + c1});

        var o5 = co("th", o4, { "style": "width:20px" });
        co("input", o5, { "id": "idCheckAll","type":"checkbox" });

        o5 = co("th", o4, { "id": "idSortType", "title": t["tt2"].replace("[name]", t["type"]), "style": "cursor:pointer;width:45px;" });
        co("span", o5, false, t["type"]);
        co("a", o5, { "class": cursort == 'ta' ? "clArrowUp" : cursort == 'td' ? "clArrowDown" : "clArrowHidden" });

        aCheck["idCheckAll"] = -1;
        o5 = co("th", o4, { "id": "idSortUrl", "title": t["tt2"].replace("[name]", t["url"]), "style": "cursor:pointer;width:245px"});
        co("span", o5, false, t["url"]);
        co("a", o5, { "class": cursort == 'ua' ? "clArrowUp" : cursort == 'ud' ? "clArrowDown" : "clArrowHidden" });
        
        o5 = co("th", o4, { "id": "idSortDesc", "title": t["tt2"].replace("[name]", t["desc"]), "style": "cursor:pointer;" + (fShowSize ? "width:260px;" : "") });
        co("span", o5, false, t["desc"]);
        co("a", o5, { "class": cursort == 'da' ? "clArrowUp" : cursort == 'dd' ? "clArrowDown" : "clArrowHidden" });

        if (fShowSize) {
            o5 = co("th", o4, { "id": "idSortSize", "title": t["tt2"].replace("[name]", t["size"]), "style": "cursor:pointer;"});
            co("span", o5, false, t["size"]);
            co("a", o5, { "class": cursort == 'sa' ? "clArrowUp" : cursort == 'sd' ? "clArrowDown" : "clArrowHidden" });

        }
        
        var div = document.createElement("div");
        div.style.width="692px";
        div.style.overflow="hidden";
        div.className = "clItem";
        
        var line = 0;
        var filteredUrls=[];
        
        {
            for ( var i = 0; i < allUrls.length; i++)
            {
                var ob = allUrls[i];
                ob.id = i;

                if ( curtab == "idImage" && ob.type != "image")
                    continue;
                if ( curtab == "idLink" && ob.type != "link")
                    continue;
                if ( curtab == "idDoc" && ob.type != "doc")
                    continue;
                if ( curtab == "idVideo" && ob.type != "video")
                    continue;
                if ( curtab == "idBinary" && ob.type != "bindary")
                    continue;
                if ( curtab == "idExtern" && ob.type != "extern")
                    continue;
                if ( curtab != "idExtern" && ob.type == "extern")
                    continue;
                
                if ( !FilterMatch(ob))
                    continue;
                    
                if ( !ob.desc)
                    ob.desc = GetFilenameFromUrl(ob.url, ob.ext);
                    //ob.desc = ob.type;
                filteredUrls.push(ob)
            }            

            
            
            if ( cursort)
            filteredUrls.sort(function(a, b)
            {
                if ( cursort=='ta')
                    return stringCompare( a.ext,b.ext);
                else if ( cursort=='td')
                    return -stringCompare( a.ext,b.ext);
                else if ( cursort=='ua')
                    return stringCompare( a.url,b.url);
                else if ( cursort=='ud')
                    return -stringCompare( a.url,b.url);
                else if ( cursort=='da')
                    return stringCompare( a.desc,b.desc);
                else if ( cursort=='dd')
                    return -stringCompare( a.desc,b.desc);
                else if ( cursort=='sa')
                {
                    if ( !a.len)
                        a.len=0;
                     if ( !b.len)
                        b.len=0;
                    return a.len-b.len;
                }
                else if ( cursort=='sd')
                {
                    if ( !a.len)
                        a.len=0;
                     if ( !b.len)
                        b.len=0;
                    return b.len-a.len;
                }
            });


            if ( fShowThumbs && curtab == "idImage")
            {
                for ( var n = 0; n < filteredUrls.length; n++)
                {
                    var ob = filteredUrls[n];
                    var i = ob.id;
                
                    var url = ob.url;
                    var desc = ob.desc ? ob.desc : ob.type;
                    var d2 = document.createElement("div");
                    d2.className="clThumb";
                    d2.style.background = c2;
                                    
                                    
                    var a = document.createElement("a");
                    a.setAttribute("href",ob.url);
                    a.setAttribute("target","_blank");
                    a.setAttribute("src",ob.url);
                    a.style.position="absolute";
                    a.style.bottom="25px";
                    a.style.height="120px";
                    a.style.width="150px";
                    //a.style.background="#fff";
                    d2.appendChild(a);
                    
                    var center = document.createElement("center");
                    a.appendChild(center);
                    
                    var img = document.createElement("img");
                    img.setAttribute("height","120px");
                    img.setAttribute("width","150px");
                    img.setAttribute("title",desc);
                    img.setAttribute("src",ob.url);
                    
                    img.addEventListener("load", function()
                    {
                        var dx =this.naturalWidth; 
                        var dy =this.naturalHeight;
                        if ( dx > 150)
                        {
                            dx = 150;
                            dy = dx*this.naturalHeight/this.naturalWidth;
                        }
                        if ( dy > 120)
                        {
                            dy = 120;
                            dx = dy*this.naturalWidth/this.naturalHeight;
                        }
                        
                        this.setAttribute("width",dx+"px");
                        this.setAttribute("height",dy+"px");
                        this.style.paddingTop=(120-dy)/2+"px";
                    });
            
                    center.appendChild(img);
                    
                    var nobr = document.createElement("nobr");
                    nobr.style.position="absolute";
                    nobr.style.bottom="3px";
                    nobr.style.width="140px";
                    d2.appendChild(nobr);
                    
                    var inp = document.createElement("input");
                    inp.setAttribute("id","idCheck_"+i);
                    inp.setAttribute("type","checkbox");
                    if ( ob.checked)
                        inp.setAttribute("checked","checked");
                    nobr.appendChild(inp);
                    aCheck["idCheck_"+i] = i;
                    
                    var label = document.createElement("label");
                    label.setAttribute("for","idCheck_"+i);
                    label.setAttribute("title",desc);
                    label.textContent = desc;
                    nobr.appendChild(label);
                    div.appendChild(d2);
                }
            }
            else
            {
                var table = document.createElement("table");
                table.setAttribute("id","idTable");
                div.appendChild(table);
                var tbody = document.createElement("tbody");
                table.appendChild(tbody);
                for ( var n = 0; n < filteredUrls.length; n++)
                {
                    var ob = filteredUrls[n];
                    var i = ob.id;
                
                    var url = ob.url;
                    var desc = ob.desc ? ob.desc : ob.type;
                    
                    var tr = document.createElement("tr");
		            tbody.appendChild(tr);
            			
                    if ( line++&1)
                        tr.style.background = c2;
                    else
                        tr.style.background = c3;
                        
                    var td = document.createElement("td");
                    td.setAttribute("width","20px");
                    tr.appendChild(td);
                    
                    var inp = document.createElement("input");
                    inp.setAttribute("id","idCheck_"+i);
                    inp.setAttribute("type","checkbox");
                    if ( ob.checked)
                        inp.setAttribute("checked","checked");
                    td.appendChild(inp);
                    aCheck["idCheck_"+i] = i;
                    
                    var td = document.createElement("td");
                    td.setAttribute("width","45px");
                    td.style.fontWeight="bold";
                    td.textContent = ob.ext;
                    tr.appendChild(td);
                    
                    var td = document.createElement("td");
                    td.setAttribute("width","245px");
                    tr.appendChild(td);
                    var a = document.createElement("a");
                    a.setAttribute("title",url);
                    a.setAttribute("href",url);
                    a.setAttribute("target","_blank");
                    a.className="clColumnUrl";
                    a.textContent = url;
                    td.appendChild(a);
                                
                    var td = document.createElement("td");
                    if ( fShowSize)
                        td.setAttribute("width","260px");
                    tr.appendChild(td);
                    var a = document.createElement("a");
                    a.setAttribute("title",desc);
                    a.setAttribute("target","_blank");
                    a.className="clColumnDesc";
                    a.textContent = desc;
                    td.appendChild(a);
                    
                    ob.len = parseInt(ob.len);
                    if (!ob.len)
                        aGetSize.push(i);
                        
                    if ( fShowSize)
                    {
                        var td = document.createElement("td");
                        tr.appendChild(td);
                        var a = document.createElement("a");
                        a.setAttribute("id","idBytes_"+i);
                        a.textContent = formatSize(ob.len);
                        td.appendChild(a);
                    }
                }
            }
        }
    } 
    
    var o = document.getElementById("idList");
    if ( o)
    {
        removeAllChilds(o);
        o.style.background=c3;
        o.appendChild(div);

        if (curtab == "idVideo") {
            var i = parseInt(Math.random() * 5) + 1;
            if (i == 5)
                i = 6;
            var o2 = co("center", o);
            o2 = co("a", o2, { "style":"margin:5px","target":"_blank"});
            o2.href = "https://videodownloaderultimate.com?cid=" + i + "&v=ff_pro";
            var o3 = co("img", o2, { "width": "690", "style": "margin-top:5px;" });
            if (curlang == "de")
                o3.src = "https://videodownloaderultimate.com/ads/ad" + i + "big_de.png";
            else
                o3.src = "https://videodownloaderultimate.com/ads/ad" + i + "big_en.png";
        }
    }
    for ( i in aCheck)
    {
        setClick( i, function (){OnCheck(this);});    
    }
    
    setClick( 'idSortType', function (){OnSort(this.id);});    
    setClick( 'idSortUrl', function (){OnSort(this.id);});    
    setClick( 'idSortDesc', function (){OnSort(this.id);});    
    setClick( 'idSortSize', function (){OnSort(this.id);});    

    if ( fnamemode)
        setAttr(fnamemode, "checked","checked");
    setClick( 'idRadio1', function (){OnRadio(this.id);});    
    setClick( 'idRadio2', function (){OnRadio(this.id);});    
    setClick( 'idRadio3', function (){OnRadio(this.id);});    
    setClick( 'idRadio4', function (){OnRadio(this.id);});    


    setClick( 'idPromptOk', function () {onPrompt(this.id);});
    setClick( 'idPromptCancel', function () {onPrompt(this.id);});
   
    if ( filteredUrls.length<=0)
        setStyle("idCheckAll","visibility","hidden");
        
    setClick( 'idSettings', function (){
        window.open("./settings.html");
        window.close();
    });
    setClick( 'idRefresh', function (){doRefresh();});      
    refreshCounter();

    if (curtab == "idImage" || curtab == "idVideo" || curtab == "idBinary" || curtab == "idDoc" || curtab == "idAll")
    {
        for ( var i = 0; i <aGetSize.length; i++)
        {
            var ob = allUrls[aGetSize[i]];
            if ( !ob || ob.len)
                continue;
            var client = new XMLHttpRequest();
            client.idControl = "idBytes_"+aGetSize[i];
            client.ob = ob;
            client.onreadystatechange = function() 
            {
                if(this.readyState == 2) 
                {
                    var o = document.getElementById(this.idControl);
                    if ( o)
                    {
                        var bytes = this.getResponseHeader("Content-Length");
                        if ( bytes<=0)
                            bytes=1;
                        this.ob.len = bytes;
                        o.textContent = formatSize( bytes);
                    }
                }
            }
            client.open("HEAD", ob.url);
            client.send();
        }
    }
}

function refreshCounter()
{
    var l1=0,l2=0;
    var i1=0,i2=0;
    var v1=0,v2=0;
    var d1=0,d2=0;
    var b1=0,b2=0;
    var e1=0,e2=0;
    if ( allUrls)
    {
        for ( var i = 0; i < allUrls.length; i++)
        {
            var ob = allUrls[i];
            
            if ( ob.type == "image")
            {
                i1++;
                if ( ob.checked)
                    i2++;
            }
            else if ( ob.type == "link")
            {
                l1++;
                if ( ob.checked)
                    l2++;
            }
            else if ( ob.type == "video" || ob.type == "object")
            {
                v1++;
                if ( ob.checked)
                    v2++;
            }
            else if ( ob.type == "bin")
            {
                b1++;
                if ( ob.checked)
                    b2++;
            }
            else if ( ob.type == "doc")
            {
                d1++;
                if ( ob.checked)
                    d2++;
            }
            else if ( ob.type == "extern")
            {
                e1++;
                if ( ob.checked)
                    e2++;
            }
        }
    }
    
    //var o = document.getElementById( "idStatus");
    //o.textContent = (l2+i2+d2+v2)+" selected files";
    
    var o = document.getElementById( "idDownload");
    o.textContent = "Download "+(l2+i2+d2+v2+b2+e2)+" files";
    
    var a1 = l1+i1+d1+v1+b1;
    var a2 = l2+i2+d2+v2+b2;
    var o = document.getElementById( "idCheckAll");         
    if ( o)
    {
        if ( curtab == "idLink")
            o.checked=(l1 == l2);
        else if ( curtab == "idImage")
            o.checked=(i1 == i2);
        else if ( curtab == "idDoc")
            o.checked=(d1 == d2);
        else if ( curtab == "idVideo")
            o.checked=(v1 == v2);
        else if ( curtab == "idBinary")
            o.checked=(b1 == b2);
        else if ( curtab == "idExtern")
            o.checked=(e1 == e2);            
        else if ( curtab == "idAll")
            o.checked=(a1 == a2);
    }
    
    var o = document.getElementById( "idLinkCounter");         
    o.textContent=l2+"/"+l1;
    var o = document.getElementById( "idImageCounter");         
    o.textContent=i2+"/"+i1;
    var o = document.getElementById( "idDocCounter");         
    o.textContent=d2+"/"+d1;
    var o = document.getElementById( "idVideoCounter");
    o.textContent=v2+"/"+v1;
    var o = document.getElementById( "idBinaryCounter");
    o.textContent=b2+"/"+b1;
    var o = document.getElementById( "idExternCounter");
    o.textContent=e2+"/"+e1;
    
    var o = document.getElementById( "idAllCounter");         
    o.textContent=a2+"/"+a1;
    
    
    var o = document.getElementById( "idLink");         
    o.style.opacity = (l1>0)?"1.0":"0.3";
    var o = document.getElementById( "idImage");         
    o.style.opacity = (i1>0)?"1.0":"0.3";
    var o = document.getElementById( "idDoc");         
    o.style.opacity = (d1>0)?"1.0":"0.3";
    var o = document.getElementById( "idVideo");
    o.style.opacity = (v1>0)?"1.0":"0.3";
    var o = document.getElementById( "idBinary");
    o.style.opacity = (b1>0)?"1.0":"0.3";
    var o = document.getElementById( "idExtern");
    o.style.opacity = (e1>0)?"1.0":"0.3";
    var o = document.getElementById( "idAll");         
    o.style.opacity = (a1>0)?"1.0":"0.3";
}

function doRefresh()
{
    allUrls=[];
    OnTab(curtab);
    setTimeout( function ( ){
        chrome.runtime.sendMessage({ msg: "OnSP24GetVideoUrls", tabId: curTabId }, function (response)
	    {
            allUrls = response.allUrls;
            if (!allUrls)
                allUrls = [];
            AddVideosUrlsToAllUrls();
            OnTab(curtab);
        });
    },100);                            
}

document.addEventListener('DOMContentLoaded', function ()
{  		
	SetLanguage(curlang);
	
	var query = window.location.search.substring(1); 
    
    if (query.indexOf("version=video") != -1)
        fVideoVersion = true;

	var j = query.indexOf("&tabid=");
	if (  j>=0)
	    curTabId = parseInt(query.slice(j+7));
	        
	chrome.runtime.sendMessage({ msg: "OnSP24GetVideoUrls", tabId: curTabId }, function (response)
	{
//        console.log(response);
        //videoUrls = response.videoUrls;
        allUrls = response.allUrls;
        if (!allUrls)
            allUrls = [];
        AddVideosUrlsToAllUrls();
        OnTab(curtab);
    });
	
	if (curTabId) {
	    
	    chrome.tabs.sendMessage(curTabId, { id: "SP24ScanYoutube", tabId: curTabId }, function (response) {
	        if (typeof (response) == 'undefined' && chrome.runtime.lastError)
	            return;
	        
	    });
	}
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) 
    {
        if (divs[i].className == "clTab")
            divs[i].addEventListener('click', function(){OnTab(this.id)});  
        
        else if (divs[i].id == "idFilter")
        {
            divs[i].addEventListener('click', function(){ShowFilter(true)});              
            //divs[i].addEventListener('mouseleave', function(){ShowFilter(false)});              
        }
        else if (divs[i].id == "idFName")
        {
            divs[i].addEventListener('click', function(){ShowFNameOptions(true)});              
            //divs[i].addEventListener('mouseleave', function(){ShowFNameOptions(false)});              
        }
  }
  
  
  setAttr("idAll","title",t["tt5"]);
  setAttr("idExtern","title",t["tt6"]);
  setAttr("idSettings","title",t["tt4"]);
  setAttr("idRefresh","title",t["tt3"]);
  setAttr("idFolder","title",t["tt1"]);
  setAttr("idDownload","title",t["tt0"]);
  
  setClick( "idFolder", function (){OnShowDownloadfolder();});    
  setClick( "idDownload", function (){OnDownload(this);});    
  setClick( "idFilterAll", function (){OnFilter(this);});    
  setClick( "idFilterSize", function (){OnFilter(this);});    
  setClick( "idFilterName", function (){OnFilter(this);});    
  setClick( "idShowThumbs", function (){OnCheck(this);});    
  
  
    if ( OSDetect.getOSName() != "Windows")
    {
        var o = document.getElementById("idFName");
        o.style.display="none";
        fnamemode = "idRadio1";
    }
    
  var o = document.getElementById( "idInputSize");         
  if ( o)
    o.addEventListener('keyup', function ()
    {
        if ( nFilterSize != refreshSizeFilter()) 
            showVideoUrls();
    });    
    
  var o = document.getElementById( "idInputName");
  if ( o)
    o.addEventListener('keyup', function ()
    {
        if ( sFilterName!= refreshNameFilter()) 
            showVideoUrls();
    });    
    
  if ( fShowThumbs)
    setAttr("idShowThumbs","checked","checked");
  
  
});
 
function SetLanguage(lang )
{
    if ( lang == "de")
        t = textDE;

    //chrome.runtime.sendMessage({msg: "GetCurrentSPLanguage"}, function(response) 
    //{
		//alert (response)
		for (var s in t) 
    	{
       		var ob = document.getElementById( s); 
        	if ( ob) 
           	    ob.textContent = t[s];
    	}
   // });
}

var timeouts = {};

function FilterMatch(ob)
{
    var o = document.getElementById("idFilterSize");
    if ( o && o.checked && ( curtab == "idImage" || curtab == "idVideo"))
    {            
        if ( ob.len < nFilterSize*1024) 
            return false;
    }    
    
    if ( sFilterName)
    {
        var o = document.getElementById("idFilterName");
        if ( o && o.checked && (curtab == "idAll" || curtab == "idExtern"))
        {            
            if ( ob.url.indexOf(sFilterName) < 0)
                return false;
        }    
    }

    if ( !oFiltersAll[curtab]) // All-Checkbox
        return true;
    if ( oFilters[ob.ext])
        return true;
    return false;
}

function refreshSizeFilter()
{
    var o = document.getElementById("idInputSize");
    var kb = o?parseInt(o.value):0;
    if ( kb != nFilterSize)
    {
        localStorage.setItem("nFilterSize",kb);
    }
    var o = document.getElementById("idFilterSize");
    if ( o.checked)
        return kb;
    return 0;
}

function refreshNameFilter()
{
    var o = document.getElementById("idInputName");
    var s = o.value.toLowerCase();
    if ( s != sFilterName)
    {
        localStorage.setItem("sFilterName",s);
    }
    var o = document.getElementById("idFilterName");
    if ( o.checked)
        return s;
    return "";
}

function OnFilter(o)
{
    if ( o.id == "idFilterSize")
    {
        showVideoUrls();
        return;
    }
    
    if ( o.id == "idFilterName")
    {
        showVideoUrls();
        return;
    }

    if ( o.id == "idFilterAll")
    {
        if ( o.checked)
        {
            var a = document.getElementsByClassName("clFilter"); 
            for ( var i=0;i < a.length;i++)
            {
                a[i].checked=false;                
            }
        }
        else
        {
            var a = document.getElementsByClassName("clFilter"); 
            if ( a.length>0)
                a[0].checked=true;
        }
    }
    
    all=true;
    var a = document.getElementsByClassName("clFilter"); 
    for ( var i=0;i < a.length;i++)
    {
        var s = a[i].id.substr("idFilter_".length);
        if ( a[i].checked)
        {
            all=false;
            oFilters[s] = true;
        }
        else
            oFilters[s] = false;
    }
    var o2 = document.getElementById( "idFilterAll");         
    o2.checked=all;
    oFiltersAll[curtab] = !all;
    localStorage.setItem("oFilters", JSON.stringify(oFilters));
    localStorage.setItem("oFiltersAll", JSON.stringify(oFiltersAll));
    showVideoUrls();
}
 
function ShowFilter(show)
{
    var o = document.getElementById("idAllInner");
    if (!o)
        return;
    show = (o.style.display != "block");
    if ( show)
    {
        o.style.display = "block";
        document.getElementById("idFNameInner").style.display = "none";
        document.getElementById("idFilterDropDown").className = "clDropdown"
        document.getElementById("idFNameDropDown").className = "clDropdown clRotated"
    }
    else
    {
        o.style.display = "none";
        document.getElementById("idFilterDropDown").className = "clDropdown clRotated"
    }
    //resizeBody();
}

function ShowFNameOptions(show)
{
    var o = document.getElementById("idFNameInner");
    if ( !o)
        return;

    show = (o.style.display != "block");
    
    if ( show)
    {
        o.style.display = "block";
        document.getElementById("idAllInner").style.display = "none";
        document.getElementById("idFilterDropDown").className = "clDropdown clRotated"
        document.getElementById("idFNameDropDown").className = "clDropdown"
    }
    else
    {
        o.style.display = "none";
        document.getElementById("idFNameDropDown").className = "clDropdown clRotated"
    }
    //resizeBody();
}

chrome.runtime.onMessage.addListener(function (details, sender)
{
    if (details.msg == "YTData") {
         var yt = new YTScan();
        yt.GetVideos(details.data, function (ret) {
            if (ret == false) {
                return;
            }

            if (!videoUrls) {
                videoUrls = [];
            }
            ret.streams.forEach(function (element, index, array) {
                // console.log(element);
                var video = {
                    title: ret.title,
                    origin: ret.url,
                    bytes: false,
                    mime: element.format.mime,
                    url: element.url,
                    res: element.format.resolution,
                    noDL: !element.playable
                };
                if (element.format.dash) {
                    video.noDL = true;
                    video.dash = true;
                }
                if (element.format.audio) {
                    video.noDL = true;
                    video.audio = true;
                }
                //console.log("video " + JSON.stringify(video)    );
                videoUrls.push(video);
                
            });
            AddVideosUrlsToAllUrls();
            OnTab(curtab);
        })

    }
}); 	

function AddVideosUrlsToAllUrls()
{
    for ( var i = 0; i < allUrls.length; i++)
    {
        var ob = allUrls[i];
        if ( ob.class == "yt")
        {
            allUrls.splice(i,1);
            i--;
        }
    }
            
    if (!videoUrls)
        return;

    for (var j = 0; j < videoUrls.length; j++) {
        var v = videoUrls[j];
        var ob = { 'url': v.url, 'class': 'yt', 'id': "", 'value': '', 'type': 'video' }
        if (v.dash)
            ob.desc = v.res + " (" + t["noaudio"] + ") - " + v.title;
        else if ( v.audio)
            ob.desc = v.res + " ("+t["onlyaudio"]+") - "+ v.title;
        else
            ob.desc = v.res + " - " + v.title;
        ob.ext = v.mime.replace("video/", "").replace("audio/", "");
        allUrls.push(ob);
    }
}


