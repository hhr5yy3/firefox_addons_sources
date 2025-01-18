
const chromeProxy = {

	generateChromePacScript: function (proxyInitData) {
		let proxyPac =  JSON.stringify(proxyInitData.pac);
		
		let skipProxyFor = JSON.stringify(proxyInitData.skipProxyFor);

		let pacTemplateString = `

let skipProxyFor = JSON.parse('${skipProxyFor}');

let proxyPac = {
    protocol: "${proxyInitData.pac.protocol}",
    host: "${proxyInitData.pac.host}",
    port: "${proxyInitData.pac.port}"
};
let PROXY_RUNNING = ${((proxyInitData.PROXY_RUNNING) ? "true" : "false")};

const SThelper = {

  mustProxyHost: function(url) {
    if( !PROXY_RUNNING ) {
      return false;
    }
    let hosts = Object.keys(skipProxyFor);
    for(let hi in hosts) {
      if (url.indexOf(hosts[hi]) > -1) return false;
    }
    return true;
  }
};

function FindProxyForURL(url, host) {

  var retVal = '';
  if (proxyPac.host && proxyPac.port && SThelper.mustProxyHost(url)) {
  if(proxyPac.port == 9090) {
  	proxyPac.protocol = "SOCKS5";
  }
  switch (proxyPac.protocol) {
      case "HTTPS":
        retVal =  "HTTPS "+proxyPac.host+":"+proxyPac.port;
		break;
      case "SOCKS4":
        retVal =   "SOCKS4 "+proxyPac.host+":"+proxyPac.port;
		break;
      case "SOCKS5":
        retVal =   "SOCKS5 "+proxyPac.host+":"+proxyPac.port;
		break;
      case "HTTP":
      default:
        retVal =  "PROXY "+proxyPac.host+":"+proxyPac.port;
    }
  }

  return retVal;
}
		`;
		Debug.log(pacTemplateString);
		return pacTemplateString;
	},

}




