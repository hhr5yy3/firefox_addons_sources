var bg = browser.extension.getBackgroundPage();

var language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
console.log(language);
switch(language) {
  case 'es':
    country_code = 'es';
    break;
  case 'es-ES':
    country_code = 'es';
    break;
  case 'es-MX':
    country_code = 'mx';
    break;
  case 'it':
    country_code = 'it';
    break;
  case 'it-IT':
    country_code = 'it';
    break;
  case 'pt':
    country_code = 'pt';
    break;
  case 'pt-PT':
    country_code = 'pt';
    break;
  case 'pt-BR':
    country_code = 'br';
    break;
  case 'es-US':
    country_code = 'us';
    break;
  case 'en-US':
    country_code = 'us';
    break;
  default:
    country_code = 'us';
    language = 'es-US';
}

var country = "https://" + country_code + ".beruby.com";

function is_login(){
	if(bg.accept_cookies()){
	  	var data = $.getJSON( country + "/account/is_logged_in_ext", function(){})
		.done(function() {
			var user = data.responseJSON;
			if(user.logged){
				bg.set_user_data(user);
				var content ='<ul id="beruby-header-list"><li class="beruby-header-item"><a href="#" id="user-profile"><span>' + user.user_name + '</span><img id="avatar" class="avatar-img" src="' + user.avatar + '"></a></li>' +
				'<li class="beruby-header-item"><a href="#" id="user-balance-link"><span>' + user.total_balance + '</span><i aria-hidden="true" class="beruby-fa fa-coins"></i></a></li></ul>';
				var html_safe = DOMPurify.sanitize(content, { SAFE_FOR_JQUERY: true });
				$('#user-account').html(html_safe);
				$('#user-account').removeClass('unlogged');
				$('#user-profile').click( function() {
				    browser.tabs.create({ url: country + "/users/profile" });
				});
				$('#user-balance-link').click( function() {
				    browser.tabs.create({ url: country + "/users/balance" });
				});
				user_balance();
			} else {
				bg.remove_user_data();
				$('#user-account').addClass('unlogged');
				$('#btn-login').click( function() {
			        browser.tabs.create({ url: country + "/account/sign_on"});
			    });
			}

		})
		.fail(function() {})
		.always(function() {});	
	} else {
		$('#user-account').addClass('unlogged');
		$('#btn-login').click( function() {
	        browser.tabs.create({ url: country + "/account/sign_on"});
	    });
	}
}

function user_balance(){
	var user = bg.get_user_data();
	$('#direct_estimated').text(user.direct_estimated);
	$('#direct_amount').text(user.direct_amount);
	$('#direct_total').text(user.direct_total);
	$('#network_estimated').text(user.network_estimated);
	$('#network_amount').text(user.network_amount);
	$('#network_total').text(user.network_total);
	$('#total_estimated').text(user.total_estimated);
	$('#total_amount').text(user.total_amount);
	$('#total_balance').text(user.total_balance);
	$('#avatar').attr('src', user.avatar);
}

function beruby_logo() {
    var logo = document.getElementById('beruby-logo');
    logo.addEventListener('click', function() {
        browser.tabs.create({ url: country + "" });
        window.close();
    });
}

function footer_links(){
	$('.footer-link').on('click', function(e){
		e.preventDefault();
		var listItems = $("#beruby-footer-list li");
		listItems.each(function(i) {
			a = $(this).find('a');
		    if (a.hasClass('active')){
		    	a.removeClass('active');
		    	id = '' + a.attr('href');
		    	$(id).addClass('d-none');
		    }
		});
		$(this).addClass('active');
		a = '' + $(this).attr('href');
		$(a).removeClass('d-none');
		$('#searcher-container').addClass('d-none');
		$(a).scrollTop(0);
	});
};

function searcher(){
	$('#search').click(function(){
		var q = $('#q').val();
		var advertisers = bg.searcher(q);
		$('#search-results').remove();
		if (advertisers != null && advertisers.length >= 1){
			var results = document.createElement('div');
			results.setAttribute("id", "search-results");
			$('#searcher-container').append(DOMPurify.sanitize(results, { SAFE_FOR_JQUERY: true }));
			var search_safe = DOMPurify.sanitize(`<h1>${$.t('search.results')} ${q}</h1>`, { SAFE_FOR_JQUERY: true });
			$('#search-results').append(search_safe);
			for (var i = 0; i < advertisers.length; i++) {
				var badge = html_for_advertisers(advertisers[i].id, advertisers[i].name, advertisers[i].image_path, advertisers[i].cashback, advertisers[i].cashback_url);
				$('#search-results').append(badge);
			}
			add_listener_to_new_advertisers();
		} else {
			$('#searcher-container').append($.t('search.store_not_found'));
		}
		$('#advertisers').addClass('d-none');
		$('#categories').addClass('d-none');
		$('#user-balance').addClass('d-none');
		$('#searcher-container').removeClass('d-none');
	})
}

