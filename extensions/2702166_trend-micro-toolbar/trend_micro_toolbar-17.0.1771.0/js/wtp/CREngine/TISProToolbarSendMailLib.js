 (function() {
    function SendMailtoPlugToolbar (params, callback) {
        /* sample
            {params: 
                    { 
                        mailID:20001,
                        paramsIn: {
                            url:"test.unsafeSNS_URL.com",
                            dataTweetId:tweetID,
                            dataScreenName:screenName,
                            dataUserID:userID,
                            dataHasCards:hasCards,
                            dataYouFollow:youFollow,
                            dataYouBlock:youBlock,
                            dataReTweetID:reTweetID,
                            dataReTweeter:reTweeter,
                            dataMentions:mentions
                        }
                    }
                }
        */
        
        if (typeof (CustomizeSendMail2TmpluginToolbar) != 'undefined'){
            /*other browsers can define this function to adaptor */
            CustomizeSendMail2TmpluginToolbar(params);
        } else if (typeof (FireFoxSendMail2TmpluginToolbar) != 'undefined') {
            FireFoxSendMail2TmpluginToolbar(params);
        } else if(typeof (safari) == 'undefined' && typeof (chrome) != 'undefined') {
            // for chrome 
            tbc_sendRequest(TB_ACTIONS.SEND_MAIL_2_TMPLUGIN_TOOLBAR, params, callback);
        } 
    }
    
    window.SendMailtoPlugToolbar = SendMailtoPlugToolbar;
 })();