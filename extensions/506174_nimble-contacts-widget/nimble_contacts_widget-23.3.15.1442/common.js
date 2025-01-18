const pageParsers = {
    facebook: {
        parsePage: function(){
            const parsedData = {
                type: 'facebook',
                profile_url: window.location.protocol + '//' + window.location.hostname + window.location.pathname
            };

            const avatarEl = document.querySelectorAll('a[aria-label][href^="https://www.facebook.com/photo/"]')[1];

            if (avatarEl) {
                const name = avatarEl.getAttribute('aria-label');
                const avatar = avatarEl.querySelector('svg image').getAttribute('xlink:href');
                if (name) parsedData.name = name;
                if (avatar) parsedData.avatar_url = avatar;
            } else {
                return null;
            }

            const nameEl = document.querySelector('[role="main"] > div > div span > h1');

            if (nameEl) {
                parsedData.name = nameEl.innerText;
            }

            const bioEl = document.querySelector('[role="main"] > div > div span > span');

            if (bioEl) {
                parsedData.description = bioEl.innerText;
            }

            return parsedData;
        }
    },
    angellist: {
        parsePage: function(){
            var parsedData = {
                    type: 'angellist'
                };

            var $name = document.querySelector('header + div section h1 > a');
            var $description = document.querySelector('header + div section h2');
            if ($name) parsedData.name = $name.innerText;
            if ($description) parsedData.description = $description.innerText;

            return parsedData;
        }
    },
    crunchbase: {
        parsePage: function(){
            var parsedData = {
                type: 'crunchbase'
            };


            if (this.getParsedProfile('profile_url').indexOf('organization') !== -1){
                parsedData.record_type = 'company';
            } else {
                parsedData.record_type = 'person';
            }

            // name
            var $name = document.querySelector('mat-toolbar h1');
            if (!$name) $name = document.querySelectorAll('.mat-card .component--image-with-text-card .text-content div.ng-star-inserted')[0];
            if ($name) {
                parsedData.name = $name.innerText.trim();
            }

            // title
            var $title = document.querySelectorAll('.mat-card .component--image-with-text-card .text-content div.ng-star-inserted')[1];
            if ($title && parsedData.record_type !== 'company') {
                parsedData.title = $title.innerText.trim();
            }

            // company
            var $company = document.querySelectorAll('.mat-card .component--image-with-text-card .text-content div.ng-star-inserted')[2];
            if ($company && parsedData.record_type !== 'company') {
                parsedData.company = $company.innerText.trim();
            }

            // location
            var $location = document.querySelector('.mat-card identifier-multi-formatter');
            if ($location) {
                parsedData.location = $location.innerText.trim();
            }

            var $avatar = document.querySelector('.mat-card image-with-text-card .text-card-image img');
            if ($avatar && $avatar.src) {
                parsedData.avatar_url = $avatar.src;
            }

            var $description = document.querySelector('.mat-card description-card');
            if ($description) {
                parsedData.description = $description.innerText;
            }


            var cardTexts = $('.mat-card .component--image-with-text-card .text-content div.ng-star-inserted');

            if (cardTexts.length === 0) return parsedData;

            if (!parsedData.name) parsedData.name = cardTexts.get(0).innerText.trim();

            if (!parsedData.avatar_url) parsedData.avatar_url = $('.mat-card .component--image-with-text-card .text-card-image img ').attr('src');

            if (cardTexts.length > 1 && parsedData.record_type !== 'company'){
                if (!parsedData.title) parsedData.title = cardTexts.get(1).innerText.trim();
                if (cardTexts.length > 2) {

                    if (!parsedData.company) parsedData.company = cardTexts.get(2).innerText.trim();

                    parsedData.positions = [{
                        title: parsedData.title,
                        company: parsedData.company
                    }];
                }
            }

            parsedData.social_profiles = {};

            var facebookNode = $('.mat-card a[title*=Facebook]');
            if (facebookNode.length){
                parsedData.social_profiles.facebook = facebookNode.attr('href');
            }

            var twitterNode = $('.mat-card a[title*=Twitter]');
            if (twitterNode.length){
                parsedData.social_profiles.twitter = twitterNode.attr('href').replace(new RegExp('(?:http://|https://)?(?:www\\.)?twitter\\.com/', 'i'), '');
            }

            var linkedinNode = $('.mat-card a[title*=Linkedin]');
            if (linkedinNode.length){
                var li_pattern = new RegExp('^(?:http://|https://)?(?:.+)?linkedin\\.com/(in|pub|company)/[^\\?]+$', 'i');
                var li_url = linkedinNode.attr('href');

                if (li_pattern.test(li_url)){
                    parsedData.social_profiles.linkedin = li_url;
                }
            }

            if ($('.component--description-card').length > 0){
                if ($('.component--description-card').find('.cb-link').length > 0){
                    $('.component--description-card').find('.cb-link').click();
                }

                parsedData.description = $('.component--description-card div.cb-display-inline').text().trim();
            }


            var infoCardListNode = $('span.wrappable-label-with-info.ng-star-inserted');

            infoCardListNode.each(function(){
                var $el = $(this);
                var label = $el.text().toLowerCase().trim();
                var $link = $el.parent().parent().next('.ng-star-inserted');

                switch (label) {
                    case 'website':
                        if ($link.find('a')) parsedData.website = $link.find('a').attr('href');
                        break;
                    case 'email':
                        if ($link) parsedData.email = $link.text().trim();
                        if (parsedData.email) parsedData.emails = [parsedData.email];
                        break;
                    case 'phone':
                        if ($link) parsedData.phone = $link.text().trim();
                        if (parsedData.phone) parsedData.phones = [parsedData.phone];
                        break;
                }

                /*if ($(this).text().toLowerCase().trim() === 'website'){
                    parsedData.website = $(this).parent().parent().next('.ng-star-inserted').find('a').attr('href');
                } else if ($(this).text().toLowerCase().trim().indexOf('email') !== -1){
                    parsedData.emails = [$(this).parent().parent().next('.ng-star-inserted').text().trim()];
                } else if ($(this).text().toLowerCase().trim().indexOf('phone') !== -1){
                    parsedData.phones = [$(this).parent().parent().next('.ng-star-inserted').text().trim()];
                }*/
            });

            if ($('.component--image-with-text-card a[href*=location]').length > 0){
                if (!parsedData.location) parsedData.location = $('.component--image-with-text-card a[href*=location]').text().trim();
            }

            return parsedData;
        }
    },
    foursquare: {
        parsePage: function(){
            var parsedData = {
                type: 'foursquare'
            };

            var userDetailsNode = $('.userInfo');

            var nameNode = userDetailsNode.find('.name');

            parsedData.name = nameNode.text().trim();

            parsedData.description = userDetailsNode.find('.userBio').text().trim();

            parsedData.location = $("#userDetails .homeTown, #userDetails .location, .userBio .userLocation, .userStats .userLocation").first().text().trim();

            parsedData.avatar_url = $(".userPic").find('img').attr('src');


            //Social profiles
            parsedData.social_profiles = {};

            var facebookNode = userDetailsNode.find('.iconLink img[alt=Facebook]');

            if (facebookNode.length > 0) {
                parsedData.social_profiles['facebook'] = facebookNode.parent().attr('href');
            }

            var twitterNode = userDetailsNode.find('.iconLink img[alt=Twitter]');

            if (twitterNode.length > 0) {
                parsedData.social_profiles['twitter'] = twitterNode.parent().attr('href').replace(new RegExp('(?:http://|https://)?(?:www\\.)?twitter\\.com/', 'i'),"");
            }

            var linkedinNode = userDetailsNode.find('.iconLink img[alt=Linkedin]');

            if (linkedinNode.length > 0) {
                parsedData.social_profiles['linkedin'] = linkedinNode.parent().attr('href');
            }

            return parsedData;
        }
    },
    gmail: {
        parsePage: function(){
            var parsedData = {type: 'gmail'};

            var $msgArea = $("div[class*='adn ads']");

            parsedData.emails = [];
            parsedData.names = [];

            $msgArea.each(function() {
                var $message = $(this);
                $message.find("*[email]").each(function() {
                    var email = $(this).attr('email').trim();
                    var name = $(this).attr('name').trim();
                    if (name.toLowerCase().indexOf("me") == -1 && parsedData.emails.indexOf(email) == -1) {
                        parsedData.emails.push(email);
                        parsedData.names.push(name);
                    }
                });

            });

            return parsedData;
        }
    },
    google_calendar: {
        parsePage: function(){
            var parsedData = {type: 'google_calendar'};

            parsedData.emails = [];
            parsedData.names = [];

            var $guests = $('#xGstLst span[data-hovercard-id]');

            if ($guests && $guests.length) {
                $guests.each(function(i, el){
                    var email = el.dataset.hovercardId;
                    var name = el.innerText;
                    if (email) {
                        parsedData.emails.push(email);
                        parsedData.names.push(name === email || !name ? '' : name);
                    }
                });
            }

            return parsedData;
        }
    },
    instagram: {
        parsePage: function(){
            var parsedData = {
                type: 'instagram',
                profile_url: window.location.protocol + '//' + window.location.hostname + window.location.pathname
            };

            // get name in profile
            parsedData.name = $('#react-root section main header section div:last h1').text().trim();

            // get name of first account in suggested list
            if (!parsedData.name) {
                parsedData.name = $('#react-root section main ul div li:first div div:first div:first div div:nth-child(2)')
                    .text().trim();
            }

            // geta avatar in profile
            parsedData.avatar_url = $('#react-root section main header img').attr('src');

            // get avatar of first account in suggested list
            if (!parsedData.avatar_url) {
                parsedData.avatar_url = $('#react-root section main ul div li:first img').attr('src');
            }

            var $websiteEl = $('#react-root section main header section div > a[target="_blank"]');
            if ($websiteEl && $websiteEl.attr('href')) {
                parsedData.website = $websiteEl.text().trim();
            }

            if (parsedData.website && !/https?:\/\//ig.test(parsedData.website)) {
                parsedData.website = 'https://' + parsedData.website;
            }

            parsedData.description = $('#react-root section main header section div:last > span').text().trim();

            return parsedData;
        }
    },
    intercom: {
        parsePage: function(){
            var parsedData = {type: 'intercom'};

            parsedData.name = $('.profile__user-data  .test__user-name, .company-profile__sidebar .tests__company-name').first().text().trim();
            parsedData.avatar_url = $(".profile__user-avatar img").attr('src');

            if (this.getParsedProfile('profile_url').indexOf('company') !== -1 || this.getParsedProfile('profile_url').indexOf('companies') !== -1) {
                parsedData.record_type = 'company';
                parsedData.name = $('.company-profile__editable-name__wrapper').first().text().trim();
            }

            var locationNode = $('.profile__location__country-and-city');
            if (locationNode.length > 0 && locationNode.text().trim().length > 0) {
                parsedData.location = locationNode.text().trim();
            }

            var companyNode = $('.profile__users-companies a[href*="/companies/"]');
            if (companyNode.length > 0) {
                parsedData.company = companyNode.first().text().trim();
            }

            var emailsNode = $('[data-attribute-id="email"]');
            if (emailsNode.length > 0) {
                var firstEmail = emailsNode.first();
                var email = firstEmail.attr('data-value');
                if (!email) {
                    email = $('.attribute__value-label', firstEmail).text().trim();
                }
                if (email) parsedData.email = email;
            }

            parsedData.social_profiles = {};

            // social profiles
            var facebookNode = $('.o__facebook');
            if (facebookNode.length > 0) {
                parsedData.social_profiles['facebook'] = facebookNode.parents('.ember-view').first().find('.kv__value a').first().attr('href');
            }

            var foursquareNode = $('.o__foursquare');
            if (foursquareNode.length > 0 && foursquareNode.parents('.ember-view').first().find('.kv__value a').length > 0) {
                parsedData.social_profiles['foursquare'] = foursquareNode.parents('.ember-view').first().find('.kv__value a').first().attr('href').replace(new RegExp('(?:http://|https://)?(?:www\\.)?foursquare\\.com/user/', 'i'),"");
            }

            var twitterNode = $('.o__twitter');
            if (twitterNode.length > 0 && twitterNode.parents('.ember-view').first().find('.kv__value a').length > 0) {
                parsedData.social_profiles['twitter'] = twitterNode.parents('.ember-view').first().find('.kv__value a').first().attr('href').replace(new RegExp('(?:http://|https://)?(?:www\\.)?twitter\\.com/', 'i'),"");
            }

            var linkedinNode = $('.o__linkedin');
            if (linkedinNode.length > 0) {
                parsedData.social_profiles['linkedin'] = linkedinNode.parents('.ember-view').first().find('.kv__value a').first().attr('href');
            }

            return parsedData;
        }
    },
    klout: {
        parsePage: function(){
            var parsedData = {type: 'klout'};

            parsedData.name = $('.user-profile-container .user-details-container .name .first-name').text().trim().replace(/(\r\n|\n|\r)/gm,'') + ' ' + $('.user-profile-container .user-details-container .name .last-name').text().trim().replace(/(\r\n|\n|\r)/gm,'');
            if (parsedData.name) {
                parsedData.name = parsedData.name.trim();
            }

            parsedData.description = $('.user-profile-container .user-details-container .user-bio').text().trim();

            var avatarNode = $('.user-profile-container .avatar-profile .profile-picture');
            if (avatarNode.length > 0) {
                parsedData.avatar_url = avatarNode.css('background-image').replace('url(','').replace(')','');
            }

            // social profiles
            var netwroksNode = $('.user-profile-container .user-profile-header-container ul.networks');
            if (netwroksNode.length > 0) {
                parsedData.social_profiles = {};
                netwroksNode.find('> li').each(function() {
                    var $li = $(this);
                    var type = $li.attr('class').replace('connected-network','').trim();

                    if ($li.find('a').length === 0) return;

                    var url = $li.find('a').attr('href').replace(/(\r\n|\n|\r)/gm,'').trim();
                    switch (type) {
                        case 'tw':
                            parsedData.social_profiles['twitter'] = url.replace('http://twitter.com/','');
                            break;
                        case 'fb':
                            parsedData.social_profiles['facebook'] = url;
                            break;
                        case 'li':
                            parsedData.social_profiles['linkedin'] = url;
                            break;
                        case 'fs':
                            parsedData.social_profiles['foursquare'] = url;
                            break;
                        case 'ig':
                            parsedData.social_profiles['instagram'] = url;
                            break;
                        case 'fl':
                            parsedData.social_profiles['flickr'] = 'https://www.flickr.com/photos/' + url.replace('http://klout.com/api/flickr/user/','');
                            break;
                            break;
                    }
                });
            }

            return parsedData;
        }
    },
    microsoft_dynamics_crm: {
        parsePage: function(){

            const findIFrame = function(){
                var frameContents;

                try {
                    // searching for correct frame
                    for (var i = 0; i < $('iframe').length; i++){
                        frameContents = $($('iframe').get(i)).contents();

                        if (frameContents.find('#header_crmFormSelector .ms-crm-FormSelector .ms-crm-FormSelector').length > 0){
                            break;
                        }
                    }
                } catch (e){}

                return frameContents;
            };

            const _leadParsing = function(frame){
                var parsedData = {},
                    tmp_var,
                    container = frame.find('#formBodyContainer');

                parsedData.name = container.find("#fullname .ms-crm-Inline-Value [data-for-id='fullname_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();

                parsedData.title = container.find("#jobtitle .ms-crm-Inline-Value [data-for-id='jobtitle_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();

                parsedData.phones = [];
                tmp_var = container.find("#telephone1 .ms-crm-Inline-Value [data-for-id='telephone1_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.phones.push(tmp_var);
                }
                tmp_var = container.find("#mobilephone .ms-crm-Inline-Value [data-for-id='mobilephone_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.phones.push(tmp_var);
                }

                tmp_var = container.find("#emailaddress1 .ms-crm-Inline-Value [data-for-id='emailaddress1_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.emails = [tmp_var];
                }

                tmp_var = frame.find("#companyname .ms-crm-Inline-Value [data-for-id='companyname_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.company = tmp_var;
                }

                tmp_var = frame.find("#address1_composite .ms-crm-Inline-Value [data-for-id='address1_composite_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.location = tmp_var;
                }

                tmp_var = frame.find("#websiteurl .ms-crm-Inline-Value [data-for-id='websiteurl_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.website = tmp_var;
                }



                if (parsedData.emails && parsedData.emails.length === 1) {
                    parsedData.email = parsedData.emails[0];
                    parsedData.emails = [];
                }

                if (parsedData.phones && parsedData.phones.length === 1) {
                    parsedData.phone = parsedData.phones[0];
                    parsedData.phones = [];
                }

                return parsedData;
            };

            const _companyParsing = function(frame){
                var parsedData = {},
                    tmp_var;

                parsedData.record_type = 'company';

                // Parse name
                parsedData.name = frame.find("#name .ms-crm-Inline-Value [data-for-id='name_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();

                tmp_var = frame.find("#emailaddress1 .ms-crm-Inline-Value [data-for-id='emailaddress1_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.emails = [tmp_var];
                }

                parsedData.phones = [];
                tmp_var = frame.find("#telephone1 .ms-crm-Inline-Value [data-for-id='telephone1_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.phones.push(tmp_var);
                }
                tmp_var = frame.find("#mobilephone .ms-crm-Inline-Value [data-for-id='mobilephone_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.phones.push(tmp_var);
                }

                tmp_var = frame.find("#websiteurl .ms-crm-Inline-Value [data-for-id='websiteurl_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.website = tmp_var;
                }

                return parsedData;
            };

            const _contactParsing = function(frame){
                var parsedData = {},
                    tmp_var;



                // Parse name
                parsedData.name = frame.find("#fullname .ms-crm-Inline-Value [data-for-id='fullname_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();


                tmp_var = frame.find("#jobtitle .ms-crm-Inline-Value [data-for-id='jobtitle_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.title = tmp_var;
                }

                tmp_var = frame.find("#parentcustomerid .ms-crm-Inline-Value [data-for-id='parentcustomerid_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.company = tmp_var;
                }
                tmp_var = frame.find("#companyname .ms-crm-Inline-Value [data-for-id='companyname_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.company = tmp_var;
                }

                tmp_var = frame.find("#emailaddress1 .ms-crm-Inline-Value [data-for-id='emailaddress1_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.emails = [tmp_var];
                }

                parsedData.phones = [];
                tmp_var = frame.find("#telephone1 .ms-crm-Inline-Value [data-for-id='telephone1_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.phones.push(tmp_var);
                }
                tmp_var = frame.find("#mobilephone .ms-crm-Inline-Value [data-for-id='mobilephone_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.phones.push(tmp_var);
                }

                tmp_var = frame.find("#address1_composite .ms-crm-Inline-Value [data-for-id='address1_composite_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.location = tmp_var;
                }

                tmp_var = frame.find("#websiteurl .ms-crm-Inline-Value [data-for-id='websiteurl_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.website = tmp_var;
                }

                // Social profiles
                parsedData.social_profiles = {};

                tmp_var = frame.find("#int_facebook .ms-crm-Inline-Value [data-for-id='int_facebook_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.social_profiles.facebook = tmp_var;
                }

                tmp_var = frame.find("#int_twitter .ms-crm-Inline-Value [data-for-id='int_twitter_label']")
                    .clone().children('.ms-crm-div-NotVisible').remove()
                    .end()
                    .text()
                    .trim();
                if (tmp_var && tmp_var.indexOf('--') === -1){
                    parsedData.social_profiles.twitter = tmp_var;
                }

                if (parsedData.emails && parsedData.emails.length === 1) {
                    parsedData.email = parsedData.emails[0];
                    parsedData.emails = [];
                }

                if (parsedData.phones && parsedData.phones.length === 1) {
                    parsedData.phone = parsedData.phones[0];
                    parsedData.phones = [];
                }

                return parsedData;
            };

            var parsedData = {};
            var frameContents = this.findIFrame();

            // parsing leads
            if ($('#Tabnav_leads-main').length > 0){
                parsedData = _leadParsing(frameContents);
            } else {
                var contactTable = frameContents.find('table[name="CONTACT_INFORMATION"]');

                if (contactTable.size() > 0){
                    parsedData = _contactParsing(frameContents);
                } else {
                    parsedData = _companyParsing(frameContents);
                }
            }

            parsedData.type = 'microsoft_dynamics_crm';
            return parsedData;
        }
    },
    pitneyBowes: {
        parsePage: function(){
            var parsedData = {type: 'pitneyBowes'};

            var $container = $('#addressBook-thirdColumn .edit-view .selected-address-list li').length > 0 ?
                $('#addressBook-thirdColumn .edit-view .selected-address-list li').eq(0) : $('#addressBook-thirdColumn .edit-view');

            if ($container.find('.addressBook-fullName').length === 0) return parsedData;

            parsedData.name = $container.find('.addressBook-fullName').text().trim();

            $container.find('.addressBook-companyName').text().trim() &&
            (parsedData.company = $container.find('.addressBook-companyName').text().trim());

            var location = [];
            if ($container.find('.addressBook-streetLine1').text().trim()) {
                location.push($container.find('.addressBook-streetLine1').text().trim());
            }
            if ($container.find('.addressBook-streetLine2').text().trim()) {
                location.push($container.find('.addressBook-streetLine2').text().trim());
            }
            if ($container.find('.addressBook-streetLine3').text().trim()) {
                location.push($container.find('.addressBook-streetLine3').text().trim());
            }
            if ($container.find('.addressBook-city').text().trim()) {
                location.push($container.find('.addressBook-city').text().trim());
            }
            if ($container.find('.addressBook-state').text().trim()) {
                location.push($container.find('.addressBook-state').text().trim());
            }
            if ($container.find('.addressBook-postalCode').text().trim()) {
                location.push($container.find('.addressBook-postalCode').text().trim());
            }
            if ($container.find('.addressBook-country').text().trim()) {
                location.push($container.find('.addressBook-country').text().trim());
            }

            location && (parsedData.location = location.join(' '));

            var email = $container.find('.addressBook-email').text().trim().replace('None', '');
            email && (parsedData.emails = [email]);

            var phone = $container.find('.addressBook-phone').text().trim().replace('None', '');
            phone && (parsedData.phones = [phone]);

            return parsedData;
        }
    },
    salesforce: {
        parsePage: function(){
            var parsedData = {type: 'salesforce'};

            parsedData.name = $('.pageDescription').text().trim() || $('#con2_ileinner').text().trim();

            var pageType = $('.pageType').text().trim().toLowerCase().replace(':','');
            if (pageType === 'account') {
                parsedData.record_type = 'company';
                $('.pbBody .pbSubsection .detailList .labelCol').each(function() {
                    if ($(this).text().trim() === 'Website') {
                        parsedData.website = $(this).next('td.dataCol').find('a').text().trim();
                    }
                });
            } else if (pageType === 'opportunity') {
                parsedData.name = $('#opp4_ileinner').text().trim();
                parsedData.record_type = 'company';
            }

            parsedData.title = $('#con5_ileinner').text().trim();

            if (!parsedData.title.length) {
                parsedData.title = $('#lea4_ileinner').text().trim();
            }

            parsedData.phones = [];
            var phonesNode = $('#con10_ileinner');
            if (phonesNode.text().trim() !== '') {
                parsedData.phones.push(phonesNode.text().trim())
            }
            phonesNode = $('#con12_ileinner');
            if (phonesNode.text().trim() !== '') {
                parsedData.phones.push(phonesNode.text().trim())
            }

            parsedData.addresses = [];
            var addressNode = $('#con19_ileinner');
            if (addressNode.text().trim() !== '') {
                parsedData.addresses.push(addressNode.text().trim())
            }
            addressNode = $('#con18_ileinner');
            if (addressNode.text().trim() !== '') {
                parsedData.addresses.push(addressNode.text().trim())
            }

            addressNode = $('#lea16_ileinner');
            if (addressNode.text().trim() !== '') {
                parsedData.addresses.push(addressNode.text().trim())
            }

            parsedData.birthday = $('#con7_ileinner').text().trim();

            var emailsNode = $('#con15_ileinner').find('> a');
            if (emailsNode.text().trim() !== '') {
                parsedData.emails = [emailsNode.text().trim()];
            }

            emailsNode = $('#lea11_ileinner').find('> a');
            if (emailsNode.text().trim() !== '') {
                parsedData.emails = [emailsNode.text().trim()];
            }

            parsedData.company = $('#con4_ileinner').find('> a').text().trim();
            if (!parsedData.company.length) {
                parsedData.company = $('#lea3_ileinner').text().trim();
            }

            parsedData.description = $('#con20_ileinner').text().trim();
            if (!parsedData.description.length) {
                parsedData.description = $('#lea17_ileinner').text().trim();
            }

            if (!parsedData.website) {
                parsedData.website = $('#lea12_ileinner').find('> a').text().trim();
            }

            if (parsedData.emails && parsedData.emails.length === 1) {
                parsedData.email = parsedData.emails[0];
                parsedData.emails = [];
            }

            if (parsedData.phones && parsedData.phones.length === 1) {
                parsedData.phone = parsedData.phones[0];
                parsedData.phones = [];
            }

            return parsedData;
        }
    },
    twitter: {
        parsePage: function(){
            var parsedData = {
                type: 'twitter',
                profile_url: window.location.protocol + '//' + window.location.hostname + window.location.pathname
            };

            var $avatar = $('a[href*="/photo"] img[src*="profile_images"]');

            if ($avatar && $avatar.length && $avatar.attr('src')) {
                parsedData.avatar_url = $avatar.attr('src');
            }

            return parsedData;
        }
    },
    employersindeed: {
        parsePage: function(){
            var parsedData = {
                type: 'employersindeed',
                name: '',
                emails: [],
                location: '',
            };

            parsedData.name = $('[data-testid="HanselNamePlate-candidateName"]')
                .first()
                .text()
                .trim();
            parsedData.location = $('.hanselNamePlate-leftPanel-location')
                .first()
                .text()
                .trim();

            var $emails = $('.hanselNamePlate a[href^="mailto:"]');

            if ($emails && $emails.length) {
                Array.from($emails).forEach(function(el){
                    if (el.innerText.trim()) {
                        parsedData.emails.push(el.innerText.trim());
                    }
                });
            }

            return parsedData;
        }
    },
    linkedin: {
        parseUrl: function (url) {
            if (url && url.charAt(url.length - 1) === '/'){
                return url.replace(/\/$/,"");
            }
            return url;
        },

        parsePage: function() {
            var profileUrl =  window.location.protocol + '//' + window.location.hostname + window.location.pathname;
            var parsedData = {
                type: 'linkedin',
                profile_url: this.parseUrl(profileUrl),

            };

            var topProfileCard = $('section.pv-top-card');
            var topCompanyCard = $('section.org-top-card');

            if (topProfileCard.length) {
                var detailsLeftPanel = topProfileCard.find('.mt2 > .pv-text-details__left-panel');

                parsedData.name = detailsLeftPanel
                    .find('h1.text-heading-xlarge')
                    .text()
                    .trim();

                parsedData.description = topProfileCard
                    .find('.pv-text-details__left-panel')
                    .first()
                    .find('.text-body-medium')
                    .text()
                    .trim();

                var $experience = $('#main #experience').parent();

                var title = $experience
                    .find('.pvs-list__outer-container .pvs-entity .mr1.t-bold span')
                    .first()
                    .text()
                    .trim();


                var company = $experience
                    .find('.pvs-list__outer-container .pvs-entity .t-14.t-normal span')
                    .first()
                    .text()
                    .trim();

                var $hasManyExperience = $experience
                    .find('.pvs-list__outer-container .pvs-entity .pvs-list__outer-container .pvs-entity')
                    .first();


                if ($hasManyExperience.length) {
                    company = title
                    title = $hasManyExperience
                        .find('.mr1.t-bold span')
                        .first()
                        .text()
                        .trim();
                }

                if (title && company) {
                    parsedData.title = title;
                    var parsedCompanyName = company.split('·')[0];
                    parsedData.company = parsedCompanyName && parsedCompanyName.trim()
                }


                parsedData.location = topProfileCard
                    .find('.pv-text-details__left-panel > span.text-body-small')
                    .text()
                    .trim();

                parsedData.avatar_url = topProfileCard
                    .find('.pv-top-card-profile-picture > img')
                    .attr('src');

            }

            if (topCompanyCard.length) {
                parsedData.record_type = 'company';

                parsedData.name = topCompanyCard
                    .find('h1.ember-view > span')
                    .text()
                    .trim();

                parsedData.website = topCompanyCard
                    .find('a.org-top-card-primary-actions__action')
                    .attr('href');


                parsedData.avatar_url = topCompanyCard
                    .find('.org-top-card-primary-content__logo-container > img')
                    .attr('src');

                parsedData.description = topCompanyCard
                    .find('p.org-top-card-summary__tagline')
                    .text()
                    .trim();

                parsedData.location = document
                    .querySelectorAll('.org-top-card-summary-info-list .org-top-card-summary-info-list__info-item')[1]
                    .innerText
            }

            console.log("++++ parsedData", parsedData)

            return parsedData;
        },
    },
};
