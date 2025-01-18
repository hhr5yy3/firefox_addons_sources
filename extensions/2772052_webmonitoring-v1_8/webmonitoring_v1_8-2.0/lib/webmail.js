import * as constants from "./constants.js"
import * as commons from "./commons.js"
import * as gmail from "./gmail.js"
import * as outlook from "./outlook.js"
import * as outlook_contentscript from "./outlook_content_scripts.js"
import Mail from "./mail.js"

/**
 * 指定された URL が Gmail / Gmail for work からのものかどうか判定します。
 * @param {String} url
 * @return URL が Gmail / Gmail for work からのものであれば true、そうでない場合は false
 */
export function isGmail(url)
{
    if (commons.isUndefinedOrNull(url)) {
        return false;
    }

    if (url.startsWith(constants.HTTPS_MAIL_GOOGLE_COM_SYNC)) {
        return true;
    }

    return false;
}

/**
 * 指定された URL が 'Outlook.com' / 'Outlook for Microsoft 365' かどうか判定します。
 * @param {String} url 判定する URL
 * @return  URL が 'Outlook.com' / 'Outlook for Microsoft 365' であれば true、そうでない場合は false
 */
export function isOutlook(url)
{
    if (!commons.isUndefinedOrNull(url)) {
        for (var i = 0; i < constants.OUTLOOK_URLS.length; i++) {
            if (url.startsWith(constants.OUTLOOK_URLS[i])) {
                return true;
            }
        }
//#10829 20230105 ADD S
        // Outlook.com の場合にのみ発生!!
        // [添付] > [OneDrive] > [添付]
        // [添付] > [アップロードして共有]
        if (url.startsWith("https://api.onedrive.com/") && url.includes("/action.createLink")) {
            return true;
        }
//#10829 20230105 ADD E
//#10837 20230110 ADD S
        //https://nleditor.osi.office.net/NLEditor/api/V1/BrowserExtension
        if (url.startsWith("https://nleditor.osi.office.net/NLEditor/api/") && url.includes("BrowserExtension")) {
            return true;
        }
//#10837 20230110 ADD E
    }
    return false;
}

/**
 * ＷＥＢメール送信ログ（Gmail）を取得します。
 * @param {Object} details onBeforeRequest 関数の引数
 * @return {Object} Mail オブジェクト、または null
 */
export function sendWebMail_Gmail(details)
{
    const swdtk  = chrome.windows.swdtk;
    const logger = swdtk.logger;

    if (!commons.hasOwnProperty(details, constants.REQUEST_BODY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.REQUEST_BODY}'が存在しません）`);
        return null;
    }

    var requestBody = details.requestBody;

    var json = commons.convertRequestBodyRawToJson(requestBody);
    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: 'raw'データからJSON形式へのデータ変換に失敗しました）`);
        return null;
    }

    var mailjson = gmail.getGmailTransmissionData(json);
    if (commons.isUndefinedOrNull(mailjson)) {
        return null;
    }

    var mail = gmail.parseGmail(mailjson);

    return mail;
}

/**
 * ＷＥＢメール送信ログ（'Outlook.com' / 'Outlook for Microsoft 365'）を取得します。
 * @param {Object} beforeRequest onBeforeRequest 関数の引数
 * @param {Object} beforeSendHeaders onBeforeSendHeaders 関数の引数
 * @param {String} hostname ホスト名
 * @return {Objectt} Mail オブジェクト、または null
 */
export function sendWebMail_Outlook(beforeRequest, beforeSendHeaders, hostname)
{
    const swdtk  = chrome.windows.swdtk;
    const logger = chrome.windows.swdtk.logger;

//#10837 20230206 CHG S
    var Action = outlook.getOnBeforeSendHeadersAction(beforeSendHeaders);
    switch (Action) {
//  switch (outlook.getOnBeforeSendHeadersAction(beforeSendHeaders)) {
//#10837 20230206 CHG E
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // ログオンアカウント取得処理（Outlook.com）
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_OUTLOOK_OFFICECOM_LOGIN:
            {
                if (!commons.hasOwnProperty(beforeSendHeaders, constants.REQUEST_HEADERS)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${constants.REQUEST_HEADERS}' が存在しません）`);
                    return null;
                }

                var requestHeaders = beforeSendHeaders.requestHeaders;

                if (!outlook.hasXanchormailbox(requestHeaders)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${constants.X_ANCHORMAILBOX}' が存在しません）`);
                    return null;
                }

                var x_anchormailbox = outlook.getXanchormailbox(requestHeaders);
                var logonUserName   = x_anchormailbox.substring(x_anchormailbox.indexOf("SMTP:") + "SMTP:".length);

                logger.debug(`ログオンユーザー名（Outlook.com）: ${logonUserName}`);
