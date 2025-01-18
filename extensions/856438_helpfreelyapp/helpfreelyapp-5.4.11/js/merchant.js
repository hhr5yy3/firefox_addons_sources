DEBUG_MODE = false;//!('update_url' in chrome.runtime.getManifest());

var currentDomain = dominio(location.hostname)? dominio(location.hostname) : '__no_dominio__.com';

var HFF_name=0;
var HFF_status=1; //value in json: 0 inactive, 1 active, 2 deactivate, 3 no use, 4 softretarget, 5 softseo
var HFF_raise=2;
var country=3;
var slugify=4;
var forbidden=5;
var allowed=6;
var price_comp=7;
var bleaching=8;
var hawking=9;
var maxminclose=10;
var url_exclusive=11;
var shop_logo=12;
var hawking_afn_allowed=13;
var show_app = false; // For window load event. Setted in $(document).ready() initial app status

var images = { 
  "#hff-cc-toolbar-helpfreelylogo": browser.extension.getURL('/images/helpfreelyicon.svg'),
  "#hff-cc-reset1": browser.extension.getURL('/images/confirm_white.svg'),
  "#hff-cc-close-toolbox": browser.extension.getURL('/images/closetab.svg'),
  "#hff-cc-reset2": browser.extension.getURL('/images/incognito.svg'),
  "#hff-cc-activehelpfreelylogo": browser.extension.getURL('/images/helpfreelyicon.svg'),
  "#hff-cc-loading_activation": browser.extension.getURL('/images/confirm_white.svg')
}

var HFF_toolbarHtml ='\
<div id="hff-cc-toolbar" class="hff-cc-reset hff-cc-fixed hff-cc-toolbar-off">\
  <img id="hff-cc-toolbar-helpfreelylogo" class="hff-cc-reset" src="">\
  <img id="hff-cc-activeshoplogo" class="hff-cc-reset" src="">\
  <p id="hff-cc-inactivetext" class="hff-cc-reset">¿Quieres recaudar hasta 1.50% en Just Eat?</p>\
  <p id="hff-cc-toolbar-button" class="hff-cc-reset hff-cc-activebutton"><span>Activar</span> Shop&amp;Help</p>\
  <p id="hff-cc-userarea" class="hff-cc-reset"><span class="hff-cc-reset"><span class="hff-cc-reset">Inicia sesión</span> para recaudar para tus asociaciones</span><img id="hff-cc-reset2" class="hff-cc-reset" src="" style="cursor:pointer!important;"></p>\
  <p id="hff-cc-activetext" class="hff-cc-reset" style="margin: 0!important;"><img id="hff-cc-reset1" class="hff-cc-reset" src=""> <span>Felicidades, la donación ya ha sido activada</span></p>\
</div>';

var HFF_toolboxHtml = '\
<div id="hff-cc-toolbox" class="hff-cc-reset-move hff-cc-toolbox-off">\
  <img id="hff-cc-close-toolbox" style="user-drag: none;user-select: none;" src="" ondragstart="return false;">\
  <div id="hff-cc-shop-zone">\
    <img id="hff-cc-toolbox-shoplogo" style="position:absolute!important;height:30px!important;width:60px!important;vertical-align:middle!important;user-drag: none;user-select: none;" src="" ondragstart="return false;">\
    <p id="hff-cc-activeshoptext" class="hff-cc-reset" style="margin: 0 0 0 70px!important;line-height: 15px!important;cursor: grab!important;"></p>\
  </div>\
  <div id="hff-cc-active_zone">\
    <img id="hff-cc-activehelpfreelylogo" style="cursor:pointer!important;position:absolute!important;height:30px!important;width:30px!important;vertical-align:middle!important;user-drag: none;user-select: none;" src="" ondragstart="return false;">\
    <div class="hff-cc-reset" style="padding-left: 45px!important;"><p id="hff-cc-toolbox-button" class="hff-cc-reset hff-cc-activebutton"><span>Activar</span> Shop&amp;Help</p></div>\
  </div>\
  <div id="hff-cc-donation_active">\
    <img id="hff-cc-loading_activation" style="cursor:pointer!important;position:absolute!important;height:30px!important;width:30px!important;vertical-align:middle!important;user-drag: none;user-select: none;" src="" ondragstart="return false;">\
    <p id="hff-cc-txt_activation" class="hff-cc-reset" style="margin: 0 0 0 40px!important;line-height: 15px!important;cursor: grab!important;">¡Felicidades! La donación ya ha sido activada.</p>\
  </div>\
</div>';

