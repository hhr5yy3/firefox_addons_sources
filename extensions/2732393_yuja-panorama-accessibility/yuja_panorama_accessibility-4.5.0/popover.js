function handleMessage(message) {
    if (message && message.source === 'inject.js') {
        if (message.data === 'loggedOut') {
            // handle user successfully logged out
            document.getElementById('domain').innerText = '';
            document.getElementById('userId').innerText = '';
            document.getElementById('institution').innerText = '';
            document.getElementById('token').innerText = '';
            document.getElementById('domain-check').className = '';

            document.getElementById('loginDetailsBtn').hidden = true;
            document.getElementById('loginStatusText').innerText =
                'You are not logged in';

            document.getElementById('logoutBtn').hidden = true;
            document.getElementById('loginStatusText').hidden = false;
            document.getElementById('pluginSpinner').hidden = true;

            clearAllClickEvents();

            if (
                !document
                    .getElementById('loginDetails')
                    .classList.contains('hidden')
            ) {
                document.getElementById('loginDetails').classList.add('hidden');
            }
        } else if (message.data === 'loggedIn') {
            // handle user is currently logged in
            // used for the first load, to determine if the user is currently logged in or not
            document.getElementById('domain').innerText = message.domain;
            document.getElementById('userId').innerText = message.userId;
            document.getElementById('token').value = message.token;
            document.getElementById('domain-check').className =
                (message.isPanoramaActive ? 'success-icon ' : 'failed-icon ') +
                'pano-extension-icon pano-extension-domain-check-icon';
            document.getElementById('domain-check').title =
                message.isPanoramaActive
                    ? "Panorama is enabled: This domain matches the current website's domain."
                    : "Panorama is disabled: This domain does not match the current website's domain.";
            document.getElementById('institution').innerText =
                message.institution;

            document.getElementById('loginStatusText').hidden = true;
            document.getElementById('loginDetailsBtn').hidden = false;
            document.getElementById('logoutBtn').hidden = false;

            document.getElementById('pluginSpinner').hidden = true;

            document.getElementById('WAListTile').hidden = false;
            document.getElementById('launchPortalListTile').hidden = false;
            document.getElementById('SmartSpeakerListTile').hidden = false;

            document.getElementById('loginDetails').classList.remove('hidden');

            document.getElementById('enableWACheckbox').checked =
                message.externalWALaunched;
            document.getElementById('enableSmartSpeakerCheckbox').checked =
                message.externalSmartSpeakerLaunched;

            if (!message.portalServerUrl) {
                document.getElementById(
                    'launchPortalListTile',
                ).style.opacity = 0.5;
                document.getElementById('launchDescriptionText').innerHTML =
                    'To be able to directly launch the portal from here, please navigate to User Setup in the Panorama Portal and connect to the extension.';
                document.getElementById('launchPortalContainer').hidden = true;
            }
            const enableExternalWA = message.enableExternalWA;
            const enabledSmartSpeaker = message.enabledSmartSpeaker;

            if (
                !enableExternalWA ||
                message.isPanoramaActive ||
                !message.panoramaServerUrl
            ) {
                document.getElementById('accessibilityIcon').src =
                    './accessibility-icon-disabled.svg';
                document.getElementById('accessibilityTextDiv').style.opacity =
                    '0.5';

                document.getElementById('enableWACheckbox').disabled = true;
                document.getElementById('waSlider').style.cursor =
                    'not-allowed';
            }

            if (!enableExternalWA) {
                if (!message.panoramaServerUrl) {
                    document.getElementById(
                        'accessibilityDescriptionText',
                    ).innerHTML =
                        'To enable website accessibility, please navigate to User Setup in the Panorama Portal and connect to the extension.';
                } else {
                    document.getElementById('WAListTile').remove();
                }
            }

            if (
                !enabledSmartSpeaker ||
                message.isPanoramaActive ||
                !message.panoramaServerUrl
            ) {
                document.getElementById('SmartSpeakerIcon').src =
                    './smart-speaker-disabled-icon.svg';
                document.getElementById('smartSpeakerTextDiv').style.opacity =
                    '0.5';

                document.getElementById(
                    'enableSmartSpeakerCheckbox',
                ).disabled = true;
                document.getElementById('smartSpeakerSlider').style.cursor =
                    'not-allowed';
            }

            if (!enabledSmartSpeaker) {
                document.getElementById('SmartSpeakerListTile').remove();
            }

            addAllClickEvents(
                enableExternalWA && !message.isPanoramaActive,
                enabledSmartSpeaker && !message.isPanoramaActive,
            );
        }
    }
}

