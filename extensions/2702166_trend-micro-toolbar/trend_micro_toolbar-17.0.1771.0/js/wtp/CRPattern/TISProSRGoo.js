function CutIMGTagContent(strURL)
{
 var strUpperCaseURL = strURL.toUpperCase();
 var imgTagPosition = strUpperCaseURL.indexOf('<IMG');
 if (imgTagPosition == -1)
 {
  return strURL;
 }
 else
 {
  return strURL.substring(0, imgTagPosition);
 }


}
function TSSRGooParseResult(rootElement)
{
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', null);

    objSR.appendAttribute('class', 'sec4');
    objSRl1.appendAttribute('class', 'result');
    objSRl2.appendAttribute('class', '');

    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var match = false;
            for (var j = 0; j < GooPtn.length; j++)
            {
                ptn = new RegExp(GooPtn[j], 'i');
                if (ptn.test(rgNodes[iCount].href))
                {
                    match = true;
                    break;
                }
            }

            if (match)
            {
                continue;
            }
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}
function TSSRGooParseResultQA(rootElement)
{
    var objSRl4 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl3 = new CreateTSRLocatedObject(null, objSRl4, 'DIV', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'DIV', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'searchresult');

 objSRl1.appendAttribute('class', 'srinbox');
 objSRl2.appendAttribute('class', 'res');
 objSRl3.appendAttribute('class', 'wimg');

 objSRl2.multiMatches = true;
        objSRl3.multiMatches = true;

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

function TSSRGooParseNewsResult(rootElement)
{
    var objSRl5 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl5, 'DIV', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'searchresult');

 objSRl1.appendAttribute('class', 'srinbox');
 objSRl2.appendAttribute('class', 'res_news');

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


function TSSRGooParseSidebarSponsor(rootElement)
{

}

function TSSRGooParseTopSponsor(rootElement)
{

 var objSRTSl4 = new CreateTSRLocatedObject(null, null, 'A', null);
 var objSRTSl3 = new CreateTSRLocatedObject(null, objSRTSl4, 'LI', null);
 var objSRTSl2 = new CreateTSRLocatedObject(null, objSRTSl3, 'DIV', null);
 var objSRTSl1 = new CreateTSRLocatedObject(null, objSRTSl2, 'DIV', null);
 var objSRTS = new CreateTSRLocatedObject(rootElement,
                                          objSRTSl1,
                                          'DIV',
                                          'searchresult');

    objSRTSl1.appendAttribute('class', 'srinbox');
 objSRTSl2.appendAttribute('class', 'sponser');
 objSRTSl2.multiMatches = true;
 objSRTSl3.multiMatches = true;
 objSRTSl4.appendAttribute('class', 'link');

    var rgobjPath;
    if ((rgobjPath = objSRTS.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}

function TSSROCNParseOCNRecommend(rootElement)
{
    var objSRSSA = new CreateTSRLocatedObject(null, null, 'A', null);

    var objSRTSv1 = new CreateTSRLocatedObject(rootElement, objSRSSA, 'DIV', null);

    objSRTSv1.appendAttribute('id', 'ocn_recommend');
    objSRSSA.appendAttribute('class', '^link$');
    objSRSSA.indexSource = 0;
    var rgobjPath = objSRTSv1.findElement();
    if (rgobjPath)
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);

        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = rgNodes[iCount].href;
            CreateTSRResultObject(rgNodes[iCount], strURL);
        }
    }
}

function TSSRGooParseTopAndBottomSponsor(rootElement)
{
    var objSRTSl5 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRTSl4 = new CreateTSRLocatedObject(null, objSRTSl5, 'P', null);
    var objSRTSl3 = new CreateTSRLocatedObject(null, objSRTSl4, 'LI', null);
    var objSRTSl2 = new CreateTSRLocatedObject(null, objSRTSl3, 'UL', null);
    var objSRTSl1 = new CreateTSRLocatedObject(null, objSRTSl2, 'DIV', null);
    var objSRTS = new CreateTSRLocatedObject(rootElement, objSRTSl1, 'DIV', 'main');

    objSRTSl1.appendAttribute('class', 'sponser');
    objSRTSl1.multiMatches = true;
    objSRTSl3.multiMatches = true;
    objSRTSl4.appendAttribute('class', 'title');

    var rgobjPath;
    if ((rgobjPath = objSRTS.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            CreateTSRResultObject(rgNodes[iCount], rgNodes[iCount].href);
        }
    }
}

var GooPtn = [
    'news.goo.ne.jp'
   ];

g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    TSSRGooParseResult(document);
    TSSRGooParseSidebarSponsor(document);
    TSSRGooParseTopSponsor(document);
    TSSRGooParseResultQA(document);
    TSSROCNParseOCNRecommend(document);
    TSSRGooParseTopAndBottomSponsor(document);

    TSSRGooParseNewsResult(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}

