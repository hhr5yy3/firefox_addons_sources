var DOMAINS = getDomains();
var DOMAINS_VERSION = getDomainsVersion();
var CUSTOM_DOMAINS = getCustomDomains();
var CUSTOM_RULES = getCustomRules();
var INTEGRATIONS = getIntegrations();

DOMAINS = sortDomains(DOMAINS)

function renderPermissions(){
  var $list = $permissionsList;
  $list.html('');
  
  for (var i in DOMAINS) {
    var domain = DOMAINS[i];
    /*
    var domain_has_app = integrations.filter(function(i){return domain.app == i.key})[0] || false;
    if(domain_has_app){
      continue;
    }
    */
    var html = `
      <div class="list-item${domain.third_party_app ? ` is-third-party-app` : ``}${!!domain.sort ? ` featured` : ``}" data-search="${domain.name.toLowerCase()}" data-id="${domain.name.toLowerCase()}">
        <div class="logo" style="${!!domain.logo ? `background-image:url(${domain.logo})` : ``}"></div>
        <label class="name" for="domain_${domain.id}">${domain.name}</label>
        <div class="enable">
          <div class="check_ toggle right no_margin">
            <input id="domain_${domain.id}" name="domain_${domain.id}" type="checkbox" data-domain="${domain.domain}" title="${domain.domain}">
            <div class="link">${!!domain.app_url ? `<a href="${domain.app_url}" target="_blank">Track in ${domain.name} <i class="icon-external-link"></i></a>` : ``}</div>
          </div>
        </div>
        ${domain.third_party_app ?
          `
            <div class="third-party-app">
              <div class="link">${domain.third_party_app.url ? `<a href="${domain.third_party_app.url}" target="_blank">${domain.third_party_app.text} <i class="icon-external-link"></i></a>` : ``}</div>
            </div>
          `
        : `` }
      </div>
    `;
    $(html).appendTo($list);
  }

  CUSTOM_DOMAINS = getCustomDomains();
  if(CUSTOM_DOMAINS.length){
    $('<div class="list-title extra-space">Custom Domains</div>').appendTo($list);
    for (var j in CUSTOM_DOMAINS) {
      var domain_c = CUSTOM_DOMAINS[j];
      var html_c = `
      <div class="list-item custom" data-search="${domain_c.domain.toLowerCase()}">
        <label class="name" for="domain_${domain_c.id}">${domain_c.domain} <small>(${getRulesName(domain_c.rules)})</small></label>
        <div class="enable">
          <div class="check_ toggle right no_margin">
            <input id="domain_${domain_c.id}" name="domain_${domain_c.id}" type="checkbox" data-domain="${domain_c.domain}" title="${domain_c.domain}">
          </div>
        </div>
      </div>
      `;
      $(html_c).appendTo($list);
    }
  }
  
  // renderIntegrations();
  
  chrome.permissions.getAll(function(results){
    var origins = results.origins;
    for (i = 0; i < origins.length; i++) {
      var domain = originToDomain(origins[i]);
      if(domain.indexOf('trackingtime') === -1){
        $('[data-domain="' + domain + '"]').prop('checked', true);
        $('[data-domain="*.' + domain + '"]').prop('checked', true);
      }
    }
  });
  
  updatePermissionsLength();
  updateIntegrationsAllowed();
  
  $('[data-domain]').on('change', function(e) {
    toggleOrigin(domainToOrigins(this.dataset.domain), this);
  });
  
}

function renderIntegrations() {
  $integrationsForm.hide();
  $integrationsList.html('');
  
  var show_integrations = false;
  
  for (var i in INTEGRATIONS) {
    var integration = INTEGRATIONS[i];
    show_integrations = true;
    var html = `
      <li data-integration="${integration.key}" data-integration_domain="${integration.domain}" data-integration_is_beta="${integration.beta}">
        
        <div class="ico_" style="background-image: url('${integration.logo}');"></div>

        <div class="sync_">

          <h1>${integration.name}</h1>

          <a target="_blank" class="sync_disabled">
            <div class="check_ toggle small right focused_color no_margin">
              <input id="integration_${integration.name}_check" type="checkbox">
              <label for="integration_${integration.name}_check">Enable synchronization</label>
            </div>
          </a>

          <a target="_blank" class="sync_enabled">
            <u>synchronization is enabled <i class="icon-external-link"></i></u>
          </a>

        </div>

        <div class="allow_">
          <i class="icon-appTT_error"></i>
          <label for="domain_${integration.id}">Allow the extension on ${integration.domain}</label>
        </div>
      
      </li>
    `;
    
    $(html).appendTo($integrationsList);
  }
  
  if (show_integrations) {
    $integrationsForm.show();
  }
  
  $('[id^="user_app_"]').on('change', function(e) {
    this.checked = !this.checked;
    chrome.runtime.sendMessage({ action: "navigateToDesktop", data: { url: '/auth-and-calendars', from: 'options_page' } });
  });
  
  $integrationsForm.on('click', '.sync_>a', function(e) {
    e.preventDefault();
      // checkear si está habilitado el domains.
      var href = $(this).attr('href');
      var domain = $(this).closest('[data-integration_domain]').data('integration_domain');
      var origins = domainToOrigins(domain);
      chrome.permissions.contains({
        origins: origins
      }, function(allowed) {
        if (allowed) {
          // The extension has the permissions.
          window.open(href);
        } else {
          chrome.permissions.request({
            origins: origins,
          }, function(granted) {
            if(granted){
              window.open(href);
              location.reload();
            }
          });
        }
      });
  });

}

