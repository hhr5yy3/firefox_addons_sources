document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-query').value;
  if (query) {
    chrome.runtime.sendMessage({ action: 'search', query });
  } else {
    alert('Please enter a search query.');
  }
});
