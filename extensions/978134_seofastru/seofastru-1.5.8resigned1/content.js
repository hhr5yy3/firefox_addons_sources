var version_ex = "1.1.7";
var host_view = window.location.host;

function create(htmlStr){
    var
		frag = document.createDocumentFragment(),
		temp = document.createElement('div'),
        cleanHTML = DOMPurify.sanitize(htmlStr, {ADD_TAGS: ['link'], ADD_ATTR: ['target']});
    cleanHTML = document.createRange().createContextualFragment(htmlStr);
    while (cleanHTML.firstChild) {
        frag.appendChild(cleanHTML.firstChild);
    }
    return frag;

}
// Просмотр рекламы
function click_direct_trans2(key, id){
	var xhr_c = new XMLHttpRequest();
	xhr_c.open("GET", "https://seo-fast.ru/site_expansion/confirm_view.php?sf=direct_trans2&key="+key+"&id="+id+"", true);
	xhr_c.onreadystatechange = function(){
		if (xhr_c.readyState == 4){
			if(xhr_c.status === 200){
				var resp_c = JSON.parse(xhr_c.responseText);
				if(resp_c.success){
					window.open(resp_c.url);
				}else if(resp_c.error){
					alert(resp_c.text);
				}else if(resp_c.off){
					
				}else{
					alert('Ошибка');
				}
				$('[id="wrap_sf_teaser"]').remove();
			}else{
				console.log(xhr_c.status+" "+xhr_c.statusText+" "+xhr_c.responseText);	
			}
		}
		localStorage.removeItem('id_adv_ex');
		localStorage.removeItem('type_t');
		localStorage.removeItem('content_create');
	}
	xhr_c.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr_c.send();
}
function click_confirm(key, id){
	var xhr_p = new XMLHttpRequest();
	xhr_p.open("GET", "https://seo-fast.ru/site_expansion/confirm_view.php?sf=confirm_views_r&key="+key+"&id="+id+"", true);
	xhr_p.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr_p.send();
	/*
	$('[id="wrap_sf_teaser"]').remove();
	localStorage.removeItem('id_adv_ex');
	localStorage.removeItem('type_t');
	localStorage.removeItem('content_create');
	*/
}
function click_confirm2(key, id){
	var xhr_c = new XMLHttpRequest();
	xhr_c.open("GET", "https://seo-fast.ru/site_expansion/confirm_view.php?sf=confirm_views_r&key="+key+"&id="+id+"", true);
	xhr_c.onreadystatechange = function(){
		if (xhr_c.readyState == 4){
			if(xhr_c.status === 200){
				var resp_c = JSON.parse(xhr_c.responseText);
				console.log(resp_c);
				if(resp_c.success){
                    chrome.runtime.sendMessage({popup:resp_c.url});
				}else if(resp_c.error){
					alert(resp_c.text);
				}else{
					alert('Ошибка');
				}
				$('[id="wrap_sf_teaser"]').remove();
			}else{
				console.log(xhr_c.status+" "+xhr_c.statusText+" "+xhr_c.responseText);	
			}
		}
		localStorage.removeItem('id_adv_ex');
		localStorage.removeItem('type_t');
		localStorage.removeItem('content_create');
	}
	xhr_c.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr_c.send();
}
//Скрыть площадку
function hide_all(key, id){
	var xhr_h = new XMLHttpRequest();
		xhr_h.open("GET", "https://seo-fast.ru/site_expansion/confirm_view.php?sf=hide_all&key="+key+"&id="+id+"", true);
		xhr_h.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr_h.send();
	$('[id="wrap_sf_teaser"]').remove();
	localStorage.removeItem('id_adv_ex');
	localStorage.removeItem('type_t');
	localStorage.removeItem('content_create');
}
//Отправить жалобу
function complaint_ex(key, id, text){
	$.ajax({ type: 'POST', url: 'https://seo-fast.ru/site_expansion/ajax/ajax_all.php', data: { 'sf': 'comp', 'key' : key, 'id': id, 'titrek': '10', 'comptext': text }, success: function(data) { alert(data); } });
}
//Переход по ссылке
function direct_trans(key, id){
	var xhr_d = new XMLHttpRequest();
		xhr_d.open("GET", "https://seo-fast.ru/site_expansion/confirm_view.php?sf=direct_trans&key="+key+"&id="+id+"", true);
		xhr_d.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr_d.send();
};

