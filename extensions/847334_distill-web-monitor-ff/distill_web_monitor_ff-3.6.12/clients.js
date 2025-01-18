// Id to sync data across different devices.
var SyncId = {

  webAppId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
  anyLocalId: C.DEFAULT_GROUPID,

  create: function (callback) {
    // console.log('client.create');
    let
      client_id = Prefs.get('client.id');


    let clientDoc;

    async.waterfall([
      function (callback) {
        const doc = {
          type: CFG.CLIENT.TYPE,
          name: CFG.CLIENT.NAME,
          info: CFG.CLIENT.INFO,
          // By default, sync is not authorized.
          state: C.STATE_DEFAULT,
          version: CFG.VERSION,
          is_worker: true,
        };
        client_id && (doc.id = client_id);
        // user_id && (doc.user_id = user_id); // Remove dependency on auth
        ClientStore.create(doc, callback);
      },
      function (_clientDoc, callback) {
        clientDoc = _clientDoc;
        client_id = clientDoc.id;
        Prefs.set('client.id', client_id);
        KVStore.destroy({ id: 'client_id' }, callback);
      },
      function (res, callback) {
        KVStore.create({ id: 'client_id', value: client_id }, callback);
      },
    ], function (err) {
      callback(err, clientDoc);
    });
  },

  init: function (callback) {
    SyncId.findId(function (err, client_id) {
      if (client_id) {
        Prefs.set('client.id', client_id);
        // Query ClientStore to make sure that an entry for client_id exists
        // for currently authenticated user. If this is not so, make sure that
        // we create one.
        const query = { id: client_id };
        // user_id && (query.user_id = user_id);   // Remove dependency on auth
        ClientStore.findOne(query, function (err, doc) {
          // console.log('findOne:', err, doc);
          if (!doc) {
            // XXX The db is out of sync. Possible reasons:
            // 1. Restored from backup of an older version.
            // 2. Copied from another client.
            // console.log('to create:', err, doc);
            SyncId.create(callback);
          } else {
            // We are all set, there is nothing left for us to do.
            callback(null, doc);
            ClientStore.update(query, { state: C.STATE_DEFAULT });
          }
        });
      } else {
        _getId().then(id => {
          if (id && id.length == 36) {
            // Save client id only iff it is a valid uuid
            Prefs.set('client.id', id);
          } else {
            const generateId = guid();
            Prefs.set('client.id', generateId);
            _setId(generateId);
          }
          SyncId.create(callback);
        })
          .catch(() => {
            Prefs.set('client.id', guid());
            SyncId.create(callback);
          })
      }
    });
  },

  findId: function (callback) {
    const client_id = Prefs.get('client.id');
    if (client_id) {
      callback(null, client_id);
    } else {
      // A more durable form of storage - can be restored from a backup
      KVStore.findOne({ id: 'client_id' }, function (err, doc) {
        callback(err, doc && doc.value);
      });
    }
  },

  get: function (callback) {
    return Prefs.get('client.id');
  },

};

function pruneDeletedSieve(callback) {
  SieveStore.destroy({
    state: C.STATE_DEL,
    $or: {
      _state: C.LOCAL_STATE_POST,
      user_id: null,
    },
  }, function (err, list) {
    if (err) {
      callback(err);
    } else {
      /*
      execQuery('DELETE FROM sieve_data WHERE id IN (SELECT sieve_data.id '
        + 'FROM sieve_data LEFT JOIN sieves ON '
        + 'sieves.id = sieve_data.sieve_id WHERE sieves.id IS NULL)',
        [], {},
        function(err, res) {
          callback(err);
        });
      */
      // pruneOrphanedData(callback);
      callback();
    }
  });
}

// delete the snapshots created when the logic for removing them was not there inside insertWork fn
//  remove the snapshots not referenced by works
function pruneSieveSnapshots(callback) {
  if (CFG.CLIENT.TYPE !== C.CLIENT_CR) {
    return callback()
  }

  execQuery('DELETE FROM sieve_snapshots WHERE id NOT IN (SELECT works.snapshot_id FROM works where works.snapshot_id IS NOT NULL)',
    [], {},
    function (err, res) {
      callback(err);
    });
}