//DEBUG-S
//              console.debug(`ログオンユーザー名（Outlook.com）: ${logonUserName}`);
//DEBUG-E

                var tabId = swdtk.ActiveMailTabId;
                if (swdtk.WebMailLogonManager.has(tabId)) {
                    swdtk.WebMailLogonManager[tabId] = logonUserName;
                } else {
                    swdtk.WebMailLogonManager.set(tabId, logonUserName);
                }

                return null;
            }
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // ログオンアカウント取得処理（Outlook for Microsoft 365）
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_GET_MAILBOX_IDENTITY:
            {
                if (!commons.hasOwnProperty(beforeSendHeaders, constants.REQUEST_HEADERS)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${constants.REQUEST_HEADERS}' が存在しません）`);
                    return null;
                }

                var requestHeaders = beforeSendHeaders.requestHeaders;

                if (!outlook.hastUrlPostData(requestHeaders)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${X_OWN_URL_POST_DATA_1}' または '${X_OWN_URL_POST_DATA_2}' が存在しません）`);
                    return null;
                }

                // 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' の値を JSON 形式の文字列に変換
                var json = commons.stringToJson(outlook.getUrlPostData(requestHeaders));

                var logonUserName = outlook.parseGetMailboxByIdentity(json);
                if (commons.isUndefinedOrNull(logonUserName)) {
                    logger.error("内部エラーが発生しました。（詳細: JSON形式データの解析に失敗しました）");
                    return null;
                }

                logger.debug(`ログオンユーザー名（Outlook for Microsoft 365）: ${logonUserName}`);
//DEBUG-S
//              console.debug(`ログオンユーザー名（Outlook for Microsoft 365）: ${logonUserName}`);
//DEBUG-E

                var tabId = swdtk.ActiveMailTabId;
                if (swdtk.WebMailLogonManager.has(tabId)) {
                    swdtk.WebMailLogonManager[tabId] = logonUserName;
                } else {
                    swdtk.WebMailLogonManager.set(tabId, logonUserName);
                }

                return null;
            }
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール作成処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_CREATE_ITEM:
            {
                if (!commons.hasOwnProperty(beforeRequest, constants.REQUEST_BODY)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${constants.REQUEST_BODY}' が存在しません）`);
                    return null;
                }

                var requestBody = beforeRequest.requestBody;

                var json = commons.convertRequestBodyRawToJson(requestBody);
                if (commons.isUndefinedOrNull(json)) {
                    logger.error(`内部エラーが発生しました。（詳細: 'raw' データからJSON形式へのデータ変換に失敗しました）`);
                    return null;
                }

                var mail = outlook.parseCreateItemJsonRequest(json);
                if (commons.isUndefinedOrNull(mail)) {
                    logger.error(`内部エラーが発生しました。（詳細: JSON形式データの解析に失敗しました）`);
                    return null;
                }

//#10837 20230214 CHG S
                var tabId = swdtk.ActiveMailTabId;
                var sender = mail.getSender();
                if (commons.isUndefinedOrNull(sender) || (sender == "")) {
//DEBUG-S
//                  console.debug(`>>> CreateItemに送信者情報なし`);
//DEBUG-E
//                  mail.setSender(swdtk.WebMailLogonManager.get(swdtk.ActiveMailTabId));
                    mail.setSender(swdtk.WebMailLogonManager.get(tabId));
                } else {
//DEBUG-S
//                  console.debug(`>>> CreateItemに送信者情報あり`);
//DEBUG-E
                    swdtk.WebMailLogonManager.set(tabId, sender);
                }
                mail.setHostName(hostname);
                mail.setTimeStamp(beforeSendHeaders.timeStamp);
//DEBUG-S
//              console.debug(`>>> LogonManager`);
//              console.debug(swdtk.WebMailLogonManager);
//DEBUG-E
//#10837 20230214 CHG E

//#10837 20230206 ADD S
                swdtk.LastEmailAction = Action;
//#10837 20230206 ADD E

//#10829 20230105 ADD S
                // [転送]、[返信]、[全員へ返信]の場合
                var Operation = mail.getOperation();
                if (((Operation == constants.OPERATION_FORWARD) ||
                     (Operation == constants.OPERATION_REPLY)   ||
                     (Operation == constants.OPERATION_REPLY_ALL))
                     && (mail.getMessageDisposition() == constants.MESSAGE_DISPOSITION_SAVE_ONLY)) {
//#10837 20230110 ADD S
                    outlook.getMailContent(
                        "__DTK_GetAttachmentRequest",
                        constants.ACTION_CREATE_ITEM,
                        beforeSendHeaders.requestId,
                        swdtk.ActiveMailWinId,
                        swdtk.ActiveMailTabId,
                        mail.getId(),
                        mail.getOperation(),
                        300
                    );
                }
//#10837 20230110 ADD E
//#10829 20230105 ADD E

                return mail;
            }
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール更新処理 (一時保存メール、添付ファイルありの場合)
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_UPDATE_ITEM:
            {
                if (!commons.hasOwnProperty(beforeRequest, constants.REQUEST_BODY)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${constants.REQUEST_BODY}' が存在しません）`);
                    return null;
                }

                var requestBody = beforeRequest.requestBody;

                var json = commons.convertRequestBodyRawToJson(requestBody);
                if (commons.isUndefinedOrNull(json)) {
                    logger.error("内部エラーが発生しました。（詳細: 'raw' データからJSON形式へのデータ変換に失敗しました）");
                    return null;
                }

                var mail = outlook.parseUpdateItemJsonRequest(json);
                if (commons.isUndefinedOrNull(mail)) {
                    logger.error("内部エラーが発生しました。（詳細: JSON形式データの解析に失敗しました）");
                    return null;
                }

//#10837 20230214 CHG S
                var sender = mail.getSender();
                if (commons.isUndefinedOrNull(sender) || (sender == "")) {
//DEBUG-S
//                  console.debug(`>>> UpdateItemに送信者情報なし`);
//DEBUG-E
                    mail.setSender(swdtk.WebMailLogonManager.get(swdtk.ActiveMailTabId));
                } else {
//DEBUG-S
//                  console.debug(`>>> UpdateItemに送信者情報あり`);
//DEBUG-E
                }

//DEBUG-S
//              console.debug(`>>> LogonManager`);
//              console.debug(swdtk.WebMailLogonManager);
//DEBUG-E
//#10837 20230214 CHG E

                mail.setHostName(hostname);
                mail.setTimeStamp(beforeSendHeaders.timeStamp);
//#10837 20230206 ADD S
                swdtk.LastEmailAction = Action;
//#10837 20230206 ADD E

//#10829 20230105 ADD S
                // 自動保存の場合
                if (mail.getMessageDisposition() == constants.MESSAGE_DISPOSITION_SAVE_ONLY) {
//#10837 20230110 ADD S
                    outlook.getMailContent(
                        "__DTK_GetAttachmentRequest",
                        constants.ACTION_UPDATE_ITEM,
                        beforeRequest.requestId,
                        swdtk.ActiveMailWinId,
                        swdtk.ActiveMailTabId,
                        mail.getId(),
                        mail.getOperation(),
                        300
                    );
//#10837 20230110 ADD E
                }
//#10829 20230105 ADD E

                return mail;
            }
