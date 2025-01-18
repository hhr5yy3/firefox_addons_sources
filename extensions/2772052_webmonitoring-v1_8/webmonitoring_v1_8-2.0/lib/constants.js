//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// 数値定数
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/**
 * 検索対象が見つからなかったことを表す数値定数
 * 
 * @const {Number}
 */
export const NOT_FOUND = -1;

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// ブラウザー名
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/**
 * 拡張機能名
 * 
 * @const {String}
 */
export const EXTENSION_NAME = 'Systemwalker Desktop Keeper';

/**
 * ブラウザー名（'Firefox'）を表す文字列定数
 * 
 * @const {String}
 */
export const FIREFOX = 'firefox';

/**
 * ブラウザー名（'Firefox'）を表す文字列定数（拡張子付き）
 * 
 * @const {String}
 */
export const FIREFOX_EXE = 'firefox.exe';

/**
 * ブラウザー名（'Chrome'）を表す文字列定数
 * 
 * @const {String}
 */
export const CHROME = 'chrome';

/**
 * ブラウザー名（'Chrome'）を表す文字列定数（拡張子付き）
 * 
 * @const {String}
 */
export const CHROME_EXE = 'chrome.exe';

/**
 * ブラウザー名（'Edge'）を表す文字列定数
 * 
 * @const {String}
 */
export const EDGE = "msedge";

/**
 * ブラウザー名（'Edge'）を表す文字列定数（拡張子付き）
 * 
 * @const {String}
 */
export const EDGE_EXE = "msedge.exe";

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// URL or Path
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/**
 * 'Gmail' または 'Gmail for work' の URL を表す文字列定数
 * 
 * @const {String}
 */
export const HTTPS_MAIL_GOOGLE_COM = 'https://mail.google.com';

/**
 * 'Gmail' または 'Gmail for work' のメール処理に関する URL を表す文字列定数
 * 
 * @const {String}
 */
export const HTTPS_MAIL_GOOGLE_COM_SYNC = 'https://mail.google.com/sync/';

/**
 * 'Outlook.com' の URL を表す文字列定数
 * 
 * @const {String}
 */
export const HTTPS_OUTLOOK_LIVE_COM = 'https://outlook.live.com';

/**
 * 'Outlook for Microsoft 365' の URL を表す文字列定数
 * 
 * @const {String}
 */
export const HTTPS_OUTLOOK_OFFICE_COM = 'https://outlook.office.com';

/**
 * 'Outlook for Microsoft 365' の URL を表す文字列定数
 * 
 * @const {String}
 */
export const HTTPS_OUTLOOK_OFFICE365_COM = 'https://outlook.office365.com';

/**
 * 'Outlook.com' の OWA - URL を表す文字列定数
 * 
 * @const {String}
 */
export const HTTPS_OUTLOOK_LIVE_COM_OWA = 'https://outlook.live.com/owa/';

/**
 * 'Outlook for Microsoft 365' の OWA - URL を表す文字列定数
 * 
 * @const {String}
 */
export const HTTPS_OUTLOOK_OFFICE_COM_OWA = 'https://outlook.office.com/owa/';

/**
 * 'Outlook for Microsoft 365' の OWA - URL を表す文字列定数
 * 
 * @const {String}
 */
export const HTTPS_OUTLOOK_OFFICE365_COM_OWA = 'https://outlook.office365.com/owa/';

/**
 * TODO: 未稿!!
 * 
 * @const {String}
 */
export const HTTPS_LOGIN_MICROSOFTONLINE_COM = 'https://login.microsoftonline.com';

/**
 * TODO: 未稿!!
 * 
 * @const {String}
 */
export const HTTPS_LOGIN_LIVE_COM_PPSECURE_POST_SRF_WA_WSIGNIN_1_0 = 'https://login.live.com/ppsecure/post.srf?wa=wsignin1.0';

/**
 * TODO: 未稿!!
 * 
 * @const {String}
 */
export const HTTPS_LOGIN_MICROSOFT_ONLINE_COM_COMMON_LOGIN = 'https://login.microsoftonline.com/common/login';

/**
 * TODO: 未稿!!
 * 
 * @const {String}
 */
export const OUTLOOK_OFFICE_COM_SAIRENT_LOGIN_PATH = '/startupdata.ashx?app=Mail';

