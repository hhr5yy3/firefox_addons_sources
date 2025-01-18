if (WebExtension === undefined) {
  var WebExtension = chrome || browser;
}

var ExtensionStorage = (datamodel, datamodel_updates) => {
  'use strict';
  let self = {},
    options = {},
    locked = false,
    save_que = false,
    init = false,
    initializing = false,
    version = 0,
    filters = [],
    dm = datamodel,
    dmu = datamodel_updates,
    storage_area,
    storage_namespace,
    initCallbacks = [],
    upgrade = (items) => {
      for (let i = items.version + 1, n = dmu.length; i < n; ++i) {
        dmu[i](items);
        version = i;
      }
      return items;
    },
    setStorageArea = (isSyncStorageEnabled) => {
      storage_area = WebExtension.storage.local;
      storage_namespace = 'local';
      if (isSyncStorageEnabled){
        storage_area = WebExtension.storage.sync;
        storage_namespace = 'sync';
      }
    },
    isSyncStorageEnabled = async () => {
      let currentError = WebExtension.runtime.lastError;
      try{
        await new Promise((resolve,reject) => {
          WebExtension.storage.sync.get(null, () => {
            if (currentError !== WebExtension.runtime.lastError) {
              return reject(WebExtension.runtime.lastError);
            }
            resolve();
          });
        });
        return true;
      } catch(e){}
      return false;
    },
    load = () => {
      return new Promise((resolve, reject) => {
        storage_area.get(dm, (items) => {
          if (WebExtension.runtime.lastError) {
           return reject(WebExtension.runtime.lastError);
          }
          upgrade(items);
          options = items.options;
          version = items.version;
          resolve();
        });
      });
    },
    save = () => {
      return new Promise((resolve) => {
        if (locked) {
          save_que = true;
          return;
        }

        locked = true;
        storage_area.set({options: options, version: version}, async () => {
          locked = false;
          if (save_que) {
            save_que = false;
            await save();
          }
          resolve();
        });
      });
    };

    WebExtension.storage.onChanged.addListener((changes, namespace) => {
      'use strict';
      if (changes && changes.options && namespace === storage_namespace) {
        WebExtension.runtime.sendMessage({action: 'current_options', data: {options: changes.options.newValue}});
      }
    });
  self = {
    init: () => {
      return new Promise(async (resolve)=>{
        if (!init && !initializing) {
          initializing=true
          setStorageArea(await isSyncStorageEnabled());
          await load();
          init = true;
          for(let i in initCallbacks)
            initCallbacks[i]();
          initCallbacks = []
          initializing = false;
        }
        if(init)
          resolve()
        if (initializing){
          initCallbacks.push(resolve)
        }
      })
    },
    addValidationFilter: (filter) => {
      filters.push(filter);
    },
    update: (o) => {
      for (let i = 0, n = filters.length; i < n; ++i) {
        if (!filters[i](o)) {
          return false;
        }
      }
      options = o;
      return save();
    },
    options: () => {
      return options;
    },
    reset: async () => {
      let items = JSON.parse(JSON.stringify(dm));
      options = upgrade(items).options;
      return await save();
    }
  };
  return self;
};
