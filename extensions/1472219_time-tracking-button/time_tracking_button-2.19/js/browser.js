TAB_DOMAIN = typeof TAB_DOMAIN == "object" ? TAB_DOMAIN : false;
TAB_APP = typeof TAB_APP == "object" ? TAB_APP : {};

var SETTINGS;
var CUSTOM_DOMAINS;
var DOMAINS;
var LOCAL_TASKS;
var TASKS = [];
var CURRENT_TASK = null;
var TRACKING_TASK = '';
var SUPPORTS_SHARED_TASKS = null;

var mutation_timer;
var mutation_time = 500;
var event_timer;
var current_event = false;
var current_event_time = 1000;
var track_domain = false;

var style_id = "ttS";
var container_element = 'span';
var container_class = "ttC";
var css_mode_class = "only-css";
var button_element = 'a';
var button_class = "ttB";
var add_button_class = "ttA";
var duration_class = "ttD";
var message_class = "ttM";
var is_tracking_class = "is_tracking";
var formula_class = "TrackingTime";
var imp = ";";
var duration = false;

var custom_domains_appended = false;
var CHROME = navigator.userAgent.indexOf('Chrome') > -1;
var FF = navigator.userAgent.indexOf('Firefox') > -1; 
var EDGE = navigator.userAgent.indexOf('Edg') > -1;
var SAFARI = navigator.userAgent.indexOf("Safari") > -1 && !CHROME;


window.TTExtensionBrowser = {};

document.addEventListener('keydown', function(e) {
  if (e.which == 27) {
    if (TTModal.IS_ACTIVE) {
      TTModal.destroy();
    }
  }
});

// iframe messages
window.addEventListener("message", function(event) {
  if(event.origin.indexOf('.trackingtime.') == -1){
    return false;
  }
  var message = false;
  try {
    message = JSON.parse(event.data);
  } catch (e) {}
  if (!message) {
    return;
  }
  if (message.event == 'on_start_tracking') {
    chrome.runtime.sendMessage({ action: "timerStartedElsewhere" }, typeof callback == 'function' ? callback : function(){});
  } else
  if (message.event == 'on_stop_tracking') {
    chrome.runtime.sendMessage({ action: "timerStopedElsewhere" }, typeof callback == 'function' ? callback : function(){});
  } else
  if (message.event == 'on_tracking_error') {
    chrome.runtime.sendMessage({ action: "notifyOnError", data: message.data }, function(response) {});
  } else
  if (message.event == 'on_event_added') {
    // recibo del modal de add event, le mando al iframe de task detail
    var task_detail_iframes = document.querySelectorAll('iframe[src^="'+TTIframes.task_detail.url+'"]');
    for (var i = 0; i < task_detail_iframes.length; i++) {
      task_detail_iframes[i].contentWindow.postMessage(JSON.stringify( {'event': message.event, 'data': message.data} ), '*');
    }
  }
  if (message.event == 'close_iframe') {
    TTModal.destroy();
  }
  if (message.event == 'get_current_session') {
    TTRequests.getCurrentSession(function(current_session) {
      if (current_session.user != null) {
        var event_iframe = $('iframe[src="' + message.data.url + '"]');
        if (event_iframe.length) {
          event_iframe[0].contentWindow.postMessage(JSON.stringify({ 'event': 'set_current_session', 'data': current_session }), '*');
        }
      }
    });
  }
  if (message.event == 'add_new_event') {
    
    var url = new URL(TTIframes.add_event.url);
    url.searchParams.append('service', message.data.service);
    url.searchParams.append('service_task_id', message.data.service_task_id);
    if (message.data.service_project_id) {
      url.searchParams.append('service_project_id', message.data.service_project_id);
    }
    pageView('/open-event-iframe/' + TAB_DOMAIN.domain);
    setSessionCookie();
    TTModal.show({
      display: 'right',
      iframe: url,
      title: 'Add new event',
      onload: function(e) {
        // fallback: iframe manda get_current_session
        var event_iframe = e.target;
        setTimeout(function() {
          TTRequests.getCurrentSession(function(current_session) {
            if (current_session.user != null) {
              event_iframe.contentWindow.postMessage(JSON.stringify({ 'event': 'set_current_session', 'data': current_session }), '*');
            }
          });
        }, 1000);
      }
    });
    
  }
}, false);

// tab messages
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {    
  switch (request.action) {
    case 'onGetServiceTask':
      var task = request.data[0] || false;
      if(task){
        if (task.projects.length > 1) {
          TTPlayer.showProjects({ service_task_id: task.id, service: task.service, service_task_id: task.id, projects: task.projects });
        } else {
          TTRequests.startTracking({ id: task.id, service: task.service });
        }
      }
      break;
    case 'onGetServiceTaskError':
      
      break;
    default:
      break;
  }
});

