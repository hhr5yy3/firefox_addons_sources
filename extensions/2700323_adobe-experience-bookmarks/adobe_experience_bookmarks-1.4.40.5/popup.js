// Optimize UI
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        if ( result.userPrefences ) {
            var userPrefences = JSON.parse(result.userPrefences);
            if ( userPrefences['settings'] ) {
                if ( userPrefences['settings']['optimizeUIAA'] === true || userPrefences['settings']['optimizeUILaunch'] === true || userPrefences['settings']['optimizeUIAT'] === true ) {
                    if ( info.status == 'complete' && tab.url ) {
                        // Adobe Analytics
                        if ( userPrefences['settings']['optimizeUIAA'] === true ) {
                            if ( tab.url.indexOf('an.adobe.com/') > -1 || tab.url.indexOf('.omniture.com/') > -1 || tab.url.indexOf('https://experience.adobe.com/') > -1 && tab.url.indexOf('/analytics/') > -1 ) {
                                chrome.tabs.insertCSS(tab.id, { file: 'css/adobeanalytics.css', allFrames: true });
                            }
                        }
                        // Adobe Launch
                        if ( userPrefences['settings']['optimizeUILaunch'] === true ) {
                            if ( tab.url.indexOf('https://experience.adobe.com/') > -1 && tab.url.indexOf('/data-collection/client/companies/') > -1 || tab.url.indexOf('launch.adobe.com/') > -1  || tab.url.indexOf('assets.adobedtm.com/extensions/') > -1 ) {
                                chrome.tabs.insertCSS(tab.id, { file: 'css/adobelaunch.css', allFrames: true });
                            }
                        }
                        // Adobe Target
                        if ( userPrefences['settings']['optimizeUIAT'] === true ) {
                            if ( tab.url.indexOf('/target/activities/') > -1 && ( tab.url.indexOf('https://experience.adobe.com/') > -1  || tab.url.indexOf('.experiencecloud.adobe.com/') > -1 ) ) {
                                chrome.tabs.insertCSS(tab.id, { file: 'css/adobetarget.css', allFrames: true });
                            }
                        }
                    }
                }
            }
        }
    });
});



if (chrome.runtime.setUninstallURL) {
    chrome.runtime.setUninstallURL('https://docs.google.com/forms/d/e/1FAIpQLSfCiDNtq-VOYtzAARyWxtWANOIXBUWdQb50O667ft3WOAu4Gw/viewform');
}

var currentOrganization = {};

$(document).ready(function() {
    //$.ajaxSetup({ cache: false });
    initialize_user_prefences();
});

