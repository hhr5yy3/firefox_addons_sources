import * as constants from "./constants.js"
import * as commons  from "./commons.js"

/**
 * GoogleDriveのアップロードログを採取する
 * @param  {Object} bodyDetail requestBodyの詳細
 * @return {Object} アップロードファイルのリスト（null:アップロード検知無）
 */
export function uploadGoogleDrive(bodyDetail)
{
    if (commons.isUndefinedOrNull(bodyDetail)) {
        // bodyの情報がない場合はnullを返す
        return null;
    }

    var postedString = "";
    try {
        // requestBody本体を取得
        if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
            if (commons.hasOwnProperty(bodyDetail.requestBody, "raw")) {
                postedString = new TextDecoder("utf-8").decode(bodyDetail.requestBody.raw[0].bytes);
            }
        }
    } catch (e) {
        // exceptionをキャッチした場合NULLを返す
        return null;
    }

    // アップロード検知＆ファイル名取得処理
    if (commons.hasOwnProperty(bodyDetail, "url")) {
        if (bodyDetail.url.toLowerCase().includes("/upload/drive")) {
            var uploadfiles = [];
            // 一行ずつ処理
            var textArray = postedString.split(/\r\n|\r|\n/);
            // ファイルプロパティ格納用
            for (let i = 0; i < textArray.length; i++) {
                var fileName_prop = null;
                var text = textArray[i];
                if (text.startsWith("{\"title\":")) {
                    fileName_prop = text.match(/"title":"(.*?)"/);
                    uploadfiles.push(fileName_prop[1]);
                } else if (text.startsWith("{\"originalFilename\":")) {
                    fileName_prop = text.match(/"originalFilename":"(.*?)"/);
                    uploadfiles.push(fileName_prop[1]);
                }
            }
            return uploadfiles;
        }
    }

    return null;
}

/**
 * Boxのアップロードログを採取する
 * @param  {Object} bodyDetail requestBodyの詳細
 * @return {Object} アップロードファイルのファイル名とSessionIDを返す（null:アップロード検知無）
 */
export function uploadBox(bodyDetail)
{
    var box_filename = null;
    var sessionId = null;
    var box_upload = false; // アップロードを検知した場合true

    if (!bodyDetail) {
        // bodyの情報がない場合はnullを返す
        return null;
    }

    if (!commons.hasOwnProperty(bodyDetail, "method") || !commons.hasOwnProperty(bodyDetail, "url")) {
        return null;
    }

    if (bodyDetail.method.toLowerCase() == "post") {
        var target_sessionId = "content?upload_session_id=";
        var index_uploadSessionId = bodyDetail.url.toLowerCase().indexOf(target_sessionId);
        if (index_uploadSessionId > -1) {
            // session_IDを取得する処理
            // urlを＆区切りでsplit
            var boxUrl_parameters = bodyDetail.url.split("&");
            for (let i = 0; i < boxUrl_parameters.length; i++) {
                //console.log("textArray[i] = " +  textArray[i]);
                if (boxUrl_parameters[i].toLowerCase().indexOf(target_sessionId) > -1) {
                    sessionId = boxUrl_parameters[i].slice(index_uploadSessionId + target_sessionId.length);
                }
            }
            // if true, this is upload
            box_upload = true;
        }
    }

    if (box_upload) {
        if (commons.isFirefox()) {
            if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
                if (commons.hasOwnProperty(bodyDetail.requestBody, "formData")) {
                    if (commons.hasOwnProperty(bodyDetail.requestBody.formData, "file")) {
                        if (!commons.isUndefinedOrNull(bodyDetail.requestBody.formData.file)) {
                            box_filename = bodyDetail.requestBody.formData.file[0];
                        }
                    }
                }
            }
            return { filename: box_filename, sessionId: sessionId };
        } else {
            var postedString = "";
            try {
                // requestBody本体を取得
                if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
                    if (commons.hasOwnProperty(bodyDetail.requestBody, "raw")) {
                        postedString = new TextDecoder("utf-8").decode(bodyDetail.requestBody.raw[0].bytes);
                    }
                }
            } catch (e) {
                // exceptionをキャッチした場合NULLを返す
                return null;
            }
            // 一行ずつ処理
            var textArray = postedString.split(/\r\n|\r|\n/);
            // ファイルプロパティ格納用
            var file_properties_array = [];
            // 最初の文字列が・最初の文字列がContent-Typeのものを見つける
            for (let i = 0; i < textArray.length; i++) {
                //console.log("textArray[i] = " +  textArray[i]);
                if (textArray[i].toLowerCase().startsWith("content-disposition:")) {
                //console.log("textArray[i].split(';') = " + textArray[i].split(';'));
                    if (textArray[i].includes("filename=")) {
                        // 「filname=」という文字列が存在したら、ループを抜ける
                        // 「;」ごとに分割していく
                        file_properties_array = textArray[i].split(';');
                        break;
                    }
                }
            }
            //console.log("file_peroperties_array = " + file_properties_array);
            //filename=が出てきたら、それを見つける
            for (let i = 0; i < file_properties_array.length; i++) {
                var extracted_prop = file_properties_array[i].match(/filename="(.*?)"/);
                if (!commons.isUndefinedOrNull(extracted_prop)) {
                    box_filename = extracted_prop[1];
                    return { filename: box_filename, sessionId: sessionId };
                }
            }
        }
    }

    return null;
}

