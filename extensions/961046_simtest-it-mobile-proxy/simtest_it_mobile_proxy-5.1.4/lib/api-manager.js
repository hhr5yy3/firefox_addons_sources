
const ApiManager = {

    /*
     {
     "simtestApiUrl" : "http://api.simtest.it/v1",
     "simtestApiUsername" :  "XXXXXX",
     "simtestApiPassword" :  "XXXXXX"
     }
     */
    settings : null,

    initialize : function (initDone) {
        polyfill.storageLocalGet('simtestApiSettings',
            function (data) {
                ApiManager.settings = data.simtestApiSettings;
                ApiManager.settings.simtestApiUrl = ApiManager.settings.simtestApiUrl.replace('http://', 'https://');
                if(initDone) initDone();
            },
            function (error) {
                Debug.error(error)
                if(initDone) initDone();
            }
        );
    },

    apiAuthorization: function() {
        return "Basic " + btoa(this.settings.simtestApiUsername+":"+this.settings.simtestApiPassword);
    },

    canDoApi : function() {
        return (this.settings && this.settings.simtestApiUrl && this.settings.simtestApiUsername && this.settings.simtestApiPassword);
    },

    _dateTimeYesterday: function() {
        var d = new Date(); // today!
        var x = 1; // go back 5 days!
        d.setDate(d.getDate() - x);
        return d.toISOString(); //"2019-07-30T14:07:00.000Z"
    },

    sendSMSMessage: function (modemMsisdn, recipient, text, callback) {
        if(this.canDoApi()) {
            let url = this.settings.simtestApiUrl + '/msisdns/' + modemMsisdn + '/outbox?recipient='+recipient+'&text='+encodeURIComponent(text);

            $.ajax({
                type: 'POST',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data, statusText, xhr) {
                    Debug.info("[API.sendSMSMessage]",statusText);
                    try {
                        if(xhr.status == 201){
                            callback(true)
                        } else {
                            callback(false)
                        }

                    } catch (e) {
                        Debug.error("[API.sendSMSMessage]" +  e.message);
                        callback(false);
                    }
                },
                error: function (xhr,ajaxOptions,throwError){
                    if(callback) callback(false);
                }
            });
        }
    },


    reportIssue: function (dataIn, callback) {
        if(this.canDoApi()) {

            let url = this.settings.simtestApiUrl + '/reportanissue';
            url += '?type='+encodeURIComponent(dataIn['type']);
            url += '&countryId='+encodeURIComponent(dataIn['countryId']);
            url += '&msisdn='+encodeURIComponent(dataIn['msisdn']);
            url += '&description='+encodeURIComponent(dataIn['description']);
            url += '&date='+encodeURIComponent(dataIn['date']);
            $.ajax({
                type: 'POST',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data, statusText, xhr) {
                    Debug.info("[API.reportIssue]",statusText);
                    try {
                        if(xhr.status == 201){
                            callback(true)
                        } else {
                            callback(false)
                        }

                    } catch (e) {
                        Debug.error("[API.reportIssue]" +  e.message);
                        callback(false);
                    }
                },
                error: function (xhr,ajaxOptions,throwError){
                    if(callback) callback(false);
                }
            });
        }
    },

    readModemsSMSMessages: function(modemMsisdn, callback) {
        var messages = [];
        ApiManager.readModemSMSInbox(
            modemMsisdn,
            function(messIN) {
                messages.push(...messIN);

                ApiManager.readModemSMSSent(
                    modemMsisdn,
                    function(messOUT) {

                        messages.push(...messOUT);
                        var messagesGrouped = [];
                        if(messages.length > 0) {
                            //sort them by time
                            var messagesSorted = messages.sort(function(a,b){
                                return new Date(a.time).getTime() - new Date(b.time).getTime();
                            });

                            for (let i=0; i < messagesSorted.length; i++) {
                                let m = messagesSorted[i];
                                messagesGrouped[m['_internalFrom']] = messagesGrouped[m['_internalFrom']] || [];
                                messagesGrouped[m['_internalFrom']].push(m);
                            }
                        }
                        Debug.info("API.readModemsSMSMessages GROUPED", messagesGrouped);
                        callback(messagesGrouped);
                    },
                )
            },
        )
    },

    readModemSMSInbox: function (modemMsisdn, callback) {
        if(this.canDoApi()) {
            let url = this.settings.simtestApiUrl + '/msisdns/' + modemMsisdn + '/inbox?limit=10000'; //&from='+encodeURIComponent(this._dateTimeYesterday());

            $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data) {
                    Debug.info("[API.readModemSMSInbox]",data);
                    try {
                        let result = data;
                        if(typeof result == "string") {
                            result = JSON.parse(data);
                        }

                        let messages = [];
                        if(result.hasOwnProperty("messages") && result.messages.length > 0) {
                            for (let i=0; i<result.messages.length; i++) {
                                let m = result.messages[i];
                                m['_internalType'] = "IN";
                                m['_internalFrom'] = m.origin;
                                messages.push(m);
                            }
                        }

                        callback(messages);
                    } catch (e) {
                        Debug.error("[API.readModemSMSInbox]" +  e.message);
                        callback([]);
                    }
                },
                error: function (xhr,ajaxOptions,throwError){
                    if(callback) callback([]);
                }
            });
        }
    },

    readModemSMSSent: function (modemMsisdn, callback) {
        if(this.canDoApi()) {
            let url = this.settings.simtestApiUrl + '/msisdns/' + modemMsisdn + '/sent?limit=10000';//&from='+encodeURIComponent(this._dateTimeYesterday());

            $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data) {
                    Debug.info("[API.readModemSMSSent]",data);
                    try {
                        let result = data;
                        if(typeof result == "string") {
                            result = JSON.parse(data);
                        }

                        let messages = [];
                        if(result.hasOwnProperty("messages") && result.messages.length > 0) {
                            for (let i=0; i<result.messages.length; i++) {
                                let m = result.messages[i];
                                m['_internalType'] = "OUT";
                                m['_internalFrom'] = m.destination;
                                messages.push(m);
                            }
                        }
                        callback(messages);

                    } catch (e) {
                        Debug.error("[API.readModemSMSSent]" +  e.message);
                        callback([]);
                    }
                },
                error: function (xhr,ajaxOptions,throwError){
                    callback([])
                }
            });
        }
    },

    selectModem : function (modemMsisdn, success, fail) {

        if(this.canDoApi()) {
            let url = this.settings.simtestApiUrl + '/msisdns/'+modemMsisdn+'/reservations/select';

            $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data) {
                    Debug.log("[API.selectModem]", data);
                    polyfill.runtimeSendMessage({
                            command: "popup-activeModem",
                            activeModem: modemMsisdn
                        },
                        function(res){},  function(err){}
                    );

                    if(success) success(data);
                },
                error: function (xhr,ajaxOptions,throwError){
                    if(fail) fail(throwError, xhr,ajaxOptions);
                }
            });
        }
    },


    createModemReservation: function(modemMsisdn, minutes, isOnDemand, success, fail){
        if(this.canDoApi()) {
            if(minutes == undefined || minutes == null || minutes < 10 ) {
                minutes = 10;
            }

            let url = this.settings.simtestApiUrl + '/msisdns/'+modemMsisdn+'/reservations?minutes='+minutes;
            if(isOnDemand == true) {
                var timeStart = new Date((new Date()).getTime() + (2 * 3600 * 1000) + (60 * 1000));
                var timezone = Math.abs(timeStart.getTimezoneOffset() / 60) * 100;
                url += "&timeStart="+encodeURIComponent(timeStart.toISOString().substring(0,10) + "T" + timeStart.toTimeString().substring(0,8)+"+0"+timezone);
            }

            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json',
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data, statusText, xhr) {
                    Debug.log("[API.createModemReservation]",data);
                    try {
                        let result = data;
                        if(typeof result == "string") {
                            result = JSON.parse(data);
                        }

                        if(result.hasOwnProperty('msisdn') && result.hasOwnProperty('id')) {
                            success(result);
                        }
                        else {
                            if(fail) fail(result, xhr);
                        }

                    } catch (e) {
                        Debug.error("error [API.createModemReservation]" +  e.message);
                        if(fail) fail(e);
                    }
                },
                error: function (xhr,ajaxOptions,throwError){
                    Debug.error("error [API.createModemReservation]", xhr);
                    if(fail) fail(throwError, xhr, ajaxOptions);
                }
            });
        }
    },

    readModemReservations: function (success, fail) {
        if(this.canDoApi()) {
            let url = this.settings.simtestApiUrl + '/msisdns/reservations';

            $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data) {
                    Debug.log("[API.readModemReservations]",data);
                    try {
                        let result = data;
                        if(typeof result == "string") {
                            result = JSON.parse(data);
                        }

                        let modems = [];
                        if(result.hasOwnProperty("reservations") && result.reservations.length > 0) {
                            for (let i=0; i<result.reservations.length; i++) {
                                let m = result.reservations[i];
                                if(m.owned == true && ( m.status.toLowerCase() == 'active' || m.status.toLowerCase() == 'pending' ) ) {
                                    modems.push(m);
                                }
                            }
                        }

                        success(modems);

                    } catch (e) {
                        Debug.error("error [API.readModemReservations]" +  e.message);
                        fail(e);
                    }
                },
                error: function (xhr,ajaxOptions,throwError){
                    if(fail) fail(throwError, xhr,ajaxOptions);
                }
            });
        }
    },

    extendReservation: function (msisdn, reservationId, success, fail) {

        if(this.canDoApi()) {

            let url = this.settings.simtestApiUrl + '/msisdns/'+msisdn+'/reservations/'+reservationId+'/extend';
            Debug.log("extendReservation("+reservationId+") "+url)
            $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data, textStatus, xhr) {
                        if(xhr.status == 204) {
                            success(data);
                        } else {
                            fail();
                        }
                },
                error: function (xhr,ajaxOptions,throwError){
                    if(fail) fail(throwError, xhr,ajaxOptions);
                }
            });
        }
    },

    wifiMode: function (reservationId, enable, success, fail) {

        if(this.canDoApi()) {
            if(enable == undefined) {
                enable = false;
            }
            let enableStr = enable ? "true":"false";


            let url = this.settings.simtestApiUrl + '/msisdns/'+reservationId+'/'+ enableStr;
            Debug.log("wifiMode("+reservationId+", "+enableStr+") "+url)
            $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data, textStatus, xhr) {
                    try {
                        if(xhr.status == 200) {
                            if(enable == true) {
                                polyfill.storageLocalSet({'modemWifiReservationId': reservationId});
                            } else {
                                polyfill.storageLocalSet({'modemWifiReservationId': null});
                            }
                            success(data);
                        } else if(fail) fail(data, textStatus, xhr);

                    } catch (e) {
                        Debug.error("error [API.wifiMode]", e);
                        if(fail) fail(e);
                    }
                },
                error: function (xhr,ajaxOptions,throwError){
                    if(fail) fail(throwError, xhr,ajaxOptions);
                }
            });
        }
    },

    releaseReservation : function (msisdn, reservationId, success, fail) {
        if(this.canDoApi()) {

            let url = this.settings.simtestApiUrl + '/msisdns/'+msisdn+'/reservations/'+reservationId;
            Debug.log("releaseReservation("+msisdn+", "+reservationId+") "+url)
            $.ajax({
                type: 'DELETE',
                url: url,
                beforeSend: function (xhr){
                    xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                },
                success : function(data, textStatus, xhr) {
                    if(xhr.status == 204) {
                        success();
                    } else {
                        fail();
                    }
                },
                error: function (xhr,ajaxOptions,throwError){
                    if(fail) fail(throwError, xhr,ajaxOptions);
                }
            });
        }
    },

    hasRight : function (rightName, success, fail) {

        if(false) {
            let data = {
                'userInfo' : {
                    'rights' : [
                        "SEND_SMS_MESSAGE",
                        "CREATE_NEW_RESERVATION",
                        //    "MUST_ENTER_RESERVATION_COMMENT",
                            "USE_WAP",
                    ]
                }
            }

            if(data['userInfo'].hasOwnProperty('rights') && data['userInfo']['rights'].length > 0) {
                if (Object.values(data['userInfo']['rights']).indexOf(rightName) > -1) {
                    Debug.log("hasRight " + rightName, true);
                    success();
                } else {
                    Debug.log("hasRight " + rightName, false);
                    fail();
                }
            } else {
                fail();
            }
            return;
        }

        polyfill.storageLocalGet('userInfo',
            function (data) {
                if(data.hasOwnProperty('userInfo') && data['userInfo'] && data['userInfo'].hasOwnProperty('rights') && data['userInfo']['rights'].length > 0) {
                    if (Object.values(data['userInfo']['rights']).indexOf(rightName) > -1) {
                        success();
                    } else {
                        fail();
                    }
                } else {
                    fail();
                }

            },
            fail
        );
    },


    doLoginTest : function (data, success, fail){
        let result = {
            "firstName": "Nikola",
            "lastName": "Bakos",
            "rights": [
                "EDIT_PERSONAL_DATA",
                "VIEW_PERSONAL_SMS",
                "SEND_SMS_MESSAGE",
                "SEND_USSD_MESSAGE",
                "VIEW_PERSONAL_MMS",
                "USE_VOICE_MODULE",
                "CAN_MAKE_CALLS",
                "STATISTICS_ALL_USERS",
                "EDIT_ALL_USERS",
                "GROUP_MANAGEMENT",
                "REAL_DELETE_USERS",
                "VIEW_USERNAMES_ALL_RESERVATIONS",
                "VIEW_USERNAMES_GROUP_RESERVATIONS",
                "CREATE_NEW_RESERVATION",
                "CREATE_REMOTE_RESERVATION",
                "DELETE_PERSONAL_RESERVATIONS",
                "DELETE_ALL_RESERVATIONS",
                "MUST_ENTER_RESERVATION_COMMENT",
                "VIEW_SMS_STATS",
                "VIEW_MMS_STATS",
                "USE_WAP",
                "BULK_MESSAGING",
                "USE_API"
            ]
        };
        polyfill.storageLocalSet({ 'userInfo': result });
        success(result)
    },

    doLogin : function (data, success, fail) {

        if(false) {
            ApiManager.doLoginTest(data, success, fail);
            return;
        }

        ApiManager.initialize(function(){
            ApiManager.settings.simtestApiUsername = data['username'];
            ApiManager.settings.simtestApiPassword = data['password'];
            if(ApiManager.canDoApi()) {
                let url = ApiManager.settings.simtestApiUrl + '/user-info';

                $.ajax({
                    type: 'GET',
                    url: url,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                    },

                    success: function (res, textStatus, xhr) {
                        Debug.log("[API.doLogin]", res);
                        if (xhr.status != 200) {
                            Debug.warn("[API.doLogin] FAILED status: " + xhr.status)
                            if (fail) fail();
                        } else {
                            try {
                                let result = res;
                                if (typeof result == "string") {
                                    result = JSON.parse(res);
                                }

                                polyfill.storageLocalSet({ 'userInfo': result });

                                if (success) success(result);

                            } catch (e) {
                                Debug.error("error [API.doLogin]", e);
                                if (typeof fail == 'function') fail();
                            }
                        }
                    },

                    error: function (xhr, ajaxOptions, throwError) {
                        Debug.warn("[API.doLogin] FAILED status: ", xhr.status)
                        if (fail) fail();
                    }
                });
            }
        });

    },

    getModemStatuses: function(success, fail) {

        ApiManager.initialize(function(){
            if(ApiManager.canDoApi()) {
                let url = ApiManager.settings.simtestApiUrl + '/status';

                $.ajax({
                    type: 'GET',
                    url: url,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                    },

                    success: function (data, textStatus, xhr) {
                        Debug.log("[API.getModemStatuses]", data);
                        if (xhr.status != 200) {
                            Debug.warn("[API.getModemStatuses] FAILED status: " + xhr.status)
                            if (fail) fail();

                        } else {
                            try {
                                let result = data;
                                if (typeof result == "string") {
                                    result = JSON.parse(data);
                                }

                                let modems = {};
                                if (result.hasOwnProperty("statuses") && result.statuses.length > 0) {
                                    for (let i = 0; i < result.statuses.length; i++) {
                                        let m = result.statuses[i];
                                        modems[m.msisdn] = m;
                                    }
                                }

                                success(modems);

                            } catch (e) {
                                Debug.error("error [API.getModemStatuses]", e);
                                if (typeof fail == 'function') fail();
                            }
                        }
                    },

                    error: function (xhr, ajaxOptions, throwError) {
                        Debug.warn("[API.getModemStatuses] FAILED2 status: ", xhr.status)
                        if (fail) fail();
                    }
                });
            }
        });
    },


    getModemNames : function(success, fail) {

        function getFromApi() {
            Debug.log("getFromApi");
            ApiManager.initialize(function(){
                if(ApiManager.canDoApi()) {
                    let url = ApiManager.settings.simtestApiUrl + '/msisdns';

                    $.ajax({
                        type: 'GET',
                        url: url,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', ApiManager.apiAuthorization());
                        },

                        success: function (data, textStatus, xhr) {
                            Debug.log("[API.getModems]", data);
                            if (xhr.status != 200) {
                                Debug.warn("[API.getModems] FAILED status: " + xhr.status)
                                if (fail) fail();

                            } else {
                                try {
                                    let result = data;
                                    if (typeof result == "string") {
                                        result = JSON.parse(data);
                                    }

                                    ApiManager.getModemStatuses(function(status) {
                                        let modems = {};
                                        if (result.hasOwnProperty("msisdns") && result.msisdns.length > 0) {
                                            for (let i = 0; i < result.msisdns.length; i++) {
                                                let m = result.msisdns[i];
                                                if(status.hasOwnProperty(m.msisdn) && status[m.msisdn] && status[m.msisdn].enabled == true) {
                                                    delete m['credit'];
                                                    modems[m.msisdn] = m;
                                                }
                                            }
                                        }

                                        polyfill.storageLocalSet({'modemNames': modems});

                                        if (success) success(modems);
                                    }, fail
                                    )

                                } catch (e) {
                                    Debug.error("error [API.getModems]", e);
                                    if (typeof fail == 'function') fail();
                                }
                            }
                        },

                        error: function (xhr, ajaxOptions, throwError) {
                            Debug.warn("[API.getModems] FAILED2 status: ", xhr.status)
                            if (fail) fail();
                        }
                    });
                }
            });
            
            
        }

        // check if we have info in cache
        polyfill.storageLocalGet('modemNames',
            function(res) {
                Debug.log("localModems", res)
                if(res.hasOwnProperty('modemNames') && Object.keys(res.modemNames).length > 0) {
                    success(res.modemNames);
                } else {
                   getFromApi();
                }
            },
            function(err) {
                getFromApi();
            });

    },

    clearCache : function (success, fail) {
        polyfill.storageLocalSet({'modemNames': {}}, function(res) {
            if(success) success();
        }, fail);
    }

}