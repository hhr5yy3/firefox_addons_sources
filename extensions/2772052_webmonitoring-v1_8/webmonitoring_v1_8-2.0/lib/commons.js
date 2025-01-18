import * as background from "../background.js"
import * as constants from "./constants.js"
import { WindowTitleHistory } from "./window_title_history.js"

/**
 * ブラウザー名を取得します。
 *
 * @return {string} ブラウザー名
 */
export function GetBrowserName()
{
    var userAgentData = navigator.userAgentData;
    var browser = "";
    if (userAgentData === undefined) {
        var userAgent = window.navigator.userAgent;
        browser = userAgent;
        if (userAgent.includes("Firefox")) {
            browser = constants.FIREFOX;
        }
        else if (userAgent.includes("Chrome")) {
            if (userAgent.includes("Edg/")) {
                browser = constants.EDGE;
            }
            else {
                browser = constants.CHROME;
            }
        }
    }
    else {
        for (var i = 0; i < userAgentData.brands.length; ++i) {
            var item = userAgentData.brands[i];
            if (item['brand'].includes("Edge")) {
                browser = constants.EDGE;
                break;
            }
            else if (item['brand'].includes("Chrome")) {
                browser = constants.CHROME;
                break;
            }
        }
    }

    return browser
}

/**
 * オブジェクトが null かどうか判定します。
 *
 * @param  {Object} obj 判定対象のオブジェクト
 * @return オブジェクトが null の場合は true、そうでない場合は false
 */
export function isNull(obj)
{
    return (obj === null);
}

/**
 * オブジェクトが null でないか判定します。
 *
 * @param  {Object} obj 判定対象のオブジェクト
 * @return オブジェクトが null でない場合は true、そうでない場合は false
 */
export function isNotNull(obj)
{
    return (obj !== null);
}

/**
 * オブジェクトが undefined かどうか判定します。
 *
 * @param  {Object} obj 判定対象のオブジェクト
 * @return オブジェクトが undefined の場合は true、そうでない場合は false
 */
export function isUndefined(obj)
{
    return (obj === undefined);
}

/**
 * オブジェクトが undefined でないか判定します。
 *
 * @param  {Object} obj 判定対象のオブジェクト
 * @return オブジェクトが undefined でない場合は true、そうでない場合は false
 */
export function isNotUndefined(obj)
{
    return (obj !== undefined);
}

/**
 * オブジェクトが undefined または null かどうか判定します。
 *
 * @param  {Object} obj 判定対象のオブジェクト
 * @return オブジェクトが undefined または null の場合は true、そうでない場合は false
 */
export function isUndefinedOrNull(obj)
{
    if (obj === undefined) {
        return true;
    }

    if (obj === null) {
        return true;
    }

    return false;
}

/**
 * オブジェクトが undefined または null でないか判定します。
 *
 * @param  {Object} obj 判定対象のオブジェクト
 * @return オブジェクトが undefined または null でない場合は true、そうでない場合は false
 */
export function isNotUndefinedOrNull(obj)
{
    var result = false;

    if (obj !== undefined) {
        result |= true;
    }

    if (obj !== null) {
        result |= true;
    }

    return result;
}

/**
 * オブジェクトが undefined かつ null でないか判定します。
 *
 * @param  {Object} obj 判定対象のオブジェクト
 * @return オブジェクトが undefined かつ null でない場合は true、そうでない場合は false
 */
export function isNotUndefinedAndNull(obj)
{
    return (isNotUndefined(obj) && isNotNull(obj));
}

/**
 * オブジェクトが指定されたプロパティを自身のプロパティとして持っているかどうか判定します。
 *
 * @param  {Object} obj 判定対象のオブジェクト
 * @param  {String} prop テストするプロパティの名前
 * @return オブジェクトが指定されたプロパティを自身のプロパティとして持っている場合は true、
 *     そうでない場合は false
 */
export function hasOwnProperty(obj, prop)
{
    if (isUndefinedOrNull(obj)) {
        return false;
    }

    if (isUndefinedOrNull(prop)) {
        return false;
    }

    return obj.hasOwnProperty(prop);
}

/**
 * オブジェクトから指定された名前のプロパティ値を取得します。
 *
 * @param  {Object} obj オブジェクト
 * @param  {String} key 名前
 */
export function getOwnProperty(obj, key)
{
    if (!hasOwnProperty(obj, key)) {
        return null;
    }

    return obj[key];
}

/**
 * @param  {String} str
 * @param  {String} separator
 * @return
 */
export function substringAfterLast(str, separator)
{
    if (isUndefinedOrNull(str)) {
        return str;
    }

    if (isUndefinedOrNull(separator)) {
        return "";
    }

    var pos = str.lastIndexOf(separator);
    if ((pos == -1) || (pos == (str.length - separator.length))) {
        return "";
    }

    return str.substring(pos + separator.length);
}