function run_bookmarks() {
    //show_adobe_summit_links();
    //show_promo();

    display_organization();

    //open links in the same tab
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        $('a').not('#go-to-options,#go-to-options2').click(function(e) {
            var href = this.href;
            if ( userPrefences['settings']['openLinksInNewTab'] === false ) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    var tab = tabs[0];
                    chrome.tabs.update(tab.id, {url: href});
                    e.preventDefault();
                });
            } else {
                chrome.tabs.create({url: href});
            }
            return false;
        });

        //display Marketo and Magento bookmarks
        if ( userPrefences['settings'] ) {
            if ( userPrefences['settings']['displayMarketoBookmarks'] === true ) {
                $('#marketoBookmarks').removeClass('hide').addClass('show');
            }
            if ( userPrefences['settings']['displayMagentoBookmarks'] === true ) {
                $('#magentoBookmarks').removeClass('hide').addClass('show');
            }
        }

        //display notifications
        if ( userPrefences['notifications'] ) {
            if ( userPrefences['notifications']['version1416'] == undefined || userPrefences['notifications']['version1416'] !== false ) {
                $('#version1416').removeClass('hide').addClass('show');
            } else if ( userPrefences['notifications']['launchinspector'] == undefined || userPrefences['notifications']['launchinspector'] !== false ) {
                $('#launchinspector').removeClass('hide').addClass('show');
            }
        }

    });

    //indicate Adobe services status
    chrome.permissions.contains({
        origins: ["https://*.status.adobe.com/"]
    }, function(result) {
        if (result) {
            chrome.storage.sync.get(['userPrefences'], function(result) {
                var userPrefences = JSON.parse(result.userPrefences);
                if ( userPrefences['settings'] && userPrefences['settings']['indicateAdobeStatus'] === true ) {
                    get_adobe_status();
                }
            });
        } else {
            $('#indicateAdobeStatusInfo').removeClass('hide').addClass('show');
        }
    });

    //auto import Adobe organizations
    chrome.permissions.contains({
        permissions: ["activeTab"]
    }, function(result) {
        if (result) {
            chrome.storage.sync.get(['userPrefences'], function(result) {
                var userPrefences = JSON.parse(result.userPrefences);
                if ( userPrefences['settings']['orgAutoImport'] === true ) {
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        if ( tabs && tabs[0] && tabs[0].url ) {
                            if ( tabs[0].url.indexOf('experience.adobe.com/') > -1 || tabs[0].url.indexOf('.experiencecloud.adobe.com/') > -1 || tabs[0].url.indexOf('.marketing.adobe.com/') > -1 ) {
                                chrome.tabs.executeScript(null, {
                                    //v9
                                    code: '(function (){  var tt,t=[],x=document.querySelectorAll("coral-shell-organization");for(i=0;i<x.length;i++)x[i].getAttribute("data-tenant-id")&&"undefined"!=x[i].getAttribute("data-tenant-id")&&x[i].getAttribute("title")&&"undefined"!=x[i].getAttribute("title")&&x[i].getAttribute("data-org-id")&&"undefined"!=x[i].getAttribute("data-org-id")&&t.push({tenantId:x[i].getAttribute("data-tenant-id"),name:x[i].getAttribute("title"),id:x[i].getAttribute("data-org-id")});if(t[0]&&t.length<1&&(x=document.querySelectorAll("div.spectrum-Shell-companyLabel"))[0]&&x[0].textContent&&"undefined"!=x[0].textContent){if(t[0]={},t[0].name=x[0].textContent,(x=document.querySelectorAll("ul.spectrum-SelectList, ul.spectrum-Menu"))[0]&&x[0].getAttribute("value")&&"undefined"!=x[0].getAttribute("value")){for(t[0].id=x[0].getAttribute("value"),x=document.querySelectorAll("figure.switcher-Solution-Item a, div.switcher-Solution-Column a"),i=0;i<x.length;i++)if((-1<(tt=x[i].hostname.indexOf("experience.adobe.com"))||-1<(tt=x[i].hostname.indexOf(".experiencecloud.adobe.com"))||-1<(tt=x[i].hostname.indexOf(".marketing.adobe.com")))&&"exc-home"!=x[i].hostname.substring(0,tt)&&"undefined"!=x[i].hostname.substring(0,tt)){t[0].tenantId=x[i].hostname.substring(0,tt);break}if(!t[0].tenantId)for(x=document.querySelectorAll("li.switcher-Services-Column-Item a"),i=0;i<x.length;i++)if((-1<(tt=x[i].hostname.indexOf("experience.adobe.com"))||-1<(tt=x[i].hostname.indexOf(".experiencecloud.adobe.com"))||-1<(tt=x[i].hostname.indexOf(".marketing.adobe.com")))&&"exc-home"!=x[i].hostname.substring(0,tt)&&"undefined"!=x[i].hostname.substring(0,tt)){t[0].tenantId=x[i].hostname.substring(0,tt);break}}t[0].tenantId||(t=[])}if(!t[0]&&"experience.adobe.com"==window.location.hostname){var orgsObj={};if(localStorage.unifiedShellSession&&"{"==localStorage.unifiedShellSession.slice(2,3)&&"}"==localStorage.unifiedShellSession.slice(-1)){var o=JSON.parse(localStorage.unifiedShellSession.slice(2)),k=Object.keys(o)[0];if(o[k].userOrgs)for(var orgsArr=o[k].userOrgs,i=0;i<orgsArr.length;i++)orgsArr[i].orgRef.ident&&orgsArr[i].orgName&&(orgsObj[orgsArr[i].orgRef.ident+"@AdobeOrg"]={},orgsObj[orgsArr[i].orgRef.ident+"@AdobeOrg"].name=orgsArr[i].orgName)}var orgId,sessionStorageKey=Object.keys(sessionStorage).filter(function(t){return t.match(/^adobeid_ims_profile/)})[0];if(sessionStorageKey){var prodArr=JSON.parse(sessionStorage.getItem(sessionStorageKey)).projectedProductContext;for(i=0;i<prodArr.length;i++)prodArr[i].prodCtx.owningEntity&&(orgsObj[prodArr[i].prodCtx.owningEntity]||(orgsObj[prodArr[i].prodCtx.owningEntity]={}),prodArr[i].prodCtx.tenant_id&&-1===prodArr[i].prodCtx.tenant_id.indexOf("://")&&(orgsObj[prodArr[i].prodCtx.owningEntity].tenantId=prodArr[i].prodCtx.tenant_id),prodArr[i].prodCtx.login_company?orgsObj[prodArr[i].prodCtx.owningEntity].name=prodArr[i].prodCtx.login_company:prodArr[i].prodCtx.account_name&&(orgsObj[prodArr[i].prodCtx.owningEntity].name=prodArr[i].prodCtx.account_name))}for(orgId in orgsObj)orgsObj[orgId].tenantId&&orgsObj[orgId].name?t.push({tenantId:orgsObj[orgId].tenantId,name:orgsObj[orgId].name,id:orgId}):orgsObj[orgId].tenantId&&t.push({tenantId:orgsObj[orgId].tenantId,name:orgsObj[orgId].tenantId,id:orgId})} return t;  })();'
                                }, import_organizations);
                            }
                        }
                    });
                }
            });
        }
    });

    //open settings
    $('#go-to-options,#go-to-options2').click(function() {
        enable_import_organizations(openSettings=true);
    });

    //version1416 notification click
    $('#version1416 a').click(function() {
        chrome.storage.sync.get(['userPrefences'], function(result) {
            var userPrefences = JSON.parse(result.userPrefences);
            userPrefences['notifications']['version1416'] = false;
            if ( JSON.stringify(userPrefences) !== result.userPrefences ) {
                chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                });
            }
        });
    });

    //Launch Inspector notification click
    $('#launchinspector a').mouseover(function() {
        chrome.storage.sync.get(['userPrefences'], function(result) {
            var userPrefences = JSON.parse(result.userPrefences);
            userPrefences['notifications']['launchinspector'] = false;
            if ( JSON.stringify(userPrefences) !== result.userPrefences ) {
                chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                });
            }
        });
    });


    //save organization as default in the selector
    $('#organization-selector').change(function() {
        set_default_organization();
        enable_import_organizations();
    });

    $('a').click(function() {
        enable_import_organizations();
    });

    set_stats();

}

