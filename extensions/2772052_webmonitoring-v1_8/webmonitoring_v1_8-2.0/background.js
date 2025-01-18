//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// インポート宣言
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

import * as constants from "./lib/constants.js"
import * as commons from "./lib/commons.js"
import * as download from "./lib/download.js"
import * as upload from "./lib/upload.js"
import * as webmail from "./lib/webmail.js"
import * as outlook from "./lib/outlook.js"
import * as outlook_contentscript from "./lib/outlook_content_scripts.js"
import { WindowTitleHistoryManager } from "./lib/window_title_history.js"
import WebOpePolicy from "./lib/policy.js";
import Mail from "./lib/mail.js"
import Logger from "./lib/logger.js"

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// 共通変数
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.windows.swdtk = {};

/**
 * NativeHostの名前を格納します。
 * @type {String}
 */
chrome.windows.swdtk.nativeHostName = "";

/**
 * NativeHostとの通信ポートを格納します。
 * @type {Object}
 */
chrome.windows.swdtk.port = null;

/**
 * WEB操作ログのポリシー情報を格納します。
 * @type {WebOpePolicy}
 */
chrome.windows.swdtk.webOpePolicy = new WebOpePolicy();

/**
 * RequestBodyをonBeforeSendHeadersで処理するための配列（上限：100）
 * @type {Object}
 */
chrome.windows.swdtk.bodies = [];

/**
 * Firefoxで同一のリクエストが２度発生する問題を回避するためのコレクション。
 * @type {Set}
 */
chrome.windows.swdtk.DuplicateSuppression = new Set();

/**
 * 各タブ毎にログインユーザー名（メール送信者）を管理します。
 * @type {Map}
 */
chrome.windows.swdtk.WebMailLogonManager = new Map();

/**
 * 現在操作中のメールを表すメールオブジェクト
 * @type {Object}
 */
chrome.windows.swdtk.CurrentEmail = null;

/**
 * メールオブジェクトを管理します。
 * @type {Map}
 */
chrome.windows.swdtk.EmailManager = new Map();

/**
 * メールの添付ファイルを管理します。
 * @type {Map}
 */
chrome.windows.swdtk.EmailAttachmentsManager = new Map();

//#10837 20230110 ADD S
/**
 * 'GetAttachmentPreviews'を無視します。
 * @type {Boolean}
 */
chrome.windows.swdtk.IgnoreGetAttachmentPreviews = false;
//#10837 20230110 ADD E
//#10837 20230110 ADD S
chrome.windows.swdtk.LastEmailAction = "";
//#10837 20230110 ADD E

/**
 * 現在のメール編集方式を表すフラグ
 * @type {Boolean}
 */
chrome.windows.swdtk.MailDeepLink = true;

/**
 * 現在のアクティブメールウィンドウID
 * @type {Number}
 */
chrome.windows.swdtk.ActiveMailWinId = null;

/**
 * 現在のアクティブメールウィンドウタブID
 * @type {Number}
 */
chrome.windows.swdtk.ActiveMailTabId = null;

/**
 * アップロード禁止設定
 * @type {Boolean}
 */
chrome.windows.swdtk.isProhibitUpload = false;

/**
 * ダウンロード禁止設定
 * @type {Boolean}
 */
chrome.windows.swdtk.isProhibitDownload = false;

/**
 * ブラウザ名
 * @type {String}
 */
chrome.windows.swdtk.browser = commons.GetBrowserName();

/**
 * BOXアップロードでリトライされた場合のフラグ
 * @type {Boolean}
 */
chrome.windows.swdtk.is_retry_box = false;

/**
 * BOXでのアップロードが開始した時点のセッションID（上限：100）
 * @type {Object}
 */
chrome.windows.swdtk.box_sessionIds = [];

/**
 * OneDrive(Aspx)でのアップロードのGUID（上限：100）
 * @type {Object}
 */
chrome.windows.swdtk.oneDriveAspx_guids = [];

/**
 * Dropboxでアップロードしたファイルのキー（上限：100）
 * @type {Object}
 */
chrome.windows.swdtk.dropbox_keys = [];

/**
 * 
 * @type {Boolean}
 */
chrome.windows.swdtk.isTitleGet = false;

/**
 * 
 * @type {Boolean}
 */
chrome.windows.swdtk.isUrlCheck = false;

/**
 * 
 * @type {String}
 */
chrome.windows.swdtk.prevUrl = "";

/**
 * 直近でアクセスされたURL（ホスト名取得のためにも使用）
 * @type {String}
 */
chrome.windows.swdtk.lastUrl = "";

/**
 * 直近でアクセスされたサイトのタイトル
 * @type {String}
 */
chrome.windows.swdtk.lastTitle = "";

/**
 * 直近で削除されたタブのID
 * @type {Number}
 */
chrome.windows.swdtk.lastDeletedTabId = -1;

/**
 * タブIDとそのタブの最新URLを記録
 * @type {Object}
 */
chrome.windows.swdtk.TabInfo = {};

/**
 * ダウンロードIDとダウンロードが実施されたアクセスバーのURLを取得（Firefox以外で使用）
 * @type {Object}
 */
chrome.windows.swdtk.DownloadInfo = {};

/**
 * ダウンロードIDとダウンロードファイル名を保存
 * @type {Object}
 */
chrome.windows.swdtk.DownloadFile = {};

/**
 * 
 * @type {String}
 */
chrome.windows.swdtk.GoogleDrive_DownStartUrl = "";

/**
 * 
 * @type {String}
 */
chrome.windows.swdtk.DropBox_DownStartUrl = "";

/**
 * 
 * @type {String}
 */
chrome.windows.swdtk.OneDriveApi_DownStartUrl = "";

/**
 * 
 * @type {String}
 */
chrome.windows.swdtk.OneDriveAspx_DownStartUrl = "";

/**
 * ユーザー名を表す文字列
 * @type {String}
 */
chrome.windows.swdtk.USERNAME = "";

/**
 * ドメイン名を表す文字列
 * @type {String}
 */
chrome.windows.swdtk.USERDOMAIN = "";

/**
 * セッションIDを表す文字列
 * @type {String}
 */
chrome.windows.swdtk.SESSINID = "";

/**
 * HOPEログオン状態を表すフラグ
 * @type {String}
 */
chrome.windows.swdtk.HOPELOGON = "";

//#10322/#10327 20220620 ADD S FJ)Y.FURUICHI
/**
 * 重複ログを記録するテーブル
 * @type {Object}
 */
chrome.windows.swdtk.WindowTitleHistoryManager = null;
//#10322/#10327 20220620 ADD E FJ)Y.FURUICHI
//#10322/#10327 20220727 ADD S FJ)H.HONMA
/**
 * 前回のアクティブなタブID
 * @type {Number}
 */
chrome.windows.swdtk.lastActiveTabId = -1;
//#10322/#10327 20220727 ADD E FJ)H.HONMA

/**
 * トレースログフラグ
 * @type {String}
 */
chrome.windows.swdtk.bTraceLogSW = '0'

/**
 * Loggerオブジェクト
 * @type {Object}
 */
chrome.windows.swdtk.logger = null;

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// Native Host Connection
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

if (chrome.windows.swdtk.browser === constants.EDGE) {
    chrome.windows.swdtk.nativeHostName = "com.fujitsu.dtk.edge.helper";
}
else {
    chrome.windows.swdtk.nativeHostName = "com.fujitsu.dtk.helper"
}

export function connect_fsw01ejr()
{
    const swdtk = chrome.windows.swdtk;

    swdtk.port = chrome.runtime.connectNative(swdtk.nativeHostName);
    swdtk.port.onMessage.addListener(onNativeMessage);
    swdtk.port.onDisconnect.addListener(onDisconnected);

    if (swdtk.logger != null) {
        swdtk.logger = null;
    }
    swdtk.logger = new Logger(swdtk.browser, swdtk.port);
}

function checkConnect_fsw01ejr()
{
    const swdtk = chrome.windows.swdtk;

    if (commons.isUndefinedOrNull(swdtk.port)) {
        connect_fsw01ejr();
    }
}

