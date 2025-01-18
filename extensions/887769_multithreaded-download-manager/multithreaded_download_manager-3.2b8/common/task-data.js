export const DownloadState = {
    isProgressing(state) {
        return ['downloading', 'saving', 'queued'].includes(state);
    },
    canPause(state) {
        return ['downloading', 'queued'].includes(state);
    },
    canStart(state) {
        return ['paused', 'failed', 'queued'].includes(state);
    },
    areChunksFinished(state) {
        return ['saving', 'completed'].includes(state);
    },
    colors: {
        downloading: 'cornflowerblue',
        saving: 'cornflowerblue',
        failed: 'red',
        paused: 'goldenrod',
        completed: 'green',
        queued: 'cornflowerblue',
    }
};
export const TaskData = {
    isEditable(data) {
        return data.type === 'MultithreadedTask' &&
            !DownloadState.areChunksFinished(data.state);
    },
    default() {
        return {
            type: 'MultithreadedTask', state: 'downloading',
            creationDate: new Date(), inum: 1,
            url: 'about:blank', filenameTemplate: '',
        };
    }
};
export const taskActions = [
    ['start', { primary: true, filterStates: ['paused', 'failed'] }],
    ['pause', {
            primary: true,
            filterStates: ['downloading', 'queued'], filterCanResume: true
        }],
    ['stop', {
            primary: true,
            filterStates: ['downloading', 'queued'], filterCanResume: false
        }],
    ['openFile', {
            primary: true, shift: 'openContainingFolder', filterStates: ['completed']
        }],
    ['openContainingFolder', {}],
    [101, {}],
    ['copyLink', { shift: 'openReferrer' }],
    ['openReferrer', {}],
    ['viewLogs', {}],
    [102, {}],
    ['edit', {}],
    ['reset', {
            filterStates: ['downloading', 'paused', 'completed', 'failed', 'queued']
        }],
    ['remove', { shift: 'deleteFile' }],
    ['deleteFile', { filterStates: ['completed'] }],
];
export const taskActionPrefix = 'task-action-';
export const filenameSearchPrefix = 'filename-search-';
