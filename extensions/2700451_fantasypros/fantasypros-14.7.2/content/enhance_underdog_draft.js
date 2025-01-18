var draftRoomSport = "other";
var draftId;
var draftRoomTeamId = -1;
var hasSentFirstMessage = false;
var hasFoundAssistant = false;
var previousPickCount = -1;
var nominatedPlayerId = 0;
var previouslySelectedFilter;
var bodyObserver, pickObserver, selectionObserver, statusObserver;
var hasFoundPickObserver = false;		
var draftBoardData = [{}];
		
function isDraftRoom(){
	return window.location.href.lastIndexOf("underdogfantasy.com/draft/") != -1 || window.location.href.lastIndexOf("underdogfantasy.com/active/") != -1;
}
		
function checkDraftRoom(){
	hasSentFirstMessage = false;
	hasFoundAssistant = false;
	previousPickCount = -1;
	nominatedPlayerId = 0;
	previouslySelectedFilter = undefined;
	bodyObserver = undefined;
	pickObserver = undefined;
	selectionObserver = undefined;
	statusObserver = undefined;
	listObserver = undefined;
	hasFoundPickObserver = false;		

	if (isDraftRoom()){	
		var idx1 = window.location.href.lastIndexOf("/");
		var idx2 = window.location.href.indexOf("?");
		var newDraftId;
		if (idx1 > 0 && idx2 > idx1){
			newDraftId = window.location.href.substring(idx1 + 1, idx2);
		} else if (idx1 > 0){
			newDraftId = window.location.href.substring(idx1 + 1);	
		}
		
		if (newDraftId && draftId && draftId != newDraftId){
			location.reload();
			return;
		}
//		console.log("Found draft room: " +  newDraftId) ;
		draftId = newDraftId;
		checkSport();
		watchForChangesInBody();
	} else if (draftId){ //need to hide the side assistant
		location.reload();
	}
}

function checkSport(){
	if ($(".styles__button__gmYRZ").length){		
		$(".styles__button__gmYRZ").each(function(){
			if (this.innerHTML == 'QB'){
				draftRoomSport = 'nfl';
			}
		}); 
	} else {
	//	console.log("position tab not loaded yet.");
	}
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	
    if (msg.cmd == 'foundAssistant' || msg.cmd == 'requestSync') {    	
	
		if (draftRoomSport != 'nfl'){
			return;
		}
	
    	if (draftRoomSport == msg.sport && "U" == msg.type && draftId == msg.leagueId){    		
    		jQuery(".sync-searching").addClass("sync-found");    	
        	hasFoundAssistant = true;
        	
        	if (msg.cmd == 'requestSync'){
        		checkDraftPicks(true);
        	} 

    		if ($(".side-assistant").length == 0 && msg.assistantUrl  && msg.assistantUrl.indexOf("/d/") != -1){	
				addSideAssistant(msg);
    		}
    	}
    	
    } else if (msg.cmd == 'checkDraftRoom'){
		checkDraftRoom();
	}
    sendResponse('ok');
});


