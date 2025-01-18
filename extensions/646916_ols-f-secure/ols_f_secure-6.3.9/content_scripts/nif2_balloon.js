/*
 * Copyright (c) F-Secure Corporation. All rights reserved.
 * See license terms for the related product.
 */


const BalloonFrame = '<div class="fs-ols-balloon" id="fs-ols-balloon"><iframe class="fs-ols-frame" id="fs-ols-frame"></iframe></div>';

class FsOlsBalloon {

	#balloon;
	#customization;
	#schema;
	#targetId;

	constructor() {
		this.#balloon = htmlToElem(BalloonFrame);
		this.#schema = schemaMonitor.detectCustomSchema();
		BrowserStorage.getLocal(["customization"]).then(storageResult => {
			this.#customization = {
				MainColor: "#0028A0",
				SecondaryColor: "#006CD9",
				...storageResult.customization
			};
		});
	}

	inject() {
		document.body.appendChild(this.#balloon);
		const icons = document.getElementsByClassName("fs-bubble-info");
		Array.from(icons).forEach( (icon) => {
			icon.addEventListener('mouseover', (e) => {
				if (this.#targetId != e.target.id) {
					this.show(e.target);
				}
				this.#targetId = e.target.id;
			});
			icon.addEventListener('mouseout', (e) => {
				this.#targetId = "";
				this.hide();
			});
		});
	}

	getTemplate(extName, status, url, categories, shoppingSite, bankingSite, trustworthiness, borderColor) {
		let iconsHtml = "";
		const schema = this.#schema === Schema.Dark ? "dark" : "light";
		if (status != "denied") 
		{
			if (categories) {
				let cats = fsGetCategoryResources(categories.split(","));
				for (let i = 0; i < cats.length; i++) {
					iconsHtml += `<img style="height: 20px;" src="${cats[i].icon}" title="${cats[i].title}"></img>`;
				}
			}
			else if (shoppingSite) {
				if (trustworthiness > 0) {
					iconsHtml = getTrustedShoppingTemplate(trustworthiness);
				}
			}
		}


		const productLogo = this.#schema === Schema.Dark ? this.#customization.ProductLogo : this.#customization.ProductLogoDark;
		const productName = productLogo ? `<img style="height: 24px;" src="${productLogo}"/>` : this.#customization.ProductName;
		return `
		<html>
			<head>
			<style>

				body {
					margin: 0;
					font-family: 'Segoe UI', system-ui;
					font-style: normal;
					font-weight: 600;
					line-height: 18px;
					font-size: 14px;
					background-color: ${Colors.bgColor[schema]};
					color: ${Colors.fontColor[schema]};
					padding-left: 12px;
					padding-right: 12px;
				}
			
				.icon-container {
					position: relative;
					display: inline-block;
				}

				.icon-container img {
					position: absolute;
					top: 20;
					left: 20;
				}

				.icon-container img.status-icon {
					z-index: 999999;
					top: 10px;
					height: 14px;
				}

				.icon-container > img {
					display: inline-block;
					vertical-align: middle;
				}
				
				.url {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					letter-spacing: -0.4px;
					line-height: 16px;
					font-weight: 400;
					margin-top: 4px;
					margin-bottom: 4px;
				}
			</style>
			</head>
			<body>
				<div>
					<div>
						${getTypeIcon(status, shoppingSite, bankingSite, schema)}
						<div style="margin-top: -4px; margin-left: 30px; margin-bottom: 12px;">
							<div style="display: ${iconsHtml ? "block" : "none"}">
								${iconsHtml}
							</div>
							<div>
								<div>
									${fsGetRatingResources(status).title}
								</div>
								<div class="url">
									${url}
								</div>
							</div>
						</div>
						<div>
							<div style="border-top: 1px solid ${borderColor}; width: 100%;">
								<div style="margin-top: 8px; display: flex; justify-content: flex-end;">
									${productName}
								</div>
								<div style="font-size: 10px; float: right; margin-bottom:8px;">
									${extName}
								</div>
							</div>	
						</div>
					</div>
				</div>
			</body>
		</html>
		`;
	}

	hide() {
        this.#balloon.style.display = 'none';
	}

	async show(icon) {
		if (icon.dataset.url == undefined) {
			return;
		}
		let frame = document.getElementById("fs-ols-frame");

		const schema = this.#schema === Schema.Dark ? "dark" : "light";
		const borderColor = Colors.borderColor[schema];

		const html = this.getTemplate(icon.dataset.ext_name, 
			icon.dataset.rating, 
			icon.dataset.url, 
			icon.dataset.categories,
			icon.dataset.shoppingSite === "true",
			icon.dataset.bankingSite === "true",
			parseInt(icon.dataset.trustworthiness),
			borderColor
		);

		frame.srcdoc = html;

		this.#balloon.style.left = getOffset(icon).left - 11 + "px";

	
		const setBaloon = (height) => {
			frame.style.height = height + 10 + 'px';
			this.#balloon.style.height = frame.style.height;
			this.#balloon.style.top = getOffset(icon).top - height - 32 + "px";
			document.documentElement.style.setProperty('--fs-ballon-height', this.#balloon.style.height);
			document.documentElement.style.setProperty('--fs-border-color', borderColor);
		};

		frame.addEventListener('load', () => {
			const balloonHeight = frame.contentWindow.document.body.scrollHeight;
			setBaloon(balloonHeight);
			if(!balloonHeight) {
				setBaloon(frame.contentWindow.document.body.scrollHeight);
			}
		});

		this.#balloon.style.display = 'block';
	}
}
