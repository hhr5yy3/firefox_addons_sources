var Preferences = {
  PROFILE_CACHE_TIME: 300,
  PROXY_LIST_CACHE_EXPIRE: 300,
  USER_GEO_INFO_CACHE_EXPIRE: 600,
  MAX_GEO_DATA_RECORDS: 1000,
  MAX_FAVORITE_RECORDS: 1000,
  profile: {email:'', pass:'', valid:0, total:0, invoice:'', cacheTime:null},
  profileDefault: {email:'', pass:'', valid:0, total:0, invoice:'', cacheTime:null},
  proxyList: {server: new Array(), free: new Array(), user: new Array(), cacheTime:null},
  proxyListDefault: {server: new Array(), free: new Array(), user: new Array(), cacheTime:null},
  userGeoInfo: {code:'', country:'', city:'', server:'', cacheTime:null},
  userGeoInfoDefault: {code:'', country:'', city:'', server:'', cacheTime:null},
  settings: {proxy_type: 1, siteExpludeList: new Array(), fake_browser: false, fake_language: false, clean_cookie: false, block_flash:false, block_analytics: false, block_ads: false, block_social: false, block_referer: false, hide_icon: false},
  settingsDefault: {proxy_type: 1, siteExpludeList: new Array(), fake_browser: false, fake_language: false, clean_cookie: false, block_flash:false, block_analytics: false, block_ads: false, block_social: false, block_referer: false, hide_icon: false},
  extensionPreferences: {tutorial: 0, rate: 0},
  geoData: new Array(),
  favoriteProxy: new Array(),
  debugMode: false,

  storageKeys: {
    profile: 'v1_profile',
    proxyList: 'v2_proxy_list',
    geoData: 'v1_geo_data',
    userGeoInfo: 'v1_user_geo_info',
    settings: 'v2_settings',
    extensionPreferences: 'v1_extension_preferences',
    favoriteProxy: 'v1_favorite_proxy'
  },

  Callback: function(fn, ctx) {
    return function() {
      fn.apply(ctx, arguments);
    }
  },

  CleanArray: function(source) {
    var newArray = new Array();
    for (var i=0; i<source.length; i++) {
      if (source[i] || source[i] == 0) {
        newArray.push(source[i]);
      }
    }
    return newArray;
  },

  ResetProfile: function() {
    this.profile = this.profileDefault;
  },

  ResetProxyList: function() {
    this.proxyList = this.proxyListDefault;
  },

  ResetUserGeoInfo: function() {
    this.userGeoInfo = this.userGeoInfoDefault;
  },

  ResetSettings: function() {
    this.settings = this.settingsDefault;
  },

  LoadPreferences: function(success) {
    var storage = new Array();
    storage.push(this.storageKeys.profile);
    storage.push(this.storageKeys.proxyList);
    storage.push(this.storageKeys.geoData);
    storage.push(this.storageKeys.userGeoInfo);
    storage.push(this.storageKeys.favoriteProxy);
    storage.push(this.storageKeys.settings);

    chrome.storage.local.get(storage, this.Callback(function(storage) {
      if (typeof storage[this.storageKeys.profile] !== 'undefined')
        var userEmail = storage[this.storageKeys.profile].email;

      if (this.debugMode) console.log('Searching preferences for "'+userEmail+'" (Preferences.LoadPreferences)');

      this.profile = storage[this.storageKeys.profile];
      this.proxyList = storage[this.storageKeys.proxyList];
      this.geoData = storage[this.storageKeys.geoData];
      this.userGeoInfo = storage[this.storageKeys.userGeoInfo];
      this.favoriteProxy = storage[this.storageKeys.favoriteProxy];
      this.settings = storage[this.storageKeys.settings];

      if (typeof this.profile === 'undefined') this.profile = this.profileDefault;
      if (typeof this.proxyList === 'undefined') this.proxyList = this.proxyListDefault;
      if (typeof this.geoData === 'undefined') this.geoData = new Array();
      if (typeof this.userGeoInfo === 'undefined') this.userGeoInfo = this.userGeoInfoDefault;
      if (typeof this.favoriteProxy === 'undefined') this.favoriteProxy = new Array();
      if (typeof this.settings === 'undefined') this.settings = this.settingsDefault;

      this.proxyList.server = this.CleanArray(this.proxyList.server);
      this.proxyList.user = this.CleanArray(this.proxyList.user);
      this.geoData = this.CleanArray(this.geoData);
      this.favoriteProxy = this.CleanArray(this.favoriteProxy);
      this.settings.siteExpludeList = this.CleanArray(this.settings.siteExpludeList);

      if (this.debugMode) console.log('Password for "'+userEmail+'" is "'+this.profile.pass+'", invoice "'+this.profile.invoice+'" (Preferences.LoadPreferences)');
      if (this.debugMode) console.log('Proxy in server list "'+this.proxyList.server.length+'" (Preferences.LoadPreferences)');
      if (this.debugMode) console.log('Proxy in user list "'+this.proxyList.user.length+'" (Preferences.LoadPreferences)');
      if (this.debugMode) console.log('GeoData size "'+this.geoData.length+'" (Preferences.LoadPreferences)');
      if (this.debugMode) console.log('Favorite size "'+this.favoriteProxy.length+'" (Preferences.LoadPreferences)');
      if (this.debugMode) console.log('Site explude size "'+this.settings.siteExpludeList+'" (Preferences.LoadPreferences)');

      if (success && typeof success === 'function')
        success();
    }, this));
  },

  SavePreferences: function(success) {
    this.DeletePreferences(this.Callback(function() {
      var storage = {};

      if (this.profile.email && this.profile.pass) {
        if (this.debugMode) console.log('Saving preferences for "'+this.profile.email+'", invoice "'+this.profile.invoice+'" (Preferences.SavePreferences)');

        // save email, pass and valid in storage
        storage[this.storageKeys.profile] = this.profile;

        // save server/user proxy list in storage
        storage[this.storageKeys.proxyList] = this.proxyList;
        storage[this.storageKeys.geoData] = this.geoData.slice(0, this.MAX_GEO_DATA_RECORDS);
        storage[this.storageKeys.userGeoInfo] = this.userGeoInfo;
        storage[this.storageKeys.favoriteProxy] = this.favoriteProxy.slice(0, this.MAX_FAVORITE_RECORDS);;
        storage[this.storageKeys.settings] = this.settings;

        if (this.debugMode) console.log('Proxy in server list "'+this.proxyList.server.length+'" (Preferences.SavePreferences)');
        if (this.debugMode) console.log('Proxy in user list "'+this.proxyList.user.length+'" (Preferences.SavePreferences)');
        if (this.debugMode) console.log('GeoData size "'+this.geoData.length+'" (Preferences.SavePreferences)');
        if (this.debugMode) console.log('Favorite size "'+this.favoriteProxy.length+'" (Preferences.SavePreferences)');
        if (this.debugMode) console.log('Site explude size "'+this.settings.siteExpludeList+'" (Preferences.SavePreferences)');
      } else {
        if (this.debugMode) console.log('Cannot save preferences because "email" or "pass" is empty (Preferences.SavePreferences)');
      }

      chrome.storage.local.set(storage, function() {
        if (success && typeof success === 'function')
          success();
      });
    }, this));
  },

  DeletePreferences: function(success) {
    if (this.debugMode) console.log('Delete preferences (Preferences.DeletePreferences)');

    var storage = {};

    // delete stored email, pass and valid in storage
    storage[this.storageKeys.profile] = this.profileDefault;

    // delete server/user proxy list stored in storage
    storage[this.storageKeys.proxyList] = this.proxyListDefault;
    storage[this.storageKeys.geoData] = new Array();
    storage[this.storageKeys.userGeoInfo] = this.userGeoInfoDefault;
    storage[this.storageKeys.favoriteProxy] = new Array();
    storage[this.storageKeys.settings] = this.settingsDefault;

    chrome.storage.local.set(storage, function() {
      if (success && typeof success === 'function')
        success();
    });
  },

  LoadExtensionPreferences: function(success) {
    var storage = new Array();
    storage.push(this.storageKeys.extensionPreferences);

    chrome.storage.local.get(storage, this.Callback(function(storage) {
      this.extensionPreferences = storage[this.storageKeys.extensionPreferences];

      if (typeof this.extensionPreferences === 'undefined') {
        // first start, so we need to set proper time and save preferences
        this.extensionPreferences = {tutorial: 0, rate: (new Date().getTime()) + 3*60*60*1000};
        this.SaveExtensionPreferences();
      }

      if (this.debugMode) console.log('Tutorial will be shown "'+Math.round(this.extensionPreferences.tutorial/1000)+'" (Preferences.LoadExtensionPreferences)');
      if (this.debugMode) console.log('Rate will be shown "'+Math.round(this.extensionPreferences.rate/1000)+'" (Preferences.LoadExtensionPreferences)');

      if (success && typeof success === 'function')
        success();
    }, this));
  },

  SaveExtensionPreferences: function(success) {
    var storage = {};

    storage[this.storageKeys.extensionPreferences] = this.extensionPreferences;

    if (this.debugMode) console.log('Tutorial will be shown "'+Math.round(this.extensionPreferences.tutorial/1000)+'" (Preferences.SaveExtensionPreferences)');
    if (this.debugMode) console.log('Rate will be shown "'+Math.round(this.extensionPreferences.rate/1000)+'" (Preferences.SaveExtensionPreferences)');

    chrome.storage.local.set(storage, function() {
      if (success && typeof success === 'function')
        success();
    });
  }
}