/**
 * 'Outlook.com' または 'Outlook for Microsoft 365' の URL であることを表す文字列定数の配列
 * 
 * @const {Array}
 */
export const OUTLOOK_URLS = [
    'https://outlook.live.com',
    'https://outlook.office.com',
    'https://outlook.office365.com',
    'https://login.microsoftonline.com',
];

/**
 * 'Outlook for Microsoft 365' の URL であることを表す文字列定数の配列
 * 
 * @const {Array}
 */
export const OUTLOOK_FOR_MICROSOFT_365_URLS = [
    HTTPS_OUTLOOK_OFFICE_COM,
    HTTPS_OUTLOOK_OFFICE365_COM,
];

/**
 * 'Outlook.com' または 'Outlook for Microsoft 365' の OWA - URL であることを表す文字列定数の配列
 * 
 * @const {Array}
 */
export const OUTLOOK_OFFICE_OWA_BASE_URLS = [
    'https://outlook.live.com/owa/',
    'https://outlook.office.com/owa/',
    'https://outlook.office365.com/owa/'
];

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// アクション
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/**
 * 'Outlook.com' の通常ログイン処理（ログインダイアログ表示）を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_OUTLOOK_OFFICECOM_LOGIN = 'Outlook.com login';

/**
 * 'Outlook.com' のサイレントログイン処理（ログインダイアログ表示なし）を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_OUTLOOK_OFFICECOM_SAIRENT_LOGIN = 'Outlook.com Sairento login';

/**
 * 'Outlook for Microsoft 365' の通常ログイン処理（ログインダイアログ表示）を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_OUTLOOK_OFFICE365_LOGIN = 'Outlook for Microsoft 365 login';

/**
 * 'Outlook for Microsoft 365' のサイレントログイン処理（ログインダイアログ表示なし）を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_OUTLOOK_OFFICE365_SAIRENT_LOGIN = 'Outlook for Microsoft 365 Sairento login';

/**
 * メール新規作成処理を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_CREATE_ITEM = 'CreateItem';

/**
 * TODO: 未稿!!
 * 
 * @const {String}
 */
export const ACTION_ADD_ENTITY_FEEDBACK = 'AddEntityFeedback';

/**
 * TODO: 未稿!!
 * 
 * @const {String}
 */
export const ACTION_GET_ATTACHMENT_PREVIEWS = 'GetAttachmentPreviews';

/**
 * メール更新処理またはメール送信処理を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_UPDATE_ITEM = 'UpdateItem';

//#10837 20230110 ADD S
/**
 * メール破棄処理を表す文字列定数
 * @const {String}
 */
export const ACTION_DELETE_ITEM = 'DeleteItem';
//#10837 20230110 ADD E

/**
 * メール情報取得処理を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_GET_ITEM = 'GetItem';

/**
 * ファイル添付処理を表す文字列定数
 * 
 * @const {String}
 * @description [添付] > [このコンピューターから選択]
 * @description [添付] > [OneDrive] > [最近使用した添付ファイル]
 */
export const ACTION_CREATE_ATTACHMENT_FROM_LOCAL_FILE = 'CreateAttachmentFromLocalFile';

/**
 * ファイル添付処理を表す文字列定数
 * 
 * @const {String}
 * @description ［添付］→［クラウドの場所から選択］→［コピーとして添付］
 * @description 2022/12/15現在、このリクエストは発生しない
 */
export const ACTION_CREATE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER = 'CreateAttachmentFromAttachmentDataProvider';

//#10829 2022/12/15 ADD S
/**
 * ファイル添付処理を表す文字列定数（Outlook for Microsoft 365）
 * @const {String}
 * @description [添付] > [OneDrive] > [添付]
 * @description [添付] > [アップロードして共有]
 */
 export const ACTION_GET_SHARING_INFORMATION = 'GetSharingInformation';
//#10829 2022/12/15 ADD E

//#10829 2022/12/15 CHG S
///**
// * ファイル添付処理を表す文字列定数
// * 
// * @const {String}
// * @description ［添付］→［クラウドの場所から選択］→［OneDrive - 個人用のリンクとして共有する］
// */
/**
 * ファイル添付処理を表す文字列定数
 * 
 * @const {String}
 * @description [添付] > [アップロードして共有]
 */
 export const ACTION_CREATE_REFERENCE_ATTACHMENT_FROM_ATTACHMENT_DATA_PROVIDER = 'CreateReferenceAttachmentFromAttachmentDataProvider';