function sendMessageToAssistant(message){
	
	if (draftRoomSport != 'nfl'){
		return;
	}
	
	message.cmd = 'sendSync';
	message.sport = draftRoomSport;
	message.type = "U"; //Underdog
	message.leagueId = draftId;
	message.teamId = draftRoomTeamId;		
	
//	console.log(message);
	
	chrome.runtime.sendMessage(message, function(res){

		  hasSentFirstMessage = true;

		  if (hasFoundAssistant == false){
			
			  if (jQuery(".sync-status").length == 0){
				  
				  $(".styles__infoIconBox__IKqr4").click();
				  
				  chrome.runtime.sendMessage({'cmd':'getUnderdogTournament', 'draftId': draftId, 'sport': draftRoomSport}, function(tournament){ 
					  var dwURL = "https://draftwizard.fantasypros.com/assistant/startUnderdogBB.jsp?sport=" + draftRoomSport;
					  dwURL += "&draftId=" +  draftId;
					  if (tournament){
					  	dwURL += "&tournament=" + tournament;
					  }
					  
				  var positions = [];
				  	$(".styles__rosterSection__hC30d .styles__slot__OyeKK").each(function (){
						  var ps = $(this).find("p");
						  if (ps.length == 2){
						   	  for (var i =0; i<ps.get(1).innerHTML; i++ ){
								if (ps.get(0).innerHTML.toLowerCase() == 'bench'){
									positions.push("BN");
								} else if (ps.get(0).innerHTML.toLowerCase() == 'flex'){
									positions.push("WR/RB/TE");
								} else if (ps.get(0).innerHTML.toLowerCase() == 'sflex' || ps.get(0).innerHTML.toLowerCase() == 'superflex'){
									positions.push("QB/WR/RB/TE");
								} else {
									positions.push(ps.get(0).innerHTML.toUpperCase()); 
								}
							  }
						  }
					});
					if (positions.length){
						dwURL += "&positions=" + positions.join(",");
					}
					
					setTimeout(function (){
						$(".styles__closeButton__Z9qEL").click();
					}, 100);					
					  
					  var statusContainer = jQuery("<div class='sync-status-container sync-status-container-underdog'>" +
		//					  "<a href='javascript:void(0);' onclick='this.parentNode.parentNode.removeChild(this.parentNode)' class='close' title='Hide Label'>X</a>" +
							  "<a class='sync-status sync-searching' href='" + dwURL + "' target='" + draftId + "'>Launch FantasyPros Draft Assistant</a>" +
							  "</div>");				  
					  statusContainer.prependTo(jQuery("#root"))
				  });
	
	
			  }
			  var message2 = {};
			  message2.cmd = 'checkAssistant';
			  message2.sport = draftRoomSport;
			  message2.type = "U"; //Underdog
			  message2.leagueId = draftId;
			  message2.teamId = draftRoomTeamId;	
			  chrome.runtime.sendMessage(message2, function(res){});
		 }
	});
/*	
	if (message.completed && message.pickLog && message.pickLog.length > 0){
		clearInterval(checkCompletedInterval);
	}
	*/
}

function hideSideAssistant(){
	$("body").addClass("body-with-side-assistant-hidden");
	checkDockedAssistant();
}
function showSideAssistant(){
	$("body").removeClass("body-with-side-assistant-hidden");
	checkDockedAssistant();
}

function toggleSideAssistant(){
	$("body").toggleClass("body-with-side-assistant-hidden");
	checkDockedAssistant();
}

function checkDockedAssistant(){
	if($(window).width() >= 1630){
		if ($( ".side-assistant").hasClass("side-assistant-docked") == false){
			//force dock
			$( ".side-assistant").addClass("side-assistant-docked");
			$( ".side-assistant" ).
 				css("left", "auto").
				css("right", "0").
				css("top", "0").
				css("bottom", "0").
				css("height", "calc(100% - 80px)").
				css("width", "405px").
				css("border-bottom", "3px solid rgb(8, 29, 63)");
			$( ".side-assistant" ).draggable("disable");
			$( ".side-assistant" ).resizable("disable");
		}
	} else if ($( ".side-assistant").hasClass("side-assistant-docked")){
		$( ".side-assistant").removeClass("side-assistant-docked");
		$( ".side-assistant" ).
			css("right", "auto").
			css("left", "calc(100% - 420px)").
			css("top", "100px").
			css("bottom", "auto").
			css("height", "654px").
			css("width", "400px").
			css("border-bottom", "0");
		$( ".side-assistant" ).draggable("enable");	
		$( ".side-assistant" ).resizable("enable");		
	}
	
	if ($( ".side-assistant").hasClass("side-assistant-docked") && $("body").hasClass("body-with-side-assistant-hidden") == false){
		$("#root").css("width","calc(100% - 405px)");
	} else {	
		$("#root").css("width","100%");
	}
}

