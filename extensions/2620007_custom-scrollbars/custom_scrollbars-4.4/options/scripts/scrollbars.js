/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Load data from the Storage API
 */
function init() {
    browser.storage.local.get(['defaultProfile'], (data) => {
        if (data.defaultProfile) {
            selectedProfile = data.defaultProfile;
            defaultProfile = selectedProfile;
            loadScrollbar(selectedProfile);
        }

        reloadProfileSelection(document.settings.profile, () => {
            addNoProfileOption(document.settings.profile);
            document.settings.profile.firstChild.textContent = '';
            updateSelectedProfileInDropdown();
        });
    });
}

/**
 * Save scrollbar settings to Storage API
 */
function saveScrollbar() {
    confirmAction(
        browser.i18n.getMessage('dialogSaveProfileTitle'),
        browser.i18n.getMessage('dialogOverwriteUnloadedChanges'),
        () => {
            showProgressBar(true);

            const colTrack = (document.settings.customColors.checked) ? btnColorTrack.dataset.color : null;
            const colThumb = (document.settings.customColors.checked) ? btnColorThumb.dataset.color : null;
            const profileName = document.getElementById('profileSelection').options[document.getElementById('profileSelection').selectedIndex].textContent.trim();
        
            const profileData = {
                name: profileName,
                width: document.settings.width.value,
                colorTrack: colTrack,
                colorThumb: colThumb,
                allowOverride: parseInt(document.settings.override.value),
                buttons: (document.settings.buttons.checked) ? 'auto' : 'none',
                thumbRadius: parseInt(document.settings.thumbRadius.value),
                autoHide: (document.settings.autoHide.checked) ? 1 : 0
            };
        
            if (profileData.width == 'other') {
                profileData['customWidthValue'] = parseInt(document.settings.customWidthValue.value);
                profileData['customWidthUnit'] = document.settings.customWidthUnit.value;
            }
        
            const wrapper = {};
            wrapper[`profile_${selectedProfile}`] = profileData;
            ignoreNextChange = true;
        
            browser.storage.local.set(wrapper, () => {
                showProgressBar(false);
                toggleChangesWarning(false);
                reloadProfileSelection(document.settings.profile, () => {
                    addNoProfileOption(document.settings.profile);
                    document.settings.profile.firstChild.textContent = '';
                    updateSelectedProfileInDropdown();
                });
                unloadedChanges = false;
            });
        },
        null,
        !unloadedChanges
    );
}

/**
 * Load the selected profile
 * @param {number} id
 */
function loadScrollbar(id) {
    showProgressBar(true);
    selectedProfile = id;
    document.getElementById('profile-setDefault').disabled = selectedProfile == defaultProfile;

    document.getElementById('profile-duplicate').disabled = id == 'none';
    document.getElementById('profile-rename').disabled = id == 'none';
    document.getElementById('profile-remove').disabled = id == 'none';

    const settingsContainer = document.getElementById('only-scrollbar');
    const settingsWarningContainer = document.getElementById('only-not-scrollbar');

    if (id == 'none') {
        settingsContainer.classList.add('hide');
        settingsWarningContainer.classList.remove('hide');
        updateSelectedProfileInDropdown();
        toggleChangesWarning(false);
        showProgressBar(false);
    } else {
        browser.storage.local.get(`profile_${id}`, (scrollbar) => {
            scrollbar = scrollbar[Object.keys(scrollbar)[0]];

            if (typeof scrollbar == 'undefined') {
                return;
            }

            document.settings.customColors.checked = !(!scrollbar.colorThumb || !scrollbar.colorTrack);

            scrollbar = loadWithDefaults(scrollbar);
            if (scrollbar.width == 'unset') scrollbar.width = 'auto';
            document.settings.width.value = scrollbar.width;
            document.settings.override.value = scrollbar.allowOverride;
            document.settings.customWidthValue.value = scrollbar.customWidthValue;
            document.settings.customWidthUnit.value = scrollbar.customWidthUnit;
            if (scrollbar.buttons == 'light' || scrollbar.buttons == 'dark') scrollbar.buttons = 'auto';
            document.settings.buttons.checked = scrollbar.buttons == 'auto';
            document.settings.thumbRadius.value = scrollbar.thumbRadius;
            document.settings.autoHide.checked = scrollbar.autoHide == 1;

            previousToggleValue = document.settings.customColors.checked;
            toggleColorSettings();

            updateColorEditButton(btnColorThumb, (scrollbar.colorThumb) ? scrollbar.colorThumb : defaults.colorThumb);
            updateColorEditButton(btnColorTrack, (scrollbar.colorTrack) ? scrollbar.colorTrack : defaults.colorTrack);

            toggleCustomWidth();
            toggleHiddenSettings();
            toggleChangesWarning(false);
            parseCustomWidthValue(false);
            updateRadiusLabel();
            settingsContainer.classList.remove('hide');
            settingsWarningContainer.classList.add('hide');
            showProgressBar(false);
        });
    }
}

