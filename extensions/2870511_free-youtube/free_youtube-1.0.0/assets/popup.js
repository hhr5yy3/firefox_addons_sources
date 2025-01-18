let Storage = {
	async get(key){

		let result = await browser.storage.local.get(key);

		return result[key];

	},
	async set(key, value){
		await browser.storage.local.set({ [key] : value });
	}
};


(async function(){

	async function updateError(){

		let error = document.getElementById('error');

		if(await Storage.get('error_war')){
			error.style.display = 'block';
		}else{
			error.style.display = 'none';
		}

	}

	async function updateView(){

		let wrap = document.getElementById('wrap');

		if(await Storage.get('enabled')){
			wrap.classList.remove('wrap--disabled');
			wrap.classList.add('wrap--enabled');
		}else{
			wrap.classList.add('wrap--disabled');
			wrap.classList.remove('wrap--enabled');
		}

		let license = await Storage.get('has_license');

		document.getElementById('trial').style.display = license ? 'none' : 'block';

	}


	document.getElementById('off').onclick = async function(e){

		e.preventDefault();

		await Storage.set('enabled', false);

	}

	document.getElementById('on').onclick = async function(e){

		e.preventDefault();

		await Storage.set('enabled', true);

	}

	await updateView();
	await updateError();

	browser.storage.onChanged.addListener(updateView);
	setInterval(updateError, 1000);

})();