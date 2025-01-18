function CheckATagSpanChildElement(obj)
{
    var node = obj.FindInsertNode();
    var bNotHighLight = false;
    if (node && node.childNodes) {
        for (var i = 0; i < node.childNodes.length; ++i) {
            var aChild = node.childNodes[i];
            if (aChild &&
                aChild.tagName &&
                aChild.tagName.toUpperCase() == 'SPAN') {
                bNotHighLight = true;
                break;
            }
        }
    }

    node.NotHighLight = bNotHighLight;
}

function TSSRBiglobeTopSponsorFetchTargetURL(strURL)
{
    var regexTarget = /[&\?]q=(.+)$/;
    var rgstrMatch = strURL.match(regexTarget);
    return (rgstrMatch && rgstrMatch.length == 2) ? rgstrMatch[1] : strURL;
}
function TSSRBiglobeTopSponsorFetchTargetURL1(strHost, strURL)
{
    var oHttpRegExp = new RegExp('^(http|https)://', 'i');
    // escape those links refer to operation on the host
    var oRegExp = new RegExp('^(http|https)://' + strHost, 'i');
    var rgstrMatch = oHttpRegExp.test(strURL) && !oRegExp.test(strURL);
    return rgstrMatch ? strURL : '';
}
function TSSRBiglobeFindInsertNode()
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

function TSRBiglobeModifyCSS(objResult, marginLeft)
{
    // for Yahoo English case, advertisement would blokc whole line
    if (objResult && objResult.FindInsertNode) {
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
}


function TSSRBiglobeFetchTargetURL(strHost, strURL)
{

    var strRet = '';
    var oHttpRegExp = new RegExp('^(http|https)://', 'i');
    if (oHttpRegExp.test(strURL))
    {
        var oCheckhostRegExp = new RegExp(strHost, 'i');
        if (oCheckhostRegExp.test(strURL))
        {
            return '';
        }
        else
        {
            strRet = strURL;
        }
    }

    return strRet;
}

function TSSRGetClass(node1)
{
 var nodeAttribute = '';

        if (document.all)  // For IE;
        {
            nodeAttribute = node1.className;
        }else { // For FF
            nodeAttribute = node1.getAttribute('class');
        }

        return nodeAttribute;
}

/*
 * Parse search result 1
 */
function TSSRBiglobeParseResult1(rootElement)
{
    //var objSR13 = new CreateTSRLocatedObject(null, null, "A", null);
    var objSR12 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR11 = new CreateTSRLocatedObject(rootElement, objSR12, 'H3', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSR11, 'DIV', 'main');


    //objSR11.appendAttribute("class", "^url");
    //objSR11.appendAttribute("class", "url-sr");
    objSR11.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var node1 = rgNodes[iCount];
            var strURL = '';
            var bFlag = false;
            if (node1)
            {
             var nodeAttribute = TSSRGetClass(node1);
  if (nodeAttribute == 'a-sr')
  {
   //strURL = TSSRBiglobeFetchTargetURL(strHost, rgNodes[iCount].href);
   strURL = rgNodes[iCount].href;
  }

            }

            if (strURL.length == 0)
            {
                continue;
            }

            var objResult = CreateTSRResultObject(node1, strURL);
            if (bFlag)
            {
             TSRBiglobeModifyCSS(objResult, 0);
            }

        }
    }
}

/*
 * Parse search result 2
 */
function TSSRBiglobeParseResult2(rootElement)
{
    var objSR12 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR11 = new CreateTSRLocatedObject(rootElement, objSR12, 'H3', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSR11,
                                           'DIV',
                                           'searchResult');


    //objSR11.appendAttribute("class", "^url");
    //objSR11.appendAttribute("class", "url-sr");
    objSR11.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var node1 = rgNodes[iCount];
            var strURL = '';
            var bFlag = false;
            if (node1)
            {
             var nodeAttribute = TSSRGetClass(node1);
  if (nodeAttribute == 'a-sr')
  {
   //strURL = TSSRBiglobeFetchTargetURL(strHost, rgNodes[iCount].href);
   strURL = rgNodes[iCount].href;
  }

            }

            if (strURL.length == 0)
            {
                continue;
            }

            var objResult = CreateTSRResultObject(node1, strURL);
            if (bFlag)
            {
             TSRBiglobeModifyCSS(objResult, 0);
            }

        }
    }
}

