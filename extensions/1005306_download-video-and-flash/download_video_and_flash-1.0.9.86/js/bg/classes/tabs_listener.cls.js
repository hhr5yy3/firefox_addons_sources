class TabsListener extends Observer {
	constructor(backgroundMessageManager) {
		super();
		this.backgroundMessageManager = backgroundMessageManager;
		this.addListenerTabsOnUpdated();
	}

	addListenerTabsOnUpdated() {
		browser.tabs.onUpdated.addListener(this.onUpdated.bind(this));
	}

	onUpdated(tabId, changeInfo, tabInfo) {
		try {
			log(tabId);
			log(changeInfo);
			log(tabInfo.url);
			let { url, id } = tabInfo;

			if (this.isNewNavigation(changeInfo)) {
				this.notifyNewNavigation(tabId);
			}

			if (!url) { throw new Error("TabsListener.onUpdated: 'url' is undefined"); }
			if (!id) { throw new Error("TabsListener.onUpdated: 'id' is undefined"); }

			if (Utils.isHostValid({ url })) {
				log("youtube TabsListener");
				this.postMessageTabUpdated(url, id);
			}
		} catch(ex) { 
			error(ex);
		}
	}

	postMessageTabUpdated(url, tabId) {
		let port = this.backgroundMessageManager
			.BackgroundPortManager
			.getTabPort(tabId);

		if (!port) { return; }

		port.postMessage({
			message: MESSAGES.BACKGROUND.TAB_UPDATED,
			payload: { url }
		});
	}

	isNewNavigation(changeInfo) {
		return changeInfo 
			&& changeInfo.status === "loading" 
			&& !changeInfo.url;
	}

	notifyNewNavigation(tabId) {
		this.notify(
			EVENTS.BACKGROUND.NEW_NAVIGATION,
			{ tabId }
		);
		log("new navigation");
	}
}