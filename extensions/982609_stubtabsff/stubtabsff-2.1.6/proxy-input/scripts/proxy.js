function Proxy(protocol, ip, port, username, password) {
  return {
    protocol,
    ip,
    port,
    username,
    password,
  };
}

const validProtocols = ['http', 'https', 'socks', 'socks4', 'direct'];

class ProxyGroup {

  constructor(groupName= "group", proxies = []) {
    this.id = Date.now();
    this.proxies = proxies;
    this.groupName = groupName;
  }

  addProxy(proxy) {
    this.proxies.push(proxy);
  }

  deleteProxy(index) {
    if (index < this.proxies.length && index > -1)
      this.proxies.splice(index, 1);
  }

  editProxy(index, proxy) {
    this.proxies[index] = { ...this.proxies[index], ...proxy };
    console.log(this.proxies[index]);
  }

  export() {
    let exportProxies = this.proxies;
    let t = Papa.unparse(exportProxies);
    download(this.groupName + ".csv", t);
  }

  async import(file) {
    let text = await readTextFile(file);
    let proxies = Papa.parse(text.trimEnd()).data;
    proxies.shift();
    for (let i = 0; i < proxies.length; i++) {
        if (!validProtocols.includes(proxies[i][0])) {
            importError(
`Failed to import proxy file:
Protocol '${proxies[i][0]}' on line ${(i + 1)} is not valid.
Valid protocols are 'http', 'https', 'socks', 'socks4', or 'direct'.`
            );
            return;
        }
    }
    proxies = proxies.map((p) => Proxy(p[0], p[1], p[2], p[3], p[4]));
    this.proxies=proxies;
    refeshProxyList();
  }
  setData(data) {
    this.proxies=data;
  }
}



let handler = new ProxyGroup();
