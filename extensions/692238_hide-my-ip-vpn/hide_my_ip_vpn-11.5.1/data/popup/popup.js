var backgroundPage = chrome.extension.getBackgroundPage();

jQuery.each(jQuery('[data-l10n-id]'), function(i, e) {
  if (jQuery(e).attr('data-l10n-id').indexOf('placeholder') == 0) {
    jQuery(e).attr('placeholder', chrome.i18n.getMessage(jQuery(e).attr('data-l10n-id')));
  } else {
    jQuery(e).html(chrome.i18n.getMessage(jQuery(e).attr('data-l10n-id')));
  }
});

jQuery('<link/>', {
  rel: 'stylesheet',
  type: 'text/css',
  href: '../css/'+chrome.i18n.getMessage('locale_css')
}).appendTo('head');

jQuery("#contact-subject-input select").change(function () {
  (jQuery(this).find('option:selected').attr('disabled') == 'disabled') ?
    jQuery(this).addClass('empty') : jQuery(this).removeClass('empty')
  jQuery(this).find('option').css('color', '#3a3a3a');
});
jQuery("#contact-subject-input select").change();

var Popup = {
  views: {
    auth: jQuery('.auth-wrap').hide(),
    register: jQuery('.register-wrap').hide(),
    contact: jQuery('.contact-wrap').hide(),
    settings: jQuery('.settings-wrap').hide(),
    user_proxy: jQuery('.user-proxy-wrap').hide(),
    site_exclude: jQuery('.site-exclude-wrap').hide(),
    recover: jQuery('.recover-wrap').hide(),
    main: jQuery('.main-wrap').hide(),
    loader: jQuery('.membran.loading').hide(),
    rate: jQuery('.membran.rate').hide(),
    type: jQuery('.membran.type').hide()
  },

  messages: {
    auth: jQuery('.auth-wrap .message-wrap em span'),
    register: jQuery('.register-wrap .message-wrap em span'),
    contact: jQuery('.contact-wrap .message-wrap em span'),
    user_proxy: jQuery('.settings-wrap .message-wrap em span'),
    recover: jQuery('.recover-wrap .message-wrap em span'),
    main: jQuery('.main-wrap .message-wrap em span'),
    expired: jQuery('.main-wrap .expired')
  },

  inputs: {
    auth: {
      email: jQuery('#auth-email-input'),
      password: jQuery('#auth-password-input')
    },
    register: {
      email: jQuery('#register-email-input'),
      password1: jQuery('#register-password1-input'),
      password2: jQuery('#register-password2-input')
    },
    contact: {
      email: jQuery('#contact-email-input'),
      subject: jQuery('#contact-subject-input'),
      message: jQuery('#contact-message-input')
    },
    user_proxy: {
      list: jQuery('#user-proxy-list-input')
    },
    site_exclude: {
      list: jQuery('#site-explude-list-input')
    },
    recover: {
      email: jQuery('#recover-email-input')
    },
    main: {
      type: jQuery('.main-wrap .button.type i'),
      location: jQuery('.main-wrap h2 b'),
      gauge: jQuery('#main-gauge-box'),
      list: jQuery('#main-list-box'),
      search: jQuery('#main-search-input')
    }
  },

  buttons: {
    auth: {
      tab: jQuery('.auth-wrap .nav.tabs li').not('.active'),
      login: jQuery('.auth-wrap .nav.buttons .button')
    },
    register: {
      tab: jQuery('.register-wrap .nav.tabs li').not('.active'),
      register: jQuery('.register-wrap .nav.buttons .button')
    },
    contact: {
      send: jQuery('.contact-wrap .nav.buttons .button')
    },
    settings: {
      user_proxy: jQuery('#user-proxy'),
      site_exclude: jQuery('#site-exclude'),
      fake_browser: jQuery('#fake-browser'),
      fake_language: jQuery('#fake-language'),
      clean_cookie: jQuery('#clean-cookie'),
      block_flash: jQuery('#block-flash'),
      block_analytics: jQuery('#block-analytics'),
      block_ads: jQuery('#block-ads'),
      block_social: jQuery('#block-social'),
      block_referer: jQuery('#block-referer'),
      hide_icon: jQuery('#hide-icon'),
      all_switch: jQuery('#fake-browser, #fake-language, #clean-cookie, #block-flash, #block-analytics, #block-ads, #block-social, #block-referer, #hide-icon'),
      save: jQuery('.settings-wrap .nav.buttons .button')
    },
    user_proxy: {
      save: jQuery('.user-proxy-wrap .nav.buttons .button')
    },
    site_exclude: {
      save: jQuery('.site-exclude-wrap .nav.buttons .button')
    },
    recover: {
      recover: jQuery('.recover-wrap .nav.buttons .button')
    },
    main: {
      type: jQuery('.main-wrap .block.stats .type'),
      logout: jQuery('.main-wrap .block.stats .logout'),
      extend: jQuery('.main-wrap .nav.buttons .button'),
      elevator: jQuery('.main-wrap span.elevator')
    },
    rate: {
      now: jQuery('.membran.rate .rate-now'),
      later: jQuery('.membran.rate .rate-later'),
      no: jQuery('.membran.rate .rate-no')
    },
    type: {
      vpn: jQuery('.membran.type .buttons span.vpn'),
      proxy: jQuery('.membran.type .buttons span.proxy')
    },
    shared: {
      message: jQuery('li.message i'),
      howto: jQuery('li.howto i'),
      settings: jQuery('li.settings i'),
      recover: jQuery('li.recover i'),
      cancel: jQuery('li.cancel i'),
      reset: jQuery('i.close')
    }
  },

  loaderImageIndex: 1,
  loaderTimer: null,
  viewShowFnList: new Array(),

  originalLocation: '',
  subscriptionDuration: 0,
  subscriptionLeft: 0,
  showTutorial: 0,
  showRate: 0,

  serverProxyList: new Array(),
  freeProxyList: new Array(),
  userProxyList: new Array(),
  favoriteProxy: new Array(),
  settings: null,
  currentProxy: null,
  progress: 0,

  Callback: function(fn, ctx) {
    return function() {
      fn.apply(ctx, arguments);
    }
  },

  Emit: function(options) {
    // decorator: compatibility with Firefox/Chrome
    chrome.runtime.sendMessage({
      message: options.message,
      content: options.content
    });
  },

  Listen: function(options) {
    // decorator: compatibility with Firefox/Chrome
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (options.message == request.message)
        options.callback(request.content);
      return true;
    });
  },

  CleanDomString: function(html) {
    var allowed_tags = new Array('a', 'b', 'strong');
    var allowed_attributes = new Array('href');

    var parser = new DOMParser;
    var dom = parser.parseFromString(html, 'text/html').body;
    var list = dom.getElementsByTagName('*');
    if (list.length > 0)
      for (var i=0; i<list.length; i++) {
        if (allowed_tags.indexOf(list[i].tagName.toLowerCase()) < 0)
          dom.removeChild(list[i]);
        for (var j=0; j<list[i].attributes.length; j++) {
          var invalid_chars = list[i].attributes[j].value.match(/[^\w#]+/);
          var invalid_attribute = allowed_attributes.indexOf(list[i].attributes[j].name.toLowerCase()) < 0;
          if (invalid_chars || invalid_attribute)
            list[i].removeAttribute(list[i].attributes[j].name);
        }
      }
    return dom.innerHTML;
  },

  ResizePopup: function() {
    this.Emit({
      message: 'ResizePopupBackground',
      content: {
        'width': jQuery('body').outerWidth(),
        'height': jQuery('body').outerHeight()
      }
    });
    this.SavePopup();
  },

  SavePopup: function() {
    this.Emit({
      message: 'SavePopupBackground',
      content: {
        'email': this.inputs.auth.email.val(),
        'password': this.inputs.auth.password.val(),
        'originalLocation': this.originalLocation,
        'subscriptionDuration': this.subscriptionDuration,
        'subscriptionLeft': this.subscriptionLeft,
        'showTutorial': this.showTutorial,
        'showRate': this.showRate,
        'serverProxyList': this.serverProxyList,
        'freeProxyList': this.freeProxyList,
        'userProxyList': this.userProxyList,
        'favoriteProxy': this.favoriteProxy,
        'settings': this.settings,
        'currentProxy': this.currentProxy,
        'progress': this.progress,
        'viewShowFnList': this.viewShowFnList,
        'showTutorial': this.showTutorial,
        'showRate': this.showRate
      }
    });
  },

  CreateMenuItem: function(proxy, proxyType) {
    var countryCode = (proxy.countryCode === '??' || proxy.countryCode === '') ? 'un' : proxy.countryCode.toLowerCase();

    var name = (proxy.cityName) ? proxy.countryName+', <b>'+proxy.cityName+'</b>' : proxy.countryName;
    var mark = (proxyType == 'user') ? '<strong>USER</strong>' : (proxyType == 'free' ? '<strong>FREE</strong>' : '<strong>VIP</strong>');

    name = this.CleanDomString(name);
    mark = this.CleanDomString(mark);

    var item = jQuery('<li>')
      .attr('proxy', this.CleanDomString(proxy.proxy))
      .attr('type', this.CleanDomString(proxyType))
      .attr('country', this.CleanDomString(proxy.countryName.toLowerCase()))
      .attr('city', this.CleanDomString(proxy.cityName.toLowerCase()))
      .append(
        jQuery('<span>')
          .append(
            jQuery('<i>')
              .attr('class', 'star '+(proxy.isFavorite ? 'enabled' : ''))
          )
          .append(
            jQuery('<i>')
              .attr('class', 'flag '+this.CleanDomString(countryCode))
          )
          .append(' ')
          .append(this.CleanDomString(name)+' '+this.CleanDomString(mark))
      )
      .append(' ')
      .append(
        jQuery('<span>')
          .attr('class', 'switch')
      );

    if (proxyType == 'user')
      item.attr('title', this.CleanDomString(proxy.proxy))
    return item;
  },

  TwoProxyAreSame: function(proxy1, proxy2) {
    if (proxy1 === null || proxy2 === null) return false;
    return (proxy1.host === proxy2.host && proxy1.port === proxy2.port);
  },

  SortProxyList: function(proxyList) {
    var favoriteList = new Array();
    var regularList = new Array();
    if (proxyList.length)
      for (var i in proxyList)
        if (proxyList[i].isFavorite) {
          favoriteList.push(proxyList[i]);
        } else {
          regularList.push(proxyList[i]);
        }
    return favoriteList.concat(regularList);
  },

  AddToFavorite: function(proxy) {
    this.RemoveFromFavorite(proxy);
    this.favoriteProxy.push({
      host: proxy.host,
      port: proxy.port
    });
  },

  RemoveFromFavorite: function(proxy) {
    if (this.favoriteProxy.length)
      for (var i in this.favoriteProxy)
        if (this.favoriteProxy[i].host == proxy.host && this.favoriteProxy[i].port == proxy.port) {
          this.favoriteProxy.splice(i, 1);
          return;
        }
  },

  ApplyFavorites: function(proxyList) {
    if (proxyList.length && this.favoriteProxy.length)
      for (var i in proxyList) {
        var currentProxy = proxyList[i];
        for (var j in this.favoriteProxy)
          if (currentProxy.host == this.favoriteProxy[j].host && currentProxy.port == this.favoriteProxy[j].port) {
            proxyList[i].isFavorite = true;
            break;
          }
      }
    return proxyList;
  },

  ApplySearch: function() {
    var search_string = this.inputs.main.search.val().toLowerCase();
    if (search_string) {
      this.inputs.main.list.find('li').hide();
      this.inputs.main.list.find('li[country^="'+search_string+'"],li[city^="'+search_string+'"]').show();
    } else {
      this.inputs.main.list.find('li').show();
    }
    this.inputs.main.list.find('li:visible').removeClass('btop').slice(1).addClass('btop');
  },

  RestoreProxy: function() {
    this.Emit({
      message: 'RestoreProxyBackground',
      content: {}
    });
    this.currentProxy = null;
    this.inputs.main.location.text(this.originalLocation);
  },

  ProxyClick: function(proxy) {
    return this.Callback(function(event) {
      // click on add to favorites "star" icon
      if ($(event.target).is(this.inputs.main.list.find('li[proxy="'+proxy.proxy+'"] i.star'))) {
        proxy.isFavorite = !proxy.isFavorite;
        var menuItem = $(event.target).closest('li');
        if (proxy.isUserProxy) {
          this.userProxyList = this.SortProxyList(this.userProxyList);
          var list = this.inputs.main.list.find('li[type="user"]');
        } else if (proxy.isFreeProxy) {
          this.freeProxyList = this.SortProxyList(this.freeProxyList);
          var list = this.inputs.main.list.find('li[type="free"]');
        } else {
          this.serverProxyList = this.SortProxyList(this.serverProxyList);
          var list = this.inputs.main.list.find('li[type="vip"]');
        }
        if (proxy.isFavorite) {
          menuItem.find('i.star').addClass('enabled');
          menuItem.insertBefore(list.first());
        } else {
          menuItem.find('i.star').removeClass('enabled');
          menuItem.insertAfter(list.last());
        }
        this.inputs.main.list.find('li:visible').removeClass('btop').slice(1).addClass('btop');
        proxy.isFavorite ? this.AddToFavorite(proxy) : this.RemoveFromFavorite(proxy);
        this.Emit({
          message: 'SaveFavoriteBackground',
          content: {'favoriteProxy': this.favoriteProxy}
        });
        this.SavePopup();
        return;
      }

      if (this.subscriptionLeft >= 0 || proxy.isUserProxy || proxy.isFreeProxy) {
        this.inputs.main.list.find('li span.switch').removeClass('on');
        if (this.TwoProxyAreSame(this.currentProxy, proxy)) {
          this.RestoreProxy();
        } else {
          var host = proxy.host;
          var port = proxy.port;
          if (this.settings.proxy_type == 1 && !proxy.isUserProxy) {
            var host = proxy.domain_host;
            var port = proxy.domain_port;
          }
          this.Emit({
            message: 'SetupProxyBackground',
            content: {
              'host': host,
              'port': port,
              'code': proxy.countryCode,
              'name': proxy.countryName + (proxy.cityName ? ', '+proxy.cityName : ''),
              'user': proxy.user,
              'password': proxy.password
            }
          });
          this.currentProxy = proxy;
          this.inputs.main.location.text(proxy.countryName + (proxy.cityName ? ', '+proxy.cityName : ''));
          this.inputs.main.list.find('li[proxy="'+proxy.proxy+'"] span.switch').addClass('on');
        }
      } else {
        this.messages.expired.fadeIn('fast');
        this.ShowMessage(Popup.messages.main, jQuery('span[data-l10n-id="list_not_have_msg"]').html(), true);
      }
      this.SavePopup();
    }, this);

  },

  ShowMain: function(success) {
    this.viewShowFnList.push('ShowMain');

    // setup click event to hide 'expire' membran
    this.messages.expired.click(this.Callback(function(e) {
      this.messages.expired.fadeOut('fast');
      // dispaly total amount of gateways
      var totalProxy = this.serverProxyList.length + this.userProxyList.length;
      this.ShowMessage(this.messages.main, jQuery('span[data-l10n-id="list_total_msg"]').text().replace('#', totalProxy));
    }, this))

    this.inputs.main.list.empty();

    if (this.userProxyList.length) {
      for (var i in this.userProxyList) {
        var menuItem = this.CreateMenuItem(this.userProxyList[i], 'user');
        menuItem.click(this.ProxyClick(this.userProxyList[i]));
        this.inputs.main.list.append(menuItem);
      }
      this.inputs.main.list.append(jQuery('<li class="separator"></li>'));
    }

    if (this.freeProxyList.length) {
      for (var i in this.freeProxyList) {
        var menuItem = this.CreateMenuItem(this.freeProxyList[i], 'free');
        menuItem.click(this.ProxyClick(this.freeProxyList[i]));
        this.inputs.main.list.append(menuItem);
      }
      this.inputs.main.list.append(jQuery('<li class="separator"></li>'));
    }

    if (this.serverProxyList.length)
      for (var i in this.serverProxyList) {
        var menuItem = this.CreateMenuItem(this.serverProxyList[i], 'vip');
        menuItem.click(this.ProxyClick(this.serverProxyList[i]));
        this.inputs.main.list.append(menuItem);
      }

    // dispaly total amount of gateways
    var totalProxy = this.serverProxyList.length + this.userProxyList.length;
    this.ShowMessage(this.messages.main, jQuery('span[data-l10n-id="list_total_msg"]').text().replace('#', totalProxy));

    // display subscription status
    if (this.subscriptionLeft > 0) {
      this.inputs.main.gauge.find('span').text(jQuery('span[data-l10n-id="list_days_msg"]').text().replace('#', this.subscriptionLeft));
    } else if (this.subscriptionLeft == 0) {
      this.inputs.main.gauge.find('span').text(jQuery('span[data-l10n-id="list_today_smg"]').text());
    } else {
      this.inputs.main.gauge.find('span').text(jQuery('span[data-l10n-id="list_expire_msg"]').text());
    }
    var progress = Math.round(this.subscriptionLeft*100/this.subscriptionDuration);
    this.inputs.main.gauge.find('i').width(progress+'%');
    this.inputs.main.location.text(this.originalLocation);

    for (var i in this.views)
      this.views[i].hide();
    this.views.main.show();
    this.ResizePopup();

    if (this.subscriptionLeft > 0 && (new Date().getTime()) > this.showRate) {
      this.views.rate.show();
      var popup = this.views.rate.find('.please-rate');
      popup.css('margin-top', -1*popup.height()/2);
    }

    // recover scroll progress
    this.inputs.main.list.DomChanged();
    this.inputs.main.list.SetProgress(this.progress, false);
    this.SavePopup();

    // recover selected proxy if such exist
    if (this.currentProxy !== null) {
      var proxy = this.currentProxy;
      this.inputs.main.location.text(proxy.countryName + (proxy.cityName ? ', '+proxy.cityName : ''));
      this.inputs.main.list.find('li[proxy="'+proxy.proxy+'"] span.switch').addClass('on');
    }

    this.ApplySearch();

    this.inputs.main.type.removeClass('vpn proxy');
    this.inputs.main.type.addClass(this.settings.proxy_type == 1 ? 'vpn' : 'proxy');
    var show_type = window.localStorage.getItem('show_type');
    if (show_type == null || show_type == 0) {
      window.localStorage.setItem('show_type', 1);
      this.ShowType();
    }

    if (success && typeof success === 'function')
      success();
  },

  ShowAnimation: function(success) {
    if (this.loaderTimer === null)
      this.loaderTimer = setInterval(this.Callback(function(){
        this.views.loader.find('img').css('webkitTransform', 'rotate(' + this.loaderImageIndex*10 + 'deg)');
        this.loaderImageIndex = (this.loaderImageIndex >= 36) ? 1 : this.loaderImageIndex+1;
      }, this), 25);
    this.views.loader.fadeIn('fast', function() {
      if (success && typeof success === 'function')
        success();
    });
  },

  HideAnimation: function(success) {
    this.views.loader.fadeOut('fast', this.Callback(function() {
      clearTimeout(this.loaderTimer);
      this.loaderTimer = null;
      if (success && typeof success === 'function')
        success();
    }, this));
  },

  ShowType: function() {
    this.views.type.fadeIn('fast');
    var popup = this.views.type.find('.proxy-type');
    popup.css('margin-top', -1*popup.height()/2);
  },

  HideType: function() {
    this.views.type.fadeOut('fast');
  },

  ShowLogin: function() {
    this.viewShowFnList.push('ShowLogin');

    for (var i in this.views)
      this.views[i].hide();
    this.views.auth.show();
    this.ResizePopup();
  },

  ShowRegister: function() {
    this.viewShowFnList.push('ShowRegister');

    for (var i in this.views)
      this.views[i].hide();
    this.views.register.show();
    this.ResizePopup();
  },

  ShowContact: function() {
    this.viewShowFnList.push('ShowContact');

    for (var i in this.views)
      this.views[i].hide();
    this.inputs.contact.email.val(this.inputs.auth.email.val());
    this.views.contact.show();
    this.ResizePopup();
  },

  ShowSettings: function() {
    this.viewShowFnList.push('ShowSettings');

    for (var i in this.views)
      this.views[i].hide();

    Popup.LoadSettings();

    this.views.settings.show();
    this.ResizePopup();
  },

  ShowUserProxy: function() {
    this.viewShowFnList.push('ShowUserProxy');

    for (var i in this.views)
      this.views[i].hide();

    this.inputs.user_proxy.list.val(this.ProxyListToString(this.userProxyList));

    this.views.user_proxy.show();
    this.ResizePopup();
  },

  ShowSiteExclude: function() {
    this.viewShowFnList.push('ShowSiteExclude');

    for (var i in this.views)
      this.views[i].hide();

    Popup.LoadSettings();

    this.views.site_exclude.show();
    this.ResizePopup();
  },

  ShowRecover: function() {
    this.viewShowFnList.push('ShowRecover');

    for (var i in this.views)
      this.views[i].hide();
    this.views.recover.show();
    this.ResizePopup();
  },

  ShowMessage: function(output, message, isError) {
    var className = (typeof isError != 'undefined' && isError) ? 'error' : 'success';
    output.html(this.CleanDomString(message));
    output.parents('.block.body').find('.input-wrap').removeClass('success error').addClass(className);
    this.UpdateMessageLinks();
    this.ResizePopup();
  },

  HideMessage: function() {
    this.messages.expired.fadeOut('fast');
    for (var i in this.messages)
      this.messages[i].parents('.block.body').find('.input-wrap').removeClass('success error');
    this.ResizePopup();
  },

  SaveSettings: function() {
    var domain_regex = /[a-zA-Z0-9-\.]+/i;
    var raw_domain_list = this.inputs.site_exclude.list.val().split("\n");
    var domain_list = new Array();
    for (var i in raw_domain_list) {
      var domain = domain_regex.exec(raw_domain_list[i]);
      if (domain) domain_list.push(domain[0]);
    }
    this.settings.siteExpludeList = domain_list;

    this.settings.fake_browser = this.buttons.settings.fake_browser.find('span.switch.on').length ? true : false;
    this.settings.fake_language = this.buttons.settings.fake_language.find('span.switch.on').length ? true : false;
    this.settings.clean_cookie = this.buttons.settings.clean_cookie.find('span.switch.on').length ? true : false;
    this.settings.block_flash = this.buttons.settings.block_flash.find('span.switch.on').length ? true : false;
    this.settings.block_analytics = this.buttons.settings.block_analytics.find('span.switch.on').length ? true : false;
    this.settings.block_ads = this.buttons.settings.block_ads.find('span.switch.on').length ? true : false;
    this.settings.block_social = this.buttons.settings.block_social.find('span.switch.on').length ? true : false;
    this.settings.block_referer = this.buttons.settings.block_referer.find('span.switch.on').length ? true : false;
    this.settings.hide_icon = this.buttons.settings.hide_icon.find('span.switch.on').length ? true : false;
  },

  LoadSettings: function() {
    this.inputs.site_exclude.list.val(this.settings.siteExpludeList.join("\n"));

    this.buttons.settings.fake_browser.find('span.switch').removeClass('on').addClass(this.settings.fake_browser ? 'on' : '');
    this.buttons.settings.fake_language.find('span.switch').removeClass('on').addClass(this.settings.fake_language ? 'on' : '');
    this.buttons.settings.clean_cookie.find('span.switch').removeClass('on').addClass(this.settings.clean_cookie ? 'on' : '');
    this.buttons.settings.block_flash.find('span.switch').removeClass('on').addClass(this.settings.block_flash ? 'on' : '');
    this.buttons.settings.block_analytics.find('span.switch').removeClass('on').addClass(this.settings.block_analytics ? 'on' : '');
    this.buttons.settings.block_ads.find('span.switch').removeClass('on').addClass(this.settings.block_ads ? 'on' : '');
    this.buttons.settings.block_social.find('span.switch').removeClass('on').addClass(this.settings.block_social ? 'on' : '');
    this.buttons.settings.block_referer.find('span.switch').removeClass('on').addClass(this.settings.block_referer ? 'on' : '');
    this.buttons.settings.hide_icon.find('span.switch').removeClass('on').addClass(this.settings.hide_icon ? 'on' : '');
  },

  UpdateMessageLinks: function() {
    jQuery('a[href="#contact"]').unbind('click').click(this.Callback(function() {
      this.ShowContact();
    }, this))
    jQuery('a[href="#register"]').unbind('click').click(this.Callback(function() {
      this.inputs.register.email.val(this.inputs.auth.email.val());
      this.ShowRegister();
    }, this))
    jQuery('a[href="#recover"]').unbind('click').click(this.Callback(function() {
      this.ShowRecover();
    }, this))
    jQuery('a[href="#login"]').unbind('click').click(this.Callback(function() {
      this.buttons.auth.login.click();
    }, this))
    jQuery('a[href="#extend"]').unbind('click').click(this.Callback(function() {
      this.buttons.main.extend.click();
      Popup.ShowMessage(Popup.messages.main, jQuery('span[data-l10n-id="list_update_msg"]').text(), true);
    }, this))
  },

  ProxyListToString: function(proxyList) {
    var result = new Array();
    for (var i in proxyList) {
      if (proxyList[i].user !== null && proxyList[i].password !== null) {
        result.push(proxyList[i].user+':'+proxyList[i].password+'@'+proxyList[i].host+':'+proxyList[i].port);
      } else {
        var proxy = new Array(
          proxyList[i].countryCode,
          proxyList[i].countryName,
          proxyList[i].cityName,
          proxyList[i].host,
          proxyList[i].port
        );
        result.push(proxy.join(':'));
      }
    }
    return result.join("\n");
  }
}

Popup.Listen({
  message: 'AutoLoginContentScript',
  callback: function (message) {
    Popup.inputs.auth.email.val(message.email);
    Popup.inputs.auth.password.val(message.pass);
    Popup.buttons.auth.login.click();
  }
})


Popup.Listen({
  message: 'GeoInformatoinContentScript',
  callback: function (message) {
    Popup.originalLocation = message.location;
    Popup.SavePopup();
  }
})


Popup.Listen({
  message: 'TutorialRateContentScript',
  callback: function (message) {
    Popup.showTutorial = message.tutorial;
    Popup.showRate = message.rate;
    Popup.SavePopup();
  }
});


Popup.views.loader.click(function() {
  Popup.HideAnimation(function() {
    Popup.Emit({
      message: 'AbortRequestBackground',
      content: {}
    });
  })
})


Popup.buttons.auth.tab.click(function() {
  Popup.ShowRegister();
})


Popup.buttons.auth.login.click(function() {
  Popup.HideMessage();
  Popup.ShowAnimation(function() {
    Popup.Emit({
      message: 'AuthenticateBackground',
      content: {
        email: Popup.inputs.auth.email.val(),
        pass: Popup.inputs.auth.password.val()
      }
    });
  })
})

Popup.Listen({
  message: 'AuthenticateContentScript',
  callback: function (message) {
    if (message.code && message.message) {
      Popup.HideAnimation(function() {
        Popup.ShowMessage(Popup.messages.auth, message.message, true);
      })
    } else {
      Popup.subscriptionDuration = message.total;
      Popup.subscriptionLeft = message.valid;
      Popup.Emit({
        message: 'GetProxyListBackground',
        content: {
          email: Popup.inputs.auth.email.val(),
          password: Popup.inputs.auth.password.val(),
          isDemo: (message.valid < 0)
        }
      });
    }
  }
})

Popup.Listen({
  message: 'GetProxyListContentScript',
  callback: function (message) {
    Popup.HideAnimation(function() {
      if (message.code && message.message) {
        // this code should never be executed as we use demo list if user's subscription
        // is expired, however this code will show error if something unexpected happene
        Popup.ShowMessage(Popup.messages.main, message.message, true);
      } else {
        Popup.favoriteProxy = message.favoriteProxy;
        // apply favorites to existing list
        Popup.serverProxyList = Popup.SortProxyList(Popup.ApplyFavorites(message.serverProxyList));
        Popup.freeProxyList = Popup.SortProxyList(Popup.ApplyFavorites(message.freeProxyList));
        Popup.userProxyList = Popup.SortProxyList(Popup.ApplyFavorites(message.userProxyList));
        Popup.settings = message.settings;
        Popup.showTutorial = message.showTutorial;
        Popup.showRate = message.showRate;
      }
      Popup.ShowMain();
    })
  }
})

Popup.buttons.main.type.click(function() {
  Popup.HideMessage();
  Popup.ShowType();
});
Popup.buttons.type.vpn.click(function() {
  Popup.settings.proxy_type = 1;
  Popup.HideType();
  Popup.buttons.settings.save.click()
});
Popup.buttons.type.proxy.click(function() {
  Popup.settings.proxy_type = 2;
  Popup.HideType();
  Popup.buttons.settings.save.click()
});

Popup.buttons.main.logout.click(function() {
  Popup.HideMessage();
  Popup.ShowAnimation(function() {
    Popup.Emit({
      message: 'LogoutBackground',
      content: {
        email: Popup.inputs.auth.email.val()
      }
    });
  })
})

Popup.Listen({
  message: 'LogoutContentScript',
  callback: function (message) {
    Popup.HideAnimation(function() {
      Popup.inputs.auth.email.val('');
      Popup.inputs.auth.password.val('');
      Popup.ShowLogin();
    })
  }
})

Popup.buttons.main.extend.click(function() {
  var user = Popup.inputs.auth.email.val();
  var pass = Popup.inputs.auth.password.val();
  var authUrl = 'https://protect-your-ip.com/misc/proxylistpro/action?op=redirect&email='+user+'&password='+pass;

  Popup.Emit({
    message: 'OpenUrlBackground',
    content: authUrl
  });
})


Popup.buttons.main.elevator.gsSimpleScrollbar({
  min: 0,
  max: 100,
  step: 1,
  type: 'vertical',
  onChange: function(value, withAnimation) {
    Popup.inputs.main.list.SetProgress(value, false);
    Popup.progress = value;
    Popup.SavePopup();
  },
  onFinish: function(value, withAnimation) {
    Popup.inputs.main.list.SetProgress(value, true);
    Popup.progress = value;
    Popup.SavePopup();
  }
})

Popup.inputs.main.list.gsSimpleMouseWheel({
  min: 0,
  max: 100,
  step: 315, // pixels
  type: 'vertical',
  onFinish: function(value, withAnimation) {
    Popup.buttons.main.elevator.SetProgress(value, withAnimation);
    Popup.progress = value;
    Popup.SavePopup();
  }
});

Popup.inputs.main.search.keyup(function() {
  Popup.ApplySearch();
});

Popup.buttons.register.tab.click(function() {
  Popup.ShowLogin();
})


Popup.buttons.register.register.click(function() {
  Popup.HideMessage();
  if (Popup.inputs.register.password1.val() && Popup.inputs.register.password1.val() == Popup.inputs.register.password2.val()) {
    Popup.ShowAnimation(function() {
      Popup.Emit({
        message: 'RegisterUserBackground',
        content: {
          email: Popup.inputs.register.email.val(),
          pass: Popup.inputs.register.password1.val()
        }
      });
    })
  } else {
    Popup.ShowMessage(Popup.messages.register, jQuery('span[data-l10n-id="reg_match_msg"]').text(), true);
  }
})

Popup.Listen({
  message: 'RegisterUserContentScript',
  callback: function (message) {
    if (message.code && message.message) {
      Popup.HideAnimation(function() {
        Popup.ShowMessage(Popup.messages.register, message.message, true);
      })
    } else {
      Popup.inputs.auth.email.val(Popup.inputs.register.email.val());
      Popup.inputs.auth.password.val(Popup.inputs.register.password1.val());
      Popup.buttons.auth.login.click();
    }
  }
})


Popup.buttons.contact.send.click(function() {
  Popup.HideMessage();
  if (Popup.inputs.contact.subject.val() && Popup.inputs.contact.message.val()) {
    Popup.ShowAnimation(function() {
      Popup.Emit({
        message: 'SendMessageBackground',
        content: {
          email: Popup.inputs.contact.email.val(),
          pass: Popup.inputs.auth.password.val(),
          subject: Popup.inputs.contact.subject.val(),
          message: Popup.inputs.contact.message.val()
        }
      });
    })
  } else {
    Popup.ShowMessage(Popup.messages.contact, jQuery('span[data-l10n-id="ticket_empty_msg"]').text(), true);
  }
})

Popup.Listen({
  message: 'SendMessageContentScript',
  callback: function (message) {
    Popup.HideAnimation(function() {
      if (!message.isError) {
        Popup.inputs.contact.subject.val('');
        Popup.inputs.contact.subject.change();
        Popup.inputs.contact.message.val('');
      }
      Popup.ShowMessage(Popup.messages.contact, message.message, message.isError);
    })
  }
})


Popup.buttons.settings.user_proxy.click(function() {
  Popup.ShowUserProxy();
})

Popup.buttons.user_proxy.save.click(function() {
  Popup.HideMessage();
  Popup.ShowAnimation(function() {
    Popup.Emit({
      message: 'IdentifyProxyBackground',
      content: {
        data: Popup.inputs.user_proxy.list.val()
      }
    });
  })
})

Popup.Listen({
  message: 'IdentifyProxyContentScript',
  callback: function (message) {
    Popup.HideAnimation(function() {
      if (message.code && message.message) {
        // this code will be executed only if unexpected server error will happen OR
        // local code parsed proxy from raw data but server failed to parse even single proxy
        Popup.ShowMessage(Popup.messages.settings, message.message, true);
      } else {
        Popup.serverProxyList = message.serverProxyList;
        Popup.userProxyList = message.userProxyList;
        Popup.ShowMain();
      }
    })
  }
})


Popup.buttons.settings.site_exclude.click(function() {
  Popup.ShowSiteExclude();
})

Popup.buttons.site_exclude.save.click(function() {
  Popup.buttons.settings.save.click();
})


Popup.buttons.settings.all_switch.click(function() {
  $(this).find('span.switch').toggleClass('on');
})

Popup.buttons.settings.save.click(function() {
  Popup.SaveSettings();
  Popup.ShowAnimation(function() {
    Popup.Emit({
      message: 'SaveSettingsBackground',
      content: {
        settings: Popup.settings
      }
    });
  })
})

Popup.Listen({
  message: 'SaveSettingsContentScript',
  callback: function (message) {
    Popup.HideAnimation(function() {
      Popup.settings = message.settings;
      Popup.RestoreProxy();
      Popup.ShowMain();
    })
  }
})


Popup.buttons.recover.recover.click(function() {
  Popup.HideMessage();
  Popup.ShowAnimation(function() {
    Popup.Emit({
      message: 'RecoverPasswordBackground',
      content: {
        email: Popup.inputs.recover.email.val()
      }
    });
  })
})

Popup.Listen({
  message: 'RecoverPasswordContentScript',
  callback: function (message) {
    Popup.HideAnimation(function() {
      Popup.ShowMessage(Popup.messages.recover, message.message, message.isError);
    })
  }
})


Popup.Listen({
  message: 'HidePopupContentScript',
  callback: function (message) {
    window.close();
  }
})


Popup.buttons.rate.now.click(function() {
  Popup.views.rate.hide();
  Popup.Emit({
    message: 'RateNowBackground',
    content: {}
  });
});

Popup.buttons.rate.later.click(function() {
  Popup.views.rate.hide();
  Popup.Emit({
    message: 'RateLaterBackground',
    content: {}
  });
});

Popup.buttons.rate.no.click(function() {
  Popup.views.rate.hide();
  Popup.Emit({
    message: 'RateNoProxyBackground',
    content: {}
  });
});

Popup.buttons.shared.cancel.click(function() {
  var currentViewShowFn = Popup.viewShowFnList.pop();
  var previousViewShowFn = Popup.viewShowFnList.pop();
  Popup[previousViewShowFn]();
})

Popup.buttons.shared.message.click(function() {
  Popup.ShowContact();
})

Popup.buttons.shared.howto.click(function() {
  Popup.Emit({
    message: 'ShowHowToBackground',
    content: {}
  });
})

Popup.buttons.shared.settings.click(function() {
  Popup.ShowSettings();
})

Popup.buttons.shared.recover.click(function() {
  Popup.ShowRecover();
})

Popup.buttons.shared.reset.click(function() {
  $(this).parent().find('input').val('');
})

Popup.Emit({
  message: 'InitializeBackground',
  content: {}
});

Popup.Listen({
  message: 'InitializeContentScript',
  callback: function (message) {
    if (message !== null) {
      Popup.inputs.auth.email.val(message.email);
      Popup.inputs.auth.password.val(message.password);
      Popup.originalLocation = message.originalLocation,
      Popup.subscriptionDuration = message.subscriptionDuration,
      Popup.subscriptionLeft = message.subscriptionLeft,
      Popup.showTutorial = message.showTutorial,
      Popup.showRate = message.showRate,
      Popup.serverProxyList = message.serverProxyList,
      Popup.freeProxyList = message.freeProxyList,
      Popup.userProxyList = message.userProxyList,
      Popup.favoriteProxy = message.favoriteProxy;
      Popup.settings = message.settings;
      Popup.currentProxy = message.currentProxy;
      Popup.progress = message.progress;
      Popup.viewShowFnList = message.viewShowFnList;
      Popup[Popup.viewShowFnList.pop()]();
      Popup.showTutorial = message.showTutorial;
      Popup.showRate = message.showRate;
    } else {
      Popup.ShowLogin();
      Popup.Emit({
        message: 'LoadPreferencesBackground',
        content: {}
      });
    }
  }
})

//Popup.Emit({message: 'ConsoleLog', content: {'search_string': search_string}})