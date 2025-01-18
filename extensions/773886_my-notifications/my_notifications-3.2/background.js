const checkTimeout = 1000 * 45
const engine = (navigator.userAgent.search(/(Firefox)/) > 0) ? browser : chrome
const pluck = (arr, key) => arr.map(i => i[key])
const getRandomId = () => Math.random().toString(36).slice(2)
const defOptions = {
	sound : 'sounds/creation.ogg',
	volume : 0.9,
	iconNum	: 1,
	windowBadgeColor: '#ffe04d',
	applicationBadgeColor: '#ffe04d',
	columns: 4
}

let requestTimerId

async function getGrid(key) {
	return new Promise((resolve, reject) => {
		engine.storage.local.get('grid', function (result) {
			if (!result.grid) {
				resolve([])
			}

			if (!key) {
				resolve(result.grid)

				return
			}

			let items = []
			for (let i in result.grid) {
				if (result.grid.hasOwnProperty(i) && result.grid[i].key === key) {
					items.push(result.grid[i])
				}
			}

			resolve(items)
		})
	})
}

async function getSiteSittingById(id) {
	return new Promise((resolve, reject) => {
		engine.storage.local.get('grid', function (result) {
			if (!result.grid) {
				resolve({})
			}

			for (let item of result.grid) {
				if (item.id === id) {
					resolve(item)
				}
			}
		})
	})
}

function updateSiteSettings(id, newData, key) {
	key = key ?? null
	if (newData === undefined) {
		return
	}

	engine.storage.local.get('grid', result => {
		let grid = result.grid

		for (let i in grid) {
			if (grid.hasOwnProperty(i)) {
				if (key && grid[i].key === key) {
					grid[i] = {...grid[i], ...newData}
				}

				if (grid[i].id === id) {
					grid[i] = {...grid[i], ...newData}
				}
			}
		}

		engine.storage.local.set({'grid' : grid})
	})
}

engine.runtime.onMessage.addListener(function(request,sender, sendResponse) {
	if (request.method === 'setOpt') {
		let data = JSON.parse(localStorage.getItem('options'));
		data = {...data, ...request.data}
		
		localStorage.setItem('options', JSON.stringify(data));
	}
	
	if (request.method === 'getOpt') {
		sendResponse(JSON.parse(localStorage.getItem('options')))
	}

	if (request.method === 'setSiteSettings') {
		updateSiteSettings(null, request.data, request.site)
		sendResponse()
	}

	if (request.method === 'setNewMess') {
		if (isNaN(request.count) || (request.count == null)) {
			request.count = 0
		}

		updateUnreadCount(request.site, request.count, true)
		sendResponse()
	}

	// if (request.method === 'getNewMess') {
	// 	getSiteSittings(request.site).then((data) => {
	// 		sendResponse({
	// 			result: data
	// 		})
	// 	})
	// }

	if (request.method === 'getGrid') {
		engine.storage.local.get('grid', item => {
			sendResponse({'grid' : item.grid ?? []})
		})
	}

	if (request.method === 'setGrid') {
		engine.storage.local.set({'grid' : request.data})
	}
})

function checkNewMess(silent) {
	silent = silent ?? false

	function chkNewMessSite(siteSettings) {
		let key = siteSettings.key
		let processor = function (rawCount) {
			let messCount

			if (rawCount === false) {
				presets[key].isOnline = false
				updateUnreadCount(key, 0, true)

				return
			}

			presets[key].isOnline = true

			if (typeof rawCount === 'string') {
				messCount = Number(rawCount.replace(/\D+/g,""))
			} else if (typeof rawCount === 'number') {
				messCount = rawCount
			} else if (rawCount === null || rawCount === false || rawCount === undefined) {
				messCount = 0
			} else if (isNaN(rawCount)) {
				return
			} else {
				return
			}

			updateUnreadCount(key, messCount, silent)
		}

		processor.data = siteSettings
		processor.silent = silent
		processor.request = myRequest
		processor.superRequest = mySuperRequest

 		if (typeof presets[key].check === 'function') {
			presets[key].check(processor)
		} else {
			let url;

			if (presets[key].urlForChMess.indexOf('http') + 1) {
				url = presets[key].urlForChMess
			} else {
				let host = siteSettings.host || presets[key].site
				url = 'https://' + host + presets[key].urlForChMess
			}

			myRequest(url, {
				method: 'GET',
				dataType: 'html',
				success: function (html) {
					let loginElem = html.querySelector(presets[key].loginSelector)
					if (loginElem) {
						let messCount = html.querySelector(presets[key].messCountSelector)
						messCount = messCount ? messCount.innerText : 0;
						processor(messCount)
					} else {
						processor(false)
					}
				},
				error: () => processor(false)
			})
		}
	}

	getGrid().then((grid) => {
		let usedKeys = []
		grid = grid.filter(item => item.checkEnable && item.key)

		for(let siteSettings of grid) {
			if (!usedKeys.includes(siteSettings.key)) {
				usedKeys.push(siteSettings.key)
				chkNewMessSite(siteSettings)
			}
		}
	})
}