//Update toolbar content depending of the status
function updateInfo(json){
  try{
    shop_id = json[currentDomain];
    $('#hff-cc-inactivetext,#hff-cc-activeshoptext').text( json.txt['text_no_active'].replace('{{shop_name}}',json[shop_id][0]).replace('{{raise}}',json[shop_id][2].replace(' ','')) );

    $('#hff-cc-activetext,#hff-cc-txt_activation').text(json.txt['text_active'].replace('{{user_name}}',json.user_data.username));
    $('#hff-cc-toolbar-button span,#hff-cc-toolbox-button span').text(json.txt['text_button']);
    json.txt['text_userarea'] = "<span>Inicia sesión</span> para recaudar para tus asociaciones";
  } catch(e){}
}

// Load the appropiate html depending on the toolbar state
function updateStatus(json) {
  try{
    
    if(!json[currentDomain]){
      $('#hff-cc-toolbar').remove();
      $('#hff-cc-toolbox').remove();

    } else {      
      // Toolbar Mode
      if(json.user_data.style == "toolbar"){

        $('html').css({'margin-top':'50px','position':'relative'});
        $('*').filter(function(){
          return $(this).css("position") === 'fixed';
        }).each(function(i,val){
          if (!$(val).hasClass('hff-cc-fixed')){
            $(val).addClass('hff-cc-fixed')
            $(val).css('top','+=50px');
          }
        });
        $('#hff-cc-toolbox').css('display','none');
        $('#hff-cc-toolbar').css('display','');

      // Toolbox mode
      } else {
        $('html').css({'margin-top':'0px','position':'relative'});
        $('*').filter(function(){
          return $(this).css("position") === 'fixed';
        }).each(function(i,val){
          if ($(val).hasClass('hff-cc-fixed')){
            $(val).removeClass('hff-cc-fixed')
            $(val).css('top','-=50px');
          }
        });

        $('#hff-cc-toolbar').css('display','none');        

        // Set toolbox close
        $('#hff-cc-close-toolbox').unbind().click(function(){
          $('#hff-cc-toolbox').hide();
          localStorage.setItem('hff-cc-toolbox','hide');
        });

        if(localStorage.getItem('hff-cc-toolbox') == 'hide'){
          $('#hff-cc-toolbox').css('display','none');
        } else {
          $('#hff-cc-toolbox').css('display','');
        }
      }


      var shop_logo_url = "https://www.helpfreely.org/media/shop/" + json[json[currentDomain]][shop_logo];
      var animation_icon;

      $('#hff-cc-activeshoplogo').attr('src',shop_logo_url);
      $('#hff-cc-toolbox-shoplogo').attr('src',shop_logo_url);

      $('#hff-cc-toolbar').removeClass('hff-cc-toolbar-off').removeClass('hff-cc-toolbar-off-anonymous');
      $('#hff-cc-toolbox').removeClass('hff-cc-toolbox-off').removeClass('hff-cc-toolbox-off-anonymous');

      if (!json.user_data || json.user_data.id < 0 || json.user_data.id == 12){
        $('#hff-cc-userarea img').attr('src',browser.extension.getURL('/images/incognito.svg'));
        $('#hff-cc-loading_activation').attr('src',browser.extension.getURL('/images/incognito.svg'));

        $('#hff-cc-toolbar').addClass('hff-cc-toolbar-off-anonymous');  
        $('#hff-cc-toolbox').addClass('hff-cc-toolbox-off-anonymous');

        $('#hff-cc-toolbar-button').addClass('anonymous');
        $('#hff-cc-toolbox-button').addClass('anonymous');

        animation_icon = 'alert_incognito';
      } else {
        $('#hff-cc-userarea img').attr('src',json.user_data.photo);
        $('#hff-cc-loading_activation').attr('src',browser.extension.getURL('/images/confirm_white.svg'));

        $('#hff-cc-toolbar').addClass('hff-cc-toolbar-off');
        $('#hff-cc-toolbox').addClass('hff-cc-toolbox-off');

        $('#hff-cc-toolbar-button').removeClass('anonymous');
        $('#hff-cc-toolbox-button').removeClass('anonymous');

        animation_icon = 'alert_user';
      }

      // donation active
      if (json[json[currentDomain]][HFF_status] == 1){ 
        //toolbar
        $('#hff-cc-toolbar').removeClass('hff-cc-toolbar-off').removeClass('hff-cc-toolbar-off-anonymous');
        // Anonymous
        if (!json.user_data || json.user_data.id < 0 || json.user_data.id == 12){
          $('#hff-cc-toolbar').addClass('hff-cc-toolbar-on-anonymous');
        // User logged
        } else {
          $('#hff-cc-toolbar').addClass('hff-cc-toolbar-on');  
        }
        

        //toolbox
        $('#hff-cc-toolbox').removeClass('hff-cc-toolbox-off').removeClass('hff-cc-toolbox-off-anonymous');
        // Anonymous
        if (!json.user_data || json.user_data.id < 0 || json.user_data.id == 12){
          $('#hff-cc-toolbox').addClass('hff-cc-toolbox-on-anonymous');
        // User logged
        } else {
          $('#hff-cc-toolbox').addClass('hff-cc-toolbox-on');
        }

        chrome.runtime.sendMessage({icon: 'activated'});
      } else {
        setTimeout(function(){ chrome.runtime.sendMessage({icon: 'alert'}); }, 500);
        setTimeout(function(){ chrome.runtime.sendMessage({icon: animation_icon}); }, 1000);
        setTimeout(function(){ chrome.runtime.sendMessage({icon: 'alert'}); }, 1500);
        setTimeout(function(){ chrome.runtime.sendMessage({icon: animation_icon}); }, 2000);
        setTimeout(function(){ chrome.runtime.sendMessage({icon: 'alert'}); }, 2500);
        setTimeout(function(){ chrome.runtime.sendMessage({icon: animation_icon}); }, 3000);
        setTimeout(function(){ chrome.runtime.sendMessage({icon: 'alert'}); }, 3500);
        setTimeout(function(){ chrome.runtime.sendMessage({icon: animation_icon}); }, 4000);
      }
    }
  } catch(e){}
    
}

