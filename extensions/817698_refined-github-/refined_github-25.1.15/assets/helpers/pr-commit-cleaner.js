/**
@example 'Something done (#123)' => 'Something done'
*/
function cleanPrCommitTitle(commitTitle, pr) {
	return commitTitle.replace(new RegExp(`\\(#${pr}\\)\\s*$`), '').trim();
}

export { cleanPrCommitTitle as default };
