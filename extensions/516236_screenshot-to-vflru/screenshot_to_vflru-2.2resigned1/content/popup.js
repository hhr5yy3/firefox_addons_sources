var vflscrsh = {};
vflscrsh.action_canceled = false;

//------------------------------------------------------------------------------
vflscrsh.init_0 = function() {
	chrome.runtime.sendMessage({ action_check_mhtml : true }, function(response) {
		if (response && response.saveAsMHTML) {
		} else {
			document.getElementById('vflscrsh_save_mhtml_block').style.display = 'none';
		}
		vflscrsh.init_pre();
	});
}
//------------------------------------------------------------------------------
vflscrsh.init_pre = function() {
	document.getElementById('vflscrsh_save_visible_portion').addEventListener("click", function() { vflscrsh.action('save', 'visible_portion'); });
	document.getElementById('vflscrsh_save_mhtml_visible_portion').addEventListener("click", function() { vflscrsh.action('save_mhtml', 'visible_portion'); });
	document.getElementById('vflscrsh_copy_visible_portion').addEventListener("click", function() { vflscrsh.action('copy', 'visible_portion'); });
	document.getElementById('vflscrsh_upload_visible_portion').addEventListener("click", function() { vflscrsh.action('upload', 'visible_portion'); });
	document.getElementById('vflscrsh_preview_visible_portion').addEventListener("click", function() { vflscrsh.action('preview', 'visible_portion'); });
	document.getElementById('vflscrsh_settings').addEventListener("click", vflscrsh.open_options_window);

	document.getElementById('vflscrsh_action_prepare_cancel').addEventListener("click", function() { vflscrsh.prepare_cancel(); });

	setTimeout(function(){ vflscrsh.utils.i18n_parse(document); }, 100);
	vflscrsh.init();
	//------------------------------------------------------------------------
	if (vflscrsh.utils.clipboard_image_not_copy()) {
		document.getElementById('vflscrsh_copy_block').style.display = 'none';
	}
}
//------------------------------------------------------------------------------
vflscrsh.init = function() {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		var tab = tabs[0];
		chrome.tabs.executeScript(tab.id, { 'file': '/content/check_tab.js', 'runAt' : 'document_start' }, function(callback) {
			var last_operation = vflscrsh.utils.prefs_get('last_operation');
			var last_operation_inactive = false;
			//-----------------------------------------------------------
			if (chrome.runtime.lastError) {
				document.getElementById('vflscrsh_save_page').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_save_page_force').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_save_selection').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_save_mhtml_page').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_save_mhtml_page_force').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_save_mhtml_selection').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_copy_page').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_copy_page_force').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_copy_selection').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_upload_page').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_upload_page_force').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_upload_selection').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_preview_page').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_preview_page_force').setAttribute('is_inactive', true);
				document.getElementById('vflscrsh_preview_selection').setAttribute('is_inactive', true);
				last_operation_inactive = true;
			}
			//-----------------------------------------------------------
			else {
				document.getElementById('vflscrsh_save_page').addEventListener("click", function() { vflscrsh.action('save', 'page'); });
				document.getElementById('vflscrsh_save_page_force').addEventListener("click", function() { vflscrsh.action('save', 'page_force'); });
				document.getElementById('vflscrsh_save_selection').addEventListener("click", function() { vflscrsh.action('save', 'selection'); });
				document.getElementById('vflscrsh_save_mhtml_page').addEventListener("click", function() { vflscrsh.action('save_mhtml', 'page'); });
				document.getElementById('vflscrsh_save_mhtml_page_force').addEventListener("click", function() { vflscrsh.action('save_mhtml', 'page_force'); });
				document.getElementById('vflscrsh_save_mhtml_selection').addEventListener("click", function() { vflscrsh.action('save_mhtml', 'selection'); });
				document.getElementById('vflscrsh_copy_page').addEventListener("click", function() { vflscrsh.action('copy', 'page'); });
				document.getElementById('vflscrsh_copy_page_force').addEventListener("click", function() { vflscrsh.action('copy', 'page_force'); });
				document.getElementById('vflscrsh_copy_selection').addEventListener("click", function() { vflscrsh.action('copy', 'selection'); });
				document.getElementById('vflscrsh_upload_page').addEventListener("click", function() { vflscrsh.action('upload', 'page'); });
				document.getElementById('vflscrsh_upload_page_force').addEventListener("click", function() { vflscrsh.action('upload', 'page_force'); });
				document.getElementById('vflscrsh_upload_selection').addEventListener("click", function() { vflscrsh.action('upload', 'selection'); });
				document.getElementById('vflscrsh_preview_page').addEventListener("click", function() { vflscrsh.action('preview', 'page'); });
				document.getElementById('vflscrsh_preview_page_force').addEventListener("click", function() { vflscrsh.action('preview', 'page_force'); });
				document.getElementById('vflscrsh_preview_selection').addEventListener("click", function() { vflscrsh.action('preview', 'selection'); });
			}
			//-----------------------------------------------------------
			if (last_operation_inactive && (last_operation.target != 'visible_portion')) {
				document.getElementById('vflscrsh_last_operation').setAttribute('is_inactive', true);
			} else {
				document.getElementById('vflscrsh_last_operation').addEventListener("click", function() { vflscrsh.action(last_operation.method, last_operation.target); });
			}
			//-----------------------------------------------------------
			vflscrsh.utils.HTMLDOM_value(document.getElementById('vflscrsh_last_operation_method'), vflscrsh.utils.get_string(last_operation.method + '_operation'));
			vflscrsh.utils.HTMLDOM_value(document.getElementById('vflscrsh_last_operation_target'), vflscrsh.utils.get_string(last_operation.target));

			//-----------------------------------------------------------
			//-----------------------------------------------------------
			var buttonClickIconGeneral = vflscrsh.utils.prefs_get('buttonClickIconGeneral');
			var buttonClickIconAdditional = vflscrsh.utils.prefs_get('buttonClickIconAdditional');
			if (buttonClickIconGeneral != 'menu') {
				var run_action = true;
				if (last_operation_inactive && (buttonClickIconAdditional != 'visible_portion')) {
					run_action = false;
				}
				if (run_action) {
					vflscrsh.action(buttonClickIconGeneral, buttonClickIconAdditional);
				}
			}
			//-----------------------------------------------------------
			if (vflscrsh.utils.prefs_get('uploadDisable')) {
				document.getElementById('vflscrsh_upload_block').style.display = 'none';
			}
			//-----------------------------------------------------------
			if (vflscrsh.utils.prefs_get('onlyPageForce')) {
				document.getElementById('vflscrsh_save_page').style.display = 'none';
				document.getElementById('vflscrsh_save_mhtml_page').style.display = 'none';
				document.getElementById('vflscrsh_copy_page').style.display = 'none';
				document.getElementById('vflscrsh_upload_page').style.display = 'none';
				document.getElementById('vflscrsh_preview_page').style.display = 'none';
			}
		});
	});
}
//------------------------------------------------------------------------------
vflscrsh.action = function(method, target) {
	vflscrsh.action_canceled = false;
	chrome.runtime.sendMessage({ 'action' : 'capture', 'method' : method, 'target' : target }, function(response) {
		chrome.runtime.sendMessage({ 'action_prefs_set' : true, 'pref_name' : 'last_operation', 'pref_value' : { 'method' : method, 'target' : target } }, function(response) {});
		if ((target !== 'page') && (target !== 'page_force')) {
			window.close();
		}
	});
}
//------------------------------------------------------------------------------
vflscrsh.prepare_cancel = function() {
	chrome.runtime.sendMessage({ 'action' : 'capture_cancel' }, function(response) {});
	vflscrsh.action_canceled = true;
	vflscrsh.prepare_end_text();
}
//------------------------------------------------------------------------------
vflscrsh.prepare_start_text = function() {
	document.getElementById('vflscrsh_action_list').setAttribute('is_hidden', true);
	document.getElementById('vflscrsh_action_prepare').removeAttribute('is_hidden');
	document.getElementById('vflscrsh_action_prepare_percent').textContent = '0%';
}
//------------------------------------------------------------------------------
vflscrsh.prepare_end_text = function() {
	document.getElementById('vflscrsh_action_list').removeAttribute('is_hidden');
	document.getElementById('vflscrsh_action_prepare').setAttribute('is_hidden', true);
}
//------------------------------------------------------------------------------
vflscrsh.open_options_window = function() {
	chrome.runtime.openOptionsPage();
	window.close();
}
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//------------------------------------------------------------------
		if (! request) { return; }
		if (! request.action) { return; }

		//------------------------------------------------------------------
		if (request.action == 'capture_page_start') {
			vflscrsh.prepare_start_text();
		}
		//------------------------------------------------------------------
		else if ((request.action == 'capture_page') || (request.action == 'capture_page_drawWindow')) {
			if (! vflscrsh.action_canceled) {
				vflscrsh.prepare_start_text();
				document.getElementById('vflscrsh_action_prepare_percent').textContent = parseInt(request.complete * 100) + '%';
			}
		}
		//------------------------------------------------------------------
		else if (request.action == 'capture_page_end') {
			window.close();
		}
	}
);
//------------------------------------------------------------------------------
window.addEventListener("load", vflscrsh.init_0);
