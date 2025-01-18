import * as constants from "./constants.js"
import * as commons from "./commons.js"
import * as outlook_contentscript from "./outlook_content_scripts.js"
import Mail from "./mail.js"
import { sendWebMail_Outlook } from "./webmail.js";

/**
 * 指定されたURLが'Outlook for Microsoft 365'かどうか判定します。
 * 
 * @param {String} url 判定するURL
 * @return URLが'Outlook for Microsoft 365'であれば true、そうでない場合は false
 */
export function isOutlookOffice365(url)
{
    if (!commons.isUndefinedOrNull(url)) {
        for (var i = 0; i < constants.OUTLOOK_FOR_MICROSOFT_365_URLS.length; i++) {
            if (url.startsWith(constants.OUTLOOK_FOR_MICROSOFT_365_URLS[i])) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 指定されたURLが'Outlook.com'/'Outlook for Microsoft 365の'OWA'かどうか判定します。
 * 
 * @param {String} url 判定するURL
 * @return URLが'Outlook.com'/'Outlook for Microsoft 365'の'OWA'であれば true、そうでない場合は false
 */
export function isOutlookOfficeOwa(url)
{
    if (!commons.isUndefinedOrNull(url)) {
        for (var i = 0; i < constants.OUTLOOK_OFFICE_OWA_BASE_URLS.length; i++) {
            if (url.startsWith(constants.OUTLOOK_OFFICE_OWA_BASE_URLS[i])) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 指定されたURLが'Outlook.com'の'OWA'かどうか判定します。
 * 
 * @param {String} url 判定するURL
 * @return URLが'Outlook.com'の'OWA'であれば true、そうでない場合は false
 */
export function isOutlookLiveComOwa(url)
{
    if (commons.isUndefinedOrNull(url)) {
        return false;
    }
    if (url.startsWith(constants.HTTPS_OUTLOOK_LIVE_COM_OWA)) {
        return true;
    }
    return false;
}

/**
 * 指定されたURLが'Outlook for Microsoft 365' - 'OWA' かどうか判定します。
 * 
 * @param {String} url 判定するURL
 * @return URL が 'Outlook for Microsoft 365' - 'OWA' であれば true、そうでない場合は false
 */
export function isOutlookOffice365owa(url)
{
    if (commons.isUndefinedOrNull(url)) {
        return false;
    }
    if (url.startsWith(constants.HTTPS_OUTLOOK_OFFICE_COM_OWA)) {
        return true;
    }
    if (url.startsWith(constants.HTTPS_OUTLOOK_OFFICE365_COM_OWA)) {
        return true;
    }
    return false;
}

/**
 * Deeplink形式のポップアップメール編集画面かどうか判定します。
 * 
 * @param {String} url 判定するURL
 * @return Deeplink形式のポップアップメール編集画面であれば true、そうでない場合は false
 */
export function isMailDeeplink(url)
{
    if (url.includes('/deeplink/compose')) {
        return true
    }
    return false
}

/**
 * 指定されたURLからメールIDを抽出します。
 * 
 * @param {String} url メールIDを抽出するURL
 * @return メールID または null
 */
export function extractMailId(url)
{
    if (url.indexOf("/deeplink/compose?") > 0) {
        // メールID未割り当て
        return null
    }
//#10837 20230110 CHG S
//  var mailid = url.substring(url.indexOf("/deeplink/compose/") + "/deeplink/compose/".length, url.indexOf("?"))
//  if (mailid.length === 0) {
//      // メールID未割り当て
//      return null
//  }
//  return decodeURIComponent(mailid)
    var MailId = "";
    if (url.endsWith('?')) {
        MailId = url.substring(url.indexOf("/deeplink/compose/") + "/deeplink/compose/".length, url.indexOf("?"));
    } else {
        MailId = url.substring(url.indexOf("/deeplink/compose/") + "/deeplink/compose/".length);
    }
    MailId = decodeURIComponent(MailId);
    MailId = MailId.replace(/\+/g, '_');    // '+' -> '_'
    MailId = MailId.replace(/\//g, '-');    // '/' -> '-'
    return MailId;
//#10837 20230110 CHG E
}

/**
 * 指定されたリクエスト詳細から'OnBeforeSendHeaders'で実行するアクションの種別を返します。
 * 
 * @param {Object} details 'OnBeforeSendHeaders'のリクエスト詳細
 * @return アクション種別
 */
export function getOnBeforeSendHeadersAction(details)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(details)) {
        logger.error("内部エラーが発生しました。（詳細: details='%o'）", details);
        return ACTION_UNKNOWN;
    }

    if (!commons.hasOwnProperty(details, constants.REQUEST_HEADERS)) {
        logger.error("内部エラーが発生しました。（詳細: 'details'に'%s'が存在しません）", constants.REQUEST_HEADERS);
        return constants.ACTION_UNKNOWN;
    }

    var url = details.url;

//20221209 CHG S
//  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//  // Office.com ログイン（サイレント）
//  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//
//  if (url.startsWith(constants.HTTPS_OUTLOOK_LIVE_COM_OWA)
//          && url.includes(constants.OUTLOOK_OFFICE_COM_SAIRENT_LOGIN_PATH)) {
//      return constants.ACTION_OUTLOOK_OFFICECOM_SAIRENT_LOGIN;
//  }
//
//  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//  // Office.com ログイン（ダイアログ）
//  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//
//  if (url.startsWith(constants.HTTPS_LOGIN_LIVE_COM_PPSECURE_POST_SRF_WA_WSIGNIN_1_0)) {
//      return constants.ACTION_OUTLOOK_OFFICECOM_LOGIN;
//  }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // Office.com ログイン
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (url.startsWith(constants.HTTPS_OUTLOOK_LIVE_COM) && url.includes("/UserSettings")) {
        // 認証あり・なしの場合も同様の処理!!
        return constants.ACTION_OUTLOOK_OFFICECOM_LOGIN;
    }
//20221209 CHG E

//#10829 20230105 ADD S
    // Outlook.com の場合にのみ発生!!
    // [添付] > [OneDrive] > [添付]
    // [添付] > [アップロードして共有]
    if (url.startsWith("https://api.onedrive.com/") && url.includes("/action.createLink")) {
        return constants.ACTION_CREATE_REFERENCE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER;
    }
//#10829 20230105 ADD E

//20221209 DEL S
// GetMailboxByIdentity リクエストで取得するため削除
//  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//  // Outlook Office365 ログイン（サイレント）
//  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//
//  if (isOutlookOffice365owa(url) && url.includes(constants.OUTLOOK_OFFICE_COM_SAIRENT_LOGIN_PATH)) {
//      return constants.ACTION_OUTLOOK_OFFICE365_SAIRENT_LOGIN;
//  }
//
//  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//  // Outlook Office365 ログイン（ダイアログ）
//  //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//
//  if (url === constants.HTTPS_LOGIN_MICROSOFT_ONLINE_COM_COMMON_LOGIN) {
//      return constants.ACTION_OUTLOOK_OFFICE365_LOGIN;
//  }
//20221209 DEL E

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // アクション種別の取得
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    var requestHeaders = details.requestHeaders;

    var item = requestHeaders.find(item => item.name.toLowerCase() === constants.X_REQ_SOURCE);
    if (commons.isUndefinedOrNull(item)) {
        return constants.ACTION_UNKNOWN;
    }

    var source = item['value'];
    if (commons.isUndefinedOrNull(source)) {
        logger.debug(`"${constants.X_REQ_SOURCE}": ${source}`);
        return constants.ACTION_UNKNOWN;
    }

    if ((source !== constants.MAIL) && (source !== constants.MAIL_DEEP_LINK)) {
        logger.debug(`"${constants.X_REQ_SOURCE}": ${source}`);
        return constants.ACTION_UNKNOWN;
    }

    item = requestHeaders.find(item => item.name.toLowerCase() === constants.X_OWA_ACTION);
    if (commons.isUndefinedOrNull(item)) {
        item = requestHeaders.find(item => item.name.toLowerCase() === constants.ACTION);
        if (commons.isUndefinedOrNull(item)) {
            return constants.ACTION_UNKNOWN;
        }
    }

    var action = item['value'];

    if (commons.isUndefinedOrNull(action)) {
        return constants.ACTION_UNKNOWN;
    }

    return action;
}

/**
 * 指定されたリクエスト詳細から'OnCompleted'で実行するアクションの種別を返します。
 * 
 * @param {Object} details 'OnCompleted'のリクエスト詳細
 * @return アクション種別
 */
export function getOnCompletedAction(details)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(details)) {
        logger.error(`内部エラーが発生しました。（詳細: details='undefined or null'）`);
        return constants.ACTION_UNKNOWN;
    }

    var url = details.url;

//#10837 20230110 ADD S
    if (url.startsWith("https://nleditor.osi.office.net/NLEditor/api/") && url.includes("BrowserExtension")) {
        return constants.ACTION_BROWSER_EXTENSION;
    }
//#10837 20230110 ADD E

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // GetItem
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (isOutlookOfficeOwa(url) && url.includes("/service.svc?action=GetItem")) {
        return constants.ACTION_GET_ITEM;
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // AddEntityFeedback
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (isOutlookOfficeOwa(url) && url.includes("/service.svc?action=AddEntityFeedback")) {
        return constants.ACTION_ADD_ENTITY_FEEDBACK;
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // CreateAttachmentFromLocalFile
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (isOutlookOfficeOwa(url) && url.includes("/service.svc/CreateAttachmentFromLocalFile")) {
        return constants.ACTION_CREATE_ATTACHMENT_FROM_LOCAL_FILE;
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // CreateAttachmentFromAttachmentDataProvider
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (isOutlookOfficeOwa(url)
            && url.includes("/service.svc?action=CreateAttachmentFromAttachmentDataProvider")) {
        return constants.ACTION_CREATE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER;
    }

//#10829 20230105 CHG S
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // CreateReferenceAttachmentFromAttachmentDataProvider
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

//    if (isOutlookOfficeOwa(url)
//            && url.includes("/service.svc?action=CreateReferenceAttachmentFromAttachmentDataProvider")) {
//        return constants.ACTION_CREATE_REFERENCE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER;
//    }

    // Outlook.com の場合にのみ発生!!
    // [添付] > [OneDrive] > [添付]
    // [添付] > [アップロードして共有]
    if (url.startsWith("https://api.onedrive.com/") && url.includes("/action.createLink")) {
        return constants.ACTION_CREATE_REFERENCE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER;
    }
//#10829 20230105 CHG S

//#10829 20230105 ADD S
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // GetSharingInformation
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    // Outlook for Microsoft 365 の場合にのみ発生!!
    // [添付] > [OneDrive] > [添付]
    // [添付] > [アップロードして共有]

    if (isOutlookOfficeOwa(url) && url.includes("/service.svc?action=GetSharingInformation")) {
        return constants.ACTION_GET_SHARING_INFORMATION;
    }
//#10829 20230105 ADD E

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // GetAttachmentPreviews
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (isOutlookOfficeOwa(url) && url.includes("/service.svc?action=GetAttachmentPreviews")) {
        return constants.ACTION_GET_ATTACHMENT_PREVIEWS;
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // DeleteAttachment
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (isOutlookOfficeOwa(url) && url.includes("/service.svc?action=DeleteAttachment")) {
        return constants.ACTION_DELETE_ATTACHMENT;
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    //  CancelAttachment
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (isOutlookOfficeOwa(url) && url.includes("/service.svc?action=CancelAttachment")) {
        return constants.ACTION_CANCEL_ATTACHMENT;
    }

    return constants.ACTION_UNKNOWN;
}

//20221209 DEL S
///**
// * @param {Object} details リクエスト詳細
// * @param {Callback} callback コールバック関数
// */
//function getLoginUser(details, callback)
//{
//    const logger = chrome.windows.swdtk.logger;
//
//    if (commons.isUndefinedOrNull(details)) {
//        logger.error(`内部エラーが発生しました。（詳細: details='undefined or null'）`);
//        return;
//    }
//
//    if (commons.isUndefinedOrNull(callback)) {
//        logger.error(`内部エラーが発生しました。（詳細: callback='undefined or null'）`);
//        return;
//    }
//
//    if (commons.hasOwnProperty(details, constants.REQUEST_BODY)) {
//        var requestBody = details.requestBody;
//        if (commons.hasOwnProperty(requestBody, constants.FORM_DATA)) {
//            var formData = requestBody.formData;
//            if (commons.hasOwnProperty(formData, constants.LOGIN)) {
//                callback(formData.login[0]);
//                return;
//            }
//        }
//    }
//
//    var url = details.url;
//
//    if (url.includes(constants.OUTLOOK_OFFICE_COM_SAIRENT_LOGIN_PATH)) {
//        if (isOutlookLiveComOwa(url)) {
//            getJSH(callback);
//        }
//        else if (isOutlookOffice365owa(url)) {
//            getDefaultAnchorMailbox(callback);
//        }
//        else {
//            logger.error(`内部エラーが発生しました。（詳細: ログインユーザーの取得に失敗しました）`);
//        }
//    }
//}
//20221209 DEL E

//20221209 DEL S
///**
// * '.login.live.com'ドメインのcookieからログインユーザー名を取得します。
// * 
// * @param {Callback} callback ログインユーザー名を渡すコールバック関数
// */
//function getJSH(callback)
//{
//    return new Promise((resolve, reject) => {
//        chrome.cookies.getAll({
//            domain: '.login.live.com',
//        }, (cookies) => {
//            if (chrome.runtime.lastError) {
//                reject(chrome.runtime.lastError);
//            } else {
//                var jsh = cookies.find(item => item.name === 'JSH');
//                if (jsh !== undefined) {
//                    const regex = /\$(.*?)\$/gi;
//                    const matched = regex.exec(jsh['value']);
//                    if (matched) {
//                        var loginUser = matched[1].replace('%40', '@');
//                        callback(loginUser);
//                        resolve();
//                    }
//                }
//            }
//        });
//    });
//}
//20221209 DEL E

//20221209 DEL S
///**
// * 'https://outlook.office365.com'または'https://outlook.office.com'のcookieから
// * ログインユーザー名（'DefaultAnchorMailbox'）を取得します。
// * 
// * @param {Callback} callback ログインユーザー名を渡すコールバック関数
// */
//function getDefaultAnchorMailbox(callback)
//{
//    return new Promise((resolve, reject) => {
//        chrome.cookies.get({
//            url: constants.HTTPS_OUTLOOK_OFFICE365_COM,
//            name: constants.DEFAULT_ANCHOR_MAILBOX,
//        }, (cookie) => {
//            const logger = chrome.windows.swdtk.logger;
//            if (chrome.runtime.lastError) {
//                reject(chrome.runtime.lastError);
//            } else {
//                if (commons.isUndefinedOrNull(cookie)) {
//                    chrome.cookies.get({
//                        url: constants.HTTPS_OUTLOOK_OFFICE_COM,
//                        name: constants.DEFAULT_ANCHOR_MAILBOX,
//                    }, (cookie) => {
//                        if (chrome.runtime.lastError) {
//                            reject(chrome.runtime.lastError);
//                        } else {
//                            if (cookie !== null) {
//                                var loginUser = cookie['value'];
//                                callback(loginUser);
//                            }
//                            else {
//                                logger.debug(`ログインユーザー名が取得できませんでした。`);
//                                callback(null);
//                            }
//                        }
//                    });
//                } else {
//                    if (cookie !== null) {
//                        var loginUser = cookie['value'];
//                        callback(loginUser);
//                    }
//                    else {
//                        logger.debug(`ログインユーザー名が取得できませんでした。`);
//                        callback(null);
//                    }
//                }
//                resolve();
//            }
//        });
//    });
//}
//20221209 DEL E

/**
 * JSON形式データの'__type'項目の値が、指定されたデータ種別と一致するかどうか判定します。
 * 
 * @param {Object} json JSON 形式データ
 * @param {String} type 判定するデータ種別
 * @return データ種別が一致した場合は true、そうでない場合は false
 */
export function checkJsonDataType(json, type)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return false;
    }

    if (commons.isUndefinedOrNull(type)) {
        logger.error(`内部エラーが発生しました。（詳細: type='undefined or null'）`);
        return false;
    }

    if (commons.hasOwnProperty(json, constants.__TYPE)) {
        if (json[constants.__TYPE] === type) {
            return true;
        }
    } else {
// #9678[PH21462] 20220510 CHG S
//      logger.error(`内部エラーが発生しました。（詳細: '${__TYPE}' が存在しません）`);
        logger.warn(`内部エラーが発生しました。（詳細: '${constants.__TYPE}'が存在しません）`);
// #9678[PH21462] 20220510 CHG E
    }

    return false;
}

/**
 * 指定されたJSON形式データが'JsonRequestHeaders:#Exchange'のヘッダを持っているかどうか判定します。
 * 
 * @param {Object} json 判定するJSON形式データ
 * @return 'JsonRequestHeaders:#Exchange'のヘッダを持っている場合は true、そうでない場合は false
 */
export function hasJsonRequestHeaders(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return false;
    }

    if (!commons.hasOwnProperty(json, constants.HEADER)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.HEADER}'が存在しません）`);
        return false;
    }

    var header = json[constants.HEADER];

    if (!checkJsonDataType(header, constants.JSONTYPE_JSON_REQUEST_HEADERS)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return false;
    }

    return true;
}

/**
 * 指定されたJSON形式データを解析し、メール情報を抽出します。
 * 
 * @param {Object} json 解析するJSON形式データ
 * @return メール情報、または null
 */
export function parseCreateItemJsonRequest(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!checkJsonDataType(json, constants.JSONTYPE_CREATE_ITEM_JSON_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!hasJsonRequestHeaders(json)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.BODY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.BODY}' が存在しません）`);
        return null;
    }

    var body = json[constants.BODY];

    if (!checkJsonDataType(body, constants.JSONTYPE_CREATE_ITEM_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    var mail = new Mail('Outlook');

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // メール情報
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    {

        if (!commons.hasOwnProperty(body, constants.ITEMS)) {
            logger.error(`内部エラーが発生しました。（詳細: '${constants.ITEMS}'が存在しません）`);
            mail = null;
            return null;
        }

        if (body[constants.ITEMS].length > 1) {
            logger.warn(`'${constants.ITEMS}'配列の要素が二つ以上存在します。`);
        }


        var item = body[constants.ITEMS][0];

        if (!commons.hasOwnProperty(item, constants.__TYPE)) {
            logger.error(`内部エラーが発生しました。（詳細: '${constants.__TYPE}'が存在しません）`);
            mail = null;
            return null;
        }

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // 件名
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        if (commons.hasOwnProperty(item, constants.SUBJECT)) {
            mail.setSubject(item[constants.SUBJECT]);
        }
        else {
            logger.error(`内部エラーが発生しました。（詳細: '${constants.SUBJECT}'が存在しません）`);
            mail = null;
            return null;
        }

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // 送信元アドレス(Sender)
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

//20221209 CHG S
//      // ログ化IFに渡す直前に格納する!!
        if (commons.hasOwnProperty(item, constants.MAIL_BOX_INFO)) {
            var mailBoxInfo = item[constants.MAIL_BOX_INFO];
            if (commons.hasOwnProperty(mailBoxInfo, constants.MAIL_BOX_SMTP_ADDRESS)) {
                mail.setSender(mailBoxInfo[constants.MAIL_BOX_SMTP_ADDRESS]);
            } else if (commons.hasOwnProperty(mailBoxInfo, constants.USER_IDENTITY)) {
                mail.setSender(mailBoxInfo[constants.USER_IDENTITY]);
            } else {
                // ログ化IFに渡す直前にログインID（メールアドレス）格納する!!
                mail.setSender("");
            }
        }
//20221209 CHG E

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // 送信先アドレス(TO)
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        if (commons.hasOwnProperty(item, constants.TO_RECIPIENTS)) {
            mail.setToRecipients(getEmailAddress(item[constants.TO_RECIPIENTS]));
        }
// [転送]、[返信]、[全員へ返信]の場合、'ToRecipients'が存在しない場合があるため、エラー処理を無効化!!
//      else {
//          logger.error(`内部エラーが発生しました。（詳細: '${constants.TO_RECIPIENTS}'が存在しません）`);
//          mail = null;
//          return null;
//      }

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // 送信先アドレス(CC)
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        if (commons.hasOwnProperty(item, constants.CC_RECIPIENTS)) {
            mail.setCcRecipients(getEmailAddress(item[constants.CC_RECIPIENTS]));
        }
// [転送]、[返信]、[全員へ返信]の場合、'CcRecipients'が存在しない場合があるため、エラー処理を無効化!!
//      else {
//          logger.error(`内部エラーが発生しました。（詳細: '${constants.CC_RECIPIENTS}'が存在しません）`);
//          mail = null;
//          return null;
//      }

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // 送信先アドレス(BCC)
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        if (commons.hasOwnProperty(item, constants.BCC_RECIPIENTS)) {
            mail.setBccRecipients(getEmailAddress(item[constants.BCC_RECIPIENTS]));
        }
// [転送]、[返信]、[全員へ返信]の場合、'BccRecipients' が存在しない場合があるため、エラー処理を無効化!!
//      else {
//          logger.error(`内部エラーが発生しました。（詳細: '${constants.BCC_RECIPIENTS}'が存在しません）`);
//          return null;
//      }

//#11013 20230105 ADD S
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // 操作名
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        if (commons.hasOwnProperty(item, constants.OPERATION)) {
            mail.setOperation(item[constants.OPERATION]);
        }
//#11013 20230105 ADD E

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール本文
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        var mailBodyPropertyName = constants.BODY;

//#11013 20230105 CHG S
//      // [返信]、[転送] 操作の場合
//      if (item[__TYPE] === JSONTYPE_REPLY_TO_ITEM) {
        // [転送]、[返信]、[全員へ返信] 操作の場合
        if ((item[constants.__TYPE] === constants.JSONTYPE_FORWARD_ITEM)
            || (item[constants.__TYPE] === constants.JSONTYPE_REPLY_TO_ITEM)
            || (item[constants.__TYPE] === constants.JSONTYPE_REPLY_ALL_TO_ITEM)) {
            // メール本文の参照先の名称を変更!!
            mailBodyPropertyName = constants.NEW_BODY_CONTENT;
        }
//#11013 20230105 CHG E

        if (commons.hasOwnProperty(item, mailBodyPropertyName)) {

            var mailBody = item[mailBodyPropertyName];

            if (!checkJsonDataType(mailBody, constants.JSONTYPE_BODY_CONTENT_TYPE)) {
//#9678[PH21462] 20220510 ADD S
                if (!commons.hasOwnProperty(mailBody, constants.BODY_TYPE)) {
//#9678[PH21462] 20220510 ADD E
                    logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
                    mail = null;
                    return null;
//#9678[PH21462] 20220510 ADD S
                }
//#9678[PH21462] 20220510 ADD E
            }

            var bodyType  = mailBody[constants.BODY_TYPE];
            var bodyValue = mailBody[constants.VALUE_1];

            mail.setBodyType(bodyType);
            mail.setBody(bodyValue);
        }
// [転送]、[返信]、[全員へ返信] の場合、'Body'または'NewBodyContent'が存在しない場合があるため、エラー処理を無効化!!
//        else {
//            logger.error(`内部エラーが発生しました。（詳細: '${mailBodyPropertyName}' が存在しません）`);
//            mail = null;
//            return null;
//        }

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // 添付ファイル
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        // CreateItem 単体では添付ファイルが存在するかどうかわからない!!
        // 添付ファイルが存在する場合は、後続の UpdateItem 処理時に添付ファイル情報を付加する。
    }

//#11013 20220105 ADD S
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // ID/ChangeKey
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

//#10837 20230215 CHG S
//  if (commons.hasOwnProperty(body, constants.UPDATE_RESPONSE_ITEM_ID)) {
    if (commons.hasOwnProperty(item, constants.UPDATE_RESPONSE_ITEM_ID)) {
//          var UpdateResponseItemId = body[constants.UPDATE_RESPONSE_ITEM_ID];
            var UpdateResponseItemId = item[constants.UPDATE_RESPONSE_ITEM_ID];
//#10837 20230215 CHG E
        if (!commons.hasOwnProperty(UpdateResponseItemId, constants.__TYPE)) {
            logger.error(`内部エラーが発生しました。（詳細: '${constants.__TYPE}'が存在しません）`);
            mail = null;
            return null;
        }
        if (!checkJsonDataType(UpdateResponseItemId, constants.JSONTYPE_ITEM_ID)) {
            logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
            mail = null;
            return null;
        }
        if (!commons.hasOwnProperty(UpdateResponseItemId, constants.ID)) {
            logger.error(`内部エラーが発生しました。（詳細: '${constants.ID}'が存在しません）`);
            mail = null;
            return null;
        }
//DEBUG-S
//      console.debug(`>>> CreateItem: UpdateResponseItemId: ${UpdateResponseItemId[constants.ID]}`);
//DEBUG-E
        mail.setId(UpdateResponseItemId[constants.ID]);
    }
//#11013 20230105 ADD E

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // メッセージ処理
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (commons.hasOwnProperty(body, constants.MESSAGE_DISPOSITION)) {
        mail.setMessageDisposition(body[constants.MESSAGE_DISPOSITION]);
    }
    else {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.MESSAGE_DISPOSITION}'が存在しません）`);
        mail = null;
        return null;
    }

    return mail;
}

/**
 * 指定されたJSON形式データを解析し、メール情報を抽出します。
 * 
 * @param {Object} json JSON形式データ
 * @return メール情報、または null
 */
export function parseUpdateItemJsonRequest(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!checkJsonDataType(json, constants.JSONTYPE_UPDATE_ITEM_JSON_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!hasJsonRequestHeaders(json)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.BODY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.BODY}' が存在しません）`);
        return null;
    }

    var body = json[constants.BODY];

    if (!checkJsonDataType(body, constants.JSONTYPE_UPDATE_ITEM_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(body, constants.ITEM_CHANGES)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ITEM_CHANGES}'が存在しません）`);
        return null;
    }

    if (body[constants.ITEM_CHANGES].length > 1) {
        logger.warn(`'${constants.ITEM_CHANGES}'配列の要素が二つ以上存在します。`);
    }

    var itemChanges = body[constants.ITEM_CHANGES][0];

    if (!checkJsonDataType(itemChanges, constants.JSONTYPE_ITEM_CHANGE)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しい JSON 形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(itemChanges, constants.UPDATES)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.UPDATES}'が存在しません）`);
        return null;
    }

    var mail = new Mail('Outlook');

    var updates = itemChanges[constants.UPDATES];

    for (var i = 0; i < updates.length; i++) {

        var update = updates[i];

        if (checkJsonDataType(update, constants.JSONTYPE_DELETE_ITEM_FIELD)) {
            continue;
        }

        if (checkJsonDataType(update, constants.JSONTYPE_SET_ITEM_FIELD)) {

            var path = update[constants.PATH];
            var item = update[constants.ITEM];

            if (checkJsonDataType(path, constants.JSONTYPE_EXTENDED_PROPERTY_URL)) {
                continue;
            }

            if (!checkJsonDataType(path, constants.JSONTYPE_PROPERTY_URL)) {
                logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
                mail = null;
                return null;
            }

            if (!checkJsonDataType(item, constants.JSONTYPE_MESSAGE)) {
                logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
                mail = null;
                return null;
            }

            switch (path.FieldURI) {
                case constants.TO_RECIPIENTS:
                    {
                        mail.setToRecipients(getEmailAddress(item[constants.TO_RECIPIENTS]));
                        break;
                    }
                case constants.CC_RECIPIENTS:
                    {
                        mail.setCcRecipients(getEmailAddress(item[constants.CC_RECIPIENTS]));
                        break;
                    }
                case constants.BCC_RECIPIENTS:
                    {
                        mail.setBccRecipients(getEmailAddress(item[constants.BCC_RECIPIENTS]));
                        break;
                    }
                case constants.SUBJECT:
                    {
                        var subject = item[constants.SUBJECT];
                        mail.setSubject(item[constants.SUBJECT]);
                        break;
                    }
                case constants.BODY:
                    {
                        if (checkJsonDataType(item, constants.JSONTYPE_MESSAGE)) {
                            var mailBody = item[constants.BODY];
//#9678[PH21462] 20220510 CHG S
                            if (!checkJsonDataType(mailBody, constants.JSONTYPE_BODY_CONTENT_TYPE)) {
                                if (!commons.hasOwnProperty(mailBody, constants.BODY_TYPE)) {
                                    logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
                                    mail = null;
                                    return null;
                                }
                            }
                            var bodyType  = mailBody[constants.BODY_TYPE];
                            var bodyValue = mailBody[constants.VALUE_1];
                            mail.setBodyType(bodyType);
                            mail.setBody(bodyValue);
//                          if (checkJsonDataType(mailBody, constants.JSONTYPE_BODY_CONTENT_TYPE)) {
//                              var bodyType  = mailBody[constants.BODY_TYPE];
//                              var bodyValue = mailBody[constants.VALUE_1];
//                              mail.setBodyType(bodyType);
//                              mail.setBody(bodyValue);
//                          }
//                          else {
//                              logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
//                              mail = null;
//                              return null;
//                          }
//#9678[PH21462] 20220510 CHG E
                        } else {
                            logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
                            mail = null;
                            return null;
                        }

                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 送信元アドレス(Sender)
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    // ※ログ化IFに渡す直前に設定します。
    // UpdateItemにはCreateItemと異なり、mailboxInfoが存在しないため...

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 添付ファイル
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    // ※ログ化IFに渡す直前に設定します

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // ID/ChangeKey
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (!commons.hasOwnProperty(itemChanges, constants.ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ITEM_ID}'が存在しません）`);
        mail = null;
        return null;
    }

    var itemId = itemChanges.ItemId;

    mail.setId(itemId.Id);

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // メッセージ処理
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (commons.hasOwnProperty(body, constants.MESSAGE_DISPOSITION)) {
        mail.setMessageDisposition(body[constants.MESSAGE_DISPOSITION]);
    }
    else {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        mail = null;
        return null;
    }

    return mail;
}

//#10837 20230110 ADD S
/**
 * 指定されたJSON形式データを解析し、破棄メールのメールIDを抽出します。
 * @param {Object} json JSON形式データ
 * @return メールID、または null
 */
export function parseDeleteItemJsonRequest(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!checkJsonDataType(json, constants.JSONTYPE_DELETE_ITEM_JSON_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!hasJsonRequestHeaders(json)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.BODY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.BODY}' が存在しません）`);
        return null;
    }

    var body = json[constants.BODY];

    if (!checkJsonDataType(body, constants.JSONTYPE_DELETE_ITEM_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(body, constants.ITEM_IDS)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ITEM_IDS}'が存在しません）`);
        return null;
    }

    var itemIds = body[constants.ITEM_IDS];
    var itemId  = itemIds[0];

    if (!checkJsonDataType(itemId, constants.JSONTYPE_ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しい JSON 形式のデータではありません）`);
        return null;
    }

    return itemId[constants.ID];
}
//#10837 20230110 ADD E

/**
 * JSON形式のデータを解析し、メール情報を取得します。
 * @param {Object} json JSON形式データ
 * @return メール情報、または null
 */
export function parseGetItemJsonRequest(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!checkJsonDataType(json, constants.JSONTYPE_GET_ITEM_JSON_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しい JSON 形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.BODY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.BODY}'が存在しません）`);
        return null;
    }

    var body = json[constants.BODY];

    if (!checkJsonDataType(body, constants.JSONTYPE_GET_ITEM_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しい JSON 形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(body, constants.ITEM_IDS)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ITEM_IDS}'が存在しません）`);
        return null;
    }

    var itemIds = body[constants.ITEM_IDS];
    var itemId  = itemIds[0];

    if (!checkJsonDataType(itemId, constants.JSONTYPE_ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しい JSON 形式のデータではありません）`);
        return null;
    }

//#10829 20230105 CHG S
//  var mail = new Mail('Outlook');
//
//  mail.setId(itemId[constants.ID]);
//  mail.setShapeName(body[constants.SHAPE_NAME]);
//
//  logger.debug(mail.toString());
//
//  return mail;

    // ShapeName='MailCompose'の場合、下書きメールと判断!!
    if (commons.hasOwnProperty(body, constants.SHAPE_NAME)) {
        var ShapeName = body[constants.SHAPE_NAME];
        if (ShapeName == 'MailCompose') {
            var mail = new Mail('Outlook');
            mail.setId(itemId[constants.ID]);
            mail.setShapeName(ShapeName);
            return mail;
        }
    }

    return null;
//#10829 20230105 CHG E
}

/**
 * JSON形式のデータを解析し、添付ファイル情報を取得します。
 * @param {Object} json JSON形式データ
 * @return 添付ファイル情報、または null
 */
export function parseCreateAttachmentFromLocalFile(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!checkJsonDataType(json, constants.JSONTYPE_CREATE_ATTACHMENT_JSON_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!hasJsonRequestHeaders(json)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.BODY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.BODY}'が存在しません）`);
        return null;
    }

    var Body = json[constants.BODY];

    if (!checkJsonDataType(Body, constants.JSONTYPE_CREATE_ATTACHMENT_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しい JSON 形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(Body, constants.PARENT_ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.PARENT_ITEM_ID}'が存在しません）`);
        return null;
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // メールID
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    var ParentItemId = Body[constants.PARENT_ITEM_ID];

    if (!checkJsonDataType(ParentItemId, constants.JSONTYPE_ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(ParentItemId, constants.ID)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ID}'が存在しません）`);
        return null;
    }

    var MailId = ParentItemId[constants.ID];

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 添付ファイル名
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (!commons.hasOwnProperty(Body, constants.ATTACHMENTS)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ATTACHMENTS}'が存在しません）`);
        return null;
    }

    var Attachments = Body[constants.ATTACHMENTS][0];

    if (!checkJsonDataType(Attachments, constants.JSONTYPE_FILE_ATTACHMENT)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(Attachments, constants.NAME)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.NAME}'が存在しません）`);
        return null;
    }

    var FileName = Attachments[constants.NAME];

    return {
        MailId: MailId,         // メールID
        FileName: FileName      // 添付ファイル名
    };
}

/**
 * JSON形式のデータを解析し、添付ファイル情報を取得します。
 * @param {Object} json JSON形式データ
 * @return 添付ファイル情報、または null
 */
export function parseCreateAttachmentFromAttachmentDataProvider(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.ITEM_ID_2)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ITEM_ID_2}' が存在しません）`);
        return null;
    }

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // メールID
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    var ItemId = json[constants.ITEM_ID_2];

    if (!checkJsonDataType(ItemId, constants.JSONTYPE_ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(ItemId, constants.ID)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ID}'が存在しません）`);
        return null;
    }

    var MailId = ItemId[constants.ID];

    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
    // 添付ファイル名
    //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

    if (!commons.hasOwnProperty(json, constants.LOCATION)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.LOCATION}'が存在しません）`);
        return null;
    }

    var FileName = json[constants.LOCATION];

    FileName = decodeURI(FileName);
    FileName = FileName.substring(FileName.lastIndexOf('/') + 1);

    return {
        MailId: MailId,         // メールID
        FileName: FileName      // 添付ファイル名
    };
}

/**
 * JSON形式のデータを解析し、添付ファイル情報を取得します。
 * @param {Object} json JSON形式データ
 * @return 添付ファイル情報、または null
 */
export function parseCreateReferenceAttachmentFromAttachmentDataProvider(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.ITEM_ID_2)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ITEM_ID_2}'が存在しません）`);
        return null;
    }

    var itemId = json[constants.ITEM_ID_2];

    if (!checkJsonDataType(itemId, constants.JSONTYPE_ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(itemId, constants.ID)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ID}'が存在しません）`);
        return null;
    }

    return itemId[constants.ID];
}

