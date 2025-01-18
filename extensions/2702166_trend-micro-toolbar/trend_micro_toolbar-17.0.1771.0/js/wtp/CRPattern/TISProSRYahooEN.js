function TSRYahooShowIconCSS(objNode){
    if (objNode &&
        objNode.previousSibling &&
        objNode.previousSibling.className == 'TSRSpan' &&
        objNode.previousSibling.childNodes[0] &&
        objNode.previousSibling.childNodes[0].className == 'TSRWebRatingIcon'){
        var imgIcon = objNode.previousSibling.childNodes[0];
        imgIcon.style.visibility = 'visible';
        imgIcon.style.border = '0';
        imgIcon.style.margin = '0';
        imgIcon.style.padding = '0';
    }
}
function TSRYahooCheckITModifyCSS(objResult, marginLeft)
{
    var oRegExp =
        new RegExp('^http://(es|it|in|asia|malaysia)' +
                   '\\.search\\.yahoo\\.com/((search)|(custom))', 'i');

    if (oRegExp.test(document.location))
    {
        TSRYahooModifyCSS(objResult, marginLeft, true);
    }
}

function TSRYahooModifyCSS(objResult, marginLeft, bInline)
{
    // for Yahoo English case, advertisement would blokc whole line
    var objInsertNode = objResult.FindInsertNode();
    if (objInsertNode && objInsertNode.style)
    {
        objResult.spanIcon = document.createElement('SPAN');
        var InsertNodeMarginLeft = marginLeft +
            parseInt(D_GAP_BETWEEN_ICON_TITLE);
        var objTMDom = new TMDOMObj(objResult.spanIcon);
        objTMDom.style.setFloat('left');

        if (!bInline)
        {
            objInsertNode.style.marginLeft = InsertNodeMarginLeft + 'px';
        }
        else
        {
            var objBR = document.createElement('BR');
            objInsertNode.style.display = 'inline';
            objInsertNode.
                parentNode.
                insertBefore(objBR, objInsertNode.nextSibling);
        }
    }
}

function TSSRYahooFetchTargetURL(strURL)
{
    var start = strURL.indexOf('/RU=');
    if (start != -1) {
        var tempURL = strURL.substr(start + 4);
        return decodeURIComponent(tempURL.substr(0, tempURL.indexOf('/R')));
    }
    return strURL;
}

/*
 * Callback function, Because MSN would use JS
 to modity its DOM object so that the parsed node
 * could not exist. We need to find it again
 when we want to insert rating result.
 */
function TSSRYahooFindInsertNode()
{
    var objNode = null;

    if (this.node.parentNode && -1 ==
        this.node.parentNode.nodeName.indexOf('#'))
    {
        objNode = this.node;
    }
    else if (this.baseNode)
    {
        var objANodes = this.baseNode.getElementsByTagName('A');

        if (0 < objANodes.length)
        {
            objNode = objANodes[0];
        }
    }
    return objNode;
}

/*
 * Parse search result
 */
function TSSRYahooParseResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRv1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRl1,
                                   'H3',
                                   null);
    var objSRv2 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRv1,
                                   'DIV',
                                   'web');
    var objSRv3 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRv2,
                                   'DIV',
                                   'main');

    
    objSRv1.multiMatches = true;
    var rgobjPath = objSRv1.findElement();

    if (!rgobjPath)
    {
        rgobjPath = objSRv2.findElement();
    }

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].href);
            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      TSSRYahooFindInsertNode,
                                      null,
                                      TSRYahooShowIconCSS);
            if (objResult) {
                objResult.baseNode =
                    rgNodes[iCount].
                    parentNode.
                    parentNode.
                    parentNode;
            }
        }
    }
}
function TSSRYahooParseResultFirstCenter(rootElement) {
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRv1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRl1,
                                   'DIV',
                                   null);
    var objSRv2 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRv1,
                                   'DIV',
                                   'web');
    var objSRv3 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRv2,
                                   'DIV',
                                   'main');

    objSRv1.appendAttribute('class', 'compList');
    objSRv1.multiMatches = true;
    var rgobjPath = objSRv2.findElement();

    if (!rgobjPath)
    {
        rgobjPath = objSRv3.findElement();
    }

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].href);
            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      TSSRYahooFindInsertNode,
                                      null,
                                      TSRYahooShowIconCSS);
            if (objResult) {
                objResult.baseNode =
                    rgNodes[iCount].
                    parentNode.
                    parentNode.
                    parentNode;
            }
        }
    }
}
function TSSRYahooParseResultDownloadLink(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'H3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'web');

    objSRl1.appendAttribute('class', 't-bd');

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

function TSSRYahooParseSidebarSponsor(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'DIV', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'right');

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

function TSSRYahooParseNewsSidebarSponsor(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'h3', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'right');

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
 * Parse News Result
 */

function TSSRYahooParseNewsResult(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 =
        new CreateTSRLocatedObject(null,
                                   objSRl3,
                                   'ul',
                                   null);
    var objSRl1 =
        new CreateTSRLocatedObject(null,
                                   objSRl2,
                                   'td',
                                   null);
    var objSRv1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRl1,
                                   'li',
                                   null);
    objSRv1.multiMatches = true;
    objSRv1.appendAttribute('data-bns', 'Yahoo');
    objSRl1.multiMatches = true;

    var rgobjPath = objSRv1.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].href);
            var match = false;
            for (var j = 0; j < YahooEnPtn.length; j++)
            {
                ptn = new RegExp(YahooEnPtn[j], 'i');
                if (ptn.test(strURL))
                {
                    match = true;
                    break;
                }
            }

            if (match)
            {
                continue;
            }

            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      TSSRYahooFindInsertNode);
            if (objResult) {
                objResult.baseNode =
                    rgNodes[iCount].
                    parentNode.
                    parentNode.
                    parentNode;
            }
        }
    }
}

/*
 * Parse Bottom Sponsor
 */
function TSSRYahooParseTopBottomSponsor(rootElement)
{
    var objSRl4 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl3 = new CreateTSRLocatedObject(null, objSRl4, 'DIV', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'LI', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'UL', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', 'main');

    objSRl1.appendAttribute('class', 'spns');
    objSRl1.multiMatches = true;
    objSRl2.multiMatches = true;

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
 * Parse Map Result
 */
function TSSRYahooMapResult(rootElement)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRv1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRl1,
                                   'DIV',
                                   null);
    objSRv1.multiMatches = true;
    objSRv1.appendAttribute('class', 'sc-loc');
    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', null);

    var rgobjPath = objSRv1.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].href);
            var match = false;
            for (var j = 0; j < YahooEnPtn.length; j++)
            {
                ptn = new RegExp(YahooEnPtn[j], 'i');
                if (ptn.test(strURL))
                {
                    match = true;
                    break;
                }
            }

            if (match)
            {
                continue;
            }

            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL,
                                      TSSRYahooFindInsertNode);
            if (objResult) {
                objResult.baseNode =
                    rgNodes[iCount].
                    parentNode.
                    parentNode.
                    parentNode;
            }
        }
    }
}
function TSSRYahooParseNewSW(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'A', null);
     var objSRl0 =
        new CreateTSRLocatedObject(null,
                                   objSRl2,
                                   'li',
                                   null);
    var objSRv1 =
        new CreateTSRLocatedObject(rootElement,
                                   objSRl0,
                                   'div',
                                   'newsw');

    objSRl0.multiMatches = true;
    var rgobjPath = objSRv1.findElement();

    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = TSSRYahooFetchTargetURL(rgNodes[iCount].href);
            var match = false;
            for (var j = 0; j < YahooEnPtn.length; j++)
            {
                ptn = new RegExp(YahooEnPtn[j], 'i');
                if (ptn.test(strURL))
                {
                    match = true;
                    break;
                }
            }

            if (match)
            {
                continue;
            }

            var objResult =
                CreateTSRResultObject(rgNodes[iCount],
                                      strURL
                                      );
        }
    }
}

var YahooEnPtn = [
    '^https?\:\/\/search.yahoo\.com',
    'http://search.yahoo.com/',
    'search.yahoo.com',
    '^mailto',
    'www.yahoo.com/bin/set',
    'local.yahoo.com',
    'maps.yahoo.com'
   ];

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRYahooParseResult(document);
    TSSRYahooParseResultFirstCenter(document);
    TSSRYahooParseResultDownloadLink(document);
    TSSRYahooParseTopBottomSponsor(document);
    TSSRYahooParseSidebarSponsor(document);
    TSSRYahooParseNewsResult(document);
    TSSRYahooParseNewsSidebarSponsor(document);
    
    TSSRYahooMapResult(document);
    TSSRYahooParseNewSW(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
