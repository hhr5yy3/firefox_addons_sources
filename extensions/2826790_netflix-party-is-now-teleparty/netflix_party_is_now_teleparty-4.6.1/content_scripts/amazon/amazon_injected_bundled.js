/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

if (!window.videoIdScriptLoaded) {
    console.log("Browse script loaded");
    window.videoIdScriptLoaded = true;
    window.addEventListener('AmazonVideoMessage', function (evt) {
        var type = evt.detail.type;
        if (type === 'getVideoId') {
            const videoId = findTitle();
            if (videoId) {
                const newEvent = new CustomEvent('FromNode', { detail: { type: 'VideoId', videoId: videoId, updatedAt: new Date().getTime() } });
                window.dispatchEvent(newEvent);
            }
        }
    });
    var findTitle = function () {
        try {
            const elementRoot = document.querySelector('.atvwebplayersdk-title-text');
            if (elementRoot == null) {
                return null;
            }
            const keys = Object.keys(elementRoot);
            let key = null;
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].startsWith('__reactInternalInstance')) {
                    key = keys[i];
                    break;
                }
            }
            // const sectionPath = elementRoot[key].stateNode.current.memoizedState.element.props.state.action.atf
            // const titlePath = Object.values(sectionPath)[0].watchPartyAction.endpoint.query.titleId
            //const section_path = elementRoot[key].return.return.stateNode.context.stores.downloadedMetadata.titleInfoStore.player.currentTitleId
            //All videos contain the returnedTitleRendition.asin; This leads to an ID that gets the correct season and episode number (not the same as the one in the URL)
            //I believe that the returnedTitleRendition ID is good enough, however, because we want amzn1. ID we can use a path that is found in majority of the videos
            //I've looked through about 20+ videos and I've only found 1 that didn't have a catalog.id (it had the returnedTitleRendition.asin)
            //So I've decided to use the returnedTitleRendition.asin as a fallback since it works perfectly for the purposes of a videoID. 
            //My recommendation is that we use the returnedTitleRendition.asin as it is unique to each episoe and will take us to the right destination 10/10 times
            //const titlePath = elementRoot[key].return.return.stateNode.context.stores.adPlayback.player.ui.xrayController.controller.metricsFeature.mediaEventController.acquisitionMediaEventController.titleId 
            const titlePath = elementRoot[key].return.return.stateNode.context.stores.pin.currentTitleId;
            if (key == null || typeof elementRoot[key] === 'undefined' || typeof titlePath === 'undefined') {
                return null;
            }
            return titlePath;
        }
        catch (err) {
            return undefined;
        }
    };
}
const getReactInternals = (root) => {
    if (root == null) {
        return null;
    }
    var keys = Object.keys(root);
    var key = null;
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].startsWith('__reactInternalInstance')) {
            key = keys[i];
            break;
        }
    }
    return key ? root[key] : null;
};
const getProps = () => getReactInternals(document.querySelector(".atvwebplayersdk-bottompanel-container")).return.memoizedState;
function updateState(event) {
    if (event.source == window && event.data.type === 'UpdateState') {
        const props = getProps();
        if (props) {
            const evt = new CustomEvent('FromNode', { detail: { type: 'UpdateState', duration: props.endPositionMs, currentTime: props.positionMs, state: props.state, adPlaying: props.adPlaybackInfo !== null, updatedAt: Date.now() } });
            window.dispatchEvent(evt);
        }
    }
}
window.addEventListener('message', updateState, false);

/******/ })()
;