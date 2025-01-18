
// Help for Alldebrid api communication. See http://docs.alldebrid.com/
var api = {

	lastHit: Date.now(),

	log: (endpoint, params) => {

		var type = '';

		if(['link/infos', 'link/redirector', 'link/unlock'].indexOf(endpoint) !== -1) {
			type = 'links';
		} else if(['magnet/status', 'magnet/upload', 'magnet/files'].indexOf(endpoint) !== -1) {
			type = 'magnets';
		} else if(['lang', 'user', 'user/hosts', 'hosts/priority'].indexOf(endpoint) !== -1) {
			type = 'system';
		}
		var log = {
			date: Math.round(+new Date() / 1000),
			endpoint: endpoint,
			type: type,
			payload: params
		};

		env.config.apiLogs.push(log);
	},

	// generate url from endpoint and get parameters
	getUrl: (endpoint) => {
		
		if(endpoint == 'link/redirector') {
			var url = env.config.apiSlowUrl + + 'v4/' + endpoint; 
		}
		else if(endpoint == 'magnet/status') {
			var url = env.config.apiUrl + 'v4.1/' + endpoint; 
		}
		else {
			var url = env.config.apiUrl + 'v4/' + endpoint ;
		}

		return url;
	},

	// make the request, retrying if necessary
	fetch: async (endpoint, params, isRetry) => {
		let response, error, json;

		api.log(endpoint, params);

		var elapsed = (Date.now() - api.lastHit);

		if(elapsed < 500) {
			await sleep((500 - elapsed));
		}

		let postData = new FormData()

		let hasParams = false;

		for (let key in params) {
			hasParams = true;
			if(Array.isArray(params[key])) {
				params[key].forEach((value) => {
					postData.append(key, value);
				})
			} else {
				postData.append(key, params[key]);
			}
		}

		let url = api.getUrl(endpoint);

		api.lastHit = Date.now();

		if(hasParams) {
			[error, response] = await to(fetch(url, {
				method: "post",
				body: postData
			}));
		} else {
			[error, response] = await to(fetch(url));
		}

		if(error)
			return {error};

		[error, json] = await to(response.json());

		if(error)
			return {error};

		if(!exists(json.status) || ( !exists(json.data) && !exists(json.error) ) )
			return {error: 'Bad api answer'};

		// God valid JSON response

		// if(endpoint != 'user/login' && json.errorCode && json.errorCode < 5 && !isRetry) {
		// 	// Invalid token. Let's deloggued the user
		// 	log.warn('[API] Delogging user');
		// 	env.config.isLoggued = false;
		// 	env.config.token = '';

		// 	await api.login();

		// 	if(env.config.isLoggued) { // Ok false alarm we are loggued, let's retry
		// 		json = await api.fetch(endpoint, params, true);
		// 	}
		// }

		return json;
	},


	login: async (noBootstrap) => {

		// Yeah, loggued

		var response = await api.fetch('user');

		if(response.status == 'success') {

			env.config.domain = response.data.user.preferedDomain || 'com';
			env.config.isLoggued = true;

			env.user = response.data.user;

			storage.set({user: env.user, config: env.config});

			if(env.config.boot == false && noBootstrap != true)
				bootstrap();

			return [null, true];
		} else {
			env.config.isLoggued = false;
			// Not loggued, unregister all extensions features as their are useless
			if(env.config.boot == true) // only if extension already booter
				unbootstrap();
		}	

		return [response.error];
	},

	rivers: async () => {

		var response = await api.fetch('magnet/status', {
			session: env.config.rivers.session,
			counter: env.config.rivers.counter,
		});

		if(exists(response.status) && response.status == 'success') {
			if(response.data.fullsync == true) {
				env.config.rivers.list = {};
			}

			if(exists(response.data.counter)) {
				env.config.rivers.counter = response.data.counter;
				
			}

			storage.set({config: env.config});

			return response.data.magnets;
		}

		return [];
	},

	riversFiles: async (id) => {

		var response = await api.fetch('magnet/files', {
			'id[]': id,
		});

		if(exists(response.status) && response.status == 'success') {
			if(response.data.magnets[0].error) {
				log.warn("[API] Can't get files for " + id + " : " + response.data.magnets[0].error.message);
				return [];
			}

			return response.data.magnets[0].files;
		} else {
			log.warn("[API] Can't get files for " + id, response);
		}

		return [];
	},
}

