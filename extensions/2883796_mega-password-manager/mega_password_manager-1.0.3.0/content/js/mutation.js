/**
 * Observes DOM mutations and handles the addition of new nodes.
 * @param {MutationRecord[]} mutations - Mutation records provided by the observer.
 * @param {MutationObserver} observer - The observer instance.
 * @returns {void}
 */
function handleMutations(mutations, observer) {
    "use strict";

    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.nodeName === 'FORM' || node.querySelector('form')) {
                    checkForPasswordField(node);
                    observeNode(node);
                }
                if (node.nodeName === 'INPUT' || node.querySelector('input')) {
                    checkForPasswordField(node.parentElement);
                }
            }
        }
        for (const node of mutation.removedNodes) {
            // If mega pm container is removed, try put it back
            if (node.nodeType === Node.ELEMENT_NODE &&
                node.classList.contains('mega-pm-container') &&
                !document.contains(node)) {
                const input = mutation.target.querySelector(`input[data-input-link="${node.dataset.inputLink}"]`);
                if (input) {
                    createContainer(input);
                }
            }
        }
    }
    setTimeout(() => {
        if (specialWebsite) {
            if (specialWebsite.observerInitiator) {
                watchClick(specialWebsite.observerInitiator, specialWebsite.observerInitiatorWatcher);
            }
            if (typeof specialWebsite.watchAllTime === 'undefined') {
                observer.disconnect();
            }
        }
    }, 2000);
}

function handleAttributeChange(mutations, observer) {
    "use strict";

    for (const mutation of mutations) {
        if (mutation.attributeName === 'disabled' ||
            mutation.attributeName === 'aria-required' ||
            mutation.attributeName === 'aria-hidden') {
            checkForPasswordField(mutation.target.parentElement);
            observer.disconnect();
            return;
        }
    }
}

/**
 * Initializes observation on a specified DOM node.
 * @param {Element} node - The node to observe.
 * @returns {void}
 */
function observeNode(node) {
    "use strict";

    if (!node || !node.nodeType) {
        return;
    }
    const observer = new MutationObserver(handleMutations);
    observer.observe(node, {childList: true, subtree: true});
}

function observeAttributes(node) {
    "use strict";

    if (!node || !node.nodeType) {
        return;
    }
    const observer = new MutationObserver(handleAttributeChange);
    observer.observe(node, {attributes: true});
}

function watchTreatedInputs(node) {
    "use strict";

    if (!node || !node.nodeType || node.observer) {
        return;
    }

    node.observer = new MutationObserver((mutations) => {
        const targets = new Set();
        for (const mutation of mutations) {
            targets.add(mutation.target);
        }

        for (const target of targets) {
            reCalcIcon(target);
            if (!specialWebsite || !specialWebsite.keepWatchTreatedInputs) {
                node.observer.disconnect();
            }
        }

    });
    node.observer.observe(node, {attributes: true});
}
