function initStores(callback) {
  // Update version when adding or removing tables
  const
    stores = [
      MaintLog, ClientStore, UserStore, SieveStore, TagStore, SieveDataStore,
      ActionStore, RuleStore, AttrStore, ErrorStore, WorkStore, PopupMessageStore,
      KVStore, ClientGroupStore, SieveSnapshotStore, MacroStore,
    ];
  const DB_VERSION = 4;


  const versions = stores.map(function(store) {
    return _.last(store.versions).version;
  });


  const version = _.reduce(versions, function(m, v) {
    return v + m;
  }, 0);


  const dbConfig = stores.reduce(function(memo, store) {
    memo[store.tableName] = store.fieldNames;
    return memo;
  }, {});

  // console.log('dbConfig:', dbConfig);

  const db = SQLStore.db = new zango.Db(name, DB_VERSION, dbConfig);
  db.on('blocked', function() {
    // XXX Should be emit a global event instead signalling fatal error?
    callback(new Error('Database version could not be upgraded'));
    callback = null;
  });

  try {
    MaintLog.findOne({id: 0}, function(err, res) {
      if (err) {
        return callback && callback({
          code: 'EDATABASEOPEN',
          msg: 'Failed to access database; check browser settings',
          err: err,
        });
      }
      Prefs.__init__(function(err) {
        if (!Prefs.get('since')) {
          Prefs.set('since', {
            time: new Date(),
            version: CFG.VERSION,
            nhist: 4,
          });
        }
        callback && callback(err);
      });
    });
  } catch (e) {
    console.error('Failed to open database connection', e);

    callback && callback({
      code: 'EDATABASEOPEN',
      msg: 'Failed to access database; check browser settings',
      err: e,
    });
  }
}

