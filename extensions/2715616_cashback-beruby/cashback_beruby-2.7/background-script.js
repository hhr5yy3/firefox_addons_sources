var cookies_asked = false;
var cookies_accepted = false;
var visited = [];

var language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);

switch(language) {
  case 'es':
    country_code = 'es';
    break;
  case 'es-ES':
    country_code = 'es';
    break;
  case 'es-MX':
    country_code = 'mx';
    break;
  case 'it':
    country_code = 'it';
    break;
  case 'it-IT':
    country_code = 'it';
    break;
  case 'pt':
    country_code = 'pt';
    break;
  case 'pt-PT':
    country_code = 'pt';
    break;
  case 'pt-BR':
    country_code = 'br';
    break;
  case 'es-US':
    country_code = 'us';
    break;
  case 'en-US':
    country_code = 'us';
    break;
  default:
    country_code = 'us';
    language = 'es-US';
}

var country = "https://" + country_code + ".beruby.com";

var tol_visited = 7200000
var urls_date;
var PIXELS = {
    es: 481117,
    it: 93585,
    br: 96237,
    pt: 79861,
    mx: 31209,
    ar: 22269,
    co: 10441,
    cl: 4957,
    us: 40393,
    tr: 373205
};
var ALLOWED_DOMAINS = ["facebook","google","yahoo","bing"]

if (localStorage.getItem('beruby_cookies') == 'accepted'){
  cookies_accepted = true;
  cookies_asked = true;
}

if (localStorage.getItem('cookies_asked') == 'true'){
  cookies_asked = true;
}

function handle_installed(details) {
  cleanup_urls();
  browser.tabs.create({
    url: country + "/portal/landing/extension?locale=" + language
  });
}

function is_an_allowed_domain(hostname){
  var result = false
  ALLOWED_DOMAINS.forEach(function(element){
    if(hostname.includes(element)){
      result = true
    }
  })
  return result
}

function show_pixel(pixel_type,widget){
  var widget_id = PIXELS[country.substring(8,10)];
  var pixel_url = country + "/track/"+ widget_id+ "/" + pixel_type + "/extension/pixel?other=" + widget;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', pixel_url, true);
  xhr.send(null);
}

function send_click_account(widget_id){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', country + '/portal/mobile_click_account?widget_id=' + widget_id + '&click_from=Extension' , true);
    xhr.send(null);
}

function visit_clicked(widget_id, product_url){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      activate_cashback(widget_id,product_url);
    } else if(xhr.readyState == 4 && xhr.status != 200){
      var login = localStorage.getItem('login')
      var url = localStorage.getItem('more_info')
      var phrase = localStorage.getItem('visit');
      get_active_tab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id,{"action": "unlogged", "url":country, "button_text":login, "phrase":phrase, "widget_id":widget_id});
      })
    }
  }
  xhr.open('GET', country + "/account/is_logged_in", true);
  xhr.send(null);
}

function cleanup_urls(){
  var cookies_accepted = false;
  if (localStorage.getItem('beruby_cookies') == 'accepted'){
    cookies_accepted = true;
  }
  localStorage.removeItem('visit');
  localStorage.removeItem('login');
  localStorage.removeItem('click_to_activate');
  localStorage.removeItem('cashback');
  localStorage.removeItem('more_info');
  localStorage.removeItem('no_cookies');
  localStorage.removeItem('cookies_advise');
  localStorage.removeItem('accept_cookies');
  localStorage.removeItem('reject_cookies');
  localStorage.removeItem('policy');
  localStorage.removeItem('policy_text');
  localStorage.removeItem('beruby_cookies');
  localStorage.removeItem('advertisers');
  localStorage.removeItem('main_advertisers');
  localStorage.removeItem('num_domains');
  localStorage.removeItem('domains_date');
  localStorage.removeItem('categories');
  localStorage.removeItem('i18nextLng');
  if(cookies_accepted){
     localStorage.setItem('beruby_cookies', 'accepted');
  }
}

function load_categories(){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var response = JSON.parse(xmlHttp.responseText);
        localStorage.setItem('categories', JSON.stringify(response.categories));
      }
  }
  xmlHttp.open("GET", country + "/ext/categories", true); 
  xmlHttp.send(null);
}

function load_advertisers(){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var response = JSON.parse(xmlHttp.responseText);
        localStorage.setItem('advertisers', JSON.stringify(response.advertisers));
        localStorage.setItem('num_domains', response.advertisers.length);
        var now = new Date();
        localStorage.setItem('domains_date', now);
      }
  }
  xmlHttp.open("GET", country + "/ext/urls", true); 
  xmlHttp.send(null);
}