/**
 * Add new profile
 */
function addProfile() {
    showProgressBar(true);

    const id = Date.now();
    const newProfile = {};
    newProfile[`profile_${id}`] = {
        name: generateUnconflictingProfileName(browser.i18n.getMessage('defaultProfileName'), id)
    };

    browser.storage.local.set(newProfile, () => {
        reloadProfileSelection(document.settings.profile, () => {
            addNoProfileOption(document.settings.profile);
            document.settings.profile.firstChild.textContent = '';
            updateSelectedProfileInDropdown();
        });
        loadScrollbar(id);
    });
}

/**
 * Duplicate profile
 */
function duplicateProfile() {
    showProgressBar(true);

    browser.storage.local.get(`profile_${selectedProfile}`, (data) => {
        const original = data[`profile_${selectedProfile}`];
        const created = {};
        const id = Date.now();

        for (const key of Object.keys(original)) {
            created[key] = original[key];
        }

        created.name = generateUnconflictingProfileName(created.name, id);

        const newProfile = {};
        newProfile[`profile_${id}`] = created;

        browser.storage.local.set(newProfile, () => {
            reloadProfileSelection(document.settings.profile, () => {
                addNoProfileOption(document.settings.profile);
                document.settings.profile.firstChild.textContent = '';
                updateSelectedProfileInDropdown();
            });
            loadScrollbar(id);
        });
    });
}

/**
 * Remove selected profile
 */
function removeProfile() {
    showProgressBar(true);

    ignoreNextChange = true;
    browser.storage.local.remove(`profile_${selectedProfile}`, () => {
        const removedProfile = `profile_${selectedProfile}`;
        reloadProfileSelection(document.settings.profile, () => {
            addNoProfileOption(document.settings.profile);
            document.settings.profile.firstChild.textContent = '';
        });
        loadScrollbar(defaultProfile);

        browser.storage.local.get(['rules', 'localFileProfile'], (storage) => {
            let hasRules = false;
            let hasLocalFileRule = false;
            if (storage.rules) {
                for (const key of Object.keys(storage.rules)) {
                    if (storage.rules[key] == removedProfile) {
                        hasRules = true;
                        break;
                    }
                }
            }

            hasLocalFileRule = (storage.localFileProfile && `profile_${storage.localFileProfile}` == removedProfile);

            if (hasRules || hasLocalFileRule) {
                reloadProfileSelection(document.getElementById('dialog-dropdown'), () => {
                    addNoProfileOption(document.settings.profile);
                    document.settings.profile.firstChild.textContent = '';

                    const dropdown = document.getElementById('dialog-dropdown');
                    addDefaultProfileOption(dropdown);
                    addNoProfileOption(dropdown);

                    const dropdownNoButton = document.getElementById('dropdown-no');
                    dropdownNoButton.classList.add('hide');

                    showDowndown(
                        browser.i18n.getMessage('dialogChangeProfileTitle'),
                        browser.i18n.getMessage('profileMoveExistingRules'),
                        null,
                        (to) => {
                            if (hasLocalFileRule) {
                                const newProfile = parseInt(to);
                                localFileProfile = (!isNaN(newProfile)) ? newProfile : null;
                            }

                            dropdownNoButton.classList.remove('hide');
                            bulkUpdateRules(removedProfile, to, storage.rules);
                        },
                        null
                    );

                    loadProfileDetailsIntoDialog(document.getElementById('dialog-dropdown').value);
                });
            }
        });
    })
}

