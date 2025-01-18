var auth = _.extend({

  clear: function(callback) {
    Prefs.del('client.token');
  },

  isLegacy: function() {
    const installedVersion = auth.getVersion();
    const vInstall = installedVersion.split('.');
    const vMarker = [1, 11];
    const len = Math.max(vInstall.length, vMarker.length);

    for (let i = 0; i < len; i += 1) {
      const vi = parseInt(vInstall[i]||0); const vm = vMarker[i]||0;
      if (vi !== vm) {
        return vi < vm;// it is legacy version
      }
    }
    return false;// current ver is not legacy
  },

  logout: function() {
    auth.clear();
    auth.trigger('logout');
  },

  // Deprecated method
  _get: function(callback) {
    const name = Prefs.get('service.name');
    const password = Prefs.get('service.password');
    const cred = password ? { name, password, } : null;
    callback && callback(null, cred);
    return cred;
  },

  getId: function() {
    // XXX Set a default value of null, when it is undefined, IndexexDB (zangodb)
    // queries where they look for null values won't work
    return Prefs.get('service.user_id', null);
  },

  _setId: function(id) {
    Prefs.set('service.user_id', id);
  },

  getToken: function() {
    return Prefs.get('client.token');
  },

  _setToken: function(token) {
    Prefs.set('client.token', token);
  },

  setUserIdAndToken: async function(token, uid) {
    await ClientStore.update({
      id: SyncId.get(),
      user_id: '$null',
    }, {
      user_id: uid,
      _state: C.LOCAL_STATE_SYNCED,
    });

    auth._setId(uid);
    auth._setToken(token);

    auth.trigger("login")
    return true;
  },

  getUser: promisifyOrCallback(function(callback) {
    UserStore.findOne(auth.getId(), callback);
  }),

  getVersion: function() {
    return Prefs.get('since')['version'];
  },

  isLoggedIn: function() {
    return !!auth.getToken();
  },

  isLoginMandatory: function() {
    /*
    let version = auth.getVersion();
    if(auth.isLegacy()) {
      return !!auth.getId()
    } else {
      return true;
    }
    */
    return !!auth.getId();
  },

  isReady: function() {
    return (auth.isLoggedIn() || !auth.isLoginMandatory());
  },

  on401: function() {
    if (auth.isLoggedIn()) {
      auth.logout();
      auth.trigger('expired');
    }
  },

  // Fetch and save logged in user
  init: function(callback = function(err) {
    err && console.error('auth.init', err);
  }) {
    const oldCreds = auth._get();
    const token = auth.getToken();

    if (auth.getId() && !token) {
      // User was logged in at some point of time but does not have a valid token
      if (oldCreds) {
        // Get auth token from server
        auth.saveToken(oldCreds, callback);
      } else {
        // Can't get a token, send error. Should show a notice to the user.
        return callback({code: 'EAUTH', msg: 'Authentication required'});
      }
    } else if (token) {
      auth.initUser(callback);
    } else {
      callback();
    }
  },

  initUser: async function(callback = function() {}) {
    // console.trace()
    try {
      let user = await UserStore.findOne(auth.getId());
      if (!user) {
        user = await api('/users/self', 'GET');
        await UserStore.create(_.extend({_state: C.LOCAL_STATE_SYNCED}, user));
      }

      callback();
    } catch (e) {
      if (await UserStore.findOne(auth.getId())) { // slow network temporary solution for initUser failure
        callback();
      } else {
        callback(e);
      }
    }
  },

  // Check credentials and save token for auth for this client
  saveToken: function(params, callback) {
    ClientStore.findOne(SyncId.get(), function(err, client) {
      if (err) {
        // show watchlist with err code
        return callback(err);
      }
      if (!client) {
        // show watchlist with err code
        return callback({
          code: 'ECLIENT',
          msg: 'Failed to find client metadata',
        });
      }
      params.client = client;
      HTTP.post({
        url: CFG.URL.API + '/users/client_token',
        json: params,
      }, async (err, xhrObj) => {
        if (err) {
          // show watchlist with err code
          return callback(err);
        }
        let res = xhrObj.response;
        // Client is created on server as part of this call
        await ClientStore.update({
          id: client.id,
          user_id: '$null',
        }, {
          user_id: res.user_id,
          _state: C.LOCAL_STATE_SYNCED,
        });

        const
          token = res.token;
        auth._setId(res.user_id);
        auth._setToken(token);
        auth.initUser(callback);
      });
    });
  },

}, Backbone.Events);
