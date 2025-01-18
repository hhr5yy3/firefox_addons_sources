if (WebExtension === undefined) {
  var WebExtension = chrome || browser;
}

let
  geckoSupportsWebpQualitySettings = false,
  current_options = {},
  updateSettings = (event,  includePath) => {
    'use strict';
    var options = { image: {}, generic: {}, downloadPath:{}, layout:{}, defaults:{} },
      background_element,
      convert_to,
      quality,
      quality_gui_value,
      value;

    for (let optionName of Object.keys(current_options.image)) {
      convert_to = document.querySelector('[name=image-' + optionName + '-conversion]').value;
      background_element = document.querySelector('[name=image-' + optionName + '-background]');
      quality_gui_value = document.querySelector('[name=image-' + optionName + '-quality]').value;
      quality = ['none', 'png', 'auto', 'static'].indexOf(convert_to) === -1 ? quality_gui_value : null;

      if (current_options.image[optionName].convert_to !== 'jpg' && convert_to === 'jpg') {
        quality = current_options.defaults.jpgDefaultQuality;
      }
      if (current_options.image[optionName].convert_to !== 'webp' && convert_to === 'webp') {
        quality = current_options.defaults.webpDefaultQuality;
      }

      options.image[optionName] = {
        'convert_to': convert_to,
        'quality': quality
      };
      if (background_element !== null) {
        options.image[optionName].background = (convert_to === 'jpg' ? background_element.value : '#ffffff');
      }
    }
    for (let optionSection of Object.keys(current_options)) {
      if (optionSection !== 'image' && optionSection !== 'downloadPath') {
        for (let optionName of Object.keys(current_options[optionSection])) {
          let el = document.querySelector('[name=' + optionSection + '-' + optionName + ']:not([type=checkbox])');
          options[optionSection][optionName] = el !== null ? el.value : document.querySelector('[name=' + optionSection + '-' + optionName + '][type=checkbox]').checked;
        }
      }
    }
    if (options.layout.defaultDisplayMode === 'basic' && ['defaults', 'layout', 'action'].indexOf(options.layout.defaultTabWhenOpening) !== -1) {
      options.layout.defaultTabWhenOpening = 'conversion';
    }


    options.downloadPath.subfolder = current_options.downloadPath.subfolder;
    options.downloadPath.filename = current_options.downloadPath.filename;
    if (includePath) {
      value = document.querySelector('[name=downloadPath-subfolder]').value;
      options.downloadPath.subfolder = isValidFolderPath(value) ? value : current_options.downloadPath.subfolder;

      value = document.querySelector('[name=downloadPath-filename]').value;
      options.downloadPath.filename = isValidFilename(value) ? value : current_options.downloadPath.filename;
    }
    WebExtension.runtime.sendMessage({action: 'update_options', data: {options: options}});
  },
  updateSliderValue = (el, value) => {
    'use strict';
    el.innerText = (100 * value).toFixed() + '%';
  },
  updateSlider = (e) => {
    'use strict';
    updateSliderValue(e.target.parentNode.children[0], e.target.value);
  },
  themeCSS,
  downloadPath = {
    subfolder: null,
    filename: null,
    save: null,
    undo: null
  },
  examplePathResult = () => {
    'use strict';
    let variables = {
      originalname:'image',
      originaltype: 'webp',
      savetype: 'jpg',
      imagehost: 'imagehost.com',
      pagehost: 'pagehost.com'
    };
   return 'Downloads' + DirectorySeperator +
      parsePath(variables, downloadPath.subfolder.value, downloadPath.filename.value);

  },
  isValidPath = () => {
    'use strict';
    return  isValidFolderPath(downloadPath.subfolder.value) &&
      isValidFilename(downloadPath.filename.value);
  },
  setExamplePath = () => {
    'use strict';
    document.getElementById('filename-example').innerText =  isValidPath() ? examplePathResult() : '';
  },
  pathUpdated = () => {
    'use strict';
    setExamplePath();
    downloadPath.save.disabled = !isValidPath();
    downloadPath.undo.disabled = false;

    flipClassName(downloadPath.subfolder, 'invalid', !isValidFolderPath(downloadPath.subfolder.value));
    flipClassName(downloadPath.filename, 'invalid', !isValidFilename(downloadPath.filename.value));
  },
  saveDownloadPath = () => {
    'use strict';
    if(downloadPath.save.disabled) {
      return;
    }
    updateSettings(null, true);
    downloadPath.save.disabled = true;
    downloadPath.undo.disabled = true;

  },
  resetDownloadPath = () => {
    'use strict';
    downloadPath.subfolder.value = current_options.downloadPath.subfolder;
    downloadPath.filename.value = current_options.downloadPath.filename;
    pathUpdated();

    downloadPath.save.disabled = true;
    downloadPath.undo.disabled = true;
  },
  manualResetDownloadPath = () => {
    'use strict';
    if(downloadPath.undo.disabled) {
      return;
    }
    resetDownloadPath();
  },
  currentTheme = null,
  noAutoDetectWarning = null,
  updateGUI = (options) => {
    'use strict';
    let autodetectExists = false;
    //image
    for (let key in options.image) {
      let option = options.image[key],
        select = document.querySelector('[name^=image-' + key + '-conversion]'),
        quality_slider = document.querySelector('[name^=image-' + key + '-quality]'),
        quality_indicator = document.querySelector('#image-' + key + '-quality-level'),
        background_element = document.querySelector('[name^=image-' + key + '-background]');
        updateSelect(select, option.convert_to);
      quality_slider.value = option.quality;
      if (option.quality === null || isGecko && !geckoSupportsWebpQualitySettings && option.convert_to === "webp") {
        if (option.quality === null)
          quality_slider.value = 0.5;
        quality_slider.setAttribute('disabled', 'disabled');
        addClassName(quality_slider.parentNode, 'disabled');
      } else {
        quality_slider.removeAttribute('disabled');
        removeClassName(quality_slider.parentNode, 'disabled');
      }
      updateSliderValue(quality_indicator, quality_slider.value);
      if (background_element) {
        background_element.disabled = (option.convert_to !== 'jpg');

        if (option.background) {
          background_element.value = option.background;
        }
      }
      if (option.convert_to === 'auto')
        autodetectExists = true;
    }
    if (!isGecko)
      autodetectExists = options.image.staticClick.convert_to === 'auto';
    noAutoDetectWarning.style.display = autodetectExists ? 'none' : 'inline-block';

    //defaults
    updateSliderValue(document.querySelector('#defaults-jpgDefaultQuality-level'), options.defaults.jpgDefaultQuality);
    document.querySelector('[name=defaults-jpgDefaultQuality]').value = options.defaults.jpgDefaultQuality;

    updateSliderValue(document.querySelector('#defaults-webpDefaultQuality-level'), options.defaults.webpDefaultQuality);
    document.querySelector('[name=defaults-webpDefaultQuality]').value = options.defaults.webpDefaultQuality;

    //generic
    document.querySelector('[name=generic-experimentalAvif]').checked = options.generic.experimentalAvif;
    document.querySelector('[name=generic-preferAvif]').checked = options.generic.preferAvif;
    document.querySelector('[name=generic-preferWebp]').checked = options.generic.preferWebp;
    updateSelect(document.querySelector('[name=generic-saveAsWindow]'), options.generic.saveAsWindow);
    updateSelect(document.querySelector('[name=generic-incognitoMode]'), options.generic.incognitoMode);
    updateSelect(document.querySelector('[name=generic-filenameConflictAction]'), options.generic.filenameConflictAction);

    //layout
    let defaultDisplayMode = document.querySelector('[name=layout-defaultDisplayMode]');
    updateSelect(defaultDisplayMode, options.layout.defaultDisplayMode);

    let defaultTabWhenOpening = document.querySelector('[name=layout-defaultTabWhenOpening]');
    updateSelect(defaultTabWhenOpening, options.layout.defaultTabWhenOpening);
    for (let tapOption of defaultTabWhenOpening.querySelectorAll('option[value=defaults],option[value=layout],option[value=action]')) {
      tapOption.style.display= defaultDisplayMode.value === 'advanced' ? '' : 'none';
    }
    document.querySelector('[name=layout-showDownloadPathHints]').checked = options.layout.showDownloadPathHints;
    document.querySelector('[name=layout-showQualitySlider]').checked = options.layout.showQualitySlider;

    updateSelect(document.querySelector('[name=layout-theme]'), options.layout.theme);
    if (currentTheme !== options.layout.theme)
      themeCSS.setAttribute('href', 'css/' + options.layout.theme + '.css');
    currentTheme = options.layout.theme;
    (!options.layout.showDownloadPathHints ? addClassName:removeClassName)(document.querySelector('#options_download_hints_container'), 'hidden');
    (options.layout.showQualitySlider ? addClassName:removeClassName)(document.querySelector('#options_conversion_table'),'show-quality-option');
  },
  option_wrapper,
  advanced_button,
  setTab = (el) => {
    'use strict';
    let tabs = document.querySelectorAll('.menu-item');
    for (let i = 0, n = tabs.length; i < n; ++i) {
      removeClassName(tabs[i], 'selected');
      removeClassName(document.querySelector('#' + tabs[i].dataset.section), 'selected');
    }
    addClassName(el, 'selected');
    addClassName(document.querySelector('#' + el.dataset.section), 'selected');
  },
  changeTab = (e) => {
    'use strict';
    setTab(e.target);
  },
  initialTab = (requestedTab, displayMode) => {
    'use strict';
    if (displayMode === 'advanced') {
      setTab(document.querySelector('[data-section=content-' +requestedTab + ']'));
      return;
    }
    if (['conversion', 'downloadPath', 'generic'].indexOf(requestedTab) !== -1) {
      setTab(document.querySelector('[data-section=content-' + requestedTab + ']'));
      return;
    }
    setTab(document.querySelector('[data-section=content-conversion]'));
  },
  isInitialized = false,
  resetPath = false,
  init = () => {
    'use strict';
    let transitionsCSS = document.createElement('link');
    transitionsCSS.setAttribute('type', 'text/css');
    transitionsCSS.setAttribute('rel', 'stylesheet');
    transitionsCSS.setAttribute('href', 'css/transitions.css');
    document.head.appendChild(transitionsCSS);

    resetDownloadPath();
    setTimeout(()=>{
        setInterval(setExamplePath, 1000);
      },
      1000 - (new Date()).getMilliseconds()
    );

    if (current_options.layout.defaultDisplayMode === 'advanced') {
      addClassName(option_wrapper, 'advanced');
      setTab(document.querySelector('[data-section=content-' + current_options.layout.defaultTabWhenOpening + ']'));
      advanced_button.innerText = 'Advanced';
    }
    initialTab(current_options.layout.defaultTabWhenOpening, current_options.layout.defaultDisplayMode);

    let inputs = document.querySelectorAll('select,[type=checkbox],[type=range],[type=color]');
    for (let i = 0, n = inputs.length; i < n; ++i) {
      inputs[i].addEventListener('change', updateSettings);
    }
    let sliders = document.querySelectorAll('[type=range]');
    for (let i = 0, n = sliders.length; i < n; ++i) {
      sliders[i].addEventListener('input', updateSlider);
    }
  },
  page_init=false,
  initiateOptions =  () => {
    'use strict';
    if(page_init)
      return
    page_init = true;
    WebExtension.runtime.sendMessage({action: 'get_OSInfo'});
    WebExtension.runtime.sendMessage({action: 'get_options'});
    noAutoDetectWarning = document.getElementById('no-autodetect-warning');
    themeCSS = document.createElement('link');
    themeCSS.setAttribute('type', 'text/css');
    themeCSS.setAttribute('rel', 'stylesheet');
    themeCSS.setAttribute('id', 'themeCSS');
    document.head.appendChild(themeCSS);

    let tabs = document.querySelectorAll('.menu-item');
    for (let i = 0, n = tabs.length; i < n; ++i) {
      tabs[i].addEventListener('click', changeTab);
    }
    setTab(tabs[0]);

    for (let select of document.querySelectorAll('select')) {
      replaceSelect(select);
    }

    if(isGecko)
      EnableIncognitoModeSelction();

    downloadPath.subfolder = document.querySelector('[name=downloadPath-subfolder]');
    downloadPath.filename = document.querySelector('[name=downloadPath-filename]');
    downloadPath.save = document.getElementById('saveDownloadPath');
    downloadPath.undo = document.getElementById('undoDownloadPathChanges');

    downloadPath.subfolder.addEventListener('input', pathUpdated);
    downloadPath.filename.addEventListener('input', pathUpdated);

    downloadPath.save.addEventListener('click', saveDownloadPath);
    downloadPath.undo.addEventListener('click', manualResetDownloadPath);

    advanced_button = document.getElementById('advanced');

    option_wrapper = document.getElementById('content-wrapper');
    advanced_button.addEventListener('click', () => {
      toggleClassName(option_wrapper, 'advanced');
      advanced_button.innerText = hasClassName(option_wrapper, 'advanced') ? 'Advanced' : 'Basic';
    });
    document.getElementById('reset').addEventListener('click', () => {
      resetPath = true;
      WebExtension.runtime.sendMessage({action: 'reset_options'});
      setTab(document.querySelector('[data-section=content-generic]'));});

    document.getElementById('version-number').innerText=chrome.runtime.getManifest().version;
  },
  messageEvents = {
    current_options: (data) => {
      'use strict';
      current_options = data.options;
      updateGUI(current_options);
      if (!isInitialized) {
        isInitialized = true;
        init();
      }
      if (resetPath) {
        resetDownloadPath();
        resetPath = false;
      }
    },
    storageInitiated:() => {
      initiateOptions()
    },
    OSInfo: (osInfo) => {
      'use strict';
      if (isGecko) {
        /*
        Firefox version specific features:
        65+ supports webp enables prefer webp setting
        79+ supports expirimental avif, add setting to match behavior
        86+ support pagehost in filepath
        93+ supports avif, remove expirimental behavior setting and dd prefer avif option
        96+ supports Webp conversion
        98+ supports quality setting for webp conversion
        /**/
        let featureVersions = [98, 96, 93, 86, 79, 65];
        let featureVersionIndex = featureVersions.findIndex(v => v <= osInfo.browser.majorVersion);
        var featureVersion = featureVersionIndex === -1 ? null : featureVersions[featureVersionIndex];
        if (featureVersion !== null)
          addClassName(document.body, "gecko-" + featureVersion);
        geckoSupportsWebpQualitySettings = osInfo.browser.majorVersion >= 98;
      }
      if(!isGecko && typeof Promise.any === "undefined")
        addClassName(document.body, "webkit-lower-than-85");
      DirectorySeperator = osInfo.DirectorySeperator;
      for (let container of document.querySelectorAll('span.directorySeperator'))
        container.innerText = DirectorySeperator;
      for (let container of document.querySelectorAll('span.ctrlKey'))
        container.innerText = osInfo === 'mac' ? 'Command' : 'Ctrl';
  }
},
openDownbloadsPage = () => {
  chrome.tabs.create({
    url: 'chrome://settings/downloads'
  });
};

WebExtension.runtime.onMessage.addListener((message, sender, sendResponse) => {
  'use strict';
  if (message === undefined || message.action  === undefined) {
    return;
  }
  (messageEvents[message.action] || (()=>{}))(message.data || {});
});

let EnableIncognitoModeSelction = async () => {
  'use strict';
  document.querySelector('[name=generic-incognitoMode]').disabled = !(await browser.extension.isAllowedIncognitoAccess());
};

document.addEventListener('DOMContentLoaded', () => {
  WebExtension.runtime.sendMessage({action: 'awaitStorageInitialization'});
  document.querySelector('#openDownbloadsPage').addEventListener('click',openDownbloadsPage)
})
