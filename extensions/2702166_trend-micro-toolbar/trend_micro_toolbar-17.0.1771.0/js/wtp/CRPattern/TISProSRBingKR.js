function filterbyHref(url)
{
    var ptnLinkedin = [
                'http://bing.search.daum.net'
              ];
    for (var j = 0; j < ptnLinkedin.length; j++)
    {
        ptn = new RegExp(ptnLinkedin[j], 'i');
        if (ptn.test(url))
        {
            return true;
        }
    }
    return false;
}

/*
 * Parse Search Result
 */
function TSSRMSBingKRSearchResult(rootElement)
{
    var objSRTSl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null,
                                               objSRTSl2,
                                               'DIV',
                                               null);
    var objSRTS = new CreateTSRLocatedObject(rootElement,
                                             objSRTSl1,
                                             'DIV',
                                             null);
    objSRTS.appendAttribute('class', 'coll_cont');
    objSRTS.multiMatches = true;
    objSRTSl1.appendAttribute('class', 'wrap_tit mg_tit');
    objSRTSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRTS.findElement()))
    {

        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (!filterbyHref(rgNodes[iCount].href))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      rgNodes[iCount].href,
                                      null,
                                      null,
                                      function(n) {
                    var iconE = new TMDOMObj(n);
                    iconE.style.setFloat('none');
                });
            }
        }
    }
}

/*
 * Parse Search Result Site
 */
function TSSRMSBingKRSearchResultSite(rootElement)
{
    var objSRTSl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null,
                                               objSRTSl2,
                                               'DIV',
                                               null);
    var objSRTS = new CreateTSRLocatedObject(rootElement,
                                             objSRTSl1,
                                             'DIV',
                                             null);
 objSRTS.appendAttribute('class', 'wrap_cont');
 objSRTS.multiMatches = true;
 objSRTSl1.appendAttribute('class', 'wrap_tit');
 objSRTSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRTS.findElement()))
    {

        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (!filterbyHref(rgNodes[iCount].href))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      rgNodes[iCount].href,
                                      null,
                                      null,
                                      function(n) {
                    var iconE = new TMDOMObj(n);
                    iconE.style.setFloat('none');
                });
            }
        }
    }
}

/*
 * Parse Search Result twitter
 */
function TSSRMSBingKRSearchResultTwitter(rootElement)
{
    var objSRTSl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null,
                                               objSRTSl2,
                                               'SPAN',
                                               null);
    var objSRTS = new CreateTSRLocatedObject(rootElement,
                                             objSRTSl1,
                                             'DIV',
                                             null);
 objSRTS.appendAttribute('class', 'wrap_cont');
 objSRTS.multiMatches = true;
 objSRTSl1.appendAttribute('class', 'f_eb desc content_link');
 objSRTSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRTS.findElement()))
    {

        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            if (!filterbyHref(rgNodes[iCount].href))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      rgNodes[iCount].href,
                                      null,
                                      null,
                                      function(n) {
                    var iconE = new TMDOMObj(n);
                    iconE.style.setFloat('none');
                });
            }
        }
    }
}

/*
 * Parse Search Result News Detail
 */
function TSSRMSBingKRSearchResultNewsDetail(rootElement)
{
    var objSRTSl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null,
                                               objSRTSl2,
                                               'DD',
                                               null);
    var objSRTS = new CreateTSRLocatedObject(rootElement,
                                             objSRTSl1,
                                             'DL',
                                             null);
    objSRTS.appendAttribute('class', 'list_news clear');
    objSRTS.multiMatches = true;
    objSRTSl1.appendAttribute('class', 'txt_related');
    objSRTSl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSRTS.findElement()))
    {

        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0;
             iCount < rgNodes.length;
             iCount++)
        {
            if (!filterbyHref(rgNodes[iCount].href))
            {
                CreateTSRResultObject(rgNodes[iCount],
                                      rgNodes[iCount].href,
                                      null,
                                      null,
                                      function(n) {
                    var iconE = new TMDOMObj(n);
                    iconE.style.setFloat('none');
                });
            }
        }
    }
}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRMSBingKRSearchResult(document);
    TSSRMSBingKRSearchResultSite(document);
    TSSRMSBingKRSearchResultTwitter(document);
    TSSRMSBingKRSearchResultNewsDetail(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
