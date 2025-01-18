import { applyI18n, applyI18nAttr } from "../util/webext/i18n.js";
import "./task-form.js";
import { backgroundRemote, closeWindow, escToCloseWindow, formatSize } from "../common/common.js";
import { TaskData } from "../common/task-data.js";
import { remoteSettings } from "../common/settings.js";
applyI18n();
applyI18nAttr('placeholder');
applyI18nAttr('title');
escToCloseWindow();
const taskForm = document.querySelector('.task-form');
taskForm.init();
function showFileSize(size) {
    taskForm.querySelector('.file-size-value').textContent = formatSize(size);
    taskForm.querySelector('.file-size-label').removeAttribute('hidden');
}
const { searchParams } = new URL(location.href);
const taskId = searchParams.get('id') ? Number(searchParams.get('id')) : undefined;
if (taskId !== undefined) {
    taskForm.classList.add('editing');
    taskForm.submitData = () => { };
    backgroundRemote.getTaskData(taskId).then(data => {
        if (!data) {
            closeWindow();
            return;
        }
        taskForm.loadFromTaskData(data);
        if (data.totalSize !== undefined)
            showFileSize(data.totalSize);
        if (data.canResume === false)
            taskForm.classList.add('no-range');
        if (TaskData.isEditable(data)) {
            taskForm.submitData = (_dataList, formObj) => {
                void backgroundRemote.editTaskData(taskId, formObj);
            };
        }
        else {
            for (const input of taskForm.querySelectorAll('[data-key]'))
                input.readOnly = true;
            taskForm.classList.add('readonly');
        }
    });
}
else {
    void taskForm.loadDefaultNetworkOptions();
}
for (const key of ['url', 'referrer', 'filenameTemplate']) {
    if (!searchParams.has(key))
        continue;
    const input = taskForm.querySelector(`[data-key="${CSS.escape(key)}"]`);
    input.value = searchParams.get(key);
    if (key === 'referrer' && !input.checkValidity())
        input.value = '';
}
const totalSizeStr = searchParams.get('totalSize');
if (totalSizeStr && Number.isSafeInteger(Number(totalSizeStr)))
    showFileSize(Number(totalSizeStr));
const portName = searchParams.get('portName');
if (portName) {
    const port = browser.runtime.connect(undefined, { name: portName });
    taskForm.classList.add('monitor');
    const showBuiltinActions = remoteSettings.get('monitorDownloadShowBuiltinActions');
    for (const type of ['default', 'open', 'save']) {
        const button = taskForm.getElementsByClassName(`continue-${type}`)[0];
        button.addEventListener('click', () => {
            port.postMessage({
                action: 'continue', type,
                filenameTemplate: taskForm.querySelector(`[data-key="filenameTemplate"]`).value
            });
            void closeWindow();
        });
        if (type !== 'default')
            showBuiltinActions.then(v => { if (!v)
                button.hidden = true; });
    }
}
if (Number(searchParams.get('noRange')))
    taskForm.classList.add('no-range');
