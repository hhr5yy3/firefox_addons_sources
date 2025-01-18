var GL_FOX = typeof InstallTrigger !== 'undefined';
var GL_CHR = !GL_FOX;
var GL_BROWSER = GL_CHR ? 1 : (GL_FOX ? 2 : 0);

var cnf = {
	serverUrl: 'https://www.mywebook.com',
	dlogEnabled: '0',
	devMode: '0',
	timerInterval: 2000
};
if (cnf.serverUrl.substring(0, 2) === '@@') cnf.serverUrl = 'http://127.0.0.1/mwb';
if (cnf.dlogEnabled.substring(0, 2) === '@@') cnf.dlogEnabled = '1';
if (cnf.devMode.substring(0, 2) === '@@') cnf.devMode = '1';

function dlog(a, b) {
	if (cnf.dlogEnabled !== '1') return;
	chrome.runtime.sendMessage({
		action: 'dlog',
		a: a,
		b: b
	}, function (res) {
	});
}

function zzok(resp) {
	return resp && resp.status === 'OK';
}

function zzer(resp) {
	return resp && resp.status === 'ERROR';
}