/**
 * Boxのアップロードログを採取する（大容量ファイルの場合）
 * @param  {Object} bodyDetail requestBodyの詳細
 * @return {Object} アップロードファイルのファイル名返す（null:アップロード検知無）
 */
export function uploadBox_large(bodyDetail)
{
    var filename = "";

    if (!bodyDetail) {
        // bodyの情報がない場合はnullを返す
        return null;
    }

    if (!commons.hasOwnProperty(bodyDetail, "method") || !commons.hasOwnProperty(bodyDetail, "url")) {
        return null;
    }

    if (!bodyDetail.method.toLowerCase() == 'post') {
        return null;
    }

    if (bodyDetail.url.toLowerCase().includes("box.com")) {
        if (bodyDetail.url.toLowerCase().endsWith("/upload_sessions")) {
            var postedString = "";
            try {
                // requestBody本体を取得
                if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
                    if (commons.hasOwnProperty(bodyDetail.requestBody, "raw")) {
                        postedString = new TextDecoder("utf-8").decode(bodyDetail.requestBody.raw[0].bytes);
                    }
                }
            } catch (e) {
                // exceptionをキャッチした場合NULLを返す
                return null;
            }
            var extracted_raw = postedString.match(/"file_name":"(.*?)"/);
            if (!commons.isUndefinedOrNull(extracted_raw)) {
                filename = extracted_raw[1];
                return filename;
            }
        }
    }

    return null;
}

/**
 * OneDrive(API)のアップロード開始を検知する
 * @param  {Object} bodyDetail リクエストボディの詳細
 * @param  {Object} headerDetail リクエストヘッダーの詳細
 * @return {Boolean} アップロード開始を検知した場合はtrue
 */
export function upStart_OneDriveApi(bodyDetail, headerDetail)
{
    if (!bodyDetail || !headerDetail) {
        return null;
    }

    if (!commons.hasOwnProperty(headerDetail, "url")) {
        return null;
    }

    var postedString = "";
    try {
        // requestBody本体を取得
        if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
            if (commons.hasOwnProperty(bodyDetail.requestBody, "raw")) {
                postedString = new TextDecoder("utf-8").decode(bodyDetail.requestBody.raw[0].bytes);
            }
        }
    } catch (e) {
        // exceptionをキャッチした場合NULLを返す
        return null;
    }

