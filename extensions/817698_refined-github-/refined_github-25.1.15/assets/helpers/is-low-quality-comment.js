const lowQualityWords = [
	'a',
	'an',
	'and',
	'any',
	'bump',
	'dito',
	'ditto',
	'following',
	'for',
	'here',
	'is',
	'issue',
	'issues',
	'me',
	'on',
	'please',
	'pls',
	'plz',
	'question',
	'same',
	'solution',
	'still',
	'there',
	'this',
	'too',
	'update',
	'updates',
];
const lowQualityWordsRegex = new RegExp(`\\b(${lowQualityWords.join('|')})\\b`, 'gi');

function isLowQualityComment(text) {
	// Note: the unicode range targets skin color modifiers for the hand emojis
	return text
		.replaceAll(lowQualityWordsRegex, '')
		.replaceAll(/[\s,.!?👍👎👌🙏]+|[\u{1F3FB}-\u{1F3FF}]|[+-]\d+|⬆️/gu, '') === '';
}

export { isLowQualityComment as default };
