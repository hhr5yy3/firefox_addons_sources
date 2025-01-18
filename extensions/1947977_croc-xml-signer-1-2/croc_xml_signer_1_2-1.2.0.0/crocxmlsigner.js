// API to Croc.ExmlSigner.Ext
// Run in context of a web page and sends messages to the extenstion's content page

var theScript=document.getElementById("crocxmlsigner");

var pendingRequests= [];

/*
store reply callback in an available element of pendingRequests, add new element if none avl
return request id which is the index in the pendingRequests array
replyCallback must have 3 arguments:
    success - true of false,
    content - results of message execution, "undefined" on failure
    errorMessage - error message, "undefined" on success

*/
function newRequest(replyCallback)
{
    var i;
    var len = pendingRequests.length;
    for (i = 0; i < len; ++i) {
        if(pendingRequests[i]==null)
        {
            pendingRequests[i] = replyCallback;
            return i;
        }
    }
    pendingRequests.push(replyCallback);
    return len;
}

// return reply callback previously stored by newRequest
// rqId - value previously returned from newRequest
// return null if no such request pending
function completeRequest(rqId)
{
    if(rqId>=pendingRequests.length)
        return null;
    var callback = pendingRequests[rqId];
    pendingRequests[rqId] = null;
    return callback;
}

/// pass request to content page of the extension
function CROCXmlSignerInternalFire(msg, replyCallback)
{

    var rqId = newRequest( replyCallback);
    
    var event = new CustomEvent('CROCXmlSignInternal',
                {
                    detail: {
                        id : rqId,
                        content: msg
                    }
                });
    console.log("CROCSign=" + JSON.stringify(event));

    theScript.dispatchEvent(event);

}


theScript.addEventListener("CROCXmlSignInternalReply", function (event) {

    console.log("CROCSignTestReply=" + event);
    eventDetail = JSON.parse(event.detail);
    var rqId = eventDetail.id;

    var callback = completeRequest(rqId);
    if (callback == null)
    {
        console.log("Discard reply of undefined request id=" + rqId);
        return;
    }

    console.log("event.detail.errorMessage " + eventDetail.errorMessage);

    callback(eventDetail.success, eventDetail.content, eventDetail.errorMessage);
    
});


// подписать файл (сертификат выбирается внутри функции или передается из вне в опциональном параметре)
// Параметры:
//   signData - объект со следующими полями (поля optional могут быть undefined)
//      xmls - массив xml файлов для подписи в кодировке utf-8
//      [optional] storeName – имя хранилища (“My”)
//      [optional] thumbprint - отпечаток сертификата
//      [optional] password – пароль сертификата (первичного ключа)
//      [optional] returnSignatureOnly - флаг возврата только узла подписи или xml целиком
//  callback - функция, вызываемая по завершении операции, см. комментарии к newRequest
//      через параметр content в случае успеха возвращается массив подписанных xml файлов 
//      в том же порядке, как во входном массиве xmls
function CROCXmlSignerSign(signData, callback)
{
    var msg = { actionCode: "sign", xmls: signData.xmls, storeName: signData.storeName, 
        thumbprint: signData.thumbprint, password: signData.password, returnSignatureOnly: signData.returnSignatureOnly };
    CROCXmlSignerInternalFire(msg, callback);
}


// проверить подпись
// Параметры:
//      verifyData - объект со следующими полями (поля optional могут быть undefined)
//          xml - строка xml файла в utf-8
//          [optional] certificateBody - опциональный; тело сертификата в кодировке base64
//  callback - функция, вызываемая по завершении операции, см. комментарии к newRequest;
//      в случае успешной проверки параметр success=true, параметр content не используется (undefined)
function CROCXmlSignerVerify(verifyData, callback)
{
    var msg={actionCode : "verify", xml : verifyData.xml, certificateBody : verifyData.certificateBody};
    CROCXmlSignerInternalFire(msg, callback);
}

// запросить выбор сертификат у пользователя
// Праметры:
//      store - наименование хранилища, из которого выбираем; если не передано, то поиск выполняется 
// в хранилище пользователя ("My")
//  callback - функция, вызываемая по завершении операции, см. комментарии к newRequest
//      через параметр content в случае успеха возвращается следующая структура:
//          thumbprint - thumbprint сертификата
//          owner - имя владельца сертификата
function CROCXmlSignerPromptCertificate(store, callback)
{
    var msg={actionCode : "promptCertificate", storeName : store.storeName};
    CROCXmlSignerInternalFire(msg, callback);
}

// запросить версию плагина
// Праметры:
//  callback - функция, вызываемая по завершении операции, см. комментарии к newRequest
//      через параметр content в случае успеха возвращается следующая структура:
//          major - старшая версия
//          minor - младшая версия
function CROCXmlSignerGetVersion(callback)
{
    var msg={actionCode : "getVersion"};
    CROCXmlSignerInternalFire(msg, callback);
}