/**
 * Update multiple rules at the same time
 * @param {string} from
 * @param {string} to
 * @param {Object} rules
 */
function bulkUpdateRules(from, to, rules) {
    showProgressBar(true);

    for (const key of Object.keys(rules)) {
        if (rules[key] == from) {
            if (to == 'default') {
                delete rules[key];
            } else {
                rules[key] = `profile_${to}`;
            }
        }
    }

    browser.storage.local.set({
        rules: rules,
        localFileProfile: localFileProfile
    }, () => {
        showProgressBar(false);
    });
}

/**
 * Change the profile that's used as default
 */
function updateDefaultProfile() {
    showProgressBar(true);

    browser.storage.local.set({
        defaultProfile: selectedProfile
    }, () => {
        defaultProfile = selectedProfile;
        reloadProfileSelection(document.settings.profile, () => {
            addNoProfileOption(document.settings.profile);
            document.settings.profile.firstChild.textContent = '';
            updateSelectedProfileInDropdown();
        });
    });
}

/**
 * Rename the profile that's currently selected
 * @param {String} input
 */
function renameProfile(input) {
    showProgressBar(true);

    input = generateUnconflictingProfileName(input, selectedProfile);

    browser.storage.local.get(`profile_${selectedProfile}`, (data) => {
        data[`profile_${selectedProfile}`].name = input;
        browser.storage.local.set(data, () => {
            reloadProfileSelection(document.settings.profile, () => {
                addNoProfileOption(document.settings.profile);
                document.settings.profile.firstChild.textContent = '';
                updateSelectedProfileInDropdown();
            });
        });
    })
}

/**
 * Generate a unique name from the given string (prevents duplicate profile names)
 * @param {String} name
 * @param {number} id
 * @returns Unique Name
 */
function generateUnconflictingProfileName(name, id) {
    let finalName = name;
    let exists = false;
    let counter = 1;

    do {
        exists = false;

        for (const option of document.settings.profile.options) {
            if (option.textContent == finalName && option.value != id) {
                exists = true;
                counter++;
                finalName = `${name} (${counter})`;
                break;
            }
        }

    } while (exists);

    return finalName;
}

/**
 * Generates new CSS code for scrollbars
 * @returns {string} css
 */
function getNewCSS() {
    if (document.settings.profile.value != 'none') {
        const width = document.settings.width.value;
        const colThumb = (document.settings.customColors.checked) ? btnColorThumb.dataset.color : null;
        const colTrack = (document.settings.customColors.checked) ? btnColorTrack.dataset.color : null;
        const customWidth = (document.settings.width.value == 'other') ? document.settings.customWidthValue.value + document.settings.customWidthUnit.value : null;
        const buttons = (document.settings.buttons.checked) ? 'auto' : 'none';
        const thumbRadius = parseInt(document.settings.thumbRadius.value);
        const autoHide = (document.settings.autoHide.checked) ? 1 : 0;

        return generateCSS(width, colTrack, colThumb, 0, customWidth, buttons, thumbRadius, autoHide);
    } else {
        return '';
    }
}

/**
 * Create color picker
 * @param {HTMLElement} container
 * @param {Object} inputs
 * @param {HTMLElement} preview
 * @param {string} setTo
 * @returns Color picker
 */
