
/** @const {string} */
var kExtensionId = '1centext_ff@1c.ru';

/** @const {string} */
var kVendorPrefix = '1c.';

/** @const {string} */
var kStorageKey = '1cExtensionData';

/** @enum {number} */
var NativeMessageType = {
    TYPE_HELLO: 0,
    TYPE_HELLO_REPLY: 1,
    TYPE_CHUNK: 17,
    TYPE_CALLBACK: 15,
    TYPE_CALL: 2,
    TYPE_CALLREPLY: 3,
    TYPE_CREATE: 4,
    TYPE_CREATEREPLY: 5,
    TYPE_SETPROPERTY: 6,
    TYPE_GETPROPERTY: 8,
    TYPE_GETPROPERTYREPLY: 9,
    TYPE_DESTROY: 10,
    TYPE_ERROR: 11,
    TYPE_BAY: 12,
    TYPE_EVENT: 13,
    TYPE_EVENTREPLY: 14
};

/** @enum{string} */
var NativeMessageClassName  = {
    FILE_STAT_CLASS_NAME: 'FileStat',
    FILE_MAIN_CLASS_NAME: 'MainCls',
    CRYPTO_TOOLS_MANAGER_CLASS_NAME: 'CryptoToolsManager',
    FILE_STREAM_CLASS_NAME: 'FileStream'
}