function html_for_advertisers(id, name, image_path, payment, url){
	var badge = '<a href="#" class="badge"><div class="vip-widget">' +
    '<div class="vip-widget-img"><img src="' + country + image_path + '" style="background: #fff; border-radius: 15px;"></div>' +
    '<div class="vip-widget-description"><h3>' + name + '</h3><div class="text-commission"><p>' + payment.toLowerCase() + '</p></div></div></div>' + 
    '<input type="hidden" name="advertiser" value="' + url + '"><input type="hidden" name="advertiser_id" value="' + id + '"></a>';
	return DOMPurify.sanitize(badge, { SAFE_FOR_JQUERY: true });
}

function add_listener_to_new_advertisers(){
	document.querySelectorAll('.badge').forEach(item => {
	  item.addEventListener('click',function(){
	    var url = $(this).find("input[name='advertiser']").val();
	    var id = $(this).find("input[name='advertiser_id']").val();
	    url = bg.visit_from_popup(url,id);
	    browser.tabs.create({ url: url});
	    window.close();
	  });
	});
}

function insert_advertisers(widgets){
	if(widgets != null && widgets.length > 0){
		for (var i = 0; i < widgets.length; i++) {
			var badge = html_for_advertisers(widgets[i].id, widgets[i].name, widgets[i].image_path, widgets[i].cashback, widgets[i].cashback_url);
			$('#advertisers').append(badge);
		}
		add_listener_to_new_advertisers();
	}
}

function load_main_advertisers(){
	var widgets = bg.get_main_advertisers();
	if (widgets == undefined){
		bg.load_main_advertiser();
		widgets = bg.get_main_advertisers();
		insert_advertisers(widgets);
	} else {
		insert_advertisers(widgets);
	}
}

function add_listener_to_categories(){
	document.querySelectorAll('.category-item').forEach(item => {
	  item.addEventListener('click',function(){
	    advertisers_by_category(this);
	  });
	});
}

function advertisers_by_category(e){
	var category = $(e).attr('href').replace('#','');
	var category_name = $(e).text();
	widgets = bg.get_categories_by_name(category);
	if (widgets != null && widgets.length >= 1){
		var html_safe = DOMPurify.sanitize('', { SAFE_FOR_JQUERY: true });
		$('#categories').html(html_safe);
		for (var i = 0; i < widgets.length; i++) {
			var badge = html_for_advertisers(widgets[i].id, widgets[i].name, widgets[i].image_path, widgets[i].cashback, widgets[i].cashback_url);
			$('#categories').append(badge);
		}
		add_listener_to_new_advertisers();
	} else {
		var html_safe = DOMPurify.sanitize('', { SAFE_FOR_JQUERY: true });
		$('#categories').html(html_safe);
		$('#categories').append($.t('search.not_found'));
	}
	var categories_safe = DOMPurify.sanitize(`<div class="bycategory"><a href="#" id="back"><i class="beruby-fa fa-angle-left"></i></a><div class="by-category-text"><img class="category-img" src="${country}/images/categories/new_categories/${category}.png"><h1>${category_name}</h1></div></div>`, { SAFE_FOR_JQUERY: true });
	$('#categories').prepend(categories_safe);
	var back = document.getElementById('back');
  back.addEventListener('click', function() {
  	var html_safe = DOMPurify.sanitize('', { SAFE_FOR_JQUERY: true });
		$('#categories').html(html_safe);
  	$('#categories').prepend('<h1>' + $.t("categories_title") + '</h1>');
      load_categories();
  });
  $('#categories').scrollTop(0);
}

function load_categories(){
	var data = bg.get_categories();
	if(data != null && data.length > 0){
		var content = '';
		for (var i = 0; i < data.length; i++) {
			content += `<div class="category"><a class="category-item" href="#${data[i].key}"><img class="category-img" src="${country}/images/categories/new_categories/${data[i].key}.png"><h6>${data[i].value}</h6></a></div>`;
		}
		var html_safe = DOMPurify.sanitize(content, { SAFE_FOR_JQUERY: true });
		$('#categories').append(html_safe);
		add_listener_to_categories();
	}
}


window.onload = function(){
	is_login();
	footer_links();
	beruby_logo();
	if (!bg.accept_cookies()){
		$('#advertisers').css("display","none");
		$('#categories').css("display","none");
		$('#searcher-container').css("display","none");
		$('#user-balance').css("display","none");
		$('#beruby-footer-container').css("display","none");
		$('.accept-cookies').click(function(){
			bg.confirm_cookies();
			bg.load_main_advertiser();
			searcher();
			load_main_advertisers();
			setTimeout(function(){ location.reload(); }, 500);
		});
		$('.reject-cookies').click(function(){
			window.close();
		});
	} else {
		$('#advertisers').css("display","inherit");
		$('#categories').css("display","inherit");
		$('#searcher-container').css("display","inherit");
		$('#user-balance').css("display","flex");
		$('#beruby-footer-container').css("display","block");
		$('#policy-advise').css("display","none");
		load_main_advertisers();
		searcher();
		$('#categories-link').click(function(){
			if ($(this).hasClass('active')){
				var html_safe = DOMPurify.sanitize('', { SAFE_FOR_JQUERY: true });
				$('#categories').html(html_safe);
				$('#categories').prepend(DOMPurify.sanitize('<h1 data-i18n="categories_title"></h1>', { SAFE_FOR_JQUERY: true }));
				$('#categories').localize();
				load_categories();
			}
		});	
	}

	$('#beruby-close').click(function(){
		window.close();
	})
}
