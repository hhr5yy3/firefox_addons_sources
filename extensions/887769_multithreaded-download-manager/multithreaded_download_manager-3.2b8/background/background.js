import './init.js';
import './multithreaded-task.js';
import './monitor.js';
import { isWebExtOOPDisabled } from './webext-oop.js';
import { registerRemoteHandler } from "../util/webext/remote.js";
import { Task } from "./task.js";
import { openPopupWindow, openOptions } from "./open-window.js";
import { MultithreadedTask } from './multithreaded-task.js';
import { getCustomCSS } from '../common/get-custom-css.js';
import { filenameSearchMenuItems, searchFilename } from './filename-search.js';
export class BackgroundRemote {
    isWebExtOOPDisabled() { return isWebExtOOPDisabled; }
    async openPopupWindow(url) { return openPopupWindow(url); }
    async openOptions() { return openOptions(); }
    requestTaskSyncInit() { Task.syncInit(); Task.updateBadge(); }
    async createTask(data) {
        return (await Task.create(data)).id;
    }
    callTaskMethod(id, method) {
        const task = Task.get(id);
        if (task)
            task[method]();
    }
    async isStorageAvailable() {
        try {
            await Task.initialization;
            return true;
        }
        catch {
            return false;
        }
    }
    async isConnectionAPIAvailable() {
        return !!MultithreadedTask.getPreferredConnectionClass();
    }
    async getFallbackEncoding() { return document.characterSet; }
    async getTaskLog(id, skip) {
        const task = Task.get(id);
        return task && task.logger.get(skip);
    }
    async getTaskData(id) {
        const task = Task.get(id);
        return task && task.data;
    }
    async editTaskData(id, data) {
        const task = Task.get(id);
        if (task)
            task.editData(data);
    }
    playAllCompletedSound() { Task.playAllCompletedSound(); }
    getCustomCSS() { return getCustomCSS(); }
    async filenameSearchMenuItems() { return filenameSearchMenuItems; }
    searchFilename(taskIds, url) {
        return searchFilename(taskIds, url);
    }
}
registerRemoteHandler(new BackgroundRemote);