function open_settings() {
    if ( chrome.runtime.openOptionsPage ) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

function initialize_user_prefences() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = result.userPrefences;
        if ( !userPrefences ) {
            userPrefences = {
                'organizations': [],
                'settings': {
                    'openLinksInNewTab': true,
                    'orgAutoImport': true,
                    'indicateAdobeStatus': true
                },
                'stats': {},
                'feedback': {},
                'notifications': {}
            };
        } else {
            userPrefences = JSON.parse(result.userPrefences);
            if ( !userPrefences['organizations'] ) {
                userPrefences['organizations'] = [];
            }
            if ( !userPrefences['settings'] ) {
                userPrefences['settings'] = {
                    'openLinksInNewTab': true
                };
            }
            if ( !userPrefences['stats'] ) {
                userPrefences['stats'] = {};
            }
            if ( !userPrefences['feedback'] ) {
                userPrefences['feedback'] = {};
            }
            if ( !userPrefences['notifications'] ) {
                userPrefences['notifications'] = {};
            }

            //bug fixing added to v1.4.4. delete undefined orgs
            for ( i in userPrefences['organizations'] ) {
                if ( !userPrefences['organizations'][i]['tenantId'] ) {
                    userPrefences['organizations'].splice(i, 1);
                    break;
                }
            }

        }
        if ( JSON.stringify(userPrefences) !== result.userPrefences ) {
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
            });
        }

        run_bookmarks();
    });
}

function hide_bookmarks() {
    $('#activation').removeClass('hide').addClass('show');
    $('#bookmarks').removeClass('show').addClass('hide');
}

function show_bookmarks() {
    $('#activation').removeClass('show').addClass('hide');
    $('#bookmarks').removeClass('hide').addClass('show');
}