function updateIntegrationsAllowed() {
  
  var $integrations = $integrationsList.find('[data-integration]');
  
  $integrations.addClass('not_allowed');
  
  chrome.permissions.getAll(function(results){
    var origins = results.origins.filter(function(o) { return o.indexOf('trackingtime') == -1; });
    for (i = 0; i < origins.length; i++) {
      var domain = originToDomain(origins[i]);
      var $integration = $integrationsList.find('[data-integration_domain="' + domain + '"]');
      if($integration.length){
        $integration.removeClass('not_allowed');
      }
    }
  });
}

function getDomains() {
  if (localStorage.DOMAINS == null) {
    localStorage.DOMAINS = JSON.stringify([]);
  }
  return JSON.parse(localStorage.DOMAINS);
}

function getDomainsVersion() {
  if (localStorage.DOMAINS_VERSION == null) {
    localStorage.DOMAINS_VERSION = '';
  }
  return localStorage.DOMAINS_VERSION;
}

function getIntegrations() {
  return DOMAINS.filter(function(d) {
    return d.app != true;
  }).map(function(d){
    return {
      id: d.id,
      key: d.app,
      beta: d.app_is_beta === true,
      name: d.name,
      logo: d.logo || '',
      domain: d.domain
    }
  });
}

function setDomains() {
  DOMAINS = getDomains();
  DOMAINS_VERSION = getDomainsVersion();
  INTEGRATIONS = getIntegrations();
}

function toggleOrigin(origins, checkbox) {
  
  if(checkbox.checked) {
    
    chrome.permissions.request({
      origins: origins,
    }, function(granted) {
      // The callback argument will be true if the user granted the permissions.
      checkbox.checked = granted;
      onOriginToggled(origins, checkbox.checked);
    });
  
  } else {
    
    chrome.permissions.contains({
      origins: origins
    }, function(allowed) {
      if (allowed) {
        // The extension has the permissions.
        chrome.permissions.remove({
          origins: origins
        }, function(removed) {
          checkbox.checked = !removed;
          onOriginToggled(origins, checkbox.checked);
        });
      } else {
        // The extension doesn't have the permissions.
        checkbox.checked = false;
        onOriginToggled(origins, checkbox.checked);
      }
    });
  }
}

function onOriginToggled(origins, granted) {
  updatePermissionsLength(); 
  updateIntegrationsAllowed();
  chrome.runtime.sendMessage({
    action: "ORIGINS_TOGGLED",
    data: {
      origins: origins,
      granted: granted
    }
  }, function(response) {});
}

function enableOrigin(origins, callback){
  chrome.permissions.request({
    origins: origins,
  }, callback);
}

function enableAllOrigins(){
  var origins = [];
  for (i = 0; i < DOMAINS.length; i++) {
    var domain = DOMAINS[i];
    if (domain.domain.indexOf('trackingtime') === -1) {
      origins = origins.concat(domainToOrigins(domain.domain));
    }
  }
  for (j = 0; j < CUSTOM_DOMAINS.length; j++) {
    var custom_domain = CUSTOM_DOMAINS[j];
    origins = origins.concat(domainToOrigins(custom_domain.domain));
  }
  
  chrome.permissions.request({ origins: origins }, function (result) {
    if (result) {
      $('[data-domain]').prop('checked', true);
      updatePermissionsLength();
      updateIntegrationsAllowed();
    }
  });
}

function disableAllOrigins(){
  
  chrome.permissions.getAll(function(results) {
    var origins = results.origins;
    var allowed_origins = [];
    for (i = 0; i < origins.length; i++) {
      var origin = origins[i];
      if (origin.indexOf('trackingtime') === -1) {
        allowed_origins.push(origin);
      }
    }
    
    chrome.permissions.remove({
      origins: allowed_origins
    },function(removed) {});
  
    $('[data-domain]').prop('checked', false);
    updatePermissionsLength();
    updateIntegrationsAllowed();
  });
  
}

