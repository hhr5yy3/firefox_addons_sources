function TSWMYahooShowRatingResultUI()
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

function TSWMYahooFetchTargetURL(strHost, strURL)
{
    var strRet = '';
    var oHttpRegExp = new RegExp('^(http|https|ftp|ftps)://', 'i');
    if (oHttpRegExp.test(strURL))
    {
        var oCheckhostRegExp = new RegExp('^(http|https)://' + strHost, 'i');
        if (oCheckhostRegExp.test(strURL))
        {
            var oRedirectRegExp = /\/bouncer\?url=(.+)$/;
            var oRedirectRegMatch = strURL.match(oRedirectRegExp);
            if (oRedirectRegMatch && oRedirectRegMatch.length == 2)
            {
                // some links may somehow be redirected by webmail
                strRet = oRedirectRegMatch[1];
            }
            // escape those links refer to operations of webmail
        }
        else
        {
            strRet = strURL;
        }
    }
    return strRet;
}

/*
 * Parse search result
 */
function TSWMYahooParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           '^message[0-9]*$');

    objSR.tagIDregexFirst = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {

     var href = '';
     try {
  href = rgNodes[iCount].href;
     }catch (e) {
  // the invalid href will cause exception.
     }
            var strURL = TSWMYahooFetchTargetURL(strHost, href);
            if (strURL.length == 0)
            {
                continue;
            }
            var objResult = CreateTSRResultObject(rgNodes[iCount],
                                                  strURL,
                                                  null,
                                                  TSWMYahooShowRatingResultUI);
        }
    }
}
g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSWMYahooParseResult(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
