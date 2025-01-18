import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import elementReady from '../npm/element-ready.js';
import { isReleasesOrTags, isSingleReleaseOrTag } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { getRepo, buildRepoURL } from '../github-helpers/index.js';
import GetFilesOnRoot from './link-to-changelog-file.gql.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const changelogFiles = /^(?:changelog|news|changes|history|release|whatsnew)(?:\.(?:mdx?|mkdn?|mdwn|mdown|markdown|litcoffee|txt|rst))?$/i;
function findChangelogName(files) {
	return files.find(name => changelogFiles.test(name)) ?? false;
}

const changelogName = new CachedFunction('changelog', {
	async updater(nameWithOwner) {
		const [owner, name] = nameWithOwner.split('/');
		const {repository} = await api.v4(GetFilesOnRoot, {
			variables: {name, owner},
		});

		const files = [];
		for (const entry of repository.object.entries ) {
			if (entry.type === 'blob') {
				files.push(entry.name);
			}
		}

		return findChangelogName(files);
	},
});

async function init() {
	const changelog = await changelogName.get(getRepo().nameWithOwner);
	if (!changelog) {
		return false;
	}

	const releasesOrTagsNavbarSelector = [
		'nav[aria-label^="Releases and Tags"]', // Release list
		'.subnav-links', // Tag list
	].join(',');

	const navbar = await elementReady(releasesOrTagsNavbarSelector);
	navbar.append(
		React.createElement('a', {
			className: "subnav-item tooltipped tooltipped-n"  ,
			'aria-label': `View the ${changelog} file`,
			href: buildRepoURL('blob', 'HEAD', changelog),}

, React.createElement('span', null, "Changelog")
),
	);
}

void features.add(import.meta.url, {
	include: [
		isReleasesOrTags,
	],
	exclude: [
		isSingleReleaseOrTag,
	],
	deduplicate: 'has-rgh-inner',
	init,
});

/*

Test URLs:

- CHANGELOG.md: https://github.com/nodeca/js-yaml/releases/tag/4.0.0)
- CHANGELOG.rst: https://github.com/pyca/cryptography/releases)
- CHANGES: https://github.com/sphinx-doc/sphinx/releases)
- news: https://github.com/pypa/pip/releases)
- HISTORY.md: https://github.com/psf/requests/releases)

*/
