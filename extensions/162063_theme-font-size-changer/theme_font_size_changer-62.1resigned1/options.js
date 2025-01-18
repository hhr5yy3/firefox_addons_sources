function init(){
	chrome.runtime.sendMessage({'action' : 'request_settings_page'},
		function (response) {

		}
	);
	
	$(function() {
		
		try{

			if(location.search.search("first-run")!=-1) {
				$("#first-usage-addition").show();
			}
			else{
				$("#first-usage-addition").hide();
			}

			$("#main-logo").attr({"alt":ExtensionMainObject.extensionLiteralName});
			$("#download-communicator-header").text("Download "+ExtensionMainObject.communicatorLiteralName);
			$("#exe-path-header").text(ExtensionMainObject.executableLiteralName+" Location");
			$("#exe-path-textbox").attr({"placeholder":"Please specify "+ExtensionMainObject.executableLiteralName+" location..."});
			$(".fillExtensionLiteralName").text(ExtensionMainObject.extensionLiteralName);
			$(".fillExecutableLiteralName").text(ExtensionMainObject.executableLiteralName);
			$(".fillCommunicatorLiteralName").text("Download "+ExtensionMainObject.communicatorLiteralName);
			$(".fillcommunicatorWindowsFileName").text(ExtensionMainObject.communicatorWindowsFileName);
			$("#communicator-download-link").attr({"href":ExtensionMainObject.communicatorDownloadURL});
			$("#helpanchor").attr({"href":"http://barisderin.com/extension/"+ExtensionMainObject.protocol+"/options.html"});	
			$("#settingsanchor").attr({"href":"http://barisderin.com/extension/"+ExtensionMainObject.protocol+"/options.html"});

			chrome.runtime.getPlatformInfo(function(info){
				var helpURL;
				if (info.os=="win") helpURL=ExtensionMainObject.firstRunURL;
				else if (info.os=="mac") helpURL=ExtensionMainObject.firstRunMacURL;
				else if (info.os=="linux") helpURL=ExtensionMainObject.firstRunLinuxURL;
				else  helpURL=ExtensionMainObject.firstRunURL;
				$("#helpanchor").attr({"href":helpURL});				
			});

			$( ".theme-color" ).change(function() {

				var theme = {
		            images: {
		                headerURL: "images/spacer.gif",
		            },
		            colors: {
		            	textcolor: $("input")[1].value,
		                accentcolor: $("input")[0].value	                
		            }
	        	};
	        	browser.theme.update(theme);
	       		browser.storage.local.set({"themefontsizechanger": theme});

			});

		
		
		}
		catch(e){
			alert("Extension is not loaded completely yet. Please wait and reload the page!")
			return
		}		

	})
	
}

init();