function onNativeMessage(message)
{
    const swdtk  = chrome.windows.swdtk;
    const logger = swdtk.logger;

    if (message['message-type'] == 'TraceLevel') {
        swdtk.bTraceLogSW = message['bTraceLogSW'];
        logger.setTraceLevel(parseInt(swdtk.bTraceLogSW, 10));
        logger.info(`設定を受信しました。（{bTraceLogSW: ${swdtk.bTraceLogSW}}）`);
        return;
    }

    if (message["message-type"] == "policy") {
        // ポリシー設定
        swdtk.webOpePolicy.setPolicy(message);
//#10322/#10327 20220620 ADD S FJ)Y.FURUICHI
        // 重複ログ管理オブジェクト生成
        if (commons.isUndefinedOrNull(swdtk.WindowTitleHistoryManager)) {
            var duplicatedRecordNum = parseInt(swdtk.webOpePolicy.addon_web_dup_filter_num);
            if (duplicatedRecordNum < 100) {
                duplicatedRecordNum = 100;
            } else if (duplicatedRecordNum > 10000) {
                duplicatedRecordNum = 10000;
            }
            swdtk.WindowTitleHistoryManager = new WindowTitleHistoryManager(duplicatedRecordNum);
        }
//#10322/#10327 20220620 ADD E FJ)Y.FURUICHI
        logger.debug(`設定を受信しました。（${swdtk.webOpePolicy.toString()}）`)
        swdtk.USERNAME   = swdtk.webOpePolicy.USERNAME;
        swdtk.USERDOMAIN = swdtk.webOpePolicy.USERDOMAIN;
        swdtk.SESSINID   = swdtk.webOpePolicy.SESSIONID;
        swdtk.HOPELOGON  = swdtk.webOpePolicy.HOPELOGON;

        if(swdtk.webOpePolicy.updown_forbid == "1") {
            var updown_type_num = parseInt(swdtk.webOpePolicy.updown_type);
            if((updown_type_num & 0x01) == 0x01) {
                // アップロードを禁止する
                swdtk.isProhibitUpload = true;
            } else {
                swdtk.isProhibitUpload = false;
            }
            if((updown_type_num & 0x02) == 0x02) {
                // ダウンロードを禁止する
                swdtk.isProhibitDownload = true;
            } else {
                swdtk.isProhibitDownload = false;
            }
        } else {
            swdtk.isProhibitUpload   = false;
            swdtk.isProhibitDownload = false;
        }
        // ポリシー変更された場合、現在アクティブなページが禁止サイトであれば禁止する
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if (commons.isUndefinedOrNull(tabs[0])) {
                return;
            }
            const tab = tabs[0];
            const hostname  = commons.extractHostDomain(tab.url);
            const timeStamp = commons.getTimeStamp();
            if (commons.checkURL(tab.url)) {
                if(commons.IsUrlAccessible(swdtk.webOpePolicy, tab.url)) {
                    // 禁止サイトでなければ何もしない
                    return;
                }
                // URLアクセスを禁止する
                // 削除するタブのIDが直近で削除したタブIDと異なる場合は禁止する
                // 場合によっては2度禁止処理が通る可能性があるため
                if (tab.id != swdtk.lastDeletedTabId) {
                    checkConnect_fsw01ejr();
                    logger.debug(`URLアクセス禁止（URL：${tab.url}）`);
                    commons.createURLAccessDenySendingLog(swdtk.port, hostname, swdtk.browser, timeStamp, tab.id);
                    swdtk.lastDeletedTabId = tab.id;
                    return;
                }
            }
        });
    }

    // URLアクセス禁止のレスポンスが帰ってきた場合
    //block-urlの場合
    if (message["message-type"] == "block-url") {
        var id = message["tab-id"];
        chrome.tabs.remove(id);
    }
}

function onDisconnected()
{
    chrome.windows.swdtk.port = null;
}

