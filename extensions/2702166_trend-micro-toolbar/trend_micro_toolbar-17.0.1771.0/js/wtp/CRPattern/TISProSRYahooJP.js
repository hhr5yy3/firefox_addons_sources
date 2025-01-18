function TSSRYahooFetchTargetURL(strURL)
{
    var regexTarget = /\/EXP=\d+\/[*\-]{2}(.+)$/;
    var rgstrMatch = strURL.match(regexTarget);
    return (rgstrMatch && rgstrMatch.length == 2) ? rgstrMatch[1] : strURL;
}

/*
 * Parse search result
 */
function TSSRYahooParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRH3 = new CreateTSRLocatedObject(rootElement,
                                             objSRl1,
                                             'H3',
                                             null);
    var objSRv1 = new CreateTSRLocatedObject(rootElement,
                                             objSRH3,
                                             'DIV',
                                             null);
    var objSRv2 = new CreateTSRLocatedObject(rootElement,
                                             objSRv1,
                                             'DIV',
                                             'WS2m');

    objSRv1.appendAttribute('class', '^hd');
    objSRv1.multiMatches = true;

    var rgobjPath = objSRv2.findElement();

    //if (!rgobjPath)
    //{
    //    rgobjPath = objSRv2.findElement();
    //}

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount], strURL);
        }
    }
    /*var rgobjPath;
    if ((rgobjPath = objSRv2.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var objUrl = new CreateTSRSiblingObject("SPAN");

            if (objUrl.findSibling(rgNodes[iCount]))
            {
                var objTMDom = new TMDOMObj(objUrl.nodeElement);
                var strURL = InsertURLProtocolString(objTMDom.innerText());
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
            else
     {
  var objSibling = new CreateTSRSiblingObject("DIV");

                if (objSibling.findSibling(rgNodes[iCount]))
             {
   var objUrl = objSibling.nodeElement.getElementsByTagName("SPAN");
   if (objUrl.length)
   {
    var objTMDom = new TMDOMObj(objUrl[0]);
    var strURL = InsertURLProtocolString(objTMDom.innerText());
    CreateTSRResultObject(rgNodes[iCount], strURL);
   }
             }
     }
        }
    }*/
}

/*
 * Parse search result for some yahoo jp dom , according to case SEG-51706 and SEG-52732 
 */
function TSSRYahooParseResult2(rootElement)
{
    var objSR11 = new CreateTSRLocatedObject(null, null, 'H3', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSR11, 'A', null);
    var objSRv1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSRv2 = new CreateTSRLocatedObject(null, objSRv1, 'DIV', null);
    var objSRv3 = new CreateTSRLocatedObject(rootElement, objSRv2, 'DIV', 'contents__wrap');

    objSRv2.appendAttribute('class', 'sw-CardBase');
    objSRv1.appendAttribute('class', 'sw-Card__title sw-Card__title--cite');
    objSRv2.multiMatches = true;

    var rgobjPath = objSRv3.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if(!rgNodes[iCount].parentNode || !rgNodes[iCount].parentNode.href) {
                continue;
            }

            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].parentNode.href);
            if(strURL) {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

/*
 * Parse search result for new yahoo jp dom, according to case SEG-104281
 */
function TSSRYahooParseResult3(rootElement)
{
    var objSR11 = new CreateTSRLocatedObject(null, null, 'H3', null);

    var objSRv1 = new CreateTSRLocatedObject(null, objSR11, 'DIV', null);
    objSRv1.appendAttribute('class', 'sw-Card__title');

    var objSRv2 = new CreateTSRLocatedObject(null, objSRv1, 'DIV', null);
    objSRv2.appendAttribute('class', 'sw-CardBase');
    objSRv2.multiMatches = true;

    var objSRv3 = new CreateTSRLocatedObject(rootElement, objSRv2, 'DIV', 'contents__wrap');
    var rgobjPath = objSRv3.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if(!rgNodes[iCount].parentNode || !rgNodes[iCount].parentNode.href) {
                continue;
            }

            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].parentNode.href);
            if(strURL) {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

/*
 * Parse search result for firefox7 dom
 */
function TSSRYahooParseResultFirefox7(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRH3 = new CreateTSRLocatedObject(null,
                                             objSRl1,
                                             'LI',
                                             null);
    var objSRv1 = new CreateTSRLocatedObject(null,
                                             objSRH3,
                                             'OL',
                                             null);
    var objSRv2 = new CreateTSRLocatedObject(rootElement,
                                             objSRv1,
                                             'DIV',
                                             'web');
    objSRH3.multiMatches = true;

    var rgobjPath = objSRv2.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}

/*
 * Parse Sidebar Sponsor
 */
function TSSRYahooParseSidebarSponsor(rootElement)
{
    var objSRSSl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRSSl1 = new CreateTSRLocatedObject(null,
                                               objSRSSl2,
                                               'DIV',
                                               null);
    var objSRSS1 = new CreateTSRLocatedObject(rootElement,
                                              objSRSSl1,
                                              'DIV',
                                              'so3');
    var objSRSS2 = new CreateTSRLocatedObject(rootElement,
                                              objSRSSl1,
                                              'DIV',
                                              'sIn');

    objSRSSl1.appendAttribute('class', '^bd');
    objSRSSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRSS2.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }

}

