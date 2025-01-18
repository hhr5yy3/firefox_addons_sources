
$(function() {	


	
	var bg = chrome.extension.getBackgroundPage();

	$("a.add-server").each(function() {
		var a = $(this);		
		a.attr("href", bg.urls.server + a.attr("href") );	
	});

	$("form.add-server").each(function() {
		var a = $(this);		
		a.attr("action", bg.urls.server + a.attr("action") );	
	});
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		
		current = tabs[0];

		var shop = bg.dm.getShop(current);
		var org = bg.dm.getSelectedOrganization(shop);

		/*
		console.log("tab");
		console.log(current);
		console.log("shop");
		console.log(shop);
		console.log("organization");
		console.log(org);
		*/

		$("#wrap").removeClass("active");				

		if (shop) {

			$("#shop").text(shop.title);					
			$("#commission").text(shop.campaign_provision);
		
			if (org && org!==true) {
				$("#organization").text(org.title);
				$("#choose-org").removeClass("btn-orange").addClass("btn btn-link btn-sm").html( chrome.i18n.getMessage("btn_changeOrg") );
			} else {
				$("#organization").text("");		
				$("#choose-org").removeClass("btn btn-link btn-sm").addClass("btn-orange").html( chrome.i18n.getMessage("btn_chooseOrg") );				
			}
					
			$("#wrap").addClass("active");
		}


		$("#choose-org").click(function() {
			window.close();
			bg.dm.showSelector(current, true);
		});

	});


	var showLogged = function(user) {
			
		var login = user.login;					
		if (login.length>30) {
			login = login.substring(0,27) + "...";
		}
		
		$("#userLogin").html(login);
		$("#myShoppings").attr("href", chrome.runtime.getURL("shoppings.html")).show();

		$(".signedIn").fadeIn();

		bg.dm.getShoppings(function(response) {


			
			if (response.shoppings && response.shoppings.length) {

				var html = "<b style='padding:5px; display:inline-block'>"+chrome.i18n.getMessage("shoppingsTableTitle")+"</b>";

				html += "<a class='btn btn-link' style='margin-top:-5px; text-decoration:underline;' target='_blank' href='" + chrome.runtime.getURL("shoppings.html") + "'>" + chrome.i18n.getMessage("checkShoppings") + "</a>";

				html += "<table class='table'><thead>";
				html += "<tr><th>" + chrome.i18n.getMessage("date") + "</th>";
				html += "<th>" + chrome.i18n.getMessage("shop") + "<br>" + chrome.i18n.getMessage("organization") +"</th>";				
				html += "<th class='text-right'>" + chrome.i18n.getMessage("sale") + "<br>" + chrome.i18n.getMessage("commission") + "</th>"				
				html += "<th class='text-right'>" + chrome.i18n.getMessage("comment") + "<br>" + chrome.i18n.getMessage("adminComment") + "</th>";				
				html += "</tr></thead><tbody>";

				var cur = "&nbsp;" + response.currency;
				
				var count = 6;
				for (var key in response.shoppings) {				
					if (--count>0) {


						var purchase = response.shoppings[key];				
						var d = new Date(purchase.date_created.replace(" ", "T"));
						var minutes = d.getMinutes();
						if (minutes<10) {
							minutes = "0" + minutes;
						}
						html += "<tr><td>"+d.getDate()+"."+d.getMonth()+"."+d.getFullYear()+"<br/><small>"+d.getHours()+":"+minutes+"</small></td>";
						html += "<td>"+purchase.shop_title+"<br><i style='color:orange' class='glyphicon glyphicon-heart'></i> "+purchase.organization_title+"</td>";						
						
						html += "<td class='text-right'>"+ (purchase.sale>0 ? Number(purchase.sale).toFixed(2) : "-") + cur + "<br>" + (purchase.commission>0 ? Number(purchase.commission).toFixed(2) : "-") + cur + "</td>";	

						html += "<td class='text-right'>";
						if (purchase.is_comment || purchase.comments) {							
							if 	(purchase.is_comment>0) html += "<i style='color:gray' class='glyphicon glyphicon-pencil' title='"+chrome.i18n.getMessage("commissionWithComment")+"'></i><br>";							
							if (purchase.comments) {
								html += "<button class='btn btn-default btn-xs' data-toggle='collapse' data-target='#p"+count+"'>";
								html += "<i style='color:orange' class='glyphicon glyphicon-envelope'></i> " + Object.keys(purchase.comments).length;						
								html += "</button>";
								html += "</td></tr>";																		
								html += "<tr><td colspan='4' style='padding:0; border-top:none'><div class='collapse' id='p"+count+"'>";
								for (var msg in purchase.comments) {
									var m = purchase.comments[msg];
									var dd = new Date(m.date.replace(" ", "T"));						
									html += "<div class='alert alert-info' style='margin:4px; padding:6px'><b>"+m.title+"</b><small style='float:right'>"+dd.getDate()+"."+dd.getMonth()+".</small><br/>"+m.text+"</div>";
								}
								html += "</div></td></tr>"							
							}	
						} else {
							html += "</td></tr>";	
						}							
						
					}
				}	

				html += "</tbody></table>";

				$("#lastShoppings").append(html).fadeIn();						
			}			
					

		});
	};


	var user = bg.dm.getUser();
	if (user && user.login) {
		showLogged(user);
	} else {
		
		$(".signedOff").fadeIn();

		var form = $("#loginWrap form");
		var login = $("input[name='login']", form);
		var password = $("input[name='password']", form);
		var button = $("button[type='submit']", form);

		var checkEmptyLogin = function() {		
			if (login.val() && password.val()) {
				button.removeAttr('disabled','disabled');
			} else {
				button.attr('disabled','disabled');			
			}
		}
		
		checkEmptyLogin();		
		$("input", form).bind('keyup change', checkEmptyLogin);
		
		form.submit(function(e) {

			$("#errorMsg", form).hide();
			e.preventDefault();
			button.attr('disabled','disabled').html(chrome.i18n.getMessage("loginBtnActive"));		
			
			bg.dm.login(login.val(), password.val(), function(user) {
				
				if (user) {
					$("#loginWrap").fadeOut(500, function() { 
						$(".signedOff").hide();
						showLogged(user); 
					});					
				} else {
					$("#errorMsg", form).fadeIn();
					button.removeAttr("disabled").html(chrome.i18n.getMessage("loginBtn"));
				}

			});			


		});

	}



});