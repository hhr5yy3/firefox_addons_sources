function findFacebookObj(objInsertNode) {
    var $ = TMExt_$;
    var i = 1;
    var tempParent = $(objInsertNode).parent();
    while(!tempParent.hasClass("userContentWrapper") && i < 10) {
        i++;
        tempParent = tempParent.parent();
    }
    if(tempParent.hasClass("userContentWrapper")) {
        return tempParent;
    }
    return null;
}

function findTwitterObj(objInsertNode) {
    var $ = TMExt_$;
    var i = 1;
    var tempParent = $(objInsertNode).parent();
    while(!tempParent.hasClass("tweet") && !tempParent.hasClass("ProfileTweet") && i < 10) {
        i++;
        tempParent = tempParent.parent();
    }
    if(tempParent.hasClass("tweet") || tempParent.hasClass("ProfileTweet")) {
        return tempParent;
    }
    return null;
}

function TSNSFeedbackUnsafeURL(objResult) {
    if (!IsInSNSandRequiredForThisLevel(objResult)) {
        return;
    }
    try{
        if ( /twitter\.com/.test(document.location)){
            // feedback 
            PSDebug.log("in TSNSFeedbackUnsafeURL");
            var objInsertNode = objResult.FindInsertNode();
            var tweetObj = findTwitterObj(objInsertNode);
            
            if(!tweetObj){
                return;
            }
            
            var dateTime;
            var lang;
            var text;
            var textObj;
            if(tweetObj.hasClass("tweet")) {
                dateTime = tweetObj.find("._timestamp").attr("data-time");
                textObj = tweetObj.find(".tweet-text");
            } else if(tweetObj.hasClass("ProfileTweet")){
                dateTime = tweetObj.find(".js-short-timestamp").attr("data-time");
                textObj = tweetObj.find(".ProfileTweet-text");
            } else {
                return;
            }
            
            lang = textObj.attr("lang");
            text = textObj.text().trim().replace(new RegExp(String.fromCharCode(160), "gi"), ""); //remove the &nbsp;
             
            var tweetID = tweetObj.attr("data-tweet-id");
            var screenName = tweetObj.attr("data-screen-name");
            var userID = tweetObj.attr("data-user-id");
            var hasCards = !!(tweetObj.attr("data-has-cards")) + "";
            var youFollow = tweetObj.attr("data-you-follow");
            var youBlock = tweetObj.attr("data-you-block");
            //optional
            var reTweetID = tweetObj.attr("data-retweet-id");
            var reTweeter = tweetObj.attr("data-retweeter");
            var reTweeterId = tweetObj.find(".js-retweet-text a.js-user-profile-link").attr("data-user-id");
            var mentions = tweetObj.attr("data-mentions") || "";
            
            var expendUrl = TMExt_$(objInsertNode).attr("data-expanded-url");
            var protectTweet = !!(tweetObj.attr("data-protected")) + "";
            var hashTag;
            
            var tagArray = textObj.find("a[data-query-source='hashtag_click'] b");
            if(tagArray.length) {
                hashTag = [];
                for(var i = 0; i < tagArray.length; i++) {
                    hashTag.push(TMExt_$(tagArray[i]).text());
                }
            }
            
            var urlLevel = objResult.level;
            var url = objResult.link
            
            PSDebug.log("check data-tweet-id:",tweetID);
            if(tweetID) {
                PSDebug.log("do feedback ");
                
                SendMailtoPlugToolbar(JSON.stringify({params: 
                    { 
                        actionID:20001,
                        paramsIn: {
                            webSite:"twitter",
                            url:[url],
                            urlLevel:[urlLevel],
                            dataTweetId:tweetID,
                            dataScreenName:screenName,
                            dataUserID:userID,
                            dataHasCards:hasCards,
                            dataYouFollow:youFollow,
                            dataYouBlock:youBlock,
                            dataMentions:mentions.split(" "),
                            dataReScreenName:reTweeter,                        
                            dataReTweetId:reTweetID,
                            dataReTweeterUserId:reTweeterId,
                            dateTime:dateTime,
                            lang:lang,
                            text:text,
                            dataExpendUrl:[expendUrl],
                            hashTag : hashTag,
                            dataProtect:protectTweet
                        }
                    }
                }));
            }
        } else if ( /facebook\.com/.test(document.location)){
            var objInsertNode = objResult.FindInsertNode();
            var facebookObj = findFacebookObj(objInsertNode);
            if(!facebookObj) {
                return;
            }
            var accessPrivilege = facebookObj.find("a[data-hover='tooltip']:eq(0)").attr("aria-label");
            var accountName =  facebookObj.find("h5 a:eq(0),h6 a:eq(0)").text();
            var accountLink =  facebookObj.find("h5 a:eq(0),h6 a:eq(0)").attr("href");
            var location = facebookObj.find("h5 a:eq(1),h6 a:eq(1)").text() || facebookObj.find(".userContent .userContentSecondary a").text();
            var dateTime = facebookObj.find("abbr").attr("data-utime");
            var userContent = facebookObj.find(".userContent").text();
            
            if(accessPrivilege != "公開" && accessPrivilege != "公开" && accessPrivilege != "public" && accessPrivilege != "Public") {
                return;
            }
            
            var urlLevel = objResult.level;
            var url = objResult.link
            
            if(dateTime) {
                PSDebug.log("do feedback ");
                
                SendMailtoPlugToolbar(JSON.stringify({params: 
                    { 
                        actionID:20001,
                        paramsIn: {
                            "webSite":"facebook",
                            'url':[url],
                            'accountName':accountName,
                            'accountLink':accountLink,
                            'accessPrivilege':accessPrivilege,
                            'dateTime':dateTime,
                            'userContent':userContent,
                            'urlLevel':[urlLevel],
                            'place':location
                        }
                    }
                }));
            }
        }
    }catch(e){
        if (e.number && e.description) {
            //IE
            var err_msg = 'catch err:[\n';
            err_msg += 'Facility Code: ' + (e.number >> 16 & 0x1FFF) + '\n';
            err_msg += 'Number: ' + (e.number & 0xFFFF) + '\n';
            err_msg += 'Description: ' + e.description + '\n';
            TMExt_debug(err_msg);
        }else {
            //chrome & FireFox
            TMExt_debug(e);
        }
    }
}


function IsInSNSandRequiredForThisLevel(objResult) {
    var isMalicious = objResult.level == 3 || objResult.level == 5 || objResult.level == 7 || objResult.level == 8 || false;
    
    if (!isMalicious){
        return false;
    } 
    
    var isMeetPattern = false;
    try {
        //Facebook Share
        if (/facebook\.com/.test(document.location) || /twitter\.com/.test(document.location)) {
           isMeetPattern = true;
        }
    }catch (e) {
        TMExt_debug(e);
    }

    return isMeetPattern;
}
