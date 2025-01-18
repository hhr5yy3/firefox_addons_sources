const searchEngineUrls = [
  "https://www.google.com/search?q=",
	// "https://duckduckgo.com",
	// "https://yahoo.com",
	// "https://bing.com",
	// "https://ask.com",
	// "https://ecosia.com"
];

describe("Triggers", () => {
	const triggers = Cypress.env("triggers");

	it("Has got triggers configured", () => {
		expect(triggers).to.be.an('array').and.not.be.empty;
	});

	// Iterate through our supported list of search engines,
	// and for each one we'll load the search engine before
	// the tests so we can search on our trigger words
	searchEngineUrls.forEach(url => {
		// Intercept the search engine request, and just return a blank
		// page. We don't actually need a genuine search engine response
		// to be able to simulate it, just that the URL matches the glob
		// in the manifest file, and the trigger phrase is a match
		beforeEach(() => {
			cy.intercept("GET", `${url}*`, "<html><body></body></html>")
			cy.intercept("GET", "**/extension?manifest=3*", "{}");
			// cy.intercept("GET", "localhost:3000/assets/*")
			cy.intercept("POST", /.*mixpanel\.com\/.*/, "{}")
			cy.intercept("GET", /.*mixpanel\.com\/.*/, "{}")
			cy.intercept("GET", "*.ripplesuicideprevention.com/assets/*", "{}")
			cy.intercept("GET", "*.amazonaws.com/*", "{}")
		});

		const localeTriggers = triggers.reduce((out, trigger) => {
			if (!out[trigger.locale]) {
				out[trigger.locale] = []
			}

			out[trigger.locale].push(trigger);
			return out;
		}, {});

		const locale = "en";
		// Object.keys(localeTriggers).forEach(locale => {
			// context(`"${locale}" locale`, () => {
			// 	localeTriggers[locale].forEach(trigger => {
			// 		const searchTerm = atob(trigger.trigger);
			// 		it(`Triggers the extension for the phrase "${searchTerm}"`, () => {
			// 			cy.intercept("GET", `${url}${searchTerm}`, "<html><body></body></html>");
			// 			cy.visit(`${url}${searchTerm}`).then(() => {
			// 				cy.get("div#rippleModal").should("be.visible");
			// 			});
			// 		});
			// 	});
			// });

			it(`Triggers the extension for all "${locale}" phrases`, () => {
				localeTriggers[locale].forEach(trigger => {
					const searchTerm = trigger.trigger;

					cy.visit(`${url}${encodeURI(searchTerm)}`).then(() => {
						cy.get("div#rippleModal").should("be.visible");
					});
				});
			});
		// });
	});
});