/**
 * @param  {} requestBody
 * @return
 */
export function convertRequestBodyRawToJson(requestBody)
{
    const logger = chrome.windows.swdtk.logger;

    if (isUndefinedOrNull(requestBody)) {
        logger.error(`内部エラーが発生しました。（詳細: requestBody='undefined or null'）`);
        return null;
    }

    if (!hasOwnProperty(requestBody, "raw")) {
        logger.error(`内部エラーが発生しました。（詳細: 'requestBody' に 'row' プロパティが存在しません）`);
        return null;
    }

    var rawdata = requestBody.raw.map(function (data) {
        return String.fromCharCode.apply(null, new Uint8Array(data.bytes))
    }).join('');

    if (isUndefinedOrNull(rawdata)) {
        logger.error(`内部エラーが発生しました。（詳細: 'raw' データの変換に失敗しました。）`);
        return null;
    }

    return stringToJson(rawdata);
}

/**
 * 指定された文字列を JSON として解析し、文字列によって記述されている JavaScript の値やオブジェクトを構築します。
 *
 * @param  {String} string JSON形式に変換する文字列
 * @return 指定された JSON の text に対応する値、または null
 */
export function stringToJson(string)
{
    const logger = chrome.windows.swdtk.logger;

    if (isUndefinedOrNull(string)) {
        logger.error(`内部エラーが発生しました。（詳細: string=${string}）`);
        return null;
    }

    var json = null;
    try {
        json = JSON.parse(string);
        if (isUndefinedOrNull(json)) {
            logger.error(`内部エラーが発生しました。（詳細: JSON 形式への変換に失敗しました。）`);
        }
        debugOutputJson(json);
    } catch (error) {
        logger.error(`内部エラーが発生しました。（詳細: JSON 形式への変換に失敗しました。）`);
    }

    return json;
}

/**
 * 受信イベントに対するリクエストの詳細をコンソールに出力します。(デバッグ用)
 *
 * @param  {String} eventName イベント名
 * @param  {Object} details リクエストの詳細
 */
export function debugOutputWebRequest(eventName, details)
{
/*
    logger.debug("");
    logger.debug(`${eventName} !!`);
    logger.debug("********************************************************************************");
    logger.debug(`URL      : ${details.url}`);
    logger.debug(`TYPE     : ${details.type}`);
    logger.debug(`METHOD   : ${details.method}`);
    logger.debug(`REQUESTID: ${details.requestId}`);
    logger.debug(`TIMESTAMP: ${details.timeStamp}`);
    logger.debug("********************************************************************************");
    logger.debug("");
*/
}

/**
 * メールオブジェクトの内容をコンソールに出力します。(デバッグ用)
 *
 * @param  {Object} mail コンソールに出力するメール情報オブジェクト
 */
export function debugOutputMail(mail)
{
    const logger = chrome.windows.swdtk.logger;

    if (!isUndefinedOrNull(mail)) {

        logger.debug(mail.toString());

        var subject       = decodeURIComponent(escape(mail.Subject));
        var body          = decodeURIComponent(escape(mail.Body));
        var toRecipients  = toStringBuffer(mail.ToRecipients, "decodeURIComponent");
        var ccRecipients  = toStringBuffer(mail.CcRecipients, "decodeURIComponent");
        var bccRecipients = toStringBuffer(mail.BccRecipients, "decodeURIComponent");
        var attachments   = toStringBuffer(mail.Attachments, "decodeURI");

        var message = "\n★★★★ ＷＥＢメール送信ログ取得 ★★★★\n";
        message += `################################################################################\n`;
        message += `送信元アドレス     : ${mail.Sender}\n`;
        message += `件名               : ${subject}\n`;
        message += `送信先アドレス(To) : ${toRecipients}\n`;
        message += `送信先アドレス(Cc) : ${ccRecipients}\n`;
        message += `送信先アドレス(Bcc): ${bccRecipients}\n`;
        message += `本文               : ${body}\n`;
        message += `添付ファイル       : ${attachments}\n`;
        message += `################################################################################\n`;
        logger.debug(message);
    }
}

/**
 * 指定された JSON 形式データを半角空白４文字分のインデントを付けてコンソールに出力します。(デバッグ用)
 *
 * @param  {Object} json コンソールに出力するJSON形式データ
 */
export function debugOutputJson(json)
{
//    logger.debug("■■■■ JSON ■■■■");
//    logger.debug(JSON.stringify(json, null, 4))
//    logger.debug("");
}

