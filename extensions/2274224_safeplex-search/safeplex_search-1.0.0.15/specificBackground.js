var PIIQueryParams = ["postcode", "zip", "zipcode", "firstname", "tel", "email", "pass", "password", "name", "familyname", "secondname"];

function extractDomain(url) {
    var element = document.createElement("a");
    element.href = url;
    return element.host;
}

function PIIRemoval(url) {
    function removeHashParams(url) {
        return url.split("#")[0];
    }

    function removePIIParams(url) {
        var sourceUrl = url.split("?")[0];
        var queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";
        if (!queryString)
            return sourceUrl;
        var params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            var param = params_arr[i].split("=")[0];
            if (PIIQueryParams.indexOf(param.toLowerCase()) > -1) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length > 0)
            return sourceUrl + "?" + params_arr.join("&");
        return sourceUrl;
    }

    url = removeHashParams(url);
    return removePIIParams(url);
}

var HashApiConstants = {
    additions: "additions",
    rawHashes: "rawHashes",
    prefixSize: "prefixSize",
    candidateUrl: "candidateUrl",
    sha256code: "sha256code",
    threats: "threats",
    prefix: "prefix",
    threatTypes: "threatTypes"
};

function BlackListMaintainer() {
    var prefixes = [];
    var blackListCacheInterval = 3 * 60 * 60 * 1000; // 3 hours
    var blackListUpdationFlag = "";
    var completeHashDetailsApi = "https://" + DOMAIN + "apps/signature.js?startsWith=";
    var blackListPrefixApi = "https://" + DOMAIN + "apps/riskyDomainHash.js";
    var fetchingData = 0;

    function updateBlackListedAfterValidation(blackListedHashResponse) {
        let count = 0;
        let tempPrefixes = [];
        for (var i = 0; i < blackListedHashResponse.length; i++) {
            var additions = blackListedHashResponse[i][HashApiConstants.additions][HashApiConstants.rawHashes];
            for (var j = 0; j < additions.length; j++) {
                var prefixLength = additions[j][HashApiConstants.prefixSize];
                var decodedRawHash = atob(additions[j][HashApiConstants.rawHashes]);
                for (var k = 0; k + prefixLength <= decodedRawHash.length; k += prefixLength) {
                    count++;
                    tempPrefixes.push(decodedRawHash.substr(k, prefixLength));
                }
            }
        }
        if (tempPrefixes.length > 0) {
            prefixes = tempPrefixes;
            blackListUpdationFlag = new Date().getTime();
        }
    }

    function isBlackListUpdated() {
        return !!blackListUpdationFlag && (new Date().getTime() - blackListUpdationFlag) < blackListCacheInterval;
    }

    function getBlackListedHashes() {
        fetchingData = 1;
        return networkUtil.getCall(blackListPrefixApi, {timeout: 30 * 1000});
    }

    function updateBlackListedHashes() {
        var isUpdated = isBlackListUpdated();
        if (!isUpdated && !fetchingData) {
            getBlackListedHashes().then(function (updatedList) {
                fetchingData = 0;
                updateBlackListedAfterValidation(updatedList);
            }).catch(function (e) {
                fetchingData = 0;
            });
        }
        return isUpdated;
    }

    // updateBlackListedHashes();

    return {
        getBlackListedPrefixes: function () {
            updateBlackListedHashes();
            return prefixes;
        },
        hasValidBlackList: updateBlackListedHashes,

        fetchFullHashDetails: function (prefix) {
            return networkUtil.getCall(completeHashDetailsApi + btoa(prefix).replace(/=+$/, ''));
        }
    }
}

function URLFormatter() {
    function isProtocolPresent(url) {
        return (url.indexOf("http") === 0);
    }

    function removeSpaces(url) {
        return url.replace(/\s|\t|\r|\n/g, "");
    }

    function removeHashParams(url) {
        url = url.split("#");
        return url[0];
    }

    function hasEncodedComponent(url) {
        return url.indexOf('%') >= 0;
    }

    function decodeComponents(url) {
        while (hasEncodedComponent(url)) {
            url = decodeURIComponent(url);
        }
        return url;
    }

    function convertASCIIPunycodeRepresentation(url) {
        return punycode.toASCII(url);
    }

    function formatUrl(url) {
        if (!isProtocolPresent(url)) {
            url = "http://" + url;
        }
        url = convertASCIIPunycodeRepresentation(url);
        url = removeSpaces(url);
        url = removeHashParams(url);
        url = decodeComponents(url);
        return url;
    }

    return {
        formatUrl: formatUrl
    }
}

