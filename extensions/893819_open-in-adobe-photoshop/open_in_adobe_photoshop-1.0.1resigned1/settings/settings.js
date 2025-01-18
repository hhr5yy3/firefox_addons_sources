var OptionsJSMainObject = {
	saveExePathOption:function(evt){		
		if(document.getElementById("auto-path-radio").checked){
			localStorage["enable_auto_path"] = true;
			return true;
		}
		else{
			return OptionsJSMainObject.validateAndSavePath(evt);
		}
	},
	saveEnableContextMenuOption:function(evt){
		chrome.runtime.sendMessage({'action' : 'set_requestBuildContextMenu_for_settingsjs','checked':$('#context-menu-checkbox').prop('checked')},
			function (response) {
				
			}
		);
		return true;		
	},
	saveOptions:function(evt){
		var succeded=true;
		if(!OptionsJSMainObject.saveExePathOption(evt)) succeded=false;
		if(!OptionsJSMainObject.saveEnableContextMenuOption(evt)) succeded=false;
		if(succeded) OptionsJSMainObject.requestShowModal('myModal');
	},
	requestShowModal:function(modalId){
		if(location.search.search("on=true")!=-1) {
			chrome.runtime.sendMessage({'action' : 'request_show_modal_from_backgroundjs_to_contentjs','modalId':modalId},
				function (response) {
					
				}
			);
		}
		else{
			$('#'+modalId).modal('show');
		}		
	},
	validateAndSavePath:function(evt){
		var os = localStorage["os"];
		if (os=="win") {
			if(document.getElementById("exe-path-textbox").value.search(ExtensionMainObject.getRegExpForPathCheck(os))!=-1) {
				localStorage["enable_auto_path"] = false;
				localStorage["exepath"] = document.getElementById("exe-path-textbox").value;
				OptionsJSMainObject.requestShowModal('myModal');
				return true;
			}
			else {
				localStorage["enable_auto_path"] = true;
				$("#auto-path-radio").prop("checked", true );
				OptionsJSMainObject.requestShowModal('myModal2');
				return false;
			}
		}
		else if(os=="mac"){
			if(document.getElementById("exe-path-textbox").value.search(ExtensionMainObject.getRegExpForPathCheck(os))!=-1) {
				localStorage["enable_auto_path"] = false;
				localStorage["exepath"] = document.getElementById("exe-path-textbox").value;
				OptionsJSMainObject.requestShowModal('myModal');
				return true;
			}
			else {
				localStorage["enable_auto_path"] = true;
				$("#auto-path-radio").prop("checked", true );
				OptionsJSMainObject.requestShowModal('myModal2');
				return false;
			}
		}
		else if(os=="linux"){
			if(document.getElementById("exe-path-textbox").value.search(ExtensionMainObject.getRegExpForPathCheck(os))!=-1) {
				localStorage["enable_auto_path"] = false;
				localStorage["exepath"] = document.getElementById("exe-path-textbox").value;
				OptionsJSMainObject.requestShowModal('myModal');
				return true;
			}
			else {
				localStorage["enable_auto_path"] = true;
				$("#auto-path-radio").prop("checked", true );
				OptionsJSMainObject.requestShowModal('myModal2');
				return false;
			}
		}		
	},	
	BackgroundJSMessageResultObject:{}
}