function createColorPicker(container, inputs, preview, setTo) {
    let layout;
    if (CSS.supports('background', 'rgba(0, 0, 0, 0) conic-gradient(red, magenta, blue, aqua, lime, yellow, red) repeat scroll 0% 0%')) {
        layout = [{
                component: iro.ui.Wheel
            },
            {
                component: iro.ui.Slider,
                options: {
                    sliderType: 'value'
                }
            },
            {
                component: iro.ui.Slider,
                options: {
                    sliderType: 'alpha'
                }
            }
        ];
    } else {
        layout = [{
                component: iro.ui.Box
            },
            {
                component: iro.ui.Slider,
                options: {
                    sliderType: 'hue'
                }
            },
            {
                component: iro.ui.Slider,
                options: {
                    sliderType: 'alpha'
                }
            }
        ];
    }

    const picker = new iro.ColorPicker(container, {
        color: setTo,
        layout: layout,
        layoutDirection: 'horizontal'
    });

    picker.on('color:change', (color) => {
        updatePickerNumericValues(picker, inputs, preview);

        if (selectedColor != null) {
            updateColorEditButton(selectedColor, color.hex8String);
        }

        toggleChangesWarning(true);
    });

    // Color mode tabs event listeners
    inputs.tabs.hex.addEventListener('click', () => {
        changeColorMode(inputs.tabs, inputs.tabs.hex, 'hex')
    });
    inputs.tabs.rgb.addEventListener('click', () => {
        changeColorMode(inputs.tabs, inputs.tabs.rgb, 'rgb')
    });
    inputs.tabs.hsv.addEventListener('click', () => {
        changeColorMode(inputs.tabs, inputs.tabs.hsv, 'hsv')
    });

    // HEX color mode input event listeners
    inputs.hex.addEventListener('change', () => {
        picker.color.hex8String = inputs.hex.value.trim();
    });

    // RGB color mode inputs event listeners
    inputs.rgb.red.addEventListener('change', () => {
        validateColor(inputs.rgb.red, 255, picker.color.red, false);
        picker.color.red = inputs.rgb.red.value.trim();
    });
    inputs.rgb.green.addEventListener('change', () => {
        validateColor(inputs.rgb.green, 255, picker.color.green, false);
        picker.color.green = inputs.rgb.green.value.trim();
    });
    inputs.rgb.blue.addEventListener('change', () => {
        validateColor(inputs.rgb.blue, 255, picker.color.blue, false);
        picker.color.blue = inputs.rgb.blue.value.trim();
    });
    inputs.rgb.alpha.addEventListener('change', () => {
        validateColor(inputs.rgb.alpha, 100, picker.color.alpha, true);
        picker.color.alpha = inputs.rgb.alpha.value.trim();
    });

    // HSV color mode inputs event listeners
    inputs.hsv.hue.addEventListener('change', () => {
        validateColor(inputs.hsv.hue, 360, picker.color.hue, false);
        picker.color.hue = inputs.hsv.hue.value.trim();
    });
    inputs.hsv.saturation.addEventListener('change', () => {
        validateColor(inputs.hsv.saturation, 100, picker.color.saturation, false);
        picker.color.saturation = inputs.hsv.saturation.value.trim();
    });
    inputs.hsv.value.addEventListener('change', () => {
        validateColor(inputs.hsv.value, 100, picker.color.value, false);
        picker.color.value = inputs.hsv.value.value.trim();
    });
    inputs.hsv.alpha.addEventListener('change', () => {
        validateColor(inputs.hsv.alpha, 100, picker.color.alpha, true);
        picker.color.alpha = inputs.hsv.alpha.value.trim();
    });

    updatePickerNumericValues(picker, inputs, preview);

    return picker;
}

/**
 * Update color button UI
 * @param {HTMLButtonElement} button
 * @param {String} color HEX color
 */
function updateColorEditButton(button, color) {
    button.style.background = color;
    button.dataset.color = color;

    if (isLightColor(color)) {
        button.classList.add('light');
        button.classList.remove('dark');
    } else {
        button.classList.add('dark');
        button.classList.remove('light');
    }
}

