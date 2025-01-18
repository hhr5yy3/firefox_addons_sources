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
    var oHttpRegExp = new RegExp('^(http|https)://', 'i');
    // escape those links refer to operation on the host
    var oRegExp = new RegExp('^(http|https)://' + strHost, 'i');
    var rgstrMatch = oHttpRegExp.test(strURL) && !oRegExp.test(strURL);
    return rgstrMatch ? strURL : '';
}


/*
 * Parse search result
 */
function TSWMYahooMailJPParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        'msg-preview');
    console.log(objSR);
    
    objSR.tagIDregexFirst = true;
    
    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        
        var strHost = rootElement.location.host;
        
        for (var iCount = 6; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMYahooFetchTargetURL(strHost, rgNodes[iCount].href);

            if (strURL.length == 0)
            {
                continue;
            }
            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                    strURL,
                    null,
                    TSWMYahooShowRatingResultUI);
        }
    }
}
function TSWMYahooMailParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        'mail-app-component');
    objSR.tagIDregexFirst = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
       

        var strHost = rootElement.location.host;

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMYahooFetchTargetURL(strHost, rgNodes[iCount].href);

            if (strURL.length == 0)
            {
                continue;
            }
            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                    strURL,
                    null,
                    TSWMYahooShowRatingResultUI);
        }
    }

}
function TSWMOldYahooMailParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        'shellinner');
    objSR.tagIDregexFirst = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
       

        var strHost = rootElement.location.host;

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMYahooFetchTargetURL(strHost, rgNodes[iCount].href);

            if (strURL.length == 0)
            {
                continue;
            }
            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                    strURL,
                    null,
                    TSWMYahooShowRatingResultUI);
        }
    }

}

function TSWMYahooMailJPParseResult2(rootElement)
{
    var objSRTSlink = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSRTSSubSubDiv = new CreateTSRLocatedObject(null, objSRTSlink, 'DIV', null);
    var objSRTSSubDiv = new CreateTSRLocatedObject(rootElement, objSRTSSubSubDiv, 'DIV', null);
    //var objSRTStads = new CreateTSRLocatedObject(rootElement, objSRTSSubDiv, 'DIV', 'msg-preview');

    objSRTSSubDiv.multiMatches = true;
    objSRTSSubSubDiv.multiMatches = true;
    objSRTSlink.multiMatches = true;
    objSRTSSubDiv.appendAttribute('class','msg-body');

    var rgobjPath = objSRTSSubDiv.findElement();

    if ( rgobjPath )
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        var strHost = rootElement.location.host;

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMYahooFetchTargetURL(strHost, rgNodes[iCount].href);

            if (strURL.length == 0)
            {
                continue;
            }
            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                    strURL,
                    null,
                    TSWMYahooShowRatingResultUI);
        }
    }
}

function TSWMYahooMailJPParseResult3(rootElement)
{
    // SEG-122717: [Ti17.0]follow-up: New version of yahoo.co.jp mail is not rating
    // Get article element
    let objArticles = rootElement.getElementsByTagName('article');
    if(0 === objArticles.length) {
        return;
    }
    let objArticle = objArticles[0];

    // Get displayed iframe
    let objIframes = objArticle.getElementsByTagName('iframe');
    let displayedIframes = [];
    for(let objIframe of objIframes) {
        if('none' === objIframe.style.display) {
            continue;
        }

        displayedIframes.push(objIframe);
    }
    if(0 === displayedIframes.length) {
        return;
    }
    
    // Get links
    let strHost = rootElement.location.host;
    for(let displayedIframe of displayedIframes) {
        let links = displayedIframe.contentDocument.getElementsByTagName('a');
        for(let link of links) {
            let strURL = TSWMYahooFetchTargetURL(strHost, link.href);
            if (strURL.length == 0) {
                continue;
            }

            CreateTSRResultObject(link, strURL, null, TSWMYahooShowRatingResultUI);
        }
    }
}

function TSWMYahooMailJPParseResult4(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        'textMail');
    objSR.tagIDregexFirst = true;
    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
       

        var strHost = rootElement.location.host;

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSWMYahooFetchTargetURL(strHost, rgNodes[iCount].href);

            if (strURL.length == 0)
            {
                continue;
            }
            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
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
    if(TrendMicro.TB.DOMIdExist('msg-preview')) {
        TSWMYahooMailJPParseResult(document);
        TSWMYahooMailJPParseResult2(document);
    }

    if(TrendMicro.TB.DOMIdExist('mail-app-component')) {
        TSWMYahooMailParseResult(document);
    }
    
    if(TrendMicro.TB.DOMIdExist('shellinner')) {
        TSWMOldYahooMailParseResult(document);
    }

    let textMail = document.querySelector('[data-cy="textMail"]');
    if(textMail){
        textMail.setAttribute('id','textMail');
        TSWMYahooMailJPParseResult4(document);
    }

    TSWMYahooMailJPParseResult3(document);


    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}

