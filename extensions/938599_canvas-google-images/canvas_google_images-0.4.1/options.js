browser.storage.local.get({open_image_new_tab: true}, function (preferences){
	checkToggles(preferences);
})

function checkToggles(preferences)
{
	if(preferences.open_image_new_tab){
		document.getElementById('open_image_new_tab').setAttribute('checked', true);
	}

	document.getElementById('open_image_new_tab').addEventListener('click', function(e){
		browser.storage.local.set({'open_image_new_tab': e.target.checked}, function() {
        });
	})

	var translateStrings = document.getElementsByClassName('translate');
	for(var i = 0; i < translateStrings.length; i++)
	{
		translateStrings[i].innerHTML = browser.i18n.getMessage(translateStrings[i].getAttribute('data-translate-key'));
	}

}