// Return true if url is in forbiden_list else return false (This function is duplicated in merchant and searchengine)
function InForbidden(url,json){  
  try{
    shop_id = json[dominio(url)];
    result = false;

    // Return true if url is in marketer patterns
    if(json.marketer){
      marketer_reg = new RegExp(json.marketer,"gi");

      if(marketer_reg.test(url)){
        result = true;
      }
    }

    // Forbbiden url added in json on background 404 detect
    if(json['forbidden_url'] && json['forbidden_url']==url){
      return true;
    }

    // return true if url is in shop's forbiden patterns
    if(shop_id && json[shop_id][forbiden] && json[shop_id][forbiden].length > 0){
      s = json[shop_id][forbiden].join('|').replace(/\./g,'\\.').replace(/\*/g,'\.*').replace(/https/g,'http').replace(/http/g,'^http[s]{0,1}').replace(/\/\/www\\./g,'\/\/(www\\.){0,1}');
      forbiden_pattern = new RegExp(s,"i");
      result = result || forbiden_pattern.test(url);
    }

    // return true if url is in shop's bleaching patterns
    if(shop_id && json[shop_id][bleaching] && json[shop_id][bleaching].length > 0){
      s = json[shop_id][bleaching].join('|').replace(/\./g,'\\.').replace(/\*/g,'\.*').replace(/https/g,'http').replace(/http/g,'^http[s]{0,1}').replace(/\/\/www\\./g,'\/\/(www\\.){0,1}');
      forbiden_pattern = new RegExp(s,"i");
      result = result || forbiden_pattern.test(url);
    }

    // return true if url is in shop's hawking patterns
    if(shop_id && json[shop_id][hawking] && json[shop_id][hawking].length > 0){
      s = [];
      json[shop_id][hawking].forEach(function(ele,index){
        s.push(ele[0]);
      });

      s = s.join('|').replace(/\./g,'\\.').replace(/\*/g,'\.*').replace(/https/g,'http').replace(/http/g,'^http[s]{0,1}').replace(/\/\/www\\./g,'\/\/(www\\.){0,1}');
      forbiden_pattern = new RegExp(s,"i");
      result = result || forbiden_pattern.test(url);
    }

    // Return true if url is in referrer_reg pattern
    if(json['referrer_reg'] && json['referrer_reg'].length > 0){      
      referrer_pattern = new RegExp(json['referrer_reg'],"i");
      result = result || referrer_pattern.test(url);
    }

    // Return true if url is in forbidden_reg pattern
    if(json['forbidden_reg'] && json['forbidden_reg'].length > 0){      
      forbidden_pattern = new RegExp(json['forbidden_reg'],"i");
      result = result || forbidden_pattern.test(url);
    } 

    // Return true if the shop has exclusive urls and the url param is not one of them
    if(shop_id && json[shop_id] && json[shop_id][url_exclusive] && json[shop_id][url_exclusive].length > 0){
      result_exclusive = true;

      for(i=0; i<json[shop_id][url_exclusive].length; i++){
        // exclusive url without "http[s]://"" and without subdomain "www"
        urlexclusive = json[shop_id][allowed][json[shop_id][url_exclusive][i]].replace(/^http[s]{0,1}:\/\/(www\d{0,1}\.){0,1}/i,'').replace(/\/$/gi,'');

        // compare url without "http[s]://"" and without subdomain "www" with the exclusive url
        if(url.replace(/^http[s]{0,1}:\/\/(www\d{0,1}\.){0,1}/i,'').replace(/\/$/gi,'').indexOf(urlexclusive)==0) {
          result_exclusive = false;
        }
      }
      result = result || result_exclusive;
    }
    return result;
  } catch(err){
    return false;
  }
}