//#10837 20230110 ADD S
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール破棄処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_DELETE_ITEM:
            {
                if (!commons.hasOwnProperty(beforeSendHeaders, constants.REQUEST_HEADERS)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${constants.REQUEST_HEADERS}' が存在しません）`);
                    return null;
                }

                var requestHeaders = beforeSendHeaders.requestHeaders;
                if (!outlook.hastUrlPostData(requestHeaders)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${X_OWN_URL_POST_DATA_1}' または '${X_OWN_URL_POST_DATA_2}' が存在しません）`);
                    return null;
                }
                // 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' の値を JSON 形式の文字列に変換
                var json = commons.stringToJson(outlook.getUrlPostData(requestHeaders));

                var MailId = outlook.parseDeleteItemJsonRequest(json);
                if (MailId == null) {
                    logger.error(`内部エラーが発生しました。（詳細: メールIDの取得に失敗しました）`);
                    return null;
                }

                if (swdtk.EmailManager.has(MailId)) {
                    swdtk.EmailManager.delete(MailId);
                }

                swdtk.CurrentEmail = null;

//#10837 20230206 ADD S
                swdtk.LastEmailAction = Action;

                MailId = 'null';
                outlook.getMailContent(
                    "__DTK_GetAttachmentRequest",
                    Action,
                    beforeRequest.requestId,
                    swdtk.ActiveMailWinId,
                    swdtk.ActiveMailTabId,
                    MailId,
                    "",
                    300
                );
//#10837 20230206 ADD E

                return null;
            }