function addSideAssistant(msg){

	if (window.navigator.userAgent.match('Firefox')){
		//side assistant does not work on Firefox
	} else if ($(".side-assistant").length == 0 && msg.assistantUrl  && msg.assistantUrl.indexOf("/d/") != -1){
		
		var sideUrl = msg.assistantUrl;
		if (msg.assistantUrl.indexOf("rdr.jsp") != -1){
			sideUrl = msg.assistantUrl.replace(/rdr\.jsp/g, 'side.jsp');
		} else if (msg.assistantUrl.indexOf("classic.jsp") != -1){
			sideUrl = msg.assistantUrl.replace(/classic\.jsp/g, 'side.jsp');
		} else if (msg.assistantUrl.indexOf("auction.jsp") != -1){
			sideUrl = msg.assistantUrl.replace(/auction\.jsp/g, 'side.jsp');
		} else if (msg.assistantUrl.indexOf(".jsp") == -1){
			var idx = msg.assistantUrl.indexOf("/d/");
			sideUrl = msg.assistantUrl.substring(0,idx + "/d/".length) + "side.jsp" +
				msg.assistantUrl.substring(idx + "/d/".length)
		}
		
		$("body").addClass("body-with-side-assistant");
		$("body").append("<div class='side-assistant side-assistant-underdog'>" +
			"<div class='side-assistant-header'>" +
			"<div class='side-assistant-header-logo-div'></div>"+
			"<a href='javascript:void(0)' class='side-assistant-header-close' id='hide-assistant-link' title='Hide FantasyPros Assistant'>X</a>" + 
			"</div><iframe id='sideAssistantFrame' src='" + sideUrl + "'/></div>");
		$("body").append("<a href='javascript:void(0)' class='side-assistant-btn side-assistant-btn-underdog' id='show-assistant-link' title='Show FantasyPros Assistant'></a>");
		$("#hide-assistant-link").click(hideSideAssistant);
		$("#show-assistant-link").click(showSideAssistant);

		$(".side-assistant").draggable({cursor: 'move',containment: "parent"});
		$(".side-assistant").resizable({minWidth: 400}); 
		$(window).resize(checkDockedAssistant);
		checkDockedAssistant();
		
		if (navigator.brave && navigator.brave.isBrave){
			navigator.brave.isBrave().then(value => { 
				if (value){ 
        			$("<div id='fpBraveWarning' style='text-align:center;padding: 10px;font-size: 13px;background: #f1f1d4; color:black'>" +
        				"Please make Sure that your Brave Shields are DOWN<br/>in order to use FantasyPros' Side Assistant</div>").insertBefore($("#sideAssistantFrame"));
				}
			});
		}
		
//		console.log("***************** at launch ");
//		console.log($("#sideAssistantFrame").parent().html());
//		console.log($("#sideAssistantFrame").attr("src"));
		setTimeout(function(){
			if ($("#sideAssistantFrame").attr("src") == '//javascript:;'){
//				console.log("side assistant iframe did not launch correctly");
    			$("<h5 style='text-align:center;padding:50px'>We are unable to display suggestions in the Underdog draft room. This extension is not compatible with your version of Chrome" + getChromeVersion() + 
    					"<br/><br/>Please use the main Draft Assistant w/ Sync</h5>").insertBefore($("#sideAssistantFrame"));
    			hideSideAssistant();
			}

		}, 100);
	}
}