function URLCanonicalizer() {

    function replaceConsecutiveDots(hostName) {
        hostName = hostName.replace(/^\.*(.*?)\.*$/g, "$1");
        return hostName.replace(/\.+/g, ".");
    }

    function canonicalizeHostName(hostName) {
        hostName = replaceConsecutiveDots(hostName);
        hostName = hostName.toLowerCase();
        return hostName;
    }

    function normalizePath(pathName) {
        pathName = pathName.replace(/\/\.\//g, "/");
        while (pathName.indexOf("/../") >= 0) {
            pathName = pathName.replace(/[\/](.*?)\/\.\.\//g, "/");
        }
        return pathName;
    }

    function replaceConsecutiveSlashes(pathName) {
        pathName = pathName.replace(/\/+/g, "/");
        pathName = pathName || "/";
        return pathName;
    }

    function canonicalizePath(pathName) {
        pathName = normalizePath(pathName);
        pathName = replaceConsecutiveSlashes(pathName);
        return pathName;
    }

    function canonicalizeUrl(url) {
        var urlObject = new URL(url);
        urlObject.hostname = canonicalizeHostName(urlObject.hostname);
        urlObject.pathname = canonicalizePath(urlObject.pathname);
        return urlObject.toString();
    }

    return {
        canonicalizeUrl: canonicalizeUrl
    }
}

function URLPrefixSuffix() {
    function isHostNameIPAddress(hostName) {
        return (/\d+\.\d+\.\d+\.\d+/.test(hostName));
    }

    function getHostSuffix(hostName) {
        var suffixList = [];
        suffixList.push(hostName);
        if (!isHostNameIPAddress(hostName)) {
            var hostArr = hostName.split(".");
            for (var i = hostArr.length - 2; i >= 0; i--) {
                if (suffixList.length >= 5)
                    break;
                var suffix = hostArr.slice(i);
                suffix = suffix.join(".");
                suffixList.push(suffix);
            }
        }
        return suffixList;
    }

    function getPathPrefix(pathName, queryParams) {
        var prefixList = [];
        prefixList.push(pathName + queryParams);
        prefixList.push(pathName);
        prefixList.push("/");
        var pathArr = pathName.split("/");
        for (var i = 1; i < pathArr.length; i++) {
            if (prefixList.length >= 6)
                break;
            var prefix = pathArr.slice(0, i + 1);
            prefix = prefix.join("/");
            prefixList.push(prefix);
        }
        return prefixList;
    }

    function generatePrefixSuffix(hostSuffixList, pathPrefixList) {
        var prefixSuffixList = [];
        for (var i = 0; i < hostSuffixList.length; i++) {
            for (var j = 0; j < pathPrefixList.length; j++) {
                var prefixSuffix = hostSuffixList[i] + pathPrefixList[j];
                if (prefixSuffixList.indexOf(prefixSuffix) == -1) {
                    prefixSuffixList.push(prefixSuffix);
                }
            }
        }
        return prefixSuffixList;
    }

    function getPrefixSuffixExpressions(url) {
        var urlObject = new URL(url);
        var hostSuffixList = getHostSuffix(urlObject.hostname);
        var pathPrefixList = getPathPrefix(urlObject.pathname, urlObject.search);
        return generatePrefixSuffix(hostSuffixList, pathPrefixList);
    }

    return {
        getPrefixSuffixExpressions: getPrefixSuffixExpressions
    }
}

function HashGenerator() {
    var urlFormatter = URLFormatter();
    var urlCanonicalizer = URLCanonicalizer();
    var urlPrefixSuffix = URLPrefixSuffix();

    function isNotValidUrl(url) {
        return !url || !/(http|https):\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/.*)*/.test(url)
    }

    function calculateHash(url) {
        var tokens = sjcl.hash.sha256.hash(url);
        var byteRep = [];
        for (var i = 0; i < tokens.length; i++) {
            var tokenByte = [];
            var tokenBuffer = new Uint32Array([tokens[i]]).buffer;
            var arr = new Uint8Array(tokenBuffer);
            for (var j = 0; j < arr.length; j++) {
                tokenByte.push(arr[j]);
            }
            tokenByte.reverse();
            byteRep = byteRep.concat(tokenByte);
        }
        var sha256Hash = '';
        for (var k = 0; k < byteRep.length; k++) {
            sha256Hash = sha256Hash + String.fromCharCode(byteRep[k]);
        }
        return sha256Hash;
    }

    function getAllHash(url) {
        var urlHashes = [];
        url = urlFormatter.formatUrl(url);
        url = urlCanonicalizer.canonicalizeUrl(url);
        var urlPrefixSuffixExpressions = urlPrefixSuffix.getPrefixSuffixExpressions(url);
        for (var i = 0; i < urlPrefixSuffixExpressions.length; i++) {
            var expression = {};
            expression[HashApiConstants.candidateUrl] = urlPrefixSuffixExpressions[i];
            expression[HashApiConstants.sha256code] = calculateHash(urlPrefixSuffixExpressions[i]);
            urlHashes.push(expression);
        }
        return urlHashes;
    }

    return {
        getAllHash: getAllHash
    }
}

function ValidationReponseGenerator() {
    var attribute = {};
    var validationResponseAttributes = {
        attributes: "@attributes",
        threat: "threat",
        threatType: "threatType"
    };

    var threatTypes = [
        "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION", "THREAT_TYPE_UNSPECIFIED"
    ];

    var displayStringMap = {
        "THREAT_TYPE_UNSPECIFIED": "Other Miscellaneous Threats",
        "MALWARE": "Malware",
        "SOCIAL_ENGINEERING": "Social Engineering",
        "UNWANTED_SOFTWARE": "Unwanted Software",
        "POTENTIALLY_HARMFUL_APPLICATION": "Potentially Harmful Application",
        "None": "None"
    };

    function updateBasicDetails(url) {
        attribute[validationResponseAttributes.threat] = {};
        attribute['id'] = url;
        attribute['br'] = 'u';
        attribute['domain'] = false;
    }

    function updateUnknownFlag(isUnknown, threat) {
        attribute['sr'] = isUnknown ? 'u' : (threat ? 'b' : 'g');
    }

    function updateThreatDetails(threat) {
        attribute['r'] = threat ? 'b' : 'g';
        attribute[validationResponseAttributes.threatType] = (threat && threat[HashApiConstants.threatTypes].length > 0) ? threat[HashApiConstants.threatTypes][0] : 'None';
    }

    function generateResponse(threat, url, isUnknown) {
        var tempObj = {};
        attribute = {};
        if (threat) {
            threat = threat.threat;
        }
        attribute = {};
        updateBasicDetails(url);
        updateUnknownFlag(isUnknown, threat);
        updateThreatDetails(threat);
        for (let j = 0; j < threatTypes.length; j++) {
            var threatType = {};
            threatType.status = !!(threat && threat[HashApiConstants.threatTypes].indexOf(threatTypes[j]) > -1);
            threatType.value = displayStringMap[threatTypes[j]];
            attribute[validationResponseAttributes.threat][threatTypes[j]] = threatType;
        }
        tempObj[validationResponseAttributes.attributes] = attribute;
        return tempObj;
    }

    return {
        generateResponse: generateResponse
    }
}


function UrlValidator() {
    var responseGenerator = ValidationReponseGenerator();
    var blackListMaintainer = BlackListMaintainer();
    var hashGenerator = HashGenerator();

    function isUrlPrefixBlackListed(url) {
        var prefixMatches = [];
        var hashData = hashGenerator.getAllHash(url);
        for (var i = 0; i < hashData.length; i++) {
            var candidateUrl = hashData[i][HashApiConstants.candidateUrl];
            var sha256code = hashData[i][HashApiConstants.sha256code];
            for (var j = sha256code.length; j >= 4; j--) {
                var prefix = sha256code.substr(0, j);
                if (blackListMaintainer.getBlackListedPrefixes().indexOf(prefix) > -1) {
                    prefixMatches.push({prefix, sha256code, candidateUrl});
                    break;
                }
            }
        }
        return prefixMatches;
    }

    function isFullHashBlackListed(prefixDetails) {
        var blacklistResponses = [];
        for (var i = 0; i < prefixDetails.length; i++) {
            blacklistResponses.push(new Promise(function (resolve, reject) {
                var comparisonResponse = {};
                var prefix = prefixDetails[i][HashApiConstants.prefix];
                var sha256code = prefixDetails[i][HashApiConstants.sha256code];
                var candidateUrl = prefixDetails[i][HashApiConstants.candidateUrl];
                blackListMaintainer.fetchFullHashDetails(prefix).then(function (fullHashResponse) {
                    var threats = fullHashResponse[HashApiConstants.threats];
                    if (!!threats) {
                        for (var i = 0; i < threats.length; i++) {
                            var threatDetails = threats[i];
                            if (sha256code === atob(threatDetails.hash)) {
                                comparisonResponse = {threat: threatDetails, candidateUrl};
                                break;
                            }
                        }
                    }
                    resolve(comparisonResponse);
                }).catch(function (err) {
                    console.error(err);
                    resolve(comparisonResponse);
                });
            }))
        }
        return blacklistResponses;
    }

    return {
        checkUrlValidity: function (url) {
            return new Promise(function (resolve, reject) {
                var finalValidityResponse = responseGenerator.generateResponse(null, url, true);
                if (blackListMaintainer.hasValidBlackList()) {
                    finalValidityResponse = responseGenerator.generateResponse(null, url, false);
                    let prefixArray = isUrlPrefixBlackListed(url);
                    if (prefixArray.length > 0) {
                        Promise.all(isFullHashBlackListed(prefixArray)).then(function (blackListedResponses) {
                            for (var j = 0; j < blackListedResponses.length; j++) {
                                if (blackListedResponses[j] && Object.keys(blackListedResponses[j]).length > 0) {
                                    finalValidityResponse = responseGenerator.generateResponse(blackListedResponses[j], url, false);
                                    break;
                                }
                            }
                            resolve(finalValidityResponse);
                        });
                    } else {
                        resolve(finalValidityResponse);
                    }
                } else {
                    resolve(finalValidityResponse);
                }
            });
        }
    }

}

var apiResponses = {};
var safeResponse = [{
    "@attributes": {
        "threat": {
            "MALWARE": {"status": false, "value": "Malware"},
            "SOCIAL_ENGINEERING": {"status": false, "value": "Social Engineering"},
            "UNWANTED_SOFTWARE": {"status": false, "value": "Unwanted Software"},
            "POTENTIALLY_HARMFUL_APPLICATION": {"status": false, "value": "Potentially Harmful Application"},
            "THREAT_TYPE_UNSPECIFIED": {"status": false, "value": "Other Miscellaneous Threats"}
        },
        "id": "",
        "br": "u",
        "sr": "g",
        "r": "g",
        "domain": "",
        "threatType": "None"
    }
}];

let urlValidator = UrlValidator();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if ((changeInfo.status === 'complete' || changeInfo.title === 'Security error')
        && !(tab.url.indexOf("https://" + DOMAIN) >= 0 && tab.url.indexOf("search.html") >= 0)) {
        setCurrentUrlStatusInStorage([extractDomain(PIIRemoval(tab.url))], tabId);
    }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        setCurrentUrlStatusInStorage([extractDomain(PIIRemoval(tabs[0].url))], tabs[0].id);
    });

});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.detail) {
        case "verifyCurrentUrl":
            if (!!request.links) {
                let links = request.links;
                if (links[0] !== "")
                    verifySecureCurrentUrl(request.links);
            }
            break;
    }
});

