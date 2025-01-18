var SS_Util = TrendMicro.TB.SAFESEARCHING;

function getRealUrl(sourceURL) {
    try {
        return decodeURIComponent(SS_Util.getParamFromURL(sourceURL, "imgrefurl"));
    } catch(e) {
        return sourceURL;
    }
}

function getRealUrlBasic(sourceURL) {
    try {
        var url = SS_Util.getParamFromURL(sourceURL, "url") || SS_Util.getParamFromURL(sourceURL, "q");
        return decodeURIComponent(url);
    } catch(e) {
        return sourceURL;
    }
}

var isResizeCallbackReged = false;

function foundImageCallback(obj){	
    //print the image filter result in console
	//console.log("foundImageCallback " + obj.level);
    // if(obj.level === 7 || obj.level === 8){
    //     console.warn("blocked" + " : " + obj.link);
    // }
    // else{
    //     console.log("not blocked" + " : " + obj.link);
    // }

    if(!isResizeCallbackReged){
        TMExt_$(window).resize(function(){
            // refresh block UI when window resize
            var callback_first = function(item){
                var a = item;
                var img = item.find('img').eq(0);
                /*
                    disable click handler
                */
                a.removeAttr('class');
                
                // as we have removed class attr in above step. We need to manaually set its css property as below. 
                a.css("display", "inline-block");
                a.css("height", "100%");
                a.css("text-decoration", "none");
                a.css("width", "100%");        
            
                /*
                    replace img as ours
                */
                img.css("visibility", "hidden");
            
            }
            SS_Util.refreshBlockImages(callback_first);
        });
        isResizeCallbackReged = true;
    }
    
    TMExt_debug(obj)
    
    var div = TMExt_$(obj.FindInsertNode()).parent();
    var a = div.find('a').eq(0);
    var img = a.find('img').eq(0);
    var divC = a.find('div').eq(0);
    
    a.attr("link_level", obj.level);
    
    if(!SS_Util.isNeedToBlock(obj.level)){
        // is not parent control blocked category, return directly
        TMExt_debug("the image level is " + obj.level + ", no need to block (level 8 is parent control category)")
        return;
    }    
    
    TMExt_debug("==========================BLOCK THE ABOVE ONE===================================")
    div.addClass("imgBlock");
    /*
        Check if already have the overlay    
    */
    SS_Util.checkImageBlockPopupExist();
    
    /*
        disable click handler
    */
    a.removeAttr('class');
    
    // as we have removed class attr in above step. We need to manaually set its css property as below. 
    a.css("display", "inline-block");
    a.css("height", "100%");
    a.css("text-decoration", "none");
    a.css("width", "100%");        

    /*
        replace img as ours
    */
    img.css("visibility", "hidden");
    
    // set our img as div's background
    SS_Util.setBlockImage(a);
    divC.removeAttr('style');    
    /*
        bind events
    */
    SS_Util.bindMouseEnterEvent(a);
}

function TSSRParseResult_Image(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'div', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'div', 'islmp');

    objSRl2.multiMatches = true;
    objSRl2.appendAttribute('class', 'VFACy kGQAp');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            
            if(strURL) {
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, null, null, foundImageCallback, isImageNeedReRating);    
            }
        }
    }
}

function isImageNeedReRating(obj) {

    TMExt_debug("isImageNeedReRating");
    TMExt_debug(obj);
    var node = TMExt_$(obj.FindInsertNode());

    if (!SS_Util.isNeedToBlock(obj.level)) {
        // is not parent control blocked category, no need to re-evalute.
        TMExt_debug("the image level is " + obj.level + ", no need to re-evalute (level 8 is parent control category)")
        return false;
    }

    var bgimg = node.css("background-image");
    if (typeof bgimg == "undefined") {
        TMExt_debug("No css background-image");
        return true;
    }
    else {
        TMExt_debug('bgimg=' + bgimg);
        if (bgimg.indexOf("img_image_block") >= 0)
            return false;
        else {
            TMExt_debug("No img_image_block");
            return true;
        }
    }
}

