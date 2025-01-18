import * as commons from "./commons.js"

/**
 * Web操作ログに必要なポリシー情報を格納するクラス
 */
export default class WebOpePolicy
{
    constructor() {
        this.USERNAME;
        this.USERDOMAIN;
        this.SESSIONID;
        this.HOPELOGON;
        this.web_access_forbid;
        this.web_access_type;
        this.web_site_num;
        this.web_site_fmt = [];
        this.web_filter_type;
        this.web_filter_num;
        this.web_filter_app = [];
        this.web_filter_keyword = [];
        this.updown_forbid;
        this.updown_type;
        this.updown_num;
        this.updown_site_fmt = [];
        this.web_operation_log;
        this.web_access_log;
        this.email_log;
//#10325/#10328 20220630 ADD S FJ)Y.FURUICHI
        this.web_dup_filter_type;
        this.addon_web_dup_filter_type ;
        this.addon_web_dup_filter_num;
//#10325/#10328 20220630 ADD E FJ)Y.FURUICHI
    }

    setPolicy(message) {
        if ('USERNAME' in message) {
            this.USERNAME = message["USERNAME"];
        } else {
            this.USERNAME = "";
        }
        if ('USERDOMAIN' in message) {
            this.USERDOMAIN = message["USERDOMAIN"];
        } else {
            this.USERDOMAIN = "";
        }
        if ('SESSIONID' in message) {
            this.SESSIONID = message["SESSIONID"];
        } else {
            this.SESSIONID = "";
        }
        if ('HOPELOGON' in message) {
            this.HOPELOGON = message['HOPELOGON']
        } else {
            this.HOPELOGON = "";
        }
        this.web_access_forbid  = message["web_access_forbid"];
        this.web_access_type    = message["web_access_type"];
        this.web_site_num       = message["web_site_num"];
        this.web_site_fmt       = message["web_site_fmt"];
        this.web_filter_type    = message["web_filter_type"];
        this.web_filter_num     = message["web_filter_num"];
        this.web_filter_app     = message["web_filter_app"];
        this.web_filter_keyword = message["web_filter_keyword"];
        this.updown_forbid      = message["updown_forbid"];
        this.updown_type        = message["updown_type"];
        this.updown_num         = message["updown_num"];
        this.updown_site_fmt    = message["updown_site_fmt"];
        this.web_operation_log  = message["web_operation_log"];
        this.web_access_log     = message["web_access_log"];
        this.email_log          = message["email_log"];
//#10325/#10328 20220630 ADD S FJ)Y.FURUICHI
        if ('web_dup_filter_type' in message) {
            this.web_dup_filter_type = message["web_dup_filter_type"];
        } else {
            this.web_dup_filter_type = "1";
        }
        if (commons.isUndefinedOrNull(this.addon_web_dup_filter_type)) {
            if ('addon_web_dup_filter_type' in message) {
                this.addon_web_dup_filter_type = message["addon_web_dup_filter_type"];
            } else {
                this.addon_web_dup_filter_type = "0";
            }
        }
        if (commons.isUndefinedOrNull(this.addon_web_dup_filter_num)) {
            if ('addon_web_dup_filter_num' in message) {
                this.addon_web_dup_filter_num = message["addon_web_dup_filter_num"];
            } else {
                this.addon_web_dup_filter_num = "100";
            }
        }
//#10325/#10328 20220630 ADD E FJ)Y.FURUICHI
    }

    isWebOperationLog() {
        return (this.web_operation_log == "1");
    }

    isEmailLog() {
        return (this.email_log == "1");
    }

    toString() {
        var str = "{";
        str += "USERNAME: "            + (this.USERNAME)           + ",";
        str += "USERDOMAIN: "          + (this.USERDOMAIN)         + ",";
        str += "SESSIONID: "           + (this.SESSIONID)          + ",";
        str += "HOPELOGON: "           + (this.HOPELOGON)          + ",";
        str += "web_access_forbid: "   + (this.web_access_forbid)  + ",";
        str += "web_access_type: "     + (this.web_access_type)    + ",";
        str += "web_site_num: "        + (this.web_site_num)       + ",";
        str += "web_site_fmt: ["       + (this.web_site_fmt)       + "],";
        str += "web_filter_num: "      + (this.web_filter_num)     + ",";
        str += "web_filter_app: ["     + (this.web_filter_app)     + "],";
        str += "web_filter_keyword: [" + (this.web_filter_keyword) + "],";
        str += "updown_forbid: "       + (this.updown_forbid)      + ",";
        str += "updown_type: "         + (this.updown_type)        + ",";
        str += "updown_num: "          + (this.updown_num)         + ",";
        str += "updown_site_fmt: ["    + (this.updown_site_fmt)    + "],";
        str += "web_access_log: "      + (this.web_access_log)     + ",";
        str += "email_log: "           + (this.email_log)          + ",";
//#10325/#10328 20220630 ADD S FJ)Y.FURUICHI
        str += "web_dup_filter_type: " + (this.web_dup_filter_type)+ ",";
        str += "addon_web_dup_filter_type: "    + (this.addon_web_dup_filter_type) + ",";
        str += "addon_web_dup_filter_num: "     + (this.addon_web_dup_filter_num);
//#10325/#10328 20220630 ADD E FJ)Y.FURUICHI
        str += "}"

        return str;
    }
}
