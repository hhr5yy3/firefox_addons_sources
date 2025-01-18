
(function(){

    var verifrom={
        appInfo : {
            extensionCodeName:'SPAMBEE'
        },
        customEvent: {
            addEventListener:function(eventName, eventHandler) {
                window.top.document.addEventListener(verifrom.appInfo.extensionCodeName+eventName, eventHandler);
            },
            dispatchEvent:function(event) {
                window.top.document.dispatchEvent(event)
            },
            CustomEvent:function(eventName, eventDetails) {
                return new CustomEvent(verifrom.appInfo.extensionCodeName+eventName, eventDetails);
            }
        }
    };
    var PARAM={};
    verifrom.appInfo.extensionCodeName=document.querySelector('script[verifromExtensionCodeName]').getAttribute('verifromExtensionCodeName');

    function RoundCubeProxy(e)
    {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let elements={
            fid:undefined,
            selectedMessagesIds:undefined,
            auditMessages:false,
            token:undefined
        };

        try {
            verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;

            if (window.rcmail.env.task==="mail")
            {
                elements.token=window.rcmail.env.request_token;
                switch (window.rcmail.env.action)
                {
                    case "show":
                        elements.selectedMessagesIds=[];
                        elements.fid=[];
                        elements.auditMessages=true;
                        elements.selectedMessagesIds.push(parseInt(window.rcmail.env.uid));
                        elements.fid.push(rcmail.get_message_mailbox(window.rcmail.env.uid));
                        break;
                    default:
                        let messageId;
                        if (rcmail.message_list.selection.length>0)
                        {
                            elements.selectedMessagesIds=[];
                            elements.fid=[];
                            elements.auditMessages=rcmail.env.contentframe ? (rcmail.message_list.selection.length === 1) : false;
                            for (let i=0; i<rcmail.message_list.selection.length;i++)
                            {
                                messageId=parseInt(rcmail.message_list.selection[i]);
                                elements.selectedMessagesIds.push(parseInt(messageId));
                                elements.fid.push(rcmail.get_message_mailbox(messageId));
                            }
                        }
                        break;
                }
            }
        } catch (e)
        {
            void 0;
            elements={
                fid:undefined,
                selectedMessagesIds:undefined,
                auditMessages:false,
                token:undefined
            };
        }

        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    function BluewinProxy(e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let bluewinEmails=[];
        let mailComponent=window.Ext.ComponentMgr.all.items.filter(function(item) {return item.xtype==='mail-mail-panel';})[0];
        let folderComponentView=window.Ext.ComponentMgr.all.items.filter(function(item) {return item.xtype==='panel' && item.refName==="collapsiblePanel";})[0];

        if (mailComponent.messagesPanel.messageTabPanel.activeTabHasMessage())
        {
            if (typeof mailComponent.messagesPanel.messageTabPanel.activeTab.threadlist === 'undefined')
            {
                bluewinEmails[0]={
                    mid:mailComponent.messagesPanel.messageTabPanel.activeTab.message.getAttribute('UID'),
                    fid:mailComponent.messagesPanel.messageTabPanel.activeTab.message.getFolderPath(),
                    accountName:mailComponent.messagesPanel.messageTabPanel.activeTab.message.getAccountName(),
                    mailFrameId:mailComponent.messagesPanel.messageTabPanel.activeTab.iframeID
                }
            }
            else {
                let threadlist=mailComponent.messagesPanel.messageTabPanel.activeTab.threadlist;
                for (let i=0; i<threadlist.length;i++)
                {
                    let mailFrameId=window.Ext.ComponentMgr.all.items.filter(function(item){return item.currentRecord && item.isThreadMessage===true && item.currentRecord.data.attributes.UID===threadlist[i].attributes.UID && document.getElementById(item.iframeID)});
                    if (mailFrameId.length>0)
                    {
                        for (let j=0;j<mailFrameId.length;j++)
                        {
                            bluewinEmails.push({
                                mid:threadlist[i].attributes.UID,
                                fid:threadlist[i].baseParams.folderPath,
                                accountName:threadlist[i].baseParams.accountName,
                                mailFrameId:mailFrameId[j].iframeID
                            });
                        }
                    }
                    else
                        bluewinEmails.push({
                            mid:threadlist[i].attributes.UID,
                            fid:threadlist[i].baseParams.folderPath,
                            accountName:threadlist[i].baseParams.accountName,
                            mailFrameId:undefined
                        });
                }
            }
        }

        if (folderComponentView.el.dom.style.display!=='none' && !checkOnly)
        {
            if (typeof mailComponent.messagesPanel.getSelectedTuples === "undefined")
            {
                let selectedEmails=mailComponent.messagesPanel.getSelectedRecords();
                bluewinEmails=[];
                for (let i=0; i<selectedEmails.length;i++)
                {
                    bluewinEmails.push({
                        mid:selectedEmails[i].getAttribute('UID'),
                        fid:selectedEmails[i].getFolderPath(),
                        accountName:selectedEmails[i].getAccountName(),
                        mailFrameId:undefined
                    });
                }
            }
            else 
            {
                let selectedEmails=mailComponent.messagesPanel.getSelectedTuples();
                bluewinEmails=[];
                for (let i=0; i<selectedEmails.length;i++)
                {
                    bluewinEmails.push({
                        mid:selectedEmails[i].tid,
                        fid:selectedEmails[i].tfolderpath,
                        accountName:selectedEmails[i].taccount,
                        mailFrameId:undefined
                    });
                }
            }
        }

        window.setTimeout(function (){
            let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                detail: {
                    bluewinEmails : bluewinEmails,
                    sessionParameters :Ext.ux.core.util.Session.get() 
                }
            }));
        },500);
    }

    function AOLProxy(e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let elements={
            selectedUIDs: ws.bootstrap.theMailModel.selectedUids,
            currentUid: ws.bootstrap.theMailModel.currentUid,
            UserUID: ws.UserContext.UserUID,
            Folder: ws.bootstrap.theMailModel.currentFolder,
            bodyFrame:undefined,
            bodyId:undefined,
            imagesRemoved : undefined,
            displaySideBar : e.detail ? e.detail.displaySideBar : true
        };

        if (ws.WebSuite.ViewWidget.selectedChildWidget.previewPane && ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.sizeActual>0)
        {
            if (ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.uid && Object.keys(ws.bootstrap.theMailModel.selectedUids).length===0)
                elements.currentUid=ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.uid;
            if (ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.bodyFrame)
                elements.bodyFrame=ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.bodyFrame.name;
            else {
                let container;
                let bodyCont;
                container=ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.containerNode;
                bodyCont=container.querySelector('[data-dojo-attach-point="bodyCont"]>div');
                if (bodyCont)
                    elements.bodyId=bodyCont.id;
            }
            elements.imagesRemoved=ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.imagesRemoved;
        }
        else if (ws.WebSuite.ViewWidget.selectedChildWidget) {
            if (ws.WebSuite.ViewWidget.selectedChildWidget.uid && Object.keys(ws.bootstrap.theMailModel.selectedUids).length===0)
                elements.currentUid=ws.WebSuite.ViewWidget.selectedChildWidget.uid;
            if (ws.WebSuite.ViewWidget.selectedChildWidget.bodyFrame)
                elements.bodyFrame=ws.WebSuite.ViewWidget.selectedChildWidget.bodyFrame.name;
            if (ws.WebSuite.ViewWidget.selectedChildWidget.bodyCont)
                elements.bodyId=ws.WebSuite.ViewWidget.selectedChildWidget.bodyCont.querySelector('div').id;
            elements.imagesRemoved=ws.WebSuite.ViewWidget.selectedChildWidget.imagesRemoved;
        }

        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;

        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }


    function ZimbraStandardModeProxy(e)
    {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let msgIdsNumber=0;
        let convNumber=0;
        let msgNumber;
        let msgIds=[];
        let msgElements=[];
        let messageDisplayed=false;
        let msgView=undefined;
        let bodyView, bodyViewId, frameId, folderId;

        if (checkOnly===false)
            try{
                let idex = 0;
                let c ="";
                let elemid = document.getElementsByName('id');
                let elemidcv = document.getElementsByName('idcv');
                while (elemid[idex]) {
                    let emailId=elemid[idex];
                    if  (emailId.checked
                        && (
                            emailId.parentElement.nextElementSibling.childElementCount===0
                            || emailId.parentElement.nextElementSibling.children[0].hasAttribute('id')===false
                        )
                    )
                    {
                        let cid = emailId.value;
                        msgIds.push(cid.replace(/^-/,''));
                    }
                    idex++;
                }
                idex = 0;
                while (elemidcv[idex]) {
                    if (elemidcv[idex].checked) {
                        let cid = elemidcv[idex].value;
                        msgIds.push(cid);
                    }
                    idex++;
                }
            }catch(ex){
                void 0;
            }

        msgNumber=msgIds.length;
        if (msgNumber===0 || checkOnly)
        {
            let showOriginalLink=document.getElementById('OPSHOWORIG');
            if (showOriginalLink)
            {
                let mid=showOriginalLink.href.replace(/.*id=([0-9]*).*/,'$1');
                msgIds.push(mid);
                messageDisplayed=true;
                let i=0;
                frameId=undefined;
                while (i<window.frames.length && frameId===undefined)
                {
                    try {
                        if (/complete/.test(window.frames[1].document.readyState))
                        {
                            if (window.frames[i].document.location.search.match("cid="+mid))
                                frameId=i;
                        }
                        else {
                            setTimeout(ZimbraStandardModeProxy.bind(this,e),150);
                            return;
                        }
                    }
                    catch (e)
                    {
                        void 0;
                    }
                    i++;
                }
                bodyViewId=undefined;
            }
        }

        let spamFolderLink=document.querySelectorAll('span[title*="Spam"]')[0];
        if (spamFolderLink && spamFolderLink.parentElement.id)
        {
            let spamFolderId=spamFolderLink.parentElement.id;
            let currentFolderLink=document.getElementsByClassName('ZhTISelected')[0];
            if (currentFolderLink && spamFolderLink.parentElement.id)
            {
                let currentFolderId=spamFolderLink.parentElement.id;
                spamFolderId===currentFolderId ? folderId=1 : folderId=2;
            }

        }

        window.setTimeout(function (){
            let elements={
                msgIds: msgIds,
                folderId: folderId,
                messageDisplayed: messageDisplayed,
                frameId: frameId,
                bodyViewId: bodyViewId,
                standardMode: true
            };

            let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                detail: elements
            }));
            void 0;
        },500);
    }

    function ZimbraProxy(e) {

        if (typeof _zimbraMail === 'undefined' && window.top.location.pathname.match('/h/'))
        {
            ZimbraStandardModeProxy(e);
            return;
        }

        let checkOnly=(e.type.match(/\_check$/) !== null);
        let msgIdsNumber=0;
        let convNumber=0;
        let msgNumber=0;
        let msgIds=[];
        let msgElements=[];
        let messageDisplayed=false;
        let currentView=_zimbraMail.getAppViewMgr().getCurrentView();
        let msgView=undefined;
        let bodyViewId, frameId;

        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;

        if (_zimbraMail.getActiveApp()!=='Mail')
            return;


        let cvName=_zimbraMail._appViewMgr.getCurrentView()._controller._currentView;
        let listView;

        if (_zimbraMail._appViewMgr && "function"===typeof _zimbraMail._appViewMgr.getCurrentView && _zimbraMail._appViewMgr.getCurrentView()._controller && _zimbraMail._appViewMgr.getCurrentView()._controller._listView)
            listView=_zimbraMail._appViewMgr.getCurrentView()._controller._listView[cvName];

        if (listView && listView._selectedItems!==undefined && listView._selectedItems._array.length>0)
        {

            for (let i=0;i<listView._selectedItems._array.length;i++)
            {
                let selectedMessage=listView._data[listView._selectedItems._array[i].id];
                switch (selectedMessage.item.type)
                {
                    case "CONV":
                        convNumber++;
                        msgIds=msgIds.concat(selectedMessage.item.msgIds);
                        if (selectedMessage.item.msgs)
                        {
                            msgElements=msgElements.concat(selectedMessage.item.msgs._vector._array);
                            msgIds=[];
                            for (let j=0;j<msgElements.length;j++)
                                msgIds.push(msgElements[j].id);
                        }
                        else {
                            let messageLoaded=function() {};
                            let errorLoading=function() {void 0};
                            for (let j=0; j<selectedMessage.item.msgIds.length;j++)
                            {
                                let message=new ZmMailMsg;
                                msgElements.push(message);
                                let _AjxErrorCallback=new AjxCallback(msgElements[msgElements.length-1], errorLoading);
                                let _AjxLoadCallback=new AjxCallback(msgElements[msgElements.length-1], messageLoaded);
                                let params={getHtml:true, markRead:false, forceLoad:true, callback:_AjxLoadCallback, errorCallback:_AjxErrorCallback, noTruncate:true};
                                message.id=selectedMessage.item.msgIds[j];
                                message.load(params);
                            }
                        }
                        break;
                    case "MSG":
                        msgNumber++;
                        msgIds.push(selectedMessage.item.id);
                        msgElements.push(selectedMessage.item);
                        break;
                }
            }
            if (_zimbraMail._appViewMgr.getCurrentView()._controller._doublePaneView._itemView)
                msgView=_zimbraMail._appViewMgr.getCurrentView()._controller._doublePaneView._itemView;
            else msgView=_zimbraMail._appViewMgr.getCurrentView()._controller._doublePaneView._msgView;
            messageDisplayed=(msgView && msgView._msg && msgView._ifw && msgView._elRef.style.display !=='none');

            if (messageDisplayed)
            {
                bodyViewId="#"+msgView._ifw._elRef.id+"."+msgView._ifw._elRef.className;
                frameId=msgView._ifw._iframeID;
            }
            let msgViews=msgView ? msgView._msgViews : null;
            if (messageDisplayed===undefined && msgViews)
            {
                messageDisplayed=false;
                for (let i=0;i<msgIds.length && messageDisplayed===false;i++)
                {
                    if (msgViews[msgIds[i]])
                    {
                        let msgView=msgViews[msgIds[i]];
                        if (msgView._usingIframe && msgView._ifw)
                            messageDisplayed=msgView && msgView._msg && msgView._ifw && msgView._elRef.style.display !=='none';
                        else messageDisplayed=msgView && msgView._msg && msgView._elRef.style.display !=='none';
                        if (messageDisplayed)
                        {
                            if (msgView._usingIframe && msgView._ifw)
                            {
                                bodyViewId="#"+msgView._ifw._elRef.id+"."+msgView._ifw._elRef.className;
                                frameId=msgView._ifw._iframeID;
                            } else {
                                bodyViewId=msgView._msgBodyDivId;
                                frameId=null;
                            }
                        }
                    }
                }
            }
            msgViews=undefined;
        }
        else {
            let message=undefined;
            let conversation;
            switch(currentView._className)
            {
                case 'ZmMailMsgView':
                    message=currentView._msg;
                    msgIds.push(message.id);
                    msgNumber++;
                    msgElements.push(message);
                    bodyViewId='#'+currentView._ifw._elRef.id+'.'+currentView._ifw._elRef.className;
                    frameId=currentView._ifw._iframeID;
                    messageDisplayed=true;
                    break;
                case 'ZmConvView2': 
                    if (currentView._item && currentView._item.msgIds)
                    {
                        msgIds=msgIds.concat(currentView._item.msgIds);
                        msgElements=msgElements.concat(currentView._item.msgs._vector._array);
                        msgNumber+=currentView._item.msgIds.length;
                        convNumber++;
                        messageDisplayed=true;
                        bodyViewId='div#'+currentView._messagesDiv.id+'.'+currentView._messagesDiv.className;
                        if (currentView._ifw && currentView._ifw._elRef)
                        {
                            frameId=currentView._ifw._iframeID;
                        }
                    }
                    break;
                case 'ZmConvView': 
                case 'ZmConvDoublePaneView':
                    if (currentView._msgView===undefined)
                        message=_zimbraMail.getAppViewMgr().getCurrentView()._itemView._msg;
                    else message=_zimbraMail.getAppViewMgr().getCurrentView()._msgView._msg;
                    if (message)
                    {
                        msgIds.push(message.id);
                        msgNumber++;
                        msgElements.push(message);
                        if (currentView._ifw && currentView._ifw._elRef)
                        {
                            bodyViewId='#'+currentView._ifw._elRef.id+'.'+currentView._ifw._elRef.className;
                            frameId=currentView._ifw._iframeID;
                        }
                        messageDisplayed=(_zimbraMail._appViewMgr.getCurrentView()._msgView._elRef.style.display !=='none');
                    }
                    break;
                case 'ZmTradView': 
                    if (currentView._msgView===undefined)
                    {
                        message=_zimbraMail.getAppViewMgr().getCurrentView()._itemView._msg;
                        msgView=_zimbraMail.getAppViewMgr().getCurrentView()._itemView;
                    }
                    else {
                        message=_zimbraMail.getAppViewMgr().getCurrentView()._msgView._msg;
                        msgView=_zimbraMail.getAppViewMgr().getCurrentView()._msgView;
                    }
                    if (message !== undefined && message._loadPending !== undefined && message._loadPending===false)
                    {
                        msgIds.push(message.id);
                        msgNumber++;
                        msgElements.push(message);

                        messageDisplayed=(msgView._ifw !== undefined);
                        if (messageDisplayed)
                        {
                            bodyViewId='#'+msgView._ifw._elRef.id+'.'+msgView._ifw._elRef.className;
                            frameId=msgView._ifw._iframeID;
                        }
                    }
                    break;
            }
            messageDisplayed = messageDisplayed || (message !== undefined);

        }


        window.setTimeout(function (){
            let elements={
                msgIds: msgIds,
                folderId: _zimbraMail._apps.Mail.currentSearch.query,
                messageDisplayed: messageDisplayed,
                frameId: frameId,
                bodyViewId: bodyViewId,
                standardMode: false
            };

            let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                detail: elements
            }));
        },500);
    }

    var _VF_reactInstanceId=null;

    function getObjectByChain(root,name){
        let objectToCall=root;
        let names=name.split('.');
        for (let ii=0;ii<names.length;ii++) {
            objectToCall=objectToCall[names[ii]];
        }
        return objectToCall;
    }

    function YMailNorrinProxy (e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);

        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;




        let YMailNorrin=PARAM.YMailNorrin || {
            "mailAppSelector":'mail-app-component',
            "mailViewSelector":'[data-test-id="message-view"]',
            "AppBootstrapData":"AppBootstrapData",
            "mailWssid":"mailWssid",
            "reactInstaceRegex":"__reactInternalInstance\\$",
            "reactInstaceRegexOpt":"",
            "conversations":"conversations",
            "selectionSelector":'a[data-test-id="message-list-item"][data-test-active="true"]',
            "messageGroups":"messageGroups",
            "messages":"messages",
            "mailboxes":"mailboxes",
            "useRedux":false,
            "useReduxForMulti":false,
            "context":"context",
            "appId":"context._actionContext.athenaClient.appId",
            "mailState":"child.stateNode.store.getState",
            "preview":"child.stateNode.props",
            "messageGroupList":"AppState.reduxState.action.messageGroupList"
        };

        let mailAppElement=document.getElementById(YMailNorrin.mailAppSelector);
        let mailViewElement=document.querySelector(YMailNorrin.mailViewSelector);
        let mailIsDisplayed=!!mailViewElement;
        let reportIds=[];
        let folders=[];
        let reportedMessages=[];
        let useRedux=YMailNorrin.useRedux;
        let useReduxForMulti=YMailNorrin.useReduxForMulti;
        let appId;

        appId=getObjectByChain(window,YMailNorrin.appId); 
        if (checkOnly) {
            verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                detail: {appId:appId, mailWssid:window[YMailNorrin.AppBootstrapData][YMailNorrin.mailWssid], data:reportedMessages, mailIsDisplayed:mailIsDisplayed}
            }));
            return;
        }

        let keys=Object.keys(mailAppElement);
        if (!_VF_reactInstanceId && keys && keys.length>0) {
            for (let i=0;i<keys.length && _VF_reactInstanceId===null;i++)
                _VF_reactInstanceId=new RegExp(YMailNorrin.reactInstaceRegex,YMailNorrin.reactInstaceRegexOpt).test(keys[i]) ? keys[i] : null;
        }

        let mailState=getObjectByChain(mailAppElement[_VF_reactInstanceId],YMailNorrin.mailState)(); 


        let contextObject=findObjectWithName(window[YMailNorrin.context], YMailNorrin.conversations,2,0);
        let conversationMode=false;
        if (contextObject)
            conversationMode=contextObject[YMailNorrin.conversations];

        let selection=document.querySelectorAll(YMailNorrin.selectionSelector);


        let getFolderType=function(folderId){
            if (mailState && mailState.folders) {
                let folder=mailState.folders[folderId];
                if (folder)
                    return folder.types;
            } else return undefined;
        };

        if (!mailIsDisplayed && selection && selection.length>0) {
            for (let i=0;i<selection.length;i++) {
                let href=selection[i].href.split('/');
                for (let j=0;j<href.length;j++) {
                    switch(href[j]) {
                        case 'folders':
                            folders.push(href[j+1]);
                            break;
                        case 'messages':
                            reportIds.push(href[j+1].replace(/\?.*$/,''));
                            break;
                    }
                }
            }
        } else if (mailIsDisplayed) {
            let previewedEmail=getObjectByChain(mailViewElement[_VF_reactInstanceId],YMailNorrin.preview); 
            reportIds.push(previewedEmail.message.id);
            folders.push(previewedEmail.message.folder.id);
        }

        if (conversationMode===true) {
            let messageGroupList;
            if (!mailIsDisplayed) {
                if (useReduxForMulti) {
                    messageGroupList=getObjectByChain(window,YMailNorrin.messageGroupList);
                    for (let i=0;i<reportIds.length;i++) {
                        let newMessageId=messageGroupList.find(function(item) {return item.id===reportIds[i];});
                        if (newMessageId!==undefined && newMessageId.messages && newMessageId.messages.length>0) {
                            for (let j=0;j<newMessageId.messages.length;j++) {
                                reportedMessages.push({
                                    ID:newMessageId.messages[j].id,
                                    fid:typeof newMessageId.messages[j].folder ==='object' && typeof newMessageId.messages[j].folder.id ==='string' ? getFolderType(newMessageId.messages[j].folder.id): undefined,
                                    mailId:mailState[YMailNorrin.mailboxes].id
                                });
                            }
                        }
                    }
                } else {
                    if (mailState && mailState[YMailNorrin.messageGroups]) {
                        for (let i=0;i<reportIds.length;i++) {
                            let ids=mailState[YMailNorrin.messageGroups][reportIds[i]];
                            let newMessageId=[];
                            for (let k in ids) {
                                newMessageId = newMessageId.concat(ids[k]);
                            }
                            if (newMessageId && newMessageId.length>0) {
                                for (let j=0;j<newMessageId.length;j++) {
                                    reportedMessages.push({
                                        ID:newMessageId[j],
                                        fid:typeof mailState[YMailNorrin.messages][newMessageId[j]] ==='object' && typeof mailState[YMailNorrin.messages][newMessageId[j]].folderId ==='string' ? getFolderType(mailState[YMailNorrin.messages][newMessageId[j]].folderId) : undefined,
                                        mailId:mailState[YMailNorrin.mailboxes].id
                                    });
                                }
                            } else {
                                if (mailState.messages[reportIds[i]])
                                    reportedMessages.push({
                                        ID:reportIds[i],
                                        fid:typeof mailState[YMailNorrin.messages][reportIds[i]] ==='object' && typeof mailState[YMailNorrin.messages][reportIds[i]].folderId ==='string' ? getFolderType(mailState[YMailNorrin.messages][reportIds[i]].folderId) : undefined,
                                        mailId:mailState[YMailNorrin.mailboxes].id
                                    });
                            }
                        }
                    }
                }
            } else {
                if (useRedux) {
                    messageGroupList=getObjectByChain(window,YMailNorrin.messageGroupList);
                    for (let i=0;i<reportIds.length;i++) {
                        let newMessageId=messageGroupList.find(function(item) {return item.id===reportIds[i];});
                        if (newMessageId!==undefined && newMessageId.messages && newMessageId.messages.length>0) {
                            for (let j=0;j<newMessageId.messages.length;j++) {
                                reportedMessages.push({
                                    ID:newMessageId.messages[j].id,
                                    fid:typeof newMessageId.messages[j].folder ==='object' && typeof newMessageId.messages[j].folder.id ==='string' ? getFolderType(newMessageId.messages[j].folder.id): undefined,
                                    mailId:mailState[YMailNorrin.mailboxes].id
                                });
                            }
                        }
                    }
                } else {
                    if (mailState && mailState[YMailNorrin.messageGroups]) {
                        for (let i=0;i<reportIds.length;i++) {
                            let newMessageId=mailState[YMailNorrin.messageGroups][reportIds[i]];
                            if ("object" === typeof newMessageId && newMessageId.hasOwnProperty("DEFAULT"))
                                newMessageId=newMessageId.DEFAULT;
                            if (newMessageId && newMessageId.length>0) {
                                for (let j=0;j<newMessageId.length;j++) {
                                    reportedMessages.push({
                                        ID:newMessageId[j],
                                        fid:typeof mailState[YMailNorrin.messages][newMessageId[j]] ==='object' && typeof mailState[YMailNorrin.messages][newMessageId[j]].folderId ==='string' ? getFolderType(mailState[YMailNorrin.messages][newMessageId[j]].folderId) : undefined,
                                        mailId:mailState[YMailNorrin.mailboxes].id
                                    });
                                }
                            } else {
                                if (mailState.messages[reportIds[i]])
                                    reportedMessages.push({
                                        ID:reportIds[i],
                                        fid:typeof mailState[YMailNorrin.messages][reportIds[i]] ==='object' && typeof mailState[YMailNorrin.messages][reportIds[i]].folderId ==='string' ? getFolderType(mailState[YMailNorrin.messages][reportIds[i]].folderId) : undefined,
                                        mailId:mailState[YMailNorrin.mailboxes].id
                                    });
                            }
                        }
                    }
                }
            }
        } else {
            for (let i=0;i<reportIds.length;i++) {
                reportedMessages.push({
                    ID:reportIds[i],
                    fid:getFolderType(folders[i]),
                    mailId:mailState[YMailNorrin.mailboxes].id
                });
            }
        }



        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: {appId:appId, mailWssid:window[YMailNorrin.AppBootstrapData][YMailNorrin.mailWssid], data:reportedMessages, mailIsDisplayed:mailIsDisplayed}
        }));

        return;








        if (window.context && window.context._actionContext && window.context._actionContext.athenaClient)
            appId=window.context._actionContext.athenaClient.appId;


        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: {appId:appId, mailWssid:AppBootstrapData.mailWssid, data:reportedMessages, mailIsDisplayed:mailIsDisplayed}
        }));
    }


    function YahooProxy (e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let timestamp=new Date().getTime()/1000;
        let allMessagesForStopPhishing=yui.mail.model.DataStore.Messages.getAll();
        let currentMessageForStopPhishing;
        let mail=null;
        let displayedMessages=[];
        let elements=undefined;

        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;
        currentMessageForStopPhishing=yui.mail.Tabs.getActiveTab();
        if (currentMessageForStopPhishing.cfg.widget.msgPane && currentMessageForStopPhishing.cfg.widget.msgPane.message && currentMessageForStopPhishing.cfg.widget.msgPane.threadItems) 
        {
            if (checkOnly)
            {
                displayedMessages=currentMessageForStopPhishing.cfg.widget.msgPane.threadItems._queryRoot.querySelectorAll('.thread-item.expanded>.thread-body>.body');
                for (let i=0;i<displayedMessages.length;i++)
                    displayedMessages[i].setAttribute('stopphishing','audit');
            }
            mail=currentMessageForStopPhishing.cfg.widget.msgPane.message.msgs[0];

        }
        else if (currentMessageForStopPhishing.cfg.widget.msgPane && currentMessageForStopPhishing.cfg.widget.msgPane.message)
        {
            mail=currentMessageForStopPhishing.cfg.widget.msgPane.message;
            if (checkOnly && currentMessageForStopPhishing.elContent && currentMessageForStopPhishing.elContent._node)
            {
                displayedMessages=currentMessageForStopPhishing.elContent._node.querySelectorAll('.msg-body');
                for (let i=0;i<displayedMessages.length;i++)
                    displayedMessages[i].setAttribute('stopphishing','audit');
            }

        }


        if (mail!==null)
            elements={
                mid: mail.mid,
                cid: mail.cid,
                fid: mail.fid ? mail.fid : mail.sourceFolderInfo.fid,
                wssid: NeoConfig.wssid,
                V3MailboxId: NeoConfig.V3MailboxId,
                uuid:NeoConfig.uuid,
                auditMessages: (displayedMessages.length>0),
                body: mail.body
            };
        else elements= {
            mid: undefined,
            cid: undefined,
            fid: undefined,
            wssid: NeoConfig.wssid,
            V3MailboxId: NeoConfig.V3MailboxId,
            uuid: NeoConfig.uuid,
            auditMessages: false,
            body: undefined
        };

        if (typeof NeoConfig.V3MailboxId === 'undefined' && mail!==null && /Bulk/.test(mail.fid))
        {
            let requestPayload={
                "method": "GetDisplayMessage",
                "params": [
                    {
                        "fid": mail.fid,
                        "enableRetry": true,
                        "textToHtml": true,
                        "urlDetection": true,
                        "emailDetection": true,
                        "qtAnnotate": {
                            "enable": true
                        },
                        "emailComposeUrl": "mailto:%e%",
                        "truncateAt": 100000,
                        "charsetHint": "",
                        "annotateOption": {
                            "annotateText": "inline"
                        },
                        "message": [
                            {
                                "blockImages": "all",
                                "restrictCSS": true,
                                "expandCIDReferences": true,
                                "enableWarnings": true,
                                "mid": mail.mid
                            }
                        ]
                    }
                ]
            };
            let requestURL=window.location.origin+"/ws/mail/v2.0/jsonrpc?appid=YahooMailNeo&m=GetDisplayMessage&prime=1&wssid="+NeoConfig.wssid+"&debugmid="+mail.mid+"&cachekey=Prime&ymbucketid=";

            try {
                let xmlhttp=new XMLHttpRequest;
                xmlhttp.open("POST",requestURL,true);
                xmlhttp.setRequestHeader("Content-type","application/json");
                let xmlHttpTimeout=setTimeout(function(){
                    xmlhttp.abort();
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                        detail: elements
                    }));
                },4000);

                xmlhttp.onreadystatechange=function()
                {
                    if (xmlhttp.readyState===4)
                    {
                        clearTimeout(xmlHttpTimeout);
                        switch (xmlhttp.status)
                        {
                            case 200:
                                let responseJSON;
                                try {
                                    if (typeof xmlhttp.responseText==="string")
                                        responseJSON=JSON.parse(xmlhttp.responseText);
                                    else responseJSON=xmlhttp.responseText;
                                    for (let i=0;responseJSON.result.message && i<responseJSON.result.message.length;i++)
                                    {
                                        if (responseJSON.result.message[i].mid===mail.mid)
                                        {
                                            for (let j=0; j<responseJSON.result.message[i].part.length; j++)
                                            {
                                                if (responseJSON.result.message[i].part[j].type==="text" && responseJSON.result.message[i].part[j].subtype==='html')
                                                {
                                                    elements.body={display: responseJSON.result.message[i].part[j].text};
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                } catch(exception) {
                                    void 0;
                                }
                                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                                    detail: elements
                                }));
                                break;
                            default:
                                void 0;
                                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                                    detail: elements
                                }));
                                break;
                        }
                    }
                }
            } catch (err)
            {
                void 0;
                verifrom.message.toAllTabs({response:'&nbsp;ECHEC&nbsp;'}, {channel: "PayloadPosted"});
            }
            xmlhttp.send(JSON.stringify(requestPayload));
        }
        else {
            verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                detail: elements
            }));
        }
    }

    function YMailDorrinProxy (e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let wssid = window.nodinJsVars.wssidValue;
        let appid = window.nodinJsVars.appId;
        let mailboxid = window.nodinJsVars.selectedMailboxId || document.querySelector('input[name="mailboxId"]').value;
        let elements=[];
        let mailIsDisplayed = false;
        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;
        let fid = window.top.document.location.pathname.replace(/^\/b\/folders\/([^\/]+)\/.*/,'$1');
        let selectedMsgs = document.querySelectorAll("input[type='checkbox'][name^=mids]:checked");
        if (selectedMsgs && selectedMsgs.length>0) {
            for (let i=0;i<selectedMsgs.length;i++) {
                elements.push({
                    ID:selectedMsgs[i].value,
                    mailId: mailboxid
                });
            }
        } else {
            let mid = window.top.document.location.pathname.replace(/^\/b\/folders\/([^\/]+)\/messages\/(.*)/,'$2');
            if (mid && mid.length>0) {
                elements.push({
                    ID:mid,
                    mailId: mailboxid
                });
                mailIsDisplayed = true;
            }
        }

        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: {data:elements,appId:appid,mailWssid:wssid,Folder:fid,mailIsDisplayed:mailIsDisplayed}
        }));
    }


    function OWAProxy2018 (e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        if ('function'===typeof e.stopPropagation)
            e.stopPropagation();
        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;
        let folderName=function(folderId) {
            let folder=window.__satchelGlobalContext.rootStore.get("folderStore").folderTable.get(folderId);
            if (!folder)
                return false;
            return folder.DistinguishedFolderId;
        };
        let rootObject=window.__satchelGlobalContext;
        if ("undefined"!==typeof e.detail.rootObject)
            rootObject=window[e.detail.rootObject];

        let msgIds=[];
        let folderIds=[];
        let junkIds=[];
        let msgElements=[];
        let messageDisplayed=false;

        if (!window.__satchelGlobalContext || !window.__satchelGlobalContext.rootStore)
            void 0;

        let listview=rootObject.rootStore.get("listview");
        let selectedViewId  = listview.selectedTableViewId || listview.listViewStateByModule.get("Mail").selectedTableViewId;
        let folderView=listview.tableViews.get(selectedViewId);

        if (folderView.selectedRowKeys && folderView.selectedRowKeys.size > 0) {
            let selectedIds = folderView.selectedRowKeys.toJSON().map(e=>e[0]); 
            let mailFolderId=[];
            for (let j = 0; j < selectedIds.length; j++) {
                let selectedId = selectedIds[j];
                if (!folderView.selectedRowKeys.has(selectedId))
                    continue;

                let relations = listview.tableViewItemRelations.get(selectedViewId + selectedId);
                if (relations && relations.instanceKey === selectedId) {
                    let mailInFolderId=rootObject.rootStore.get('mail').items.get(relations.clientId.Id).ParentFolderId.Id;
                    mailFolderId.push(mailInFolderId);
                    let fName;
                    folderIds.push(fName=folderName(mailInFolderId));
                    junkIds.push(fName==="junkemail");
                    msgIds.push(relations.clientId.Id);
                    if (window.top.document.querySelectorAll('div[role="main"]').length && rootObject.rootStore.get('readingpane') && rootObject.rootStore.get('readingpane').itemReadingPaneViewState && rootObject.rootStore.get('readingpane').itemReadingPaneViewState.itemId===relations.clientId.Id) {
                        messageDisplayed=true;
                    }
                } else {
                    let relations = listview.tableViewConversationRelations.get(selectedViewId + selectedId);
                    if (relations) {
                        if (relations.itemIds) {
                            let itemIds=relations.itemIds;
                            for (let k=0;k<itemIds.length;k++) {
                                let mailInFolderId=rootObject.rootStore.get("mail").items.get(itemIds[k]).ParentFolderId.Id;
                                let fName;
                                folderIds.push(fName=folderName(mailInFolderId));
                                junkIds.push(fName==="junkemail");
                                msgIds.push(itemIds[k]);
                                if ($('[data-itemid="'+itemIds[k]+'"]').length)
                                    messageDisplayed=true;
                            }
                        }
                    } else void 0;
                }
            }
        }

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        function getGuid() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }

        let correlationId=getGuid();

        let getCookie = function(name) {
            let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
        };

        let canary=getCookie("X-OWA-CANARY");

        let elements={
            msgIds: msgIds,
            folderIds: folderIds,
            junkIds: junkIds,
            msgElements: msgElements,
            auditMessages: messageDisplayed,
            header:{}
        };

        elements.header['X-OWA-CorrelationId']=correlationId;
        elements.header['X-OWA-CANARY']=canary;

        let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    function OWAProxy (e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let viewData;
        let msgIds=[];
        let folderIds=[];
        let junkIds=[];
        let msgElements=[];
        let messageDisplayed=false;
        let folderSelected=undefined;
        let folderName=undefined;
        let folderObject=undefined;
        let firstKeys=Object.keys(window);
        let agucObject=undefined;

        if ('function'===typeof e.stopPropagation)
            e.stopPropagation();
        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;

        if ("undefined"!==typeof e.detail.rootObject)
        {
            if (e.detail.rootObject.length)
            {
                let rootObjects=e.detail.rootObject;
                for (let i=0;i<rootObjects.length && !viewData;i++)
                {
                    let rootOBjectPath=rootObjects[i].split(".");
                    let prevObject=window;
                    for (let j=0;j<rootOBjectPath.length && prevObject;j++)
                    {
                        prevObject=prevObject[rootOBjectPath[j]];
                    }
                    if (prevObject && "undefined" !== typeof prevObject.length)
                        viewData=prevObject
                }
            } else { 
                let rootOBjectPath=e.detail.rootObject.split(".");
                let prevObject=window;
                for (let j=0;j<rootOBjectPath.length && prevObject;j++)
                {
                    prevObject=prevObject[rootOBjectPath[j]]
                }
                if (prevObject && "undefined" !== typeof prevObject.length)
                    viewData=prevObject
            }
        }

        for (let j=0;j<firstKeys.length && folderObject===undefined;j++)
        {
            if (!window[firstKeys[j]])
                continue;
            let secondKeys;
            try {
                secondKeys=Object.keys(window[firstKeys[j]]);
                for (let i=0;i<secondKeys.length && folderObject===undefined;i++)
                {
                    try {
                        if (/function\s*\([a-z]*,[a-z]*\)\s*\{[^;]*;_?[a-z]*\.[a-z]\.initializeBase\(this\);this.*this\)\}/i.test(window[firstKeys[j]][secondKeys[i]]))
                        {
                            folderObject=window[firstKeys[j]][secondKeys[i]];
                        }
                    } catch(e) {}
                }
            } catch(e)	{void 0;}
        }

        try {
            let firstKeys=Object.keys(folderObject);
            folderName=document.querySelectorAll('span.ms-font-weight-semibold[id*="folder"]');
            if (folderName.length>0)
                folderName=folderName[0];
            if (folderName)
                folderName=folderName.innerText;
            for (let i=0;i<firstKeys.length && folderSelected===undefined;i++)
            {
                if (folderObject[firstKeys[i]] && typeof folderObject[firstKeys[i]].filter==='function')
                    folderSelected=folderObject[firstKeys[i]].filter(function(item){let secondKeys=Object.keys(item); for (let i=0;i<secondKeys.length;i++) { if (item[secondKeys[i]]===folderName) return true; } return false; });
            }
            if (!folderSelected)
            {
                void 0;
                folderSelected=window._b.r.a.filter(function(item){let keys=Object.keys(item); for (let i=0;i<keys.length;i++) { if (item[keys[i]]===folderName) return true; } return false; });
            }
            if (!folderSelected)
            {
                void 0;
                folderSelected=window._b.r.a.filter(function(item){return item.bh===true;});
            }
        }
        catch (e) {
            void 0;
            folderName=document.querySelectorAll('span.ms-font-weight-semibold[id*="folder"]');
            if (folderName.length>0)
                folderName=folderName[0];
            if (folderName)
                folderName=folderName.innerText;
            folderSelected=window._b.r.a.filter(function(item){let keys=Object.keys(item); for (let i=0;i<keys.length;i++) { if (item[keys[i]]===folderName) return true; } return false; });
        }

        let _gbaObject=findObjectWithName(window, 'doesIdEqualName',3,0);
        if (!_gbaObject && typeof window._g.b.a.doesIdEqualName ==='function')
            _gbaObject=window._g.b.a;
        if (viewData && viewData.length>0)
        {
            try {
                for (let i=0;i<viewData.length;i++)
                {
                    let bj=findObjectWithName(viewData[i],'ConversationId',1,0,1);

                    if (bj && bj.GlobalItemIds && bj.GlobalItemIds.length>0) 
                    {
                        let bT=findObjectWithName(viewData[i],'ItemIds',1,0,1);
                        let d=findObjectWithName(bT.ItemIds,'Id',3,0,2);
                        for (let j=0;j<d.length;j++)
                        {
                            msgIds.push(d[j].Id);
                            folderIds.push(folderName);
                            if (bj.FolderId)
                            {
                                if (_gbaObject)
                                    junkIds.push(_gbaObject.doesIdEqualName(bj.FolderId, "junkemail"));
                                else junkIds.push(false);
                            }
                            else {
                                if (_gbaObject && _gbaObject.doesIdEqualName(bj.ParentFolderId))
                                    junkIds.push(_gbaObject.doesIdEqualName(bj.FolderId, "junkemail"));
                                else junkIds.push(false);
                            }
                            msgElements.push('div#Item\\.MessageUniqueBody');
                        }
                    } else {
                        msgIds.push(bj.ItemId.Id);
                        folderIds.push(folderName);
                        junkIds.push(_gbaObject.doesIdEqualName(bj.ParentFolderId, "junkemail"));
                        msgElements.push('div#Item\\.MessageUniqueBody');
                    }
                }
            } 	catch (e) {
                void 0;
                msgIds=[];
                folderIds=[];
                junkIds=[];
            }
        }

        try {
            messageDisplayed=$('div[role=document]>div#Item\\.MessagePartBody>div#Item\\.MessageUniqueBody').css('visibility')==="visible";
        } catch(e) {
            void 0;
            messageDisplayed=false;
        }

        let elements={
            msgIds: msgIds,
            folderIds: folderIds,
            junkIds: junkIds,
            msgElements: msgElements,
            auditMessages: messageDisplayed,
            header:{}
        };

        let getCookie = function(name) {
            let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
        };

        elements.header['X-OWA-CorrelationId']=window.corrId;
        elements.header['X-OWA-ClientBuildVersion']=window.lcver || window.sver;
        elements.header['X-OWA-ClientBegin']=new Date().toISOString().replace(/Z$/,'');
        elements.header['X-UpnAnchorMailbox']=getCookie("DefaultAnchorMailbox");
        elements.header['X-OWA-CANARY']=getCookie('X-OWA-CANARY');

        let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    function LiveProxy (e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let viewData=_jsv.views[3].data;
        let msgIds=[];
        let folderIds=[];
        let msgElements=[];
        let messageDisplayed=false;
        let jsvKeys=Object.keys(_jsv.views);
        let jsvCurrentViewIds=jsvKeys.filter(function(item){return (_jsv.views[item].type==="readMessagePartControl");});
        let jsvCurrentView;
        let elementId;

        if ('function'===typeof e.stopPropagation)
            e.stopPropagation();
        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;
        if (jsvCurrentViewIds.length>0) 
        {
            for (let i=0;i<jsvCurrentViewIds.length;i++) {
                let id=jsvCurrentViewIds[i];
                let itemView=_jsv.views[id];
                if (itemView.data && itemView.data.Id)
                {
                    msgIds.push(itemView.data.Id);
                    folderIds.push(itemView.data.FolderId);
                    if (itemView.data.IsBodyExpanded) 
                    {
                        let scriptElement=window.document.querySelectorAll('script[type="jsv#'+id+'_"]');
                        let nextElement=scriptElement[0].nextElementSibling;
                        elementId=nextElement.id;
                        msgElements[msgElements.length]=elementId;
                        messageDisplayed=true;
                    }
                }
            }
        } else if (_jsv.views[3].data.getSelectedThreads && typeof _jsv.views[3].data.getSelectedThreads === 'function')
        {
            let jsvSelectedThreads=_jsv.views[3].data.getSelectedThreads();
            for (let i=0;i<jsvSelectedThreads.length;i++) {
                let conversation=jsvSelectedThreads[i];
                let selectedMessages;
                if (ol.config.userPreferences.ConversationThreading)
                    selectedMessages=jsvKeys.filter(function(item){return (_jsv.views[item].data && _jsv.views[item].data.ConversationId===conversation.ConversationId);});
                else selectedMessages=jsvKeys.filter(function(item){return (_jsv.views[item].data && _jsv.views[item].data.Id===conversation.Id && _jsv.views[item].data.ViewId===conversation.ViewId);});
                for (let j=0; j<selectedMessages.length; j++) {
                    let id=selectedMessages[j];
                    let itemView=_jsv.views[id];
                    if (itemView.data && itemView.data.Id && msgIds.contains(itemView.data.Id)===false)
                    {
                        msgIds.push(itemView.data.Id);
                        folderIds.push(itemView.data.FolderId);
                        if (itemView.data.IsBodyExpanded) 
                        {
                            let scriptElement=window.document.querySelectorAll('script[type="jsv#'+id+'_"]');
                            let nextElement=scriptElement[0].nextElementSibling;
                            elementId=nextElement.id;
                            msgElements[msgElements.length]=elementId;
                            messageDisplayed=true;
                        }
                    }
                }
            }
        }


        let elements={
            msgIds: msgIds,
            folderIds: folderIds,
            msgElements: msgElements,
            auditMessages: messageDisplayed
        };

        let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }


    let requestQueue =  {
        Queue:function () {
            this.requestsQueue = [];
            this.requestsQueueParams = [];
            this.nbRequestsQueued = 0;
            this.nbError = 0;
            this.nbSuccess = 0;
            this.callback = undefined;
        }
    };
    requestQueue.Queue.prototype = {
        addRequest:function(requestParams)
        {
            this.nbRequestsQueued++;
            var params=$.extend(true,{},requestParams);
            params.context=this;
            if (typeof params.headers === 'undefined')
                params.headers={};
            this.requestsQueueParams.push(params);
        },
        run:function(callbackAfter) {
            if (this.requestsQueueParams.length===0 && this.nbRequestsQueued===0) {
                setTimeout(callbackAfter,0);
                return;
            }
            let req = this.requestsQueueParams.shift();
            var onSuccess=function(data, textStatus, jqXHR) {
                this.nbRequestsQueued--;
                this.nbSuccess++;
                this.run(callbackAfter);
            };
            var onError=function(jqXHR, textStatus, errorThrown) {
                void 0;
                this.nbRequestsQueued--;
                this.nbError++;
                this.run(callbackAfter);
            };
            $.support.cors = true;
            if (typeof req.context==='undefined')
                req.context = this;
            var jqxhr=$.ajax(req);
            this.requestsQueue.push(jqxhr);
            jqxhr.done(onSuccess);
            jqxhr.fail(onError);
        },
        done:function(callback, background)
        {
            if ("function" === typeof callback)
                this.callback=callback;
            let executeQueue = this.run.bind(this);
            executeQueue(function() {
                if (this.nbError>0 && this.nbSuccess===0 && background!==true) 
                {
                    this.nbError = 0;
                    this.nbSuccess = 0;
                    this.done(callback,true);
                    return;
                }
                if (this.callback && this.nbRequestsQueued===0 && this.nbSuccess>0)
                    this.callback(this.requestsQueue);
                else if (this.callback && this.nbRequestsQueued===0 && this.nbSuccess<=0)
                    this.callback([]);
            }.bind(this));
        }
    };

    function PosteV2Proxy(e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let elements={
            fid:undefined,
            selectedMessagesIds:undefined,
            auditMessages:false,
            token:undefined
        };
        try {
            let mailList,selectedMessages;

            mailList=window.require.s.contexts._.defined['utils/dispatcher']._events.refreshMailList[0];
            selectedMessages = mailList.context.model.get("mailCurrentlyRead") || mailList.context.model.get("selectedMsg");

            verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;

            if (selectedMessages && selectedMessages.length>0)
            {
                elements.selectedMessagesIds=[];
                elements.fid=[];
                elements.auditMessages=false;
                elements.bodySelector="#read-content-block";
                for (let i=0;i<selectedMessages.length;i++)
                {
                    let g=selectedMessages.models[i].get("id");
                    elements.selectedMessagesIds.push(g.msgId);
                    let y = g.folder.slice(3);
                    if (y === "JUNK")
                        y = "INBOX/QUARANTAINE";
                    else if (y !== "INBOX" && /^.F_/.test(g.folder))
                        y = "INBOX/" + encodeURIComponent(y);
                    else y = "INBOX";
                    elements.fid.push(y);
                }
            } else if (selectedMessages && selectedMessages.attributes && selectedMessages.attributes.id) {
                elements.selectedMessagesIds=[];
                elements.fid=[];
                elements.auditMessages=true;
                elements.bodySelector="#read-content-block";

                let g=selectedMessages.get("id");
                elements.selectedMessagesIds.push(g.msgId);
                let y = g.folder.slice(3);
                if (y === "JUNK")
                    y = "INBOX/QUARANTAINE";
                else if (y !== "INBOX" && /^.F_/.test(g.folder))
                    y = "INBOX/" + encodeURIComponent(y);
                else y = "INBOX";
                elements.fid.push(y);

            }
            else {
            }

            elements.token=localStorage.getItem('GLC_TOKEN');
        } catch (e)
        {
            void 0;
            elements={
                fid:undefined,
                selectedMessagesIds:undefined,
                auditMessages:false,
                token:undefined
            };
        }

        if (!checkOnly && elements.selectedMessagesIds) {
            let queue = new requestQueue.Queue();

            let emailParts = elements.eml = [];
            for (let i = 0; i < elements.selectedMessagesIds.length; i++) {

                let msgId = elements.selectedMessagesIds[i];
                let fid = elements.fid[i];
                void 0;
                queue.addRequest(
                    {
                        type: "GET",
                        headers: {
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                            "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3"
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        url: `https://apis-mail.laposte.net/webmail/download/Download.html?IDMSG=${msgId}&FOLDER=${fid}&TYPE_DOWNLOAD=MAIL&DEFAULT_NAME=(sans%20objet)`
                    });
            }
            queue.done(function (queueArray) {
                if (queueArray.length === 0) {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                        detail: elements
                    }));
                }
                for (let i = 0; i < queueArray.length; i++) {
                    emailParts[i] = {};
                    emailParts[i].header = queueArray[i].responseText;
                    emailParts[i].folder = /QUARANTAINE/i.test(elements.fid[i]) ? 1 : 2;
                }
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                    detail: elements
                }));
            }, true);
        } else {
            verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                detail: elements
            }));

        }

    }

    function AtelierSFRProxy(e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let elements={
            fid:undefined,
            selectedMessagesIds:undefined,
            auditMessages:false,
            token:undefined
        };
        try {
            let mailList=window.require.s.contexts._.defined['utils/dispatcher']._events.refreshMailList[0];
            let selectedMessages=mailList.context.model.get("mailCurrentlyRead") || mailList.context.model.get("selectedMsg");

            verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;

            if (selectedMessages && selectedMessages.length>0)
            {
                elements.selectedMessagesIds=[];
                elements.fid=[];
                elements.auditMessages=false;
                for (let i=0;i<selectedMessages.length;i++)
                {
                    let selectedMessage=selectedMessages.models[i];
                    elements.selectedMessagesIds.push(selectedMessage.id);
                    elements.fid.push(selectedMessage.get("id").folder);
                }
            } else if (selectedMessages && selectedMessages.id) {
                elements.selectedMessagesIds=[];
                elements.fid=[];
                elements.auditMessages=true;
                elements.selectedMessagesIds.push(selectedMessages.id);
                elements.fid.push(selectedMessages.get("id").folder);
                elements.bodySelector="#read-content-block";
            }
            else {
            }

            elements.token=localStorage.getItem('GLC_TOKEN');
        } catch (e)
        {
            void 0;
            elements={
                fid:undefined,
                selectedMessagesIds:undefined,
                auditMessages:false,
                token:undefined
            };
        }

        let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    function SFRProxy(e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let currentView=window.Application._instances['sfr.mail.ReadMailController']._displayer._currentViews[0];
        let elements={
            mid:undefined,
            fid:undefined,
            header:undefined,
            bodySelector:undefined,
            selectedMessagesIds:undefined,
            auditMessages:false
        };
        let selectedMessages=$('tr.selected','#mailbox');

        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;
        if (currentView._idMsg || (typeof currentView._messagePreviewed !== 'undefined' && currentView._messagePreviewed !== null)) 
        {
            elements.header='';
            currentView._infos.headers.forEach(function(item){elements.header+= (item.name+': '+item.value+'\n')});
            if (currentView._idMsg)
            {
                elements.mid=currentView._idMsg.id;
                elements.fid=currentView._idMsg.folder;
            }
            else {
                elements.mid=currentView._infos.idMsg;
                elements.fid=currentView._folderName;
            }
            if (currentView._messageDiv !== undefined)
                elements.bodySelector='#'+currentView._mainPane.id+'>div>#'+currentView._messageDiv.id; 
            else elements.bodySelector='#'+currentView._mainPane.id+'>#'+currentView._previewDiv.id+'>.'+(currentView._previewBodyDiv.className.split(' ').join('.')); 
            elements.auditMessages=true;
        }

        if (typeof currentView._messagePreviewed !== 'undefined' && selectedMessages.length>0) 
        {
            elements.fid=currentView._folderName;
            elements.selectedMessagesIds=[];
            selectedMessages.map(function(){elements.selectedMessagesIds.push(this.getAttribute('value'));})
        }

        let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    function OrangeOXProxy(e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let elements={
            multiselection:false,
            mailIsDisplayed:false,
            mid:[],
            fid:[],
            sessionId:""
        };
        let fid = mailapp.folder.get();
        for (m of document.querySelectorAll('.selected.list-item')) {
            let id = m.dataset.cid.replace(/^thread\./,'');
            let mel = ox.ui.App.getCurrentApp().listView.collection.find(function(a,b,c){ return a.cid===id; });
            if (mel) {
                elements.mid.push(mel.attributes.id);
                elements.fid.push(mel.attributes.folder_id);
            } else { void 0; }
        }
        elements.sessionId = window.ox.session;
        elements.multiselection = elements.mid.length > 1;
        elements.mailIsDisplayed = document.querySelector("article.mail-detail.mail-item.expanded")!==null;
        let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    function OrangeProProxy(e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let elements={
            multiselection:false,
            mailIsDisplayed:false,
            mid:[],
            fid:[]
        };
        let selectedMessages;

        if ("function"===typeof window.oo.app.modules.mail.application.panelMails._getSelectionAttr) {
            selectedMessages=window.oo.app.modules.mail.application.panelMails._getSelectionAttr();
            let viewer=window.oo.app.modules.mail.application.panelViewer;
            let sandbox=viewer ? viewer.sandbox : null;
            if (sandbox && sandbox.clientWidth*sandbox.clientHeight>0) {
                elements.mailIsDisplayed=true;
                elements.bodySelector=sandbox.id;
            }
            if (!checkOnly && selectedMessages && selectedMessages.length>0) {
                elements.empty=false;
                elements.multiselection=selectedMessages.length>1;
                for (let i=0;i<selectedMessages.length;i++){
                    elements.mid.push(selectedMessages[i].idMsg);
                    elements.fid.push(selectedMessages[i].folder);
                }
                elements.url=window.top.document.location.origin+window.oo.app.modules.mail.application.panelFolders.folderService.mailApi.serviceUrl;
                let methods=window.oo.app.modules.mail.application.panelFolders.folderService.mailApi.methods;
                for (let i=0;methods && i<methods.length;i++) {
                    if (methods[i].name==="getMail") {
                        elements.url+=methods[i].action;
                        methods=null;
                    }
                }
                elements.token=window.oo.app.config.token;
            }
        }
        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    function OrangeProxy(e) {
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let elements={
            multiselection:false,
            mid:undefined,
            fid:undefined,
            empty:true
        };
        let selectedMessages;

        if ("function"===typeof mailSelected) {
            selectedMessages=mailSelected();
            selectedMessages=selectedMessages.split(',');
            selectedMessages.pop();

            if (selectedMessages.length>0) {
                elements.empty=false;
                elements.multiselection=true;
                let folder=document.querySelector('input#listmsgrecus_FOLDER');
                if (folder)
                    folder=folder.getAttribute('value');
                elements.mid=[];
                elements.fid=[];
                for (let i=0;i<selectedMessages.length;i++){
                    elements.mid.push(selectedMessages[i]);
                    elements.fid.push(folder);
                }
            } else {
                elements.empty=false;
                let folder=document.querySelector('form#inboxMailForm>input[name="FOLDER"]');
                if (folder)
                    folder=folder.getAttribute('value');
                if (document.querySelector('input[name="IDMSG"]')) {
                    elements.multiselection=false;
                    elements.mid=document.querySelector('input[name="IDMSG"]').getAttribute('value');
                    elements.fid=folder;
                }
                else elements.mid=undefined;
            }
        } else {
            elements.empty=false;
            let folder=document.querySelector('form#inboxMailForm>input[name="FOLDER"]');
            if (folder)
                folder=folder.getAttribute('value');
            if (document.querySelector('input[name="IDMSG"]'))
            {
                elements.multiselection=false;
                elements.mid=document.querySelector('input[name="IDMSG"]').getAttribute('value');
                elements.fid=folder;
            }
            else elements.mid=undefined;
        }

        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }


    function findObjectWithName(objectSearched, valueToFind, profounder, depth, returnedLevel)
    {
        if (depth>profounder)
            return null;
        try {
            if (profounder===depth && objectSearched && (objectSearched.hasOwnProperty(valueToFind) || (objectSearched['__proto__'] && objectSearched['__proto__'].hasOwnProperty && objectSearched['__proto__'].hasOwnProperty(valueToFind))))
                return objectSearched;
        } catch(e) {

        }
        let keys;
        try { keys=Object.keys(objectSearched); } catch (e) {return null;}
        for (let index=0;index<keys.length;index++)
        {
            try {
                if (valueToFind.constructor && valueToFind.constructor.name==='RegExp')
                {
                    if (profounder===depth  && valueToFind.test(keys[index]))
                        return objectSearched;
                }
                else {

                    if (profounder===depth && keys[index]===valueToFind)
                        return objectSearched;
                }
                if ((typeof objectSearched[keys[index]]==='object' || typeof objectSearched[keys[index]]==='function') && objectSearched[keys[index]]!==null && objectSearched[keys[index]]!==undefined && profounder>depth)
                {
                    let objectFound=findObjectWithName(objectSearched[keys[index]], valueToFind, profounder, depth+1, returnedLevel);
                    if (objectFound && returnedLevel!==null && returnedLevel!==undefined && depth===returnedLevel)
                        return objectSearched;
                    else if (objectFound)
                        return objectFound;
                }
            } catch (e) {}
        }
    }

    let findObjectWithNameFromLast=function(objectSearched, valueToFind, profounder, depth, returnedLevel)
    {
        if (depth>profounder)
            return null;
        try {
            if (profounder===depth && objectSearched && (objectSearched.hasOwnProperty(valueToFind) || (objectSearched['__proto__'] && objectSearched['__proto__'].hasOwnProperty && objectSearched['__proto__'].hasOwnProperty(valueToFind))))
            {
                return objectSearched;
            }
        } catch(e) {

        }
        let keys;
        try { keys=Object.keys(objectSearched).sort(); } catch (e) {return null;}
        for (let index=keys.length-1;index>=0;index--)
        {
            try {
                if (valueToFind.constructor && valueToFind.constructor.name==='RegExp')
                {
                    if (profounder===depth  && valueToFind.test(keys[index]))
                        return objectSearched;
                }
                else {
                    if (profounder===depth && keys[index]===valueToFind)
                    {
                        return objectSearched;
                    }
                }
                if ((typeof objectSearched[keys[index]]==='object' || typeof objectSearched[keys[index]]==='function') && objectSearched[keys[index]]!==null && objectSearched[keys[index]]!==undefined && profounder>depth)
                {
                    let objectFound=findObjectWithNameFromLast(objectSearched[keys[index]], valueToFind, profounder, depth+1, returnedLevel);
                    if (objectFound && returnedLevel!==null && returnedLevel!==undefined && depth===returnedLevel)
                    {
                        return objectSearched;
                    } else if (objectFound) {
                        return objectFound;
                    }
                }
            } catch (e) {}
        }
    };

    function findObjectWithAllItems(objectSearched, valueToFind, profounder, depth, returnedLevel,debug)
    {
        if (depth>profounder)
            return null;
        let keys;
        try { keys=Object.keys(objectSearched); } catch (e) {return null;}
        if (keys.length===valueToFind.length)
        {
            keys.sort();
            let nbKeysEqual=0;
            for (let index=0;index<keys.length;index++)
                nbKeysEqual += keys[index] === valueToFind[index] ? 1 : 0;
            if (nbKeysEqual)
                return objectSearched;
        }
        for (let index=0;index<keys.length;index++)
        {
            try {
                if (typeof objectSearched[keys[index]]==='object' && objectSearched[keys[index]]!==null && objectSearched[keys[index]]!==undefined && profounder>depth)
                {
                    let objectFound=findObjectWithItemValue(objectSearched[keys[index]], valueToFind, profounder, depth+1, returnedLevel, debug);
                    if (objectFound && returnedLevel!==null && returnedLevel!==undefined && depth===returnedLevel)
                        return objectSearched;
                    else if (objectFound)
                        return objectFound;
                }
            } catch (e) {}
        }
    }

    function findObjectWithItemValue(objectSearched, valueToFind, profounder, depth, returnedLevel,debug)
    {
        if (depth>profounder)
            return null;
        let keys;
        try { keys=Object.keys(objectSearched); } catch (e) {return null;}
        for (let index=0;index<keys.length;index++)
        {
            try {
                if (valueToFind.constructor && valueToFind.constructor.name==='RegExp')
                {
                    if (profounder===depth && (typeof objectSearched[keys[index]] === "string" || typeof objectSearched[keys[index]] === "number")  && valueToFind.test(objectSearched[keys[index]]))
                        return objectSearched;
                }
                else {

                    if (profounder===depth && objectSearched[keys[index]]===valueToFind)
                        return objectSearched;
                }
                if (typeof objectSearched[keys[index]]==='object' && objectSearched[keys[index]]!==null && objectSearched[keys[index]]!==undefined && profounder>depth)
                {
                    let objectFound=findObjectWithItemValue(objectSearched[keys[index]], valueToFind, profounder, depth+1, returnedLevel, debug);
                    if (objectFound && returnedLevel!==null && returnedLevel!==undefined && depth===returnedLevel)
                        return objectSearched;
                    else if (objectFound)
                        return objectFound;
                }
            } catch (e) {}
        }
    }

    function findLitteralWithItemValue(objectSearched, valueToFind, profounder, depth)
    {
        if (depth>profounder)
            return null;
        let keys=Object.keys(objectSearched);
        for (let index=0;index<keys.length;index++)
        {
            if (valueToFind.constructor && valueToFind.constructor.name==='RegExp')
            {
                if (profounder===depth && (typeof objectSearched[keys[index]] === "string" || typeof objectSearched[keys[index]] === "number")  && valueToFind.test(objectSearched[keys[index]]))
                    return objectSearched[keys[index]];
            } else {
                if (profounder===depth && objectSearched[keys[index]]===valueToFind)
                    return objectSearched[keys[index]];
            }
            if (typeof objectSearched[keys[index]]==='object' && objectSearched[keys[index]]!==null && objectSearched[keys[index]]!==undefined && profounder>depth)
            {
                let objectFound=findLitteralWithItemValue(objectSearched[keys[index]], valueToFind, profounder, depth+1);
                if (objectFound)
                    return objectFound;
            }
        }
        return null;
    }

    function GmailProxy(e) {
        let verifromProxy_rootObjectName=null;
        let verifromProxy_rootSelectionObject=null;
        let verifromProxy_rootPanelObject1=null;
        let verifromProxy_arrayFound=null;
        let checkOnly=(e.type.match(/\_check$/) !== null);
        let currentView;
        let currentViewIsThreadsList;
        let elements={
            msgIds:[],
            folderIds:[],
            msgElements:[],
            auditMessages:false,
            ik:GLOBALS[9]
        };
        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;

        let k=Object.keys(window.js);
        for (let i=0;i<k.length && verifromProxy_rootObjectName===null;i++) {
            try {
                let k2=Object.keys(window.js[k[i]]);
                for (let i2=0;i2<k2.length;i2++)
                {
                    try {
                        if (window.js[k[i]][k2[i2]].toString()==='[object CSSStyleDeclaration]' || window.js[k[i]][k2[i2]].toString()==='[object CSS2Properties]')
                        {
                            verifromProxy_rootObjectName=k[i];
                            break;
                        }
                    } catch(ee) {}
                }
            } catch(e) {}
        }

        currentView=findObjectWithName(window.js[verifromProxy_rootObjectName], "view", 2, 0);
        currentViewIsThreadsList=findObjectWithItemValue(currentView, "tl", 1, 0)!=null;

        let k2=Object.keys(window.js[verifromProxy_rootObjectName]);
        for (let i2=0;i2<k2.length;i2++)
        {
            try {
                if (typeof window.js[verifromProxy_rootObjectName][k2[i2]]==='object' && window.js[verifromProxy_rootObjectName][k2[i2]]!==null && window.js[verifromProxy_rootObjectName][k2[i2]]!==undefined)
                {
                    let k3=Object.keys(window.js[verifromProxy_rootObjectName][k2[i2]]);
                    for (let i3=0;i3<k3.length && verifromProxy_rootSelectionObject==null;i3++)
                    {
                        try {
                            if (window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]].hasOwnProperty(0))
                            {
                                if (window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0].hasOwnProperty('selection'))
                                    verifromProxy_rootSelectionObject=window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0];
                                else {
                                    let k4=Object.keys(window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0]);
                                    for (let i4=0;i4<k4.length;i4++)
                                    {
                                        try {
                                            {
                                                let k5=Object.keys(window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]]);
                                                for (let i5=0;i5<k5.length;i5++)
                                                {
                                                    try {
                                                        if (window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]].toString()==='[object HTMLDivElement]' && window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]]===document.querySelectorAll('.nH.aHU')[0])
                                                        {
                                                            verifromProxy_rootPanelObject1=window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]];
                                                        }
                                                    } catch (e) {}
                                                }
                                                let verifromProxy_arrayFoundSize=9E100;
                                                if (verifromProxy_rootPanelObject1 && verifromProxy_rootPanelObject1===window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]])
                                                {
                                                    k5=Object.keys(window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]]);
                                                    for (let i5=0;i5<k5.length;i5++)
                                                    {
                                                        try {
                                                            if (window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]].constructor.name==='Array' && window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]].length>0)
                                                            {
                                                                let k6=Object.keys(window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]]);
                                                                for (let i6=0;i6<k6.length;i6++) {
                                                                    let k7=Object.keys(window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]][k6[i6]]);
                                                                    for (let i7=0;i7<k7.length;i7++)
                                                                    {
                                                                        if (/@/.test(window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]][k6[i6]][k7[i7]])
                                                                            && window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]].length<verifromProxy_arrayFoundSize)
                                                                        {
                                                                            verifromProxy_arrayFound=window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]];
                                                                            verifromProxy_arrayFoundSize=window.js[verifromProxy_rootObjectName][k2[i2]][k3[i3]][0][k4[i4]][k5[i5]].length;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        } catch (e) {}
                                                    }
                                                }
                                            }
                                        } catch (e) {}
                                    }
                                }
                            }
                        } catch (e) {}
                    }
                }
            } catch (e) {}
        }

        if (verifromProxy_rootObjectName===undefined)
        {
            verifrom.customEvent.dispatchEvent(new verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                detail: elements
            }));
        }
        let selectedMessagesIds=undefined;

        verifromProxy_rootSelectionObject=findObjectWithName(window.js[verifromProxy_rootObjectName],'getSelected',4,0);

        if (verifromProxy_rootSelectionObject && verifromProxy_rootSelectionObject.getSelected)
        {
            let selectionObject=verifromProxy_rootSelectionObject.getSelected();
            Object.keys(selectionObject).forEach(function(key) {if (selectionObject[key].constructor.name==='Array') selectedMessagesIds=selectionObject[key];});
        }

        if (selectedMessagesIds && selectedMessagesIds.length>0) {
            for (let i=0;i<selectedMessagesIds.length;i++)
            {

                elements.msgIds.push(selectedMessagesIds[i]);
                elements.folderIds.push(window.location.hash.split('/')[0].replace('#',''));
                elements.msgElements=undefined;
            }
        } else if (!currentViewIsThreadsList) {
            let messagesInPanel=verifromProxy_arrayFound;

            for (let i=0; i<messagesInPanel.length; i++)
            {
                {
                    try {
                        {
                            elements.folderIds.push(window.location.hash.split('/')[0].replace('#',''));
                            let idArray=findLitteralWithItemValue(messagesInPanel[i], /^.root.conversations./, 1, 0).split('/');
                            elements.msgIds.push(idArray[idArray.length-2]);
                        }
                    } catch (e) {}
                }
            }
        }
        let eventFired=verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    var verifromProxy_rootObjectName=null;
    function hexToDec(s) {
        var i, j, digits = [0], carry;
        for (i = 0; i < s.length; i += 1) {
            carry = parseInt(s.charAt(i), 16);
            for (j = 0; j < digits.length; j += 1) {
                digits[j] = digits[j] * 16 + carry;
                carry = digits[j] / 10 | 0;
                digits[j] %= 10;
            }
            while (carry > 0) {
                digits.push(carry % 10);
                carry = carry / 10 | 0;
            }
        }
        return digits.reverse().join('');
    }
    function GmailV2Proxy(e) {
        let SAPINTOPARAMS=PARAM.SAPINTO || {
            "ik":{"variable":"GLOBALS","index":9},
            "rootfinder":{"obj1":"[object CSSStyleDeclaration]","obj2":"[object CSS2Properties]"},
            "view":{"l":"view","p":2,"d":0},
            "tl":{"l":"tl","p":1,"d":0},
            "sf":{"l":"getSelected","p":4,"d":0},
            "midselector":"span[data-thread-id=\"_MID_\"]",
            "mipselector":"div[data-message-id]",
            "midattr":"data-message-id",
            "replace1":"#",
            "replace2RE":"^\\#",
            "selection":"tr>td>div[aria-checked=true][role=checkbox]",
            "parentrow":2,
            "selectedid":"span[data-thread-id]",
            "threadid":"data-legacy-last-non-draft-message-id",
            "convid":true,
            "prefixmsg": "msg-f:"
        };

        let checkOnly=(e.type.match(/\_check$/) !== null);
        let currentView;
        let currentViewIsThreadsList;
        let elements={
            msgIds:[],
            folderIds:[],
            msgElements:[],
            auditMessages:false,
            ik:window.top[SAPINTOPARAMS.ik.variable][SAPINTOPARAMS.ik.index]
        };
        verifrom.appInfo.extensionCodeName=e.detail.extensionCodeName;

        let selectedMessagesIds = [];
        let selection = document.querySelectorAll(SAPINTOPARAMS.selection);
        if (selection && selection.length>0) {
            for (let m of selection) {
                let p = m;
                for (let i=0;i<SAPINTOPARAMS.parentrow && p;i++)
                    p = p.parentElement;
                if (!p)
                    continue;
                let s = p.querySelector(SAPINTOPARAMS.selectedid);
                if (!s)
                    continue;
                let tid = s.getAttribute(SAPINTOPARAMS.threadid);
                if (SAPINTOPARAMS.convid)
                    tid = hexToDec(tid);
                tid = SAPINTOPARAMS.prefixmsg + tid;
                selectedMessagesIds.push(tid);
            }
        }
        if (selectedMessagesIds && selectedMessagesIds.length>0) {
            for (let i=0;i<selectedMessagesIds.length;i++)
            {
                elements.msgIds.push(selectedMessagesIds[i]);
                elements.folderIds.push(window.location.hash.split('/')[0].replace(SAPINTOPARAMS.replace1,''));
                elements.msgElements=undefined;
            }
        } else {
            let messagesInPanel=document.querySelectorAll(SAPINTOPARAMS.mipselector);
            for (let i=0; i<messagesInPanel.length; i++)
            {
                {
                    try {
                        elements.folderIds.push(window.location.hash.split('/')[0].replace(SAPINTOPARAMS.replace1,''));
                        elements.msgIds.push(messagesInPanel[i].getAttribute(SAPINTOPARAMS.midattr).replace(new RegExp(SAPINTOPARAMS.replace2RE),''));
                    } catch (e) {}
                }
            }
        }
        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
            detail: elements
        }));
    }

    function StopPhishing_fireEvent(node, eventName) {
        let doc;
        if (node.ownerDocument) {
            doc = node.ownerDocument;
        } else if (node.nodeType === 9) {
            doc = node;
        } else {
            throw new Error("Invalid node passed to JSUtil.fireEvent: " + node.id);
        }

        if (node.fireEvent) {
            let event = doc.createEventObject();
            event.synthetic = true; 
            node.fireEvent("on" + eventName, event);
        } else if (node.dispatchEvent) {
            let eventClass = "";

            switch (eventName) {
                case "click":
                case "mousedown":
                case "mouseup":
                    eventClass = "MouseEvents";
                    break;
                case "focus":
                case "change":
                case "blur":
                case "select":
                    eventClass = "HTMLEvents";
                    break;

                default:
                    throw "JSUtil.fireEvent: Couldn't find an event class for event '" + eventName + "'.";
            }
            let event = doc.createEvent(eventClass);
            let bubbles = eventName !== "change";
            event.initEvent(eventName, bubbles, true); 

            event.synthetic = true; 
            node.dispatchEvent(event);
        }
    }

    function ProxySpam(e)
    {
        switch(e.detail.pageDomainName.toLowerCase())
        {
            case 'webmail-rc.free.fr':
                rcmail.move_messages("Junk");
                break;
            case 'ovh.net': {
                let buttonSPAM = document.querySelector('a.markasjunk2');
                if (buttonSPAM)
                    buttonSPAM.click();
            }
                break;
            case 'aol.com': {
                if (ws.WebSuite.ViewWidget.selectedChildWidget.previewPane && ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.spamButton)
                    ws.WebSuite.ViewWidget.selectedChildWidget.previewPane.spamButton.onClick();
                else if (ws.WebSuite.ViewWidget.selectedChildWidget && ws.WebSuite.ViewWidget.selectedChildWidget.spamButton)
                    ws.WebSuite.ViewWidget.selectedChildWidget.spamButton.onClick();
            }
                break;
            case 'betaowa.live.com': {
                try {
                    let attrs={
                        altKey: false,
                        bubbles: true,
                        cancelBubble: false,
                        cancelable: true,
                        charCode: 106,
                        code: "KeyJ",
                        composed: true,
                        ctrlKey: false,
                        defaultPrevented: true,
                        detail: 0,
                        eventPhase: 0,
                        isComposing: false,
                        isTrusted: true,
                        key: "j",
                        keyCode: 106,
                        location: 0,
                        metaKey: false,
                        repeat: false,
                        returnValue: false,
                        shiftKey: false,
                        type: "keypress",
                        view: window,
                        which: 106,
                    };

                    let myEvent = new KeyboardEvent("keypress",attrs);
                    let myTarget = document.querySelector("div[aria-multiselectable=true]");
                    myTarget.dispatchEvent(myEvent);
                } catch (err) {
                    void 0;
                }
            }
                break;
            case 'outlook.live.com': {
                try {
                    $('button>span:contains(' + window._s3.ShellG2SettingStrings.l_junk_Title_Text + ')').parent().click();
                } catch (err) {
                    void 0;
                }
            }
                break;
            case 'live.com': {
                let buttonSPAM = document.getElementById('MarkAsJunk');
                buttonSPAM.click();
            }
                break;
            case 'ymaildorrin.yahoo.com': {
                document.querySelector('button[type="submit"][value="markAsSpam"]').click();
            }
                break;
            case 'ymailnorrin.yahoo.com': {
                document.querySelector('button[data-test-id=toolbar-spam]').click();
            }
                break;
            case 'yahoo.com': {
                let buttonSPAM = document.getElementById('main-btn-spam');
                buttonSPAM.click();
            }
                break;
            case 'zimbra.free.fr': {
                let buttonSPAM = document.getElementById('zb__CLV__SPAM');
                if (!buttonSPAM)
                    buttonSPAM = document.getElementById('zb__TV__SPAM');
                StopPhishing_fireEvent(buttonSPAM, 'mousedown');
                StopPhishing_fireEvent(buttonSPAM, 'mouseup');
            }
                break;
            case 'web-mail.laposte.net': {
                let buttonSPAM = $('a[data-action="markAsSpam"]').get(0);
                StopPhishing_fireEvent(buttonSPAM, 'click');
            }
                break;
            case 'laposte.net': {
                try {
                    _zimbraMail._appViewMgr.getCurrentView()._controller._spamListener(["spam"]);
                } catch (ex) {
                    let controller = _zimbraMail._appViewMgr.getCurrentView()._controller;
                    let selection = controller._listView[controller._currentViewId].getSelection();
                    controller._applyAction(selection, "_doSpam", ["spam"]);
                }
                break;

                let keyboardEvent = document.createEvent("KeyboardEvent");
                let initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

                keyboardEvent[initMethod](
                    "keydown", 
                    true, 
                    true, 
                    window, 
                    false, 
                    false, 
                    false, 
                    false, 
                    109, 
                    0 
                );
                document.dispatchEvent(keyboardEvent);
                keyboardEvent[initMethod](
                    "keydown", 
                    true, 
                    true, 
                    window, 
                    false, 
                    false, 
                    false, 
                    false, 
                    115, 
                    0 
                );
                document.dispatchEvent(keyboardEvent);
            }
                break;
            case 'atelier.pp.messagerie.sfr.fr': {
                let buttonSPAM = $('a[data-action="markAsSpam"]').get(0);
                StopPhishing_fireEvent(buttonSPAM, 'click');
            }
                break;
            case 'sfr.fr': {
                let currentTab = $('.tabpane.tabcurrent')[0];
                let buttonSPAM = currentTab.querySelector('.markSpamButton');
                StopPhishing_fireEvent(buttonSPAM, 'click');
            }
                break;
            case 'orange.fr': {
                if (typeof comboActionJunkRead === 'function')
                    comboActionJunkRead(1);
                else if (typeof comboActionJunk === 'function')
                    comboActionJunk(1);
            }
                break;
            case 'mail.orange.fr': {
                let buttonSPAM = document.querySelector('a[data-ref="io.ox/mail/actions/spam"]');
                if (buttonSPAM) {
                    StopPhishing_fireEvent(buttonSPAM, 'click');
                }
            }
                break;
            case 'messageriepro3.orange.fr': {
                try {
                    let lang = window.dojo.locale;
                    lang = lang || "fr-fr";
                    let junkButtonLabel = window.dojo.i18n.cache["oo/nls/mail/" + lang].spamMails;
                    if (junkButtonLabel) {
                        let menuBars = document.querySelectorAll('ul.oo-menu-bar');
                        for (let i = 0; i < menuBars.length; i++) {
                            if (menuBars[i].clientHeight * menuBars[i].clientWidth > 0) {
                                let buttonSPAM = menuBars[i].querySelector('.spam');
                                if (buttonSPAM && "function" === typeof buttonSPAM.click)
                                    buttonSPAM.click();
                            }
                        }
                    }
                } catch (e) {

                }
            }
                break;
            case 'google.com': {
                let labelsObject = findObjectWithName(window.js, 'SPAM', 2, 0);
                let labelSPAM = labelsObject.SPAM;
                let buttonSPAM = document.querySelectorAll('div[role="button"][title*="spam"], div[role="button"][aria-label="' + labelSPAM + '"], div[role="button"][title="' + labelSPAM + '"]');
                if (buttonSPAM.length > 0) {
                    for (let i = 0; i < buttonSPAM.length; i++) {
                        if (buttonSPAM[i].parentElement.style.display !== 'none') {
                            StopPhishing_fireEvent(buttonSPAM[i], 'mousedown');
                            StopPhishing_fireEvent(buttonSPAM[i], 'mouseup');
                            window.setTimeout(function () {
                                let alertBox = window.top.document.querySelectorAll('[role="alertdialog"]');
                                if (alertBox.length > 0) {
                                    alertBox = alertBox[0];
                                    let alertBoxStyle = alertBox.getAttribute('style');
                                    alertBox.setAttribute('style', alertBoxStyle + 'position:relative;');
                                    window.setTimeout(function () {
                                        alertBox.setAttribute('style', alertBoxStyle + 'position:absolute;');
                                    }, 1000);
                                }
                            }, 500);
                            return;
                        }
                    }
                } else {

                    buttonSPAM = document.querySelectorAll("div[role=button]>div");
                    for (let i = 0; i < buttonSPAM.length; i++) {
                        if (buttonSPAM[i].parentElement.parentElement.style.display !== 'none' && (/spam/i.test(buttonSPAM[i].innerText) || /spam/i.test((buttonSPAM[i].parentElement.dataset && buttonSPAM[i].parentElement.dataset.tooltip) ? buttonSPAM[i].dataset.tooltip : ""))) {
                            StopPhishing_fireEvent(buttonSPAM[i], 'mousedown');
                            StopPhishing_fireEvent(buttonSPAM[i], 'mouseup');
                            window.setTimeout(function () {
                                let alertBox = window.top.document.querySelectorAll('[role="alertdialog"]');
                                if (alertBox.length > 0) {
                                    alertBox = alertBox[0];
                                    let alertBoxStyle = alertBox.getAttribute('style');
                                    alertBox.setAttribute('style', alertBoxStyle + 'position:relative;');
                                    window.setTimeout(function () {
                                        alertBox.setAttribute('style', alertBoxStyle + 'position:absolute;');
                                    }, 1000);
                                }
                            }, 500);
                            return;
                        }
                    }
                }
            }
                break;
            case 'mailv2.google.com': {
                let labelsObject = findObjectWithName(window.js, 'SPAM', 2, 0);
                let labelSPAM = labelsObject.SPAM;
                let selector;
                let markSpamSelectors = {
                    "Signaler comme spam": 'div[role="button"][aria-label="Signaler comme spam"], div[role="button"][title="Signaler comme spam"]', 
                    "Report as spam": 'div[role="button"][aria-label="Report spam"], div[role="button"][title="Report spam"]', 
                    "Melden als spam": 'div[role="button"][aria-label="Spam rapporteren"], div[role="button"][title="Spam rapporteren"]', 
                    "Marcar como spam": 'div[role="button"][aria-label="Marcar como spam"], div[role="button"][title="Marcar como spam"]', 
                    "Segnala come spam": 'div[role="button"][aria-label="Segnala come spam"], div[role="button"][title="Segnala come spam"]', 
                    "Als Spam melden": 'div[role="button"][aria-label="Spam melden"], div[role="button"][title="Spam melden"]' 
                };
                selector = markSpamSelectors[labelSPAM];
                let buttonSPAM;
                if (!selector) {
                    selector = 'div[role="button"][data-tooltip*="Spam"],div[role="button"][data-tooltip*="spam"],div[role="button"][title*="spam"]';
                }
                buttonSPAM = document.querySelectorAll(selector);
                if (buttonSPAM.length > 0) {
                    for (let i = 0; i < buttonSPAM.length; i++) {
                        if (buttonSPAM[i].getClientRects().length > 0) {
                            StopPhishing_fireEvent(buttonSPAM[i], 'mousedown');
                            StopPhishing_fireEvent(buttonSPAM[i], 'mouseup');
                            window.setTimeout(function () {
                                let alertBox = window.top.document.querySelectorAll('[role="alertdialog"]');
                                if (alertBox.length > 0) {
                                    alertBox = alertBox[0];
                                    let alertBoxStyle = alertBox.getAttribute('style');
                                    alertBox.setAttribute('style', alertBoxStyle + 'position:relative;');
                                    window.setTimeout(function () {
                                        alertBox.setAttribute('style', alertBoxStyle + 'position:absolute;');
                                    }, 1000);
                                }
                            }, 500);
                            return;
                        }
                    }
                } else {

                    buttonSPAM = document.querySelectorAll("div[role=button]>div");
                    for (let i = 0; i < buttonSPAM.length; i++) {
                        if (buttonSPAM[i].getClientRects().length > 0 && (/spam/i.test(buttonSPAM[i].innerText) || /spam/i.test((buttonSPAM[i].parentElement.dataset && buttonSPAM[i].parentElement.dataset.tooltip) ? buttonSPAM[i].dataset.tooltip : ""))) {
                            StopPhishing_fireEvent(buttonSPAM[i], 'mousedown');
                            StopPhishing_fireEvent(buttonSPAM[i], 'mouseup');
                            window.setTimeout(function () {
                                let alertBox = window.top.document.querySelectorAll('[role="alertdialog"]');
                                if (alertBox.length > 0) {
                                    alertBox = alertBox[0];
                                    let alertBoxStyle = alertBox.getAttribute('style');
                                    alertBox.setAttribute('style', alertBoxStyle + 'position:relative;');
                                    window.setTimeout(function () {
                                        alertBox.setAttribute('style', alertBoxStyle + 'position:absolute;');
                                    }, 1000);
                                }
                            }, 500);
                            return;
                        }
                    }
                }
            }
                break;
            case 'bluewin.ch': {
                try {
                    let buttonSPAM = document.querySelectorAll('.x-mail-spam-icon')[0];
                    StopPhishing_fireEvent(buttonSPAM, 'click');
                } catch (e) {
                    void 0;
                }
            }
                break;
        }
    }

    function ProxyMarkRead(e)
    {
        switch(e.detail.pageDomainName.toLowerCase())
        {
            case 'webmail-rc.free.fr':
                break;
            case 'ovh.net':
                break;
            case 'aol.com':
                break;
            case 'outlook.live.com':
                break;
            case 'live.com':
                break;
            case 'ymailnorrin.yahoo.com':
                break;
            case 'yahoo.com':
                break;
            case 'zimbra.free.fr':
                break;
            case 'web-mail.laposte.net': {
                let buttonSPAM = $('a[data-action="markAsRead"]').get(0);
                StopPhishing_fireEvent(buttonSPAM, 'click');
            }
                break;
            case 'laposte.net':
                break;
            case 'atelier.pp.messagerie.sfr.fr':
                let buttonSPAM = $('a[data-action="markAsRead"]').get(0);
                StopPhishing_fireEvent(buttonSPAM, 'click');
                break;
            case 'sfr.fr':
                break;
            case 'orange.fr':
                break;
            case 'mail.orange.fr': {
                let buttonMarkRead = document.querySelector('a[data-ref="io.ox/mail/actions/markread"]');
                if (buttonMarkRead) {
                    StopPhishing_fireEvent(buttonMarkRead, "click");
                }
            }
                break;
            case 'messageriepro3.orange.fr': {
                try {
                    window.dijit.registry._hash.oo_mail_panels_List_0.markAsRead();
                } catch (e) {
                }
            }
                break;
            case 'google.com': {
                let labelsObject = findObjectWithName(window.js, 'SPAM', 2, 0);
                let labelMarkRead = labelsObject.MARK_AS_READ;
                let buttonSPAM = document.querySelectorAll('div[role="button"][aria-label="' + labelMarkRead + '"], div[role="button"][title="' + labelMarkRead + '"]');
                if (buttonSPAM.length > 0) {
                    for (let i = 0; i < buttonSPAM.length; i++) {
                        if (buttonSPAM[i].parentElement.style.display !== 'none') {
                            StopPhishing_fireEvent(buttonSPAM[i], 'mousedown');
                            StopPhishing_fireEvent(buttonSPAM[i], 'mouseup');
                            return;
                        }
                    }
                } else {
                    buttonSPAM = document.querySelectorAll("div[role=button]>div");
                    for (let i = 0; i < buttonSPAM.length; i++) {
                        if (buttonSPAM[i].parentElement.parentElement.style.display !== 'none' && buttonSPAM[i].innerText === labelMarkRead) {
                            StopPhishing_fireEvent(buttonSPAM[i], 'mousedown');
                            StopPhishing_fireEvent(buttonSPAM[i], 'mouseup');
                            return;
                        }
                    }
                }
            }
                break;
            case 'mailv2.google.com': {
                let markReadSelectors = {
                    "Marquer comme lu": 'div[role="button"][data-tooltip="Marquer comme lu"], div[role="button"][title="Marquer comme lu"]', 
                    "Mark as read": 'div[role="button"][data-tooltip="Mark as read"], div[role="button"][title="Mark as read"]', 
                    "Markeren als gelezen": 'div[role="button"][data-tooltip="Markeren als gelezen"], div[role="button"][title="Markeren als gelezen"]', 
                    "Marcar como leído": 'div[role="button"][data-tooltip="Marcar como leído"], div[role="button"][title="Marcar como leído"]',
                    "Segna come già letto": 'div[role="button"][data-tooltip="Contrassegna un messaggio come da leggere"], div[role="button"][title="Contrassegna un messaggio come da leggere"]',
                    "Als gelesen markieren": 'div[role="button"][data-tooltip="Als gelesen markieren"], div[role="button"][title="Als gelesen markieren"]'
                };
                let unselectSelectors = {
                    "Sélectionner la conversation": 'div[role="button"][data-tooltip="Sélectionner"]>div>span, div[role="button"][title="Sélectionner"]>div>span', 
                    "Select conversation": 'div[role="button"][data-tooltip="Select"]>div>span, div[role="button"][title="Select"]>div>span', 
                    "Conversatie selecteren": 'div[role="button"][data-tooltip="Selecteren"]>div>span, div[role="button"][title="Selecteren"]>div>span', 
                    "Seleccionar conversación": 'div[role="button"][data-tooltip="Seleccionar"]>div>span, div[role="button"][title="Seleccionar"]>div>span',
                    "Seleziona conversazione": 'div[role="button"][data-tooltip="Seleziona"]>div>span, div[role="button"][title="Seleziona"]>div>span',
                    "Konversation auswählen": 'div[role="button"][data-tooltip="Auswählen"]>div>span, div[role="button"][title="Auswählen"]>div>span' 
                };
                let labelsObject = findObjectWithName(window.js, 'SPAM', 2, 0); 
                let buttonLabel = labelsObject.MARK_AS_READ;
                let selector;
                selector = markReadSelectors[buttonLabel];
                let button;
                if (!selector) {
                    markReadSelectors = 'div[role="button"][aria-label="' + buttonLabel + '"], div[role="button"][title="' + buttonLabel + '"]';
                    button = document.querySelectorAll(selector);
                    if (button.length < 1)
                        return;
                } else button = document.querySelectorAll(selector);

                if (button.length > 0) {
                    for (let i = 0; i < button.length; i++) {
                        if (button[i].getClientRects().length > 0) {
                            StopPhishing_fireEvent(button[i], 'mousedown');
                            StopPhishing_fireEvent(button[i], 'mouseup');
                            break;
                        }
                    }
                } else {
                    button = document.querySelectorAll("div[role=button]>div");
                    for (let i = 0; i < button.length; i++) {
                        if (button[i].getClientRects().length > 0 && button[i].innerText === buttonLabel) {
                            StopPhishing_fireEvent(button[i], 'mousedown');
                            StopPhishing_fireEvent(button[i], 'mouseup');
                            break;
                        }
                    }
                }
            }
                break;
            case 'bluewin.ch':
                break;
        }
    }

    function ProxyDelete(e)
    {
        switch(e.detail.pageDomainName.toLowerCase())
        {
            case 'webmail-rc.free.fr':
                break;
            case 'ovh.net':
                break;
            case 'aol.com':
                break;
            case 'outlook.live.com':
                break;
            case 'live.com':
                break;
            case 'ymailnorrin.yahoo.com':
                break;
            case 'yahoo.com':
                break;
            case 'zimbra.free.fr':
                break;
            case 'laposte.net':
                break;
            case 'atelier.pp.messagerie.sfr.fr':
                break;
            case 'sfr.fr':
                break;
            case 'orange.fr':
                break;
            case 'mail.orange.fr': {
                let buttonDelete = document.querySelector('a[data-ref="io.ox/mail/actions/delete"]');
                if (buttonDelete) {
                    StopPhishing_fireEvent(buttonDelete, "click");
                }
            }
                break;
            case 'messageriepro3.orange.fr': {
            }
                break;
            case 'google.com':
                break;
            case 'mailv2.google.com': {
                let button = document.querySelectorAll('div[role=button][act="17"]');
                for (let i = 0; i < button.length; i++) {
                    try {
                        if (button[i].getClientRects().length > 0 && /^(Supprimer)|(Delete)/i.test(button[i].textContent) === true) {
                            StopPhishing_fireEvent(button[i], 'mousedown');
                            StopPhishing_fireEvent(button[i], 'mouseup');
                            break;
                        }
                    } catch (e) {
                    }
                }
            }
                break;
            case 'bluewin.ch':
                break;
        }
    }

    function ProxyParam(e) {
        PARAM=e.detail.PARAM;
    }

    var _VF_proxiesList = {
        "AOLProxyRequest": AOLProxy,
        "ZimbraProxyRequest": ZimbraProxy,
        "YMailDorrinProxyRequest": YMailDorrinProxy,
        "YAHOOProxyRequest": YahooProxy,
        "YMailNorrinProxyRequest": YMailNorrinProxy,
        "LiveProxyRequest": LiveProxy,
        "BETAOWAProxyRequest": OWAProxy2018,
        "OWAProxyRequest": OWAProxy,
        "SFRProxyRequest": SFRProxy,
        "LAPOSTEV2ProxyRequest": PosteV2Proxy,
        "AtelierSFRProxyRequest": AtelierSFRProxy,
        "GmailV2ProxyRequest": GmailV2Proxy,
        "GmailProxyRequest": GmailProxy,
        "RoundCubeProxyRequest": RoundCubeProxy,
        "BluewinProxyRequest": BluewinProxy,
        "OrangeProxyRequest": OrangeProxy,
        "OrangeOXProxyRequest":OrangeOXProxy,
        "LAPOSTEV2ProxyRequest_check": PosteV2Proxy,
        "OrangeOXProxyRequest_check":OrangeOXProxy,
        "OrangeProProxyRequest": OrangeProProxy,
        "OrangeProProxyRequest_check": OrangeProProxy,
        "AOLProxyRequest_check": AOLProxy,
        "ZimbraProxyRequest_check": ZimbraProxy,
        "YAHOOProxyRequest_check": YahooProxy,
        "YMailDorrinProxyRequest_check": YMailDorrinProxy,
        "YMailNorrinProxyRequest_check": YMailNorrinProxy,
        "LiveProxyRequest_check": LiveProxy,
        "BETAOWAProxyRequest_check": OWAProxy2018,
        "OWAProxyRequest_check": OWAProxy,
        "SFRProxyRequest_check": SFRProxy,
        "AtelierSFRProxyRequest_check": AtelierSFRProxy,
        "GmailV2ProxyRequest_check": GmailV2Proxy,
        "GmailProxyRequest_check": GmailProxy,
        "RoundCubeProxyRequest_check": RoundCubeProxy,
        "BluewinProxyRequest_check": BluewinProxy,
        "SpamProxyRequest":ProxySpam,
        "MarkReadProxyRequest":ProxyMarkRead,
        "DeleteProxyRequest":ProxyDelete,
        "SetProxyParam":ProxyParam
    };

    function verifromMessage(event) {
        if (!event || !event.data || !event.data.name || !event.data.verifrom)
            return;
        if (event.stopImmediatePropagation)
            event.stopImmediatePropagation();
        if (event.stopPropagation)
            event.stopPropagation();
        if (event.preventDefault)
            event.preventDefault();
        if ("function" === typeof _VF_proxiesList[event.data.name]) {
            try {
                _VF_proxiesList[event.data.name](event.data);
            } catch(e) {
                let checkOnly=false;
                if (event && event.data && event.data.type && 'function'===typeof event.data.type.match)
                    event.data.type.match(/\_check$/) !== null;
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('Proxy'+(checkOnly ? '_check' : ''),{
                    detail: {
                        'exception': true, 'exceptionDetails': {
                            message: e.message,
                            stack: e.stack,
                            name: e.name,
                            lineNumber: e.lineNumber,
                            filename: e.fileName
                        }
                    }
                }));
            }
        }
    }

    window.addEventListener("message",verifromMessage,true);
    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('VFProxy_Ready', { 
        detail: null 
    })); 

    window.top.document.verifromTest = function() { 
        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('VFRUNTEST', { 
            detail: null 
        })); 
    } 

})();
