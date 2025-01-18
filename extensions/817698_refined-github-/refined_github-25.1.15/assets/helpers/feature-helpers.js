const shortcutMap = new Map();

const getFeatureID = (url) => url.split('/').pop().split('.')[0] ;












function getIdentifiers(url) {
	const id = getFeatureID(url);
	return {
		id,
		class: 'rgh-' + id,
		selector: '.rgh-' + id,
	};
}

function noop() {}

const httpLog = console.log.bind(console, '🌏');

const log = {
	info: console.log,
	http: httpLog,
	setup({logging, logHTTP}) {
		log.info = logging ? console.log : noop;
		log.http = logHTTP ? httpLog : noop;
	},
};

let _isInitialLoad = true;

function isInitialLoad() {
	return _isInitialLoad;
}

function markAjaxedLoad() {
	_isInitialLoad = false;
}

function listenToAjaxedLoad() {
	document.addEventListener('soft-nav:start', markAjaxedLoad, {once: true});
	document.addEventListener('pjax:start', markAjaxedLoad, {once: true});
}

export { getFeatureID, getIdentifiers, isInitialLoad, listenToAjaxedLoad, log, markAjaxedLoad, shortcutMap };
