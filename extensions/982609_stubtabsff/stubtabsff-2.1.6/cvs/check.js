// Copyright (c) Zanger LLC. All rights reserved.

(function(){"use strict";var scope;if((typeof exports)!=="undefined"){scope=exports;}
else{window.scope.check={};scope=window.scope.check;}
const settings=require("./settings");const lists=require("./lists");const{parseErrorStack}=require("./callingStack");const logging=require("./logging");scope.check=function check({url,errorStack}){url=new URL(url||"about:blank");var match=checkBoth(errorStack,url,settings.get("canvas.blockMode",url)).match(/^(block|allow|fake|ask)(|Everything|Internal)$/);if(match){return{url:url,internal:match[2]==="Internal",mode:match[1]};}
else{return{url:url,internal:false,mode:"block"};}};function checkBoth(errorStack,url,blockMode){if(settings["canvas.enableStackList"]&&errorStack&&checkStack(errorStack)){return"allow";}
else{return checkURL(url,blockMode);}}
function checkURL(url,blockMode){logging.message("check url %s for block mode %s",url,blockMode);switch(url.protocol){case"about:":if(url.href==="about:blank"){logging.message("use regular mode on about:blank");break;}
logging.message("allow internal URLs");return"allowInternal";case"chrome:":logging.message("allow internal URLs");return"allowInternal";}
var mode="block";switch(blockMode){case"blockEverything":mode="block";break;case"block":case"ask":case"fake":case"allow":if(url&&lists.get("white").match(url)){mode="allow";}
else if(url&&lists.get("black").match(url)){mode="block";}
else{mode=blockMode;}
break;case"allowEverything":mode="allow";break;default:logging.warning("Unknown blocking mode ("+blockMode+"). Default to block everything.");}
return mode;}
function checkStack(errorStack){var callingStack=parseErrorStack(errorStack);return lists.get("stack").match(callingStack);}
scope.checkStack=checkStack;}());