// fsw01ejr.exe への接続開始
connect_fsw01ejr();

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// OnBeforeRequest
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        const swdtk  = chrome.windows.swdtk;
        const logger = swdtk.logger;

        if (commons.isUndefinedOrNull(details)) {
            logger.error(`内部エラーが発生しました。（詳細: details='undefind or null'）`);
            return;
        }

        // onBeforeSendHeadersでリクエストボディを参照できるように、外部変数に格納
        var body = { requestId:details.requestId, requestBody:details };

        commons.pushArray(swdtk.bodies, body);
    },
    // filters
    {
        urls: [ "<all_urls>" ],
        types: [
            "main_frame",
            "sub_frame",
            "xmlhttprequest",
        ]
    },
    // extraInfoSpec
    [ "requestBody" ]
);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// OnBeforeSendHeaders
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details)
    {
        const swdtk  = chrome.windows.swdtk;
        const logger = swdtk.logger;

        if (commons.isUndefinedOrNull(details)) {
            logger.error(`内部エラーが発生しました。（詳細: details='undefind or null'）`);
            return;
        }

        // Firefox での重複処理防止
        if (commons.isFirefox()) {
            var duplicateKey = details.requestId + '##' + details.url;
            if (swdtk.DuplicateSuppression.has(duplicateKey)) {
                // 処理済のリクエスト URL をコレクション(Set) から削除する
                swdtk.DuplicateSuppression.delete(duplicateKey);
                return;
            } else {
                // 未処理のリクエスト URL をコレクション(Set) へ格納する
                swdtk.DuplicateSuppression.add(duplicateKey);
            }
        }

        // requestIdが一致するリクエストボディを取得する
        var bodyDetails = commons.getBody(swdtk.bodies, details.requestId);

        // リクエスト元のURLを取得
        var refererUrl = swdtk.TabInfo[details.tabId];
// #12337 20240219 ADD S
        if (commons.isUndefined(refererUrl)) {
            if (commons.isUndefined(details.initiator)) {
                refererUrl = details.initiator;
            }
            if (commons.isUndefined(refererUrl)) {
                refererUrl = details.originUrl;
            }
            if (commons.isUndefined(refererUrl)) {
                refererUrl = details.url;
            }
        }
        var hostname = commons.extractHostDomain(refererUrl);
// #12337 20240219 ADD E

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // ダウンロードログ処理開始
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        {
            // 'Google Drive' でのダウンロードスタートを検知する
            if (download.downStart_GoogleDrive(details)) {
                swdtk.GoogleDrive_DownStartUrl = swdtk.TabInfo[details.tabId];
                logger.debug(`'Google Drive' ダウンロード開始時のURLを取得（URL：${swdtk.GoogleDrive_DownStartUrl}）`);
                return;
            }

            // 'DropBox' でのダウンロードスタートを検知する
            if (download.downStart_DropBox(details)) {
                swdtk.DropBox_DownStartUrl = swdtk.TabInfo[details.tabId];
                logger.debug(`'DropBox' ダウンロード開始時のURLを取得（URL：${swdtk.DropBox_DownStartUrl}）`);
                return;
            }

            // 'OneDrive(aspx)' でのダウンロードスタートを検知する
            if (download.downStart_OneDriveAspx(details, bodyDetails)) {
                swdtk.OneDriveAspx_DownStartUrl = swdtk.TabInfo[details.tabId];
                logger.debug(`'OneDrive(aspx)' ダウンロード開始時のURLを取得（URL：${swdtk.OneDriveAspx_DownStartUrl}）`);
                return;
            }

// #xxxxx 20240417 ADD S
            // 'OneDrive(API)' でのダウンロードスタートを検知する
            if (download.downStart_OneDriveApi(details, bodyDetails)) {
                swdtk.OneDriveApi_DownStartUrl = swdtk.TabInfo[details.tabId];
                logger.debug(`'OneDrive(API)' ダウンロード開始時のURLを取得（URL：${swdtk.OneDriveApi_DownStartUrl}）`);
                return;
            }
// #xxxxx 20240417 ADD E
        }

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // アップロードログ処理開始
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        {
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // Google Drive の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

            var googleDrive_filenames = null;

            // アップロードファイル名を取得する
            googleDrive_filenames = upload.uploadGoogleDrive(bodyDetails);

            if (!commons.isUndefinedOrNull(googleDrive_filenames)) {
                if (googleDrive_filenames.length <= 0) {
                    return;
                }
                // アップロード禁止・電文作成
                if (swdtk.isProhibitUpload) {
                    if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                        // 許可サイトでない場合は禁止する
                        logger.debug(`Google Drive アップロード禁止（ホスト名：${hostname}）`);
                        // ファイル数分繰り返し
                        for (var i = 0; i < googleDrive_filenames.length; i++) {
                            checkConnect_fsw01ejr();
                            commons.createUploadDenySendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp);
                        }
                        return {cancel:true};
                    }
                }

                // アップロードログ電文作成
                if (swdtk.webOpePolicy.isWebOperationLog()) {
                    logger.debug(`Google Drive アップロード（ホスト名：${hostname}）`);
                    // ファイル数分繰り返し
                    for (var i = 0; i < googleDrive_filenames.length; i++) {
                        checkConnect_fsw01ejr();
                        commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, googleDrive_filenames[i], details.timeStamp);
                    }
                }

                return;
            }

            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // BOX の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

            // アップロードファイル名とその時のSessionIdを取得する
            var box_upload_info = null; // ファイル名とSessionIDを格納するObject
            box_upload_info = upload.uploadBox(bodyDetails);
            if (!commons.isUndefinedOrNull(box_upload_info)) {
                if (swdtk.isProhibitUpload) {
                    if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                        var idExist_flag = false;
                        for (let j = 0; j < swdtk.box_sessionIds.length; j++) {
                            if (swdtk.box_sessionIds[j].id == box_upload_info.sessionId) {
                                idExist_flag = true;
                                swdtk.box_sessionIds[j].count += 1;
                                if (swdtk.box_sessionIds[j].count == 2) {
                                    // 同じSessionIDで2回アップロードが行われた場合禁止ダイアログを取得する
                                    // ただし、3回目、4回目の場合は無視する
                                    swdtk.is_retry_box = true;
                                    break;
                                }
                            }
                        }
                        if (!idExist_flag) {
                            var session_item = {id:box_upload_info.sessionId, count:1};
                            commons.pushArray(swdtk.box_sessionIds, session_item);
                        }
                        if (box_upload_info.filename) {
                            if (swdtk.is_retry_box) {
                                checkConnect_fsw01ejr();
                                // 2回アップロードが行われた場合、禁止ダイアログを表示
                                logger.debug(`BOX アップロード禁止（ホスト名：${hostname}）`);
                                commons.createUploadDenySendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp);
                                // 3回目以降は禁止ダイアログを表示しない
                                swdtk.is_retry_box = false;
                            }
                        }
                        return {cancel:true};
                    }
                }
                // アップロードログ電文作成
                if (swdtk.webOpePolicy.isWebOperationLog()) {
                    checkConnect_fsw01ejr();
                    logger.debug(`BOX アップロード（ホスト名：${hostname}、ファイル名：${box_upload_info.filename}）`);
                    commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, box_upload_info.filename, details.timeStamp);
                }
                return;
            }

            // BOXアップロード（大容量ファイル）を検知する
            var box_large_filename = null;
            box_large_filename = upload.uploadBox_large(bodyDetails);
            if (!commons.isUndefinedOrNull(box_large_filename)) {
                // アップロード禁止・電文作成
                if (swdtk.isProhibitUpload) {
                    if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                        checkConnect_fsw01ejr();
                        // 許可サイトでない場合は禁止する
                        logger.debug(`BOX（大容量）アップロード禁止（ホスト名：${hostname}）`);
                        commons.createUploadDenySendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp);
                        return {cancel:true};
                    }
                }
                // アップロードログ電文作成
                if (swdtk.webOpePolicy.isWebOperationLog()) {
                    checkConnect_fsw01ejr();
                    logger.debug(`BOX（大容量）アップロード（ホスト名：${hostname}）`);
                    commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, box_large_filename, details.timeStamp);
                }
                return;
            }

            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // One Drive API の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

            // アップロード開始を検知してアップロード禁止ダイアログを出す
            // アップロード本体のリクエストでは、一度目のアップロードとリトライとの区別がつかないため
            // アップロード禁止・電文作成
            if (upload.upStart_OneDriveApi(commons.getBody(swdtk.bodies, details.requestId), details)) {
                if (swdtk.isProhibitUpload) {
                    if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                        checkConnect_fsw01ejr();
                        // 許可サイトでない場合は禁止ダイアログを出す
                        logger.debug(`OneDrive(API) アップロード禁止（ホスト名：${hostname}）`);
                        commons.createUploadDenySendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp);
                    }
                }
            }
            // アップロードファイル名を取得する
            var oneDriveApi_filename = null;
            oneDriveApi_filename = upload.uploadOneDriveApi(details);
            if (!commons.isUndefinedOrNull(oneDriveApi_filename)) {
                // アップロード禁止・電文作成
                if (swdtk.isProhibitUpload) {
                    if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                        // 許可サイトでない場合は禁止する
                        // 電文作成、禁止ダイアログの表示はしない
                        return {cancel:true};
                    }
                }
                // アップロードログ電文作成
                if (swdtk.webOpePolicy.isWebOperationLog()) {
                    checkConnect_fsw01ejr();
                    logger.debug(`OneDrive(API) アップロード（ホスト名：${hostname}、ファイル名：${oneDriveApi_filename}）`);
                    commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, oneDriveApi_filename, details.timeStamp);
                }
                return;
            }

            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // One Drive(.aspx) の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

            // アップロードファイル名を取得する
            //var oneDriveAspx_filename = null;
            var oneDriveAspx_upload_info = null; // ファイル名とSessionIDを格納するObject
            oneDriveAspx_upload_info = upload.uploadOneDriveAspx(details);
            if (!commons.isUndefinedOrNull(oneDriveAspx_upload_info)) {
                var isRepeatGuid = false; // 禁止するアップロードのGUIDが重複していなければTrue
                if (!commons.isUndefinedOrNull(oneDriveAspx_upload_info.guid)) {
                    if (oneDriveAspx_upload_info.guid == "") {
                        isRepeatGuid = false;
                    } else {
                        if (swdtk.oneDriveAspx_guids.includes(oneDriveAspx_upload_info.guid)) {
                            // 現在のGUIDが、アップロードGUIDリストに含まれている場合
                            isRepeatGuid = true;
                        } else {
                            // 重複していない場合アップロードGUIDリストに追加する
                            commons.pushArray(swdtk.oneDriveAspx_guids, oneDriveAspx_upload_info.guid);
                            isRepeatGuid = false;
                        }
                    }
                }
                if (!commons.isUndefinedOrNull(oneDriveAspx_upload_info.filename)) {
                    // アップロード禁止・電文作成
                    if (swdtk.isProhibitUpload) {
                        if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                            // 許可サイトでない場合は禁止する
                            if (!isRepeatGuid) {
                                checkConnect_fsw01ejr();
                                // GUIDが重複していな場合のみ禁止ととログ化を行う
                                logger.debug(`OneDrive(Axpx) アップロード禁止（ホスト名：${hostname}）`);
                                commons.createUploadDenySendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp);
                            }
                            // GUIDが重複している場合も、リクエストのキャンセルは行う
                            return {cancel:true};
                        }
                    }
                    // アップロードログ電文作成
                    if (swdtk.webOpePolicy.isWebOperationLog()) {
                        if (!isRepeatGuid) {
                            checkConnect_fsw01ejr();
                            logger.debug(`OneDrive(Axpx) アップロード（ホスト名：${hostname}、ファイル名：${oneDriveAspx_upload_info.filename}）`);
                            commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, oneDriveAspx_upload_info.filename, details.timeStamp);
                        }
                    }
                }
                return;
            }

            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // One Drive (Office365添付)の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

            // アップロードファイル名を取得する
            var oneDriveO365_filename = null;
            oneDriveO365_filename = upload.uploadOneDriveO365(details);
            // 禁止サイトの場合、アップロードを禁止する
            if (!commons.isUndefinedOrNull(oneDriveO365_filename)) {
                // アップロード禁止・電文作成
                if (swdtk.isProhibitUpload) {
                    if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                        checkConnect_fsw01ejr();
                        // 許可サイトでない場合は禁止する
                        logger.debug(`OneDrive(Office365) アップロード禁止（ホスト名：${hostname}）`);
                        commons.createUploadDenySendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp);
                        return {cancel:true};
                    }
                }
                // アップロードログ電文作成
                if (swdtk.webOpePolicy.isWebOperationLog()) {
                    checkConnect_fsw01ejr();
                    logger.debug(`OneDrive(Office365) アップロード（ホスト名：${hostname}、ファイル名：${oneDriveO365_filename}）`);
                    commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, oneDriveO365_filename, details.timeStamp);
                }
                return;
            }

            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // MultiPart の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

            // アップロードファイル名を取得する
            var multiPart_filename = null;
            multiPart_filename = upload.uploadMultiPart(commons.getBody(swdtk.bodies, details.requestId), details);
            // 禁止サイトの場合、アップロードを禁止する
            if (!commons.isUndefinedOrNull(multiPart_filename)) {
                // アップロード禁止・電文作成
                if (swdtk.isProhibitUpload) {
                    if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                        checkConnect_fsw01ejr();
                        // 許可サイトでない場合は禁止する
                        logger.debug(`Multi-Part アップロード禁止（ホスト名：${hostname}）`);
                        commons.createUploadDenySendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp);
                        return {cancel:true};
                    }
                }
                // アップロードログ電文作成
                if (swdtk.webOpePolicy.isWebOperationLog()) {
                    checkConnect_fsw01ejr();
//#xxxxx 20240417 CHG S
//                  logger.debug(`Multi-Part アップロード（ホスト名：${hostname}、ファイル名：${multiPart_filename}）`);
//                  commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, multiPart_filename, details.timeStamp);
                    for (let i = 0; i < multiPart_filename.length; i++) {
                        logger.debug(`Multi-Part アップロード (ホスト名：${hostname} ファイル名：${multiPart_filename[i]})`);
                        commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, multiPart_filename[i], details.timeStamp);
                    }
//#xxxxx 20240417 CHG E
                }
                return;
            }

            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // DropBox の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

//PH22304/PH22305 20220908 CHG S H.HONMA
            var dropbox_upload_info = null; // ファイル名とkeyを格納するObject
//          dropbox_upload_info = uploadDropBox(bodyDetails, details);
            dropbox_upload_info = upload.uploadDropBox(bodyDetails, details, swdtk.isProhibitUpload);