function updatePickerNumericValues(picker, inputs, preview) {
    inputs.hex.value = picker.color.hex8String;

    inputs.rgb.red.value = Math.round(picker.color.red);
    inputs.rgb.green.value = Math.round(picker.color.green);
    inputs.rgb.blue.value = Math.round(picker.color.blue);
    inputs.rgb.alpha.value = Math.round(picker.color.alpha * 100);

    inputs.hsv.hue.value = Math.round(picker.color.hue);
    inputs.hsv.saturation.value = Math.round(picker.color.saturation);
    inputs.hsv.value.value = Math.round(picker.color.value);
    inputs.hsv.alpha.value = Math.round(picker.color.alpha * 100);

    preview.style.backgroundColor = picker.color.hex8String;
}

/**
 * Make sure that the color entered is valid
 * @param {HTMLElement} input
 * @param {number} max
 * @param {number} original
 * @param {boolean} percentage
 */
function validateColor(input, max, original, percentage) {
    const parsedValue = parseFloat(input.value.trim());

    if (isNaN(parsedValue)) {
        input.value = original;
    } else if (parsedValue < 0) {
        input.value = 0;
    } else if (parsedValue > max) {
        input.value = max;
    }

    if (percentage) {
        input.value = parsedValue / 100;
    }
}

/**
 * Show/hide custom colors section
 */
function toggleColorSettings() {
    if (document.settings.customColors.checked) {
        if (!previousToggleValue) {
            updateColorEditButton(btnColorThumb, defaults.colorThumb);
            updateColorEditButton(btnColorTrack, defaults.colorTrack);
        }
        document.getElementById('only-colors').classList.remove('hide');
    } else {
        document.getElementById('only-colors').classList.add('hide');
    }

    previousToggleValue = document.settings.customColors.checked;
}

/**
 * Show/hide settings that are not relevant for hidden scrollbars
 */
function toggleHiddenSettings() {
    if (document.settings.width.value == 'none') {
        document.getElementById('only-not-hidden').classList.add('hide');
    } else {
        document.getElementById('only-not-hidden').classList.remove('hide');
    }
}

/**
 * Change between Hex, RGB or HSV mode
 * @param {Object} tabs 
 * @param {HTMLElement} selected 
 * @param {string} key 
 */
function changeColorMode(tabs, selected, key) {
    tabs.hex.classList.remove('selected');
    tabs.rgb.classList.remove('selected');
    tabs.hsv.classList.remove('selected');

    const container = tabs.hex.parentNode.parentNode;
    container.classList.remove('showHEX');
    container.classList.remove('showRGB');
    container.classList.remove('showHSV');

    selected.classList.add('selected');
    container.classList.add('show' + key.toUpperCase());
}

/**
 * Get all elements of the color inputs
 * @param {string} parentId
 * @returns Object of all HTML elements
 */
function getColorInputs(parentId) {
    const hex = document.getElementById(parentId + 'HEX');
    const rgb = document.getElementById(parentId + 'RGB');
    const hsv = document.getElementById(parentId + 'HSV');
    const tabs = document.getElementById(parentId + "Tabs");

    return {
        hex: hex,
        rgb: {
            red: rgb.getElementsByTagName('input')[0],
            green: rgb.getElementsByTagName('input')[1],
            blue: rgb.getElementsByTagName('input')[2],
            alpha: rgb.getElementsByTagName('input')[3]
        },
        hsv: {
            hue: hsv.getElementsByTagName('input')[0],
            saturation: hsv.getElementsByTagName('input')[1],
            value: hsv.getElementsByTagName('input')[2],
            alpha: hsv.getElementsByTagName('input')[3]
        },
        container: document.getElementById(parentId).parentElement,
        tabs: {
            hex: tabs.getElementsByTagName('button')[0],
            rgb: tabs.getElementsByTagName('button')[1],
            hsv: tabs.getElementsByTagName('button')[2],
        }
    };
}