/**
 * JSON形式のデータを解析し、添付ファイル情報を取得します。
 * @param {Object} json JSON形式データ
 * @return 添付ファイル情報、または null
 */
export function parseDeleteAttachment(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (!checkJsonDataType(json, constants.JSONTYPE_DELETE_ATTACHMENT_JSON_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!hasJsonRequestHeaders(json)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.BODY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.BODY}'が存在しません）`);
        return null;
    }

    var body = json[constants.BODY];

    if (!checkJsonDataType(body, constants.JSONTYPE_DELETE_ATTACHMENT_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(body, constants.ATTACHMENT_IDS)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ATTACHMENT_IDS}'が存在しません）`);
        return null;
    }

    var attachmentId = body[constants.ATTACHMENT_IDS][0];

    if (!commons.hasOwnProperty(attachmentId, constants.ROOT_ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ROOT_ITEM_ID}'が存在しません）`);
        return null;
    }

    return attachmentId[constants.ROOT_ITEM_ID];
}

/**
 * 'GetAllClientExtensionsNotifications' リクエストを解析します。
 * @param {Object} json JSON形式データ
 * @return メールID、または 'null'文字列 または null
 */
export function parseGetAllClientExtensionsNotifications(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!checkJsonDataType(json, constants.JSONTYPE_GET_ALL_CLIENT_EXTENSIONS_NOTIFICATIONS_JSON_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!hasJsonRequestHeaders(json)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しい JSON 形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.BODY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.BODY}'が存在しません）`);
        return null;
    }

    var body = json[constants.BODY];

    if (!checkJsonDataType(body, constants.JSONTYPE_GET_ALL_CLIENT_EXTENSIONS_NOTIFICATIONS_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!hasOwnProperty(body, ITEM_ID)) {
        logger.error(`内部エラーが発生しました。（詳細: '${ITEM_ID}' が存在しません）`);
        return null;
    }

    var itemId = body[constants.ITEM_ID];

    if (!commons.hasOwnProperty(itemId, constants.ID)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.ID}'が存在しません）`);
        return null;
    }

    var id = itemId[constants.ID];

    return ((id === null) ? 'null' : id);
}

