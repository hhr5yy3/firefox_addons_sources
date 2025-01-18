var SyncMan = _.extend({}, Backbone.Events, {

  accountEnabled: false,

  syncTimer: {},

  canSync: function() {
    return auth.isLoggedIn();
  },

  clearTimers: function() {
    _.each(this.syncTimer, function(timeoutId) {
      clearTimeout(timeoutId);
    });
    this.syncTimer = {};
  },

  del: promisifyOrCallback(function(store, callback) {
    // console.log('del:', store.name);
    const urlTpl = (store.urls.id);
    store.find({
      _state: C.LOCAL_STATE_DEL,
    }, function(err, resp) {
      if (err) {
        callback(err);
        return;
      }
      // console.log('to delete:', resp.count, resp.data);
      async.eachSeries(resp.data, function(doc, callback) {
        const url = Mustache.render(urlTpl, doc);
        api(url, 'DELETE', function(err) {
          if (err) {
            console.error('error deleting model from server:', err);
            store.update(doc.id, {
              _state: C.LOCAL_STATE_DEL_ERR,
            }, callback);
          } else {
            store.destroy(doc.id, callback);
          }
        });
      }, callback);
    });
  }),
  get: promisifyOrCallback(function(store, options, callback) {
    //
    if (typeof options == 'function') {
      callback = options;
      options = {};
    }
    function getSyncSuffix() {
      const
        query = options.query || {};


      const keys = Object.keys(query).sort();

      if (keys.length === 0) {
        return '';
      }

      const
        parts = keys.map(function(key) {
          return key + '_' + query[key];
        });

      return '_' + parts.join('_');
    }
    let
      tsDoc;


    let resp;


    const user_id = auth.getId();


    const tsSyncId = user_id+'_ts_sync_'+store.name+getSyncSuffix();

    async.waterfall([
      function(callback) {
        KVStore.findOne(tsSyncId, {
          only: ['id', 'value'],
        }, callback);
      },
      function(_tsDoc, callback) {
        // console.log('_tsDoc:', _tsDoc);
        tsDoc = _tsDoc;

        const url = store.urls.root;
        const query = _.extend({
          // Overrides API query default.
          'client_id': '-',
          // Remove any default query filter based on actions for /v1
          'state': '-',
          '_opt': {
            order: ['ts_mod', 'id'],
            limit: store.name == SieveDataStore.name ? 50 : 200,
          },
        }, options.query);

        if (tsDoc) {
          const parts = tsDoc.value.split(',');
          const sTsMod = new Date(parts[0] == 'null' ? 0 : parts[0]); // some tables can return null ts_mod
          const sId = parts[1];

          if (sId) {
            query.$or = {
              'ts_mod.gt': new Date(sTsMod.valueOf() + 1).toISOString(),
              '$and1': {
                'ts_mod.gte': sTsMod.toISOString(),
                'id.gt': sId,
              },
            };
          } else {
            query['ts_mod.gt'] = new Date(sTsMod.valueOf() + 1).toISOString();
          }
        } else {
          // Do not fetch deleted items for first sync
          query['state.nin'] = [C.STATE_DEL, C.STATE_ARCHIVED, ];
        }

        api(url, 'GET', query, callback);
      },
      function(_resp, callback) {
        // console.log('get:resp', store.name, _resp);
        resp = _resp;
        // TODO Fastest way to arrive at the logic would be to query the DB
        // for existing records and then perform the operations.
        async.eachSeries(resp.data, function(remoteDoc, callback) {
          // console.log('remotedoc:', remoteDoc.ts_mod);
          // XXX Find based on combination of id and user_id (if applicable)
          const query = _.pick(remoteDoc, 'id', 'user_id');
          store.findOne(query, {
            only: ['id', '_state'],
          }, function(err, localDoc) {
            remoteDoc._state = C.LOCAL_STATE_SYNCED;
            if (_.isUndefined(remoteDoc.state)) {
              remoteDoc.state = C.STATE_DEFAULT;
            }
            if (localDoc) {
              if (remoteDoc.state == C.STATE_DEL) {
                store.destroy(query, callback);
              } else {
                if (localDoc._state === C.LOCAL_STATE_PUT) {
                  // Let local changes overwrite remote ones
                  callback();
                } else {
                  store.update(query, remoteDoc, callback);
                }
              }
            } else {
              store.create(remoteDoc, callback);
            }
          });
        }, callback);
      },
      function(callback) {
        if (resp.count === 0) {
          callback();
        } else {
          const
            doc = _.pick(resp.data[resp.count - 1], 'id', 'ts_mod');


          const ref = doc.ts_mod + ',' + doc.id;

          if (tsDoc) {
            KVStore.update(tsDoc.id, {
              value: ref,
            }, callback);
          } else {
            KVStore.create({
              id: tsSyncId,
              value: ref,
            }, callback);
          }
        }
      },
    ], function(err) {
      if (err) {
        callback(err);
      } else if (resp.total_count > resp.count) {
        // If there are more items to be synced, get them.
        SyncMan.get(store, options, callback);
      } else {
        callback();
      }
    });
  }),
  post: promisifyOrCallback(function(store, callback) {
    // throw new Error();
    // console.log('post:', store.name);
    const
      url = store.urls.root;


    const user_id = auth.getId();

    store.find({
      'user_id': user_id,
      '_state': C.LOCAL_STATE_POST,
      '$or': {
        'state': null,
        'state.nin': [C.STATE_DEL],
      },
    }, {
      limit: 10,
      order: ['ts_mod'],
    }, function(err, resp) {
      // console.log('docs to post:', resp.data);
      async.eachSeries(resp.data, function(doc, callback) {
        api(url, 'POST', doc, async function(err, res) {
          if (err) {
            if (err.status == 409) {
              // The document was already created, we will resync later
              store.update(doc.id, {
                _state: C.LOCAL_STATE_PUT,
              }, function(errUpdate) {
                callback();
              });
            } else if (err.status == 461 && store == SieveStore) {
              // This error is received when a referenced entity was not found
              // It is similar to 404 where a parent entity could not be found
              const count = await RuleStore.updateLocal(doc.rule_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(RuleStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
              } else {
                // The related rule doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status == 404 && res && res.param == 'sieve_id' && store.hasField('sieve_id')) {
              // When we reach here, SieveStore should have been synced, but didnt
              // Try to post that sieve once again
              const count = await SieveStore.updateLocal(doc.sieve_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(SieveStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
                // XXX Can we  be stuck in a look?
              } else {
                // The related sieve doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status > 200 && err.status < 502) {
              // XXX Find the reason of error and take action accordingly
              // 1. Find if the resource exists and if so PUT it.
              // 2. In other cases, set it up for manual resolution.

              const
                urlTpl = (store.urls.id);


              const urlId = Mustache.render(urlTpl, doc);

              api(urlId, 'GET', async function(errGet, doc) {
                if (errGet) {
                  if (errGet.status > 200 && errGet.status < 502) {
                    await store.updateLocal(doc.id, {_state: C.LOCAL_STATE_POST_ERR});
                    callback();
                  } else {
                    // In case the error is due to intermittent connection, abort.
                    callback(err);
                  }
                } else {
                  // If there was a document at the server, update local's status
                  store.update(doc.id, {
                    _state: C.LOCAL_STATE_PUT,
                  }, function(errUpdate) {
                    callback();
                  });
                }
              });
            } else {
              // On other non-distill related errors, send error
              callback(err);
            }
          } else {
            savedDoc = res;
            // console.log('posted doc:', store.name, savedDoc.id);
            // XXX We query using ts_mod to handle cases when an update was
            // performed on an unsynced item. We leave unsynced items unchanged.
            const
              query = _.pick(doc, 'id', 'user_id', 'ts_mod');
            store.update(query, _.extend(savedDoc, {
              _state: C.LOCAL_STATE_SYNCED,
            }), async function(err, updatedDoc) {
              if (err) {
                return callback(err);
              }
              if (updatedDoc._count == 0) {
                // The doc was modified while we were posting it. Set its state
                // to PUT
                await store.updateLocal(_.omit(query, 'ts_mod'), {
                  _state: C.LOCAL_STATE_PUT,
                });
              }
              callback();
            });
          }
        });
      }, function(err) {
        if (err) {
          callback(err);
        } else if (resp.total_count > resp.count) {
          // console.log('post: again', store.name);
          SyncMan.post(store, callback);
        } else {
          callback();
        }
      });
    });
  }),
  put: promisifyOrCallback(function(store, callback) {
    // console.log('put:', store.name);
    const
      urlTpl = (store.urls.id);
    user_id = auth.getId();

    store.find({
      user_id: user_id,
      _state: C.LOCAL_STATE_PUT,
    }, {
      limit: 10,
    }, function(err, resp) {
      async.eachSeries(resp.data, function(doc, callback) {
        const
          url = Mustache.render(urlTpl, doc);


        let query = _.pick(doc, 'id', 'user_id');

        // console.log('put:url:', url, doc);
        api(url, 'PUT', doc, async function(err, res) {
          if (err) {
            if (err.status == 461 && store == SieveStore) {
              // This error is received when a referenced entity was not found
              // It is similar to 404 where a parent entity could not be found
              const count = await RuleStore.updateLocal(doc.rule_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(RuleStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
              } else {
                // The related rule doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status == 404 && res && res.param == 'sieve_id' && store.hasField('sieve_id')) {
              // When we reach here, SieveStore should have been synced, but didnt
              // Try to post the sieve once again
              const count = await SieveStore.updateLocal(doc.sieve_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(SieveStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
                // XXX Can we  be stuck in a look?
              } else {
                // The related sieve doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
            } else if (err.status == 404) {
              store.update(query, {
                _state: C.LOCAL_STATE_POST,
              }, function(errUpdate) {
                callback(); // Err-less callback
              });
            } else if (err.status > 200 && err.status < 502) {
              // Server request resulted in error due to inconsistent state
              store.update(query, {
                _state: C.LOCAL_STATE_PUT_ERR,
              }, function(errUpdate) {
                callback(); // Err-less callback
              });
            } else {
              callback(err); // Bubble up error
            }
          } else {
            query = _.pick(res, 'id', 'user_id');
            store.update(query, _.extend(res, {
              // FIXME Race condition when an attribute changed while it was
              // being synced?
              _state: C.LOCAL_STATE_SYNCED,
            }), callback);
          }
        });
      }, function(err) {
        if (err) {
          callback(err);
        } else if (resp.total_count > resp.count) {
          // console.log('put: again', store.name);
          SyncMan.put(store, callback);
        } else {
          callback();
        }
      });
    });
  }),
  sync: promisifyOrCallback(function(clearTimers, callback) {
    // XXX When called explicitly, we clear the lock
    clearTimers && this.clearTimers();

    pruneDeletedSieve(function(err) {
      if (err) {
        return callback(err);
      }
      async.eachSeries(
        [ClientStore, UserStore, AttrStore, RuleStore, TagStore, SieveStore, SieveDataStore,
          ActionStore, ClientGroupStore, MacroStore],
        function(store, callback) {
          SyncMan.syncStore(store, callback);
        }, callback);
    });
  }),
  syncStore: function(store, options, callback) {
    const
      self = this;


    const name = store.name;

    if (typeof options == 'function') {
      callback = options;
      options = {};
    }

    callback || (callback = function(err) {
      err && console.error(err);
    });

    _.defaults(options, {
      delay: 100,
    });

    if (!this.canSync()) {
      callback({msg: 'e_sync_disabled'});
      return;
    }

    if (!this.accountEnabled) {
      callback({msg: 'e_sync_server_na'});
      return;
    }

    // This timer acts as a lock to prevent concurrent calls to sync same store
    if (!this.syncTimer[name]) {
      var timeoutId = setTimeout(function() {
        const syncTimeoutId = setTimeout(function() {
          // Don't remove if it was removed already
          if (self.syncTimer[name] === timeoutId) {
            // Report error and remove lock
            DBG && console.error('Removing store\'s lock after timeout:', name);
            self.syncTimer[name] = 0;
          }
        }, 120 * 1000);

        self._syncStore(store, function(err, res) {
          // Clear lock's timeout check
          clearTimeout(syncTimeoutId);
          // Remove sync lock
          self.syncTimer[name] = 0;
          if (err) {
            DBG && console.error('Sync failed', err);
          }
          callback(err);
        });
      }, options.delay);

      // Set lock that will be removed after sync completes
      this.syncTimer[name] = timeoutId;
    } else {
      // Sync again after old call has completed?
      self.once(name + ':sync', function (err, res) {
        if (err) {
          callback(err);
        } else {
          self.syncStore(store, options, callback);
        }
      });
    }
  },
  _syncStore: promisifyOrCallback(function(store, callback) {
    // console.log('_syncStore:', store.name);
    SyncMan.trigger(store.name+':sync:init');
    async.series({
      del: function(callback) {
        SyncMan.del(store, callback);
      },
      get: function(callback, force=false) {
        (store.sync.pull || force) ? SyncMan.get(store, callback) : callback();
      },
      put: function(callback) {
        SyncMan.put(store, callback);
      },
      post: function(callback) {
        SyncMan.post(store, callback);
      },
    }, function(err, res) {
      callback(err, res);
      SyncMan.trigger(store.name+':sync', err, res);
    });
  }),
});