/**
 * 指定された文字列配列の文字列をカンマ区切りで連結します。
 *
 * @param  {Object} items 連結する文字列の配列
 * @param  {String} decode デコード方法
 * @return カンマ区切りで連結された文字列、または空文字列
 */
export function toStringBuffer(items, decode)
{
    var buffer = '';
    if (!isUndefinedOrNull(items)) {
        for (var i = 0; i < items.length; i++) {
            if (i != 0) {
                buffer += ", ";
            }
            switch (decode) {
                case "decodeURI":
                    {
                        try {
                            buffer += decodeURI(escape(items[i]));
                        } catch (error) {
                            buffer += items[i];
                        }
                        break;
                    }
                case "decodeURIComponent":
                    {
                        try {
                            buffer += decodeURIComponent(escape(items[i]));
                        } catch (error) {
                            buffer += items[i];
                        }
                        break;
                    }
                default:
                    {
                        buffer += items[i];
                        break;
                    }
            }
        }
    }
    return buffer;
}

/**
 * FSW01EJRへメッセージを送信します。
 *
 * @param {Object} port ポート
 * @param {Object} message 送信メッセージ
 */
function postMessage(port, message)
{
    for (var i = 0; i < 5; i++) {
        try {
            if ((port === null) || chrome.runtime.lastError) {
                background.connect_fsw01ejr();
                port = chrome.windows.swdtk.port;
            }
            port.postMessage(message);
            break;
        }
        catch (e) {
            if ((port === null) || chrome.runtime.lastError) {
                background.connect_fsw01ejr();
                port = chrome.windows.swdtk.port;
            }
        }
    }
}

/**
 * 送信するメール情報をログ化インタフェースへ渡します。
 *
 * @param {Object} port FSW01EJRとの通信ポート
 * @param {String} site サイト名
 * @param {String} process プロセス名
 * @param {Number} timeStamp タイムスタンプ
 * @param {Object} mail メール情報
 */
export function createWebMailSendingLog(port, site, process, timeStamp, mail)
{
    const swdtk = chrome.windows.swdtk;

    var isHtml = 'true';

    if (mail.Mailer.toUpperCase() === 'OUTLOOK') {
        if (mail.BodyType.toUpperCase() === 'TEXT') {
            isHtml = 'false';
        }
    }

    if (isUndefinedOrNull(mail.Sender)) {
        mail.Sender = '';
    }

    var message =
    {
        "USERNAME": swdtk.USERNAME,
        "USERDOMAIN": swdtk.USERDOMAIN,
        "SESSIONID": swdtk.SESSINID,
        "HOPELOGON": swdtk.HOPELOGON,
        "logkind": "5",
        "process": process,
        "date": String(timeStamp),
        "site": site,
        "from": mail.Sender,
        "to": concatMailAddresses(mail.ToRecipients),
        "cc": concatMailAddresses(mail.CcRecipients),
        "bcc": concatMailAddresses(mail.BccRecipients),
        "subject": decodeURIComponent(escape(escapeString(mail.Subject))),
        "ishtml": isHtml,
        "content": concatFileNames(mail.Attachments),
        "body": decodeURIComponent(escape(escapeString(mail.Body))),
    };

    // FSW01EJRへメッセージを送信
    postMessage(port, message);

    // メール送信情報をデバッグログへ出力
    debugOutputMail(mail);
}

/**
 * 送信するアップロードログ情報をログ化インタフェースへ渡します。
 *
 * @param {Object} port FSW01EJRとの通信ポート
 * @param {String} site サイト名
 * @param {String} process プロセス名
 * @param {String} filename ファイル名
 * @param {Number} timeStamp タイムスタンプ
 */
export function createUploadSendingLog(port, site, process, filename, timeStamp)
{
    const swdtk = chrome.windows.swdtk;

    var message =
    {
        "USERNAME": swdtk.USERNAME,
        "USERDOMAIN": swdtk.USERDOMAIN,
        "SESSIONID": swdtk.SESSINID,
        "HOPELOGON": swdtk.HOPELOGON,
        "logkind": "31",
        "site": site,
        "process": process,
        "filename": filename,
        "date": String(timeStamp)
    };

    // FSW01EJRへメッセージを送信
    postMessage(port, message);
}

/**
 * 送信するダウンロードログ情報をログ化インタフェースへ渡します。
 *
 * @param {Object} port FSW01EJRとの通信ポート
 * @param {String} process プロセス名
 * @param {String} site サイト名
 * @param {String} filename ファイル名
 * @param {Number} timeStamp タイムスタンプ
 */
