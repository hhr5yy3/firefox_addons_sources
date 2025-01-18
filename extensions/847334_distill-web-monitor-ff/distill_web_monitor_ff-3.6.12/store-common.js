Prefs.defaults = {
  'active': true,
  'nworkers': 3,
  'account.sync': false,
  'actions.audio': true,
  'actions.popup': true,
  'actions.popup.autohide': 20,
  'errorAction.minCount': 5,
  'errorAction.enabled': true,
  'errorAction.interval': 15,
  'errorAction.sound': '/skin/media/buzzer.ogg',
  // 'page.embedded': true,
  // 'page.embedded.dock': 'R',
  'sticky-window-timeout': 6,
  'sieve-slot.start': '00:00',
  'sieve-slot.end': '23:59',
  'time-slot-map': {
    '0': {'start': '00:00', 'end': '23:59'},
    '1': {'start': '00:00', 'end': '23:59'},
    '2': {'start': '00:00', 'end': '23:59'},
    '3': {'start': '00:00', 'end': '23:59'},
    '4': {'start': '00:00', 'end': '23:59'},
    '5': {'start': '00:00', 'end': '23:59'},
    '6': {'start': '00:00', 'end': '23:59'},
  },
  'x-frame-load-in': 'tab', // bg, tab, window, sticky_window
};

