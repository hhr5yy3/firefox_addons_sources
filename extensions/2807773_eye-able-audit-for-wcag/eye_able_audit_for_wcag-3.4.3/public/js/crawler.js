//Listener 
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "runCrawler") {
        sendResponse({
            "linksCrawler": startCrawler(request.urlObject.deepness, request.urlQueue, request.allUrls, request.crawlDeepness),
            "allUrls": updateAllUrls(request.allUrls, request.urlObject.deepness, request.crawlDeepness)
        });

    }
});
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.greeting === "getRef") {
//         sendResponse({
//             "ref": getWCAG()
//         });
//         //window.close();
//     }
// });

//Filter Links avaible from document.links with all visited Urls (=allUrls) and links from the queue
function startCrawler(deepness, queue, allUrls, maxDeepness) {
    let links = [];
    //Get List from allUrls, without deepness attribute:
    let allUrlsOhneDeepness = removeDeepnessAttribute(allUrls);
    let queueOhneDeepness = removeDeepnessAttribute(queue);
    const filteredUrls = getSiteHrefsFiltered(document.links, window.location.origin, allUrlsOhneDeepness, queueOhneDeepness);
    for (let i = 0; i < filteredUrls.length; i++) {
        if (deepness + 1 <= maxDeepness && filteredUrls[i] !== window.location.href) {
            links.push({ url: filteredUrls[i], deepness: deepness + 1 });
        }
    }
  return links;
}

let allowQueryParameters = true;

function getSiteHrefsFiltered(links, filterUrl, allUrlsOhneDeepness, queueOhneDeepness) {
    let urls = [];
    let hrefs = [];
    for (let i = 0; i < links.length; i++) {
        //some prelimiary filtering
        if (!links[i].href.includes("mailto:") && !links[i].href.includes("phone:") && !links[i].href.includes(".pdf")) {
            hrefs.push(links[i].href);
        }
    }
    //external site filter
    hrefs = hrefs.filter((elem) => elem.includes(filterUrl));
    //filter anker urls like "?" "#"
    for (let i = 0; i < hrefs.length; i++) {
        if (!hrefs[i].includes("#") && (!hrefs[i].includes("?") || allowQueryParameters)) {
            urls.push(hrefs[i]);
        } else if (hrefs[i].includes("#")) {
            urls.push(hrefs[i].split("#", 1)[0]);
        } else if (hrefs[i].includes("?")) {
            urls.push(hrefs[i].split("?", 1)[0]);
        }
        }
  // //Add "/" to every url
  // for (let i = 0; i < urls.length; i++) {
  //     if (urls[i].slice(-1) !== "/") {
  //         urls[i] = urls[i] + "/"
  //     }
  // }

    urls = [...new Set(urls)];
    //Compare with allUrls and queue
    let filteredUrls = [];
  filteredUrls = urls.filter((val) => !allUrlsOhneDeepness.includes(val));

  let filteredUrls2 = [];
  filteredUrls2 = filteredUrls.filter((val) => !queueOhneDeepness.includes(val));
    return filteredUrls2;
}



function updateAllUrls(allUrls, deepness, maxDeepness) {
    //Save all visited Websites with unique address from window.loaction.href
    const uniqueUrlFromTab = window.location.href;
    //Test, if uniqueUrlFromTab is in allUrls already
  if (!removeDeepnessAttribute(allUrls).includes(uniqueUrlFromTab) && deepness + 1 <= maxDeepness) {
        allUrls.push({ url: uniqueUrlFromTab, deepness: deepness + 1 });
    }
  return allUrls;
}


function removeDeepnessAttribute(inputArray) {
    //remove deepness from inputArray for comparing in filter
    let arrayWithoutDeepness = [];
    for (let i = 0; i < inputArray.length; i++) {
        arrayWithoutDeepness.push(inputArray[i].url);
    }
    return arrayWithoutDeepness;
}

// function wait(ms) {
//     var start = new Date().getTime();
//     var end = start;
//     while (end < start + ms) {
//         end = new Date().getTime();
//     }
// }


//extra
// function getWCAG() {
//     let element = document.getElementsByClassName("wcagSc");
//     if (element) {
//         return element[0].innerText;
//     } else {
//         return undefined;
//     }
// }