function init(){

	$(function() {
		
		try{
			
			if(location.search.search("on=true")!=-1) {
				$(".batchhidden").addClass("hidden");
			}
			else{
				$(".batchhidden").removeClass("hidden")
			}
			if(location.search.search("first-run")!=-1) {
				$("#first-usage-addition").show();
			}
			else{
				$("#first-usage-addition").hide();
			}
			
			var os = localStorage["os"];
			if (os=="win") {
				$("#win_setup").show();
				$("#mac_setup").hide();
				$("#linux_setup").hide();			
			}
			else if (os=="mac") {
				$("#win_setup").hide();
				$("#mac_setup").show();
				$("#linux_setup").hide();			
			}
			else if (os=="linux") {
				$("#win_setup").hide();
				$("#mac_setup").hide();
				$("#linux_setup").show();			
			}		
		
			$('#save-settings-button').on('click', OptionsJSMainObject.saveOptions);

			$("#main-logo").attr({"alt":ExtensionMainObject.extensionLiteralName});
			$("#download-communicator-header").text("Download "+ExtensionMainObject.communicatorLiteralName);
			$("#exe-path-header").text(ExtensionMainObject.executableLiteralName+" Location");
			$("#exe-path-textbox").attr({"placeholder":"Please specify "+ExtensionMainObject.executableLiteralName+" location..."});
			$(".fillExtensionLiteralName").text(ExtensionMainObject.extensionLiteralName);
			$(".fillExecutableLiteralName").text(ExtensionMainObject.executableLiteralName);
			
			$(".fillCommunicatorWindowsDownloadButton").text("Download "+ExtensionMainObject.communicatorLiteralName);
			$("#communicator-windows-download-link").attr({"href":ExtensionMainObject.communicatorWindowsDownloadURL});			
			$(".fillcommunicatorWindowsFileName").text(ExtensionMainObject.communicatorWindowsFileName);
			
			$(".fillCommunicatorMacDownloadButton").text("Download "+ExtensionMainObject.communicatorLiteralName);
			$("#communicator-mac-download-link").attr({"href":ExtensionMainObject.communicatorMacDownloadURL});			
			$(".fillcommunicatorMacFileName").text(ExtensionMainObject.communicatorMacFileName);
			
			$(".fillCommunicatorLinux32bitDownloadButton").text("Download "+ExtensionMainObject.communicatorLiteralName+" for Linux 32bit");
			$("#communicator-linux-32bit-download-link").attr({"href":ExtensionMainObject.communicatorLinux32bitDownloadURL});
			$(".fillCommunicatorLinux64bitDownloadButton").text("Download "+ExtensionMainObject.communicatorLiteralName+" for Linux 64bit");			
			$("#communicator-linux-64bit-download-link").attr({"href":ExtensionMainObject.communicatorLinux64bitDownloadURL});			
			$(".fillcommunicatoLinuxTerminalCommand").text("./"+ExtensionMainObject.communicatorLinuxFileName);
			
			if(ExtensionMainObject.contextMenuType=="image") $(".fillContextMenuType").text("images");
			else if(ExtensionMainObject.contextMenuType=="link") $(".fillContextMenuType").text("links");
			
			$("#exe-path-textbox").val(localStorage["exepath"] ? localStorage["exepath"] : OptionsJSMainObject.BackgroundJSMessageResultObject.default_path);
			$("#win_exe_path").text(ExtensionMainObject.defaultPaths.win);
			$("#mac_exe_path").text(ExtensionMainObject.defaultPaths.mac);
			$("#linux_exe_path").text(ExtensionMainObject.defaultPaths.linux);

			if(OptionsJSMainObject.BackgroundJSMessageResultObject.enable_auto_path) $("#auto-path-radio").prop("checked", true );
			else $("#custom-path-radio").prop("checked", true);

			$('#exe-path-textbox').on('focus', function(evt) {
				$("#custom-path-radio").prop("checked", true);	
			});
			
			$("#context-menu-checkbox").prop("checked", OptionsJSMainObject.BackgroundJSMessageResultObject.enable_context_menu);

			$('.download_link').on('click', function(evt) {
				$(this).parent().next(".download-notify").removeClass('hidden');
				$(this).addClass("disabled");		
			});
		
		}
		catch(e){
			alert(ExtensionMainObject.extensionLiteralName+" is not loaded completely yet. Please wait and reload the page!")
			return
		}		

	})
	
}

chrome.runtime.sendMessage({'action' : 'get_requests_for_settingsjs'},
    function (response) {
		OptionsJSMainObject.BackgroundJSMessageResultObject=response;
		init();
    }
);