/**
 * 'GetMailboxByIdentity'リクエストを解析します。
 * @param {Object} json JSON形式データ
 * @return メールボックスアカウント名、または 'null'文字列 または null
 */
export function parseGetMailboxByIdentity(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (!checkJsonDataType(json, constants.JSONTYPE_IDENTITY_REQUEST)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!hasJsonRequestHeaders(json)) {
        logger.error(`内部エラーが発生しました。（詳細: 正しいJSON形式のデータではありません）`);
        return null;
    }

    if (!commons.hasOwnProperty(json, constants.IDENTITY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.IDENTITY}'が存在しません）`);
        return null;
    }

    var identity = json[constants.IDENTITY];

    if (!commons.hasOwnProperty(identity, constants.RAW_IDENTIRY)) {
        logger.error(`内部エラーが発生しました。（詳細: '${constants.RAW_IDENTIRY}'が存在しません）`);
        return null;
    }

    return identity[constants.RAW_IDENTIRY];
}

/**
 * 指定された JSON 形式データからメールアドレスを抽出します。
 * 
 * @param  {object} json JSON 形式データ
 * @return メールアドレスの配列、または 空配列
 */
export function getEmailAddress(json)
{
    const logger = chrome.windows.swdtk.logger;

    var emailAddresses = [];

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return emailAddresses;
    }

    for (var i = 0; i < json.length; i++) {
        var item = json[i];
        if (commons.hasOwnProperty(item, constants.EMAIL_ADDRESS)) {
            emailAddresses.push(item[constants.EMAIL_ADDRESS]);
        } else {
            logger.error(`内部エラーが発生しました。（詳細: '${constants.EMAIL_ADDRESS}'が存在しません）`);
        }
    }

    return emailAddresses;
}