window.TTComponents = {
  set: function(domain) {
    var components = this.get(domain);
    for (var c in components) {
      if (components[c].enabled != false) {
        if (components[c].app_required == true && TAB_APP.enabled != true) {
          // necesita la app y no está prendida
          continue;
        }
        this.placeComponent(components[c], domain);
      }
    }
  },
  get: function(domain) {
    //return valid rules
    var valid_components = [];
    for (var i in domain.components) {
      var is_valid = false;
      if(typeof domain.components[i].url_pattern == "string"){        
        is_valid = this.isValidUrl(domain.components[i].url_pattern);
      }else{
        is_valid = this.isValid(location.href, domain.components[i].url, domain);
      }
      if(is_valid){
        valid_components.push(domain.components[i]);
      }
    }
    return valid_components;
  },
  isValid: function(current_url, component_url, domain) {
    //compares current_url with component url
    var valid = false;

    if (component_url == "") { //no url, pass by
      valid = true;
    } else {
      var urlA = component_url.split("/");
      var urlB = parseUrl(current_url, domain.domain);
      // testing array vs array
      if (urlA.length == urlB.length) {
        for (var i = 0; i < urlA.length; i++) {
          if (urlA[i] == "*") {
            valid = true;
          } else
          if (urlA[i].startsWith("*!")) {
            var neg = urlA[i].slice(2);
            var neg_a = neg.split(',');
            if (neg_a.indexOf(urlB[i]) < 0) {
              valid = true;
            } else {
              valid = false;
              break;
            }
          } else {
            var pos_a = urlA[i].split(',');
            if (pos_a.indexOf(urlB[i]) > -1) {
              valid = true;
            } else {
              valid = false;
              break;
            }
          }
        }
      } else {
        valid = false;
      }
    }

    return valid;
  },
  /**
   * @param {string} url_pattern | https://github.com/snd/url-pattern
   */
  isValidUrl: function(url_pattern){
    var matches = null;
    if (url_pattern == '') {
      return true;
    } else {
      var url_patterns = url_pattern.split(',');
      for (var j = 0; j < url_patterns.length; j++) {
        if (url_patterns[j] == '') {
          continue;
        }
        var pattern = new UrlPattern(url_patterns[j]);
        matches = pattern.match(getCurrentLocation());
        if (matches != null) {
          return true;
        }
      }
    }
    return;
  },
  placeComponent: function(component, domain) {
    // busco el selector
    var selector = component.selector ? document.querySelectorAll(component.selector) : document.querySelectorAll('body');
    if (!selector) {
      console.error('Component selector not found');
      return false;
    }
    
    // selector como NodeList
    for (var i = 0; i < selector.length; i++) {
      
      // levanto template
      var template = this.getComponentTemplate(component);
      
      if (!template) {
        // no tiene template
        console.error('Component template was not found');
        continue;
      }
      
      var style = this.setStyle(component.style);
      
      // busco si ya existe
      var element = selector[i].querySelector(template.selector);
      if (element) {
        continue;
      }
      if (!component.anchor) {
        // no tiene anchor, usa el selector
        //console.error('Component anchor is not defined');
        //continue;
      }
      
      var rendered_element = this.renderElement(template.html, selector[i], component.anchor, component.placement);
      
      // si se renderizó bien
      if (rendered_element) {
        rendered_element.setAttribute('data-component', component.type);
        rendered_element.setAttribute('data-service', domain.app ? domain.app : domain.id);
        
        if(component.id){
          // busco id
          var id = this.getComponentId(selector[i], component.id);
          if(id){
            rendered_element.setAttribute('data-service_task_id', id);
          }
        }
        
        this.setEvents(component, rendered_element);
        
        if(component.iframe){
          // busco iframe url
          var rendered_iframe = this.renderIframe(component, rendered_element);  
        }
        if(style){
          rendered_element.setAttribute('data-style', style.getAttribute('data-style'));
        }
        
        if(TAB_DOMAIN.app_has_multiple_projects !== true) {
          //rendered_element.querySelectorAll();
        }
        
        if (component.app_required && TAB_APP.sync == false) {
          // necesita la app y no está sincronizada
          rendered_element.classList.add('sync_required');
          rendered_element.addEventListener('click', function(e){
            chrome.runtime.sendMessage({ action: "notifyOnSyncRequired", data: TAB_DOMAIN.app }, function(response) {});
            return false;
          });
        }
        
      }
    
    }
  },
  /**
   * @param {string} html
   * @param {string} selector
   * @param {string} anchor
   * @param {string} placement | append, prepend, after, before
   */
  renderElement: function(html, selector, anchor, placement) {
    
    var element = htmlToElement(html);
    var anchor_element = anchor ? selector.querySelector(anchor) : selector;
    
    if (!anchor_element) {
      //console.error('anchor (' + anchor + ') not found');
      return;
    }
    if (placement === "append") {
      return anchor_element.appendChild(element);
    }
    if (placement === "prepend") {
      return anchor_element.insertBefore(element, anchor_element.firstChild);
    }
    if (placement === "before") {
      return anchor_element.parentNode.insertBefore(element, anchor_element);
    }
    if (placement === "after") {
      return anchor_element.parentNode.insertBefore(element, anchor_element.nextSibling);
    }
    console.error('invalid placement for anchor (' + anchor_element + '): ' + placement + '. Supported: append, prepend, after, before.');
    return;
  },
  getComponentTemplate: function(component){
    var type = component.type;
    var template = component.template;
    if(typeof template == 'string'){
      return typeof TTTemplates[template] == 'object' ? TTTemplates[template] : false;
    }
    if(typeof template == 'object'){
      return template;
    } else 
    if(type == 'iframe'){
      return TTTemplates.iframe;
    }else if(type == 'project_detail'){
      return TTTemplates[type];
    }
    
    return false;
  },
  /**
   * @param {Object} id
   * @param {string} id.url_pattern | https://github.com/snd/url-pattern
   * @param {string} id.selector
   * @param {string} id.attr | url_pattern node, selector attribute, "text", "value"
   * @param {Object} id.parser | getParsedId
   */
  getComponentId: function(parent, id_object){
    var id = '';
    if(typeof id_object == "object"){
      var selector = '';
      
      if(typeof id_object.url_pattern == 'string'){
        var pattern = new UrlPattern(id_object.url_pattern);
        var matches = pattern.match(getCurrentLocation());
        if(typeof id_object.attr == 'string' && matches != null){
          if(typeof matches[id_object.attr] != "undefined"){
            return matches[id_object.attr];
          }else{
            return;
          }
        }
        return;
      }
      
      if (typeof id_object.selector == "undefined" || id_object.selector == 'this') {
        selector = parent;
      } else {
        selector = parent.querySelector(id_object.selector);
      }
      
      if(!selector){
        return;
      }
      
      if (id_object.attr == 'text') {
        id = selector.lastChild.innerHTML;
      } else
      if (id_object.attr == 'value') {
        id = selector.value;
      } else {
        id = selector.getAttribute(id_object.attr);
      }
      
      // parser
      if(typeof id_object.parser == "object"){
        id = this.getParsedId(id, id_object.parser);
      }
    }
    return id;
  },
  /**
   * @param {string} id | id to parse
   * @param {Object} parser
   * @param {string} parser.split | separator
   * @param {number|string} parser.pos | split position, "first", "last"
   */
  getParsedId: function(id, parser){
    
    // split
    if (typeof parser.split == "string" && typeof parser.pos != "undefined") {
      var splitted_id = id.split(parser.split);
      if(parser.pos == "first"){
        id = splitted_id[0];
      }else
      if(parser.pos == "last"){
        id = splitted_id[splitted_id.length-1];
      }else
      if(typeof parser.pos == "number"){
        id = typeof splitted_id[parser.pos] == "string" ? splitted_id[parser.pos] : splitted_id[0];
      }
    }
    
    return id;
  },
  renderIframe: function(component, parent){
    var iframe = component.iframe;
    if(typeof iframe == 'string'){
      iframe = typeof TTIframes[iframe] == 'object' ? TTIframes[iframe] : iframe;
    }
    
    var url = false;
    try {
      url = new URL(iframe.url);  
    } catch (e) {}

    if(url){
      var id = parent.getAttribute('data-service_task_id');
      var service = parent.getAttribute('data-service');
      
      url.searchParams.append('service_task_id', id);
      url.searchParams.append('service', service);
      
      var html = '<iframe src="' + url.href + '" height="100%" frameborder="0" scrolling="no" />';
      
      return this.renderElement(html, parent, '', 'append');
    }
    return;
  },
  setEvents: function(component, element){
    // set events
    var action_elements = this.getElementsWithAttribute('data-action', element);
    
    for (var i = 0; i < action_elements.length; i++) {
      var action = action_elements[i].getAttribute('data-action');
      if(typeof TTEvents[action] == "function"){
        action_elements[i].addEventListener('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          TTEvents[this.getAttribute('data-action')](e, element, component);
          return false;
        }, false);
      }
    }
    
    var request_elements = this.getElementsWithAttribute('data-request', element);
    
    for (var j = 0; j < request_elements.length; j++) {
      var request = request_elements[j].getAttribute('data-request');
      if(typeof TTRequests[request] == "function"){
        var params = {
          id: element.getAttribute('data-service_task_id'),
          service:element.getAttribute('data-service')
        };
        TTRequests[request](params);
      }
    }
  
  },
  getElementsWithAttribute: function(attribute, element) {
    var elements = [];
    if (element.getAttribute(attribute)) {
      elements.push(element);
    }
    var children = element.querySelectorAll('[' + attribute + ']');
    for (var i = 0; i < children.length; i++) {
      elements.push(children[i]);
    }
    return elements;
  },
  /**
   * @param {Object} style
   * @param {string} style.id | "style_id"
   * @param {string} style.css | {id}.TT_list_player_{opacity:0;}
   */
  setStyle: function(style){
    if(typeof style != "object"){
      return false;
    }
    if(!style.id){
      return false;
    }
    var id = 'TT_style_' + style.id;
    var selector = document.getElementById(id);
    // busco si ya existe
    if(selector){
      return selector;
    }
    
    var re = new RegExp('{id}', 'g');
    var css = style.css.replace(re, '[data-style="' + style.id + '"]');
    var script = document.createElement('style');
    script.setAttribute('type','text/css');
    script.setAttribute('id', id);
    script.setAttribute('data-style', style.id);
    
    script.innerHTML = css;
    var rendered_script = document.body.appendChild(script);
    return rendered_script;
  },
  
};