$(document).ready(function(){  
  // Get the JSON data and set the content and the listeners
  chrome.storage.local.get(null, function(json) {

    // Ask background per BBQ-RIBS conditions
    chrome.runtime.sendMessage({'show_app': document.location.hostname},function(response){
      // If response is true, show the toolbar/toolbox
      if(response){
        // If not conf in json set default conf
        if(!json['style']) json['style'] = 'toolbar';

        if(Object.keys(json).length>2){

          var error = false;
          
          if(json[currentDomain]){
            
            var count_interval_SW = 0;
            var interval_SW = setInterval(function(){
              try{
              
                if(count_interval_SW<10){
                  count_interval_SW += 1;

                  // clear service worker
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(let registration of registrations) {
                      registration.unregister();                      
                    }
                  });
                } else {
                  clearInterval(interval_SW);
                }
              } catch(e){}
            },1000);

          } else {
            if(json['no']){
              error = 1;
              if (DEBUG_MODE) console.log('ERROR 1: JSON {no:data}');
            } else {
              if(json['links']){
                if (DEBUG_MODE) console.log('NO ERROR. URL is not a shop');

              } else {
                error = 2;
                if (DEBUG_MODE) console.log('ERROR 2: no JSON received');  
              }
            }      
          }

          //If the backend send us the JSON and the current domain is in the JSON  
          if (json[currentDomain] && !InForbidden(location.href,json)){
            
            // Update app. Listen for chrome storage 'onChanged' event
            chrome.storage.onChanged.addListener(function(changes, namespace) {
              if (DEBUG_MODE) console.log('chrome.storage changed:', changes);
              for (key in changes){ json[key] = changes[key].newValue; }
              
              updateStatus(json);
              updateInfo(json);
              
              
            });

            // Add sanitized app html code to the body of the web
            $('body').prepend(DOMPurify.sanitize(HFF_toolboxHtml)).prepend(DOMPurify.sanitize(HFF_toolbarHtml));
            Object.keys(images).forEach(function(id){              
              $(id).attr('src',images[id]);
            });

            function setToolboxPosition(top,left){
              if(top<0) top = 0;
              if(top>(window.innerHeight-parseInt($('#hff-cc-toolbox').css('height')))) top = window.innerHeight-parseInt($('#hff-cc-toolbox').css('height'));
              if(left<0) left = 0;
              if(left>(window.innerWidth-parseInt($('#hff-cc-toolbox').css('width')))) left = window.innerWidth-parseInt($('#hff-cc-toolbox').css('width'))-30;

              localStorage.setItem('hff-cc-top',top);
              localStorage.setItem('hff-cc-left',left);
              $('#hff-cc-toolbox').css('top', top+'px');
              $('#hff-cc-toolbox').css('left', left+'px');
            }

            $('#hff-cc-toolbox').on('mousedown', function (evt) {
              var offset = this.getClientRects()[0];
              var downx = evt.clientX - offset.left;
              var downy = evt.clientY - offset.top;                

              $('body').on('mouseup mousemove', function handler(evt2) {
                
                if (evt2.type === 'mouseup') {
                  $('body').off('mouseup mousemove', handler);
                  var top = parseInt($('#hff-cc-toolbox').css('top'));
                  var left = parseInt($('#hff-cc-toolbox').css('left'));
                  setToolboxPosition(top,left);
                } else {
                  $('#hff-cc-toolbox').css('top', evt2.clientY-downy+'px');
                  $('#hff-cc-toolbox').css('left', evt2.clientX-downx+'px');
                  $('#hff-cc-toolbox').css('right','unset');
                }
              });
            });


            $('.hff-cc-activebutton').unbind().click(function(){
              chrome.runtime.sendMessage({action: true});
            });
            $('#hff-cc-userarea span').unbind().click(function(){
              window.open('https://www.helpfreely.org/user/login/','blank');
            });

            $('#hff-cc-activehelpfreelylogo').unbind().click(function(){
              window.open('https://www.helpfreely.org/admin/','blank');
            });
            $('#hff-cc-loading_activation').unbind().click(function(){
              window.open('https://www.helpfreely.org/admin/','blank');
            });
            $('#hff-cc-userarea img').unbind().click(function(){
              window.open('https://www.helpfreely.org/admin/','blank');
            });


            // Calls to update css and text in APP
            updateStatus(json);
            updateInfo(json);  

            // Read previous Toolbox position
            if(localStorage.getItem('hff-cc-left') && localStorage.getItem('hff-cc-top')){
              setToolboxPosition(localStorage.getItem('hff-cc-top'),localStorage.getItem('hff-cc-left'));
            } else {
              $('#hff-cc-toolbox').css('top','200px').css('right','50px').css('left','auto');
            }
            // On resize window check Toolbox position
            $(window).on('resize', function(){
              setToolboxPosition(parseInt($('#hff-cc-toolbox').css('top')),parseInt($('#hff-cc-toolbox').css('left')));
            });
            
          } 
        }
      } else {
        if (json[currentDomain] && !InForbidden(location.href,json)){
          $('a').each(function(i,e){e.href=e.href+';hfbbqribs=hfbbqribs'});
          console.log ("   ├── NO APP FOR BBQ-RIBS");
        }
      }
    });        
  });

  /*chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.open_toolbox){
      $('#hff-cc-toolbox').show();
      sessionStorage.setItem('hff-cc-toolbox','');
    }
  });*/

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.action == "open_toolbox"){
      $('#hff-cc-toolbox').show();
      localStorage.setItem('hff-cc-toolbox','');
    }
  });

  $(window).load(function() {    
    if(show_app){
      shop_app = false;
      $('*').filter(function(){
        return $(this).css("position") === 'fixed';
      }).each(function(i,val){
        if (!$(val).hasClass('hff-cc-fixed')){
          $(val).addClass('hff-cc-fixed')
          $(val).css('top','+=50px');
        }
      });
    }
  });

}); //document.ready
