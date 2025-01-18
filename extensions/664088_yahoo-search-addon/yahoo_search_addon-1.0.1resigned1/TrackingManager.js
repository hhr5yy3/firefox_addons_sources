function TrackingManager(unittest){ //jshint ignore: line

    var trackingEncoder = new TrackingEncoder();
    var logManager = new LogManager();
    var constants= {};
    var browserGap= {};
    var _trackingManager = this;
    
    trackingEncoder.init();
    
    this.init =  function(config){
        constants= config.constants;
        browserGap = config.browserGap;
    };

    function sendBeacon(beaconType, beaconConfig){
        try {
            var logResponse = function(responseText){
                logManager.logDebugMessage("Response Text = " + responseText);
            };

            var trackTypeCur = "";
            if(beaconType.toLowerCase() === constants.TRACKER_PAGE_INFO){
                trackTypeCur = constants.TRACKER_PAGE_INFO_TEMPLATE;
            }
            else if(beaconType.toLowerCase() === constants.TRACKER_CLICK_INFO){
                trackTypeCur = constants.TRACKER_CLICK_INFO_TEMPLATE;
            }
            else{
                logManager.logErrorMessage("Invalid beaconType!");
                return;
            }
            //TODO
            trackTypeCur.trackSpaceID = browserGap.isFirefox || browserGap.isWebExtension ? constants.FF_EXT_SPACE_ID : constants.CHR_EXT_SPACE_ID;

            var objTrackParams= trackTypeCur.trackParams || {},
                trackParams= {},
                trackURL= "";
            
            for (var paramOn in objTrackParams){ //jshint ignore: line
                var paramVal = objTrackParams[paramOn];

                if (paramVal === '{intl}'){
                    paramVal= browserGap.getIntl();
                } else if (paramVal === '{ver}'){
                    paramVal = browserGap.getVersion();
                } else if (paramVal === '{itype}'){
                    paramVal = beaconConfig.params.itype;
                }
                else if (paramVal === '{fr}'){
                    paramVal = browserGap.isChrome ? constants.CHR_EXT_FR_CODE : (browserGap.isWebExtension ? constants.FF_EXT_FR_CODE : '{fr}');
                }
                else if (paramVal === '{ctid}'){
                    paramVal = browserGap.getCTID();
                }else if (paramVal === '{mrkt}'){
                    paramVal = browserGap.getMarket();
                }else if (paramVal === '{sec}'){
                    paramVal = beaconConfig.params.sec;
                } else if (paramVal === '{slk}'){
                    paramVal = beaconConfig.params.slk;
                } else if (paramVal === '{tar}'){
                    if(beaconConfig.params.tar){
                        paramVal = beaconConfig.params.tar;
                    } else{
                        paramVal = null;
                    }
                } else if (paramVal === '{_p}'){
                    paramVal = beaconConfig.params._p;
                } else if (paramVal === '{gpos}'){
                    paramVal = beaconConfig.params.gpos;
                } else if (paramVal === '{cset}') {
                    if(beaconConfig.params.cset){
                        paramVal = beaconConfig.params.cset;
                    } else{
                        paramVal = null;
                    }
                } else if (paramVal === '{mset}')
                {
                    if(beaconConfig.params.mset){
                        paramVal = beaconConfig.params.mset;
                    } else{
                        paramVal = null;
                    }
                } else if (paramVal === '{browser}'){
                    paramVal = beaconConfig.params.browser;
                } else if (paramVal === '{ext}'){
                    if(beaconConfig.params.delc){
                        paramVal = beaconConfig.params.delc;
                    } else {
                        paramVal = "ext";
                    }
                } else if (paramVal === '{os}'){
                    paramVal = browserGap.getOS();
                }

                if(paramVal){
                    trackParams[paramOn] = paramVal;
                }
            }
            if(unittest){
                trackTypeCur.useYLC = false;
            }
            if (trackTypeCur.useYLC) {
                trackParams[YAHOO.ULT.SRC_SPACEID_KEY]= trackTypeCur.trackSpaceID;
                trackURL= YAHOO.ULT.beacon_click(trackParams);
            }
            else {
                trackParams.s = trackTypeCur.trackSpaceID.toString();
                trackURL = ("https://geo.yahoo.com/p?t=" + Math.random());
                for (var paramCur in trackParams) { //jshint ignore: line
                    trackURL += ("&" + paramCur + "=" + trackParams[paramCur]);
                }
            }
            logManager.logDebugMessage("Track URL is " + trackURL);
            browserGap.xhr(trackURL, logResponse);
        }
        catch (e) {
            logManager.logErrorMessage('Tracker.sendBeacon error: ' + e.message);
        }
    }

    function initAlivePing(browser){
        var beaconConfig = {},
            beaconParams = {};

        if(browserGap.isFirefox){
            beaconParams.cset = browserGap.getCurrentSearchProviderName();
        }
        beaconParams.itype = constants.TRACKER_ITYPE_ALIVE;
        beaconParams.browser = browser;
        beaconConfig.params = beaconParams;
        _trackingManager.sendBeacon(constants.TRACKER_PAGE_INFO, beaconConfig);
        setInterval(function(){
            if(browserGap.isFirefox){
                beaconParams.cset = browserGap.getCurrentSearchProviderName();
            }
            beaconConfig.params = beaconParams;
            _trackingManager.sendBeacon(constants.TRACKER_PAGE_INFO,
                beaconConfig);
        }, constants.TRACKER_ALIVE_PING_INTERVAL);
    }

    this.sendBeacon = sendBeacon;
    this.initAlivePing = initAlivePing;
    return this;
}