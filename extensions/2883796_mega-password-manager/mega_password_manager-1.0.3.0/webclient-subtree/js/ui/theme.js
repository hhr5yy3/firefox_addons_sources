// Global theme functions
(function(scope) {
    'use strict';

    // the MediaQueryList relating to the system theme
    let query = null;

    const setElementClass = function(theme, element) {
        const themeClass = `theme-${theme}`;
        if (!element.classList.contains(themeClass)) {
            element.classList.remove('theme-dark', 'theme-light');
            element.classList.add(themeClass);
        }
    };

    /**
     * Sets the theme class on the body
     *
     * @param {*} theme - the name of the theme class
     * @return {undefined}
     */
    const setBodyClass = function(theme, elm) {
        setElementClass(theme, elm || document.body);
    };

    /**
     * The event listener, used for add/remove operations
     *
     * @param {object} e - the event object
     * @return {undefined}
     */
    const listener = function(e, element) {
        if (e.matches) {
            setBodyClass('dark', element);
        }
        else {
            setBodyClass('light', element);
        }
        mega.ui.pm.send({type: 'change-icon-theme', theme: e.matches ? 'dark' : 'light'});
    };

    /**
     * Set based on the matching system theme.
     * @returns {void}
     */
    const setByMediaQuery = (element) => {
        query = window.matchMedia('(prefers-color-scheme: dark)');

        if (query.addEventListener) {
            const _listener = e => listener(e, element);
            query.addEventListener('change', _listener);
            element.rmListener = query.removeEventListener.bind(query, 'change', _listener);
        }

        listener(query, element);
    };

    /**
     * Check if the dark mode theme is currently applied
     *
     * @returns {boolean} If the dark theme is applied
     */
    mega.ui.isDarkTheme = () => {
        const {classList} = document.body;
        return classList.contains('theme-dark') || classList.contains('theme-dark-forced');
    };

    /**
     * Sets the current theme, by value
     * Does not store the change to localStorage, purely presentational.
     *
     * @param {*} [value] the value of the theme to set [0/"0":  follow system, 1/"1": light, 2/"2": dark]
     * @return {undefined}
     */
    mega.ui.setTheme = (element, value) => {
        element = element || document.body;
        if (query && element.rmListener) {
            element.rmListener();
        }

        if (value === undefined) {
            value = (window.u_attr && u_attr['^!webtheme']) | 0;
        }
        else {
            value = Math.max(0, value | 0);

            if (value < 3 && window.u_attr) {
                u_attr['^!webtheme'] = String(value);
            }

            // Update UI when change with a value and in current page
            if (fminitialized) {
                // For mobile
                if (is_mobile && $.dialog === 'mobile-settings-appearance') {
                    mobile.appearance.themeGroup.children[value].checked = true;
                }
                else if (page === 'fm/account' && !is_mobile) {
                    // Update theme radio button based in current value
                    accountUI.inputs.radio.set(
                        '.uiTheme',
                        accountUI.$contentBlock,
                        value | 0
                    );
                }
            }
        }

        if (value === 2) {
            setBodyClass('dark');
        }
        else if (value !== 1 && window.matchMedia) {
            setByMediaQuery(element);
        }
        else {
            // if the browser doesn't support matching the system theme, set light mode
            setElementClass('light', element);
        }
    };
})(window);