//#10837 20230110 ADD E
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール取得処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_GET_ITEM:
            {
                if (!commons.hasOwnProperty(beforeSendHeaders, constants.REQUEST_HEADERS)) {
                    // 'requestHeaders'プロパティが存在しない場合、スキップする
                    return null;
                }

                var requestHeaders = beforeSendHeaders.requestHeaders;
                if (!outlook.hastUrlPostData(requestHeaders)) {
                    // 'X-OWA-UrlPostData'または'x-owa-urlpostdata'プロパティが存在しない場合、
                    // 下書きフォルダのメールでないと判断し、スキップする
                    return null;
                }

                // 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' の値を JSON 形式の文字列に変換
                var json = commons.stringToJson(outlook.getUrlPostData(requestHeaders));
                if (commons.isUndefinedOrNull(json)) {
                    logger.error("内部エラーが発生しました。（詳細: JSON形式へのデータ変換に失敗しました）");
                    return null;
                }

                var mail = outlook.parseGetItemJsonRequest(json);
                if (commons.isUndefinedOrNull(mail)) {
                    logger.error("内部エラーが発生しました。（詳細: JSON形式データの解析に失敗しました）");
                    return null;
                }

                var MailId = mail.getId();
                if (MailId == null) {
                    return;
                }

//#10837 20230206 ADD S
                swdtk.LastEmailAction = Action;

                outlook.getMailContent(
                    "__DTK_GetAttachmentRequest",
                    Action,
                    beforeRequest.requestId,
                    swdtk.ActiveMailWinId,
                    swdtk.ActiveMailTabId,
                    MailId,
                    "",
                    300
                );
//#10837 20230110 ADD E

                return null;
            }
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // ファイル添付処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_CREATE_ATTACHMENT_FROM_LOCAL_FILE:
            {
                if (!commons.hasOwnProperty(beforeSendHeaders, constants.REQUEST_HEADERS)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${constants.REQUEST_HEADERS}' が存在しません）`);
                    return null;
                }

                var requestHeaders = beforeSendHeaders.requestHeaders;

                var json = null;

                if (outlook.hastUrlPostData(requestHeaders)) {
                    // 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' の値を JSON 形式の文字列に変換
                    json = commons.stringToJson(outlook.getUrlPostData(requestHeaders));
                } else {
                    if (!commons.hasOwnProperty(beforeRequest, constants.REQUEST_BODY)) {
                        logger.error(`内部エラーが発生しました。（詳細: '${constants.REQUEST_BODY}' が存在しません）`);
                        return null;
                    }
                    var requestBody = beforeRequest.requestBody;
                    json = commons.convertRequestBodyRawToJson(requestBody);
                    if (commons.isUndefinedOrNull(json)) {
                        logger.error(`内部エラーが発生しました。（詳細: 'raw' データからJSON形式へのデータ変換に失敗しました）`);
                        return null;
                    }
                }

                var result = outlook.parseCreateAttachmentFromLocalFile(json);
                if (commons.isUndefinedOrNull(result)) {
                    logger.error(`内部エラーが発生しました。（詳細: 添付ファイル情報の取得に失敗しました）`);
                    return null;
                }

                var MailId = result.MailId;
                if (MailId == null) {
                    return;
                }

//#10837 20230206 ADD S
                swdtk.LastEmailAction = Action;

                outlook.getMailContent(
                    "__DTK_GetAttachmentRequest",
                    Action,
                    beforeRequest.requestId,
                    swdtk.ActiveMailWinId,
                    swdtk.ActiveMailTabId,
                    MailId,
                    "",
                    300
                );
//#10837 20230206 ADD E

                return null;
            }
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // ファイル添付処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_CREATE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER:
            {
                if (!commons.hasOwnProperty(beforeSendHeaders, constants.REQUEST_HEADERS)) {
                    logger.error(`内部エラーが発生しました。（詳細: ${constants.REQUEST_HEADERS} が存在しません）`);
                    return null;
                }

                var requestHeaders = beforeSendHeaders.requestHeaders;
                if (!outlook.hastUrlPostData(requestHeaders)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${X_OWN_URL_POST_DATA_1}' または '${X_OWN_URL_POST_DATA_2}' が存在しません）`);
                    return null;
                }
                // 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' の値を JSON 形式の文字列に変換
                var json = commons.stringToJson(outlook.getUrlPostData(requestHeaders));

                var result = outlook.parseCreateAttachmentFromAttachmentDataProvider(json);
                if (commons.isUndefinedOrNull(result)) {
                    logger.error(`内部エラーが発生しました。（詳細: 添付ファイル情報の取得に失敗しました）`);
                    return null;
                }

                var MailId = result.MailId;
                if (MailId == null) {
                    return;
                }

//#10837 20230206 ADD S
                swdtk.LastEmailAction = Action;

                outlook.getMailContent(
                    "__DTK_GetAttachmentRequest",
                    Action,
                    beforeRequest.requestId,
                    swdtk.ActiveMailWinId,
                    swdtk.ActiveMailTabId,
                    MailId,
                    "",
                    300
                );
//#10837 20230206 ADD E

                return null;
            }