function pruneOrphanedData(callback) {
  async.series([
    function (callback) {
      // Delete orphaned actions and data.
      async.each([ActionStore, SieveDataStore], function (store, callback) {
        const
          n = store.name;


        const sql = 'SELECT ' + n + '.id FROM ' + n + ' LEFT JOIN sieves ON ' + n + '.sieve_id=sieves.id WHERE sieves.id IS NULL';
        execQuery(sql, [], {}, function (err, list) {
          if (err) {
            callback(err);
          } else {
            const
              ids = _.pluck(list, 'id');
            // NOTE Limit maximum number of ids that can be passed to a query
            // in a single call. We destroy in chunks of 100.
            async.whilst(function () {
              return ids.length > 0;
            }, function (callback) {
              store.destroy({
                'id.in': ids.splice(0, 500), // SQLITE_MAX_VARIABLE_NUMBER is 999
              }, callback);
            }, callback);
          }
        });
      }, callback);
    },
    function (callback) {
      // Delete orphaned rules.
      const sql = 'SELECT rules.id FROM rules LEFT JOIN sieves on rules.id = sieves.rule_id where sieves.rule_id IS NULL';
      execQuery(sql, [], {}, function (err, list) {
        if (err) {
          callback(err);
        } else {
          RuleStore.destroy({
            'id.in': _.pluck(list, 'id'),
          }, callback);
        }
      });
    },
  ], callback);
}

function initData(callback) {
  const clientId = Prefs.get('client.id');

  async.series([
    // Prune data that has not been synced and has been marked for deletion
    pruneDeletedSieve,
    pruneSieveSnapshots,
    function (callback) {
      PopupMessageStore.destroy({}, callback);
    },
    // Make sure that we have updated state and _state
    function (callback) {
      // Update the _state to mark records for sync
      async.each([
        ClientStore, SieveStore, TagStore, SieveDataStore, ActionStore,
        RuleStore, AttrStore, ClientGroupStore/* ErrorStore, WorkStore,*/
      ],
        function (store, callback) {
          store.update({ _state: null }, {
            _state: C.LOCAL_STATE_POST,
            ts_mod: -1,
          }, callback);
        }, callback);
    },
    function (callback) {
      async.each([
        ClientStore, SieveStore, TagStore, SieveDataStore, ActionStore,
        RuleStore, AttrStore, ClientGroupStore /* ErrorStore, WorkStore,*/
      ],
        function (store, callback) {
          store.update({ state: null }, {
            state: C.STATE_DEFAULT,
            ts_mod: -1,
            _state: -1,
          }, callback);
        }, callback);
    },
    function (callback) {
      SieveStore.update({
        rule_id: '',
      }, {
          rule_id: null,
          ts_mod: -1,
          _state: -1,
        }, callback);
    },
    function (callback) {
      // console.log('update client_id');
      SieveStore.update({ client_id: null }, {
        client_id: clientId,
        ts_mod: -1,
        _state: -1,
      }, callback);
    },
    function (callback) {
      const user_id = auth.getId();
      if (!user_id) {
        callback();
        return;
      }
      async.parallel([
        function (callback) {
          ClientStore.update({
            'user_id': null,
            'id.nin': [SyncId.webAppId, SyncId.anyLocalId],
          }, {
              user_id: user_id,
              ts_mod: -1,
              _state: -1,
            }, callback);
        },
        function (callback) {
          async.each(
            [SieveStore, TagStore, ActionStore, RuleStore, AttrStore],
            function (store, callback) {
              store.update({
                user_id: null,
              }, {
                  user_id: user_id,
                  ts_mod: -1,
                  _state: -1,
                }, callback);
            }, callback);
        },
      ], callback);
    },
  ], callback);
}

async function _getId() {
  // Used when extension is reinstalled to recover the older client id using cookies
  const url = `${CFG.URL.AUTH}/client/id`;
  let res = await fetch(url);
  let text = await res.text();
  return text;
}

async function _setId(id) {

  const url = `${CFG.URL.AUTH}/client/id`;
  return await fetch(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'PATCH',
    body: 'id=' + id
  })
}