/**
 * Open color picker in dialog next to clicked button
 * @param {Event} event
 */
function openColorPickerDialog(event) {
    const dialog = document.getElementById('color-picker-dialog');
    const dialogPosition = dialog.getBoundingClientRect();

    selectedColor = event.currentTarget;
    colorPicker.setColors([selectedColor.style.background]);
    updatePickerNumericValues(colorPicker, getColorInputs('colorPicker'), document.getElementById('colorPickerPreview'));

    const targetPosition = selectedColor.getBoundingClientRect();

    dialog.style.top = `${targetPosition.top + targetPosition.height + window.scrollY - dialogPosition.height}px`;
    dialog.style.left = `${targetPosition.left + window.scrollX - dialogPosition.width}px`;
    dialog.style.visibility = 'visible';

    event.stopPropagation();
    document.body.addEventListener('click', closeColorPickerListener);
}

/**
 * Close color picker dialog
 */
function closeColorPickerDialog() {
    document.body.removeEventListener('click', closeColorPickerListener);
    selectedColor = null;

    const dialog = document.getElementById('color-picker-dialog');
    dialog.style.visibility = 'hidden';
    dialog.style.top = '0';
    dialog.style.left = '0';
}

/**
 * 
 * @param {Event} event
 */
function closeColorPickerListener(event) {
    let target = event.target;

    while (target != document.body) {
        if (target.id == 'color-picker-dialog') {
            return;
        }
        target = target.parentElement;
    }
    
    closeColorPickerDialog();
}

/**
 * Update percentage counter for border radius
 */
function updateRadiusLabel() {
    const label = document.getElementById('thumbRadius-label');
    label.textContent = document.settings.thumbRadius.value + '%';
    updatePreview();
}

/**
 * Toggle the options for width of other
 */
function toggleCustomWidth() {
    const customWidthValue = document.getElementById('customWidthValue');
    const customWidthUnit = document.getElementById('customWidthUnit');

    if (document.settings.width.value == 'other') {
        customWidthValue.disabled = false;
        customWidthUnit.disabled = false;
    } else {
        customWidthValue.disabled = true;
        customWidthUnit.disabled = true;
    }
}

/**
 * Parse and handle focus of custom with value
 * @param {boolean} showNumber
 */
function parseCustomWidthValue(showNumber) {
    const otherText = document.getElementById('customWidthValue');

    if (showNumber) {
        otherText.type = 'number';
    } else {
        otherText.type = 'text';
        if (isNaN(parseInt(otherText.value))) {
            otherText.value = defaults.customWidthValue;
        }
    }
}

/**
 * Select the correct profile from the profile drop-down
 */
function updateSelectedProfileInDropdown() {
    document.settings.profile.value = selectedProfile;
    document.getElementById('profile-setDefault').disabled = selectedProfile == defaultProfile;

    const noScrollbarMsg2 = document.getElementById('messageNoScrollbarSelectedMessage2');
    if (selectedProfile == defaultProfile) {
        noScrollbarMsg2.classList.add('hide');
    } else {
        noScrollbarMsg2.classList.remove('hide');
    }
}