async function getAllMessageCount() {
	let count = 0
	let grid = await getGrid()

	for (let key in presets) {
		for (let item of grid) {
			if (item.checkEnable && item.key === key && presets[key].newMess <= 99) {
				count += presets[key].newMess
				break
			}
		}
	}

	return count
}

function playSoundForSite(key) {
	getGrid(key).then(grid => {
		let usedKeys = []
		grid = grid.filter(item => item.checkEnable)

		for(let siteSettings of grid) {
			if (usedKeys.includes(siteSettings.key)) {
				continue
			}

			usedKeys.push(siteSettings.key)

			if (presets[key].forceSound) {
				playSound(siteSettings)
			} else  {
				let host = siteSettings.host || presets[key].domains?.[0] || presets[key].site

				engine.tabs.query({}, tabs => {
					let siteOpen = false
					for (let tab of tabs) {
						if (tab.url && tab.url.indexOf(host) !== -1) {
							siteOpen = true
						}
					}

					if (!siteOpen && siteSettings.sound !== 'off') {
						playSound(siteSettings)
					}
				})
			}
		}
	})
}

function playSound(siteSettings){
	let options = JSON.parse(localStorage.getItem('options'))
	let audio = new Audio()

	audio.autoplay = true
	audio.src = siteSettings.sound ? siteSettings.sound : options.sound
	audio.volume = options.volume
}

function updateUnreadCount(key, count, silent) {
	silent = silent ?? false
	count = count || 0

	if (presets[key] === undefined) {
		return
	}

	presets[key].newMess = count

	if (presets[key].oldMess < count && count <= 99 && !silent) {
		playSoundForSite(key)
	}

	presets[key].oldMess = count

	setTimeout(updateBadge)
}

async function updateBadge() {
	let count = await getAllMessageCount()
	let shortCount = ''

	if (count > 0) {
		shortCount = ((''+count).length) > 4 ? Math.floor(count / 1000) + 'k' : count
	}

	engine.browserAction.setBadgeText({text: shortCount + ''})
}

async function onInstall()
{
	let grid = await getGrid()

	if (!grid.length) {
		let newGrid = []
		for (let key in presets) {
			if (presets[key].showed) {
				newGrid.push({
					id : getRandomId(),
					key :  key,
					title : presets[key].title,
					icon : 'siteIcons/' + key + '.png',
					sound : '',
					checkEnable : true,
				})
			}
		}

		engine.storage.local.set({'grid': newGrid})
	}

	updateSiteSettings(null, {'host': 'loveplanet.ru'}, 'loveplanet.ru')
	updateSiteSettings(null, {'host': 'badangadating.com'}, 'badanga')
	updateSiteSettings(null, {'host': 'www.mamba.ru'}, 'mamba.ru')
}

async function onUpdate() {
	// v 2.16 >> 3.0 converting
	let grid = []
	let existData = await getGrid()

	if (existData.length) {
		return
	}

	for (let key in presets) {
		let siteSettings = JSON.parse(localStorage.getItem(key+' settings'))

		if (siteSettings && siteSettings.check) {
			grid.push({
				id : getRandomId(),
				key :  key,
				title : presets[key].title,
				icon : 'siteIcons/' + key + '.png',
				sound : '',
				checkEnable : true,
			})
		}

		localStorage.removeItem(key+' settings')
	}

	grid = grid.filter(el => el != null)

	if (grid.length) {
		engine.storage.local.set({'grid': grid})
	}
}