/*
 * Parse Top Sponsor
 */
function TSSRBiglobeTopSponsor1(rootElement)
{
    var objSRTSl0 = new CreateTSRLocatedObject(null, null, 'H3', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null, objSRTSl0, 'A', null);
    var objSRTSl2 = new CreateTSRLocatedObject(null, objSRTSl1, 'DIV', null);
    var objSRTSl3 = new CreateTSRLocatedObject(rootElement,
                                               objSRTSl2,
                                               'DIV',
                                               null);

    //objSRTSl1.tagIDregexFirst = true;
    //objSRTSl2.appendAttribute("class", "^sl");
    //objSRTSl2.multiMatches = true;
    objSRTSl3.appendAttribute('class', '^sl-wrap');
    objSRTSl3.multiMatches = true;

    var rgobjPath = objSRTSl3.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var node1 = rgNodes[iCount];
            if (node1) {
             var parentNd = node1.parentNode;
                 var prntAttr = TSSRGetClass(parentNd);
             if (prntAttr == 'a-sl') {
              var objResult =
                  CreateTSRResultObject(rgNodes[iCount],
                                        rgNodes[iCount].parentNode.href);
              TSRBiglobeModifyCSS(objResult, 0);
             }
     }
        }
    }
}

function TSSRBiglobeTopSponsor2(rootElement)
{
    var objSRTSl0 = new CreateTSRLocatedObject(null, null, 'H3', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null, objSRTSl0, 'A', null);
    var objSRTSl2 = new CreateTSRLocatedObject(rootElement,
                                               objSRTSl1,
                                               'DIV',
                                               null);

    //objSRTSl1.tagIDregexFirst = true;
    //objSRTSl1.appendAttribute("class", "^a-rl");
    objSRTSl2.appendAttribute('class', '^rl');
    objSRTSl2.multiMatches = true;

    var rgobjPath = objSRTSl2.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL =
                TSSRBiglobeTopSponsorFetchTargetURL1(strHost,
                                                     rgNodes[iCount].
                                                     parentNode.
                                                     href);
            if (strURL.length == 0)
            {
                continue;
            }
            var objResult = CreateTSRResultObject(rgNodes[iCount], strURL);
            TSRBiglobeModifyCSS(objResult, 0);

        }
    }
}
function TSSRBiglobeAboutSite(rootElement)
{
    var objSRTSl = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null, objSRTSl, 'DIV', null);
    var objSRTSl2 = new CreateTSRLocatedObject(null, objSRTSl1, 'LI', null);
    var objSRTSl3 = new CreateTSRLocatedObject(rootElement,
                                               objSRTSl2,
                                               'OL',
                                               null);
    objSRTSl1.multiMatches = true;
    objSRTSl1.appendAttribute('class', 'rl');

    objSRTSl2.multiMatches = true;
    objSRTSl3.appendAttribute('class', 'ol-rl');
    objSRTSl3.multiMatches = true;

    if (rgobjPath = objSRTSl3.findElement())
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}
function TSSRBiglobeTopSponsor3(rootElement)
{
 var objSRTSl0 = new CreateTSRLocatedObject(null, null, 'SPAN', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null, objSRTSl0, 'A', null);
    var objSRTSl2 = new CreateTSRLocatedObject(null, objSRTSl1, 'DIV', null);
    var objSRTSl3 = new CreateTSRLocatedObject(rootElement,
                                               objSRTSl2,
                                               'DIV',
                                               null);

 objSRTSl0.appendAttribute('class', 'sp_t');
 objSRTSl1.appendAttribute('class', 'a-sl');
    //objSRTSl1.tagIDregexFirst = true;
    objSRTSl2.appendAttribute('class', 'sl-wrap');
    objSRTSl2.multiMatches = true;
    objSRTSl3.appendAttribute('class', '^sponArea');
    objSRTSl3.multiMatches = true;

    var rgobjPath = objSRTSl3.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL =
                TSSRBiglobeTopSponsorFetchTargetURL1(strHost,
                                                     rgNodes[iCount].
                                                     parentNode.
                                                     href);
            if (strURL.length == 0)
            {
                continue;
            }
            var objResult = CreateTSRResultObject(rgNodes[iCount], strURL);
            TSRBiglobeModifyCSS(objResult, 0);

        }
    }
}

