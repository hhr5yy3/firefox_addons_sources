const searchForm = document.getElementById('yahooSearch');
const queryInputYahoo = document.getElementById('yahooSearchQuery');
searchForm.addEventListener('submit', event => yahooSearch(event));

const yahooSearch = e => {
	e.preventDefault();
	const query = queryInputYahoo.value.trim();
	if (query !== '') {
		const searchQuery = encodeURIComponent(query);
		const yahooSearchUrl = `https://search.yahoo.com/yhs/search?hspart=ata&hsimp=yhs-001&type=type9087534-aal-151007-151008&param1=151007&param2=151008&p=${searchQuery}&grd=1`;
		window.location.href = yahooSearchUrl;
		queryInputYahoo.value = '';
	}
};