export function createDownloadSendingLog(port, site, process, filename, timeStamp)
{
    const swdtk = chrome.windows.swdtk;

    var message =
    {
        "USERNAME": swdtk.USERNAME,
        "USERDOMAIN": swdtk.USERDOMAIN,
        "SESSIONID": swdtk.SESSINID,
        "HOPELOGON": swdtk.HOPELOGON,
        "logkind": "32",
        "site": site,
        "process": process,
        "filename": filename,
        "date": String(timeStamp)
    };

    // FSW01EJRへメッセージを送信
    postMessage(port, message);
}

/**
 * 送信するアップロード禁止ログ情報をログ化インタフェースへ渡します。
 *
 * @param {Object} port FSW01EJRとの通信ポート
 * @param {String} site サイト名
 * @param {String} process プロセス名
 * @param {Number} timeStamp タイムスタンプ
 */
export function createUploadDenySendingLog(port, site, process, timeStamp)
{
    const swdtk = chrome.windows.swdtk;

    var message =
    {
        "USERNAME": swdtk.USERNAME,
        "USERDOMAIN": swdtk.USERDOMAIN,
        "SESSIONID": swdtk.SESSINID,
        "HOPELOGON": swdtk.HOPELOGON,
        "logkind": "29",
        "site": site,
        "process": process,
        "date": String(timeStamp)
    };

    // FSW01EJRへメッセージを送信
    postMessage(port, message);
}

/**
 * 送信するダウンロード禁止ログ情報をログ化インタフェースへ渡します。
 *
 * @param {} port Nativeとの通信ポート
 * @param {} process プロセス名
 * @param {} site サイト名
 * @param {} timeStamp タイムスタンプ
 */
export function createDownloadDenySendingLog(port, site, process, timeStamp)
{
    const swdtk = chrome.windows.swdtk;

    var message =
    {
        "USERNAME": swdtk.USERNAME,
        "USERDOMAIN": swdtk.USERDOMAIN,
        "SESSIONID": swdtk.SESSINID,
        "HOPELOGON": swdtk.HOPELOGON,
        "logkind": "30",
        "site": site,
        "process": process,
        "date": String(timeStamp)
    };

    // fsw01ejrへメッセージを送信
    postMessage(port, message);
}

/**
 * 送信するURL付きウィンドウタイトルログ情報をログ化インタフェースへ渡します。
 * @param {} port Nativeとの通信ポート
 * @param {} process プロセス名
 * @param {} site サイト名
 * @param {} timeStamp タイムスタンプ
 */
export function createURLAccessSendingLog(port, site, process, title, url, timeStamp)
{
    const swdtk = chrome.windows.swdtk;

//PH22332 20220926 CHG S H.HONMA
    var decodeURL = decodeURIComponent(url);

    var jsonEncodeURL = "";
    for (var i = 0; i < decodeURL.length; i++) {
        var ch = decodeURL.charAt(i);
        if (ch == '{') {
            jsonEncodeURL += "%7B";
        }
        else if (ch == '}') {
            jsonEncodeURL += "%7D";
        }
        else if (ch == '[') {
            jsonEncodeURL += "%5B";
        }
        else if (ch == ']') {
            jsonEncodeURL += "%5D";
        }
        else {
            jsonEncodeURL += ch;
        }
    }

    var message =
    {
        "USERNAME": swdtk.USERNAME,
        "USERDOMAIN": swdtk.USERDOMAIN,
        "SESSIONID": swdtk.SESSINID,
        "HOPELOGON": swdtk.HOPELOGON,
        "logkind": "17",
        "site": site,
        "process": process,
        "title": escapeString(title),
//      "url": decodeURIComponent(url),
        "url": jsonEncodeURL,
        "date": String(timeStamp),
    };
//PH22332 20220926 CHG E H.HONMA

    // fsw01ejrへメッセージを送信
    postMessage(port, message);
}

/**
 * 現在のURLをファイルに出力するための情報をインタフェースへ渡します。
 * @param {} port Nativeとの通信ポート
 * @param {} url URL
 * @param {} browser ブラウザ名
 * @param {} timeStamp タイムスタンプ
 */
export function storeUrl(port, url, timeStamp, browser)
{
//PH22332 20220926 CHG S H.HONMA
    var decodeURL = decodeURIComponent(url);

    var jsonEncodeURL = "";
    for (var i = 0; i < decodeURL.length; i++) {
        var ch = decodeURL.charAt(i);
        if (ch == '{') {
            jsonEncodeURL += "%7B";
        }
        else if (ch == '}') {
            jsonEncodeURL += "%7D";
        }
        else if (ch == '[') {
            jsonEncodeURL += "%5B";
        }
        else if (ch == ']') {
            jsonEncodeURL += "%5D";
        }
        else {
            jsonEncodeURL += ch;
        }
    }

var message =
    {
        "__type": "StoreUrl",
//      "url": url,
        "url": jsonEncodeURL,
        "date": timeStamp,
        "browser": browser
    };
//PH22332 20220926 CHG E H.HONMA

    // fsw01ejrへメッセージを送信
    postMessage(port, message);
}