/**
 * リクエストヘッダーに 'x-anchormailbox' が存在するかどうか判定します。
 * @param {Object} requestHeaders リクエストヘッダー
 * @return リクエストヘッダーに 'x-anchormailbox' が存在する場合は true、
 *     そうでない場合は false
 */
export function hasXanchormailbox(requestHeaders)
{
    if (commons.isUndefinedOrNull(requestHeaders)) {
        return false;
    }

    if (requestHeaders.some((item) => item.name === constants.X_ANCHORMAILBOX)) {
        return true;
    }

    return false;
}

/**
 * リクエストヘッダーの 'x-anchormailbox' の値を取得します。
 * @param {Object} requestHeaders リクエストヘッダー
 * @return リクエストヘッダーの 'x-anchormailbox' の値、または null
 */
export function getXanchormailbox(requestHeaders)
{
    if (commons.isUndefinedOrNull(requestHeaders)) {
        return null;
    }

    var result = null;

    if (requestHeaders.some((item) => item.name === constants.X_ANCHORMAILBOX)) {
        result = requestHeaders.find(item => item.name === constants.X_ANCHORMAILBOX);
    }
    else {
        return null;
    }

    return result['value'];
}

/**
 * リクエストヘッダーに 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' が存在するかどうか判定します。
 * @param {Object} requestHeaders リクエストヘッダー
 * @return リクエストヘッダーに 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' が存在する場合は true、
 *     そうでない場合は false
 */
