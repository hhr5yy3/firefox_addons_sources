var script = function(js) {
	var s = document.createElement('script');
	s.src = browser.extension.getURL(js);
	s.onload = function() {
		this.parentNode.removeChild(this)
	};
	return s;
};
document.documentElement
	.appendChild(script('sha256.js'))
	.appendChild(script('xmldsig.js'))
	.appendChild(script('api.js'));


