"use strict";

function remove_decorative_tags(tags) {
    const tw = document.createTreeWalker(
	document.body,
	NodeFilter.SHOW_ELEMENT,
	{
	    acceptNode: node => {
		return tags.includes(node.tagName) ?
		    NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	    }
	},
	false
    );

    let nodes = [];
    while (tw.nextNode()) {
	nodes.push(tw.currentNode);
    }

    for (let node of nodes) {
	if (node.style.display == "none"
	    || node.style.visibility == "collapse"
	    || node.style.visibility == "hidden") {
	    node.remove();
	}
	if (node.parentNode) {
	    let parent = node.parentNode;
	    node.replaceWith(...node.childNodes);
	    parent.normalize();
	}
    }
}