function checkDraftPicks(forceSync){	
	
	var pickLog = [];
	var teamIdLog = [];
	var teamsArray = [];
	var teamNameToId = {};
	var userTeamId = 0;
	
/*	before the NFL draft, rookies don't appear with their position, and this creates lots of confusion between players with the same last name and same initial
	one solution was to open the Underdog draftboard by simulation a click
	but this create some flickering in the underdog draft room, so I am removing it
	
	$(".styles__teamsDropdownIconBox__osg2Y").click();
	
	setTimeout(function(){
	
		$(".styles__draftBoard__JOk8g .styles__draftBoardCell__sa6ku").each(function(){
			
		  var ps = $(this).find("p");
		  if (ps.length == 4 && ps.get(3).innerHTML && 
		  			ps.get(3).innerHTML.indexOf(" - ") != -1 && ps.get(3).innerHTML.indexOf(" (") != -1){
			  var pos = ps.get(3).innerHTML.split(" - ")[0];
			  var team = ps.get(3).innerHTML.split(" - ")[1].split("(")[0].trim();
			  draftBoardData[Number(ps.get(0).innerHTML)] = {
				  f : ps.get(1).innerHTML,
				  l : ps.get(2).innerHTML,
				  p : pos,
				  t: team
			  };
		  }
		});
		
		$(".styles__boardButton__qnVSo").click();
	*/			
		$(".styles__draftingBarScrollable__P7X9z").find(".styles__draftingCell__pD1pn").each(function(index){	
			var cell = $(this);
			
			var isOnTheClock = cell.hasClass("styles__draftingCell__Q8fFL");
			
			var username = cell.find(".styles__username__McRvJ").html();
			var teamId = teamNameToId[username];
			if (!teamId){
				teamId = teamsArray.length + 1;
				teamsArray.push({
					id: teamId,
					name: username
				});
				teamNameToId[username] = teamId;
			}
			
			if (cell.hasClass("styles__userCell__sYJxi")){
				userTeamId = teamId;
			}
			
			var roundAndPick = cell.find(".styles__roundAndPick__NHB1t").html();
			if (roundAndPick){
				roundAndPick = roundAndPick.split("<span")[0];
				// console.log(roundAndPick + ": " + teamId + ". " + username);
			} else if (isOnTheClock){
				var time = cell.find(".styles__time__Ze7Qx").html(); //read clock: 6hr
				return;
			} else {
				return;
			}
			
			var pickName = cell.find(".styles__pickName__b7C37").html();
			if (!pickName){
				return; // future pick
			}
			
			var fpId = findPlayerID(cell);
			if (fpId){
				pickLog.push(fpId);
				teamIdLog.push(teamId);
			} else if (teamId){
				pickLog.push(-1);
				teamIdLog.push(teamId);
			}
	
		});		
	
		if (forceSync == false && previousPickCount == pickLog.length){
			//no new picks, no need to message the assistants
			return;
		}
		
		if (teamsArray.length <= 2){ //minimum contest size is 3
			return; 
		} else if (teamsArray.length == 3){ // contest as not filled
			if (teamsArray[1].name == 'Filled' || teamsArray[2].name == 'Waiting'){
				return;
			}
		}
		
		previousPickCount = pickLog.length
		
		var message = {
		  pickLog: pickLog,
		  teamIds: teamIdLog,
		  teams: teamsArray,
		  userTeamId: userTeamId
		};
		
		message.completed = draftIsCompleted();
		
		/*
		message.teamIndexTheClock = teamIndexTheClock();
		message.clockSeconds = getClockSeconds();
		*/	
		
		var lastPick = $(".styles__draftingBarScrollable__P7X9z").find(".styles__draftingCell__pD1pn").last().find(".styles__pickName__b7C37").html();
		if (message.completed && !lastPick && window.location.href.lastIndexOf("?completed=true") == -1){
			// fix for https://github.com/fantasypros/draft-wizard-tomcat/issues/2770
			// The Underdog Draft Room gets stuck at 0.00 and does not display the last pick...
			window.location.href = window.location.href + "?completed=true";
		} else {
			sendMessageToAssistant(message);
		}
/*		
	}, 100);
	*/
}

function findPlayerID(cell){
	
	
	var pickName = cell.find(".styles__pickName__b7C37").html();
	var pickPos = cell.find(".styles__pickPos__cY94W").html();
	if (pickName && pickName.indexOf(". ") != -1){
		var first = pickName.split(". ")[0];
		var last = pickName.substring(pickName.indexOf(". ") + 2);
		var playerpos = "";
		var playerteam = "";
		if (pickPos && pickPos.indexOf(" - ") != -1){	//FA like Will Fuller have neither team nor position in the Underdog draft room		
			playerpos = pickPos.split(" - ")[0];
			playerteam = pickPos.split(" - ")[1];
		}
		var pick = 0;
		var roundAndPick = cell.find(".styles__roundAndPick__NHB1t").html();
		if (roundAndPick && roundAndPick.indexOf("|</span>") != -1){
			pick = Number(roundAndPick.split("|</span>")[1]);
			if (draftBoardData && draftBoardData[pick]){
				playerpos = draftBoardData[pick].p;
				playerteam = draftBoardData[pick].t;
				first = draftBoardData[pick].f;
			}
		}
		var array = [];
		for (var i=0; i<NFL_PLAYER_DATA.players.length; i++){
			var p = NFL_PLAYER_DATA.players[i];
			if (p.ln == last.toLowerCase() && p.fn.indexOf(first.toLowerCase()) == 0){
				array.push(p);
			}
		}
		if (array.length == 0){	
			
			var suffixes = [" jr."," sr."," ii"," iii"," iv"," v"];
			for (var k=0; k<suffixes.length; k++){
				if (last.toLowerCase().indexOf(suffixes[k]) != -1){					
					for (var i=0; i<NFL_PLAYER_DATA.players.length; i++){
						var p = NFL_PLAYER_DATA.players[i];
						if (p.fn.indexOf(first.toLowerCase()) == 0 && p.ln == last.toLowerCase().split(suffixes[k])[0]){
							array.push(p);
						}
					}
				}
			}
		}
		
		if (array.length == 0){
			console.debug("Cannot match player: " + pickName + " " + pickPos);
			return -1;
		} else if (array.length == 1){
			return array[0].fp;
		} else {
			var guess = guessPlayerInArray(array, playerpos, playerteam);
			if (guess && guess.fp){
		//		console.debug("fpId=" + guess.fp + " guessed for " + playername + " (" + playerpos + "-" + playerteam + ")");		
				return guess.fp;				
			} else {
				console.debug(array.length + " POSSIBLE CHOICES FOR: " +  pickName + " (" + playerpos + "-" + playerteam + ")");
				console.debug(array);	
			}
		}
	}

}

