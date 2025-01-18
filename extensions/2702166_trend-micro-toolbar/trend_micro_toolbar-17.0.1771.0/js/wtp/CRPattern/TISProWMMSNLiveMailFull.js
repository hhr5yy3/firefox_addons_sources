function filterbyHref(url)
{
    var ptnMSNLiveMail = [
                'http://mail.live.com/',
                'https://mail.live.com/',
                'http://profile.live.com/',
                'https://profile.live.com/'
              ];
    for (var j = 0; j < ptnMSNLiveMail.length; j++)
    {
        ptn = new RegExp(ptnMSNLiveMail[j], 'i');
        if (ptn.test(url))
        {
            return true;
        }
    }
    return false;
}

function TSWMMSNLiveSimpleShowRatingResultUI()
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

function TSWMMSNLiveSimpleFetchTargetURL(strHost, strURL)
{
    var oHttpRegExp = new RegExp('^(http|https|ftp|ftps)://', 'i');
    // escape those links refer to operation on the host
    var oRegExp = new RegExp('^(http|https|ftp|ftps)://' + strHost, 'i');
    var rgstrMatch = oHttpRegExp.test(strURL) && !oRegExp.test(strURL);
    return rgstrMatch ? strURL : '';
}

/*
 * Parse search result
 */

function TSWMMSNLiveSimpleParseResult1(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR =
        new CreateTSRLocatedObject(rootElement,
                                   objSRl1,
                                   'DIV',
                                   'mainContentContainer');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL =
                TSWMMSNLiveSimpleFetchTargetURL(strHost,
                                                rgNodes[iCount].href);
            if (strURL.length == 0)
            {
                continue;
            }

            if (!filterbyHref(strURL))
            {
                var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null,
                                      TSWMMSNLiveSimpleShowRatingResultUI);
            }
        }
    }
}
 
function TSWMMSNLiveSimpleParseResult2(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR =
        new CreateTSRLocatedObject(rootElement,
                                   objSRl1,
                                   'DIV',
                                   null);
                                   
    objSR.appendAttribute('class', 'ContentRightInner');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL =
                TSWMMSNLiveSimpleFetchTargetURL(strHost,
                                                rgNodes[iCount].href);
            if (strURL.length == 0)
            {
                continue;
            }

            if (!filterbyHref(strURL))
            {
                var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null,
                                      TSWMMSNLiveSimpleShowRatingResultUI);
            }
        }
    }
}
g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRPrintRatingQueue(queue) {
 for (var i = 0; i < queue.length; ++i) {
  var n = queue[i];
  if (n)
   TrendMicro.TB.console.info('queue[' + i + ']=' + (n.link));
 }
}
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSWMMSNLiveSimpleParseResult1(document);
    TSWMMSNLiveSimpleParseResult2(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
