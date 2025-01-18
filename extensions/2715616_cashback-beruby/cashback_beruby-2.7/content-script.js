function receive_message(message,sender) { 
  if(message.action == "show_popup"){
    add_popup(message);
  } else if (message.action == "unlogged"){
    add_popup(message);
  } else if (message.action == "show_iframe") {
    add_popup(message);
    setTimeout(function(){ window.location.href = message.url_iframe; }, 1500);  
  } else if (message.action == "no_cookies") {
    $(".beruby-close").parent().remove();
    add_legacy(message, false);
  } else if (message.action == "ask_cookies") {
    add_legacy(message, false);
  } else if (message.action == "show_privacy_policy") {
    add_legacy(message, true);
  } else if (message.action == "in_searcher"){
    if (message.append){
      $.get(chrome.runtime.getURL('/templates/search_adb.html'), function(data) {
        domain = window.location.hostname;
        if(domain == 'search.yahoo.com'){
          data = data.replace("<img class='icon-logo' src='https://es.beruby.com/favicon.ico' width='18' height='18'>","")
        }
        $('div.g').eq(0).prepend(data);
        $('#b_results li').eq(0).prepend(data);
        $('#web li.first').prepend(data);
        link = `${message.country}/${message.widget_id}/redirection?notimeout=1&from_extension=1`
        $('div.g').find('a').eq(0).click(function(e) { 
          e.preventDefault(); 
          window.location = link;
        });
        $('#b_results li').find('a').eq(0).click(function(e) { 
          e.preventDefault(); 
          window.location = link;
        });
        $('#web li.first').find('a').eq(0).click(function(e) { 
          e.preventDefault(); 
          window.location = link;
        });
        $('#app-p-beruby').text(message.phrase);
      });
    } else {
      domain = $('div.g').find('a').eq(0).attr('href');
      domain ||= $('#b_results li').find('a').eq(0).attr('href');
      domain ||= $('#web li.first').find('a').eq(0).attr('href');
      browser.runtime.sendMessage({"action":"check_domain","domain": domain });
    }
  }
}

function add_popup(message){
  $(".beruby-close").parent().remove();
  $.get(browser.runtime.getURL('/templates/index.html'), function(data) {
        $(data).appendTo('body');
        var img = browser.extension.getURL("images/logo_beruby.png");
        $('.beruby-message-top img').attr('src',img);
        $('.beruby-texts').append(message.phrase);

        if(message.button_text != null){
          $('.beruby-btn-cashback').text(message.button_text);
          $('.beruby-btn-cashback').click( function() {
            if(message.action != "unlogged"){
              browser.runtime.sendMessage({"action":"visit","url": window.location.href, "widget_id": message.widget_id });
            } else {
              window.location.href = message.url;
            }            
          });
        } else {
          $('.beruby-btn-cashback').remove();
        }

        $('.beruby-btn-more-info').text(message.more_info);
        $('.beruby-btn-more-info').attr('href',message.url);

        $('.beruby-close').click(function() {
          $(".beruby-close").parent().remove();
          browser.runtime.sendMessage({"action":"close_button","url": window.location.href, "widget_id": message.widget_id });
        });
        if (message.action == "show_iframe"){
          $('.beruby-main-div').addClass('visible');
        } else {
          setTimeout(function(){ $('.beruby-main-div').addClass('visible'); }, 1000);   
        }
             
    });
}

function add_legacy(message, policy_text){
  $(".beruby-close").parent().remove();
  $.get(browser.runtime.getURL('/templates/legacy.html'), function(data) {
        $(data).appendTo('body');
        var img = browser.extension.getURL("images/logo_beruby.png");
        $('.beruby-message-top img').attr('src',img);
        $('.beruby-texts').append(message.phrase);
        if(policy_text){
          $('.beruby-texts').addClass('policy');
        }
        $('.beruby-btn-accept').text(message.accept);
        $('.beruby-btn-reject').text(message.reject);
        $('.beruby-btn-back').text(message.policy);
        $('.beruby-btn-back').attr('href',message.policy_url);

        $('.beruby-close').on('click', function() {
          $(".beruby-close").parent().remove();
          browser.runtime.sendMessage({"action":"close_button","url": window.location.href });
        });

        $('.beruby-btn-accept').click(function(){
            $(".beruby-close").parent().remove(); 
            browser.runtime.sendMessage({"action":"accept_cookies","accept_cookies": true});
        })

        $('.beruby-btn-reject').click(function(){
            $(".beruby-close").parent().remove(); 
            browser.runtime.sendMessage({"action":"accept_cookies","accept_cookies": false});
        })

        $('.beruby-btn-back').click(function(){
            $(".beruby-close").parent().remove(); 
            browser.runtime.sendMessage({"action":"show_privacy_policy","show_privacy_policy": true});
        })
        if (message.action == "show_privacy_policy"){
          $('.beruby-main-div').addClass('visible');
        } else {
          setTimeout(function(){ $('.beruby-main-div').addClass('visible'); }, 1000);   
        }
    });
}

browser.runtime.sendMessage({"action":"new_url","domain":window.location.hostname });
browser.runtime.onMessage.addListener(receive_message);