//PH22304/PH22305 20220908 CHG E H.HONMA
            if (!commons.isUndefinedOrNull(dropbox_upload_info)) {
                // アップロード禁止・電文作成
//PH22304/PH22305 20220908 CHG S H.HONMA
//              if (g_isProhibitUpload) {
                if (swdtk.isProhibitUpload && dropbox_upload_info.cancel) {
//PH22304/PH22305 20220908 CHG E H.HONMA
                    if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
                        checkConnect_fsw01ejr();
//PH22304/PH22305 20220908 CHG S H.HONMA
//                      // 許可サイトでない場合は禁止する
//                      logger.debug(`DropBox アップロード禁止 (ホスト名：${hostname})`);
//                      // アップロードリクエストの重複検知(HOME画面で発生する)
//                      if (!g_dropbox_keys.includes(dropbox_upload_info.key)) {
//                          // keyが登録されていなければ禁止ダイアログを出す
//                          createUploadDenySendingLog(g_port, hostname, g_Browser, details.timeStamp);
//                          pushArray(g_dropbox_keys, dropbox_upload_info.key);
//                      }
                        // 許可サイトでない場合は禁止する
                        logger.debug(`DropBox アップロード禁止（ホスト名：${hostname}）`);
                        commons.createUploadDenySendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp);
//PH22304/PH22305 20220908 CHG E H.HONMA
                        return {cancel:true};
                    }
                }
                // アップロードログ電文作成
                if (swdtk.webOpePolicy.isWebOperationLog()) {
                    checkConnect_fsw01ejr();
//#12301 20231121 CHG S
////PH22304/PH22305 20220908 CHG S H.HONMA
////                logger.debug(`DropBox アップロード (ホスト名：${hostname} ファイル名：${dropbox_upload_info.filename})`);
//                  logger.debug(`DropBox アップロード (ホスト名：${hostname}, ファイル名：${dropbox_upload_info.filename})`);
////PH22304/PH22305 20220908 CHG E H.HONMA
//                  createUploadSendingLog(g_port, hostname, g_Browser, dropbox_upload_info.filename, details.timeStamp);
                    for (var i = 0; i < dropbox_upload_info.filenames.length; i++) {
                        var filename = dropbox_upload_info.filenames[i];
                        logger.debug(`DropBox アップロード (ホスト名：${hostname}, ファイル名：${filename})`);
                        commons.createUploadSendingLog(swdtk.port, hostname, swdtk.browser, filename, details.timeStamp);
                    }
//#12301 20231121 CHG E
                }
                return;
            }
        }
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール送信ログ処理開始
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        // メール送信ログ取得ポリシーが 'ON' の場合
        if (swdtk.webOpePolicy.isEmailLog()) {

            var url = details.url;

            if (!webmail.isOutlook(url) && !webmail.isGmail(url)) {
                // Outlook for Microsoft 365/Outlook.com/Gmail 以外からの URL は無視する!!
                return;
            }

            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // Gmail, Gmail for work の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

            if (webmail.isGmail(url)) {
                var mail = webmail.sendWebMail_Gmail(bodyDetails);
                if (mail !== null) {
                    if (mail.isSendingOk()) {
                        logger.debug("メール送信判定OK!!");
                        checkConnect_fsw01ejr();
                        commons.createWebMailSendingLog(swdtk.port, hostname, swdtk.browser, bodyDetails.timeStamp, mail);
                    }
                }
                return;
            }

            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // Outlook for Microsoft 365/Outlook.com の場合
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

            if (webmail.isOutlook(url)) {
                var MailObj = webmail.sendWebMail_Outlook(bodyDetails, details, hostname);
                if (!commons.isUndefinedOrNull(MailObj)) {
                    var MailId = MailObj.getId();
                    if (MailObj.isSendingOk()) {
                        logger.debug("メール送信判定OK!!");
//DEBUG-S
//                      console.debug(">>> swdtk.EmailManager !!");
//                      console.debug(swdtk.EmailManager);
//DEBUG-E
                        logger.debug(`送信メールID: ${MailId}`);
                        if (swdtk.CurrentEmail != null) {
                            logger.debug(`編集メールID: ${swdtk.CurrentEmail.getId()}`);
                            if (MailId == swdtk.CurrentEmail.getId()) {
                                logger.debug(`メールID比較: 一致`);
//DEBUG-S
//                              console.debug(`メールID比較: 一致`);
//DEBUG-E
                                MailObj.setAttachments(swdtk.CurrentEmail.getAttachments());
                            } else if ('null' == swdtk.CurrentEmail.getId()) {
                                logger.debug(`メールID比較: null`);
//DEBUG-S
//                              console.debug(`メールID比較: null`);
//DEBUG-E
                                MailObj.setAttachments(swdtk.CurrentEmail.getAttachments());
                            } else {
                                logger.debug(`メールID比較: 不一致`);
//DEBUG-S
//                              console.debug(`メールID比較: 不一致`);
//DEBUG-E
                                //MailObj.setAttachments(swdtk.CurrentEmail.getAttachments());
                            }
                        }
                        checkConnect_fsw01ejr();
                        commons.createWebMailSendingLog(swdtk.port, hostname, swdtk.browser, details.timeStamp, MailObj);
                        swdtk.EmailManager.delete(MailId);
                        swdtk.CurrentEmail = null;
//DEBUG-S
//                      console.debug(">>> ↓↓↓ メール送信ログ !!");
//                      console.debug(MailObj);
//DEBUG-E
                        swdtk.IgnoreGetAttachmentPreviews = true;
                        return;
                    }
                    if (MailObj.getId() == 'null') {
                        swdtk.CurrentEmail = MailObj;
                    }
                }
            }
        }
    },
    // filters
    {
        urls: [ "<all_urls>" ],
        types: [
            "main_frame",
            "sub_frame",
            "xmlhttprequest",
        ]
    },
    // extraInfoSpec
    [
        "blocking",
        "requestHeaders",
        chrome.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS
    ].filter(Boolean)
);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// OnSendHeaders
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/*
chrome.webRequest.onSendHeaders.addListener(
    function(details)
    {
    },
    // filters
    {
        urls: [ "<all_urls>" ],
        types: [
            "main_frame",
            "sub_frame",
            "stylesheet",
            "script",
            "image",
            "font",
            "object",
            "xmlhttprequest",
            "ping",
            "csp_report",
            "media",
            "websocket"
        ]
    },
    // extraInfoSpec
    [ "requestHeaders" ]
);
*/

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// OnHeadersReceived
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/*
chrome.webRequest.onHeadersReceived.addListener(
    function(details)
    {
    },
    // filters
    {
        urls: [ "<all_urls>" ],
        types: [
            "main_frame",
            "sub_frame",
            "stylesheet",
            "script",
            "image",
            "font",
            "object",
            "xmlhttprequest",
            "ping",
            "csp_report",
            "media",
            "websocket"
        ]
    },
    // extraInfoSpec
    [ "responseHeaders" ]
);
*/

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// OnResponseStarted
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/*
chrome.webRequest.onResponseStarted.addListener(
    function(details)
    {
    },
    // filters
    {
        urls: [ "<all_urls>" ],
        types: [
            "main_frame",
            "sub_frame",
            "stylesheet",
            "script",
            "image",
            "font",
            "object",
            "xmlhttprequest",
            "ping",
            "csp_report",
            "media",
            "websocket"
        ]
    },
    // extraInfoSpec
    [ "responseHeaders" ]
);
*/

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// OnBeforeRedirect
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/*
chrome.webRequest.onBeforeRedirect.addListener(
    function(details)
    {
    },
    // filters
    {
        urls: [ "<all_urls>" ],
        types: [
            "main_frame",
            "sub_frame",
            "stylesheet",
            "script",
            "image",
            "font",
            "object",
            "xmlhttprequest",
            "ping",
            "csp_report",
            "media",
            "websocket"
        ]
    },
    // extraInfoSpec
    [ "responseHeaders" ]
);
*/

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// OnCompleted
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.webRequest.onCompleted.addListener(
    function(details)
    {
        const swdtk  = chrome.windows.swdtk;
        const logger = swdtk.logger;

        if (commons.isUndefinedOrNull(details)) {
            logger.error(`内部エラーが発生しました。（詳細: details='undefind or null'）`);
            return;
        }

        var url = details.url;
        if (!webmail.isOutlook(url) && !webmail.isGmail(url)) {
            // Outlook または Gmail 以外からの URL は無視する!!
            return;
        }

        // Firefox での重複処理防止
        if (commons.isFirefox()) {
            var duplicateKey = details.requestId + '##' + details.url;
            if (swdtk.DuplicateSuppression.has(duplicateKey)) {
                // 処理済のリクエスト URL をコレクション(Set) から削除する
                swdtk.DuplicateSuppression.delete(duplicateKey);
                return;
            } else {
                // 未処理のリクエスト URL をコレクション(Set) へ格納する
                swdtk.DuplicateSuppression.add(duplicateKey);
            }
        }

//#10829 20230105 CHG S
        commons.debugOutputWebRequest(constants.ON_COMPLETED, details);

        var action = outlook.getOnCompletedAction(details);
        switch (action) {
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // CreateAttachmentFromLocalFile
            // CreateAttachmentFromAttachmentDataProvider
            // ReferenceAttachmentFromAttachmentDataProvider
            // DeleteAttachment
            // CancelAttachment
            // GetAttachmentPreviews
//#10829 20221215 ADD S
            // GetSharingInformation
//#10829 20221215 ADD E
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            case constants.ACTION_CREATE_ATTACHMENT_FROM_LOCAL_FILE:
            case constants.ACTION_CREATE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER:
            case constants.ACTION_CREATE_REFERENCE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER:
            case constants.ACTION_DELETE_ATTACHMENT:
            case constants.ACTION_CANCEL_ATTACHMENT:
            case constants.ACTION_GET_ATTACHMENT_PREVIEWS:
            case constants.ACTION_ADD_ENTITY_FEEDBACK:
//#10829 20221215 ADD S
            case constants.ACTION_GET_SHARING_INFORMATION:
//#10829 20221215 ADD E
//#10837 20230110 ADD S
            case constants.ACTION_DELETE_ITEM:
//#10837 20230110 ADD E
                {
//#10837 20230110 ADD S
                    if (action == constants.ACTION_DELETE_ITEM) {
                        // 編集中メールを破棄した場合は現在編集中のメールオブジェクトをnullにする
                        swdtk.CurrentEmail = null;
                    }
                    if (action == constants.ACTION_GET_ATTACHMENT_PREVIEWS) {
                        // 'GetAttachmentPreviews'が無効化されている場合
                        // （※'CreateItem/UpdateItem' かつ、'MessageDisposition=SendAndSaveCopy' 直後の
                        //     'GetAttachmentPreviews' は無視する）
                        if (swdtk.IgnoreGetAttachmentPreviews) {
                            swdtk.IgnoreGetAttachmentPreviews = false;
                            return;
                        }
                    }
                    var MailId = 'null';

                    if (action == constants.ACTION_GET_ATTACHMENT_PREVIEWS) {
                        const TargetEmailActions = [
                            constants.ACTION_CREATE_ITEM,
                            constants.ACTION_UPDATE_ITEM,
                            constants.ACTION_GET_ITEM,
                            constants.ACTION_CREATE_ATTACHMENT_FROM_LOCAL_FILE,
                            constants.ACTION_CREATE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER,
                            constants.ACTION_DELETE_ATTACHMENT,
                        ];
                        // 'GetAttachmentPreviews'の直前のアクションがTargetEmailActionsの場合
                        // ※メールIDが確定するアクションの場合
                        if (TargetEmailActions.includes(swdtk.LastEmailAction)) {
                            if (swdtk.CurrentEmail != null) {
                                // 'GetAttachmentPreviews'に対する添付ファイル情報取得要求に、
                                // CurrentEmailのメールIDを付与する。
                                MailId = swdtk.CurrentEmail.getId();
                            }
//#10837 20230214 ADD S
                            swdtk.LastEmailAction = "";
//#10837 20230214 ADD E
                        }
                    }

                    outlook.getMailContent(
                        "__DTK_GetAttachmentRequest",
                        action,
                        details.requestId,
                        swdtk.ActiveMailWinId,
                        swdtk.ActiveMailTabId,
                        MailId,
                        "",
                        0);
//#10837 20230110 ADD E
                    break;
                }
//#10837 20230110 ADD S
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // BrowserExtension
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            case constants.ACTION_BROWSER_EXTENSION:
                {
//DEBUG-S
//                  console.debug(`>>> ${constants.ACTION_BROWSER_EXTENSION}`);
//DEBUG-E
                    var MailId = 'null';
                    outlook.getMailContent(
                        "__DTK_GetAttachmentRequest",
                        action,
                        details.requestId,
                        swdtk.ActiveMailWinId,
                        swdtk.ActiveMailTabId,
                        MailId,
                        "",
                        0);
                    break;
                }
//#10837 20230110 ADD E
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            // 上記以外
            //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
            case constants.ACTION_UNKNOWN:
            default:
                {
                    break;
                }
        }
//#10829 20230105 CHG E
    },
    // filters
    {
        urls: [ "<all_urls>" ],
        types: [
            "main_frame",
            "sub_frame",
            "xmlhttprequest",
        ]
    },
    // extraInfoSpec
    [ "responseHeaders" ]
);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// OnMessage
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.runtime.onMessage.addListener(
    function(request, sender, response)
    {
    }
);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// chrome.windows.OnFocusChanged
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.windows.onFocusChanged.addListener(
    function (windowId)
    {
//DEBUG-S
//      console.debug(`onFocusChanged`);
//DEBUG-E
        if (-1 == windowId) {
            // windowIdがマイナス値のときは情報が取得できない
            return;
        }

        const swdtk  = chrome.windows.swdtk;
        const logger = swdtk.logger;

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // ウィンドウタイトルログ取得処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        chrome.windows.get(windowId, { populate: true }, function (window)
        {
            // ウィンドウが非アクティブな場合
            if (window.focused == false) {
                // ウィンドウタイトルログを取得しない
                return;
            }
            chrome.tabs.query({ windowId: windowId, active: true }, function (tabs)
            {
                if (commons.isUndefinedOrNull(tabs[0])) {
                    return;
                }

                // 現在のタブIDを保存する
                swdtk.lastActiveTabId = tabs[0].id;
                // 現在のウィンドウID/タブID（Webメーラー用）を保存する
                swdtk.ActiveMailWinId = windowId;
                swdtk.ActiveMailTabId = tabs[0].id;

                const activeTab = tabs[0];
                const timeStamp = commons.getTimeStamp();
                const hostname  = commons.extractHostDomain(activeTab.url);

                if (!commons.isFirefox()) {
                    checkConnect_fsw01ejr();
                    commons.storeUrl(swdtk.port, activeTab.url, timeStamp, swdtk.browser);
                }

                if (commons.checkURL(activeTab.url)) {
                    // アクセス禁止サイトの場合
                    if (!commons.IsUrlAccessible(swdtk.webOpePolicy, activeTab.url)) {
                        // URLアクセスを禁止する
                        // 削除するタブのIDが直近で削除したタブIDと異なる場合は禁止する
                        if (activeTab.id != swdtk.lastDeletedTabId) {
                            checkConnect_fsw01ejr();
                            logger.debug(`URLアクセス禁止（URL：${activeTab.url}）`);
                            commons.createURLAccessDenySendingLog(swdtk.port, hostname, swdtk.browser, timeStamp, activeTab.id);
                            swdtk.lastDeletedTabId = activeTab.id;
                        }
                        return;
                    }

                    if (commons.isSameTitleAndURL(activeTab, swdtk.lastTitle, swdtk.lastUrl)) {
                        // 同じURLかつ同じタイトルの場合はログを出さない
                        logger.debug(`[DUP-1001]: 同一タイトル/URLのため、このウィンドウタイトルログは取得されません。（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        return;
                    }

                    // URL付きウィンドウタイトルログ電文作成
                    if (commons.isWindowLogSend(swdtk.webOpePolicy, swdtk.browser, activeTab.title)) {
                        checkConnect_fsw01ejr();
                        // 重複フィルタ判定
                        // 重複していない場合ログ化
                        if (!commons.isDuplicatedLog(swdtk.webOpePolicy, activeTab.id, activeTab.title)) {
                            logger.debug(`URL付きウィンドウタイトルログ（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                            commons.createURLAccessSendingLog(swdtk.port, hostname, swdtk.browser, activeTab.title, activeTab.url, timeStamp);
                        }
                        else {
                            logger.debug(`[DUP-2001]: 重複ログのため、このウィンドウタイトルログは取得されません。（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        }
                    }
                    swdtk.TabInfo[activeTab.id] = activeTab.url;
                    swdtk.lastUrl   = activeTab.url
                    swdtk.lastTitle = activeTab.title;
                }
                else {
                    if (commons.isEmptyTitleAndURL(activeTab)) {
                        // タイトルとURLが空文字の場合はログを出さない
                        logger.debug(`[DUP-0001]: タイトル/URLが空のため、このウィンドウタイトルログは取得されません。（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        return;
                    }
                    if (commons.isEmptyTitleAndURL(activeTab, swdtk.lastTitle, swdtk.lastUrl)) {
                        // 同じURLかつ同じタイトルの場合はログを出さない
                        logger.debug(`[DUP-1002]: 同一タイトル/URLのため、このウィンドウタイトルログは取得されません。（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        return;
                    }
                    // ウィンドウタイトルログ電文作成(URLなし)
                    if (commons.isWindowLogSend(swdtk.webOpePolicy, swdtk.browser, activeTab.title)) {
                        checkConnect_fsw01ejr();
                        // 重複フィルタ判定
                        // 重複していない場合ログ化
                        if (!commons.isDuplicatedLog(swdtk.webOpePolicy, activeTab.id, activeTab.title)) {
                            logger.debug(`URL付きウィンドウタイトルログ（URL：""、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                            commons.createURLAccessSendingLog(swdtk.port, hostname, swdtk.browser, activeTab.title, "", timeStamp);
                        }
                        else {
                            logger.debug(`[DUP-2002]: 重複ログのため、このウィンドウタイトルログは取得されません。（URL：""、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        }
                    }
                    swdtk.TabInfo[activeTab.id] = activeTab.url;
                    swdtk.lastUrl   = activeTab.url
                    swdtk.lastTitle = activeTab.title;
                }
            });
        });

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール送信ログ取得処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        chrome.windows.get(windowId, { populate: true }, function (window)
        {
            chrome.tabs.query({ windowId: windowId, active: true }, function (tabs)
            {
                if (commons.isUndefinedOrNull(tabs[0])) {
                    return;
                }

                const activeTab = tabs[0];
                const url       = activeTab.url;
//DEBUG-S
//              console.debug(`>>> chrome.windows.onFocusChanged !!`);
//              console.debug(`URL: ${url}`);
//              console.debug(`TITLE: ${activeTab.title}`);
//DEBUG-E

                if (webmail.isOutlook(url) || (url == 'about:blank')) {
                    var MailId = 'null';
                    if (outlook.isMailDeeplink(url)) {
                        MailId = outlook.extractMailId(url);
                        MailId = MailId.replace(/_/g, '\+')
                        MailId = MailId.replace(/\-/g, '\/')
                    } else {
                        if (!commons.isUndefinedOrNull(swdtk.CurrentEmail)) {
                            MailId = swdtk.CurrentEmail.getId();
                        }
                    }
                    outlook.getMailContent(
                        "__DTK_GetAttachmentRequest",
                        "chrome.windows.onFocusChanged",
                        -1,
                        activeTab.windowId,
                        activeTab.id,
                        MailId,
                        "",
//#10837 20230214 CHG S
//                      300
                        0
//#10837 20230214 CHG E
                    );
                }
            });
        });
    }
);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// chrome.tabs.OnActivated
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.tabs.onActivated.addListener(
    function (tab)
    {
//DEBUG-S
//      console.debug(`onActivated`);
//DEBUG-E
        const swdtk  = chrome.windows.swdtk;
        const logger = swdtk.logger;

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // ウィンドウタイトルログ取得処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        chrome.windows.get(tab.windowId, {populate: true}, function (window)
        {
            // ウィンドウが非アクティブな場合
            if (window.focused == false) {
                // ウィンドウタイトルログを取得しない
                return;
            }
            // アクティブタブから情報を取得
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs)
            {
                if (commons.isUndefinedOrNull(tabs[0])) {
                    return;
                }

                const activeTab = tabs[0];

                // 現在のタブIDを保存する
                swdtk.lastActiveTabId = activeTab.id;

                // 現在のウィンドウID/タブID（Webメーラー用）を保存する
                swdtk.ActiveMailWinId = activeTab.windowId;
                swdtk.ActiveMailTabId = activeTab.id;

                // URLが取得できなかった場合、onUpdateで取得する
                // ウィンドウやタブを新規作成したときはURLが取れない
                if (activeTab.url == "") {
                    return;
                }
                var timeStamp = commons.getTimeStamp();
                var hostname  = commons.extractHostDomain(activeTab.url);
                var browser   = swdtk.browser;

                if (!commons.isFirefox()) {
                    checkConnect_fsw01ejr();
                    commons.storeUrl(swdtk.port, activeTab.url, timeStamp, browser);
                }

                if (commons.checkURL(activeTab.url)) {
                    // 禁止サイトの場合
                    if (!commons.IsUrlAccessible(swdtk.webOpePolicy, activeTab.url)) {
                        // URLアクセスを禁止する
                        // 削除するタブのIDが直近で削除したタブIDと異なる場合は禁止する
                        // 場合によっては2度禁止処理が通る可能性があるため
                        if (activeTab.id != swdtk.lastDeletedTabId) {
                            checkConnect_fsw01ejr();
                            logger.debug(`URLアクセス禁止（URL：${activeTab.url}）`);
                            commons.createURLAccessDenySendingLog(swdtk.port, hostname, browser, timeStamp, activeTab.id);
                            swdtk.lastDeletedTabId = activeTab.id;
                        }
                        return;
                    }

                    if (commons.isSameTitleAndURL(activeTab, swdtk.lastTitle, swdtk.lastUrl)) {
                        // 同じURLかつ同じタイトルの場合はログを出さない
                        logger.debug(`[DUP-1003]: 同一タイトル/URLのため、このウィンドウタイトルログは取得されません。（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        return;
                    }

                    // URL付きウィンドウタイトルログ電文作成
                    if (commons.isWindowLogSend(swdtk.webOpePolicy, browser, activeTab.title)) {
                        checkConnect_fsw01ejr();
                        // 重複フィルタ判定
                        // 重複していない場合ログ化
                        if (!commons.isDuplicatedLog(swdtk.webOpePolicy, activeTab.id, activeTab.title)) {
                            logger.debug(`URL付きウィンドウタイトルログ（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                            commons.createURLAccessSendingLog(swdtk.port, hostname, browser, activeTab.title, activeTab.url, timeStamp);
                        }
                        else {
                            logger.debug(`[DUP-2003]: 重複ログのため、このウィンドウタイトルログは取得されません。（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        }
                    }
                    swdtk.TabInfo[activeTab.id] = activeTab.url;
                    swdtk.lastUrl   = activeTab.url
                    swdtk.lastTitle = activeTab.title;
                }
                else {
                    if (commons.isEmptyTitleAndURL(activeTab)) {
                            // タイトルとURLが空文字の場合はログを出さない
                            logger.debug(`[DUP-0002]: タイトル/URLが空のため、このウィンドウタイトルログは取得されません。（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                            return;
                    }
                    if (commons.isSameTitleAndURL(activeTab, swdtk.lastTitle, swdtk.lastUrl)) {
                        // 同じURLかつ同じタイトルの場合はログを出さない
                        logger.debug(`[DUP-1004]: 同一タイトル/URLのため、このウィンドウタイトルログは取得されません。（URL：${activeTab.url}、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        return;
                    }
                    // ウィンドウタイトルログ電文作成(URLなし)
                    if (commons.isWindowLogSend(swdtk.webOpePolicy, swdtk.browser, activeTab.title)) {
                        checkConnect_fsw01ejr();
                        // 重複フィルタ判定
                        // 重複していない場合ログ化
                        if (!commons.isDuplicatedLog(swdtk.webOpePolicy, activeTab.id, activeTab.title)) {
                            logger.debug(`URL付きウィンドウタイトルログ（URL：""、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                            commons.createURLAccessSendingLog(swdtk.port, hostname, swdtk.browser, activeTab.title, "", timeStamp);
                        }
                        else {
                            logger.debug(`[DUP-2004]: 重複ログのため、このウィンドウタイトルログは取得されません。（URL：""、タイトル：${activeTab.title}、タブID：${activeTab.id}）`);
                        }
                    }
                    swdtk.TabInfo[activeTab.id] = activeTab.url;
                    swdtk.lastUrl   = activeTab.url
                    swdtk.lastTitle = activeTab.title;
                }
            });
        });

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール送信ログ取得処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        chrome.windows.get(tab.windowId, {populate: true}, function (window)
        {
            if (window.focused == false) {
                return;
            }
            // アクティブタブから情報を取得
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs)
            {
                if (commons.isUndefinedOrNull(tabs[0])) {
                    return;
                }
                var activeTab = tabs[0];
                var url       = activeTab.url;
//DEBUG-S
//              console.debug(`>>> chrome.tabs.onActivated !!`);
//              console.debug(`URL: ${url}`);
//              console.debug(`TITLE: ${activeTab.title}`);
//DEBUG-E

                if (webmail.isOutlook(url) || (url == 'about:blank')) {
                    var MailId = 'null';
                    if (outlook.isMailDeeplink(url)) {
                        MailId = outlook.extractMailId(url);
                        MailId = MailId.replace(/_/g, '\+')
                        MailId = MailId.replace(/\-/g, '\/')
                    } else {
                        if (!commons.isUndefinedOrNull(swdtk.CurrentEmail)) {
                            MailId = swdtk.CurrentEmail.getId();
                        }
                    }
                    outlook.getMailContent(
                        "__DTK_GetAttachmentRequest",
                        "chrome.tabs.onActivated",
                        -1,
                        activeTab.windowId,
                        activeTab.id,
                        MailId,
                        "",
//#10837 20230214 CHG S
//                      300
                        0
//#10837 20230214 CHG E
                    );
                }
            });
        });
    }
);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// chrome.tabs.OnUpdated
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.tabs.onUpdated.addListener(
    function(tabid, info, tab)
    {
//DEBUG-S
//      console.debug(`onUpdated`);
//DEBUG-E
        const swdtk  = chrome.windows.swdtk;
        const logger = swdtk.logger;

        // Windowのアクティブ判定
        chrome.windows.get(tab.windowId, {populate: true}, function (window) {

            // 現在のウィンドウID/タブID（Webメーラー用）を保存する
            swdtk.ActiveMailWinId = tab.windowId;
            swdtk.ActiveMailTabId = tab.id;

            // 前回のタブIDと現在のタブIDが同一の場合
            if (swdtk.lastActiveTabId == tab.id) {
                // Windowが非アクティブ、または現在のタブが非アクティブの場合
                if ((window.focused == false) || (tab.active == false)) {
                    // ウィンドウタイトルログを取得しない
                    return;
                }
            }
            // 前回のタブIDと現在のタブIDが異なる場合
            else {
                // 現在のタブIDを保存する
                swdtk.lastActiveTabId = tab.id;
                // 今まで通り、無条件にウィンドウタイトルログを取得する
                ;
            }

            var timeStamp = commons.getTimeStamp();
            var hostname  = commons.extractHostDomain(tab.url);

            if (!commons.isFirefox()) {
                checkConnect_fsw01ejr();
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                    if (!commons.isUndefinedOrNull(tabs[0])) {
                        commons.storeUrl(swdtk.port, tabs[0].url, timeStamp, swdtk.browser);
                    }
                });
            }

            if (commons.checkURL(tab.url)) {
                // アクセス禁止サイトの場合
                if (!commons.IsUrlAccessible(swdtk.webOpePolicy, tab.url)) {
                    // URLアクセスを禁止する
                    // 削除するタブのIDが直近で削除したタブIDと異なる場合は禁止する
                    // 場合によっては2度禁止処理が通る可能性があるため
                    if (tab.id != swdtk.lastDeletedTabId) {
                        checkConnect_fsw01ejr();
                        logger.debug(`URLアクセス禁止（URL：${tab.url}）`);
                        commons.createURLAccessDenySendingLog(swdtk.port, hostname, swdtk.browser, timeStamp, tab.id);
                        swdtk.lastDeletedTabId = tab.id;
                    }
                    return;
                }

                if (commons.isSameTitleAndURL(tab, swdtk.lastTitle, swdtk.lastUrl)) {
                    // 同じタイトルかつURLの場合、ログは出さない
                    logger.debug(`[DUP-1005]: 同一タイトル/URLのため、このウィンドウタイトルログは取得されません。（URL：${tab.url}、タイトル：${tab.title}、タブID：${tab.id}）`);
                    return;
                }

                if (commons.isWindowLogSend(swdtk.webOpePolicy, swdtk.browser, tab.title)) {
                    checkConnect_fsw01ejr();
                    // 重複フィルタ判定
                    // 重複していない場合ログ化
                    if (!commons.isDuplicatedLog(swdtk.webOpePolicy, tab.id, tab.title)) {
                        logger.debug(`URL付きウィンドウタイトルログ（URL：${tab.url}、タイトル：${tab.title}、タブID：${tab.id}）`);
                        commons.createURLAccessSendingLog(swdtk.port, hostname, swdtk.browser, tab.title, tab.url, timeStamp);
                    }
                    else {
                        logger.debug(`[DUP-2005]: 重複ログのため、このウィンドウタイトルログは取得されません。（URL：${tab.url}、タイトル：${tab.title}、タブID：${tab.id}）`);
                    }
                }
                swdtk.TabInfo[tab.id] = tab.url;
                swdtk.lastUrl   = tab.url
                swdtk.lastTitle = tab.title;
            }
            else {
                if (commons.isEmptyTitleAndURL(tab)) {
                    // タイトルとURLが空文字の場合はログを出さない
                    logger.debug(`[DUP-0003]: タイトル/URLが空のため、このウィンドウタイトルログは取得されません。（URL：${tab.url}、タイトル：${tab.title}、タブID：${tab.id}）`);
                    return;
                }
                if (commons.isSameTitleAndURL(tab, swdtk.lastTitle, swdtk.lastUrl)) {
                    // 同じURLかつ同じタイトルの場合はログを出さない
                    logger.debug(`[DUP-1006]: 同一タイトル/URLのため、このウィンドウタイトルログは取得されません。（URL：${tab.url}、タイトル：${tab.title}、タブID：${tab.id}）`);
                    return;
                }
                // ウィンドウタイトルログ電文作成(URLなし)
                if (commons.isWindowLogSend(swdtk.webOpePolicy, swdtk.browser, tab.title)) {
                    checkConnect_fsw01ejr();
                    // 重複フィルタ判定
                    // 重複していない場合ログ化
                    if (!commons.isDuplicatedLog(swdtk.webOpePolicy, tab.id, tab.title)) {
                        logger.debug(`URL付きウィンドウタイトルログ（URL：""、タイトル：${tab.title}、タブID：${tab.id}）`);
                        commons.createURLAccessSendingLog(swdtk.port, hostname, swdtk.browser, tab.title, "", timeStamp);
                    }
                    else {
                        logger.debug(`[DUP-2006]: 重複ログのため、このウィンドウタイトルログは取得されません。（URL：""、タイトル：${tab.title}、タブID：${tab.id}）`);
                    }
                }
                swdtk.TabInfo[tab.id] = tab.url;
                swdtk.lastUrl   = tab.url
                swdtk.lastTitle = tab.title;
            }
        });

        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
        // メール送信ログ取得処理
        //_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

        var url = tab.url;
//DEBUG-S
//      console.debug(`>>> chrome.tabs.onUpdated`);
//      console.debug(`URL: ${url}`);
//      console.debug(`TITLE: ${tab.title}`);
//DEBUG-E
//#10837 20230214 DEL S
//      if (webmail.isOutlook(url) || (url == 'about:blank')) {
//          var MailId = 'null';
//          if (outlook.isMailDeeplink(url)) {
//              MailId = outlook.extractMailId(url);
//              MailId = MailId.replace(/_/g, '\+')
//              MailId = MailId.replace(/\-/g, '\/')
//          } else {
//              if (!commons.isUndefinedOrNull(swdtk.CurrentEmail)) {
//                  MailId = swdtk.CurrentEmail.getId();
//              }
//          }
//          outlook.getMailContent(
//              "__DTK_GetAttachmentRequest",
//              "chrome.tabs.onUpdated",
//              -1,
//              tab.windowId,
//              tab.id,
//              MailId,
//              "",
//              0
//          );
//      }
//#10837 20230214 DEL E
    }
);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// chrome.tabs.OnRemoved
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.tabs.onRemoved.addListener(
    function(tabId)
    {
        const swdtk = chrome.windows.swdtk;

        if (swdtk.WebMailLogonManager.has(tabId)) {
            swdtk.WebMailLogonManager.delete(tabId);
        }
    }
);

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// Downloads
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

chrome.downloads.onCreated.addListener((downloadDelta) => {

    const swdtk  = chrome.windows.swdtk;
    const logger = swdtk.logger;

    logger.debug(`chrome.downloads.onCreated: state: ${downloadDelta.state}`);

    if (commons.hasOwnProperty(downloadDelta, "state")) {
        if (!downloadDelta.state.includes("in_progress")) {
            return;
        }
    }

    // ダウンロードが開始されたURLを取得
    var refererUrl = downloadDelta.referrer;
//#xxxxx 20240417 CHG S
    if ((refererUrl == "") || (refererUrl == "about:blank") || commons.isUndefinedOrNull(refererUrl)) {
        if (downloadDelta.url.includes("googleusercontent.com") ||
            downloadDelta.url.includes("usercontent.google.com/download") ||
            downloadDelta.url.includes("usercontent.google.com")) {
            if (!commons.isUndefinedOrNull(swdtk.GoogleDrive_DownStartUrl) && (swdtk.GoogleDrive_DownStartUrl != "")) {
                refererUrl = swdtk.GoogleDrive_DownStartUrl;
            }
        }
        else
        if (downloadDelta.url.includes("japanwest1-mediap.svc.ms/transform/zip") ||
            downloadDelta.url.includes("japaneast1-mediap.svc.ms/transform/zip") ||
            downloadDelta.url.includes("mediap.svc.ms/transform/zip")) {
            if (!commons.isUndefinedOrNull(swdtk.OneDriveAspx_DownStartUrl) && (swdtk.OneDriveAspx_DownStartUrl != "")) {
                refererUrl = swdtk.OneDriveAspx_DownStartUrl;
            }
        }
        else
        if (downloadDelta.url.includes("onedrive.live.com") ||
            downloadDelta.url.includes("storage.live.com")) {
            if (!commons.isUndefinedOrNull(swdtk.OneDriveApi_DownStartUrl) && (swdtk.OneDriveApi_DownStartUrl != "")) {
                refererUrl = swdtk.OneDriveApi_DownStartUrl;
            }
        }
    }
    if ((refererUrl == "") || (refererUrl == "about:blank") || commons.isUndefinedOrNull(refererUrl)) {
        refererUrl = downloadDelta.url;
        if ((refererUrl == "") || (refererUrl == "about:blank") || commons.isUndefinedOrNull(refererUrl)) {
            refererUrl = downloadDelta.finalUrl;
        }
    }
//      if ((refererUrl == "") || (refererUrl == "about:blank") || commons.isUndefinedOrNull(refererUrl)) {
//// #12098 20231013 CHG S
////      if(downloadDelta.url.includes("googleusercontent.com")
//        if(downloadDelta.url.includes("googleusercontent.com") ||
//           downloadDelta.url.includes("drive.usercontent.google.com")) {
//// #12098 20231013 CHG E
//            // GoogleDriveの場合、ダウンロード元URLが空になるためRequestHeaderから取得
//            if (!commons.isUndefinedOrNull(swdtk.GoogleDrive_DownStartUrl) && (swdtk.GoogleDrive_DownStartUrl != "")) {
//                refererUrl = swdtk.GoogleDrive_DownStartUrl;
//            }
//// #10249(PH21999/PH22001) 20220602 CHG S
////      } else if (downloadDelta.url.includes("japanwest1-mediap")) {
//        } else if (downloadDelta.url.includes("japanwest1-mediap") ||
//                   downloadDelta.url.includes("japaneast1-mediap")) {
//// #10249(PH21999/PH22001) 20220602 CHG E
//            if (!commons.isUndefinedOrNull(swdtk.OneDriveAspx_DownStartUrl) && (swdtk.OneDriveAspx_DownStartUrl != "")) {
//                refererUrl = swdtk.OneDriveAspx_DownStartUrl;
//            }
//        }
//    } else if (refererUrl.includes("dropbox.com")) {
//        // DropBoxの場合、ダウンロード元URLのフルパスが取れないためRequestHeaderから取得
//        if (!commons.isUndefinedOrNull(swdtk.DropBox_DownStartUrl) && (swdtk.DropBox_DownStartUrl != "")) {
//            refererUrl = swdtk.DropBox_DownStartUrl;
//        }
//// #12098 20231013 CHG S
////  } else if (refererUrl.includes("onedrive.live.com") || refererUrl.includes("storage.live.com")) {
//    } else if (refererUrl.includes("onedrive.live.com") ||
//               refererUrl.includes("storage.live.com")  ||
//               refererUrl.includes("public.bl.files.1drv.com")) {
//// #12098 20231013 CHG E
//        // OneDrive(API)の場合、ダウンロード元URLのフルパスが取れないためRequestHeaderから取得
//        if (!commons.isUndefinedOrNull(swdtk.OneDriveApi_DownStartUrl) && (swdtk.OneDriveApi_DownStartUrl != "")) {
//            refererUrl = swdtk.OneDriveApi_DownStartUrl;
//        }
//    }
//#xxxxx 20240417 CHG E

    // ダウンロードのIDとリファラを一時保存する
    // onChangedでダウンロードログ電文作成に使用するため(Firefox以外)
    swdtk.DownloadInfo[downloadDelta.id] = refererUrl;

//#xxxxx 20240417 DEL S
//  //現在のURLからホスト名を取得する
//  var hostname = commons.extractHostDomain(refererUrl);
//#xxxxx 20240417 DEL E

    //ダウンロード禁止・電文作成(ファイル名は必要ない)
    if (swdtk.isProhibitDownload) {
//#xxxxx 20240417 CHG S
//#11333 20230210 CHG S
        if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, refererUrl)) {
//          chrome.downloads.cancel(downloadDelta.id);
            logger.debug(`chrome.downloads.onCreated: chrome.downloads.cancel(${downloadDelta.id})`);
            chrome.downloads.cancel(downloadDelta.id, function() {
                if (commons.isFirefox()) {
                    if (chrome.runtime.lastError) {
                        logger.debug(`chrome.downloads.onCreated: Download cancel failure.（ID: ${downloadDelta.id}、MESSAGE: ${chrome.runtime.lastError.message}）`);
                        chrome.downloads.removeFile(downloadDelta.id, function() {
                            if (chrome.runtime.lastError) {
                                logger.debug(`chrome.downloads.onCreated: Delete downloaded file.（ID: ${downloadDelta.id}、MESSAGE: ${chrome.runtime.lastError.message}）`);
                            } else {
                                logger.debug(`chrome.downloads.onCreated: Delete downloaded file.（ID: ${downloadDelta.id}、FILENAME: ${downloadDelta.filename}）`);
                            }
                        });
                    } else {
                        logger.debug(`chrome.downloads.onCreated: Download cancel success.（ID: ${downloadDelta.id}）`);
                    }
                } else {
                    chrome.downloads.search({id: downloadDelta.id}, function(DownloadItems) {
                        if ((DownloadItems.length > 0) && (DownloadItems[0].error === 'USER_CANCELED')) {
                            logger.debug(`chrome.downloads.onCreated: Download cancel success.（ID: ${downloadDelta.id}）`);
                        } else {
                            logger.debug(`chrome.downloads.onCreated: Download cancel failure.（ID: ${downloadDelta.id}、MESSAGE: ${chrome.runtime.lastError.message}）`);
                            chrome.downloads.removeFile(downloadDelta.id, function() {
                                if (chrome.runtime.lastError) {
                                    logger.debug(`chrome.downloads.onCreated: Delete downloaded file.（ID: ${downloadDelta.id}、MESSAGE: ${chrome.runtime.lastError.message}）`);
                                } else {
                                    logger.debug(`chrome.downloads.onCreated: Delete downloaded file.（ID: ${downloadDelta.id}、FILENAME: ${downloadDelta.filename}）`);
                                }
                            });
                        }
                    });
                }
            });
            // 現在時間を取得
            var timeStamp = commons.getTimeStamp();
            // 一時保存していたダウンロード情報を削除
            delete swdtk.DownloadInfo[downloadDelta.id];
            checkConnect_fsw01ejr();
            //現在のURLからホスト名を取得する
            var hostname = commons.extractHostDomain(refererUrl);
            // 許可サイトでない場合は禁止する
            logger.debug(`ダウンロード禁止（ホスト名：${hostname}）`);
            commons.createDownloadDenySendingLog(swdtk.port, hostname, swdtk.browser, timeStamp);
//          chrome.downloads.cancel(downloadDelta.id);
        }
//#11333 20230210 CHG E
//#xxxxx 20240417 CHG E
    }

    // Firefoxの場合onCreatedでファイル名がすべてのサイトで取得できる
    if (commons.isFirefox()) {
        if (commons.hasOwnProperty(downloadDelta, "filename")) {
            // フルパスからファイル名を取得する
            var filename = downloadDelta.filename.split('\\').pop().split('/').pop();
            swdtk.DownloadFile[downloadDelta.id] = filename;
        }
    }
});

chrome.downloads.onChanged.addListener((downloadDelta) => {

    var swdtk  = chrome.windows.swdtk;
    var logger = swdtk.logger;

    if (downloadDelta.state) {
        if (downloadDelta.state.current) {
            logger.debug(`chrome.downloads.onChanged: state: ${downloadDelta.state.current}`);
        }
    }

    // 現在のURLからホスト名を取得する
    var hostname = commons.extractHostDomain(swdtk.DownloadInfo[downloadDelta.id]);

    if (swdtk.isProhibitDownload) {
        if (!commons.isInList(swdtk.webOpePolicy.updown_site_fmt, swdtk.lastUrl)) {
            // ダウンロードを禁止している場合は、onChangedでダウンロードログ取得は必要ない
            logger.debug(`chrome.downloads.onChanged: chrome.downloads.cancel(${downloadDelta.id})`);
            chrome.downloads.cancel(downloadDelta.id, function() {
                if (commons.isFirefox()) {
                    if (chrome.runtime.lastError) {
                        logger.debug(`chrome.downloads.onChanged: Download cancel failure.（ID: ${downloadDelta.id}、MESSAGE: ${chrome.runtime.lastError.message}）`);
                        chrome.downloads.removeFile(downloadDelta.id, function() {
                            if (chrome.runtime.lastError) {
                                logger.debug(`chrome.downloads.onChanged: Delete downloaded file.（ID: ${downloadDelta.id}、MESSAGE: ${chrome.runtime.lastError.message}）`);
                            } else {
                                logger.debug(`chrome.downloads.onChanged: Delete downloaded file.（ID: ${downloadDelta.id}、FILENAME: ${downloadDelta.filename}）`);
                            }
                        });
                    } else {
                        logger.debug(`chrome.downloads.onChanged: Download cancel success.（ID: ${downloadDelta.id}）`);
                    }
                } else {
                    chrome.downloads.search({id: downloadDelta.id}, function(DownloadItems) {
                        if ((DownloadItems.length > 0) && (DownloadItems[0].error === 'USER_CANCELED')) {
                            logger.debug(`chrome.downloads.onChanged: Download cancel success.（ID: ${downloadDelta.id}、ERROR: '${DownloadItems[0].error}'、FILENAME: '${DownloadItems[0].filename}'）`);
                        } else {
                            logger.debug(`chrome.downloads.onChanged: Download cancel failure.（ID: ${downloadDelta.id}、ERROR: '${DownloadItems[0].error}'、FILENAME: '${DownloadItems[0].filename}'）`);
                            chrome.downloads.removeFile(downloadDelta.id, function() {
                                if (chrome.runtime.lastError) {
                                    logger.debug(`chrome.downloads.onChanged: Delete downloaded file.（ID: ${downloadDelta.id}、MESSAGE: ${chrome.runtime.lastError.message}）`);
                                } else {
                                    logger.debug(`chrome.downloads.onChanged: Delete downloaded file.（ID: ${downloadDelta.id}、FILENAME: ${downloadDelta.filename}）`);
                                }
                            });
                        }
                    });
                }
            });
            return;
        }
    }

    // 電文を作成
    // ダウンロード開始時のtabidを取得
    if (!commons.isFirefox()) {
        if (commons.hasOwnProperty(downloadDelta, "filename")) {
            // フルパスからファイル名を取得する
            var filename = downloadDelta.filename.current.split('\\').pop().split('/').pop();
            swdtk.DownloadFile[downloadDelta.id] = filename;
        }
    }

    // ダウンロード完了時点で電文を作成
    if (commons.hasOwnProperty(downloadDelta, "state")) {
        if (commons.hasOwnProperty(downloadDelta.state, "current")) {
            if (downloadDelta.state.current.includes("complete")) {
                // 現在時間を取得
                const timeStamp = commons.getTimeStamp();
                checkConnect_fsw01ejr();
                // 電文を作成
                var filename = swdtk.DownloadFile[downloadDelta.id];
                logger.debug(`ダウンロード（ホスト名：${hostname}、ファイル名：${filename}）`);
                commons.createDownloadSendingLog(swdtk.port, hostname, swdtk.browser, filename, String(timeStamp));
                delete swdtk.DownloadInfo[downloadDelta.id];
                delete swdtk.DownloadFile[downloadDelta.id];
            } else if(downloadDelta.state.current.includes("interrupted")) {
                delete swdtk.DownloadInfo[downloadDelta.id];
                delete swdtk.DownloadFile[downloadDelta.id];
            }
        }
    }
});
