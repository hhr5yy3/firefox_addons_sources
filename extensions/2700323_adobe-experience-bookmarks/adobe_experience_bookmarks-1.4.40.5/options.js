
var data;


function display_organization() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var output = '';
        if ( result.userPrefences ) {
            var userPrefences = JSON.parse(result.userPrefences);
            data = userPrefences;
            //console.log( data);
            if ( userPrefences['organizations'] ) {
                var organizations = userPrefences['organizations'];
                userPrefences['organizations'].sort(function(a, b){
                    return a.name.localeCompare(b.name, 'en', {sensitivity: 'base'});
                });
                for ( i in organizations ) {
                    var orgN = organizations[i];
                    for ( key in orgN ) {
                        //console.log( key +'='+ orgN[key] );
                    }
                    //console.log( orgN['name'] +' (https://'+ orgN['tenantId'] +'.experiencecloud.adobe.com) '+ orgN['id']);
                    /*output += '<li><b>'+ orgN['name'] +'</b> (https://'+ orgN['tenantId'] +'.experiencecloud.adobe.com) '+ orgN['id'] +
                              ' [<a href="#" class="delete" data-orgTenantId="'+ orgN['tenantId'] +'">delete</a>]' +*/
                    output += '<li><b>'+ orgN['name'] +'</b> ('+ orgN['tenantId'] +') '+ orgN['id'] +
                              ' [<a href="#" class="delete" data-orgTenantId="'+ orgN['tenantId'] +'">delete</a>]' +
                              /*( orgN['dtmCompany'] || orgN['launchCompany'] ? '<br />' : '' ) +
                              ( orgN['dtmCompany'] ? ' DTM Company: '+ orgN['dtmCompany'] : '' ) +
                              ( orgN['launchCompany'] ? ' Launch Company: '+ orgN['launchCompany'] : '' ) + */'</li>';
                }
            }

            if ( userPrefences['settings'] ) {
                // this setting appeared in v1.2.3; the links were always opened in new tab in the previous versions
                if ( userPrefences['settings']['openLinksInNewTab'] === false ) {
                    $('#settingOpenLinksInNewTab').prop('checked', false);
                }
                // this setting appeared in v1.4.16
                if ( userPrefences['settings']['displayMarketoBookmarks'] === true ) {
                    $('#settingDisplayMarketoBookmarks').prop('checked', true);
                }
                // this setting appeared in v1.4.16
                if ( userPrefences['settings']['displayMagentoBookmarks'] === true ) {
                    $('#settingDisplayMagentoBookmarks').prop('checked', true);
                }
            }

        }

        if ( output.length > 0 ) {
            show_feedback();
            $('#orgblock').css('display', 'block');
            $('#welcome').css('display', 'none');
            $('#addneworg').css('display', 'none');
        } else {
            $('#orgblock').css('display', 'none');
            $('#welcome').css('display', 'block');
            $('#addneworg').css('display', 'block');
        }

        output += '<li><a href="#" class="addneworglink">add an organization</a></li>'
        output = '<ul>'+ output +'</ul>';
        //console.log(output);
        document.getElementById('orglist').innerHTML = output;

    });

    $('#aadc-img').attr('src', chrome.runtime.getURL('img/aadc440x280.png') );
    $('#ali-img').attr('src', chrome.runtime.getURL('img/ali440x280.png') );

}

