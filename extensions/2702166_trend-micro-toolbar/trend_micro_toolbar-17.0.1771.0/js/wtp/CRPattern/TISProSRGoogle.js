function filterbyHref(url)
{
    var ptnGoogle = [
                '^https?://translate\.google\.cn/',
                'https?://(.*)\.google\.(.*)/(search|images|maps)\\?'
              ];
    for (var j = 0; j < ptnGoogle.length; j++)
    {
        ptn = new RegExp(ptnGoogle[j], 'i');
        if (ptn.test(url))
        {
            return true;
        }
    }
    return false;
}

function TSSRGoogleFetchTargetURL(strURL){
    var regexTarget = /&adurl=(http[^&]+)[&]?/;
    var rgstrMatch = strURL.match(regexTarget);
    if (rgstrMatch && rgstrMatch.length == 2){
        return rgstrMatch[1];
    }else{
        regexTarget = /url\?q=(http[^&]+)[&]?/;
        rgstrMatch = strURL.match(regexTarget);
        if (rgstrMatch && rgstrMatch.length == 2){
            return rgstrMatch[1];
        }else{
            regexTarget = /&url=(http[^&]+)[&]?/;
            rgstrMatch = strURL.match(regexTarget);
            if (rgstrMatch && rgstrMatch.length == 2){
                return rgstrMatch[1];
            }
        }
    }
    
    return strURL;
}

function TSSRGoogleSetMarginForIcon(n) {
    var icon = new TMDOMObj(n.previousSibling.childNodes[0]);
    icon.style.setMargin('0 0 4px 0');
}
/*
 * Parse search result
 */
function TSSRGoogleParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'res');

    //objSRl1.appendAttribute('class', '^l$');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            //CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount],
                                  strURL,
                                  null, null, TSSRGoogleSetMarginForIcon);
        }
    }
}



function TSSRGoogleParseResult1(rootElement)
{
    var objSRl4 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl3 = new CreateTSRLocatedObject(null, objSRl4, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl3, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'res');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', '^g');
    objSRl3.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
            }
        }
    }
}

function TSSRGoogleParseNewsInResult(rootElement)
{
    var objSRlA = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRlMNR_C = new CreateTSRLocatedObject(null, objSRlA, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRlMNR_C, 'DIV', 'res');

    objSRlA.multiMatches = true;
    objSRlMNR_C.appendAttribute('class', 'mnr-c');
    objSRlMNR_C.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
            }
        }
    }
}

function TSSRGoogleParseResult2(rootElement)
{
    var objSRl4 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl3 = new CreateTSRLocatedObject(null, objSRl4, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl3, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'res');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'g');
    objSRl3.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
            }
        }
    }
}

function TSSRGoogleParseNewsResult2(rootElement)
{

    var objSRl2 = new CreateTSRLocatedObject(null, null, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'res');
    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (!rgNodes[iCount].parentNode.innerText || !rgNodes[iCount].parentNode.href)
            {
                continue;
            }

            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].parentNode.href);
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(
                    rgNodes[iCount],
                    strURL,
                    null, null, 
                    TSSRGoogleSetMarginForIcon
                );
            }
        }
    }
}


function TSSRGoogleParseResult3(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'res');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'card-section$');
    objSRl2.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
            }
        }
    }
}

function TSSRGoogleParseResult_Blog(rootElement)
{
    var objSRl4 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl3 = new CreateTSRLocatedObject(null, objSRl4, 'LI', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl3, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'ires');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', '^g');
    objSRl3.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
            }
        }
    }
}

function TSSRGoogleParseNewsResultResult1(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'SPAN', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl3, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'LI',
                                           'newsbox');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', '^w0');
    objSRl2.multiMatches = true;
    objSRl2.appendAttribute('class', '^tl');
    objSRl3.multiMatches = true;
    objSRl3.appendAttribute('class', '^l');
    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
        }
    }
}

function TSSRGoogleParseNewsResultResultIE7(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'TABLE', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'center_col');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'g');
    objSRl2.multiMatches = true;
    objSRl2.appendAttribute('class', 'ts');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);

            if (rgNodes[iCount].className && rgNodes[iCount].className == 'fl')
                continue;

            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
            }
        }
    }
}

function TSSRGoogleParseTopSponsorIE7(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'TABLE', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'center_col');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', 'taf');
    objSRl2.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
        }
    }
}


/*
 * Parse lyrics search result
 */
function TSSRGoogleParseLyrics(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'H2', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'res');

    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', '^g$');
    objSRl1.appendAttribute('style', null);
    objSRl2.multiMatches = true;
    objSRl2.appendAttribute('class', '^r$');
    objSRl3.appendAttribute('class', null);

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
        }
    }
}

function TSSRGoogleFindInsertNode()
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

function TSRGoogleModifyCSS(objResult, marginLeft)
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
 * Parse Sidebar Sponsor
 */
