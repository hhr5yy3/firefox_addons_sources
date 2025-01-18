var ProxyAdapter = {
  // type 1: https connect, type 2: socks5
  setProxy: function(host, port, type) {
      this._setProxySettings(host, port, type);
  },
  removeProxy: function() {
      this._setProxySettings(null, null, null, true);
  },
  _setProxySettings: function(host, port, type, removeProxy) {
      if (!removeProxy && (host == null || port == null)) {
          return;
      }
      browser.runtime.sendMessage(removeProxy ? "DIRECT" : {
          host: host,
          port: port,
          type: type === 1 ? 'https' : 'socks',
      }, {
          toProxyScript: true
      });
  }
}