"use strict";(()=>{var ADDON_HOST=browser.runtime.getURL(""),SIDEBAR_URL=browser.runtime.getURL("/sidebar/sidebar.html"),GROUP_URL=browser.runtime.getURL("/sidebery/group.html"),GROUP_URL_LEN=GROUP_URL.length,URL_URL=browser.runtime.getURL("/sidebery/url.html"),URL_URL_LEN=URL_URL.length,SETUP_URL=browser.runtime.getURL("/page.setup/setup.html"),SEARCH_URL=browser.runtime.getURL("/popup.search/search.html");var NOID=-1;function getInstanceName(instance){return instance===2?"sidebar":instance===0?"bg":instance===3?"setup":instance===1?"group":instance===6?"proxy":instance===5?"url":instance===4?"search":instance===7?"preview":"unknown"}var _type="unknown",_winId="",_tabId="";function setInstanceType(type){_type=getInstanceName(type)}function warn(msg,...args){console.warn(`[${_type}${_winId}${_tabId}] ${msg}`,...args)}function err(msg,err2){msg=`[${_type}${_winId}${_tabId}] ${msg}
`,err2!==void 0?console.error(msg,err2):console.error(msg)}var MSG_CONFIRMATION_MAX_DELAY=5e3,CONNECT_CONFIRMATION_MAX_DELAY=5e3,actions,_localType=-1,_localWinId=NOID,_localTabId=NOID,state={bgConnection:void 0,searchPopupConnections:new Map,sidebarConnections:new Map,setupPageConnections:new Map,groupPageConnections:new Map,previewConnection:void 0};function setInstanceType2(type){_localType=type}function registerActions(a){actions=a}function getConnection(type,id){if(type===0&&state.bgConnection)return state.bgConnection;if(type===2)return state.sidebarConnections.get(id);if(type===3)return state.setupPageConnections.get(id);if(type===4)return state.searchPopupConnections.get(id);if(type===1)return state.groupPageConnections.get(id);if(type===7)return state.previewConnection}function createConnection(type,id){let connection={type,id,reconnectCount:0};return type===0?state.bgConnection=connection:type===2?state.sidebarConnections.set(id,connection):type===3?state.setupPageConnections.set(id,connection):type===4?state.searchPopupConnections.set(id,connection):type===1?state.groupPageConnections.set(id,connection):type===7&&(state.previewConnection=connection),connection}var connectingTimeout;function connectTo(dstType,dstWinId=NOID,dstTabId=NOID){let srcType=_localType,srcWinId=_localWinId,srcTabId=_localTabId,toBg=dstType===0,toSidebar=dstType===2,toSetup=dstType===3,toSearch=dstType===4,toGroup=dstType===1,toPreview=dstType===7,id;if(toBg||toPreview)id=NOID;else if((toSidebar||toSearch)&&dstWinId!==NOID)id=dstWinId;else if((toSetup||toGroup)&&dstTabId!==NOID)id=dstTabId;else{err("IPC.connectTo: No destination id");return}let portNameData={srcType,dstType};srcWinId!==NOID&&(portNameData.srcWinId=srcWinId),srcTabId!==NOID&&(portNameData.srcTabId=srcTabId),dstWinId!==NOID&&(toSidebar||toSearch)&&(portNameData.dstWinId=dstWinId),dstTabId!==NOID&&(toSetup||toGroup)&&(portNameData.dstTabId=dstTabId);let portNameJson=JSON.stringify(portNameData),connection,connectionIsNew=!1,existedConnection=getConnection(dstType,id);existedConnection?connection=existedConnection:(connectionIsNew=!0,connection=createConnection(dstType,id)),connection.localPort&&connection.localPort.disconnect(),connection.localPort=browser.runtime.connect({name:portNameJson}),connection.postListener=msg=>{onPostMsg(msg,connection.localPort)},connection.localPort.onMessage.addListener(connection.postListener),connection.disconnectListener=port=>{port.onMessage.removeListener(connection.postListener),port.onDisconnect.removeListener(connection.disconnectListener),resolveUnfinishedCommunications(port),connection.localPort=void 0;let connectionIsRemoved=!1;if(connection.remotePort||(connectionIsRemoved=!0,toBg?state.bgConnection=void 0:toSidebar?state.sidebarConnections.delete(dstWinId):toSetup?state.setupPageConnections.delete(dstTabId):toSearch?state.searchPopupConnections.delete(dstWinId):toGroup?state.groupPageConnections.delete(dstTabId):toPreview&&(state.previewConnection=void 0)),connectionIsRemoved){let handlers=disconnectionHandlers.get(dstType);handlers&&handlers.forEach(cb=>cb(connection.id))}toBg&&connection.reconnectCount++<3&&(clearTimeout(connectingTimeout),connectingTimeout=setTimeout(()=>connectTo(dstType,dstWinId),120))},connection.localPort.onDisconnect.addListener(connection.disconnectListener),clearTimeout(connectingTimeout),connectingTimeout=setTimeout(()=>{connection.localPort&&!connection.localPort.error?connection.reconnectCount=0:err("IPC.connectTo: Cannot reconnect")},120);let conConfirmId=toBg?-1:-2,timeout=setTimeout(()=>{warn("IPC.connectTo: No confirmation:",getInstanceName(dstType)),msgsWaitingForAnswer.delete(conConfirmId)},CONNECT_CONFIRMATION_MAX_DELAY);return msgsWaitingForAnswer.set(conConfirmId,{timeout,portName:"",ok:()=>{if(connectionIsNew){let handlers=connectionHandlers.get(dstType);handlers&&handlers.forEach(cb=>cb(connection.id))}}}),connection.localPort}function bg(action,...args){let msg={dstType:0,action,args};return request(msg,2)}var msgsWaitingForAnswer=new Map,msgCounter=1;async function request(msg,autoConnectMode){if(msg.dstType===void 0)return Promise.reject("IPC.request: No dstType");let id=NOID;msg.dstType===2&&msg.dstWinId!==void 0?id=msg.dstWinId:msg.dstType===3&&msg.dstTabId!==void 0?id=msg.dstTabId:msg.dstType===4&&msg.dstWinId!==void 0?id=msg.dstWinId:msg.dstType===1&&msg.dstTabId!==void 0&&(id=msg.dstTabId);let connection=getConnection(msg.dstType,id),port=connection?.localPort??connection?.remotePort;return new Promise((ok,err2)=>{if(msg.dstType===void 0)return err2("IPC.request: No dstType");if(!port||port.error){if(autoConnectMode===0)return err2("IPC.request: No port");if(port?.error&&err("IPC.request: Target port has an error:",port?.error),port=void 0,autoConnectMode===2&&(warn("IPC.request: Cannot find appropriate port, trying to reconnect..."),port=connectTo(msg.dstType,msg.dstWinId,msg.dstTabId)),!port||port.error)return port?.error&&err("IPC.request: Target port has error:",port?.error),err2(`IPC.request: Cannot get target port for "${getInstanceName(msg.dstType)}"`)}let msgId=msgCounter++;msg.id=msgId;try{port.postMessage(msg)}catch(e){if(warn("IPC.request: Got error on postMessage, trying to reconnect...",e),port=connectTo(msg.dstType,msg.dstWinId,msg.dstTabId),!port||port.error)return port?.error&&err("IPC.request: Target port has error:",port?.error),err2(`IPC.request: Cannot get target port for "${getInstanceName(msg.dstType)}"`);try{port?.postMessage(msg)}catch(e2){let dstTypeName=getInstanceName(msg.dstType);return err(`IPC.request: Cannot post message to "${dstTypeName}":`,e2),err2(`IPC.request: Cannot post message to "${dstTypeName}": ${String(e2)}`)}}let timeout=setTimeout(async()=>{if(warn("IPC.request: No confirmation:",getInstanceName(msg.dstType),msg.action),msgsWaitingForAnswer.delete(msgId),port&&(port.error={message:"No confirmation"}),autoConnectMode===2)try{ok(await request(msg,0))}catch(e){err2(e)}else err2("IPC.request: No confirmation")},MSG_CONFIRMATION_MAX_DELAY);msgsWaitingForAnswer.set(msgId,{timeout,ok,err:err2,portName:port.name})})}var connectionHandlers=new Map;var disconnectionHandlers=new Map;function runActionFor(msg){if(msg.action!==void 0&&actions){let action=actions[msg.action];if(action)return msg.arg?action(msg.arg):msg.args?action(...msg.args):action()}}var runningAsyncActions=new Map;async function onPostMsg(msg,port){if(msg<0){let waiting=msgsWaitingForAnswer.get(msg);waiting&&(clearTimeout(waiting.timeout),waiting.ok&&waiting.ok(),msgsWaitingForAnswer.delete(-1));return}if(typeof msg=="number"){let waiting=msgsWaitingForAnswer.get(msg);waiting&&clearTimeout(waiting.timeout);return}if(!msg.action&&msg.id){let waiting=msgsWaitingForAnswer.get(msg.id);waiting&&(clearTimeout(waiting.timeout),msg.error&&waiting.err?waiting.err(msg.error):waiting.ok&&waiting.ok(msg.result),msgsWaitingForAnswer.delete(msg.id));return}let result,error;try{result=runActionFor(msg)}catch(err2){error=String(err2),err(`IPC.onPostMsg: Error on running "${String(msg.action)}" action:`,err2)}if(msg.id&&port)if(result instanceof Promise){let msgId=msg.id;try{port.postMessage(msgId)}catch(err2){err(`IPC.onPostMsg: Error on sending "${String(msg.action)}" action confirm:`,err2);return}let finalResult,error2;try{runningAsyncActions.set(msgId,port.name),finalResult=await result}catch(err2){error2=String(err2)}if(runningAsyncActions.has(msgId))runningAsyncActions.delete(msgId);else return;try{port.postMessage({id:msgId,result:finalResult,error:error2})}catch(err2){err(`IPC.onPostMsg: Error on sending "${String(msg.action)}" action result:`,err2);return}}else try{port.postMessage({id:msg.id,result,error})}catch(err2){err(`IPC.onPostMsg: Error on sending "${String(msg.action)}" action result:`,err2)}}function resolveUnfinishedCommunications(port){for(let[msgId,waiting]of msgsWaitingForAnswer)waiting.portName===port.name&&(clearTimeout(waiting.timeout),waiting.err&&waiting.err("IPC: Target disconnected"),msgsWaitingForAnswer.delete(msgId));for(let[msgId,portName]of runningAsyncActions)portName===port.name&&runningAsyncActions.delete(msgId)}function disconnectFrom(fromType,winOrTabId){if(winOrTabId===void 0&&(winOrTabId=NOID),fromType!==0&&fromType!==7&&winOrTabId===NOID)return err("IPC.disconnectFrom: No winOrTabId");let connection=getConnection(fromType,winOrTabId);if(!connection)return;connection.localPort&&(resolveUnfinishedCommunications(connection.localPort),connection.localPort.disconnect(),connection.localPort.onMessage.removeListener(connection.postListener),connection.localPort.onDisconnect.removeListener(connection.disconnectListener),connection.localPort=void 0),connection.remotePort&&(resolveUnfinishedCommunications(connection.remotePort),connection.remotePort.disconnect(),connection.remotePort.onMessage.removeListener(connection.postListener),connection.remotePort.onDisconnect.removeListener(connection.disconnectListener),connection.remotePort=void 0),clearTimeout(connectingTimeout);let connectionIsRemoved=!1;if(!connection.remotePort&&!connection.localPort&&(connectionIsRemoved=!0,fromType===0?state.bgConnection=void 0:fromType===2?state.sidebarConnections.delete(winOrTabId):fromType===3?state.setupPageConnections.delete(winOrTabId):fromType===4?state.searchPopupConnections.delete(winOrTabId):fromType===1?state.groupPageConnections.delete(winOrTabId):fromType===7&&(state.previewConnection=void 0)),connectionIsRemoved){let handlers=disconnectionHandlers.get(fromType);handlers&&handlers.forEach(cb=>cb(connection.id))}}var MARGIN=2,state2={tabId:NOID,winId:NOID,unloaded:!1,rootEl:null,popupEl:null,titleEl:null,urlEl:null,previewEl1:null,previewEl2:null,referenceDevicePixelRatio:1,previewWidth:280,previewHeight:250,popupHeight:250,offsetY:0,offsetX:0,pageWidth:window.innerWidth,pageHeight:window.innerHeight,compScale:1,minY:MARGIN,maxY:window.innerHeight-250,hidden:!1},previewConf={format:"jpeg",quality:90,scale:window.devicePixelRatio/2};function waitInitData(){return new Promise((ok,err2)=>{if(window.sideberyInitData)return ok();window.onSideberyInitDataReady=ok,setTimeout(()=>err2("GroupPage: No initial data (sideberyInitData)"),2e3)})}async function updatePreview(tabId,title,url,unloaded){if(state2.titleEl&&(state2.titleEl.innerText=title),state2.urlEl&&(state2.urlEl.innerText=url),state2.tabId=tabId,state2.unloaded=unloaded,state2.unloaded)setPreview("");else{let preview=await bg("tabsApiProxy","captureTab",tabId,previewConf).catch(()=>"");state2.tabId===tabId&&setPreview(preview)}}var previewElN=0;function setPreview(preview){!state2.previewEl1||!state2.previewEl2||(previewElN?(previewElN=0,state2.previewEl1.style.setProperty("opacity","1"),state2.previewEl1.style.setProperty("background-image",preview?`url("${preview}")`:"none"),setTimeout(()=>{state2.previewEl2&&state2.previewEl2.style.setProperty("opacity","0")},100)):(previewElN++,state2.previewEl2.style.setProperty("opacity","1"),state2.previewEl2.style.setProperty("background-image",preview?`url("${preview}")`:"none"),setTimeout(()=>{state2.previewEl1&&state2.previewEl1.style.setProperty("opacity","0")},100)))}function setPopupPosition(y){if(!state2.popupEl)return;let newY=y+state2.offsetY;newY>state2.maxY?newY=state2.maxY:newY<state2.minY&&(newY=state2.minY),state2.popupEl.style.transform=`translateY(${newY}px)`}function show(){!state2.rootEl||state2.hidden||(state2.rootEl.style.opacity="1")}function hide(){state2.rootEl&&(state2.rootEl.style.opacity="0",state2.hidden=!0,disconnectFrom(0),disconnectFrom(2,state2.winId))}function compensateZoom(){state2.rootEl&&state2.referenceDevicePixelRatio!==window.devicePixelRatio&&(state2.compScale=state2.referenceDevicePixelRatio/window.devicePixelRatio,state2.rootEl.style.transform=`scale(${state2.compScale})`)}function calcPreviewHeight(popupWidth){let pageWidth=state2.pageWidth,pageHeight=state2.pageHeight,popupHeight=Math.round(pageHeight/pageWidth*popupWidth);return popupHeight>popupWidth&&(popupHeight=popupWidth),popupHeight}function calcScale(previewWidth,previewHeight,devicePixelRatio){let pageWidth=state2.pageWidth,pageHeight=state2.pageHeight,w=pageWidth/previewWidth,h=pageHeight/previewHeight,scale=devicePixelRatio/Math.min(w,h)*1.5;return scale>devicePixelRatio&&(scale=devicePixelRatio),scale}function getPopupHeight(){return state2.popupEl?state2.popupEl.offsetHeight:state2.previewHeight}function calcPositionRestraints(){state2.minY=MARGIN/state2.compScale,state2.maxY=(state2.pageHeight-MARGIN)/state2.compScale-state2.popupHeight}async function main(){setInstanceType(7),state2.rootEl=document.getElementById("sdbr_preview_root"),state2.rootEl&&state2.rootEl.remove(),state2.rootEl=document.createElement("div"),state2.rootEl.setAttribute("id","sdbr_preview_root"),document.body.appendChild(state2.rootEl),await waitInitData();let initData=window.sideberyInitData;window.sideberyInitData=void 0,window.onSideberyInitDataReady=void 0,state2.winId=initData.winId,state2.referenceDevicePixelRatio=initData.dpr,state2.previewWidth=initData.popupWidth,state2.previewHeight=calcPreviewHeight(initData.popupWidth),state2.offsetY=initData.offsetY,state2.offsetX=initData.offsetX,previewConf.scale=calcScale(state2.previewWidth,state2.previewHeight,state2.referenceDevicePixelRatio),setInstanceType2(7),connectTo(0),connectTo(2,initData.winId),registerActions({updatePreview,setY:setPopupPosition,close:hide});let shadow=state2.rootEl.attachShadow({mode:"closed"});state2.rootEl.style.cssText=`
    --bg: ${initData.bg};
    --fg: ${initData.fg};
    --hbg: ${initData.hbg};
    --hfg: ${initData.hfg};
    position: fixed;
    z-index: 999999;
    top: 0;
    ${initData.atTheLeft?"left: 0;":"right: 0;"}
    height: 100vh;
    width: 0;
    padding: 0;
    margin: 0;
    border: none;
    pointer-events: none;
    opacity: 0;
    transition: opacity .1s;
    transform-origin: 50% 0%;
`,state2.popupEl=document.createElement("div"),state2.popupEl.classList.add("popup"),shadow.appendChild(state2.popupEl),state2.popupEl.style.cssText=`
    position: absolute;
    width: ${state2.previewWidth}px;
    ${initData.atTheLeft?"left":"right"}: ${MARGIN+state2.offsetX}px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0 1px 12px 0 #0005;
    background-color: var(--bg);
    overflow: hidden;
    color: var(--fg);
    font-family: sans-serif;
    transition: background 1s;
`;let headerEl=document.createElement("div");headerEl.classList.add("header"),state2.popupEl.appendChild(headerEl),headerEl.style.cssText=`
    position: relative;
    flex-shrink: 0;
    width: 100%;
    background-color: var(--hbg);
    font-size: 16px;
    color: var(--hfg);
    overflow: hidden;
`,state2.titleEl=document.createElement("div"),state2.titleEl.classList.add("title"),headerEl.appendChild(state2.titleEl),state2.titleEl.style.cssText=`
    position: relative;
    margin: 6px 8px 4px;
    padding: 0;
    font-size: .875em;
    font-weight: 700;
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,state2.urlEl=document.createElement("div"),state2.urlEl.classList.add("url"),headerEl.appendChild(state2.urlEl),state2.urlEl.style.cssText=`
    position: relative;
    margin: 0 8px 8px;
    padding: 0;
    font-size: .8125em;
    font-weight: 400;
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: .75;
`;let previewBoxEl=document.createElement("div");state2.popupEl.appendChild(previewBoxEl),previewBoxEl.style.cssText=`
    position: relative;
    width: 100%;
    height: ${state2.previewHeight+initData.rCrop}px;
`,state2.previewEl1=document.createElement("div"),previewBoxEl.appendChild(state2.previewEl1),state2.previewEl1.style.cssText=`
    position: absolute;
    width: calc(100% + ${initData.rCrop}px);
    height: 100%;
    top: 0;
    left: 0;
    background-image: var(--preview);
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-size: cover;
    opacity: 0;
    transition: opacity .2s;
`,state2.previewEl2=document.createElement("div"),previewBoxEl.appendChild(state2.previewEl2),state2.previewEl2.style.cssText=`
    position: absolute;
    width: calc(100% + ${initData.rCrop}px);
    height: 100%;
    top: 0;
    left: 0;
    background-image: var(--preview);
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-size: cover;
    opacity: 0;
    transition: opacity .2s;
`,compensateZoom(),updatePreview(initData.tabId,initData.title,initData.url,!1),state2.popupHeight=getPopupHeight(),calcPositionRestraints(),setPopupPosition(initData.y),setTimeout(()=>show(),50)}main();})();