//#xxxxx 20240417 CHG S
//  if (headerDetail.url.toLowerCase().indexOf("pipe.aria.microsoft.com/collector") > -1) {
    if ((headerDetail.url.toLowerCase().indexOf("pipe.aria.microsoft.com/collector") > -1) ||
        (headerDetail.url.toLowerCase().indexOf("browser.events.data.microsoft.com/onecollector") > -1) ||
        (headerDetail.url.toLowerCase().indexOf(".microsoft.com/onecollector") > -1)) {
//#xxxxx 20240417 CHG E
        var referer_value = "";
        if (commons.isFirefox()) {
            // URLからサイト名を取得
            if (commons.hasOwnProperty(headerDetail, "originUrl")) {
                referer_value = commons.extractHostDomain(headerDetail.originUrl);
            }
        } else {
            // URLからサイト名を取得
            if (commons.hasOwnProperty(headerDetail, "initiator")) {
                referer_value = commons.extractHostDomain(headerDetail.initiator);
            }
        }
        if (referer_value.toLowerCase().indexOf("onedrive.live.com") > -1) {
            if (postedString.includes("CommandView.Upload.Html5file.Click")) {
                // リトライでないことを判定
                // RequestBodyの中身を判定して、ファイルのアップロードダイアログの開始を検知
                // window.alert("CommandView.Upload.Html5file.Click");
                return true;
            }
            if (postedString.includes("CommandView.Upload.Folder.Click")) {
                // リトライでないことを判定
                // ReqeustBodyの中身を判定して、フォルダのアップロードダイアログの開始を検知
                // window.alert("CommandView.Upload.Folder.Click");
                return true;
            }

            if (postedString.includes("DragAndDropEvent") && postedString.includes("UploadOperation_dragAndDrop")) {
                if (!postedString.includes("createUploadSession")) {
                    // この場合、リトライではないアップロードとみなせるのでアラートを出す
                    // ドラッグアンドドロップでアップロードした場合
                    return true;
                }
            }
//#10457 20230210 ADD S
            if (postedString.includes("UsageType\u0005Click\u0004Name\u0006Upload")) {
                // リトライでないことを判定
                // ReqeustBodyの中身を判定して、アップロードの開始を検知
                return true;
            }
            if (postedString.includes("UsageType\u0004Drop\u0004Name\u0006Upload")) {
                // リトライでないことを判定
                // ReqeustBodyの中身を判定して、アップロードの開始を検知
                return true;
            }
//#10457 20230210 ADD E
//#xxxxx 20240417 ADD S
            if (postedString.includes('"UsageType":"Click","Name":"Upload"')) {
                // リトライでないことを判定
                // ReqeustBodyの中身を判定して、アップロードの開始を検知
                return true;
            }
            if (postedString.includes('"UsageType":"Drop","Name":"Upload"')) {
                // リトライでないことを判定
                // ReqeustBodyの中身を判定して、アップロードの開始を検知
                return true;
            }
//#xxxxx 20240417 ADD E
        }
    }

    return false;
}

/**
 * OneDrive(API)のアップロードログを採取する
 * @param  {Object} headerDetail リクエストヘッダーの詳細
 * @return {String} アップロードファイルのファイル名を返す
 */
export function uploadOneDriveApi(headerDetail)
{
    if (!headerDetail) {
        return null;
    }

    if (!commons.hasOwnProperty(headerDetail, "method") || !commons.hasOwnProperty(headerDetail, "url")) {
        return null;
    }

    var filename = null;
    var url_properties_array = [];
    if (headerDetail.method.toLowerCase() == 'post') {
        if (headerDetail.url.toLowerCase().includes("api.onedrive.com")) {
            if (headerDetail.url.toLowerCase().includes("createuploadsession")) {
                // URLを"/"区切りで分ける
                url_properties_array = headerDetail.url.split(':/');
            }
            for (let i = 0; i < url_properties_array.length; i++) {
                if (url_properties_array[i].toLowerCase().includes("createuploadsession")) {
                    // createuploadsessionの一つ前のセクションにファイル名がある
                    filename = decodeURIComponent(url_properties_array[i - 1]);
                    return filename;
                }
            }
        }
    }

    return null;
}

/**
 * OneDrive(aspx)のアップロードログを採取する
 * @param  {Object} headerDetail リクエストヘッダーの詳細
 * @return {String} アップロードファイルのファイル名を返す
 */
