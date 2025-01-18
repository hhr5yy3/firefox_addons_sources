var SS_Util = TrendMicro.TB.SAFESEARCHING;

function foundImageCallback(obj){
    //print the image filter result in console
    // if(obj.level === 7 || obj.level === 8){
    //     console.warn("blocked" + " : " + obj.link);
    // }
    // else{
    //     console.log("not blocked" + " : " + obj.link);
    // }

    TMExt_debug(obj)
    
    var li = TMExt_$(obj.FindInsertNode()).parent();
    var a = li.find('a').eq(0);
    var img = a.find('img').eq(0);
    
    li.attr("link_level", obj.level);
    
    if(!SS_Util.isNeedToBlock(obj.level)){
        // is not parent control blocked category, return directly
        TMExt_debug("the image level is " + obj.level + ", no need to block (level 8 is parent control category)")
        return;
    }    
    
    TMExt_debug("==========================BLOCK THE ABOVE ONE===================================")
    /*
        Check if already have the overlay    
    */
    SS_Util.checkImageBlockPopupExist();
    a.css("display", "inline");
    // img.remove();
    img.hide();
    
    SS_Util.setBlockImage(li);
    
    /*
        bind events
    */
    SS_Util.bindMouseEnterEvent(li);
}

var getParamFromURL_yahoo_fr = function(sourceURL, key){
    var seperator = '/';
    try{
        var paramsString = sourceURL;
        if ( typeof (paramsString) == "string" && paramsString.length > 0) {
            var paramsList = paramsString.split(seperator)
            for (var i = 0; i < paramsList.length; i++) {
                var keyAndValue = paramsList[i].split('=')
                if (keyAndValue[0] == key) {
                    return keyAndValue[1]
                }
            };
        }
        return null;    
    }catch(e){
        return null;
    }
}

function getRealUrl(sourceURL) {
    try {
        var url = SS_Util.getParamFromURL(sourceURL, "rurl") || getParamFromURL_yahoo_fr(sourceURL, "RU");
        return decodeURIComponent(url);  
    } catch(e) {
        return sourceURL;
    }
}

function TSSRParseResult_Image(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'UL', 'sres');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'ld');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = getRealUrl(rgNodes[iCount].href);
            if(strURL){
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, null, null, foundImageCallback);    
            }
        }
    }
}

function foundImageCallbackBasic(obj){
    TMExt_debug(obj)
    
    var li = TMExt_$(obj.FindInsertNode()).parent();
    var a = li.find('a').eq(0);
    var img = a.find('img').eq(0);
    
    li.attr("link_level", obj.level);
    
    if(!SS_Util.isNeedToBlock(obj.level)){
        // is not parent control blocked category, return directly
        TMExt_debug("the image level is " + obj.level + ", no need to block (level 8 is parent control category)")
        return;
    }    
    
    TMExt_debug("==========================BLOCK THE ABOVE ONE===================================")
    /*
        Check if already have the overlay    
    */
    SS_Util.checkImageBlockPopupExist();
    a.css("display", "inline");
    // img.remove();
    img.hide();
    
    SS_Util.setBlockImage(li);
    
    /*
        bind events
    */
    SS_Util.bindMouseEnterEvent(li);
}

function getRealUrlBaic(node){
    try{
        var parent = TMExt_$(node).parent(),
            a = parent.find('a').eq(0),
            img = a.find('img').eq(0),
            rel = img.attr("rel"),
            s1 = rel.substr(rel.indexOf("**") + 2),
            s2 = s1.substr(s1.indexOf("**") + 2),
            s3 = s2.substr(0, s2.indexOf('?'));
        return s3;    
    }catch(e){
        return null;
    }
}

function TSSRParseResult_ImageBasic(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'gridlist');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'gridmodule');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = getRealUrlBaic(rgNodes[iCount]);
            if(strURL){
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, null, null, foundImageCallbackBasic);    
            }
        }
    }
}

TSRTagFlowID();
TMExt_debug("URL matched, start safe searching function")

TMExt_$(window).resize(function(){
    // refresh block UI when window resize
    SS_Util.refreshBlockImages();
});

function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;

    TSSRParseResult_Image(document);
    TSSRParseResult_ImageBasic(document);

    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}