async function filterGrid() {
	const grid = await getGrid()

	let newGrid = []
	for (let gridItem of grid) {
		if (presets[gridItem.key]) {
			newGrid.push(gridItem)
		}
	}

	engine.storage.local.set({'grid': newGrid})
}

document.addEventListener('DOMContentLoaded', async function () {
	const verCur = engine.runtime.getManifest().version
	const verFromBD = localStorage.getItem('version')
	const options = {...defOptions, ...JSON.parse(localStorage.getItem('options'))}

	localStorage.setItem('options', JSON.stringify(options))

	if (localStorage.getItem('version') === null) {
		await onInstall()
	}

	if (verFromBD !== null && verFromBD !== verCur) {
		await onUpdate()
	}

	await filterGrid()

	localStorage.setItem('version', verCur);

	engine.browserAction.setBadgeBackgroundColor({color:options.applicationBadgeColor})
	engine.browserAction.setIcon({path: 'icons/' + (options.iconNum ?? 1) +'.png'})
	engine.browserAction.setTitle({title: engine.i18n.getMessage('name') + ' v.' + verCur})

	setInterval(() => {
		for (let key in presets) {
			presets[key].isOnline = true
		}

		checkNewMess(true)
	}, 1000 * 60 * 15)

	for (let key in presets) {
		presets[key].isOnline = true
		presets[key].newMess = 0
		presets[key].oldMess = 0
	}

	requestTimerId = window.setInterval(checkNewMess, checkTimeout)
	checkNewMess(true)
})

class Sha1 {
	static hash(msg, options) {
		const defaults = { msgFormat: 'string', outFormat: 'hex' };
		const opt = Object.assign(defaults, options);

		switch (opt.msgFormat) {
			default: // default is to convert string to UTF-8, as SHA only deals with byte-streams
			case 'string':   msg = utf8Encode(msg);       break;
			case 'hex-bytes':msg = hexBytesToString(msg); break; // mostly for running tests
		}

		// constants [§4.2.1]
		const K = [ 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6 ];

		// initial hash value [§5.3.1]
		const H = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];

		// PREPROCESSING [§6.1.1]

		msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

		// convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
		const l = msg.length/4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
		const N = Math.ceil(l/16);  // number of 16-integer-blocks required to hold 'l' ints
		const M = new Array(N);

		for (let i=0; i<N; i++) {
			M[i] = new Array(16);
			for (let j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
				M[i][j] = (msg.charCodeAt(i*64+j*4+0)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16)
					| (msg.charCodeAt(i*64+j*4+2)<< 8) | (msg.charCodeAt(i*64+j*4+3)<< 0);
			} // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
		}
		// add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
		// note: most significant word would be (len-1)*8 >>> 32, but since JS converts
		// bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
		M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);
		M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

		// HASH COMPUTATION [§6.1.2]

		for (let i=0; i<N; i++) {
			const W = new Array(80);

			// 1 - prepare message schedule 'W'
			for (let t=0;  t<16; t++) W[t] = M[i][t];
			for (let t=16; t<80; t++) W[t] = Sha1.ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

			// 2 - initialise five working variables a, b, c, d, e with previous hash value
			let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4];

			// 3 - main loop (use JavaScript '>>> 0' to emulate UInt32 variables)
			for (let t=0; t<80; t++) {
				const s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
				const T = (Sha1.ROTL(a, 5) + Sha1.f(s, b, c, d) + e + K[s] + W[t]) >>> 0;
				e = d;
				d = c;
				c = Sha1.ROTL(b, 30) >>> 0;
				b = a;
				a = T;
			}

			// 4 - compute the new intermediate hash value (note 'addition modulo 2^32' – JavaScript
			// '>>> 0' coerces to unsigned UInt32 which achieves modulo 2^32 addition)
			H[0] = (H[0]+a) >>> 0;
			H[1] = (H[1]+b) >>> 0;
			H[2] = (H[2]+c) >>> 0;
			H[3] = (H[3]+d) >>> 0;
			H[4] = (H[4]+e) >>> 0;
		}

		// convert H0..H4 to hex strings (with leading zeros)
		for (let h=0; h<H.length; h++) H[h] = ('00000000'+H[h].toString(16)).slice(-8);

		// concatenate H0..H4, with separator if required
		const separator = opt.outFormat=='hex-w' ? ' ' : '';

		return H.join(separator);

		function utf8Encode(str) {
			try {
				return new TextEncoder().encode(str, 'utf-8').reduce((prev, curr) => prev + String.fromCharCode(curr), '');
			} catch (e) { // no TextEncoder available?
				return unescape(encodeURIComponent(str)); // monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
			}
		}

		function hexBytesToString(hexStr) { // convert string of hex numbers to a string of chars (eg '616263' -> 'abc').
			const str = hexStr.replace(' ', ''); // allow space-separated groups
			return str=='' ? '' : str.match(/.{2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
		}
	}

	static f(s, x, y, z)  {
		switch (s) {
			case 0: return (x & y) ^ (~x & z);          // Ch()
			case 1: return  x ^ y  ^  z;                // Parity()
			case 2: return (x & y) ^ (x & z) ^ (y & z); // Maj()
			case 3: return  x ^ y  ^  z;                // Parity()
		}
	}

	static ROTL(x, n) {
		return (x<<n) | (x>>>(32-n));
	}
}

