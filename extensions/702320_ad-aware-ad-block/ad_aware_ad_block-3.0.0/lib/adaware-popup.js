'use strict';

import { dom, qs$ } from '../js/dom.js';

const messaging = vAPI.messaging;

const toggleBlockDangerousUrls = function() {
    messaging.send(
        'popupAdaware', {
            what: 'toggleBlockDangerousUrls'
        }
    );

    // let isBlockDangerousSitesToggleOn = qs$('#no-dangerous-sites').checked;
    let isBlockDangerousSitesToggleOn = (qs$('#noDangerousSitesSwitch>input.transform-btn-active') === null) ? true : false;

    dom.cl.toggle(qs$('#noDangerousSitesSwitch>div'), 'transform-control-active', isBlockDangerousSitesToggleOn);
    dom.cl.toggle(qs$('#noDangerousSitesSwitch>input'), 'transform-btn-active', isBlockDangerousSitesToggleOn);

    if (!isBlockDangerousSitesToggleOn) {
        messaging.send(
            'popupAdaware',{
                what: 'addACSFilter',
                filterListName: 'urlhaus-1'
            }
        );
    } else {
        messaging.send(
            'popupAdaware',{
                what: 'removeACSFilter',
                filterListName: 'urlhaus-1'
            }
        );
    }
};

(() => {
    const onBlockDangerousUrlsReady = function(response) {
        // qs$('#no-dangerous-sites').checked = response;
        let powerControlStatus = response ? 'toggle-btn-control transform-control' : 'toggle-btn-control transform-control transform-control-active';
        let powerButtonStatus = response ? 'toggle-btn-default transform-btn' : 'toggle-btn-default transform-btn transform-btn-active';
        
        qs$('#noDangerousSitesSwitch>div').className = powerControlStatus;
        qs$('#noDangerousSitesSwitch>input').className = powerButtonStatus;
    }

    const setBlockDangerousUrlsCheckbox = async function() {
        let response = await messaging.send('popupAdaware', {
            what: 'getBlockDangerousUrlsStatus',
        });

        onBlockDangerousUrlsReady(response);
    }
    
    setBlockDangerousUrlsCheckbox();

    dom.on('#noDangerousSitesSwitch', 'click', toggleBlockDangerousUrls);
})();