//#10837 20230206 ADD S
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // ファイル添付削除
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        case constants.ACTION_DELETE_ATTACHMENT:
            {
                if (!commons.hasOwnProperty(beforeSendHeaders, constants.REQUEST_HEADERS)) {
                    logger.error(`内部エラーが発生しました。（詳細: ${constants.REQUEST_HEADERS} が存在しません）`);
                    return null;
                }

                var requestHeaders = beforeSendHeaders.requestHeaders;
                if (!outlook.hastUrlPostData(requestHeaders)) {
                    logger.error(`内部エラーが発生しました。（詳細: '${X_OWN_URL_POST_DATA_1}' または '${X_OWN_URL_POST_DATA_2}' が存在しません）`);
                    return null;
                }
                // 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' の値を JSON 形式の文字列に変換
                var json = commons.stringToJson(outlook.getUrlPostData(requestHeaders));

                var result = outlook.parseDeleteAttachment(json);
                if (commons.isUndefinedOrNull(result)) {
                    logger.error(`内部エラーが発生しました。（詳細: 添付ファイル削除の取得に失敗しました）`);
                    return null;
                }

                var MailId = result;
                if (MailId == null) {
                    return;
                }

                swdtk.LastEmailAction = Action;

                outlook.getMailContent(
                    "__DTK_GetAttachmentRequest",
                    Action,
                    beforeRequest.requestId,
                    swdtk.ActiveMailWinId,
                    swdtk.ActiveMailTabId,
                    MailId,
                    "",
                    300
                );

                return null;
            }
//#10837 20230206 ADD E
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // 上記以外
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        default:
            {
                return null;
            }
    }
}
