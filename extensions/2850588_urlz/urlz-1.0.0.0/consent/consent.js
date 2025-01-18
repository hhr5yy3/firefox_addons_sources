document.getElementById('accept').addEventListener('click', function(){
    // We have consent from the user
    clear();
    window.parent.postMessage({ action: 'acknowledge_consent_dialog', state: true }, '*');
});

document.getElementById('reject').addEventListener('click', function(){
	// No approval from user, uninstall
	clear();
    window.parent.postMessage({ action: 'acknowledge_consent_dialog', state: false }, '*');
});

function clear(){
    document.getElementById('modal').style.display = 'none';
}