execQuery = promisifyOrCallback(execQuery);
function SQLStore(options) {
  const self = this;
  const debouncedSyncPost = _.debounce(() => SyncMan.post(this), 120000);

  _.extend(this, {
    primaryKey: 'id',
    tableName: options.name, // alias for statements library
  }, options, {
    fields: _.flatten(_.pluck(options.versions, 'fields')),
  });
  this.fieldIndex = _.indexBy(this.fields, 'name');
  this.fieldNames = _.pluck(this.fields, 'name');

  this.syncable = !!self.sync;


  this.create = create = promisifyOrCallback(create);
  this.destroy = destroy = promisifyOrCallback(destroy);
  this.destroyWithSubQuery = destroyWithSubQuery = promisifyOrCallback(destroyWithSubQuery);
  this.find = find = promisifyOrCallback(find);
  this.findOne = findOne = promisifyOrCallback(findOne);
  this.update = update = promisifyOrCallback(update);
  this.updateLocal = updateLocal;
  this.hasField = hasField;

  SQLStore[this.name] = this;

  function formatFields(doc) {
    const newDoc = _.extend({}, doc);
    _.each(doc, function(value, key) {
      const
        field = self.fieldIndex[key];

      if (key === 'ts' || key.indexOf('ts_') === 0) {
        if (_.isNumber(value)) {
          try {
            // console.log('formatFields: ', value, key)
            newDoc[key] = new Date(value).toISOString();
            // console.log('formatFields: date - ', newDoc[key])
          } catch (e) {
            console.error(e);
          }
        }
      } else if (field && field.type == 'json') {
        if (_.isString(value)) {
          newDoc[key] = JSON.parse(value);
        }
      } else if (field && field.type == 'boolean') {
        newDoc[key] = value ? true : false;
      }
    });
    if (!options.formatFields) {
      return newDoc;
    }
    return options.formatFields(newDoc);
  }

  function deformatFields(doc) {
    // console.log('deformatFields: oldDoc - ', doc)
    const newDoc = _.extend({}, doc);
    _.each(doc, function(value, key) {
      const
        name = key.split('.')[0];


      const field = self.fieldIndex[key];

      if (name === 'ts' || name.indexOf('ts_') === 0) {
        if (_.isString(value)) {
          newDoc[key] = new Date(value).valueOf();
        }
      } else if (field && field.type == 'json') {
        if (_.isObject(value)) {
          newDoc[key] = JSON.stringify(value);
        }
      } else if(field && field.type == 'boolean') {
        newDoc[key] = value ? 1 : 0;
      }
    });
    // console.log('deformatFields: newDoc - ', newDoc)
    return newDoc;
  }

  // $api
  async function create(doc, callback) {
    // console.log('create doc: ', doc);
    const canSync = self.syncable && auth.isLoggedIn();

    _.defaults(doc, {_state: C.LOCAL_STATE_POST}, _.result(self, 'defaults'));

    if (canSync && doc._state !== C.LOCAL_STATE_SYNCED) {
      try {
        const response = await api(self.urls.root, 'POST', doc);
        doc = {...doc, ...response};
        doc._state = C.LOCAL_STATE_SYNCED;
      } catch (err) {
        _.defaults(doc, {id: guid()});
      }
    }
    createLocalDoc(deformatFields(doc), callback);
  }

  function createLocalDoc(doc, callback) {
    _.defaults(doc, {id: guid()});

    const
      id = doc.id;


    const outValues = [];


    const sql = Statements.insert(self, doc, outValues);

    callback || (callback = function() {});
    execQuery(sql, outValues, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        findOne(id, function(err, doc) {
          callback(err, formatFields(doc));
          !err && doc && gEvents.trigger('store:'+self.name+':create', doc);
        });
      }
    });
  }

  // $api
  function destroy(query, callback) {
    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    callback || (callback = function() {});

    async.series({
      list: function(callback) {
        find(query, {only: ['id']}, callback);
      },
      destroys: function(callback) {
        const
          outValues = [];


        const sql = Statements.destroy(self, query, outValues);

        execQuery(sql, outValues, callback);
      },
    }, function(err, result) {
      callback(err, result.destroys);

      if (!err && result.list.count > 0) {
        result.list.data.forEach(function(row) {
          // console.log('Destroying ', row)
          gEvents.trigger('store:'+self.name+':destroy', row);
        });
      }
    });
  }

  // Need a special function to delete fields using a select from the same
  // table that requires LIMIT and OFFSET.
  // XXX Why not make it the default destroy implementation?
  function destroyWithSubQuery(query, options, callback) {
    options || (options = {});
    query = deformatFields(query);

    let ids;

    _.extend(options, {
      only: ['id'], // XXX Assuming that in our case, all tables have id.
    });

    async.waterfall([
      function(callback) {
        const
          outValues = [];


        const subQuery = Statements.select(self, query, options, outValues);

        execQuery(subQuery, outValues, options, callback);
      },
      function(rows, callback) {
        ids = _.pluck(rows, 'id');

        const
          outValues = [];


        const destroyQuery = Statements.destroy(self, {
          'id.in': ids,
        }, outValues);

        execQuery(destroyQuery, outValues, callback);
      },
    ], function(err, result) {
      callback(err, result);

      if (!err) {
        _.each(ids, function(id) {
          gEvents.trigger('store:'+self.name+':destroy', {id: id});
        });
      }
    });
  }

  // $api
  function find(query, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    query || (query = {});
    query = deformatFields(query);
    options || (options = {});
    callback || (callback = function() {});

    _.defaults(options, {
      limit: DEFAULT_LIMIT,
      offset: 0,
      order: ['-ts'],
    });

    async.parallel({
      data: function(callback) {
        const
          outValues = [];


        const sql = Statements.select(self, query, options, outValues);

        execQuery(sql, outValues, options, callback);
      },
      total_count: function(callback) {
        const
          outValues = [];


        const countOptions = {count: 1};


        const sql = Statements.select(self, query, countOptions, outValues);

        execQuery(sql, outValues, countOptions, callback);
      },
    }, function(err, result) {
      if (err) {
        DBG && console.error('ERR:STORE:', err);
        callback(err);
      } else {
        result.data = _.map(result.data, formatFields);
        result.count = result.data.length;
        result.offset = options.offset;
        result.total_count = result.total_count.count;
        // DBG && console.log('STORE:FIND:result', result);

        callback(null, result);
      }
    });
  }

  function findOne(query, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    options || (options = {});
    callback || (callback = function() {});

    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    _.extend(options, {
      limit: 1,
    });

    const
      outValues = [];


    const sql = Statements.select(self, query, options, outValues);

    execQuery(sql, outValues, options, function(err, result) {
      callback(err, (result && result.length > 0) ? formatFields(result[0]) : null);
    });
  }

  function hasField(name) {
    return self.fieldNames.indexOf(name) >= 0;
  }

  async function update(query, doc, callback) {
    // console.log(self.name, '--UPDATE--', {...doc});

    const canSync = self.syncable && auth.isLoggedIn();
    // (self.name=='sieves') && console.trace();
    callback || (callback = function() {});

    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    // console.log('STORE: UPDATE:', self.name, query, doc);
    try {
      if (doc._state === -1) {
        // If state is default, only store locally, do nothing else
        delete doc._state;
      } else if (_.isUndefined(doc._state)) {
        doc._state = C.LOCAL_STATE_PUT;
      }
      // console.log(doc)
      const oldLocalRes = await find(query, {
        limit: 10000,
      });
      await updateLocalDocsAfterSync(doc, oldLocalRes);

      // Handle post case -> Call syncman post after delay
      // return doc when one is trying to patch one document
      callback(null, query.id ? {
        id: query.id,
        ts_mod: Date.now(),
        _count: oldLocalRes.count,
      } : oldLocalRes.count);
      canSync && debouncedSyncPost();
      oldLocalRes.data.forEach(function(row) {
        // console.log(_.extend(row, doc))
        gEvents.trigger('store:'+self.name+':update', _.extend(row, doc));
      });
    } catch (e) {
      console.error('Error updating store:', self.name, e);
      callback(e);
    }
  }

  async function updateLocalDocsAfterSync(doc, oldRes) {
    // if _state or ts_mod is set to -1; they should not be updated
    const setTsMod = doc.ts_mod !== -1;
    const tsMod = (new Date()).toISOString();
    const canSync = self.syncable && auth.isLoggedIn();
    for (const i in oldRes.data) {
      let methodName = 'PUT';
      const oldDoc = oldRes.data[i];
      let newDoc = {};
      try {
        // In sync, change only diff, and in case of put apply doc over oldDoc and put
        if (oldDoc._state == C.LOCAL_STATE_SYNCED) {
          for (const key in doc) {
            if (oldDoc[key] !== doc[key]) {
              newDoc[key] = doc[key];
            }
          }
        } else {
          newDoc = {...oldDoc, ...doc};
          if (oldDoc._state == C.LOCAL_STATE_POST && newDoc._state != C.LOCAL_STATE_SYNCED) {
            methodName = 'POST';
          }
        }

        delete newDoc._state;
        if (!setTsMod) {
          delete newDoc.ts_mod;
        }
        const isEmpty = _.isEmpty(newDoc);

        if (!isEmpty && setTsMod && _.isUndefined(newDoc.ts_mod)) {
          newDoc.ts_mod = tsMod;
        }

        if (doc._state == C.LOCAL_STATE_SYNCED) {
          newDoc._state = doc._state;
        } else if (canSync && !isEmpty
        // shouldn't if doc was synced from remote
        // doc._state must be used for this check
        // doc._state != C.LOCAL_STATE_SYNCED -- done in prev if check
        ) {
          const urlTpl = methodName=='POST' ? self.urls.root : self.urls.id;
          const url = Mustache.render(urlTpl, oldDoc);
          const response = await api(url, methodName, newDoc);
          _.extend(newDoc, response);
          newDoc._state = C.LOCAL_STATE_SYNCED;
        } else if (isEmpty) {
          // This is fine, we diff only when old doc is synced
          newDoc._state = C.LOCAL_STATE_SYNCED;
          // } else if(doc._state == -1) { -- it is deleted by caller
          // No need to update _state
        } else if (doc._state != void 0) { // synced is handled in 1st if block
          // Mark default dirty _state based on what was older _state
          newDoc._state = oldDoc._state == C.LOCAL_STATE_POST ? oldDoc._state : doc._state;
        }
      } catch (err) {
        console.error('syncAndUpdateLocal:', err);
        newDoc._state = doc._state != null ? doc._state :
          (oldDoc._state != null ? oldDoc._state : C.LOCAL_STATE_POST);
      }
      await updateLocal(oldDoc.id, newDoc);
    }
  }

  async function updateLocal(query, doc) {
    // console.log('updateLocal', self.name, id, doc)
    if (_.isString(query)) {
      query = {id: query};
    }
    const
      outValues = [];


    const sql = Statements.update(self, query, deformatFields(doc), outValues);
    return await execQuery(sql, outValues);
  }
}