export function hastUrlPostData(requestHeaders)
{
    if (commons.isUndefinedOrNull(requestHeaders)) {
        return false;
    }

    if (requestHeaders.some((item) => item.name === constants.X_OWN_URL_POST_DATA_1)) {
        return true;
    }

    if (requestHeaders.some((item) => item.name === constants.X_OWN_URL_POST_DATA_2)) {
        return true;
    }

    return false;
}

/**
 * リクエストヘッダーの 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' のデコード後の値を取得します。
 * @param {Object} requestHeaders リクエストヘッダー
 * @return リクエストヘッダーの 'X-OWA-UrlPostData' または 'x-owa-urlpostdata' のデコード後の値、または null
 */
export function getUrlPostData(requestHeaders)
{
    if (commons.isUndefinedOrNull(requestHeaders)) {
        return null;
    }

    var result = null;

    if (requestHeaders.some((item) => item.name === constants.X_OWN_URL_POST_DATA_1)) {
        result = requestHeaders.find(item => item.name === constants.X_OWN_URL_POST_DATA_1);
    }
    else if (requestHeaders.some((item) => item.name === constants.X_OWN_URL_POST_DATA_2)) {
        result = requestHeaders.find((item) => item.name === constants.X_OWN_URL_POST_DATA_2);
    }
    else {
        return null;
    }

    return decodeURIComponent(result['value']);
}

