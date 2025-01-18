function filterbyHref(url)
{
    var ptnList = [
    ];
    for (var j = 0; j < ptnList.length; j++)
    {
        ptn = new RegExp(ptnList[j], 'i');
        if (ptn.test(url))
        {
            return true;
        }
    }
    return false;
}

function TSSRInfoSeekRightSponsor(rootElement)
{
    var objSR1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSR1,
                                           'DIV',
                                           null);

    objSR1.multiMatches = true;
    objSR.appendAttribute('class', 'side-wrap');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (!filterbyHref(rgNodes[iCount].href))
            {
                CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
            }
        }
    }
}

function TSSRInfoSeekParseResult(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'li', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'section',
                                           'result-main');

    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (!filterbyHref(rgNodes[iCount].href))
            {
                CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
            }
        }
    }
}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRInfoSeekParseResult(document);
    TSSRInfoSeekRightSponsor(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