var content = {
	key: null,
	id: null,
	state: true,
	state2: false,
	position_w: true,
	
	set_key: function()
	{
		chrome.runtime.sendMessage({get: 'last_key'}, function(time)
		{
			var cur_time = (new Date()).valueOf();

			time = time ? parseInt(time) : false;

			if( time + 1000*3600 < cur_time )
			{
				chrome.runtime.sendMessage({setkey:'true'});
				chrome.runtime.sendMessage({set: 'last_key', value: cur_time});
			}
 		});
		chrome.runtime.sendMessage({get:'key'},function(key)
		{
			if(key){
				content.key = key;
				content.checkstate();
			}else{
				content.new_key();
			}
 		});
	},
	new_key: function()
	{
		chrome.runtime.sendMessage({setkey:'true'},function(key)
		{
			if(key){
				content.key = key;
				content.checkstate();
			}
		});
	},
	checkstate:function()
	{
		chrome.runtime.sendMessage({get: "state"}, function(response){
			content.state = response;
			if( content.state !== 'false' ){
				content.check(); 
			}
		});
		chrome.runtime.sendMessage({get: "state2"}, function(response){
			content.state2 = response;
		});
		chrome.runtime.sendMessage({get: "position_w"}, function(response){
			if(response == null){ response = 'rb'; }
			content.position_w = response;
		});
	},
	check:function()
	{
		chrome.runtime.sendMessage({get: 'last_adv'}, function(time)
		{
			var cur_time = (new Date()).valueOf();
			time = time ? parseInt(time) : false;

			if(time + 1000*2 > cur_time) // менять на 30
			{
				$('[id="wrap_sf_teaser"]').remove();
				var content_create = localStorage.getItem('content_create');
				if(content_create){
					var id_adv_ex = localStorage.getItem('id_adv_ex');
					var type_t    = localStorage.getItem('type_t');
					var fragment  = create(content_create);
					document.body.insertBefore(fragment, document.body.childNodes[0]);
					
					// Просмотр рекламы
					if(type_t == 0){
						click_confirm(content.key, id_adv_ex);
						document.getElementById('direct_trans2').onclick = function(){
							click_direct_trans2(content.key, id_adv_ex);
						};
					}else if(type_t == 1){
						document.getElementById('confirm2').onclick = function(){
							click_confirm2(content.key, id_adv_ex);
						};
					}
						
					//Скрыть площадку
					document.getElementById('hide_all').onclick = function(){
						hide_all(content.key, id_adv_ex);
					};
					//Открыть меню с жалобой
					document.getElementById('menu_ex').onclick = function(){	
						document.getElementById('text_info_ex').style.display = '';
					};
					//Отправить жалобу
					document.getElementById('complaint_ex').onclick = function(){
						complaint_ex(content.key, id_adv_ex, document.getElementById('comp_text_ex').value);
					};
					//Переход по ссылке
					document.getElementById('direct_trans').onclick = function(){
						direct_trans(content.key, id_adv_ex);
					};
				}				
				return;
			}

			chrome.runtime.sendMessage({set: 'last_adv', value: cur_time});

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://seo-fast.ru/site_expansion/check_advertising_f.php?key="+content.key+"&host_view="+host_view+"&r="+Math.random(), true);
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4){
                    if(xhr.status === 200){
                        if(xhr.responseText.trim()){
                            var resp = JSON.parse(xhr.responseText);
                            if( resp.success ){
                                if(resp.id){
                                    //Проверяем версию
                                    if(resp.version_ex == version_ex){
                                        content.id = resp.id;// вытаскиваем ID объявления
                                        content.style_frame = resp.style_frame;// передаём стили
                                        content.run();
                                    }
                                }
                            }else if(resp.error){
                                console.log('Ошибка: '+resp.result);
                            }else{
                                console.log('Ошибка: '+resp); // Причины
                            }
                        }else{
                            console.log('Ошибка: trim');
                        }
                    }else{
                        console.log(xhr.status+" "+xhr.statusText+" "+xhr.responseText+" "+xhr.readyState);
                    }
                }
            }
            xhr.send();
		});
	},
	run:function(){
		var id_adv_ex = content.id;
		localStorage.setItem('id_adv_ex', id_adv_ex);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://seo-fast.ru/site_expansion/get.php?key="+content.key+"&id="+id_adv_ex+"", true);
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				if(xhr.status === 200){
					var resp = JSON.parse(xhr.responseText);
					if( resp.success ){

						var f_div = {"lt" : " top: 0; left: 0; ", "lb" : " left: 0; bottom: 0; ", "rt" : " top: 0; right: 0; ", "rb" : " right: 0; bottom: 0; " };
						var position_w = content.position_w;

						$('[id="wrap_sf_teaser"]').remove();

						var content_create = 		
						'<div id="wrap_sf_teaser"><style>#frame_div{ z-index: 2147483648; position: fixed; margin: 0; padding: 0; text-align: left;'+f_div[position_w]+'}</style>'+
						'<div id="frame_div" >'+resp.style_frame+'<div id="frame_frm" >'+resp.content+'</div></div></div>'
						;

						localStorage.setItem('content_create', content_create);
						var fragment = create(content_create);

						document.body.insertBefore(fragment, document.body.childNodes[0]);
						localStorage.setItem('type_t', resp.type_t);
						// Просмотр рекламы
						if(resp.type_t == 0){
							click_confirm(content.key, id_adv_ex);
							document.getElementById('direct_trans2').onclick = function(){
								click_direct_trans2(content.key, id_adv_ex);
							};
						}else if(resp.type_t == 1){
							document.getElementById('confirm2').onclick = function(){
								click_confirm2(content.key, id_adv_ex);
							};
						}
						//Переход по ссылке
						document.getElementById('direct_trans').onclick = function(){
							direct_trans(content.key, id_adv_ex);
						};
						//Скрыть площадку
						document.getElementById('hide_all').onclick = function(){
							hide_all(content.key, id_adv_ex);
						};
						//Открыть меню с жалобой
						document.getElementById('menu_ex').onclick = function(){	
							document.getElementById('text_info_ex').style.display = '';
						};
						//Отправить жалобу
						document.getElementById('complaint_ex').onclick = function(){
							complaint_ex(content.key, id_adv_ex, document.getElementById('comp_text_ex').value);
						};
					}else{
						localStorage.removeItem('id_adv_ex');
						localStorage.removeItem('type_t');
						localStorage.removeItem('content_create');
					}
				}else{
					localStorage.removeItem('id_adv_ex');
					localStorage.removeItem('type_t');
					console.log(xhr.status+" "+xhr.statusText+" "+xhr.responseText);	
				}
			}
		}
		xhr.send();
	},
};
content.set_key();
$(window).focus(function() {
	content.set_key();
});