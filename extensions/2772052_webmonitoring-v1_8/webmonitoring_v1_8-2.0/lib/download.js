import * as constants from "./constants.js"
import * as commons from "./commons.js"

/**
 * GoogleDriveのダウンロード開始を検知する
 * @param  {Object} headerDetail ヘッダーの詳細
 * @return {Boolean}        ダウンロード開始を検知した場合はtrue
 */
export function downStart_GoogleDrive(headerDetail)
{
    if (commons.isUndefinedOrNull(headerDetail)) {
        return false;
    }

    if (!commons.hasOwnProperty(headerDetail, "url")) {
        return false;
    }

// #xxxxx 20240417 CHG S
    if (headerDetail.url.includes("drive-data-export.googleusercontent.com") ||
        headerDetail.url.includes("drive-data-export.usercontent.google.com") ||
        headerDetail.url.includes("googleusercontent.com") ||
        headerDetail.url.includes("usercontent.google.com")) {
        if (headerDetail.url.includes("=download") ||
            headerDetail.url.includes("/download") ||
            headerDetail.url.includes("download")) {
            return true;
        }
    }
//// #12098 20231013 CHG S
////  if (headerDetail.url.includes("drive.google.com")) {
//    if (headerDetail.url.includes("drive.google.com") ||
//        headerDetail.url.includes("drive.usercontent.google.com")) {
//// #12098 20231013 CHG E
//        if (headerDetail.url.includes("export=download")) {
//            return true;
//        }
//    } else if (headerDetail.url.includes("drive-data-export.googleusercontent.com/download")) {
//        return true;
//    }
// #xxxxx 20240417 CHG E

    return false;
}

/**
 * DropBoxのダウンロード開始を検知する
 * @param  {Object} headerDetail ヘッダーの詳細
 * @return {Boolean}        ダウンロード開始を検知した場合はtrue
 */
export function downStart_DropBox(headerDetail)
{
    if (commons.isUndefinedOrNull(headerDetail)) {
        return false;
    }
    if (!commons.hasOwnProperty(headerDetail, "url")) {
        return false;
    }
    if (headerDetail.url.includes("dropbox.com")) {
        if (headerDetail.url.includes("download_id")) {
            return true;
        }
    }
    return false;
}

/**
 * OneDrive(API)のダウンロード開始を検知する
 * @param  {Object} headerDetail ヘッダーの詳細
 * @return {Boolean}        ダウンロード開始を検知した場合はtrue
 */
export function downStart_OneDriveApi(headerDetail)
{
    if (commons.isUndefinedOrNull(headerDetail)) {
        return false;
    }

    if (!commons.hasOwnProperty(headerDetail, "url")) {
        return false;
    }

    var originUrl;
    if (headerDetail.url.includes("api.onedrive.com")) {
        if (commons.hasOwnProperty(headerDetail, "requestHeaders")) {
            originUrl = commons.findHeader(headerDetail.requestHeaders, "Origin");
        }
        if (originUrl.includes("onedrive.live.com")) {
            if (headerDetail.url.includes("downloadUrl")) {
                return true;
            }
        }
    } else if (headerDetail.url.includes("storage.live.com")) {
        if (commons.hasOwnProperty(headerDetail, "requestHeaders")) {
            originUrl = commons.findHeader(headerDetail.requestHeaders, "Origin");
        }
        if (originUrl.includes("onedrive.live.com")) {
            if (headerDetail.url.includes("downloadfiles")) {
                return true;
            }
        }
    }
    return false;
}

/**
 * OneDrive(Aspx)のダウンロード開始を検知する
 * @param  {Object} headerDetail ヘッダーの詳細
 * @param  {Object} bodyDetail リクエストボディの詳細
 * @return {Boolean}        ダウンロード開始を検知した場合はtrue
 */
export function downStart_OneDriveAspx(headerDetail, bodyDetail)
{
    if (commons.isUndefinedOrNull(headerDetail) || commons.isUndefinedOrNull(bodyDetail)) {
        return false;
    }

    if (!commons.hasOwnProperty(headerDetail, "url")) {
        return false;
    }
    var originUrl;
    if (commons.hasOwnProperty(headerDetail, "requestHeaders")) {
        originUrl = commons.findHeader(headerDetail.requestHeaders, "Origin");
    }
    if (!originUrl.includes("sharepoint.com")) {
        return false;
    }

// #xxxxx 20240417 CHG S
//// #10249(PH21999/PH22001) 20220602 CHG S
////  if(headerDetail.url.includes("japanwest1-mediap") && headerDetail.url.includes("transform/zip")) {
//    if ((headerDetail.url.includes("japanwest1-mediap") || headerDetail.url.includes("japaneast1-mediap")) && headerDetail.url.includes("transform/zip")) {
//// #10249(PH21999/PH22001) 20220602 CHG E
    if ((headerDetail.url.includes("japanwest1-mediap") ||
         headerDetail.url.includes("japaneast1-mediap") ||
         headerDetail.url.includes("mediap.svc.ms")) && headerDetail.url.includes("transform/zip")) {
// #xxxxx 20240417 CHG E
        if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
            if (commons.hasOwnProperty(bodyDetail.requestBody, constants.FORM_DATA)) {
                var formData = bodyDetail.requestBody.formData;
                if (commons.hasOwnProperty(formData, "zipFileName"))  {
                    return true;
                }
            }
        }
    }

    return false;
}
