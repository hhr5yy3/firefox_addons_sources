async function writeToSessionStorageIfExtensionIsLoggedIn() {
    if (window.globalInitialized) {
        try {
            const result = await getObjectFromGoogleStorage(['panorama-token']);
            const token = result['panorama-token'];

            window.sessionStorage.setItem(
                'panoramaBrowserExtensionLoggedIn',
                token !== null && token !== undefined,
            );
        } catch (e) {
            console.error(
                'Panorama Browser Extension: writeToSessionStorageIfExtensionIsLoggedIn: ',
                e,
            );
        }
    }
}

window.panoramaPluginFound = true;
writeToSessionStorageIfExtensionIsLoggedIn();
