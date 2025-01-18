const clearHTML = node => {
	if (node instanceof HTMLElement) {
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
};

const addHTML = (node, operation, html) => {
	if (node instanceof HTMLElement) {
		let newNode = new DOMParser().parseFromString(html, 'text/html');
		const nodeElements = Array.from(newNode.body.children);
		const operationWrapper = () => {
			if (operation === 'append') return nodeEle => node.append(nodeEle);
			if (operation === 'prepend') return nodeEle => node.prepend(nodeEle);
			if (operation === 'after') return nodeEle => node.after(nodeEle);
		};
		const currentOperation = operationWrapper();
		nodeElements.forEach(childNode => currentOperation(childNode));
	}
};