// Helper to work with native messaging to work with the local stream script 
// https://alldebrid.com/extensions/?platform=streaming
var native = {

	playersByPlatform: {
		'linux': {
			'bins': ['vlc', 'smplayer', 'mplayer', 'kodi'],
			'paths': ['/usr/bin/', '/usr/local/bin/']
		},
		'win': {
			'bins': [
				'Combined\ Community\ Codec\ Pack\\MPC\\mpc-hc.exe', 
				'VideoLAN\\VLC\\vlc.exe', 
				'DAUM\\PotPlayer\\PotPlayerMini64.exe', 
				'Kodi\\kodi.exe',
				'KMPlayer\\KMPlayer.exe'
				// Real Player ? Naaahhhh
			],
			'paths': [
				'C:\\Program\ Files\ (x86)\\', 
				'C:\\Program\ Files\\', 
				'C:\\'
			]
		},
		'mac': {
			'bins': ['VLC.app', 'MPlayerX.app', 'Kodi.app'],
			'paths': ['/Applications/']
		}
		//  MacOS one day ?
	},

	// Check if script is installed, get version if detected
	getVersion: async () => {
		var result = await browser.runtime.sendNativeMessage(
			'com.alld.node',
			{cmd: 'version'}
		).then( (response) => {
			return response;
		}).catch( (error) => {
			return false;
		});

		return result;
	},

	// Get OS env
	getEnv: async () => {
		var result = await browser.runtime.sendNativeMessage(
			'com.alld.node',
			{cmd: 'env'}
		).then( (response) => {
			return response.env;
		}).catch( (error) => {
			return false;
		});

		return result;
	},

	// (try to) find installed media players, ease pain of specifying player path by hand.
	scanLocalPlayers: async () => {

		var os = env.config.client.os;

		if(os == 'win') {
			// On windows, get ProgramFiles env variable and, 
			// if different from default one, also check their path.
			var osEnv = await native.getEnv();

			if(native.playersByPlatform[os].paths.indexOf(osEnv.ProgramFiles) === -1)
				native.playersByPlatform[os].paths.push(osEnv.ProgramFiles)

			if(native.playersByPlatform[os].paths.indexOf(osEnv['ProgramFiles(x86)']) === -1)
				native.playersByPlatform[os].paths.push(osEnv['ProgramFiles(x86)'])
		}

		// get player data
		var players = native.playersByPlatform[os];

		var validPaths = [];

		for(var i = 0, len = players.bins.length; i < len; i++) {
			await (async function() {
				for (var j = 0, lenPath = players.paths.length; j < lenPath; j++) {
					// path = possible root + known default mediaplyer install path
					var fullPath = players.paths[j] + players.bins[i];
					
					// Is this player installed here by any chance ?
					var isValid = await native.checkPath(fullPath);

					if(isValid) {
						// Ez Pz, found you
						validPaths.push(fullPath);
						return;
					}
				}  
			})();	
		}

		return validPaths;

	},

	// Check if a file exists on the fs
	checkPath: async(path) => {
		var result = await browser.runtime.sendNativeMessage(
			'com.alld.node',
			{cmd: 'checkPath', path}
		).then( (response) => {
			return response.exists;
		}).catch( (error) => {
			return false;
		});

		return result;
	},

	// Launch user configured media player, sending the download link along it to initiate network stream on the player.
	localStream: async(player, link) => {
		link = encodeURI(link);

		if(env.config.client.os == 'win') {
			var result = await browser.runtime.sendNativeMessage(
				'com.alld.node',
				{cmd: 'exec', command: player, arguments: [link]}
			).then( (response) => {
				if(response.error)
					return [false, response.error];

				return true;
			}).catch( (error) => {
				log.warn(error);
				return [false, error];
			});
		} else if(env.config.client.os == 'linux') {
			var result = await browser.runtime.sendNativeMessage(
				'com.alld.node',
				{cmd: 'exec', command: player, arguments: [link]}
			).then( (response) => {
				if(response.error)
					return [false, response.error];

				return true;
			}).catch( (error) => {
				log.warn(error);
				return [false, error];
			});
		} else {
			// Mac OS
			var result = await browser.runtime.sendNativeMessage(
				'com.alld.node',
				{cmd: 'exec', command: 'open', arguments: ['-a', player, link]}
			).then( (response) => {
				if(response.error)
					return [false, response.error];

				return true;
			}).catch( (error) => {
				log.warn(error);
				return [false, error];
			});
		}

		return result;
	}
}

// Helper to work with localstorage
var storage = {
	get: async (keys) => {
		let value = await browser.storage.local.get(keys);

		if(Array.isArray(keys))
			return value;

		return value[keys];
	},

	set: async (payload) => {
		await browser.storage.local.set(payload);
		return;
	},

	delete: async (payload) => {
		await browser.storage.local.remove(payload);
		return;
	},

	clear: async () => {
		await browser.storage.local.clear();
		return;
	}
}

// Uri helper, because all native javascript functions are useless 
const uri = {

	// in object of key : value, out formatted query string for HTTP request 
	encodeQueryData: (data) => {
	   const ret = [];
	   for (let d in data) {
	   		if(Array.isArray(data[d])) {
	   			data[d].forEach((value) => {
	   				ret.push(encodeURIComponent(d) + '[]=' + encodeURIComponent(value));
	   			})
	   		} 
	   		else {
	   			ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	   		}
	   }
	   return ret.join('&');
	},

	// get hostaname
	extractHostname: (url) => {
	    var hostname;
	    
	    if (url.indexOf("//") > -1) //find & remove protocol (http, ftp, etc.) and get hostname
	        hostname = url.split('/')[2];
	    else
	        hostname = url.split('/')[0];
	    
	    hostname = hostname.split(':')[0]; //find & remove port number
	    hostname = hostname.split('?')[0];  //find & remove "?"

	    return hostname;
	},

	// get root domain from hostanme
	extractRootDomain: (url) => {
	    var domain = uri.extractHostname(url),
	        splitArr = domain.split('.'),
	        arrLen = splitArr.length;

	    //extracting the root domain here
	    //if there is a subdomain 
	    if (arrLen > 2) {
	        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
	        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
	        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
	            //this is using a ccTLD
	            domain = splitArr[arrLen - 3] + '.' + domain;
	        }
	    }
	    return domain;
	},

	// extract get param value from request query string
	extractParam: (url, parameter) => {

		let params = (new URL(url)).searchParams;
		let value = params.get(parameter);

		return value;
	}
}