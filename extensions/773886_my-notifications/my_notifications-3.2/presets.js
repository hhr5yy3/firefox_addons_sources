var presets = {
	'vk.com':{
		'title'             : 'VK',
		'site'              : 'vk.com',
		'domains'           : ['vk.com'],
		'messagePageUrl'    : 'https://vk.com/im',
		'messCountSelector' : '[href="/im"] [role="button"], [href="/mail"] .mm_counter, .mmi_mail .mm_counter, #l_msg .left_count, #l_msg .inl_bl.left_count',
		'loginSelector'     : '[href="/im"], [href="/mail"] .mm_counter, .post_field_user_link, #myprofile_wrap, .mmi_feed, #top_profile_link',
		'showed'            : true,
		'check'             : function(processor) {
			// HI! DO YOU WANT TO USE MY CODE?
			// JUST TEXT ME ON maxbabneg@gmail.com AND ASK ME

			processor.request('https://vk.com/feed', {
				method: 'GET',
				dataType: 'text',
				success: function(result) {
					let match = /initLeftMenu\(JSON\.parse\("(.*)"\),/g.exec(result)

					if (!match[1]) {
						return processor(false)
					}

					let clear = match[1].replaceAll('\\"', '"').replaceAll('\\\\"', '#')
					let json = JSON.parse(clear)

					for (let selKey in json.response.sections) {
						if (json.response.sections.hasOwnProperty(selKey) && json.response.sections[selKey].id === 'main') {
							let main = json.response.sections[selKey]
							for (let itemKey in main.items) {
								if (main.items.hasOwnProperty(itemKey) && main.items[itemKey].id === 'l_msg') {
									return processor(main.items[itemKey].count)
								}
							}
						}
					}

					processor(false)
				},
				error: () => processor(false)
			})
		}
	},
	'odnoklassniki.ru':{
		'title'             : 'OK',
		'site'              : 'ok.ru',
		'domains'           : ['ok.ru'],
		'messagePageUrl'    : 'https://ok.ru/messages',
		'urlForChMess'      : 'https://ok.ru/',
		'messCountSelector' : '#counter_ToolbarMessages',
		'loginSelector'     : '#counter_ToolbarMessages',
		'showed'            : false,
	},
	'facebook.com':{
		'title' 		    : 'Facebook',
		'site'      	    : 'facebook.com',
		'domains'           : ['www.facebook.com'],
		'messagePageUrl'    : 'https://www.facebook.com/messages',
		'urlForChMess'      : 'https://m.facebook.com/home.php',
		'messCountSelector' : '[data-comp-id="7"] [dir="auto"]',
		'loginSelector'     : '[role="navigation"] [role="button"]',
		'showed'            : false,
	},
	'twitter.com':{
		'title'             : 'Twitter',
		'site'              : 'twitter.com',
		'domains'           : ['twitter.com'],
		'messagePageUrl'    : 'https://twitter.com/messages',
		'messCountSelector' : '.dm-nav .count-inner',
		'loginSelector'     : 'nav[role="navigation"]',
		'showed'            : false,
		'check'             : function(processor) {
			let that = this

			let getCounter = function () {
				engine.cookies.getAll({
					name: 'ct0',
					domain: 'twitter.com'
				}, function (cookieList) {
					if (!cookieList[0]) {
						return processor(false)
					}

					processor.request('https://twitter.com/i/api/2/badge_count/badge_count.json?supports_ntab_urt=1', {
						method: 'GET',
						dataType: 'json',
						headers: {
							'authorization' : 'Bearer ' + that.bearer,
							'x-requested-with': 'XMLHttpRequest',
							'x-twitter-active-user': 'yes',
							'x-csrf-token' : cookieList[0].value
						},
						success: function(result) {
							try {
								processor(result.dm_unread_count)
							} catch (err) {
								processor(false)
							}
						},
						error: () => processor(false)
					})
				})
			}

			let getBearer = function () {
				processor.request('https://twitter.com/home', {
					method: 'GET',
					dataType: 'html',
					success: function(result) {
						result.querySelectorAll('head link').forEach(function(item) {
							if (item.href.includes('main')) {
								processor.request(item.href, {
									method: 'GET',
									dataType: 'text',
									success: function(result2) {
										let match = /Bearer\s(.*?)"/gm.exec(result2)

										if (!match[1]) {
											return processor(false)
										}

										that.bearer = match[1]
										getCounter()
									},
									error: () => processor(false)
								})
							}
						})
					},
					error: () => processor(false)
				})
			}

			if (!that.bearer) {
				getBearer()
			} else {
				getCounter()
			}
		}
	},
	'linkedin.com':{
		'title'             : 'Linkedin',
		'site'              : 'linkedin.com',
		'domains'           : ['www.linkedin.com'],
		'messagePageUrl'    : 'https://linkedin.com/',
		'messCountSelector' : '[href="https://www.linkedin.com/messaging/?"] .notification-badge__count',
		'loginSelector'     : '.global-nav__nav',
		'showed'            : true,
		'check'             : function(processor) {
			engine.cookies.getAll({
				name: 'JSESSIONID',
				domain: 'linkedin.com'
			}, function (cookieList) {
				if (!cookieList[0]) {
					return processor(false)
				}
				processor.request('https://www.linkedin.com/voyager/api/voyagerCommunicationsTabBadges?q=tabBadges&countFrom=0', {
					method: 'GET',
					headers:{
						'csrf-token' : cookieList[0].value.replaceAll('"', ''),
						'X-RestLi-Protocol-Version' : '2.0.0'
					},
					dataType: 'json',
					success: function(result) {
						for (const key in result.elements) {
							if (result.elements.hasOwnProperty(key)) {
								if (result.elements[key].tab === 'MESSAGING') {
									return processor(result.elements[key].count)
								}
							}
						}
					},
					error: () => processor(false)
				})
			})
		}
	},
	'instagram.com':{
		'title'             : 'Instagram',
		'site'              : 'instagram.com',
		'domains'           : ['www.instagram.com'],
		'messagePageUrl'    : 'https://www.instagram.com/direct/inbox/',
		'messCountSelector' : '[href="/direct/inbox/"][role="link"] div span',
		'loginSelector'     : '[href="/direct/inbox/"][role="link"] div span',
		'showed'            : true,
		'check'             : function(processor) {
			// HI! DO YOU WANT TO USE MY CODE?
			// JUST TEXT ME ON maxbabneg@gmail.com AND ASK ME
			let diff = Math.abs((new Date()).getTime() - this.lastCheckTime?.getTime()) / 1000
			if (diff >= 60 || this.lastCheckTime === undefined) {
				engine.cookies.getAll({
					name: 'csrftoken',
					domain: 'instagram.com'
				}, (cookieList) => {
					if (!cookieList[0]) {
						return processor(false)
					}

					this.parseDataToken = cookieList[0].value

					if (this.parseDataDeviceId && this.parseDataUserIds) {
						badgeRequest()
					} else {
						mainPageRequest()
					}
				})

				this.lastCheckTime = new Date()
			}

			let off = () => {
				this.parseDataUserIds = null
				this.parseDataDeviceId = null
				this.parseDataToken = null

				return processor(false)
			}

			let badgeRequest = ()  => {
				processor.superRequest('https://www.instagram.com/api/v1/notifications/badge/',{
					method: 'POST',
					dataType : 'json',
					body: 'user_ids='+this.parseDataUserIds +'&device_id='+this.parseDataDeviceId ,
					headers: {
						'x-ig-app-id': '936619743392459', // static number?
						'x-csrftoken': this.parseDataToken,
						'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'accept': 'application/json, text/javascript, */*; q=0.01'
					},
					success: function (json) {
						if (!json.badge_payload) {
							return processor(false)
						}

						for (const [i, value] of Object.entries(json.badge_payload)) {
							processor(value.badge_count_map.di)
						}
					},
					error: () => off()
				})
			}

			let mainPageRequest = () => {
				processor.request('https://www.instagram.com/', {
					method: 'GET',
					success: (result, status) => {
						let found2 = /device_id\":\"(.*?)\"/g.exec(result)
						if (found2 && found2[1]) {
							this.parseDataDeviceId = found2[1].split('|').slice(-1)[0]
						}

						let found3 = /appScopedIdentity\":\"(.*?)\"/g.exec(result)
						if (found3 && found3[1]) {
							this.parseDataUserIds = found3[1]
						}

						if (this.parseDataUserIds && this.parseDataDeviceId && this.parseDataToken) {
							return badgeRequest()
						} else {
							return processor(false)
						}
					},
					error: () => off()
				})
			}
		}
	},
	'youtube.com':{
		'title'             : 'Youtube',
		'site'              : 'youtube.com',
		'messagePageUrl'    : 'https://www.youtube.com/',
		'messCountSelector' : '#button .yt-spec-icon-badge-shape__badge',
		'loginSelector'     : '#avatar-btn',
		'showed'            : true,
		'forceSound'        : true,
		'check'             : function(processor) {
			engine.cookies.getAll({
				name: 'SAPISID',
				domain: 'youtube.com'
			}, function(cookieList) {
				if (!cookieList[0]) {
					return processor(false)
				}

				let origin = 'https://www.youtube.com'
				let SAPISID = cookieList[0].value
				let time = new Date().getTime()
				let hash = Sha1.hash(time + ' ' + SAPISID + ' ' + origin)

				processor.superRequest('https://www.youtube.com/youtubei/v1/notification/get_unseen_count', {
					method: 'POST',
					body: JSON.stringify({
						"context": {
							"client": {
								"clientName": "WEB",
								"clientVersion": "2.20230101"
							}
						}
					}),
					dataType: 'json',
					headers: {
						'origin': 'https://www.youtube.com',
						'authorization' : 'SAPISIDHASH '+time+'_'+hash,
					},
					success: function (response) {
						if (response.unseenCount === 0) {
							return processor(0)
						}

						try {
							return processor(response.actions[0].updateNotificationsUnseenCountAction.unseenCount)
						} catch (err) {
							processor(false)
						}
					},
					error: () => processor(false)
				})
			})
		}
	},
	'mamba.ru':{
		'title'             : 'Mamba',
		'site'              : 'mamba.ru',
		'domains'           : ['www.mamba.ru'],
		'messagePageUrl'    : 'https://www.mamba.ru/chats/',
		'messCountSelector' : '[href="/redirect-chats"] [data-name="total-count"]',
		'loginSelector'     : '[data-name="menu-user_profile-action"]',
		'partnerLink'       : 'https://partner.mamba.ru/link.phtml?pid=1262515313&lid=34170',
		'activePartner'     : true,
		'showed'            : true,
		'check'             : function(processor) {
			processor.request('https://www.mamba.ru/api/messenger/folders', {
				method: 'GET',
				dataType: 'json',
				success: function(result) {
					try {
						let count = 0;
						for (const [key, value] of Object.entries(result)) {
							count += value.counters.unreadMessages
						}
						processor(count);
					} catch (err) {
						processor(false)
					}
				},
				error: () => processor(false)
			})
		}

	},
	'loveplanet.ru':{
		'title'             : 'LovePlanet',
		'site'              : 'loveplanet.ru',
		'domains'           : ['loveplanet.ru'],
		'messagePageUrl'    : '/a-folders#page/1',
		'urlForChMess'      : '/',
		'messCountSelector' : '#immessage_n',
		'loginSelector'     : '.head_user_prof',
		'partnerLink'       : 'https://loveplanet.ru/a-main/affiliate_id-86427/track-mymessage/',
		'activePartner'     : true,
		'showed'            : true,
	},
	'fotostrana.ru':{
		'title'             : 'FotoStrana',
		'site'              : 'fotostrana.ru',
		'domains'           : ['fotostrana.ru'],
		'messagePageUrl'    : 'https://fotostrana.ru/usercontact/',
		'messCountSelector' : '.noty.noty-mess',
		'loginSelector'     : '#header-user-menu-new',
		'partnerLink'       : 'https://cl.cpaevent.ru/5381ba8b735538df24000024/',
		'showed'            : false,
		'check'             : function (processor) {
			processor.request('https://fotostrana.ru/fast/notifier.php',{
				method: 'GET',
				dataType: 'json',
				success: function(json) {
					if (json.messages) {
						processor(json.messages.count);
					} else {
						processor(false)
					}
				},
				error: () => processor(false)
			})
		}
	},
	'tabor.ru':{
		'title'             : 'Tabor',
		'site'              : 'tabor.ru',
		'messagePageUrl'    : 'https://tabor.ru/messages',
		'messCountSelector' : '#messageLed .header__item__count',
		'loginSelector'     : '#messageLed',
		'showed'            : false,
		'check'             : function (processor) {
			let getCount = function () {
				processor.request('https://tabor.ru/api/indicators?_=1432985686213', {
					method: 'GET',
					dataType: 'json',
					success: function (json) {
						if (json.message_count !== undefined) {
							processor(json.message_count);
						} else {
							processor(false)
						}
					},
					error: () => processor(false)
				})
			}

			if (processor.silent || new Date().getMinutes() % 10 === 6) {
				processor.request('https://tabor.ru/', {
					method: 'GET',
					success: function () {
						getCount()
					}
				})
			} else {
				getCount()
			}
		}
	},
	'badoo.com':{
		'title'             : 'Badoo',
		'site'              : 'badoo.com',
		'messagePageUrl'    : '/messenger/open',
		'messCountSelector' : '[href="/messenger/open"] span',
		'loginSelector'     : '#header_ico_wrapper',
		'showed'            : false,
		'check'             : function (processor) {
			engine.cookies.getAll({domain: '.badoo.com', name: 's1'}, function(resp) {
				if (!resp.length) {
					return processor(false)
				}

				processor.request('https://eu1.badoo.com/api.phtml?SERVER_REQUEST_PERSON_NOTICE', {
					body : '{"$gpb":"badoo.bma.BadooMessage","version":1,"message_type":157,"message_id":3,"body":[{"$gpb":"badoo.bma.MessageBody","message_type":157,"folder_request":{"$gpb":"badoo.bma.FolderRequest","folder_id":[0]}}]}',
					method : 'POST',
					headers: {
						'origin': 'https://vk.com',
						'content-type': 'application/json',
						'X-Session-id': resp[0].value
					},
					dataType : 'json',
					success: function(result) {
						if (result.body[0].server_error_message) {
							processor(false)
						} else {
							try {
								let messCount = result.body[0].person_notice.display_value
								processor(messCount)
							} catch(e) {
								processor(false)
							}
						}
					},
					error: () => processor(false)
				})
			})
		}
	},
	'love.ru':{
		'title'             : 'Love.ru',
		'site'              : 'love.ru',
		'messagePageUrl'    : 'https://love.ru/encounters/#messages',
		'urlForChMess'      : 'https://love.ru/encounters/#messages',
		'messCountSelector' : '#top_menu_msg_cnt',
		'loginSelector'     : '#top_menu_msg_cnt',
		'showed'            : false,
	},
	'topface.com':{
		'title'             : 'Topface',
		'site'              : 'topface.com',
		'messagePageUrl'    : 'https://topface.com/dating/ref/from_inbox/',
		'messCountSelector' : '.cntMessages',
		'loginSelector'     : '.logout',
		'showed'            : false,
		'check'             : function (processor) {
			processor.request( 'https://topface.com/json/service/', {
				method: 'POST',
				dataType: 'json',
				headers: {
					'content-type': 'application/json'
				},
				success: function(result) {
					if (result.is_authenticated === "1") {
						try {
							processor(result.web_user.new_messages_count);
						} catch(e) {
							processor(false)
						}
					} else {
						processor(false)
					}
				},
				error: () => processor(false)
			})
		}
	},
 	'my.mail.ru':{
		'title'             : 'Мой мир',
		'site'              : 'my.mail.ru',
		'domains'           : ['my.mail.ru'],
		'messagePageUrl'    : 'https://my.mail.ru/?browse=dialogues',
		'urlForChMess'      : 'https://my.mail.ru/',
		'messCountSelector' : '[data-name="dialogues"]',
		'loginSelector'     : '.b-left-menu__avatar',
		'showed'            : false,
	},
	'yandex.ru':{
		'title'             : 'Yandex',
		'site'              : 'mail.yandex.ru',
		'domains'           : ['mail.yandex.ru','mail.yandex.kz','mail.yandex.by','mail.yandex.ua','mail.yandex.eu'],
		'messagePageUrl'    : '/',
		'messCountSelector' : '[data-react-focusable-id="unread"] .Text',
		'loginSelector'     : '[data-react-focusable-id="unread"]',
		'showed'            : true,
		'forceSound'        : true,
		'check'				: function(processor) {
			let host = this.domains[0]
			if (processor.data.host) {
				host = processor.data.host
			}

			let url = 'https://' + host + '/web-api/models/liza1?_m=app-badge-counter'

			processor.request(url, {
				method: 'POST',
				dataType: 'json',
				headers: {
					'content-type': 'application/json',
				},
				body : JSON.stringify({
					"models": [
						{
							"name": "app-badge-counter"
						}
					]
				}),
				success: (json) => {
					if (json.models[0].status !== 'ok') {
						return processor(false)
					}

					processor(json.models[0].data.counters.unread)
				},
				error: () => processor(false)
			})
		}
	},
	'gmail.com':{
		'title'				: 'GMail',
		'site'				: 'mail.google.com',
		'domains'           : ['mail.google.com'],
		'messagePageUrl'    : 'https://mail.google.com/',
		'messCountSelector' : 'div[id][data-tooltip]:first-of-type',
		'loginSelector'		: '[data-noaft]',
		'showed'			: true,
		'forceSound'        : true,
		'check'				: function (processor) {
			processor.request('https://mail.google.com/mail/u/0/feed/atom', {
				method: 'GET',
				dataType: 'html',
				success: function (html) {
					let messCount = html.querySelector('fullcount')
					if (messCount) {
						processor(messCount.textContent)
					}
				},
				error: () => processor(false)
			})
		}
	},
	'mail.proton.me':{
		'title' 		    : 'Proton Mail',
		'site'      	    : 'mail.proton.me',
		'domains'           : ['mail.proton.me'],
		'messagePageUrl'    : 'https://mail.proton.me/',
		'messCountSelector' : '[data-testid="navigation-link:unread-count"]',
		'loginSelector'     : '[data-testid="navigation-link:unread-count"]',
		'showed'            : false,
		'forceSound'        : true,
		'check'             : function (processor) {
			let check = function () {
				engine.cookies.getAll({domain: '.mail.proton.me'}, function (cookieList) {
					if (!cookieList.length) {
						return processor(false)
					}

					for (let cookie of cookieList) {
						if (cookie.name.includes('AUTH-')) {
							let uid = cookie.name.replace('AUTH-', '')

							processor.superRequest('https://mail.proton.me/api/mail/v4/messages/count', {
								method: 'GET',
								headers: {
									'x-pm-appversion': 'web-mail@5.0.29.6',
									'x-pm-uid': uid,
								},
								dataType: 'json',
								success: function (result) {
									if (result.Code !== 1000) {
										return processor(false)
									}
									return processor(result.Counts[0].Unread)
								},
								error: () => processor(false)
							})
						}
					}
				})
			}

			if (processor.silent) {
				processor.request('https://mail.proton.me/', {
					method : 'GET',
					success : () => check()
				})
			} else {
				check()
			}
		}
	},
	'mail.yahoo.com':{
		'title' 		    : 'Yahoo Mail',
		'site'      	    : 'mail.yahoo.com',
		'domains'           : ['mail.yahoo.com'],
		'messagePageUrl'    : 'https://mail.yahoo.com/',
		'urlForChMess'      : 'https://mail.yahoo.com/',
		'messCountSelector' : '[data-test-id="displayed-count-wrapper"]',
		'loginSelector'     : '[data-test-id="displayed-count-wrapper"]',
		'forceSound'        : true,
		'showed'            : false,
	},
	'mail.ru':{
		'title'             : 'Mail.ru',
		'site'              : 'e.mail.ru',
		'domains'           : ['e.mail.ru'],
		'messagePageUrl'    : 'https://e.mail.ru/inbox/',
		'messCountSelector' : '.ph-projects li:nth-child(1) .ph-project__counter, [data-testid="unread-messages-counter"]',
		'loginSelector'     : '[data-testid="account-name"], [data-testid="whiteline-account"]',
		'showed'			: false,
		'forceSound'        : true,
		'check'				: function(processor) {
			processor.request('https://portal.mail.ru/NaviData?mac=1', {
				method: 'GET',
				dataType: 'json',
				success: function (json) {
					if (json.status === 'ok') {
						processor(json.data.mail_cnt)
					} else {
						processor(false)
					}
				},
				error: () => processor(false)
			})
		}
	},
	'onliner.by':{
		'title'             : 'Onliner',
		'site'              : 'www.onliner.by',
		'domains'           : ['www.onliner.by', 'catalog.onliner.by', 'chats.onliner.by'],
		'messagePageUrl'    : 'https://chats.onliner.by',
		'messCountSelector' : '#global-chat-app > a > span',
		'loginSelector'     : '#global-chat-app > a > span',
		'showed'			: false,
		'check'				: function(processor) {
			processor.request('https://tech.onliner.by/sdapi/chats.api/unread?_=' + Math.random(), {
				method: 'GET',
				dataType: 'json',
				success: result => processor(result.chat),
				error: () => processor(false)
			})
		}
	},
	'rambler.ru':{
		'title'             : 'Rambler',
		'site'              : 'rambler.ru',
		'domains'           : ['mail.rambler.ru'],
		'messagePageUrl'    : 'https://mail.rambler.ru/folder/INBOX',
		'messCountSelector' : '.FoldersItem-right-2G, [href="https://mail.rambler.ru/folder/INBOX"]',
		'loginSelector'     : '.FoldersItem-right-2G, [data-cerber="topline::user_name::closed"], [data-cerber="topline::user_name::opened"]',
		'showed'            : false,
		'forceSound'        : true,
		'check'             : function(processor) {
			processor.superRequest('https://mail.rambler.ru/script/topline_info.js?cb=ramblerTopline.mailCount', {
				method : 'GET',
				success : function(result) {
					if (result.indexOf('mailCount') !== -1) {
						let found = /\((.*?)\)/g.exec(result)
						if (found && found[1] && found[1] !== 'null') {
							let json = JSON.parse(found[1])
							return processor(json.count)
						}
					}
					processor(false);
				},
				error: () => processor(false)
			})
		}
	},
	'aliexpress.com':{
		'title'             : 'AliExpress',
		'site'              : 'aliexpress.com',
		'domains'           : ['aliexpress.com', 'aliexpress.ru', 'aliexpress.pl', 'aliexpress.com', 'pl.aliexpress.com', 'es.aliexpress.com'],
		'messagePageUrl'    : 'https://shopnow.pub/redirect/cpa/o/rugficqemwmwk8tcz0xssakob3ypvfnu/',
		'partnerLink'		: 'https://shopnow.pub/redirect/cpa/o/rugficqemwmwk8tcz0xssakob3ypvfnu/',
		'messCountSelector' : '#flyout-remind-list, unread-message-count',
		'loginSelector'     : '#flyout-remind-list, unread-message-count',
		'showed'            : true,
		'activePartner'     : true,
		'forceSound'        : true,
		'check'             : function (processor) {
			processor.request('https://message.aliexpress.com/message/messageUnreadCountAjaxService.htm?_='+Math.random(), {
				method: 'GET',
				success: function(result) {
					try {
						result = result.replace('message_num=', '')
						let json = JSON.parse(result)
						processor(json.unread_count)
					} catch (e) {
						processor(false)
					}
				},
				error: () => processor(false)
			})
		}
	},
 	'allegro.pl':{
		'title'             : 'Allegro',
		'site'              : 'allegro.pl',
		'domain'            : ['allegro.pl'],
		//'messagePageUrl'    : 'https://allegro.pl/moje-allegro/moje-konto/centrum-wiadomosci/wiadomosci',
		'messagePageUrl'    : 'https://megabonus.com/y/SrXbs',
		'partnerLink'       : 'https://megabonus.com/y/SrXbs',
		'messCountSelector' : '[data-notification-tag="messageCenter"]',
		'loginSelector'     : '[data-notification-tag="messageCenter"]',
		'showed'            : false,
		'forceSound'        : true,
		'check'             : function (processor) {
			processor.request('https://edge.allegro.pl/notification-badges', {
				method: 'GET',
				dataType: 'json',
				headers: {
					Accept: 'application/vnd.allegro.public.v1+json',
				},
				success: result =>	processor(result.messageCenter),
				error: () => processor(false)
			})
		}
	},
	'beboo.ru':{
		'title'             : 'Beboo',
		'site'              : 'beboo.ru',
		'messagePageUrl'    : 'https://beboo.ru/',
		'urlForChMess'      : 'https://beboo.ru/',
		'messCountSelector' : '.ind-activ-mid',
		'loginSelector'     : '.profile-menu',
		'showed'            : false,
	},
	'avito.ru':{
		'title'             : 'Avito',
		'site'              : 'www.avito.ru',
		'domains'           : ['www.avito.ru'],
		'messagePageUrl'    : 'https://www.avito.ru/profile/messenger',
		'messCountSelector' : '[data-marker="header/unread-chats-counter"], [data-marker="tabbar/message/icon"]',
		'loginSelector'     : '[data-marker="header/menu-profile"], [data-marker="tabbar/profile_settings"]',
		'showed'            : true,
		'forceSound'        : true,
		'check'             : function (processor) {
			processor.superRequest('https://socket.avito.ru/fallback', {
				method: 'POST',
				body: '{"jsonrpc":"2.0","id":1686442473553,"method":"messenger.getUnreadCount.v1","params":{}}',
				headers: {
					'origin': '0https://m.avito.ru',
					'content-type': 'application/json',
				},
				dataType: 'json',
				success: result => processor(result.result.unreadChats),
				error: () => processor(false)
			})
		}
	},
	'kufar.by':{
		'title'             : 'Kufar',
		'site'              : 'www.kufar.by',
		'domains'           : ['www.kufar.by'],
		'messagePageUrl'    : 'https://www.kufar.by/account/messaging/',
		'messCountSelector' : '[data-testid="messages_counter"]',
		'loginSelector'     : 'span[class^="styles_avatar"]',
		'showed'            : false,
		'forceSound'        : true,
		'check'             : function (processor) {
			engine.cookies.getAll({domain: '.kufar.by', name: 'k_jwt'}, function(cookieList) {
				if (!cookieList.length) {
					return processor(false)
				}

				processor.request('https://api.kufar.by/messaging-api/v1/counter', {
					method: 'GET',
					dataType: 'json',
					headers: {
						Accept: '*/*',
						Authorization: 'Bearer ' + cookieList[0].value
					},
					success: result => processor(result.unread),
					error: () => processor(false)
				})
			})
		}
	},
	'dzen.ru':{
		'title'             : 'Дзен',
		'site'              : 'dzen.ru',
		'domains'           : ['dzen.ru'],
		'messagePageUrl'    : '',
		'messCountSelector' : 'span[class^=menu-items__notificationsCount]',
		'loginSelector'     : 'button.zen-ui-avatar',
		'showed'            : false,
		'forceSound'        : true,
		'check'             : function (processor) {
			processor.request('https://dzen.ru/api/bell/notifications/count', {
				method: 'GET',
				dataType: 'json',
				success: result => processor(result.count),
				error: () => processor(false)
			})
		}
	},
	'atlassian.com':{
		'title'             : 'Atlassian',
		'site'              : 'atlassian.com',
		'domains'           : ['start.atlassian.com', 'www.atlassian.com'],
		'messagePageUrl'    : 'https://start.atlassian.com/notifications',
		'messCountSelector' : '#atlassian-navigation-notification-count',
		'loginSelector'     : '[data-testid="nav__profile-menu-trigger"]',
		'showed'            : false,
		'forceSound'        : true,
		'check'             : function (processor) {
			let diff = Math.abs((new Date()).getTime() - this.lastCheckTime?.getTime()) / 1000
			if (diff >= 60 || this.lastCheckTime === undefined) {
				processor.request('https://start.atlassian.com/gateway/api/notification-log/api/3/notifications/count/unseen', {
					method: 'GET',
					dataType: 'json',
					success: result => processor(result.count),
					error: () => processor(false)
				})

				this.lastCheckTime = new Date()
			}
		}
	},
	'outlook.com':{
		'title'             : 'Outlook',
		'site'              : 'atlassian.com',
		'domains'           : ['outlook.live.com'],
		'messagePageUrl'    : 'https://outlook.live.com/mail/0/',
		'messCountSelector' : '[role="tree"] div > span > span > span',
		'loginSelector'     : '#O365_MainLink_Me',
		'showed'            : false,
		'forceSound'        : true,
		'check'             : function (processor) {
			processor.request('https://outlook.live.com/owa/0/startupdata.ashx?app=Mail&n=0', {
				method: 'POST',
				dataType: 'json',
				success: result => processor(result.findFolders.Body.ResponseMessages.Items[0].RootFolder.Folders[0].UnreadCount),
				error: () => processor(false)
			})
		}
	}
}