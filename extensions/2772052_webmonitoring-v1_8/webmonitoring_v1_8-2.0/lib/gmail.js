import * as constants from "./constants.js"
import * as commons from "./commons.js"
import Mail from "./mail.js"

/**
 * オブジェクトが配列かつ、指定された要素数かどうかを判定します。
 * elements に -1 が指定された場合、オブジェクトが配列かどうかのみ判定します。
 * 
 * @param {Object} obj 判定対象のオブジェクト
 * @param {Number} elements 要素数（デフォルト値: -1）
 * @return オブジェクトが配列かつ、指定された要素数の場合は true、そうでない場合は false
 */
function isArray(obj, elements = -1)
{
    if (commons.isUndefinedOrNull(obj)) {
        return false;
    }
    if (!Array.isArray(obj)) {
        return false;
    }
    if (elements == -1) {
        return true;
    }
    return (obj.length == elements);
}

/**
 * 指定されたJSONデータからメール送信情報が格納されているJSONデータを取得します。
 * @param  {object} json JSONデータ
 * @return メール送信情報（JSONデータ）
 */
export function getGmailTransmissionData(json)
{
    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error(`内部エラーが発生しました。（詳細: json='undefined or null'）`);
        return null;
    }

    if (isArray(json, 5))
    {
        // (5) [null, Array(1), Array(7), Array(5), 2]
        // (5) [Array(3), Array(1), null, Array(5), 2]
        if (((json['0'] == null) && (json['1'] != null) && (json['2'] != null) && (json['3'] != null) && (json['4'] == 2)) ||
            ((json['0'] != null) && (json['1'] != null) && (json['2'] == null) && (json['3'] != null) && (json['4'] == 2)))
        {
            var workjson = json;

            if (!commons.hasOwnProperty(workjson, '1')) {
                logger.error("JSONデータの解析でエラーが発生しました。");
                return null;
            }
            workjson = workjson['1'];

            if (!commons.hasOwnProperty(workjson, '0')) {
                logger.error("JSONデータの解析でエラーが発生しました。");
                return null;
            }
            workjson = workjson['0'];

            if (!commons.hasOwnProperty(workjson, '0')) {
                logger.error("JSONデータの解析でエラーが発生しました。");
                return null;
            }
            workjson = workjson['0'];

            if (!commons.hasOwnProperty(workjson, '1')) {
                logger.error("JSONデータの解析でエラーが発生しました。");
                return null;
            }
            workjson = workjson['1'];

            if (commons.hasOwnProperty(workjson, '0') &&
                (workjson['0'].startsWith("thread-a:") || workjson['0'].startsWith("thread-f:"))) {
                if (!commons.hasOwnProperty(workjson, '1')) {
                    logger.error("JSONデータの解析でエラーが発生しました。");
                    return null;
                }
                workjson = workjson['1'];

                if (isArray(workjson, 3)) {
                    workjson = json;

                    if (!commons.hasOwnProperty(workjson, '1')) {
                        logger.error("JSONデータの解析でエラーが発生しました。");
                        return null;
                    }
                    workjson = workjson['1'];

                    if (!commons.hasOwnProperty(workjson, '0')) {
                        logger.error("JSONデータの解析でエラーが発生しました。");
                        return null;
                    }
                    workjson = workjson['0'];

                    // 配列の要素数が１の場合
                    if (isArray(workjson, 1)) {
                        // 編集途中のデータのため、無視する
                        return null;
                    }

                    if (!commons.hasOwnProperty(workjson, '1')) {
                        logger.error("JSONデータの解析でエラーが発生しました。");
                        return null;
                    }
                    workjson = workjson['1'];

                    if (!commons.hasOwnProperty(workjson, '1')) {
                        logger.error("JSONデータの解析でエラーが発生しました。");
                        return null;
                    }
                    workjson = workjson['1'];

                    if (!commons.hasOwnProperty(workjson, '0')) {
                        logger.error("JSONデータの解析でエラーが発生しました。");
                        return null;
                    }
                    if (!(workjson['0'].startsWith("thread-a:") || workjson['0'].startsWith("thread-f:"))) {
                        return null;
                    }

                    if (!commons.hasOwnProperty(workjson, '1')) {
                        logger.error("JSONデータの解析でエラーが発生しました。");
                        return null;
                    }
                    workjson = workjson['1'];
                }
                if (isArray(workjson, 14)) {
                    if (!commons.isUndefinedOrNull(workjson['13'])) {
                        var mailjson = workjson['13'];
                        workjson = workjson['13'];

                        if (!commons.hasOwnProperty(workjson, '0')) {
                            logger.error("JSONデータの解析でエラーが発生しました。");
                            return null;
                        }
                        workjson = workjson['0'];

                        // 配列要素の11番目がnullでない場合
                        if (commons.hasOwnProperty(workjson, '10') && !commons.isUndefinedOrNull(workjson['10'])) {
                            // 配列要素の11番目を取り出す
                            workjson = workjson['10'];
                            var f_bt   = false;
                            var f_btns = false;
                            var f_cl   = false;
                            if (Array.isArray(workjson)) {
                                for (var i = 0; i < workjson.length; i++) {
                                    if (workjson[i] == "^f_bt") {
                                        f_bt = true;
                                    }
                                    else if (workjson[i] == "^f_btns") {
                                        f_btns = true;
                                    }
                                    else if (workjson[i] == "^f_cl") {
                                        f_cl = true;
                                    }
                                    // "^f_bt"、"^f_btns"、"^f_cl" の３つが存在する場合に送信データと判断
		                            if (f_bt && f_btns && f_cl) {
		                                return mailjson;
		                            }
                                }
                            }
                        }
                    }
                }
            }
            // 返信・転送の判定
            var iojson = null;
            workjson = json

            if (!commons.hasOwnProperty(workjson, '1')) {
                logger.error("JSONデータの解析でエラーが発生しました。");
                return null;
            }
            workjson = workjson['1'];

            if (!commons.hasOwnProperty(workjson, '0')) {
                logger.error("JSONデータの解析でエラーが発生しました。");
                return null;
            }
            workjson = workjson['0'];

            if (Array.isArray(workjson)) {
                switch (workjson.length) {
                    case 2:
                    case 3:
                        if (!commons.hasOwnProperty(workjson, workjson.length - 1)) {
                            logger.error("JSONデータの解析でエラーが発生しました。");
                            return null;
                        }
                        iojson = workjson[workjson.length - 1];

                        if (!commons.hasOwnProperty(iojson, '1')) {
                            logger.error("JSONデータの解析でエラーが発生しました。");
                            return null;
                        }
                        iojson = iojson['1'];
                        break;
                    default:
                        return null;
                }
                if (commons.hasOwnProperty(iojson, '0') &&
                    (iojson['0'].startsWith("thread-a:") || iojson['0'].startsWith("thread-f:"))) {

                    if (!commons.hasOwnProperty(iojson, '1')) {
                        logger.error("JSONデータの解析でエラーが発生しました。");
                        return null;
                    }
                    iojson = iojson['1'];

                    if (isArray(iojson, 7)) {

                        if (!commons.hasOwnProperty(iojson, '6')) {
                            logger.error("JSONデータの解析でエラーが発生しました。");
                            return null;
                        }
                        iojson = iojson['6'];

                        if (isArray(iojson, 3)) {
                            // 返信
                            if ((iojson['0']['0'] == "^io_re") || (iojson['0']['0'] == "^io_fwd")) {
                                if (iojson['0']['0'] == "^io_re") {
                                    logger.debug("返信!!");
                                }
                                if (iojson['0']['0'] == "^io_fwd") {
                                    logger.debug("転送!!");
                                }
                                workjson = json

                                if (!commons.hasOwnProperty(workjson, '1')) {
                                    logger.error("JSONデータの解析でエラーが発生しました。");
                                    return null;
                                }
                                workjson = workjson['1'];

                                if (!commons.hasOwnProperty(workjson, '0')) {
                                    logger.error("JSONデータの解析でエラーが発生しました。");
                                    return null;
                                }
                                workjson = workjson['0'];
                                switch (workjson.length) {
                                    case 2:
                                    case 3:
                                        if (!commons.hasOwnProperty(workjson, workjson.length - 2)) {
                                            logger.error("JSONデータの解析でエラーが発生しました。");
                                            return null;
                                        }
                                        workjson = workjson[workjson.length - 2];

                                        if (!commons.hasOwnProperty(workjson, '1')) {
                                            logger.error("JSONデータの解析でエラーが発生しました。");
                                            return null;
                                        }
                                        workjson = workjson['1'];
                                        break;
                                    default:
                                        return null;
                                }
                                if (commons.hasOwnProperty(workjson, '0') &&
                                    (workjson['0'].startsWith("thread-a:") || workjson['0'].startsWith("thread-f:"))) {
                                    var mailjson = null;

                                    if (!commons.hasOwnProperty(workjson, '1')) {
                                        logger.error("JSONデータの解析でエラーが発生しました。");
                                        return null;
                                    }
                                    workjson = workjson['1'];

                                    if (isArray(workjson, 14)) {
                                        if (commons.hasOwnProperty(workjson, '13')) {
                                            mailjson = workjson['13'];
                                            workjson = workjson['13'];

                                            if (!commons.hasOwnProperty(workjson, '0')) {
                                                logger.error("JSONデータの解析でエラーが発生しました。");
                                                return null;
                                            }
                                            workjson = workjson['0'];

                                            if (commons.hasOwnProperty(workjson, '10')) {
                                                workjson = workjson['10'];
                                            }
                                        }
                                    }
                                    else {
                                        if (!commons.hasOwnProperty(workjson, '1')) {
                                            logger.error("JSONデータの解析でエラーが発生しました。");
                                            return null;
                                        }
                                        mailjson = workjson['1'];
                                        workjson = workjson['1'];

                                        if (!commons.hasOwnProperty(workjson, '0')) {
                                            logger.error("JSONデータの解析でエラーが発生しました。");
                                            return null;
                                        }
                                        workjson = workjson['0'];

                                        if (commons.hasOwnProperty(workjson, '10')) {
                                            workjson = workjson['10'];
                                        }
                                    }
		                            var f_bt   = false;
		                            var f_btns = false;
		                            var f_cl   = false;
		                            if (Array.isArray(workjson)) {
		                                for (var i = 0; i < workjson.length; i++) {
		                                    if (workjson[i] == "^f_bt") {
		                                        f_bt = true;
		                                    }
		                                    else if (workjson[i] == "^f_btns") {
		                                        f_btns = true;
		                                    }
		                                    else if (workjson[i] == "^f_cl") {
		                                        f_cl = true;
		                                    }
		                                    // "^f_bt"、"^f_btns"、"^f_cl" の３つが存在する場合に送信データと判断
				                            if (f_bt && f_btns && f_cl) {
				                                return mailjson;
				                            }
		                                }
		                            }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return null;
}

/**
 * 指定された JSON形式データを解析します。
 * @param  {object} json JSON形式データ
 * @return メール情報
 */
export function parseGmail(json) {

    const logger = chrome.windows.swdtk.logger;

    if (commons.isUndefinedOrNull(json)) {
        logger.error("内部エラーが発生しました。（詳細: json='undefined or null'）");
        return null;
    }

    var mail = new Mail('Gmail');
    mail.setMessageDisposition(constants.MESSAGE_DISPOSITION_SEND_AND_SAVE_COPY);
    var workjson = json['0'];
    if (workjson['0'].startsWith("msg-a:")) {
        var from        = workjson['1']['1'];
        var to          = getEmailAddresses(workjson['2']);
        var cc          = getEmailAddresses(workjson['3']);
        var bcc         = getEmailAddresses(workjson['4']);
        var subject     = (workjson['7'] == null) ? "" : workjson['7'];
        var body        = "";
        var attachments = getAttachments(workjson['11']);
        if (workjson['8'] != null) {
            if (workjson['8']['1'] != null) {
                if (workjson['8']['1']['0'] != null) {
                    body = workjson['8']['1']['0']['1'];
                }
            }
        }
        mail.setSender(from);
        mail.setToRecipients(to);
        mail.setCcRecipients(cc);
        mail.setBccRecipients(bcc);
        mail.setSubject(subject);
        mail.setBody(body);
        mail.setAttachments(attachments);
        return mail;
    }

    return null;
}

/**
 * 指定された JSON 形式データから Email アドレスの配列を取得します。
 * @param  {Object} json JSON 形式データ
 * @return Email アドレスの配列、または空の配列
 */
function getEmailAddresses(json) {

    var emailAddresses = [];

    if (commons.isUndefinedOrNull(json)) {
        return emailAddresses;
    }

    for (var i = 0; i < json.length; i++) {
        emailAddresses.push(json[i]['1']);
    }

    return emailAddresses;
}

/**
 * 指定された JSON 形式データから添付ファイルの配列を取得します。
 * @param  {Object} json JSON 形式データ
 * @return 添付ファイルの配列、または空の配列
 */
function getAttachments(json) {

    const logger = chrome.windows.swdtk.logger;

    var attachments = [];

    if (commons.isUndefinedOrNull(json)) {
        return attachments;
    }

    for (var i = 0; i < json.length; i++) {
        // 注：ファイル名のデコード処理はログ化IF側にて実施する!!
        var fileName = json[i]['1'];
        try {
            var temp = decodeURI(escape(fileName));
            logger.debug(`ファイル名: ${temp}`);
        } catch (error) {
            logger.debug(`ファイル名: ${fileName}`);
        }
        attachments.push(fileName);
    }

    return attachments;
}
