function localize(){
	
	document.getElementById('buttonProvide').innerHTML = browser.i18n.getMessage('buttonProvide');
	document.getElementById('buttonRetrieve').innerHTML = browser.i18n.getMessage('buttonRetrieve');

}

function restore_options() {

	//Dont use default value
	browser.storage.local.get(

	'csserver'
	
	, function(items) {

		//Redirect user to options page, if no csserver is defined
		if(!items.csserver || items.csserver.length < 1){
			window.location.href = 'options.html';
		}else{
			changeLinks(items.csserver);
		}

	});

}

function changeLinks(csserver){

	document.getElementById('buttonProvide').href = csserver + 'Upload1';
	document.getElementById('buttonRetrieve').href = csserver + 'download1.php';

}

function init(){

	localize();

	restore_options();
	
}

document.addEventListener('DOMContentLoaded', init());
