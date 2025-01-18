function TSRMSNModifyCSS(objResult, marginLeft)
{
    // for Yahoo English case, advertisement would blokc whole line
    var objInsertNode = objResult.FindInsertNode();
    if (objInsertNode && objInsertNode.style)
    {
        objResult.spanIcon = document.createElement('SPAN');
        var objTMDom = new TMDOMObj(objResult.spanIcon);
        objTMDom.style.setFloat('left');

        var InsertNodeMarginLeft = marginLeft +
            parseInt(D_GAP_BETWEEN_ICON_TITLE);
        objInsertNode.style.marginLeft = InsertNodeMarginLeft + 'px';
    }
}

/*
 * Callback function, Because MSN would use JS to
 * modity its DOM object so that the parsed node
 * could not exist. We need to find it again when
 * we want to insert rating result.
 */
function TSSRMSNFindInsertNode()
{
    var objNode = this.node;
    if (this.baseNode && this.baseNode.firstChild)
    {
        if (this.baseNode.firstChild.nodeName == 'SPAN')
        {
            var baseNode = this.baseNode.firstChild;
            var objH3Nodes = baseNode.getElementsByTagName('H3');

            if (1 == objH3Nodes.length)
            {
                objNode = objH3Nodes[0];
            }
        }
    }
    return objNode;
}

function TSSRMSNLiveCutPrefixURL(strURL)
{
    var regexTarget = /\s*\-\s+([^\s]+)$/;
    var rgstrMatch = strURL.match(regexTarget);
    return (rgstrMatch && rgstrMatch.length == 2) ? rgstrMatch[1] : strURL;
}

/*
 * Parse search result
 */
function TSSRMSNLiveParseResult(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'H3', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'results');

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

/*
 * Parse Sidebar Sponsor
 */
function TSSRMSNLiveParseSidebarSponsor(rootElement)
{
    var objSRSSl2 = new CreateTSRLocatedObject(null, null, 'H3', null);
    var objSRSSl1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRSSl2,
                                   'DIV',
                                   null);
    var objSRSS =
        new CreateTSRLocatedObject(rootElement,
                                   objSRSSl1,
                                   'DIV',
                                   'sidebar');

    objSRSSl1.appendAttribute('class', '^sb_adsN$');

    var rgobjPath;
    if ((rgobjPath = objSRSS.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var objUrl = new CreateTSRSiblingObject('CITE');

            if (objUrl.findSibling(rgNodes[iCount]))
            {
                var strURL =
                    InsertURLProtocolString(objUrl.
                                            nodeElement.
                                            innerHTML);
                var objResult =
                    CreateTSRResultObject(rgNodes[iCount],
                                          strURL,
                                          TSSRMSNFindInsertNode);
                objResult.baseNode = rgNodes[iCount].parentNode;

                TSRMSNModifyCSS(objResult, g_oImgDefine.ImgSize.WebIcon.width);
            }
        }
    }
}

/*
 * Parse Top Sponsor
 */
function TSSRMSNLiveParseTopSponsor(rootElement)
{
    var objSRTSl2 = new CreateTSRLocatedObject(null, null, 'H3', null);
    var objSRTSl1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRTSl2,
                                   'DIV',
                                   null);
    var objSRTS =
        new CreateTSRLocatedObject(rootElement,
                                   objSRTSl1,
                                   'DIV',
                                   'results_area');

    objSRTSl1.appendAttribute('class', '^sb_adsW');
    objSRTSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRTS.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var objUrl = new CreateTSRSiblingObject('CITE');

            if (objUrl.findSibling(rgNodes[iCount]))
            {
                var strURL =
                    TSSRMSNLiveCutPrefixURL(objUrl.
                                            nodeElement.
                                            innerHTML);
                strURL = InsertURLProtocolString(strURL);

                var objResult =
                    CreateTSRResultObject(rgNodes[iCount],
                                          strURL,
                                          TSSRMSNFindInsertNode);
                objResult.baseNode = rgNodes[iCount].parentNode;
            }
        }
    }
}
g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRMSNLiveParseResult(document);
    TSSRMSNLiveParseSidebarSponsor(document);
    TSSRMSNLiveParseTopSponsor(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