window.TTPlayer = {
  get: function() {
    return document.querySelectorAll('[data-component="player"]');
  },
  is: function(player, params) {
    return player.getAttribute('data-service') == params.service && player.getAttribute('data-service_task_id') == params.service_task_id;
  },
  start: function(params) {
    var players = this.get();
    for (var i = 0; i < players.length; i++) {
      if (this.is(players[i], params)) {
        this.startPlayer(players[i]);
      } else {
        this.clearPlayer(players[i]);
      }
    }
  },
  stop: function(params){
    var players = this.get();
    for (var i = 0; i < players.length; i++) {
      if (this.is(players[i], params)) {
        this.stopPlayer(players[i]);
      }
    }
  },
  tracking: function(task, duration) {
    var players = this.get();
    for (var i = 0; i < players.length; i++) {
      if (this.is(players[i], task)) {
        this.trackPlayer(players[i], duration);
      } else {
        this.clearPlayer(players[i]);
      }
    }
  },
  clear: function() {
    var players = this.get();
    for (var i = 0; i < players.length; i++) {
      this.clearPlayer(players[i]);
    }
  },
  trackPlayer: function(player, duration) {
    player.classList.add(is_tracking_class);
    if (duration) {
      this.setTimer(player, duration);
    }
  },
  startPlayer: function(player){
    player.classList.add(is_tracking_class);
    this.setTimer(player, 'Starting...');
  },
  stopPlayer: function(player){
    player.classList.add('stopping');
    /*
      player.classList.remove(is_tracking_class);
      player.querySelector('.TT_timer_').innerHTML = '';
    */
  },
  clearPlayer: function(player) {
    player.classList.remove(is_tracking_class);
    player.classList.remove('stopping');
    this.setTimer(player, '');
  },
  setTimer: function(player, value){
    var timer = player.querySelector('.TT_timer_');
    if(timer && timer.innerHTML != value){
      timer.innerHTML = value;
    }
  },
  showProjects: function(task) {
    var players = this.get();
    for (var i = 0; i < players.length; i++) {
      if (this.is(players[i], task)) {
        this.setProjectsList(task, players[i]);
        return false;
      }
    }
  },
  setProjectsList: function(task, anchor){
    
    var projects_html = `<ul>`;
    projects_html += `
    <li class="title">
      <h2>This app is in multiple projects:</h2>
      <p>Select the project you want to log hours to</p>
    </li>
    `
    for (var j = 0; j < task.projects.length; j++) {      
      projects_html +=
      `<li data-action="track" data-service="${task.service}" data-service_task_id="${task.service_task_id}" data-service_project_id="${task.projects[j].id}">
        ${task.projects[j].name}
      </li>`;
    }
    projects_html += `</ul>`;
    
    setSessionCookie();
    
    TTModal.show({
      display: 'droppable',
      html: projects_html,
      anchor: anchor
    });
    
    // set events
    var element_list = document.querySelector('#' + TTModal.id + ' .TT_droppable_floating_');
    var action_elements = TTComponents.getElementsWithAttribute('data-action', element_list);
    
    for (var i = 0; i < action_elements.length; i++) {
      var action = action_elements[i].getAttribute('data-action');
      if(typeof TTEvents[action] == "function"){
        action_elements[i].addEventListener('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          TTModal.destroy();
          TTEvents[this.getAttribute('data-action')](e, this);
          return false;
        }, false);
      }
    }
  }
};

window.TTEvents = {
  track: function(e, element, component) {
    var params = {
      id: element.getAttribute('data-service_task_id'),
      service: element.getAttribute('data-service')
    };
    
    if (element.getAttribute('data-service_project_id')) {
      params.project_id = element.getAttribute('data-service_project_id');
      TTRequests.startTracking(params);
      return false;
    }
    
    var is_tracking = element.classList.contains(is_tracking_class);
      
    if (is_tracking) {
      TTRequests.stopTracking(params);
    }else{
      if (TAB_DOMAIN.app_has_multiple_projects == true) {
        params.element = element;
        TTRequests.beforeStartTracking(params);
      }else{
        TTRequests.startTracking(params);
      }
    }
  },
  show_add_event: function(e, element, component) {
    var url = new URL(TTIframes.add_event.url);
    url.searchParams.append('service_task_id', element.getAttribute('data-service_task_id'));
    url.searchParams.append('service', element.getAttribute('data-service'));
    pageView('/open-event-iframe/' + TAB_DOMAIN.domain);
    setSessionCookie();
    TTModal.show({
      display: 'right',
      iframe: url.href,
      title: 'Add new event'
    });
  },
  modal: function(e, element, component){
    var iframe = '';
    var modal = Object.assign({}, component.modal);
    if(isURL(modal.iframe)){
      iframe = modal.iframe;
    }else if(typeof TTIframes[modal.iframe] == "object"){
      iframe = TTIframes[modal.iframe].url;
    }else{
      return;
    }
    var url = new URL(iframe);
    url.searchParams.append('service_task_id', element.getAttribute('data-service_task_id'));
    url.searchParams.append('service', element.getAttribute('data-service'));
    modal.iframe = url;
    try {
      if (url.origin == new URL(BUTTON_PRODUCTION_DOMAIN).origin) {
        pageView('/open-main-iframe/' + TAB_DOMAIN.domain);
      }
    } catch (e) {}
    setSessionCookie();
    TTModal.show(modal);
  }
};

window.TTRequests = {
  startTracking: function(params) {
    TTPlayer.start(params);
    clearInterval(event_timer);
    /*
    // message to iframes
    var task_detail_iframes = document.querySelectorAll('iframe[src^="'+TTIframes.task_detail.url+'"]');
    for (var i = 0; i < task_detail_iframes.length; i++) {
      task_detail_iframes[i].contentWindow.postMessage(JSON.stringify( {'event': 'on_start_tracking', 'data': params} ), '*');
    }
    */
    chrome.runtime.sendMessage({ action: "trackService", data: params }, function(response) {
      event_timer = setInterval(currentEvent, current_event_time);
    });
  },
  stopTracking: function(params) {
    TTPlayer.stop(params);
  /*  
    // message to iframes
    var task_detail_iframes = document.querySelectorAll('iframe[src^="'+TTIframes.task_detail.url+'"]');
    for (var i = 0; i < task_detail_iframes.length; i++) {
      task_detail_iframes[i].contentWindow.postMessage(JSON.stringify( {'event': 'on_stop_tracking', 'data': params} ), '*');
    }
    */
    chrome.runtime.sendMessage({ action: "doStopTrack", data: {} }, function(response) { });
  },
  beforeStartTracking: function(params) {
    // validate service task before track
    chrome.runtime.sendMessage({ action: "getServiceTask", data: params }, function(response) {
      console.log('gettingServiceTask');
    });
  },
  getProject: function(params){
    chrome.runtime.sendMessage({ action: "getProject", data: params }, function(response) {
      console.log('gettingProject');
      //event_timer = setInterval(currentEvent, current_event_time);
    });
  },
  getCurrentTask: function(callback){
    chrome.runtime.sendMessage({ action: "getCurrentTask" }, typeof callback == 'function' ? callback : function(){});
  },
  getCurrentSession: function(callback){
    chrome.runtime.sendMessage({ action: "getCurrentSession" }, typeof callback == 'function' ? callback : function(){});
  }
};

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
  if (typeof(mutation_timer) != "undefined") {
    clearTimeout(mutation_timer);
  }
  mutation_timer = setTimeout(init, mutation_time);
});

