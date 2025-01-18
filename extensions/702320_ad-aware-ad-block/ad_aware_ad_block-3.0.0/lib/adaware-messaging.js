'use strict';

import µb from '../js/background.js';

{

const getblockDangerousUrlsStatus = async function() {
    // const results = await vAPI.storage.get('blockDangerousUrlsStatus');
    const result = await µb.blockDangerousUrlsStatus;

    return result;
};

const onMessage = function(request, sender, callback) {
    // Async
    switch ( request.what ) {
        case 'getBlockDangerousUrlsStatus':
            getblockDangerousUrlsStatus().then((resp) => {
                callback(resp);
            });
            return;
        default:
            break;
    }

    // Sync
    let response;
    let filterList;
    
    switch ( request.what ) {
        case 'exampleSync':
            let ex = 'test...';
            response = ex;
            break;
        case 'toggleBlockDangerousUrls':
            µb.toggleBlockDangerousUrls();
            µb.saveBlockDangerousSitesToggleState();
            break;
        case 'addACSFilter':
            filterList = request.filterListName;
            µb.selectedFilterLists.push(filterList);
            
            let details = { toSelect: µb.selectedFilterLists };
            response = µb.applyFilterListSelection(details);
            break;
        case 'removeACSFilter':
            filterList = request.filterListName;
            var i = µb.selectedFilterLists.indexOf(filterList);
            if (i != -1) {
                µb.selectedFilterLists.splice(i, 1);
            }
            break;
        default:
            return vAPI.messaging.UNHANDLED;
    }

    callback(response);
};

vAPI.messaging.listen({
    name: 'popupAdaware',
    listener: onMessage,
    privileged: true,
});

}