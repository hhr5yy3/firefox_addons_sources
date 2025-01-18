import { expectElement, $$ } from '../npm/select-dom.js';
import { getTokenScopes, tokenUser } from '../github-helpers/github-token.js';
import { assertError } from '../npm/ts-extras-assert-error.js';

function reportStatus({error, text, scopes = ['unknown']} = {}) {
	const tokenStatus = expectElement('#validation');
	tokenStatus.textContent = text ?? '';
	if (error) {
		tokenStatus.dataset.validation = 'invalid';
	} else {
		delete tokenStatus.dataset.validation;
	}

	for (const scope of $$('[data-scope]')) {
		scope.dataset.validation = scopes.includes(scope.dataset.scope)
			? 'valid'
			: scopes.includes('unknown')
				? ''
				: 'invalid';
	}
}

function getApiUrl() {
	const tokenLink = expectElement('a#personal-token-link');
	return tokenLink.host === 'github.com'
		? 'https://api.github.com/'
		: `${tokenLink.origin}/api/v3/`;
}
function expandTokenSection() {
	expectElement('details#token').open = true;
}

async function validateToken() {
	const tokenField = expectElement('input[name="personalToken"]');
	reportStatus();

	if (!tokenField.validity.valid || tokenField.value.length === 0) {
	// The Chrome options iframe auto-sizer causes the "scrollIntoView" function to scroll incorrectly unless you wait a bit
	// https://github.com/refined-github/refined-github/issues/6807
		setTimeout(expandTokenSection, 100);
		return;
	}

	reportStatus({text: 'Validating…'});

	try {
		const base = getApiUrl();
		const [scopes, user] = await Promise.all([
			getTokenScopes(base, tokenField.value),
			tokenUser.get(base, tokenField.value),
		]);
		reportStatus({
			text: `👤 @${user}`,
			scopes,
		});
	} catch (error) {
		assertError(error);
		reportStatus({error: true, text: error.message});
		expandTokenSection();
		throw error;
	}
}

async function initTokenValidation(syncedForm) {
	await validateToken();

	// Listen to events
	const field = expectElement('input[name="personalToken"]');
	field.addEventListener('input', validateToken);
	field.addEventListener('focus', () => {
		field.type = 'text';
	});
	field.addEventListener('blur', () => {
		field.type = 'password';
	});

	// Update domain-dependent page content when the domain is changed
	syncedForm?.onChange(validateToken);
}

export { initTokenValidation as default };
