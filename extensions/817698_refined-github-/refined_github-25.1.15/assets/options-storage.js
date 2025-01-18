import OptionsSyncPerDomain from './npm/webext-options-sync-per-domain.js';
import { importedFeatures } from './feature-data.js';
import renamedFeatures from './feature-renames.json.js';

const defaults = Object.assign({
	actionUrl: 'https://github.com/',
	customCSS: '',
	personalToken: '',
	logging: false,
	logHTTP: false,
}, Object.fromEntries(importedFeatures.map(id => [`feature:${id}`, true])));

function isFeatureDisabled(options, id) {
	// Must check if it's specifically `false`: It could be undefined if not yet in the readme or if misread from the entry point #6606
	return options[`feature:${id}`] === false;
}

const migrations = [
	(options) => {
		for (const [from, to] of Object.entries(renamedFeatures)) {
			if (typeof options[`feature:${from}`] === 'boolean') {
				options[`feature:${to}`] = options[`feature:${from}`];
			}
		}
	},

	// Removed features will be automatically removed from the options as well
	OptionsSyncPerDomain.migrations.removeUnused,
];

const perDomainOptions = new OptionsSyncPerDomain({defaults, migrations});
const optionsStorage = perDomainOptions.getOptionsForOrigin();

const cachedSettings = optionsStorage.getAll();

async function getToken() {
	const {personalToken} = await cachedSettings;
	return personalToken;
}

async function hasToken() {
	return Boolean(await getToken());
}

export { optionsStorage as default, getToken, hasToken, isFeatureDisabled, perDomainOptions };
