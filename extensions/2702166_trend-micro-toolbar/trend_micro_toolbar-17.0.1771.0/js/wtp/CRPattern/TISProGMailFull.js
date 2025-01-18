function TSWMMGmailShowRatingResultUI()
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

function TSWMGmailFetchTargetURL(strHost, strURL)
{
    if (strURL && (strURL.indexOf('.google') > 0 ||
                   strURL.indexOf('.googlesyndication.') > 0))
        return '';

    var oHttpRegExp = new RegExp('^(http|https)://', 'i');
    // escape those links refer to operation on the host
    var oRegExp = new RegExp('^(http|https)://' + strHost, 'i');
    var rgstrMatch = oHttpRegExp.test(strURL) && !oRegExp.test(strURL);

    return rgstrMatch ? strURL : '';
}

/*
 * Parse search result
 */
function TSWMGmailParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'fic');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMGmailFetchTargetURL(strHost, rgNodes[iCount].href);
            if (strURL.length == 0)
            {
                continue;
            }

            //If rate tag = 1 skip the node;
            var rateAttr = rgNodes[iCount].getAttribute('Rate');
            if (rateAttr && rateAttr == '1')
             continue;

            //To tell others this nodes has been rated;
            rgNodes[iCount].setAttribute('Rate', '1');
            var objResult = CreateTSRResultObject(rgNodes[iCount],
                                                  strURL,
                                                  null,
                                                  TSWMMGmailShowRatingResultUI);
        }
    }
}
g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSWMGmailParseResult(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