//#10829 2022/12/15 CHG E

/**
 * 添付ファイル削除処理を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_DELETE_ATTACHMENT = 'DeleteAttachment';

/**
 * 添付ファイル取り消し処理を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_CANCEL_ATTACHMENT = 'CancelAttachment';

/**
 * コンテンツウィンドウ内でのタブ切り替え処理を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_GET_ALL_CLIENT_EXTENSIONS_NOTIFICATIONS = 'GetAllClientExtensionsNotifications';

/**
 * メールアカウント取得処理を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION_GET_MAILBOX_IDENTITY = 'GetMailboxByIdentity';

//#10837 20230110 ADD S
/**
 * @const {String}
 */
export const ACTION_BROWSER_EXTENSION = 'BrowserExtension';
//#10837 20230110 ADD E

/**
 * 不明なアクション
 * 
 * @const {String}
 */
export const ACTION_UNKNOWN = 'Unknown';

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// プロパティの名前、連想配列キーの名前
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/**
 * Outlook.com のドメインを表す文字列定数
 * 
 * @const {String}
 */
export const DOMAIN_LOGIN_LIVE_COM = '.login.live.com';

/**
 * 'requestBody' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const REQUEST_BODY = 'requestBody';

/**
 * 'raw' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const RAW = 'raw';

/**
 * 'requestHeaders' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const REQUEST_HEADERS = 'requestHeaders';

/**
 * 'formData' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const FORM_DATA = 'formData';

/**
 * 'x-req-source' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const X_REQ_SOURCE = 'x-req-source';

/**
 * 'x-owa-action' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const X_OWA_ACTION = 'x-owa-action';

/**
 * 'action' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ACTION = 'action';

/**
 * 'login' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const LOGIN = 'login';

/**
 * 'X-OWA-UrlPostData' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 * @description 同名ですべて小文字の 'x-owa-urlpostdata' が存在するので要注意!!
 */
export const X_OWN_URL_POST_DATA_1 = 'X-OWA-UrlPostData';

/**
 * 'x-owa-urlpostdata' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 * @description 同名で大小文字が混在している 'X-OWA-UrlPostData' が存在するので要注意!!
 */
export const X_OWN_URL_POST_DATA_2 = 'x-owa-urlpostdata';

/**
 * 'JSH' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const JSH = 'JSH';

/**
 * 'DefaultAnchorMailbox' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const DEFAULT_ANCHOR_MAILBOX = 'DefaultAnchorMailbox';

/**
 * '__type' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const __TYPE = '__type';

/**
 * 'Header' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const HEADER = 'Header';

/**
 * 'Body' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const BODY = 'Body';

/**
 * 'NewBodyContent' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const NEW_BODY_CONTENT = 'NewBodyContent';

/**
 * 'BodyType' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const BODY_TYPE = 'BodyType';

/**
 * 'Subject' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const SUBJECT = 'Subject';

/**
 * 'ToRecipients' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const TO_RECIPIENTS = 'ToRecipients';

/**
 * 'CcRecipients' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const CC_RECIPIENTS = 'CcRecipients';

/**
 * 'BccRecipients' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const BCC_RECIPIENTS = 'BccRecipients';

/**
 * 'MessageDisposition' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const MESSAGE_DISPOSITION = 'MessageDisposition';

/**
 * 'ItemChanges' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ITEM_CHANGES = 'ItemChanges';

/**
 * 'Updates' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const UPDATES = 'Updates';

/**
 * 'ItemId' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 * @description 同名で構成文字の大小文字が異なる 'itemId' が存在するので要注意!!
 */
export const ITEM_ID = 'ItemId';

/**
 * 'itemId' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 * @description 同名で構成文字の大小文字が異なる 'ItemId' が存在するので要注意!!
 */
export const ITEM_ID_2 = 'itemId';