function TSSRBiglobeTopSponsor4(rootElement)
{
 var objSRTSl0 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl2 = new CreateTSRLocatedObject(null, objSRTSl0, 'DIV', null);
    var objSRTSl3 = new CreateTSRLocatedObject(rootElement,
                                               objSRTSl2,
                                               'DIV',
                                               null);

 objSRTSl0.appendAttribute('class', 'a-sl');
 objSRTSl0.multiMatches = true;
    objSRTSl2.appendAttribute('class', 'sl');
    objSRTSl2.multiMatches = true;
    objSRTSl3.appendAttribute('class', '^sponArea');
    objSRTSl3.multiMatches = true;

    var rgobjPath = objSRTSl3.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL =
                TSSRBiglobeTopSponsorFetchTargetURL1(strHost,
                                                     rgNodes[iCount].href);
            if (strURL.length == 0)
            {
                continue;
            }

            var objResult = CreateTSRResultObject(rgNodes[iCount], strURL);
            TSRBiglobeModifyCSS(objResult, 0);

        }
    }
}

function TSSRBiglobeTopSponsor5(rootElement)
{
    var objSRTSl0 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl2 = new CreateTSRLocatedObject(null, objSRTSl0, 'OL', null);
    var objSRTSl3 = new CreateTSRLocatedObject(rootElement,
                                               objSRTSl2,
                                               'DIV',
                                               null);

    objSRTSl0.multiMatches = true;
    objSRTSl2.appendAttribute('class', 'ol-rl ol-jw');
    objSRTSl2.multiMatches = true;
    objSRTSl3.appendAttribute('class', '^sponArea');
    objSRTSl3.multiMatches = true;

    var rgobjPath = objSRTSl3.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL =
                TSSRBiglobeTopSponsorFetchTargetURL1(strHost,
                                                     rgNodes[iCount].href);
            if (strURL.length == 0)
            {
                continue;
            }

            var objResult = CreateTSRResultObject(rgNodes[iCount], strURL);
            TSRBiglobeModifyCSS(objResult, 0);

        }
    }
}
function TSSRBiglobeTopSponsor6(rootElement)
{
    var objSRTSl0 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null, objSRTSl0, 'SPAN', null);
    var objSRTSl2 = new CreateTSRLocatedObject(null, objSRTSl1, 'DIV', null);
    var objSRTSl3 = new CreateTSRLocatedObject(null, objSRTSl2, 'LI', null);
    var objSRTSl4 = new CreateTSRLocatedObject(null, objSRTSl3, 'OL', null);
    var objSRTSl5 = new CreateTSRLocatedObject(rootElement,
                                               objSRTSl4,
                                               'DIV',
                                               null);

    objSRTSl0.appendAttribute('class', 'a-sl');
    objSRTSl1.appendAttribute('class', 'sp_t');
    objSRTSl2.appendAttribute('class', 'sl');
    objSRTSl3.multiMatches = true;
    objSRTSl4.appendAttribute('class', 'ol-sl');
    objSRTSl5.appendAttribute('class', '^sponArea');
    objSRTSl5.multiMatches = true;

    var rgobjPath = objSRTSl5.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        var strHost = rootElement.location.host;
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL =
                TSSRBiglobeTopSponsorFetchTargetURL1(strHost,
                                                     rgNodes[iCount].
                                                     parentNode.
                                                     href);
            if (strURL.length == 0)
            {
                continue;
            }
            var objResult = CreateTSRResultObject(rgNodes[iCount], strURL);
            TSRBiglobeModifyCSS(objResult, 0);

        }
    }
}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRBiglobeParseResult1(document);
    TSSRBiglobeParseResult2(document);
    TSSRBiglobeTopSponsor1(document);
    TSSRBiglobeTopSponsor2(document);
    TSSRBiglobeTopSponsor3(document);
    TSSRBiglobeTopSponsor4(document);
    TSSRBiglobeTopSponsor5(document);
    TSSRBiglobeTopSponsor6(document);
    TSSRBiglobeAboutSite(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);

    for (var iCount = 1;
     iCount < g_oEnv.Parser.rgobjSearchResult.length;
     iCount++)
    {
        if (g_oEnv.Parser.rgobjSearchResult[iCount]) {
            CheckATagSpanChildElement(g_oEnv.Parser.rgobjSearchResult[iCount]);
        }
    }
    return g_oEnv.Parser.rgobjSearchResult;
}
