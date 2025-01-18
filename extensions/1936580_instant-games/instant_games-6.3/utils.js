/*** Functions to Detect when element exists - Once ***/
function rafAsync() {
	return new Promise(resolve => {
		requestAnimationFrame(resolve); //faster than set time out
	});
}
function checkElement(selector) {
	if (document.querySelector(selector) === null) {
		return rafAsync().then(() => checkElement(selector));
	} else {
		return Promise.resolve(true);
	}
}

/*** Functions to Detect when element exists - Allways ***/
const awaitSelector = (selector, rootNode, fallbackDelay) => new Promise((resolve, reject) => {
	try {
		const root = rootNode || document
		const ObserverClass = MutationObserver || WebKitMutationObserver || null
		const mutationObserverSupported = typeof ObserverClass === 'function'
		let observer
		const stopWatching = () => {
			if (observer) {
				if (mutationObserverSupported) {
					observer.disconnect()
				} else {
					clearInterval(observer)
				}
				observer = null
			}
		}
		const findAndResolveElements = () => {
			const allElements = root.querySelectorAll(selector)
			if (allElements.length === 0) return
			const newElements = []
			const attributeForBypassing = 'data-awaitselector-resolved'
			allElements.forEach((el, i) => {
				if (typeof el[attributeForBypassing] === 'undefined') {
					allElements[i][attributeForBypassing] = ''
					newElements.push(allElements[i])
				}
			})
			if (newElements.length > 0) {
				stopWatching()
				resolve(newElements)
			}
		}
		if (mutationObserverSupported) {
			observer = new ObserverClass(mutationRecords => {
				const nodesWereAdded = mutationRecords.reduce(
					(found, record) => found || (record.addedNodes && record.addedNodes.length > 0),
					false
				)
				if (nodesWereAdded) {
					findAndResolveElements()
				}
			})
			observer.observe(root, {
				childList: true,
				subtree: true,
			})
		} else {
			observer = setInterval(findAndResolveElements, fallbackDelay || 250)
		}
		findAndResolveElements()
	} catch (exception) {
		reject(exception)
	}
})
const watchAwaitSelector = (callback, selector, rootNode, fallbackDelay) => {
	(function awaiter(continueWatching = true) {
		if (continueWatching === false) return
		awaitSelector(selector, rootNode, fallbackDelay)
			.then(callback)
			.then(awaiter)
	}())
}

/*** Functions to Detect when Style changes ***/
const watchAwaitStyleSelector = (targetNode, callback) => {
	if(document.querySelector(targetNode) == null) return;
		
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		if(mutation.attributeName === 'style'){
			callback();
		}
	  });
	});

	// Notify me of style changes
	var observerConfig = {
		attributes: true, 
	  attributeFilter: ["style"]
	};

	observer.observe(document.querySelector(targetNode), observerConfig);
}

/*** Material Design ***/
function startTemporaryDrawer(){
	/* Activate button icons */
	const buttons = document.querySelectorAll('.mdc-icon-button');
	if(buttons){
		buttons.forEach(function(button) {
		  const iconButtonRipple = mdc.ripple.MDCRipple.attachTo(button);
		  iconButtonRipple.unbounded = true;
		});
	}
	const switchs = document.querySelectorAll('.mdc-switch');
	if(switchs){
		switchs.forEach(function(swt) {
		  const switchControl = mdc.switchControl.MDCSwitch.attachTo(swt);
		});
	}
	/* Activa o TemporaryDrawer */	  
	var drawerEl = document.querySelector('.mdc-drawer');
	if(drawerEl){
		var drawer = mdc.drawer.MDCDrawer.attachTo(drawerEl);
		document.querySelector('#temporaryDrawer').addEventListener('click', function() {
			drawer.open = !drawer.open;
		});
	}
}

function showTemporaryDrawer(show){
	/* Activa o TemporaryDrawer */	  
	var drawerEl = document.querySelector('.mdc-drawer');
	if(drawerEl){
		var drawer = mdc.drawer.MDCDrawer.attachTo(drawerEl);
		if(show) drawer.open = true;
		else drawer.open = false;
	}
}

/*** Save Functions ***/
function SaveToDisk(fileURL, fileName, target) {
	var link = document.createElement("a");
	link.download = fileName;
	link.href = fileURL;
	if(target != null) link.target = "_blank";
	link.click();
	link.remove();
}

function SaveToDiskBlob(fileURL, fileName) {
	  fetch(fileURL)
	  .then(function(response) {
		return response.blob()
	  })
	  .then(function(blob) {
		  if(fileName == null){
			  window.saveAs(blob); 
		  } else {
			  window.saveAs(blob, fileName); 
		  }
	  });
}

/*** Scroll to Top - Bottom ***/
$(window).scroll(function () {
	if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
		$('#return-to-top').fadeIn(200);    // Fade in the arrow
	} else {
		$('#return-to-top').fadeOut(200);   // Else fade out the arrow
	}
});
function clickReturnToTop() {    // When arrow is clicked
	$('body,html').animate({
		scrollTop: 0                       // Scroll to top of body
	}, 500);
}

function scrollToBottom() {
	var divTop = $('#viewport').height();
	$('html, body').animate({ scrollTop: divTop }, 'slow');
}

function scrollToTop(delay) {
	if(delay != undefined){
		$('html, body').animate({ scrollTop: 0 }, delay);
	} else {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	}
}

$.fn.focusWithoutScrolling = function () {
	var x = window.scrollX, y = window.scrollY;
	this.focus();
	window.scrollTo(x, y);
};

/*** Parsing ***/
function getNumericString(stringToParse, reverse) {
	var itemString = "";
	if (reverse) {
		var j = stringToParse.length; while (j--) {
			if ($.isNumeric(stringToParse.charAt(j))) itemString = stringToParse.charAt(j) + itemString;
			else break;
		}
	} else {
		for (j = 0; j < stringToParse.length; j++) {
			if ($.isNumeric(stringToParse.charAt(j))) itemString += stringToParse.charAt(j);
			else break;
		}
	}
	return itemString;
}

function TryParseInt(str, defaultValue) {
	var retValue = defaultValue;
	if (str != null) {
		if (str.length > 0) {
			if (!isNaN(str)) {
				retValue = parseInt(str);
			}
		}
	}
	return retValue;
}

function random(mi, ma){
	return Math.floor(Math.random() * (ma - mi + 1) + mi);
}

function sleep(t){
	return new Promise((ok)=>{setTimeout(ok, t)});
}
