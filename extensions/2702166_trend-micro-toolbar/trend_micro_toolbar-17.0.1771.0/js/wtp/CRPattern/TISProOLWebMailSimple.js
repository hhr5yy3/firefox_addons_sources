
function TSWMOLSimpleShowRatingResultUI()
{
    var dLevel = this.level;
    if (g_oRatingLevel[dLevel] == g_oImgDefine.Safe ||
        g_oRatingLevel[dLevel] == g_oImgDefine.Neutral ||
        g_oRatingLevel[dLevel] == g_oImgDefine.Trusted)
    {
        // don't show green icons which represent Safe or Neutral
        return false;
    }
    return true;
}

function TSWMOLSimpleFetchTargetURL(strHost, strURL)
{
    var oHttpRegExp = new RegExp('^(http|https)://', 'i');
    // escape those links refer to operation on the host
    var oRegExp = new RegExp('^(http|https)://' + strHost, 'i');
    var rgstrMatch = oHttpRegExp.test(strURL) && !oRegExp.test(strURL);
    return rgstrMatch ? strURL : '';
}

/*
 * Parse search result
 */
function TSWMOLSimpleParseResultBeta(rootElement)
{
   var customScrollbar = document.getElementsByClassName('customScrollBar');
    if(customScrollbar.length != 3){
        var allowTextSelection = document.getElementsByClassName('wide-content-host');
        var rgNodes = allowTextSelection[0].querySelectorAll('a');   
        var strHost = rootElement.location.host;
    
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMOLSimpleFetchTargetURL(strHost, rgNodes[iCount].href);
            if (strURL.length == 0)
            {
                continue;
            }
            var objResult = CreateTSRResultObject( rgNodes[iCount],
                                                   strURL,
                                                   null,
                                                   TSWMOLSimpleShowRatingResultUI);
        }
    }
    else {
        var rgNodes = customScrollbar[2].querySelectorAll('a');   
        var strHost = rootElement.location.host;
    
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMOLSimpleFetchTargetURL(strHost, rgNodes[iCount].href);
            if (strURL.length == 0)
            {
                continue;
            }
            var objResult = CreateTSRResultObject( rgNodes[iCount],
                                                   strURL,
                                                   null,
                                                   TSWMOLSimpleShowRatingResultUI);
        }
    }
}

function TSWMOLSimpleParseResultRel(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject( rootElement,
                                            objSRl1,
                                            'DIV',
                                            'divtagdefaultwrapper');
    objSR.tagIDregexFirst = true;
    var rgobjPath = document.getElementsByClassName('conductorContent');
    var rgNodes = rgobjPath[3].querySelectorAll('a');
    var strHost = rootElement.location.host;
    for (var iCount = 0; iCount < rgNodes.length; iCount++)
    {
        var strURL = TSWMOLSimpleFetchTargetURL(strHost, rgNodes[iCount].href);
        if (strURL.length > 0)
        {
            var objResult = CreateTSRResultObject( rgNodes[iCount],
                                                    strURL,
                                                    null,
                                                    TSWMOLSimpleShowRatingResultUI);
        }
    }
}


g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    if(TrendMicro.TB.DOMIdExist('app')){
        TSWMOLSimpleParseResultBeta(document);
    }
    if(TrendMicro.TB.DOMIdExist('primaryContainer')){
        TSWMOLSimpleParseResultRel(document);
    }   
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