function guessPlayerInArray(array, playerpos, playerteam){
	for (var i=0; i<array.length; i++){
		if (array[i].t.toLowerCase() == playerteam.toLowerCase() && array[i].p.toLowerCase() == playerpos.toLowerCase()){
			return array[i];
		}
	}
	if (playerteam.length){		
		for (var i=0; i<array.length; i++){
			if (array[i].t.toLowerCase() == playerteam.toLowerCase()){
				return array[i];
			}
		}
	}
	if (playerpos.length){	
		for (var i=0; i<array.length; i++){
			if (array[i].p.toLowerCase() == playerpos.toLowerCase()){
				return array[i];
			}
		}
	}
}

function getStatus(){
	var status = $(".styles__rightCol__nh76d h2 span").html();
	if (!status){
		status = $(".styles__rightCol__coarq h2 span").html();
	}
	return status;
}

function draftIsCompleted(){
	var status = getStatus();
	return status && status.indexOf("Completed") != -1;
}

function isPreDraft(){
	var status = getStatus();
	return !status || status.indexOf("Waiting") != -1 || status.indexOf("Draft starts in") != -1;
}

function watchForPreDraftChanges() {
		
//	console.log("Setting up pre draft observer...");
		
	var target_observe = target_observe = $(".styles__rightCol__nh76d h2 span").get(0);
	
	if (!target_observe){
		return;
	}

    if (!statusObserver){
    	statusObserver = new MutationObserver(function(mutations) {
			
//			console.log("Status mutations: " + mutations.length);
			if (mutations.length == 0) {
				// do nothing
			} else {				
				if (isPreDraft()){
					// do nothing
				} else {
					watchForDraftBoardChanges();
					checkDraftPicks(true);
					this.disconnect(); 
				}
			}
		});
    }

	var observerConfig = {
	    childList: true,
	    characterData: true,
	    subtree: true
	}
	statusObserver.observe(target_observe, observerConfig);	
}

function watchForDraftBoardChanges() {
	
//	console.log("Setting up draft board observer...");	
	
	var target_observe = target_observe = $(".styles__draftingBarScrollable__P7X9z").get(0);
	
	if (!target_observe){
		return;
	}

    if (!pickObserver){
    	pickObserver = new MutationObserver(function(mutations) {
			
//			console.log("DraftBoard mutations: " + mutations.length);
			if (mutations.length == 0) {
				// do nothing
			} else {
				checkDraftPicks(false);
			}
		});
    }

	var observerConfig = {
	    childList: true,
	    characterData: true,
	    subtree: true
	}
	pickObserver.observe(target_observe, observerConfig);	
}

function watchForChangesInBody() {

	var target_observe = document.querySelector("body");
	if (!target_observe){
		return;
	}
	
    if (!bodyObserver){
    	bodyObserver = new MutationObserver(function(mutations) {
			if (mutations.length == 0 || hasFoundPickObserver) {
				// do nothing
			} else if (jQuery(".styles__draftingBarScrollable__P7X9z").length){
//				console.log("Found DraftBoard...");
				if (getStatus()){					
//					console.log("... and Found Status.");
					hasFoundPickObserver = true;
					checkSport();	
					checkDraftPicks(true);
					if (isPreDraft()){
						watchForPreDraftChanges();
					} else {					
						watchForDraftBoardChanges();	
					}
				}
			}
			if (draftIsCompleted()){
				checkDraftPicks(true); 
				this.disconnect(); 
			}				
		});
    }

	var observerConfig = {
	    childList: true,
	    characterData: true,
	    subtree: true
	}
	bodyObserver.observe(target_observe, observerConfig);
}

checkDraftRoom();