/**
 * 'ItemIds' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ITEM_IDS = 'ItemIds';

/**
 * 'Path' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const PATH = 'Path';

/**
 * 'Item' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ITEM = 'Item';

/**
 * 'Items' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ITEMS = 'Items';

/**
 * 'ParentItemId' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const PARENT_ITEM_ID = 'ParentItemId';

/**
 * 'Attachments' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ATTACHMENTS = 'Attachments';

/**
 * 'Id' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ID = 'Id';

/**
 * 'ChangeKey' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const CHANGE_KEY = 'ChangeKey';

/**
 * 'RootItemId' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ROOT_ITEM_ID = 'RootItemId';

/**
 * 'RootItemChangeKey' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ROOT_ITEM_CHANGE_KEY = 'RootItemChangeKey';

/**
 * 'Name' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const NAME = 'Name';

/**
 * 'Value' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 * @description 同名で構成文字の大小文字が異なる 'value' が存在するので要注意!!
 */
export const VALUE_1 = 'Value';

/**
 * 'value' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 * @description 同名で構成文字の大小文字が異なる 'Value' が存在するので要注意!!
 */
export const VALUE_2 = 'value';

/**
 * 'AttachmentId' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ATTACHMENT_ID = 'AttachmentId';

/**
 * 'AttachmentIds' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const ATTACHMENT_IDS = 'AttachmentIds';

/**
 * 'CancellationId' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 * @description 同名で構成文字の大小文字が異なる 'cancellationId' が存在するので要注意!!
 */
export const CANCELLATION_ID_1 = 'CancellationId';

/**
 * 'cancellationId' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 * @description 同名で構成文字の大小文字が異なる 'CancellationId' が存在するので要注意!!
 */
export const CANCELLATION_ID_2 = 'cancellationId';

/**
 * 'location' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const LOCATION = 'location';

/**
 * 'ResponseMessages' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const RESPONSE_MESSAGES = 'ResponseMessages';

/**
 * 'EmailAddress' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const EMAIL_ADDRESS = 'EmailAddress';

/**
 * 'ShapeName' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const SHAPE_NAME = 'ShapeName';

/**
 * 'ResponseCode' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const RESPONSE_CODE = 'ResponseCode'

/**
 * 'ResponseClass' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const RESPONSE_CLASS = 'ResponseClass';

/**
 * 'Identity' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const IDENTITY = 'Identity';

/**
 * 'RawIdentity' プロパティ、または連想配列キーの名前を表す文字列定数
 * 
 * @const {String}
 */
export const RAW_IDENTIRY = 'RawIdentity';

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// プロパティ、連想配列の値
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

export const X_ANCHORMAILBOX = 'x-anchormailbox';
export const OPERATION = 'operation';
export const OPERATION_NEW = 'New';
export const OPERATION_FORWARD = 'Forward';
export const OPERATION_REPLY = 'Reply';
export const OPERATION_REPLY_ALL = 'ReplyAll';

export const MAIL_BOX_INFO = 'mailboxInfo';
export const MAIL_BOX_SMTP_ADDRESS = 'mailboxSmtpAddress'
export const USER_IDENTITY = 'userIdentity';

export const UPDATE_RESPONSE_ITEM_ID = 'UpdateResponseItemId';

/**
 * メールが保存されることを表す文字列定数
 * 
 * @const {String}
 */
export const MESSAGE_DISPOSITION_SAVE_ONLY = 'SaveOnly';

/**
 * メールが保存および送信されることを表す文字列定数
 * 
 * @const {String}
 */
export const MESSAGE_DISPOSITION_SEND_AND_SAVE_COPY = 'SendAndSaveCopy';

/**
 * 'ShapeName' プロパティの値（正規化されたアイテム）を表す文字列定数
 * 
 * @const {String}
 */
export const ITEM_NORMALIZED_BODY = 'ItemNormalizedBody';

/**
 * 'ShapeName' プロパティの値（メール作成）を表す文字列定数
 * 
 * @const {String}
 */
export const MAIL_COMPOSE = 'MailCompose';

/**
 * 正常
 * 
 * @const {String}
 */
export const NO_ERROR = 'NoError';

/**
 * 成功
 * 
 * @const {String}
 */
export const SUCCESS = 'Success';

/**
 * 'BodyType' プロパティの値（'HTML'）を表す文字列定数
 * 
 * @const {String}
 */
export const HTML = 'HTML';

/**
 * 'x-req-source' プロパティの値（'Mail'）を表す文字列定数
 * 
 * @const {String}
 */
