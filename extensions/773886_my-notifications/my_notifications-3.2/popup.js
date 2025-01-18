const engine = (navigator.userAgent.search(/(Firefox)/) > 0) ? browser : chrome
const background = engine.extension.getBackgroundPage()
const getRandomId = () => Math.random().toString(36).slice(2)

class App {
	constructor() {
		this.gridController = new GridController(this)
		this.utils = new Utils()
		this.settings = new Settings(this)
		this.popupMenu = new PopupMenu(this, {
			beforeShowPopupMenu : (menuElement, event) => {
				let element = event.target.closest('.item')

				if (!element) {
					return false
				}

				menuElement.itemId = element.getAttribute('data-id')

				return true
			},
			actions : {
				'setting' : event => {
					let action = event.target.getAttribute('data-action')
					let id = document.querySelector('ul.popup-menu').itemId
					let element = document.querySelector(`[data-id="${id}"]`)

					if (element && action === 'setting') {
						event.stopPropagation()
						this.gridController.openSiteSettings(element)
					}
				},
				'delete' : event => {
					let action = event.target.getAttribute('data-action')
					let id = document.querySelector('ul.popup-menu').itemId
					let element = document.querySelector(`[data-id="${id}"]`)

					if (element && action === 'delete') {
						event.stopPropagation()
						this.gridController.deleteItem(element)
					}
				}
			}
		})

		this.initModalWindows()
		this.initEvents()
		this.initSuggests()
		this.localize()
	}

 	initEvents() {
		document.addEventListener('click', event => {
			console.log('main cl')
			let action = event.target.getAttribute('data-action')
			let element = event.target.closest('.item')

			if (element && action === 'delete') {
				event.stopPropagation()
				this.gridController.deleteItem(element)
			}

			if (element && action === 'setting') {
				event.stopPropagation()
				this.gridController.openSiteSettings(element)
			}
		})
	}