/**
 * 送信するダウンロード禁止ログ情報をログ化インタフェースへ渡します。
 * @param {} port Nativeとの通信ポート
 * @param {} site サイト名
 * @param {} process プロセス名
 * @param {} timeStamp タイムスタンプ
 */
export function createURLAccessDenySendingLog(port, site, process, timeStamp, tabid)
{
    const swdtk = chrome.windows.swdtk;

    var message =
    {
        "USERNAME": swdtk.USERNAME,
        "USERDOMAIN": swdtk.USERDOMAIN,
        "SESSIONID": swdtk.SESSINID,
        "HOPELOGON": swdtk.HOPELOGON,
        "logkind": "36",
        "site": site,
        "process": process,
        "date": String(timeStamp),
        "tab-id": String(tabid)
    };

    // fsw01ejrへメッセージを送信
    postMessage(port, message);
}

/**
 *
 * @param {*} mailAddresses
 * @returns
 */
export function concatMailAddresses(mailAddresses)
{
    var buffer = '';
    if (!isUndefinedOrNull(mailAddresses)) {
        for (var i = 0; i < mailAddresses.length; i++) {
            if (i != 0) {
                buffer += constants.UTF16_KORON;
            }
            try {
                buffer += decodeURIComponent(escape(mailAddresses[i]));
            } catch (error) {
                buffer += mailAddresses[i];
            }
        }
    }
    return buffer;
}

/**
 *
 * @param {*} fileNaems
 * @returns
 */
export function concatFileNames(fileNaems)
{
    var buffer = '';
    if (!isUndefinedOrNull(fileNaems)) {
        for (var i = 0; i < fileNaems.length; i++) {
            if (i != 0) {
                buffer += constants.UTF16_KORON;
            }
            try {
                buffer += decodeURI(escape(fileNaems[i]));
            } catch (error) {
                buffer += fileNaems[i];
            }
        }
    }
    return buffer;
}

/**
 * 指定したサイトがリストに含まれるかを判定します。
 * @param whitelist 許可サイトのリスト
 * @param hostname サイトのホスト名
 * @return
 */
