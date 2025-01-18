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
    
    var div = TMExt_$(obj.FindInsertNode()).parent();
    var a = div.find('a').eq(0);
    var img = a.find('img').eq(0);
    
    div.attr("link_level", obj.level);
    
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
    div.css("display", "inline-block");
    div.css("height", "100%");
    div.css("text-decoration", "none");
    div.css("width", "100%");
    img.remove();
    /*
        remove some wordings on image.
    */
    var span = a.find('span');
    span.remove();

    SS_Util.setBlockImage(div);

    /*
        bind events
    */
    SS_Util.bindMouseEnterEvent(div);
}

function getRealUrl(obj){
    try {
        var $obj = TMExt_$(obj);
        var str_m = $obj.attr("m");
        // the str is not JSON(there are no quotes on the key), so we could only get source URL from string operation instead of JSON operation
        var key = 'purl":"';
        var start_index = str_m.indexOf(key) + key.length;
        var end_index = str_m.indexOf('"', start_index);
        var result = str_m.substring(start_index, end_index);
        return result;
    } catch(e) {
        return obj.href;
    }
}

function TSSRParseResult_Image(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'ul', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'div', 'vm_c');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'dgControl_list ');

    objSRl2.multiMatches = true;
    objSRl2.appendAttribute('class', 'iusc');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = getRealUrl(rgNodes[iCount]);
            if(strURL){
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, null, null, foundImageCallback);    
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

    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}