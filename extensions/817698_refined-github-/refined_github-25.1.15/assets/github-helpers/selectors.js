import { any } from '../npm/code-tag.js';

/** The repo navigation bar */
const repoUnderlineNavUl = '.js-responsive-underlinenav ul.UnderlineNav-body';

const standaloneGistLinkInMarkdown = any`
	:is(.js-comment-body, .react-issue-comment) p a:only-child:is(
		[href^="https://gist.github.com/"],
		[href^="${location.origin}/gist/"]
	)
` ; // TODO: Drop after https://github.com/fregante/code-tag/issues/12

/** The repo navigation bar’s overflow menu */
const repoUnderlineNavDropdownUl = '.js-responsive-underlinenav action-menu ul';

const branchSelector = '[data-hotkey="w"]';

const branchSelectorParent = 'details#branch-select-menu';

const directoryListingFileIcon = [
	// .color-fg-muted selects only files; some icon extensions use `img` tags
	'.react-directory-filename-column > :is(svg, img).color-fg-muted',
	'.js-navigation-container .octicon-file',
];

// `.color-fg-open` is needed because of the icon added by `highlight-non-default-base-branch`
const openPrsListLink = any`
	.js-issue-row:has(
		.octicon-git-pull-request.color-fg-open,
		.octicon-git-pull-request-draft
	) a.js-navigation-open
`;

const openIssueToLastComment = `
	:is(.js-issue-row, .js-pinned-issue-list-item)
	.Link--muted:is(
		a[aria-label$="comment"],
		a[aria-label$="comments"]
	)
`;

const paginationButtonSelector = '.ajax-pagination-form button.ajax-pagination-btn';

const codeSearchHeader = any`
	div:has(
		> [aria-label^="Collapse "],
		> [aria-label^="Expand "]
	)
`;

const linksToConversationLists = `
	a:is(
		[href*="/issues"],
		[href*="/pulls"],
		[href*="/projects"],
		[href*="/labels/"]
	):not(
		[href*="sort%3A"],
		[href*="page="],
		.issues-reset-query,
		.pagination *,
		.table-list-header-toggle *
	)
`;

const newCommentField = [
	'[input="fc-new_comment_field"]',
	'[input^="fc-new_inline_comment_discussion"]',
	'[aria-labelledby="comment-composer-heading"]',
];

const commitHashLinkInLists = [
	'[data-testid="commit-row-browse-repo"]', // `isCommitList`
	'[aria-label="View commit details"] a.text-mono', // `isCommitList` TODO: remove in May 2025
	'a[id^="commit-details-"]', // `isPRCommitList`
	'.js-details-container .text-right code a.Link--secondary', // `isPRConversation`
] ;

const commitTitleInLists = [
	'[data-testid="list-view-item-title-container"]', // `isCommitList`
	'.js-commits-list-item .Details p.mb-1', // `isPRCommitList`,
];

const botNames = [
	'actions-user',
	'bors',
	'ImgBotApp',
	'renovate-bot',
	'rust-highfive',
	'scala-steward',
	'weblate',
	'apps', // Matches any `/apps/*` URLs
] ;

const botAttributes = botNames.map(bot => `[href^="/${bot}"]`).join(', ');

// All co-authored commits are excluded because it's unlikely that any bot co-authors with another bot, but instead they're co-authored with a human. In that case we don't want to dim the commit.
// ^= is needed to match /apps/* URLs
const botLinksCommitSelectors = [
	// Co-authored commits are excluded because their avatars are not linked
	`a[data-testid="avatar-icon-link"]:is(${botAttributes})`,

	// Legacy view, still used by PR commits
	// :only-child excludes co-authored commits
	`a[data-test-selector="commits-avatar-stack-avatar-link"]:is(${botAttributes}):only-child`,
];

const botLinksPrSelectors = [
	...botNames.flatMap(bot => [
		`.opened-by [title$="pull requests created by ${bot}"]`,
		`.opened-by [title$="pull requests opened by ${bot}"]`,
	]),
	'.opened-by [href*="author%3Aapp%2F"]', // Search query `is:pr+author:app/*`
	'.labels [href$="label%3Abot"]', // PR tagged with `bot` label
];

// `a` selector needed to skip commits by non-GitHub users
const authorLinks = [
	'.js-discussion a.author',
	'.inline-comments a.author',
	'.react-issue-comment a[data-testid="avatar-link"]',
	'[data-testid="comment-header"] a[data-testid="avatar-link"]', // React commit view
	'.react-issue-body a[data-testid="issue-body-header-author"]', // React issue view first comment
];

const authorLinksException = [
	// # targets mannequins #6504
	'[href="#"]',
	'[href*="/apps/"]',
	'[href*="/marketplace/"]',
	'[data-hovercard-type="organization"]',
	// For GHE: https://github.com/refined-github/refined-github/issues/7232#issuecomment-1910803157
	'[show_full_name="true"]',
];

const usernameLinksSelector = [
	`:is(${authorLinks.join(', ')}):not(${authorLinksException.join(', ')})`,

	// On dashboard
	// `.Link--primary` excludes avatars
	// [aria-label="card content"] excludes links in cards #6530 #6915
	'#dashboard a.Link--primary[data-hovercard-type="user"]:not([aria-label="card content"] *)',
] ;

export { botLinksCommitSelectors, botLinksPrSelectors, branchSelector, branchSelectorParent, codeSearchHeader, commitHashLinkInLists, commitTitleInLists, directoryListingFileIcon, linksToConversationLists, newCommentField, openIssueToLastComment, openPrsListLink, paginationButtonSelector, repoUnderlineNavDropdownUl, repoUnderlineNavUl, standaloneGistLinkInMarkdown, usernameLinksSelector };
