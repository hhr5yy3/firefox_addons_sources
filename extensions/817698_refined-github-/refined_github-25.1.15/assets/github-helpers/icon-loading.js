import React from '../npm/dom-chef.js';

function LoadingIcon() {
	return (
		React.createElement('img', {
			className: "rgh-loading-icon",
			src: "https://github.githubassets.com/images/spinners/octocat-spinner-128.gif",
			width: "18",}
		)
	);
}

export { LoadingIcon as default };
