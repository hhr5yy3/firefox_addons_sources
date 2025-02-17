'use strict';

import {
    bindElementIdsToSettings,
} from '../ui/bind-settings.js';

import {
    setTextMessages,
    setMessagePrefix,
    toggleClass,
} from '../ui/utilities.js';

import {
    AnimationInfo,
    bindCollapsableAreas,
} from '../ui/collapsable.js';

import {
    setRequiresPrefix,
    bindDependantSettings,
} from '../ui/requires.js';

import {
    createShortcutsArea,
} from '../ui/shortcuts.js';

import {
    createOptionalPermissionArea
} from '../ui/permissions.js';

import {
    settings,
    settingsTracker,
    FormatPlaceholder,
    messageTypes,
    quickLoadSetting,
} from '../common/common.js';

import {
    EventListener,
    EventManager,
} from '../common/events.js';

import {
    SettingsTracker,
} from '../common/settings.js';

import {
    PortConnection,
} from '../common/connections.js';

import {
    DisposableCreators,
} from '../common/disposables.js';

import {
    delay,
    PromiseWrapper,
} from '../common/delays.js';

import {
    createStatusIndicator,
} from '../ui/status-indicator.js';


setMessagePrefix('message_');
setRequiresPrefix('requires_');


quickLoadSetting('optionsPage_disableDarkTheme')
    .then(disableDarkTheme => {
        if (disableDarkTheme) {
            document.documentElement.classList.remove('support-dark-theme');
        }
    })
    .catch(error => console.error('Failed to disable dark theme support on options page.', error));

{
    let embedded = true;
    try {
        embedded = new URLSearchParams(window.location.search).get('embedded') != 'false';
    } catch (error) {
        console.error('Failed to get page query params.\nError: ', error);
    }
    if (embedded) {
        document.documentElement.classList.add('embeddedInExtensionPage');
    }
}

