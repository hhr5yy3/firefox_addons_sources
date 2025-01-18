(function (global) {

  function hashFeed(feed) {
    const
      entries = feed.entries;
    entries.forEach(function (entry) {
      entry._hash = [entry.link, entry.title, entry.description || entry.summary || ''].join(':');
    });
    return feed;
  }

  function findChanges(dict) {

    const
      changes = [],
      newEntries = dict.newHashedFeed.entries,
      newHashes = _.pluck(newEntries, '_hash'),
      oldHashes = _.pluck(dict.oldHashedFeed.entries, '_hash');

    newHashes.forEach((aHash, i) => {
      if (oldHashes.indexOf(aHash) < 0) {  // if new hash not present in old hash array then pushed to changes[]
        changes.push(newEntries[i]);
      }
    })
    return changes;
  }

  async function getUpdatedEntries(diffHtml, dict, context) {
    dict['newHashedFeed'] = hashFeed(dict['newHashedFeed']);
    dict['oldHashedFeed'] = dict['oldHashedFeed'] && hashFeed(dict['oldHashedFeed']);
    const
      changes = findChanges(dict),
      updatedEntries = [],
      addedEntries = [],
      oldEntries = dict.oldHashedFeed.entries,
      oldHashes = _.pluck(dict.oldHashedFeed.entries, '_hash');

    await Promise.all(changes.map(async (entry) => {
      const index = oldEntries.findIndex((e) => e.link === entry.link);
      if (index >= 0 && entry['_hash'] != oldHashes[index]) {// if new entry present in previous entry also but hash doesn't match
        //do diffing over this entry and push to changes
        // TODO diff for title
        const doc1 = oldEntries[index].description || oldEntries[index].summary;
        const doc2 = entry.description || entry.summary;
        const data = await diffHtml(`<div>${doc1}</div>`, `<div>${doc2}</div>`, context + index);
        entry.description = data;
        updatedEntries.push(entry);
      } else {
        entry.description || (entry.description = entry.summary);
        addedEntries.push(entry);
      }
    }))
    return { changes, updatedEntries, 'newEntries': addedEntries };
  }

  global.feeddiff = {
    getUpdatedEntries
  };

  if (typeof module == 'object') {
    module.exports = {
      feeddiff: global.feeddiff,
    }
  }

  if (typeof define != 'undefined' && define.amd) {
    define('feeddiff', ['async'], function (_async) {
      async = _async;
      return global.feeddiff
    });
  }
})(this);