function updateDomains() {
  chrome.runtime.sendMessage({ action: 'updateDomains'});
}

function updatePermissionsLength() {
  chrome.permissions.getAll(function(results) {
    var origins = results.origins.filter(o => o.indexOf('trackingtime') == -1);
    localStorage.setItem('PERMISSIONS_LENGTH', origins.length);
    if(typeof onAllDomainsToggled == 'function') {
      onAllDomainsToggled(origins.length == (DOMAINS.length + CUSTOM_DOMAINS.length));   
    }
  });
}

/* custom domains */
function renderCustomDomains() {
  var $list = $customDomainsList;
  $list.hide();
  $list.html('');
  
  var html = '';
  
  CUSTOM_DOMAINS = getCustomDomains();
  
  if(CUSTOM_DOMAINS.length){
    
    for (var i in CUSTOM_DOMAINS) {
      html += `
        <div class="list-item border" data-id="${CUSTOM_DOMAINS[i].id}" data-domain="${CUSTOM_DOMAINS[i].domain}">
          <div class="name">${CUSTOM_DOMAINS[i].domain} <small>(${getRulesName(CUSTOM_DOMAINS[i].rules)})</small></div>
          <div class="enable off">
            <a href="#" data-comp="enable-domain" class="button_ small_ gray_ border_"><u>Allow Domain</u></a>
          </div>
          <div class="delete">
            <a href="#" data-comp="delete" class="button_ small_ delete_"><i class="icon-icontt_trash"></i></a>
          </div>
        </div>
      `;
    }
    
    chrome.permissions.getAll(function(results){
      var origins = results.origins;
      for (i = 0; i < origins.length; i++) {
        var domain = originToDomain(origins[i]);
        if(domain.indexOf('trackingtime') === -1 && domain.indexOf('*') === -1){
          $list.find('[data-domain="' + domain + '"]').addClass('enabled');
        }
      }
      $list.show();
    });
  
  }else{
    
    if (html == '') {
      html += `<div class="list-title empty">There is no custom domains yet</div>`;
    }
    $list.show();
  }

  $list.html(html);
  
  
  $list.find('[data-comp="enable-domain"]').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $parent = $this.closest('[data-domain]');
    var domain = $parent.attr('data-domain');
    var callback = function(granted) {
      if(granted) {
        $list.find('[data-domain="' + domain + '"]').addClass('enabled');
      }
    };
    enableOrigin(domainToOrigins(domain), callback);
  });

}

function getCustomDomains() {
  if (localStorage.CUSTOM_DOMAINS == null) {
    localStorage.CUSTOM_DOMAINS = JSON.stringify([]);
  }
  return JSON.parse(localStorage.CUSTOM_DOMAINS);
}

function addCustomDomain(domain, rule) {
  if(!validURL(domain)) {
    return false;
  }
  var d = domain.split('://');
  domain = d[d.length-1];
  
  var data = {
    id: getTimestamp(),
    domain: domain,
    rules: rule
  };
  var origins = domainToOrigins(domain);
  
  chrome.permissions.request({
    origins: origins,
  }, function(granted) {
    // The callback argument will be true if the user granted the permissions.
    if(granted){
      CUSTOM_DOMAINS = getCustomDomains();
      CUSTOM_DOMAINS.push(data);
      localStorage.CUSTOM_DOMAINS = JSON.stringify(CUSTOM_DOMAINS);
      chrome.runtime.sendMessage({
        action: "CUSTOM_DOMAIN_ADDED",
        data: {origins:origins}
      }, function(response) {});
      renderCustomDomains();
      $customDomainsForm[0].reset();
    }
  });

}

function deleteCustomDomain(id) {
  var confirm = true;
  if (confirm == true) {
    var pos = false;
    CUSTOM_DOMAINS = getCustomDomains();
    for (var i in CUSTOM_DOMAINS) {
      if (CUSTOM_DOMAINS[i].id == id) {
        pos = i;
        break;
      }
    }
    if(!pos){
      return false;
    }
    
    var custom_domain = CUSTOM_DOMAINS[pos];
    var origins = domainToOrigins(custom_domain.domain);
    
    chrome.permissions.contains({
      origins: origins
    }, function(allowed) {
      if (allowed) {
        // The extension has the permissions.
        chrome.permissions.remove({
          origins: origins
        }, function(removed) {});
      }
      CUSTOM_DOMAINS.splice(pos, 1);
      localStorage.CUSTOM_DOMAINS = JSON.stringify(CUSTOM_DOMAINS);
      chrome.runtime.sendMessage({
        action: "CUSTOM_DOMAIN_REMOVED",
        data: {origins: origins}
      }, function(response) {});
      renderCustomDomains();
    });
    
  }
}