export function uploadOneDriveAspx(headerDetail)
{
    if (!headerDetail) {
        return null;
    }

    if (!commons.hasOwnProperty(headerDetail, "method") || !commons.hasOwnProperty(headerDetail, "url")) {
        return null;
    }

    var filename = "";
    var guid = "";
    var referer_value = "";
    if (commons.isFirefox()) {
        // URLからサイト名を取得
        if (commons.hasOwnProperty(headerDetail, "originUrl")) {
            referer_value = commons.extractHostDomain(headerDetail.originUrl);
        }
    } else {
        // URLからサイト名を取得
        if (commons.hasOwnProperty(headerDetail, "initiator")) {
            referer_value = commons.extractHostDomain(headerDetail.initiator);
        }
    }

    if (headerDetail.requestHeaders) {
        // get URL
        if (headerDetail.url.toLowerCase().indexOf("/files/addusingpath") > -1
            || headerDetail.url.toLowerCase().indexOf("/files/addstubusingpath") > -1) { //大容量ファイルの場合
            var url_parameters = headerDetail.url.split("&");
            // "/Files/...UsingPath(xxx)?" xxxの部分を取得する
            var extracted_url = headerDetail.url.match(/UsingPath\((DecodedUrl=[^\\(\\)]+)\)/);
            //console.log("test: " + extracted_url[1]);
            // [,]で区切る
            var usingpath_parameters = [];
            if (!commons.isUndefinedOrNull(extracted_url)) {
                usingpath_parameters = extracted_url[1].split(",");
            }
            // DecodedUrl=”xxx” xxxを取得する
            var filepath_key = "";
            for (let i = 0; i < usingpath_parameters.length; i++) {
                // DecodeUrl=xxx extracted_url[1]にxxxが入っている
                if (usingpath_parameters[i].startsWith("DecodedUrl=")) {
                    filepath_key = commons.parseKeyValue(usingpath_parameters[i]);
                    break;
                }
            }
            if (filepath_key != null || filepath_key != "") {
                for (let i = 0; i < url_parameters.length; i++) {
                    // DecodeUrl=xxx extracted_url[1]にxxxが入っている
                    if (url_parameters[i].startsWith(filepath_key)) {
                        filename = decodeURIComponent(commons.parseKeyValue(url_parameters[i]));
//PH22053/PH22054 20220609 ADD S
                        if (referer_value.includes("sharepoint.com") && filename.startsWith("'") && filename.endsWith("'")) {
                            filename = filename.substring(1, filename.length - 1)
                        }
//PH22053/PH22054 20220609 ADD E
                    }
                }
            }

            // GUIDを取得する
            if (headerDetail.url.toLowerCase().indexOf("/files/addstubusingpath") > -1) { //大容量ファイルの場合
                var uploadid_url = headerDetail.url.match(/StartUpload\((uploadId=[^\\(\\)]+)\)/);
                // [,]で区切る
                var uploadid_parameters = [];
                if (!commons.isUndefinedOrNull(uploadid_url)) {
                    uploadid_parameters = uploadid_url[1].split(",");
                }
                // uploadId=”xxx” xxxを取得する
                var uploadid_key = "";
                for (let i = 0; i < uploadid_parameters.length; i++) {
                    // DecodeUrl=xxx extracted_url[1]にxxxが入っている
                    if (uploadid_parameters[i].startsWith("uploadId=")) {
                        uploadid_key = commons.parseKeyValue(uploadid_parameters[i]);
                        break;
                    }
                }

                if (uploadid_key != null || uploadid_key != "") {
                    for (let i = 0; i < url_parameters.length; i++) {
                        // DecodeUrl=xxx extracted_url[1]にxxxが入っている
                        if (url_parameters[i].startsWith(uploadid_key)) {
                            guid = decodeURIComponent(commons.parseKeyValue(url_parameters[i]));
                        }
                    }
                }
            }
            return { filename: filename, guid: guid };
        }
    }

    return null;
}

/**
 * OneDrive(Office365)のアップロードログを採取する
 * @param  {Object} headerDetail リクエストヘッダーの詳細
 * @return {String}       アップロードファイルのファイル名を返す
 */
