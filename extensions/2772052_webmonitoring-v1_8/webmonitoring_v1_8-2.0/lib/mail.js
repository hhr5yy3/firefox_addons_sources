import * as constants from "./constants.js"

/**
 * @classdesc ＷＥＢメール送信ログに関する情報を格納するクラス
 */
export default class Mail
{
    /**
     * @constructor
     */
    constructor(mailer) {
        this.Mailer = mailer;
        this.Id = 'null';
        this.Sender = '';
        this.ToRecipients  = [];
        this.CcRecipients  = [];
        this.BccRecipients = [];
        this.Subject = '';
        this.Body = '';
        this.BodyType = '';
        this.Attachments = [];
        this.MessageDisposition = constants.MESSAGE_DISPOSITION_SAVE_ONLY;
        this.ShapeName = '';
        this.TimeStamp = '';
        this.HostName = '';
//#11013 20230105 ADD S
        this.Operation = '';
//#11013 20230105 ADD E
    }

    /**
     * メーラーの名称を返します。
     * 
     * @rerurn {String} メーラーの名称
     */
    getMailer() {
        return this.Mailer;
    }

    /**
     * メーラーの名称を設定します。
     * 
     * @param {String} mailer メーラーの名称
     */
    setMailer(mailer) {
        this.Mailer = mailer;
    }

    /**
     * メールIDを返します。
     * 
     * @return {String} メールID
     */
    getId() {
        return this.Id;
    }

    /**
     * メールIDを設定します。
     * 
     * @param {String} id メールID
     */
    setId(id) {
        this.Id = id;
    }

    /**
     * メール送信者を返します。
     * 
     * @return {String} メール送信者
     */
    getSender() {
        return this.Sender;
    }

    /**
     * メール送信者を設定します。
     * 
     * @param {String} sender メール送信者
     */
    setSender(sender) {
        this.Sender = sender;
    }

    /**
     * 宛先アドレス(To)の文字列配列を返します。
     * 
     * @return {Array} 宛先アドレス(To)の文字列配列を返します。
     */
    getToRecipients() {
        return this.ToRecipients;
    }

    /**
     * 宛先アドレス(To)の文字列配列を設定します。
     * 
     * @param {Array} toRecipients 宛先アドレス(To)の文字列配列
     */
    setToRecipients(toRecipients) {
        this.ToRecipients = toRecipients;
    }

    /**
     * 宛先アドレス(CC)の文字列配列を返します。
     * 
     * @return {Array} 宛先アドレス(CC)の文字列配列
     */
    getCcRecipients() {
        return this.CcRecipients;
    }

    /**
     * 宛先アドレス(CC)の文字列配列を設定します。
     * 
     * @param {Array} ccRecipients 宛先アドレス(CC)の文字列配列
     */
    setCcRecipients(ccRecipients) {
        this.CcRecipients = ccRecipients;
    }

    /**
     * 宛先アドレス(BCC)の文字列配列を返します。
     * 
     * @param {Array} 宛先アドレス(BCC)の文字列配列
     */
    getBccRecipients() {
        return this.BccRecipients;
    }

    /**
     * 宛先アドレス(BCC)の文字列配列を設定します。
     * 
     * @param {Array} bccRecipients 宛先アドレス(BCC)の文字列配列
     */
    setBccRecipients(bccRecipients) {
        this.BccRecipients = bccRecipients;
    }

    /**
     * メールの件名を返します。
     * 
     * @return {String} メールの件名
     */
    getSubject() {
        return this.Subject;
    }

    /**
     * メールの件名を設定します。
     * 
     * @param {String} subject メールの件名
     */
    setSubject(subject) {
        this.Subject = subject;
    }

    /**
     * メールの本文を返します。
     * 
     * @return {String} メールの本文
     */
    getBody() {
        return this.Body;
    }

    /**
     * メールの本文を設定します。
     * 
     * @param {String} body メールの本文
     */
    setBody(body) {
        this.Body = body;
    }

    /**
     * メール本文の形式を返します。
     * 
     * @return {String} メール本文の形式
     */
    getBodyType() {
        return this.BodyType;
    }

