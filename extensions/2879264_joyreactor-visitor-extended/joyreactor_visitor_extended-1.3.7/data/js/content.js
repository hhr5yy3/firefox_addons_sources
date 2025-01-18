const new_engine = window.location.href.split('/')[2].includes('joyreactor');
const NE = new_engine ? '_NE' : '';

const engine = (function() {
	if (typeof browser !== 'undefined') {
		return browser;
	}
	return chrome;
})();

var $this;

$.fn.Container = function(data, html) {
	if (html === undefined) {
		html = true;
	}
	var response = '';

	$(this).each(function() {
		var object = $(this);
		var nodehtml = '';
		var template = object.attr('ctemplate');

		if (template === undefined) {
			template = object.html();
			object.attr('ctemplate', template);
		}

		for (const key in data) {
			nodehtml += makeNode(template, key, data);
		}

		if (html === true) {
			response = nodehtml;
		} else {
			object.html(nodehtml);
		}
	});
	if (response.length) {
		return response;
	}
	return $(this);
}
function makeNode(template, key, collection) {
	const regex = /{{\s*([~\w\.\[\]\-]+)\s*}}/gm;
	template = template.replace(regex, function(str, varname) {	
		const varpath = varname.split('.');
		let fixed = getData(varpath, key, collection);
		if (undefined === fixed) {
			fixed = '';
		}
		return fixed;
	});
	return template;
}

function getData(path, key, collection, level) {
	if (undefined === path) {
		return undefined;
	}
	if (undefined === level) {
		level = 0;
	}
	if (path.length === level) {
		return collection;
	}

	if (0 === level) {
		switch(path[0]) {
			case '~key~':
				collection = key;
				break;
			case '~item~':
			case '~array~':
			case '~check~':
				if (undefined === collection) 
					return undefined;
				collection = collection[key];
				break;
			case '~collection~':
				break;
			default:
				collection = window[path[0]];
		}
	} else {
		if (undefined === collection) {
			return undefined;
		}
		switch (path[0]) {
			case '~key~':
				collection = collection[key];
				break;
			case '~check~':
				if (collection !== null) {
					if (typeof collection[path[level]] === 'boolean') {
						collection[path[level]] = collection[path[level]].toString();
					}
					
					var checkLevel = level;
					if (collection[path[level]] == path[++checkLevel]) {
						return path[++checkLevel];
					} else {
						collection = collection[path[level]];
					}
				}
				break;
			case '~array~':
				if (path.length-2 === level) {
					if (typeof collection[path[level]] == 'object') {
						if (Object.keys(collection[path[level]]).length) {
							var tp_level = level;
							collection = $('#'+path[++tp_level]).Container(collection[path[level]]);
							return collection;
						}
					} else {
						collection = undefined;
					}
				} else {
					collection = collection[path[level]];
				}
				break;
			default:
				collection = collection[path[level]];
		}
	}
	
	return getData(path, key, collection, ++level);
}

