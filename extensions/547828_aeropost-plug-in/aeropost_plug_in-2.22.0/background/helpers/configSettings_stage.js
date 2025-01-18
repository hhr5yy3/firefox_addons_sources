/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/******************Global*****************************/
var   AERO_MARKETPLACE_API_BASE_URL  =   "http://marketplace-stage.api.int.aeropost.com/api";//"https://marketplace-api.aeropost.com/api";
var   AERO_AEROPOST_BASE_URL         =   "http://aeropost.com/site/%S1";
var   AERO_MY_ACCOUNT_BASE_URL       =   "https://myaccount.aeropost.com";
var   AERO_SENTRY_ENDPOINT           =   "http://sentry.pub.aeropost.com";
var   AERO_MY_AERO_DEFAULT_URL       =   "https://www.myaeropost.com";
//var   AERO_WS_MY_AERO_ENDPOINT       =   "https://www2.myaeropost.com/WS_MyAero/Services.svc";
var   AERO_WS_MY_AERO_ENDPOINT       =   "https://www2.myaeropost.com/DEVEL/WS_MyAero/Services.svc";


var ConfigSettings = {

  /******************Base URLs**************************/
  MARKETPLACE_API_BASE_URL  :   AERO_MARKETPLACE_API_BASE_URL,
  AEROPOST_BASE_URL         :   AERO_AEROPOST_BASE_URL,
  MY_ACCOUNT_BASE_URL       :   AERO_MY_ACCOUNT_BASE_URL,
  SENTRY_ENDPOINT           :   AERO_SENTRY_ENDPOINT,
  MY_AERO_DEFAULT_URL       :   AERO_MY_AERO_DEFAULT_URL,
  WS_MY_AERO_ENDPOINT       :   AERO_WS_MY_AERO_ENDPOINT,

  /******************Aeropost.com URLs******************/
  VIEW_CART_URL     :   AERO_AEROPOST_BASE_URL + "/cart-view",
  CHECKOUT_URL      :   AERO_AEROPOST_BASE_URL + "/checkout",
  SEARCH_URL        :   AERO_AEROPOST_BASE_URL + "/search?q=%S2&gtw=%S3&lang=%S4",
  CHANGE_LOG_URL    :   AERO_AEROPOST_BASE_URL + "/plugins",
  VIEW_CART_URL_ES  :   AERO_AEROPOST_BASE_URL + "/ver-carro?utm_source=plugin&utm_medium=firefox",
  VIEW_CART_URL_EN  :   AERO_AEROPOST_BASE_URL + "/cart-view?utm_source=plugin&utm_medium=firefox",

  /******************My aero URLs***********************/
  FORGOT_PASSWORD_URL   :   AERO_MY_AERO_DEFAULT_URL + "/myaero/ForgotPassword.aspx?language=%S",
  MY_AERO_DIRECTED_URL  :   AERO_MY_AERO_DEFAULT_URL + "/MyAero/Dashboard.aspx?Language=%S1&gtw=%S2&usr=%S3",
  NEW_PREALERT_URL      :   AERO_MY_AERO_DEFAULT_URL + "/MyAero/PreAlert.aspx",

  /******************My account URLs********************/
  MY_AERO_PACKAGES_URL    :   AERO_MY_ACCOUNT_BASE_URL + "/%S/Packages",
  MY_AERO_PROFILE_URL     :   AERO_MY_ACCOUNT_BASE_URL + "/%S/Profile",
  ORDER_LIST_URL          :   AERO_MY_ACCOUNT_BASE_URL + "/%S1/ShopCenter",
  SHOW_CENTER_DETAIL_URL  :   AERO_MY_ACCOUNT_BASE_URL + "/%S1/Shopcenterdetail?orderNum=%S2",

  /******************Marketplace Api********************/
  MARKETPLACE_LOOKUP_URL          :   "/search/itemlookup",
  MARKETPLACE_ADDTOCART_URL       :   "/shoppingcart/AddShoppingCartProduct",
  MARKETPLACE_GETCART_URL         :   "/shoppingcart/GetShoppingCart",
  MARKETPLACE_GETCATEGORIES_URL   :   "/category/GetCategories",
  MARKETPLACE_GETACCOUNTTYPES_URL :   "/country/GetAccountType",
  MARKETPLACE_CALCULATOR_URL      :   "/product/getDteResponse",
  MARKETPLACE_REMOVE_PRODUCT      :   "/shoppingcart/deleteshoppingcartproduct",
  MARKETPLACE_GETORDERS_URL       :   "/order/GetOrdersByAccount",
  MARKETPLACE_PREALERTAMAZON_URL  :   "/PackagePrealert/PrealertAmazon",
  MARKETPLACE_PREALERTEBAY_URL    :   "/PackagePrealert/PrealertEbay",
  MARKETPLACE_PREALERT_STATUS_URL    :   "/PackagePrealert/GetPrealertStatusByTracking",
  MARKETPLACE_AUTH_USER           :   "/account/AuthUser",
  MARKETPLACE_GET_USER_INFORMATION:   "/account/GetProfileInformation",
  MARKETPLACE_GET_NEW_ORDERS_PACKAGES_BY_ACCOUNT:    "/Order/GetNewOrdersPackagesByAccount",
  MARKETPLACE_GET_PREALERTS_BY_ACCOUNT: "/PackagePrealert/GetAccountPrealerts",
  MARKETPLACE_GET_COUNTRIES : "/country/GetCountries",

  FEEDBACK_URL            :   "http://ws-feedback.pub.aeropost.com/api/v1/feedback/?format=json",


  /******************Config ****************************/
  AUTH_CODE_USER            :   "MyAeroChromeBeta",
  AUTH_CODE                 :   "Pmc#0Mqc!4ZaV",
  PREALERTS_EMAIL           :   "browser-extensions@aeropost.com",
  PACKAGE_LIST_QUANTITY     :   10,
  PREALERT_LIST_QUANTITY    :   10,
  UPDATE_TIME_LIMIT         :   65000, // 60 SECS
  INVOICE_TTL               :   15,
  packageStatusArray        :   [1,0,0,4,4,4,5,4,1,1,1,1,1,1,1,1,1,1,3,0,0,6,6,3,3,3,3,3,4,5,3,0,7,7,0,3,3,3,3,3,3,3,2,3,3,1,1,1,5,6,5,5,0,3,3,6,3,3,0,3,0,3,1,1,3,6,5,2,5,5,3,3,3,3,3,3,3,3,3,3,3,1,5,6,3,3,3,3,3,0,3,0,0,5,0,5,5,3,1,3,],

  authorizationEnabled      :   true,
  appId                     :   "4d53bce03ec34c0a911182d4c228ee6c",
  apiKey                    :   "A93reRTUJHsCuQSHR+L3GxqOJyDmQpCgps102ciuabc=",
  GOOGLE_TRANSLATE_API      :   "https://www.googleapis.com/language/translate/v2?key=%S1&target=%S2&source=%S3&q=%S4",
  GOOGLE_TRANSLATE_API_KEY  :   "AIzaSyBoRlsTx3Kv6vVWf7nKiIPBY-mQcYdOjUw",
  RSA_KEY                   :   "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnky9sCM4ewKQ17j0d+8USGLL2X4pWvQ6ERmxb7NUaMYrUT8Z7NZcM7wkRHT/l9CJu26jxyAMJ/KQQ77XSvkjL0finQlPQ7xCULal0YyKv0P6bPwTZGHYkSZtnwbxhqEwxqtobeXBoqx0wZstF4PZsPD2xu2atTNvahx4BICpYy0rLPVIM8WRTmjtuEdN2lcnubuDgDUV0Ps8IPtd9NRQew7oFJf9QPRbm+RFFnRHtJKG2siO9crUqs3+KlBjMH21xc/G6P3uCxo1fjh1YrcOZFci1SfbGnToDoWfhjRWoLjrVwzsB21SmUyP2yWwjZ8bPxk0g2/XN8+QNkA+v7d+WPB3WIpLhu1UHiaFVCmc5+ct9bOXJO0GrwT7WYGi3FBjS9s98UZkb55IjTdWKLsyGKuzQBN0+N/IJJ4tumKa+4F8Bf2HMidN7rzts674rcOgYF4p4o0imh/h0OhymJQv/SLy+3n5r/i/Z2y1SSiiUoshzInvPiJckOWG5PuletOXrfKhzGDBQQ8FtzmYtfvJIeRcfTfGEEu6ZWnCecEUXTTBo46e9MAxRTmOAcBFMON8CFLMA2mrnFMCcdsPRjuuyKB/2j6CiLgNFjdBnLcdX5z/+T3mCE9pKsNpK9w+gYqRjAZrfXr2MqhqIMeDIgH7ycQPsg4wcc1NE/jRsBqL5UECAwEAAQ==",
  APP_ID                    :   "d70fac6a-c744-4c02-bfa4-b12ca76e79a5",

  init : function() {

  }
};

/**
 * Constructor.
 */
(function() { this.init(); }).apply(ConfigSettings);

