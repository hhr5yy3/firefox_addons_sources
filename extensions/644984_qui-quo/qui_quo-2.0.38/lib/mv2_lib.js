if (typeof browser !== 'undefined') {
    globalThis.chrome = browser;
}

globalThis.CONTENT_SCRIPTS_FUNCTIONS = {
    'data/operators/util.js': 'getDocumentFromString',
    'data/operators/entry-point.js': 'findPassengerCrmId',
    'data/operators/orderDataEp.js': 'createQRContainer',
    'data/operators/quickLogin.js': 'decryptFromBackground'
}
globalThis.popupPath = chrome.runtime.getManifest().browser_action.default_popup;

async function injectContentScripts(founded, tab, forceInject = false) {
    console.log('injectContentScripts', founded, tab, forceInject);
    let jsArray = founded.js;
    const loadCheck = `document[${JSON.stringify(JSON.stringify({jsArray}))}]`;
    const wasLoad = await wasPreviouslyLoaded(tab, loadCheck, false, jsArray);
    const bugFixes = CONTENT_SCRIPTS_DATA["bug_fixes"] || [];
    if (wasLoad && !forceInject) {
        return;
    }
    for (let js of jsArray) {
        const foundBugFix = bugFixes.find(fix => fix.js === js);
        if (foundBugFix) {
            const code = await fetchTextUsingHttpCache(`https://${globalThis.DOMAIN}/content-scripts/` + (foundBugFix.fix || foundBugFix.js));
            if (code) {
                await executeScriptFromString(tab, code, founded['all_frames']).catch(e => null);
                continue;
            }
        }
        await executeScriptFromFile(tab, js, founded['all_frames']).catch(e => null);
    }
    await executeScriptFromString(tab, `${loadCheck} = true`, founded['all_frames']).catch(e => null);
    workersArray.push(tab);
}

function executeScriptFromFile(tab, file, allFrames) {
    return chrome.tabs.executeScript(tab.id, {
        file: file,
        runAt: 'document_start',
        allFrames: allFrames || false
    });
}

async function executeScriptFromString(tab, code, allFrames) {
    return chrome.tabs.executeScript(tab.id, {
        code: code,
        runAt: 'document_start',
        allFrames: allFrames || false
    });
}


async function wasPreviouslyLoaded(tab, loadCheck, allFrames, jsArray) {
    const loadCheckResult = await executeScriptFromString(tab, loadCheck, allFrames);
    let jsArrayCheckResult = true;
    if (await executeExperimentalFeatures()) {
        if (jsArray && jsArray.length > 0) {
            for (const file of jsArray) {
                if (CONTENT_SCRIPTS_FUNCTIONS[file]) {
                    const checkResult = await executeScriptFromString(tab, `typeof ${CONTENT_SCRIPTS_FUNCTIONS[file]}`, allFrames);
                    if (!checkResult || !checkResult[0] || checkResult[0] !== 'function') {
                        jsArrayCheckResult = false;
                    }
                }
            }
        }
    }
    return !!(loadCheckResult && loadCheckResult[0] && jsArrayCheckResult);
}

async function executeExperimentalFeatures() {
    const {isExperimentalFlagOff} = await getStorageData('isExperimentalFlagOff');
    return !isExperimentalFlagOff
}

function setBadgeText(text) {
    chrome.browserAction.setBadgeText({'text': text});
    chrome.browserAction.setBadgeBackgroundColor({'color': '#696969'});
}

function setAction() {
    chrome.browserAction.setPopup({popup: 'data/material-ui/popup.html'}, console.log)
}
