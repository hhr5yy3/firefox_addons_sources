var default_data_model = {
        version: -1,
        options:{}
    },
    datamodel_upgrades = [
        (o) => {
            'use strict';
            o.options = {
                    image: {
                        bmp: {
                            convert_to: 'none',
                            quality: null
                        },
                        gif: {
                            convert_to: 'none',
                            quality: null,
                            background: '#ffffff'
                        },
                        ico: {
                            convert_to: 'none',
                            quality: null,
                            background: '#ffffff'
                        },
                        jpg: {
                            convert_to: 'none',
                            quality: null
                        },
                        png: {
                            convert_to: 'none',
                            quality: null,
                            background: '#ffffff'
                        },
                        webp: {
                            convert_to: 'png',
                            quality: null,
                            background: '#ffffff'
                        },
                    }
                };
            o.version = 0;
        },
        (o) => {
            'use strict';
            o.options.image.staticClick = {
                convert_to:'auto',
                quality: null,
                background: '#ffffff'
            };
            o.options.image.staticShiftClick = {
                convert_to:'auto',
                quality: null,
                background: '#ffffff'
            };
            o.options.image.staticCtrlClick = {
                convert_to:'auto',
                quality: null,
                background: '#ffffff'
            };
            o.options.image.staticCtrlShiftClick = {
                convert_to:'auto',
                quality: null,
                background: '#ffffff'
            };
            o.options.downloadPath= {
                filename:'<originalname>',
                subfolder:''
            };
            o.options.generic = {
                preferWebp: true,
                incognitoMode: 'false',
                saveAsWindow: 'true'
            };
            o.options.layout = {
                defaultDisplayMode: 'basic',
                showDownloadPathHints: true,
                showQualitySlider: false,
                defaultTabWhenOpening: 'conversion',
                theme: 'auto'
            };
            o.options.defaults = {
                jpgDefaultQuality: 0.92,
                webpDefaultQuality: 1
            };
            o.version = 1;
        },
        (o) => {
            'use strict';
            o.options.image.avif = {
                convert_to: 'png',
                quality: null,
                background: '#ffffff'
            };
            o.options.generic.preferAvif = true;
            o.options.generic.experimentalAvif = false;
            o.version = 2;
        },
        (o) => {
            'use strict';
            o.options.generic.filenameConflictAction = 'uniquify';
            o.version = 3;
        }
    ],
    imageValidationFilter = (options) => {
        'use strict';
        if (!options.image) {
            return false;
        }
        var valid_options = {
            image: {
                avif:  { background: true, convert_to: ['none', 'jpg', 'png'] },
                bmp:   { background: false, convert_to: ['none', 'jpg', 'png'] },
                gif:   { background: true,  convert_to: ['none', 'jpg', 'png'] },
                ico:   { background: true,  convert_to: ['none', 'jpg', 'png'] },
                jpg:   { background: false, convert_to: ['none', 'png'] },
                png:   { background: true,  convert_to: ['none', 'jpg'] },
                webp:  { background: true,  convert_to: ['none', 'jpg', 'png'] },
                staticClick:            { background: true, convert_to: ['auto', 'none', 'jpg', 'png'] },
                staticCtrlClick:        { background: true, convert_to: ['auto', 'none', 'jpg', 'png'] },
                staticShiftClick:       { background: true, convert_to: ['auto', 'none', 'jpg', 'png'] },
                staticCtrlShiftClick:   { background: true, convert_to: ['auto', 'none', 'jpg', 'png'] }
            }
        };
        // webkit supports webp conversion and gecko from version 96.
        if (!isGecko || isGecko && browserInfo.majorVersion >= 96) {
            for (let type in valid_options.image) {
                if (type !== 'webp') {
                    valid_options.image[type].convert_to.push('webp');
                }
            }
        }

        for (let key in valid_options.image) {
            // too little options

            if (!options.image[key]) {
                return false;
            }
        }
        for (let key in options.image) {
            let validate_option = options.image[key];
            // too many options
            if (!validate_option) {
                return false;
            }
            // missing settings
            if (!('convert_to' in validate_option) || !('quality' in validate_option)) {
                return false;
            }
            // invalid options
            if (valid_options.image[key].convert_to.indexOf(validate_option.convert_to) === -1) {
                return false;
            }
            // png and none do not use quality
            if ((validate_option.convert_to === 'png' || validate_option.convert_to === 'none') && validate_option.quality !== null) {
                return false;
            }
            // jpg and webp may only have a quality value between 0 and 1
            if (['jpg', 'webp'].indexOf(validate_option.convert_to) !== -1  &&
                isNaN(validate_option.quality) || validate_option.quality < 0 || validate_option.quality > 1) {
                return false;
            }
            if (validate_option.background &&
                (!options.image[key].background || !isValidColor(options.image[key].background))) {
                return false;
            }
        }

        return true;
    },
    defaultsValidationFilter = (options) => {
        'use strict';
        if (options.defaults.jpgDefaultQuality < 0  || options.defaults.jpgDefaultQuality > 1) {
            return false;
        }
        if (options.defaults.webpDefaultQuality < 0  || options.defaults.webpDefaultQuality > 1) {
            return false;
        }

        return true;
    },
    downloadPathValidationFilter = (options) => {
        'use strict';
        if (!isValidFilename(options.downloadPath.filename)) {
            return false;
        }
        if (!isValidFolderPath(options.downloadPath.subfolder)) {
            return false;
        }
        return true;
    },
    genericValidationFilter = (options) => {
        'use strict';
        if (typeof options.generic.preferWebp !== 'boolean') {
            return false;
        }
        if (typeof options.generic.preferAvif !== 'boolean') {
            return false;
        }
        if (typeof options.generic.experimentalAvif !== 'boolean') {
            return false;
        }
        if (['default', 'true', 'false'].indexOf(options.generic.saveAsWindow) === -1) {
            return false;
        }
        if (['default', 'true', 'false'].indexOf(options.generic.incognitoMode) === -1) {
            return false;
        }
        if (['uniquify', 'overwrite', 'prompt'].indexOf(options.generic.filenameConflictAction) === -1) {
            return false;
        }
        return true;
    },
    layoutValidationFilter = (options) => {
        'use strict';
        if (['basic', 'advanced'].indexOf(options.layout.defaultDisplayMode) === -1) {
            return false;
        }
        if (['conversion', 'downloadPath', 'generic', 'layout', 'action','defaults'].indexOf(options.layout.defaultTabWhenOpening) === -1) {
            return false;
        }
        if (typeof options.layout.showDownloadPathHints !== 'boolean') {
            return false;
        }
        if (typeof options.layout.showQualitySlider !== 'boolean') {
            return false;
        }
        if (['auto', 'light', 'dark'].indexOf(options.layout.theme) === -1) {
            return false;
        }
        return true;
    };

