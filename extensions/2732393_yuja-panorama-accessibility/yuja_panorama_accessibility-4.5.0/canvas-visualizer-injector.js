async function injectCanvasVisualizer() {
    const credentials = await getCredentials();
    try {
        visualizerAction(credentials, LMS_TYPES.CANVAS);
    } catch (e) {
        console.error(e);
    }
}