    /**
     * メール本文の形式を設定します。
     * 
     * @param {String} bodyType メール本文の形式
     */
    setBodyType(bodyType) {
        this.BodyType = bodyType;
    }

    /**
     * 添付ファイル名の文字列配列を返します。
     * 
     * @return {Array} 添付ファイル名の文字列配列
     */
    getAttachments() {
        return this.Attachments;
    }

    /**
     * 添付ファイルの文字列配列を設定します。
     * 
     * @param {Array} attachments 添付ファイル名の文字列配列
     */
    setAttachments(attachments) {
        this.Attachments = attachments;
    }

    /**
     * メッセージ処理の種別を返します。
     * 
     * @return {String} メッセージ処理の種別
     */
    getMessageDisposition() {
        return this.MessageDisposition;
    }

    /**
     * メッセージ処理の種別を設定します。
     * 
     * @param {String} messageDisposition メッセージ処理の種別
     */
    setMessageDisposition(messageDisposition) {
        this.MessageDisposition = messageDisposition;
    }

    /**
     * メールの形態を返します。
     * 
     * @return {String} メールの形態
     */
    getShapeName() {
        return this.ShapeName;
    }

    /**
     * メールの形態を設定します。
     * 
     * @param {String} shapeName メールの形態
     */
    setShapeName(shapeName) {
        this.ShapeName = shapeName;
    }

    /**
     * メール送信日時を返します。
     * 
     * @return {String} メール送信日時
     */
    getTimeStamp() {
        return this.TimeStamp;
    }

    /**
     * メール送信日時を設定します。
     * 
     * @param {String} timeStamp メール送信日時
     */
    setTimeStamp(timeStamp) {
        this.TimeStamp = timeStamp;
    }

    /**
     * ホスト名を返します。
     * 
     * @return {String} ホスト名
     */
    getHostName() {
        return this.HostName;
    }

    /**
     * ホスト名を設定します。
     * 
     * @param {String} hostName ホスト名
     */
    setHostName(hostName) {
        this.HostName = hostName;
    }

//#11013 20230105 ADD S
    /**
     * 操作名を返します。
     * @return {String} 操作名
     */
    getOperation() {
        return this.Operation;
    }

    /**
     * 操作名を設定します。
     * @param {String} operation 操作名
     */
    setOperation(operation) {
        this.Operation = operation;
    }
//#11013 20230105 ADD E

    /**
     * メール送信ログが取得可能な状態かどうか判定します。
     * 
     * @return {Boolean} メール送信ログが取得可能な状態であれば true、そうでなければ false
     */
    isSendingOk() {
        return (this.MessageDisposition === constants.MESSAGE_DISPOSITION_SEND_AND_SAVE_COPY);
    }

    /**
     * クラスメンバの値をJSON形式の文字列表現として返します。
     * 
     * @return {String} クラスメンバの文字列表現
     */
    toString() {
        var subject = decodeURIComponent(escape(this.Subject));
        var body    = decodeURIComponent(escape(this.Body)); //TODO: テスト用
        var buffer = '"{ ';
        buffer += `"Mailer": "${this.Mailer}", `;
        buffer += `"Id": "${this.Id}", `;
        buffer += `"Sender": "${this.Sender}", `;
        buffer += `"ToRecipients": [${this.ToRecipients}], `;
        buffer += `"CcRecipients": [${this.CcRecipients}], `;
        buffer += `"BccRecipients": [${this.BccRecipients}], `;
        buffer += `"Subject": "${subject}", `;
        buffer += `"Body": "${body}", `;    // TODO: テスト用
        buffer += `"BodyType": "${this.BodyType}", `;
        buffer += `"Attachments": [${this.Attachments}], `;
        buffer += `"MessageDisposition": "${this.MessageDisposition}", `;
        buffer += `"ShapeName": "${this.ShapeName}", `;
        buffer += `"TimeStamp": "${this.TimeStamp}", `;
        buffer += `"HostName": "${this.HostName}", `;
//#11013 20230105 ADD S
        buffer += `"Operation": "${this.Operation}"`;
//#11013 20230105 ADD E
        buffer += ` }"`;
        return buffer;
    }
}
