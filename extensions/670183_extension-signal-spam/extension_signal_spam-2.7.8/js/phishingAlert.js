
    var phishingURL;
    var phishingId=location.search.replace('?','');
    var mouseTimeout;
    var tabId;

    verifrom.message.addListener({'channel':'phishingalert'},function(msg,sender){
        var PARAM=verifrom.dbStorage.get(extensionConfig.appInfo.extensionName+'PARAMS');
        if (!PARAM)
            PARAM=msg.PARAM;
        if (typeof PARAM==="string")
            PARAM=JSON.parse(PARAM);
        phishingURL=msg.url;
        document.getElementById('url').innerText=phishingURL.length>124 ? phishingURL.substring(0,124)+'...' : phishingURL;
        document.getElementById('href').href=phishingURL;

        if (msg.sources && msg.sources.length>0) {
            let partnerLogo=document.getElementById("partnerLogo");
            if (partnerLogo && msg.sources.length>1) {
                $("#alertWithNoPartners").hide();
                $("#alertWithPartners").show();
                let logoIndex=0;
                $(partnerLogo).show();
                let changeLogo=function() {
                    let logo=msg.sources[logoIndex];
                    partnerLogo.setAttribute("src",logo);
                    $(partnerLogo).fadeIn(100,()=>{
                        setTimeout(()=>{
                            $(partnerLogo).fadeOut(100,()=>{
                                logoIndex=(logoIndex+1) % msg.sources.length;
                                changeLogo();
                            });
                        },2000);
                    });
                };
                changeLogo();
            } else
                if (partnerLogo) {
                    $("#alertWithNoPartners").hide();
                    $("#alertWithPartners").show();
                    partnerLogo.setAttribute("src",msg.sources[0]);
                    $(partnerLogo).show();
                }
        } else {
            let partnerLogo=document.getElementById("partnerLogo");
            if (partnerLogo)
                $(partnerLogo).hide();
        }

        document.getElementById('bouton').addEventListener('click', function(e) {
            window.onbeforeunload=undefined;
            verifrom.message.toBackground({action:'store',phishingId:phishingId, data:{url:phishingURL,mutex:true, DBtimeout:Date.now()+parseInt(PARAM.PHISHING_ALERT_TIMEOUT)*1000}},{channel:'phishingalert'});
            document.getElementById('bouton').style.cursor="wait";
            setTimeout(function() {
                window.location.href=phishingURL;
            }, 100);
        });

        document.getElementById('url').addEventListener('click', function(e) {
            e.preventDefault();
            return false;
        });

        document.getElementById('href').addEventListener('mouseover', function(e) {
            mouseTimeout=setTimeout(function() {
                document.getElementById('url').innerText=phishingURL;
            }, 500);
        });

        document.getElementById('href').addEventListener('mouseout', function(e) {
            if (mouseTimeout)
                clearTimeout(mouseTimeout);
            mouseTimeout=undefined;
            document.getElementById('url').textContent=phishingURL.length>124 ? phishingURL.substring(0,124)+'...' : phishingURL;
        });


        document.getElementById('retour').addEventListener('click', function(e) {
            verifrom.message.toBackground({action:'remove',phishingId:phishingId},{channel:'phishingalert'});
            setTimeout(function() {
                window.close();
            },1000);
            window.history.go(-1);
        });

        document.getElementById('negative').addEventListener('click', function(e) {
            var http = new XMLHttpRequest();
            var url = PARAM.URL_FALSE_POSITIVE;
            verifrom.message.toBackground({phishingPageAlert:true,url:phishingURL,phishingHashes:[phishingId.replace(/([^-]*)-.*/,'$1')]},{'channel':'FalsePositive'});
            document.getElementById('faussealerte').innerText=verifrom.locales.getMessage("phishingAlert.falsePositiveOK");
            setTimeout(function() {
                window.location.href=phishingURL;
            }, 500);
        });
    });
    verifrom.dbStorage.init().then(()=>{
        verifrom.message.toBackground({action:'getUrl',phishingId:phishingId},{channel:'phishingalert'});
    }).catch(reason=>{
        verifrom.message.toBackground({action:'getUrl',phishingId:phishingId},{channel:'phishingalert'});
    });
