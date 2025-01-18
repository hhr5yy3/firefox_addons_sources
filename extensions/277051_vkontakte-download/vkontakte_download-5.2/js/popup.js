(function(){
	
var ext_url="https://addons.mozilla.org/ru/firefox/addon/vkontakte-download/";	
var doc = window.document;

function get_hash()
{
	var page="main";
	var hash=window.location.hash.substr(1);
	if (hash!="")
	{
		page=hash;
	}
	show_page(page);
}
function show_page(page)
{
	var active = doc.querySelectorAll(".screen.active");
	{
		for (var a = 0; a < active.length; a++) 
		{
			active[a].classList.remove('active');
		}
	}
	var page_active=doc.getElementById(''+page+'');
	if (page_active)
	{		
		
		page_active.classList.add('active');
	}
	else
	{
		var page_active=doc.getElementById('main');
		if (page_active)
		{		
			page_active.classList.add('active');
		}
	}
}
window.addEventListener("hashchange", function (e) {
	get_hash();
}, false);

window.addEventListener("DOMContentLoaded",function() {
	get_hash();	
	var close_pop=doc.querySelectorAll('.close_btn') || null; 
	if (close_pop)
	{
		for (var a = 0; a < close_pop.length; a++) 
		{
			close_pop[a].addEventListener('click', function(e) {
				window.close();
			});
		}		
	}
	var open_vk=doc.querySelector('#open_vk') || null; 
	if (open_vk)
	{
		open_vk.addEventListener('click', function(e) {
			chrome.tabs.create({url: "https://vk.com/", active: true}, function(){});
		});
	}
	var rating=doc.querySelector('#popup_rating') || null; 
	if (rating)
	{
		rating.addEventListener('click', function(e) {
			chrome.tabs.create({url: ext_url, active: true}, function(){});
		});
	}
	var info=doc.querySelector('#popup_info') || null; 
	if (info)
	{
		info.addEventListener('click', function(e) {
			show_page("info");
		});
	}
	var stat_file=doc.querySelector('#DownloadFileOK') || null; 
	if (stat_file)
	{
		stat_file.textContent=localStorage['DownloadFileOK'];
	}
	var stat_size=doc.querySelector('#GetSize') || null; 
	if (stat_size)
	{
		stat_size.textContent=localStorage['GetSize'];
	}
	var OptDisableShelf=doc.querySelector('#OptDisableShelf') || null; 
	if (OptDisableShelf)
	{
		if(localStorage['OptDisableShelf']=="true")
		{
			var switcher=OptDisableShelf.querySelector('.switcher') || null; 
			if (switcher)
			{
				switcher.classList.add('active');
			}
		}
		OptDisableShelf.addEventListener('click', function(e) {
			set_checkbox(this, e, 'OptDisableShelf');
		});
	}
	var AudioAutoScrool=doc.querySelector('#AudioAutoScrool') || null; 
	if (AudioAutoScrool)
	{
		if(localStorage['AudioAutoScrool']=="true")
		{
			var switcher=AudioAutoScrool.querySelector('.switcher') || null; 
			if (switcher)
			{
				switcher.classList.add('active');
			}
		}
		AudioAutoScrool.addEventListener('click', function(e) {
			set_checkbox(this, e, 'AudioAutoScrool');
		});
	}
	var AudioPremiumBlock=doc.querySelector('#AudioPremiumBlock') || null; 
	if (AudioPremiumBlock)
	{
		if(localStorage['AudioPremiumBlock']=="true")
		{
			var switcher=AudioPremiumBlock.querySelector('.switcher') || null; 
			if (switcher)
			{
				switcher.classList.add('active');
			}
		}
		AudioPremiumBlock.addEventListener('click', function(e) {
			set_checkbox(this, e, 'AudioPremiumBlock');
		});
	}
	function set_checkbox(el, e, storage)
	{
		e.stopPropagation();					
		e.preventDefault();
		var switcher=el.querySelector('.switcher') || null; 
		if (switcher)
		{
			if (switcher.classList.contains('active'))
			{
				switcher.classList.remove('active');
				localStorage[storage]=false;
				
			}
			else
			{
				switcher.classList.add('active');
				localStorage[storage]=true;
			}
		}
	}
}, false);

})();