window.MaintLog = new SQLStore({
  name: 'maint_logs',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'version', type: 'integer'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.ClientStore = new SQLStore({
  name: 'clients',
  urls: {
    root: '/clients',
    id: '/clients/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      // Comment out altered fields. Original name is preserved in new field
      // definition
      /* { name: 'id',           type: 'string', primaryKey: 1 }, */
      {name: 'user_id', type: 'string'},
      {name: 'type', type: 'integer'},
      {name: 'name', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'info', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [],
  }, {
    version: 4,
    fields: [
      // Altered field with oldName attribute. Keep altered fields as last
      // fields in the list.
      {name: 'id', type: 'string', oldName: 'id'},
    ],
  }, {
    version: 5,
    fields: [
      // Altered field with oldName attribute. Keep altered fields as last
      // fields in the list.
      {name: 'version', type: 'string'},
      {name: 'messages_state', type: 'json', default: '"{}"'},
      {name: 'is_worker', type: 'boolean', default: true}
    ]}
  ],
  // These are custom extensions to column defs
  unique: ['id', 'user_id'],
  extension: ', UNIQUE (id, user_id) ON CONFLICT REPLACE',
});

window.UserStore = new SQLStore({
  name: 'users',
  urls: {
    root: '/users',
    id: '/users',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'full_name', type: 'string'},
      {name: 'bio', type: 'string'},
      {name: 'email', type: 'string'},
      {name: 'website', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'locale', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'prefs', type: 'json'},
    ],
  }, {
    version: 4,
    fields: [
      {name: 'account_id', type: 'string'},
      {name: 'role', type: 'string'},
    ],
  }, {
    version: 5,
    fields: [
      {name: 'billing_address', type: 'json'},
    ],
  }],
});
window.ClientGroupStore = new SQLStore({
  name: 'users_clients_groups',
  urls: {
    root: '/clients-groups',
    // id: '/clients-groups/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'cgid', type: 'string'},
      {name: 'user_id', type: 'string'},
      {name: 'client_id', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
});
window.SieveStore = new SQLStore({
  name: 'sieves',
  urls: {
    root: '/sieves',
    id: '/sieves/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'rule_id', type: 'string'},
      {name: 'content_type', type: 'integer'},
      {name: 'config', type: 'string'},
      {name: 'schedule', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_READY},
      {name: 'text', type: 'string'},
      {name: 'tags', type: 'string'}, // de-normalized tag data
      // Timestamp when sievedata changed.
      {name: 'ts_data', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      // When it was last viewed by user
      {name: 'ts_view', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'client_id', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'err', type: 'string'},
    ],
  }, {
    version: 4,
    fields: [
      {name: 'session_id', type: 'string'},
      {name: 'proxy_id', type: 'string'},
      {name: 'meta', type: 'json'},
      {name: 'ext', type: 'json'},
    ],
  }, {
    version: 5,
    fields: [
      {name: 'macro_id', type: 'string'},
    ],
  }, {
    version: 6,
    fields: [
      {name: 'datasource_id', type: 'string'},
    ],
  }, {
    version: 7,
    fields: [
      {name: 'crawler_id', type: 'string'},
    ],
  },],
  defaults: function() {
    return {
      client_id: Prefs.get('client.id'),
      user_id: auth.getId(),
    };
  },
});

window.TagStore = new SQLStore({
  name: 'tags',
  urls: {
    root: '/tags',
    id: '/tags/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'user_id', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
      state: 0,
    };
  },
});

