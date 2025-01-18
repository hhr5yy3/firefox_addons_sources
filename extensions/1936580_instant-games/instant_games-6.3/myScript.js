chrome.runtime.sendMessage({ myWindowId: "myWindowId" }, function (response) {
	if(response == undefined || Object.keys(response).length == 0) return;
    if (response.myWindowId > 0) {

        $(document).ready(function() {
            if ($('#extapptopbar').length == 0) {
				$("body").append(
                '<div id="extapptopbar" style="position:fixed;left:0;right:0;top:0; z-index:120;height:29px;background-color:#3f51b5;border-bottom: 1px solid; border-bottom-color: #000000;">' +
				'<div style="margin: 0 auto;text-align: center; display: flex;">' +
				'       <div style="justify-content: flex-start;order:-1;flex: 1 1 auto;align-items: center;display: inline-flex;">' +
				'		<button id="temporaryDrawer" title="Show More" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded md-light" style="padding: 0px;width: 29px;height: 29px;margin-left: 15%;">menu</button>' +
				'		</div>' +
				'		<div style="justify-content: flex-end;order: 1;flex: 1 1 auto;align-items: center;min-width: 395px;">' +
				'		<button id="backInput" title="Back" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded md-light" style="padding: 0px;width: 25px;height: 29px;">arrow_back</button>' +
				'		<button id="forwardInput" title="Forward" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded md-light" style="padding: 0px;width: 25px;height: 29px;">arrow_forward</button>' +
				'		<button id="refreshInput" title="Refresh" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded md-light" style="padding: 0px;width: 25px;height: 29px;">refresh</button>' +
				'		<button id="redirectSiteInput" title="' + i18n.get("settings") + '" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded md-light" style="padding: 0px;width: 25px;height: 29px;">settings</button>' +
				'		<button id="makeSideBar" title="SideBar ON/OFF" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded md-light" style="padding: 0px;width: 25px;height: 29px;">crop_portrait</button>' +
                '		<button id="makeWideBar" title="WideBar ON/OFF" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded md-light" style="padding: 0px;width: 25px;height: 29px;">crop_landscape</button>' +
				'		<div style="display: inline-flex;margin-left: 6px;"><div id="autostart" title="' + i18n.get("start-chrome") + '" style="margin-top: 3px;" class="mdc-switch"><div class="mdc-switch__track"></div><div class="mdc-switch__thumb-underlay"><div class="mdc-switch__thumb"><input type="checkbox" id="autoStartId" class="mdc-switch__native-control" role="switch"></div></div></div><label class="" style="color: white;font-size: 15px;" title="' + i18n.get("start-chrome") + '" for="autoStartId">AutoStart</label></div>' +
				'		<button id="premiumFeatures" title="' + i18n.get("premium-features") + '" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded mdc-ripple-upgraded md-light" style="padding: 0px;width: 25px;height: 29px;">shopping_cart</button>' +
				'		</div>' +
                '</div></div>');
				
				$("body").append('	<aside class="mdc-drawer mdc-drawer--modal" style="z-index: 999;top: 0px; border: black;">' +
				'      <a id="clickHome" href="javascript:void(0)" style="">' +
				'        <header class="mdc-drawer__header" style="background: url(' + chrome.runtime.getURL("img/web_store_instantGames.png") + ') no-repeat center; background-size: cover; height: 157px;"></header>' +
				'      </a>' +
				'      <div class="mdc-drawer__content">' +
				'        <nav class="mdc-list">' +
				//'            <a class="mdc-list-item" id="multiWindowAccount" href="javascript:void(0)">' +
				//'              <img alt="Multi Window - Account" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon_multi_account.png") + '" style="max-height: 22px; margin-right: 32px;">Multi Window - Account</a>' +
				'            <a class="mdc-list-item" id="changeSkin" href="javascript:void(0)">' +
				'              <img alt="Theme - Skin Color" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon-theme.png") + '" style="max-height: 22px; margin-right: 32px;">Theme - Skin Color</a>' +
				'          <hr class="mdc-list-divider">' +
				'            <a class="mdc-list-item" id="availableExtensions" href="' + chrome.i18n.getMessage("chrome_extension_download_all_link") + '" target="_blank">' +
				'              <img alt="Extensions Catalog" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon-firefox.png") + '" style="max-height: 21px; margin-right: 32px;">Extensions Catalog</a>' +
				'            <a class="mdc-list-item" id="changelog" href="' + chrome.i18n.getMessage("chrome_extension_link") + '#changelog" target="_blank">' +
				'              <img alt="Changelog" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon-changelog.png") + '" style="max-height: 21px; margin-right: 32px;">Changelog</a>' +
				'            <a class="mdc-list-item" id="informationNews" href="javascript:void(0)">' +
				'              <img alt="Tips - Tricks - News" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon-info.png") + '" style="max-height: 21px; margin-right: 32px;">Tips - Tricks - News</a>' +
				'            <a class="mdc-list-item" id="incognitoBrowse" href="javascript:void(0)">' +
				'              <img alt="Incognito Browsing" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon-incognito.png") + '" style="max-height: 21px; margin-right: 32px;">Incognito Browsing</a>' +				
				'          <hr class="mdc-list-divider">' +
				'            <a class="mdc-list-item" id="helpTutorial" href="javascript:void(0)">' +
				'              <img alt="Mini Tutorial" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon-mini-tutorial.png") + '" style="max-height: 21px; margin-right: 32px;">Mini Tutorial</a>' +
				'            <a class="mdc-list-item" id="rateReview" href="https://addons.mozilla.org/addon/' + chrome.runtime.id + '" target="_blank">' +
				'              <img alt="Rate & Review" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon-star.png") + '" style="max-height: 21px; margin-right: 32px;">Rate & Review</a>' +
				'            <a class="mdc-list-item" id="shareSocialMedia" href="javascript:void(0)">' +
				'              <img alt="Share" class="appsImages" src="' + chrome.runtime.getURL("img/topbar/icon-share.png") + '" style="max-height: 21px; margin-right: 32px;">Share</a>' +
				'        </nav>' +
				'      </div>' +
				'</aside>'+
				'<div class="mdc-drawer-scrim" style="z-index: 998;"></div>');
				startTemporaryDrawer();
            }
			/*** Helpers on bottom of window ***/
            $("body").append('<a title="' + i18n.get("return-top") + '" href="javascript:" id="return-to-top" style="bottom: 121px;right: 1px;" class="fab-simple-oik"><img src="'+chrome.runtime.getURL("img/Chevron_up_font_awesome2.png")+'" style="top: 6px;"></img></a>');
			$("body").append('<a title="' + i18n.get("screenshot-window") + '" href="javascript:" id="html-to-image" style="bottom: 91px;right: 1px;" class="fab-simple-oik"><img src="'+chrome.runtime.getURL("img/icon_camera_font_awesome2.png")+'" style="top: 6px;"></img></a>');
			$("body").append('<a title="' + i18n.get("emoji-add") + '" href="javascript:" id="emoji-add" style="bottom: 61px;right: 1px;" class="fab-simple-oik"><img src="' + chrome.runtime.getURL("img/icon_emoji.png") + '" style="width: 22px;top: 4px; left: 4px;"></img></a>');
			$("body").append('<a title="' + i18n.get("incognito-mode") + '" href="javascript:" id="incognito-mode" style="bottom: 31px;right: 1px;" class="fab-simple-oik"><img src="'+chrome.runtime.getURL("img/incognito-icon-off.png")+'"></img></a>');
			$("body").append('<a title="' + i18n.get("collapse-topbar") + '" href="javascript:" id="collapse-topbar" style="bottom: 1px;right: 1px;" class="fab-simple-oik"><img src="' + chrome.runtime.getURL("img/icon_collapse_topbar_on.png") + '" style="width: 22px;left: 4px;top: 4px;"></img></a>');

			var toastrSemaphoreOnce = true;
			/* Show a Toast if extension is in Incognito */
			if(chrome.extension.inIncognitoContext){
				toastr.options = { "positionClass": "toast-bottom-full-width", "timeOut": "3000", "progressBar": "true", "extendedTimeOut": "1500", onclick : function () { clickIncognitoBrowse(); }};
				toastr.info('Incognito Browsing: ' + (chrome.extension.inIncognitoContext ? "Enabled" : "Disabled"));			
			}
			/* Show a Toast if extension was updated */
			setTimeout(function(){
				chrome.runtime.sendMessage({ extensionUpdated: "extensionUpdated" }, function (response) {
					if(response == undefined || Object.keys(response).length == 0) return;
					if (response.extensionUpdated != "") {
						toastr.options = { "positionClass": "toast-bottom-full-width", "timeOut": "30000", "progressBar": "true", "closeButton" : "true", "extendedTimeOut": "5000", onclick : function () { window.open($("#changelog").attr("href")); }};
						toastr.info(i18n.get("extension-updated-1") + response.extensionUpdated + '<br>' + i18n.get("extension-updated-2"));	
					}
				});	
			}, 500);
			/* Show a fixed Toast for Freemium Ext */
			setTimeout(function(){
				if(toastrSemaphoreOnce){
					chrome.runtime.sendMessage({ hasFreemiumActive: "freemiumAlert" }, function (response) {
						if(response == undefined || Object.keys(response).length == 0) return;
						if (response.freemiumAlert > 0) {
							if (hasFreemium == false) {
								toastrSemaphoreOnce = false;
								clickFremium();
							}
						}
					});
				}
			}, 700);
			/* Show a fixed Toast for follow us on Social Networks */
			setTimeout(function(){
				if(toastrSemaphoreOnce){
					chrome.runtime.sendMessage({ supportUs: "supportUs" }, function (response) {
						if(response == undefined || Object.keys(response).length == 0) return;
						if (response.supportUs > 0) {
							toastrSemaphoreOnce = false;
							clickSocialMedia();
						}
					});
				}
			}, 1500);
			/* Show a fixed Toast for remote messages */
			setTimeout(function(){
				if(toastrSemaphoreOnce){
					chrome.runtime.sendMessage({ remoteMessage: "remoteMessage" }, function (response) {
						if(response == undefined || Object.keys(response).length == 0) return;
						if (response.remoteMessage != "") {
							toastrSemaphoreOnce = false;
							remoteMessage = response.remoteMessage;
							toastr.options = { "positionClass": "toast-top-full-width", "timeOut": "0", "progressBar": "true", "closeButton" : "true", "extendedTimeOut": "0", "tapToDismiss" : false };
							var t = toastr.info(remoteMessage[remoteMessageIndex]);
							t.attr('id', 'remoteMessageToastr');
							$('#remoteMessageToastr').append('<span id="remoteMessageSpan" style="font-weight: 600;opacity: 0.75;top: 0.4em;left: 0.4em;position: absolute;">'+ (remoteMessageIndex + 1) + '/'+ remoteMessage.length +'</span>');
							manageRemoteMessage();
						}
					});
				}
			}, 2100);
			incognitoModeActive();
			collapseTopbarSelection(collapseTopbar);
			
			/*************** BIND BUTTONS ***************/
            bindButtonsActions();
        });

		var userLicenses; /*Social Media Hub only*/
		
		var collapseTopbar = true;
		collapseTopbarActive();
		var remoteMessage = [];
		var remoteMessageIndex = 0;

		var hasFreemium = true;
		function checkFreemium() { chrome.runtime.sendMessage({ hasFreemiumActive: "status" }, function (response) { if (response == undefined || Object.keys(response).length == 0){ hasFreemium = false;}	else if (response.hasFreemiumActive == "true"){ hasFreemium = true;} else if (response.hasFreemiumActive == "false"){ hasFreemium = false;}});setTimeout(checkFreemium,15000);} checkFreemium(); /* HasFreemium */

		var startRefresh = new Date().getTime();
		var delayedStartOnce = true;
		
		var windowType = 'popup';
		var extensionChromeRestarted = 0;
		var previousBadgeSocial = 4;
		var previousActiveSocialMedia = '';

        setInterval(function () {
			
			//remove the target blank on featured games
			$('[rel="noopener"]').attr("target", "");
			
			/*** Social media hub ***/
            /*************** PREMIUM FEATURES ***************/
			try{
				chrome.runtime.sendMessage({ licenseStatus: "licenseStatus" }, function (response) {
					//FREE_TRIAL, FULL, ERROR -> abre com tudo desbloqueado
					if(response == undefined || Object.keys(response).length == 0) return;
					if (response.licenseStatus != null && response.licenseStatus != undefined) {
						if(response.licenseStatus === "FREE_TRIAL_EXPIRED"){
							location.href = chrome.runtime.getURL("onInstalled/trialPage.html");
						} else if (response.licenseStatus === "NONE" ){
							location.href = chrome.runtime.getURL("onInstalled/loginOauthPage.html");
						} else if (response.licenseStatus === "ERROR"){}
					} else {
						var endRefresh = new Date().getTime();
						if (endRefresh - startRefresh > 10000) {
							location.href = chrome.runtime.getURL("onInstalled/loginOauthPage.html");
						}
					}
				});
			} catch(err){
				if(extensionChromeRestarted >= 0){
					extensionChromeRestarted ++;
					if(extensionChromeRestarted > 30){
						toastr.options = { "positionClass": "toast-top-full-width", "timeOut": "0", "progressBar": "true", "closeButton": "true", "extendedTimeOut": "0", "tapToDismiss" : false };
						toastr.info('<div id="extensionChromeRestarted" style="text-align: center;"><b>'+ i18n.get("toastr-extension-chrome-restarted") +'</b></div><br>' +
									'<div style="text-align: center;display: block;"><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;">Close</button></div>');
						document.getElementById('surpriseBtn').addEventListener('click', function () { $('#toast-container').fadeOut("slow", function () { $('#toast-container').remove(); }); });
						extensionChromeRestarted = -1;
					}
				}
			}
			
            chrome.runtime.sendMessage({ activeSocialMedia: "activeSocialMedia" }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
				if(response.activeSocialMedia != previousActiveSocialMedia){
					previousActiveSocialMedia = response.activeSocialMedia;
					if(response.activeSocialMedia.charAt(0) === "1") $("#goFacebook").show();
					else $("#goFacebook").hide();
					if(response.activeSocialMedia.charAt(1) === "1") $("#goInstagram").show();
					else $("#goInstagram").hide();
					if(response.activeSocialMedia.charAt(2) === "1") $("#goTwitter").show();
					else $("#goTwitter").hide();
					if(response.activeSocialMedia.charAt(3) === "1") $("#goGooglePlus").show();
					else $("#goGooglePlus").hide();
					if(response.activeSocialMedia.charAt(4) === "1") $("#goWhatsApp").show();
					else $("#goWhatsApp").hide();
					if (response.activeSocialMedia.charAt(5) === "1") $("#goTumblr").show();
					else $("#goTumblr").hide();
					if (response.activeSocialMedia.charAt(6) === "1") $("#goPinterest").show();
					else $("#goPinterest").hide();
					if (response.activeSocialMedia.charAt(7) === "1") $("#goLinkedin").show();
					else $("#goLinkedin").hide();
					if (response.activeSocialMedia.charAt(8) === "1") $("#goMessenger").show();
					else $("#goMessenger").hide();
					if (response.activeSocialMedia.charAt(9) === "1") $("#goSkype").show();
					else $("#goSkype").hide();
					if (response.activeSocialMedia.charAt(10) === "1") $("#goHangouts").show();
					else $("#goHangouts").hide();
					if (response.activeSocialMedia.charAt(11) === "1") $("#goYoutube").show();
					else $("#goYoutube").hide();
					if (response.activeSocialMedia.charAt(12) === "1") $("#goAllo").show();
					else $("#goAllo").hide();
					if (response.activeSocialMedia.charAt(13) === "1") $("#goTinder").show();
					else $("#goTinder").hide();
				}
            });

            chrome.runtime.sendMessage({ badgeSocial: "badgeSocial" }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
                if(response.badgeSocial != '' && previousBadgeSocial > 4){
					previousBadgeSocial = 0;
					var socialbadges = response.badgeSocial.split('#');
					
					if(socialbadges[0] != "") {
						$("#goFacebook").prop('title', 'Facebook' + socialbadges[0] ); 
						$("#goFacebook img").attr("src", chrome.runtime.getURL("img/topbar/icon-facebook-notify.png"));
						if(socialbadges[0].indexOf("message") >= 0) $("#goMessenger img").attr("src", chrome.runtime.getURL("img/topbar/icon-messenger-notify.png"));
					} else {
						$("#goFacebook").prop('title', 'Facebook');
						$("#goFacebook img").attr("src", chrome.runtime.getURL("img/topbar/icon-facebook.png"));
						$("#goMessenger img").attr("src", chrome.runtime.getURL("img/topbar/icon-messenger.png"));
					}
					if(socialbadges[1] != "") {
						$("#goInstagram").prop('title', 'Instagram' + socialbadges[1] ); 
						$("#goInstagram img").attr("src", chrome.runtime.getURL("img/topbar/icon-instagram-notify.png"));
					} else {
						$("#goInstagram").prop('title', 'Instagram');
						$("#goInstagram img").attr("src", chrome.runtime.getURL("img/topbar/icon-instagram.png"));
					}
					if(socialbadges[2] != "") {
						$("#goHangouts").prop('title', 'Google Hangouts' + socialbadges[2] ); 
						$("#goHangouts img").attr("src", chrome.runtime.getURL("img/topbar/icon-hangouts-notify.png"));
					} else {
						$("#goHangouts").prop('title', 'Google Hangouts');
						$("#goHangouts img").attr("src", chrome.runtime.getURL("img/topbar/icon-hangouts.png"));
					}
					if(socialbadges[3] != "") {
						$("#goTwitter").prop('title', 'Twitter' + socialbadges[3] ); 
						$("#goTwitter img").attr("src", chrome.runtime.getURL("img/topbar/icon-twitter-notify.png"));
					} else {
						$("#goTwitter").prop('title', 'Twitter');
						$("#goTwitter img").attr("src", chrome.runtime.getURL("img/topbar/icon-twitter.png"));
					}
					if(socialbadges[4] != "") {
						$("#goSkype").prop('title', 'Skype' + socialbadges[4] ); 
						$("#goSkype img").attr("src", chrome.runtime.getURL("img/topbar/icon-skype-notify.png"));
					} else {
						$("#goSkype").prop('title', 'Skype');
						$("#goSkype img").attr("src", chrome.runtime.getURL("img/topbar/icon-skype.png"));
					}
					if(socialbadges[5] != "") {
						$("#goLinkedin").prop('title', 'LinkedIn' + socialbadges[5] ); 
						$("#goLinkedin img").attr("src", chrome.runtime.getURL("img/topbar/icon-linkedin-notify.png"));
					} else {
						$("#goLinkedin").prop('title', 'LinkedIn');
						$("#goLinkedin img").attr("src", chrome.runtime.getURL("img/topbar/icon-linkedin.png"));
					}
					if(socialbadges[6] != "") {
						$("#goTelegram").prop('title', 'Telegram' + socialbadges[6] ); 
						$("#goTelegram img").attr("src", chrome.runtime.getURL("img/topbar/icon-telegram-notify.png"));
					} else {
						$("#goTelegram").prop('title', 'Telegram');
						$("#goTelegram img").attr("src", chrome.runtime.getURL("img/topbar/icon-telegram.png"));
					}
					if(socialbadges[7] != "") {
						$("#goWhatsApp").prop('title', 'WhatsApp' + socialbadges[7] ); 
						$("#goWhatsApp img").attr("src", chrome.runtime.getURL("img/topbar/icon-whatsapp-notify.png"));
					} else {
						$("#goWhatsApp").prop('title', 'WhatsApp');
						$("#goWhatsApp img").attr("src", chrome.runtime.getURL("img/topbar/icon-whatsapp.png"));
					}
					if(socialbadges[8] != "") {
						$("#goTinder").prop('title', 'Tinder' + socialbadges[8] ); 
						$("#goTinder img").attr("src", chrome.runtime.getURL("img/topbar/icon-tinder-notify.png"));
					} else {
						$("#goTinder").prop('title', 'Tinder');
						$("#goTinder img").attr("src", chrome.runtime.getURL("img/topbar/icon-tinder.png"));
					}
				} else {
					previousBadgeSocial++;
				}
            });
			/*** Social media hub ***/

            chrome.runtime.sendMessage({ autoStart: "autoStart" }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
                if (response.autoStart === "true") {
                    $("#autoStartId").prop("checked", "checked");
					$("#autostart").addClass("mdc-switch--checked");
                } else {
                    $("#autoStartId").removeAttr("checked");
					$("#autostart").removeClass("mdc-switch--checked");
                }
            });
			
			if(delayedStartOnce){
				var endRefresh = new Date().getTime();
				if ((typeof userLicenses !== 'undefined' && userLicenses !== null) || (endRefresh - startRefresh > 8000)){
					delayedStart();
					delayedStartOnce = false;
				}
			}

        }, 3000);
		
		function delayedStart() {
			chrome.runtime.sendMessage({ chromeWindowType: "chromeWindowType" }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
                if (response.chromeWindowType === "popup") {
                    windowType = 'popup';
                } else if (response.chromeWindowType === "panel") {
                    windowType = 'panel';
                }
            });

            if (hasFreemium) {
				addThemeSkin("getCurrent");
			}
		}

		function clickHelpTutorial(){
			startTutorial();
		}

        function clickAutoStart() {
            chrome.runtime.sendMessage({ autoStart: "clickAutoStart" }, function (response) { });
			toastr.options = { "positionClass": "toast-bottom-center", "timeOut": "3000", "extendedTimeOut": "1500", "progressBar": "true" };
            toastr.info(i18n.get("introjs-autostart"));
        }

        function showTutorialFunc() {
            chrome.runtime.sendMessage({ showTutorial: 1 }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
				if (response.showTutorial > 0) {
					showTutorial = response.showTutorial;
				}
			});
        }

        function clickPremiumFeatures() {
            window.open(chrome.runtime.getURL("options/indexPremium.html"));
        }

        function clickMakeSideBar() {
            chrome.runtime.sendMessage({ alert: "makeSideBar" }, function (response) { });
        }
		
        function clickMakeWideBar() {
            chrome.runtime.sendMessage({ alert: "makeWideBar" }, function (response) { });
        }		

        function clickRedirectSite() {
            window.open(chrome.runtime.getURL("options/index.html"));
        }
		
        function clickForward() {
            window.history.forward();
        }

        function clickBack() {
            window.history.back();
        }		

        function clickRefresh() {
            location.reload();
        }
		
		function clickHome() {
            location.href = 'https://games.gamezop.com/?id=SkOoemACwW';
        }

		function clickAllwaysOnTop(){
			toastr.options = { "positionClass": "toast-top-full-width", "timeOut": "0", "progressBar": "true", "closeButton" : "true", "extendedTimeOut": "0", "tapToDismiss" : false};
			toastr.info('<div style="text-align: center;"><b>Always-on-Top! (only on ChromeOs)</b><br>' +
						'<b>Now: '+ (windowType == 'panel' ? 'Enabled' : 'Disabled') + '</b><br></div>' +
						'<div style="text-align: left;">1- Open this link: <a id="enablePanels">chrome://flags/#enable-panels</a> and enable panels.</div><br>' +
						'<div style="text-align: left;">2- With panels option enabled, select always-on-top:</div><br>' +
						'<div style="text-align: center;display: block;"><a id="activatePanels"><button class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Enable</button></a><a id="desactivatePanels"><button class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Disable</button></a><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Close</button></div>'
						);
			document.getElementById('surpriseBtn').addEventListener('click', function(){ $('#toast-container').fadeOut( "slow", function() {$('#toast-container').remove();});});
			document.getElementById('enablePanels').addEventListener('click', function(){ sendAlertToBackground('enablePanels');});
			document.getElementById('activatePanels').addEventListener('click',  function(){ sendAlertToBackground('activatePanels');});
			document.getElementById('desactivatePanels').addEventListener('click',  function(){ sendAlertToBackground('desactivatePanels');});
		}
		
		function clickIncognitoBrowse(){
			toastr.options = { "positionClass": "toast-top-full-width", "timeOut": "0", "progressBar": "true", "closeButton" : "true", "extendedTimeOut": "0", "tapToDismiss" : false};
			toastr.info('<div style="text-align: center;"><b>Incognito Browsing!</b><br>' +
						'<b>Now: '+ (chrome.extension.inIncognitoContext ? 'Enabled' : 'Disabled') + '</b><br></div>' +
						'<div style="text-align: left;">1- Open this link: <a id="enableIncognitoBrowse">about:addons</a> and click "Allow in incognito".</div><br>' +
						'<div style="text-align: left;">2- With that option enabled, select Incognito Browsing:</div><br>' +
						'<div style="text-align: center;display: block;"><a id="activateIncognitoBrowse"><button class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Enable</button></a><a id="desactivateIncognitoBrowse"><button class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Disable</button></a><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Close</button></div>'
						);
			document.getElementById('surpriseBtn').addEventListener('click', function(){ $('#toast-container').fadeOut( "slow", function() {$('#toast-container').remove();});});
			document.getElementById('enableIncognitoBrowse').addEventListener('click', function(){ sendAlertToBackground('enableIncognitoBrowse');});
			document.getElementById('activateIncognitoBrowse').addEventListener('click',  function(){ sendAlertToBackground('activateIncognitoBrowse');});
			document.getElementById('desactivateIncognitoBrowse').addEventListener('click',  function(){ sendAlertToBackground('desactivateIncognitoBrowse');});
		}

		function clickInformationNews(){
			chrome.runtime.sendMessage({ informationNews: "informationNews" }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
				if (response.informationNews != null) {
					remoteMessage = response.informationNews;
					toastr.options = { "positionClass": "toast-top-full-width", "timeOut": "0", "progressBar": "true", "closeButton" : "true", "extendedTimeOut": "0", "tapToDismiss" : false };
					var t = toastr.info(remoteMessage[remoteMessageIndex]);
					t.attr('id', 'remoteMessageToastr');
					$('#remoteMessageToastr').append('<span id="remoteMessageSpan" style="font-weight: 600;opacity: 0.75;top: 0.4em;left: 0.4em;position: absolute;">'+ (remoteMessageIndex + 1) + '/'+ remoteMessage.length +'</span>');
					manageRemoteMessage();
				}
			});
		}
		
		function manageRemoteMessage(){
			$('#remoteMessageToastr .toast-message button').css("background","#E5E5E5");
			$('#remoteMessageToastr .toast-message button').css("color","black");
			document.querySelector('#remoteMessageToastr #surpriseNextBtn').addEventListener('click', function () { 
				remoteMessageIndex++;
				if(remoteMessageIndex >= remoteMessage.length) remoteMessageIndex = 0;
				$('#remoteMessageToastr .toast-message').html(DOMPurify.sanitize(remoteMessage[remoteMessageIndex], {ADD_ATTR: ['target']}));
				$('#remoteMessageSpan').text((remoteMessageIndex + 1) + '/'+ remoteMessage.length);
				manageRemoteMessage();
			});
			document.querySelector('#remoteMessageToastr #surpriseBtn').addEventListener('click', function () { $('#remoteMessageToastr').fadeOut("slow", function () { $('#remoteMessageToastr').remove(); }); });
		}
		
		function clickSocialMedia(){
			toastr.options = { "positionClass": "toast-top-full-width", "timeOut": "0", "progressBar": "true", "closeButton" : "true", "extendedTimeOut": "0", "tapToDismiss" : false };
			var t = toastr.success('<div id="followusToastr" style="text-align: center;"><a href="https://www.oinkandstuff.com" class="" target="_blank"><img  title="Extension Website" src="'+chrome.runtime.getURL("img/appextension_logo_2.png")+'" style="width:100%;" /></a></div><br>' +
						'<div style="display: flex; justify-content: center;">' +
						'<a href="https://www.youtube.com/oinkandstuff?sub_confirmation=1" class="" target="_blank"><img title="Youtube" src="'+chrome.runtime.getURL("img/Footer/button_youtube.png")+'" width="47" height="47" /></a>' +
						'<a href="https://x.com/oinkandstuff" class="" target="_blank"><img title="X" src="'+chrome.runtime.getURL("img/Footer/button_twitter.png")+'" width="47" height="47" /></a>' +
						'<a href="https://www.linkedin.com/company/oink-and-stuff" class="" target="_blank"><img title="LinkedIn" src="'+chrome.runtime.getURL("img/Footer/button_linkedin.png")+'" width="47" height="47" /></a>' +
						'</div>' +
						'<div style="text-align: center;"><b>Follow us!</b></div>' +
						'<div style="text-align: center;">Join us on the Social Networks above for the latest News, Tips and Tricks!</div><br>' +
						'<div style="text-align: center;"><a href="https://www.oinkandstuff.com" target="_blank"><button class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Extension Website</button></a><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Close</button></div>');
			t.attr('id', 'socialMediaToastr');
			document.querySelector('#socialMediaToastr #surpriseBtn').addEventListener('click', function () { $('#socialMediaToastr').fadeOut("slow", function () { $('#socialMediaToastr').remove(); }); });
		}
		
		function clickFremium(){
			toastr.options = { "positionClass": "toast-top-full-width", "timeOut": "0", "progressBar": "true", "closeButton": "true", "extendedTimeOut": "0", "tapToDismiss" : false };
			var t = toastr.error('<div id="freemiumAlert" style="text-align: center; font-weight: 600;"><b>' + i18n.get("fremium-install-title-toastr") + '</b></div>' +
			'<div style="text-align: center;" id="freemiumFeature"><img style="width: 100%;" src="' + chrome.runtime.getURL("img/topbar/unlock_small.png") + '"></img></div>' +
			'<div style="text-align: center;">' + i18n.get("fremium-install-options") + '</div><br>' +
			'<div style="text-align: center;display: block;"><button id="freemiumFeature2" class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Get extensions</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;color: black;">Close</button></div>'
			);
			t.attr('id', 'freemiumToastr');
			document.querySelector("[id='freemiumFeature']").onclick = function () { window.open(chrome.i18n.getMessage("chrome_extension_download_all_link")); };
			document.querySelector("[id='freemiumFeature2']").onclick = function () { window.open(chrome.i18n.getMessage("chrome_extension_download_all_link")); };
			document.querySelector('#freemiumToastr #surpriseBtn').addEventListener('click', function () { $('#freemiumToastr').fadeOut("slow", function () { $('#freemiumToastr').remove(); }); });
		}

		function sendAlertToBackground(alertFunction) {
			chrome.runtime.sendMessage({ alert: alertFunction }, function (response) { });
		}
		
		/*** Social media hub ***/
        function clickGoFacebook() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });	
            location.href = 'https://m.facebook.com/';
        }
        function clickGoInstagram() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });	
            location.href = 'https://www.instagram.com/';
        }
        function clickGoTwitter() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });	
            location.href = 'https://mobile.twitter.com/';
        }
        function clickGoGooglePlus() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });	
            location.href = 'https://plus.google.com/';
        }
        function clickGoWhatsApp() {
			chrome.runtime.sendMessage({ alert: "goLandscape" }, function (response) { });
            location.href = 'https://web.whatsapp.com/';
        }
		function clickGoTumblr() {
			chrome.runtime.sendMessage({ alert: "goLandscape" }, function (response) { });
            location.href = 'https://www.tumblr.com/';
        }
        function clickGoPinterest() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });	
            location.href = 'https://www.pinterest.com/';
        }
		function clickGoLinkedin() {
            chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });
            location.href = 'https://www.linkedin.com/';
        }
		function clickGoMessenger() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });			
            location.href = 'https://www.messenger.com/';
        }
		function clickGoSkype() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });			
            location.href = 'https://web.skype.com/';
        }
		function clickGoHangouts() {
			chrome.runtime.sendMessage({ alert: "goLandscape" }, function (response) { });			
            location.href = 'https://hangouts.google.com/';
        }
		function clickGoYoutube() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });			
            location.href = 'https://m.youtube.com/?app=m';
        }
		function clickGoAllo() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });			
            location.href = 'https://allo.google.com/web';
        }
		function clickGoTinder() {
			chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });			
            location.href = 'https://tinder.com/';
        }
		/*** Social media hub ***/		

		// ===== HTML to Image ==== 
        function clickHtmlToImage() {    // When camera is clicked
            screenshotElement("instant_games_screenshot");
        }

		function screenshotElement(screenshotName){
			if (hasFreemium) {
				chrome.runtime.sendMessage({ screenshotWindow: "screenshotWindow" }, function (response) {
					if(response == undefined || Object.keys(response).length == 0) return;
					if (response.screenshotWindow != null) {
						  SaveToDisk(response.screenshotWindow, screenshotName);
					}
				});
				toastr.options = { "positionClass": "toast-top-center", "timeOut": "2000", "extendedTimeOut": "1000", "progressBar": "true"};
				toastr.info('Screenshot: Done!');
            } else {
				clickFremium();
            }
		}
		
		// ===== collapse TopBar ==== 
		function collapseTopbarActive() {
            chrome.runtime.sendMessage({ collapseTopbar: "collapseTopbar" }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
                if (response.collapseTopbar === "true") {
					collapseTopbar = true;
					collapseTopbarSelection(true);
                } else if (response.collapseTopbar === "false") {
					collapseTopbar = false;
					collapseTopbarSelection(false);
                }
            });
        }
		function clickCollapseTopBar() {    // When collapse-topbar is clicked
            toastr.options = { "positionClass": "toast-bottom-center", "timeOut": "3000", "extendedTimeOut": "1500", "progressBar": "true", "closeButton" : "true"};
			
			if(collapseTopbar == true){
				chrome.runtime.sendMessage({ collapseTopbar: "false" }, function (response) { });
				toastr.error('Hide Top Bar');
				collapseTopbar = false;
				collapseTopbarSelection(false);
			} else {
				chrome.runtime.sendMessage({ collapseTopbar: "true" }, function (response) { });
				toastr.success('Show Top Bar');
				collapseTopbar = true;
				collapseTopbarSelection(true);
			}
        }
		
		function collapseTopbarSelection(activate){
			var $body = $('body');
			if(activate){
				$("#collapse-topbar").find("img").attr("src" ,chrome.runtime.getURL("img/icon_collapse_topbar_on.png"));
				if ($body.hasClass('toolbar')) $body.removeClass('toolbar');
			} else {
				$("#collapse-topbar").find("img").attr("src" ,chrome.runtime.getURL("img/icon_collapse_topbar_off.png"));
				if ($body.hasClass('toolbar') == false) $body.addClass('toolbar');
			}
		}
		
		// ===== Emoji Add ==== 
		function clickEmojiAdd() {    // When emoji is clicked
            chrome.runtime.sendMessage({ addEmoji: window.screenLeft + "#" + window.screenTop }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
				if (response.addEmoji == "true") {
					//show Emoji keyboard
				} else {
					toastr.options = { "positionClass": "toast-top-full-width", "timeOut": "0", "progressBar": "true", "closeButton": "true", "extendedTimeOut": "0", "tapToDismiss" : false };
					var t = toastr.error('<div id="emojisAlert" style="text-align: center; font-weight: 600;"><b>Install Emoji Keyboard</b></div>' +
					'<div style="text-align: center;" id="freemiumFeature"><img src="' + chrome.runtime.getURL("img/web_store_emoji_download.png") + '" style="width: 80%;margin-right: auto;margin-left: auto;"></img></div>' +
					'<div style="text-align: center;">' + i18n.get("emoji-install-options") + '</div><br>' +
					'<div style="text-align: center;display: block;"><button id="freemiumFeature2" class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;">Get extension</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px;background: #E5E5E5;border: 1px solid; padding: 0.3rem 0.75rem; border-radius: 0.25rem;">Close</button></div>'
					);
					t.attr('id', 'emojisToastr');
					document.querySelector("[id='freemiumFeature']").onclick = function () { window.open(response.addEmoji); };
					document.querySelector("[id='freemiumFeature2']").onclick = function () { window.open(response.addEmoji); };
					document.querySelector('#emojisToastr #surpriseBtn').addEventListener('click', function () { $('#emojisToastr').fadeOut("slow", function () { $('#emojisToastr').remove(); }); });
				}
			});
        }
		
		
		// ===== Incognito Mode ==== 
        function incognitoModeActive() {
            chrome.runtime.sendMessage({ incognitoMode: "incognitoMode" }, function (response) {
				if(response == undefined || Object.keys(response).length == 0) return;
                if (response.incognitoMode === "true") {
					incognitoModeSelection(true);
                } else if (response.incognitoMode === "false") {
					incognitoModeSelection(false);
                }
            });
        }		
		function clickIncognitoMode() {    // When incognito is clicked
            toastr.options = { "positionClass": "toast-top-center", "timeOut": "3000", "extendedTimeOut": "1500", "progressBar": "true"};
			
			if($("#incognito-mode").find("img").attr("src").indexOf("incognito-icon-on") >= 0){
				chrome.runtime.sendMessage({ incognitoMode: "false" }, function (response) { });
				toastr.success('Incognito Mode: OFF');
				incognitoModeSelection(false);
			} else {
				chrome.runtime.sendMessage({ incognitoMode: "true" }, function (response) { });
				toastr.success('Incognito Mode: ON');
				incognitoModeSelection(true);
			}
        }
		
		function incognitoModeSelection(activate){
			var $body = $('body');
			if(activate){
				$("#incognito-mode").find("img").attr("src" ,chrome.runtime.getURL("img/incognito-icon-on.png"));
				if ($body.hasClass('incognito') == false) $body.addClass('incognito');
			} else {
				$("#incognito-mode").find("img").attr("src" ,chrome.runtime.getURL("img/incognito-icon-off.png"));
				if ($body.hasClass('incognito')) $body.removeClass('incognito');
			}
		}
		
		function bindButtonsActions() {
			if ($('#clickHome')) {
                $('#clickHome').off('click', clickHome);
                $('#clickHome').on('click', clickHome);
            }
			if ($('#shareSocialMedia')) {
                $('#shareSocialMedia').off('click', clickSocialMedia);
                $('#shareSocialMedia').on('click', clickSocialMedia);
            }
			if ($('#backInput')) {
                $('#backInput').off('click', clickBack);
                $('#backInput').on('click', clickBack);
            }

            if ($('#forwardInput')) {
                $('#forwardInput').off('click', clickForward);
                $('#forwardInput').on('click', clickForward);
            }
			
            if ($('#refreshInput')) {
                $('#refreshInput').off('click', clickRefresh);
                $('#refreshInput').on('click', clickRefresh);
            }

            if ($('#redirectSiteInput')) {
                $('#redirectSiteInput').off('click', clickRedirectSite);
                $('#redirectSiteInput').on('click', clickRedirectSite);
            }

            if ($('#makeSideBar')) {
                $('#makeSideBar').off('click', clickMakeSideBar);
                $('#makeSideBar').on('click', clickMakeSideBar);
            }
			
            if ($('#makeWideBar')) {
                $('#makeWideBar').off('click', clickMakeWideBar);
                $('#makeWideBar').on('click', clickMakeWideBar);
            }

            if ($('#autoStartId')) {
                $('#autoStartId').off('click', clickAutoStart);
                $('#autoStartId').on('click', clickAutoStart);
            }

            if ($('#premiumFeatures')) {
                $('#premiumFeatures').off('click', clickPremiumFeatures);
                $('#premiumFeatures').on('click', clickPremiumFeatures);
            }
			
			if ($('#changeSkin')) {
			    $('#changeSkin').off('click', clickChangeSkin);
			    $('#changeSkin').on('click', clickChangeSkin);
			}

			if ($('#multiWindowAccount')) {
			    $('#multiWindowAccount').off('click', clickMultiWindowAccount);
			    $('#multiWindowAccount').on('click', clickMultiWindowAccount);
			}
			
			if ($('#allwaysOnTop')) {
			    $('#allwaysOnTop').off('click', clickAllwaysOnTop);
			    $('#allwaysOnTop').on('click', clickAllwaysOnTop);
			}
			
			if ($('#incognitoBrowse')) {
			    $('#incognitoBrowse').off('click', clickIncognitoBrowse);
			    $('#incognitoBrowse').on('click', clickIncognitoBrowse);
			}

			if ($('#informationNews')) {
			    $('#informationNews').off('click', clickInformationNews);
			    $('#informationNews').on('click', clickInformationNews);
			}
			
			if ($('#helpTutorial')) {
			    $('#helpTutorial').off('click', clickHelpTutorial);
			    $('#helpTutorial').on('click', clickHelpTutorial);
			}
			
			/*** Helpers on bottom of window ***/
			if ($('#html-to-image')) {
			    $('#html-to-image').off('click', clickHtmlToImage);
			    $('#html-to-image').on('click', clickHtmlToImage);
			}
			if ($('#collapse-topbar')) {
			    $('#collapse-topbar').off('click', clickCollapseTopBar);
			    $('#collapse-topbar').on('click', clickCollapseTopBar);
			}
			if ($('#emoji-add')) {
			    $('#emoji-add').off('click', clickEmojiAdd);
			    $('#emoji-add').on('click', clickEmojiAdd);
			}
			if ($('#incognito-mode')) {
			    $('#incognito-mode').off('click', clickIncognitoMode);
			    $('#incognito-mode').on('click', clickIncognitoMode);
			}
			if ($('#return-to-top')) {
			    $('#return-to-top').off('click', clickReturnToTop);
			    $('#return-to-top').on('click', clickReturnToTop);
			}
			
			/*** Social media hub ***/
			if ($('#goFacebook')) {
                $('#goFacebook').off('click', clickGoFacebook);
                $('#goFacebook').on('click', clickGoFacebook);
            }
			if ($('#goInstagram')) {
                $('#goInstagram').off('click', clickGoInstagram);
                $('#goInstagram').on('click', clickGoInstagram);
            }
			if ($('#goTwitter')) {
                $('#goTwitter').off('click', clickGoTwitter);
                $('#goTwitter').on('click', clickGoTwitter);
            }
			if ($('#goGooglePlus')) {
                $('#goGooglePlus').off('click', clickGoGooglePlus);
                $('#goGooglePlus').on('click', clickGoGooglePlus);
            }
			if ($('#goWhatsApp')) {
                $('#goWhatsApp').off('click', clickGoWhatsApp);
                $('#goWhatsApp').on('click', clickGoWhatsApp);
            }
			if ($('#goTumblr')) {
			    $('#goTumblr').off('click', clickGoTumblr);
			    $('#goTumblr').on('click', clickGoTumblr);
			}
			if ($('#goPinterest')) {
			    $('#goPinterest').off('click', clickGoPinterest);
			    $('#goPinterest').on('click', clickGoPinterest);
			}
			if ($('#goLinkedin')) {
			    $('#goLinkedin').off('click', clickGoLinkedin);
			    $('#goLinkedin').on('click', clickGoLinkedin);
			}
			if ($('#goMessenger')) {
			    $('#goMessenger').off('click', clickGoMessenger);
			    $('#goMessenger').on('click', clickGoMessenger);
			}
			if ($('#goSkype')) {
			    $('#goSkype').off('click', clickGoSkype);
			    $('#goSkype').on('click', clickGoSkype);
			}
			if ($('#goHangouts')) {
			    $('#goHangouts').off('click', clickGoHangouts);
			    $('#goHangouts').on('click', clickGoHangouts);
			}
			if ($('#goYoutube')) {
			    $('#goYoutube').off('click', clickGoYoutube);
			    $('#goYoutube').on('click', clickGoYoutube);
			}
			if ($('#goAllo')) {
			    $('#goAllo').off('click', clickGoAllo);
			    $('#goAllo').on('click', clickGoAllo);
			}
			if ($('#goTinder')) {
			    $('#goTinder').off('click', clickGoTinder);
			    $('#goTinder').on('click', clickGoTinder);
			}
		}
		
        /*** Introjs firstRun and show tutorial ***/
		function startTutorial() {
			var intro = introJs();
			var steps = [
					{element: '#backInput',intro: 'Back.',position: 'right'},
					{element: '#forwardInput',intro: 'Forward.',position: 'right'},
					{element: '#refreshInput',intro: 'Refresh.',position: 'right'},
					{element: '#redirectSiteInput',intro: 'App Options/Settings.',position: 'right'},
				  	{element: '#makeSideBar',intro: i18n.get("introjs-sidebar"),position: 'bottom'},
				  	{element: '#makeWideBar',intro: i18n.get("introjs-widebar"),position: 'bottom'},
				  	{element: '#autostart',intro: i18n.get("introjs-autostart"),position: 'bottom'},
				  	{element: '#premiumFeatures',intro: i18n.get("introjs-premium"),position: 'left'},
					{element: '#temporaryDrawer',intro: "Open Extra settings.",position: 'right'},
					{element: '#html-to-image',intro: i18n.get("introjs-html-to-image"),position: 'left'},
					{element: '#emoji-add',intro: i18n.get("introjs-emoji-add"),position: 'left'},
					{element: '#incognito-mode',intro: i18n.get("introjs-incognito-view"),position: 'left'},
					{element: '#collapse-topbar',intro: i18n.get("collapse-topbar"),position: 'left'},
					{element: '#extapptopbar1',intro: i18n.get("introjs-extapptopbar1"),position: 'bottom'}
			];
			steps = steps.filter(function (obj) { return $(obj.element).length; });
			steps.unshift({title: i18n.get("introjs-welcome"), intro: i18n.get("introjs-head")});
			steps.push({title: i18n.get("introjs-welcome"), intro: i18n.get("introjs-end")});
			intro.setOptions({ steps: steps });
			intro.onafterchange(function(targetElement) {
				switch (targetElement.id){
					case "temporaryDrawer":
						showTemporaryDrawer(true);
					break;
					case "html-to-image":
						showTemporaryDrawer(false);
					break;
					case "":
						//first and last welcome step
						scrollToTop();
						showTemporaryDrawer(false);
					break;
				}
			});			
			intro.start();
		}
		
		/*** Social media hub ***/
		$(function() {
			$.contextMenu({
				selector: '#appsTemporaryDrawer',
				trigger: 'left',
				callback: function(key, options) {
					if(key == "androidmessages"){
						chrome.runtime.sendMessage({ alert: "goLandscape" }, function (response) { });	
						location.href = 'https://messages.google.com/web';
					} else if(key == "newshub"){
						chrome.runtime.sendMessage({ alert: "goPortrait" }, function (response) { });	
						location.href = 'https://news.google.com/';
					}
				},
				items: {
					"androidmessages": {name: "Android Messages", icon: "androidmessages"},
					"newshub": {name: "News Hub Kiosk", icon: "googlenews"},
					"sep1": "---------",
					"none": {name: "None", icon: "close"}
				}
			}); 
		});
		/*** Social media hub ***/

		/*** Multi window - account ***/
		function clickMultiWindowAccount(){
			var element = document.getElementById('multiWindowAccount');
			var e = element.ownerDocument.createEvent('MouseEvents');
			e.initMouseEvent('contextmenu', true, true,
				 element.ownerDocument.defaultView, 1, 0, 0, 0, 0, false,
				 false, false, false,2, null);
			return !element.dispatchEvent(e);
		}
		$(function() {
			$.contextMenu({
				selector: '#multiWindowAccount',
				callback: function(key, options) {
					if(hasFreemium ){
						if(key == "newwindow") chrome.runtime.sendMessage({ multiWindowAccount: "multiWindow" }, function (response) {});
					} else {
						clickFremium();
					}
				},
				items: {
					"newwindow": {name: "New Window", icon: "newwindow"}
				}
			}); 
		});

		/*** Theme - Skin Color ***/
		function clickChangeSkin() {    // When change Skin is clicked
			var element = document.getElementById('changeSkin');
			var e = element.ownerDocument.createEvent('MouseEvents');
			e.initMouseEvent('contextmenu', true, true,
				 element.ownerDocument.defaultView, 1, 0, 0, 0, 0, false,
				 false, false, false,2, null);
			return !element.dispatchEvent(e);
        }
		function addThemeSkin(theme){
			if(hasFreemium){
				chrome.runtime.sendMessage({ themeSkin: theme }, function (response) {});
			} else {
				clickFremium();
			}
		}
		$(function() {
			$.contextMenu({
				selector: '#changeSkin',
				callback: function(key, options) {
					addThemeSkin(key);
				},
				items: {
					"invert": {name: "Invert", icon: "invert"},
					"grayscale50": {name: "Grey scale 50%", icon: "grayscale50"},
					"grayscale100": {name: "Grey scale 100%", icon: "grayscale100"},
					"huerotate120": {name: "Hue Rotate 120º", icon: "huerotate120"},
					"huerotate240": {name: "Hue Rotate 240º", icon: "huerotate240"},
					"saturate": {name: "Saturate", icon: "saturate"},
					"sepia": {name: "Sepia", icon: "sepia"},
					"blur": {name: "Blur", icon: "blur"},
					"sep1": "---------",
					"none": {name: "None", icon: "close"}
				}
			}); 
		});
    }
});