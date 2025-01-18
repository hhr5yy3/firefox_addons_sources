require('./includes');

(function () {
    Debug.enable();

    let failedRequestsByModemsCount = {};

    function showLoginform(boolvar) {

        if(boolvar == true) {
            $('.js--login-loader').hide();
            $('.js--loginform-submit').show();
            $('.js--loginform').show();
            $('.js--main-web-app-wrapper').hide();
        } else {
            $('.js--loginform').hide();
            $(".js--login-wrong").hide();
            $('.js--main-web-app-wrapper').show();
            $('.js--loginform-submit').show();
        }
    }


    function logout() {
        $('.js--login-loader').hide();
        $('.js--loginform-submit').show();
        Debug.info("logout");
        polyfill.runtimeSendMessage({
                command: "popup-logout"
            },
            function(res){
                polyfill.storageLocalSet({'selectedModem': null});
                activatePopupTab("home")

                showLoginform(true);
                ApiManager.clearCache()
            },  function(err){
                polyfill.storageLocalSet({'selectedModem': null});
                activatePopupTab("home")
                showLoginform(true);
                ApiManager.clearCache()
            }
        );
        polyfill.storageLocalSet({'selectedModem': null});
        activatePopupTab("home")
    }

    function login(u,p) {
        ApiManager.doLogin(
            {
                username: u,
                password:p
            }, function(userInfo){

                polyfill.runtimeSendMessage({
                        command: "popup-login",
                        username: u,
                        password: p
                    },
                    function(){
                        ApiManager.getModemNames( function(){
                                showLoginform(false);
                                updateUI();
                            },
                            function() {
                                    logout()
                                    showLoginWrongCreds()
                                }
                            )
                    }
                );
            },
            function () {
                logout();
                showLoginWrongCreds()
            });

    }

    function showLoginWrongCreds() {
        $('.js--login-loader').hide();
        $('.js--loginform-submit').show();
        $(".js--login-wrong").show();
    }

    function populateModems() {
        var $modemsList =  $("#modemsList");

        var $modemsListItems = $modemsList.find('.js--modem-items');

        $('.js--loading-modems').show();
        $modemsList.hide()
        $('#noActiveModems').hide();

        ApiManager.getModemNames(
            function (modemNames) {
                ApiManager.readModemReservations(
                    function(reservations) {
                        let reloadModemNames = false;
                        polyfill.storageLocalGet('firefox_newproxy', function(data){
                            if(data.hasOwnProperty('firefox_newproxy') && data['firefox_newproxy'] == true) {
                                Debug.log("newProxy OK" )
                                $('.has-firefox-newproxy').hide();
                            } else {
                                $('.has-firefox-newproxy').show();
                                Debug.log("newProxy ERROR")
                            }
                        })

                        Debug.log("MY RESERVATIONS",reservations);

                        $modemsListItems.html("");
                        // reservations = [];
                        let firstReservation = null;
                        let modemsList = {};
                        let countries = {};

                        let allModemsList = {};
                        let allCountries = {};

                        Object.values(modemNames).forEach(
                            function(modem) {
                                if( modem.active ) {
                                    allModemsList[modem.msisdn] = {
                                        'name' : modem.operatorName,
                                        'msisdn' : modem.msisdn,
                                        'country' : modem.countryName,
                                        'currencyCode': modem.currencyCode,
                                        'country_id' : modem.countryId,
                                        'ondemand': modem.onDemand,
                                        'nwc' : modem.nwc,
                                        'operatorName' : modem.operatorName,
                                        'mobileProxy' :  modem.capabilities.indexOf('mobileProxy') > -1,
                                        'active': modem.active
                                    };
                                    allCountries[ modem.countryName ] = {
                                        'name' : modem.countryName,
                                        'id' : modem.countryId,
                                        'code' : modem.currencyCode
                                    };
                                }
                            }
                        );


                        reservations.forEach(
                            function(reservation) {

                                if(firstReservation == null) {
                                    firstReservation = reservation;
                                }

                                let modemName = "";
                                let modemMcc = "";
                                let mobileProxy = true;
                                if(allModemsList.hasOwnProperty(reservation.msisdn)) {
                                    modemName = allModemsList[reservation.msisdn].operatorName;
                                    modemMcc = allModemsList[reservation.msisdn].nwc;
                                    modemMcc = modemMcc.substring(0, 3);
                                    mobileProxy = allModemsList[reservation.msisdn].mobileProxy;

                                    if( allModemsList[reservation.msisdn].active ) {
                                        modemsList[reservation.msisdn] = {
                                            'name' : modemName,
                                            'msisdn' : reservation.msisdn,
                                            'country' : modemNames[reservation.msisdn].countryName
                                        };
                                        countries[ modemNames[reservation.msisdn].countryName] = {
                                            'name' : modemNames[reservation.msisdn].countryName,
                                            'id' : modemNames[reservation.msisdn].countryId,
                                            'code' : modemNames[reservation.msisdn].currencyCode
                                        };
                                    }
                                } else{
                                    reloadModemNames = true;
                                }

                                let startTime = new Date(reservation['timeStart']);
                                let endTime = new Date(reservation['timeEnd']);

                                let modemItem = '';

                                let failed = 0;
                                if(failedRequestsByModemsCount.hasOwnProperty(reservation.msisdn)) {
                                    failed = failedRequestsByModemsCount[reservation.msisdn]
                                }

                                if(failed > 99) {
                                    failed = "99+";
                                }
                                let isActive = reservation.status == "Active";

                                modemItem += `
                                    <div class="reservations-item pending"  id="jsActivationModem_`+reservation.msisdn+`"  data-msisdn="`+reservation.msisdn+`" data-reservationid="`+reservation.id+`">
                                            <!-- <div class="custom-progress" style="width: 45%;"></div> -->
                                            <div class="inner d-flex align-items-center justify-content-between">
                                                <div class="d-flex align-items-center">
                                                    <div class="icon wifi js--activate-modem-wifi" id="jsActivationModemWIFI_`+reservation.msisdn+`">
                                                        <!DOCTYPE PUBLIC "-//W3C//DTD SVG 1.1//EN"
                                                        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                                                        <svg width="100%" height="100%" viewBox="0 0 12 9" version="1.1"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
                                                             style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path
                                                                    d="M6.016,6.277c0.613,0 1.113,0.5 1.113,1.113c0,0.614 -0.5,1.113 -1.113,1.113c-0.614,0 -1.113,-0.499 -1.113,-1.113c0,-0.613 0.499,-1.113 1.113,-1.113Zm3.559,-0.831c0.08,-0.085 0.076,-0.22 -0.01,-0.299c-2.013,-1.831 -5.085,-1.832 -7.099,0c-0.086,0.079 -0.09,0.214 -0.01,0.299l0.286,0.302c0.078,0.082 0.206,0.086 0.289,0.01c1.695,-1.532 4.272,-1.534 5.969,0c0.083,0.076 0.211,0.071 0.289,-0.01l0.286,-0.302Zm1.938,-2.33c-3.1,-2.836 -7.9,-2.831 -10.994,0c-0.086,0.078 -0.091,0.211 -0.01,0.295l0.288,0.298c0.079,0.082 0.209,0.086 0.293,0.01c2.775,-2.535 7.074,-2.538 9.852,0c0.083,0.076 0.213,0.072 0.292,-0.01l0.289,-0.298c0.08,-0.084 0.076,-0.217 -0.01,-0.295Z"
                                                                    style="fill:rgba(44, 44, 44, 0.3);"/></svg>
                                                    </div>
                                                    <div class="modem">
                                                        <h5>`+modemName+`</h5>
                                                        <span>`+reservation.msisdn+`</span>
                                                    </div>
                                                </div>
`;
                                if(isActive) {
                                    modemItem += `
                                                <div class="d-flex align-items-center">
                                                    <div class="time-wrapper d-flex flex-column align-items-center">
                                                        <span class="time">` + startTime.getHours() + `:` + ('0' + startTime.getMinutes()).slice(-2) + ` - ` + endTime.getHours() + `:` + ('0' + endTime.getMinutes()).slice(-2) + `</span>
                                                        <button type="button" class="btn btn-expand js--reservation-extend" data-msisdn="`+reservation.msisdn+`" data-reservationid="`+reservation.id+`" title="You can extend only once">Extend</button>
                                                    </div>
                                                    <div class="checkbox-custom has-wap-right">
                                                        <input type="checkbox"  id="jsActivationModemCHK_` + reservation.msisdn + `" class="js--activate-modem"  data-msisdn="` + reservation.msisdn + `" data-reservationid="` + reservation.id + `">
                                                        <label for="jsActivationModemCHK_` + reservation.msisdn + `">
                                                            <span>` + failed + `</span>
                                                        </label>
                                                    </div>
                                                    <div class="checkbox-custom has-wap-right-no" >
                                                        <input type="checkbox" disabled>
                                                        <label><span></span></label>
                                                    </div>
                                                    <span class="delete js--reservation-delete" data-msisdn="`+reservation.msisdn+`" data-reservationid="`+reservation.id+`" title="Release reservation">
                                                        <!DOCTYPE PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 7 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M6.509,0.322c-0.162,-0.162 -0.428,-0.162 -0.59,0l-2.472,2.473l-2.474,-2.473c-0.161,-0.162 -0.427,-0.162 -0.589,0c-0.162,0.162 -0.162,0.427 0,0.589l2.473,2.473l-2.474,2.473c-0.161,0.162 -0.161,0.427 0.001,0.59c0.162,0.161 0.428,0.161 0.589,0l2.474,-2.473l2.472,2.473c0.162,0.161 0.428,0.161 0.59,0c0.162,-0.163 0.162,-0.428 0,-0.59l-2.473,-2.473l2.473,-2.473c0.162,-0.162 0.162,-0.427 0,-0.589Z" style="fill:#a7a7a7;fill-rule:nonzero;"/></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                } else {
                                    modemItem += `
                                            <div class="d-flex align-items-center error-message">
                                                    <div class="time-wrapper d-flex flex-column align-items-center">
                                                        <span class="time">` + startTime.getHours() + `:` + ('0' + startTime.getMinutes()).slice(-2) + ` - ` + endTime.getHours() + `:` + ('0' + endTime.getMinutes()).slice(-2) + `</span>                                                        
                                                    </div>
                                                        <i title="Waiting for connection"><!DOCTYPE PUBLIC "-//W3C//DTD SVG 1.1//EN"
                                                            "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                                                            <svg width="100%" height="100%" viewBox="0 0 10 10" version="1.1"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
                                                                 style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path
                                                                        d="M5.245,0.142l-4.633,9.265l9.266,0l-4.633,-9.265Zm0,1.726l3.384,6.767l-6.767,0l3.383,-6.767Zm-0.386,2.134l0,2.317l0.772,0l0,-2.317l-0.772,0Zm0,3.861l0.772,0l0,-0.772l-0.772,0l0,0.772Z"
                                                                        style="fill:#ea5455;fill-rule:nonzero;"/></svg>
                                                        </i>
                                            </div>
                                    `;
                                }
                                if(mobileProxy == true){
                                    $modemsListItems.append(modemItem);
                                }


                            }
                        );

                        checkRights();

                        var modemSelectItemHTML = "";
                        console.log("modem list: ", modemsList);
                        Object.values(modemsList).forEach(
                            function(modem) {
                                modemSelectItemHTML += `<a class="dropdown-item" href="#"  data-value="`+modem.msisdn+`">`+modem.name+` (`+modem.msisdn+`) </a>`;
                            }
                        );

                        if(modemSelectItemHTML.length < 30) {
                            modemSelectItemHTML = `<a class="dropdown-item" style="pointer-events: none" href="#" >No active modems </a>`
                        }
                        $('.js--messages-msisdnlist').html(modemSelectItemHTML);

                        if(!modemsList.hasOwnProperty($('.js--messages-modem-selected').attr('data-value'))) {
                            //reset input. no operator reserved
                            $('.js--messages-modem-selected').attr('data-value', "");
                            $('.js--messages-modem-selected').html("Mobile Operator");
                        }

                        $('.js--messages-msisdnlist .dropdown-item').on('click', function(){
                            var $bindto = $('.js--messages-modem-selected');
                            var $elem = $(this);
                            if($bindto) {
                                $bindto.attr('data-value', $elem.attr('data-value'))
                                    .html($elem.html())
                                refreshMessages();
                            }
                        });


                        var allModemSelectItemHTML = "";
                        Object.values(allModemsList).forEach(
                            function(modem) {
                                allModemSelectItemHTML += `<a class="dropdown-item" href="#" data-ondemand="`+modem.ondemand+`"  data-value="`+modem.msisdn+`"  title="`+modem.name+` (`+modem.msisdn+`)">`+modem.name+` (`+modem.msisdn+`) </a>`;
                            }
                        );

                        if(allModemSelectItemHTML.length < 30) {
                            allModemSelectItemHTML = `<a class="dropdown-item" style="pointer-events: none" href="#" >No active modems </a>`
                        }

                        let reservedCountries = "";
                        Object.values(allCountries).forEach(
                            function(country) {
                                reservedCountries += `<a class="dropdown-item" href="#"  data-value="`+country.id+`">`+country.name+`</a>`;
                            }
                        );

                        if(reservedCountries.length < 30) {
                            reservedCountries = `<a class="dropdown-item" style="" href="#" >Select country</a>`
                        }

                        $('.js--reportissue-msisdnlist').html(allModemSelectItemHTML);
                        $('.js--reportissue-countrylist').html(reservedCountries);
                        $('.js--reportissue-msisdn').attr('data-value', "");
                        $('.js--reportissue-msisdn').html("Mobile Operator");


                        $('.js--reportissue-countrylist .dropdown-item').on('click', function(){
                            var $bindto = $('.js--reportissue-countryid');
                            var $elem = $(this);
                            if($bindto) {
                                $bindto.attr('data-value', $elem.attr('data-value'))
                                    .html($elem.html())
                            }

                            var selectedModem = null;
                            var allModemSelectItemHTML = "";
                            Object.values(allModemsList).forEach(
                                function(modem) {
                                    if(modem.country_id == $elem.attr('data-value')) {
                                        if(modem.msisdn == $('.js--reportissue-msisdn').attr('data-value')) {
                                            selectedModem = modem;
                                        }
                                        allModemSelectItemHTML += `<a class="dropdown-item" href="#"  data-value="`+modem.msisdn+`" title="`+modem.name+` (`+modem.msisdn+`)">`+modem.name+` (`+modem.msisdn+`) </a>`;
                                    }
                                }
                            );

                            if(allModemSelectItemHTML.length < 30) {
                                allModemSelectItemHTML = `<a class="dropdown-item" style="pointer-events: none" href="#" >No active modems </a>`
                            }

                            $('.js--reportissue-msisdnlist').html(allModemSelectItemHTML);

                            if(selectedModem == null) {
                                $('.js--reportissue-msisdn').attr('data-value', "");
                                $('.js--reportissue-msisdn').html("Mobile Operator");
                            }

                            $('.js--reportissue-msisdnlist .dropdown-item').on('click', function(){
                                var $bindto = $('.js--reportissue-msisdn');
                                var $elem = $(this);
                                if($bindto) {
                                    $bindto.attr('data-value', $elem.attr('data-value'))
                                        .html($elem.html())
                                }
                            });

                        });
                        $('.js--reportissue-msisdnlist .dropdown-item').on('click', function(){
                            var $bindto = $('.js--reportissue-msisdn');
                            var $elem = $(this);
                            if($bindto) {
                                $bindto.attr('data-value', $elem.attr('data-value'))
                                    .html($elem.html())
                            }
                        });


                        $('.js--reservation-extend').on('click', function() {
                            let msisdn = $(this).attr('data-msisdn');
                            let resId = $(this).attr('data-reservationid');
                            ApiManager.extendReservation(msisdn, resId, function() {
                                populateModems()
                            }, function() {
                                polyfill.browserNotificationsCreate(
                                    'simtest-apimanager-extendmodem', {
                                        "type": "basic",
                                        "title": "Error",
                                        "message": "You can extend modem only once!"
                                    }
                                )
                            })
                        });
                        $('.js--reservation-delete').on('click', function() {
                            let msisdn = $(this).attr('data-msisdn');
                            let resId = $(this).attr('data-reservationid');
                            $(this).remove();

                            ApiManager.releaseReservation(msisdn, resId, function() {
                                setTimeout(function(){
                                    populateModems()
                                }, 1500)

                            })
                        });
                        $('.js--activate-modem').on('click', function() {
                            let $modemEl = $(this);
                            let modem = {
                                'id' : $modemEl.attr('data-reservationid'),
                                'msisdn' : $modemEl.attr('data-msisdn')
                            }

                            let checked = $modemEl.is(':checked')
                            polyfill.storageLocalSet({'selectedModem': modem}, function(){
                                ApiManager.selectModem(modem.msisdn, function(res) {
                                    $modemsListItems.find('.reservations-item').removeClass('active');
                                    $('.js--activate-modem').prop('checked', false);

                                    if(checked) {
                                        $("#jsActivationModem_"+modem.msisdn).addClass('active');
                                        $("#jsActivationModemCHK_"+modem.msisdn).prop('checked', true);
                                        initializeProxyStatus('1',{selectedModem : modem})
                                    } else {
                                        polyfill.storageLocalSet({'selectedModem': null});
                                        initializeProxyStatus('0',{})
                                    }

                                }, function() {
                                    $modemEl.prop('checked', false);
                                    initializeProxyStatus('0',{})
                                });
                                //populateModems();
                            });
                        })

                        $(".js--activate-modem-wifi").on('click', function() {
                            let wifiEl = $(this);
                            let modemReservation = wifiEl.closest('.reservations-item').attr('data-reservationid');
                            let modemMsisdn = wifiEl.closest('.reservations-item').attr('data-msisdn');
                            let enable = !wifiEl.hasClass('active');
                            ApiManager.wifiMode(modemReservation, enable,
                                function(res){
                                    wifiEl.removeClass('error');
                                    wifiEl.toggleClass('active');
                                },
                                function(err, status, xhr){
                                    wifiEl.addClass('error');
                                    wifiEl.removeClass('active');
                                }
                            )
                        })

                        polyfill.storageLocalGet("modemWifiReservationId",
                            function(modWifi) {
                                let modemWifiReservationId = null;
                                if (modWifi.hasOwnProperty('modemWifiReservationId')) {
                                    modemWifiReservationId = modWifi.modemWifiReservationId;
                                }
                                polyfill.storageLocalGet("selectedModem",
                                    function (result) {

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

                                        if(selectedModem != null) {

                                                ApiManager.selectModem(selectedModem.msisdn, function(res) {
                                                    $('.js--activate-modem').prop('checked', false);
                                                    $("#jsActivationModemCHK_"+selectedModem.msisdn).prop('checked', true);

                                                    if(modemWifiReservationId == selectedModem.id) {
                                                        $("#jsActivationModemWIFI_"+selectedModem.msisdn).addClass('active');
                                                    }
                                                    initializeProxyStatus('1',{'selectedModem': selectedModem})
                                                }, function(){
                                                    $("#jsActivationModemCHK_"+selectedModem.msisdn).prop('checked', false);
                                                    polyfill.storageLocalSet({'selectedModem': null});
                                                    initializeProxyStatus('0',{})
                                                })

                                        } else {
                                            $('.js--activate-modem').prop('checked', false);
                                            polyfill.storageLocalSet({'selectedModem': null});
                                            initializeProxyStatus('0',{})
                                        }

                                    },
                                    function (error) { }
                                )
                            },
                            function (){}
                        )


                        $('.js--loading-modems').hide();

                        if(reservations.length == 0) {
                            $('#noActiveModems').show();
                            polyfill.storageLocalSet({'selectedModem': null});

                            polyfill.runtimeSendMessage({
                                    command: "popup-stopProxy"
                                },
                                function(res){},  function(err){}
                            );
                            changeProxyStatus('0');

                        } else {
                            $modemsList.show()
                            $('#noActiveModems').hide();
                        }

                        if(reloadModemNames) {
                            polyfill.storageLocalSet({'modemNames': {}});
                        }

                    },
                    logout
                );



                //add quick reservation modem list
                var $qrModemsList = $("#quickReservation").find('.js--quick-reservation-modem-list');

                var groupedByCountry = Arr.groupBy(Object.values(modemNames), 'countryName');
                $qrModemsList.html("");

                $qrModemsList.append(`<input type="text" class="form-control js--modem-list-search" placeholder="Search by country"/>`);

                for (var key in groupedByCountry) {
                    // skip loop if the property is from prototype
                    if (!groupedByCountry.hasOwnProperty(key)) continue;
                    $qrModemsList.append('<span class="dropdown-label js--select-item"  data-country="'+key+'">'+key+'</span>');
                    var obj = groupedByCountry[key];
                    for (var prop in obj) {
                        // skip loop if the property is from prototype
                        if (!obj.hasOwnProperty(prop)) continue;
                        var item = obj[prop];
                        var status = (item['active']) ? 'online js--quick-reservation-modem-item' : 'offline';
                        var style = (!item['active']) ? 'pointer-events: none; cursor: not-allowed;' : "";

                        var onDemand = (item['onDemand']) ? " *" : "";

                        $qrModemsList.append(`<a class="dropdown-item js--select-item `+status+`" data-ondemand="`+item['onDemand']+`" data-value="`+item['msisdn']+`"  style="`+style+`" href="#" data-country="`+key+`">
                                                    <div class="dropdown-template">
                                                        <span class="marker"></span>
                                                        <h5>` +item['operatorName']+ ` <span>`+item['msisdn']+onDemand+`</span></h5>
                                                    </div>
                                                </a>`);
                    }
                }

                $('.js--quick-reservation-modem-item').on('click', function() {
                    let val = $(this).attr('data-value');

                    if($(this).attr('data-ondemand') == "true") {
                        $(".js--quick-reservation-modem-ondemand").show();
                    } else {
                        $(".js--quick-reservation-modem-ondemand").hide();
                    }
                    $("#quick-reservation-modem").attr('data-value', val);
                    $("#quick-reservation-modem").attr('data-ondemand', $(this).attr('data-ondemand'));

                    $("#quick-reservation-modem").html($(this).html());
                });
                var options = $qrModemsList.find('.js--select-item');
                $(".js--modem-list-search").on('change keyup', function() {

                    var search = $.trim($(this).val());
                    var regex = new RegExp(search,'gi');
                    $.each(options, function(i) {
                        var option = $(options[i]);
                        if(option.attr('data-country')) {
                            if(option.attr('data-country').match(regex) !== null) {
                                option.removeClass('filtered')
                            } else {
                                option.addClass('filtered')
                            }
                        }

                    });
                });

            },
            logout
        )

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

        changeProxyStatus(proxyMode);
        let msisdn = "";
        if(dataForPopup.hasOwnProperty('selectedModem') && dataForPopup.selectedModem != null && dataForPopup.selectedModem.hasOwnProperty('msisdn')) {
            msisdn = dataForPopup.selectedModem.msisdn;
        }

            if(msisdn == "") {
                polyfill.runtimeSendMessage({
                        command: "popup-stopProxy"
                    },
                    function(res){},  function(err){}
                );
                changeProxyStatus('0');

            } else {

                    let opts = {
                        command: "popup-startProxy",
                        'activeModem' : msisdn
                    };

                    polyfill.runtimeSendMessage(opts,
                        function(res){},
                        function(err){}
                    );
                    changeProxyStatus('1');


            }

    }

    function activatePopupTab(tabname) {
        let $elem = $('[data-tabname="'+tabname+'"]');
        $('.js--action-tabs').removeClass('active');
        $elem.addClass('active');

        $('.js--action-tab-content').hide();
        $('.js--action-tab-content-'+tabname).show();

        polyfill.storageLocalSet({'popup_activeTab': tabname}, function() {}  );
    }

    function refreshMessages() {

        let msisdn = $('.js--messages-modem-selected').attr('data-value');
        let selected = $('.js--recipient ul li.active > a').html();
        $('.js--messages-for-mobile').html("");
        let $recList = $('.js--recipient ul');
        $recList.html("");
        if(msisdn) {
            ApiManager.readModemsSMSMessages(msisdn, function(messages) {

                //recipients
                let messages_recipient_list = Object.keys(messages);

                let resFound = false;
                for (var prop in messages_recipient_list) {
                    // skip loop if the property is from prototype
                    if (!messages_recipient_list.hasOwnProperty(prop)) continue;
                    var item = messages_recipient_list[prop];
                    var active = (item == selected) ? "active" : "";
                    resFound = (resFound ==false ) ? (item == selected) : true;
                    $recList.append(`<li class="`+active+`"><a href="#">`+item+`</a></li>`);
                }

                if(!resFound) {
                    selected = "";
                }

                function listMessages(recipient) {
                    $("#messages_recipient").val(recipient);
                    $('.js--messages-for-mobile').html("");
                    if(messages.hasOwnProperty(recipient)) {
                        for (var msg in messages[recipient]) {

                            // skip loop if the property is from prototype
                            if (!messages[recipient].hasOwnProperty(msg)) continue;
                            var item = messages[recipient][msg];

                            let msgClass = (item._internalType == "IN") ? "sent" : "received";
                            let html = `<div class="message-item `+msgClass+`">
                                            <div class="inner">
                                                <div class="message-container">
                                                    `+item.text+`
                                                </div>
                                                <div class="message-info">
                                                    <div class="send-status">
                                                        <i></i>
                                                        <span>`+(new Date(item.time)).toLocaleString('en-US', {hour12: false, year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric',second:'numeric'})+`</span> <!-- Sep 18, 2018 - 14:00 -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       `;

                            $('.js--messages-for-mobile').append(html);
                        }
                    }
                }

                $recList.find('li').on('click', function() {
                    $recList.find('li').removeClass('active');
                    $(this).addClass('active');
                    listMessages($(this).find('a').first().html());
                })

                if(selected) {
                    listMessages(selected);
                }

            })
        }


    }


    function updateUI() {

        polyfill.storageLocalGet(null,
            function (dataForPopup) {
                Debug.log("popupdata", dataForPopup)
                let allOK = true;

                if (!( dataForPopup.hasOwnProperty('popup_activeTab') && dataForPopup.popup_activeTab)){
                    dataForPopup.popup_activeTab = 'home';
                }
                activatePopupTab(dataForPopup.popup_activeTab)

                /*
                if (dataForPopup.hasOwnProperty('customLanguage') && dataForPopup.customLanguage.value){
                    $(".js--language-selected").html(dataForPopup.customLanguage.name);
                    $(".js--language-selected").attr('data-langvalue',dataForPopup.customLanguage.value);
                }


                if (dataForPopup.hasOwnProperty('customUserAgent') && dataForPopup.customUserAgent.value){
                    $(".js--useragent-selected").html(dataForPopup.customUserAgent.name);
                    $(".js--useragent-selected").attr('data-uavalue',dataForPopup.customUserAgent.value);
                }
*/
                if (dataForPopup.hasOwnProperty('proxySettings')){

                    $('.js--settings-form input[name=proxy_url]').val(dataForPopup.proxySettings['simtestProxyUrl']);
                    $('.js--settings-form input[name=proxy_port]').val(dataForPopup.proxySettings['simtestProxyPort']);
                    $('.js--settings-form input[name=proxy_username]').val(dataForPopup.proxySettings['username']);
                    $('.js--settings-form input[name=proxy_password]').val(dataForPopup.proxySettings['password']);
                    $('.js--settings-form textarea[name=proxy_skiphosts]').val(dataForPopup.proxySettings['skipProxyFor'].join('\n'));

                    $('.js--settings-form input[name=proxy_api_url]').val(dataForPopup.simtestApiSettings['simtestApiUrl']);

                    $('#header_username').html(dataForPopup['proxySettings']['username']);

                    if (dataForPopup.hasOwnProperty('userInfo') && dataForPopup['userInfo'] && dataForPopup['userInfo']['firstName'] != "") {
                        $('#header_username').html(dataForPopup['userInfo']['firstName'] + " "+dataForPopup['userInfo']['lastName']);
                    }

                    allOK = allOK && dataForPopup['proxySettings']['username'] != "";
                    allOK = allOK && dataForPopup['proxySettings']['password'] != "";
                } else {
                    allOK = false;
                }
                if(allOK) {
                    ApiManager.initialize(function () {
                        if (!ApiManager.canDoApi() ) {
                            // showLoginform(true);
                            logout();
                        }
                        else {
                            polyfill.runtimeSendMessage(
                                {
                                    command: "settings-SaveProxySettingsOptions",
                                    proxySettings: dataForPopup.proxySettings,
                                    simtestApiSettings: dataForPopup.simtestApiSettings
                                },
                                function (response) {},
                                function (error) {}
                            );
                            showLoginform(false);
                            //logout();
                            populateDataForPopup(dataForPopup);
                        }
                    })
                } else {
                    logout();
                }

            },
            function (error) {
                console.log("error",error)
            }
        );
    }

    function checkRights() {
        ApiManager.hasRight("CREATE_NEW_RESERVATION", function(){
            $(".has-reservation-right").show();
            $(".has-reservation-right-no").hide();
            ApiManager.hasRight("SEND_SMS_MESSAGE", function(){
                $(".has-message-right").show();
                $(".has-message-right-no").hide();
            }, function(){
                $(".has-message-right").hide();
                $(".has-message-right-no").show();
            })

            ApiManager.hasRight("USE_WAP", function(){
                $(".has-wap-right").show();
                $(".has-wap-right-no").hide();
            }, function(){
                $(".has-wap-right").hide();
                $(".has-wap-right-no").show();
            })

        }, function(){
            $(".has-reservation-right").hide();
            $(".has-reservation-right-no").show();
            $(".has-message-right").hide();
            $(".has-message-right-no").show();
            $(".has-wap-right").hide();
        })
    }

    function initialize() {
        Debug.info('initialize UI');

        polyfill.storageLocalGet("loginData",
            function(data) {

            let loginData = data['loginData'] || null;
            Debug.info("logindata",loginData);
                if(loginData) {
                    if(loginData.hasOwnProperty('username')) {
                        $('.js--loginform input[name=username]').val(loginData['username']);

                    }
                    if(loginData.hasOwnProperty('password')) {
                        $('.js--loginform input[name=password]').val(loginData['password']);
                    }
                }
            });

        $(".js--openSettings").on('click', function () {
            polyfill.runtimeOpenOptionsPage();
            window.close();
        });

        $('.js--reload-modems').on('click', function() {
            $('.quick-reservation').hide();
            $('.quick-reservation-internal').hide();
            ApiManager.clearCache(populateModems, populateModems);
        })

        $('.js--reload-messages').on('click', function() {
            refreshMessages();
        })

        $(".js--home-modems-info").click(function () {
            polyfill.tabsCreate(
                {
                    active: true,
                    url: browser.runtime.getURL(`ui/settings.html?tab=tab-failed-requests`)
                }
            );
            window.close();
        });


        ///////////////// RIGTHS
        checkRights();

//////// RESERVATION
        $('.js--quick-reservation--show').on('click', function() {
            ApiManager.hasRight('MUST_ENTER_RESERVATION_COMMENT', function() {
                    //If has this right then this is internal user.
                    $('.quick-reservation').hide();
                    $('.js--quick-reservation-response-status').html("");
                    $('.quick-reservation-internal').show();
            },
                function() {
                    $('.quick-reservation-internal').hide();
                    $('.quick-reservation').show();
                    $('.js--quick-reservation-response-status').html("");
                })


        })
        $('.js--quick-reservation--hide').on('click', function() {
            $('.quick-reservation-internal').hide();
            $('.quick-reservation').hide();
        })

        $(".js--quick-reservation-minutes-select").on('click', function(){
            let val = $(this).attr('data-value');
            $(".js--quick-reservation-minutes-selected").attr('data-value', val);
            $(".js--quick-reservation-minutes-selected").html($(this).html());
        })

        $('.js--quick-reservation--confirm').on('click', function() {
            $('.js--quick-reservation-response-status').html("");
            $('.js--quick-reservation-response-status-ondemand').hide()
            $('#js--quick-reservation-modem-ondemand-unavailable').hide()
            let msisdn = $("#quick-reservation-modem").attr('data-value');
            let minutes = $(".js--quick-reservation-minutes-selected").attr('data-value');
            let onDemand = ($("#quick-reservation-modem").attr('data-ondemand') == "true");

            var lethim = true;
            if(msisdn == "") {
                $('.js--quick-reservation-response-status').html("Please select modem");
                lethim = false;
            }
            else if(onDemand) {
                var time = new Date((new Date()).getTime() + (2 * 3600 * 1000))

                if (time.getHours() < 9 || time.getHours() > 17) {
                    $('#js--quick-reservation-modem-ondemand-unavailable').show();
                    lethim = false;
                }
            }
            if(lethim) {
                 ApiManager.createModemReservation(msisdn, minutes, onDemand,
                            function(result) {
                                if($("#quick-reservation-modem").attr('data-ondemand') == "true") {
                                    var time = new Date((new Date()).getTime()+(2*3600*1000))
                                    $('#quick-reservation-modem-ondemand-time').html(time.toISOString().replace('T', " ").substring(0, 19));
                                    $('.js--quick-reservation-response-status-ondemand').show();
                                } else {
                                    $('.js--quick-reservation-response-status').html("Modem successfully reserved.<br/> We will automatically refresh list in a few seconds.");
                                }

                                setTimeout(function() {
                                    $('.quick-reservation').hide();
                                    ApiManager.clearCache(populateModems, populateModems);
                                }, 2000)
                            },
                            function(data, xhr) {
                                if(xhr.status == 409) {
                                    $('.js--quick-reservation-response-status').html("Modem reservation at the time already exists.<br/> Please try again later or do reservation over Simtest GUI");
                                } else {
                                    $('.js--quick-reservation-response-status').html("ERROR. " + xhr.responseJSON.message);
                                }
                            }
                        );
                    }

        })


///////  MESSAGES

$("#messages_recipient").on('keypress', function(event) {
    if ( isNaN( String.fromCharCode(event.keyCode) )) return false;
    return true;
})

        refreshMessages();
        $(".js--send-message-input").on('keyup change', function(){
            let val = $(this).val();
            $('.js--messages-length-counter').html(val.length + "/160");
        });

        $(".js--send-message").on('click', function(){
            let msgText = $(".js--send-message-input").val();
            let msisdn = $('.js--messages-modem-selected').attr('data-value');
            let recepient = $("#messages_recipient").val();

            if(msisdn.length < 3) {
                polyfill.browserNotificationsCreate(
                    'simtest-popup-messages-selectmodem', {
                        "type": "basic",
                        "title": "Error",
                        "message": "Please select mobile operator before sending message"
                    }
                )
                return;
            }
            if(recepient.length < 3) {
                polyfill.browserNotificationsCreate(
                    'simtest-popup-messages-selectrecipient', {
                        "type": "basic",
                        "title": "Error",
                        "message": "Please enter recipient before sending message"
                    }
                )
                return;
            }
            if(msgText == "") {
                polyfill.browserNotificationsCreate(
                    'simtest-popup-messages-emptymessage', {
                        "type": "basic",
                        "title": "Error",
                        "message": "Message can not be empty"
                    }
                )
                return;
            }
            ApiManager.sendSMSMessage(msisdn, recepient, msgText, function(status){
                //status : true | false
                refreshMessages();
            })
        })

///////  LANGUAGE
        $(".js--language-select").on('click', function(){
            let val = $(this).attr('data-langvalue');
            $(".js--language-selected").attr('data-langvalue', val);
            $(".js--language-selected").html($(this).html());
        })

        $(".js--language-set").on('click', function(){

            let lang = $('.js--language-selected').attr('data-langvalue');
            let langName = $('.js--language-selected').html();
            polyfill.storageLocalSet({'customLanguage': {'value': lang, 'name': langName}});

            let opts = {
                command: "popup-selectLanguage",
                language: lang
            };
            polyfill.runtimeSendMessage(opts,
                function(res){},
                function(err){}
            );
        })

///////  USERAGENT

        $(".js--useragent-select").on('click', function(){
            $(".js--useragent-selected").attr('data-uavalue', ua);
            $(".js--useragent-selected").html($(this).html());
        })

        $(".js--useragent-set").on('click', function(){
            let ua = $('.js--useragent-selected').attr('data-uavalue');
            let uaName = $('.js--useragent-selected').html();
            polyfill.storageLocalSet({'customUserAgent': {'value': ua, 'name': uaName}});
            let opts = {
                command: "popup-selectUserAgent",
                value: ua
            };
            polyfill.runtimeSendMessage(opts,
                function(res){},
                function(err){}
            );
        });

// REPORT ISSUE

        $('.js--reportissue-typelist .dropdown-item').on('click', function(){
            var $bindto = $('.js--reportissue-type');
            var $elem = $(this);
            if($bindto) {
                $bindto.attr('data-value', $elem.attr('data-value'))
                    .html($elem.html())
            }
        });


        $(".js--reportissue-submit").on('click', function(){
            let iss_type = $('.js--reportissue-type').attr('data-value');
            let iss_countryid = $('.js--reportissue-countryid').attr('data-value');
            let iss_msisdn = $('.js--reportissue-msisdn').attr('data-value');
            let iss_description = $('.js--reportissue-description').val();
            let date = (new Date()).toISOString().replace(/-/g, '/').split('T')[0]
            $(".js--reportissue-response").hide();
            $(".js--reportissue-response-error").hide();
            let requestData = {
                'type' : iss_type,
                'countryId' : iss_countryid,
                'msisdn' : iss_msisdn,
                'description' : iss_description,
                'date' : date
            };

            if(requestData['type'] == "" || requestData['iss_countryid'] == "" || requestData['msisdn'] == "" || requestData['description'] == "" ) {
                $(".js--reportissue-response-error").show();
                return;
            }

            ApiManager.reportIssue(requestData, function(status) {
                $('.js--reportissue-type').attr('data-value', "Modem not active").html("Modem not active");
                $('.js--reportissue-countryid').attr('data-value', "").html("Country")
                $('.js--reportissue-msisdn').attr('data-value', "").html("Mobile operator")
                $('.js--reportissue-description').val("")
                $(".js--reportissue-response").show();
            });

        });


// SETTINGS

        $('.js--loginform-submit').on('click', function() {
            $('.js--login-loader').show();
            $('.js--loginform-submit').hide();
            let un = $('.js--loginform input[name=username]').val();
            let up = $('.js--loginform input[name=password]').val();
            if(un == "" || up == "") {
                showLoginWrongCreds()
                return;
            }
            login(un,up);
        });

        $('.js--settings-form-save').on('click', function() {

            let proxySettings = {};

            proxySettings.simtestProxyUrl = $('.js--settings-form input[name=proxy_url]').val();
            proxySettings.simtestProxyPort = $('.js--settings-form input[name=proxy_port]').val();
            proxySettings.username = $('.js--settings-form input[name=proxy_username]').val();
            proxySettings.password = $('.js--settings-form input[name=proxy_password]').val();
                let lines = $('.js--settings-form textarea[name=proxy_skiphosts]').val().split(/\n/)
                var skipable = []
                for (var i=0; i < lines.length; i++) {
                    // only push this line if it contains a non whitespace character.
                    if (/\S/.test(lines[i])) {
                        skipable.push($.trim(lines[i]));
                    }
                }
            proxySettings.skipProxyFor = skipable;


            let simtestApiSettings = {};

            simtestApiSettings.simtestApiUrl = $('.js--settings-form input[name=proxy_api_url]').val();
            simtestApiSettings.simtestApiUsername = $('.js--settings-form input[name=proxy_username]').val();
            simtestApiSettings.simtestApiPassword = $('.js--settings-form input[name=proxy_password]').val();

                polyfill.storageLocalSet({'proxySettings': proxySettings});
                polyfill.storageLocalSet({'simtestApiSettings': simtestApiSettings});

                polyfill.runtimeSendMessage(
                    {
                        command: "settings-SaveProxySettingsOptions",
                        proxySettings: proxySettings,
                        simtestApiSettings: simtestApiSettings
                    },
                    function (response) {},
                    function (error) {}
                );

        });

        $('.js--change-password-visibility').click('click', function () {
            var x = document.getElementById("proxyPasswordInput");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        });

        $('.js--check-api-test').on('click', function () {

            function check() {
                ApiManager.getModemNames(
                    function(data) {
                        polyfill.browserNotificationsCreate(
                            'simtest-apimanager-test', {
                                "type": "basic",
                                "title": "Success",
                                "message": "Test successfull!"
                            }
                        )

                    },
                    function (data) {
                        Debug.error("Can not connect to API!")
                        polyfill.browserNotificationsCreate(
                            'simtest-apimanager-test', {
                                "type": "basic",
                                "title": "Error",
                                "message": "Can not connect to API!"
                            }
                        )
                    }
                )
            }


            ApiManager.initialize(
                function() {
                    if(ApiManager.canDoApi()) {
                        ApiManager.clearCache(
                            check, check
                        )
                    } else {
                        Debug.error("Please fill and save Settings first!")
                        polyfill.browserNotificationsCreate(
                            'simtest-apimanager-init', {
                                "type": "basic",
                                "title": "Error",
                                "message": "Please fill and save Settings first!"
                            }
                        )
                    }
                }
            );

        });


        $('[data-toggle="tooltip"]').tooltip();

        $('.js--action-tabs').on('click', function() {

            var $elem = $(this);
            var tabName = $elem.attr('data-tabname');
            Debug.info("click tab "+tabName);
            if(tabName == 'logout') {
                logout();
            } else {
                activatePopupTab(tabName)
            }
        })

        updateUI();

        // start handling messages
        browser.runtime.onMessage.addListener(handleMessages);

    }


    ApiManager.initialize(
        function() {
            if(!ApiManager.canDoApi()) {
                //showLoginform(true);
                logout();
            } else {
                showLoginform(false);

            }
        }
    );

    // ------------------
    // ------------------
    // initialize the popup
    jQuery(initialize);





})();