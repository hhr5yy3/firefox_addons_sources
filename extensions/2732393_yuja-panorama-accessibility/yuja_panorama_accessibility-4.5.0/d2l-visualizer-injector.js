async function injectD2lVisualizer() {
    if (
        document.getElementById('d2l_body') ||
        document.getElementsByClassName('d2l-body').length > 0
    ) {
        const credentials = await getCredentials();

        try {
            visualizerAction(credentials, LMS_TYPES.D2L);
        } catch (e) {
            console.error(e);
        }
    }
}
