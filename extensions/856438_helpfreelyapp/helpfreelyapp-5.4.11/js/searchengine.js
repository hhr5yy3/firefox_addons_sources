var DEBUG_MODE = false;//!('update_url' in chrome.runtime.getManifest()); //false;

var src_logo = chrome.extension.getURL('images/icon19.png');
var logo_id = 'hff-cc-logo';
var p_id = 'hff-cc-p';

var results = 0;
var url = 1;
var title = 2;
var text = 3;
var raise = 2;
var forbiden = 5;
var status = 1;
var url_exclusive=11;

var aux_cont = 0;

var json = {};

// Return true if "url" is in "forbiden_list"
function forbiden_links(url,forbiden_list){
  for(i in forbiden_list){
    if(url.indexOf(forbiden_list[i]) >= 0) return true;
  }
  return false;
}

// Return true if url is in forbiden_list else return false (This function is duplicated in merchant and searchengine)
function InForbiden(url,shop_id,json){
  try{
    if(/helpfreely.org/gi.test(dominio(url))){
      return false;
    }

    result = false;

    // Return true if url is in marketer patterns
    if(json.marketer){
      marketer_reg = new RegExp(json.marketer,"gi");

      if(marketer_reg.test(url)){
        result = true;
      }
    }
    
    // return true if url is in shop's forbiden patterns
    if(shop_id && json[shop_id][forbiden] && json[shop_id][forbiden].length > 0){
      s = json[shop_id][forbiden].join('|').replace(/\./g,'\\.').replace(/\*/g,'\.*').replace(/https/g,'http').replace(/http/g,'^http[s]{0,1}').replace(/\/\/www\\./g,'\/\/(www\\.){0,1}');
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

    // Return true if url is in forbidden_reg pattern
    if(json['forbidden_reg'] && json['forbidden_reg'].length > 0){      
      forbidden_pattern = new RegExp(json['forbidden_reg'],"i");
      result = result || forbidden_pattern.test(url);
    }     

    // Return true if the shop has exclusive urls and the url is a shop's url and is not one of them
    if(shop_id && json[shop_id] && json[shop_id][url_exclusive] && json[shop_id][url_exclusive].length > 0){

      if(json[dominio(url)] == shop_id){
        result_exclusive = true;
      } else {
        result_exclusive = false;
      }

      for(i=0; i<json[shop_id][url_exclusive].length; i++){
        // exclusive url without "http[s]://"" and without subdomain "www"
        urlexclusive = json[shop_id][allowed][json[shop_id][url_exclusive][i]].replace(/^http[s]{0,1}:\/\//i,'').replace(/^(www\d{0,1}\.){0,1}/i,'').replace(/\/$/gi,'');

        // compare url without "http[s]://"" and without subdomain "www" with the exclusive url
        if(url.replace(/^http[s]{0,1}:\/\//i,'').replace(/^(www\d{0,1}\.){0,1}/i,'').replace(/\/$/gi,'').indexOf(urlexclusive)==0){
          result_exclusive = false;          
        }
      }
      
      result = result || result_exclusive;
    }
    return result;
  } catch(err){
    if(DEBUG_MODE) console.log("{ERROR: searchengine.js -> function InForbiden(..)}");
    return false;
  }
}

function SeoForbidden(shop_id){
  try{
    return json.noseo.indexOf(shop_id) >= 0;
  } catch(e){
    return false;
  }
}

// Add logo and text to associated merchants
function check_results() {
  // If it's a search engine that we have
  if (json.search_engine[location.hostname]){
    // Search result block, and for each...
    $(json.search_engine[location.hostname][results]).each(function(){
      $(this).addClass('hff-checked');
      // If the result don't has logo
      if (!$(this).find('#'+logo_id).size()){
        result_url = $(this).find('a')[0];

        try{
          shop_id = json[dominio(result_url.hostname)];
        } catch(e){
          shop_id = false;
        }

        // If link domain is in json and not in forbiden links for that domain
        if(shop_id && !InForbiden(result_url.href,shop_id,json) && !SeoForbidden(shop_id)){

          // Add logo and function to every link
          $(this).find(json.search_engine[location.hostname][url]+"[href^='"+dominio(result_url.hostname)+"']").each(function(i,e){
            
            if(dominio(result_url.hostname) == dominio(e.hostname) && !InForbiden(e.href,shop_id,json) && !$(e).hasClass("hff-cc-a-checked")){
              $(e).addClass('hff-cc-a-checked');
              userid = json.user_data.id;

              if(json[shop_id][status] == 1 || json[shop_id][status] == 2 ){
                data_href = json.links.reactivate.replace('shop_id', shop_id).replace('user_id', json.user_data.id).replace('url_activate_from', encodeURIComponent($(e).attr('href')));
              } else {
                if(json.user_data.id==12){
                  userid=-12;
                }            
                data_href = json.links.reactivate.replace('shop_id', shop_id).replace('user_id', userid).replace('url_activate_from', encodeURIComponent($(e).attr('href')));
              }

              if(userid==-12 || userid==12){
                data_href = data_href.replace('?',String(Date.now())+'/?cp=SOFTSEO&iid='+json.iid+'&v='+json.helpbar_version+'&').replace('&r=','&onerror=').replace('&u=-12','&u=12');
              } else {
                data_href = data_href.replace('?',String(Date.now())+'/?cp=SEO&iid='+json.iid+'&v='+json.helpbar_version+'&').replace('&r=','&onerror=');
              }

              $(e).attr('data-href',data_href);
              $(e).attr('target','_top');
              $(e).removeAttr('onmousedown');
              $(e).removeAttr('onmouseover');
              $(e).removeAttr('onclick');

              $(e).css('font-size',$(e).css('font-size'));
              $(e).css('font-wight',$(e).css('font-weight'));
              $(e).css('text-decoration',$(e).css('text-decoration'));
              $(e).css('color',$(e).css('color'));
              
              $(e).css('white-space','nowrap');
              $(e).css('line-height',$(e).css('line-height'));
              $(e).css('font-family',$(e).css('font-family'));
              $(e).addClass('seo_a'+aux_cont);

              e2 = $(e).clone();

              $(e2).prepend(DOMPurify.sanitize('<img width="19px" height="19px" id="'+logo_id+'" src="'+src_logo+'" style="margin:-4px 4px 0 0; vertical-align:middle;">'));

              $(e).attr('onmouseover','this.removeAttribute("onmouseover"); this.removeAttribute("onmousedown"); return true;');
              $(e).mousedown(function(){$(this).attr('href',$(this).attr('data-href'));});

              $(DOMPurify.sanitize('<iframe id="hff-cc-frame'+aux_cont+'" class="hff-cc-frame" src="https://www.helpfreely.org/api/sem/?id='+aux_cont+'&v='+json.helpbar_version+'&tag='+encodeURIComponent($(e2)[0].outerHTML)+'" frameborder="0" scrolling="no" height="'+($(e)[0].offsetHeight+4)+'px" width="'+($(e)[0].offsetWidth+35)+'px" style="vertical-align:text-bottom;display:none;"></iframe>')).insertBefore($(e));

              aux_cont+=1;
            }
          });

          // Add text raised amount
          try{
            if($(this).find('#hff-cc-p').length==0){
              $($(this).find(json.search_engine[location.hostname][text])[0]).prepend(DOMPurify.sanitize('<p id="'+p_id+'" style="margin:1px 0;color:#00877f;font-weight:bold;font-style:italic;">'+json.txt.text_se.replace('raise',json[shop_id][raise])+'</p>'));
            }
          } catch(e) {}
        }
      }
    });

    // Pull up results
    $('.srg').prepend(DOMPurify.sanitize($('.srg').children().has('#hff-cc-frame')));
    $('#b_results').prepend(DOMPurify.sanitize($('#b_results').children().has('#hff-cc-frame')));
    $('.searchCenterMiddle').prepend(DOMPurify.sanitize($('.searchCenterMiddle').children().has('#hff-cc-frame')));
  }
}

function check_results3(){
  if (json.search_engine[location.hostname]){
    //document.querySelectorAll('.g .r a').forEach(function(link){
    document.querySelectorAll( json.search_engine["www.google.com"][4] ).forEach(function(link){
      
      // Search shop id
      shop_id = json[dominio(link.href)];

      // If the link is a shop (shop_id is not undefined), the link url is not in forbidden
      if(shop_id && !InForbiden(link.href,shop_id,json) && !SeoForbidden(shop_id) && link.getAttribute('hffchecked')!=1){
        // Set link as checked
        link.setAttribute('hffchecked',1);

        // Set iframe id
        iframe_id = 'hff-cc-frame'+String($('.hff-iframe').length)

        var iframe = document.createElement("iframe");
        iframe.id = iframe_id;
        iframe.className = "hff-iframe";
        iframe.src = json.links.reactivate.split('shop-help')[0]+'sem2/'+'?v='+json.helpbar_version+'&s='+shop_id+'&u='+json.user_data.id+'&iid='+json.iid+'&i='+String($('.hff-iframe').length)+'&onerror='+encodeURIComponent(link.href);
        iframe.style.height="100%";
        iframe.style.width="100%";
        iframe.style.position="absolute";
        iframe.style.top=0;
        iframe.style.left=0;
        iframe.style.border='none';
        iframe.style.display='none';

        var hff_logo = document.createElement("img");
        hff_logo.src = src_logo;
        hff_logo.id = "hands"+iframe_id;
        hff_logo.style.position="absolute";
        hff_logo.style.top='3px';
        hff_logo.style.left='-24px';
        hff_logo.style.height='18px';
        hff_logo.style.border='none';
        hff_logo.style.display='none';

        link.parentNode.style.position='relative';
        link.parentNode.style.overflow='visible';
        link.parentNode.appendChild(iframe);
        link.parentNode.appendChild(hff_logo);
      }
    });
  }
}

// Load json
chrome.storage.local.get(null, function(json_AUX) {
  json = json_AUX;  
  
  if(Object.keys(json).length>2){

    // If it's a search engine that we have
    if(json.search_engine[location.hostname]){
      
      // Update results. Listen for chrome storage 'onChanged' event
      chrome.storage.onChanged.addListener(function(changes, namespace) {      
        if(changes.user_data){
          json.user_data = changes.user_data.newValue;
        }      
      });

      // Search for new results every 500 miliseconds    
      setInterval(function(){        
        // If not conf for show partner shops or is set to true 
        if(!('show_partner_shops' in json.user_data) || json.user_data.show_partner_shops){
          // If there are results that we have not checked
          if(/g[o]{2}g[l]{1}[e]{1}/gi.test(location.hostname) || /ya[h]{1}[o]{2}\.c[o]{1}m/gi.test(location.hostname)){
            check_results3();  
          } else {       
            check_results();
          }
        }
      },500);
    }
  }
});