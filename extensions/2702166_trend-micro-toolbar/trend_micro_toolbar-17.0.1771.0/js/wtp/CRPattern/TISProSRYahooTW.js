
function TSSRYahooFetchTargetURL(strURL)
{
    var start = strURL.indexOf('/RU=');
    if (start != -1) {
        var tempURL = strURL.substr(start + 4);
        return decodeURIComponent(tempURL.substr(0, tempURL.indexOf('/R')));
    }
    return strURL;
}

function TSSRYahooParseAd(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('main')) {
        return;
    }
    
    var objSRla = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRlh3 = new CreateTSRLocatedObject(null, objSRla, 'H3', null);
    var objSRlol = new CreateTSRLocatedObject(null, objSRlh3, 'OL', null);
    var objSRmainOl = new CreateTSRLocatedObject(rootElement,
                                           objSRlol,
                                           'DIV',
                                           'main');
    
                                           
    var objSRMiddle = new CreateTSRLocatedObject(null, objSRla, 'DIV', null);
    var objSRmainMiddle = new CreateTSRLocatedObject(rootElement,
                                           objSRMiddle,
                                           'DIV',
                                           'main');
                                           
    var objSRUl = new CreateTSRLocatedObject(null, objSRla, 'UL', null);
    var objSRmainLi = new CreateTSRLocatedObject(rootElement,
                                           objSRUl,
                                           'DIV',
                                           'main');
                                           
    objSRla.multiMatches = true;                                       
    objSRlh3.multiMatches = true;
    objSRlol.multiMatches = true;
    objSRMiddle.multiMatches = true;
    objSRlol.appendAttribute("class", "^(?!.*?searchCenterFooter).*$");
    objSRMiddle.appendAttribute("class", "compList");
    
    objSRUl.multiMatches = true;
    objSRUl.appendAttribute("class", "compDlink");
    
    var rgobjPath;
    if ((rgobjPath = objSRmainOl.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], TSSRYahooFetchTargetURL(rgNodes[iCount].href));
        }
    }
    
    if ((rgobjPath = objSRmainMiddle.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], TSSRYahooFetchTargetURL(rgNodes[iCount].href));
        }
    }
    
    if ((rgobjPath = objSRmainLi.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], TSSRYahooFetchTargetURL(rgNodes[iCount].href));
        }
    }
    
}

function TSSRYahooParseSearchResult(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('main')) {
        return;
    }
    
    var objSRla = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRH4 = new CreateTSRLocatedObject(null, objSRla, 'H4', null);
    var objSRTitle = new CreateTSRLocatedObject(null, objSRla, 'DIV', null);
    objSRH4.multiMatches = true;
    objSRTitle.multiMatches = true;
    objSRTitle.appendAttribute("class", "aTitle");
    
    var objMain1 = new CreateTSRLocatedObject(rootElement,
                                           objSRH4,
                                           'DIV',
                                           'main');
    var objMain2 = new CreateTSRLocatedObject(rootElement,
                                           objSRTitle,
                                           'DIV',
                                           'main');
                                           
    var rgobjPath;
    if ((rgobjPath = objMain1.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], TSSRYahooFetchTargetURL(rgNodes[iCount].href));
        }
    }
    
    if ((rgobjPath = objMain2.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], TSSRYahooFetchTargetURL(rgNodes[iCount].href));
        }
    }
    
}

function TSSRYahooParseRight(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('right')) {
        return;
    }
    
    var objSRla = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRH3 = new CreateTSRLocatedObject(null, objSRla, 'H3', null);
    var objRSAd = new CreateTSRLocatedObject(rootElement,
                                           objSRH3,
                                           'DIV',
                                           'right');
    
    
    var objSRList = new CreateTSRLocatedObject(null, objSRla, 'DIV', null);
    var objRSListDiv = new CreateTSRLocatedObject(rootElement,
                                           objSRList,
                                           'DIV',
                                           'right');
    objSRH3.multiMatches = true;
    objSRla.multiMatches = true;
    objSRList.appendAttribute("class", "compList");
    
    var rgobjPath;
    if ((rgobjPath = objRSAd.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], TSSRYahooFetchTargetURL(rgNodes[iCount].href));
        }
    }
    
    if ((rgobjPath = objRSListDiv.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], TSSRYahooFetchTargetURL(rgNodes[iCount].href));
        }
    }
    
}


g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRYahooParseAd(document);
    TSSRYahooParseSearchResult(document);
    TSSRYahooParseRight(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