export const MAIL = 'Mail';

/**
 * 'x-req-source' プロパティの値（'MailDeepLink'）を表す文字列定数
 * 
 * @const {String}
 * @description Outlook.com/Outlook for Microsoft 365でメール編集画面をポップアップして送信する際に設定される
 */
export const MAIL_DEEP_LINK = 'MailDeepLink';

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// JSON データ種別
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/**
 * JSON形式のデータ種別（'JsonRequestHeaders:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_JSON_REQUEST_HEADERS = 'JsonRequestHeaders:#Exchange';

/**
 * JSON形式のデータ種別（'CreateItemJsonRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_CREATE_ITEM_JSON_REQUEST = 'CreateItemJsonRequest:#Exchange';

/**
 * JSON形式のデータ種別（'CreateItemRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_CREATE_ITEM_REQUEST = 'CreateItemRequest:#Exchange';

/**
 * JSON形式のデータ種別（'UpdateItemJsonRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_UPDATE_ITEM_JSON_REQUEST = 'UpdateItemJsonRequest:#Exchange';

/**
 * JSON形式のデータ種別（'UpdateItemRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_UPDATE_ITEM_REQUEST = 'UpdateItemRequest:#Exchange';

//#10837 20230110 ADD S
/**
 * JSON形式のデータ種別（'DeleteItemJsonRequest:#Exchange'）を表す文字列定数
 * @const {String}
 */
 export const JSONTYPE_DELETE_ITEM_JSON_REQUEST = 'DeleteItemJsonRequest:#Exchange';

 /**
  * JSON形式のデータ種別（'DeleteItemRequest:#Exchange'）を表す文字列定数
  * @const {String}
  */
 export const JSONTYPE_DELETE_ITEM_REQUEST = 'DeleteItemRequest:#Exchange';
//#10837 20230110 ADD E

/**
 * JSON形式のデータ種別（'GetItemJsonRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_GET_ITEM_JSON_REQUEST = 'GetItemJsonRequest:#Exchange';

/**
 * JSON形式のデータ種別（'GetItemRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_GET_ITEM_REQUEST = 'GetItemRequest:#Exchange';

/**
 * JSON形式のデータ種別（'GetItemResponse:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_GET_ITEM_RESPONSE = 'GetItemResponse:#Exchange';

/**
 * JSON形式のデータ種別（'CreateAttachmentJsonRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_CREATE_ATTACHMENT_JSON_REQUEST = 'CreateAttachmentJsonRequest:#Exchange';

/**
 * JSON形式のデータ種別（'CreateAttachmentRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_CREATE_ATTACHMENT_REQUEST = 'CreateAttachmentRequest:#Exchange';

/**
 * JSON形式のデータ種別（'CreateAttachmentResponse:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_CREATE_ATTACHMENT_RESPONSE = 'CreateAttachmentResponse:#Exchange';

/**
 * JSON形式のデータ種別（'DeleteAttachmentJsonRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_DELETE_ATTACHMENT_JSON_REQUEST = 'DeleteAttachmentJsonRequest:#Exchange';

/**
 * JSON形式のデータ種別（'DeleteAttachmentRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_DELETE_ATTACHMENT_REQUEST = 'DeleteAttachmentRequest:#Exchange';

/**
 * JSON形式のデータ種別（'ItemInfoResponseMessage:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_ITEM_INFO_RESPONSE_MESSAGE = 'ItemInfoResponseMessage:#Exchange';

/**
 * JSON形式のデータ種別（'AttachmentInfoResponseMessage:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_ATTACHMENT_INFO_RESPONSE_MESSAGE = 'AttachmentInfoResponseMessage:#Exchange';

/**
 * JSON形式のデータ種別（'GetAllClientExtensionsNotificationsJsonRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_GET_ALL_CLIENT_EXTENSIONS_NOTIFICATIONS_JSON_REQUEST = 'GetAllClientExtensionsNotificationsJsonRequest:#Exchange';

/**
 * JSON形式のデータ種別（'GetAllClientExtensionsNotificationsRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_GET_ALL_CLIENT_EXTENSIONS_NOTIFICATIONS_REQUEST = 'GetAllClientExtensionsNotificationsRequest:#Exchange';

/**
 * JSON形式のデータ種別（'IdentityRequest:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_IDENTITY_REQUEST = 'IdentityRequest:#Exchange';

/**
 * JSON形式のデータ種別（'ItemId:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_ITEM_ID = 'ItemId:#Exchange';

/**
 * JSON形式のデータ種別（'Message:#Exchange'）を表す文字列定数
 * CreateItem:Body:Items:"__type"
 * 
 * @const {String}
 */
