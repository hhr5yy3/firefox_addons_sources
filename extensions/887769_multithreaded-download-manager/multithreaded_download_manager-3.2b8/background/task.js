var _a;
import { DownloadState, TaskData } from "../common/task-data.js";
import { remoteProxy } from "../util/webext/remote.js";
import { resolveFilenameTemplate, filenameRequirementsInitialized } from "./filename-template.js";
import { AssertionError } from "../util/error.js";
import { SimpleStorage } from "../util/storage.js";
import { Logger } from "./logger.js";
import { localSettings, S } from "./settings.js";
import { NETWORK_OPTIONS_KEYS } from "../common/settings.js";
import { isValidProtocolURL, formatTimeSpan } from "../common/common.js";
import { M } from "../util/webext/i18n.js";
export const taskSyncRemote = remoteProxy('TaskSyncRemote');
export class Task {
    constructor() {
        this.logger = new Logger();
    }
    static registerType(T) { this.typeMap.set(T.name, T); }
    static async create(data, loadFromId) {
        // create new task after all existing tasks are loaded
        if (loadFromId === undefined)
            await this.initialization;
        const id = loadFromId !== undefined ? loadFromId : this.nextId++;
        if (Task.nextId <= id)
            Task.nextId = id + 1;
        const dataRW = data;
        if (!isValidProtocolURL(data.referrer))
            dataRW.referrer = undefined;
        if (!dataRW.filenameTemplate && dataRW.filename) // loaded from v1
            dataRW.filenameTemplate = dataRW.filename;
        dataRW.filename = resolveFilenameTemplate(data);
        if (!data.type) { // loaded from v1
            dataRW.type = 'MultithreadedTask';
            if (data.totalSize)
                dataRW.canResume = true;
        }
        if (data.type === 'MultithreadedTask') {
            const dataMTRW = data;
            if (loadFromId !== undefined && !dataMTRW.storageAPI) // loaded from v2
                dataMTRW.storageAPI = 'MutableFile';
        }
        const constructor = this.typeMap.get(data.type);
        if (!constructor)
            throw new AssertionError('invalid task type');
        const task = new constructor();
        Object.assign(task, { id, data });
        await task.init(loadFromId !== undefined);
        this.list[S.newTaskAtTop ? 'unshift' : 'push'](task);
        void taskSyncRemote.create(id, task.data, S.newTaskAtTop);
        void Task.storage.set(id, task.data);
        this.updateBadge();
        return task;
    }
    static get(id) { return this.list.find(task => task.id === id); }
    update(data) {
        Object.assign(this.data, data);
        if (data.state !== undefined)
            Task.updateBadge(data.state);
        if (data.state === 'completed')
            Task.notifyCompleted();
        void taskSyncRemote.update(this.id, data);
        void Task.storage.set(this.id, this.data);
    }
    editData(data) {
        if (!TaskData.isEditable(this.data))
            return;
        const isDownloading = this.data.state === 'downloading';
        if (isDownloading)
            this.pause();
        data.filename = resolveFilenameTemplate({ ...this.data, ...data });
        this.update(data);
        if (isDownloading)
            this.start();
    }
    syncProgress(value) {
        void taskSyncRemote.progress(this.id, value);
    }
    remove() {
        void taskSyncRemote.remove(this.id);
        void Task.storage.delete(this.id);
        const i = Task.list.indexOf(this);
        if (i !== -1)
            Task.list.splice(i, 1);
        Task.updateBadge();
    }
    static async syncInit() {
        void taskSyncRemote.init(this.list.map(task => ({
            id: task.id, data: task.data, progress: task.getProgress()
        })));
    }
    static countProgressing() {
        return [...this.list].filter(v => DownloadState.isProgressing(v.data.state)).length;
    }
    static async playAllCompletedSound() {
        // moz-extension URL will cause intermittent NS_ERROR_DOM_MEDIA_METADATA_ERR
        if (!this.allCompletedSoundURL)
            this.allCompletedSoundURL = fetch('/sounds/completed.ogg')
                .then(r => r.blob()).then(b => URL.createObjectURL(b));
        new Audio(await this.allCompletedSoundURL).play();
    }
    static notifyCompleted() {
        if (this.countProgressing())
            return;
        if (S.playSoundOnAllCompleted)
            this.playAllCompletedSound();
        if (S.showNotificationOnAllCompleted) {
            browser.notifications.create({
                type: 'basic',
                title: M.extensionName,
                message: M.allDownloadsCompleted,
            });
        }
    }
    static getTooltip() {
        const MAX_ITEMS = 5;
        let list = [...this.list].filter(v => DownloadState.isProgressing(v.data.state));
        if (!list.length)
            return null;
        if (!S.newTaskAtTop)
            list = list.reverse();
        let result = list.slice(0, MAX_ITEMS).map(t => {
            const { currentSize, averageSpeed } = t.getProgress([]);
            let percentageText = '--%';
            let estimatedTime = '--:--';
            if (t.data.totalSize) {
                const percentage = currentSize / t.data.totalSize * 100;
                percentageText = percentage.toFixed(percentage === 100 ? 0 : 1) + '%';
                if (averageSpeed)
                    estimatedTime = formatTimeSpan((t.data.totalSize - currentSize)
                        / averageSpeed);
            }
            return `${percentageText} | ${estimatedTime} | ${t.data.filename ||
                t.data.filenameTemplate}  `;
        });
        if (!S.newTaskAtTop)
            result = result.reverse();
        if (list.length > MAX_ITEMS)
            result.push(M('andAnotherNTasks', list.length - MAX_ITEMS));
        return result.join('\n');
    }
}
_a = Task;
Task.nextId = 1;
Task.list = [];
Task.typeMap = new Map();
Task.initialization = (async () => {
    await localSettings.initialization;
    await filenameRequirementsInitialized;
    Object.assign(Task, { storage: await SimpleStorage.create('tasks') });
    Task.storage.get(''); // test if storage is accessible
    const taskIds = await Task.storage.keys();
    // .sort((v0, v1) => S.taskOrder.indexOf(v0) - S.taskOrder.indexOf(v1))
    for (const id of taskIds) {
        const data = await Task.storage.get(id);
        // fix network parameters with incorrect type in v1
        for (const key of NETWORK_OPTIONS_KEYS) {
            const value = data[key];
            if (typeof data === 'string' && value !== '')
                data[key] = Number(value);
        }
        // fileAccessId is invalid after browser restart
        data.fileAccessId = undefined;
        try {
            const task = await Task.create(data, id);
            if (data.state === 'completed' && S.removeCompletedTasksOnStart)
                task.remove();
            if (data.state === 'failed' && S.removeFailedTasksOnStart)
                task.remove();
        }
        catch (error) {
            console.error(error);
        }
    }
})();
// function defined in init.ts
Task.updateBadge = (_suggestedState) => { };