export function uploadOneDriveO365(headerDetail)
{
    if (!headerDetail) {
        return null;
    }

    if (!commons.hasOwnProperty(headerDetail, "method") || !commons.hasOwnProperty(headerDetail, "url")) {
        return null;
    }

    var filename = null;
    if (headerDetail.method.toLowerCase() == 'post') {
        var referer_value = "";
        if (commons.isFirefox()) {
            // URLからサイト名を取得
            if (commons.hasOwnProperty(headerDetail, "originUrl")) {
                referer_value = commons.extractHostDomain(headerDetail.originUrl);
            }
        } else {
            // URLからサイト名を取得
            if (commons.hasOwnProperty(headerDetail, "initiator")) {
                referer_value = commons.extractHostDomain(headerDetail.initiator);
            }
        }
        var url_properties_array = [];
        if (referer_value.toLowerCase().includes("outlook.office.com")) {
            if (headerDetail.url.toLowerCase().includes("createuploadsession")) {
                // URLを"/"区切りで分ける
                url_properties_array = headerDetail.url.split(':/');
            }
            for (let i = 0; i < url_properties_array.length; i++) {
                if (url_properties_array[i].toLowerCase().includes("createuploadsession")) {
                    // createuploadsessionの一つ前のセクションにファイル名がある
                    filename = url_properties_array[i - 1];
                    return filename;
                }
            }
        }
    }

    return null;
}

//PH22304/PH22305 20220908 CHG S H.HONMA
/**
 * DropBoxのアップロードログを採取する
 * @param {Object} bodyDetail リクエストボディの詳細
 * @param {Object} headerDetail リクエストヘッダーの詳細
 * @param {boolean} isProhibitUpload アップロード禁止フラグ
 * @return {Object} アップロード情報（ファイル名、アップロードキャンセルフラグ）
 */
export function uploadDropBox(bodyDetail, headerDetail, isProhibitUpload)
{
    if (commons.isUndefinedOrNull(bodyDetail) || commons.isUndefinedOrNull(headerDetail)) {
        return null;
    }

    if (!commons.hasOwnProperty(headerDetail, "method") || !commons.hasOwnProperty(headerDetail, "url")) {
        return null;
    }

    var url = headerDetail.url;
    // Drobbox/Dropbox for Businessの場合
    if (url.toLowerCase().startsWith("https://www.dropbox.com")) {
        if (url.toLowerCase() == "https://www.dropbox.com/cmd/upload_precheck") {
            if (isProhibitUpload) {
//#12301 20231121 CHG S
//              return { filename: "", cancel: true };
                return {
                    filenames: [],
                    cancel: true
                }
//#12301 20231121 CHG E
            }
            return null;
        }
//#12301 20231121 CHG S
//      if (url.toLowerCase() == "https://www.dropbox.com/log/web_upload_action") {
//          try {
//              if (hasOwnProperty(bodyDetail, REQUEST_BODY)) {
//                  var requestBody = bodyDetail.requestBody;
//                  if (hasOwnProperty(requestBody, "formData")) {
//                      var formData   = requestBody.formData;
//                      var event_type = formData.event_type[0];
//                      // アップロード成功の場合
//                      if (event_type == "upload_success") {
//                          var extra_param = stringToJson(formData.extra_params[0]);
//                          var filename    = extra_param.file_name;
//                          return { filename: filename, cancel: false };
//                      }
//                  }
//              }
//          }
//          catch (e) {
//              // 例外をキャッチした場合NULLを返す
//              return null;
//          }
//      }
        if (url.toLowerCase().startsWith("https://www.dropbox.com") &&
            url.toLowerCase().includes("upload_session/finish_batch"))
        {
            try {
                if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
                    var postedString = "";
                    if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
                        if (commons.hasOwnProperty(bodyDetail.requestBody, "raw")) {
                            var data = {
                                filenames: [],
                                cancel: false
                            };
                            postedString = new TextDecoder("utf-8").decode(bodyDetail.requestBody.raw[0].bytes);
                            var json = commons.stringToJson(postedString);
                            for (var i = 0; i < json.entries.length; i++) {
                                var filepath = json.entries[i].commit.path;
                                var filename = filepath.split("/").pop();
                                data.filenames.push(filename);
                            }
                            return data;
                        }
                    }
                }
            }
            catch (e) {
                // 例外をキャッチした場合NULLを返す
                return null;
            }
        }