function load_messages(){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var response = JSON.parse(xmlHttp.responseText);
        localStorage.setItem('visit', response.messages[0].message);
        localStorage.setItem('login', response.messages[2].message);
        localStorage.setItem('click_to_activate', response.messages[1].message);
        localStorage.setItem('cashback', response.messages[4].message);
        localStorage.setItem('more_info', response.messages[5].message);
        localStorage.setItem('no_cookies', response.messages[6].message);
        localStorage.setItem('cookies_advise', response.messages[7].message);
        localStorage.setItem('accept_cookies',response.messages[8].message);
        localStorage.setItem('reject_cookies',response.messages[9].message);
        localStorage.setItem('policy',response.messages[10].message);
        localStorage.setItem('policy_text',response.messages[11].message);
        localStorage.setItem('beruby_cookies', 'accepted');   
      }
  }
  xmlHttp.open("GET", country + "/ext/messages", true); 
  xmlHttp.send(null);
}

function check_domain(domain){
  beruby_domain = domain.includes('.beruby.');
  var obj = false;
  if(beruby_domain){
    return [-1, true, false];
  } else {
    advertisers = JSON.parse(localStorage.getItem('advertisers'));
    obj = $.grep(advertisers, function(obj){
      return domain.includes(obj.domain.replace('*','')) == true;
    })[0];
  }
  if(obj != undefined){
    is_visited = check_visited(obj.id);
    return [obj.id,is_visited,obj];
  } else {
    return [-1,false,false]
  }
}

function searcher(q){
  var advertisers = JSON.parse(localStorage.getItem('advertisers'));
  var obj = $.grep(advertisers, function(obj){
    return obj.name.toLowerCase() == q.toLowerCase();
  })[0];
  return obj;
}

function activate_cashback(widget_id,product_url){
    var url_iframe = country + '/' + widget_id +'/redirection?notimeout=1&from_extension=1&product_url=' + product_url
    var cashback = localStorage.getItem('cashback')
    get_active_tab().then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id,{"action": "show_iframe",phrase:cashback, "url_iframe": url_iframe});
    })
    show_pixel('click',widget_id);
    send_click_account(widget_id);
    var now = new Date();
    visited.push([widget_id,now.getTime()]);
}

function check_visited(id){
  clean_up_visited();
  var now = new Date();
  num_visited_domains = visited.length;
  if(num_visited_domains > 0){
      for(var i = 0; i < num_visited_domains ; i++){
          var match = visited[i][0] == id;
          if(match && (now.getTime() - visited[i][1]) <= tol_visited){
            visited[i][1] = now.getTime();
            return true;
          }
      }
  }
  return false;
}

function clean_up_visited(){
  var clean_visited = []
  num_visited_domains = visited.length;
  if(num_visited_domains > 0){
    for(var i = 0 ; i < num_visited_domains ; i++){
      var now = new Date();
      if((now.getTime() - visited[i][1]) <= tol_visited){
        clean_visited.push(visited[i]);  
      }
    }
  }
  visited = clean_visited;
}

function get_active_tab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function ask_cookies(){
  if (localStorage.getItem('beruby_cookies') != 'accepted'){
  var phrase = ""
  var accept = ""
  var reject = ""
  var policy = ""
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var response = JSON.parse(xmlHttp.responseText);
        phrase = response.messages[7].message
        accept = response.messages[8].message
        reject = response.messages[9].message
        policy = response.messages[10].message
        policy_text = response.messages[11].message
        get_active_tab().then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id,{"action": "ask_cookies","phrase":phrase,"accept":accept,"reject":reject,"policy":policy,"policy_text":policy_text});
        })  
      }
    }
    xmlHttp.open("GET", country +"/ext/messages", true); 
    xmlHttp.send(null);
  }
}


function show_privacy_policy(){
  var phrase = ""
  var accept = ""
  var reject = ""
  var policy = ""
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      var response = JSON.parse(xmlHttp.responseText);
      accept = response.messages[8].message
      reject = response.messages[9].message
      phrase = response.messages[11].message
      more_info = response.messages[5].message
      more_info_url = country+"/web/beruby-cashback"
      get_active_tab().then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id,{"action": "show_privacy_policy","phrase":phrase,"accept":accept,"reject":reject,"more_info":more_info,"more_info_url":more_info_url});
      });
    }
  }
  xmlHttp.open("GET", country +"/ext/messages", true); 
  xmlHttp.send(null);
}


