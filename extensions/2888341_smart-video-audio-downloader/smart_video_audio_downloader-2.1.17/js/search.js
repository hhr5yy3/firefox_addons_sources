const Search = {
    fetchSearchResults(url, onSuccess, onError) {
      const apiUrl = 'https://fetch.tube/api/search';
  
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch search results');
          return response.json();
        })
        .then((data) => {
          if (data.result === 'success') {
            this.cacheSearchData(url, data);
            onSuccess(data);
          } else {
            onError();
          }
        })
        .catch((error) => {
          onError();
        });
    },
  
    cacheSearchData(url, metadata) {
      coreAPI.storage.local.get('downloads', (result) => {
        const downloads = result.downloads || {};
        const entry = downloads[url] || { video: {}, audio: {} };
  
        if (metadata) {
          entry.video = { title: metadata.title, thumbnail: metadata.thumbnail, state: 'found' };
          entry.audio = { title: metadata.title, thumbnail: metadata.thumbnail, state: 'found' };
        } else {
          entry.state = 'not_found';
        }
  
        downloads[url] = entry;

        coreAPI.storage.local.set({ downloads });
      });
    },
  };
  