observer.observe(document, { childList: true, subtree: true });

// ---

var TT_Modal = function() {

  var _ = this;
  
  _.id = 'TT_modal_';
  _.IS_ACTIVE = false;
  
  // ---
  
  this.show = function(options) {
    
    _.destroy();
    
    _.options = {
      iframe: typeof options.iframe != 'undefined'? options.iframe : false,
      html: typeof options.html != 'undefined'? options.html : false,
      title: typeof options.title != 'undefined'? options.title : false,
      display: typeof options.display != 'undefined'? options.display : 'full',
      onload: typeof options.onload == 'function' ? options.onload : false,
      anchor: typeof options.anchor != 'undefined' ? options.anchor : false
    };
    
    if (!_.options.iframe && !_.options.html) {
      return false;
    }
    
    if(_.options.iframe && SAFARI) {
      TTPopup.show({url: _.options.iframe, title: _.options.title, display: _.options.display});
      return false;
    }
    
    _.IS_ACTIVE = true;
    
    // ---
    
    _.render();
    
    _.$modal = document.getElementById(_.id);
    _.$modalClose = document.querySelector('[data-comp="TT_modal_close"]');
    
    _.$modal.addEventListener('click', _.clickOutsideContent, false);
    
    if (_.$modalClose) {
      _.$modalClose.addEventListener('click', _.destroy, false);
    }
    
    if(_.options.anchor) {
      _.anchorPosition();
    }
    
  };
  
  // ---
  
  this.render = function() {
    
    var modal = htmlToElement(_.returnHtml());
    
    document.body.appendChild(modal);
    
    if (_.options.iframe) {
      var iframe = htmlToElement('<iframe class="TT_modal_iframe_" allow="clipboard-read; clipboard-write" scrolling="no"></iframe>');
      iframe.src = _.options.iframe;
      if (_.options.onload) {
        iframe.onload = _.options.onload;
      }
      modal.querySelector('.TT_iframe_').appendChild(iframe);
    }
    
  };

  this.anchorPosition = function() {
    if(_.options.anchor) {

      _.$drop = _.$modal.querySelector('.TT_droppable_floating_');

      var fixed_width = _.$drop.offsetWidth;
      var fixed_height = _.$drop.offsetHeight;
    
      const window_h = window.innerHeight;
      const window_w = window.innerWidth;

      const width = _.options.anchor.getBoundingClientRect().width;
      const height = _.options.anchor.getBoundingClientRect().height;
      const top = _.options.anchor.getBoundingClientRect().top;
      const left = _.options.anchor.getBoundingClientRect().left;

      // por si en algun momento se quiere resetear posicion
      // if(top === 0 && left === 0) {
      //   return false;
      // }

      var left_pos = left - (fixed_width-width);
      var top_pos = top + (height+10);

      if(top_pos+fixed_height >= window_h) {
        _.$drop.style.top = ((top-10)-fixed_height)+'px';
      } else {
        _.$drop.style.top = top_pos+'px';
      }

      if(left_pos - fixed_width < 0) {
        _.$drop.style.left = (left)+'px';
      } else {
        _.$drop.style.left = left_pos+'px';
      }

    }
  }
  
  this.returnHtml = function() {
    
    var html = '';
    
    html = '<div id="' + _.id + '" class="TT_' + _.options.display + '_">';

      if (_.options.display === 'droppable') {
        html += '<div class="TT_droppable_floating_">';
          html += _.options.html;
        html += '</div>';
      } else {

        if (_.options.display === 'full' && !_.options.title) {
          html += '<a class="TT_modal_close_absolute_" data-comp="TT_modal_close">Close</a>';
        }
        
        html += '<div class="TT_m_c_table_">';
          html += '<div class="TT_m_c_table_cell_">';
          
          html += '<div class="TT_m_container_">';
          
            html += '<div class="TT_m_overflow_">';
            
              if (_.options.display == 'right' || _.options.title) {
                html += '<div class="TT_m_head_">';
                  html += '<div class="TT_m_h_table_">';
                    html += '<div class="TT_m_h_table_cell_">';
                      if (_.options.title) {
                        html += '<h1 class="TT_title_">'+_.options.title+'</h1>';
                      }
                    html += '</div>';
                    html += '<div class="TT_m_h_table_cell_ right">';
                      html += '<a class="TT_modal_close_relative_" data-comp="TT_modal_close"></a>';
                    html += '</div>';
                  html += '</div>';
                html += '</div>';
              }
              
              html += '<div class="TT_m_body_">';
                //if (_.options.iframe) {
                  html += '<div class="TT_iframe_">';
                  html += '</div>';
                  //html += '<iframe src="'+_.options.iframe+'" scrolling="no" class="TT_modal_iframe_" />';
                //}
                if (_.options.html) {
                  html += _.options.html;
                }
              html += '</div>';
            
            html += '</div>';
            
          html += '</div>';
          
          html += '</div>';
        html += '</div>';

      }
      
    html += '</div>';
    
    return html;
    
  };
  
  this.destroy = function() {
    
    _.options = [];
    
    
    if (_.$modalClose) {
      _.$modalClose.removeEventListener('click', _.destroy);
    }
    
    if (_.$modal) {
      _.$modal.remove();
    }
    
    _.IS_ACTIVE = false;
  
  };
  
  this.clickOutsideContent = function(e) {
    if (e.target.id == _.id) {
      _.destroy();
    }
  };

};

window.TTModal = new TT_Modal();

// ---

$(document).ready(function() {
  forceMutation();
});

// ---

function init() {
  if (!isValidChromeRuntime()) {
    clearInterval(event_timer);
    return false;
  }
  if(TAB_DOMAIN){
    DOMAINS = [TAB_DOMAIN];
    CUSTOM_DOMAINS = [];
    startButtons();
  }else{
    if (!DOMAINS) {
      chrome.runtime.sendMessage({ action: "getDomains" }, function(response) {
        try {
          DOMAINS = JSON.parse(response);
        } catch (e) {
          DOMAINS = [];
        } finally {
          startButtons();
        }
      });
    }
    if (!CUSTOM_DOMAINS) {
      chrome.runtime.sendMessage({ action: "getCustomDomains" }, function(response) {
        try {
          CUSTOM_DOMAINS = JSON.parse(response);
        } catch (e) {
          CUSTOM_DOMAINS = [];
        } finally {
          startButtons();
        }
      });
    }
  }
  
  if (!SETTINGS) {
    chrome.runtime.sendMessage({ action: "getSettings" }, function(response) {
      try {
        SETTINGS = JSON.parse(response);
      } catch (e) {
        SETTINGS = [];
      } finally {
        startButtons();
      }
    });
  }
  if (CURRENT_TASK == null) {
    TTRequests.getCurrentTask(function(response) {
      try {
        TRACKING_TASK = typeof response.task.id != 'undefined' ? response.task.id : '';
        // SERVICE DATA
        CURRENT_TASK = {};
        if (response.task.third_party_data || false) {
          CURRENT_TASK = response.task.third_party_data[0];
        }
        // JSON
        if (response.task.json) {
          CURRENT_TASK = JSON.parse(response.task.json)
        }
      } catch (e) {
        CURRENT_TASK = {};
        LOCAL_TASKS = [];
        TRACKING_TASK = '';
      } finally {
        startButtons();
      }
    });
  }
  if (SUPPORTS_SHARED_TASKS == null) {
    chrome.runtime.sendMessage({
      action: "getSupportsSharedTask"
    }, function(response) {
      try {
        SUPPORTS_SHARED_TASKS = response;
      } catch (e) {
        SUPPORTS_SHARED_TASKS = false;
      } finally {
        startButtons();
      }
    });
  }

  startButtons();

}

