const getLocalStorage = (key, callback) => {
  coreAPI.storage.local.get(key, (result) => callback(result[key] || {}));
};

const setLocalStorage = (key, value, callback) => {
  coreAPI.storage.local.set({ [key]: value }, callback);
};