function deleteCustomDomains() {
  var confirm = true;
  if (confirm == true) {
    localStorage.CUSTOM_DOMAINS = JSON.stringify([]);
    loadCustomRulesList();
  }
}

function getRulesName(id) {
  var name = '';
  for (var i in DOMAINS) {
    if (DOMAINS[i].id == id) {
      name = DOMAINS[i].name;
      break;
    }
  }
  if (!name) {
    for (var j in CUSTOM_RULES) {
      if (CUSTOM_RULES[j].id == id) {
        name = CUSTOM_RULES[j].name;
        break;
      }
    }
  }
  return name;
}

function returnDomainsSelect() {
  var options = '';
  for (var i in DOMAINS) {
    options += '<option value="' + DOMAINS[i].id + '">' + DOMAINS[i].name + '</option>';
  }
  for (var j in CUSTOM_RULES) {
    options += '<option value="' + CUSTOM_RULES[j].id + '">' + CUSTOM_RULES[j].name + '</option>';
  }
  return options;
}

function domainToOrigins(domain){
  var domains = domain.split(',');
  var origins = [];
  for (var i = 0; i < domains.length; i++) {
    origins.push('*://' + domains[i] + '/');
  }
  return origins;
}

function originToDomain(origin){
  return origin.replace('*://*.', '').replace('*://', '').replace('/*', '').replace('/', '');
}

function getOrigin(url) {
  var domain;
  if (url.indexOf('://') > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }
  domain = domain.split('/*')[0];
  domain = domain.split(':')[0];
  return '*://' + domain + '/*';
}

/* rules */

function getCustomRules() {
  if (localStorage.CUSTOM_RULES == null) {
    localStorage.CUSTOM_RULES = JSON.stringify([]);
  }
  return JSON.parse(localStorage.CUSTOM_RULES);
}

function addCustomRule(data) {
  CUSTOM_RULES = getCustomRules();
  CUSTOM_RULES.push(data);
  localStorage.CUSTOM_RULES = JSON.stringify(CUSTOM_RULES);
  loadCustomRulesList();
}

function deleteCustomRule(id) {
  var confirm = true;
  if (confirm == true) {
    CUSTOM_RULES = getCustomRules();
    for (var i in CUSTOM_RULES) {
      if (CUSTOM_RULES[i].id == id) {
        CUSTOM_RULES.splice(i, 1);
        break;
      }
    }
    localStorage.CUSTOM_RULES = JSON.stringify(CUSTOM_RULES);

    loadCustomRulesList();
  }
}

function deleteCustomRules() {
  var confirm = true;
  if (confirm == true) {
    localStorage.CUSTOM_RULES = JSON.stringify([]);
    loadCustomRulesList();
  }
}

function loadCustomRulesList() {
  $customRulesList.html('');
  var html = '';
  CUSTOM_RULES = getCustomRules();
  for (var i in CUSTOM_RULES) {
    html += '<div class="form_text_" data-id="' + CUSTOM_RULES[i].id + '">';
			html += '<p>' + CUSTOM_RULES[i].name + ' <a href="#" class="delete-rule">x</a></p>';
		html += '</div>';
  }
  $customRulesList.html(html);
  $customDomainsSelect.find('[name=rule]').html(returnDomainsSelect());
}

/* helpers */
function getTimestamp() {
  return new Date().getTime();
}

function returnJson(string) {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  string = (string[0] == '[') ? string : '[' + string + ']';
  return string;
}

function sortDomains (d) {
  d = d.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)
  var featured_domains = d.filter((a) => a.sort).sort((a, b) => a.sort - b.sort)
  var unfeatured_domains = d.filter((a) => !a.sort)
  return [...featured_domains, ...unfeatured_domains]
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

/*

CUSTOM_DOMAINS = [
	{	
		id: timestamp
		domain: 'seteado por el usuario'
		rules: rulesID
	},
	{	
		id: timestamp
		domain: 'seteado por el usuario'
		rules: rulesID
	},
];

CUSTOM_RULES = [
	{
		'id': timestamp(),
		'name' 'seteado por el usuario',
		'rules':[rulesArrays]
	},
	{
		'id': timestamp(),
		'name' 'seteado por el usuario',
		'rules':[rulesArrays]
	},
	{
		'id': timestamp(),
		'name' 'seteado por el usuario',
		'rules':[rulesArrays]
	},
]



*/