//#10829 20230110 DEL S
///**
// * 指定された要素から添付ファイル名の配列を取得します。
// * @param {Object} element 添付ファイルの情報が記述されている div 要素
// * @return 添付ファイル名の配列、または空の配列
// */
//export function getAttachmentsFromHTML(element)
//{
//    const logger = chrome.windows.swdtk.logger;
//
//    var attachments = [];
//
//    if (commons.isUndefinedOrNull(element)) {
//        return attachments;
//    }
//
//    var divs = element.getElementsByTagName('div');
//    for (var i = 0; i < divs.length; i++) {
//        var div = divs[i];
//        if (div.hasAttribute('title')) {
//            // 子要素が存在しない場合
//            if (div.children.length === 0) {
//                var childNodes = div.childNodes;
//                // 子ノードとしてテキストノードが１つだけ存在する場合
//                if ((childNodes.length === 1) && (childNodes[0].nodeName === '#text')) {
//                    var fileName = childNodes[0].nodeValue;
//                    logger.debug(`FileName: ${fileName}`);
//                    attachments.push(fileName);
//                    continue;
//                }
//            }
//        }
//    }
//
//    return attachments;
//}
//#10829 20230110 DEL E
//#10837 20230110 ADD S
/**
 * HTMLコンテンツからメール内容を取得します。
 * @param {String} Type リクエスト種別
 * @param {String} Action アクション種別
 * @param {Number} RequestId リクエストID
 * @param {Number} WindowsId アクティブウィンドウID
 * @param {Number} TabId アクティブウィンドウID
 * @param {String} MailId メールID
 * @param {String} Operation メール操作種別
 * @param {Number} Timeout タイムアウト値（ミリ秒）
 */