function startButtons() {
  if ((TAB_DOMAIN || DOMAINS && CUSTOM_DOMAINS) && CURRENT_TASK != null && SUPPORTS_SHARED_TASKS != null) {
    if (!TAB_DOMAIN) {
      appendCustomDomains();
    }
    setButtons();
    setCurrentEvent();
  }
}

function setButtons() {
  var current_url = document.location.href;
  var domain = TAB_DOMAIN ? TAB_DOMAIN : getDomain(current_url);
  if (domain == false) {
    return false;
  }
  
  // Buttons
  if (TAB_APP.enabled != true) {
    var rules = getRules(current_url, domain);
    if (rules.length) {
      trackDomain(domain);
      for (var r in rules) {
        renderButtons(domain.domain, rules[r]);
      }
    }
  }

  TTComponents.set(domain);
}

function setCurrentEvent() {
  if (current_event == false) {
    current_event = true;
    currentEvent();
    event_timer = setInterval(currentEvent, current_event_time);
  }
}

function currentEvent() {
  if (isValidChromeRuntime()) {
    TTRequests.getCurrentTask(function(response) {
      var pre_current_task_id = TRACKING_TASK;
      
      if (response == undefined) {
        $("." + container_class).removeClass(is_tracking_class);
        TTPlayer.clear();
        TRACKING_TASK = '';
      } else {
        TRACKING_TASK = typeof response.task.id != 'undefined' ? response.task.id : '';
        // SERVICE DATA
        if (response.task.third_party_data || false) {
          CURRENT_TASK = response.task.third_party_data[0];
          TTPlayer.tracking(CURRENT_TASK, response.event_duration);
        } else {
          TTPlayer.clear();
        }
        // JSON
        if (response.task.json) {
          try {
            var data = JSON.parse(response.task.json);
            CURRENT_TASK = data;
            isTracking(data.button.domain, data.button.id);
          } catch (e) {}
        } else {
          $("." + container_class).removeClass(is_tracking_class);
        }
        
        LOCAL_TASKS = response.local_tasks;
        
        if(pre_current_task_id != TRACKING_TASK){
          //cambió
          // message to iframes
          var task_detail_iframes = document.querySelectorAll('iframe[src^="'+TTIframes.task_detail.url+'"]');
          for (var i = 0; i < task_detail_iframes.length; i++) {
            if(TRACKING_TASK){
              //start
              task_detail_iframes[i].contentWindow.postMessage(JSON.stringify( {'event': 'on_start_tracking', 'data': CURRENT_TASK} ), '*');
            }else{
              //stop
              task_detail_iframes[i].contentWindow.postMessage(JSON.stringify( {'event': 'on_stop_tracking', 'data': CURRENT_TASK} ), '*');
            }
          }
        }
        
        if (duration) {
          // TODO: revisar!
          setButtonsDuration();
        }
      }
    });
    //getCurrentTask();
  } else {
    clearInterval(event_timer);
  }
}

function getCurrentTask() {
  chrome.runtime.sendMessage({ action: "getCurrentTask" }, function(response) {
    if (response == undefined) {
      $("." + container_class).removeClass(is_tracking_class);
    } else {
      if (response.task.json) {
        try {
          var data = JSON.parse(response.task.json);
          CURRENT_TASK = data;
          isTracking(data.button.domain, data.button.id);
        } catch (e) {}
      } else {
        $("." + container_class).removeClass(is_tracking_class);
      }
      LOCAL_TASKS = response.local_tasks;
      if (duration) {
        setButtonsDuration();
      }
    }
  });
}

function getDomain(current_url) {
  //returns domain from DOMAINS if is valid
  for (var i in DOMAINS) {
    domain = DOMAINS[i];
    if (current_url.indexOf(domain.domain) > -1) {
      return domain;
      /*if (isDomainOnSettings(domain)) {
        return domain;
      }
      */
    }
  }
  return false;
}

function isDomainOnSettings(domain) {
  //check if domain is active on user SETTINGS
  var is = false;
  if (Number.isInteger(domain.id)) {
    //custom domains id's are numbers
    is = true;
  } else {
    for (var d in SETTINGS.domains) {
      if (d == domain.domain) {
        if (SETTINGS.domains[d].active) {
          is = true;
        }
        break;
      }
    }
  }
  return is;
}

function getRules(current_url, domain) {
  //return valid rules
  var valid_rules = [];
  var rules = domain.rules;
  for (var j in rules) {
    var valid = isValidRule(current_url, rules[j].url, domain);
    if (valid) {
      valid_rules.push(domain.rules[j]);
    }
  }
  return valid_rules;
}

function isValidRule(current_url, rule_url, domain) {
  //compares current_url with rule url
  var valid = false;

  if (rule_url == "") { //no url, pass by
    valid = true;
  } else {
    var urlA = rule_url.split("/");
    var urlB = parseUrl(current_url, domain.domain);
    // testing array vs array
    if (urlA.length == urlB.length) {
      for (var i = 0; i < urlA.length; i++) {
        if (urlA[i] == "*") {
          valid = true;
        } else
        if (urlA[i].startsWith("*!")) {
          var neg = urlA[i].slice(2);
          var neg_a = neg.split(',');
          if (neg_a.indexOf(urlB[i]) < 0) {
            valid = true;
          } else {
            valid = false;
            break;
          }
        } else {
          var pos_a = urlA[i].split(',');
          if (pos_a.indexOf(urlB[i]) > -1) {
            valid = true;
          } else {
            valid = false;
            break;
          }
        }
      }
    } else {
      valid = false;
    }
  }

  return valid;
}

function renderButtons(domain, domainRules) {
  //create buttons on the DOM
  var task = domainRules.tasks;

  var contains = (task.selector.indexOf("contains('" + formula_class + "')") > -1) ? true : false;

  var task_domain = domain;
  var project_name = domainRules.project_custom;

  var project_parent = false;
  if (typeof(domainRules.project) == "string") {
    project_name = getProjectName(domainRules);
  } else
  if (typeof(domainRules.project) == "object") {
    project_parent = true;
  }

  $(task.selector).each(function() {
    var $this = $(this);
    var title = '';
    var task_name;
    var estimated_time = '';
    var due_date = '';
    var task_domain_id;
    var task_url;

    var elements = {
      container: task.container_element ? task.container_element : container_element,
      button: task.button_element ? task.button_element : button_element,
    };

    if (contains) {
      //create task data with time tracking formula
      var task_names = getTaskNames($this);
      task_name = task_names.task;
      project_name = task_names.project;
      estimated_time = task_names.estimated_time;
      due_date = task_names.due_date;
      task_domain_id = task_names.domain;
    } else {
      task_name = getTaskName($this, task);
      if (project_parent) {
        project_name = $this.closest(domainRules.project.parent).find(domainRules.project.selector).first().text();
      }
      if (typeof(domainRules.project_filter) == "object") {
        project_name = filterName(project_name, domainRules.project_filter);
      }
      task_domain_id = getTaskId($this, task, {
        "task_name": task_name,
        "project_name": project_name
      });
    }
		
		task_url = getTaskUrl($this, task);
    if (task.show_title != false) {
      title = (task_name != null) ? task_name : '';
      title += (project_name && task_name != null) ? ' - ' : '';
      title += (project_name) ? project_name : '';
    }
    var render_data = {
      elements: elements,
      title: title,
      task_name: task_name,
      task_domain_id: task_domain_id,
      task_url: task_url,
      estimated_time: estimated_time,
      due_date: due_date,
      task_domain: task_domain,
      project_name: project_name
    };
    $.extend(render_data, task);
    renderButton($this, render_data);
  });

  onButtonsRendered();
}

