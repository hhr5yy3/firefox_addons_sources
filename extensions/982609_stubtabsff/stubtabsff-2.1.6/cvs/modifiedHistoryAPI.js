// Copyright (c) Zanger LLC. All rights reserved.

(function(){"use strict";var scope;if((typeof exports)!=="undefined"){scope=exports;}
else{window.scope.modifiedHistoryAPI={};scope=window.scope.modifiedHistoryAPI;}
const{checkerWrapper}=require("./modifiedAPIFunctions");scope.changedGetters=[{objectGetters:[function(window){return window.History&&window.History.prototype;}],name:"length",getterGenerator:function(checker){const temp={get length(){return checkerWrapper(checker,this,arguments,function(args,check){const{prefs,notify,window,original}=check;const originalLength=original.apply(this,window.Array.from(args));const threshold=prefs("canvas.historyLengthThreshold",window.location);if(originalLength>threshold){notify("fakedHistoryReadout");return threshold;}
else{return originalLength;}});}};return Object.getOwnPropertyDescriptor(temp,"length").get;}}];function getStatus(obj,status){status=Object.create(status);status.active=true;return status;}
scope.changedGetters.forEach(function(changedGetter){changedGetter.type="readout";changedGetter.getStatus=getStatus;changedGetter.api="history";});}());