/**
 * Load profile from Storage API
 * @param {number} id
 */
 function loadProfileDetailsIntoDialog(id) {
    if (id == 'default') {
        loadProfileDetailsIntoDialog(defaultProfile);
        return;
    }

    showProgressBar(true);

    const widthOutput = document.getElementById('detail-width');
    const autoHideOutput = document.getElementById('detail-autoHide');
    const buttonsOutput = document.getElementById('detail-buttons');
    const thumbRadiusOutput = document.getElementById('detail-thumbRadius');
    const colorThumbOutput = document.getElementById('detail-color-thumb');
    const colorTrackOutput = document.getElementById('detail-color-track');
    const overrideOutput = document.getElementById('detail-override');
    const detailsContainer = document.getElementById('rule-preview');

    if (id == 'none') {
        detailsContainer.classList.add('dim');

        widthOutput.textContent = '-';
        autoHideOutput.textContent = '-';
        buttonsOutput.textContent = '-';
        thumbRadiusOutput.textContent = '-';
        overrideOutput.textContent = '-';

        colorThumbOutput.style.background = 'unset';
        colorThumbOutput.textContent = '-';
        colorThumbOutput.classList.remove('color-output');

        colorTrackOutput.style.background = 'unset';
        colorTrackOutput.textContent = '-';
        colorTrackOutput.classList.remove('color-output');

        showProgressBar(false);

        return;
    }

    browser.storage.local.get(`profile_${id}`, (data) => {
        const profile = loadWithDefaults(data[Object.keys(data)[0]]);

        detailsContainer.classList.remove('dim');

        // Fill width information
        switch (profile.width) {
            case 'auto':
            case 'unset':
                const key = (runningOn == browsers.FIREFOX) ? 'sizeDefault' : 'sizeWide';
                widthOutput.textContent = browser.i18n.getMessage(key);
                break;
            case 'thin':
                widthOutput.textContent = browser.i18n.getMessage('sizeThin');
                break;
            case 'none':
                widthOutput.textContent = browser.i18n.getMessage('sizeHidden');
                break;
            default:
                widthOutput.textContent = profile.customWidthValue + profile.customWidthUnit;
                break;
        }

        if (profile.width != 'none') {
            // Fill buttons information
            switch (profile.buttons) {
                case 'light':
                case 'dark':
                case 'auto':
                    buttonsOutput.textContent = browser.i18n.getMessage('optionYes');
                    break;
                default:
                    buttonsOutput.textContent = browser.i18n.getMessage('optionNo');
                    break;
            }

            // Thumb radius information
            thumbRadiusOutput.textContent = profile.thumbRadius + '%';

            // Fill auto hide information
            switch (profile.autoHide) {
                case 1:
                    autoHideOutput.textContent = browser.i18n.getMessage('optionYes');
                    break;
                case 0:
                default:
                    autoHideOutput.textContent = browser.i18n.getMessage('optionNo');
                    break;
            }
        } else {
            autoHideOutput.textContent = '-';
            buttonsOutput.textContent = '-';
            thumbRadiusOutput.textContent = '-';
        }

        // Fill color information
        if (profile.colorThumb && profile.colorTrack && profile.width != 'none') {
            colorThumbOutput.style.background = profile.colorThumb;
            colorThumbOutput.textContent = '';
            colorThumbOutput.classList.add('color-output');

            colorTrackOutput.style.background = profile.colorTrack;
            colorTrackOutput.textContent = '';
            colorTrackOutput.classList.add('color-output');
        } else {
            colorThumbOutput.style.background = 'unset';
            colorThumbOutput.textContent = '-';
            colorThumbOutput.classList.remove('color-output');

            colorTrackOutput.style.background = 'unset';
            colorTrackOutput.textContent = '-';
            colorTrackOutput.classList.remove('color-output');
        }

        // Fill override information
        switch (profile.allowOverride) {
            case 0:
                overrideOutput.textContent = browser.i18n.getMessage('overrideNone');
                break;
            case 1:
                overrideOutput.textContent = browser.i18n.getMessage('overrideColor');
                break;
            case 10:
                overrideOutput.textContent = browser.i18n.getMessage('overrideWidth');
                break;
            case 11:
                overrideOutput.textContent = browser.i18n.getMessage('overrideAll');
                break;
        }

        showProgressBar(false);
    });
}