function add_organization() {
    var orgTenantId = document.getElementById('orgTenantId').value;
    var orgName = document.getElementById('orgName').value;
    var orgId = document.getElementById('orgId').value;
    //var orgDtmCompany = document.getElementById('orgDtmCompany').value;
    //var orgLaunchCompany = document.getElementById('orgLaunchCompany').value;

    if ( !orgTenantId.length ) {
        console.log('Enter Tenant ID');
        $('#status').html('Enter Tenant ID');
        $('#status').css('display', 'block');
        return false;
    } else if ( !orgName.length ) {
        console.log('Enter Organization name');
        $('#status').html('Enter Organization name');
        $('#status').css('display', 'block');
        return false;
    }

    //var userPrefences = { 'organizations':[{'tenantId': orgTenantId, 'name': orgName, 'id': orgId}]};

    //console.log(data);
    if ( data && data['organizations'] && data['organizations'].length ) {
        organizations = data['organizations'];
        for ( i in organizations ) {
            var orgN = organizations[i];
            //console.log( orgN['name'] +' (https://'+ orgN['tenantId'] +'.experiencecloud.adobe.com) '+ orgN['id']);
            if ( orgN['tenantId'] == orgTenantId ) {
                console.log('tenantId already exists');
                $('#status').html('The organization with "'+ orgTenantId +'" Tenant ID is already in the list. Enter another Tenant ID or delete the organization first.');
                $('#status').css('display', 'block');
                return false;
            } else if ( orgN['name'] == orgName ) {
                console.log('orgName already exists');
                $('#status').html('The organization with "'+ orgName +'" name is already in the list. Enter another name or delete the organization first.');
                $('#status').css('display', 'block');
                return false;
            } else if ( orgN['id'].length && orgId.length && orgN['id'] == orgId ) {
                console.log('orgId already exists');
                $('#status').html('The organization with "'+ orgId +'" ID is already in the list. Enter another ID or delete the organization first.');
                $('#status').css('display', 'block');
                return false;
            } /*else if ( orgN['dtmCompany'] && orgN['dtmCompany'].length && orgDtmCompany.length && orgN['dtmCompany'] == orgDtmCompany ) {
                console.log('orgDtmCompany already exists');
                $('#status').html('An organization with "'+ orgDtmCompany +'" DTM Company is already added. Enter another value or delete the organization first.');
                $('#status').css('display', 'block');
                return false;
            } else if ( orgN['launchCompany'] && orgN['launchCompany'].length && orgLaunchCompany.length && orgN['launchCompany'] == orgLaunchCompany ) {
                console.log('orgLaunchCompany already exists');
                $('#status').html('An organization with "'+ orgLaunchCompany +'" Launch Company is already added. Enter another value or delete the organization first.');
                $('#status').css('display', 'block');
                return false;
            }*/

        }
        //data['organizations'][(i*1)+1] = {'tenantId': orgTenantId, 'name': orgName, 'id': orgId, 'dtmCompany': orgDtmCompany, 'launchCompany': orgLaunchCompany};
        data['organizations'][(i*1)+1] = {'tenantId': orgTenantId, 'name': orgName, 'id': orgId};
        //console.log(data)
        userPrefences = data;
    } else {
        if ( !data ) {
            data = {};
        }
        //data['organizations'] = [{'tenantId': orgTenantId, 'name': orgName, 'id': orgId, 'dtmCompany': orgDtmCompany, 'launchCompany': orgLaunchCompany}];
        data['organizations'] = [{'tenantId': orgTenantId, 'name': orgName, 'id': orgId}];
    }
    $('#status').css('display', 'none');

    chrome.storage.sync.set({'userPrefences': JSON.stringify(data)}, function() {
        display_organization();
    });
}

function delete_organization(orgTenantId) {
    organizations = data['organizations'];
    for ( i in organizations ) {
        var orgN = organizations[i];
        //console.log( orgN['name'] +' (https://'+ orgN['tenantId'] +'.experiencecloud.adobe.com) '+ orgN['id']);
        if ( orgN['tenantId'] == orgTenantId ) {
            data['organizations'].splice(i, 1);
            //console.log(data)
            userPrefences = data;
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                display_organization();
            });
        }
    }
}


document.addEventListener('DOMContentLoaded', display_organization);
document.getElementById('add').addEventListener('click', add_organization);
document.addEventListener('click', function(e) {
    if ( e.target.className == 'delete' ) {
        delete_organization(e.target.getAttribute('data-orgTenantId'));
    } else if ( e.target.className == 'addneworglink' ) {
        $('#addneworg').css('display', 'block');
    }
}, false);




