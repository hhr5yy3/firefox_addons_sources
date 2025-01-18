function TSWMGmailFull2FilterContentEditable(element)
{
    var parent = element.parentNode;
    var count = 0;
    while (parent && count++ < 10) {
        if (parent.tagName &&
            parent.tagName.toUpperCase() == 'DIV' &&
            parent.attributes['contenteditable'] &&
            parent.attributes['contenteditable'].value == 'true'){
            return true;
        }
        parent = parent.parentNode;
    }
    return false;
}

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
    var startOfGoogleRedirectURL = 'http://www.google.com/url?q=';
    var l = startOfGoogleRedirectURL.length;
    if (strURL.substr(0, l) == startOfGoogleRedirectURL)
        return decodeURIComponent(strURL.substr(l,strURL.indexOf('&',l) - l));
        
    var startOfGoogleRedirectURLs = 'https://www.google.com/url?q=';
    var ls = startOfGoogleRedirectURLs.length;
    if (strURL.substr(0, ls) == startOfGoogleRedirectURLs)
        return decodeURIComponent(strURL.substr(ls,strURL.indexOf('&',ls) - ls));
        
    pGoogle =
        /(^google\.)|(\.google\.)|(\/google\.)/;
    //TrendMicro.TB.console.info(strURL+','+pGoogle.test(strURL));
    if (strURL && (strURL.indexOf('.google.') > 0 ||
                   //strURL.indexOf('.googlesyndication.') > 0 ||
                   pGoogle.test(strURL)))
        return '';

    var oHttpRegExp = new RegExp('^(http|https|ftp|ftps)://', 'i');
    // escape those links refer to operation on the host
    var oRegExp = new RegExp('^(http|https)://' + strHost, 'i');
    var rgstrMatch = oHttpRegExp.test(strURL) && !oRegExp.test(strURL);
    return rgstrMatch ? strURL : '';
}

/*
   parse the advertisement.
*/
function TSWMGmailParseAdv(rootElement)
{
    var advNode = new CreateTSRLocatedObject(null, null, 'div', null);
    advNode.appendAttribute('class', '^vb');
    advNode.multiMatches = true;
    var AdvPanel = new CreateTSRLocatedObject(rootElement,
                                              advNode,
                                              'div',
                                              null);
    AdvPanel.appendAttribute('class', '^oM');
    //AdvPanel.multiMatches = true;
    var rgobjPath = AdvPanel.findElement();
    if (rgobjPath) {
  var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
  for (var iCount = 0; iCount < rgNodes.length; iCount++)
  {
      var n = rgNodes[iCount];
      var urlNode = n.firstChild ? n.firstChild : null;
      if (!urlNode) continue;
      var url = urlNode.href;
      var rateAttr = n.getAttribute('Rate');
         if (rateAttr && rateAttr == '1') {
          continue;
         }

         //To tell others this nodes has been rated;
         n.setAttribute('Rate', '1');
         var objResult = CreateTSRResultObject(n.firstChild, url, null);
  }
    }
}

function TSWMGmailParseBottomAdv(rootElement)
{
    var advNode = new CreateTSRLocatedObject(rootElement, null, 'div', null);
    advNode.appendAttribute('class', '^Zs');
    advNode.multiMatches = true;

    var rgobjPath = advNode.findElement();
    if (rgobjPath) {
  var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
  for (var iCount = 0; iCount < rgNodes.length; iCount++)
  {
      var n = rgNodes[iCount];

      var urlNode = n.firstChild ? n.firstChild : null;
      if (!urlNode) continue;
      var url = urlNode.firstChild.href;
      var rateAttr = n.getAttribute('Rate');
            if (rateAttr && rateAttr == '1') {
             continue;
         }
            //To tell others this nodes has been rated;
            n.setAttribute('Rate', '1');
            var objResult = CreateTSRResultObject(n.firstChild.firstChild,
                                                  url,
                                                  null);
  }
    }
}
/*
 * Parse search result
 */
function TSWMGmailParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'BODY', null);

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMGmailFetchTargetURL(strHost,
                                                 rgNodes[iCount].href);
            var e = rgNodes[iCount];
            if (strURL.length == 0)
            {
                continue;
            }
            if (e.parentNode &&
                e.parentNode.tagName &&
                e.parentNode.className &&
            e.parentNode.tagName.toUpperCase() == 'LI' &&
           (e.parentNode.className.toUpperCase() == 'GBT' ||
            e.parentNode.className.toUpperCase() == 'GBMTC')) {
             continue;
         }
            //If rate tag = 1 skip the node;
            var rateAttr = rgNodes[iCount].getAttribute('Rate');
            if (rateAttr && rateAttr == '1')
             continue;

            //To tell others this nodes has been rated;
            rgNodes[iCount].setAttribute('Rate', '1');
            if (!TSWMGmailFull2FilterContentEditable(rgNodes[iCount])) {
                CreateTSRResultObject(rgNodes[iCount], strURL, null, TSWMMGmailShowRatingResultUI); 
            }
            
        }
    }
}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSWMGmailParseResult(document);
    TSWMGmailParseAdv(document);
    TSWMGmailParseBottomAdv(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
