(function() {
    "use strict";

    const THEMES_KEY = 'themes';
    const SETTINGS_KEY = 'themes-user-settings';
    const FIRST_OPEN_KEY = 'first_open';

    chrome.storage.local.get([THEMES_KEY, SETTINGS_KEY, FIRST_OPEN_KEY], data => {
        const themesData = data[THEMES_KEY] || { };
        const settings = data[SETTINGS_KEY] || { };
        const firstOpen = !data.hasOwnProperty(FIRST_OPEN_KEY) || data[FIRST_OPEN_KEY] === true;

        const themes = (themesData.themes || []).concat(settings.userThemes || []);
        const activeId = settings.activeId;

        const activeTheme =
            themes.find(theme => theme.id === activeId) || { };

        const localImage = (settings.localImages || {})[activeTheme.name];

        if (localImage) {
            const fullImageStr = `url(${activeTheme.fullImage})`;
            const localImageStr = localImage ? `url(${localImage}), ` : '';

            document.querySelector('.page-background-upper-layer').style.backgroundImage = localImageStr + fullImageStr;
        }

        if (firstOpen) {
            document.body.classList.add('onboarding-opened');
        }
    });
})();
