	
$(function() {		
	
	var shop = null;
	var tabId = null;

	$("#goshopping span").html( chrome.i18n.getMessage("btn_goShopping") );

	var goShoppingCallback = function(response) {		
		if (!response) {
			// window.alert( chrome.i18n.getMessage("alert_goShopping_failed") );
			window.setTimeout( 
				function() {	
					$("#goshopping").removeAttr("disabled", "disabled").text( chrome.i18n.getMessage("btn_goShopping") );
				}, 2000 
			);
		}	
	};


	var domMessage = function(msg) {	
		//console.log("iframe dostal message");
		//console.log(msg);

		var message = msg.data;
		if (!message || !message.action) return;


		if (message.action == "fill") {

			shop = message.shop;
			tabId = message.tabId;
					
			$("#shop-title").text( shop.title );
			$("#commission").text( shop.campaign_provision );

			var options = [];
			for (var key in message.organizations) {
				var org = message.organizations[key];
				options.push({"organization_id" : key, title: org.title, idx: parseInt(org.idx) });
			}					
			options.sort(function(a,b) { return a.idx - b.idx } );			

			var select = $('.selectize').selectize({
				maxOptions: 1000,
				maxItems: 1,
				valueField: "organization_id",
				labelField: "title",
				searchField: "title",				
				options: options 
			});
			

			if (message.lastOrganizationId) {
				select[0].selectize.setValue(message.lastOrganizationId);							
			} 
			

			//chrome fix
			/*
			if (!message.lastOrganizationId) {
				//toto je kvoli tomu aby sa input v selectize zobrazil spravne, ak nasledne bude vidiet iba placeholder
				for (first in message.organizations) break;				
				select[0].selectize.setValue(message.organizations[first].organization_id);
			} 
			select[0].selectize.setValue(message.lastOrganizationId);		
			*/
			

			window.parent.postMessage( { action: "filled" }, "*" );				

		} else if (message.action == "goShoppingCallback") {
			goShoppingCallback(message.response);
		}
	};	



	$("#close").click(function() {
			    
		/*			    
		//needs ff 46 to work, callback not working either
		chrome.runtime.sendMessage("", {action: "closeBox", shop: shop }, function(response) {		
			if (response) {
				window.parent.postMessage( {action: "close" }, "*" );		
			}
		});
		*/

		window.parent.postMessage( {action: "sendMessage", message: {action: "closeBox", shop: shop } }, "*" );

		//firefox hack
		window.parent.postMessage( {action: "close" }, "*" );		

	});


	$("#goshopping").click(function() {
		var orgId = $(".selectize").val();
		if (orgId) {

			$("#goshopping").attr("disabled", "disabled").text( chrome.i18n.getMessage("btn_goShopping_wait") );
							
			//needs ff 46 to work
			//chrome.runtime.sendMessage("", {action: "goShopping", shopId: shop.shop_id, organizationId: orgId, tabId: tabId}, goShoppingCallback);					

			window.parent.postMessage( {action: "sendMessage", message: {action: "goShopping", shopId: shop.shop_id, organizationId: orgId, tabId: tabId} }, "*" );

		} else {
			$(".selectize input").click().blur().click();
		}
	});

	//message from iframe
	window.addEventListener("message", domMessage);

	window.parent.postMessage({ action: "loaded" }, '*');

});