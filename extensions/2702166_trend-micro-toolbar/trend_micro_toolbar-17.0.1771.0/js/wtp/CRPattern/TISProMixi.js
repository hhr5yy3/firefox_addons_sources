function TBParseAll(rootElement) {

    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        'bodyMainArea');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement())) {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++) {
            //Remove rated nodes
            if (gBeenSent.isNodeExist(rgNodes[iCount])) {

                continue;
            }

            gBeenSent.addNode(rgNodes[iCount]);
            gRtNodes.addNode(rgNodes[iCount]);
        }
    }
}

function TBParseHome(rootElement) {

    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        'bodyMainArea02');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement())) {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++) {
            //Remove rated nodes
            if (gBeenSent.isNodeExist(rgNodes[iCount])) {

                continue;
            }

            gBeenSent.addNode(rgNodes[iCount]);
            gRtNodes.addNode(rgNodes[iCount]);
        }
    }
}

function TBParseHomeView(rootElement) {

    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        'homeView');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement())) {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++) {
            //Remove rated nodes
            if (gBeenSent.isNodeExist(rgNodes[iCount])) {

                continue;
            }

            gBeenSent.addNode(rgNodes[iCount]);
            gRtNodes.addNode(rgNodes[iCount]);
        }
    }
}

function TBParseOldContents(rootElement) {

    var objSRl1 = new CreateTSRLocatedObject(null, null, 'A', null);
    var objSR = new CreateTSRLocatedObject(rootElement,
        objSRl1,
        'DIV',
        'oldContents');

    var rgobjPath;
    if ((rgobjPath = objSR.findElement())) {
        var rgNodes = GetAllTSRLocatedNodes(rgobjPath);
        for (var iCount = 0; iCount < rgNodes.length; iCount++) {
            //Remove rated nodes
            if (gBeenSent.isNodeExist(rgNodes[iCount])) {

                continue;
            }

            gBeenSent.addNode(rgNodes[iCount]);
            gRtNodes.addNode(rgNodes[iCount]);
        }
    }
}

function TBParseCommunity(rootElement) {
    let communitySummary = rootElement.querySelector('dd.COMMUNITY_summary__content');
    if (communitySummary) {
        let rgNodes = communitySummary.querySelectorAll('a');
        for (let i = 0; i < rgNodes.length; i++) {
            if (rgNodes[i].innerText.length === 0) {
                continue;
            }

            // Remove rated nodes
            if (gBeenSent.isNodeExist(rgNodes[i])) {
                continue;
            }
            gBeenSent.addNode(rgNodes[i]);
            gRtNodes.addNode(rgNodes[i]);
        }
    }

    let communityCards = rootElement.querySelectorAll('div.COMMUNITY_cardBlockBody__item');
    if (communityCards.length !== 0) {
        for(let i = 0; i < communityCards.length; i++) {
            let rgNodes = communityCards[i].querySelectorAll('a');
            for (let j = 0; j < rgNodes.length; j++) {
                if (rgNodes[j].innerText.length === 0) {
                    continue;
                }

                // Remove rated nodes
                if (gBeenSent.isNodeExist(rgNodes[j])) {
                    continue;
                }
                gBeenSent.addNode(rgNodes[j]);
                gRtNodes.addNode(rgNodes[j]);
            }
        }
    }
}


TSRTagFlowID();
function TSRParse() {
    g_bIsNeedCheckSPan = true;
    invokeCount = 0;
    gBeenSent = new TrendMicro.TB.TBSet();
    gRtNodes = new TrendMicro.TB.TBSet();
    TBParseHome(document);
    TBParseHomeView(document);
    TBParseAll(document);
    TBParseOldContents(document);
    TBParseCommunity(document);
    var ptn = ['^#',
        '^\/',
        '^http(s)?://(.*\.)?mixi\.jp',
        'http(s)?://mixi.co.jp',
        '^javascript'
    ];
    gRtNodes.filterByHref(ptn);

    ptn = [
        '<span.*>'
    ];
    gRtNodes.filterByContent(ptn);

    gRtNodes.createResultNodes(null, true);

    return g_oEnv.Parser.rgobjSearchResult;
}

