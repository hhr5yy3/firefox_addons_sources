
Object.defineProperty(window, 'GLOBAL_NONCE', {
	value: undefined
});

var LANG_PACKS = {};

var PATH = Object.create(null);
var PUBLIC_PATH = undefined;

if (false) {
	(function () {
		var publicPath = /publicPath=([^&]+)/.exec(location.search);

		if (publicPath != null) {
			PUBLIC_PATH = decodeURIComponent(publicPath[1]);
			PUBLIC_PATH = PUBLIC_PATH.replace(/\/+$/, '') + '/';
		}
	})();
}

try {
	PATH = new Proxy(PATH, {
		get: function (target, prop) {
			if (prop in target) {
				var v = target[prop];
				return typeof v === 'string' ? v : v.publicPath || v.path;
			}

			throw new ReferenceError('A resource by the path "' + prop + '" is not defined');
		}
	});
} catch (_) {}
PATH['error-init.standalone'] = 'touch_ES2018_ffa7873d_error-init.standalone.js';
PATH['rum-init.standalone'] = 'touch_ES2018_727165af_rum-init.standalone.js';
PATH['rum-opts.standalone'] = 'touch_ES2018_cdd51bc3_rum-opts.standalone.js';
PATH['std'] = 'touch_ES2018_834285ae_std.js';
PATH['sw.standalone'] = 'sw.standalone.js';
PATH['favicons'] = 'touch_ES2018_assets/f631394b_favicons';
PATH['p-root_style'] = 'touch_ES2018_9a558cf5_p-root_style.css';
PATH['p-root'] = 'touch_ES2018_1d782a27_p-root.js';
PATH['p-root_tpl'] = 'touch_ES2018_00b794e1_p-root_tpl.js';
PATH['vendor'] = 'touch_ES2018_1350a0ec_vendor.js';


if ('std_style' in PATH) {
	
(function () {
	var el = document.createElement('link');
	
	el.setAttribute('href', ((function () { function concatURLs(a, b) { return a ? a.replace(/[\\/]+$/, '') + '/' + b.replace(/^[\\/]+/, '') : b; } return concatURLs('', PATH['std_style']); })()));
	el.setAttribute('rel', 'stylesheet');
	document.head.appendChild(el);
})();

}
document.write(`<script src="touch_ES2018_cdd51bc3_rum-opts.standalone.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/84c8458e_rum-interface.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/a366408d_rum-longtask.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_727165af_rum-init.standalone.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/5e3d73ac_rum-send.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/5a7834d4_rum-implementation.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/b61bbd0a_rum-onload.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/7d078269_rum-scroll.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/02b2b439_error-i-over-rum.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/9f1f2200_error-implementation.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/4460a547_error-filters.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_lib/a82547bb_error-log-error.js"` + '><' + '/script>');document.write(`<script src="touch_ES2018_ffa7873d_error-init.standalone.js"` + '><' + '/script>');
function $__RENDER_ROOT() {
	
(function () {
	var el = document.body;
	el.setAttribute('data-cached-class-component-id', 'true');
	el.setAttribute('data-root-component', 'p-root');
})();



(function () {
	var el = document.createElement('link');
	
	el.setAttribute('href', ((function () { function concatURLs(a, b) { return a ? a.replace(/[\\/]+$/, '') + '/' + b.replace(/^[\\/]+/, '') : b; } return concatURLs('', PATH['p-root_style']); })()));
	el.setAttribute('rel', 'stylesheet');
	document.head.appendChild(el);
})();


if ('std' in PATH) {
	
(function () {
	var el = document.createElement('script');
	el.async = false;
	el.setAttribute('src', ((function () { function concatURLs(a, b) { return a ? a.replace(/[\\/]+$/, '') + '/' + b.replace(/^[\\/]+/, '') : b; } return concatURLs('', PATH['std']); })()));
	document.head.appendChild(el);
})();

}

(function () {
	var el = document.createElement('script');
	el.async = false;
	el.setAttribute('src', 'touch_ES2018_lib/538f6838_requestidlecallback.js');
	document.head.appendChild(el);
})();

(function () {
	var el = document.createElement('script');
	el.async = false;
	el.setAttribute('src', 'touch_ES2018_lib/86c41e01_eventemitter2.js');
	document.head.appendChild(el);
})();

(function () {
	var el = document.createElement('script');
	el.async = false;
	el.setAttribute('src', 'touch_ES2018_lib/58a2bd1e_vue.js');
	document.head.appendChild(el);
})();

if ('index-core' in PATH) {
	
(function () {
	var el = document.createElement('script');
	el.async = false;
	el.setAttribute('src', ((function () { function concatURLs(a, b) { return a ? a.replace(/[\\/]+$/, '') + '/' + b.replace(/^[\\/]+/, '') : b; } return concatURLs('', PATH['index-core']); })()));
	document.head.appendChild(el);
})();

}
if ('vendor' in PATH) {
	
(function () {
	var el = document.createElement('script');
	el.async = false;
	el.setAttribute('src', ((function () { function concatURLs(a, b) { return a ? a.replace(/[\\/]+$/, '') + '/' + b.replace(/^[\\/]+/, '') : b; } return concatURLs('', PATH['vendor']); })()));
	document.head.appendChild(el);
})();

}

(function () {
	var el = document.createElement('script');
	el.async = false;
	el.setAttribute('src', ((function () { function concatURLs(a, b) { return a ? a.replace(/[\\/]+$/, '') + '/' + b.replace(/^[\\/]+/, '') : b; } return concatURLs('', PATH['p-root_tpl']); })()));
	document.head.appendChild(el);
})();


(function () {
	var el = document.createElement('script');
	el.async = false;
	el.setAttribute('src', ((function () { function concatURLs(a, b) { return a ? a.replace(/[\\/]+$/, '') + '/' + b.replace(/^[\\/]+/, '') : b; } return concatURLs('', PATH['p-root']); })()));
	document.head.appendChild(el);
})();


}