function TSSRGoogleParseSidebarSponsor(rootElement)
{
    var objSRSSl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRSSl2 = new CreateTSRLocatedObject(null, objSRSSl3, 'H3', null);
    var objSRSSl1 = new CreateTSRLocatedObject(null, objSRSSl2, 'LI', null);
    var objSRSS =
        new CreateTSRLocatedObject(rootElement,
                                   objSRSSl1,
                                   'TABLE',
                                   'mbEnd');

    objSRSSl1.tagIDregexFirst = true;
    objSRSSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRSS.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
        }
    }
}

/*
 * Parse Top Ads
 */
function TSSRGoogleTopAds(rootElement)
{
    let queryNode = document.querySelector('DIV#tads');
    if(!queryNode) {
        return;
    }

    let linkList = queryNode.querySelectorAll('A');
    for (let i = 0; i < linkList.length; ++i) {
        // Do not rate hidden nodes
        if (linkList[i].offsetParent === null) {
            continue;
        }

        let strURL = TSSRGoogleFetchTargetURL(linkList[i].href);
        if (!strURL) {
            continue;
        }

        // Only rate text nodes
        let spanNode = linkList[i].querySelector('SPAN');
        let insertNode = (!!spanNode && spanNode.innerText) ? spanNode : linkList[i];
        if (!insertNode.innerText) {
            continue;
        }

        CreateTSRResultObject(
            insertNode,
            strURL,
            null,
            null,
            TSSRGoogleSetMarginForIcon
        );
    }
}


/*
 * Parse Top Sponsor
 */
function TSSRGoogleParseBottomSponsor(rootElement)
{
    var objSRTSText = new CreateTSRLocatedObject(null, null, 'h3', null);
    var objSRTSlink = new CreateTSRLocatedObject(null, objSRTSText, 'a', null);
    var objSRTSSubDiv = new CreateTSRLocatedObject(null, objSRTSlink, 'DIV', null);
    var objSRTStads = new CreateTSRLocatedObject(rootElement, objSRTSSubDiv, 'DIV', 'tadsb');


    objSRTSSubDiv.multiMatches = true;
    //objSRTSSubDiv.appendAttribute('class','ad_cclk');

    objSRTSlink.multiMatches = true;

    var rgobjPath = objSRTStads.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].parentNode.href);
            CreateTSRResultObject(rgNodes[iCount],
                strURL,
                null, null, TSSRGoogleSetMarginForIcon);
        }
    }
}

/*
 * Parse Top Sponsor on IE7
 */
function TSSRGoogleParseBottomSponsorIE7(rootElement)
{
    var objSRl4 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl3 = new CreateTSRLocatedObject(null, objSRl4, 'H3', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'OL', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'center_col');

    objSRl1.multiMatches = true;
    objSRl2.multiMatches = true;
    objSRl3.multiMatches = true;

    var rgobjPath = objSR.findElement();


    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      null, null, TSSRGoogleSetMarginForIcon);
            }
        }
    }
}

function TSSRGoogleParseResultAppend(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'botstuff');
    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (!rgNodes[iCount].parentNode.innerText || !rgNodes[iCount].parentNode.href)
            {
                continue;
            }

            var strURL = TSSRGoogleFetchTargetURL(rgNodes[iCount].parentNode.href);
            if (!filterbyHref(strURL))
            {
                CreateTSRResultObject(
                    rgNodes[iCount],
                    strURL,
                    null, null, 
                    TSSRGoogleSetMarginForIcon
                );
            }
        }
    }

}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;

    if (TrendMicro.TB.DOMIdExist('res')) {
        TSSRGoogleParseResult1(document);
        TSSRGoogleParseResult2(document);
        TSSRGoogleParseResult3(document);
        //TSSRGoogleParseNewsInResult(document);
        TSSRGoogleParseNewsResult2(document);

        TSSRGoogleParseLyrics(document);
    }
    
    // add search result by dynamic loading
    if (TrendMicro.TB.DOMIdExist('botstuff')) {
        TSSRGoogleParseResultAppend(document);
    }

    if (TrendMicro.TB.DOMIdExist('ires')) {
        TSSRGoogleParseResult_Blog(document);
    }

    if (TrendMicro.TB.DOMIdExist('newsbox')) {
        TSSRGoogleParseNewsResultResult1(document);
    }


    if (TrendMicro.TB.DOMIdExist('mbEnd')) {
        TSSRGoogleParseSidebarSponsor(document);
    }

    if (TrendMicro.TB.DOMIdExist('bottomads')) {
        TSSRGoogleParseBottomSponsor(document);
    }

    if (TrendMicro.TB.DOMIdExist('center_col')) {
        TSSRGoogleParseNewsResultResultIE7(document);
        TSSRGoogleParseTopSponsorIE7(document);
        TSSRGoogleParseBottomSponsorIE7(document);

        // not only for IE, but all browsers
        TSSRGoogleTopAds(document);
    }


    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
