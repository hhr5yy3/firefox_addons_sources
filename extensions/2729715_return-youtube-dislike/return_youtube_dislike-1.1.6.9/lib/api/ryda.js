KellyShowRate.apiController['ryda'] = {
    
    name : 'Return YouTube Dislike API', 
    link : 'https://returnyoutubedislike.com/', 
    donate : 'https://returnyoutubedislike.com/donate',

    api : 'https://returnyoutubedislikeapi.com/votes?videoId=__VIDEOID__',
    apiRegister : 'https://returnyoutubedislikeapi.com/puzzle/registration?userId=',
    apiAction : 'https://returnyoutubedislikeapi.com/interact/confirmVote',
    apiActionInit : 'https://returnyoutubedislikeapi.com/interact/vote',
    
    sync : true,
     
    updateLikes : false,  
    
    helperMode : true,
    helpersSupport : true,
    
    cfgDefault : {
        enabled : true, 
        enabledAsHelper : false,
        syncData : true,
    },
}

KellyShowRate.apiController['ryda'].updateUserId = function(newId) {
    KellyTools.getBrowser().runtime.sendMessage({method: "setLocalStorageItem", dbName : 'kelly-ryda-registered-uuid', data : newId}, function(response) {})
}

KellyShowRate.apiController['ryda'].validateInitSessionResponse = function(handler, response) {
     
    if (!response) {
        handler.log('validateInitSessionResponse | empty response', true);
        return false;
    }
    
    if (response.status >= 400) {
        handler.log('[validateInitSessionResponse ryda] reset user id', true);
        KellyShowRate.apiController['ryda'].updateUserId(false); // deprecated user id ?
    }
    
    handler.log('[validateInitSessionResponse ryda] Data : ', true);
    handler.log(response.ydata, true);
    
    if (response.error || !response.ydata || !response.ydata.challenge || !response.ydata.difficulty) {
        handler.log('[validateInitSessionResponse ryda] Session request fail : ' + (response.error ? response.error : '') + ' | ' + (!response.ydata ? 'NO DATA' : ''), true);
        return false;
    }
    
    return true;
}

KellyShowRate.apiController['ryda'].prepareActionRequest = function(handler, requestContext, onReady) {
    
    var voteRequestBg = handler.getDefaultBGRequest();
        voteRequestBg.requestCfg = {
        url : KellyShowRate.apiController['ryda'].apiActionInit,       
        timeout : 4,
        fetchParams : { 
            method: 'POST',
            jsonData : {
            userId: requestContext.uuid,
            videoId : requestContext.videoId,
            value: requestContext.type == 'disliked' ? -1 : 1, 
          }
        },
    }; 
    
    if (requestContext.initiator.indexOf('to_neutral') != -1) voteRequestBg.requestCfg.fetchParams.value = 0;
    
    KellyTools.getBrowser().runtime.sendMessage(voteRequestBg, function(response) {
        
        if (!KellyShowRate.apiController['ryda'].validateInitSessionResponse(handler, response)) {
            onReady(false, 'Vote action init fail');
            return;
        }
        
        KellyShowRate.apiController['ryda'].getSessionKey(response.ydata.challenge, response.ydata.difficulty).then(function(sessionId) {
            
            var voteRequestConfirmBg = handler.getDefaultBGRequest();
                voteRequestConfirmBg.requestCfg = {
                url : KellyShowRate.apiController['ryda'].apiAction,       
                timeout : 4,
                fetchParams : { 
                    method: 'POST', 
                    jsonData : {
                    solution : sessionId,
                    userId: requestContext.uuid,
                    videoId : requestContext.videoId,
                  }
                },
            }; 
            
            onReady(voteRequestConfirmBg);
        });
    });
}