window.SieveDataStore = new SQLStore({
  name: 'sieve_data',
  urls: {
    root: '/sieves/-/data',
    id: '/sieves/{{sieve_id}}/data/{{id}}',
  },
  sync: {
    push: true,
    pull: false,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'data_type', type: 'integer'},
      {name: 'data', type: 'string'},
      {name: 'text', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }, {
    version: 3,
      fields: [
        { name: 'client_id', type: 'string' },
        { name: 'meta', type: 'json', default:'"{}"'},
        { name: 'triggered', type: 'boolean', default: false }
      ],
    }],
  // Override meta.rules to meta.rule
  // https://github.com/distill-io/distill.io/issues/1493
  formatFields: function (doc) {
    if (!doc.meta) {
      return doc;
    }
    if (doc.meta?.rules) {
      doc.meta.rule = doc.meta.rules;
    }
    return doc;
  }
});

window.SieveDataProxy = _.extend({}, SieveDataStore, {
  find: promisifyOrCallback(async function(query, options, callback) {
    options || (options = {})
    const sieveId = query.sieve_id;
    const offset = options.offset || 0;
    // If sieve_id
    // console.log('SieveDataProxy:', sieveId);
    if (sieveId && offset == 0) {
      const sieve = await SieveStore.findOne({id: sieveId});

      // Find last sieve data for sieve_id
      const sieveData = await SieveDataStore.findOne({
        sieve_id: sieveId,
      }, {
        order: ['-ts'],
      });
      // console.log(sieve, sieveData);

      // Check if out of sync
      // If yes, sync sieve data for sieveId
      if ((!sieveData || (sieveData.ts !== sieve.ts_data)) && (auth.isLoggedIn())) {
        // console.log('Hitting get');
        try {
          await SyncMan.get(SieveDataStore, {
            query: {
              sieve_id: sieveId,
            },
          });
        } catch (e) {
          // Ignore network error
          if (sieve.client_id != SyncId.get()) {
            return callback(e);
          }
        }
      }
    }
    SieveDataStore.find(query, options, callback);
  }),
});

