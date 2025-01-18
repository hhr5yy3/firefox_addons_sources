const carbonwtpTagName = '[WTP][Bing]';

function CheckATagSpanChildElement(obj) {
    var node = obj.FindInsertNode();
    var bNotHighLight = false;
    if (node && node.childNodes) {
        for (var i = 0; i < node.childNodes.length; ++i) {
            var aChild = node.childNodes[i];
            if (aChild &&
                aChild.tagName &&
                aChild.tagName.toUpperCase() == 'CITE') {
                bNotHighLight = true;
                break;
            }
        }
    }

    node.NotHighLight = bNotHighLight;
}

function getCiteText(h2)
{
    const fnGetCiteTextFromCaption = (li) => {
        let txt = '';
        do {
            let caption = li.querySelector('.b_caption');
            if(!caption) {
                break;
            }
    
            let cite = caption.querySelector('cite');
            if(!cite) {
                break;
            }

            txt = cite.textContent;
        } while(false)
        
        return txt;
    }

    const fnGetCiteTextFromImageCaption = (li) => {
        let txt = '';
        do {
            let caption = li.querySelector('.b_imgcap_altitle');
            if(!caption) {
                break;
            }
    
            let cite = caption.querySelector('cite');
            if(!cite) {
                break;
            }

            txt = cite.textContent;
        } while(false)
        
        return txt;
    }

    let ret = '';
    try {
        do {
            let obj = h2;
            while(obj) {
                if(obj.tagName.toUpperCase() === 'LI') {
                    break;
                }
        
                obj = obj.parentNode;
            }
            if(!obj) {
                break;
            }

            ret = fnGetCiteTextFromCaption(obj);
            if(!ret) {
                ret = fnGetCiteTextFromImageCaption(obj);
            }
        } while(false);
        
    } catch(e) {
        logError('getCiteText: e = ' + e);
    }

    return ret;
}

function getRealURL(originalURL)
{
    let realURL = '';
    let base64EncodeURL = '';
    try {
        do {
            // Get encoded URL from Bing URL
            let url = new URL(originalURL);
            base64EncodeURL = url.searchParams.get('u');
            if (!base64EncodeURL) {
                break;
            }

            let index = base64EncodeURL.indexOf('a1');
            if (index === 0) {
                base64EncodeURL = base64EncodeURL.substring(2);
            }

            // replace '-' and '_' with '+' and '/'
            base64EncodeURL = base64EncodeURL.replace(/-/g, '+').replace(/_/g, '/');
            realURL = decodeURIComponent(atob(base64EncodeURL));
        } while(false);
    } catch (exception) {
        if (base64EncodeURL) {
            logError('getRealURL: base64EncodeURL = ' + base64EncodeURL);
        }
        logError('getRealURL: exception = ' + exception);
    }
    
    return realURL;
}

function TSSRMSBingResult() {
    let bResults = document.querySelector('#b_results');
    if(!bResults) {
        return;
    }

    let h2List = bResults.querySelectorAll('h2');
    for(let i = 0; i < h2List.length; ++i) {
        let linkNode = h2List[i].querySelector('A');
        if(linkNode) {
            let url = linkNode.href;
            logInfo(carbonwtpTagName, 'TSSRMSBingResult: url =  ' + url);
            let realURL = getRealURL(url);
            logInfo(carbonwtpTagName, 'TSSRMSBingResult: realURL =  ' + realURL);
            if (realURL) {
                url = realURL;
            }

            /*let citeText = getCiteText(h2List[i]);
            if(citeText) {
                // Use http as default if there is no protocol in URL string.
                if(citeText.indexOf('http://') !== 0 && citeText.indexOf('https://') !== 0) {
                    citeText = 'http://' + citeText;
                }

                // replace ' › ' with '/'
                citeText = citeText.replaceAll(' › ', '/');

                // trim url that have '...' to last '/' before '...'
                let findIndex = citeText.indexOf('...');
                if(findIndex !== -1) {
                    citeText = citeText.substring(0, findIndex);

                    findIndex = citeText.lastIndexOf('/');
                    if(findIndex !== -1) {
                        citeText = citeText.substring(0, findIndex);
                    }
                }

                citeText = encodeURI(citeText);

                logInfo(carbonwtpTagName, 'TSSRMSBingResult: citeText =  ' + citeText);
                url = citeText;
            }
            else {
                continue;
            }*/

            CreateTSRResultObject(linkNode, url, null, null, null, true);

            // Find deep nodes
            let deepNode = h2List[i].parentNode.querySelector('.b_deep');
            if(deepNode) {
                let deepH3List = deepNode.querySelectorAll('h3');
                for(let j = 0; j < deepH3List.length; ++j) {
                    let deepLink = deepH3List[j].querySelector('a');
                    if (!deepLink) {
                        continue;
                    }

                    CreateTSRResultObject(deepLink, url, null, null, null, true);
                }
            }
        }
    }
}

g_bIsNeedCheckSPan = true;
TSRTagFlowID();

function TSRParse() {
    var oldLength = g_oEnv.Parser.iResultNumber;
    
    TSSRMSBingResult();

    TrendMicro.TB.ReduceNewNode(oldLength + 1);

    for (var iCount = 1; iCount < g_oEnv.Parser.rgobjSearchResult.length; iCount++) {
        if (g_oEnv.Parser.rgobjSearchResult[iCount]) {
            CheckATagSpanChildElement(g_oEnv.Parser.rgobjSearchResult[iCount]);
        }
    }

    return g_oEnv.Parser.rgobjSearchResult;
}

