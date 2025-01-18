import { mergeInitData } from "../util/util.js";
import { RemoteSettings } from "../util/webext/settings.js";
export const DEFAULT_FILENAME_TEMPLATE = '*name*';
export class NetworkOptions {
    constructor() {
        this.maxThreads = 4;
        this.minChunkSize = 1024; // KiB
        this.maxRetries = 5;
    }
}
export const NETWORK_OPTIONS_KEYS = Object.keys(new NetworkOptions);
export const logLevels = ['info', 'warning', 'error'];
export class Settings extends mergeInitData(Object, { ...new NetworkOptions() }) {
    constructor() {
        super(...arguments);
        this.version = 0;
        this.saveFileTo = 'systemDefault';
        this.newTaskAtTop = true;
        this.removeCompletedTasksOnStart = false;
        this.removeFailedTasksOnStart = false;
        this.cascadeBuiltinTask = true;
        this.keepCompletedTasksContent = false;
        this.simultaneousTasks = '';
        this.monitorDownload = false;
        this.monitorDownloadType = 'askForOptions';
        this.monitorDownloadMinSize = 1024; // KiB
        this.autoCloseBlankTab = true;
        this.monitorLinksWithoutRange = false;
        this.monitorPDFFiles = false;
        this.monitorAudioFiles = false;
        this.monitorVideoFiles = false;
        this.playSoundOnAllCompleted = false;
        this.showNotificationOnAllCompleted = false;
        this.inhibitSleep = false;
        this.theme = '';
        this.iconColor = 'default';
        this.iconColorCode = '#000000';
        this.iconColorAlpha = 100;
        this.contextMenuIconColor = '';
        this.badgeType = 'number';
        this.hideBadgeZero = false;
        this.iconClickAction = 'default';
        this.showTooltip = false;
        this.windowPosition = 'parentCenter';
        this.windowSize = 'default';
        this.showAddPaused = false;
        this.shortenTabTitle = '';
        this.filenameSearchItems = '';
        this.addContextMenuToLink = true;
        this.addContextMenuToLinkType = 'downloadDirectly';
        this.showOptionsInDedicatedTab = false;
        this.rememberLastNetworkOptions = false;
        this.dynamicMinChunkSize = false;
        this.connectionTimeout = ''; // s
        this.transferTimeout = ''; // s
        this.segmentsIntervalInit = 2; // s
        this.segmentsIntervalMax = 60; // s
        this.segmentsIntervalGrowFactor = 2.00;
        this.segmentsIntervalGrowPerFiles = 1000;
        this.legacyFilenameEncoding = '';
        this.legacyFilenameDetectUTF8 = true;
        this.legacyFilenameDetectURLEncoded = true;
        this.legacyFilenameDetectNonStandardURLEncoded = false;
        this.useSiteHandlers = false;
        this.connectionAPI = '';
        this.storageAPI = '';
        this.cacheMode = '';
        this.monitorDownloadShowBuiltinActions = false;
        this.openWindowIncognito = false;
        this.dialogAlwaysOnTop = false;
        this.panelWindowAlwaysOnTop = false;
        this.logLevel = 'warning';
        this.removeAfterImport = true;
        // taskOrder: number[] = [] // unused
        this.filenameTemplate = DEFAULT_FILENAME_TEMPLATE;
        this.enableTaskSelection = true;
        this.autoImportExtList = [];
        this.firefox75WarningDismissed = false;
    }
}
export const remoteSettings = new RemoteSettings(new Settings);