//#12301 20231121 CHG E
    }

    return null;
}
///**
// * DropBoxのアップロードログを採取する
// * @param  {Object} bodyDetail リクエストボディの詳細
// * @param  {Object} headerDetail リクエストヘッダーの詳細
// * @return {Object}       アップロードファイルとキー
// */
//function uploadDropBox(bodyDetail, headerDetail) {
//    if (isUndefinedOrNull(bodyDetail) || isUndefinedOrNull(headerDetail)) {
//        return null;
//    }
//
//    if (!hasOwnProperty(headerDetail, "method") || !hasOwnProperty(headerDetail, "url")) {
//        return null;
//    }
//
//    var filename = null;
//    var content_type = "";
//    if (hasOwnProperty(headerDetail, "requestHeaders")) {
//        content_type = findHeader(headerDetail.requestHeaders, "content-type");
//    }
//    // Contet-Typeフィールドの値が「application/octet-stream」
//    if (content_type != "" && content_type.toLowerCase().indexOf("application/octet-stream") > -1) {
//        // URLのパス情報に「Chunked_upload」
//        if (headerDetail.url.toLowerCase().indexOf("commit_web_upload_by_token") > -1) {
//            var url_properties_array = headerDetail.url.split('&');
//            for (let i = 0; i < url_properties_array.length; i++) {
//                var target = "name="
//                var name_index = url_properties_array[i].toLowerCase().indexOf(target);
//                if (name_index > -1) {
//                    // URLのクエリ文字列のキー名「name」の値をURLでコードし、ファイル名とする
//                    filename = decodeURIComponent(url_properties_array[i].slice(name_index + target.length));
//
//                    var postedString = "";
//                    try {
//                        // requestBody本体を取得
//                        if (hasOwnProperty(bodyDetail, REQUEST_BODY)) {
//                            if (hasOwnProperty(bodyDetail.requestBody, "raw")) {
//                                postedString = new TextDecoder("utf-8").decode(bodyDetail.requestBody.raw[0].bytes);
//                            }
//                        }
//                    } catch (e) {
//                        // exceptionをキャッチした場合NULLを返す
//                        return null;
//                    }
//                    // ["xxx","yy"]配列の最初の要素を取り出す
//                    key = postedString.match(/\["(.*?)"/)[1];
//
//                    return { filename: filename, key: key };
//                }
//            }
//        }
//    }
//
//    return null;
//}
//PH22304/PH22305 20220908 CHG E H.HONMA

/**
 * MultiPartのアップロードログを採取する
 * @param  {Object} bodyDetail リクエストボディの詳細
 * @param  {Object} headerDetail リクエストヘッダーの詳細
 * @return {String} アップロードファイルのファイル名を返す
 */