//settingOpenLinksInNewTab
$('#settingOpenLinksInNewTab').click(function() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences;
        //console.log(userPrefences);
        if ( result.userPrefences ) {
            userPrefences = JSON.parse(result.userPrefences);
        } else {
            userPrefences = {};
        }
        if ( !userPrefences['settings'] ) {
            userPrefences['settings'] = {};
        }
        var settingOpenLinksInNewTab = $('#settingOpenLinksInNewTab').is(':checked');
        userPrefences.settings.openLinksInNewTab = settingOpenLinksInNewTab;
        //console.log(userPrefences);
        chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
            display_organization();
        });
    });
});


//feedback
$('#feedbackyes').click(function() {
    $('#feedbackquestion').css('display', 'none');
    $('#feedbackansweryes').css('display', 'block');
    record_feedback('yes');
});

$('#feedbackno').click(function() {
    $('#feedbackquestion').css('display', 'none');
    $('#feedbackanswerno').css('display', 'block');
    record_feedback('no');
});

function show_feedback() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences;
        if ( result.userPrefences ) {
            userPrefences = JSON.parse(result.userPrefences);
            //console.log(userPrefences);
            if ( userPrefences['stats'] && userPrefences['stats']['opens'] && userPrefences['stats']['opens'] > 15
                 && ( !userPrefences['feedback'] || !userPrefences['feedback']['answer'] )
               )
            {
                $('#feedbackblock').css('display', 'block');
            }
        }
    });
}

function record_feedback(answer) {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences;
        if ( result.userPrefences ) {
            userPrefences = JSON.parse(result.userPrefences);
            //console.log(userPrefences);
            if ( !userPrefences['feedback'] ) {
                userPrefences['feedback'] = {};
            }
            userPrefences['feedback']['answer'] = answer;
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
            });
        }
    });
}


/*
Adobe services status indication. This setting appeared in v1.3.0;
*/
$(document).ready(function() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        chrome.permissions.contains({
            origins: ['https://*.status.adobe.com/']
        }, function(allowed) {
            if ( allowed && userPrefences['settings']['indicateAdobeStatus'] === true ) {
                $('#settingIndicateAdobeStatus').prop('checked', true);
            } else {
                $('#settingIndicateAdobeStatus').prop('checked', false);
            }
            if ( !allowed ) {
                $('#settingIndicateAdobeStatusPermission').css('display', 'block');
            }
        });
    });
});

$('#settingIndicateAdobeStatus').click(function() {
    if ( $('#settingIndicateAdobeStatus').is(':checked') ) {
        chrome.permissions.request({
            origins: ["https://*.status.adobe.com/"]
        }, function(granted) {
            if ( granted ) {
                chrome.storage.sync.get(['userPrefences'], function(result) {
                    var userPrefences = JSON.parse(result.userPrefences);
                    userPrefences['settings']['indicateAdobeStatus'] = true;
                    chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                        display_organization();
                    });
                });
                $('#settingIndicateAdobeStatus').prop('checked', true);
                $('#settingIndicateAdobeStatusPermission').css('display', 'none');
            } else {
                $('#settingIndicateAdobeStatus').prop('checked', false);
            }
        });
    } else {
        chrome.storage.sync.get(['userPrefences'], function(result) {
            var userPrefences = JSON.parse(result.userPrefences);
            userPrefences['settings']['indicateAdobeStatus'] = false;
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                display_organization();
            });
        });
        $('#settingIndicateAdobeStatus').prop('checked', false);
    }
});
/*
End
*/



/*
Adobe organizations auto import
*/
$(document).ready(function() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        if ( userPrefences['settings'] && userPrefences['settings']['orgAutoImport'] === true ) {
            chrome.permissions.contains({
                permissions: ["activeTab"]
            }, function(allowed) {
                if (allowed) {
                    $('#settingOrgAutoImport').prop('checked', true);
                    $('#infoEnableOrgAutoImport').removeClass('show').addClass('hide');
                    $('#infoUseOrgAutoImport').removeClass('hide').addClass('show');

                } else {
                    $('#settingOrgAutoImport').prop('checked', false);
                    $('#infoEnableOrgAutoImport').removeClass('hide').addClass('show');
                    $('#infoUseOrgAutoImport').removeClass('show').addClass('hide');
                }
            });
        } else {
            $('#settingOrgAutoImport').prop('checked', false);
            $('#infoEnableOrgAutoImport').removeClass('hide').addClass('show');
            $('#infoUseOrgAutoImport').removeClass('show').addClass('hide');
        }
    });
});

