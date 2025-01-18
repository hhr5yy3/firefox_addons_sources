(function () {
	const settings = {

		internal: {

			loadSimtestProxyForm: function () {
				polyfill.storageLocalGet(null,
					function (dataForPopup) {
						if (dataForPopup.hasOwnProperty('proxySettings')) {
							settings.internal.populateSimtestProxyForm(dataForPopup.proxySettings);

							if(!(dataForPopup.proxySettings.hasOwnProperty('simtestProxyUrl') && dataForPopup.proxySettings.simtestProxyUrl != "")
								|| !(dataForPopup.proxySettings.hasOwnProperty('simtestProxyPort') && dataForPopup.proxySettings.simtestProxyPort != "")
								|| !(dataForPopup.proxySettings.hasOwnProperty('username') && dataForPopup.proxySettings.username != "")
								|| !(dataForPopup.proxySettings.hasOwnProperty('password') && dataForPopup.proxySettings.password != "")
							){

								$("#divNoServersWarning").show();
							} else {
								$("#divNoServersWarning").hide();
							}
						}
						if (dataForPopup.hasOwnProperty('simtestApiSettings')) {
							settings.internal.populateSimtestApiForm(dataForPopup.simtestApiSettings);
						}
					},
					function (error) {
						//
					}
				);
			},

			populateSimtestProxyForm: function (formData) {
				let $simtestProxyForm = $("#simtestProxyForm");

				if(formData.hasOwnProperty('simtestProxyUrl')) {
					$simtestProxyForm.find('#simtestProxyUrl').val(formData.simtestProxyUrl);
				}
				if(formData.hasOwnProperty('simtestProxyPort')) {
					$simtestProxyForm.find('#simtestProxyPort').val(formData.simtestProxyPort);
				}
				if(formData.hasOwnProperty('username')) {
					$simtestProxyForm.find('#simtestProxyUsername').val(formData.username);
				}
				if(formData.hasOwnProperty('password')) {
					$simtestProxyForm.find('#simtestProxyPassword').val(formData.password);
				}
				if(formData.hasOwnProperty('skipProxyFor')) {
					$simtestProxyForm.find('#simtestSkipProxyFor').val(formData.skipProxyFor.join('\n'));
				}
			},

			getSimtestProxyFormData: function() {
				let formData = {};
				let $simtestProxyForm = $("#simtestProxyForm");

				formData.simtestProxyUrl = $simtestProxyForm.find('#simtestProxyUrl').val();
				formData.simtestProxyPort = $simtestProxyForm.find('#simtestProxyPort').val();
				formData.username = $simtestProxyForm.find('#simtestProxyUsername').val();
				formData.password = $simtestProxyForm.find('#simtestProxyPassword').val();
				let lines = $simtestProxyForm.find('#simtestSkipProxyFor').val().split(/\n/)
				var skipable = []
				for (var i=0; i < lines.length; i++) {
					// only push this line if it contains a non whitespace character.
					if (/\S/.test(lines[i])) {
						skipable.push($.trim(lines[i]));
					}
				}
				formData.skipProxyFor = skipable;
				return formData;
			},

			populateSimtestApiForm: function (formData) {
				let $simtestProxyForm = $("#simtestProxyForm");

				if(formData.hasOwnProperty('simtestApiUrl')) {
					$simtestProxyForm.find('#simtestApiUrl').val(formData.simtestApiUrl);
				}
				/*
				if(formData.hasOwnProperty('simtestApiUsername')) {
					$simtestProxyForm.find('#simtestApiUsername').val(formData.simtestApiUsername);
				}
				if(formData.hasOwnProperty('simtestApiPassword')) {
					$simtestProxyForm.find('#simtestApiPassword').val(formData.simtestApiPassword);
				}
				*/
			},

			getSimtestApiFormData: function() {
				let formData = {};
				let $simtestProxyForm = $("#simtestProxyForm");

				formData.simtestApiUrl = $simtestProxyForm.find('#simtestApiUrl').val();
				/*
				formData.simtestApiUsername = $simtestProxyForm.find('#simtestApiUsername').val();
				formData.simtestApiPassword = $simtestProxyForm.find('#simtestApiPassword').val();
				*/
				formData.simtestApiUsername = $simtestProxyForm.find('#simtestProxyUsername').val();
				formData.simtestApiPassword = $simtestProxyForm.find('#simtestProxyPassword').val();
				return formData;
			},
		},

		initialize : function() {
			settings.internal.loadSimtestProxyForm();

		},

		initializeUi: function () {

			// general options
			$("#btnGeneralSimtestProxySave").click(uiEvents.onClickSaveSimtestProxyForm);

			$("#btnGeneralSimtestProxyCancel").click(uiEvents.onClickRejectSimtestProxyForm);

			$("#btnGeneralSimtestProxyTest").click(uiEvents.onClickTestSimtestProxyForm);

			$('#btnImportSimtestProxyDataSubmit').click(uiEvents.onClickImportSimtestProxyData);

			$('#btnGeneralSimtestProxyTestConnection').click(uiEvents.onClickTestSimtestProxyForm);

			$('#togglePassVisibility').click(uiEvents.onClickTogglePassVisibility);

			$('#clearFailedRequests').click(uiEvents.onClearFailedRequests);

			$('#refreshFailedRequests').click(uiEvents.onClickRefreshFailedRequests);

			failedRequestsGrid.initialize();

			uiEvents.onClickRefreshFailedRequests();

			let url = new URL(document.location);
			let tabStr = url.searchParams.get("tab");
			if(tabStr) {
				$('.nav-pills a[href="#'+tabStr+'"]').tab('show');
			}

		},


	}

	const uiEvents = {
		onClickSaveSimtestProxyForm: function () {
			let proxySettings = settings.internal.getSimtestProxyFormData();
			let simtestApiSettings = settings.internal.getSimtestApiFormData();

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
			messageBox.success("PROXY Settings saved!")
		},
		
		onClickImportSimtestProxyData : function () {
			let data = $('#areaImportSimtestProxyData').val();
			try {
				let parsedData = JSON.parse(data);

				let notValidMessage = "NOT valid JSON data. Check parameters under Simtest.IT admin";

				let proxySettings = null;
				let simtestApiSettings = null;
				if(parsedData.hasOwnProperty('proxySettings')) {
					proxySettings = parsedData.proxySettings;

					if(!(proxySettings.hasOwnProperty('simtestProxyUrl') && proxySettings.simtestProxyUrl != "")
						|| !(proxySettings.hasOwnProperty('simtestProxyPort') && proxySettings.simtestProxyPort != "")
						|| !(proxySettings.hasOwnProperty('username') && proxySettings.username != "")
						|| !(proxySettings.hasOwnProperty('password') && proxySettings.password != "")
					){

						messageBox.error(notValidMessage);
						return;
					}

				} else{
					messageBox.error(notValidMessage);
					return;
				}

				if(parsedData.hasOwnProperty('simtestApiSettings')) {
					simtestApiSettings = parsedData.simtestApiSettings;
				}

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

				settings.internal.loadSimtestProxyForm();

				messageBox.success("Import data successful.");
				$("#modalImportSimtestProxyData").modal("hide");
			} catch(e) {
				messageBox.error("Failed to parse JSON data");
			}
		},
		
		onClickRejectSimtestProxyForm: function () {
			settings.internal.loadSimtestProxyForm();

			// Changes reverted successfully
			messageBox.info("PROXY Settings reverted.");

		},

		onClickTestSimtestProxyForm: function () {

			function check() {
				ApiManager.getModemNames(
					function(data) {
						//messageBox.info("Test OK.");
						$("#modalTestConnectionLoader").hide()
						$("#modalTestConnectionOK").show()
					},
					function (data) {
						//messageBox.error("Can not connect to API!")
						$("#modalTestConnectionLoader").hide()
						$("#modalTestConnectionERROR").show()
					}
				)
			}

			ApiManager.initialize(
				function() {
					if(ApiManager.canDoApi()) {
						$("#modalTestConnection").modal('show')
						$("#modalTestConnectionLoader").show()
						$("#modalTestConnectionERROR").hide()
						$("#modalTestConnectionOK").hide()
						ApiManager.clearCache(
							check, check
						)
					} else {
						messageBox.error("Please fill and save Settings first!")
					}
				}
			);

		},

		onClickTogglePassVisibility : function () {
			var x = document.getElementById("simtestProxyPassword");
			if (x.type === "password") {
				x.type = "text";
			} else {
				x.type = "password";
			}
		},

		onClickRefreshFailedRequests : function () {


			polyfill.runtimeSendMessage({
					command: "webRequestProxyFailedRequests-Get",
					type: 'all'
				},
				function (response) {

					function compare(a,b) {
						if (a.timeStamp < b.timeStamp)
							return -1;
						if (a.timeStamp > b.timeStamp)
							return 1;
						return 0;
					}

					let gridData = [];
					console.log(response);
					response.forEach(req => {

						if(req.proxyInfo != null){
							let item = {};
							item['url'] = req.url;
							item['timeStamp'] = req.timeStamp;
							item['error'] = req.error || req.statusLine;
							item['activeModem'] = req.activeModem;

							let time = new Date(req.timeStamp);
							item['timeStampStr'] = time.getFullYear() + "-"+('0' + (time.getMonth()+1)).substr(-2) + "-"+('0' + time.getDate()).substr(-2) + " "+ time.getHours() + ":" + ('0' + time.getMinutes()).substr(-2)+ ":" + ('0' + time.getSeconds()).substr(-2);


							item['tabId'] = req.tabId;
							item['ip'] = req.ip;
							item['method'] = req.method;
							item['fromCache'] = req.fromCache;

							gridData.push(item)
						}

					});
					gridData.sort(compare);

					failedRequestsGrid.setData(gridData);

				},
				function (error) {
					//
				});



			setTimeout(function () {
				let gridData = [

				];

			}, 1000)
			
		},

		onClearFailedRequests: function() {

			polyfill.runtimeSendMessage({
					command: "webRequestProxyFailedRequests-Clear",
					type: 'all'
				},
				function(res){
					uiEvents.onClickRefreshFailedRequests()
				},
				function(err){
					uiEvents.onClickRefreshFailedRequests()
				}
			);

		}


	};


	const failedRequestsGrid = {

		data : [],

		initialize: function () {
			failedRequestsGrid.initializeFailedRequestGrid();
		},

		setData: function(data) {
			failedRequestsGrid.data = data;
			$("#gridFailedRequests").jsGrid("option", "data", data);
			//$("#gridFailedRequests").jsGrid("refresh");
			$("#gridFailedRequests").jsGrid("loadData");
			$("#gridFailedRequestsTotal").html("Total " + data.length + " failed requests")
		},

		initializeFailedRequestGrid: function () {

			$("#gridFailedRequests").jsGrid({
				height: "auto",
				width: "100%",

				filtering: true,
				inserting: false,
				editing: false,
				deleting: false,
				sorting: true,
				paging: true,

				noDataContent: "No data available!",

				controller : {
					loadData: function(filter) {
						return $.grep(failedRequestsGrid.data, function(client) {
							return (!filter.url || client.url.toLowerCase().indexOf(filter.url.toLowerCase()) > -1)
								&& (!filter.error || client.error.toLowerCase().indexOf(filter.error.toLowerCase()) > -1)
								&& (!filter.activeModem || client.activeModem.toLowerCase().indexOf(filter.activeModem.toLowerCase()) > -1)
								&& (!filter.timeStampStr || client.timeStampStr.toLowerCase().indexOf(filter.timeStampStr.toLowerCase()) > -1);
						});
					},
				},

				fields: [

					{ name: "activeModem", title: "Modem", type: "text", autosearch:true, width: '150px',filtering:true,sorter: "text" },

					{ name: "url", title: "Url", type: "text", width: '60%', autosearch: true, sorting: true, sorter: "number",filtering:true,css: "jsgrid-cell-one-liner",sorter: "text",
						itemTemplate: function(value, item) {
							return `<a class="link" href="${value}" title='${value}' target='_blank'>${value}</a>`;
						}
					},

					{ name: "error", title: "Error", type: "text",autosearch:true, width: '20%',filtering:true },

					{
						name: "timeStampStr",
						title: "Time",
						css: "jsgrid-cell-one-liner",
						type: "text",
						sorting: true,
						autosearch:true,
						filtering:true,
						width: '20%'
					},
					{ type: "control", editButton: false, deleteButton: false, width:"50px" }
				]
			});
		}

	};

	// -------------------
	settings.initialize();
	$(settings.initializeUi); //onReady

})();