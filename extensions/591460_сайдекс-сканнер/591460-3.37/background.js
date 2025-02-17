﻿var source_site = 'offers.sidex.ru';
var version = '3.37';
switch(navigator.vendor)
 {
  case 'Google Inc.':
   var browser = 'Google Chrome';
   break;
  case 'Yandex':
   var browser = 'Yandex Browser';
   break;
  case 'Opera Software ASA':
   var browser = 'Opera';
   break;
  default:
   var browser = navigator.userAgent;
   break;
 }


function db_get(name,fn)
 {
  chrome.storage.local.get(name,function(x)
   {
    fn(x[name]);
   });
 }


function db_set(name,value,fn)
 {
  var e = {};
  if(fn)
   {
    e = name;
   }
  else
   {
    e[name] = value;
    var fn = function(){};
   }
  chrome.storage.local.set(e,fn);
 }


var g = window.location.host+'';
var google = false;
var yandex = false;
var bing = false;
var ext_showed = false;
if(g.match(new RegExp('google\.[a-z0-9]{1,9}$'))){google=true;}
else if(g.match(new RegExp('yandex\.[a-z0-9]{1,9}$'))){yandex=true;}
else if(g.match(new RegExp('bing\.[a-z0-9]{1,9}$'))){bing=true;}

var uniq_id = Math.random().toString(36).replace(/[^a-z]+/g,'')+Math.random().toString(36).replace(/[^a-z]+/g,'')+Math.random().toString(36).replace(/[^a-z]+/g,'');


function time()
 {
  return Math.floor(new Date().getTime()/1000);
 }


function get(url,post,fn,not_json)
 {
  var ajax = new XMLHttpRequest();
  var method = 'GET';
  if(post)
   {
    method = 'POST';
    post = 'json='+encodeURIComponent(JSON.stringify(post));
   }
  ajax.open(method,url);
  ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  ajax.onreadystatechange = function()
   {
    if(ajax.readyState==4)
     {
      var r = ajax.responseText;
      if(typeof not_json=='undefined')
       {
        r = JSON.parse(r);
       }
      if(fn){fn(r);}else{return r;}
     }
   }
  ajax.send(post);
 }


function get_offer(dat,fn)
 {
  db_get('geo_id',function(s1)
   {
    dat.geo_id = '';
    if(s1)
     {
      dat.geo_id = s1;
     }
    
    db_get('sort',function(s2)
     {
      dat.sort = '';
      if(s2){dat.sort=s2;}
      dat.uniq_id = uniq_id;
      get('https://'+source_site+'/SidexPriceScanner.php',dat,function(s)
       {
        var a = document.querySelector('#'+uniq_id);
        if(!a)
         {
          var e = document.createElement('div');
          e.setAttribute('style','display: block !important; border: 0 !important; outline: 0 !important; padding: 0 !important; margin: 0 !important; opacity: 1 !important; height:0; transition: height 0.4s ease;');
          var a = document.createElement('div');
          a.setAttribute('style','border: 0 !important; outline: 0 !important; padding: 0 !important; margin: 0 !important; opacity: 1 !important; display: block !important; position: fixed; left: 0px; right: 0px; width: 100% !important; z-index: 999999999 !important; overflow: auto !important; visibility: visible !important; background-color: transparent; height: 60px; top: -60px; transition: top 0.4s ease;');
          a.setAttribute('id',uniq_id);
          e.appendChild(a);
          document.body.insertBefore(e,document.body.firstChild);
         }
        a.innerHTML = s;
        if(!s)
         {
          if(typeof fn=='function')
           {
            fn();
           }
          return false;
         }
        
        var d = a.querySelectorAll('script');
        var c = d.length;
        for(var i=0;i<c;i++)
         {
          var r = d[i];
          var e = document.createElement('script');
          e.innerHTML = r.innerHTML;
          var s = r.getAttribute('src');
          if(s)
           {
            e.setAttribute('src',s);
           }
          r.parentNode.removeChild(r);
          a.appendChild(e);
         }
        bar_open();
       },true);
     });
   });
 }


function get_text(e)
 {
  var name = '';
  if(e)
   {
    name = e.innerText;
    if(!name)
     {
      name = e.getAttribute('content');
     }
   }
  return name;
 }


