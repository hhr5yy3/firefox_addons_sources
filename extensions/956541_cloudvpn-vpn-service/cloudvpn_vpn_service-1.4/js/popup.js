$(function(){

	var bg = chrome.extension.getBackgroundPage();
	var api = bg.api;
	var user = bg.user;
	var app = bg.app;
	
	
	chrome.runtime.getPlatformInfo(function(info) {
	    if (info.os == "mac"){
	    	$("button, input").css("padding-top", "5px");
	    	$(".tryfree").css("margin-top", "8px");
	    }
	});
	function buildServersTable(){
		
		$("#tblServers").html("");
		
		var servers = app.servers;
		var prev_country = "";
		
		for (var i = 0; i < servers.length; i++){
			
			var tr_country = $("<tr><td width=\"25%\"></td><td width=\"61%\"></td><td width=\"5%\"></td><td width=\"15%\"></td></tr>");
			var id_country = servers[i].code.toLowerCase();
			
			tr_country.attr("data-country", id_country);
			tr_country.attr("data-item", i);
			tr_country.children().eq(0).html("<img class=\"flag\" src='img/flags/" + id_country + ".png' />");
			
			if (typeof servers[i + 1] != "undefined"){
				var id_next_country = servers[i + 1].code.toLowerCase();
				
				if (id_country == id_next_country && id_country != prev_country){
					tr_country.children().eq(2).html("<img src='img/arrow_down.png' />");
					tr_country.children().eq(1).text(servers[i].country);
					prev_country = id_country;
					$("#tblServers").append(tr_country);
					
					var tr_country = $("<tr style=\"display: none\"><td width=\"25%\"></td><td width=\"61%\"></td><td width=\"5%\"></td><td width=\"15%\"></td></tr>");
					tr_country.attr("data-country", id_country);
					tr_country.attr("data-city", "1");
					tr_country.attr("data-item", i);
					tr_country.children().eq(1).text(servers[i].city);
					$("#tblServers").append(tr_country);
					continue;
				}
				
			}
			
			if (id_country == prev_country){
				tr_country.css("display", "none");
				tr_country.children().eq(0).text("");
				tr_country.children().eq(1).text(servers[i].city);
			}
			else{
				tr_country.children().eq(1).text(servers[i].country);
			}
			
			prev_country = id_country;
			$("#tblServers").append(tr_country);
		}
		
		$("#tblServers tr").click(function(event){
			
			if(event.target.nodeName == "IMG"){
				var img = event.target;
				if (img.src.indexOf("arrow_down") > -1){
					img.src = "img/arrow_up.png";
					id_country = $(img).parent().parent().attr("data-country");
					$("#tblServers tr[data-country=" + id_country + "]").removeAttr("style");
					
					return;
				}
				
				if (img.src.indexOf("arrow_up") > -1){
					
					img.src = "img/arrow_down.png";
					
					id_country = $(img).parent().parent().attr("data-country");
					$("#tblServers tr[data-country=" + id_country + "]:gt(0):not()").css("display", "none");
					
				}
			}
			else{
				var serverItem = parseInt($(this).attr("data-item"));
				if (app.connected)
					$("#dodisconnect").trigger("click");
				
				app.setServerItem(serverItem);
				setServer();
				$(".servers span").trigger("click");
			}
			
		});
	}
	
	function setServer(){
		var servers = app.servers;
		var serverItem = app.serverItem;
		
		//var id_country = servers[app.serverItem].name.match(/-?(\w\w)\..*/)[1];
		var id_country = servers[app.serverItem].code.toLowerCase();
		
		var place = servers[app.serverItem].country;
		if (typeof servers[app.serverItem - 1] != "undefined"){
			if (servers[app.serverItem - 1].country == servers[app.serverItem].country) place = servers[app.serverItem].city;
		}
		
		if (typeof servers[app.serverItem + 1] != "undefined"){
			if (servers[app.serverItem + 1].country == servers[app.serverItem].country) place = servers[app.serverItem].city;
		}
		$("#server").html("<img class='flag' src='img/flags/" + id_country + ".png' /><span>" + place + "</span><img class='sel' src='img/arrow_down.png' />");
	}
	
	function onServersReceived(){
		setServer();
		buildServersTable();
	}
	
	function procRemainTerm(terminate_at){
		
		var now = (new Date());
		var date_terminate = new Date(terminate_at);
    	
    	var seconds = Math.floor((date_terminate - (now))/1000);
		var minutes = Math.floor(seconds / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		
		hours = hours - (days*24);
		minutes = minutes - (days * 24 * 60) - (hours * 60);
		
    	var remain = chrome.i18n.getMessage("remain") + " " + days + " ";
    	days = days.toString();
    	
    	if (days == 1 || (days.lastIndexOf("1") == days.length - 1 && days.lastIndexOf("11") != days.length - 2)){
    		remain += chrome.i18n.getMessage("remaindays3");
    	}
    	else if (days.indexOf("1") != 0 && ((days.lastIndexOf("2") == days.length - 1) || (days.lastIndexOf("3") == days.length - 1) || (days.lastIndexOf("4") == days.length - 1))){
    		remain += chrome.i18n.getMessage("remaindays2");
    	}
    	else{
    		remain += chrome.i18n.getMessage("remaindays1");
    	}
    	
    	
    	remain += " " + hours + " ";
    	hours = hours.toString();
    	if (hours.lastIndexOf("1") == hours.length - 1 && hours.lastIndexOf("11") != hours.length - 2){
    		remain += chrome.i18n.getMessage("remainhours3");
    	}
    	else if (hours.indexOf("1") != 0 && ((hours.lastIndexOf("2") == hours.length - 1) || (hours.lastIndexOf("3") == hours.length - 1) || (hours.lastIndexOf("4") == hours.length - 1))){
    		remain += chrome.i18n.getMessage("remainhours2");
    	}
    	else
    		remain += chrome.i18n.getMessage("remainhours1");
    	
    	$(".remain").text(remain);
	}
	
	(function($){
	    $.fn.disableSelection = function() {
	        return this
	                 .attr('unselectable', 'on')
	                 .css('user-select', 'none')
	                 .on('selectstart', false);
	    };
	})(jQuery);
	
	$(document).ready(function(){
		
		$("input").focus(function(){
			$(this).data("placeholder", $(this).attr("placeholder"))
			$(this).attr("placeholder", "");
		});
		$("input").blur(function(){
			$(this).attr("placeholder", $(this).data("placeholder"));
		});
		
		
		$(document).keydown(function (e) {
			if (e.keyCode == 13){
				$("#dologin").trigger("click");
				return;
			}
		});
		
		$("#txtCode").keydown(function (e) {
	        // Allow: backspace, delete, tab, escape and .
	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 110, 190]) !== -1 ||
	             // Allow: Ctrl/cmd+A
	            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
	             // Allow: Ctrl/cmd+C
	            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
	             // Allow: Ctrl/cmd+X
	            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
	            // Allow: Ctrl/cmd+V
	            (e.keyCode == 86 && (e.ctrlKey === true || e.metaKey === true)) ||
	             // Allow: home, end, left, right
	            (e.keyCode >= 35 && e.keyCode <= 39)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        // Ensure that it is a number and stop the keypress
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault();
	        }
	    });
	    
	    $("#txtCode").keyup(function (e) {
	        // Allow: backspace, delete, tab, escape, enter and .
	        
	        if (e.keyCode == 86 && (e.ctrlKey === true || e.metaKey === true)) {
	        	
	        	var m = $(this).val().match(/\d+/g);
	        	if(m){
	        		$(this).val(m.join(""));
	        	}
	        	else{
	        		$(this).val("");
	        	}
	        }
	        
	    });
	    
	    $('.info, .remain, .servers, .tryfree, .getapp').disableSelection();
		
		if (user.logged){
			$(".wrapper").css("background-image", "url(img/bg2.png)");
			$(".login, footer *").css("display", "none");
			$(".logged, .logout, .remain").css("display", "block");
			
			procRemainTerm(user.terminate_at);
			
			if (app.connected){
				$('.info').html("<span class=\"connected\"></span>" + chrome.i18n.getMessage("connected"));
				$("#doconnect").css("display", "none");
				$("#dodisconnect").css("display", "block");
				
				onServersReceived();
			}
			else{
				$('.info').html("<span class=\"disconnected\"></span>" + chrome.i18n.getMessage("disconnected"));
				$("#doconnect").css("display", "block");
				$("#dodisconnect").css("display", "none");
				
				if (app.servers.length > 0){
					onServersReceived();
				}
				else{
					app.getServers().then(function(){
						onServersReceived();
					},
		            function(){
		            	
		            });
			    }
			}
		}
		else{
			$(".wrapper").css("background-image", "url(img/bg.png)");
			$(".login").css("display", "inline-block");
			$(".logged, .logout").css("display", "none");
			$("#txtCode").val(user.login_code)
		}

		
		
		$("#server").click(function(){
			
			$(".servers").css("opacity", "0");
			$(".servers").css("display", "block");
			$('.servers').animate({opacity: 1}, 500, function (){
			});
			
		});
		
		$(".servers span").click(function(){
			
			$('.servers').animate({opacity: 0}, 500, function (){
				$(".servers").css("display", "none");
				$(".servers").css("opacity", "1");
			});
			
		});
		
		
		
		
		
		$("#doconnect").click(function(){
			
			$(".info").html("<span class=\"connecting\"></span>" + chrome.i18n.getMessage("connecting") + "...");
			app.connect(function(response){
				if (response){
					$('#doconnect').animate({opacity: 0}, 200, function (){
						$("#doconnect").css("display", "none");
						$("#dodisconnect").css("opacity", "0");
						$("#dodisconnect").css("display", "block");
						$("#dodisconnect").animate({opacity: 1}, 200, function (){});
						$(".info").html("<span class=\"connected\"></span>" + chrome.i18n.getMessage("connected"));
					});
				}
				else{
					$(".info").html("<span class=\"info\"></span>" + chrome.i18n.getMessage("failconnected"));
				}
			});
			
		});
		
		$("#dodisconnect").click(function(){
			
			app.disconnect();
			$('#dodisconnect').animate({opacity: 0}, 200, function (){
				$("#dodisconnect").css("display", "none");
				$("#doconnect").css("opacity", "0");
				$("#doconnect").css("display", "block");
				$('#doconnect').animate({opacity: 1}, 200, function (){ });
				$(".info").html("<span class=\"disconnected\"></span>" + chrome.i18n.getMessage("disconnected"));
			});
			
		});
		
		$("#dologin").click(function(){
			
			$(".info").html("");
			
			var code = $("#txtCode").val();
			
			if (code.length == 0){
				$(".info").html(chrome.i18n.getMessage("emptycode"));
				return;
			}
			
			if (code.length < 10){
				$(".info").html(chrome.i18n.getMessage("authfail") + "Incorrect code");
				return;
			}
			
			$(".loading").css("opacity", "0");
			$(".loading").css("display", "block");
			
			$('.login').animate({opacity: 0}, 300, function (){
				$('.loading').animate({opacity: 1}, 1000, function(){
					
					user.login(code).then(function(result){
						$(".loading").css("display", "none");
						if (result.success == false){
							$('.login').animate({opacity: 1}, 300, function(){
				        		$('.info').html(result.message);
				        	});
						}
						else{
							$(".login, footer *").css("display", "none");
							
							app.getServers().then(function(){
								onServersReceived();
							},
				            function(){
				            	
				            });
							
							$('.wrapper').animate({opacity: 0}, 300, function() {
						        $(this).css({'background-image': 'url(img/bg2.png)'}).animate({opacity: 1}, 300, function(){ });
						        
						        $("footer *").css("display", "none");
						        $(".logged").css("opacity", "0");
								$(".logged").css("display", "block");
								$('.logged').animate({opacity: 1}, 300, function (){
									
									$(".logout, .remain").css("opacity", "1");
									$(".logout, .remain").css("display", "block");
									
								});
								
								if (user.status == "Active"){
					        		$('.info').html("<span class=\"disconnected\"></span>" + chrome.i18n.getMessage("disconnected"));
					        		procRemainTerm(user.terminate_at);
							    }
						    });
						}
		            },
		            function(result){
		            	$(".loading").css("display", "none");
		            	$('.login').animate({opacity: 1}, 300, function(){
				        	$('.info').html(result.message);
				        });
		            });
				});
			});
			
		});
		
		
		$(".logout").click(function(){
			
			app.disconnect();
			user.logout();
			$("#txtCode").val(user.login_code)
			
			$('.logged').animate({opacity: 0}, 300, function (){
				
				$(".logged").css("display", "none");
				$('.info').html("");
				
			});
			
			$('.wrapper').animate({opacity: 0}, 300, function() {
		        $(this).css({'background-image': 'url(img/bg.png)'}).animate({opacity: 1}, 300, function(){ });
		        
		        $(".login, footer *").css("opacity", "0");
		        $(".login, footer *").css("display", "inline-block");
		        
		        $(".login, footer *").animate({opacity: 1}, 300);
		    });
			
			$('.remain').animate({opacity: 0}, 300);
			$('.logout').animate({opacity: 0}, 300, function (){
				$(".logout, .remain").css("display", "none");
			});
			
		});
		
		
		$("#buyVPN").click(function(){
			chrome.tabs.create({url: api.buyUrl});
		});
		
		$(".tryfree").click(function(){
			chrome.tabs.create({url: api.tryFreeUrl});
		});
		
		$(".getapp-icons img").click(function(){
			
			switch ($(this).attr("src")){
				case "img/windows.png":
					chrome.tabs.create({url: api.winAppUrl});
					break;
				case "img/mac.png":
					chrome.tabs.create({url: api.macAppUrl});
					break;
				case "img/apple.png":
					chrome.tabs.create({url: api.appleAppUrl});
					break;
				case "img/android.png":
					chrome.tabs.create({url: api.androidAppUrl});
					break;
				default:
					break;
			}
		});
	});

});