console.log("Initialize JKSJ plugin");

var hostName = "cft.isd.sksj.host";

function SKSJClient(tabId) {
  this.tabId = tabId;
  var working = false;
  var requests = [];
  var port = null;
  var TRNMOD = null;
  var self = this;
  var resetError = false;

  self.connect = function () {
    console.log("connect");
    working = false;
    port = browser.runtime.connectNative(hostName);

    port.onDisconnect.addListener(function (data) {
      console.log("onDisconnect " + self.tabId);
      while (requests.length > 0) {
        self.handleResponse({error: {fromExtension: true, code: 2, text: 'Unexpected disconnect to native sksj!'}});
      }
      if (TRNMOD) {
        requests.push(TRNMOD);
      }
      port = null;
    });

    port.onMessage.addListener(self.handleResponse);
  };

  self.handleResponse = function (res) {
    working = false;
    if (!res) {
      res = {error: browser.runtime.lastError};
      res.error.fromExtension = true;
    }
    var request = requests.shift();
    try {
      if (request) {
        console.log("ansv " + logRequest(request) + " => " + JSON.stringify(res));
        request.data.res = res;
        request.sendResponse(request.data);
      } else {
        console.log("Error: requests is empty!");
      }
    } catch (e) {
      console.log("Error: " + JSON.stringify(e));
    }
    self.nextRequest();
  };

  self.nextRequest = function () {
    if (port == null) {
      self.connect();
    }
    if (port != null && !working && requests.length > 0) {
      working = true;
      var request = requests[0];
      console.log("send " + logRequest(request));
      try {
        port.postMessage(request.data.req);
      } catch (e) {
        console.log("error " + e.message);
        request.data.res = {fromExtension: true, error: {code: 1, text: e.message}};
        request.sendResponse(request.data);
      }
    }
  };

  self.sendRequest = function (data, sendResponse) {
    var request = {data: data, sendResponse: sendResponse};
    console.log("push " + logRequest(request));
    requests.push(request);
    if (request.data && request.data.req.method.name == "setTRNMOD") {
      TRNMOD = request;
    }
    self.nextRequest();
  };
}

browser.runtime.onConnect.addListener(function connected(p) {
  var sksjClient = new SKSJClient(0);
  var portFromCS = p;
  portFromCS.onMessage.addListener(function (request) {
    sksjClient.sendRequest(request, function(response) {
      response.type = "SKSJ_RESPONSE";
      portFromCS.postMessage(response);
    });
  });
});

function logRequest(request) {
  return request.data.req.method.name + JSON.stringify(request.data.req.method.args);
}

var sksjClient2 = new SKSJClient('1');
var p = browser.runtime.connectNative(hostName);
console.log("connected " + p);
p.onDisconnect.addListener(function (response) {
  console.log("Disconnected: " + JSON.stringify(response));
});
p.onMessage.addListener(function (response) {
  console.log("Received: " + JSON.stringify(response));
});
p.postMessage({"method": {"name": 'getVersion', "types": [], "args": []}});
console.log("Initialization done");