function notify(message) {
  if(message.action == "accept_cookies"){
    if(message.accept_cookies){
      cookies_accepted = true;
      load_messages();
      load_categories();
      load_advertisers();
      load_main_advertiser();
    } else {
      cookies_accepted = false;
    }
    cookies_asked = true;
  }

  if(!cookies_asked && localStorage.getItem('beruby_cookies') != 'accepted' && message.action != 'show_privacy_policy' && message.action == 'new_url'){
    ask_cookies();
  }

  if (message.action == 'show_privacy_policy'){
    show_privacy_policy();
  }

  if (localStorage.getItem('beruby_cookies') == 'accepted'){
    today = new Date
    url_date = new Date(localStorage.getItem('domains_date'));
    diff = today - url_date

    if (diff > 7200000){
      cleanup_urls();
      load_messages();
      load_categories();
      load_advertisers();
      load_main_advertiser();
    }

    if(message.action=="new_url"){
      is_google = message.domain.includes('www.google.');
      is_bing = message.domain.includes('www.bing.');
      is_yahoo = message.domain.includes('search.yahoo.');

      if(is_google || is_bing || is_yahoo){
        get_active_tab().then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id,{"action": "in_searcher", "phrase":'Enlace encontrado: ', "url":'domain', "button_text":'button_text', "more_info":'more_info', "widget_id": 1, "append": false });
        })
      }
      check = check_domain(message.domain);
      if (check[0] >= 0 && check[1] == false){
        var widget_id = check[2].id;
        var phrase = check[2].phrase;
        var url = check[2].cashback_url;
        var button_text = localStorage.getItem('click_to_activate');
        var more_info = localStorage.getItem('more_info');
        show_pixel('display',widget_id);
        get_active_tab().then((tabs) => {
          if (tabs[0].url.includes(message.domain)){
            browser.tabs.sendMessage(tabs[0].id,{"action": "show_popup", "phrase":phrase, "url":url, "button_text":button_text, "more_info":more_info, "widget_id": widget_id });
          }
        })
      }  
    } else if (message.action == "check_domain"){
       check = check_domain(message.domain);
       if (check[0] >= 0){
        var widget_id = check[2].id;
        var phrase = check[2].phrase;
        var url = check[2].cashback_url;
        var button_text = localStorage.getItem('click_to_activate');
        var more_info = localStorage.getItem('more_info');
        show_pixel('display',widget_id,country);
        get_active_tab().then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id,{"action": "in_searcher", "phrase":phrase, "url":url, "button_text":button_text, "more_info":more_info, "widget_id": widget_id, "append": true, "country": country });
        })
      } 
    } else if(message.action=="close_button"){
      var now = new Date();
      visited.push([message.widget_id,now.getTime()]);
    } else if(message.action=="visit"){
      visit_clicked(message.widget_id, message.url);
    }
  }
}

function visit_from_popup(url,id){
  check_visited(id);
  return redirect_to_advertiser(id);
}

function redirect_to_advertiser(id){
    var url = country + '/'+ id +'/redirection?notimeout=1&from_extension=1'
    show_pixel('click',id);
    send_click_account(id);
    var now = new Date();
    visited.push([id,now.getTime()]);
    return url;
}

function user_logged(){
  localStorage.logged = true;
}

function accept_cookies(){
  if(localStorage.getItem('beruby_cookies') == 'accepted'){
    return true;
  } else {
    return false;
  }
}

function confirm_cookies(){
  cookies_accepted = true;
  localStorage.setItem('beruby_cookies', 'accepted');
  load_categories();
  load_messages();
  load_advertisers();
  load_main_advertiser();
}

function is_login(){
  return localStorage.logged;
}

function add_visit(id){
  var now = new Date();
  visited.push([id,now.getTime()]);
}

function set_user_data(user){
  sessionStorage.setItem('user', JSON.stringify(user));
}

function get_user_data(){
  return JSON.parse(sessionStorage.getItem('user'));
}

function remove_user_data(){
  sessionStorage.removeItem('user');
}


function get_categories(){
  return JSON.parse(localStorage.getItem('categories'));
}

function get_categories_by_name(key){
  all_advertisers = JSON.parse(localStorage.getItem('advertisers'));
  advertisers = [];
  if(all_advertisers.length > 0){
    for(var i = 0; i < all_advertisers.length ; i++){
      if(all_advertisers[i].category == key){
        advertisers.push(all_advertisers[i]);
      }
    }
  }
  return advertisers;
}

function searcher(q){
  var advertisers = JSON.parse(localStorage.getItem('advertisers'));
  shops = []
  if(advertisers.length > 0){
    for(var i = 0; i < advertisers.length ; i++){
      var match = advertisers[i].name.toLowerCase().search(q.toLowerCase());
      if(match != -1){
        shops.push(advertisers[i]);
      }
    }
  }
  return shops;
}

function load_main_advertiser(){
  var data = $.getJSON( country + "/ext/top_widgets", function(){})
  .done(function() {
    json = data.responseJSON;
    set_main_advertisers(json.top_widgets);
  })
  .fail(function() {})
  .always(function() {});
}

function set_main_advertisers(widgets){
  localStorage.setItem('main_advertisers', JSON.stringify(widgets));
}

function get_main_advertisers(widgets){
  return JSON.parse(localStorage.getItem('main_advertisers'));
}

browser.runtime.onMessage.addListener(notify);
browser.runtime.onInstalled.addListener(handle_installed);
