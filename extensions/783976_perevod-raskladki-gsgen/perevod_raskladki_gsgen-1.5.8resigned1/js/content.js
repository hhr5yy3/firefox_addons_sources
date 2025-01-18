(function (chrome) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {		
		var div_modal = document.createElement('div');
		div_modal.id = "gs_main_modal";
		div_modal.className = "gs_main_modal";
		var div_modal_alert = document.createElement('div');
		div_modal_alert.className = "gs_modal gs_modal_alert";
		var div_modal_title = document.createElement('div');
		div_modal_title.className = "gs_modal_title";
		div_modal_title.textContent = chrome.i18n.getMessage('modal_title');
		var div_modal_close_btn = document.createElement('span');
		div_modal_close_btn.id = "gs_close_button";
		div_modal_close_btn.className = "gs_close_button";
		div_modal_close_btn.textContent = String.fromCharCode(215);
		div_modal_title.appendChild(div_modal_close_btn);
		var div_modal_content = document.createElement('div');
		div_modal_content.className = "gs_modal_content";
		var content_row_text = document.createElement('div');
		content_row_text.className = "gs_row_text";
		content_row_text.textContent = request.result_text;
		var ok_btn =  document.createElement('input');
		ok_btn.type = "button";
		ok_btn.id = "gs_ok_button";
		ok_btn.value = "OK";
		var content_row_btn = document.createElement('div');
		content_row_btn.className = "gs_row_btn";
		content_row_btn.appendChild(ok_btn);
		div_modal_content.appendChild(content_row_text);
		div_modal_content.appendChild(content_row_btn);
		div_modal_alert.appendChild(div_modal_title);
		div_modal_alert.appendChild(div_modal_content);
		div_modal.appendChild(div_modal_alert);
		document.body.appendChild(div_modal);
		modal = document.getElementById('gs_main_modal');
		modal_close_btn = document.getElementById('gs_close_button');
		modal_close_btn.addEventListener('click', function(event) {
			document.body.removeChild(div_modal);
		});
		modal_ok_btn = document.getElementById('gs_ok_button');
		modal_ok_btn.addEventListener('click', function(event) {
			document.body.removeChild(div_modal);
		});
		// sendResponse({alert_text: "good"});
	});
})(chrome);