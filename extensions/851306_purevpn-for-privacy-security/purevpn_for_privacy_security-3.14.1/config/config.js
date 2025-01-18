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

(function() {
  'use strict';
  var pVn = self.pVn = self.pVn || {};
  pVn.isReady = true;
  pVn.dataReset = false;
  pVn.isFirstRun = true;
  pVn.isOnline = true;
  pVn.i18n = chrome.i18n.getMessage;
  pVn.storage = chrome.storage.local;
  pVn.extUrl = chrome.runtime.getURL;
  pVn.manifest = chrome.runtime.getManifest();
  pVn.systemSchemes = ["about:", "moz:", "about:blank"];
  pVn.browserScheme = 'chrome-scheme';
  pVn.whitelisted = [API_ENDPOINT_GATEWAY, pVn.browserScheme];
  pVn.recommendedSites = [];
  pVn.strictTemp = [];
  pVn.systemSettings = {
    version: pVn.manifest.version,
    user_name: "",
    user_email: "",
    user_password: "",
    user_id: "",
    password: "",
    salt: "",
    encJson: {},
    user_status: "",
    client_type: "",
    last_login_active: false,
    access_token: "",
    refresh_token: "",
    access_token_time: "",
    countries: {},
    countries_favourites: [],
    default_country: "",
    cities: {},
    cities_favourites: [],
    default_city: "",
    channels: {},
    channels_favourites: [],
    server_list: {},
    server_list_checksum: '',
    site_prefs: {},
    webRtcLeak: true,
    serverKey: "countryCode",
    feedbackData: {},
    noOfConnection: 0,
    verification_state: false,
    feedBackStatus: false,
    socialLogins: {},
    connectionsForTextChange: 0,
    cTaSummarytextChangeState: 1,
    channelToolTiptext_Link: {},
    countryToolTiptext_Link: {},
    campaignData: {},
    showCampaignCounter: 1,
    campaignPopupCount: -1,
    showCampaign: false,
    showBannerCampaign: true,
    campaignApplyRuleByHours: 0,
    campaignActive: false,
    bannerCampaignData: {},
    releaseIpData: [],
    proxyAutoConnect: true,
    allowWhitelistedHosts: false,
    whitelistedHosts: [],
    user_unique_id: "",
    user_os: "",
    first_connect: 1,
    first_connect_username: "",
    session_id: "",
    session_time: "",
    proxy_user_unique_id: "",
    country_checksum: "",
    city_checksum: "",
    channel_checksum: "",
    missed_events: [],
    user_gateway: "",
    vpnusernames: [],
    allow_multiuser: true,
    use_cloudfront_domain: false,
    billing_cycle: "",
    city_hostname: "",
    server_name: "",
    refer_frnd_avl: 24,
    refer_frnd_sent: 0,
    refer_link: '',
    locationSpoofing: false,
    latitude: 0,
    longitude: 0,
    spoofingToggle: false,
    webRtcToggle: false,
    user_signup_date: '', // > 5 weeks
    user_expiry_date: '',
    desired_outcome: {
      global: false,
      last_session: false,
      sessionRating: false,
      hasRatedBefore: false,
      askForStoreRating: false,
      hasReferredAFriend: false,
      showFeedbackForm: false,
      showReferredAFriend: false,
      showThankYouMessage: false,
      twentyPercentRequirement: Math.floor((Math.random() * 10) + 1)
    },
    current_session: {
      desiredOutcomeMessageProvided: false,
      desiredOutcomeMessageUserInteraction: false,
      sessionRatingMessageProvided: false,
      sessionRatingMessageUserInteraction: false,
      hasRatedSession: false,
      disconnectedStarted: false,
      counter: 0
    },
    fa_migrated: true,
    fa_url: ''
  };
  pVn.basicOptions = [
    "spoofingToggle",
    "webRtcToggle",
    "latitude",
    "longitude",
    "locationSpoofing",
    'refer_link',
    "refer_frnd_avl",
    "refer_frnd_sent",
    "city_hostname",
    "version",
    "user_name",
    "user_email",
    "user_password",
    "user_id",
    "password",
    "salt",
    "encJson",
    "user_status",
    "client_type",
    "last_login_active",
    "access_token",
    "refresh_token",
    "access_token_time",
    "countries",
    "cities",
    "server_list",
    "server_list_checksum",
    "cities_favourites",
    "default_city",
    "countries_favourites",
    "server_list",
    "server_list_checksum",
    "default_country",
    "channels",
    "channels_favourites",
    "site_prefs",
    "webRtcLeak",
    "feedbackData",
    "noOfConnection",
    "serverKey",
    "verification_state",
    "feedBackStatus",
    "socialLogins",
    "connectionsForTextChange",
    "cTaSummarytextChangeState",
    "channelToolTiptext_Link",
    "countryToolTiptext_Link",
    "campaignData",
    "showCampaignCounter",
    "campaignPopupCount",
    "showCampaign",
    "showBannerCampaign",
    "campaignApplyRuleByHours",
    "campaignActive",
    "bannerCampaignData",
    "releaseIpData",
    "proxyAutoConnect",
    "allowWhitelistedHosts",
    "whitelistedHosts",
    "user_unique_id",
    "user_os",
    "first_connect",
    "first_connect_username",
    "session_id",
    "session_time",
    "proxy_unique_user_id",
    "country_checksum",
    "channel_checksum",
    "city_checksum",
    "missed_events",
    "user_gateway",
    "vpnusernames",
    "allow_multiuser",
    "use_cloudfront_domain",
    "billing_cycle",
    "server_name",
    "refer_frnd_avl",
    "refer_frnd_sent",
    "desired_outcome",
    "user_signup_date",
    "current_session",
    "current_session",
    "user_expiry_date",
    "fa_migrated",
    "fa_url"
  ];

  pVn.proxyNodes = {};
  pVn.extensionsLists = [];
  pVn.extensionsDetails = {};
  pVn.clientUserName = "";
  pVn.clientSignupDetail = {};
  pVn.clientUserId = "";
  pVn.gaId = null;
  pVn.isProxied = false;
  pVn.filterUrl = pVn.extUrl("bower_components/");
  pVn.tabId = -1;
  pVn.noOfConnection = 0;
  pVn.proxyConnectionInterval = pVn.nofunc;
  pVn.connectionDuration = 0;
  pVn.checkFeedBackStatus = pVn.systemSettings.feedBackStatus;
  pVn.makeUsHappyBtn = false;
  pVn.oPopFeedback = {};
  pVn.levelOfControl = true;
  pVn.isLoggedIn = false;
  pVn.levelOfControlRestored = false;
  pVn.getSocial = false;
  pVn.showSignupScreen = false;
  pVn.checkUserStatus = true;
  pVn.signUpError = "";
  pVn.showSignUpLoader = false;
  pVn.proxyDetail = {
    levelOfControl: CONTROL_ALLOW,
    value: {
      mode: MODE_SYSTEM
    }
  };
  pVn.autoLoginFailedMsg = "";
  pVn.campaignInterval = 0;
  pVn.lastConnectState = false;
})();