KellyShowRate.apiController['ryda'].onPrepareActionRequestStart = function(handler, requestContext, onReady) {
    
    var onPrepareActionWorkEnd = function(resultCfg, error) {
        onReady(resultCfg, error); 
        KellyShowRate.apiController['ryda'].inUse = false;    
        return true;
    }
    
    if (KellyShowRate.apiController['ryda'].inUse) {
        return onPrepareActionWorkEnd(false, 'Action skiped - Requests spam');
    } else if (requestContext.initiator.indexOf('old_action') != -1 && requestContext.initiator.indexOf('to_neutral') == -1) {
        return onPrepareActionWorkEnd(false, 'Action skiped - cancel old state not required');  
    }
    
    KellyShowRate.apiController['ryda'].inUse = 'onPrepareActionRequestStart';
    KellyTools.getBrowser().runtime.sendMessage({method: "getLocalStorageItem", dbName : 'kelly-ryda-registered-uuid'}, function(response) {
        
        if (!response.item) {
            
            KellyTools.getSha256Hash(requestContext.uuid).then(function(uuidHash) {
                
                requestContext.uuid = uuidHash;
                var requestBg = handler.getDefaultBGRequest();
                    requestBg.requestCfg = {
                    url : KellyShowRate.apiController['ryda'].apiRegister + requestContext.uuid,       
                    timeout : 4,
                    fetchParams : { method: 'GET' },
                };
                    
                KellyTools.getBrowser().runtime.sendMessage(requestBg, function(response) {
                    if (!KellyShowRate.apiController['ryda'].validateInitSessionResponse(handler, response)) return onPrepareActionWorkEnd(false, 'Register init Response validation fail');
                    
                    KellyShowRate.apiController['ryda'].getSessionKey(response.ydata.challenge, response.ydata.difficulty).then(function(sessionId) {
                       
                        response.ydata.solution = sessionId;
                        var requestBg = handler.getDefaultBGRequest();
                            requestBg.requestCfg = {
                            url : KellyShowRate.apiController['ryda'].apiRegister + requestContext.uuid,       
                            timeout : 4,
                            fetchParams : { method: 'POST', jsonData : response.ydata },
                        };
                        
                        KellyTools.getBrowser().runtime.sendMessage(requestBg, function(response) {
                            if (response.ydata !== true) return onPrepareActionWorkEnd(false, 'Register fail, response != true');
                            KellyShowRate.apiController['ryda'].updateUserId(requestContext.uuid);
                            KellyShowRate.apiController['ryda'].prepareActionRequest(handler, requestContext, onPrepareActionWorkEnd);
                        }); 
                    });
                });
            });
        } else {
            requestContext.uuid = response.item;
            KellyShowRate.apiController['ryda'].inUse = false;
            KellyShowRate.apiController['ryda'].prepareActionRequest(handler, requestContext, onPrepareActionWorkEnd);
        }
    });    
    
    return true;
}

// current session key generation according to https://github.com/Anarios/return-youtube-dislike/blob/main/Extensions/combined/ryd.background.js

KellyShowRate.apiController['ryda'].getSessionKey = async function(inputKey, diff) {
    
  var input = Uint8Array.from(atob(inputKey), function(c) { return c.charCodeAt(0); });
  var buffer = new ArrayBuffer(20);
  var uInt8View = new Uint8Array(buffer);
  var uInt32View = new Uint32Array(buffer);
  var maxCount = Math.pow(2, diff) * 5;
  var checkZeroesCount = function(uInt8View, diff) {
      var zeroes = 0, value = 0;
      for (let i = 0; i < uInt8View.length; i++) {
        value = uInt8View[i];
        if (value === 0) zeroes += 8;
        else {
          let count = 1;
          if (value >>> 4 === 0) {
            count += 4; value <<= 4;
          }
          if (value >>> 6 === 0) {
            count += 2; value <<= 2;
          }
          zeroes += count - (value >>> 7); break;
        }
      }
      return (zeroes >= diff);
    }

  for (var i = 4; i < 20; i++) uInt8View[i] = input[i - 4];
    
  for (var i = 0; i < maxCount; i++) {
    uInt32View[0] = i;
    var hash = await crypto.subtle.digest("SHA-512", buffer);
    var hashUint8 = new Uint8Array(hash);
    if (checkZeroesCount(hashUint8, diff)) return btoa(String.fromCharCode.apply(null, uInt8View.slice(0, 4)));
  }
}

KellyShowRate.apiController['ryda'].onHelperData = function(handler, helperRequestCfg, helperYData) {
    var currentLog = handler.getNavigation(), ydata = currentLog.browsingLogCurrent ? currentLog.browsingLogCurrent.ydata : false;
    if (!ydata || !helperYData || helperYData.disabledReason || helperRequestCfg.apiId != 'youtubeMetric' || helperRequestCfg.videoId != currentLog.videoId) return;

    if (ydata.dateCreated) ydata.lastUpdate = ydata.dateCreated;

    var percent = 100, showWarningType = false;
    if (ydata.likes > 0 && helperYData.likes > 0) percent = ydata.likes / (helperYData.likes / 100);   

    if (helperYData.likes > 200 && ydata.dislikes == 0) {
        showWarningType = 1;
    } else if (ydata.dislikes < 10 && ydata.viewCount <= 100 && helperYData.likes > 0) {    
        if (percent < 10) showWarningType = 1;
    } else if (percent < 50) showWarningType = 2;
    
    if (showWarningType !== false) {
        ydata.disabledReason = "Old data";  
        ydata.disabledReasonPopup = 'Possible too small information about likes \\ dislikes for this video currently<br>Video not offten viewed by extension users or stats is currently<br>in collecting process.';
    }
}

KellyStorage.apis['ryda'] = KellyShowRate.apiController['ryda'];