function onButtonsRendered() {
  //called when all buttons has been rendered
  if (duration) {
    sendTasks();
  }
}

function renderButton($el, atts) {
  //if button doesn't exists || if button exists but taks_name or project_name changed
  var $append_to = (atts.append_to == "this") ? $el : $el.find(atts.append_to);
  var $prepend_to = (atts.prepend_to == "this") ? $el : $el.find(atts.prepend_to);
  var $insert_before = (atts.insert_before == "this") ? $el : $el.find(atts.insert_before);
  var $insert_after = (atts.insert_after == "this") ? $el : $el.find(atts.insert_after);

  if ($append_to.length || $prepend_to.length || $insert_after.length || $insert_before.length) {
    var button_html = returnButton(atts);
    if (button_html != false) {
      if ($append_to.length) {
        if (buttonChanged($append_to, button_html)) {
          $append_to.find("." + container_class).remove();
          $append_to.find("." + duration_class).remove();
          $append_to.append(button_html);
          onButtonRendered(atts);
        }
      }
      if ($prepend_to.length) {
        if (buttonChanged($prepend_to, button_html)) {
          $prepend_to.find("." + container_class).remove();
          $prepend_to.find("." + duration_class).remove();
          $prepend_to.prepend(button_html);
          onButtonRendered(atts);
        }
      }
      if ($insert_after.length) {
        if (buttonChanged($insert_after.parent(), button_html)) {
          $insert_after.parent().find("." + container_class).remove();
          $insert_after.parent().find("." + duration_class).remove();
          $insert_after.after(button_html);
          onButtonRendered(atts);
        }
      }
      if ($insert_before.length) {
        if (buttonChanged($insert_before.parent(), button_html)) {
          $insert_before.parent().find("." + container_class).remove();
          $insert_before.parent().find("." + duration_class).remove();
          $insert_before.before(button_html);
          onButtonRendered(atts);
        }
      }
    }
  }
}

function renderCSS(css_id, css) {
  css_id = typeof css_id != "undefined" ? css_id : '';
  css = typeof css != "undefined" ? css : '';
  if (!css && !css_id) {
    return false;
  }
  $('.' + style_id + css_id).remove();
  var re = new RegExp(container_class, 'g');
  css = css.replace(re, container_class + '[data-css_id="' + css_id + '"]');
  $('<style class="' + style_id + css_id + '" type="text/css">' + css + '</style>').appendTo('body');
}

function onButtonRendered(atts) {
  //called when a new button has been rendered.
  
  renderCSS(atts.css_id, atts.css);

  var task = {
    task: atts.task_name,
    project: atts.project_name,
    sended: false
  };

  addToTasks(task);
}

function addToTasks(task) {
  //check if in tasks array
  var pointer = -1;
  for (var i = 0; i < TASKS.length; i++) {
    if (TASKS[i].task == task.task && TASKS[i].project == task.project) {
      pointer = i;
      break;
    }
  }
  //add to tasks array
  if (pointer < 0) TASKS.push(task);
}

function sendTasks() {
  var SEND_TASKS = [];
  if (!TASKS.length) return;

  for (var i = 0; i < TASKS.length; i++) {
    if (TASKS[i].sended == false) {
      TASKS[i].sended = true;
      SEND_TASKS.push({ task: TASKS[i].task, project: TASKS[i].project });
    }
  }

  if (!SEND_TASKS.length) return;
  chrome.runtime.sendMessage({ action: "addLocalTasks", data: SEND_TASKS }, function(response) {});
}

function setButtonsDuration() {
  for (var i = 0; i < LOCAL_TASKS.length; i++) {
    var local_task = LOCAL_TASKS[i];
    var $duration = $("." + container_class + '[data-task_name="' + local_task.task + '"][data-project_name="' + local_task.project + '"][data-task_domain="' + local_task.domain + '"][data-task_domain_id="' + local_task.domain_id + '"] .' + duration_class);
    if (local_task.formated_duration) {
      $duration.html(local_task.human_duration);
    }
  }
}

function buttonChanged($el, $newB) {
  var $b = $el.find("." + container_class);
  if ($b.length == 0) return true;
  var a = $b.clone().html('').removeClass(is_tracking_class);
  var b = $newB.clone().html('').removeClass(is_tracking_class);
  if (a[0].outerHTML !== b[0].outerHTML) return true;
  return false;
}

function returnButton(atts) {
  if (atts.task_name == null && atts.project_name != null && !SUPPORTS_SHARED_TASKS) {
    return false;
  }

  var b_class = container_class;
  b_class += atts.css_mode == true ? ' ' + css_mode_class: '';
  var css_id = typeof atts.css_id != "undefined" ? atts.css_id : '';
  if (CURRENT_TASK != {}) {
    if (atts.task_name == CURRENT_TASK.name && atts.project_name == CURRENT_TASK.project) {
      b_class += ' ' + is_tracking_class;
    }
  }

  var $container = $('<' + atts.elements.container + ' />', {
    'class': b_class,
    'title': atts.title,
    'data-project_name': atts.project_name,
    'data-task_name': atts.task_name,
    'data-task_url': atts.task_url,
    'data-task_domain_id': atts.task_domain_id,
    'data-task_domain': atts.task_domain,
    'data-css_id': css_id
  });

  if (atts.estimated_time) $container.attr('data-estimated_time', atts.estimated_time);
  if (atts.due_date) $container.attr('data-due_date', atts.due_date);

  var $button = $('<' + atts.elements.button + ' />', {
    'class': button_class
  });

  $button.on('click', trackAction);
  
  var $add_button = $('<' + atts.elements.button + ' />', {
    'class': add_button_class
  });
  
  $add_button.on('click', addEventAction);

  var $duration = '';
  if (atts.show_duration == true) {
    duration = true;
    $duration = $('<p />', {
      'class': duration_class
    });
  }

  $container.append($button);
  $container.append($add_button);
  if ($duration) {
    $container.append($duration);
  }
  return $container;
}

function trackAction(e) {
  e.preventDefault();
  e.stopPropagation();
  if (isValidChromeRuntime()) {
    var $this = $(this);
    var $parent = $this.closest("." + container_class);
    var is_tracking = $parent.hasClass(is_tracking_class);
    if (is_tracking) {
      stopTracking();
    } else {
      startTracking($parent);
    }
  } else {
    $("." + container_class).removeClass(is_tracking_class);
    
    if(!FF){
      if (confirm('Please reload this page in order to start Tracking.')) {
        window.location.reload();
      }
    }else{
      
    }
  }
}

function addEventAction(e) {
  e.preventDefault();
  e.stopPropagation();
  if (isValidChromeRuntime()) {
    var $this = $(this);
    var $parent = $this.closest("." + container_class);
    addEvent($parent);
  } else {
    if(!FF){
      if (confirm('Please reload this page in order to add an event')) {
        window.location.reload();
      }
    }else{
      
    }
  }
}

