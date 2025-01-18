const TYPE_FORM_ENCODED = 'application/x-www-form-urlencoded';

const TYPE_JSON = 'application/json';

const RE_XML = /((\/xml)|(\+xml))$/;

function encodeParams(params) {
  return _.map(params, function(value, name) {
    return name+'='+encodeURIComponent(value);
  }).join('&');
}

var HTTP = {
  request: promisifyOrCallback(function({
    params, json, url, overrideMimeType, headers, method
  }, callback) {
    const contentType = params ? TYPE_FORM_ENCODED : TYPE_JSON;

    method || (method = 'GET');
    json || (json = {});

    if (method == 'GET' && !_.isEmpty(json)) {
      url += (url.indexOf('?') < 0 ? '?' : '&') + qs.stringify(json);
    }
    // console.log('HTTP.request:', method, url);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = onreadystatechange;
    xhr.open(method, url, true);
    setHeaders();

    if(overrideMimeType) {
      xhr.overrideMimeType(overrideMimeType);
    }

    if (method == 'GET') {
      // null for GET with native object
      xhr.send(null);
    } else {
      const str = contentType == TYPE_JSON ?
        JSON.stringify(json) : encodeParams(params);
      xhr.send(str);
    }

    function onreadystatechange() {
      if (xhr.readyState == 4) {
        const text = xhr.responseText;
        const contentType = xhr.getResponseHeader('content-type') || 'text';
        const isJSON = contentType.indexOf(TYPE_JSON) == 0;
        const isXML = RE_XML.test(contentType);
        const response = isJSON ? JSON.parse(text) : isXML ? xhr.responseXML : text;
        const status = xhr.status;
        
        const headerString = xhr.getAllResponseHeaders();

        // Convert the header string into an array
        // of individual headers
        const arr = headerString.trim().split(/[\r\n]+/);
    
        // Create a map of header names to values
        const headers = {};
        arr.forEach((line) => {
          const parts = line.split(': ');
          const header = parts.shift();
          const value = parts.join(': ');
          headers[header] = value;
        });
        // console.log('HTTP:response:(type?', contentType, ')-', xhr.status,  xhr, xhr.responseText);
        callback(status !=200 ? {status, response} : null, {headers, response, status});
      }
    }

    function setHeaders() {
      xhr.withCredentials = true;
      if (method != 'GET') {
        xhr.setRequestHeader('Content-type', contentType);
      }
      _.each(headers, function(value, key) {
        xhr.setRequestHeader(key, value);
      });
    }
  }),
  
  del: function(options, ...args) {
    _.extend(options, {method: 'DELETE'});
    return HTTP.request(options, ...args);
  },
  head: function(options, ...args) {
    _.extend(options, {method: 'HEAD'});
    return HTTP.request(options, ...args);
  },
  get: function(options, ...args) {
    _.extend(options, {method: 'GET'});
    return HTTP.request(options, ...args);
  },
  post: function(options, ...args) {
    _.extend(options, {method: 'POST'});
    return HTTP.request(options, ...args);
  },
  put: function(options, ...args) {
    _.extend(options, {method: 'PUT'});
    return HTTP.request(options, ...args);
  },
};

