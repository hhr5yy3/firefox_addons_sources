function TSSROCNFetchTargetURL(strURL)
{
    return strURL;
}

function TSSROCNParseResult(rootElement)
{
    var objSRl0 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl0, 'P', null);
    var objSRv1 = new CreateTSRLocatedObject(null, objSRl1, 'DIV', null);
    var objSRv2 = new CreateTSRLocatedObject(rootElement, objSRv1, 'DIV', null);
    
    objSRv2.appendAttribute('class', 'sec4');
    objSRv1.appendAttribute('class', 'result');
    objSRv1.multiMatches = true;
    objSRl1.appendAttribute('class', 'title');

    var rgobjPath = objSRv2.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSROCNFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount], strURL);
        }
    }
}

function TSSROCNParseTopBottomSponsor(rootElement)
{
    var objSRl0 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRv1 = new CreateTSRLocatedObject(null, objSRl0, 'DIV', null);
    var objSRv2 = new CreateTSRLocatedObject(rootElement, objSRv1, 'DIV', null);
    
    objSRv2.appendAttribute('class', 'sec9');
    objSRv2.multiMatches = true;
    objSRv1.appendAttribute('class', 'result');
    objSRv1.multiMatches = true;

    var rgobjPath = objSRv2.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSROCNFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount], strURL, null, null, null, true);
        }
    }
}

/*
 * Parse Bottom Ad
 */
function TSSROCNParseClickAds(rootElement)
{
    var objSRSSA = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null,
                                               objSRSSA,
                                               'DIV',
                                               null);
    var objSRTSv1 = new CreateTSRLocatedObject(rootElement,
                                               objSRTSl1,
                                               'DIV',
                                               null);
    objSRTSl1.appendAttribute('class', 'clickable-ad');
    objSRTSv1.multiMatches = true;
    objSRTSv1.appendAttribute('class', 'result');
    var rgobjPath = objSRTSv1.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSROCNFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount], strURL, null, null, null, true);
        }
    }
}


g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSROCNParseResult(document);
    TSSROCNParseTopBottomSponsor(document);
    TSSROCNParseClickAds(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
