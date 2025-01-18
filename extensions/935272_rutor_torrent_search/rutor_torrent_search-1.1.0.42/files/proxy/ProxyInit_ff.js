Proxy.prototype.proxySetListener = function(oldListener, success, error) {
	var self = this;
	oldListener && browser.proxy.onRequest.removeListener(oldListener);
	if (!browser.proxy.onRequest.hasListener(self.proxyListener))
	{
		var urls = self.generateUrlsFilter();
		if (urls.length)
		{
			try
			{
				browser.proxy.onRequest.addListener(self.proxyListener, {urls: urls});
				if (browser.proxy.onRequest.hasListener(self.proxyListener))
				{
					success && success();
				}
				else
				{
					error && error();
				}
			}
			catch(e)
			{
				error && error();
			}
		}
		else
		{
			success && success();
		}
	}
	else
	{
		error && error();
	}
}
Proxy.prototype.proxyClear = function(callback) {
	var self = this;
	if (self.proxyListener)
	{
		browser.proxy.onRequest.removeListener(self.proxyListener);
		self.proxyListener = null;
	}
	
	callback();
}
Proxy.prototype.checkControllable = function(callback) {
	callback && callback(true);
}
Proxy.prototype.init = function() {
	this.onProxySettingsChange();
}

window._proxy = new Proxy();