function update_links() {
    $('a').each(function(i, e) {
        if ( e.getAttribute('data-url') ) {
            var url = e.getAttribute('data-url');
            e.href = url.replace(/%orgTenantId%/gi, currentOrganization['tenantId']);

            if ( currentOrganization['id'] ) {
                e.href = e.href.replace(/%orgId%/gi, currentOrganization['id']);
            } else {
                e.href = e.href.replace('%orgId%/', '');
            }

            /*if ( e.href.indexOf('%orgDtmCompany%') > -1 ) {
                if ( currentOrganization['dtmCompany'] ) {
                    e.href = e.href.replace(/%orgDtmCompany%/gi, currentOrganization['dtmCompany']);
                } else {
                    e.href = e.getAttribute('data-url-default');
                }
            }

            if ( e.href.indexOf('%orgLaunchCompany%') > -1 ) {
                if ( currentOrganization['launchCompany'] ) {
                    e.href = e.href.replace(/%orgLaunchCompany%/gi, currentOrganization['launchCompany']);
                } else {
                    e.href = e.getAttribute('data-url-default');
                }
            }*/
        }
    });
}

function display_organization() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var output = '';
        var userPrefences = JSON.parse(result.userPrefences);
        if ( !userPrefences['organizations'][0] ) {
            hide_bookmarks();
        }
        else {
            userPrefences['organizations'].sort(function(a, b){
                return a.name.localeCompare(b.name, 'en', {sensitivity: 'base'});
            });
            for ( i in userPrefences['organizations'] ) {
                output += '<option value="'+ userPrefences['organizations'][i]['tenantId'] +'"'+ ( userPrefences['organizations'][i]['default'] == true ? ' selected' : '' ) +'>'+ userPrefences['organizations'][i]['name'] +'</option>';
                if ( 0 == i || userPrefences['organizations'][i]['default'] == true ) {
                    currentOrganization = userPrefences['organizations'][i];
                }
            }
            if ( document.getElementById('organization-selector') ) {
                document.getElementById('organization-selector').innerHTML = output;
            }
            update_links();
        }
    });
}

function set_default_organization() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        for ( var i in userPrefences['organizations'] ) {
            if ( userPrefences['organizations'][i]['tenantId'] == document.getElementById('organization-selector').value ) {
                userPrefences['organizations'][i]['default'] = true;
                currentOrganization = userPrefences['organizations'][i];
            } else {
                userPrefences['organizations'][i]['default'] = false;
            }
        }
        chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
            display_organization();
        });
    });
}

function set_stats() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        if ( !userPrefences['stats']['opens'] ) {
            userPrefences['stats']['opens'] = 0;
        }
        userPrefences['stats']['opens']++;
        chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
        });
    });
}

