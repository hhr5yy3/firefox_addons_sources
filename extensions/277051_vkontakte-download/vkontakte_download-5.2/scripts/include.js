// @name        Vkontakte Download
// @version    	5.2
// @date        16.12.2019
// @author      VkSaved
(function(){
var browser="mozilla";
var ext_url="https://addons.mozilla.org/ru/firefox/addon/vkontakte-download/";	

var audio_arr=new Array();
var download_file=new Array();
var download_parent={"par":"", "butt":"", "folder":"", "isartist":false, "stop":false};
var audio_count=0;
var downl_count=0;
var AudioPremiumBlock=false;
var AudioAutoScrool=false;
var doc = window.document;

function sendRequest(request, callback) 
{
    if (typeof request == 'string')
        request = {action: request};
		
	chrome.runtime.sendMessage(request, function(result){
		if (callback)
			callback(result);
	});
 
}
window.addEventListener("DOMContentLoaded",function() { 
	var host=window.document.location.host;	
	var href=window.document.location.href;
	if (/(vk|vkontakte)+\.[a-z]{2,6}/i.test(host))
	{		
		sendRequest({action: 'load_option', param: 'AudioAutoScrool'}, function(result) {AudioAutoScrool=result;});
		sendRequest({action: 'load_option', param: 'AudioPremiumBlock'}, function(result) { AudioPremiumBlock=result; });
		if (/widget_community\.php|widget_subscribe\.php|widget_recommended\.php|widget_groups\.php|video_ext\.php|widget_like\.php|frame\.php|notifier\.php|q_frame\.php/i.test(href)==false) 
		{							
			chrome.runtime.onMessage.addListener(function (request, sender, callback) {
				if (request.action == "vk_saved_download_changed") 
				{					
					if (request.id!=null && request.id!=0)
					{
						var el=doc.querySelector('.vk_save_audio[data-id="'+request.id+'"]') || null;
						if (el)
						{
							download_file[request.id]=request.did;
							download_result(el, "ok", request.did, true);
							var par=false;
							var butt="";							
							if (download_parent.par!="")
							{
								par=download_parent.par;								
								if (download_parent.butt!="")
								{
									butt=download_parent.butt;
								}
							}
							else
							{
								var par_div=search_par_div(el.parentNode);
								if (par_div)
								{
									par=par_div;
									
								}
							}
							if (par)
							{
								download_text_result(par, butt, '');
							}
						}
						
						var count=0;
						for (var key in download_file) 
						{
							count++;
						}
						if (count==25 || count==50 || count==100 || count==200 || count==300 || count==400 || count==500)
						{
							show_message("Вы скачали "+count+" треков с помощью Vkontakte Download", "", "Вы уже скачали "+count+" треков.  Вам понравилось расширение Vkontakte Download? Пожалуйста оставьте свой отзыв на странице расширения по ссылке ниже. Хорошего Вам настроения.", "Оставить Отзыв", ext_url);
						}
						download_all_files("", "", "", false);
					}
				}
				if (request.action == "vk_saved_download_process") 
				{					
					if (request.id!=null && request.id!=0)
					{
						
						download_process(request.id, request.did, request.percent);
					}
				}
				
			});
			sendRequest({action: 'download_list_load'}, function(result) {
				if (result)
				{
					download_file=new Array();
					for (var key in result) 
					{
						download_file[result[key]]=key;
					}
					console.log(download_file);
				}
			});
			window.setInterval(function(){
				audio_search_old();
			}, 1000);
		}				
	}
}, false);
function search_track(el)
{
	if (el=="") { el=doc; }
	var track=0;
	var downl=0;
	var err=0;
	var tnew=0;
	var audio=el.querySelectorAll('div.audio_row') || null; 
	if (audio)
	{
		track=audio.length;
		for (var d=0;d<audio.length;d++)
		{  		        
			if (!audio[d].hasAttribute('vk_audio_save'))
			{				
				audio[d].setAttribute('vk_audio_save', true);		
				var track_result=audio_add_link(audio[d]);
				if (track_result=="downl")
				{
					downl++;
				}	
				if (track_result=="err")
				{
					err++;
				}
				tnew++;				
			}
		}
	}
	return {"count":""+track+"", "downl":""+downl+"", "err":""+err+"", "tnew":""+tnew+""};
}
function audio_search_old()
{    	
	var folder="";
	var par=null;
	
	var search_but=doc.querySelectorAll('div.audio_pl_snippet2') || null; 
	if (search_but)
	{
		for (var b=0;b<search_but.length;b++)
		{	
			if (!search_but[b].hasAttribute('vk_audio_save_block'))
			{
				search_but[b].setAttribute('vk_audio_save_block', true);
				if (search_but[b].hasAttribute("data-title"))
				{
					folder=search_but[b].getAttribute("data-title");
				}
				var pl=0;
				var audio_all=search_but[b].querySelector('div.audio_pl_snippet__info_line') || null; 
				if (audio_all)
				{
					var tc=audio_all.textContent;
					if (tc!='')
					{				
						var search_all=tc.match(/([\d]+)/i);
						if (search_all && search_all.length > 1)
						{							
							pl=parseInt(search_all[1]);	
						}
					}
				}
				var action=search_but[b].querySelector('div.AudioPlaylistSnippet__actions, div.audio_pl_snippet__actions') || null; 
				if (action)
				{
					var track=search_track(search_but[b]);
					if (track.count!=0)
					{
						add_button_pl(action, search_but[b], folder, track, pl, false);
					}
				}
				var pl_list=search_but[b].querySelector('div.audio_pl_snippet__list') || null; 
				if (pl_list)
				{
					var wrap_oserve = new MutationObserver(function(mutations) {
						var track=search_track(search_but[b]);
						if (track.tnew!=0)
						{
							add_button_pl(action, search_but[b], folder, track, pl, false);
						}
					});
					
					wrap_oserve.observe(pl_list, {attributes: false, childList: true, characterData: false, subtree:false});
					pl_list.setAttribute('vk_audio_mutation', true);
				}	
			}				
		}
	}
	function check_audio_section(el, par, section, folder)
	{
		var track=search_track(el);
		if (track.count!=0)
		{
			if (folder!="")
			{
				add_button_pl(par, section, folder, track, 0, false);
			}
			else
			{
				var audio_h2=section.querySelector('div.audio_page__audio_rows') || null; 
				if (audio_h2)
				{ 
					add_button_pl(audio_h2, section, folder, track, 0, false);
				}
			}
		}
	}
	var audio_section=doc.querySelectorAll('div.audio_page_section_layout') || null; 
	if (audio_section)
	{ 
		for (var b=0;b<audio_section.length;b++)
		{	
			if (!audio_section[b].hasAttribute('vk_audio_save_block'))
			{
				audio_section[b].setAttribute('vk_audio_save_block', true);
				var button_inner="";
				var folder="";
				var par=audio_section[b].parentNode.parentNode.parentNode;
				var artist_playlist=par.querySelector('div.page_block_header_inner') || null; 
				if (artist_playlist)
				{
					var artist_div=artist_playlist.querySelector('a.ui_crumb[href^="/artist"]') || null; 
					if (artist_div)
					{
						folder=artist_div.textContent;
					}
					else
					{
						var artist_div=artist_playlist.querySelector('div.ui_crumb:last-child') || null; 
						if (artist_div)
						{
							folder=artist_div.textContent;
						}
					}
					button_inner=artist_div.parentNode;
				}
				var tabs=par.querySelector('ul.ui_tabs') || null; 
				if (tabs)
				{
					var tab_sel=tabs.querySelector('a.ui_tab_sel') || null; 
					if (tab_sel)
					{
						folder=tab_sel.textContent;
					}
				}
				var track=search_track(audio_section[b]);				
				if (button_inner=="")
				{
					var audio_h2=audio_section[b].querySelector('div.audio_page__audio_rows') || null; 
					if (audio_h2)
					{ 
						button_inner=audio_h2;
					}
				}
				if (button_inner!="")
				{
					add_button_pl(button_inner, audio_section[b], folder, track, 0, false);
				}
				var audio_rows=audio_section[b].querySelector('div.audio_page__audio_rows_list') || null; 
				if (audio_rows)
				{
					var section=audio_section[b];
					var wrap_oserve = new MutationObserver(function(mutations) {						
						check_audio_section(audio_rows, button_inner, section, folder);
						
					});
					wrap_oserve.observe(audio_rows, {attributes: false, childList: true, characterData: false, subtree:false});
					audio_rows.setAttribute('vk_audio_mutation', true);
				}
			
			}
		}
	}
	var audio_recoms=doc.querySelectorAll('div.audio_recoms_block') || null; 
	if (audio_recoms)
	{ 
		for (var b=0;b<audio_recoms.length;b++)
		{	
			if (!audio_recoms[b].hasAttribute('vk_audio_save_block'))
			{
				audio_recoms[b].setAttribute('vk_audio_save_block', true);
				var audio_h2=audio_recoms[b].querySelector('h2') || null; 
				if (audio_h2)
				{ 
					var title=audio_h2.textContent;					
					var track=search_track(audio_recoms[b]);
					if (track.count!=0)
					{
						add_button_pl(audio_h2, audio_recoms[b], title, track, 0, false);
					}
				}		
			}
		}
	}
	search_track(doc);
}
function decodeHtmlEntity(str)
{
	var str=str.replace(/&#(\d+);/g, function(match, dec) {
		var str=String.fromCharCode(dec);		
		return str;
	});
	return str;
}

function filename_correct(name)
{
	name=decodeHtmlEntity(name);
	name = name.replace(/&amp;/g, '&');
	
	//name = name.replace(/&amp;/g, 'and');
	//name = name.replace(/&(\w+);/g, '');
	
	var regex1 =  new RegExp('[\/:*?"<>|]', 'ig');
	name=name.replace(regex1, " ");
	
	name=name.trim();
	return name;
}

function track_premium(el, vis)
{
	var audio=doc.querySelectorAll('div.audio_row') || null; 
	if (audio)
	{
		for (var d=0;d<audio.length;d++)
		{  		        
			if (audio[d].classList.contains("audio_claimed"))
			{
				if (vis)
				{					
					audio[d].setAttribute("style","display: none;");
				}
				else
				{
					audio[d].setAttribute("style","");
				}
			}
		}
	}
}
function add_button_pl(el, par, folder, track, pl, is_artist)
{
	if ((el) && (!el.hasAttribute('vk_audio_save_butt')))
	{
		parent_clear();
		var folder=filename_correct(folder);
		el.setAttribute('vk_audio_save_butt',true);
		var div=create_dom('div', el, '', {"class":"vk_audio_save_all"}, '');
			create_dom('div', div, '', {"class":"vk_save_img"}, '');			
			create_dom('span', div, '', {"class":"vk_audio_save_all_text", "vksaved_tooltip":"Скачать все песни со страницы, выберите \n\r один  из вариантов сохранения.", "flow":"left"}, 'Скачать');
			var d1=create_dom('span', div, '', {"class":"vk_audio_save_all_text_main"}, '');
				create_dom('span', d1, '', {"class":"vk_audio_save_all_text_count", "vksaved_tooltip":"Количество скачанных и доступных треков. \n\r Прокрутите страницу вниз \n\r для загрузки ВСЕХ ТРЕКОВ"}, '');
				create_dom('span', d1, '', {"class":"vk_audio_save_all_text_err", "vksaved_tooltip":"Треки которые не возможно скачать. \n\r Платные или недоступные"}, '');
			
			var div1=create_dom('span', div, '', {"class":"vk_audio_save_all_div"}, '');
				var but=create_dom('span', div1, '', {"data-folder":""+folder+"", "data-action":"start", "data-artist":""+is_artist+""}, 'В папку \"'+folder+'\"');						
				var but1=create_dom('span', div1, '', {"data-folder":"", "data-action":"start", "data-artist":"false"}, 'В папку \"Музыка\"');
				var but3=create_dom('span', div1, '', {"data-folder":""}, '');
					create_dom('span', but3, '', {"class":"switch_text"}, 'Скрывать платные треки');
					var switch_h=create_dom('div', but3, '', {"class":"switch_hoder"}, '');
						var switcher=create_dom('label', switch_h, '', {"class":"switcher"}, '');
				var but4=create_dom('span', div1, '', {"data-folder":""}, '');
					create_dom('span', but4, '', {"class":"switch_text"}, 'Автопрокрутка страницы');
					var switch_h1=create_dom('div', but4, '', {"class":"switch_hoder"}, '');
						var switcher1=create_dom('label', switch_h1, '', {"class":"switcher"}, '');
				var but5=create_dom('span', div1, '', {"data-folder":""}, 'Информация по настройкам');	
				var but2=create_dom('span', div1, '', {"data-folder":""}, 'Настройки');
				if(AudioPremiumBlock)
				{
					switcher.classList.add('active');
				}
				if(AudioAutoScrool)
				{
					switcher1.classList.add('active');
				}
			buttn_text(div, '', track.count, track.downl, track.err, pl);
		but.addEventListener('click', function(e) {
			download_butt(this, par, e);
		});				
		but1.addEventListener('click', function(e) {
			download_butt(this, par, e);
		});
		but2.addEventListener('click', function(e) {
			sendRequest({action: "open_config"}, function(result) {});
		});
		but5.addEventListener('click', function(e) {
			sendRequest({action: "open_info"}, function(result) {});
		});
		but3.addEventListener('click', function(e) {
			e.stopPropagation();					
			e.preventDefault();
			var switcher=this.querySelector('.switcher') || null; 
			if (switcher)
			{
				if (switcher.classList.contains('active'))
				{
					switcher.classList.remove('active');
					AudioPremiumBlock=false;								
				}
				else
				{
					switcher.classList.add('active');				
					AudioPremiumBlock=true;		
				}
			}
			track_premium(par, AudioPremiumBlock);
			sendRequest({action: 'save_option', param:'AudioPremiumBlock', text: AudioPremiumBlock}, function(data) { 			});		
			
		});
		but4.addEventListener('click', function(e) {
			e.stopPropagation();					
			e.preventDefault();
			var switcher=this.querySelector('.switcher') || null; 
			if (switcher)
			{
				if (switcher.classList.contains('active'))
				{
					switcher.classList.remove('active');
					AudioAutoScrool=false;								
				}
				else
				{
					switcher.classList.add('active');				
					AudioAutoScrool=true;		
				}
			}
			sendRequest({action: 'save_option', param:'AudioAutoScrool', text: AudioAutoScrool}, function(data) { 			});		
		});
		function download_butt(el, par, e)
		{
			var butt=el.parentNode.parentNode;
			e.stopPropagation();					
			e.preventDefault();
			if (el.dataset.action=="start")
			{								
				download_parent.stop=false;
				download_all_files(par, butt, el.dataset.folder, el.dataset.artist);
				buttn_text(par, "Скачивание", 0, 0, 0, '');
				el.textContent="Остановить загрузку";
				el.dataset.action="stop";		
			}
			else if (el.dataset.action=="stop")
			{		
				buttn_text(par, "Остановка", 0, 0, 0, '');
				download_parent.stop=true;						
				el.textContent="Продолжить загрузку";
				el.dataset.action="start";
			}	
		}
	}
	else
	{
		download_text_result(par, el, '');
		//buttn_text(el, "Скачаттт", track.count, track.downl, track.err, pl);
	}
}

function download_text_result(par, butt, textprocc)
{
	if(par!='')
	{
		var text_load="";		
		var track_count=0;
		var track_downl=0;
		var track_err=0;
		var audio_all=par.querySelectorAll('div.vk_save_audio') || null; 
		if (audio_all)
		{
			track_count=parseInt(audio_all.length);			
			for (var t=0;t<audio_all.length;t++)
			{ 
				if (audio_all[t].hasAttribute('data-did'))
				{
					track_downl++;
				}
				if (audio_all[t].hasAttribute('data-err'))
				{
					track_err++;
				}
			}
		}	
	}
	if(butt!="")
	{
		buttn_text(butt, textprocc, track_count, track_downl, track_err, '');
	}
	else if(par!='')
	{
		var butt=par.querySelector('div.vk_audio_save_all') || null; 
		if (butt)
		{	
			buttn_text(butt, textprocc, track_count, track_downl, track_err, '');	
		}
	}
}
function buttn_text(butt, text_load, count, downl, err, pl)
{
	if (butt!='')
	{
		if (text_load!='')
		{
			var at=butt.querySelector('span.vk_audio_save_all_text') || null; 
			if (at)
			{
				at.textContent=text_load;			
			}
		}
		if (count!=0)
		{
			var result="";
			var result_err="";
			if (err!=0)
			{
				var count=count-err;
				result='Скачано '+downl+' из '+count+'';
				result_err=' ['+err+']';
			}
			else
			{
				result='Скачано '+downl+' из '+count+'';
			}
			if(pl>count)
			{
				var ab=butt.querySelector('span.vk_audio_save_all_text') || null; 
				if (ab)
				{
					ab.setAttribute('vksaved_tooltip','Не все треки отображаются. \n\r Прокрутите страницу вниз \n\r для загрузки ВСЕХ ТРЕКОВ.');	
				}
			}
			var atc=butt.querySelector('span.vk_audio_save_all_text_count') || null; 
			if (atc)
			{
				atc.textContent=result;
			}
			if (result_err!="")
			{
				var ate=butt.querySelector('span.vk_audio_save_all_text_err') || null; 
				if (ate)
				{
					ate.textContent=result_err;
				}
			}
		}
	}
}
function parent_clear()
{
	if (download_parent.butt!="")
	{
		buttn_text(download_parent.butt, "Остановлен", 0, 0, 0, '');
	}
	download_parent.par="";
	download_parent.butt="";
	download_parent.folder="";
	download_parent.isartist=false;
}
function download_all_files(par, butt, folder, isartist)
{
	if (download_parent.stop==true)
	{	
		parent_clear();
	}
	if (par!="")
	{
		download_parent.par=par;
		download_parent.butt=butt;
	}
	if(folder!="")
	{
		download_parent.folder=folder;
		download_parent.isartist=isartist;
	}
	if (download_parent.par!="")
	{		
		var audio=download_parent.par.querySelectorAll('div.vk_save_audio[not_download]') || null; 
		if (audio)
		{ 
			var not_download=audio.length;
			if (not_download==0)
			{
				parent_clear();
			}
			else 
			{
				sendRequest({action: 'load_option', param: 'AudioAutoScrool'}, function(result) {
					AudioAutoScrool=result;
					
				});
				
				if (not_download==2)
				{
					if (AudioAutoScrool)
					{
						audio[0].scrollIntoView({block: "start", inline: "center"});
					}
				}					
				if (!audio[0].dataset.cnt)
				{
					audio[0].dataset.cnt=1;					
				}
				else
				{				
					var cnt=parseInt(audio[0].dataset.cnt)+1;
					audio[0].dataset.cnt=cnt;
					if(cnt>2)
					{
						if (audio[0].hasAttribute("not_download"))
						{
							audio[0].removeAttribute("not_download");
						}
					}
				}
				get_size(audio[0], download_parent.folder, download_parent.isartist, true);
			}
		}
		else
		{
			parent_clear();
		}
	}
	else
	{
		parent_clear();
	}
}
function search_par_div(el)
{
	var result=false;
	if (el)
	{
		var butt=el.querySelector('div.vk_audio_save_all') || null; 
		if (butt)
		{
			result = el;
		}
		else
		{
			result = search_par_div(el.parentNode);
		}
	}
	return result;
}
function audio_add_link(el)
{
	var track_result="add";
	var div=create_dom('div', el, '', {"class":"vk_save_audio", "not_download":"true"}, '');
		var div1=create_dom('div', div, '', {"class":"vk_save_audio_but"}, '');
			create_dom('div', div1, '', {"class":"vk_save_img"}, '');
			create_dom('div', div1, '', {"class":"vk_save_size", "title":"Размер файла/Скачать песню"}, '');
			create_dom('div', div1, '', {"class":"vk_save_bitrate", "title":"Битрейт/Скачать песню"}, '');
	if (el.dataset.fullId)
	{
		if (el.classList.contains("audio_claimed"))
		{
			div.removeAttribute("not_download");
			div.setAttribute("data-err", "1");
			track_result="err";
			if(AudioPremiumBlock)
			{
				el.setAttribute("style","display: none;");
			}
		}
		var id=el.dataset.fullId.replace(/[_-]+/gi,"");
		div.dataset.id=id;
		if (download_file[id])
		{
			download_result(div, "ok", download_file[id], false);
			track_result="downl";
		}
	}
		
	div.addEventListener('mouseover', function(e) {
		if (!this.dataset.size)
		{
			get_size(this, "", false, false);
		}
	}, true);
	div.addEventListener('click', function(e) {
		e.stopImmediatePropagation();
		var el_class="";
		if (e.target.hasAttribute("class"))
		{
			el_class=e.target.getAttribute("class");
		}
		if (el_class!="vk_saved_otziv")
		{			
			e.preventDefault();
		}
		if (this.dataset.id)
		{
			var id=this.dataset.id;
			var folder="";
			if (e.target.dataset.folder)
			{
				folder=e.target.dataset.folder;
			}
			if(el_class=="vk_saved_download_file_open")
			{
				if (this.dataset.did)
				{				
					sendRequest({action: "vk_saved_open_file", id:this.dataset.did}, function(result) {});			
				}
			}
			else if (el_class=="vk_saved_download_file_show")
			{
				if (this.dataset.did)
				{
					if (this.dataset.did!="0")
					{
						sendRequest({action: "vk_saved_show_file", id:this.dataset.did}, function(result) {});		
					}
					else
					{
						e.target.textContent="Ошибка открытия папки";
					}
				}
			}
			else if (el_class=="vk_saved_otziv")
			{
			
			}
			else
			{
				
				if(!this.dataset.did)
				{				
					download(this, id, "", folder, false);	
				}
				else
				{
					var file_download = confirm("Вы уже скачивали данный трек, желаете скачать его ещё раз. /n/r/ Открыть расположение файла вы можете в контекстном меню.");
					if (file_download)
					{						
						download(this, id, "", folder, false);
					}
				}
			}				
		}
		else	
		{	
			get_size(this, "", false, true);
		}			
	}, true);
	return track_result;
}
function show_message(title, img, text, butt_text, butt_href)
{
	var body=doc.querySelector('body') || null; 
	if (body)
	{
		var popup=body.querySelector('.vk_saved_popup_back') || null; 
		if (popup)
		{
			popup.setAttribute("style", "display:block;");
			var div_tit=popup.querySelector('.vk_saved_popup_block_tit') || null; 
			if (div_tit)
			{
				div_tit.textContent=title;
			}
			var div_text=popup.querySelector('.vk_saved_popup_block_body_text') || null; 
			if (div_text)
			{
				div_text.textContent=text;
			}
			var div_but=popup.querySelector('.vk_saved_popup_block_body_button') || null; 
			if (div_but)
			{
				div_but.setAttribute("href", ""+butt_href+"");
				div_but.textContent=butt_text;
			}			
		}
		else
		{
			var div=create_dom('div', body, '', {"class":"vk_saved_popup_back"}, '');
				var div1=create_dom('div', div, '', {"class":"vk_saved_popup_block"}, '');
					var div2=create_dom('div', div1, '', {"class":"vk_saved_popup_block_title"}, '');
						var but=create_dom('div', div2, '', {"class":"vk_saved_popup_block_close", "title":"Закрыть"}, 'X');
						but.addEventListener('click', function(e) {
							e.stopImmediatePropagation();
							e.preventDefault();
							div.setAttribute("style","display:none;");
						});
						create_dom('div', div2, '', {"class":"vk_saved_popup_block_tit"}, title);
					var div3=create_dom('div', div1, '', {"class":"vk_saved_popup_block_body"}, '');
						create_dom('div', div3, '', {"class":"vk_saved_popup_block_body_text"}, text);
						var a=create_dom('a', div3, '', {"class":"vk_saved_popup_block_body_button", "href":""+butt_href+"", "target":"_blank"}, butt_text);
						a.addEventListener('click', function(e) {
							div.setAttribute("style","display:none;");
						});						
		}
	}			
}
function get_size(el, folder, isartist, downl)
{
	var par=el.parentNode;
	if(par.dataset.audio)
	{
		var data = JSON.parse(par.dataset.audio);
		var ids=data[1]+''+data[0];
		var id=ids.replace(/[_-]+/gi,"");
		if (!audio_arr[id])
		{
			var o=data[13];
			var track_addon= !~o.indexOf("///") ? "".concat(o.split("/")[2], "_").concat(o.split("//").pop().split("/")[0]) : "".concat(o.split("/")[2], "_").concat(o.split("///")[1].split("/")[0]);		
			var param=""+data[1]+"_"+data[0]+"_"+track_addon+"";
			var feat="";
			var artist1=data[4];								
			if (data[17] && data[17].length>0)
			{
				if (data[17][0].name!="")
				{
					artist1=data[17][0].name;
				}
				if (data[17].length>1)
				{
					var feat_art="";
					for (var f=1;f<data[17].length;f++)
					{ 
						var regex = new RegExp(data[17][f].name, 'i');
						if (regex.test(data[3])==false)
						{
							
							feat_art=feat_art+" "+data[17][f].name+",";
						}
					}
					if(feat_art!="")
					{
						feat_art=feat_art.substring(0, feat_art.length - 1);
						feat=" (feat."+feat_art+")";
					}
				}				
			}
			if (data[18] && data[18].length>0)
			{
				var feat_art="";
				for (var f=0;f<data[18].length;f++)
				{ 
					var regex =  new RegExp(data[18][f].name, 'i');
					if (regex.test(data[3])==false)
					{
						feat_art=feat_art+" "+data[18][f].name+",";
					}
				}
				if(feat_art!="")
				{
					feat_art=feat_art.substring(0, feat_art.length - 1);
					feat=" (feat."+feat_art+")";
				}
			}
			artist=filename_correct(artist1);
			var subtitle="";
			if (data[16]!="")
			{
				subtitle=" ("+data[16]+") ";
			}
			var song1=""+data[3]+""+subtitle+""+feat+"";
			song=filename_correct(song1);			
			audio_arr[id]= {"id":""+id+"", "artist":""+artist+"", "song":""+song+"", "url":"", "duration":""+data[5]+"", "bitrate":"0", "size":"0"};
			sendRequest({action: 'get_file', mod:"size", id:id, param: param}, function(file) {
				if (file.result)
				{		
					audio_arr[file.id].url=file.url;					
					audio_arr[file.id].size=file.size;
					var bitrate=((file.size * 8) / audio_arr[file.id].duration / 1000).toFixed();
					if(bitrate>=320)
					{
						bitrate = 320;
					}
					audio_arr[file.id].bitrate = bitrate;
					var el_div=doc.querySelector('.vk_save_audio[data-id="'+file.id+'"]') || null;
					if (el_div)
					{				
						set_size_bitrate(el_div, file.id);
						if(downl)
						{
							if (isartist=="true")
							{
								download(el_div, file.id, "", folder, true);
							}
							else
							{
								download(el_div, file.id, folder, "", true);
							}
						}
					}
										
				}
				else
				{
					if (file.id)
					{
						var el_div=doc.querySelector('.vk_save_audio[data-id="'+file.id+'"]') || null;
						if (el_div)
						{	
							set_size_bitrate(el_div, file.id);
							if(downl)
							{
								download_all_files("", "", "", false);				
							}
						}
					}
					
				}
				
			});
		}
		else
		{			
			/*if(!el.hasAttribute("data-size"))	
			{
				set_size_bitrate(el, id);
			}*/
			if(downl)
			{
				var id=el.dataset.id;
				if (isartist=="true")
				{
					download(el, id, "", folder, true);
				}
				else
				{
					download(el, id, folder, "", true);
				}
				
			}
		}
			
	}	
}

function set_size_bitrate(el, id)
{
	el.dataset.size="true";
	var bitrate=audio_arr[id].bitrate;
	var color="#ffb0b0";					
	if(bitrate>96 && bitrate<=192)
	{
		color="#ffd2b0";
	}
	else if(bitrate>192 && bitrate<=256)
	{
		color="#ffe6b0";
	}
	else if(bitrate>=256 && bitrate<320)
	{
		color="#ffffb0";
	}
	else if(bitrate>=320)
	{
		color="#cdffb0";
	}	
	if (audio_arr[id].size==0)
	{	
		download_result(el, "error", "", true);
	}
	else
	{
		var el_menu=el.querySelector('.vk_save_audio_menu') || null;
		if (!el_menu)
		{
			var div1=create_dom('span', el, '', {"class":"vk_save_audio_menu"}, '');
				create_dom('span', div1, '', {"data-folder":""+audio_arr[id].artist+""}, 'Скачать в папку \"'+audio_arr[id].artist+'\"');					
		}
		download_result(el, "size", "", true);

	}
	var div_size=el.querySelector('.vk_save_size') || null;
	if (div_size)
	{
		var size_mb = (audio_arr[id].size / 1048576.0).toFixed(1);
		div_size.textContent=size_mb+" Мб";
		el.classList.add("vk_size_ok");
		var el_bit=el.querySelector('.vk_save_bitrate') || null;
		if (el_bit)
		{
			el_bit.textContent=audio_arr[id].bitrate;
			el_bit.setAttribute("style","background-color:"+color+";");
		}							
	}
}
function download_err(id, auto)
{
	var el=doc.querySelector('.vk_save_audio[data-id="'+id+'"]') || null;
	if (el)
	{
		var count_err=0;
		if (!el.dataset.err)
		{
			el.dataset.err=count_err;
		}
		else
		{
			count_err=parseInt(el.dataset.err);						
			count_err++;
			if (count_err>=2)
			{
				if (el.hasAttribute("not_download"))
				{
					el.removeAttribute("not_download");
				}									
			}						
			el.setAttribute("data-err", ""+count_err+"");
		}
		download_result(el, "error", "", false);
	}
	if (auto)
	{
		download_all_files("", "", "", false);				
	}
}
function download_process(id, did, percent)
{
	var el=doc.querySelector('.vk_save_audio[data-id="'+id+'"]') || null;
	if (el)
	{		
		var circle=el.querySelector(".progress_circle") || null;
		if(circle)
		{
			if (percent < 0) { percent = 0;}
			if (percent > 100) { percent = 100;}
		
			var pct = ((100-percent)/100)*94.24;
			circle.setAttribute("style", "stroke-dashoffset: "+pct+"px;");
		}
		var progress_percent=el.querySelector(".progress_percent") || null;
		if(progress_percent)
		{
			progress_percent.setAttribute('data-pct',percent);
		}
	}
}
function download_result(el, res, did, downl)
{
	var div_but=el.querySelector('.vk_save_audio_but') || null;
	if (div_but)
	{	
		var div_load=el.querySelector('.vk_save_loading') || null;
		if (!div_load)
		{
			if (res!="size")
			{
				div_load=create_dom('div', div_but, '', {"class":"vk_save_loading"}, '');
			}
		}
		else
		{
			if (!el.dataset.did)
			{
				clear_html(div_load);				
				if (res=="size")
				{
					div_load.remove();
				}
			}
			if (res=="load" || res=="ok")
			{
				clear_html(div_load);
			}
			
		}
		if (res=="ok")
		{
			if (el.hasAttribute("not_download"))
			{
				el.removeAttribute("not_download");
			}
			
			create_dom('div', div_load, '', {"class":"vk_save_loading_ok"}, '');
			var el_menu=el.querySelector('.vk_save_audio_menu') || null;
			if (el_menu)
			{
				clear_html(el_menu);
			}
			else
			{
				var el_menu=create_dom('span', el, '', {"class":"vk_save_audio_menu"}, '');
			}
			if (downl)
			{
				el.dataset.did=did;
			}
			else
			{
				el.dataset.did="0";
			}
			create_dom('span', el_menu, '', {"class":"vk_saved_download_file_show"}, 'Показать скачанный файл в папке');
			//create_dom('span', el_menu, '', {"class":"vk_saved_download_file_open"}, 'Открыть скачанный файл');
			create_dom('a', el_menu, '', {"class":"vk_saved_otziv", "href":""+ext_url+"", "target":"_blank"}, 'Оставить отзыв');	
		}
		else if (res=="error")
		{
			if (!el.dataset.did)
			{
				if (el.hasAttribute("not_download"))
				{
					el.removeAttribute("not_download");
				}
				el.dataset.err=3;	
				create_dom('div', div_load, '', {"class":"vk_save_loading_err"}, '');
			}
		}
		else if (res=="load")
		{
			/*var dasharray = Math.PI*(15*2); 15-радиус
			console.log("("+dasharray+")");*/
			
			var div1=create_dom('div', div_load, '', {"class":"progress_percent", "data-pct":"0"}, '');
			const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("width", "36");//39
			svg.setAttribute("height", "36");//39
			const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			cir1.setAttribute("cx", "18");//20
			cir1.setAttribute("cy", "18");//19
			cir1.setAttribute("r", "15");//16
			cir1.setAttribute("fill", "transparent");
			cir1.setAttribute("stroke-dasharray", "94.24");  
			svg.appendChild(cir1);
			const cir2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			cir2.setAttribute("cx", "18");
			cir2.setAttribute("cy", "18");
			cir2.setAttribute("r", "15");
			cir2.setAttribute("fill", "transparent");
			cir2.setAttribute("stroke-dasharray", "94.24");
			cir2.setAttribute("style", "stroke-dashoffset: 94.24px");
			cir2.setAttribute("class", "progress_circle");
			svg.appendChild(cir2);
			div1.appendChild(svg);
			/*var div1=create_dom('div', div_load, '', {"class":"progress_percent", "data-pct":"0"}, '');
				
				var svg=create_dom('svg', div1, '', {"width":"40","height":"40","viewPort":"0 0 100 100","version":"1.1","xmlns":"http://www.w3.org/2000/svg"}, '');
					create_dom('circle', svg, '', {"r":"17","cx":"20","cy":"20","fill":"transparent","stroke-dasharray":"105.74","stroke-dashoffset":"0"}, '');
					create_dom('circle', svg, '', {"r":"17","cx":"20","cy":"20","fill":"transparent","stroke-dasharray":"105.74","stroke-dashoffset":"0","class":"progress_circle"}, '');
			//*
			var div1=create_dom('div', div_load, '', {"class":"lds-ripple"}, '');
				create_dom('div', div1, '', {}, '');
				create_dom('div', div1, '', {}, '');
				*/
		}
	}
}
function download(el, id, fp, fa, auto)
{
	if(audio_arr[id])
	{
		download_result(el, "load", "");
		if (audio_arr[id].url!="")
		{
			sendRequest({action: "vk_saved_download", id:id, url: audio_arr[id].url, artist: audio_arr[id].artist, song: audio_arr[id].song, fp: fp, fa:fa}, function(result) {
				if (typeof result.did === 'undefined')
				{
					download_err(result.id, auto); 
				}				
			});
		}
		else
		{
			download_err(id, auto);
		}
	}
	else
	{
		get_size(el, "", false, true);
	}
}
function create_dom(el, parent, before_el, attr, text)
{
	var new_dom = doc.createElement(''+el+'');
	for(var key in attr) 
	{
		new_dom.setAttribute(''+key+'', ''+attr[key]+'');
	}	
	if (text!='')
	{
		new_dom.textContent=text;
	}
	if (before_el!='')
	{
		parent.insertBefore(new_dom, before_el);
	}
	else
	{
		parent.appendChild(new_dom);
	}
	return new_dom;
}

function clear_html(node) 
{
    var children = node.childNodes;
	while(children.length) 
	{	
		node.removeChild(children[0]);
    }	
}
})();