function handleStorageChanges(changes, area) {
    const list = [`profile_${selectedProfile}`];

    // Reload changes without prompting user, where possible
    for (const key of Object.keys(changes)) {
        switch (key) {
            case 'defaultProfile':
                defaultProfile = changes[key].newValue;
                updateSelectedProfileInDropdown();
                break;
            case `profile_${selectedProfile}`:
                if (!pendingChanges && typeof changes[key].newValue == 'object') {
                    loadScrollbar(selectedProfile);
                    ignoreNextChange = true;
                }
                break;
        }

        // Reload profile selection, if required
        if (key.startsWith('profile_') && key != `profile_${selectedProfile}`) {
            reloadProfileSelection(document.settings.profile, () => {
                addNoProfileOption(document.settings.profile);
                document.settings.profile.firstChild.textContent = '';
                updateSelectedProfileInDropdown();
            });
        }
    }

    checkForStorageChanges(list, changes, area);
}

let defaultProfile, selectedProfile, selectedProfileName, localFileProfile, previousToggleValue;
let selectedColor = null;

const btnColorThumb = document.getElementById('colorThumb');
const btnColorTrack = document.getElementById('colorTrack');
const colorPicker = createColorPicker(
    document.getElementById('colorPicker'),
    getColorInputs('colorPicker'),
    document.getElementById('colorPickerPreview'),
    defaults.colorThumb
);

init();

document.getElementById('saveChanges').addEventListener('click', saveScrollbar);
document.settings.addEventListener('change', (e) => {
    if (e.target != document.settings.profile) {
        toggleColorSettings();
        toggleCustomWidth();
        toggleHiddenSettings();
        toggleChangesWarning(true);
    }
});
document.settings.thumbRadius.addEventListener('input', updateRadiusLabel);
document.getElementById('customWidthValue').addEventListener('focus', () => {
    parseCustomWidthValue(true)
});
document.getElementById('customWidthValue').addEventListener('blur', () => {
    parseCustomWidthValue(false)
});
document.getElementById('profile-setDefault').addEventListener('click', updateDefaultProfile);
document.getElementById('dialog-dropdown').addEventListener('change', () => {
    loadProfileDetailsIntoDialog(document.getElementById('dialog-dropdown').value);
});

document.settings.profile.addEventListener('change', () => {
    confirmAction(
        browser.i18n.getMessage('dialogChangesWillBeLostTitle'),
        browser.i18n.getMessage('dialogChangesWillBeLost'),
        function() {
            loadScrollbar(document.settings.profile.value)
        },
        function() {
            document.settings.profile.value = selectedProfile
        },
        !pendingChanges
    );
});
document.getElementById('profile-duplicate').addEventListener('click', () => {
    confirmAction(
        browser.i18n.getMessage('dialogChangesWillBeLostTitle'),
        browser.i18n.getMessage('dialogChangesWillBeLost'),
        duplicateProfile,
        null,
        !pendingChanges
    );
});
document.getElementById('profile-add').addEventListener('click', () => {
    confirmAction(
        browser.i18n.getMessage('dialogChangesWillBeLostTitle'),
        browser.i18n.getMessage('dialogChangesWillBeLost'),
        addProfile,
        null,
        !pendingChanges
    );
});
document.getElementById('profile-rename').addEventListener('click', () => {
    const selector = document.getElementById('profileSelection');
    showPrompt(
        browser.i18n.getMessage('dialogRenameProfileTitle'),
        null,
        renameProfile,
        null,
        selector.options[selector.selectedIndex].textContent
    );
});
document.getElementById('profile-remove').addEventListener('click', () => {
    if (selectedProfile == defaultProfile) {
        showAlert(
            browser.i18n.getMessage('dialogRemoveProfileTitle'),
            browser.i18n.getMessage('dialogCannotDeleteDefault'),
            null,
            false
        );
        return;
    }

    confirmAction(
        browser.i18n.getMessage('dialogRemoveProfileTitle'),
        browser.i18n.getMessage('dialogCannotBeUndone'),
        removeProfile,
        null,
        false
    );
});
btnColorThumb.addEventListener('click', openColorPickerDialog);
btnColorTrack.addEventListener('click', openColorPickerDialog);
browser.storage.onChanged.addListener(handleStorageChanges);
