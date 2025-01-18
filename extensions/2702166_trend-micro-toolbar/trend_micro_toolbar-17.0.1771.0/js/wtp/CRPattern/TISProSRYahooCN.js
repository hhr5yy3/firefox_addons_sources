/*
 * Parse search result
 */
function TSSRYahooParseResult(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'li', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'ul',
                                           null);

    objSR.appendAttribute('class', 'results');
    objSRl1.appendAttribute('class', 'record');
    objSRl1.multiMatches = true;
    objSRl2.appendAttribute('class', 'title');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
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
    var objSRSSl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRSSl2 = new CreateTSRLocatedObject(null, objSRSSl3, 'H3', null);
    var objSRSSl1 = new CreateTSRLocatedObject(null, objSRSSl2, 'DIV', null);
    var objSRSS = new CreateTSRLocatedObject(rootElement,
                                             objSRSSl1,
                                             'DIV',
                                             'ybar');

    objSRSSl1.appendAttribute('class', '^p4plist$');
    objSRSSl2.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRSS.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var objTMDom = new TMDOMObj(rgNodes[iCount]);
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}

/*
 * Parse Top Sponsor
 */
function TSSRYahooParseTopSponsor(rootElement)
{
    var objSRTSl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTS = new CreateTSRLocatedObject(rootElement,
                                             objSRTSl1,
                                             'DIV',
                                             'adBlock');

    objSRTS.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRTS.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var objUrl = new CreateTSRSiblingObject('EM');

            if (objUrl.findSibling(rgNodes[iCount]))
            {
                var objTMDom = new TMDOMObj(objUrl.nodeElement);
                var strURL = InsertURLProtocolString(objTMDom.innerText());
                var objResult = CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

/*
 * Parse News Result
 */
function TSSRYahooParseNewsResult(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'ul', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'li', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'ul',
                                           null);

    objSR.appendAttribute('class', 'results');
    objSRl1.appendAttribute('class', 'record sc_news');
    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
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
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRYahooParseResult(document);
    TSSRYahooParseSidebarSponsor(document);
    TSSRYahooParseTopSponsor(document);
    TSSRYahooParseNewsResult(document);

    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
