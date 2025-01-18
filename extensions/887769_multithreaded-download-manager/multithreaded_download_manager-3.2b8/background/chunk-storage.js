import '../util/polyfills.js';
import { SimpleStorage, SimpleMutableFile } from "../util/storage.js";
import { typedArrayToBuffer, concatTypedArray } from "../util/util.js";
import { CriticalSection } from "../util/promise.js";
import { assert, unreachable } from "../util/error.js";
import { isWebExtOOPDisabled } from "./webext-oop.js";
import { S } from "./settings.js";
import { SimpleEventListener } from '../util/event.js';
export class ChunkStorage {
    constructor(id) {
        this.id = id;
        this.onError = new SimpleEventListener();
    }
    static get implementations() {
        return {
            MutableFile: MutableFileChunkStorage,
            SegmentedFile: SegmentedFileChunkStorage,
        };
    }
}
export class ChunkStorageWriter {
    constructor(parent, startPosition, writtenSize = 0) {
        this.parent = parent;
        this.startPosition = startPosition;
        this.writtenSize = writtenSize;
        this.promise = Promise.resolve();
    }
    sync(fn) {
        const result = this.promise.then(fn);
        this.promise = result.catch(error => {
            this.promise = this.promise.then(() => { }, () => { });
            if (this.parent)
                this.parent.onError.dispatch(error);
        });
        return result;
    }
    // CANNOT reorder
    write(data) { return this.sync(() => this.doWrite(data)); }
    flush() { return this.sync(() => this.doFlush()); }
    // NOT thread safe
    async doWrite(_data) { unreachable(); }
    async doFlush() { }
}
export class MutableFileChunkStorage extends ChunkStorage {
    constructor() {
        super(...arguments);
        this.flushInterval = Infinity;
        this.persistCriticalSection = new CriticalSection();
        this.persistSentry = {};
        // Written at totalSize for shared files
        // [ persistenceData.length - 1, (startPosition, currentSize)...  ]
        this.persistenceData = new Float64Array([0]);
    }
    get mfileName() { return `${this.id}`; } // backward compatibility
    async init(isLoaded) {
        const storage = await MutableFileChunkStorage.storage;
        let mutableFile = isLoaded ?
            await storage.get(this.mfileName) : undefined;
        if (!mutableFile) {
            mutableFile = await storage.mutableFile(`chunk-storage-${this.id}`);
            await storage.set(this.mfileName, mutableFile);
        }
        this.file = new SimpleMutableFile(mutableFile);
    }
    async load(totalSize) {
        try {
            const BYTES = Float64Array.BYTES_PER_ELEMENT;
            const size = new Float64Array(await this.file.read(BYTES, totalSize))[0];
            if (!size /* 0 | undefined */)
                return [];
            const data = new Float64Array(await this.file.read(BYTES * (size + 1), totalSize));
            if (data.length !== size + 1)
                return [];
            assert(this.persistenceData.length === 1); // cannot be called after writer
            this.persistenceData = data;
        }
        catch (error) {
            console.warn('MutableFileChunkStorage.load', this.mfileName, error);
        }
        const result = [];
        for (let i = 1; i < this.persistenceData.length; i += 2)
            result.push(new MutableFileChunkStorage.Writer(this, i));
        return result;
    }
    writer(startPosition) {
        const persistenceIndex = this.persistenceData.length;
        this.persistenceData = concatTypedArray([
            this.persistenceData, new Float64Array([startPosition, 0])
        ]);
        this.persistenceData[0] += 2;
        return new MutableFileChunkStorage.Writer(this, persistenceIndex);
    }
    persist(totalSize, final) {
        if (totalSize === undefined)
            return Promise.resolve();
        const sentry = this.persistSentry;
        return this.persistCriticalSection.sync(async () => {
            if (sentry !== this.persistSentry)
                return;
            if (final)
                await this.file.truncate(totalSize);
            else
                await this.file.write(typedArrayToBuffer(this.persistenceData), totalSize);
        });
    }
    // Workaround for disabling webext-oop
    get snapshotName() { return `${this.mfileName}-snapshot`; }
    async getFile() {
        if (this.file.requiresTempStorage) {
            return this.file.getFileWithTempStorage(await MutableFileChunkStorage.tempStorage, this.mfileName);
        }
        if (isWebExtOOPDisabled) {
            const storage = await MutableFileChunkStorage.storage;
            storage.set(this.snapshotName, await this.file.getFile());
            return storage.get(this.snapshotName);
        }
        return this.file.getFile();
    }
    reset() {
        this.persistenceData = new Float64Array([0]);
        this.persistSentry = {};
        void this.file.truncate(0);
    }
    async delete() {
        const storage = await MutableFileChunkStorage.storage;
        void storage.delete(this.mfileName);
        void storage.delete(this.snapshotName);
        const tempStorage = await MutableFileChunkStorage.tempStorage;
        SimpleMutableFile.cleanupTempStorage(tempStorage, this.mfileName);
        // other methods can still access the unlinked file
    }
    async *readSlices(totalSize) {
        const SLICE_SIZE = 1024 * 1024 * 16;
        for (let position = 0; position < totalSize; position += SLICE_SIZE)
            yield await this.file.read(SLICE_SIZE, position);
    }
}
MutableFileChunkStorage.isAvailable = 'IDBMutableFile' in window;
MutableFileChunkStorage.storage = SimpleStorage.create("files");
// Firefox 74 has removed IDBMutableFile.getFile (Bug 1607791)
MutableFileChunkStorage.tempStorage = SimpleStorage.create(`files-temp-storage`);
(function (MutableFileChunkStorage) {
    class Writer extends ChunkStorageWriter {
        constructor(parent, persistenceIndex) {
            super(parent, parent.persistenceData[persistenceIndex], parent.persistenceData[persistenceIndex + 1]);
            this.parent = parent;
            this.writtenSizeIndex = persistenceIndex + 1;
        }
        async doWrite(data) {
            if (!data.length)
                return;
            const { persistenceData } = this.parent;
            await this.parent.file.write(typedArrayToBuffer(data), this.startPosition + this.writtenSize);
            this.writtenSize += data.length;
            persistenceData[this.writtenSizeIndex] = this.writtenSize;
        }
    }
    MutableFileChunkStorage.Writer = Writer;
})(MutableFileChunkStorage || (MutableFileChunkStorage = {}));
export class SegmentedFileChunkStorage extends ChunkStorage {
    constructor() {
        super(...arguments);
        this.currentFileCount = 0;
        this.flushInterval = S.segmentsIntervalInit;
        this.nextUpdateFileCount = S.segmentsIntervalGrowPerFiles;
        this.flushSentry = {};
    }
    get keyRange() { return IDBKeyRange.bound([this.id], [this.id, []]); }
    getEntries() { return this.storage.entries(this.keyRange, 'readonly'); }
    updateFlushInterval() {
        this.flushInterval = Math.min(S.segmentsIntervalMax, S.segmentsIntervalInit * S.segmentsIntervalGrowFactor **
            Math.floor(this.currentFileCount / S.segmentsIntervalGrowPerFiles));
        this.nextUpdateFileCount = this.currentFileCount
            - (this.currentFileCount % S.segmentsIntervalGrowPerFiles)
            + S.segmentsIntervalGrowPerFiles;
    }
    async init(isLoaded) {
        this.storage = await SegmentedFileChunkStorage.storagePromise;
        if (!isLoaded)
            await this.reset();
    }
    async load() {
        const result = [];
        let startPosition = 0;
        let bufferPosition = 0;
        this.currentFileCount = 0;
        for await (const cursor of this.getEntries()) {
            const [, position] = cursor.primaryKey;
            if (position !== bufferPosition) {
                assert(position > bufferPosition);
                result.push(new SegmentedFileChunkStorage.Writer(this, startPosition, bufferPosition - startPosition));
                startPosition = bufferPosition = position;
            }
            bufferPosition += cursor.value.size; // assert(size > 0)
            this.currentFileCount++;
        }
        if (bufferPosition > startPosition) // <=> bufferPosition > 0
            result.push(new SegmentedFileChunkStorage.Writer(this, startPosition, bufferPosition - startPosition));
        this.updateFlushInterval();
        return result;
    }
    writer(startPosition) {
        return new SegmentedFileChunkStorage.Writer(this, startPosition);
    }
    async persist() { }
    async getFile() {
        const blobs = [];
        let bufferPosition = 0;
        for await (const cursor of this.getEntries()) {
            const [, position] = cursor.primaryKey;
            assert(position === bufferPosition);
            blobs.push(cursor.value);
            bufferPosition += cursor.value.size;
        }
        return new File(blobs, "file");
    }
    reset() {
        this.flushSentry = {};
        this.currentFileCount = 0;
        this.updateFlushInterval();
        return this.storage.delete(this.keyRange);
    }
    delete() { return this.reset(); }
    async *readSlices() {
        const blobs = [];
        for await (const cursor of this.getEntries())
            blobs.push(cursor.value);
        for (const blob of blobs)
            yield await blob.arrayBuffer();
    }
}
SegmentedFileChunkStorage.isAvailable = true;
SegmentedFileChunkStorage.storagePromise = SimpleStorage.create("segments");
(function (SegmentedFileChunkStorage) {
    class Writer extends ChunkStorageWriter {
        constructor() {
            super(...arguments);
            this.bufferData = [];
            this.bufferPosition = this.startPosition + this.writtenSize;
            this.flushSentry = this.parent.flushSentry;
        }
        async doWrite(data) {
            if (!data.length)
                return;
            this.bufferData.push(data);
            this.writtenSize += data.length;
        }
        async doFlush() {
            if (this.flushSentry !== this.parent.flushSentry)
                return;
            if (!this.bufferData.length)
                return;
            const data = concatTypedArray(this.bufferData);
            assert(data.length > 0);
            await this.parent.storage.set([this.parent.id, this.bufferPosition], new Blob([data]));
            this.bufferPosition += data.length;
            this.bufferData = [];
            this.parent.currentFileCount++;
            if (this.parent.currentFileCount >= this.parent.nextUpdateFileCount)
                this.parent.updateFlushInterval();
        }
    }
    SegmentedFileChunkStorage.Writer = Writer;
})(SegmentedFileChunkStorage || (SegmentedFileChunkStorage = {}));