function webRequestListener(details) {
	let messagesId = 0

	for (let i = 0; i < details.requestHeaders.length; ++i) {
		if (details.requestHeaders[i].name === 'X-request-mymessages-id') {
			messagesId = details.requestHeaders[i].value
			details.requestHeaders.splice(i, 1)
			break
		}
	}

	if (!messagesId) {
		return
	}

	if (mySuperRequest.headers[messagesId]) {
		let newHeaders = mySuperRequest.headers[messagesId]
		for (let i = 0; i < details.requestHeaders.length; ++i) {
			let key = details.requestHeaders[i].name.toLowerCase()
			if (newHeaders[key] !== undefined) {
				details.requestHeaders[i].value = newHeaders[key]
				delete newHeaders[key]
				break
			}
		}

		for (let key in newHeaders) {
			if (newHeaders.hasOwnProperty(key)) {
				details.requestHeaders.push({'name' : key, 'value' : newHeaders[key]})
			}
		}

		mySuperRequest.headers[messagesId] = null
	}

	setTimeout(function () {
		engine.webRequest.onBeforeSendHeaders.removeListener(webRequestListener)
	}, 95*1000)

	return {requestHeaders: details.requestHeaders}
}

function mySuperRequest(url, params) {
	let listenerOptions = [
		'blocking',
		'requestHeaders',
		engine.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS
	].filter(Boolean)

	++mySuperRequest.counter
	mySuperRequest.headers[mySuperRequest.counter] = params.headers ?? {}

	params.headers = {'X-request-mymessages-id' : mySuperRequest.counter}

	engine.webRequest.onBeforeSendHeaders.addListener(webRequestListener, {urls: [url]}, listenerOptions)

	myRequest(url, params)
}
mySuperRequest.counter = 0
mySuperRequest.headers = {}

function myRequest(url, params) {
	fetch(url, {
		method: params.method,
		body: params.body,
		headers: params.headers,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Status code error :" + response.status)
			}

			if (params.dataType === 'json') {
				return response.json()
			}

			return response.text()
		})
		.then((data) => {
			if (typeof params.success === 'function') {
				if (params.dataType === 'html') {
					let parser = new DOMParser()
					params.success(parser.parseFromString(data, 'text/html'))
				} else {
					params.success(data)
				}
			}
		})
		.catch((error) => {
			if (typeof params.error === 'function') {
				params.error(error)
			}
		})
}
//
// // Get arrays containing new and old rules
// const newRules = await getNewRules();
// const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
// const oldRuleIds = oldRules.map(rule => rule.id);
//
// // Use the arrays to update the dynamic rules
// await chrome.declarativeNetRequest.updateDynamicRules({
// 	removeRuleIds: oldRuleIds,
// 	addRules: newRules
// });