function isImageNeedReRatingBasic(obj) {

    TMExt_debug("isImageNeedReRating");
    TMExt_debug(obj);
    var node = TMExt_$(obj.FindInsertNode()).parent();

    if (!SS_Util.isNeedToBlock(obj.level)) {
        // is not parent control blocked category, no need to re-evalute.
        TMExt_debug("the image level is " + obj.level + ", no need to re-evalute (level 8 is parent control category)")
        return false;
    }

    var bgimg = node.css("background-image");
    if (typeof bgimg == "undefined") {
        TMExt_debug("No css background-image");
        return true;
    }
    else {
        TMExt_debug('bgimg=' + bgimg);
        if (bgimg.indexOf("img_image_block") >= 0)
            return false;
        else {
            TMExt_debug("No img_image_block");
            return true;
        }
    }
}

var TIMEOUT_WAITING_GET_WIDTH_HEIGHT = 500;
function foundImageCallbackBasic(obj){
    TMExt_debug(obj)
    
    var div = TMExt_$(obj.FindInsertNode()).parent();
    var a = div.find('a').eq(0);
    var img = a.find('img').eq(0);
    
    function do_block(){
        div.attr("link_level", obj.level);
    
        if(!SS_Util.isNeedToBlock(obj.level)){
            // is not parent control blocked category, return directly
            TMExt_debug("the image level is " + obj.level + ", no need to block (level 8 is parent control category)")
            return;
        }    
        
        TMExt_debug("==========================BLOCK THE ABOVE ONE===================================")
        div.addClass("imgBlock");
        /*
            Check if already have the overlay    
        */
        SS_Util.checkImageBlockPopupExist();
    
        /*
            replace img as ours
        */
        img.css("visibility", "hidden");
        
        // set our img as div's background
        SS_Util.setBlockImage(div);
        div.css("border", "0px");
        
        div.empty();
        div.append(a);
        
        /*
            bind events
        */
        SS_Util.bindMouseEnterEvent(div);
    }
    
    if(div.width() === 0 || div.height() === 0){
        // on IE 8, sometimes width or height will return 0 when this callback function works.
        // In this case, we need to wait for a while so that we can get its actual width or height.
        setTimeout(do_block, TIMEOUT_WAITING_GET_WIDTH_HEIGHT);
    }else{
        do_block();
    }
}


function TSSRParseResult_Image_Basic(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'TABLE', null);

    objSR.appendAttribute('class', 'images_table');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = getRealUrlBasic(rgNodes[iCount].href);
            
            if(strURL)
            {
                CreateTSRResultObject(rgNodes[iCount],
                                          strURL,
                                          null, null, null, null, foundImageCallbackBasic, isImageNeedReRatingBasic);    
            }
        }
    }
}

function getDefaultPreviewImg(){
    var focusImage = new URL(window.location.href).hash.replace("#imgrc=",'');
    if ( focusImage === ''){
        return false;
    }else{
        return TMExt_$(`[data-id=${focusImage}]`).hasClass("imgBlock");
    }
}

function previewImageBlock(){
    var preveiwImg = TMExt_$("#islsp");
    var curImageIsBlock = getDefaultPreviewImg();
    if (curImageIsBlock){
        TMExt_$("#Sva75c").css('visibility', 'hidden');
        preveiwImg.css("background-color", "rgba(0,0,0,0.03)");
        SS_Util.setBlockImage(preveiwImg);
        SS_Util.bindMouseEnterEvent(preveiwImg);
    }else{
        TMExt_$("#Sva75c").css('visibility', "initial");
        preveiwImg.css("background-color", "none");
        preveiwImg.unbind('mouseenter');
    }
}

TSRTagFlowID();
TMExt_debug("URL matched, start safe searching function")

function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;

    TSSRParseResult_Image(document);
    TSSRParseResult_Image_Basic(document);

    // preview image block
    previewImageBlock(document);
    document.addEventListener('click', function(){
        var isBlock = getDefaultPreviewImg();
        previewImageBlock(document, isBlock);
    });
    document.addEventListener('keydown', (event) => {
        var name = event.key;
        if(name === "ArrowRight" || name === "ArrowLeft"){
            previewImageBlock(document);
        }
     }, false);

    TrendMicro.TB.ReduceImageNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}