function checkUrls(links) {
    return new Promise(function (resolve, reject) {
        if (links && links.length > 0) {
            var requests = [];
            for (var i = 0; i < links.length; i++) {
                requests.push(urlValidator.checkUrlValidity(links[i]));
            }
            Promise.all(requests).then(function (responses) {
                resolve(responses);
            })
        } else {
            resolve(safeResponse)
        }
    });
}

function getSafeAPIResponseForLinks(links) {
    if (!optInDecider.hasExtSpecFeatureOptIn())
        return;
    if (!!links && links.length == 1) {
        if (!links[0])
            return Promise.resolve(safeResponse);
    }
    return checkUrls(links);
}

function cacheSafetyResponse(domain, response) {
    apiResponses[domain] = response;
}

function verifySecureCurrentUrl(links) {
    var promise = getSafeAPIResponse(links);
    promise.then(function (response) {
        chrome.runtime.sendMessage({
            detail: "displayStatusIcons",
            response: response
        });
        cacheSafetyResponse(links[0], response);
    }).catch(function (err) {
        console.log(err);
    });
}

function setCurrentUrlStatusInStorage(links, tabId) {
    if (!optInDecider.hasExtSpecFeatureOptIn())
        return;
    setDefBrowserActionIcon(tabId);
    if (links[0] !== "") {
        var promise = getSafeAPIResponse(links);
        promise.then(function (response) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                if (links[0] == extractDomain(PIIRemoval(tabs[0].url))) {
                    cacheSafetyResponse(links[0], response);
                    extSpecFeatureStorageUtil.setItem("currentUrlStatus", response);
                }
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
}

function setDefBrowserActionIcon(tabId) {
    chrome.browserAction.setIcon({
        path: "icons/icon128.png",
        tabId: tabId
    });
}

function getSafeAPIResponse(links) {
    if (optInDecider.hasExtSpecFeatureOptIn()) {
        return getSafeAPIResponseForLinks(links);
    } else {
        return new Promise(function (resolve, reject) {
            reject("Feature Not Enabled");
        });
    }
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === 'piiAccept' && newValue === '1') {
            let blackListMaintainer = BlackListMaintainer();
            blackListMaintainer.hasValidBlackList();
        }
    }
});