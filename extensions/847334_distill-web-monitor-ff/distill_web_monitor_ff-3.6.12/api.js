function apiHeaders() {
  return {
    'Authorization': 'Client ' + auth.getToken(),
    'X-Client-ID': Prefs.get('client.id'),
    'X-Client-Version': CFG.VERSION,
  };
}


function callAPI(url, method, json, callback) {
  let headers = {}
  if (url && typeof url === 'object') {
    const requestOptions = url
    callback = method
    url = requestOptions["url"]
    method = requestOptions["method"] || "GET"
    json = requestOptions["json"]
    headers = requestOptions["headers"]
  } else if (typeof method == 'function') {
    callback = method;
    json = null;
    method = 'GET';
  } else if (typeof json == 'function') {
    callback = json;
    if (_.isObject(method)) {
      json = method;
      method = 'GET';
    } else {
      json = null;
    }
  }
  // console.log(method, url)

  const options = {
    url,
    method,
    json,
    headers
  };
  return _api(options, callback);
}

async function _api(options, callback) {
  options.headers = { ...apiHeaders(), ...options.headers, };

  return new Promise((resolve, reject) => {
    return HTTP.request(options, function (err, xhrObj) {
      if (err && err.status == 401) {
        auth.on401(); // user need to login token lost
      }
      let res = xhrObj?.response;
      if (callback) {
        callback(err, res);
      } else {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      // err && console.error('api error: ', err, url, method, json);
      // callback(err, res);
    });
  });
}

function makeAPICaller(baseURL) {
  return (urlOrOptions, ...args) => {
    if (typeof urlOrOptions === "string") {
      return callAPI(baseURL + urlOrOptions, ...args);
    } else {
      urlOrOptions.url = baseURL + urlOrOptions.url
      return callAPI(urlOrOptions, ...args);
    }
  }
}


api = promisifyOrCallback(makeAPICaller(CFG.URL.API));
utilApi = utilWrapper;
util = makeAPICaller(CFG.URL.UTILITIES);

const utilRouter = new Router({
  routes: [{
    path: '/datasources/:datasource_id/fetch',
    handler: async function ({ json }) {
      const { datasource_id } = this.params;
      return await datasources.fetchData({
        type: datasource_id_type_map[datasource_id],
        fetchOpts: json
      });
    }
  }]
});

async function utilWrapper(url, method, json) {
  const route = utilRouter.find(url);
  if (route) {
    return await route.handler({ url, method, json });
  } else {
    return await util(url, method, json);
  }
}
