/*
*	PureVPN
*	by GZ systems Ltd.
*	Everyone is permitted to copy and distribute verbatim copies
*	of this document, but changing it is not allowed.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
*	copyright 2016 All Rights are Reserved.
*/
const PVN_IMAGE_PATH = chrome.runtime.getURL('assets/images/');
const PVN_FLAG_PATH = PVN_IMAGE_PATH + "flags/";
const PVN_IMAGES = {
  img19on: PVN_IMAGE_PATH + "icon19.png",
  img19off: PVN_IMAGE_PATH + "icon19-off.png",
  img38on: PVN_IMAGE_PATH + "icon38.png",
  img38off: PVN_IMAGE_PATH + "icon38-off.png",
  img19channel: PVN_IMAGE_PATH + "icon-channel19.png",
  img38channel: PVN_IMAGE_PATH + "icon-channel38.png"
};
const RE_PROTOCOL = /^[^:]+(?=:\/\/)/;
const RE_PROTO = /^(http(s)?(:\/\/))?(www\.)?/;
const RE_BROWSER_INFO = /(Firefox)[\\/\s]([0-9.]+)/;
const SCHEME_WEB = 'http://';
const SCHEME_SSL = 'https://';
const SCHEME_HTTP = 'http';
const API_ENDPOINT_GATEWAY = 'api.purevpn.com';
const PROXY_API_ENDPOINT = 'api.proxy.purevpn.com';
const PROXY_API_CLOUDFRONT_ENDPOINT = 'd2s1wxofuvqhy8.cloudfront.net';
const API_LOGIN = SCHEME_SSL + PROXY_API_ENDPOINT + '/v1/auth/verify';
const API_SIGNUP = SCHEME_SSL + PROXY_API_ENDPOINT + '/v1/auth/register';
const API_VERIFICATION =
  SCHEME_SSL + API_ENDPOINT_GATEWAY + '/signup/v1/verify';
const API_RESEND = SCHEME_SSL + API_ENDPOINT_GATEWAY + '/signup/v1/resend';
const API_TOKEN_REFRESH = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v1/auth/refresh';
const API_NODES = SCHEME_SSL + PROXY_API_ENDPOINT + '/v3/proxy/server';
const API_RELEASE_IP = SCHEME_SSL + API_ENDPOINT_GATEWAY +
  '/proxy/v1/releaseIp';