function startTracking($el) {

  var project_name = typeof $el.attr("data-project_name") != "undefined" ? encodeURIComponent($el.attr("data-project_name")) : null;
  var task_name = typeof $el.attr("data-task_name") != "undefined" ? encodeURIComponent($el.attr("data-task_name")) : null;
  var task_domain = encodeURIComponent($el.attr("data-task_domain"));
  var task_domain_id = encodeURIComponent($el.attr("data-task_domain_id"));
  var estimated_time = $el.attr("data-estimated_time");
  var due_date = $el.attr("data-due_date");
  var task_url = encodeURIComponent($el.attr("data-task_url"));

  var json = {
    button: {
      domain: task_domain,
      id: task_domain_id,
      url: task_url,
    }
  };

  //isTracking(task_domain,task_domain_id);

  var data = { json: json };
  if (task_name != null) data.task_name = task_name;
  if (project_name != null) data.project_name = project_name;
  if (estimated_time) data.estimated_time = estimated_time;
  if (due_date) data.due_date = due_date;

  clearInterval(event_timer);

  $("." + container_class).removeClass(is_tracking_class);
  $el.addClass(is_tracking_class);

  chrome.runtime.sendMessage({ action: "doTrack", data: data }, function(response) {

    if (response.error == true) {
      var $el_tracking = $('.' + container_class + '.' + is_tracking_class);
    }
    
    event_timer = setInterval(currentEvent, current_event_time);
  });
}

function stopTracking() {
  $("." + container_class).removeClass(is_tracking_class);
  chrome.runtime.sendMessage({ action: "doStopTrack", data: {} }, function(response) {
    $("." + container_class).removeClass(is_tracking_class);
  });
}

function addEvent($el) {
  var project_name = typeof $el.attr("data-project_name") != "undefined" ? encodeURIComponent($el.attr("data-project_name")) : null;
  var task_name = typeof $el.attr("data-task_name") != "undefined" ? encodeURIComponent($el.attr("data-task_name")) : null;
  var task_domain = encodeURIComponent($el.attr("data-task_domain"));
  var task_domain_id = encodeURIComponent($el.attr("data-task_domain_id"));
  var estimated_time = $el.attr("data-estimated_time");
  var due_date = $el.attr("data-due_date");
  var task_url = encodeURIComponent($el.attr("data-task_url"));

  var json = {
    button: {
      domain: task_domain,
      id: task_domain_id,
      url: task_url,
    }
  };
  
  var data = { json: json };
  if (task_name != null) data.task_name = task_name;
  if (project_name != null) data.project_name = project_name;
  if (estimated_time) data.estimated_time = estimated_time;
  if (due_date) data.due_date = due_date;
  
  var url = new URL(TTIframes.add_event.url);
  if (task_name != null) url.searchParams.append('task_name', task_name);
  if (project_name != null) url.searchParams.append('project_name', project_name);
  url.searchParams.append('json', JSON.stringify(json));
  pageView('/open-event-iframe/' + TAB_DOMAIN.domain);
  setSessionCookie();
  TTModal.show({
    display: 'right',
    iframe: url.href,
    title: 'Add new event',
    onload: function(e) {
      // fallback: iframe manda get_current_session
      var event_iframe = e.target;
      setTimeout(function() {
        TTRequests.getCurrentSession(function(current_session) {
          if (current_session.user != null) {
            event_iframe.contentWindow.postMessage(JSON.stringify({ 'event': 'set_current_session', 'data': current_session }), '*');
          }
        });
      }, 1000);
    }
  });
}

function trackDomain(domain) {
  //analytics
  if (!track_domain) chrome.runtime.sendMessage({ action: "trackDomain", data: { domain: domain.domain } });
  track_domain = true;
}

function isTracking(task_domain, task_domain_id) {
  //if task domain is url, decode it
  if (isURL(decodeURIComponent(task_domain_id))) {
    task_domain_id = decodeURIComponent(task_domain_id);
  }
  $("." + container_class + '[data-task_domain_id!="' + task_domain_id + '"]').removeClass(is_tracking_class);
  $("." + container_class + '[data-task_domain="' + task_domain + '"][data-task_domain_id="' + task_domain_id + '"]:not(.' + is_tracking_class + ')').addClass(is_tracking_class);
}

function forceMutation() {
  if ($('body').length) {
    $('<p class="ttM">').appendTo('body');
    $('.ttM').remove();
    mutation_time = 100;
  }
}

//helpers

function getTaskName($el, task) {
  var task_name = null;
  if (task.name == null) {
    return null;
  }
  if (typeof(task.name) == "string") {
    if (task.name == "this") {
      task_name = cleanText($el);
    } else {
      task_name = task.name; //custom
    }
  } else
  if (typeof(task.name) == "object") {
    switch (task.name.attr) {
      case 'text':
        task_name = cleanText($el.find(task.name.selector));
        break;
      case 'value':
        task_name = $el.find(task.name.selector).val();
        break;
      default:
        task_name = $el.find(task.name.selector).attr(task.name.attr);
        break;
    }
  }
  task_name = (task_name) ? task_name : null;
  return task_name;
}

function getTaskNames($el) {
  //tracking formula
  var task_names = [];
  var names = cleanText($el).replace(formula_class + ':', '').split(",,");
  var estimated_time = '', due_date = '';
  if (names[2]) estimated_time = (!isNaN(names[2])) ? names[2] : '';
  if (names[3]) due_date = normalizeDate(names[3]);
  task_names.task = names[0];
  task_names.project = names[1];
  task_names.estimated_time = estimated_time;
  task_names.due_date = due_date;
  task_names.domain = names[0] + ',,' + names[1];
  return task_names;
}

function getProjectName(domainRules) {
  if(typeof domainRules.project != "undefined"){
    if ($(domainRules.project).length) {
      return cleanText($(domainRules.project));
    }
  }
  if(typeof domainRules.project_alternate != "undefined"){
    if ($(domainRules.project_alternate).length) {
      return cleanText($(domainRules.project_alternate));
    }
  }
  return typeof domainRules.project_custom != "undefined" ? domainRules.project_custom : '';
}

function filterName(name, filter) {
  var position = typeof filter.position == 'number' ? filter.position : 0;
  
  if(typeof filter.split == 'string'){
    var tmp =name.split(filter.split);
    position = tmp.length > position ? position : 0;
    return tmp[position].trim();
  }
  
  return name;
}

function getTaskId($el, task, data) {
  //what makes item unique
  return getTaskAttr($el, task.id, data);
}

function getTaskUrl($el, task) {
  //task single url
  return getTaskAttr($el, task.url, {});
}

function getTaskAttr($el, task_attr, data) {
  var attr = "";
  var prefix = getPrefix(task_attr.prefix);
  if (typeof(task_attr) == "object") {
    if (task_attr.selector == "this") {
      if (typeof(prefix) == "object") {
        attr = prefix.url + getStringDifference(prefix.match, $el.attr(task_attr.attr));
      } else {
        attr = prefix + $el.attr(task_attr.attr);
      }
    } else {
      if (task_attr.attr == "text") {
        attr = prefix + $el.find(task_attr.selector).text().trim();
      } else
      if (task_attr.attr == "value") {
        attr = prefix + $el.find(task_attr.selector).val();
      } else {
        if (typeof(prefix) == "object") {
          attr = prefix.url + getStringDifference(prefix.match, $el.find(task_attr.selector).attr(task_attr.attr));
        } else {
          attr = prefix + $el.find(task_attr.selector).attr(task_attr.attr);
        }
      }
    }
  } else
  if (typeof(task_attr) == "string") {
    if (task_attr == "name") {
      attr = data.task_name + ',,' + data.project_name;
    }
    if (task_attr == "url") {
      attr = decodeURI(document.location.href);
    } else
    if (task_attr == "origin") {
      attr = document.location.origin;
    }
  }
  return attr;
}

