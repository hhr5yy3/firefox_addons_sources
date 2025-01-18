(function () {

    let failedRequestsByModemsCount = {};
    

    function populateModems() {
        $('#modemsLoader').show();
        var $modemsList =  $("#modemsList");
        var $modemsListItems = $modemsList.find('.js--modem-items');

        ApiManager.getModemNames(
            function (modemNames) {

                ApiManager.readModemReservations(
                    function(reservations) {
                        let reloadModemNames = false;
                        console.log("MY RESERVATIONS",reservations);
                        $modemsListItems.html("");
                       // reservations = [];
                        let firstReservation = null;
                        reservations.forEach(
                            function(reservation) {
                                if(firstReservation == null) {
                                    firstReservation = reservation;
                                }

                                let modemName = "";
                                let modemMcc = "";

                                if(modemNames.hasOwnProperty(reservation.msisdn)) {
                                    modemName = modemNames[reservation.msisdn].operatorName;
                                    modemMcc = modemNames[reservation.msisdn].nwc;
                                    modemMcc = modemMcc.substring(0, 3);
                                } else{
                                    reloadModemNames = true;
                                }


                                let startTime = new Date(reservation['timeStart']);
                                let endTime = new Date(reservation['timeEnd']);



                                let modemItem = '<div class="item js--modem-reservation" data-msisdn="'+reservation.msisdn+'" data-reservationid="'+reservation.id+'">';

                                modemItem += '<span class="title">'
                                modemItem += '  <i class="flag flag'+modemMcc+'"></i>'+modemName
                                modemItem += '  <span class="title-number">'+reservation.msisdn+'</span>'
                                modemItem += '</span>'
                                modemItem += '    <span class="time" title="' + startTime.getHours()+":"+ ('0'+startTime.getMinutes()).slice(-2) + " - " + endTime.getHours()+":"+('0'+endTime.getMinutes()).slice(-2)+'" data-toggle="modems-tooltip" data-placement="left">'
                                modemItem += '    <i class="fa fa-clock-o"></i>'
                                modemItem += '    </span>'
                                modemItem += '    </div>'
                                $modemsListItems.append(modemItem);
                            }
                        );

                        $('.js--modem-reservation').on('click', function() {
                            let $modemEl = $(this);
                            let modem = {
                                'id' : $modemEl.attr('data-reservationid'),
                                'msisdn' : $modemEl.attr('data-msisdn')
                            }
                            $modemsList.hide();
                            $("#activeModem").hide();
                            polyfill.storageLocalSet({'selectedModem': modem}, function(){
                                ApiManager.selectModem(modem.msisdn);
                                populateModems();
                            });


                        })

                        $('.js--reload-modems').on('click', function() {
                            $modemsList.hide();
                            $("#activeModem").hide();
                            ApiManager.clearCache(populateModems, populateModems);
                        })

                        polyfill.storageLocalGet("modemWifiReservationId",
                            function(modWifi) {
                                let modemWifiReservationId = null;
                                if (modWifi.hasOwnProperty('modemWifiReservationId')) {
                                    modemWifiReservationId = modWifi.modemWifiReservationId;
                                }
                                polyfill.storageLocalGet("selectedModem",
                                    function (result) {
                                        let needSelect = false;
                                        let selectedModem = null;
                                        if (result.hasOwnProperty('selectedModem')) {
                                            selectedModem = result['selectedModem'];
                                            if(selectedModem != null) {
                                                let found = reservations.find( res => res.id == selectedModem.id )

                                                if(found == undefined) {
                                                    selectedModem = null;
                                                } else {
                                                    selectedModem = found;
                                                }
                                            }
                                        }
                                        if(selectedModem == null)  {
                                            needSelect = true;
                                            selectedModem = firstReservation;
                                        }


                                        if(selectedModem != null) {

                                            let modemName = "";
                                            let modemMcc = "";

                                            if(modemNames.hasOwnProperty(selectedModem.msisdn)) {
                                                modemName = modemNames[selectedModem.msisdn].operatorName;
                                                modemMcc = modemNames[selectedModem.msisdn].nwc;
                                                modemMcc = modemMcc.substring(0, 3);
                                            }
                                            let failed = 0;
                                            if(failedRequestsByModemsCount.hasOwnProperty(selectedModem.msisdn)) {
                                                failed = failedRequestsByModemsCount[selectedModem.msisdn]
                                            }

                                            if(failed > 99) {
                                                failed = "99+";
                                            }
                                            let activeWifi = "";
                                            if(modemWifiReservationId != null && modemWifiReservationId == selectedModem.id) {
                                                activeWifi = " active";
                                            }
                                            let amHtml = ' <span class="icon-wifi '+activeWifi+'">' // dodati .active klasu na icon-wifi
                                            amHtml += '     <i class="fa fa-wifi"></i>'
                                            amHtml += '    </span>'
                                            amHtml += '    <span class="title"><i class="flag flag'+modemMcc+'"></i>'+modemName;
                                            amHtml += '     <span class="title-number">'+selectedModem.msisdn+'</span>'
                                            amHtml += '    </span>'
                                            amHtml += '    <span class="number" id="activeModemFailedRequests">'+failed+'</span>'
                                            amHtml += '    <span class="arrows js--modem-arrows">'
                                            amHtml += '     <i class="fa fa-sort-up"></i>'
                                            amHtml += '     <i class="fa fa-sort-down"></i>'
                                            amHtml += '    </span>'

                                            $("#activeModem").attr('data-msisdn',selectedModem.msisdn );
                                            $("#activeModem").attr('data-reservationid',selectedModem.id );

                                            $("#activeModem").html(amHtml);

                                            if (needSelect) {
                                                polyfill.storageLocalSet({'selectedModem': selectedModem});
                                            }
                                            ApiManager.selectModem(selectedModem.msisdn)

                                            $('.js--modem-arrows').on('click', function(){
                                                $('#modemsList').slideToggle('slow')
                                            })

                                            $("#activeModemFailedRequests").click(function () {
                                                polyfill.tabsCreate(
                                                    {
                                                        active: true,
                                                        url: browser.runtime.getURL(`ui/settings.html?tab=tab-failed-requests`)
                                                    }
                                                );
                                                window.close();
                                            });

                                            $(".icon-wifi").on('click', function() {
                                                let wifiEl = $(this);
                                                let modemReservation = $("#activeModem").attr('data-reservationid');
                                                let modemMsisdn = $("#activeModem").attr('data-msisdn');
                                                let enable = !wifiEl.hasClass('active');
                                                ApiManager.wifiMode(modemReservation, enable,
                                                    function(res){
                                                        wifiEl.removeClass('error');
                                                        wifiEl.toggleClass('active');

                                                    },
                                                    function(err, status, xhr){
                                                        console.log(err, status, xhr)
                                                        wifiEl.addClass('error');
                                                        wifiEl.removeClass('active');
                                                    }
                                                )
                                            })
                                        }
                                    },
                                    function (error) { }
                                )
                            },
                            function (){}
                        )


                        $('#modemsLoader').hide();

                        if(reservations.length == 0) {
                            $('#noActiveModems').show();
                            $('#activeModem').hide();
                            polyfill.storageLocalSet({'selectedModem': null});

                            polyfill.runtimeSendMessage({
                                    command: "popup-stopProxy"
                                },
                                function(res){},  function(err){}
                            );
                            changeProxyStatus('0');

                        } else {
                            $('[data-toggle="modems-tooltip"]').tooltip();
                            $('#activeModem').show();
                            $('#noActiveModems').hide();

                        }

                        if(reloadModemNames) {
                            polyfill.storageLocalSet({'modemNames': {}});
                        }

                    },
                    function(ex) {
                        showUnableToConnect()
                    }
                );
            },
            function() {
                Debug.log("awdasd 14 ");
                showUnableToConnect()
            }
        )

    }

    function showUnableToConnect() {
        $("#unableToConnect").show();
        $("#mainAppLoaded").hide();
    }

    function handleMessages(message, sender, sendResponse) {

        console.log("handleMessages", message);
        if (message.hasOwnProperty('command') && message.command == "webRequestProxyFailedRequests") {
            let authFailed = [];
            let requestsFailed = [];
            if(message.hasOwnProperty('authFailed')) {
                authFailed = message["authFailed"]
            }

            if(message.hasOwnProperty('requestsFailed')) {
                requestsFailed = message["requestsFailed"];
            }
            failedRequestsByModemsCount = {};
            countFailedRequestsByModems(requestsFailed);
            countFailedRequestsByModems(authFailed);

            if($("#activeModem").length > 0) {
                let msi = $("#activeModem").attr('data-msisdn');
                if(failedRequestsByModemsCount.hasOwnProperty(msi)) {
                    let failed = failedRequestsByModemsCount[msi]
                    if(failed > 99) {
                        failed = "99+";
                    }
                    $("#activeModemFailedRequests").html(failed)
                }

            }

            // Chrome requires a response
            if (sendResponse)
                sendResponse(null);

            return;
        }
    }



    function countFailedRequestsByModems(failedRequests) {

        if (failedRequests && failedRequests.length > 0) {

            for (let i = 0; i < failedRequests.length; i++) {
                let request = failedRequests[i];
                if(request.hasOwnProperty('activeModem')) {
                    if(!failedRequestsByModemsCount.hasOwnProperty(request['activeModem'])) {
                        failedRequestsByModemsCount[request['activeModem']] = 0;
                    }
                    failedRequestsByModemsCount[request['activeModem']]++;
                }
            }
        }


    }

    function populateDataForPopup(dataForPopup) {
        if(!dataForPopup.proxyMode) {
            dataForPopup.proxyMode = '0';
        }
        initializeProxyStatus(dataForPopup.proxyMode, dataForPopup);

        populateModems();

    }

    function changeProxyStatus(proxyMode) {
        let $statusToggler = $("#proxyStatus")
        if(proxyMode == '1') {
            $statusToggler.addClass('on');
        } else {
            $statusToggler.removeClass('on');
        }
    }

    function initializeProxyStatus(proxyMode, dataForPopup) {

        let $proxyStatus = $("#proxyStatus");

        changeProxyStatus(proxyMode);

        $proxyStatus.on('click', function () {
            let started = $(this).hasClass('on');

            if(started) {
                polyfill.runtimeSendMessage({
                        command: "popup-stopProxy"
                    },
                    function(res){},  function(err){}
                );
                changeProxyStatus('0');
                
            } else {
                let proxySettings = dataForPopup.proxySettings ? dataForPopup.proxySettings : {};
                let simtestApiSettings = dataForPopup.simtestApiSettings ? dataForPopup.simtestApiSettings : {};


                if ($("#activeModem").length > 0 && $("#activeModem").attr('data-msisdn') != "" && $("#activeModem").attr('data-msisdn') != undefined) {
                    let opts = {
                        command: "popup-startProxy",
                        proxySettings: proxySettings,
                        simtestApiSettings: simtestApiSettings
                    };


                    opts['activeModem'] = $("#activeModem").attr('data-msisdn')
                    opts['browserLanguage'] = $(".js--languageSelect").val();

                        polyfill.runtimeSendMessage(opts,
                            function(res){},
                            function(err){}
                        );
                        changeProxyStatus('1');

                }
                
            }
        })
    }


    function initialize() {

        $(".js--openSettings").on('click', function () {
            polyfill.runtimeOpenOptionsPage();
            window.close();
        });

        $(".js--languageSelect").on('change', function(){
            let lang = $(this).val();
            polyfill.storageLocalSet({'customLanguage': lang});
            let opts = {
                command: "popup-selectLanguage",
                language: lang
            };
            polyfill.runtimeSendMessage(opts,
                function(res){},
                function(err){}
            );
        })

        $(".js--userAgentSelect").on('change', function(){
            let ua = $(this).val();
            polyfill.storageLocalSet({'customUserAgent': ua});
            let opts = {
                command: "popup-selectUserAgent",
                value: ua
            };
            polyfill.runtimeSendMessage(opts,
                function(res){},
                function(err){}
            );
        })

        polyfill.storageLocalGet(null,
            function (dataForPopup) {
                let allOK = true;

                if (dataForPopup.hasOwnProperty('customLanguage') && dataForPopup.customLanguage != null){
                    $(".js--languageSelect").val(dataForPopup.customLanguage);
                }

                if (dataForPopup.hasOwnProperty('customUserAgent') && dataForPopup.customUserAgent != null){
                    $(".js--userAgentSelect").val(dataForPopup.customUserAgent);
                }

                if (dataForPopup.hasOwnProperty('proxySettings')){
                    allOK = allOK && dataForPopup['proxySettings']['simtestProxyUrl'] != "";
                    allOK = allOK && dataForPopup['proxySettings']['simtestProxyPort'] != "";
                    allOK = allOK && dataForPopup['proxySettings']['username'] != "";
                    allOK = allOK && dataForPopup['proxySettings']['password'] != "";
                } else {
                    allOK = false;
                }

                if (!ApiManager.canDoApi() || !allOK) {

                //    if (!ApiManager.canDoApi()) {
                    // open the settings page to set proxy settings
                    //polyfill.runtimeOpenOptionsPage();
                    //window.close();

                    $("#mainLoader").hide();
                    $("#unableToConnect").show();
                    $("#mainAppLoaded").hide();
                }
                else {
                    $("#mainLoader").hide();
                    $("#unableToConnect").hide();
                    $("#mainAppLoaded").show();
                    populateDataForPopup(dataForPopup);
                }

            },
            function (error) {
                console.log("error",error)
            }
        );

        // start handling messages
        browser.runtime.onMessage.addListener(handleMessages);

    }


    ApiManager.initialize();

    // ------------------
    // ------------------
    // initialize the popup
    $(initialize);





})();