class JV {
	constructor() {
		$this = this;

		this.url = window.location.pathname.split('/');

		this.vars = {
			status: true,
			options: {},
			user: {},
			init: false
		};
		this.lists = {
			posts: {},
			unlock: [],
			viewed: {}
		};
	}
	async init() {
		// load templates. on load - we a ready
		$this.templates(function() {
			// messages handler
			$this.handler();

			// do not run if image
			// or user child pages
			if (!['pics', 'images'].includes($this.url[1]) && !['comments', 'friends', 'infriends', 'blocks'].includes($this.url[3])) {
				engine.runtime.connect();
			}
		});
	}
	handler() {
		engine.runtime.onMessage.addListener(async function(request) {
			switch (request.method) {
				case 'token':
					engine.runtime.sendMessage({method: 'token', action: 'set', data: await $this.token()});
					break;
				case 'options': // received options
					if ($this.vars.init)
						return false;

					$this.vars = request;

					// we are ready to user actions
					$this.userHandler();

					// if this is redirected or tag page on new design
					if (window.location.href.includes('JV=tag') || (new_engine && $('.tag-article [alt="Censorship"]').length)) {
						// try tag
						engine.runtime.sendMessage({method: 'tag', action: 'get', referrer: (new_engine ? window.location.href : document.referrer)});
					} else {
						// this is normal page
						$this.posts.get();
					}

					$this.vars.init = true;
					break;
				case 'tag':
					switch (request.action) {
						case 'set': // unlock tag page 
							if (new_engine) {
								if (request.data.articlePost) {
									//restore tag description
									const description = $this.posts.attributes(request.data.articlePost, true, 200);
									$('.tag-article [alt="Censorship"]').replaceWith(description[0], description[1]);
									//wrap long restored tag description
									let desc = $(description[0]);
									let wrap = function() {
										if (desc.height() >= 225) {
											desc.css("max-height", "150px");
											var expand = document.createElement('button');
											expand.classList.add('expandable-post-content');
											expand.textContent = 'развернуть ↓';
											expand.onclick = function() {
												desc.css("max-height", "100%");
												$(desc.parents()[0]).find('.expandable-post-content').remove();
											}
											desc.after(expand);
										}
									}
									wrap();
									$.each(desc.find('.expand-wrapper img.responsive, .expand-wrapper video'), function() {
										$(this).one(this.tagName == 'IMG' ? "load" : "loadeddata", function () {
											wrap();
										});
									});
								}
								$this.posts.get();
							} else {
								$this.tag.set(request, function() {
									$this.posts.get();
								});
								break;
							}
					}
					break;
				case 'posts':
					switch (request.action) {
						case 'set': // set visited
							$this.posts.set(request.data, function() {
								if ($this.vars.options.post_action_unread || $this.lists.unlock.length) {
									engine.runtime.sendMessage({method: 'posts', action: 'unlock', data: $this.lists.unlock});
								} else {
									$this.posts.pager();
								}
							});
							break;
						case 'unlock': // unlock censored
							$this.posts.unlock(request.data);
							break;
						case 'viewed': // post successfully marked as visited
							$this.posts.viewed(request.data);
							break;
					}
					break;
				case 'comments':
					switch (request.action) {
						case 'set':
							$this.comments.set(request.data);
							break;
					}
					break;
				case 'reload': // if optins changed - reload page
					window.location.reload();
					break;
			}
			return true;
		});
	}
	userHandler() {
		if (new_engine) {
			var settingsButtonImg='<svg viewBox="64 64 896 896" focusable="false" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="margin: 11px 0;"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"></path></svg>';
			const settingsButton = document.createElement('span');
			settingsButton.setAttribute('data-action', "options");
			settingsButton.classList.add("anticon");
			settingsButton.classList.add("ant-btn-link");
			settingsButton.classList.add("text-primary-hovered");
			settingsButton.title="Настройки";
			settingsButton.innerHTML = settingsButtonImg;
			if (!document.body.contains(document.getElementById('buttonArea'))) {
				const buttonArea = document.createElement('div');
				buttonArea.id = 'buttonArea';
				buttonArea.classList.add("flex");
				buttonArea.append(settingsButton);
				if (window.location.href.includes('search')) {
					document.getElementsByClassName('flex-nowrap')[0].style="margin: auto;";
					document.getElementsByClassName('flex-nowrap')[0].append(buttonArea);
				}
				else {
					document.getElementsByClassName('flex-nowrap')[0].children[window.location.href.includes('user') ? 2 : 0].after(buttonArea);
				}
			}
			else
				$('#buttonArea').append(settingsButton);
		}
		else
			$('#submenu').append('<span data-action="options" class="big_button" title="Настройки"></span>');
		
		// login, logout - reset token
		if (new_engine) {
			var menuObserver = new MutationObserver(function(mutations) {
				if ($('span.text-primary-hovered:contains("Выход")').parents('li[data-menu-id]').length) {
					$('span.text-primary-hovered:contains("Выход")').parents('li[data-menu-id]')[0].id = 'logout';
					menuObserver.disconnect();
				}
			});
			menuObserver.observe(document.body, {childList: true, subtree: true});
		}
		$(document).on('click', '#logout, input[value="Войти"], .ant-btn-lg', function() {
			engine.runtime.sendMessage({method: 'token', action: 'del'});
		});

		// tag subscribe/unsubscribe/block - clear user data
		if (new_engine) {
			let subButton = $('span:contains("Подписаться")');
			let subText = $('span:contains("Вы подписчик")');
			if (subButton.length) {
				subButton[0].parentElement.classList.add("change_favorite_link");
				var subMenuObserver = new MutationObserver(function(mutations) {
					if ($('span:contains("Заблокировать")').length) {
						$('span:contains("Заблокировать")')[0].classList.add("change_favorite_link");
						subMenuObserver.disconnect();
					}
				});
				subMenuObserver.observe(document.body, {childList: true, subtree: true});
			}
			else if (subText.length) {
				var subMenuObserver = new MutationObserver(function(mutations) {
					if ($('span:contains("Отписаться")').length && $('span:contains("Заблокировать")').length) {
						$('span:contains("Отписаться")')[0].classList.add("change_favorite_link");
						$('span:contains("Заблокировать")')[0].classList.add("change_favorite_link");
						subMenuObserver.disconnect();
					}
				});
				subMenuObserver.observe(document.body, {childList: true, subtree: true});
			}
		}
		$(document).on('click', '.change_favorite_link', function() {
			engine.runtime.sendMessage({action: 'user', data: 'del'});
		});

		// tag subscribe/unsubscribe/block. only for censored tags
		$(document).on('click', '[data-tag_id]', function() {
			$this.tag.state($(this).attr('data-tag_id'), $(this).parent().attr('class'));
		});

		// scroll visitor handler
		if ($this.url[1] !== 'post') {
			$(window).on('scroll', function() {
				if ($(window).scrollTop() < 100)
					return false;
				// check all posts
				for (const [post_id, item] of Object.entries($this.lists.posts)) {
					// if the block is fully visible on screen				
					if ((item.offset().top + item.height()) < ($(window).height() + $(window).scrollTop()) && !(post_id in $this.lists.viewed)) {
						// да, это ебучий костыль, что бы оно не срало 10 запросов за один скролл
						// потому закидываем во временный список, и ждем ответа от фонового скрипта, который уже точно подвердит что пост сохранен
						// если нет ответа в указанное время - снова делаем его живим. на это даеться всего 100ms
						// варианта лучше я не придумал
						// (凸ಠ益ಠ)凸
						$this.lists.viewed[post_id] = post_id;
						setTimeout(function() {
							delete $this.lists.viewed[post_id];
						}, 100);

						// mark post as visited
						engine.runtime.sendMessage({method: 'posts', action: 'set', data: post_id});
					}
				}
			});
		}
		// mark post as visited when click link/vote
		// if this is download button - load all post content
		$(document).on('click', '.postContainer a, .post-card a, .postContainer .vote-plus, .post-card .vote-plus, .post-card .post-upvote, .postContainer .vote-minus, .post-card .post-downvote, .postContainer [data-action], .post-card [data-action]', function() {
			const post_id = $(this).parents('.postContainer, .post-card.relative').attr('id').match(/([0-9]+)$/)[1];
			if ($(this).attr('data-action') == 'download') {
				$this.download($(this));
			}
			if (post_id in $this.lists.posts) {
				engine.runtime.sendMessage({method: 'posts', action: 'set', data: post_id});
				delete $this.lists.posts[post_id];
			}
		});
		$(document).on('click', '#submenu > [data-action], .flex-nowrap [data-action]', function() {
			switch($(this).attr('data-action')) {
				case 'download':
					$('.postContainer [data-action="download"]').each(function() {
						$(this).click();
					});
					break;
				case 'options':
					engine.runtime.sendMessage({method: 'options', action: 'page'});
					break;
			}
		});
		// return to default when clicking on a post
		$(document).on('click', '.postContainer, .post-card.relative', function() {
			if ($(this).hasClass('JV_title')) {
				$(this).removeClass('JV_title');
				$(this).css('opacity', 1);
				if (new_engine) {
					$($(this).find('svg[fill="none"]').parents()[3]).append(`<button data-action="wrap" type="button" class="ant-btn css-il4ovg ant-btn-default ant-btn-icon-only ant-btn-background-ghost post-menu-button pb-px"><span class="ant-btn-icon" title="Сократить просмотренный пост"><span role="img" aria-label="vertical-align-top" class="anticon anticon-vertical-align-top"><svg viewBox="64 64 896 896" focusable="false" data-icon="vertical-align-top" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"></path></svg></span></span></button>`);
				}
				else {
					let old = '';
					const subdomain = window.location.hostname.match(/^(.*?)\.reactor.*/);
					if (subdomain) 
						if (subdomain[1] == 'old')
							old = 'old';
					$(this).find('.share_buttons').prepend(`<span data-action="wrap" class="big_button ${old}" title="Сократить просмотренный пост"></span>`);
				}
			}
			else if ($(this).hasClass('JV_title_add')) {
				$(this).removeClass('JV_title_add');
				$(this).addClass('JV_title');
			}
		});
		$(document).on('click', '.postContainer [data-action="wrap"], .post-card [data-action="wrap"]', function() {
			let post = $(this).parents('.postContainer, .post-card.relative');
			if ($this.vars.options.post_action == 'title_translucent')
				post.css('opacity', $this.vars.options.post_opacity);
			if (new_engine) {
				if (post.find('[aria-label="up"]').length) {
					post.find('.comment-button').click();
				}
			}
			else {
				if (post.find('.commentnum').hasClass('comOpened')) {
					post.find('.commentnum')[0].click();
				}
			}
			post.addClass('JV_title_add');
			$(this).remove();
		});
		// get comments list
		$(document).on('click', '.JV_toggleComments', async function(event) {
			event.preventDefault();

			const post_id = $(this).parents('.postContainer, .post-card.relative').attr('id').match(/([0-9]+)$/)[1];

			if (new_engine) {
				if ($(this).find('[aria-label="up"]').length) {
					$(this).find('[aria-label="up"]').replaceWith('<span role="img" aria-label="down" class="anticon anticon-down pr-1.5 hidden sm:inline-block"><svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></span>');
					$(`#postContainer${post_id} .post_comment_list`).remove();
					return false;
				} else {
					$(this).find('[aria-label="down"]').replaceWith('<span role="img" aria-label="up" class="anticon anticon-up pr-1.5"><svg viewBox="64 64 896 896" focusable="false" data-icon="up" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path></svg></span>');
					engine.runtime.sendMessage({method: 'comments', action: 'get', data: post_id});
					return true;
				}	
			}
			else {
				if ($(this).hasClass('comOpened')) {
					$(this).removeClass('comOpened');
					$(`#postContainer${post_id} .post_comment_list`).css('display', 'none');
					return false;
				} else {
					$(this).addClass('comOpened');
					engine.runtime.sendMessage({method: 'comments', action: 'get', data: post_id});
					return true;
				}			
			}
		});
		//на новом дизнайне восстановить лайки/дизлайки и отправку комментариев в восстановленных постах, которые заблокированы на территории РФ, у меня не получилось, так что кнопки рейтинга и написания комментариев вместо прямой своей функции открывают в новой вкладке страницу поста в старом дизайне =(
		if (new_engine) {
			$(document).on('click', '.restored-post-button', function() {
				window.open('https://joy.reactor.cc/post/'+$(this).parents('.post-card.relative').attr('id').match(/([0-9]+)$/)[1]);
			});
			$(document).on('click', '.restored-post-comment', function() {
				window.open('https://joy.reactor.cc/post/'+$(this).parents('.post-card.relative').attr('id').match(/([0-9]+)$/)[1]+'#comment'+$(this).parents('.comment').attr('id').match(/([0-9]+)$/)[1]);
			});
			$(document).on('click', '.restored-post-comment-button', function() {
				window.open('https://joy.reactor.cc/post/'+$(this).parents('.post-card.relative').attr('id').match(/([0-9]+)$/)[1]+'#add_comment');
			});
		}
		// open comment rating buttons on new engine
		/*if (new_engine) {
			$(document).on('click', '.post_comment_list [data-vote="1"]', async function(event) {
				const inset = Math.round($(this).offset().top) + (Math.round($(this).height()) + 91 < ($(window).height() + $(window).scrollTop()) ? 54 : -65);
				console.log($('#JV_popover').Container([inset]));
				$('body').append($('#JV_popover').Container([inset]));
			});
			$(document).click(function(event) {
				if ($('.JV-popover').length)
					if ($(event.target).closest('.JV-popover').length)
						$('.JV-popover').remove();
			});
		}*/
		// send comment
		$(document).on('click', '.JV_submit', function() {
			$this.comments.add(new FormData($(this).parent('form')[0]))
		});
		// shortcuts
		function move(direction) {
			let posts = $('.post-card.relative, button:contains("Скрыто постов")');
			if (posts.length) {
				var active_post = posts.filter(".p-active"),
					index = (direction == 1 ? -1 : posts.length);
				if (active_post.length) {
					posts.each(function (i, post) {
						if (post == active_post[0])
							index = i;
					});
					active_post.removeClass("p-active");
				}
				else if (direction == 1)
					posts.each(function (i, post) {
						if ($(post).offset().top > $(window).scrollTop()) {
							index = i-1;
							return false;
						}
					});
				let new_index = index+direction;
				if (new_index >= posts.length)
					page_change('right');
				else if (new_index < 0)
					page_change('left');
				else {
					var next_post = posts[new_index];
					$(window).scrollTop($(next_post).offset().top);
					$(next_post).addClass("p-active");
				}
			}
		}
		function page_change(direction) {
			var navBut = $(".min-h-pagination").find('span[aria-label="'+direction+'"]');
			if (navBut.length)
				navBut.click();
		}
		function goToNewCom() {
			var new_com = $(".highlighted-new").first();
			if (new_com.length) {
				$(window).scrollTop(new_com.offset().top);
				new_com.removeClass("highlighted-new");
			}
		}
		function download() {
			let target;
			if ($this.url[1] == 'post') {
				target = $('[data-action="download"]');
			} else {
				let minDistance = 50000;

				// get button closest to center
				$.each($('[data-action="download"]'), function() {
					let distance = Math.abs(($(this).offset().top + $(this).height()) - (($(window).height() / 2) + $(window).scrollTop()));
					if (minDistance > distance && $(window).scrollTop() < $(this).offset().top) {
						minDistance = distance;
						target = $(this);
					}
				});
			}

			target.click();
		}
		function move_inside_post(direction) {
			let elems = new_engine ? $('.post-card.p-active .post-content').children() : $('.article.active .post_content').children().children();
			if (elems.length) {
				var active_post = $(".post-card.p-active, .article.active");
				if (active_post.length)
					active_post.find(".expandable-post-content, .post_content_expand").click();
				var active_elem = elems.filter(".active-elem"),
					index = (direction == 1 ? -1 : elems.length);
				if (active_elem.length) {
					elems.each(function (i, elem) {
						if (elem == active_elem[0])
							index = i;
					});
					active_elem.removeClass("active-elem");
				}
				else if (direction == 1)
					elems.each(function (i, elem) {
						if ($(elem).offset().top > $(window).scrollTop()) {
							index = i-1;
							return false;
						}
					});
				let new_index = index+direction;
				if (new_index >= elems.length)
					move(1);
				else if (new_index < 0)
					move(-1);
				else {
					var next_elem = elems[new_index];
					$(window).scrollTop($(next_elem).offset().top);
					$(next_elem).addClass("active-elem");
				}
			}
			else
				move(direction);
		}
		function play_pause() {
			let target;
			let minDistance = 50000;

			// get video closest to center
			$.each($('video'), function() {
				let distance = Math.abs(($(this).offset().top + ($(this).height() / 2)) - (($(window).height() / 2) + $(window).scrollTop()));
				if (minDistance > distance) {
					minDistance = distance;
					target = this;
				}
			});

			if (target)
				target.paused ? target.play() : target.pause();
		}
		function comms() {
			var active_post = $(".post-card.p-active");
			if (active_post.length)
				active_post.find(".comment-button").click();
		}
		function unwrap() {
			if ($(".post-card.p-active").length) {
				var active_post = $(".post-card.p-active");
				if (active_post.find(".expandable-post-content").length)
					active_post.find(".expandable-post-content").click();
				else if (active_post.find(".collapse-content-button").length) {
					active_post.find(".active-elem").removeClass("active-elem");
					active_post.find(".collapse-content-button").children().click();
				}
				else if (active_post.find('button:contains("Пост свернут. Показать?")').length)
					active_post.find('button:contains("Пост свернут. Показать?")').click();
			}
			else if ($("button.p-active").length) {
				$("button.p-active").click();
			}
		}
		function fav() {
			var active_post = $(".post-card.p-active");
			if (active_post.length)
				active_post.find('.post-footer [aria-label="star"]').click();
		}
		function toTop() {
			$(".post-card.p-active").removeClass("p-active");
			$(".active-elem").removeClass("active-elem");
			$(window).scrollTop(0);
		}
		var Shortcuts = {
			K: function () {
				move(1);
			},
			I: function () {
				move(-1);
			},
			J: function () {
				vote("Upvote");
			},
			L: function () {
				vote("Downvote");
			},
			E: function () {
				comms();
			},
			O: function () {
				comms();
			},
			U: function () {
				unwrap();
			},
			Q: function () {
				unwrap();
			},
			F: function () {
				fav();
			},
			';': function () {
				fav();
			},
			T: function () {
				toTop();
			},
			'[': function () {
				toTop();
			},
			Z: function () {
				page_change("left");
			},
			C: function () {
				page_change("right");
			},
			R: function () {
				play_pause();
			},
			P: function () {
				play_pause();
			},
			'Ctrl+Left': function () {
				page_change("left");
			},
			'Ctrl+Right': function () {
				page_change("right");
			},
			'Up': function () {
				move_inside_post(1);
			},
			'Down': function () {
				move_inside_post(-1);
			},
			'Ctrl+Shift+S': function () {
				download();
			}
		};
		$(document).on('keydown', function(event) {
			if ($(document.activeElement).attr('role') != 'textbox' && !$(document.activeElement).hasClass('ant-input')) {
				if (!event.ctrlKey && !event.shiftKey && !event.altKey && Shortcuts[String.fromCharCode(event.keyCode).toUpperCase()])
					Shortcuts[String.fromCharCode(event.keyCode).toUpperCase()]();
				else if (event.ctrlKey && event.keyCode == 37)
					Shortcuts['Ctrl+Left']();
				else if (event.ctrlKey && event.keyCode == 39)
					Shortcuts['Ctrl+Right']();
				else if (event.keyCode == 190)
					Shortcuts['Up']();
				else if (event.keyCode == 188)
					Shortcuts['Down']();
				else if (event.keyCode == 186)
					Shortcuts[';']();
				else if (event.keyCode == 219)
					Shortcuts['[']();
				else if (event.ctrlKey && event.shiftKey && event.keyCode == 83)
					Shortcuts['Ctrl+Shift+S']();
			}
		});
		if (new_engine && $this.vars.options.reduce_media)
			$('video').css('max-height', 'calc(100vh - 2rem)');
	}
	templates(callback) {
		fetch(engine.runtime.getURL('data/templates.html'), {}).then(function(response) {
			return response.text();
		}).then(function(response) {
			document.getElementsByTagName('body')[0].append(new DOMParser().parseFromString(response, 'text/html').getElementsByTagName('templates')[0]);
			callback();
		});
	}
	async token() {
		return new Promise(function(resolve) {
			fetch('https://api.joyreactor.cc/graphql', {
				method: 'POST',
				credentials: 'include',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({query: '{ me { token } }'})
			}).then(function(response) {
				return response.json()
			}).then(function(response) {
				if (response.data.me === null) {
					resolve(null);
				} else {
					resolve(response.data.me.token);
				}
			}).catch(function() {
				return false;
			});
		});
	}
	get tag() {
		return {
			set: function(request, callback) {
				// if redirect to subdomain
				if (new URL(request.tag_url).hostname !== window.location.hostname) {
					window.location = request.tag_url;
					return;
				}

				// set page url
				window.history.replaceState('tagPage', '', request.tag_url);
				$this.url = request.tag_url.split('/');

				// set page title
				document.title = `${request.data.name} | JoyReactor`;

				// menu links
				const link = request.data.name.replaceAll(' ', '+');
				const links = $('#submenu [href]');
				$.each(links, function() {
					if ($(this).attr('href') == 'http://m.joyreactor.cc/top') {
						$(this).parent('div').remove();
						return;
					}

					$(this).parent('div').removeClass('active');

					$(this).text($(this).text().replace(/ \([0-9+]+\)/, ''));

					// re build links and mark as active
					const last = $(this).attr('href').split('/').pop();
					if (['new', 'best', 'all'].includes(last)) {
						if (request.tag_type == last)
							$(this).parent('div').addClass('active');

						$(this).attr('href', `/tag/${link}/${last}`);
					} else {
						if (request.tag_type == 'good')
							$(this).parent('div').addClass('active');

						$(this).attr('href', `/tag/${link}`);
					}
				});

				// remove trends
				$('.trends_wr').remove();

				// data for template
				let data = request.data;

				// breadcrumbs
				data.breadcrumbs = [{url: 'https://joyreactor.cc/', name: 'Главная'}];
				data.breadcrumbsCurrent = '';

				while (request.data.hierarchy.length) {
					const tag = request.data.hierarchy.pop();
					const link = tag.name.replaceAll(' ', '+');

					if (!request.data.hierarchy.length) {
						data.breadcrumbsCurrent = tag.name;
					} else {
						data.breadcrumbs.push({url: `/tag/${link}`, name: tag.name})
					}
				}

				// tag state
				request.data.favorite = {class: 'add_to_fav', text: 'подписаться'};
				request.data.block = {class: 'add_to_unpopular', text: 'заблокировать'};

				if ($this.vars.user.tags.blocked.includes(request.data.tag_id))
					request.data.block = {class: 'remove_from_unpopular', text: 'разблокировать'};

				if ($this.vars.user.tags.subscribed.includes(request.data.tag_id))
					request.data.favorite = {class: 'remove_from_fav', text: 'отписаться'};

				// tag desc
				if (request.data.articlePost) {
					const description = $this.posts.attributes(request.data.articlePost, true, 200);
					description[0].classList.add('post_content_cut');

					data.description = description[0].outerHTML;
					data.description_expand = description[1].outerHTML;
				}

				// pagination
				data.pagination = { prev: { href: '', class: '' }, next: { href: '', class: ''	}, expanded: [] };

				const ex = [1, 2];
				const dots = '<span>...</span>';
				const pages = Array.from({length: Math.ceil(request.data.postPager.count/10)}, function(_, i) { return i + 1 })
				if (request.tag_page_num === 0)
					request.tag_page_num = pages.at(-1);

				// prev
				if (request.tag_page_num < pages.at(-1)) {
					if ((request.tag_page_num+1) == pages.at(-1)) {
						data.pagination.prev.href = request.url_path;
					} else {
						data.pagination.prev.href = `${request.url_path}/${request.tag_page_num+1}`;
					}
				} else {
					data.pagination.prev.class = 'current';
				}

				// next
				if (request.tag_page_num > 1) {
					data.pagination.next.href = `${request.url_path}/${request.tag_page_num-1}`;
				} else {
					data.pagination.next.class = 'current';
				}

				// pagination_expanded
				for (let i = 1; i < 3; i++) {
					if (pages.length > 1) {
						const page = pages.at(-i);
						ex.push(page);

						let l;
						if (page == request.tag_page_num) {
							l = `<span class="current">${page}</span>`;
						} else {
							if (page == pages.at(-1)) {
								l = `<a href="${request.url_path}">${page}</a>`;
							} else {
								l = `<a href="${request.url_path}/${page}">${page}</a>`;
							}
						}
						data.pagination.expanded.push(l);
					}
				}

				if (pages.length > 2) {
					const num = pages.indexOf(request.tag_page_num);

					const start = ((num-2) <= 0)?0:(num-3);
					const end = ((num+3) > pages.length)?num:(num+3);

					const tmp = pages.slice(start, end).reverse();
					for (const i in tmp) {
						if (ex.includes(tmp[i]))
							tmp.splice(i, 1);
					}
					
					if (tmp.at(0) < pages.at(-3))
						data.pagination.expanded.push(dots);

					for (const page of tmp) {
						if (ex.includes(page))
							continue;

						let l;
						if (page == request.tag_page_num) {
							l = `<span class="current">${page}</span>`;
						} else {
							l = `<a href="${request.url_path}/${page}">${page}</a>`;
						}
						data.pagination.expanded.push(l);
					}

					if (tmp.at(-2) > pages.at(3))
						data.pagination.expanded.push(dots);
				}

				for (let i = 1; i >= 0; i--) {
					const page = pages.at(i);
					let l;

					if (page == request.tag_page_num) {
						l = `<span class="current">${page}</span>`;
					} else {
						l = `<a href="${request.url_path}/${page}">${page}</a>`;
					}
					data.pagination.expanded.push(l);
				}

				// show tag info
				$('#tagArticle').remove();
				$('#contentinner').prepend($('#JV_tagPage').Container([data]));

				// show pagination
				$('#Pagination').remove();
				$('#contentinner').append($('#JV_pagination').Container([data]));
				
				// tag header image
				$('#contentInnerHeader').on('load', function() {
					$(this).removeAttr('style');
				})				

				$('#post_list').html($('#JV_post').Container(request.data.postPager.posts));

				callback();
			},
			state: function(tag_id, state) {
				switch (state) {
					case 'add_to_fav':
						state = 'SUBSCRIBED';
						break;
					case 'add_to_unpopular':
						state = 'BLOCKED';
						break;
					default:
						state = 'UNSUBSCRIBED';
						break;
				}
				
				engine.runtime.sendMessage({method: 'tag', action: 'state', data: {tag_id: tag_id, state: state}});
				return true;
			}
		}
	}
	get posts() {
		return {
			check: function(item) {
				if (new_engine) {
					if (item.find('svg[fill="none"]').length)
						var post_id = item.find('svg[fill="none"]').parents()[2].href.match(/([0-9]+)$/)[1];
					else
						return {post_id: 'collapsed', check: false};
				}
				else
					var post_id = item.attr('id').match(/([0-9]+)$/)[1];
				if (new_engine)
					item[0].id = "postContainer"+post_id;

				let old = '';

				let fandomOrTag = false;
				const subdomain = window.location.hostname.match(/^(.*?)\.reactor.*/);
				if (subdomain) {
					if (!['old', 'joy'].includes(subdomain[1]))
						fandomOrTag = true;
					if (subdomain[1] == 'old')
						old = 'old';
				}
				if ($this.url[1] == 'tag')
					fandomOrTag = true;

				// if quick download enabled - make button
				if ($this.vars.options.download_status)
					if (new_engine) {
						$(item.find('svg[fill="none"]').parents()[3]).append(`<button data-action="download" type="button" class="ant-btn css-il4ovg ant-btn-default ant-btn-icon-only ant-btn-background-ghost post-menu-button pb-px"><span class="ant-btn-icon" title="Скачать все картинки из поста"><span role="img" aria-label="floppy disk" class="anticon anticon-floppy-disk"><svg viewBox="20 20 64 64" focusable="false" data-icon="floppy disk" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M54.4,35.2h-3.2c-.8832,0-1.6-.7168-1.6-1.6v-11.2h6.4v11.2C56,34.4832,55.2832,35.2,54.4,35.2z"></path><path d="M60.8,44.8H40c-3.5344,0-6.4-2.8656-6.4-6.4V22.4h6.4v15.2c0,.4416.3584.8.8.8h19.2c.4416,0,.8-.3584.8-.8V22.4h6.4v16C67.2,41.9344 64.3344,44.8,60.8,44.8z"></path><path d="M70.4,80h-6.4V61.6c0-.4416-.3584-.8-.8-.8h-24c-.4416,0-.8.3584-.8.8V80h-6.4V60.8c0-3.5344,2.8656-6.4,6.4-6.4h25.6c3.5344,0,6.4,2.8656,6.4,6.4V80z"></path><path d="M73.6,83.2H28.8c-5.2944,0-9.6-4.3056-9.6-9.6V28.8c0-5.2944,4.3056-9.6,9.6-9.6h43.2c.848,0,1.6624.3376,2.2624.9376l8,8C82.8624,28.7376,83.2,29.552,83.2,30.4v43.2C83.2,78.8944,78.8944,83.2,73.6,83.2zM28.8,25.6c-1.7648,0-3.2,1.4352-3.2,3.2v44.8c0,1.7648,1.4352,3.2,3.2,3.2h44.8c1.7648,0,3.2-1.4352,3.2-3.2V31.7264L70.6752,25.6H28.8z"></path></svg></span></span></button>`);
					}
					else
						item.find('.share_buttons').prepend(`<span data-action="download" class="big_button ${old}" title="Скачать все картинки из поста"></span>`);

				if ($this.vars.options.post_share_disabled && !new_engine)
					item.find('.share_buttons > a[class^="share"]').remove();


				// default without exceptions
				let exceptions = [];
				// allow exceptions on all pages
				if ($this.vars.options.tags_exceptions_page == 'all') {
					exceptions = new_engine ? Object.keys($this.vars.options.tags_list) : Object.values($this.vars.options.tags_list);
				}
				// exceptions only on tags/fandoms
				if ($this.vars.options.tags_exceptions_page == 'tag' && fandomOrTag) {
					exceptions = new_engine ? Object.keys($this.vars.options.tags_list) : Object.values($this.vars.options.tags_list);
				}
				// exceptions not in tags/fandoms
				if ($this.vars.options.tags_exceptions_page == 'notag' && !fandomOrTag) {
					exceptions = new_engine ? Object.keys($this.vars.options.tags_list) : Object.values($this.vars.options.tags_list);
				}
				

				// tags list
				const tags = item.find('.taglist a, .post-tags a');

				// tag mark
				if ($this.vars.options.post_tags_mark && !new_engine) {
					for (const tag of tags) {
						const id = parseInt($(tag).attr('data-ids').split(',')[0]);
						
						if ($this.vars.user.tags.subscribed.includes(id))
							$(tag).addClass('subscribed');
						if ($this.vars.user.tags.blocked.includes(id))
							$(tag).addClass('blocked');
					}
				}

				// tags ignore
				if (exceptions.length) {
					for (const tag of tags) {
						if (new_engine) {
							const tag_name = $(tag).text();
							if (exceptions.includes(tag_name)) {
								return {post_id: post_id, check: false};
							}
						}
						else {
							const id = parseInt($(tag).attr('data-ids').split(',')[0]);
							if (exceptions.includes(id)) {
								return {post_id: post_id, check: false};
							}
						}

					}
				}


				// disable if post action on tag page, but this is non tag/fandom page
				if ($this.vars.options.post_pages_action == 'tag' && !fandomOrTag) {
					return {post_id: post_id, check: false};
				}
				// disable if post action on non tag page, but this is tag/fandom page
				if ($this.vars.options.post_pages_action == 'notag' && fandomOrTag) {
					return {post_id: post_id, check: false};
				}

				return {post_id: post_id, check: true};
			},
			get: function() {

				// if quick download enabled - make button
				if ($this.vars.options.download_status)
					if (new_engine) {
						var saveButtonImg='<svg viewBox="20 20 64 64" focusable="false" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="margin: 11px 0;"><path d="M54.4,35.2h-3.2c-.8832,0-1.6-.7168-1.6-1.6v-11.2h6.4v11.2C56,34.4832,55.2832,35.2,54.4,35.2z"></path><path d="M60.8,44.8H40c-3.5344,0-6.4-2.8656-6.4-6.4V22.4h6.4v15.2c0,.4416.3584.8.8.8h19.2c.4416,0,.8-.3584.8-.8V22.4h6.4v16C67.2,41.9344 64.3344,44.8,60.8,44.8z"></path><path d="M70.4,80h-6.4V61.6c0-.4416-.3584-.8-.8-.8h-24c-.4416,0-.8.3584-.8.8V80h-6.4V60.8c0-3.5344,2.8656-6.4,6.4-6.4h25.6c3.5344,0,6.4,2.8656,6.4,6.4V80z"></path><path d="M73.6,83.2H28.8c-5.2944,0-9.6-4.3056-9.6-9.6V28.8c0-5.2944,4.3056-9.6,9.6-9.6h43.2c.848,0,1.6624.3376,2.2624.9376l8,8C82.8624,28.7376,83.2,29.552,83.2,30.4v43.2C83.2,78.8944,78.8944,83.2,73.6,83.2zM28.8,25.6c-1.7648,0-3.2,1.4352-3.2,3.2v44.8c0,1.7648,1.4352,3.2,3.2,3.2h44.8c1.7648,0,3.2-1.4352,3.2-3.2V31.7264L70.6752,25.6H28.8z"></path></svg>';
						const saveButton = document.createElement('span');
						saveButton.setAttribute('data-action', "download");
						saveButton.classList.add("anticon");
						saveButton.classList.add("ant-btn-link");
						saveButton.classList.add("text-primary-hovered");
						saveButton.title="Скачать все картинки на странице";
						saveButton.innerHTML = saveButtonImg;
						if (!document.body.contains(document.getElementById('buttonArea'))) {
							const buttonArea = document.createElement('div');
							buttonArea.id = 'buttonArea';
							buttonArea.classList.add("flex");
							buttonArea.append(saveButton);
							if (window.location.href.includes('search')) {
								document.getElementsByClassName('flex-nowrap')[0].style="margin: auto;";
								document.getElementsByClassName('flex-nowrap')[0].append(buttonArea);
							}
							else {
								document.getElementsByClassName('flex-nowrap')[0].children[window.location.href.includes('user') ? 2 : 0].after(buttonArea);
							}
						}
						else
							$('#buttonArea').prepend(saveButton);
					}
					else
						$('#submenu').append('<span data-action="download" class="big_button" title="Скачать все картинки на странице"></span>');

				// list to check visited
				const get = [];

				// all posts on page
				const posts = $('.postContainer, .post-card.relative');

				$.each(posts, function() {
					// get post_id and options to check
					const post = $this.posts.check($(this));

					// if this is exception
					if (!post.check) {
						$(this).addClass('JV_exception');
					} else {
						// save globally
						$this.lists.posts[post.post_id] = $(this).find('.ufoot, .post-footer');
					}

					// to check
					if (post.post_id != 'collapsed')
						get.push(post.post_id);
					
					// post is censored?
					const iscensored = $(this).find('[alt="Copywrite"], [alt="Censorship"], .brick-pattern').length;
					if (iscensored) {
						$this.lists.unlock.push(post.post_id);
					}
				});
				
				// translucent animation
				if (posts.length && $this.vars.options.post_action !== 'none' && $this.vars.status && !$this.vars.options.extension_ignore_url.includes($this.url[1])) {
					$('#content, .content-container').css('opacity', $this.vars.options.post_opacity);
				}

				// to check in history
				engine.runtime.sendMessage({method: 'posts', action: 'get', data: get});
			},
			set: function(data, callback) {

				// if post page - mark post as viewed
				if ($this.url[1] == 'post')
					engine.runtime.sendMessage({action: 'mark', data: $this.url[2]});

				// add info date visited
				if ($this.vars.options.post_visited_date) {
					for (const [post_id, visited] of Object.entries(data)) {
						if (new_engine){
							const vis = document.createElement('div');
							vis.innerHTML = $('#JV_visited').Container([visited]);
							$(`#postContainer${post_id}`).find('.post-header')[0].children[0].after(vis.children[0]);
						}
						else
							$(`#postContainer${post_id}`).find('.uhead_nick').append($('#JV_visited').Container([visited]));

						$this.trigger($(`#postContainer${post_id}`)[0]);
					}
				}

				// mark posts
				if ($this.vars.options.post_action !== 'none' && $this.vars.status && !$this.vars.options.extension_ignore_url.includes($this.url[1])) {
					for (const post_id of Object.keys(data)) {

						// remove from visited hendler
						delete $this.lists.posts[post_id];

						// find post on page
						const post = $(`#postContainer${post_id}`);

						// if post is an exception
						if (post.hasClass('JV_exception'))
							continue;

						if ($this.vars.options.post_action_unread) {
							if (post.find('.commentnumDelta, .commentnum-delta').text())
								continue;
						}

						// post actions
						switch ($this.vars.options.post_action) {
							case 'hide':
								// if visited, and need to remove from page - remove from list to unlock censored
								delete $this.lists.unlock[post_id];

								post.remove();
								break;
							case 'translucent':
								post.css('opacity', $this.vars.options.post_opacity);
								break;
							case 'title':
								post.addClass('JV_title');
								break;
							case 'title_translucent':
								post.addClass('JV_title');
								post.css('opacity', $this.vars.options.post_opacity);
								break;
						}
					}
				}

				callback();
			},
			pager: function() {
				// auto step to next page
				// default - disable
				let pager = false;

				// if all posts viewed
				// and page didnt have any exceptions
				if (!Object.keys($this.lists.posts).length && !$('.JV_exception').length) {
					// if allowed on all pages except the first and this not first page
					if ($this.vars.options.post_pager == 'withoutfirst' && (new_engine ? (document.querySelector('[aria-label="left"]') ? !document.querySelector('[aria-label="left"]').parentElement.classList.value.includes('hidden') : false) : document.querySelector('a.prev') !== null))
						pager = true;

					// if allowed on all pages
					if ($this.vars.options.post_pager == 'all')
						pager = true;

				}

				// block tag loop
				if (document.referrer) {
					let referrerURL = new URL(document.referrer);
					let referrer = referrerURL.pathname.split('/');
					let num = parseInt(referrer[3]);
					referrer.splice(3, 1);
					referrer = decodeURI(referrerURL.origin+referrer.join('/'));

					let currentURL = document.location;
					let cpath = currentURL.pathname.split('/');
					cpath.splice(3, 1);
					cpath = decodeURI(currentURL.origin+cpath.join('/'));

					// if the links are same
					// but current page num - undefined
					// and referrer page number - is numeric
					// this is tag loop - disable pager
					if (referrer === cpath && $this.url[3] === undefined && typeof num == 'number' && !isNaN(num))
						pager = false;
				}

				if ($this.vars.options.post_action_unread) {
					$('.postContainer, .post-card').each(function() {
						if ($(this).find('.commentnumDelta, .commentnum-delta').text())
							pager = false;
					})
				}

				// if pager allowed and next page exists
				if (pager && $('a.next, a[class="w-5/12"]').length) {
					$('a.next, a[class="w-5/12"]')[0].click();
				} else { // else - remove translucent
					$('#content, .content-container').css('opacity', 1);
				}
			},
			viewed: function(data) {
				// visual mark animation
				if ($this.vars.options.post_visual_mark && data.result && data.post_id in $this.lists.posts) {
					$(`#postContainer${data.post_id}`).addClass('JV_mark');
				}

				delete $this.lists.posts[data.post_id];
			},
			unlock: function(data) {

				for (const [post_id, item] of Object.entries(data)) {

					const post = $(`#postContainer${post_id}`);

					// rebuild comments
					if (new_engine) {
						post.find('.comment-button').prop('disabled', false);
						post.find('.comment-button').removeClass('.comment-button').addClass('JV_toggleComments');
					}
					else
						post.find('.toggleComments').removeClass('.toggleComments').addClass('JV_toggleComments');

					// rebuild votes
					post.find('.ufoot_first .post_rating, .post-footer .post-rating').replaceWith($('#JV_rating'+NE).Container([item]));
					if (new_engine) {
						const rat = $(post.find('[data-vote] .opacity-30')[1]);
						if (rat.text() != '--') {
							rat.addClass('flex gap-1').removeClass('mx-1.5 opacity-30');
							if (rat.text() > 0)
								rat.text('+'+rat.text());
						}
						if (post.find('[data-vote="0"]').length)
							post.find('.vote-button').remove();
					}

					// get comments number
					if (new_engine) {
						let comBut = $(post.find('div.mr-1:contains("Комментарии")').parents()[0]);
						comBut.html(comBut.html().slice(0, -1)+item.commentsCount);
					}

					// get commentnumDelta
					const commentnumDelta = item.commentsCount - item.viewedCommentsCount;
					if (commentnumDelta > 0) {
						if (new_engine) {
							$(post.find('div.mr-1:contains("Комментарии")').parents()[0]).append(`<span class="commentnum-delta">+${commentnumDelta}</span>`);
						}
						else
							post.find('span.commentnumDelta').text(`+${commentnumDelta}`);
					}

					// get real content
					const content = $this.posts.attributes(item);

					// if this is post page - instant load comments
					if ($this.url[1] == 'post') {
						post.find('.JV_toggleComments').click();
						if (new_engine)
							post.find('.JV_toggleComments').click();
					}

					// replace plug
					post.find('[alt="Copywrite"], [alt="Censorship"], .brick-pattern').replaceWith(content[0], content[1]);
				
					if (new_engine) {
						//wrap long restored post
						let wrap = function() {
							if (post.find('.expand-wrapper').height() >= 1500) {
								post.find('.expand-wrapper').css("max-height", "1000px");
								var expand = document.createElement('button');
								expand.classList.add('expandable-post-content');
								expand.textContent = 'развернуть ↓';
								expand.onclick = function() {
									post.find('.expand-wrapper').css("max-height", "100%");
									post.find('.expandable-post-content').remove();
								}
								post.find('.expand-wrapper').after(expand);
							}
						}
						wrap();
						$.each(post.find('.expand-wrapper img.responsive, .expand-wrapper video'), function() {
							$(this).one(this.tagName == 'IMG' ? "load" : "loadeddata", function () {
								wrap();
							});
						});
						//на новом дизайне кнопка сворачивания поста в восстановленных постах, которые заблокированы на территории РФ, ломает страницу, поэтому её в них не будет =(
						$(post.find('button.ant-btn-link')[0]).on('click', function() {
							var collapseObserver = new MutationObserver(function(mutations) {
								let collapseButton = $('div.ant-dropdown').not('.ant-dropdown-hidden').find('li:contains("Свернуть")');
								if (collapseButton.length) {
									collapseButton.remove();
									collapseObserver.disconnect();
								}
							});
							collapseObserver.observe(document.body, {childList: true, subtree: true});
						});
					}

				}

				$this.posts.pager();

				var event = document.createEvent('HTMLEvents');
				event.initEvent('DOMUpdate2', true, true);
				event.eventName = 'DOMUpdate2';
				document.dispatchEvent(event);
			},
			attributes: function(item, isPost = true) {
				if (item === null)
					return ['', '', ''];

				// filename
				let filename = [];
				if ('tags' in item) {
					let num = 3;
					filename = [];
					for (var q of item.tags) {
						if (num < 0)
							break;
						
						q.name = encodeURI(q.name.replaceAll(/[\s]/g, '-').replaceAll(/[/.?#]/g, ''));
						filename.push(q.name);
						num--;
					}
					filename = filename.join('-');
				} else {
					filename = 'image';
				}

				// attributes -> templates
				if (Object.keys(item.attributes).length) {
					for (const attribute of item.attributes) {
						let template_id = '';

						attribute.template = '';
						attribute.filename = filename;

						switch(attribute.type) {
							case 'PICTURE':
								if (isPost) {
									if (['GIF', 'WEBM', 'MP4'].includes(attribute.image.type)) {
										if (attribute.image.type == 'GIF' && !attribute.image.hasVideo) {
											template_id = 'gif';
										} else {
											template_id = 'video';
										}
									} else {
										template_id = 'image_post';
									}
								} else {
									template_id = 'image_comment';
								}
								break;
							case 'YOUTUBE':
								template_id = 'youtube';
								break;
							case 'COUB':
								template_id = 'coub';
								break;
							case 'SOUNDCLOUD':
								template_id = 'soundcloud';
								break;
						}

						attribute.template = $(`#JV_attribute_${template_id}`+NE).Container([attribute]);
					}
				}

				// match all in text
				let toReplace = {};
				const text = item.text.matchAll(/&attribute_insert_([0-9]+)&/g);
				for (const insert of text) {
					toReplace[insert[0]] = insert[1];
				}
				
				// replace attributes in text
				if (Object.keys(toReplace).length) {
					for (const [search, id] of Object.entries(toReplace)) {
						if ((id-1) in item.attributes) {
							item.text = item.text.replace(search, item.attributes[(id-1)].template);
						} else {
							item.text = item.text.replace(search, '<b>[То что здесь должно быть - было удалено]</b>');
						}
					}
				}

				// if unused attributes remain
				if (Object.keys(item.attributes).length > Object.keys(toReplace).length) {
					for (const [id, attribute] of Object.entries(item.attributes)) {
						if (!Object.values(toReplace).includes((id-1)))
							item.text += attribute.template;
					}
				}

				item.text = item.text.replace(/<br>$/, '');

				// re create post content block
				if (new_engine) {
					var child = document.createElement('div');
					child.classList.add('post-content');
					child.innerHTML = item.text;
					
					var content = document.createElement('div');
					content.classList.add('expand-wrapper');
					content.classList.add('relative');
					content.style.maxHeight = '100%';
					content.style.overflow = 'hidden';
					content.appendChild(child);

					var expand = '';
				}
				else {
					var child = document.createElement('div');
					child.innerHTML = item.text;

					var content = document.createElement('div');
					content.classList.add('post_content');
					content.appendChild(child);

					var expand = document.createElement('div');
					expand.classList.add('post_content_expand');

					var textExpand = document.createElement('span');
					textExpand.textContent = 'Развернуть';
					expand.appendChild(textExpand);
				}
				return [content, expand, item.text];
			}
		}
	}
	get comments() {
		return {
			set: function(data) {
				if (new_engine)
					$($(`#postContainer${data.post_id}`).find('.content')[0]).append('<div class="relative post_comment_list"></div>');
				const comments = $(`#postContainer${data.post_id}`).find('.post_comment_list');

				// rebuild comments form
				comments.html($('#JV_comments'+NE).Container([{
					post_id: data.post_id, 
					user: {id: data.user.id},
					user_id: $this.vars.user.user_id
				}]));
				if (new_engine) {
					var temp = comments.html();
					comments.html('');
				}

				for (let comment of data.comments) {
					// this is banned comment
					if (comment.parent === null)
						continue;
					
					// content
					comment.text = $this.posts.attributes(comment, false)[2];

					let appendTo = new_engine ? comments : comments.find('.comment_list_post');
					if (comment.parent.__typename !== 'Post') {
						let child = appendTo.find(`#comment_list_comment_${comment.parent.id}`);
						if (!child.length) {
							if (new_engine)
								$(appendTo.find(`#comment${comment.parent.id}`).parents()[0]).after($('#JV_comment_child_NE').Container([comment]));
							else
								appendTo.find(`#comment${comment.parent.id}`).after($('#JV_comment_child').Container([comment]));
							appendTo = appendTo.find(`#comment_list_comment_${comment.parent.id}`);
						}
					}

					appendTo.append($('#JV_comment'+NE).Container([comment]));
				}
				if (new_engine) {
					if (comments.find('[data-vote="0"]').length)
						comments.find('[data-vote="0"]').addClass('flex gap-1').removeClass('hover:text-primary-hovered cursor-pointer underline');
					if (comments.find('[data-vote]').length)
						$.each(comments.find('[data-vote]'), function() {
							if (this.innerText > 0)
								this.innerText = '+'+this.innerText;
						});
					comments.append(temp);
				}

				comments.css('display', 'block');

				$this.trigger(comments[0]);
				
				if (window.location.href.split('/')[4].includes('comment'))
					$('a[href="'+'/'+window.location.href.split('/')[3]+'/'+window.location.href.split('/')[4]+'"]')[0].click();
			},
			add: function(data) {
				fetch('/post_comment/create', {
					method: 'POST',
					body: data
				}).then(function(response) {
					return response.json();
				}).then(function(response) {
					engine.runtime.sendMessage({method: 'comments', action: 'get', data: data.get('post_id')});
				});
			}
		}
	}
	download(button) {

		let items = {};
		const content = button.parents('.postContainer, .post-card').find('.post_content, .post-content');

		// find images and videos
		$.each(content.find('img, source'), function() {
			if (!$(this).attr('src').includes('/post/'))
				return;
			const item_id = $(this).attr('src').match(/([0-9]+)\.[a-z0-9]+$/)[1];
			const item_type = $(this).attr('src').match(/[0-9]+\.([a-z0-9]+$)/)[1];
			items[item_id+item_type] = (new_engine ? '' : window.location.protocol)+$(this).attr('src');
		});

		// find full links. if exists - replace
		$.each(content.find('a.prettyPhotoLink, .zoomed-image a[href*="jpeg"], .video_gif_holder a, .video a'), function() {
			if (!$(this).attr('href').includes('/post/'))
				return;
			
			const item_id = $(this).attr('href').match(/([0-9]+)\.[a-z0-9]+$/)[1];
			const item_type = $(this).attr('href').match(/[0-9]+\.([a-z0-9]+$)/)[1];
			if (item_type == 'gif' && items[item_id+'jpeg'])
				delete items[item_id+'jpeg'];
			items[item_id+item_type] = (new_engine ? '' : window.location.protocol)+$(this).attr('href');
		});

		for (const url of Object.values(items)) {
			const filename = decodeURI(new URL(url).pathname.split('/').pop());
			fetch(url).then(function(response) { 
				return response.blob().then(function(blob) { 
					return { type: response.headers.get('Content-Type'), raw: blob }
				})
			}).then(function(data) {
				engine.runtime.sendMessage({method: 'download', data: {
					filename: filename,
					url: url,
					file: URL.createObjectURL(new Blob([data.raw], {type: data.type}))
				}});
			});
		}
	}
	trigger(element) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent('DOMUpdate', true, true);
		event.eventName = 'DOMUpdate';
		element.dispatchEvent(event);
	}
}

const j = new JV();
// start?
if (new_engine) {
	var loading = new MutationObserver(function(mutations) {
		if (document.body.contains($('.flex-nowrap')[0]) && document.body.contains($('.post-card.relative')[0])) {
			j.init();
			loading.disconnect();
		}
	});
	loading.observe(document.body, {childList: true, subtree: true});
	var cur_page = window.location.href.split('#')[0];
	var observer = new MutationObserver(function(mutations) {
		if (cur_page != window.location.href.split('#')[0]) {
			location.reload();
		}
	});
	observer.observe(document.body, {childList: true, subtree: true});
}
else {
	j.init();
}