function getPrefix(prefix) {
  prefix = prefix != undefined ? prefix : '';
  if (prefix == "origin") {
    return document.location.origin;
  }
  var regExp = /\{([^)]+)\}/;
  var matches = regExp.exec(prefix);
  if (matches !== null) {
    var url = prefix.substring(0, prefix.indexOf('{'));
    prefix = {
      url: url,
      match: matches[1]
    };
  }
  return prefix;
}

function cleanText($e) {
  let $el = $e.clone();
  $el.find("code").each(function () {
    $(this).replaceWith("`" + $(this).text() + "`");
  });
  $el.children().remove();
  let clean = $el.text().replace(/(\r\n|\n|\r)/gm, "").trim();
  return clean;
}

function parseUrl(url, domain) {
  
  if(domain.indexOf('*.') == 0){
    domain = domain.split('*.')[0];
  }
  //remove ://
  var parsed_url = url.replace(/.*?:\/\//g, "");
  //redbooth hack
  parsed_url = parsed_url.replace("#!", "*");

  if (parsed_url[parsed_url.length - 1] == "/") {
    parsed_url = parsed_url.slice(0, -1);
  }
  //coverts to array
  var array_url = parsed_url.split("/");
  //search
  var domain_position = -1;
  for (var a in array_url) {
    if (array_url[a].indexOf(domain) > -1) {
      domain_position = a;
      break;
    }
  }

  if (domain_position < 0) {
    console.error("DOMAIN NOT FOUND IN ARRAY");
    return false;
  }
  array_url.splice(0, domain_position + 1);
  return array_url;
}

function isURL(url) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(url);
}

function normalizeDate(date) {
  var splited_date = date.split('-');
  if (splited_date.length == 3) {
    for (var k in splited_date) {
      if (splited_date[k].length < 2) {
        splited_date[k] = "0" + splited_date[k];
      }
    }
    normalized_date = splited_date[0] + '-' + splited_date[1] + '-' + splited_date[2];
    if (moment(normalized_date, "YYYY-MM-DD", true).isValid()) {
      return normalized_date;
    }
  }
  return '';
}

function getStringDifference(a, b) {
  var i = 0, j = 0, result = "";

  while (j < b.length) {
    if (a[i] != b[j] || i == a.length)
      result += b[j];
    else
      i++;
    j++;
  }
  return result;
}

function isValidChromeRuntime() {
  // It turns out that chrome.runtime.getManifest() returns undefined when the
  // runtime has been reloaded.
  if(typeof chrome.runtime != "undefined"){
    if(typeof chrome.runtime.id != "undefined"){
      return true;
    }
  }
  return false;
}

function appendCustomDomains() {
  if (!custom_domains_appended) {
    for (var i = 0; i < CUSTOM_DOMAINS.length; i++) {
      var rules = getDomainRules(CUSTOM_DOMAINS[i].rules);
      var CUSTOM_DOMAIN = CUSTOM_DOMAINS[i];
      CUSTOM_DOMAIN.rules = rules;
      CUSTOM_DOMAIN.settings = { "active": true };
      DOMAINS.push(CUSTOM_DOMAIN);
    }
    custom_domains_appended = true;
  }
}

function getDomainRules(id) {
  var rules = [];
  for (var i in DOMAINS) {
    if (DOMAINS[i].id == id) {
      rules = DOMAINS[i].rules;
      break;
    }
  }
  return rules;
}

function pageView(page) {
  chrome.runtime.sendMessage({ action: "pageView", data: page }, function(response) {});
}

function setSessionCookie() {
  chrome.runtime.sendMessage({ action: "setSessionCookie", data: {} }, function(response) {});
}

window.htmlToElement = function(html) {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
};

var TTIframes = {
  add_event:{
    url: BUTTON_PRODUCTION_DOMAIN + 'vue/trello-integration/card-buttons/'
  },
  task_detail: {
    url : BUTTON_PRODUCTION_DOMAIN + 'vue/trello-integration/card-back-section/'
  },
  project_detail: {
    url: BUTTON_PRODUCTION_DOMAIN + 'extension/extension-project-detail/'
  }
};

var TTTemplates = {
  player: {
    selector: ".TT_list_player_",
    html: `<div class="TT_list_player_">
      <a class="TT_list_player_track_" data-action="track" title="Track">
        <div class="TT_timer_"></div>
        <div class="TT_status_"></div>
      </a>
      <a class="TT_list_player_event_" data-action="show_add_event" title="Add new event"></a>
    </div>`
  },
  mini_player: {
    selector: ".TT_mini_player_",
    html: `<div class="TT_mini_player_ TT_list_player_">
      <a class="TT_list_player_track_" data-action="track" title="Track">
        <div class="TT_status_"></div>
      </a>
      <a class="TT_list_player_event_" data-action="show_add_event" title="Add new event"></a>
    </div>`
  },
  project_detail: {
    selector: ".TT_project_detail_",
    html: `<div class="TT_project_detail_" data-request="getProject">
      <div class="TT_time_accumulated_">
        <div class="TT_progress_"></div>
        <div class="TT_time_">...</div>
      </div>
      <div class="TT_pop_">
        <iframe src="` + TTIframes.project_detail.url + `" class="TT_iframe" />
      </div>
    </div>`
  },
  iframe: {
    selector: ".TT_iframe_player_",
    html: `<div class="TT_iframe_player_"></div>`
  }
};

var TTPopup = {
  window: false,
  url: '',
  title: '',
  show: function(params) {
    TTPopup.close();
    // valido url
    try {
      var url = new URL(params.url);
      url.searchParams.append('is_popup', true);
      TTPopup.url = url.href;
    } catch (e) { }
    if(!TTPopup.url){
      return false;
    }
    var display = params.display || 'full';
    
    var width = window.innerWidth - 80;
    var height = window.innerHeight - 80;
    var top = parseInt((screen.height - height) / 2);
    var left = parseInt((window.innerWidth - width) / 2);
    
    if (display == 'full') {

    } else
    if (display == 'right') {
      width = 500;
      height = window.innerHeight;
      top = screen.height - window.innerHeight;
      left = window.innerWidth - width;
    }
    
    height = height < 450 ? 450 : height;
    
    TTPopup.title = params.title || '';
    
    setTimeout(function() {
      TTPopup.open(`width=${width},height=${height},top=${top},left=${left}`);
    }, 500);
  },
  open: function(windowFeatures) {
    TTPopup.window = window.open(TTPopup.url, '_blank', windowFeatures);
    setTimeout(function(){
      TTPopup.window.focus();
    }, 100);
    
    if (TTPopup.title) {
      TTPopup.window.document.title = TTPopup.title;
    }
  },
  close: function() {
    TTPopup.url = '';
    TTPopup.title = '';
    if (typeof TTPopup.window == 'object') {
      TTPopup.window.close();
    }
    TTPopup.window = false;
  }
};

// helpers
function getCurrentLocation(){
  return decodeURIComponent((location.href.split(location.origin)[1]).replace(/\+/g, " "));
}

window.onerror = function(errorMsg, url, lineNumber) {
  var data = { message: errorMsg, filename: 'browser.js', lineno: lineNumber };
  if (isValidChromeRuntime()) {
    chrome.runtime.sendMessage({ action: "onError", data: data }, function(response) {});
  }
};