$('#settingOrgAutoImport').click(function() {
    if ( $('#settingOrgAutoImport').is(':checked') ) {
        chrome.permissions.request({
            permissions: ["activeTab"]
        }, function(granted) {
            if ( granted ) {
                chrome.storage.sync.get(['userPrefences'], function(result) {
                    var userPrefences = JSON.parse(result.userPrefences);
                    userPrefences.settings.orgAutoImport = true;
                    chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                    });
                });
                $('#settingOrgAutoImport').prop('checked', true);
            } else {
                $('#settingOrgAutoImport').prop('checked', false);
            }
        });
    } else {
        chrome.storage.sync.get(['userPrefences'], function(result) {
            var userPrefences = JSON.parse(result.userPrefences);
            userPrefences.settings.orgAutoImport = false;
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
            });
        });
        $('#settingOrgAutoImport').prop('checked', false);
    }
});
/*
End
*/



/*
Optimize Adobe Analytics UI. This setting appeared in v1.4.15;
*/
$(document).ready(function() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        chrome.permissions.contains({
            origins: ['https://*.omniture.com/', 'https://experience.adobe.com/', 'https://*.an.adobe.com/']
        }, function(allowed) {
            if ( allowed && userPrefences['settings']['optimizeUIAA'] === true ) {
                $('#settingOptimizeUIAA').prop('checked', true);
            } else {
                $('#settingOptimizeUIAA').prop('checked', false);
            }
            if ( !allowed ) {
                $('#settingOptimizeUIAAPermission').css('display', 'block');
            }
        });
    });
});

$('#settingOptimizeUIAA').click(function() {
    if ( $('#settingOptimizeUIAA').is(':checked') ) {
        chrome.permissions.request({
            origins: ['https://*.omniture.com/', 'https://experience.adobe.com/', 'https://*.an.adobe.com/']
        }, function(granted) {
            if ( granted ) {
                chrome.storage.sync.get(['userPrefences'], function(result) {
                    var userPrefences = JSON.parse(result.userPrefences);
                    userPrefences['settings']['optimizeUIAA'] = true;
                    chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                        display_organization();
                    });
                });
                $('#settingOptimizeUIAA').prop('checked', true);
                $('#settingOptimizeUIAAPermission').css('display', 'none');
            } else {
                $('#settingOptimizeUIAA').prop('checked', false);
            }
        });
    } else {
        chrome.storage.sync.get(['userPrefences'], function(result) {
            var userPrefences = JSON.parse(result.userPrefences);
            userPrefences['settings']['optimizeUIAA'] = false;
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                display_organization();
            });
        });
        $('#settingOptimizeUIAA').prop('checked', false);
    }
});
/*
End
*/



/*
Optimize Adobe Launch UI. This setting appeared in v1.4.15;
*/
$(document).ready(function() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        chrome.permissions.contains({
            origins: ['https://experience.adobe.com/', 'https://launch.adobe.com/', 'https://assets.adobedtm.com/']
        }, function(allowed) {
            if ( allowed && userPrefences['settings']['optimizeUILaunch'] === true ) {
                $('#settingOptimizeUILaunch').prop('checked', true);
            } else {
                $('#settingOptimizeUILaunch').prop('checked', false);
            }
            if ( !allowed ) {
                $('#settingOptimizeUILaunchPermission').css('display', 'block');
            }
        });
    });
});

