import { abortError, readOnlyError } from "./error.js";
export function idbRequest(r) {
    // Bug 1193394 fixed in Firefox 60 (Promise invalidates IDBRequest)
    return new Promise((resolve, reject) => {
        r.addEventListener('success', () => resolve(r.result));
        r.addEventListener('error', () => reject(r.error));
        r.addEventListener('abort', () => reject(abortError()));
    });
}
export function idbTransaction(r) {
    return new Promise((resolve, reject) => {
        r.addEventListener('complete', () => resolve());
        r.addEventListener('error', () => reject(r.error));
        r.addEventListener('abort', () => reject(abortError()));
    });
}
export async function* idbCursorRequest(r) {
    let resolve;
    let reject;
    r.addEventListener('error', () => reject(r.error));
    r.addEventListener('abort', () => reject(abortError()));
    r.addEventListener('success', () => resolve());
    for (;;) {
        await new Promise((newResolve, newReject) => {
            resolve = newResolve;
            reject = newReject;
        });
        const cursor = r.result;
        if (!cursor)
            break;
        yield cursor;
        cursor.continue();
    }
}
export class SimpleStorage {
    constructor(objectStoreName) {
        this.objectStoreName = objectStoreName;
    }
    static async create(databaseName = 'simpleStorage', { version = undefined, objectStoreName = 'simpleStorage', migrate = async () => { }, } = {}) {
        const that = new this(objectStoreName);
        const request = indexedDB.open(databaseName, version);
        request.onupgradeneeded = async (event) => {
            const db = request.result;
            that.currentObjectStore = event.oldVersion ?
                request.transaction.objectStore(objectStoreName) :
                db.createObjectStore(objectStoreName);
            await migrate();
        };
        that.database = await idbRequest(request);
        that.currentObjectStore = undefined;
        return that;
    }
    async transaction(mode, fn) {
        if (this.currentObjectStore) {
            if (this.currentObjectStore.transaction.mode == 'readonly'
                && mode == 'readwrite')
                throw readOnlyError();
            return await fn();
        }
        else {
            this.currentObjectStore = this.objectStore(mode);
            try {
                return await fn();
            }
            finally {
                this.currentObjectStore = undefined;
            }
        }
    }
    objectStore(mode) {
        if (this.currentObjectStore)
            return this.currentObjectStore;
        return this.database.transaction(this.objectStoreName, mode)
            .objectStore(this.objectStoreName);
    }
    get(key) {
        return idbRequest(this.objectStore('readonly').get(key));
    }
    getAll(range) {
        return idbRequest(this.objectStore('readonly').getAll(range));
    }
    keys() {
        return idbRequest(this.objectStore('readonly').getAllKeys());
    }
    entries(range, mode) {
        return idbCursorRequest(this.objectStore(mode).openCursor(range));
    }
    set(key, value) {
        return idbRequest(this.objectStore('readwrite').put(value, key));
    }
    async insert(key, fn) {
        const store = this.objectStore('readwrite');
        const cursor = await idbRequest(store.openCursor(key));
        if (cursor)
            return cursor.value;
        const value = fn();
        await idbRequest(store.add(value, key));
        return value;
    }
    delete(key) {
        return idbRequest(this.objectStore('readwrite').delete(key));
    }
    clear() {
        return idbRequest(this.objectStore('readwrite').clear());
    }
    close() { this.database.close(); }
    mutableFile(filename, type = 'application/octet-stream') {
        return idbRequest(this.database.createMutableFile(filename, type));
    }
}
export class SimpleMutableFile {
    constructor(mutableFile) {
        this.mutableFile = mutableFile;
    }
    open() {
        if (!this.cachedHandle || !this.cachedHandle.active)
            this.cachedHandle = this.mutableFile.open('readwrite');
        return this.cachedHandle;
    }
    write(data, location) {
        const handle = this.open();
        handle.location = location;
        return idbRequest(handle.write(data));
    }
    read(size, location) {
        const handle = this.open();
        handle.location = location;
        return idbRequest(handle.readAsArrayBuffer(size));
    }
    truncate(start) {
        const handle = this.open();
        return idbRequest(handle.truncate(start));
    }
    flush() {
        const handle = this.open();
        return idbRequest(handle.flush());
    }
    getFile() {
        return idbRequest(this.mutableFile.getFile());
    }
    // Firefox 74 has removed IDBMutableFile.getFile (Bug 1607791)
    get requiresTempStorage() { return !this.mutableFile.getFile; }
    async getFileWithTempStorage(tempStorage, prefix) {
        const SLICE_SIZE = 1024 * 1024 * 128;
        const handle = this.open();
        const size = (await idbRequest(handle.getMetadata())).size;
        const blobs = [];
        for (let p = 0; p < size; p += SLICE_SIZE) {
            const key = [prefix, p];
            await tempStorage.set(key, new Blob([await this.read(SLICE_SIZE, p)]));
            blobs.push(await tempStorage.get(key));
        }
        return new File(blobs, this.mutableFile.name, { type: this.mutableFile.type });
    }
    static cleanupTempStorage(tempStorage, prefix) {
        return tempStorage.delete(IDBKeyRange.bound([prefix], [prefix, []]));
    }
}
SimpleMutableFile.isAvailable = 'IDBMutableFile' in window;
