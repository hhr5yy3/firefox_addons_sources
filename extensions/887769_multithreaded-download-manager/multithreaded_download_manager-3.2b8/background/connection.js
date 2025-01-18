import { CriticalSection } from "../util/promise.js";
import { concatTypedArray } from "../util/util.js";
import { abortError, ReportedError } from "../util/error.js";
import { parseContentDisposition } from "./content-disposition.js";
import { M } from "../util/webext/i18n.js";
import { cryptoRandomString } from "../common/common.js";
const connectionHeader = 'x-multithreaded-download-manager-' + cryptoRandomString();
const connectionInitIdMap = new Map();
export class Connection {
    constructor(request, onFinish, { expectedSize = undefined, requestSubstituteFilename = false, } = {}) {
        this.onFinish = onFinish;
        this.startTime = performance.now();
        this.controller = new AbortController();
        this.pendingData = [];
        this.done = false;
        const initId = Connection.nextInitId++;
        request.headers.set(connectionHeader, '' + initId);
        connectionInitIdMap.set(initId, this);
        this.referrer = request.referrer;
        this.info = (async () => {
            let response;
            try {
                response = await fetch(request, { signal: this.controller.signal });
            }
            catch (error) {
                if (error && error.name === 'TypeError' &&
                    ('' + error.message).startsWith('NetworkError'))
                    throw new ReportedError(M.e_networkError, error);
                throw error;
            }
            finally {
                connectionInitIdMap.delete(initId);
            }
            if (!response.ok) {
                const error = new ReportedError(M.e_serverError, response.status);
                throw Connection.toFatal(error);
            }
            const info = {
                finalURL: response.url,
                acceptRanges: false,
                substituteFilename: '',
            };
            let contentDisposition = '';
            for (const [name, value] of response.headers) {
                const lname = name.toLowerCase();
                if (lname === 'content-length' && value) {
                    info.totalSize = Number(value);
                    if (!Number.isSafeInteger(info.totalSize))
                        info.totalSize = undefined;
                }
                else if (lname === 'accept-ranges') {
                    info.acceptRanges = value.toLowerCase() === 'bytes';
                }
                else if (lname === 'content-disposition') {
                    contentDisposition = value;
                }
            }
            if (expectedSize !== undefined && (info.totalSize !== expectedSize)) {
                throw Connection.toFatal(new ReportedError(M.e_sizeError, info.totalSize));
            }
            if (requestSubstituteFilename)
                info.substituteFilename = parseContentDisposition(contentDisposition);
            this.lastTransferTime = performance.now();
            this.onResponse(response);
            return info;
        })().catch(error => { this.abortWithError(error); return undefined; });
    }
    static get implementations() {
        return {
            '': StreamsConnection,
            Streams: StreamsConnection,
            StreamFilter: StreamFilterConnection,
        };
    }
    static toFatal(e) { this.fatalErrors.add(e); return e; }
    static isFatal(e) { return this.fatalErrors.has(e); }
    onResponse(_response) { }
    prepare() { }
    read() {
        const result = concatTypedArray(this.pendingData);
        if (result && result.length) {
            this.pendingData = [];
            return result;
        }
        return this.done ? undefined : new Uint8Array();
    }
    abort() { this.controller.abort(); }
    abortWithError(e) { if (!this.error)
        this.error = e; this.abort(); }
    onBeforeSendHeaders({ requestHeaders }) {
        const newHeaders = requestHeaders.filter(header => {
            const lname = header.name.toLowerCase();
            return lname !== connectionHeader
                && lname !== 'accept-encoding' && lname !== 'origin'
                && lname !== 'referer';
        });
        if (this.referrer)
            newHeaders.push({ name: 'Referer', value: this.referrer });
        return { requestHeaders: newHeaders };
    }
    async onStopped(details) {
        await this.info;
        if (!this.error) {
            if (this.controller.signal.aborted)
                this.error = abortError();
            else if ('error' in details)
                this.error = new ReportedError(M.e_networkError, details.error);
        }
        this.onFinish();
    }
}
Connection.fatalErrors = new WeakSet();
Connection.nextInitId = 1; // Skip 0 to exclude `Number('')`
const connectionRequestIdMap = new Map();
const connectionRequestFilter = {
    urls: ['<all_urls>'], types: ['xmlhttprequest'],
};
browser.webRequest.onBeforeSendHeaders.addListener(details => {
    for (const header of details.requestHeaders) {
        if (header.name.toLowerCase() === connectionHeader) {
            const initId = Number(header.value);
            const connection = connectionInitIdMap.get(initId);
            if (connection) {
                connectionRequestIdMap.set(details.requestId, connection);
                return connection.onBeforeSendHeaders(details);
            }
        }
    }
    return {};
}, connectionRequestFilter, ['requestHeaders', 'blocking']);
function onRequestStopped(details) {
    const connection = connectionRequestIdMap.get(details.requestId);
    if (!connection)
        return;
    connectionRequestIdMap.delete(details.requestId);
    connection.onStopped(details);
}
browser.webRequest.onErrorOccurred.addListener(onRequestStopped, connectionRequestFilter);
browser.webRequest.onCompleted.addListener(onRequestStopped, connectionRequestFilter);
export class StreamsConnection extends Connection {
    constructor() {
        super(...arguments);
        this.criticalSection = new CriticalSection;
    }
    onResponse({ body }) { this.reader = body.getReader(); }
    prepare() {
        // Spawn one read() request. 
        // 1. Assume the browser returns all the received data to a single read(), 
        //    which is true for Firefox (tested on 57 and 62) but not Chromium
        // 2. Assume the data are ready after a set delay
        return this.criticalSection.sync(async () => {
            // Do nothing if this.reader is not ready
            if (!this.reader || this.done)
                return;
            try {
                const { value } = await this.reader.read();
                if (value)
                    this.pendingData.push(value);
                else
                    this.done = true;
            }
            catch {
                this.done = true;
            }
        });
    }
    abort() {
        try {
            if (this.reader)
                void this.reader.cancel();
        }
        catch (error) {
            console.error(error);
        }
        super.abort();
    }
}
StreamsConnection.isAvailable = 'ReadableStream' in window && 'body' in Response.prototype;
export class StreamFilterConnection extends Connection {
    onBeforeSendHeaders(details) {
        const result = super.onBeforeSendHeaders(details);
        const filter = browser.webRequest.filterResponseData(details.requestId);
        filter.ondata = ({ data }) => {
            // Possible but unlikely to get data before this.info resolves.
            this.pendingData.push(new Uint8Array(data));
        };
        filter.onstop = filter.onerror = e => {
            console.warn(e);
            this.done = true;
            filter.close();
        };
        return result;
    }
}
StreamFilterConnection.isAvailable = true;
