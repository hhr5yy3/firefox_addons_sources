// Copyright (c) Zanger LLC. All rights reserved.

(function(){"use strict";var scope;if((typeof exports)!=="undefined"){scope=exports;}
else{scope={};window.scope.settingStrings=scope;}
scope.getMessages=function(settingDefinition){const messages=[];if(settingDefinition){messages.push(settingDefinition.name+"_title");messages.push(settingDefinition.name+"_description");if(settingDefinition.urlSpecific){messages.push(settingDefinition.name+"_urlSpecific");}
if(settingDefinition.options){settingDefinition.options.forEach(function(option){if(option!==null){messages.push(settingDefinition.name+"_options."+option);}});}
if(settingDefinition.inputs){settingDefinition.inputs.forEach(function(input){if(input){if(input.options){input.options.forEach(function(option){if(option!==null){messages.push(input.name+"_options."+option);}});}}});}
if(settingDefinition.action){messages.push(settingDefinition.name+"_label");}
if(settingDefinition.actions){settingDefinition.actions.forEach(function(action){messages.push(action.name+"_label");});}}
return messages;};scope.getStrings=function(settingDefinition){const strings=[];function addString(string){if((typeof string)==="string"&&string.trim()){strings.push(string);}}
addString(settingDefinition.name);if(settingDefinition.options){settingDefinition.options.forEach(function(option){addString(option);});}
scope.getMessages(settingDefinition).forEach(function(message){addString(browser.i18n.getMessage(message));});return strings;};}());