$('#settingOptimizeUILaunch').click(function() {
    if ( $('#settingOptimizeUILaunch').is(':checked') ) {
        chrome.permissions.request({
            origins: ['https://experience.adobe.com/', 'https://launch.adobe.com/', 'https://assets.adobedtm.com/']
        }, function(granted) {
            if ( granted ) {
                chrome.storage.sync.get(['userPrefences'], function(result) {
                    var userPrefences = JSON.parse(result.userPrefences);
                    userPrefences['settings']['optimizeUILaunch'] = true;
                    chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                        display_organization();
                    });
                });
                $('#settingOptimizeUILaunch').prop('checked', true);
                $('#settingOptimizeUILaunchPermission').css('display', 'none');
            } else {
                $('#settingOptimizeUILaunch').prop('checked', false);
            }
        });
    } else {
        chrome.storage.sync.get(['userPrefences'], function(result) {
            var userPrefences = JSON.parse(result.userPrefences);
            userPrefences['settings']['optimizeUILaunch'] = false;
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                display_organization();
            });
        });
        $('#settingOptimizeUILaunch').prop('checked', false);
    }
});
/*
End
*/



/*
Optimize Adobe Target UI. This setting appeared in v1.4.15;
*/
$(document).ready(function() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences = JSON.parse(result.userPrefences);
        chrome.permissions.contains({
            origins: ['https://experience.adobe.com/', 'https://*.experiencecloud.adobe.com/']
        }, function(allowed) {
            if ( allowed && userPrefences['settings']['optimizeUIAT'] === true ) {
                $('#settingOptimizeUIAT').prop('checked', true);
            } else {
                $('#settingOptimizeUIAT').prop('checked', false);
            }
            if ( !allowed ) {
                $('#settingOptimizeUIATPermission').css('display', 'block');
            }
        });
    });
});

$('#settingOptimizeUIAT').click(function() {
    if ( $('#settingOptimizeUIAT').is(':checked') ) {
        chrome.permissions.request({
            origins: ['https://experience.adobe.com/', 'https://*.experiencecloud.adobe.com/']
        }, function(granted) {
            if ( granted ) {
                chrome.storage.sync.get(['userPrefences'], function(result) {
                    var userPrefences = JSON.parse(result.userPrefences);
                    userPrefences['settings']['optimizeUIAT'] = true;
                    chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                        display_organization();
                    });
                });
                $('#settingOptimizeUIAT').prop('checked', true);
                $('#settingOptimizeUIATPermission').css('display', 'none');
            } else {
                $('#settingOptimizeUIAT').prop('checked', false);
            }
        });
    } else {
        chrome.storage.sync.get(['userPrefences'], function(result) {
            var userPrefences = JSON.parse(result.userPrefences);
            userPrefences['settings']['optimizeUIAT'] = false;
            chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
                display_organization();
            });
        });
        $('#settingOptimizeUIAT').prop('checked', false);
    }
});
/*
End
*/



//settingDisplayMarketoBookmarks
$('#settingDisplayMarketoBookmarks').click(function() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences;
        //console.log(userPrefences);
        if ( result.userPrefences ) {
            userPrefences = JSON.parse(result.userPrefences);
        } else {
            userPrefences = {};
        }
        if ( !userPrefences['settings'] ) {
            userPrefences['settings'] = {};
        }
        userPrefences.settings.displayMarketoBookmarks = $('#settingDisplayMarketoBookmarks').is(':checked');
        //console.log(userPrefences);
        chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
            display_organization();
        });
    });
});



//settingDisplayMagentoBookmarks
$('#settingDisplayMagentoBookmarks').click(function() {
    chrome.storage.sync.get(['userPrefences'], function(result) {
        var userPrefences;
        //console.log(userPrefences);
        if ( result.userPrefences ) {
            userPrefences = JSON.parse(result.userPrefences);
        } else {
            userPrefences = {};
        }
        if ( !userPrefences['settings'] ) {
            userPrefences['settings'] = {};
        }
        userPrefences.settings.displayMagentoBookmarks = $('#settingDisplayMagentoBookmarks').is(':checked');
        //console.log(userPrefences);
        chrome.storage.sync.set({'userPrefences': JSON.stringify(userPrefences)}, function() {
            display_organization();
        });
    });
});