async function initiatePage() {
    // Link to separate option page:
    (/** @type{HTMLAnchorElement} */(document.getElementById('topLinkToOptionsPage'))).href =
        browser.runtime.getURL(browser.runtime.getManifest().options_ui.page + '?embedded=false');


    const pagePort = new PortConnection();
    const sectionAnimation = new AnimationInfo({ standard: false }); // No animation before load to expand initial sections immediately.

    const onPermissionChange = new EventManager();
    const permissionControllers = [];

    // #region Delayed Listener Startup

    const eventStarters = new DisposableCreators();
    const startListener = (callback) => eventStarters.createDisposable(callback);
    const startAllListeners = () => {
        eventStarters.stop();
        eventStarters.start();
    };

    // #endregion Delayed Listener Startup


    // #region Collapsable sections

    const collapsableInfo = bindCollapsableAreas({
        animationInfo: sectionAnimation,
        enabledCheck: [
            {
                element: document.getElementById('fixNoTabForNewTabPagesArea'),
                check: async (setToError) => {
                    const hasPermissions = await browser.permissions.contains({ permissions: ['tabs'] });
                    if (!hasPermissions) setToError();
                    return settings.newTabNoTitleWorkaround_Enabled;
                }
            },
            {
                element: document.getElementById('permissionsArea'),
                check: () => {
                    const hasAnyPermission = permissionControllers.filter(controller => controller.hasPermission).length > 0;
                    return hasAnyPermission;
                },
            }
        ],
    });
    onPermissionChange.addListener(() => collapsableInfo.checkAll());

    // #endregion Collapsable sections


    // #region Format Placeholders

    {
        const formatPlaceholderArea = document.getElementById('formatPlaceholders');
        for (const placeholder of FormatPlaceholder.all) {
            const area = document.createElement('div');
            area.innerHTML = placeholder.messageText;
            formatPlaceholderArea.appendChild(area);
        }
    }

    // #endregion Format Placeholders


    // #region Stop & Start Button

    {
        const status = createStatusIndicator({
            headerMessage: 'options_UpdateStatus',
            enabledMessage: 'options_UpdatesOn',
            disabledMessage: 'options_UpdatesOff',
        });
        document.getElementById('updateStatusArea').appendChild(status.area);
        startListener(() => {
            status.isEnabled = settings.isEnabled;
            return new EventListener(settingsTracker.onChange, (changes) => {
                if (changes.isEnabled) {
                    status.isEnabled = settings.isEnabled;
                }
            });
        });


        const setIsUpdating = (value) => {
            value = Boolean(value);

            if (!value) {
                // Clear all prefixes when clicking the disable button:
                browser.runtime.sendMessage({ type: messageTypes.clearPrefix });
            } else if (settings.isEnabled) {
                // Already enabled, try to set prefixes again!
                browser.runtime.sendMessage({ type: messageTypes.updatePrefix });
            }

            SettingsTracker.set("isEnabled", value);
        };

        startListener(() => {
            if (settings.isEnabled) {
                setIsUpdating(true);
            }
        });

        document.getElementById("stopUpdates").addEventListener("click", e => {
            setIsUpdating(false);
        });
        document.getElementById("startUpdates").addEventListener("click", e => {
            setIsUpdating(true);
        });
    }

    // #endregion Stop & Start Button


    // #region Window Data

    {
        document.getElementById('clearWindowDataButton').addEventListener('click', () => {
            const ok = confirm(browser.i18n.getMessage('options_WindowData_ClearData_Warning'));
            if (ok) {
                browser.runtime.sendMessage({ type: messageTypes.clearWindowData });
            }
        });
        document.getElementById('applyDefaultWindowNameButton').addEventListener('click', () => {
            const ok = confirm(browser.i18n.getMessage('options_WindowData_ApplyDefaultName_Warning'));
            if (ok) {
                browser.runtime.sendMessage({ type: messageTypes.applyWindowName, name: (/** @type {HTMLInputElement} */ (document.getElementById('windowDefaultName'))).value });
            }
        });

        const windowDataSection = collapsableInfo.sectionLookup.get(document.getElementById('windowDataArea'));
        const checkPermission = async () => {
            const hasPermissions = await browser.permissions.contains({ permissions: ['sessions'] });
            toggleClass(windowDataSection.title, 'enablable', !hasPermissions);
            toggleClass(windowDataSection.title, 'enabled', !hasPermissions);
            toggleClass(windowDataSection.title, 'error', !hasPermissions);
        };
        onPermissionChange.addListener(() => checkPermission());
        startListener(() => checkPermission());
    }

    // #endregion Window Data



    // #region Commands

    {
        const shortcuts = createShortcutsArea({
            sectionAnimation,
            commandInfos: {
                '_execute_browser_action': {
                    description: 'options_Commands_BrowserAction',
                },
            },
            headerMessage: 'options_Commands_Title',
            infoMessage: 'options_Commands_Info',

            resetButtonMessage: 'options_Commands_ResetButton',
            promptButtonMessage: 'options_Commands_PromptButton',
        });
        document.getElementById('commandsArea').appendChild(shortcuts.area);
        eventStarters.createDisposable(() => {
            shortcuts.update();
        });
    }

    // #endregion Commands


    // #region Optional Permissions

    {
        const optionalPermissionsArea = document.getElementById('permissionsArea');
        const pagePermissionChanged = pagePort.getEvent('permissionChanged');


        const areaDetails = {
            requestViaBrowserActionCallback: async (permission) => {
                await pagePort.sendMessageBoundToPort({ type: messageTypes.requestPermission, permission: permission });
            },
            permissionChangedCallback: (obj, internalChange) => {
                if (internalChange) {
                    browser.runtime.sendMessage({ type: messageTypes.permissionsChanged, permission: obj.permission, value: obj.hasPermission });
                }
                onPermissionChange.fire(obj);
            },
            onPermissionChanged: pagePermissionChanged,
            sectionAnimationInfo: sectionAnimation,
            browserActionPromptMessage: 'optionalPermissions_BrowserActionPrompt',
        };

        // eslint-disable-next-line valid-jsdoc
        /**
         * Create an area for a specific optional permission.
         *
         * @param { Partial<Pick<Parameters<typeof createOptionalPermissionArea>[0], keyof (typeof areaDetails)>> & Omit<Parameters<typeof createOptionalPermissionArea>[0], keyof (typeof areaDetails)> } details Details for the area that should be created.
         * @returns {ReturnType<typeof createOptionalPermissionArea>} Info about the created area.
         */
        const createPermissionButtonArea = function (details) {
            const obj = createOptionalPermissionArea(Object.assign({}, areaDetails, details));
            permissionControllers.push(obj);
            optionalPermissionsArea.appendChild(obj.area);
            return obj;
        };

        createPermissionButtonArea({
            permission: { permissions: ['tabs'] },
            titleMessage: 'options_OptionalPermissions_Tabs_Title',
            explanationMessage: 'options_OptionalPermissions_Tabs_Explanation',
        });

        let requestOp = new PromiseWrapper();
        const sessionPermissionArea = createPermissionButtonArea({
            permission: { permissions: ['sessions'] },
            titleMessage: 'options_OptionalPermissions_Sessions_Title',
            explanationMessage: 'options_OptionalPermissions_Sessions_Explanation',
            browserActionPromptMessage: 'options_OptionalPermissions_Sessions_LegacyWarning',
            requestViaBrowserActionCallback: (permission) => {
                if (permission) {
                    return requestOp.getValue();
                } else {
                    requestOp.resolve(null);
                    requestOp = new PromiseWrapper();
                }
            },
        });
        {
            const permissionAvailableStatusIndicator = createStatusIndicator({
                headerMessage: 'options_OptionalPermissions_Sessions_PermissionAvailable',
                enabledMessage: 'options_OptionalPermissions_Sessions_PermissionAvailable_True',
                disabledMessage: 'options_OptionalPermissions_Sessions_PermissionAvailable_False',
            });
            sessionPermissionArea.section.content.appendChild(document.createElement('br'));
            sessionPermissionArea.section.content.appendChild(permissionAvailableStatusIndicator.area);
            (async () => {
                let isAvailable = false;
                try {
                    const browserInfo = await browser.runtime.getBrowserInfo();
                    const [majorVersion,] = (await browserInfo).version.split('.');
                    if (majorVersion >= 77) {
                        isAvailable = true;
                    }
                } catch (error) {
                    console.error('Failed to determine if "sessions" permission is available', error);
                }
                if (isAvailable) {
                    permissionAvailableStatusIndicator.isEnabled = true;
                } else {
                    permissionAvailableStatusIndicator.isEnabled = false;
                    sessionPermissionArea.hasError = true;
                }
            })();
        }
    }

    // #endregion Optional Permissions


    document.getElementById('resetSettingsButton').addEventListener('click', async (e) => {
        let ok = confirm(browser.i18n.getMessage('options_resetSettings_Prompt'));
        if (!ok) {
            return;
        }

        // Reset commands:
        await Promise.all((await browser.commands.getAll()).map(command => browser.commands.reset(command.name)));

        // Clear settings:
        await browser.storage.local.clear();

        // Wait for settings change to be applied:
        await delay(100);

        // Reload options info:
        startAllListeners();
    });


    setTextMessages(null, { asHTML: true });

    const checkRequired = bindDependantSettings();
    startListener(() => checkRequired());

    await settingsTracker.start;

    const boundSettings = bindElementIdsToSettings(settings, {
        handleInputEvent: ({ key, value, element }) => {
            if (element.type === 'number') {
                value = parseInt(value);
                if (isNaN(value))
                    return;
            }
            browser.storage.local.set({ [key]: value });
        },
        onSettingsChanged: settingsTracker.onChange,
        newValuePattern: true,
    });
    startListener(() => boundSettings.skipCurrentInputIgnore());


    startAllListeners();


    const checkAnimations = () => {
        if (settings.disableOptionsPageAnimations) {
            sectionAnimation.update({ reset: true });
        } else {
            sectionAnimation.update({ standard: true });
        }
    };
    settingsTracker.onChange.addListener((changes) => {
        collapsableInfo.checkAll();

        if (changes.disableOptionsPageAnimations) {
            checkAnimations();
        }
        if (changes.optionsPage_disableDarkTheme) {
            toggleClass(document.documentElement, 'support-dark-theme', !settings.optionsPage_disableDarkTheme);
        }
    });
    checkAnimations();
}


initiatePage();