export function uploadMultiPart(bodyDetail, headerDetail)
{
    if (!bodyDetail || !headerDetail) {
        return null;
    }

    if (!commons.hasOwnProperty(headerDetail, "method") || !commons.hasOwnProperty(headerDetail, "url")) {
        return null;
    }

    var multiPart_Upload = false;
//#xxxxx 20240417 CHG S
//  var filename = null;
    var filenames = [];
//#xxxxx 20240417 CHG E
    if (headerDetail.requestHeaders) {
        var contentType_value = "";
        if (commons.hasOwnProperty(headerDetail, "requestHeaders")) {
            contentType_value = commons.findHeader(headerDetail.requestHeaders, "Content-Type");
        }
        if (contentType_value) {
            if (contentType_value.indexOf("multipart/") > -1) {
                // if true, this is upload
                multiPart_Upload = true;
            }
        }
    }
    if (multiPart_Upload) {
        if (commons.isFirefox()) {
            if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
                if (commons.hasOwnProperty(bodyDetail.requestBody, "formData")) {
//#xxxxx 20240417 ADD S
                    if (commons.hasOwnProperty(bodyDetail.requestBody.formData, "attachFile")) {
                        // ServiceNowの場合
                        if (!commons.isUndefinedOrNull(bodyDetail.requestBody.formData.attachFile)) {
                            var attachFile = bodyDetail.requestBody.formData.attachFile;
                            for (let i = 0; i < attachFile.length; i++) {
                                filenames.push(attachFile[i]);
                            }
                        }
                    }
//#xxxxx 20240417 ADD E
                    if (commons.hasOwnProperty(bodyDetail.requestBody.formData, "upfile")) {
                        if (!commons.isUndefinedOrNull(bodyDetail.requestBody.formData.upfile)) {
//#xxxxx 20240417 CHG S
//                          filename = bodyDetail.requestBody.formData.upfile[0];
                            filenames.push(bodyDetail.requestBody.formData.upfile[0]);
//#xxxxx 20240417 CHG E
                        }
                    }
                }
            }
//#xxxxx 20240417 CHG S
//          return filename;
            if (filenames.length > 0) {
                return filenames;
            } else {
                return null;
            }
//#xxxxx 20240417 CHG E
        } else {
            var postedString = "";
//#xxxxx 20240417 CHG S
            if (commons.hasOwnProperty(bodyDetail, constants.REQUEST_BODY)) {
                if (commons.hasOwnProperty(bodyDetail.requestBody, "raw")) {
                    for (let j = 0; j < bodyDetail.requestBody.raw.length; j++) {
                        postedString = new TextDecoder("utf-8").decode(bodyDetail.requestBody.raw[j].bytes);
                        if (postedString.length > 0) {
                            var textArray = postedString.split(/\r\n|\r|\n/);
                            // ファイルプロパティ格納用
                            var file_properties_array = [];
                            // 最初の文字列が・最初の文字列がContent-Typeのものを見つける
                            for (let i = 0; i < textArray.length; i++) {
                                //console.log("textArray[i] = " +  textArray[i]);
                                if (textArray[i].toLowerCase().startsWith("content-disposition:")) {
                                    // 「;」ごとに分割していく
                                    // console.log("textArray[i].split(';') = " + textArray[i].split(';'));
                                    if (textArray[i].includes("filename=")) {
                                        // 「filname=」という文字列が存在したら、ループを抜ける
                                        file_properties_array = textArray[i].split(';');
                                        break;
                                    }
                                }
                            }
                            // console.log("file_peroperties_array = " + file_properties_array);
                            // filename=が出てきたら、それを見つける
                            for (let i = 0; i < file_properties_array.length; i++) {
                                if (file_properties_array[i].toLowerCase().includes("filename=")) {
                                    filenames.push(postedString.match(/filename="(.*?)"/)[1]);
                                }
                            }
                        }
                    }
                }
            }
            if (filenames.length > 0) {
                return filenames;
            } else {
                return null;
            }
//          if (hasOwnProperty(bodyDetail, REQUEST_BODY)) {
//              if (hasOwnProperty(bodyDetail.requestBody, "raw")) {
//                  postedString = new TextDecoder("utf-8").decode(bodyDetail.requestBody.raw[0].bytes);
//              }
//          }
//          // 一行ずつ処理
//          var textArray = postedString.split(/\r\n|\r|\n/);
//          // ファイルプロパティ格納用
//          var file_properties_array = [];
//          // 最初の文字列が・最初の文字列がContent-Typeのものを見つける
//          for (let i = 0; i < textArray.length; i++) {
//              //console.log("textArray[i] = " +  textArray[i]);
//              if (textArray[i].toLowerCase().startsWith("content-disposition:")) {
//                  // 「;」ごとに分割していく
//                  // console.log("textArray[i].split(';') = " + textArray[i].split(';'));
//                  if (textArray[i].includes("filename=")) {
//                      // 「filname=」という文字列が存在したら、ループを抜ける
//                      file_properties_array = textArray[i].split(';');
//                      break;
//                  }
//              }
//          }
//          // console.log("file_peroperties_array = " + file_properties_array);
//          // filename=が出てきたら、それを見つける
//          for (let i = 0; i < file_properties_array.length; i++) {
//              if (file_properties_array[i].toLowerCase().includes("filename=")) {
//                  filename = postedString.match(/filename="(.*?)"/)[1];
//                  return filename;
//              }
//          }
//#xxxxx 20240417 CHG E
        }
    }

    return null;
}
