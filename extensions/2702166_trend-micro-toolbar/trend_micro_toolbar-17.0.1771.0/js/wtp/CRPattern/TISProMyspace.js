function filterbyHref(url)
{
    var ptnList = [
                '^https?\:\/\/\\w+\.myspace\.com',
                '^javascript',
                '^#',
                '^\/',
                '^https?\:\/\/myspace\.com',
                '^https?\:\/\/myspace\.videosurf\.com',
                '^mailto',
                '^https?://twitter.com',
                '^https?://eventful\\.com/'
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

function TBParseHome(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                        objSRl1,
                                        'SECTION',
                                        'row1');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParsePhoto(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                        objSRl1,
                                        'SECTION',
                                        'container');
    objSRl1.multiMatches = true;
    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseBulletins(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                        objSRl1,
                                        'SECTION',
                                        'row0');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseProfile(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                        objSRl1,
                                        'SECTION',
                                        'col1_0');

    objSRl1.multiMatches = true;
    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}
function TBParseOther(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                        objSRl1,
                                        'SECTION',
                                        'row2');

    objSRl1.multiMatches = true;
    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}
function adjustStyleOfFindTickets(node) {
   var nodeID = node && node.id;
   if (nodeID && /link_findticket_.*/.test(nodeID)) {
       var nSpan = node.previousSibling;
       node.style.marginLeft = '18px';
       nSpan.style.position = 'relative';
       var nTMSpan = new TMDOMObj(nSpan);
       nTMSpan.style.setFloat('left');
       nSpan.style.top = '3px';
       nSpan.style.height = nSpan.style.width = '0px';
       var nImg = nSpan.firstChild;
       nImg.style.position = 'absolute';
   }
}
function TBParseEvent(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'page');
    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseThread(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                        objSRl1,
                                        'DIV',
                                        'groups_app');
    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseLatestPost(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', null);

    objSR.appendAttribute('class', 'horizontalContent');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseComment(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', null);

    objSR.appendAttribute('class', 'commentBody');
    objSRl1.multiMatches = true;
    objSR.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function AdjustNodeStyle(objInsertNode)
{
    if (!objInsertNode)
    {
        return;
    }
    var prevNode = objInsertNode.previousSibling || null;
    if (prevNode && (prevNode.className == 'TSRSpan'))
    {
        prevNode.style.width = g_oImgDefine.ImgSize.WarningIcon.width + 'px';
        prevNode.style.height = g_oImgDefine.ImgSize.WarningIcon.height + 'px';
    }
    adjustStyleOfFindTickets(objInsertNode);
}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    
    var oldLength = g_oEnv.Parser.iResultNumber;
    TBParseHome(document);
    TBParseBulletins(document);
    TBParseProfile(document);
    TBParseOther(document);
    TBParseEvent(document);
    TBParseThread(document);
    TBParseLatestPost(document);
    TBParseComment(document);
    TBParsePhoto(document)
    TrendMicro.TB.ReduceNewNode(oldLength + 1);

    for (var iCount = 1;
     iCount < g_oEnv.Parser.rgobjSearchResult.length;
     iCount++)
    {
        if (g_oEnv.Parser.rgobjSearchResult[iCount]) {
            AdjustNodeStyle(g_oEnv.Parser.rgobjSearchResult[iCount]);
        }
    }

    return g_oEnv.Parser.rgobjSearchResult;
}
