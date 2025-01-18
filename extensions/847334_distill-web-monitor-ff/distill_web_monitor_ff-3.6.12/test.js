DBG = 1;

const URL_TEST = 'http://example.org';

const loaderOptions = {
  type: 'tab',
  info: {
    active: true,
    pinned: false,
  },
  pageMods: ['locator'],
};

async function test_loader() {
  let loader = await createLoader(loaderOptions);
  await loader.load(URL_TEST);
  console.log('loader loaded', loader);
  await loader.destroy();
  console.log('loader destroyed', loader);
}

async function test_loader_existing_tab() {
  let tab = await chrome.tabs.createAsync({active: true});
  await chrome.tabs.updateAsync(tab.id, { url:  URL_TEST});
  await wait(3000);
  console.log('creating loader');
  let info = {...loaderOptions.info, tabId: tab.id};
  let loader = await createLoader({...loaderOptions, info });
  await loader.waitForEvent('reset');
  console.log('loader did reset');
  await loader.destroy();
  await wait(1000);
  console.log('creating new loader for the same tab');
  loader = await createLoader({...loaderOptions, info });
  await loader.waitForEvent('reset', 5000);
  console.log('loader did reset again');
}

async function test_loader_page_mod() {
  let loader = await createLoader({
    ...loaderOptions,
  });
  await loader.load(URL_TEST);
  console.log('loader loaded', loader);
  await loader.destroy();
}

async function test_loader_page_mod_error() {
  let loader = await createLoader({
    ...loaderOptions,
    pageMods: ['doesnt-exist'],
  });
  try {
    await loader.load(URL_TEST);
  } catch(e) {
    console.log('expected init error:', e);
    await loader.destroy();
  }
}

async function test_locator() {
  let loader = await createLoader({
    ...loaderOptions,
    pageMods: ['locator'],
  });
  await loader.load(URL_TEST);
  let res = await loader.request(0, {
    path: 'getHTML',
  });
  console.log('getHTML:res', res);
  await loader.destroy();
}

async function test_runner(uri, selector) {
  console.log('TEST:test_runner');

  const runner = new Runner({
    id: 'A_SIEVE_ID',
    content_type: C.TYPE_HTML,
    config: {
      includeStyle: false,
      includeScript: false,
      selections: [{
        delay: 10,
        frames: [{
          excludes: [],
          includes: [{
            expr: selector || 'h1',
            type: 'css',
          }],
          index: 0,
        }],
      }],
    },
    schedule: {
      type: 'INTERVAL',
      params: {interval: 60},
    },
    uri: uri || URL_TEST,
  });

  runner.run(function(err, result, metrics) {
    if (err) {
      console.error('ERR!TASKS:', err);
    } else {
      console.log('TASKS:result:text:', result, metrics);
    }
  });
}

async function test_runner_static(uri, selector) {
  console.log('TEST:test_runner');

  const runner = new Runner({
    id: 'A_SIEVE_ID',
    content_type: C.TYPE_HTML,
    config: {
      includeStyle: false,
      includeScript: false,
      selections: [{
        dynamic: false,
        frames: [{
          excludes: [],
          includes: [{
            expr: selector || 'h1',
            type: 'css',
          }],
          index: 0,
        }],
      }],
    },
    schedule: {
      type: 'INTERVAL',
      params: {interval: 60},
    },
    uri: uri || URL_TEST,
  });

  runner.run(function(err, result, metrics) {
    if (err) {
      console.error('ERR!TASKS:', err);
    } else {
      console.log('TASKS:result:text:', result, metrics);
    }
  });
}

async function test_runner_live(uri, selector) {
  console.log('TEST:test_runner_live');

  const runner = new LiveRunner({
    id: 'A_SIEVE_ID',
    content_type: C.TYPE_HTML,
    config: {
      includeStyle: false,
      includeScript: false,
      selections: [{
        frames: [{
          excludes: [],
          includes: [{
            expr: selector || 'h1',
            type: 'css',
          }],
          index: 0,
        }],
      }],
    },
    schedule: {
      type: 'INTERVAL',
      params: {interval: 60},
    },
    uri: uri || URL_TEST,
  });

  runner.run(function(err, result, metrics) {
    if (err) {
      console.error('ERR!TASKS:', err);
    } else {
      console.log('TASKS:result:text:', result, metrics);
    }
  });

  await wait(1000);

  // runner.abort();
}
