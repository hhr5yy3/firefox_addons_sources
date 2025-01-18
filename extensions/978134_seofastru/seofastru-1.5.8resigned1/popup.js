var version_ex = "1.1.7";
var show_a, show_t, location_a;

var popup = {
	
	key: null,
	set_key: function()
	{
		chrome.runtime.sendMessage({setkey:'true'},function(key)
		{
			if( key ){
				popup.key = key;
				popup.online_e();
				popup.init();
			}else{
				popup.guest();
			}
		});
	},
	online_e: function()
	{
		chrome.runtime.sendMessage({get: "state"}, function(response){
			if( response !== 'false' ){ 
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "https://seo-fast.ru/ajax/ajax_online.php?key="+popup.key+"&sf=online_us&site_expansion=1", true);
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				xhr.send();
			}
		});
	},
	init: function()
	{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://seo-fast.ru/site_expansion/userdata.php?key="+popup.key+"", true);
		xhr.onreadystatechange = function() 
		{
			if( xhr.readyState === 4 )
			{
				if(xhr.status === 200){
					var resp = JSON.parse(xhr.responseText);
					console.log(resp);
					if( resp.error ) { popup.guest(); }
					
					if( resp.success )
					{
						document.getElementById("loader").style.display = "none";
						document.getElementById("auth").style.display = "block";
						
						if(resp.version_ex != version_ex){
                            document.getElementById('auth').appendChild(document.createRange().createContextualFragment(DOMPurify.sanitize(resp.version_eh, {ADD_ATTR: ['target']})));
							return false;
						}else{
                            document.getElementById('all_echo').appendChild(document.createRange().createContextualFragment(DOMPurify.sanitize(resp.all_echo, {ADD_ATTR: ['target']})));
						}
					}
				}else{
					console.log(xhr.status);	
				}
			}
		}
		xhr.send();
	},
	showing: function()
	{
		var p = this;
		chrome.runtime.sendMessage({get:"state"},function(v)
		{
			if( v === 'false' ){ show_a = 1; p.ext_on(); }else{ show_a = 0; p.ext_off(); }
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {set:'state',value: v==='false'?"true":"false"});
			});
			var ex = new XMLHttpRequest();
			ex.open("GET", "https://seo-fast.ru/site_expansion/ajax/ajax_all.php?key="+popup.key+"&sf=settings_ex&show_a="+show_a, true);
			ex.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			ex.send();
		});
	},
	ext_on: function()
	{
		document.getElementById("incl").style.display = "inline-block";
		document.getElementById("turn").style.display = "none";
		chrome.runtime.sendMessage({set:"state",value:true});
	},
	ext_off: function()
	{
		document.getElementById("incl").style.display = "none";
		document.getElementById("turn").style.display = "inline-block";
		chrome.runtime.sendMessage({set:"state",value:false});
	},
	showing2: function()
	{
		var p = this;
		chrome.runtime.sendMessage({get:"state2"},function(v)
		{
			if( v === 'false' ){ show_t = 0; p.ext_on2(); }else{ show_t = 1; p.ext_off2(); }
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {set:'state2',value: v==='false'?"true":"false"});
			});
			var ex = new XMLHttpRequest();
			ex.open("GET", "https://seo-fast.ru/site_expansion/ajax/ajax_all.php?key="+popup.key+"&sf=settings_ex&show_t="+show_t, true);
			ex.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			ex.send();
		});
	},
	ext_on2: function()
	{
		document.getElementById("incl2").style.display = "inline-block";
		document.getElementById("turn2").style.display = "none";
		chrome.runtime.sendMessage({set:"state2",value:true});
	},
	ext_off2: function()
	{
		document.getElementById("incl2").style.display = "none";
		document.getElementById("turn2").style.display = "inline-block";
		chrome.runtime.sendMessage({set:"state2",value:false});
	},
	
	guest: function()
	{
		document.getElementById("auth").style.display = "none";
		document.getElementById("loader").style.display = "none";
		document.getElementById("noauth").style.display = "block";
	},
};
popup.set_key();

document.addEventListener("DOMContentLoaded", function(event)
{
	document.getElementById('inclturn').onclick = function(){ popup.showing(); };
	document.getElementById('inclturn2').onclick = function(){ popup.showing2(); };
	document.getElementById('position_window').onclick = function(){

		var select = document.getElementById('position_window');
		var str = select.options[select.selectedIndex].value;
		
		if(str === 'lt')     { chrome.runtime.sendMessage({set:"position_w",value: 'lt'}); }
		else if(str === 'lb'){ chrome.runtime.sendMessage({set:"position_w",value: 'lb'}); }
		else if(str === 'rt'){ chrome.runtime.sendMessage({set:"position_w",value: 'rt'}); }
		else if(str === 'rb'){ chrome.runtime.sendMessage({set:"position_w",value: 'rb'}); }
		else { return false; }
		var ex = new XMLHttpRequest();
		ex.open("GET", "https://seo-fast.ru/site_expansion/ajax/ajax_all.php?key="+popup.key+"&sf=settings_ex&position_w="+str, true);
		ex.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		ex.send();
	}
	chrome.runtime.sendMessage({get:"state"},function(v)
	{
		if( v === 'false' ){
			document.getElementById("incl").style.display = "none";
			document.getElementById("turn").style.display = "inline-block";
		}else{
			document.getElementById("incl").style.display = "inline-block";
			document.getElementById("turn").style.display = "none";
		}
	});
	chrome.runtime.sendMessage({get:"state2"},function(v)
	{
		if( v === 'false' ){
			document.getElementById("incl2").style.display = "none";
			document.getElementById("turn2").style.display = "inline-block";
		}else{
			document.getElementById("incl2").style.display = "inline-block";
			document.getElementById("turn2").style.display = "none";
		}
	});
	chrome.runtime.sendMessage({get:"position_w"},function(v){ document.getElementById('position_window').value = v; });
});