 	initModalWindows() {
		document.getElementById('close-button').addEventListener('click', this.closeModal)

		document.addEventListener('click', (event) => {
			let element = event.target.closest('[data-popup-trigger]')

			if (!element) {
				return
			}

			const popupTrigger = element.getAttribute('data-popup-trigger')
			const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`)

			if (popupModal) {
				event.preventDefault()
				this.openModal(popupModal)
			}

			document.querySelector('.grid').classList.add('edit-mode')

			// event needed
			if (popupTrigger === 'addForm') {
				this.autocomplete.fetch()
				document.querySelector('.grid').classList.add('edit-mode')
			}
		})
	}

	closeModal() {
		document.querySelectorAll('[data-popup-modal], .extender').forEach((element) => {
			element.classList.remove('on')
		})

		this.unselectGridItem()
		this.autocomplete.clear()

		document.querySelector('.grid').classList.remove('edit-mode')
	}

	openModal(popupModal) {
		this.closeModal()

		popupModal.classList.add('on')
		document.querySelector('.extender').classList.add('on')
	}

	unselectGridItem() {
		const selectedItem = document.querySelector('.item.selected')

		if (selectedItem) {
			selectedItem.classList.remove('selected')
		}
	}

	localize() {
		document.getElementById('ver').textContent = engine.runtime.getManifest().version;
		document.querySelectorAll('[data-lang]').forEach((element) => {
			let langKey = element.getAttribute('data-lang')
			let attribute = element.getAttribute('data-lang-attrib')
			let newText = engine.i18n.getMessage(langKey)

			if (newText) {
				if (attribute) {
					element[attribute] = newText
				} else {
					element.innerText = newText
				}
			}
		})
	}

	initSuggests() {
		let list = []
		for (let key in background.presets) {
			let data = this.gridController.presetToItem(key)
			list.push(data)
		}

		this.autocomplete = autocomplete({
			onSelect: (item, input) => {
				let gridItem = this.gridController.createItem(item)
				this.gridController.saveGrid()
				this.gridController.openSiteSettings(gridItem[0].getElement())
			},
			input: document.querySelector('input[name="url"]'),
			minLength: 0,
			render: function(item, currentValue) {
				let icon = document.createElement('img')
				icon.src = item.icon
				icon.classList.add('icon')

				let notification = document.createElement('img')
				notification.src = 'notification_icon.png'
				notification.classList.add('ability')

				let text = document.createElement('span')
				text.textContent = item.title

				let div = document.createElement('div')
				div.appendChild(icon)
				div.appendChild(text)
				div.appendChild(notification)

				return div
			},
			fetch: function(text, callback) {
				let suggestions = list.filter(n => {
					return n.title.toLowerCase().startsWith(text.toLowerCase()) ||
					n.key.startsWith(text.toLowerCase())
				})
				callback(suggestions)
			},
			debounceWaitMs: 200,
			disableAutoSelect: true,
			click: e => e.fetch(),
			keyup: e => e.fetch()
		})
	}
}

class PopupMenu {
	constructor(app, config) {
		this.config = {...config, ...{selector : 'ul.popup-menu'}}

		const menu = document.querySelector(this.config.selector)

		document.addEventListener('contextmenu', event => {
			if (typeof this.config.beforeShowPopupMenu === 'function') {
				if (!this.config.beforeShowPopupMenu(menu, event)) {
					return
				}
			}

			event.preventDefault()
			event.stopPropagation()
			this.showPopupMenu(menu, event)
		})

		menu.addEventListener('click', event => {
			menu.style.display = 'none'

			let action = event.target.getAttribute('data-action')

			for (let key in config.actions) {
				if (action === key) {
					event.stopPropagation()
					config.actions[key](event)
				}
			}
		})
	}

	showPopupMenu(menu, event) {
		let x = event.x
		let y = event.y

		menu.style.display = 'block'

		if (window.innerWidth < event.x + menu.clientWidth) {
			x = window.innerWidth - (menu.clientWidth + 10)
		}

		if (window.innerHeight < event.y + menu.clientHeight) {
			y = window.innerHeight - (menu.clientHeight + 20)
		}

		menu.style.left = x + 'px'
		menu.style.top = y + 'px'
	}
}

class GridController {
	constructor(app) {
		this.app = app
		this.clickTimer = null
		this.grid = new Muuri(document.querySelector('.grid'), {
			layoutDuration: 0, // скорость перестройки всех элементов
			dragReleaseDuration: 150,
			dragReleaseEasing: 'ease',
			layoutEasing: 'ease',
			dragEnabled: true,
			dragSortHeuristics: {
				sortInterval: 160,
				minDragDistance: 10,
			},
			dragSortPredicate: {
				threshold: 50,
			},
			horizontal: false,
			alignRight: false,
			alignBottom: false,
			fillGaps: true,
		})

		this.grid.on('dragStart', (item) => this.dragStart(item))
		this.grid.on('dragEnd', (item, event) => this.dragEnd(item, event))

		this.restoreList()
	}

	async dragStart(item) {
		this.clickTimer = setTimeout(() => this.clickTimer = null,400, item)
	}

	async dragEnd(item, event) {
		if (event.target.classList.contains('button')) {
			return
		}

		if (this.clickTimer) {
			clearTimeout(this.clickTimer)
			await this.itemClick(item)

			return;
		}

		this.saveGrid()
	}

	async itemClick(gridItem) {
		let itemElem = gridItem.getElement().closest('.item')

		if (!itemElem) {
			return;
		}

		let key = itemElem.getAttribute('data-key')
		let siteSettings = itemElem.data
		let host = siteSettings.host || background.presets[key].domains?.[0] || background.presets[key].site
		let openUrl

		if (background.presets[key].messagePageUrl.indexOf('http') === 0) {
			openUrl = background.presets[key].messagePageUrl
		} else {
			openUrl = 'https://' + host + background.presets[key].messagePageUrl
		}

		if (!background.presets[key].isOnline && background.presets[key].partnerLink) {
			openUrl =  background.presets[key].partnerLink
		}

		engine.tabs.query({}, tabs => {
			for (let tab of tabs) {
				if (tab.url && tab.url.indexOf(openUrl) === 0) {
					engine.tabs.update(tab.id, {active: true})
					window.close()

					return
				}
			}

			engine.tabs.create({url: openUrl})
			window.close()
		})
	}

	createElement(data) {
		let div = document.querySelector('#helper .item').cloneNode(true)
		div.setAttribute('data-id', data.id)
		div.setAttribute('data-key', data.key)
		div.querySelector('.site-name').textContent = data.title
		div.querySelector('.icon').style.backgroundImage = 'url('+data.icon+')'

		div.data = { ...data }

		return div
	}

	createItem(data) {
		data.id = getRandomId()
		let element = this.createElement(data)

		return this.grid.add(element, {'isActive' : true})
	}

	saveGrid() {
		let grid = []
		let items = this.grid.getItems()

		for (let i in items) {
			let itemElem = items[i].getElement().closest('.item')
			grid.push(itemElem.data)
		}

		engine.storage.local.set({grid : grid})
	}

	restoreList() {
		engine.storage.local.get('grid', item => {
			let gridData = item.grid ?? []

			for (let i in gridData) {
				let element = this.createElement(gridData[i])
				let key = gridData[i].key

				this.grid.add(element, {'isActive' : true})

				if (key && gridData[i].checkEnable) {
					let isOnline = background.presets[key].isOnline
					let count = background.presets[key].newMess

					this.updateCounter(gridData[i], count, isOnline)
				}
			}
		})

		setTimeout(() => this.grid.setOptions({layoutDuration: 250}), 1000)
	}

	updateCounter(itemData, count, online) {
		if (itemData.id === undefined) {
			return
		}

		let element = document.querySelector(`.item[data-id="${itemData.id}"]`)
		if (element) {
			let waves = element.querySelector('.waves')
			let countEl = element.querySelector('.count')
			let onlineEl = element.querySelector('.linked')

			if (count) {
				waves.classList.add('on')
				countEl.classList.add('on')
				countEl.textContent = (count > 99) ? '99+' : count
			} else {
				waves.classList.remove('on')
				countEl.classList.remove('on')
			}

			online ? onlineEl.classList.add('on') : onlineEl.classList.remove('on')
		}
	}

	openSiteSettings(itemElem) {
		const popupModal = document.querySelector('[data-popup-modal="siteSettingsForm"]')

		this.app.openModal(popupModal)
		itemElem.classList.add('selected')
		this.app.settings.prepareSiteSettings(itemElem)
	}

	deleteItem(element) {
		let key = element.getAttribute('data-key')
		let gridItems = this.grid.getItems(element)
		let gridItemsAll = this.grid.getItems()
		let keyCount = 0

		this.grid.remove(gridItems[0])
		element.remove()
		this.saveGrid()

		for (let gridItem of gridItemsAll) {
			if (gridItem.getElement().getAttribute('data-key') === key) {
				keyCount++
			}
		}

		if (keyCount <= 1) {
			engine.runtime.sendMessage({site: key, method: 'setNewMess', count: 0})
		}

		if (element.classList.contains('selected')) {
			this.app.closeModal()
		}
	}

	activateAll() {
		let activeKeys = this.grid.getItems().map((item) => item.getElement().getAttribute('data-key'))

		for (let key in background.presets) {
			if (!activeKeys.includes(key)) {
				let itemData = this.presetToItem(key)
				this.createItem(itemData)
				this.saveGrid()
			}
		}
	}

	presetToItem(key) {
		return {
			key: key,
			icon: 'siteIcons/' + key + '.png',
			title: background.presets[key].title,
			sound: '',
			checkEnable: true,
		}
	}
}

class Utils {
	constructor() {
		this.updateStyles()
	}

	updateStyles(defOptions) {
		defOptions = defOptions || {}

		let options = JSON.parse(localStorage.getItem('options'))
		let windowBadgeColor = defOptions.windowBadgeColor ?? options.windowBadgeColor
		let sheet = new CSSStyleSheet()
		let textColor = this.brightnessByColor(windowBadgeColor) > 120 ? '#000' : '#FFF'

		sheet.insertRule('.count {background-color: '+windowBadgeColor+' !important; color: '+textColor+' !important;}')
		sheet.insertRule('.waves .online-outer, .waves .online-inner {background-color: '+windowBadgeColor+' !important;}')
		sheet.insertRule('.main {width: calc(60px * '+options.columns+' + 8px) !important;}')

		document.adoptedStyleSheets = [sheet]
	}

	brightnessByColor(color) {
		color = '' + color
		let isHEX = color.indexOf("#") === 0
		let r
		let	g
		let	b

		if (isHEX) {
			const hasFullSpec = color.length === 7
			let m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g)
			if (m) {
				r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16)
				g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16)
				b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16)
			}
		} else {
			let m = color.match(/(\d+){3}/g)
			if (m) {
				r = m[0]
				g = m[1]
				b = m[2]
			}
		}

		if (typeof r != "undefined") {
			return ((r*299)+(g*587)+(b*114))/1000
		}
	}
}

class Settings {
	constructor(app) {
		this.initElements()
		this.initListeners(app)
		this.initSiteSettingsListeners(app)
	}

	initElements() {
		const sounds= {
			"sounds/arcade-magic.ogg" : "arcade magic",
			"sounds/bell.ogg" : "bell",
			"sounds/creation.ogg" : "creation",
			"sounds/double_bell.ogg" : "double bell",
			"sounds/friend-request.ogg" : "friend request",
			"sounds/game-wave-alarm.ogg" : "game wave alarm",
			"sounds/happy-bells.ogg" : "happy bells",
			"sounds/livechat.ogg" : "livechat",
			"sounds/message.ogg" : "message",
			"sounds/musical-alert.ogg" : "musical alert",
			"sounds/mystery-harp.ogg" : "mystery harp",
			"sounds/notify_b.ogg" : "notify",
			"sounds/piano.ogg" : "piano",
			"sounds/positive.ogg" : "positive",
			"sounds/sci-fi-click.ogg" : "sci fi click",
			"sounds/sci-fi-confirmation.ogg" : "sci fi confirmation",
			"sounds/sci_bells.ogg" : "sci bells",
			"sounds/success-fanfare-trumpets.ogg" : "success fanfare trumpets",
			"sounds/tile-game-reveal.ogg" : "tile game reveal",
			"sounds/vk.ogg" : "vk",
			"sounds/yandex.ogg" : "yandex",
		}

		document.querySelectorAll('select[name="sound"]').forEach((select) => {
			for(let url in sounds) {
				let option = document.createElement('option')
				option.value = url
				option.innerText = sounds[url]
				select.appendChild(option)
			}
		})
	}

	saveOptions(data) {
		let result = JSON.parse(localStorage.getItem('options'))
		localStorage.setItem('options', JSON.stringify({...result, ...data}))
	}

	initListeners(app) {
		let options = JSON.parse(localStorage.getItem('options'))
		let icons = []
		let hintTimer = null
		let iconSelect = new IconSelect('my-icon-select', {
			'changed': (res) => {
				this.saveOptions({'iconNum' : res.iconValue})
				engine.browserAction.setIcon({path: 'icons/' + res.iconValue +'.png'})
			}
		})

		for (let i= 1; i <= 8; i++) {
			icons.push({'iconFilePath' : '/icons/'+i+'.png', 'iconValue':i})
		}

		iconSelect.refresh(icons)
		iconSelect.setSelected(options.iconNum)

		let soundOnSettings = document.querySelector('[data-popup-modal="settingsForm"] [name="sound"]')
		soundOnSettings.value = options.sound
		soundOnSettings.onchange = () => {
			let curSound = soundOnSettings.options[soundOnSettings.selectedIndex].value
			this.saveOptions({sound : curSound})
			this.playSound(curSound, volume.value)
		}

		let columns = document.querySelector('[name="columns"]')
		columns.onchange = () => {
			this.saveOptions({columns: columns.options[columns.selectedIndex].value})
			app.utils.updateStyles()
		}
		columns.value = options.columns

		let volume = document.querySelector('[name="volume"]')
		volume.oninput = function () {
			this.nextElementSibling.textContent = Math.round(this.value * 100)

			document.querySelector('.range-hint').style.display = 'inline-block'

			if (hintTimer) {
				clearTimeout(hintTimer)
			}

			hintTimer = setTimeout(function () {
				document.querySelector('.range-hint').style.display = 'none'
			}, 1000)
		}
		volume.onchange = ()=> {
			let curSound = JSON.parse(localStorage.getItem('options')).sound
			this.playSound(curSound, volume.value)
			this.saveOptions({volume : volume.value})
		}
		volume.value = options.volume

		let windowColor = document.querySelector('[name="windowBadgeColor"]')
		windowColor.oninput = e => {
			app.utils.updateStyles({windowBadgeColor : e.target.value})

			debouncing(() => {
				this.saveOptions({windowBadgeColor : e.target.value})
			}, 400)
		}
		windowColor.value = options.windowBadgeColor

		let appColor = document.querySelector('[name="applicationBadgeColor"]')
		appColor.oninput = e => {
			engine.browserAction.setBadgeBackgroundColor({color:e.target.value})

			debouncing(() => {
				this.saveOptions({applicationBadgeColor : e.target.value})
			}, 400)
		}
		appColor.value = options.applicationBadgeColor

		Coloris({
			el: '[name="windowBadgeColor"]',
			alpha: false,
		})

		Coloris({
			el: '[name="applicationBadgeColor"]',
			alpha: false,
		})
	}

	initSiteSettingsListeners(app)
	{
		let options = JSON.parse(localStorage.getItem('options'))

		let soundOnSite = document.querySelector('[data-popup-modal="siteSettingsForm"] [name="sound"]')
		soundOnSite.onchange = () => {
			let curSound = soundOnSite.options[soundOnSite.selectedIndex].value
			background.updateSiteSettings(soundOnSite.id, {sound: curSound})

			let selectedItem = document.querySelector('.item.selected')
			selectedItem.data.sound = curSound

			this.playSound(curSound, options.volume)
		}

		let checkElm = document.querySelector('[data-popup-modal="siteSettingsForm"] [name="check"]')
		checkElm.onchange = () => {
			background.updateSiteSettings(soundOnSite.id, {checkEnable: checkElm.checked})

			let selectedItem = document.querySelector('.item.selected')
			selectedItem.data.checkEnable = checkElm.checked
		}
	}

	prepareSiteSettings(element)
	{
		let soundOnSite = document.querySelector('[data-popup-modal="siteSettingsForm"] [name="sound"]')
		soundOnSite.value = element.data.sound
		soundOnSite.id = element.data.id

		let check = document.querySelector('[data-popup-modal="siteSettingsForm"] [name="check"]')
		check.checked = element.data.checkEnable
	}

	playSound(sound, volume) {
		if (sound !== null && sound !== 'off') {
			let audio = new Audio()
			audio.src = sound
			audio.autoplay = true
			audio.volume = volume
		}
	}
}

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

window.onload = () => window.app = new App()