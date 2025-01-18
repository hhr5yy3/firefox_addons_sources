function filterbyHref(url)
{
    var ptnList = [
                'http://(e|trust|guanwang|open|cache|newscache)\\.baidu\\.com',
                'http://(www|news)\\.baidu\\.com/(.*)((wd=)|(word=))',
                'http://tag\\.news\\.baidu\\.com/t',
                'http://cache\\.baiducontent\\.com'
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

function TSSRBaiduParseResult(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('container')) {
        return;
    }
    
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'content_left');
    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'result');
    

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

function TSSRBaiduParseResultTopFirst(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('container')) {
        return;
    }
    
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'H2', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'content_left');
    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'layout');
    

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

function TSSRBaiduParseResult_News(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('container')) {
        return;
    }
    
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'FONT', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'TABLE', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'container');

    objSRl1.multiMatches = true;
    objSRl2.multiMatches = true;
    objSRl2.appendAttribute('size', '-1');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {

        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (!filterbyHref(rgNodes[iCount].href))
            {
                var text = rgNodes[iCount].innerText ||
                           rgNodes[iCount].textContent || '';
                if (text.length != 1) {
                    CreateTSRResultObject(rgNodes[iCount],
                                          rgNodes[iCount].href);
                }
            }
        }
    }
}

function TSSRBaiduParseResult_FromBing(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('container')) {
        return;
    }
    
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'DIV', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'TABLE', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'container');

    objSRl1.multiMatches = true;
    objSRl2.multiMatches = true;

    objSRl2.appendAttribute('class', 'bingres');

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

function TSSRBaiduParseSidebarSponsor(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('container')) {
        return;
    }
    
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl3, 'TD', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'container');

    objSRl1.appendAttribute('align', 'left');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {

        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (filterbyHref(rgNodes[iCount].href) || !rgNodes[iCount].innerText)
            {
                continue;
            }

            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}

function TSSRBaiduParseTopSponsor(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('content_left')) {
        return;
    }
    
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'content_left');
    objSRl1.multiMatches = true;
    objSRl1.appendAttribute("data-click", ".*");
    
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

function TSSRBaiduParseBottomSponsor(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('content_left')) {
        return;
    }
    
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'TABLE', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'content_left');
    objSRl1.multiMatches = true;
    objSRl2.multiMatches = true;
    objSRl2.appendAttribute("data-is-main-url", "true");

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

function TSSRBaiduParseNews(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('container')) {
        return;
    }
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'LI', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'UL', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'container');

    objSRl1.multiMatches = true;
    objSRl2.multiMatches = true;

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

function TSSRBaiduParseNews_SideSponsor(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('ecad')) {
        return;
    }
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'ecad');

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

function TSSRBaiduParseTable(rootElement)
{
    if (!TrendMicro.TB.DOMIdExist('container')) {
        return;
    }
    
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'TABLE', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'content_left');
    objSRl1.multiMatches = true;
    objSRl3.appendAttribute('data-click', '.*');
    
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
    try {
        TSSRBaiduParseResult(document);
        TSSRBaiduParseResultTopFirst(document);
        TSSRBaiduParseResult_News(document);
        TSSRBaiduParseResult_FromBing(document);
        TSSRBaiduParseSidebarSponsor(document);
        TSSRBaiduParseTopSponsor(document);
        TSSRBaiduParseBottomSponsor(document);

        TSSRBaiduParseNews(document);
        TSSRBaiduParseNews_SideSponsor(document);
        TSSRBaiduParseTable(document);
    }catch (e) {
    }
    TrendMicro.TB.ReduceNewNode(oldLength + 1);

    return g_oEnv.Parser.rgobjSearchResult;
}