export function isInList(sitelist, hostname)
{
    if (isUndefinedOrNull(sitelist) || isUndefinedOrNull(hostname)) {
        logger.error(`内部エラーが発生しました。（詳細: ホワイト/ブラックリスト内の検索に失敗しました (function isInList)）`);
        return false;
    }
    for (var i = 0; i < sitelist.length; i++) {
        if (hostname.toLowerCase().includes(sitelist[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}

/**
 * リクエストIDを入力としてrequestBodyを取得する
 * @param bodies リクエストボディを格納している配列
 * @param requestId リクエストID
 * @return requestBody 対象のリクエストボディ
 */
export function getBody(bodies, requestId)
{
    if (isUndefinedOrNull(bodies) || isUndefinedOrNull(requestId)) {
        return null;
    }
    for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].requestId == requestId) {
            return bodies[i].requestBody;
        }
    }
    return null;
}

/**
 * URLからホスト・ドメインを取得する。
 * @param url URL
 * @returns ホスト・ドメイン
 */
export function extractHostDomain(url)
{
    var host_domain;

    if (isUndefinedOrNull(url)) {
        return "";
    }

    if (url.indexOf("://") > -1) {
        host_domain = url.split('/')[2];
    }
    else {
        host_domain = url.split('/')[0];
    }

    host_domain = host_domain.split(':')[0];

    return host_domain;
}

/**
 * URLアクセス可否判定
 * @param webOpePolicy WebOpePolicy
 * @param url URL
 * @return true:アクセスOK, false:アクセスNG
 */
export function IsUrlAccessible(webOpePolicy, url)
{
    if (isUndefinedOrNull(webOpePolicy) || isUndefinedOrNull(url)) {
        return true;
    }

    if (webOpePolicy.web_access_forbid == "0") {
        return true;
    }

    // URLからサーバ名（ドメイン名）を取得
    var serverName = GetServerNameFromURL(url);
    if ("" == serverName){
        return true;
    }

    // 固有対応：URL文字列一覧の末尾に'/'を含むため、URLから抽出したサーバ名に'/'を結合する
    serverName = serverName +'/';

    if (webOpePolicy.web_access_type == "0") {
        // アクセス禁止サイト指定
        if (isInList(webOpePolicy.web_site_fmt ,serverName)) {
            // 禁止サイトに指定されている
            return false;
        } else {
            return true;
        }
    } else if (webOpePolicy.web_access_type == "1") {
        // アクセス許可サイト指定
        if (isInList(webOpePolicy.web_site_fmt ,serverName)) {
            // 許可サイトに指定されている
            return true;
        } else {
            return false;
        }
    }

    return true;
}

/**
 * URLからサーバ名(ドメイン名)を取得する
 * @param url URL
 * @return サーバ名（ドメイン名）
 */
export function GetServerNameFromURL(url)
{
    var indexWork = -1;
    var indexHead = 0;
    var indexTail = -1;

    // プロトコルが終わる位置を先頭とする
    indexWork = url.indexOf('://');
    if (indexWork < 0){
        return "";
    }
    indexHead = indexWork + ('://').length;
    var urlWork = url.substr(indexHead);

    // プロトコルが終わって最初の"/"の位置を末尾とする
    indexTail = urlWork.indexOf('/');
    if (indexTail < 0){
        indexTail = urlWork.length;
    }

    var serverName = urlWork.substr(0, indexTail);

    return serverName;
}

/**
 * ウィンドウタイトルログの電文出力の有無
 * @param webOpePolicy WebOpePolicy
 * @param process プロセス名(ブラウザ)
 * @param title ウィンドウタイトルログ
 * @return true:電文出力する, false:しない
 */
export function isWindowLogSend(webOpePolicy, process, title)
{
    if (isUndefinedOrNull(webOpePolicy) || isUndefinedOrNull(process) || isUndefinedOrNull(title)) {
        return false;
    }

    if (webOpePolicy.web_access_log == "0") {
        return false;
    }

    var app;
    if(process === constants.FIREFOX) {
        app = constants.FIREFOX_EXE;
    } else if(process === constants.CHROME) {
        app = constants.CHROME_EXE;
    } else if(process === constants.EDGE) {
        app = constants.EDGE_EXE;
    }

    var filter_num = webOpePolicy.web_filter_num;

    switch (webOpePolicy.web_filter_type) {
    case "0":
        return true;
    case "1":
        return true;
    case "2":
            // WhiteList
            for (var i = 0; i < filter_num; i++) {
                // [プロセスEXE名]を空白に設定した場合
                if (webOpePolicy.web_filter_app[i] == "") {
                    if (title.toLowerCase().includes(webOpePolicy.web_filter_keyword[i].toLowerCase())) {
                        return true;
                    }
                }

                // [キーワード]を指定しない場合
                if (webOpePolicy.web_filter_keyword[i] == "") {
                    if (webOpePolicy.web_filter_app[i].toLowerCase() == app.toLowerCase()) {
                        return true;
                    }
                }

                if (webOpePolicy.web_filter_app[i].toLowerCase() == app.toLowerCase()) {
                    if (title.toLowerCase().includes(webOpePolicy.web_filter_keyword[i].toLowerCase())) {
                        return true;
                    }
                }
            }
        return false;
    case "3":
        // BlackList
        for (var i = 0; i < filter_num; i++) {
            // [プロセスEXE名]を空白に設定した場合
            if (webOpePolicy.web_filter_app[i] == "") {
                if (title.toLowerCase().includes(webOpePolicy.web_filter_keyword[i].toLowerCase())) {
                    return false;
                }
            }

            // [キーワード]を指定しない場合
            if (webOpePolicy.web_filter_keyword[i] == "") {
                if (webOpePolicy.web_filter_app[i].toLowerCase() == app.toLowerCase()) {
                    return false;
                }
            }

            if (webOpePolicy.web_filter_app[i].toLowerCase() == app.toLowerCase()) {
                if (title.toLowerCase().includes(webOpePolicy.web_filter_keyword[i].toLowerCase())) {
                    return false;
                }
            }
        }
        return true;
    default:
        return true;
    }
}

//#10325/#10328 20220630 ADD S FJ)Y.FURUICHI
/**
 * 重複フィルターの判定処理
 * @param webOpePolicy WebOpePolicy
 * @param tabid タブID
 * @param title ウィンドウタイトルログ
 * @return true:重複あり(ログ出力なし), false:重複なし(ログ出力あり)
 */
export function isDuplicatedLog(webOpePolicy, tabid, title)
{
    var ret = false;
    var isDupFilterEnabled = false;
    // アドオン用重複ログスイッチ
    switch (webOpePolicy.addon_web_dup_filter_type) {
    case "1":
        // 値が1もしくはそれ以外の数だった場合、従来の重複ポリシーに従う
        if (webOpePolicy.web_dup_filter_type == "2") {
            isDupFilterEnabled = true;
        } else {
            isDupFilterEnabled = false;
        }
        break;
    case "2":
        // 重複フィルタ強制有効
        isDupFilterEnabled = true;
        break;
    case "0":
    default:
        // 重複フィルタ強制無効
        isDupFilterEnabled = false;
        break;
    }

    if (isDupFilterEnabled == false) {
        // 重複フィルターは有効でないので、常にログ出力
        return false;
    }

    const swdtk  = chrome.windows.swdtk;
    const logger = swdtk.logger;

    // 重複フィルターが有効の場合
    var date = new Date();
	var timeStamp = date.getTime();

	var wth = new WindowTitleHistory(tabid, title, timeStamp);

    if (swdtk.WindowTitleHistoryManager.has(wth.key_tabId_title)) {
//#10322/#10327 20220826 ADD S FJ)H.HONMA
        logger.debug(`■重複テーブルにあり、${wth.key_tabId_title}`);
//#10322/#10327 20220826 ADD E FJ)H.HONMA
        // 重複テーブルにあれば、ログ出力しない
        ret = true;
    } else {
//#10322/#10327 20220826 ADD S FJ)H.HONMA
        logger.debug(`■重複テーブルになし、${wth.key_tabId_title}`);
//#10322/#10327 20220826 ADD E FJ)H.HONMA
        // 重複テーブルになければログ出力
        ret = false;
    }
    // 履歴テーブルに追加。更新の場合もレコード入れ替えのため追加を行う
    swdtk.WindowTitleHistoryManager.add(wth);

    return ret;
}
//#10325/#10328 20220630 ADD E FJ)Y.FURUICHI

// parseKeyValue
// =以降の文字列を取得する
export function parseKeyValue(value)
{
    if (isUndefinedOrNull(value)) {
        return false;
    }
    var index = value.indexOf("=")

    if (index > -1) {
        return value.slice(index + 1);
    } else {
        return "";
    }
}

// @param headers リクエストヘッダー
// @param headerName    ヘッダーの名前
// @return        指定したヘッダーの値
export function findHeader(headers, headerName)
{
    if (isUndefinedOrNull(headers) || isUndefinedOrNull(headerName)) {
        return "";
    }

    for (let i = 0; i < headers.length; i++) {
        if (headers[i].name.toLowerCase() == headerName.toLowerCase()) {
            return headers[i].value;
        }
    }

    // 該当するヘッダーがない場合、空文字を返す
    return "";
}

// 100を上限とした配列
export function pushArray(arr, item)
{
    if (!isUndefinedOrNull(arr) && !isUndefinedOrNull(item)){
        arr.unshift(item);  // 先頭に追加
        if (arr.length == 101) {
            arr.pop();  // 最後尾を削除
        }
    }
}

export function checkURL(str)
{
    if (isUndefinedOrNull(str)) {
        return false;
    }
    if (str.match(/(http[s]?|ftp):\/\//) == null) {
        return false
    }
    else {
        return true;
    }
}

// @param date 日付オブジェクト
// @param format 書式フォーマット
export function formatDate(date, format)
{
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
};

export function escapeString(message)
{
    var workstr = message;

    workstr = workstr.replace(/\$/g, '(U+0024)');

    // エスケープ対象文字(HTML)
    workstr = workstr.replace(/\"/g, '$(0x22)');        // ダブルクォーテーション
    workstr = workstr.replace(/\'/g, '$(0x27)');        // シングルクォーテーション
    workstr = workstr.replace(/&/g, '$(0x26)');         // アンパサンド
    workstr = workstr.replace(/\//g, '$(0x2f)');        // スラッシュ
    workstr = workstr.replace(/</g, '$(0x3c)');         // 開始山括弧
    workstr = workstr.replace(/>/g, '$(0x3e)');         // 終了山括弧

    // エスケープ対象文字(JSON)
    workstr = workstr.replace(/{/g, '$(0x7b)');         // 開始波括弧
    workstr = workstr.replace(/}/g, '$(0x7d)');         // 終了波括弧
    workstr = workstr.replace(/\[/g, '$(0x5b)');        // 開始角括弧
    workstr = workstr.replace(/]/g, '$(0x5d)');         // 終了角括弧
    workstr = workstr.replace(/\\b/g, '$(0x08)');       // BS（後退）
    workstr = workstr.replace(/\t/g, '$(0x09)');        // HT（水平タブ）
    workstr = workstr.replace(/\f/g, '$(0x0c)');        // FF（改頁）
    workstr = workstr.replace(/\n/g, '$(0x0a)');        // LF（改行）
    workstr = workstr.replace(/\r/g, '$(0x0d)');        // CR（復帰）
    workstr = workstr.replace(/\\/g, '$(0x5c)');        // バックスラッシュ

    return workstr;
}

//#10325/#10328 20220630 ADD S FJ)Y.FURUICHI
// @param str 文字列
// @param iCutNum 切断する文字数(半角換算)
// @return        切断後の文字列
export function sliceWindowTitle(str, iCutNum)
{
    var ulRetLen = 0;
    var result = "";
    var i = 0;

    if (isUndefinedOrNull(str)) {
        return "";
    }

    // 1文字ずつチェックしていく
    for (i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((0x0000 <= c) && (c <= 0x007f)){
            // シングルバイト文字
            // DTKでは半角1文字として扱う
            if (iCutNum >= (ulRetLen + 1)) {
                ulRetLen += 1;
            } else {
                // ここまで来たら処理成功とする
                break;
            }
        } else if ((0x0080 <= c) && (c <= 0x07ff)) {
            // 2バイトのマルチバイト文字
            // DTKでは全角1文字として扱う
            if (iCutNum >= (ulRetLen + 2)) {
                ulRetLen += 2;
            } else {
                // ここまで来たら処理成功とする
                break;
            }
        } else if ((0x0800 <= c) && (c <= 0xD7FF)) {
            // 3バイトのマルチバイト文字
            // DTKでは全角1文字として扱う
            if (iCutNum >= (ulRetLen + 2)) {
                ulRetLen += 2;
            } else {
                // ここまで来たら処理成功とする 
                break;
            }
        } else if ((0xD800 <= c) && (c <= 0xDBFF)) {
            // 4バイトのマルチバイト文字
            // DTKでは全角2文字として扱う
            // 0xD800 - 0xDBFF (上位サロゲート High Surrogates)
            // 0xDC00 - 0xDFFF (下位サロゲート Low Surrogates)

            // サロゲートペアの下位サロゲートの異常チェック
            var c_low = str.charCodeAt(i+1);
            if (!((0xDC00 <= c_low) && (c_low <= 0xDFFF))) {
                // 異常があったため処理終了
                break;
            }

            if (iCutNum >= (ulRetLen + 4)) {
                ulRetLen += 4;
                // 下位サロゲートの解析は終わっているため次へ
                i++;
            } else {
                // ここまで来たら処理成功とする
                break;
            }
        } else if ((0xE000 <= c) && (c <= 0xFFFF)) {
            // 3バイトのマルチバイト文字
            // DTKでは全角1文字として扱う
            if (iCutNum >= (ulRetLen + 2)) {
                ulRetLen += 2;
            } else {
                // ここまで来たら処理成功とする
                break;
            }
        } else {
            // undefined code point in UTF-16
            // 異常な文字が入ってきたので、それまででbreak
            break;
        }
    }

    // 文字列の最後、または最大文字数で切断
    result = str.slice(0, i);

    return result;
}
//#10325/#10328 20220630 ADD E FJ)Y.FURUICHI

/**
 * ブラウザが 'Google Chrome' かどうか判定します。
 *
 * @return ブラウザが 'Google Chrome' の場合は true、そうでない場合は false
 */
export function isChrome()
{
    if (chrome.windows.swdtk.browser === constants.CHROME) {
        return true;
    }
    return false;
}

/**
 * ブラウザが 'Microsoft Edge' かどうか判定します。
 *
 * @return ブラウザが 'Microsoft Edge' の場合は true、そうでない場合は false
 */
export function isMSEdge()
{
    if (chrome.windows.swdtk.browser === constants.EDGE) {
        return true;
    }
    return false;
}

/**
 * ブラウザが 'Firefox' かどうか判定します。
 *
 * @return ブラウザが 'Firefox' の場合は true、そうでない場合は false
 */
export function isFirefox()
{
    if (chrome.windows.swdtk.browser === constants.FIREFOX) {
        return true;
    }
    return false;
}

/**
 * 現在時刻を返します。
 *
 * @returns 現在時刻
 */
export function getTimeStamp()
{
    var date = new Date();
    var timeStamp = date.getTime();
    date = null;
    return timeStamp;
}

/**
 * タブのタイトルとURLが指定されたものと同一かどうかを判定します。
 *
 * @param {Object} tab 現在のタブ情報
 * @param {String} title 比較するタイトル
 * @param {String} url 比較するURL
 * @returns タブのタイトルとURLが指定されたものと同一の場合は true、そうでない場合は false
 */
export function isSameTitleAndURL(tab, title, url)
{
    if ((tab.title == title) && (tab.url == url)) {
        return true;
    }
    return false;
}

/**
 * タブのタイトルとURLが空文字列かどうかを判定します。
 *
 * @param {Object} tab 現在のタブ情報
 * @returns タブのタイトルとURLが空文字列の場合は true、そうでない場合は false
 */
export function isEmptyTitleAndURL(tab)
{
    if ((tab.title == "") && (tab.id == "")) {
        return true;
    }
    return false;
}