var retargeting = function()
 {
  if(yandex)
   {
    return false;
   }
  
  db_get('retar',function(retar)
   {
    retar = retar?parseInt(retar):0;
    if(retar<1)
     {
      return false;
     }
    
    db_get('retar_key',function(name)
     {
      if(!name)
       {
        return false;
       }
      
      db_get('retar_showed',function(retar_showed)
       {
        if(!retar_showed)
         {
          var retar_showed = 0;
         }
        if(retar>retar_showed)
         {
          db_get('retar_showed',function(retar_showed)
           {
            if(!retar_showed){retar_showed=0;}
            retar_showed++;
            db_set('retar_showed',retar_showed);
           });
          
          var json = {site:window.location.host,url:window.location.href,ref:document.referrer,name:name,shop_id:'',browser:browser,version:version,retar:1};
          get_offer(json);
          return true;
         }
       });
     });
   });
 }


function check_sites(sites)
 {
  var host = window.location.host;
  var url = window.location.href;
  var c = sites.length;
  for(var i=0;i<c;i++)
   {
    if((sites[i].host==host)||(google&&(sites[i].host=='www.google.ru'))||(yandex&&(sites[i].host=='yandex.ru'))||(bing&&(sites[i].host=='www.bing.com')))
     {
      var site = sites[i];
      var c2 = site.url.length;
      for(var i2=0;i2<c2;i2++)
       {
        var x = url.match(new RegExp(site.url[i2]));
        if(x)
         {
          var e = document.querySelector(site.name_parse);
          var name = get_text(e);
          if((google&&(e||(url.indexOf('tbm=shop')>-1)))||(yandex&&e)||bing)
           {
            var e = document.querySelector('input[name='+(yandex?'text':'q')+']');
            var name2 = e?e.value:'';
           }
          else
           {
            var name2 = '';
           }
          
          if(google||url.match(/^http(|s):\/\/(www\.|)yandex\.ru\//))
           {
            name = '';
           }
          
          if(yandex&&(name2||name))
           {
            var v = name2?name2:name;
            if(v.length>256){v='';}
            if(v)
             {
              db_set('retar_key',v);
              db_set('retar_showed',0);
             }
           }
          
          if(name||name2)
           {
            var json = {site:host,url:url,ref:document.referrer,name:name,name2:name2,shop_id:site.shop_id,browser:browser,version:version};
            get_offer(json);
           }
          break;
         }
       }
      return true;
     }
   }
  
  db_get('mikraz',function(s)
   {
    if(s)
     {
      var e = document.querySelector(s);
      var name = get_text(e);
      if(name)
       {
        var json = {site:host,url:url,ref:document.referrer,name:name,shop_id:'',browser:browser,version:version};
        get_offer(json,retargeting);
        return true;
       }
     }
    
    db_get('url',function(s)
     {
      if(s)
       {
        var e = document.querySelector(s);
        var name = get_text(e);
        if(name)
         {
          var json = {site:host,url:url,ref:document.referrer,name:name,shop_id:'',browser:browser,version:version};
          get_offer(json,retargeting);
          return true;
         }
       }
       
       retargeting();
     });
   });
 }


function update_sites()
 {
  var json = {browser:browser,version:version};
  get('https://'+source_site+'/SidexPriceScanner.php?update',json,function(x)
   {
    if(x)
     {
      x.updated_time = time();
      db_set(x,'',function(){db_get('sites',function(x){check_sites(x);});});
     }
   });
 }


function ext_start()
 {
  db_get('updated_time',function(s)
   {
    if(s){if(s+21600<time()){update_sites();}else{db_get('sites',function(x){if(x){check_sites(x);}else{update_sites();}});}}else{update_sites();}
   });
 }


function ext_close()
 {
  ext_showed = false;
  var a = document.querySelector('#'+uniq_id);
  if(a)
   {
    a.parentNode.style.height = '0';
    a.style.top = '-60px';
    if(google)
     {
      var d = document.querySelector('#viewport');
      if(d)
       {
        d.style.top = '0px';
       }
      else
       {
        var d = document.querySelector('#searchform');
        if(d){d.style.top = '15px';}
       }
     }
   }
 }

var interval = 100;

if(yandex)
 {
  var old = false;
  setInterval(function()
   {
    var v = document.title;
    if(old!=v)
     {
      old = v;
      ext_close();
      setTimeout(function(){ext_start();},300);
     }
   },interval);
 }
else
 {
  ext_start();
 }




function bar_open()
 {
  document.addEventListener('click',function(e)
   {
    var n = e.target.tagName;
    if((n!='INPUT')&&(n!='SELECT')&&(n!='TEXTAREA'))
     {
      if(document.activeElement){document.activeElement.blur();}
     }
   });
  
  
  var d = document.querySelector('#'+uniq_id+'bar_search');
  d.querySelector('img').addEventListener('click',function()
   {
    ajax_search(this.parentNode.querySelector('input').value);
   });
  var e = d.querySelector('input');
  e.addEventListener('keydown',function()
   {
    if(event.keyCode==13)
     {
      ajax_search(this.value);
     }
   });
  e.addEventListener('focus',function()
   {
    ajax_search(this.value);
   });
  d.querySelector('#'+uniq_id+'ajax_search_title').addEventListener('click',function()
   {
    ajax_search('');
   });
  
  document.querySelector('#'+uniq_id+'bar_menu').addEventListener('click',function()
   {
    db_get('cd',function(s)
     {
      if(typeof s!='object')
       {
        var s = {};
       }
      
      var domen = document.location.host.split('.').slice(-2).join('.');
      delete s[domen];
      
      db_set({cd:s},'',function()
       {
        hover_event();
       });
     });
    
    prices_show();
   });
  
  var d = function()
   {
    prices_show(function()
     {
      region_show(function()
       {
        document.querySelector('#'+uniq_id+'region_input').focus();
       });
     });
   };
  document.querySelector('#'+uniq_id+'region_name2').addEventListener('click',d);
  document.querySelector('#'+uniq_id+'region_name3').addEventListener('click',d);
  document.querySelector('#'+uniq_id+'bar_close').addEventListener('click',function()
   {
    settings_close();
    prices_close();
    ext_close();
    unhover_event();
   });
  document.querySelector('#'+uniq_id+'hide_block').addEventListener('click',function()
   {
    settings_close();
    prices_close();
   });
  document.querySelector('#'+uniq_id+'settings_close').addEventListener('click',function()
   {
    settings_close();
   });
  var d = document.querySelector('#'+uniq_id+'prices_block');
  d.querySelector('#'+uniq_id+'prices_close').addEventListener('click',function()
   {
    prices_close();
    
    db_get('cd',function(s)
     {
      if(typeof s!='object')
       {
        var s = {};
       }
      
      var domen = document.location.host.split('.').slice(-2).join('.');
      s[domen] = time();
      
      db_set({cd:s},'',function()
       {
        unhover_event();
       });
     });
   });
  var e = function()
   {
    region_close();
   };
  d.querySelector('table').addEventListener('click',e);
  d.querySelector('.'+uniq_id+'price_list').addEventListener('click',e);
  d.querySelector('#'+uniq_id+'regions_search td a').addEventListener('click',e);
  d.querySelector('#'+uniq_id+'region_name a').addEventListener('click',function()
   {
    region_show();
   });
  d.querySelector('#'+uniq_id+'region_input').addEventListener('keyup',function()
   {
    region_search(this.value);
   });
  var d = d.querySelectorAll('#'+uniq_id+'region_list a');
  var c = d.length;
  for(var i=0;i<c;i++)
   {
    d[i].addEventListener('click',function()
     {
      region_close(this);
     });
   }
  document.querySelector('#'+uniq_id+'settings_content select').addEventListener('change',function()
   {
    db_set('sort',this.value);
   });
  document.querySelector('#'+uniq_id+'region_auto').addEventListener('change',function()
   {
    if(this.checked)
     {
      db_set('geo_id','');
     }
    else
     {
      db_set('geo_id',region_noauto);
     }
   });
  
  
  var ajax_search_sender = false;
  
  function get2(url,post,fn)
   {
    if(ajax_search_sender){ajax_search_sender.abort();}
    ajax_search_sender = new XMLHttpRequest();
    var method = 'GET';
    if(post)
     {
      method = 'POST';
      post = 'json='+encodeURIComponent(JSON.stringify(post));
     }
    ajax_search_sender.open(method,url);
    ajax_search_sender.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    ajax_search_sender.onreadystatechange = function()
     {
      if(ajax_search_sender.readyState==4)
       {
        if(ajax_search_sender.status!==0)
         {
          fn(ajax_search_sender.responseText);
         }
       }
     }
    ajax_search_sender.send(post);
   }
  
  
  var barhover = function(e)
   {
    if(typeof e.target!='undefined')
     {
      var n = uniq_id+'bar_search';
      var e = e.target;
      for(var i=0;i<10;i++)
       {
        if(!e)
         {
          break;
         }
        if(e.getAttribute('id')==n)
         {
          return false;
         }
        else
         {
          e = e.parentElement;
         }
       }
     }
    unhover_event();
    if((this.querySelector('#'+uniq_id+'ajax_search').getAttribute('class')!=uniq_id+'o')&&(this.querySelector('#'+uniq_id+'bar_menu').getAttribute('class')!=uniq_id+'o'))
     {
      prices_show();
     }
   };
  
  var ajax_old_search = '';
  
  
  function ajax_search(str,n)
   {
    if(n!=1)
     {
      prices_close();
      settings_close();
     }
    
    var d = document.querySelector('#'+uniq_id+'ajax_search');
    if(str=='')
     {
      hover_event();
  
      d.removeAttribute('class');
     }
    else
     {
      unhover_event();
  
      d.setAttribute('class',uniq_id+'o');
      iframe_height('full',0);
      if(ajax_old_search!=str)
       {
        document.querySelector('#'+uniq_id+'ajax_search_block').innerHTML = '';
        var d = document.querySelector('#'+uniq_id+'bar');
        get2('https://offers.sidex.ru/SidexPriceScanner.php?',{ajax_search:1,name:str,shop_id:d.getAttribute('data-shopid'),geo_id:d.getAttribute('data-geoid'),uniq_id:uniq_id},function(result)
         {
          if(result=='')
           {
            result = '<div id="'+uniq_id+'market_link">К сожалению, по вашему запросу<br>ничего не найдено.</div>';
           }
          var z = document.querySelector('#'+uniq_id+'ajax_search_block');
          z.innerHTML = result;
          var m = z.querySelectorAll('script');
          var c = m.length;
          for(var i=0;i<c;i++)
           {
            var s = document.createElement('script');
            
            var n = m[i].getAttribute('src');
            if(n)
             {
              s.setAttribute('src',n);
             }
            else
             {
              s.innerHTML = m[i].innerHTML;
             }
            m[i].parentNode.removeChild(m[i]);
            z.appendChild(s);
           }
         });
        ajax_old_search = str;
       }
     }
   }
  
  
  var regions_index = new Array();
  var region_list = document.querySelector('#'+uniq_id+'region_list');
  var a = region_list.getElementsByTagName('a');
  var c = a.length;
  for(var i=0;i<c;i++)
   {
    var v = a[i].innerHTML;
    regions_index[i] = v.toLowerCase();
   }
  
  
  function region_search(s)
   {
    var d = region_list.getElementsByTagName('div');
    var l = d.length;
    if(s!='')
     {
      s = s.toLowerCase();
      var t = s.length;
      for(var i=0;i<l;i++)
       {
        var v = regions_index[i];
        if((v==s)||(v.substr(0,t)==s))
         {
          d[i].style.display = 'block';
         }
        else
         {
          d[i].style.display = 'none';
         }
       }
     }
    else
     {
      for(var i=0;i<l;i++)
       {
        d[i].style.display = 'block';
       }
     }
   }
  
  region_search('');
  
  
  function iframe_height(w,speed)
   {
    if(window.iwt)
     {
      clearTimeout(window.iwt);
     }
    window.iwt = setTimeout(function()
     {
      var d = document.querySelector('#'+uniq_id);
      if(!d)
       {
        return false;
       }
      var e = d.querySelector('#'+uniq_id+'hide_block');
      if(w=='full')
       {
        d.style.height = '100%';
        e.style.bottom = '0';
       }
      else if(w=='normal')
       {
        d.style.height = '60px';
        e.style.bottom = 'auto';
       }
     },speed);
   }
  
  
  function prices_show(fn)
   {
    settings_close();
    ajax_search('',1);
    document.querySelector('#'+uniq_id+'bar_menu').setAttribute('class',uniq_id+'o');
    document.querySelector('#'+uniq_id+'bar_search input').blur();
    document.querySelector('#'+uniq_id+'prices_block').setAttribute('class',uniq_id+'o');
    iframe_height('full',0);
    if(fn)
     {
      setTimeout(function(){fn();},200);
     }
   }
  
  
  function prices_close()
   {
    ajax_search('',1);
    region_close();
    document.querySelector('#'+uniq_id+'bar_menu').removeAttribute('class');
    document.querySelector('#'+uniq_id+'prices_block').removeAttribute('class');
    iframe_height('normal',200);
    hover_event();
   }
  
  
  function hover_event()
   {
    db_get('cd',function(s)
     {
      if(typeof s!='object')
       {
        var s = {};
       }
      
      var domen = document.location.host.split('.').slice(-2).join('.');
      if((typeof s[domen]=='undefined')||(s[domen]+86400<time()))
       {
        if(typeof s[domen]!='undefined')
         {
          delete s[domen];
         }
        
        document.querySelector('#'+uniq_id+'bar').addEventListener('mouseover',barhover);
       }
     });
   }
  function unhover_event()
   {
    document.querySelector('#'+uniq_id+'bar').removeEventListener('mouseover',barhover);
   }
  hover_event();
  
  
  function region_show(fn)
   {
    document.querySelector('#'+uniq_id+'regions').setAttribute('class',uniq_id+'o');
    var e = document.querySelector('#'+uniq_id+'select_region').getElementsByTagName('a')[0];
    e.parentNode.scrollIntoView(false);
    if(fn)
     {
      setTimeout(function(){fn();},200);
     }
   }
  
  
  var region_noauto = document.querySelector('#'+uniq_id+'bar').getAttribute('data-geoid');
  
  
  function region_close(e)
   {
    document.querySelector('#'+uniq_id+'regions').removeAttribute('class');
    if(e)
     {
      document.querySelector('#'+uniq_id+'select_region').removeAttribute('id');
      e.parentNode.setAttribute('id',uniq_id+'select_region');
      document.querySelector('#'+uniq_id+'region_name').getElementsByTagName('a')[0].innerHTML = e.innerHTML;
      document.querySelector('#'+uniq_id+'region_name2').innerHTML = e.innerHTML;
      document.querySelector('#'+uniq_id+'region_name3').innerHTML = 'г.'+e.innerHTML;
      var id = e.getAttribute('data-id');
      db_set('geo_id',id);
      region_noauto = id;
      document.querySelector('#'+uniq_id+'region_auto').checked = false;
     }
   }
  
  
  function settings_show()
   {
    prices_close();
    ajax_search('',1);
    document.querySelector('#'+uniq_id+'bar_settings').setAttribute('class',uniq_id+'o');
    document.querySelector('#'+uniq_id+'settings').setAttribute('class',uniq_id+'o');
    iframe_height('full',0);
   }
  
  
  function settings_close()
   {
    document.querySelector('#'+uniq_id+'bar_settings').removeAttribute('class');
    document.querySelector('#'+uniq_id+'settings').removeAttribute('class');
    iframe_height('normal',2000);
   }
  
  
  document.querySelector('#'+uniq_id+'bar_settings').addEventListener('click',function()
   {
    if(this.getAttribute('class')==uniq_id+'o')
     {
      settings_close();
     }
    else
     {
      settings_show();
     }
   });
  
  
  ext_showed = true;
  var a = document.querySelector('#'+uniq_id);
  if(a)
   {
    a.parentNode.style.height = '55px';
    a.style.top = '0';
    if(google)
     {
      var d = document.querySelector('#viewport');
      if(d)
       {
        d.style.transition = 'top 0.4s ease';
        d.style.top = '55px';
       }
      else
       {
        var d = document.querySelector('#searchform');
        if(d)
         {
          d.style.transition = 'top 0.4s ease';
          d.style.top = '70px';
         }
       }
     }
    else if(yandex)
     {
      a.parentNode.style.height = '55px';
     }
   }
 }


