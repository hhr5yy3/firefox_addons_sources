/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const defaults = {
    width: 'auto',
    color: 'unset',
    colorThumb: '#CDCDCDFF',
    colorTrack: '#F0F0F0FF',
    allowOverride: 10,
    customWidthValue: 17,
    customWidthUnit: 'px',
    buttons: 'none',
    thumbRadius: 0,
    autoHide: 0
}
const webBase = 'https://customscrollbars.com';

/**
 * Validates the data loaded from storage
 * Ensures that missing settings are replaced with the defaults
 * @param {Object} data Data from storage
 * @returns Data with defaults 
 */
function loadWithDefaults(settings) {
    const includeColors = settings.colorThumb && settings.colorTrack;

    const keys = Object.keys(defaults);
    for (const key of keys) {
        if (typeof defaults[key] != typeof settings[key]) {
            settings[key] = defaults[key];
        }
    }

    // Don't override colors
    if (!includeColors) {
        settings['colorThumb'] = null;
        settings['colorTrack'] = null;
    }

    return settings;
}
