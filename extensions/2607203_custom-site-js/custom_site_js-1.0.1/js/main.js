var csj = {
	debug: false,
	scriptDetails: { used: 20, scripts: {} },
	firefox: navigator.userAgent.indexOf('Firefox') > -1,
	scriptCode: '',
	scriptId: '',
	
	init: function(){
		if (csj.firefox) $('html').addClass('firefox');
		csj.storage.loadDetail(function(){
			csj.list.init();
			csj.list.load();
			$('.views .usage > span').text(csj.storage.calcUsed());
			$('.views').removeClass('loading');
			csj.addEvents();
		});
		if (csj.debug) $('#main').append('<div id="logData">!</div>');
	},
	
	addEvents: function(){
		$('.view.list select').off('change').on('change', csj.list.selected);
		$('.showHelp').off('click').on('click', csj.help.load);
		$('.view.list .add').off('click').on('click', csj.add.load);
		$('.view.list .edit').off('click').on('click', csj.edit.load);
		$('.view.list .delete').off('click').on('click', csj.del.load);
		$('.view .cancel').off('click').on('click', csj.list.load);
		$('.view.form .add').off('click').on('click', csj.add.commit);
		$('.view.form .save').off('click').on('click', csj.edit.commit);
		$('.view.form .delete').off('click').on('click', csj.del.commit);
		$('.view.form .name, .view.form .url, .view.form .code').off('blur').on('blur', csj.form.valid);
		$('#logData').off('click').on('click', function(){ csj.log(csj.scriptDetails); });
	},
	
	storage: {
		loadDetail: function(callback){ 
			chrome.storage.local.get('csjDetails', function(data){ 
				csj.storage.parseDetail(data, callback);
			}); 
		},
		parseDetail: function(data, callback){
			if (typeof(data.csjDetails) === 'undefined') csj.storage.save(function(){ 
				$('.views').removeClass('loading');
				csj.list.load(); 
				if (typeof(callback) === 'function') callback(csj.scriptDetails);
			});
			else {
				csj.scriptDetails = data.csjDetails;
				if (typeof(callback) === 'function') callback(csj.scriptDetails);
			}
		},
		
		loadCode: function(callback, params){ 
			if (csj.scriptId !== ''){
				chrome.storage.local.get('csj-' + csj.scriptId, function(data){ 
					csj.storage.parseCode(data, callback, params); 
				});
			} else {
				csj.scriptCode = '';
				if (typeof(callback) === 'function') callback(csj.scriptCode, params);
			}
		},
		parseCode: function(data, callback, params){
			csj.scriptCode = (typeof(data['csj-' + csj.scriptId]) !== 'undefined') ? data['csj-' + csj.scriptId] : '';
			if (typeof(callback) === 'function') callback(csj.scriptCode, params);
		},
		
		calcUsed: function(){
			csj.scriptDetails.used = JSON.stringify(csj.scriptDetails).length;
			for (var id in csj.scriptDetails.scripts) csj.scriptDetails.used += csj.scriptDetails.scripts[id].used;
			
			return csj.scriptDetails.used;
		},
		
		save: function(callback){
			csj.storage.calcUsed();
			
			var data = { csjDetails: csj.scriptDetails };
			if (csj.scriptId !== ''){
				if (typeof(csj.scriptDetails.scripts[csj.scriptId]) === 'undefined') chrome.storage.local.remove('csj-' + csj.scriptId);
				else if (csj.scriptCode !== '') data['csj-' + csj.scriptId] = csj.scriptCode;
			}
			
			chrome.storage.local.set(data, function(){ if (typeof(callback) === 'function') callback(); });
		}
	},
	
	list: {
		init: function(){
			var ids = Object.keys(csj.scriptDetails.scripts).sort(function(a, b){ return (csj.scriptDetails.scripts[a].name === csj.scriptDetails.scripts[b].name) ? 0 : ((csj.scriptDetails.scripts[a].name < csj.scriptDetails.scripts[b].name) ? -1 : 1); });
			for (var idx = 0; idx < ids.length; idx++) $('.view.list select').append('<option value="' + ids[idx] + '">' + ((csj.scriptDetails.scripts[ids[idx]].skip) ? '[skip] ' : '') + csj.scriptDetails.scripts[ids[idx]].name + '</option>');
		},
		load: function(){ $('.views').removeClass('helping adding editing deleting').addClass('listing'); },
		selected: function(){
			var oldScriptId = csj.scriptId;
			csj.scriptId = $('.view.list select').val();
			if (csj.scriptId != oldScriptId) csj.scriptCode = '';
			(csj.scriptId === '') ? $('.view.list button.edit, .view.list button.delete').addClass('disabled') : $('.view.list button.edit, .view.list button.delete').removeClass('disabled');
		}
	},
	
	help: {
		load: function(){
			$('.views').removeClass('listing editing deleting').addClass('helping');
		}
	},
	
	add: {
		load: function(){
			$('.view.list select').val($('.view.list select option').eq(0).val());
			csj.list.selected();
			csj.form.populate({ load: false });
			$('.views').removeClass('helping listing editing deleting').addClass('adding');
		},
		commit: function(){
			if (!csj.form.valid(true)) return;
			
			var form = csj.form.getInput();
			csj.scriptId = csj.generateId();
			csj.scriptCode = form.code;
			csj.scriptDetails.scripts[csj.scriptId] = {};
			for (var key in { name: true, skip: true, url: true, regex: true }) csj.scriptDetails.scripts[csj.scriptId][key] = form[key];
			csj.scriptDetails.scripts[csj.scriptId].used = csj.scriptCode.length;
			
			$('.view.list select').append('<option value="' + csj.scriptId + '">' + form.name + '</option>');
			$('.view.list select').val(csj.scriptId);
			$('.views .usage > span').text(csj.storage.calcUsed());
			csj.list.selected();
			csj.storage.save();
			csj.list.load();
		}
	},
	
	edit: {
		load: function(){
			if (csj.scriptId === '' || $('.view.list .edit').hasClass('disabled')) return;
			
			csj.form.populate({ load: true });
			$('.views').removeClass('helping listing adding deleting').addClass('editing');
		},
		commit: function(){
			if (!csj.form.valid(true)) return;
			
			var form = csj.form.getInput();
			$('option[value="' + csj.scriptId + '"]').text(((form.skip) ? '[skip] ' : '') + form.name);
			
			csj.scriptCode = form.code;
			csj.scriptDetails.scripts[csj.scriptId] = {};
			for (var key in { name: true, skip: true, url: true, regex: true }) csj.scriptDetails.scripts[csj.scriptId][key] = form[key];
			csj.scriptDetails.scripts[csj.scriptId].used = csj.scriptCode.length;
			
			$('.views .usage > span').text(csj.storage.calcUsed());
			
			csj.storage.save();
			csj.list.load();
		}
	},
	
	del: {
		load: function(){
			if (csj.scriptId === '' || $('.view.list .delete').hasClass('disabled')) return;
			
			csj.form.populate({ load: true, disabled: true });
			$('.views').removeClass('helping listing adding editing').addClass('deleting');
		},
		commit: function(){
			delete csj.scriptDetails.scripts[csj.scriptId];
			csj.storage.save();
			
			$('.views .usage > span').text(csj.storage.calcUsed());
			$('.view.list select').html('<option value="">---- select one ----</option>');
			csj.list.selected();
			csj.list.init();
			csj.list.load();
		}
	},
	
	form: {
		populate: function(params){
			if (typeof(params) !== 'object') params = {};
			var script = (!params.load || csj.scriptId === '') ? { name: '', skip: false, url: '', regex: false } : csj.scriptDetails.scripts[csj.scriptId];
			
			$('.form .code').css({ width: '293px', height: '200px' }).prop('disabled', true).val('Loading, Please Wait ...');
			csj.storage.loadCode(csj.form.populateCode, params);
			
			$('.form .name').val(script.name);
			$('.form .skip').prop('checked', script.skip);
			$('.form .url').val(script.url);
			$('.form .regex').prop('checked', script.regex);
			$('.form .name, .form .skip, .form .url, .form .regex').prop('disabled', (!!params.disabled));
			$('.view.form').removeClass('error');
			$('.view.form .errorMessage').text('');
		},
		populateCode: function(code, params){
			if (typeof(params) !== 'object') params = {};
			$('.form .code').prop('disabled', (!!params.disabled)).val(code);
		},
		getInput: function(){
			return {
				name: $('.view.form .name').val().trim().substr(0,30),
				skip: $('.view.form .skip').prop('checked'),
				url: $('.view.form .url').val().trim(),
				regex: $('.view.form .regex').prop('checked'),
				code: $('.view.form .code').val().trim()
			};
		},
		clearErrors: function(){ $('.view.form').removeClass('error'); return true; },
		valid: function(submitted){
			submitted = (typeof(submitted) === 'boolean' && submitted);
			var errors = [];
			var form = csj.form.getInput();
			
			if (submitted || form.name !== ''){
				if (form.name.match(/[a-z]/i) == null) errors.push('Name must have at least one letter');
				if (form.name.match(/[^0-9a-z~`\!@#\$%\^&\*\(\)_\+\-=\{\}\|\[\]\\:;<>\?,\.\/ ]/i) != null) errors.push('Name has invalid characters');
			}
			
			if (submitted || form.url !== ''){
				if (form.url.match(/[0-9a-z~`\!@#\$%\^&\*\(\)_\+\-=\{\}\|\[\]\\:;"'<>\?,\.\/]/i) == null) errors.push('URL is blank - to match all urls use *');
				else if (form.url.match(/[^0-9a-z~`\!@#\$%\^&\*\(\)_\+\-=\{\}\|\[\]\\:;"'<>\?,\.\/ ]/i) != null) errors.push('URL has invalid characters');
			}
		
			if (submitted || form.code !== ''){
				if (form.code.match(/[0-9a-z~`\!@#\$%\^&\*\(\)_\+\-=\{\}\|\[\]\\:;"'<>\?,\.\/]/i) == null) errors.push('Script missing executable code');
				else try{ new Function(form.code); } catch(e){ if (e instanceof SyntaxError) errors.push('Script has syntax errors'); }
			}
			
			if (errors.length === 0) return csj.form.clearErrors();
			else {
				$('.view.form').addClass('error');
				$('.view.form .errorMessage').html('<h4>Errors:</h4><ul><li>' + errors.join('</li><li>') + '</li></ul>');
				return false;
			}
		}
	},
	
	generateId: function(){ return 'id' + parseInt(Math.random() * 1000000000000); },
	
	log: function(msg){ if (csj.debug) chrome.tabs.executeScript({ code: "console.log('" + ((typeof(msg) === 'string') ? msg.replace(/'/g, "\\'") : JSON.stringify(msg)).replace(/'/g, "\\'") + "');" }); }
};
$(csj.init);
