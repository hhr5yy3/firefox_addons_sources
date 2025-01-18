class SiteSettingsReviewItem extends BaseComponent {
	/**
	 * @param {Object} props
	 * @param {string} props.type
	 * @param {string} props.url
	 * @param {string} props.initialValue
	 */
	constructor(props) {
		super(props);

		this.render();
	}

	styleLink(linkElement) {
		const linkText = linkElement.innerText;
		linkElement.innerText = "";

		const linkTextArray = linkText.trim().split(" ");
		const linkTextLastWord = linkTextArray.pop();
		const linkTextFirstWords = linkTextArray.join(" ");

		const linkFirstPartElement = document.createElement("span");
		linkFirstPartElement.innerText = `${linkTextFirstWords} `;

		const linkLastPartElement = document.createElement("span");
		linkLastPartElement.className = "link-last-part";
		linkLastPartElement.innerText = linkTextLastWord;

		const externalLinkIcon = new Icon({
			href: "./assets/icons.svg#website-setting-external-icon",
			className: "website-setting-external-icon"
		});
		linkLastPartElement.appendChild(externalLinkIcon.node);

		linkElement.appendChild(linkFirstPartElement);
		linkElement.appendChild(linkLastPartElement);
	}

	render() {
		const detailDiv = document.createElement("div");
		detailDiv.className = "site-detail";

		const urlSection = document.createElement("div");
		urlSection.classList.add("url-section");

		const isExtension = this.props.url.includes("chrome-extension://");
		let siteIcon;

		if (isExtension) {
			siteIcon = new Icon({
				href: "./assets/icons.svg#plugin-icon",
				className: "site-icon-img"
			});
		} else {
			siteIcon = new Icon({
				href: "./assets/icons.svg#globe-icon",
				className: "site-icon-img"
			});
		}

		urlSection.appendChild(siteIcon.node);

		const urlDetail = document.createElement("p");
		urlDetail.className = "url-detail";
		urlDetail.innerText = this.props.url;

		const urlTooltip = new UrlTooltip({
			child: urlDetail,
			url: this.props.url,
			className: isExtension ? "extension-url-tooltip" : "site-url-tooltip"
		});

		urlSection.appendChild(urlTooltip.node);

		if (isExtension) {
			const infoIcon = new Icon({
				href: "./assets/icons.svg#info-icon",
				className: "site-info-icon-img"
			});

			const userAgent = window.navigator.userAgent;
			let infoTemplate;

			if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
				infoTemplate = document.querySelector("#chrome-extension-info");
			} else if (userAgent.includes("Edg")) {
				infoTemplate = document.querySelector("#edge-extension-info");
			}

			const infoContent = infoTemplate.content.cloneNode(true);
			const linkElement = infoContent.querySelector(".browser-site-permissions-link");

			this.styleLink(linkElement);
			linkElement.addEventListener("click", () =>
				chrome.tabs.create({ url: `chrome://settings/content/siteDetails?site=${this.props.url}` })
			);

			const infoIconTooltip = new Tooltip({
				child: infoIcon.node,
				content: infoContent,
				className: "info-icon-tooltip"
			});
			urlSection.appendChild(infoIconTooltip.node);
		}

		detailDiv.appendChild(urlSection);

		const selectionDiv = document.createElement("div");

		const siteSettingSelect = new SiteSettingSelect({
			type: this.props.type,
			url: this.props.url,
			initialValue: this.props.initialValue
		});

		selectionDiv.appendChild(siteSettingSelect.node);
		detailDiv.appendChild(selectionDiv);

		this.node.appendChild(detailDiv);
	}
}
