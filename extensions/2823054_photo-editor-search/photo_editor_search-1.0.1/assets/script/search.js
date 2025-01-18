const searchForm = document.getElementById('webSearch');
const searchInput = document.getElementById('webSearchQuery');

function handleSearch(e) {
	e.preventDefault();
	const query = searchInput.value.trim();
	if (query !== '') {
		const searchQuery = encodeURIComponent(query);
		const yahooSearchUrl = `https://search.yahoo.com/yhs/search?hspart=ata&hsimp=yhs-002&type=type9067382-aal-190001-190002&param1=190001&param2=190002&p=${searchQuery}&grd=1`;
		window.location.href = yahooSearchUrl;
		searchInput.value = '';
	}
}

searchForm.addEventListener('submit', handleSearch);