/*
 * Parse Sidebar Sponsor for firefox7 dom
 */
function TSSRYahooParseSidebarSponsorFirefox7(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRH3 = new CreateTSRLocatedObject(null,
                                             objSRl1,
                                             'LI',
                                             null);
    var objSRv1 = new CreateTSRLocatedObject(null,
                                             objSRH3,
                                             'UL',
                                             null);
    var objSRv2 = new CreateTSRLocatedObject(rootElement,
                                             objSRv1,
                                             'DIV',
                                             'posE');
    objSRH3.multiMatches = true;

    var rgobjPath = objSRv2.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}

function TSRYahooModifyCSS(objResult)
{
    var objInsertNode = objResult.FindInsertNode();
    if(objInsertNode && objInsertNode.style)
    {
        objResult.spanIcon = document.createElement('SPAN');
        var objTMDom = new TMDOMObj(objResult.spanIcon);
        objTMDom.style.setFloat('left');
    }
}

/*
 * Parse Top Sponsor
 */
function TSSRYahooParseTopSponsor(rootElement)
{
    var objSRSSl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRSSl1 = new CreateTSRLocatedObject(null, objSRSSl2, 'DIV', null);
    var objSRSS1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRSSl1,
                                   'DIV',
                                   'so1');
    var objSRSS2 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRSSl1,
                                   'DIV',
                                   'So1');

    objSRSSl1.appendAttribute('class', '^bd');
    objSRSSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRSS2.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var objResult = CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
            TSRYahooModifyCSS(objResult);
        }
    }
}

/*
 * Parse Botton Sponsor
 */
function TSSRYahooParseBottonSponsor(rootElement)
{
    var objSRSSl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRSSl1 = new CreateTSRLocatedObject(null, objSRSSl2, 'DIV', null);
    var objSRSS1 = new CreateTSRLocatedObject(rootElement, objSRSSl1, 'DIV', 'so2');
    var objSRSS2 = new CreateTSRLocatedObject(rootElement, objSRSSl1, 'DIV', 'So2');

    objSRSSl1.appendAttribute('class', '^bd');
    objSRSSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRSS2.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}
/*
 * Parse News Result
 */
function TSSRYahooParseNewsResult(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 =
        new CreateTSRLocatedObject(null,
                                   objSRl3,
                                   'ul',
                                   null);
    var objSRl1 =
        new CreateTSRLocatedObject(null,
                                   objSRl2,
                                   'td',
                                   null);
    var objSRv1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRl1,
                                   'li',
                                   null);
    objSRv1.multiMatches = true;
    objSRv1.appendAttribute('data-bns', 'Yahoo');
    objSRl1.multiMatches = true;

    var rgobjPath = objSRv1.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].href);
            var match = false;
            for (var j = 0; j < YahooEnPtn.length; j++)
            {
                ptn = new RegExp(YahooEnPtn[j], 'i');
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

            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      TSSRYahooFindInsertNode);
            objResult.baseNode =
                rgNodes[iCount].
                parentNode.
                parentNode.
                parentNode;
        }
    }
}

function TSSRYahooParseNewsSearchResult(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null,
                                   objSRl3,
                                   'H2',
                                   null);
    var objSRl1 = new CreateTSRLocatedObject(rootElement,
                                   objSRl2,
                                   'DIV',
                                   "NSm");
    
    objSRl2.multiMatches = true;
    
    var rgobjPath;
    if ((rgobjPath = objSRl1.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
    
    var bottomObj1 = new CreateTSRLocatedObject(null, null, "A", null);
    var bottomContainer = new CreateTSRLocatedObject(rootElement, bottomObj1, "DIV", "NSt2");
    bottomObj1.multiMatches = true;
    
    var rgobjPath;
    if ((rgobjPath = bottomContainer.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var noRateUrlRegex = new RegExp("realtime\\.search\\.yahoo\\.");
    if (noRateUrlRegex.test(document.location)){
        return [];
    }
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRYahooParseResult(document);
    TSSRYahooParseResult2(document);
    TSSRYahooParseResult3(document);
    if (TrendMicro.TB.DOMIdExist('web')) {
        TSSRYahooParseResultFirefox7(document);
    }
    TSSRYahooParseSidebarSponsor(document);
    if (TrendMicro.TB.DOMIdExist('posE')) {
        TSSRYahooParseSidebarSponsorFirefox7(document);
    }
    TSSRYahooParseTopSponsor(document);
    TSSRYahooParseBottonSponsor(document);
    TSSRYahooParseNewsResult(document);
    TSSRYahooParseNewsSearchResult(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
