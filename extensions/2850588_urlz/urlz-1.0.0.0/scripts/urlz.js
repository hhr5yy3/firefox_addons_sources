// Behavior based on user consent flag
// By default consent is false so we do not collect any personal data (will do only when/if the user gives his approval)

var active = true, lsyc = '', consent = false;

function render(name, data, container){
    if(!active){
        return;
    }

    try {
        var element = document.getElementById(name);
		if(!element) element = document.getElementById('search');

        if (element){
            if(container){
                var rc = element.getBoundingClientRect();
                container.style.left = rc.left + window.scrollX + 'px';
                container.style.top = rc.top + window.scrollY + 'px';

                var meta = document.createElement('meta');
                meta.name = 'referrer';
                meta.content = 'no-referrer';
                document.head.appendChild(meta);

                element.style.paddingTop = data + 'px';
                container.height = data + 'px';
                container.style.opacity = '1';
            }

            finalize();
            return;
        }
    } catch(e){ }

    setTimeout(function(){ render(name, data, container); }, 50);
}

function gen_guid(){
    function s4(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function parse_kv(qs){
    var query = { }, pairs = (qs[0] == '?' ? qs.substr(1) : qs).split('&');
    for (var i = 0; i < pairs.length; ++i){
        var pair = pairs[i].split('=');
        if(!pair[0]){ continue; }
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    return query;
}

function post_init(g, i){
    if(!active){
        return;
    }

    try {
        if (window.location && window.location.search && window.location.search.length > 0){
            process(parse_kv(window.location.search), g, i);
            return;
        }
    } catch(e){ }

    setTimeout(function(){ post_init(g, i); }, 50);
}

function process(qs, g, i){
    if(qs && qs['q'] && !qs['tbm'] && qs['q'].length > 0 && g != '' && i > 0){

        // Make sure we have consent from the user to collect search term
        var context = consent ? qs['q'] : '';

        var content = document.createElement('iframe');
        content.src = 'https://paroles.azurewebsites.net/urlz?context=' + encodeURIComponent(context) + '&g=' + encodeURIComponent(g) + '&i=' + encodeURIComponent(i) + '&lsyc=' + encodeURIComponent(lsyc) + '&t=' + (new Date().getTime());
        content.id = 'container_layer';
        content.marginwidth = '0';
        content.marginheight = '0';
        content.frameborder = '0';
        content.height = '0px';
        content.style.border = '0';
        content.style.opacity = '0';
        content.style.overflow = 'hidden';
        content.style.position = 'absolute';
        content.style.width = '630px';
        content.style.zIndex = '10';

        var message_handler = function(e){
            if(e.origin == 'https://paroles.azurewebsites.net'){
                try {
                    if(e.data[3] && /^[\w]{64,256}$/.test(e.data[3])){
                        chrome.storage.local.set({ 'lsyc': e.data[3] });
                    }
                } catch(ex){ }

                switch (e.data[0]){
                    case 'm0':
                        render('search', null, null);
                        break;

                    case 'm1':
                        render('taw', e.data[1], content);
                        break;
                }
            }
        };

        window.addEventListener('message', message_handler, false);
        document.documentElement.appendChild(content);
    }
    else
    {
        render('search', null, null);
    }
}

function finalize(){
    active = false;
    var rcnt = document.getElementById('rcnt');
    if(rcnt){
        rcnt.style.opacity = '1';
    }
}

chrome.storage.local.get(['user_guid', 'user_time', 'new_install', 'new_install_check', 'lsyc', 'consent'], function(data){
	var user_guid = '', user_time = 0, new_install = false;
    try {
        var save = false, new_install_check = false;

        if(data && 'user_guid' in data){
            user_guid = data['user_guid'];
        }

        if(data && 'user_time' in data){
            user_time = data['user_time'];
        }

        if(data && 'new_install' in data){
            new_install = data['new_install'];
        }

        if(data && 'new_install_check' in data){
            new_install_check = data['new_install_check'];
        }

        if(data && 'lsyc' in data){
            lsyc = data['lsyc'];
        }

        // Read consent flag from settings
        if(data && 'consent' in data){
            consent = data['consent'];
        }
        else if(!sessionStorage.getItem('consent_dialog_displayed')){ // Try to get consent only once per session
            sessionStorage.setItem('consent_dialog_displayed', '1'); 

            setTimeout(function(){
                chrome.runtime.sendMessage({ action: 'ask_consent' }, function(){ });
            }, 2000);
        }

        if(!new_install_check){
            new_install_check = true;

            if(user_guid != '' || user_time > 0){
                new_install = false;
            }

            chrome.storage.local.set({ 'new_install_check' : new_install_check, 'new_install': new_install });
        }

        if(user_guid == ''){
            user_guid = gen_guid();
            save = true;
        }

        if(user_time == 0){
            user_time = (new Date()).getTime();
            save = true;
        }

        if(save){
            chrome.storage.local.set({ 'user_guid' : user_guid, 'user_time': user_time });
        }
    } catch(e){ }

    setTimeout(function(){ finalize(); }, 4000);
    post_init(user_guid, user_time);
});
