function TSWMGmailHTMLShowRatingResultUI()
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

function TSWMGmailHTMLFetchTargetURL(strHost, strURL)
{

    var startOfGoogleRedirectURL = 'http://www.google.com/url?q=';
    var l = startOfGoogleRedirectURL.length;
    if (strURL.substr(0, l) == startOfGoogleRedirectURL)
        return decodeURIComponent(strURL.substr(l,strURL.indexOf('&',l) - l));
        
    var startOfGoogleRedirectURLs = 'https://www.google.com/url?q=';
    var ls = startOfGoogleRedirectURLs.length;
    if (strURL.substr(0, ls) == startOfGoogleRedirectURLs)
        return decodeURIComponent(strURL.substr(ls,strURL.indexOf('&',ls) - ls));
        
    if (strURL && (strURL.indexOf('.google.') > 0))
        return '';

    var strRet = '';
    var oHttpRegExp = new RegExp('^(http|https)://', 'i');
    if (oHttpRegExp.test(strURL))
        {
            var oCheckhostRegExp =
                new RegExp('^(http|https)://' + strHost, 'i');
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
function TSWMGmailHTMLParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'BODY', null);

    objSR.tagIDregexFirst = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMGmailHTMLFetchTargetURL(strHost,
                                                     rgNodes[iCount].href);
            if (strURL.length == 0)
            {
                continue;
            }

            var match = false;
            for (var j = 0; j < GmailBasicHtmlPtn.length; j++)
            {
                var ptn = new RegExp(GmailBasicHtmlPtn[j], 'i');
                if (ptn.test(strURL))
                {
                    match = true;
                    break;
                }
            }

            if (match)
            {
                continue;
            }
            var objResult = CreateTSRResultObject(rgNodes[iCount],
                                                  strURL,
                                                  null,
                                                  TSWMGmailHTMLShowRatingResultUI);
        }
    }
}

var GmailBasicHtmlPtn = [
    'http://gmailblog.blogspot.com/\\?utm_source=uifooter&utm_medium=et&utm_campaign=en',
    'http(s)?://www.youtube.com/'
   ];

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSWMGmailHTMLParseResult(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