export function getMailContent(
    Type, Action, RequestId, WindowsId, TabId, MailId, Operation, Timeout)
{
    const swdtk  = chrome.windows.swdtk;
    const logger = chrome.windows.swdtk.logger;

    setTimeout(function() {
        const request = {
            Type: Type,
            Action: Action,
            RequestId: RequestId,
            WindowId: WindowsId,
            TabId: TabId,
            MailId: MailId,
            Operation: Operation
        };
//DEBUG-S
//      console.debug(">>> コンテンツ情報（要求） !!");
//      console.debug(request);
//DEBUG-E
        var ret = chrome.scripting.executeScript({
            target: {tabId: TabId},
            func: outlook_contentscript.getMailContent,
            args: [request],
        },
        (res) => {
            if (res) {
                var result = res[0]['result'];
                if (result) {
//DEBUG-S
//                  console.debug(">>> コンテンツ情報（応答） !!");
//                  console.debug(result);
//DEBUG-E
                    const URLs = [
                        "https://outlook.live.com",
                        "https://outlook.office.com",
                        "https://outlook.office365.com"
                    ];
                    var isOutlook = false;
                    for (var url of URLs) {
                        if (result.URL.startsWith(url)) {
                            isOutlook = true;
                            break;
                        }
                    }
                    if (!isOutlook) {
                        return;
                    }

//#11377 20230217 ADD S
                    if (!result.HasDockingInitVisiblePart) {
//DEBUG-S
//                      console.debug(`>>> DockingInitVisiblePartが存在しないため、CurrentEmailは編集しない!!`);
//DEBUG-E
                        return;
                    }
//#11377 20230217 ADD E

                    var Attachments = [];
                    for (var i = 0; i < result.Attachments.length; i++) {
                        Attachments.push(result.Attachments[i]);
                    }
                    for (var i = 0; i < result.LinkAttachments.length; i++) {
                        Attachments.push(result.LinkAttachments[i]);
                    }
//DEBUG-S
//                  console.debug(">>> 添付ファイル名リスト !!");
//                  console.debug(Attachments);
//DEBUG-E
                    var MailId = result.MailId;
                    // メールIDが'undefined'またはnullの場合
                    if ((MailId == undefined) || (MailId == null)) {
                        swdtk.CurrentEmail = null;
                        return;
                    }
                    var MailObj = null;
                    if (MailId == 'null' || (swdtk.CurrentEmail == null)) {
                        MailObj = new Mail('Outlook');
                        MailObj.setId(MailId);
                        MailObj.setSubject(result.Subject);
                        MailObj.setOperation(result.Operation);
                        MailObj.setAttachments(Attachments);
                        swdtk.EmailManager.set(MailId, MailObj);
                        swdtk.CurrentEmail = MailObj;
//DEBUG-S
//                      console.debug(">>> ↓↓↓ 現在編集中のメール !!");
//                      console.debug(MailObj);
//DEBUG-E
                        return;
                    }

                    // 現在編集中のメールIDと同一の場合
                    if (MailId == swdtk.CurrentEmail.getId()) {
                        MailObj = swdtk.CurrentEmail;
                    }
                    // 現在編集中のメールIDと異なる場合
                    else {
                        if (swdtk.EmailManager.has(MailId)) {
                            MailObj = swdtk.EmailManager.get(MailId);
                        } else {
                            MailObj = new Mail('Outlook');
                            MailObj.setId(MailId);
                        }
                    }
                    MailObj.setSubject(result.Subject);
                    MailObj.setOperation(result.Operation);
                    MailObj.setAttachments(Attachments);
                    swdtk.CurrentEmail = MailObj;
                    swdtk.EmailManager.set(MailId, MailObj);
//DEBUG-S
//                  console.debug(">>> ↓↓↓ 現在編集中のメール !!");
//                  console.debug(MailObj);
//DEBUG-E
                    return;
                }
            }
        });
    }, Timeout);
}
//#10837 20230110 ADD E