const API_COUNTRIES_LIST = 'https://purevpn-extension.servermild.com/ext_countries.json';
const API_CITIES_LIST = 'https://purevpn-extension.servermild.com/ext_cities.json';
const API_REFER_FRIEND_DATA = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v3/proxy/inviteDetails';
const API_CHANNELS_LIST = 'https://purevpn-extension.servermild.com/ext_channels.json';
const API_LIST_SERVER = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v3/proxy/serverList';
const API_SOCIAL_LIST = SCHEME_SSL + API_ENDPOINT_GATEWAY + '/social/v1/list';
const API_TOOLTIP = SCHEME_SSL + PROXY_API_ENDPOINT + '/v3/proxy/premium/meta';
const API_CAMPAIGN = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v3/proxy/premium/popup';
const API_BANNER = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v3/proxy/premium/banner';
const MODE_DIRECT = 'direct';
const MODE_AUTO = 'auto_detect';
const MODE_PAC = 'pac_script';
const MODE_FIXED = 'fixed_servers';
const MODE_SYSTEM = 'system';
const PROXY_SCOPE_REGULAR = 'regular';
const PROXY_SCOPE_INCOGNITO = 'incognito_persistent';
const PREF_BROWSER = 'whole_browser';
const PREF_DOMAIN = 'domain_specific';
const CONTROL_DANGER = "controlled_by_other_extensions";
const CONTROL_ACTIVE = "controlled_by_this_extension";
const CONTROL_ALLOW = "controllable_by_this_extension";
const CONTROL_DENY = "not_controllable";
const USER_STATUS_ACTIVE = 'active';
const USER_STATUS_DISABLE = 'disable';
const USER_STATUS_EXPIRED = 'expired';
const CLIENT_TYPE_FREE = 'free';
const CLIENT_TYPE_PAID = 'paid';
const EXT_WELCOME_URL = 'https://www.purevpn.com/welcome-to-firefox-extension-v2?utm_medium=extension&utm_source=firefox';
const EXT_PREMIUM_URL = 'https://www.purevpn.com/signup';
const EXT_PING_URL = 'https://www.google.com/favicon.ico?_';
const USER_STEPS_URL = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v3/proxy/notify';
const EXT_UNINSTALL_URL = 'https://www.purevpn.com/uninstall-extension';
const FEEDBACK_URL = "ui/feedback.html";
const STORE_FEEDBACK_URL = 'https://addons.mozilla.org/en-US/firefox/addon/purevpn-for-privacy-security/';
const LIVE_CHAT_URL = 'https://direct.lc.chat/4454601/10';
const CHANNEL = 'channel';
const COUNTRY = 'country';
const SERVER = 'server';
const CITY = 'city';
const DEFAULT_COUNTRY_CODE_FREE = 'AT';
const DEFAULT_COUNTRY_CODE_PAID = 'US';
const TIMEOUT_CHECK_USER_STATUS = 60 * 10 * 1000;
const VALUE_GDPR = 'gdpr';
const VALUE_CLIENT = 'client';
const RELEASEIP = "https://api.purevpn.com/proxy/v1/releaseIp";
const PASSWORD_HOST = '11111';
const REGEX_EXTRACT_DOMAIN_NAME = /:\/\/(www[0-9]?\.)?(.[^/:]+)/i;
const APPLICATION_PAGE_WINDOWS = 'https://www.purevpn.com/vpn-software-for-windows.php?utm_source=Proxy&utm_campaign=Proxy_cta';
const APPLICATION_PAGE_MAC = 'https://www.purevpn.com/vpn-software-for-mac.php?utm_source=Proxy&utm_campaign=Proxy_cta';
const APPLICATION_PAGE_ANDROID = 'https://play.google.com/store/apps/details?id=com.gaditek.purevpnics&hl=en&utm_source=Proxy&utm_campaign=Proxy_cta';
const APPLICATION_PAGE_ANDROID_TV = 'https://purevpn.com/applinks/download-app/store/android-tv';
const APPLICATION_PAGE_IOS = 'https://apps.apple.com/app/apple-store/id594506418?pt=1934275&ct=Firefox%20Extension&mt=8';
const REGEX_URL_DOMAIN = /(.+:\/\/)?([^/]+)(\/.*)*/i;
const PVPN_TOKEN = '*PVPN123#';
const MEMBER_AREA_REDIRECT_POST_URL = 'ui/redirect.html';
const EXT_MEMBER_AREA_AUTOLOGIN_URL = 'https://my.purevpn.com/autologin';
const MEMBER_AREA_AUTOLOGIN_PAGE_SLUG = 'billing';
const MEMBER_AREA_MIGRATION_PAGE_SLUG = 'migrate';
const MEMBER_AREA_HOST_NAME = 'https://my.purevpn.com';
const API_EMAIL_AUTHENTICATION = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v1/auth/email';
const API_VPN_ACCOUNT_DETAILS = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v1/auth/accountdetails';
const API_CLIENT_DETAILS = SCHEME_SSL + PROXY_API_ENDPOINT +
  '/v1/proxy/getClientDetails';
const CONNECTION_ERRORS = {
  FAILED: 'net::ERR_PROXY_CONNECTION_FAILED',
  REFUSED: 'net::ERR_CONNECTION_REFUSED',
  TIMEOUT: 'CONNECTION_TIMEOUT',
  CONNECTION_TIMEOUT: 'NS_ERROR_NET_TIMEOUT',
  UNKNOWN_PROXY_HOST: 'NS_ERROR_UNKNOWN_PROXY_HOST',
  NS_ERROR_CONNECTION_REFUSED: 'NS_ERROR_PROXY_CONNECTION_REFUSED'
};
const PROXY_STATES = {
  CONNECTED: 'Connected',
  DISCONNECTED: 'Disconnected'
};
const LOCALHOSTS =
  ['127.0.0.1', 'localhost', '127.0.0.1/::1', '192.168.1.1', '192.168.0.1'];

const AUTO_LOGIN_PURE_VPN_SALT = '*PVPN123#';
const FUSION_AUTH_PRIMARY = 'purevpn.fusionauth.io';
const FUSION_AUTH_SECONDARY = 'connecttossowin.com';
const FUSION_AUTH_URL = 'https://purevpn.fusionauth.io/oauth2';
const FUSION_AUTH_DF_URL = 'https://connecttossowin.com/oauth2';
const API_GET_PASSWORD = SCHEME_SSL + PROXY_API_ENDPOINT + '/v3/auth/vpnpassword';
const IMPORT_REFRESH_TOKEN = SCHEME_SSL + PROXY_API_ENDPOINT + '/proxy/refresh-token/import';
const FUSION_AUTH_CLIENT_ID = 'dd864c70-4f93-4572-ae52-410d4a59cb8d'
