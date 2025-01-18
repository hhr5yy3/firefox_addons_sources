let Storage = {
	async get(key){

		let result = await browser.storage.local.get(key);

		return result[key];

	},
	async set(key, value){
		await browser.storage.local.set({ [key] : value });
	}
};

let Random = {

	int(min, max){
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	},

	array(arr){
		return arr[Random.int(0, arr.length - 1)];
	},

	uuId(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

}

let License = {

	async getLicenseTime(){

		let id = await License.getUuId();

		//Send data

		return Date.now() / 1000 + 60 * 60 * 24;
	},

	async getUuId(){

		let id = await Storage.get('uuid');

		if(!id){

			id = Random.uuId();

			await Storage.set('uuid', id);

		}

		return id;

	}

};

(async function() {

	//88V8LPnr:rtfGAPm8@195.133.57.67:64709

	let proxies = [
		{ip : '77.72.83.154', port : '64921', login : '88V8LPnr', password : 'rtfGAPm8'},
		{ip : '185.207.213.204', port : '64717', login : '88V8LPnr', password : 'rtfGAPm8'},
		{ip : '166.1.49.213', port : '62483', login : '88V8LPnr', password : 'rtfGAPm8'},
		{ip : '45.39.79.168', port : '62571', login : '88V8LPnr', password : 'rtfGAPm8'},
		{ip : '104.164.153.246', port : '63627', login : '88V8LPnr', password : 'rtfGAPm8'}
	];

	const domains = ["youtube.com", "googlevideo.com", "youtu.be", "ytimg.com"];

	let isEnabled = await Storage.get('enabled');

	function isDomainInList(url, domainList) {

		for (let domain of domainList) {

			if (url.indexOf(domain) >= 0) {
				return true;
			}

		}

		return false;
	}

	let cachedProxy = null, cachedTime = 0;
	function getCachedProxy(){

		if(!cachedProxy || cachedTime < Date.now() - 60 * 30 * 1000){
			cachedTime = Date.now();
			cachedProxy = Random.array(proxies);
		}

		return cachedProxy;

	}

	browser.proxy.onRequest.addListener(
		(details) => {
			if (isEnabled && isDomainInList(details.url, domains)) {

				let proxy = getCachedProxy();

				return {
					type: "socks",
					host: proxy.ip,
					port: proxy.port,
					username: proxy.login,
					password: proxy.password
				};
			} else {
				return {type: "direct"};
			}
		},
		{urls: ["<all_urls>"]}
	);

	/////////////////////////////

	/**
	 * Проверка лицензии
	 */
	setInterval(async () => {

		let license = await License.getLicenseTime();

		await Storage.set('has_license', (Date.now() / 1000) < license);

	}, 60 * 1000);

	/**
	 * Проверка на доступ к прокси
	 */
	setInterval(async () => {

		let details = await browser.proxy.settings.get({});

		if(details.levelOfControl !== 'controlled_by_this_extension' && details.levelOfControl !== 'controllable_by_this_extension'){
			await Storage.set('enabled', false);
			await Storage.set('error_war', true);
		}else{
			await Storage.set('error_war', false);
		}

	}, 1000);

	/**
	 * Меняем иконку
	 */
	browser.storage.onChanged.addListener(async () => {
		isEnabled = await Storage.get('enabled');
		browser.browserAction.setIcon({path: isEnabled ? 'icons/img-enabled.svg' : 'icons/img-disabled.svg'});
	});


	/**
	 * Действия при первичной установке
	 */
	if(!(await Storage.get('installed'))){
		await Storage.set('installed', true);
		await Storage.set('enabled', true);
		await Storage.set('has_license', true);
	}

})();