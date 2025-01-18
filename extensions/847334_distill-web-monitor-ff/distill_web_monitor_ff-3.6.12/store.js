const DEFAULT_LIMIT = 50;

function SimpleStore(name) {
  this.name = name;
}

_.extend(SimpleStore.prototype, Backbone.Events, {
  defaults: {},

  storage: chrome.storage.local,

  __init__: promisifyOrCallback(function(callback) {
    this.storage.get(this.name, (items) => {
      this.data = items[this.name] || {};
      callback && callback();
    });
  }),

  del(key) {
    const value = this.data[key];
    delete this.data[key];
    this.save();
    return value;
  },

  getDefault(key) {
    return this.defaults[key];
  },

  get(key, defaultValue) {
    const value = this.data[key];
    return value !== void 0 ? _.clone(value) :
      (arguments.length > 1 ? defaultValue : this.getDefault(key));
  },

  save() {
    const
      items = {};
    items[this.name] = this.data;
    this.storage.set(items);
  },

  set(key, value) {
    const oldValue = this.data[key];
    if (oldValue !== value) {
      this.data[key] = value;
      this.save();
      this.trigger('change:' + key, value, oldValue, key);
      gEvents.trigger('change:pref:' + key, value, oldValue, key);
    }
  },
});

Prefs = new SimpleStore('prefs');

function execQuery(query, values, options, callback) {
  // console.log('STORE: QUERY:', query, values);
  // console.trace();

  if (_.isFunction(options)) {
    callback = options;
    options = null;
  }

  if (_.isFunction(values)) {
    callback = values;
    options = null;
    values = null;
  }

  options || (options = {});

  const
    isSelect = query.isSelect;

  // TODO zango db api
  query.exec(SQLStore.db, function (err, result) {
    // console.log('RESULT', err, query.selector, result);
    if (err) {
      return callback({
        code: 'query:' + err.code,
        message: err.message,
      });
    }

    // TODO
    if (options.count) {
      callback(null, result.rows[0]);
    } else if (isSelect) {
      callback(null, result.rows);
    } else {
      callback(null/* , _.pick(result, 'length')*/);
    }
  });
}
execQuery = promisifyOrCallback(execQuery);

function openConnection(name, callback) {
  // noop
}
