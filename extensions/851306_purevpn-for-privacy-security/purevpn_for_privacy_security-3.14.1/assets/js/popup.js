/*
*   PureVPN
*   by GZ systems Ltd.
*   Everyone is permitted to copy and distribute verbatim copies
*   of this document, but changing it is not allowed.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
*   copyright 2016 All Rights are Reserved.
*/

(function() {
  'use strict';
  var tabId;
  var options;
  var isBack = false;
  var errorMsgLogin = '';
  var isChangeCountry = false;
  var tplLogin = 'main.html';
  var tplMain = 'main.html';
  var tplSignup = 'signup.html';
  var tplVerification = 'verification.html';
  var tplProxy = 'proxy.html';
  var tplNotAvailable = 'not_available.html';
  var tplSettings = 'settings.html';
  var tplAdvancedFeatures = 'advanced_features.html';
  var tplCountries = 'countries.html';
  var tplChannels = 'channels.html';
  var tplWhitelisting = 'whitelisting.html';
  var tplUsernames = 'usernames.html';
  var tplaccountDetails = 'account_details.html';
  var tplCities = 'cities.html';
  var tplCityServers = 'city_servers.html';
  var tplReferFrnd = 'refer_frnd.html';

  var proxyPageSetTime;
  var popUpLoadPage = '';
  var renderPage = true;
  //! Init popup load

  var getPopupLoad = function() {
    $('#loaderOverlay,#loaderOverlay span').hide();
    var getPopupData = function(oResult) {
      options = oResult;
      var page;
      switch (oResult.proxy.levelOfControl) {
        case CONTROL_DANGER:
        case CONTROL_DENY:
          page = tplNotAvailable;
          break;
        default:
          if (options.isReady === false) {
            page = tplMain;
            if (options.vpnusernames.length > 0) {
              page = tplUsernames;
            } else if (options.clientUserName) {
              page = tplLogin;
            } /*else if (options.showSignupScreen) {
              page = tplMain;
            }*/
          } else {
            page = tplProxy;
            if (popUpLoadPage !== '') {
              page = popUpLoadPage;
              popUpLoadPage = '';
            }
          }
      }

      if (options.spoofingToggle === true || options.webRtcToggle === true) {
        page = tplAdvancedFeatures;
      }

      /*  if (options.socialLoginStatus === false) {
        chrome.runtime.sendMessage({
          what: 'getSocial'
        }, pVn.nofunc);
      }*/
      var elementContainer = (isBack === true ? ".prevSlide" : false);

      if (options.client_type === CLIENT_TYPE_FREE) {
        showCampaign();
      }
      pageLoader(page, elementContainer);
    };
    var onTabsLoaded = function(aTabs) {
      if (aTabs.length === 0) {
        return false;
      }
      var tab = aTabs[0];
      tabId = tab.id;
      chrome.runtime.sendMessage({
        what: 'popupData',
        tabId: tabId
      }, getPopupData);
    };
    /**
     * Show and Hide campaign
     * @return {void}
     */
    function showCampaign() {
      if (options.showCampaign && options.campaignData[options.campaignPopupCount].image) {
        // it will add according to count
        $('.popupCampaign > a').css('background-image', 'url(data:image/png;base64,' + encodeURI(options.campaignData[options.campaignPopupCount].image) + ')');
        $('.popupCampaign').fadeIn();
        chrome.runtime.sendMessage({
          what: 'campaignPopUp',
          status: 'view'
        });
      } else {
        $('.popupCampaign').fadeOut();
      }
    }
    chrome.tabs.query({active: true, currentWindow: true}, onTabsLoaded);
  };
  var showCountryName = function(serverName) {
    var displayText = options.countryName;
    if (serverName !== '')
      displayText = serverName;

    $("#countryLabelDefault").text(displayText);
  };

  var changeTextCTaSummary = function() {
    var bannersCampaignUI = options.bannerCampaignData.banners;
    var bannersIndexing = options.cTaSummarytextChangeState;
    var getBannerStatusResponse = function(oResponse) {
      if (bannersCampaignUI && bannersIndexing <= bannersCampaignUI.length - 1 && oResponse.showBannerCampaign === true) {
        $('.update-account').show();
        scrollWrapHeight();
        $('.footer-wrap').hide();
        var ctaText = bannersCampaignUI[bannersIndexing].bttn_text;
        $('.proxyUpgradeButtonCTA').text(ctaText);
        $('.update-account').attr('data-cta', "Banner:" + ctaText);
        $('.proxyUpgradeButtonCTA').css('background-color', options.bannerCampaignData.btn_bg_clr);
        $('.update-account').css('background-color', options.bannerCampaignData.banner_bg_clr);
        $('.proxyUpgradeTextCTA').css('color', options.bannerCampaignData.heading_txt_clr);
        $('.proxyUpgradeTextCTA').text(bannersCampaignUI[bannersIndexing].heading_text);
      } else {
        $('.update-account').hide();
        $('.scroll-wrap').removeClass('scroll-wrap-2');
        $('.footer-wrap').show();
      }
    };

    chrome.runtime.sendMessage({
      what: 'getBannerStatus'
    }, getBannerStatusResponse);
  };
  /**
   * Handle update account footer bar.
   * @return {void}
  */
  function updateAccountShowHide() {
    changeTextCTaSummary();
    if (options.client_type === CLIENT_TYPE_FREE) {
      $('#channelsFavourites').hide();
      $('.closeCampaignBanner').hide();
    } else {
      $('#channelsFavourites').show();
    }
  }
  /**
   * Handle height of scroll bar according to fotter.
   * @return {void}
  */
  function scrollWrapHeight() {
    $('.scroll-wrap').addClass('scroll-wrap-2');
  }
  //! Init popup load
  /**
   * Handle page load.
   * @param {string} page name.
   * @param {element} elementContainer optional.
   * @param {string} dataAttr optional.
   * @return {void}
  */
  function pageLoader(page, elementContainer, dataAttr = "") {
    dataAttr = dataAttr || "";
    if (!elementContainer) {
      elementContainer = $("body > .mainWrap > .activeSlide");
    } else if (elementContainer === ".nextSlide") {
      $('body > .mainWrap').append('<div class="nextSlide"></div>');
    } else {
      $('body > .mainWrap').append('<div class="prevSlide"></div>');
    }
    var onPageLoad = function(responseTxt, statusTxt, xhr) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        //! Proxy page
        var onPageProxy = function() {
          //! Action button isChangeCountry = true;
          if (options.active !== false && isChangeCountry === false) {
            $('#btnAction').removeClass("connecting")
              .removeClass("connect").addClass("disconnect")
              .text(pVn.i18n("proxyTxtDisconnect")).removeAttr('disabled');
            $('.link-li').removeClass('link-disabled');
          } else {
            $('#btnAction').removeClass("connecting")
              .removeClass("disconnect").addClass("connect")
              .text(pVn.i18n("proxyTxtConnect")).removeAttr('disabled');
            $('.link-li').removeClass('link-disabled');
          }

          if (options.serverKey === "countryCode") {
            $('.change-country').addClass('active');
          } else {
            $('.streaming').addClass('active');
          }

          var getIsoCodeByCityCode = function(sCityCode) {
            var i;
            for (i = 0; i < options.cities.length; i++) {
              if (options.cities[i].code === sCityCode) {
                return {
                  iso: options.cities[i].iso_code,
                  name: options.cities[i].name
                };
              }
            }
            return {
              iso: 'US',
              name: 'United States'
            };
          };

          var icon = "";
          //! Default Country
          if (options.countryCode !== "") {
            icon = pVn.regionIcon(options.countryCode);
            var serverName = '';
            if (options.serverKey === "purposeCode") {
              $('#countryFlagDefault').html(
                '<img src="data:image/png;base64,' +
                options.channelIcon + '">');
            } else {
              if (options.serverKey === "cityCode" || options.serverKey === "cityServerCode") {
                var cityDetails = getIsoCodeByCityCode(options.countryCode);
                serverName = cityDetails.name;
                icon = pVn.regionIcon(cityDetails.iso);
                if (options.serverKey === "cityServerCode") {
                  serverName = options.server_name;
                }
              }
              $('#countryFlagDefault').html('<img src="' + icon["64"] + '">');
            }

            showCountryName(serverName);
            $("#anchorRegion").text(pVn.i18n("proxyTxtChangeCountry"));
            if (isChangeCountry !== false) {
              isChangeCountry = false;
              setTimeout(function() {
                $('#btnAction').trigger('click');
              }, 600);
            }
          }
          //! Edit webrtc
          /* var webRtcLeak = document.getElementById("webRtcLeak");
          webRtcLeak.checked = options.webRtcLeak;
          $(webRtcLeak).off('click').on("click", function() {
            isBack = false;
            var onWebRtcStateChange = function() {
              setTimeout(getPopupLoad, 1000);
            };
            chrome.runtime.sendMessage({
              what: 'editWebRTC',
              status: webRtcLeak.checked
            }, onWebRtcStateChange);
          }); */
          updateAccountShowHide();

          // Desire Outcome Functionality
          if (options.desired_outcome) {
            // Get Refer a friend details if user is not free
            if (options.client_type !== CLIENT_TYPE_FREE) {
              chrome.runtime.sendMessage({
                what: 'getReferFriend',
                id: 0
              }, function(response) {
                options.refer_frnd_avl = response.remaining;
                options.refer_frnd_sent = response.sent;
                options.refer_link = response.refer_link;
                $('#referAFriendPopup .btn-success').attr('data-link', response.refer_link);
              });
            }
            let desireOutcomeMessageTemplate = $('#desireOutcomeMessageTemplate');
            let desireOutcomeMessagePopup = $('#desireOutcomeMessagePopup');
            let desireOutcomeMessagePopup2 = $('#desireOutcomeMessagePopup2');
            let sessionRatingMessageTemplate = $('#sessionRatingMessageTemplate');
            // When connection is make
            if (options.active) {
              // Check for user Desire Outcome once connection is started
              if (!options.current_session.desiredOutcomeMessageProvided) {
                if (options.desired_outcome.global === false) {
                  if (!options.current_session.desiredOutcomeMessageUserInteraction) {
                    desireOutcomeMessageTemplate.fadeIn("fast");
                  }
                } else {
                  desireOutcomeMessageTemplate.fadeOut("fast");
                }
              }
              if (!options.current_session.sessionRatingMessageProvided) {
                if (options.desired_outcome.global !== false && !options.current_session.sessionRatingMessageUserInteraction) {
                  sessionRatingMessageTemplate.fadeIn("fast");
                }
                if (options.desired_outcome.global === false) {
                  sessionRatingMessageTemplate.fadeOut("fast");
                }
              }
              // Random select feedback options
              let randomReasonNumber = Math.floor((Math.random() * 4) + 1);
              let randomReasonInput = $("#desireOutcomeFeedbackTemplate form").find('input[id="reason' + randomReasonNumber + '"]');
              if (typeof randomReasonInput !== "undefined") {
                randomReasonInput.attr('checked', 'checked');
              }
            } else if (
              !options.current_session.hasRatedSession &&
              !options.current_session.disconnectedStarted
            ) {
              // Is DO true
              if (options.desired_outcome.global) {
                let disconnectSessionRatingCheckCallback = function(signupWeek) {
                  let signupWeeksDiff = signupWeek;
                  // Check is user signup is 5 weeks after
                  if (signupWeeksDiff !== null && signupWeeksDiff >= 5) {
                    let desireOutcomeStoreRatePopup = $('#desireOutcomeStoreRatePopup');
                    desireOutcomeStoreRatePopup.addClass("hidden");
                    // Check is user has rated before (If not).
                    if (!options.desired_outcome.hasRatedBefore) {
                      // show only to 20% users
                      if (options.desired_outcome.twentyPercentRequirement <= 2) {
                        desireOutcomeStoreRatePopup.removeClass("hidden");
                      } else {
                        desireOutcomeStoreRatePopup.addClass("hidden");
                      }
                    }
                  }
                };
                chrome.runtime.sendMessage(
                  {
                    what: 'disconnectSessionRatingCheck'
                  }, disconnectSessionRatingCheckCallback
                );
              } else if (
                options.current_session.counter < 5 &&
                options.current_session.counter !== 0
              ) { // DO is False
                // Show DO Message.
                // console.log("show DO Message.");
                desireOutcomeMessagePopup.removeClass("hidden");
              } else {
                // Grater than 0 means user should at least make one connection before we show popup
                if (options.current_session.counter > 0 && options.desired_outcome.twentyPercentRequirement <= 2) {
                  desireOutcomeMessagePopup2.removeClass("hidden");
                } else {
                  desireOutcomeMessagePopup2.addClass("hidden");
                }
                desireOutcomeMessagePopup.addClass("hidden");
              }
            }
          }
        };
        var showFavourites = function(ele, li, item, parentEle) {
          var iso = item.code;
          if (parentEle === 'citiesListFavourites')
            iso = item.code;

          if (ele.indexOf(iso) > -1) {
            var li2 = li.cloneNode(true);
            document.getElementById(parentEle)
              .appendChild(li2);
            $(".fvrtText").addClass("hide");
          }
        };
        var printList = function(item, listName, eleName) {
          var moreServers = "";
          if (item.code !== "" && item.name !== "") {
            var a = document.createElement("a");
            var li = document.createElement("li");
            if (options.client_type === CLIENT_TYPE_FREE && item.allowed_to_free === "0") {
              var toolFor = (eleName === 'for_purpose') ? 'channel' : 'country';
              if (options[toolFor + "TooltipDetail"].text) {
                var tooltipEle = document.createElement("span");
                tooltipEle.classList.add('tooltip');
                tooltipEle.textContent = options[toolFor + "TooltipDetail"].text + item.name;
                li.append(tooltipEle);
              }
              li.classList.add("blocked-ele");
              a.classList.add('upgradeBtn');
              a.setAttribute('data-cta', ((eleName === 'for_country') ? 'Country' : 'Channel') + ':' + item.name);
            }
            var icon = pVn.regionIcon(item.code);
            var span = document.createElement("span");
            span.setAttribute("data-code", item.code);
            var listingIconImage = document.createElement("img");
            var spanItemName = document.createElement("span");

            if (eleName === 'for_country') {
              listingIconImage.setAttribute("class", "mCS_img_loaded");
              listingIconImage.setAttribute("src", icon["38"]);
              spanItemName.textContent = item.name;
              span.appendChild(listingIconImage);
              span.appendChild(spanItemName);
            } else {
              listingIconImage.setAttribute("class", "mCS_img_loaded");
              listingIconImage.setAttribute("src", "data:image/png;base64," + item.icon);
              spanItemName.textContent = item.name;
              span.appendChild(listingIconImage);
              span.appendChild(spanItemName);
            }

            var favInput = document.createElement("input");
            favInput.setAttribute("type", "checkbox");
            favInput.setAttribute("id", item.code);
            if (eleName === 'for_country' &&
              options.favourites.indexOf(item.code) > -1) {
              favInput.checked = true;
            } else if (eleName === 'for_purpose' &&
              options.favouritesChannels.indexOf(item.code) > -1) {
              favInput.checked = true;
            }
            var favLabel = document.createElement("label");
            favLabel.setAttribute("for", item.code);
            favLabel.className = "ripple";

            if (eleName === 'for_country') {
              moreServers = document.createElement("a");
              moreServers.className = "moreServers inlineA";
              moreServers.setAttribute("data-for", item.code);
              moreServers.setAttribute("href", 'cities.html');
            }

            if (options.client_type === CLIENT_TYPE_FREE) {
              favLabel.className = 'ripple freeUserFav';
              if (item.allowed_to_free === "1") {
                li.appendChild(favInput);
                li.appendChild(favLabel);
                li.appendChild(span);
              } else {
                a.appendChild(span);
                li.appendChild(a);
              }
            } else {
              li.appendChild(favInput);
              li.appendChild(favLabel);
              if (eleName === 'for_country') {
                li.appendChild(moreServers);
              }
              li.appendChild(span);
            }
            document.getElementById(listName).appendChild(li);
            if (eleName === 'for_country') {
              showFavourites(options.favourites, li, item,
                "countriesListFavourites");
            } else {
              showFavourites(options.favouritesChannels, li, item,
                "channelsListFavourites");
            }
          }
        };
        var printAccountList = function(item, listName) {
          var li = document.createElement("li");
          li.className = 'accountListItem';
          var span = document.createElement("span");
          span.textContent = item;
          var favLabel = document.createElement("label");
          favLabel.className = "ripple";
          if (options.userCredentials.username === item) {
            favLabel.className = "ripple loggedInUsername";
          }
          li.appendChild(favLabel);
          li.appendChild(span);
          document.getElementById(listName).appendChild(li);
        };
        //! Countries list page
        var onPageCountries = function() {
          if (options.client_type === CLIENT_TYPE_FREE) {
            $('.allCountries h4').addClass('headingSpace');
          }
          //! item, index, array
          var listCountries = function(item) {
            printList(item, "countriesList", 'for_country');
          };
          options.countries.sort(function(a, b) {
            return (options.client_type === CLIENT_TYPE_FREE && -(a.allowed_to_free - b.allowed_to_free)) ||
             a.name.localeCompare(b.name);
          }).forEach(listCountries);
          $(".scroll-wrap").mCustomScrollbar({
            theme: "minimal"
          });
          updateAccountShowHide();
        };
        //! Channels list page
        var onPageChannels = function() {
          if (options.client_type === CLIENT_TYPE_FREE) {
            $('.allCountries h4').addClass('headingSpace');
          }
          //! item, index, array
          var listChannels = function(item) {
            // console.log("item popup item > %o, item code %s", item, item.code);
            printList(item, "channelsList", 'for_purpose');
          };
          options.channels.forEach(listChannels);
          $(".scroll-wrap").mCustomScrollbar({
            theme: "minimal"
          });
          updateAccountShowHide();
        };
        //! Login page
        var onPageLogin = function() {
          var btnLogin = document.getElementById("btnLogin");
          var btnMigration = document.getElementById("btnMigration");
          var userName = document.getElementById("userName");
          var userPass = document.getElementById("userPass");
          var errorElem = document.getElementById("loginError");

          userName.value = (options.clientUserName) ? options.clientUserName : '';
          if (options.autoLoginFailedMsg !== "") {
            errorElem.textContent = options.autoLoginFailedMsg;
            errorElem.style.display = 'block';
          }
          if (errorMsgLogin !== "") {
            errorElem.innerHTML = errorMsgLogin;
            errorElem.style.display = 'block';
          }
          var onLogin = function(oResponse) {
            $(".login-screen-form").removeClass("errors");
            if (oResponse.code === 1) {
              isBack = true;
              errorElem.style.display = 'none';
              getPopupLoad();
            } else if (oResponse.code === 2) {
              errorElem.style.display = 'none';
              $('#loaderOverlay,#loaderOverlay span')
                .fadeOut('fast', function() {
                  $('#popupMigration').fadeIn('fast');
                  $("#popupMigrationMessage")
                    .text(pVn.i18n("ProxyTxtMigration"));
                });
            } else if (oResponse.code === 4) {
              isBack = true;
              errorElem.style.display = 'none';
              getPopupLoad();
            } else {
              $('#loaderOverlay,#loaderOverlay span').fadeOut(
                'fast', function() {
                  if (oResponse.code === 5) {
                    errorElem.style.display = 'none';
                    $("#popupConfirmationMessage").text(oResponse.message);
                    $("#popupActionProceed").text(
                      pVn.i18n("loginTxtFreeAccountProceed"));
                    $("#popupActionProceed").addClass("btnProceedGreen");
                    $("#popupActionCancel").text(
                      pVn.i18n("loginTxtFreeAccountCancel"));
                    $('#popupConfirmation').fadeIn('fast');
                    $("#popupActionProceed").off('click').on(
                      'click', function() {
                        $('#popupConfirmation').fadeOut('fast');
                        $('.upgradeBtn').trigger('click');
                      });
                    $("#popupActionCancel").off('click').on(
                      "click", function() {
                        $('#popupConfirmation').fadeOut(
                          'fast');
                        chrome.runtime.sendMessage({
                          what: 'subscribeStatus',
                          subscribeMsg: 'Deny_Upgrade'
                        });
                      });
                  } else {
                    errorElem.textContent = oResponse.message;
                    errorElem.style.display = 'block';
                    $(".login-screen-form").addClass("errors");
                  }
                  btnLogin.disabled = false;
                  $('#btnLogin').removeClass("connecting").addClass(
                    "button-purple").text(
                    pVn.i18n("loginTxtLogin")).removeAttr('disabled');
                  $('.link-li').removeClass('link-disabled');
                });
            }
          };
          $(btnMigration).off('click').on("click", function(e) {
            e.preventDefault();
            btnMigration.disabled = true;
            errorElem.style.display = 'none';
            chrome.runtime.sendMessage({
              what: 'migrateUser'
            });
          });

          $(document).on("keyup, blur", ".login-screen-form .userCredentials", function(e) {
            let inputId = e.target.id;
            if (inputId === "userName" || inputId === "userPass") {
              addRemoveTextLengthClass(e.target);
            }
          });
          $(document).on("keypress", ".login-screen-form .userCredentials", function(e) {
            let inputId = e.target.id;
            if (inputId === "userName" || inputId === "userPass") {
              addRemoveTextLengthClass(e.target);
            }
          });

          $(btnLogin).off('click').on("click", function(e) {
            e.preventDefault();
            btnLogin.disabled = true;
            errorElem.style.display = 'none';
            if (userName.value !== "" && userPass.value !== "") {
              $('#loaderOverlay,#loaderOverlay span').fadeIn();
            }
            var action = 'authUser';
            var reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
            if (reg.test(userName.value) && userPass.value !== "") {
              action = 'authEmail';
            }
            chrome.runtime.sendMessage({
              what: action, data: {
                userName: userName.value,
                userPassword: userPass.value
              }
            }, onLogin);
          });
          /**
           * Handle key event.
           * @param {object} event LoadEvent parameter
           * @return {void}
          */
          function restrictSpace(event) {
            if (event.target.value === "") {
              if (event.keyCode === 32) {
                return false;
              }
            }
          }
          $('#dnt-accnt').off('click').on("click", function() {
            chrome.runtime.sendMessage({
              what: 'subscribeStatus',
              subscribeMsg: 'Not_Registered'
            });
          });
          $("#userName, #userPass, .srchCountryField, .srchChannelField").off(
            'keypress').on(
            'keypress', restrictSpace);
        };
        //! Settings page
        var onAdvancedFeatures = function() {
          //! Edit Spoofing
          var locationSpoofing = document.getElementById("locationSpoofing");
          locationSpoofing.checked = options.locationSpoofing;
          $(locationSpoofing).off('click').on("click", function() {
            isBack = false;
            var onLocationSpoofingChange = function() {
              setTimeout(getPopupLoad, 200);
            };
            chrome.runtime.sendMessage(
              {
                what: 'editLocationSpoofing',
                status: locationSpoofing.checked
              },
              onLocationSpoofingChange
            );
          });
          var onToggleChange = function() {
            setTimeout(getPopupLoad, 1000);
            pageLoader('advanced_features.html', ".nextSlide");
          };
          chrome.runtime.sendMessage({
            what: 'toggleLocationSpoofing',
            status: false,
            onToggleChange
          });
          //! Edit webrtc
          var webRtcLeak = document.getElementById("webRtcLeak");
          webRtcLeak.checked = options.webRtcLeak;

          $(webRtcLeak).off('click').on("click", function() {
            isBack = false;
            var onWebRtcStateChange = function() {
              setTimeout(getPopupLoad, 1000);
            };
            chrome.runtime.sendMessage(
              {
                what: 'editWebRTC',
                status: webRtcLeak.checked
              },
              onWebRtcStateChange
            );
          });
          chrome.runtime.sendMessage({
            what: 'toggleWebRtc',
            status: false,
            onToggleChange
          });
        };
        var onSettingsPage = function() {
          // - Logout
          document.getElementById('extVersion').textContent =
           options.extVersion;
          $("#delUser").off('click').on("click", function(e) {
            e.preventDefault();
            $("#popupConfirmationMessage").text(
              pVn.i18n("settingsTxtLogoutConfirmation"));
            $("#popupActionProceed").text(pVn.i18n("settingsTxtLogoutProceed"));
            $("#popupActionProceed").removeClass("btnProceedGreen");
            $("#popupActionCancel").text(pVn.i18n("settingsTxtLogoutCancel"));
            $('#popupConfirmation').fadeIn('fast');
          });
          $("#popupActionProceed").off('click').on('click', function() {
            isBack = true;

            $('#popupConfirmation').fadeOut('fast');
            $('#loaderOverlay').fadeIn();
            chrome.runtime.sendMessage({
              what: 'logOut',
              tabId: tabId,
              removeAccounts: true}, getPopupLoad);
          });
          $("#popupActionCancel").off('click').on("click", function() {
            $('#popupConfirmation').fadeOut('fast');
          });
          $('#userName').val(
            options.userCredentials.username);
          if (options.userEmailCredentials.username !== '') {
            $('#userName').val(
              options.userEmailCredentials.username);
          }

          // Advanced Feature Menu link clicked
          $(document).off('click', '.advanced-features a')
            .on('click', '.advanced-features a', function(e) {
              e.preventDefault();
              $('#loaderOverlay,#loaderOverlay span').fadeOut();
              pageLoader('advanced_features.html', ".nextSlide");
            });

          $('#userPass').val(
            options.userCredentials.password);

          if (options.client_type === CLIENT_TYPE_FREE) {
            $('.referFrnd').hide();
          } else {
            // chrome.runtime.sendMessage({
            //   what: 'getReferFriend',
            //   id: 0
            // }, function(response) {
            //   options.refer_frnd_avl = response.remaining;
            //   options.refer_frnd_sent = response.sent;
            //   options.refer_link = response.refer_link;
            // });
          }
        };

        //! Not Available page
        var onNotAvailable = function() {
          var container = document.getElementById("other_proxy_services");
          if (pVn.isEmpty(options.extensionsDetails) === false) {
            var ul = document.createElement("ul");
            ul.className = "scroll-wrap";
            container.appendChild(ul);
            for (var extID in options.extensionsDetails) {
              if (!options.extensionsDetails.hasOwnProperty(extID)) continue;
              var extension = options.extensionsDetails[extID];
              var li = document.createElement("li");
              var extensioLink = document.createElement("a");
              extensioLink.href = "chrome://extensions?id=" + extension.id;
              li.appendChild(extensioLink);
              if (pVn.isEmpty(extension.icons) === false) {
                var img = document.createElement("img");
                img.src = extension.icons[0].url;
                extensioLink.appendChild(img);
              }
              var span = document.createElement('span');
              span.textContent =
              (extension.shortName &&
                extension.shortName !== "") ?
                extension.shortName : extension.name;
              extensioLink.appendChild(span);
              ul.appendChild(li);
            }
            // var disable_extension_link = document.getElementById("disable_extension_link");
            // disable_extension_link.href = 'chrome://extensions/?id=' + options.extensionsLists[options.extensionsLists.length-1];
          }
          $(".scroll-wrap").mCustomScrollbar({
            theme: "minimal"
          });
        };

        var onSignUp = function() {
          if (options.userSignupDetail && options.userSignupDetail.email) {
            $('#email').val(options.userSignupDetail.email);
          }
          if (options.userSignupDetail && options.userSignupDetail.consent) {
            $("#agree_terms_policy").prop("checked", options.userSignupDetail.consent);
          }
          var agreeTermsConditionPrivacy = function() {
            var checkbox = $('#agree_terms_policy');
            if (checkbox.prop('checked') === false) {
              checkbox.siblings('label').addClass('error');
              $('.signup-body .error').html(pVn.i18n('termsConditionPrivacyError')).show();
              return false;
            }
            return true;
          };
          $('#agree_terms_policy').change(function() {
            if ($(this).prop('checked')) {
              $(this).siblings('label').removeClass('error');
            } else {
              $(this).siblings('label').addClass('error');
            }
          });
          var showError = function(errorMessage) {
            var SE = document.getElementById('signupError');
            SE.textContent = errorMessage;
            SE.classList.add('show');
          };
          if (pVn.isEmpty(options.signUpError) === false) {
            showError(options.signUpError);
          }
          if (options.showSignUpLoader === true) {
            $('#loaderOverlay,#loaderOverlay span').fadeIn();
          }
          var portSocialSignup = chrome.runtime.connect({name: "socialSignup"});
          var callbackSocialSignup = function(oResponse) {
            if (oResponse.hasOwnProperty('error')) {
              $('#loaderOverlay,#loaderOverlay span').fadeOut();
            } else if (oResponse.header.code === 0 && oResponse.header.from === "signup") {
              $('#loaderOverlay,#loaderOverlay span').fadeOut();
              showError(oResponse.header.message);
            } else {
              $('.error').hide();
              isBack = true;
              getPopupLoad();
              portSocialSignup.disconnect();
            }
          };
          portSocialSignup.onMessage.addListener(callbackSocialSignup);
          var onSignUpResponse = function(oResponse) {
            $('#loaderOverlay,#loaderOverlay span').fadeOut();
            if (oResponse.code === 1 || oResponse.header.code === 1) {
              isBack = true;
              $('#loaderOverlay,#loaderOverlay span').fadeOut();
              $('.error').hide();
              getPopupLoad();
            } else if (oResponse.header.code === 2) {
              isBack = true;
              getPopupLoad();
              $('#loginError').text(oResponse.header.message).fadeIn();
            } else {
              $('#loaderOverlay,#loaderOverlay span').fadeOut();
              $('.error').text(oResponse.header.message).fadeIn();
            }
          };
          $('#btnSignup').click(function(e) {
            e.preventDefault();
            var email = $('#email').val();
            /* eslint max-len: ["error", 800]*/
            var reg =
            /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (reg.test(email)) {
              $('.signup-body .error').hide();
              if (agreeTermsConditionPrivacy()) {
                $('#loaderOverlay span').html(pVn.i18n("signupLoaderText"));
                $('#loaderOverlay,#loaderOverlay span').fadeIn();
                // console.log("email %s", email);
                chrome.runtime.sendMessage({
                  what: 'userSignup', email: email
                }, onSignUpResponse);
              }
            } else {
              $('.signup-body .error').text(pVn.i18n('signUpFieldError')).show();
            }
          });
          $('#social_login').hide();
        };

        var onVerificationPage = function() {
          var onResendSignUpResponse = function(oResponse) {
            $('#loaderOverlay,#loaderOverlay span').fadeOut();
            if (oResponse.code === 1) {
              $('#signupError').addClass('success').removeClass('error').text(oResponse.message).show();
            } else {
              $('#signupError').addClass('error').removeClass('success').text(oResponse.message).show();
            }
          };
          $('.resendCode').on('click', function() {
            $('#signupError').hide();
            $('#loaderOverlay span').html(pVn.i18n("resendLoaderText"));
            $('#loaderOverlay,#loaderOverlay span').fadeIn();
            chrome.runtime.sendMessage({
              what: 'resendVerification'
            }, onResendSignUpResponse);
          });
          $('#btnVerifyCode').click(function(e) {
            e.preventDefault();
            var verficationCode = $('#verification_field').val();
            if (verficationCode === "") {
              $('.error').text(pVn.i18n('verificationCodeError')).show();
            } else {
              $('.error').hide();
              $('#loaderOverlay span').html(pVn.i18n("verificationLoaderText"));
              $('#loaderOverlay,#loaderOverlay span').fadeIn();
              var onVerificationResponse = function(oResponse) {
                // console.log("oResponse %o", oResponse);
                if (oResponse.code === 1 || oResponse.header.code === 1) {
                  isBack = true;
                  $('#loaderOverlay,#loaderOverlay span').fadeOut();
                  $('.error').hide();
                  getPopupLoad();
                } else if (oResponse.header.code === 2) {
                  $('#loaderOverlay,#loaderOverlay span').fadeOut();
                  isBack = true;
                  getPopupLoad();
                  $('#loginError').text(oResponse.header.message).fadeIn();
                } else {
                  $('#loaderOverlay,#loaderOverlay span').fadeOut();
                  $('.error').text(oResponse.header.message).fadeIn();
                }
              };
              chrome.runtime.sendMessage({
                what: 'verifyUser', verfication_code: verficationCode
              }, onVerificationResponse);
            }
          });
        };
        //  On Host Whitelisting Page Load
        var onWhitelistingPage = function() {
          //  Get Host Whitelist toggle button element
          var hostWhiteListCheck = document.getElementById("host-wtlst-chkbox");

          //  Whitelisted Hosts textbox element
          var whitelistedHostsTextBoxElement = document.getElementById("whitelisted-hosts");
          var allowWhitelistedHosts;
          isBack = false;

          var updateHostWhitelistDetailsResponse = function(oResponse) {
            hostWhiteListCheck.checked = oResponse.allowWhitelistedHosts;

            //  Allow whitelisted hosts flag
            allowWhitelistedHosts = oResponse.allowWhitelistedHosts;

            var whitelistedHosts = oResponse.whitelistedHosts;
            $(whitelistedHostsTextBoxElement).val(whitelistedHosts.join("\n"));

            if (options.active === false) {
              $('.wtlst-change-note-txt').hide();
            }
            if (allowWhitelistedHosts === false) {
              $('#whitelisted-hosts').prop('disabled', true);
            }
          };
          chrome.runtime.sendMessage({
            what: 'getWhitelistedHostsDetails'
          }, updateHostWhitelistDetailsResponse);

          //  Save Host Whitelisting Details
          $(whitelistedHostsTextBoxElement).on("change", function() {
            var whitelistedHosts = $(whitelistedHostsTextBoxElement).val();
            var whitelistedHostsList = [];
            $(whitelistedHosts.split("\n")).each(function(index, value) {
              if (value !== '') {
                whitelistedHostsList.push(value);
              }
            });
            chrome.runtime.sendMessage({
              what: 'updateWhitelistedHosts', whitelistHosts: whitelistedHostsList
            });
          });

          $(hostWhiteListCheck).off('click').on("click", function() {
            if (allowWhitelistedHosts === true)
              allowWhitelistedHosts = false;
            else
              allowWhitelistedHosts = true;

            if (allowWhitelistedHosts === false) {
              $('#whitelisted-hosts').prop('disabled', true);
            } else {
              $('#whitelisted-hosts').prop('disabled', false);
            }
            chrome.runtime.sendMessage({
              what: 'updateAllowWhitelistedHosts', allowWhitelistedHosts: allowWhitelistedHosts
            });
          });
        };
        //! Username page
        var onUsernamePage = function() {
          //! item, index, array
          var listAccounts = function(item) {
            printAccountList(item, "accountsList");
          };
          options.vpnusernames.sort().forEach(listAccounts);

          var onLogin = function(oResponse) {
            if (oResponse.code === 1) {
              isBack = true;
              getPopupLoad();
            } else {
              $('#loaderOverlay,#loaderOverlay span')
                .fadeOut('fast', function() {
                  $('#popupError').fadeIn('fast');
                  $("#popupErrorMessage")
                    .text(pVn.i18n("txtErrorMsg"));
                });
            }
          };

          $(".accountListItem").off('click')
            .on('click', function() {
              var username = $(this).find('span').text();
              $(this).find('.ripple').css("background", "url(../../assets/images/sprite-blocking.png) right -968px no-repeat");
              if (username !== undefined && username !== '') {
                $('#loaderOverlay,#loaderOverlay span').fadeIn();

                if (options.isReady === true) {
                  chrome.runtime.sendMessage({
                    what: 'logOut',
                    tabId: tabId,
                    removeAccounts: false});
                }
                chrome.runtime.sendMessage({
                  what: 'getVpnPassword', data: {username: username}
                }, getPopupLoad);

                // chrome.runtime.sendMessage({
                //   what: 'getVpnusernameDetails', data: {username: username}
                // }, onGetVpnusernameDetails);
              }
            }).hover(function() {
              $(this).find('.ripple').css("background", "url(../../assets/images/sprite-blocking.png) right -968px no-repeat");
            }, function() {
              $(this).find('.ripple').css("background", "none");
            });

          $("#popupErrorAction").off('click').on("click", function() {
            $('#popupError').fadeOut('fast');
          });

          $(".scroll-wrap").css('height', '472px');
          $(".scroll-wrap").mCustomScrollbar({
            theme: "minimal"
          });

          $("#resetUserAccounts").off('click')
            .on('click', function(e) {
              var page;
              if (options.isReady === false) {
                options.vpnusernames = [];
                chrome.runtime.sendMessage({
                  what: 'clearUserAccounts'
                });
                page = 'main.html';
              } else {
                page = 'account_details.html';
              }

              e.preventDefault();
              clearTimeout(proxyPageSetTime);
              $(this).css('pointer-events', "none");
              if ($(this).hasClass('backbtn')) {
                pageLoader(page, ".prevSlide");
              } else {
                pageLoader(page, ".nextSlide");
              }
            });
        };
        // /! replace language variable from text
        var applyI18n = function(mo, txt) {
          return pVn.i18n(txt);
        };
        //! Account details page
        var onAccountDetailsPage = function() {
          $('#itemUsername').text(options.userCredentials.username);
          $('#userEmail').text(options.user_email);
          $('#userSubscriptionType').text(options.client_type.charAt(0).toUpperCase() + options.client_type.slice(1));
          $('#userSubscriptionStatus').text(options.user_status.charAt(0).toUpperCase() + options.user_status.slice(1));
          if (options.client_type === CLIENT_TYPE_FREE) {
            $('#btnUpgradeDark').css('display', 'block');
          } else {
            $('#btnUpgradeDark').css('display', 'none');
          }
          $('#billingCycle').text(options.billing_cycle.charAt(0).toUpperCase() + options.billing_cycle.slice(1));
          if (options.vpnusernames.length === 0) {
            $('#btnSwitchUser').css('display', 'none');
          }
        };

        var printCityList = function(item, listName, eleName) {
          if (item.iso_code !== "" && item.name !== "") {
            var moreServers = "";
            var a = document.createElement("a");
            var li = document.createElement("li");

            var icon = pVn.regionIcon(item.iso_code);
            var span = document.createElement("span");
            span.setAttribute("data-code", item.code);

            $('.allCountries h4').text(item.country_name);
            $('.backbtn').attr("data-for", item.code);

            var listingIconImage = document.createElement("img");
            var spanItemName = document.createElement("span");

            listingIconImage.setAttribute("class", "mCS_img_loaded");
            listingIconImage.setAttribute("src", icon["38"]);
            spanItemName.textContent = item.name;
            span.appendChild(listingIconImage);
            span.appendChild(spanItemName);

            var favInput = document.createElement("input");
            favInput.setAttribute("type", "checkbox");
            favInput.setAttribute("id", item.code);
            favInput.setAttribute("for-city-id", item.code);
            favInput.checked = false;

            if (options.favouritesCities.indexOf(item.code) > -1) {
              favInput.checked = true;
            }

            var favLabel = document.createElement("label");
            favLabel.setAttribute("for", item.code);
            favLabel.className = "ripple";

            if (eleName === 'for_city') {
              moreServers = document.createElement("a");
              moreServers.className = "moreServers inlineA";
              moreServers.setAttribute("data-for", item.iso2);
              moreServers.setAttribute("data-city-id", item.code);
              moreServers.setAttribute("data-city-name", item.name);
              moreServers.setAttribute("href", 'city_servers.html');
            }

            if (options.client_type === CLIENT_TYPE_FREE) {
              if (item.allowed_to_free === "1") {
                li.appendChild(favInput);
                li.appendChild(favLabel);
                li.appendChild(span);
              } else {
                a.appendChild(span);
                li.appendChild(a);
              }
            } else {
              li.appendChild(favInput);
              li.appendChild(favLabel);
              li.appendChild(moreServers);
              li.appendChild(span);
            }

            document.getElementById(listName).appendChild(li);
            showFavourites(options.favouritesCities, li, item,
              "citiesListFavourites");
          }
        };

        var printServerList = function(item, listName, eleName, counter) {
          if (item.id !== "" && item.city_name !== "") {
            var a = document.createElement("a");
            var li = document.createElement("li");

            var icon = pVn.regionIcon(item.iso2);
            var span = document.createElement("span");
            span.setAttribute("data-code", item.iso2);
            span.setAttribute("data-host", item.proxy_host);

            $('.allCountries h4').text(item.city_name);
            $('.backbtn').attr("data-for", item.iso2);

            var orderNum = counter;
            if (item.server_id !== null) {
              orderNum = item.server_id;
            }

            var listingIconImage = document.createElement("img");
            var spanItemName = document.createElement("span");

            listingIconImage.setAttribute("class", "mCS_img_loaded");
            listingIconImage.setAttribute("src", icon["38"]);
            spanItemName.textContent = item.city_name + ' #' + orderNum;
            span.appendChild(listingIconImage);
            span.appendChild(spanItemName);

            var favInput = document.createElement("input");
            favInput.setAttribute("type", "checkbox");
            favInput.setAttribute("id", item.id);
            favInput.checked = false;

            var moreServers = document.createElement("a");
            moreServers.className = "moreServers inlineA";
            moreServers.setAttribute("data-for", item.iso2);

            if (options.client_type === CLIENT_TYPE_FREE) {
              if (item.allowed_to_free === "1") {
                li.appendChild(favInput);
                li.appendChild(span);
              } else {
                a.appendChild(span);
                li.appendChild(a);
              }
            } else {
              li.appendChild(favInput);
              li.appendChild(span);
            }

            document.getElementById(listName).appendChild(li);
            if (eleName === 'for_country') {
              showFavourites(options.favourites, li, item,
                "countriesListFavourites");
            } else {
              showFavourites(options.favouritesChannels, li, item,
                "channelsListFavourites");
            }
          }
        };

        var organizedCities = function(cities) {
          var organizedCities = [];
          for (var i = 0; i < cities.length; i++) {
            //  iso code level
            var isoCode = cities[i].iso_code;
            organizedCities[isoCode] = [];

            for (var j = 0; j < cities.length; j++) {
              if (isoCode === cities[j].iso_code) {
                // city level
                var cityName = cities[j].name;
                organizedCities[isoCode][cityName] = [];

                for (var k = 0; k < cities.length; k++) {
                  // server level
                  if (cityName === cities[k].name) {
                    organizedCities[isoCode][cityName].push(cities[k]);
                  }
                }
              }
            }
          }

          return organizedCities;
        };

        var onMoreServers = function(dataAttr) {
          if (options.client_type === CLIENT_TYPE_FREE) {
            $('.allCountries h4').addClass('headingSpace');
          }
          //! item, index, array
          var citiesData = organizedCities(options.cities);

          for (let isoKey in citiesData) {
            if (isoKey !== "" &&
              isoKey !== undefined) {
              for (var cityKey in citiesData[isoKey]) {
                if (cityKey) {
                  var city = citiesData[isoKey][cityKey][0];
                  if (dataAttr === city.iso_code) {
                    printCityList(city, "citiesList", 'for_city');
                  }
                }
              }
            }
          }

          $(".scroll-wrap").mCustomScrollbar({
            theme: "minimal"
          });
          updateAccountShowHide();
        };

        var onCityServers = function(data) {
          if (options.client_type === CLIENT_TYPE_FREE) {
            $('.allCountries h4').addClass('headingSpace');
          }
          //! item, index, array
          var citiesData = data;

          if (citiesData instanceof Array) {
            $('.serverUnavailableErr').hide();

            for (var i = 0; i < citiesData.length; i++) {
              var city = citiesData[i];
              printServerList(city, "cityServersList", 'for_city', i + 1);
            }
          } else {
            $('.backbtn').attr("data-for", citiesData);
          }

          $('#loaderOverlay,#loaderOverlay span').fadeOut();

          $(".scroll-wrap").mCustomScrollbar({
            theme: "minimal"
          });
          updateAccountShowHide();
        };

        var onReferFrnd = function() {
          chrome.runtime.sendMessage({
            what: 'referFriendClickedEvent',
            id: 0
          }, function() {});

          $('.avl .counterNum').text(options.refer_frnd_avl);
          $('.sent .counterNum').text(options.refer_frnd_sent);
          $('.referFrndBtn').attr('data-link', options.refer_link);

          $(".scroll-wrap").mCustomScrollbar({
            theme: "minimal"
          });

          $('.referFrndCounter').hide();
          // if expired/inactive/disabled user
          if (options.user_status !== 'active') {
            $('.referFrndBtn').hide();
            setTimeout(function() {
              $('.requestHeader.expiredUserMsg').show();
              $('.requestHeader.emptyTokenMsg').hide();
              $("#a").css("display", "block");
              $("#b").css("display", "block");
              $('.avl .counterNum, .sent .counterNum').text('--');
            }, 500);
          }

          // if referal link is empty
          if (options.refer_link === '&utm_source=proxy') {
            $('.referFrndBtn').hide();
            setTimeout(function() {
              $('.requestHeader.expiredUserMsg').hide();
              $('.requestHeader.emptyTokenMsg').show();
              $("#a").css("display", "block");
              $("#b").css("display", "block");
            }, 500);

            chrome.runtime.sendMessage({
              what: 'referFriendInviteFailedEvent',
              id: 0
            }, function() {});
          }
          updateAccountShowHide();
        };
         function dec2hex(dec) {
          return ("0" + dec.toString(16)).substr(-2);
        }
        function generateCodeVerifier() {
          var array = new Uint32Array(56 / 2);
          window.crypto.getRandomValues(array);
          return Array.from(array, dec2hex).join("");
        }
        function sha256(plain) {
          // returns promise ArrayBuffer
          const encoder = new TextEncoder();
          const data = encoder.encode(plain);
          return window.crypto.subtle.digest("SHA-256", data);
        }
        function base64urlencode(a) {
          var str = "";
          var bytes = new Uint8Array(a);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            str += String.fromCharCode(bytes[i]);
          }
          return btoa(str)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
        }
        async function generateCodeChallengeFromVerifier(v) {
          var hashed = await sha256(v);
          var base64encoded = base64urlencode(hashed);
          return base64encoded;
        }
        const onOAuthLogin = async (oResponse) => {
           var errorElem = document.getElementById("loginError");
            $(".login-screen-form").removeClass("errors");
            if (oResponse.code === 1) {
              isBack = true;
              errorElem.style.display = 'none';
              getPopupLoad();
            } else if (oResponse.code === 2) {
              errorElem.style.display = 'none';
              $('#loaderOverlay,#loaderOverlay span')
                .fadeOut('fast', function() {
                  $('#popupMigration').fadeIn('fast');
                  $("#popupMigrationMessage")
                    .text(pVn.i18n("ProxyTxtMigration"));
                });
            } else if (oResponse.code === 4) {
              isBack = true;
              //TODO: might need it later
              errorElem.style.display = 'none';
              getPopupLoad();
            } else if (oResponse.code === 6) {
              $('#loaderOverlay').fadeOut();
              await chrome.runtime.sendMessage({
                what: 'logOut',
                tabId: tabId,
                removeAccounts: true
              });
              errorElem.innerHTML = oResponse.message;
              errorElem.style.display = 'block';  
              errorElem.style.color = 'red';  
              errorElem.style.textAlign = 'center'; 
              
            } else if(oResponse.code === 7) {
              $('#loaderOverlay').fadeOut();
            } else {
              $('#loaderOverlay,#loaderOverlay span')
                .fadeOut('fast', function() {
                  if (oResponse.code === 5) {
                    // errorElem.style.display = 'none';
                    $("#popupConfirmationMessage").text(oResponse.message);
                    $("#popupActionProceed")
                      .text(pVn.i18n("loginTxtFreeAccountProceed"));
                    $("#popupActionProceed").addClass("btnProceedGreen");
                    $("#popupActionCancel")
                      .text(pVn.i18n("loginTxtFreeAccountCancel"));
                    $('#popupConfirmation').fadeIn('fast');
                    $("#popupActionProceed").off('click')
                      .on('click', function() {
                        $('#popupConfirmation').fadeOut('fast');
                        $('.upgradeBtn').trigger('click');
                      });
                    $("#popupActionCancel").off('click')
                      .on("click", function() {
                        $('#popupConfirmation').fadeOut('fast');
                        chrome.runtime.sendMessage({
                          what: 'subscribeStatus',
                          subscribeMsg: 'Deny_Upgrade'});
                      });
                  } else {
                    errorElem.innerHTML = oResponse.message;
                    errorElem.style.display = 'block';
                    $(".login-screen-form").addClass("errors");
                  }
                  btnLogin.disabled = false;
                  $('#btnLogin').removeClass("connecting")
                    .addClass("button-purple").text(pVn.i18n("loginTxtLogin"))
                    .removeAttr('disabled');
                  $('.link-li').removeClass('link-disabled');
                });
            }
          };
        const oAuth = async () => {
          // This function generates the code_verfier and code_challenge and sends a message to the auth file
          var errorElem = document.getElementById("loginError");          
          const button = document.getElementById('oauth-btn');
          button.addEventListener('click', async () => {
            errorElem.innerHTML = '';
            errorElem.style.display = 'hidden'; 
            $('#loaderOverlay').fadeIn();
            const code_verifier = generateCodeVerifier()
            const code_challenge = await generateCodeChallengeFromVerifier(code_verifier)
            chrome.runtime.sendMessage({
                what: "initiateOauth",
                data: {
                  code_verifier,
                  code_challenge
                }
            }, onOAuthLogin);
          });
        };
        //! Insert copy
        $(elementContainer).html(
          $(elementContainer).html().replace(/\{(\w+)\}/g, applyI18n));
        //! Template environment
        switch (page) {
          case tplProxy:
            onPageProxy();
            break;
          case tplSettings:
            onSettingsPage();
            break;
          case tplCountries:
            onPageCountries();
            break;
          case tplChannels:
            onPageChannels();
            break;
          case tplLogin:
            //onPageLogin();
            oAuth();
            break;
          case tplNotAvailable:
            onNotAvailable();
            break;
          case tplSignup:
            onSignUp();
            break;
          case tplVerification:
            onVerificationPage();
            break;
          case tplWhitelisting:
            onWhitelistingPage();
            break;
          case tplUsernames:
            onUsernamePage();
            break;
          case tplaccountDetails:
            onAccountDetailsPage();
            break;
          case tplCities:
            onMoreServers(dataAttr);
            break;
          case tplCityServers:
            onCityServers(dataAttr);
            break;
          case tplReferFrnd:
            onReferFrnd();
            break;
          case tplAdvancedFeatures:
            onAdvancedFeatures();
            break;
          case tplMain:
            oAuth();
            break; 
          // skip default case
        }
        //! Animation
        if (elementContainer === ".nextSlide") {
          $('body').css('pointer-events', 'none');
          $('.nextSlide').css('left', 'auto').animate({
            right: '0'
          }, 500, function() {
            $('.nextSlide').prev().remove();
            $('.nextSlide').attr('class', 'activeSlide');
            $('body').css('pointer-events', 'auto');
            // loading = false;
          });
          $('.activeSlide').css('right', 'auto').animate({
            left: '-290px'
          }, 500, function() {
            $('body').css('pointer-events', 'auto');
            // loading = false;
          });
        } else if (elementContainer === ".prevSlide") {
          $('body').css('pointer-events', 'none');
          $('.activeSlide').css('left', 'auto').animate({
            right: '-290px'
          }, 500, function() {
            $(this).remove();
            $('body').css('pointer-events', 'auto');
            // loading = false;
          });
          $('.prevSlide').css('right', 'auto').animate({
            left: '0'
          }, 500, function() {
            $('.prevSlide').attr('class', 'activeSlide');
            $('body').css('pointer-events', 'auto');
            // loading = false;
          });
        }
      }
    };
    if (renderPage === true) {
      $(elementContainer).load(page, onPageLoad);
    } else {
      renderPage = true;
    }
  }

  //! Connect / Disconnect proxy
  var toggleConnect = function(sCountryCode, callback) {
    if (!sCountryCode || sCountryCode === "") {
      sCountryCode = "";
    }
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofunc;
    }
    chrome.runtime.sendMessage({
      what: 'toggleProxyService', tabId: tabId,
      domain: options.domain, countryCode: sCountryCode
    }, callback);
  };

  window.addEventListener('DOMContentLoaded', getPopupLoad);

  // eslint-disable-next-line require-jsdoc
  function addRemoveTextLengthClass(element) {
    let inputValue = element.value;
    let inputValueLimit = 20;
    let elem = $(element);
    // eslint-disable-next-line no-negated-condition
    if (inputValue !== "") {
      if (inputValue.length >= inputValueLimit) {
        if (!elem.hasClass("text-long")) {
          elem.removeClass("text-normal");
          elem.addClass("text-long");
        } else {
          elem.addClass("text-long");
        }
      } else {
        if (!elem.hasClass("text-normal")) {
          elem.addClass("text-normal");
          elem.removeClass("text-long");
        } else {
          elem.removeClass("text-long");
        }
      }
    } else {
      if (!elem.hasClass("text-normal")) {
        elem.addClass("text-normal");
        elem.removeClass("text-long");
      } else {
        elem.removeClass("text-long");
      }
    }
  }

  $(document).ready(function() {
    //! Toggle connect / disconnect proxy
    $(document).off('click', '#btnAction').on(
      'click', '#btnAction', function(e) {
        e.preventDefault();
        clearTimeout(proxyPageSetTime);

        var countryCode = (
          $('#btnAction').hasClass("connect") ?
            options.countryCode : '');
        if (countryCode !== "") {
          $('#btnAction').removeClass("connect").removeClass(
            "disconnect").addClass("connecting").text(
            pVn.i18n("proxyTxtConnecting")).attr('disabled', 'disabled');
          $('.link-li').addClass('link-disabled');
          $('#anchorRegion').addClass("hide");
          $('#containerProgress').removeClass("hide");
          $('#countryLabelDefault').addClass("hide");
          $("#containerError").addClass("hide");
        }
        isBack = false;
        toggleConnect(countryCode, function(responseProxy) {
          var disableConnect = false;
          $('#containerProgress').addClass("hide");
          $('#countryLabelDefault').removeClass("hide");
          $("#containerError").addClass("hide");
          $('#anchorRegion').removeClass("hide");

          if (responseProxy === null || typeof (responseProxy) === 'undefined') {
            disableConnect = true;
          }

          if (disableConnect) {
            $("#containerError").removeClass("hide");
            $("#containerError .errorText").html("Server isn't available at the moment. Connect to another location.");
            $('#btnAction').removeClass("connecting").removeClass("disconnect")
              .addClass("connect").text(pVn.i18n("proxyTxtConnect"))
              .removeAttr('disabled');
            $('.link-li').removeClass('link-disabled');

            if (options.city_hostname !== '') {
              chrome.runtime.sendMessage({
                what: 'unableToFindServerEvent',
                serverHostname: options.city_hostname
              }, function() {});
            }
            return;
          }

          if (
            responseProxy.hasOwnProperty("levelOfControl") &&
            responseProxy.levelOfControl === CONTROL_ACTIVE
          ) {
            $('#btnAction').removeClass("connecting").removeClass(
              "connect").addClass("disconnect").text(
              pVn.i18n("proxyTxtDisconnect")).removeAttr('disabled');
            $('.link-li').removeClass('link-disabled');
          } else {
            $('#btnAction').removeClass("connecting").removeClass(
              "disconnect").addClass("connect").text(
              pVn.i18n("proxyTxtConnect")).removeAttr('disabled');
            $('.link-li').removeClass('link-disabled');
            if (responseProxy.hasOwnProperty("message") !== false) {
              if (responseProxy.code === 8) {
                // Create anchor element.
                var a = document.createElement('a');
                a.href = "#";
                a.className = 'upgradeBtn';
                a.setAttribute('data-cta', 'other');
                a.append('renew');
                $("#containerError").removeClass("hide").text('');
                var spanItem = document.createElement('span');
                spanItem.className = 'errorText';
                var spanItem1 = document.createElement('span');
                spanItem1.className = 'close_error';
                spanItem1.id = "hideError";
                spanItem1.textContent = "x";
                var element = document.getElementById("containerError");
                element.append(spanItem);
                element.append(spanItem1);
                element.append('Please ');
                element.append(a);
                element.append(' your account to use the extension.');
                $('.close_error')
                  .css('margin-top', '5px')
                  .css('margin-right', '5px');
              } else {
                $("#containerError").removeClass("hide").text(
                  responseProxy.message);
              }
              return;
            }
          }

          // Update Current session values to false
          // if (options.active === false) {
          //
          // }
          chrome.runtime.sendMessage({
            what: 'updateCurrentSession',
            connectionStatus: options.active
          }, function(disconnectedStarted) {
            // Collect Event Props and send Mixpanel Event.
            if (options.desired_outcome && options.active === false) {
              let extraData = {};
              extraData.disconnectedStarted = disconnectedStarted;
              let data = pVn.getDesireOutcomePromptTypeAndSessionType(options, extraData);
              // Send event
              chrome.runtime.sendMessage(
                {
                  what: 'connectedEvent',
                  connectVia: data.connectVia,
                  sessionType: data.eventPropSessionType,
                  promptType: data.eventPropPromptType,
                  countryName: options.countryName
                }
              );
            }
          });
          getPopupLoad();
        });
      });
    //! Anchor pages
    $(document).on('click', 'a.inlineA', function(e) {
      e.preventDefault();
      clearTimeout(proxyPageSetTime);
      $(this).css('pointer-events', "none");
      var dataAttr = $(this).attr('data-for');
      var link = $(this).attr('href');
      var isoCode = $(this).parent().find('span').attr('data-code');

      if (link === tplCityServers) {
        var cityid = $(this).attr('data-city-id');
        //  var city_name = $(this).attr('data-city-name');
        $('#loaderOverlay,#loaderOverlay span').fadeIn();
        chrome.runtime.sendMessage({
          what: 'getServers',
          city_id: cityid,
          type: 'paid'
        }, function(response) {
          if (typeof (response) === 'undefined' || response.length === 0) {
            response = isoCode;
          }
          pageLoader(link, ".nextSlide", response);
        });
      } else if ($(this).hasClass('backbtn')) {
        pageLoader(link, ".prevSlide", dataAttr);
      } else if (!$(this).hasClass('backbtn')) {
        pageLoader(link, ".nextSlide", dataAttr);
      }
      return;
    });
    //! Show hide password
    $(document).on('click', '#showHidePassword', function() {
      if ($(this).hasClass('active')) {
        $('.password').attr('type', 'password');
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
        $('.password').attr('type', 'text');
      }
    });

    $(document).off('click', '.referFrndBtn')
      .on('click', '.referFrndBtn', function(e) {
        e.preventDefault();
        var link = $(this).attr('data-link');
        var slug = 'invite';
        navigator.clipboard.writeText(link).then(function() {
          $('.referFrndBtnCopied').fadeIn('slow');

          setTimeout(function() {
            $('.referFrndBtnCopied').fadeOut('slow');
          }, 2000);
        }, function() {
          /* clipboard write failed */
        });

        chrome.runtime.sendMessage({
          what: 'referFriendInviteClickedEvent',
          slug: slug
        });
      });

    var onDetailSuccess = function() {
      $('#loaderOverlay,#loaderOverlay span').fadeOut();
      pageLoader('account_details.html', ".nextSlide");
    };
    //! Get subscription details
    $(document).off('click', '.usr-subscrptn a')
      .on('click', '.usr-subscrptn a', function(e) {
        e.preventDefault();
        chrome.runtime.sendMessage({
          what: 'subscriptionStatus'
        }, onDetailSuccess);
      });

    // Bind click events for desire outcome thumbs-up and down buttons for template 1.
    $(document).on('click', '#desireOutcomeMessageTemplate .icon', function(e) {
      let isThumbsUp = $(e.target).hasClass("thumbs-up-icon");
      let onDesireOutcomeChange = function(data) {
        let feedbackTemplate = $('#desireOutcomeFeedbackTemplate');
        let desireOutcomeMessageTemplate = $('#desireOutcomeMessageTemplate');
        options.current_session.desiredOutcomeMessageUserInteraction = true;
        // Check if variable show feedback is true
        if (data.showFeedbackForm) {
          // Show feedback form
          feedbackTemplate.removeClass("hidden");
        } else {
          // Hide feedback form
          feedbackTemplate.addClass("hidden");

          let ratingTemplate = $("#desireOutcomeStoreRatePopup");
          if (data.askForStoreRating || !data.hasRatedBefore) {
            if (data.userSignupWeek >= 5) {
              ratingTemplate.removeClass("hidden");
            } else {
              ratingTemplate.addClass("hidden");
            }
          } else {
            ratingTemplate.addClass("hidden");
          }
        }

        // Hide desire outcome message.
        desireOutcomeMessageTemplate.fadeOut("fast");
      };
      let extraData = {};
      extraData.rating = isThumbsUp;
      // Gather Event Props and Send Mixpanel Event.
      let data = pVn.getDesireOutcomePromptTypeAndSessionType(options, extraData);
      // Send event
      chrome.runtime.sendMessage(
        {
          what: 'ratingOrDOFeedbackEvent',
          sessionType: data.eventPropSessionType,
          promptType: data.eventPropPromptType,
          rating: data.rating
        }
      );

      // Update Desire Outcome
      chrome.runtime.sendMessage(
        {
          what: 'updateDesireOutcome',
          status: isThumbsUp,
          options: options
        },
        onDesireOutcomeChange
      );
    });

    // Bind click events for desire outcome thumbs-up and down buttons for template 2.
    $(document).on('click', '#sessionRatingMessageTemplate .icon', function(e) {
      let isThumbsUp = $(e.target).hasClass("thumbs-up-icon");
      let extraData = {};
      extraData.rating = isThumbsUp;
      // Gather Event Props and Send Mixpanel Event.
      let data = pVn.getDesireOutcomePromptTypeAndSessionType(options, extraData);
      // Send event
      chrome.runtime.sendMessage(
        {
          what: 'ratingOrDOFeedbackEvent',
          sessionType: data.eventPropSessionType,
          promptType: data.eventPropPromptType,
          rating: data.rating
        },
        function() {
          let onSessionRatingChange = function(data) {
            let feedbackTemplate = $('#desireOutcomeFeedbackTemplate');
            let sessionRatingMessageTemplate = $('#sessionRatingMessageTemplate');
            // Check if variable show feedback is true
            if (data.showFeedbackForm) {
              // Show feedback form
              feedbackTemplate.removeClass("hidden");
            } else {
              // Hide feedback form
              feedbackTemplate.addClass("hidden");
            }

            let ratingTemplate = $("#desireOutcomeStoreRatePopup");
            let referAFriendPopup = $("#referAFriendPopup");
            let thankYouMessageTemplate = $("#thankYouMessageTemplate");
            // If user signup date is given
            if (data.userSignupWeek !== null) {
              // If user action was a thumbs up.
              if (isThumbsUp) {
                // Check if user has provided store rating before.
                if (data.askForStoreRating) {
                  if (data.userSignupWeek >= 5) {
                    if (!data.hasRatedBefore) {
                      // Show store rating popup.
                      ratingTemplate.removeClass("hidden");
                    }
                  } else {
                    chrome.runtime.sendMessage(
                      {
                        what: 'updateSessionRatingMessageUserInteraction',
                        status: true
                      },
                      function() {
                        options.current_session.sessionRatingMessageUserInteraction = true;
                      }
                    );
                    // Hide store rating popup.
                    ratingTemplate.addClass("hidden");
                    // Show thank you message.
                    thankYouMessageTemplate.fadeIn("fast");
                    // Hide thank you message.
                    setTimeout(() => {
                      thankYouMessageTemplate.fadeOut("fast");
                    }, 3200);
                  }
                } else {
                  // Hide store rating popup.
                  ratingTemplate.addClass("hidden");
                  // Check if user has referred a friend before.
                  if (data.showReferredAFriend) {
                    // Show refer a friend popup.
                    referAFriendPopup.removeClass('hidden');

                    // Gather Event Props and Send Mixpanel Event.
                    let data = pVn.getDesireOutcomePromptTypeAndSessionType(options);
                    // Send event
                    chrome.runtime.sendMessage(
                      {
                        what: 'referredAFriendPopupAppearsEvent',
                        sessionType: data.eventPropSessionType,
                        promptType: data.eventPropPromptType
                      },
                      function() {}
                    );
                  } else {
                    referAFriendPopup.addClass('hidden');
                    if (data.showThankYouMessage) {
                      chrome.runtime.sendMessage(
                        {
                          what: 'updateSessionRatingMessageUserInteraction',
                          status: true
                        },
                        function() {
                          options.current_session.sessionRatingMessageUserInteraction = true;
                        }
                      );
                      // Show thank you message.
                      thankYouMessageTemplate.fadeIn("fast");
                      // Hide thank you message.
                      setTimeout(() => {
                        thankYouMessageTemplate.fadeOut("fast");
                      }, 3200);
                    } else {
                      // Hide refer a friend popup.
                      thankYouMessageTemplate.fadeOut("fast");
                    }
                  }
                }
              }
              // Hide session rating message.
              sessionRatingMessageTemplate.addClass("hidden");
            }
            if (data.userSignupWeek === null) {
              if (isThumbsUp) {
                chrome.runtime.sendMessage(
                  {
                    what: 'updateSessionRatingMessageUserInteraction',
                    status: true
                  },
                  function() {
                    options.current_session.sessionRatingMessageUserInteraction = true;
                  }
                );
              }
              // Hide session rating message.
              sessionRatingMessageTemplate.addClass("hidden");
              // Show thank you message.
              thankYouMessageTemplate.fadeIn("fast");
              // Hide thank you message.
              setTimeout(() => {
                thankYouMessageTemplate.fadeOut("fast");
              }, 3200);
            }
          };
          chrome.runtime.sendMessage(
            {
              what: 'updateSessionRating',
              status: isThumbsUp,
              options: options
            },
            onSessionRatingChange
          );
        }
      );
    });

    // Feedback Form submission.
    $(document).on('submit', '#desireOutcomeFeedbackTemplate form', function(e) {
      options.current_session.desiredOutcomeMessageUserInteraction = true;
      options.current_session.sessionRatingMessageUserInteraction = true;
      e.preventDefault();
      let formData = $(this).serializeArray();
      let requestData = {};

      // Collect data for mixpanel event properties.
      if (formData.length > 0) {
        if (formData[0].name === "reason") {
          requestData.reason = formData[0].value;
        }
        if (formData[1].name === "otherReason" && formData[1].value !== "") {
          requestData.otherReason = formData[1].value;
        }

        let feedbackFormCallback = function(data) {
          let feedbackTemplate = $('#desireOutcomeFeedbackTemplate');
          // Hide feedback form.
          feedbackTemplate.addClass("hidden");

          let thankYouMessageTemplate = $("#thankYouMessageTemplate");

          if (data.showThankYouMessage) {
            // Show refer a friend popup.
            thankYouMessageTemplate.fadeIn("fast");
            // Hide refer a friend popup after 2 seconds.
            setTimeout(() => {
              thankYouMessageTemplate.fadeOut("fast");
            }, 3200);
          }
        };
        // Gather Props for Event
        let extraData = {};
        extraData.rating = false;
        // Gather Event Props and Send Mixpanel Event.
        let data = pVn.getDesireOutcomePromptTypeAndSessionType(options, extraData);
        // Send event
        chrome.runtime.sendMessage(
          {
            what: 'sessionFeedbackReasonsEvent',
            connectVia: data.connectVia,
            countryName: data.countryName,
            sessionType: data.eventPropSessionType,
            promptType: data.eventPropPromptType,
            rating: data.rating,
            reason: (requestData.reason) ? requestData.reason : "",
            comment: (requestData.otherReason) ? requestData.otherReason : "",
            submit: true,
            userEmail: options.user_email,
            userFullName: options.clientUserName
          }
        );

        chrome.runtime.sendMessage(
          {
            what: 'submitFeedbackFormResult',
            data: requestData
          },
          feedbackFormCallback
        );
      }
    });

    // Click event on feedback form skip button.
    $(document).on('click', '#desireOutcomeFeedbackTemplate #feedbackSkipButton', function() {
      let feedbackSkipButtonCallback = function(data) {
        let feedbackTemplate = $('#desireOutcomeFeedbackTemplate');
        // let thankYouMessageTemplate = $("#thankYouMessageTemplate");
        let talkToSupportMessagePopup = $("#talkToSupportMessagePopup");
        // Hide feedback form.
        feedbackTemplate.addClass("hidden");
        talkToSupportMessagePopup.removeClass("hidden");
      };
      let extraData = {};
      extraData.rating = false;
      // Gather Event Props and Send Mixpanel Event.
      let data = pVn.getDesireOutcomePromptTypeAndSessionType(options, extraData);
      // Send event
      chrome.runtime.sendMessage(
        {
          what: 'sessionFeedbackReasonsEvent',
          connectVia: data.connectVia,
          countryName: data.countryName,
          countryCode: data.countryCode,
          sessionType: data.eventPropSessionType,
          promptType: data.eventPropPromptType,
          rating: data.rating,
          reason: "SKIP",
          comment: "",
          userEmail: options.user_email,
          userFullName: options.clientUserName,
          submit: false
        }
      );

      chrome.runtime.sendMessage(
        {
          what: 'feedbackSkipButton'
        },
        feedbackSkipButtonCallback
      );
    });

    $(document).on('click', '#talkToSupportMessagePopup .btn', function() {
      let button = $(this).val();

      let talkToSupportCallback = function(data) {
        let thankYouMessageTemplate = $("#thankYouMessageTemplate");
        $("#talkToSupportMessagePopup").addClass("hidden");

        if (data.sessionRatingMessageProvided) {
          options.current_session.sessionRatingMessageProvided = data.sessionRatingMessageProvided;
        }

        if (data.showThankYouMessage) {
          // Show refer a friend popup.
          thankYouMessageTemplate.fadeIn("fast");
          // Hide refer a friend popup after 2 seconds.
          setTimeout(() => {
            thankYouMessageTemplate.fadeOut("fast");
          }, 3200);
        }

        if (data.button_value === "YES") {
          chrome.tabs.create({url: LIVE_CHAT_URL});
        }
      };
      // Send event
      chrome.runtime.sendMessage(
        {
          what: 'liveChatPopupEvent',
          action: button
        }
      );

      chrome.runtime.sendMessage(
        {
          what: 'talkToSupportPopup',
          value: button
        }, talkToSupportCallback
      );
    });

    // Change event on feedback form radio inputs (reasons).
    $(document).on('change', '#desireOutcomeFeedbackTemplate input[type="radio"]', function() {
      if ($(this).is(":checked")) {
        let value = $(this).val();
        let textarea = $("#desireOutcomeFeedbackTemplate .textarea");
        if (value === "Other") {
          textarea.attr('required', true);
        } else {
          textarea.attr('required', false);
        }
      }
    });

    // Change event on feedback form radio inputs (reasons).
    $(document).on('click', '#desireOutcomeStoreRatePopup .btn', function() {
      let button = $(this).val();

      let storeRatePopupCallback = function(data) {
        let thankYouMessageTemplate = $("#thankYouMessageTemplate");
        $("#desireOutcomeStoreRatePopup").addClass("hidden");

        if (data.button_value === "YES") {
          chrome.tabs.create({url: STORE_FEEDBACK_URL});
        }
        if (data.button_value === "CLOSE" || data.button_value === "NO") {
          options.desired_outcome.hasRatedBefore = true;
        }

        if (data.showThankYouMessage) {
          // Show refer a friend popup.
          thankYouMessageTemplate.fadeIn("fast");
          // Hide refer a friend popup after 2 seconds.
          setTimeout(() => {
            thankYouMessageTemplate.fadeOut("fast");
          }, 3200);
        }
      };

      // Collect Event Props and send Mixpanel Event.
      let data = pVn.getDesireOutcomePromptTypeAndSessionType(options);
      let buttonText;
      if (button === "NO") {
        buttonText = "Maybe Later";
      } else if (button === "CLOSE") {
        buttonText = "Close";
      } else {
        buttonText = "RATE US";
        options.current_session.desiredOutcomeMessageUserInteraction = true;
        options.current_session.sessionRatingMessageUserInteraction = true;
      }
      // Send event
      chrome.runtime.sendMessage(
        {
          what: 'storeRatePopupEvent',
          action: buttonText,
          promptType: data.eventPropPromptType
        }
      );

      chrome.runtime.sendMessage(
        {
          what: 'updateStoreRatePopup',
          value: button
        }, storeRatePopupCallback
      );
    });

    // Bind click events for refer a friend yes or no buttons.
    $(document).on('click', '#referAFriendPopup .btn', function() {
      let button = $(this).val();
      let link = $(this).attr('data-link');
      link = (link) ? link : null;

      if (button === "COPY LINK") {
        options.current_session.desiredOutcomeMessageUserInteraction = true;
        options.current_session.sessionRatingMessageUserInteraction = true;
      }

      let updateReferAFriendPopupCallback = function(data) {
        let thankYouMessageTemplate = $("#thankYouMessageTemplate");

        if (data.button_value === "COPY LINK") {
          // Gather Event Props and Send Mixpanel Event.
          let data = pVn.getDesireOutcomePromptTypeAndSessionType(options);
          // Send event
          chrome.runtime.sendMessage(
            {
              what: 'referredAFriendPopupClickEvent',
              connectVia: data.connectVia,
              countryName: data.countryName,
              promptType: data.eventPropPromptType
            },
            function() {}
          );
          // Copy Link
          navigator.clipboard.writeText(link).then(function() {
            $("#referAFriendPopup").addClass("hidden");
          }, function() { });
        } else {
          $("#referAFriendPopup").addClass("hidden");
        }

        if (data.showThankYouMessage) {
          // Show refer a friend popup.
          thankYouMessageTemplate.fadeIn("fast");
          // Hide refer a friend popup after 2 seconds.
          setTimeout(() => {
            thankYouMessageTemplate.fadeOut("fast");
          }, 3200);
        }
      };

      chrome.runtime.sendMessage(
        {
          what: 'updateReferAFriendPopup',
          value: button,
          link: link
        }, updateReferAFriendPopupCallback
      );
    });

    // Bind click events for DO message popup yes or no buttons.
    $(document).on('click', '#desireOutcomeMessagePopup .btn', function() {
      let button = $(this).val();

      let onDesireOutcomeChange = function(data) {
        let feedbackTemplate = $('#desireOutcomeFeedbackTemplate');
        let desireOutcomeMessagePopup = $("#desireOutcomeMessagePopup");
        let thankYouMessageTemplate = $("#thankYouMessageTemplate");
        if (typeof data.global !== "undefined") {
          options.desired_outcome.global = data.global;
        }
        if (data.rating) {
          if (data.userSignupWeek !== null) {
            // Check if variable show feedback is true
            if (data.showFeedbackForm) {
              // Show feedback form
              feedbackTemplate.removeClass("hidden");
            } else {
              // Hide feedback form
              feedbackTemplate.addClass("hidden");
              let ratingTemplate = $("#desireOutcomeStoreRatePopup");
              if (data.askForStoreRating || !data.hasRatedBefore) {
                if (data.userSignupWeek >= 5) {
                  // Show store rating popup.
                  ratingTemplate.removeClass("hidden");
                } else {
                  // Hide store rating popup.
                  ratingTemplate.addClass("hidden");
                  // Show thank you message.
                  thankYouMessageTemplate.fadeIn("fast");
                  // Hide thank you message.
                  setTimeout(() => {
                    thankYouMessageTemplate.fadeOut("fast");
                  }, 3200);
                }
              } else {
                ratingTemplate.addClass("hidden");
              }
            }
            // Hide desire outcome popup.
            desireOutcomeMessagePopup.addClass("hidden");
          }
          if (data.userSignupWeek === null) {
            // Hide desire outcome popup.
            desireOutcomeMessagePopup.addClass("hidden");
            // Show thank you message.
            thankYouMessageTemplate.fadeIn("fast");
            // Hide thank you message.
            setTimeout(() => {
              thankYouMessageTemplate.fadeOut("fast");
            }, 3200);
          }
        } else {
          // Hide desire outcome popup.
          desireOutcomeMessagePopup.addClass("hidden");
          // Check if variable show feedback is true
          if (data.showFeedbackForm) {
            // Show feedback form
            feedbackTemplate.removeClass("hidden");
          } else {
            // Hide feedback form
            feedbackTemplate.addClass("hidden");
            // Show thank you message.
            thankYouMessageTemplate.fadeIn("fast");
            // Hide thank you message.
            setTimeout(() => {
              thankYouMessageTemplate.fadeOut("fast");
            }, 3200);
          }
        }
      };
      let extraData = {};
      extraData.rating = (button === "YES");
      // Gather Event Props and Send Mixpanel Event.
      let data = pVn.getDesireOutcomePromptTypeAndSessionType(options, extraData);
      // Send event
      chrome.runtime.sendMessage(
        {
          what: 'ratingOrDOFeedbackEvent',
          sessionType: data.eventPropSessionType,
          promptType: data.eventPropPromptType,
          rating: data.rating
        }
      );

      // Update Desire Outcome
      chrome.runtime.sendMessage(
        {
          what: 'updateDesireOutcome',
          status: (button === "YES"),
          options: options
        },
        onDesireOutcomeChange
      );
    });

    // Bind click events for DO message popup yes or no buttons.
    $(document).on('click', '#desireOutcomeMessagePopup2 .btn', function() {
      $("#desireOutcomeMessagePopup2").addClass("hidden");
    });
  });
  var searchInLi = function(ele) {
    var valThis = ele.val().toLowerCase();
    $('ul.stngs-lang li').each(function() {
      var text = $(this).find("span:last").text().toLowerCase();
      if (text.trim().includes(valThis)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  };
  var appearNoResFvrts = function(ele1, ele2) {
    var noResFound = 'noResFound';
    if ($('#' + ele1 + ' li').length > 0) {
      if (ele2 === 0) {
        $('#' + ele1).addClass(noResFound);
      } else {
        $('#' + ele1).removeClass(noResFound);
      }
    }
  };

  var appearNoResList = function(ele1, ele2) {
    var noResFound = 'noResFound';
    if (ele1 === 0) {
      $('#' + ele2).addClass(noResFound);
      $('.searchEmptyCont').show();
      $('.srchFavourites').hide();
      $('.allCountries h4').hide();
    } else {
      $('#' + ele2).removeClass(noResFound);
      $('.searchEmptyCont').hide();
      $('.srchFavourites').show();
      $('.allCountries h4').show();
    }
  };

  var removeNoRes = function(ele) {
    $('ul.stngs-lang li').show();
    $(ele).removeClass('noResFound');
    $('.searchEmptyCont').hide();
    $('.srchFavourites').show();
    $('.allCountries h4').show();
  };
  //! Search countries list with input field
  $(document).on('keyup', '.srchCountryField', function() {
    if ($(this).val() !== null && $(this).val() !== '') {
      var valThis = $(this).val().toLowerCase();
      $('ul.stngs-lang li').each(function() {
        var text = $(this).find("span:last").text().toLowerCase();
        /* eslint no-unused-expressions: [2, { allowTernary: true }]*/
        text.startsWith(valThis) ? $(this).show() : $(this).hide();
      });
      var countriesListFavourites = 'countriesListFavourites';
      var countriesList = 'countriesList';
      var noResFound = 'noResFound';
      var searchResultFavrtsCountries =
      checkSearchResult(countriesListFavourites);
      if ($('#' + countriesListFavourites + ' li').length > 0) {
        searchResultFavrtsCountries === 0 ?
          $('#' + countriesListFavourites).addClass(noResFound) :
          $('#' + countriesListFavourites).removeClass(noResFound);
      }
      var searchResultCountries = checkSearchResult(countriesList);
      if (searchResultCountries === 0) {
        $('#' + countriesList).addClass(noResFound);
        $('.searchEmptyCont').show();
        $('.srchFavourites').hide();
        $('.allCountries h4').hide();
      } else {
        $('#' + countriesList).removeClass(noResFound);
        $('.searchEmptyCont').hide();
        $('.srchFavourites').show();
        $('.allCountries h4').show();
      }
    } else {
      $('ul.stngs-lang li').show();
      $('#countriesList').removeClass('noResFound');
      $('#countriesListFavourites').removeClass('noResFound');
      $('.searchEmptyCont').hide();
      $('.srchFavourites').show();
      $('.allCountries h4').show();
    }
  });
  //! Search channels list with input field
  $(document).on('keyup', '.srchChannelField', function() {
    if ($(this).val() !== null && $(this).val() !== '') {
      searchInLi($(this));
      var channelsListFavourites = 'channelsListFavourites';
      var channelsList = 'channelsList';
      var searchResultFavrtsChannels = checkSearchResult(
        channelsListFavourites);
      var searchResultChannels = checkSearchResult(channelsList);

      appearNoResFvrts(channelsListFavourites, searchResultFavrtsChannels);
      appearNoResList(searchResultChannels, channelsList);
    } else {
      removeNoRes('#channelsList');
      removeNoRes('#channelsListFavourites');
    }
  });
  /**
   * checkSearchResult.
   * @param {string} item id
   * @return {int} total numbers
  */
  function checkSearchResult(item) {
    var totalNumbers = $('#' + item + ' li').filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    return totalNumbers;
  }

  $(document).on('click', '.searchEmptyBtn', function() {
    $("#a").css("display", "block");
    $("#b").css("display", "block");
  });

  $(document).on('click', '.cancelRequest', function() {
    if ($(this).hasClass('referFrnd')) {
      $('.backbtn ').click();
    }

    $("#a").fadeOut('slow');
    $("#b").fadeOut('slow', function() {
      $('.content textarea').val('');
    });
  });

  $(document).on('click', '.submitRequest', function() {
    var locationVal = $('.content textarea').val();
    var type = $(this).parent().parent().attr('data-type');

    if (locationVal !== '') {
      locationVal = locationVal.toLowerCase();
      $("#a").fadeOut('slow');
      $("#b").fadeOut('slow', function() {
        $('.content textarea').val('');
      });
      chrome.runtime.sendMessage({
        what: 'sendLocationRequest',
        comment: locationVal,
        type: type
      });
    }
  });

  //! Toggle favourite countries
  $(document).on('click', 'ul.stngs-lang li [type=checkbox]', function(e) {
    var elem = e.target;
    // console.log("regionCode:%s, status", regionCode, status);
    var showFavourite = function() {
      //! Add favourite country
      if (elem.checked === true) {
        var li = $(elem).parent().clone(true);
        $(li).addClass('rippleEffect');
        // removed class because onSearch it showing effect
        setTimeout(function() {
          $(li).removeClass('rippleEffect');
        }, 350);
        $('.srchFavourites ul').append(li);
        $(".fvrtText").addClass("hide");
        $('#citiesListFavourites,#countriesListFavourites,#channelsListFavourites').removeClass(
          'noResFound');
      } else {
        //! Remove favourite country from favourite box
        if ($(elem).parent().parent().attr("id") === 'citiesListFavourites' ||
        $(elem).parent().parent().attr("id") === 'citiesList') {
          $('.allCountries ul li [type=checkbox][for-city-id=' + elem
            .getAttribute("for-city-id") + ']').prop("checked", false);

          $('.srchFavourites ul li [type=checkbox][for-city-id=' + elem
            .getAttribute("for-city-id") + ']').parent().remove();
        } else {
          $('.allCountries ul li [type=checkbox][id=' + elem
            .getAttribute("id") + ']').prop("checked", false);
          setTimeout(function() {
            $('.srchFavourites ul li [type=checkbox][id=' + elem
              .getAttribute("id") + ']').parent().remove();
          }, 200);
        }

        if ($(".srchFavourites ul li").length === 0) {
          $(".fvrtText").removeClass("hide");
        }
      }
    };
    var onToggle = function(favourites) {
      options.favourites = favourites;
      showFavourite();
    };
    var onToggleChannel = function(favourites) {
      // console.log("params favourites > %s, ele > %s", favourites, ele);
      options.favouritesChannels = favourites;
      showFavourite();
    };
    var onToggleCity = function(favourites) {
      options.favouritesCities = favourites;
      showFavourite();
    };
    if ($(this).parents('ul').attr('id') === 'countriesList' ||
      $(this).parents('ul').attr('id') === 'countriesListFavourites') {
      chrome.runtime.sendMessage({
        what: 'editFavourite', countryCode: elem.getAttribute("id"),
        status: elem.checked
      }, onToggle);
    } else if ($(this).parents('ul').attr('id') === 'channelsList' ||
      $(this).parents('ul').attr('id') === 'channelsListFavourites') {
      chrome.runtime.sendMessage({
        what: 'editFavouriteChannel', channelCode: elem.getAttribute("id"),
        status: elem.checked
      }, onToggleChannel);
    } else if ($(this).parents('ul').attr('id') === 'citiesList' ||
      $(this).parents('ul').attr('id') === 'citiesListFavourites') {
      chrome.runtime.sendMessage({
        what: 'editFavouriteCity', cityCode: elem.getAttribute("for-city-id"),
        status: elem.checked
      }, onToggleCity);
    }
  });
  //! set default country
  /* $(document).on('click', '.stngs-lang li span:first-child', function(e){
        var elem = ( !e.target.getAttribute("data-code") ) ? e.target.parentNode : e.target;
        $('.stngs-lang li span:first-child').css('pointer-events','none');
        var onSetCountry = function(){
            isBack = true;
            isChangeCountry = true;
            getPopupLoad();
        };
        chrome.runtime.sendMessage({what: 'defaultCountry', countryCode: elem.getAttribute("data-code")}, onSetCountry);
    });*/
  $(document).on('click',
    '.stngs-lang li > span', function(e) {
      var serverKey = '';
      var elem = (e.target.getAttribute("data-code")) ?
        e.target : e.target.parentNode;
      $('.stngs-lang li > span').css('pointer-events', 'none');
      var code = elem.getAttribute("data-code");
      var cityHostname = '';
      var serverName = '';

      if ($(this).parents('ul').attr('id') === 'channelsListFavourites' ||
      $(this).parents('ul').attr('id') === 'channelsList') {
        serverKey = 'purposeCode';
      } else if ($(this).parents('ul').attr('id') === 'citiesListFavourites' ||
      $(this).parents('ul').attr('id') === 'citiesList') {
        serverKey = 'cityCode';
        code = $(this).parent().find('.moreServers').attr('data-city-id');
        serverName = $(this).parent().find('span span').text();
      } else if ($(this).parents('ul').attr('id') === 'cityServersList') {
        serverKey = 'cityServerCode';
        code = $(this).parent().find('input').attr('id');
        cityHostname = $(this).parent().find('span').attr('data-host');
        serverName = $(this).parent().find('span span').text();
      } else {
        serverKey = 'countryCode';
      }

      var onSetCountry = function() {
        isBack = true;
        isChangeCountry = true;
        getPopupLoad();
      };
      var setCountry = function() {
      // console.log("serverKey > set country > %s", serverKey);
        chrome.runtime.sendMessage({
          what: 'defaultCountry', countryCode: code,
          serverKey: serverKey, cityHostname: cityHostname, serverName: serverName},
        onSetCountry);
      };
      if (options.active !== false) {
        toggleConnect(false, setCountry);
        return;
      }
      setCountry();
    });
  $(document).on('click', '.notAvailBtn', function() {
    window.close();
  });
  $(document).off('click', '.upgradeBtn')
    .on('click', '.upgradeBtn', function(e) {
      e.preventDefault();
      var btnCta = $(this).data("cta");
      var upgradeAccountSource = "";
      if (btnCta.startsWith("Country")) {
        upgradeAccountSource = 'country';
      } else if (btnCta.startsWith("Channel")) {
        upgradeAccountSource = 'channel';
      } else if (btnCta.startsWith("Banner")) {
        upgradeAccountSource = 'banner';
      }
      chrome.runtime.sendMessage({
        what: 'openUpgradeAccount',
        upgradeText: btnCta,
        upgradeFrom: upgradeAccountSource
      });
    });
})();
$(document).on("input", 'input.userCredentials', function() {
  chrome.runtime.sendMessage({
    what: "clientUserName", clientUserName: $('.username').val()
  });
  if ($('.username').val() !== "" && $('.password').val() !== "") {
    $('#btnLogin').removeAttr('disabled');
  } else {
    $('#btnLogin').attr('disabled', 'disabled');
  }
});

var saveSignupDetail = function() {
  chrome.runtime.sendMessage({
    what: "clientSignupDetail", email: $('.signup-body .email').val(), consent: $('#agree_terms_policy').prop("checked")});
};
$(document).on("input", '.signup-body .email', function() {
  saveSignupDetail();
});
$(document).on("change", '#agree_terms_policy', function() {
  saveSignupDetail();
});
$(document).on("click", '#other_proxy_services a', function() {
  chrome.tabs.create({url: $(this).attr('href')});
});
$(document).on("click", '.app-links a', function(e) {
  e.preventDefault();
  var appName = $(this).data('appname');
  chrome.runtime.sendMessage({what: 'openApplicationPage', appname: appName}, pVn.nofunc);
});
$(document).on("click", '.stngs-list li.feedbck', function() {
  chrome.runtime.sendMessage({what: 'feedBack'}, pVn.nofunc);
});
$(document).on("click", '.stngs-list .feedbck', function(e) {
  e.preventDefault();
  chrome.runtime.sendMessage({
    what: "showFeedbackPage"});
});
//! Trigger Upgrade account

$(document).on("click", '#hideError', function() {
  $(this).parent().addClass('hide');
});
$(document).on("click", '.closeCampaignBanner', function(e) {
  e.stopPropagation();
  $(this).parents().find('.update-account').fadeOut();
  $('.footer-wrap').show();
  $('.scroll-wrap').removeClass('scroll-wrap-2');
  chrome.runtime.sendMessage({
    what: 'campaignBanner',
    status: 'close'
  });
});
$(document).on("click", '.popupCampaign > span.closeCampaignPopup', function() {
  $(this).parents().find('.popupCampaign').fadeOut();
  chrome.runtime.sendMessage({
    what: 'campaignPopUp',
    status: 'close'
  });
});
$(document).on("click", '.popupCampaign > a', function() {
  $(this).parents().find('.popupCampaign').fadeOut();
  chrome.runtime.sendMessage({
    what: 'campaignPopUp',
    status: 'click'
  });
});
$(document).on("click", ".terms_condition_links", function() {
  chrome.runtime.sendMessage({
    what: 'showSignupScreen',
    status: 'click'
  });
});