// SieveDataProxy = SieveDataStore;

window.ActionStore = new SQLStore({
  name: 'actions',
  urls: {
    root: '/sieves/-/actions',
    id: '/sieves/{{sieve_id}}/actions/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'type', type: 'integer'},
      {name: 'config', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'user_id', type: 'string'},
    ],
  }],
  defaults: function() {
    return {
      state: 0,
      user_id: auth.getId(),
    };
  },
});

window.RuleStore = new SQLStore({
  name: 'rules',
  urls: {
    root: '/rules',
    id: '/rules/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'config', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'version', type: 'string'},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
    };
  },
});

window.AttrStore = new SQLStore({
  name: 'attrs',
  urls: {
    root: '/users/attrs',
    id: '/users/attrs/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'value', type: 'string'},
      {name: 'state', type: 'integer'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
    };
  },
});

// Stores errors related to activities that should be reviewed manually.
window.ErrorStore = new SQLStore({
  name: 'errors',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      // Context name describes the context in which this error occurred.
      {name: 'context', type: 'string'},
      // Human readable error message (template?).
      {name: 'msg', type: 'string'},
      // Contextual data when this error happened.
      {name: 'data', type: 'string'},
      // Actual error message received.
      {name: 'err', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
});

window.WorkStore = new SQLStore({
  name: 'works',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'rel', type: 'string'},
      {name: 'key', type: 'string'},
      {name: 'err', type: 'string'},
      {name: 'data', type: 'string'},
      {name: 'duration', type: 'integer'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'snapshot_id', type: 'string'},
    ],
  }],
});

window.PopupMessageStore = new SQLStore({
  name: 'popup_messages',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'rel', type: 'string'},
      {name: 'key', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'title', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'msg', type: 'string'},
    ],
  }],
});

window.KVStore = new SQLStore({
  name: 'kv',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'value', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.SieveSnapshotStore = new SQLStore({
  name: 'sieve_snapshots',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'work_id', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'content', type: 'string'},
      {name: 'content_type', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.MacroStore = new SQLStore({
  name: 'macros',
  urls: {
    root: '/macros',
    id: '/macros/{{id}}',
  },
  sync: {
    push: false,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'spec', type: 'json'},
      {name: 'steps', type: 'json'},
      {name: 'state', type: 'integer'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'meta', type: 'json'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  },
  {
    version: 2,
    fields: [
      {name: 'version', type: 'integer'}
    ]
  }],
});

window.REMOTE_LOCAL_NAME_MAP = {
  'clients': 'clients',
  'sieves': 'sieves',
  'sieve_actions': 'actions',
  'sieve_data': 'sieve_data',
  'sieve_rules': 'rules',
  'user_attrs': 'attrs',
  'tags': 'tags',
  'users': 'users',
  'users_clients_groups' : 'users_clients_groups',
  'macros' : 'macros'
};