function logOutUser() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    source: 'popover.js',
                    data: 'logout',
                },
                handleMessage,
            );
        },
    );
}

function getLoginStatus() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    source: 'popover.js',
                    data: 'loginStatus',
                },
                handleMessage,
            );
        },
    );
}

function launchPortalForUser() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    source: 'popover.js',
                    data: 'openPortal',
                },
                handleMessage,
            );
        },
    );
}

function launchWebsiteAccessibilityForUser() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    source: 'popover.js',
                    data: 'launchWebsiteAccessibility',
                },
                handleMessage,
            );
        },
    );
}

function destroyWebsiteAccessibilityForUser() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    source: 'popover.js',
                    data: 'destroyWebsiteAccessibility',
                },
                handleMessage,
            );
        },
    );
}

function launchSmartSpeakerForUser() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    source: 'popover.js',
                    data: 'launchSmartSpeaker',
                },
                handleMessage,
            );
        },
    );
}

function destroySmartSpeakerForUser() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    source: 'popover.js',
                    data: 'destroySmartSpeaker',
                },
                handleMessage,
            );
        },
    );
}

function copyAuthToken() {
    var copyText = document.getElementById('token');

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
}

function popover() {
    getLoginStatus();
}

function clearAllClickEvents() {
    const buttonsToClear = [
        'loginDetailsBtn',
        'logoutBtn',
        'launchPortalContainer',
        'enableWACheckbox',
    ];

    buttonsToClear.forEach((buttonName) => {
        var btn = document.getElementById(buttonName);
        if (btn) btn.onclick = null;
    });
}

function addAllClickEvents(enableExternalWA, enabledSmartSpeaker) {
    var logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.onclick = logOutUser;
    logoutBtn.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            logoutBtn.click();
        }
    });

    var launchBtn = document.getElementById('launchPortalContainer');
    launchBtn.onclick = launchPortalForUser;
    launchBtn.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            launchBtn.click();
        }
    });

    if (enableExternalWA) {
        var checkBox = document.getElementById('enableWACheckbox');
        checkBox.onclick = function () {
            var checkBox = document.getElementById('enableWACheckbox');
            if (checkBox.checked) {
                launchWebsiteAccessibilityForUser();
            } else {
                destroyWebsiteAccessibilityForUser();
            }
        };

        checkBox.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                checkBox.click();
            }
        });
    }

    if (enabledSmartSpeaker) {
        var enableSmartSpeakerCheckbox = document.getElementById(
            'enableSmartSpeakerCheckbox',
        );
        enableSmartSpeakerCheckbox.onclick = function () {
            var enableSmartSpeakerCheckbox = document.getElementById(
                'enableSmartSpeakerCheckbox',
            );
            if (enableSmartSpeakerCheckbox.checked) {
                launchSmartSpeakerForUser();
            } else {
                destroySmartSpeakerForUser();
            }
        };
    }

    var copyTokenBtn = document.getElementById('copyTokenContainer');
    copyTokenBtn.onclick = copyAuthToken;
    copyTokenBtn.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            copyTokenBtn.click();
        }
    });

    // Modal and button
    var modal = document.getElementById('loginDetailsModal');

    var detailsBtn = document.getElementById('loginDetailsBtn');

    document.addEventListener('keydown', function (event) {
        let tabInput = event.key === 'Tab';
        if (!tabInput) return;
        if (modal.style.display !== 'block') return;

        const firstElem = modal.querySelector('.list-tile');
        const lastElem = modal.querySelector('#copyTokenContainer');
        let focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (event.shiftKey) {
            if (document.activeElement === firstElem) {
                event.preventDefault();
                lastElem.focus();
            }
        } else {
            if (document.activeElement === lastElem) {
                event.preventDefault();
                firstElem.focus();
            }
        }
    });

    detailsBtn.onclick = function (event) {
        event.stopPropagation();
        modal.style.display = 'block';
    };

    detailsBtn.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            detailsBtn.click();
        }
    });

    window.onclick = function (event) {
        if (!modal.contains(event.target)) {
            if (modal.style.display === 'block') {
                detailsBtn.focus();
            }
            modal.style.display = 'none';
        }
    };
}

document.addEventListener('DOMContentLoaded', popover, false);
