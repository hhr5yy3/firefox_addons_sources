let engine = (navigator.userAgent.search(/(Firefox)/) > 0) ? browser : chrome
let countOld = -1
let firstTime = true
let supported = false
let sp = location.host.split('.')

if (sp[0] === 'www') {
	sp.shift()
}

let thisSite = sp.join('.')
let host = thisSite

function debouncing(listener, delay) {
	if (this.timer) {
		clearTimeout(this.timer)
	}

	this.timer = setTimeout(() => {
		clearTimeout(this.timer)
		this.timer = null
		listener()
	}, delay)
}

function check() {
	console.log('check')
	let count = 0
	let messageElem = document.querySelector(presets[thisSite]['messCountSelector'])
	let loginElement = document.querySelector(presets[thisSite]['loginSelector'])

	if (!loginElement) {
		return
	}

	if (messageElem) {
		count = Number(messageElem.innerText.match(/[0-9]+/))

		if (isNaN(count)) {
			count = 0
		}
	}

	if (countOld !== count) {
		engine.runtime.sendMessage({site: thisSite, method: 'setNewMess', count: count})
		countOld = count
	}

	if (firstTime) {
		engine.runtime.sendMessage({site: thisSite, method: 'setSiteSettings', data:{'host': host, isOnline : true}})
		firstTime = false
	}
}

for (let key in presets) {
	if (presets[key].domains && presets[key].domains.includes(thisSite)) {
		thisSite = key
		supported = true

		break
	}

	if (presets[key].site === thisSite || key === thisSite) {
		supported = true
	}
}

if (supported) {
	setTimeout(check, 1500)

	const observer = new MutationObserver(mutationList =>
		mutationList.filter(m => m.type === 'childList').forEach(m => {
			m.addedNodes.forEach(e => {
				debouncing(check, 500)
			});
		})
	)

	observer.observe(document.body,{childList: true, subtree: true});
}