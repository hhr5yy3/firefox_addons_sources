function GetRealURL(strURL) {
    var oRegExp = new RegExp(
        '^https?://(.*)\\.facebook\\.com/l\\.php\\?u=(.*)&h=',
        'i');
    var result = strURL.match(oRegExp);
    if (result) {
        return decodeURIComponent(result[2]);
    }
    return strURL;
}

function filterbyHref(url)
{
    var ptnList = [
               '^#$',
               '^\/',
               '^mailto',
               '^https?\\:\\/\\/.*\\.fbcdn\\.net',
               '^https?\\:\\/\\/.*\\.facebook\\.com',
               '^https?\\:\\/\\/facebook\\.interviewstreet\\.com'
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

function filterByNode(obj)
{
    if (obj && typeof (obj.innerHTML) != 'undefined' && obj.innerHTML == '') {
        return true;
    }
    return false;
}

function TBParseMessagesContent(rootElement)
{

    // @param selector : #gb_content_and_toolbar DIV[class=message_pane]
    // DIV[class=GBThreadMessageRow clearfix](multiMatches=true)
    // DIV[class=GBThreadMessageRow_Body](multiMatches=true)
    // A(multiMatches=true)
    var objSRl4 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl3 = new CreateTSRLocatedObject(null, objSRl4, 'DIV', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'DIV', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'gb_content_and_toolbar');

    objSRl3.appendAttribute('class', 'GBThreadMessageRow_Body');
    objSRl1.appendAttribute('class', 'message_pane');
    objSRl2.appendAttribute('class', 'GBThreadMessageRow clearfix');
    objSRl2.multiMatches = true;
    objSRl3.multiMatches = true;
    objSRl4.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseEvent(rootElement)
{

    // @param selector : #event_info_pagelet A(multiMatches=true)
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'event_info_pagelet');

    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}
function TBParseWall(rootElement)
{
    // @param selector : #profile_minifeed LI(multiMatches=true)
    // DIV[class=^storyInnerContent] A(multiMatches=true)
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'DIV', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                    objSRl1,
                    'UL',
                    'profile_minifeed');

    objSRl1.multiMatches = true;
    objSRl2.appendAttribute('class', '^storyInnerContent');
    objSRl3.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}
function TBParseNewsFeed(rootElement)
{
    // @param selector : #home_stream LI(multiMatches=true)
    // DIV[class=^storyInnerContent] A(multiMatches=true)
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'DIV', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'LI', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'home_stream');

    objSRl1.multiMatches = true;
    objSRl2.appendAttribute('class', '^storyInnerContent');
    objSRl3.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseNotes(rootElement)
{
    if (rootElement.getElementById('pagelet_roosters'))
        {
            return;
        }
    // @param selector : #contentArea A(multiMatches=true)
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'contentArea');

    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParsePhoto(rootElement)
{
    // @param selector : #fbPhotoTheater A(multiMatches=true)
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'photos_snowlift');

    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}
function TBParsePhotoFromHome(rootElement)
{
    // @param selector : #content A

    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'content');

    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                if(rgNodes[iCount].firstChild.nodeName == '#text')
                {
                    CreateTSRResultObject(rgNodes[iCount], strURL);
                }
            }
        }
    }
}
function TBParsePhotoFromHomeNew(rootElement)
{
    // @param selector : #content A
    var rgNodes = document.querySelectorAll('[role=main] a');
    
    for (var iCount = 0; iCount < rgNodes.length; iCount++)
    {
        var strURL = GetRealURL(rgNodes[iCount].href);
        if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
        {
            if(rgNodes[iCount].firstChild.nodeName == '#text')
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}
function TBParsePhotoShowBox(rootElement)
{
    // @param selector : #content A

    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
                                           objSRl1,
                                           'DIV',
                                           'fbxPhotoContentContainer');

    objSRl1.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBAdjustAdinfoStyle(insertNode) {
    insertNode.style.display = 'inline';
}

function GetAdUrl(url) {
    var reg = new RegExp("^https?://(.*)\\.facebook\\.com/a\\.php\\?u=(.*)&__tn__");
    var result = url.match(reg);
    if(result && result.length > 2) {
        return decodeURIComponent(result[2]);
    }
    return url;
}

function TBParseAds(rootElement) {
    var objSRl2 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', null);

    objSR.multiMatches = true;
    objSR.appendAttribute('class', '^ego_column');
    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', '^ego_unit');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var links = rgNodes[iCount].getElementsByTagName("strong");
            if(links.length > 0) {
                var strURL = GetAdUrl(rgNodes[iCount].href);
                CreateTSRResultObject(links[0], strURL);
            }
        }
    }
}

function AdjustNodeStyle(objInsertNode) {
    if (!objInsertNode)
        {
            return;
        }
    var prevNode = objInsertNode.previousSibling || null;
    if (prevNode && (prevNode.className == 'TSRSpan'))
        {
            var childNodes = prevNode.childNodes;
            var iconNode = childNodes[0];
            if (iconNode && iconNode.className == 'TSRWebRatingIcon')
                {
                    iconNode.style.margin = '0px';
                    iconNode.style.padding = '0px';
                    iconNode.style.border = '0px';
                }
        }
}

function TBParseSiderUIStream(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSRl2 = new CreateTSRLocatedObject(null, objSRl3, 'H6', null);
    var objSRl1 = new CreateTSRLocatedObject(null, objSRl2, 'DIV', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl1, 'DIV', null);
    objSR.appendAttribute('class', '^ego_column');
    objSRl1.multiMatches = true;
    objSRl1.appendAttribute('class', '^fbAdUnit');
    objSRl2.multiMatches = true;
    objSRl2.appendAttribute('class', 'uiStreamMessage');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseAnswerText(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl3, 'DIV', null);
    objSR.appendAttribute('class', 'answerText');
    objSR.multiMatches = true;


    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

function TBParseCommentBody(rootElement)
{
    var objSRl3 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement, objSRl3, 'SPAN', null);
    objSR.appendAttribute('class', 'commentBody');
    objSR.multiMatches = true;

    var rgobjPath;
    if ((rgobjPath = objSR.findElement()))
    {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++)
        {
            var strURL = GetRealURL(rgNodes[iCount].href);
            if (!filterbyHref(strURL) && !filterByNode(rgNodes[iCount]))
            {
                CreateTSRResultObject(rgNodes[iCount], strURL);
            }
        }
    }
}

TSRTagFlowID();
g_bIsNeedCheckSPan = true;
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;
    if ( TrendMicro.TB.DOMIdExist('gb_content_and_toolbar'))
    TBParseMessagesContent(document);
    if ( TrendMicro.TB.DOMIdExist('profile_minifeed'))
    TBParseWall(document);
    if ( TrendMicro.TB.DOMIdExist('home_stream'))
    TBParseNewsFeed(document);
    if ( TrendMicro.TB.DOMIdExist('event_info_pagelet'))
    TBParseEvent(document);
    TBParseNotes(document);
    if ( TrendMicro.TB.DOMIdExist('photos_snowlift'))
    TBParsePhoto(document);
    if ( TrendMicro.TB.DOMIdExist('fbxPhotoContentContainer'))
    TBParsePhotoShowBox(document);
    TBParseSiderUIStream(document);
    TBParseAnswerText(document);
    TBParseCommentBody(document);
    TBParseAds(document);
    //old facebook UI
    if ( TrendMicro.TB.DOMIdExist('content'))
    TBParsePhotoFromHome(document);
    //new facebook UI
    else 
    TBParsePhotoFromHomeNew(document);
    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
