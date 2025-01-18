import React from '../npm/dom-chef.js';

function TimelineItemOld() {
	// Classes copied from #issuecomment-new + mt-3 added
	return React.createElement('div', { className: "ml-0 pl-0 ml-md-6 pl-md-3 mt-3"    ,} );
}

// https://github.com/refined-github/refined-github/pull/8141
function TimelineItem() {
	return React.createElement('div', { className: "my-2",} );
}

export { TimelineItem, TimelineItemOld };