export const JSONTYPE_MESSAGE = 'Message:#Exchange';

//#11013 20230309 CHG S
/**
 * JSON形式のデータ種別（'ForwardItem:#Exchange'）を表す文字列定数
 * CreateItem:Body:Items:"__type"
 * 
 * @const {String}
 */
export const JSONTYPE_FORWARD_ITEM = 'ForwardItem:#Exchange';

/**
 * JSON形式のデータ種別（'ReplyToItem:#Exchange'）を表す文字列定数
 * CreateItem:Body:Items:"__type"
 * 
 * @const {String}
 */
export const JSONTYPE_REPLY_TO_ITEM = 'ReplyToItem:#Exchange';

/**
 * JSON形式のデータ種別（'ReplyAllToItem:#Exchange'）を表す文字列定数
 * CreateItem:Body:Items:"__type"
 * 
 * @const {String}
 */
export const JSONTYPE_REPLY_ALL_TO_ITEM = 'ReplyAllToItem:#Exchange'
//#11013 20230309 CHG E

/**
 * JSON形式のデータ種別（'ItemChange:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_ITEM_CHANGE = 'ItemChange:#Exchange';

/**
 * JSON形式のデータ種別（'FileAttachment:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_FILE_ATTACHMENT = 'FileAttachment:#Exchange';

/**
 * JSON形式のデータ種別（'ItemIdAttachment:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_ITEM_ID_ATTACHMENT = 'ItemIdAttachment:#Exchange';

/**
 * JSON形式のデータ種別（'BodyContentType:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_BODY_CONTENT_TYPE = 'BodyContentType:#Exchange';

/**
 * JSON形式のデータ種別（'SetItemField:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_SET_ITEM_FIELD = 'SetItemField:#Exchange';

/**
 * JSON形式のデータ種別（'DeleteItemField:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_DELETE_ITEM_FIELD = 'DeleteItemField:#Exchange';

/**
 * JSON形式のデータ種別（'PropertyUri:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_PROPERTY_URL = 'PropertyUri:#Exchange';

/**
 * JSON形式のデータ種別（'ExtendedPropertyUri:#Exchange'）を表す文字列定数
 * 
 * @const {String}
 */
export const JSONTYPE_EXTENDED_PROPERTY_URL = 'ExtendedPropertyUri:#Exchange';

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// イベントの名称
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/**
 * イベント名称（'OnBeforeRequest'）を表す文字列定数
 * 
 * @const {String}
 */
export const ON_BEFORE_REQUEST = 'OnBeforeRequest';

/**
 * イベント名称（'OnBeforeSendHeaders'）を表す文字列定数
 * 
 * @const {String}
 */
export const ON_BEFORE_SEND_HEADERS = 'OnBeforeSendHeaders';

/**
 * イベント名称（'OnSendHeaders'）を表す文字列定数
 * 
 * @const {String}
 */
export const ON_SEND_HEADERS = 'OnSendHeaders';

/**
 * イベント名称（'OnHeadersReceived'）を表す文字列定数
 * 
 * @const {String}
 */
export const ON_HEADER_RECEIVED = 'OnHeadersReceived';

/**
 * イベント名称（'OnResponseStarted'）を表す文字列定数
 * 
 * @const {String}
 */
export const ON_RESPONSE_STARTED = 'OnResponseStarted';

/**
 * イベント名称（'OnBeforeRedirect'）を表す文字列定数
 * 
 * @const {String}
 */
export const ON_BEFORE_REDIRECT = 'OnBeforeRedirect';

/**
 * イベント名称（'OnCompleted'）を表す文字列定数
 * 
 * @const {String}
 */
export const ON_COMPLETED = 'OnCompleted';

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// その他
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

/**
 * 半角コロン（UTF-16）
 * 
 * @const {String}
 */
export const UTF16_KORON = decodeURIComponent(escape(':'));
