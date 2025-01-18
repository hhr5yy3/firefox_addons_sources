function getLinkMapRes(response) {
    var linkMapRes = {};
    if(response) {
        for (var i = 0; i < response.length; i++) {
            linkMapRes[response[i]["@attributes"]["id"]] = response[i];
        }
    }
    return linkMapRes;
}

var statusType = {
    "untested": {
        "cssClass": "question_safe",
        "name": "UnTested",
        "typeId": "safe"
    },
    "safe": {
        "cssClass": "nt_green_safe",
        "name": "Secure",
        "typeId": "safe"
    },
    "safe_b_s": {
        "cssClass": "nt_green_safe",
        "name": "Safe",
        "typeId": "safe"
    },
    "warning": {
        "cssClass": "red_safe",
        "name": "Not Secure",
        "typeId": "unsafe"
    },
    "caution": {
        "cssClass": "orange_safe",
        "name": "Caution",
        "typeId": "unsafe"
    },
    "warning_s": {
        "cssClass": "orange_safe",
        "name": "Warning",
        "typeId": "unsafe"
    },
    "danger_s_b": {
        "cssClass": "red_safe",
        "name": "not Safe",
        "typeId": "unsafe"
    }
};

function classifyStatus(sr, br) {
    if (sr == 'u') {
        return statusType.untested
    }
    else if ((sr == 'g' || sr == 'r') && br == 'u') {
        return statusType.safe;
    }
    else if (sr == 'b' && (br == 'u' || br == 'g' || br == 'r')) {
        return statusType.warning;
    }
    else if (sr == 'w' && (br == 'u' || br == 'g' || br == 'r')) {
        return statusType.caution;
    }
    else if ((sr == 'g' || sr == 'r') && (br == 'g' || br == 'r')) {
        return statusType.safe_b_s;
    }
    else if ((sr == 'g' || sr == 'r' || sr == 'w') && br == 'w') {
        return statusType.warning_s;
    }
    else if (((sr == 'g' || sr == 'r' || sr == 'w') && br == 'b') || (sr == 'b' && (br == 'b' || br == 'w')))
        return statusType.danger_s_b;
}

function getThreatTypeStatus(obj) {
    var threatTypeStatus = {
        "malware": 0,
        "adware": 0,
        "socialEngg": 0,
        "other": 0
    };
    if (obj["MALWARE"] && obj["MALWARE"].status)
        threatTypeStatus["malware"]++;
    if (obj["SOCIAL_ENGINEERING"] && obj["SOCIAL_ENGINEERING"].status)
        threatTypeStatus["socialEngg"]++;
    if (obj["UNWANTED_SOFTWARE"] && obj["UNWANTED_SOFTWARE"].status)
        threatTypeStatus["adware"]++;
    if (obj["POTENTIALLY_HARMFUL_APPLICATION"] && obj["POTENTIALLY_HARMFUL_APPLICATION"].status)
        threatTypeStatus["other"]++;
    if (obj["POTENTIALLY_HARMFUL_APPLICATION"] && obj["THREAT_TYPE_UNSPECIFIED"].status)
        threatTypeStatus["other"]++;
    return threatTypeStatus;
}
