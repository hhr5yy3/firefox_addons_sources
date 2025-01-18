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
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'h3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'li', null);
    objSRl1.multiMatches = true;
    var objSR0 = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'cols');
    var rgobjPath;
    if ((rgobjPath = objSR0.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount],
                                  rgNodes[iCount].href);
        }
    }
}

/*
 * Parse Sidebar Sponsor
 */
function TSSRYahooParseResultV1(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'li', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'ul', null);
    var objSR = new CreateTSRLocatedObject(null, objSRl1, 'DIV', null);

    objSRl2.multiMatches = true;
    objSRl1.appendAttribute('class', 'spns');
    objSR.multiMatches = true;
    objSR.appendAttribute('class', '^ads');
    var objSR0 = new CreateTSRLocatedObject(rootElement, objSR, 'DIV', 'main');
    var rgobjPath;
    if ((rgobjPath = objSR0.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount],
                                  rgNodes[iCount].href);
        }
    }
}

function TSSRYahooParseResultV2(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'a', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'li', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'ul', null);
    var objSR = new CreateTSRLocatedObject(null, objSRl1, 'DIV', null);

    objSRl2.multiMatches = true;
    var objSR0 = new CreateTSRLocatedObject(rootElement, objSR, 'DIV', 'right');
    var rgobjPath;
    if ((rgobjPath = objSR0.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount],
                                  rgNodes[iCount].href);
        }
    }
}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRYahooParseResult(document);
    TSSRYahooParseResultV1(document);
    TSSRYahooParseResultV2(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