function get_adobe_status() {
    var eventType = ['NONE','MAJOR','MINOR','NORMAL','MAINTENANCE','DISCOVERY'];
    var eventState = ['NOSTATE','ONGOING','REPAIRED','ANNOUNCED','RESOLVED','EVENT_CANCELED','DOWNGRADED'];
    //var messageType = ['OCCURED','DETECTED','SEV_CHANGED','FIXED','CLOSED','CREATED','STARTED','CANCELLED','REOPENED','SEV_DOWNGRADED','CUSTOM_MESSAGE','DISCOVERED'];
    var solution = {
        'serviceName.1173': 'Adobe Analytics',
        'serviceName.1175': 'Adobe Experience Manager',
        'serviceName.1177': 'Adobe Social',
        'serviceName.1178': 'Adobe Target',
        'serviceName.1184': 'Adobe Audience Manager',
        'serviceName.1219': 'Adobe Primetime',
        'serviceName.1576': 'Adobe Campaign',
        'serviceName.2060': 'Platform Core Services',
        'serviceName.2674': 'Adobe Advertising Cloud',

        "serviceName.2785": "Adobe Services",
        "serviceName.5224": "Journey Orchestration",
        "serviceName.1675": "Adobe I/O",

        "serviceName.2942": "Adobe Admin Console",
        "serviceName.4740": "Admin tool",
        "serviceName.2502": "Marketing Cloud Exchange",
        "serviceName.3188": "Adobe Experience Platform",

        "serviceName.2944": "Adobe Sign In"

    };
    var issue = {};

    $.getJSON( 'https://data.status.adobe.com/adobestatus/currentstatus', function( data ) {
        $.each( data.products, function(key, value) {
            var solutionId = '';
            $.each( value, function(key, value) {
                //primary solutions
                if ( key == 'service' && solution[value.name.token] ) {
                    solutionId = value.id;
                    solutionName = data.localizationValues.en.localizeValues[value.name.token];
                    //console.log( '*****' );
                    //console.log( 'Solution = '+  solutionName );
                }
                //checking ongoing issues
                else if ( solutionId && key == 'ongoing' ) {
                    $.each( value, function(key, value) {
                        //ongoing unresolved issue found
                        if ( eventState[ value['eventState'] ] == 'ONGOING' ) {
                            issue[solutionName] = {'eventType': [], 'impactedServices': [], 'businessServices': []};
                            $.each( value, function(key, value) {
                                if ( key == 'eventType' ) {
                                    issue[solutionName].eventType.push( eventType[value] );
                                    //console.log( 'eventType='+ eventType[value] );
                                }
                                if ( key == 'impactedServices' ) {
                                    $.each( value, function(key, value) {
                                        if ( -1 == $.inArray(data.localizationValues.en.localizeValues[value.name.token], issue[solutionName].impactedServices) ) {
                                            issue[solutionName].impactedServices.push( data.localizationValues.en.localizeValues[value.name.token] );
                                        }
                                        //console.log( '>>> Impacted Services = '+ data.localizationValues.en.localizeValues[value.name.token] );
                                        $.each( value, function(key, value) {
                                            if ( key == 'businessServices' ) {
                                                $.each( value, function(key, value) {
                                                    if ( -1 == $.inArray(data.localizationValues.en.localizeValues[value.name.token], issue[solutionName].businessServices) ) {
                                                        issue[solutionName].businessServices.push( data.localizationValues.en.localizeValues[value.name.token] );
                                                    }
                                                    //console.log( '>>> Impacted Business Services = '+ data.localizationValues.en.localizeValues[value.name.token] );
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        if ( JSON.stringify(issue) != '{}' ) {
            //console.log('ISSUE FOUND')
            //console.log(issue)
            $('span.adobe-status').each(function(i, e) {
                if ( e.getAttribute('data-service') ) {
                    $(e).addClass('adobe-status-hide').removeClass('adobe-status-major adobe-status-minor adobe-status-maintenance adobe-status-discovery');

                    var products = ['Platform Core Services',
                        'Adobe I/O','Data Foundation','Adobe Analytics'
                    ];
                    var coreServices = ['Launch','Auditor','Customer Attributes','Dynamic Tag Management',
                        'Griffon.adobe.com','Places',
                        'I/O Console','Live Stream Triggers','Mobile Services UI','Admin tool',
                        'Platform UI','Customer Journey Analytics'
                    ];

                    if ( !coreServices.includes( e.getAttribute('data-service') ) ) {
                        if ( issue[e.getAttribute('data-service')]) {
                            var eventType = issue[e.getAttribute('data-service')].eventType;
                            eventType = eventType.indexOf('MAJOR') > -1 ? 'MAJOR' : ( eventType.indexOf('MINOR') > -1 ? 'MINOR' : ( eventType.indexOf('DISCOVERY') > -1 ? 'DISCOVERY' : ( eventType ) ) );
                            $(e).children().html('<b>'+ eventType + ( eventType == 'MAJOR' || eventType == 'MINOR' ? ' ISSUE' : '' ) +'</b><br /><b>'+ issue[e.getAttribute('data-service')].impactedServices.join(', ') +'</b><br />'+ issue[e.getAttribute('data-service')].businessServices.join(', '));
                            $(e).removeClass('adobe-status-hide').addClass( 'adobe-status-'+ eventType.toString().toLowerCase() );
                        }
                    }
                    else {
                        $.each(products, function(key, value) {
                            if ( issue[value] ) {
                                if ( issue[value].businessServices.indexOf( e.getAttribute('data-service') ) > -1 ) {
                                    var eventType = issue[value].eventType;
                                    eventType = eventType.indexOf('MAJOR') > -1 ? 'MAJOR' : ( eventType.indexOf('MINOR') > -1 ? 'MINOR' : ( eventType.indexOf('DISCOVERY') > -1 ? 'DISCOVERY' : ( eventType ) ) );
                                    $(e).children().html('<b>'+ eventType + ( eventType == 'MAJOR' || eventType == 'MINOR' ? ' ISSUE' : '' ) +'</b><br /><b>'+ issue[value].impactedServices.join(', ') +'</b><br />'+ issue[value].businessServices.join(', '));
                                    $(e).removeClass('adobe-status-hide').addClass( 'adobe-status-'+ eventType.toString().toLowerCase() );
                                }
                            }
                        });
                    }
                }
            });
        }
    });
}

//enable import Adobe organizations if the option is not explicitly set
function enable_import_organizations(openSettings) {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        if ( userPrefences['settings']['orgAutoImport'] !== false && userPrefences['settings']['orgAutoImport'] !== true ) {
            chrome.permissions.request({
                permissions: ["activeTab"]
            }, function(granted) {
                if ( granted ) {
                    chrome.storage.sync.get(['userPrefences'], function(result) {
                        var userPrefences = JSON.parse(result.userPrefences);
                        userPrefences.settings.orgAutoImport = true;
                        chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                        });
                        if ( openSettings ) {
                            open_settings();
                        }
                    });
                } else {
                    if ( openSettings ) {
                        open_settings();
                    }
                }
            });
        } else {
            if ( openSettings ) {
                open_settings();
            }
        }
    });
}

function import_organizations(capturedData) {
    if ( capturedData && capturedData[0] && capturedData[0].length > 0 ) {
        var capturedOrgs = capturedData[0];
    } else {
        return false;
    }
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var addedOrgs = [];
        if ( result.userPrefences ) {
            var userPrefences = JSON.parse(result.userPrefences);
            if ( userPrefences['organizations'] ) {
                for ( i = 0; i < capturedOrgs.length; i++ ) {
                    var isInBookmarks = false;
                    for ( j = 0; j < userPrefences['organizations'].length; j++ ) {
                        if ( capturedOrgs[i]['tenantId'] == userPrefences['organizations'][j]['tenantId'] ) {
                            isInBookmarks = true;
                            //this is to update the org name
                            if ( capturedOrgs[i]['name'].indexOf(' ') > -1 && capturedOrgs[i]['name'] != capturedOrgs[i]['name'].toLowerCase() && capturedOrgs[i]['name'] != userPrefences['organizations'][j]['name'] ) {
                                userPrefences['organizations'][j] = capturedOrgs[i];
                                addedOrgs.push(capturedOrgs[i]['name']);
                            }
                            break;
                        }
                    }
                    if ( !isInBookmarks ) {
                        userPrefences['organizations'][userPrefences['organizations'].length] = capturedOrgs[i];
                        addedOrgs.push(capturedOrgs[i]['name']);
                    }
                }
            } else {
                userPrefences['organizations'] = capturedOrgs;
                for ( i = 0; i < capturedOrgs.length; i++ ) {
                    addedOrgs.push(capturedOrgs[i]['name']);
                }
            }
        } else {
            userPrefences = {};
            userPrefences['organizations'] = capturedOrgs;
            for ( i = 0; i < capturedOrgs.length; i++ ) {
                addedOrgs.push(capturedOrgs[i]['name']);
            }
        }
        if ( addedOrgs.length > 0 ) {
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                display_organization();
                show_bookmarks();
                $('#importedOrganizations').text( 'New organization'+ ( addedOrgs.length > 1 ? 's have' : ' has' ) +' been added to Bookmarks: '+ addedOrgs.join(', ') );
                $('#importedOrganizations').removeClass('hide').addClass('show');
            });
        }
    });
}

/*function show_promo() {
    var dateNow = new Date();
    var promoDates = {
        'addon': {'start': new Date('01/10/2020 00:01 GMT-0700'), 'end': new Date('01/19/2020 23:59 GMT-0700')}
    };
    if ( dateNow > promoDates['addon']['start'] && dateNow < promoDates['addon']['end'] ) {
        $('#promoAddon').removeClass('hide').addClass('show');
    }
}*/

/*function show_adobe_summit_links() {
    var dateNow = new Date();
    var summitDates = {
        'summit': {'start': new Date('03/26/2019 00:01 GMT-0700'), 'end': new Date('03/28/2019 23:59 GMT-0700')},
        'keynotes': [
            {'start': new Date('03/26/2019 08:55 GMT-0700'), 'end': new Date('03/26/2019 11:45 GMT-0700')},
            {'start': new Date('03/27/2019 09:55 GMT-0700'), 'end': new Date('03/27/2019 12:00 GMT-0700')},
            {'start': new Date('03/28/2019 09:25 GMT-0700'), 'end': new Date('03/28/2019 11:00 GMT-0700')}
        ]
    };
    if ( dateNow > summitDates['summit']['start'] && dateNow < summitDates['summit']['end'] ) {
        $('#adobeSummit').removeClass('hide').addClass('show');
        $.each(summitDates['keynotes'], function(i, value) {
            if ( dateNow > value['start'] && dateNow < value['end'] ) {
                $('#adobeSummitOnline').addClass('summit-watch-online');
                return;
            }
        });
    }
}*/