function TSSRLinkedInShowRatingResultUI()
{
    var ptnLinkedin = [
        'https?://www\\.linkedin\\.com/(#|(.*)trk=tod-art(.*)|lite|reconnect|anet|groupMsg|answers|static|createGroup|nhome|groupfollowing|groupRegistration|forwardProfileMsg|search|secure|updates|profile|groups|groupItem|groupAnswers|pymk|home|share(.*)trk=NUS_UNIU_SHARE-pic|mfeed|msgToConns|mbox|groupInvitation|inbox|blink|company|share\\?displayShare|today|signal|recRequests|pub|organizer|requestList|inviteFromProfile|csearch|subscriptionv2)',
        'https?://www\\.linkedin\\.com/(.*)url=(https?://(www\\.)?linkedin\\.com|https?%3A%2F%2F(www%2E)?linkedin(%2Ecom)?|https?%3A%2F%2F(www%2E)?twitter%2Ecom)',
        'javascript',
        'http://www.linkedin.com/companies',
        'http://www.linkedin.com/company',
        'http://www.linkedin.com/@',
        'https://www.linkedin.com/@',
        'http://www.linkedin.com/jsearch',
        'http://signal/',
        'http://www.linkedin.com/nus-trk?trkact=viewJobPosting',
        'http://www.linkedin.com/jobs?',
        'http://[A-Za-z][A-Za-z].linkedin.com/pub',
        'http://www.linkedin.com/connections',
        'http://www.linkedin.com/manageGroupMembers',
        'http://www.linkedin.com/manageGroup',
        'http://www.linkedin.com/groupNews',
        '^http://www.linkedin.com/\\?trk=hb-0-h-logo#',
        '^https?://www\\.linkedin\\.com/((skills)|(people))/'
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

function TSSRLinkedInFetchTargetURL(strHost, strURL)
{
    var oHttpRegExp = new RegExp('^(http|https)://', 'i');
    // escape those links refer to operation on the host
    var oRegExp = new RegExp('^(http|https)://' + strHost, 'i');
    var rgstrMatch = oHttpRegExp.test(strURL) && !oRegExp.test(strURL);
    return rgstrMatch ? strURL : '';
}

function TSRLinkedInParseResult(rootElement, elementID)
{
    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        elementID);
    objSR.tagIDregexFirst = true;
    var rgobjPath = document.getElementById(elementID);
    if(!rgobjPath) {
        return;
    }

    //var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
    var rgNodes = rgobjPath.querySelectorAll('a');
    if(!rgNodes) {
        return;
    }

    var strHost = rootElement.location.host;

    for (var iCount = 0; iCount < rgNodes.length; iCount++)
    {
        var strURL =
            TSSRLinkedInFetchTargetURL(strHost,
                rgNodes[iCount].href);

        if (strURL.length == 0)
        {
            continue;
        }
        var objResult =
            CreateTSRResultObject(rgNodes[iCount],
                strURL,
                null,
                TSSRLinkedInShowRatingResultUI);

    }

}


g_bIsNeedCheckSPan = true;
TSRTagFlowID();
function TSRParse()
{
    var oldLength = g_oEnv.Parser.iResultNumber;

    var firstTargetID = 'voyager-feed';
    if(document.getElementById(firstTargetID)){
        TSRLinkedInParseResult(document, firstTargetID);
    }
    TSRLinkedInParseResult(document, 'profile-content');

    TrendMicro.TB.ReduceNewNode(oldLength + 1);
    return g_oEnv.Parser.rgobjSearchResult;
}
