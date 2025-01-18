const elById = (a) => document.getElementById(a);

function getParameterByName(a, b) {
    b || (b = window.location.href), a = a.replace(/[\[\]]/g, '\\$&');
    const c = new RegExp('[?&]' + a + '(=([^&#]*)|&|#|$)'),
        d = c.exec(b);
    return d ? d[2] ? decodeURIComponent(d[2].replace(/\+/g, ' ')) : '' : null
}

const _PRELOAD_WRAPPER = 	'<div id="preloader-in-modal" class="preloader-wrapper active">' + 
								'<div class="spinner-layer spinner-blue-only">' +
									'<div class="circle-clipper left">' + 
										'<div class="circle"></div>' + 
									'</div>' + 
									'<div class="gap-patch">' + 
										'<div class="circle"></div>' + 
									'</div>' + 
									'<div class="circle-clipper right">' + 
										'<div class="circle"></div>' + 
									'</div>' + 
								'</div>' + 
							'</div>';
					
const _CONTEXT_MENU_BOX =	'<div class="context-menu-box">' + 
								'<button class="context-menu-button icon"></button>' + 
								'<div class="context-menu">' + 
									'<ul role="menu" class="context-menu-list">' + 
										'<li class="context-menu-item open-in-new-tab"><span class="icon icon-spacer icon-new-window"></span>Open in New Tab</li>' + 
										'<li class="context-menu-item open-in-private"><span class="icon icon-spacer icon-new-window-private"></span>Open in Private Mode</li>' + 
										'<li class="separator"></li>' + 
										'<li class="context-menu-item edit-tile"><span class="icon icon-spacer icon-edit"></span>Edit Tile</li>' + 
										'<li class="context-menu-item remove-tile"><span class="icon icon-spacer icon-delete"></span>Remove Tile</li>' + 
									'</ul>' + 
								'</div>' + 
							'</div>';

class NewTab {
    constructor() {
        this.data = {
            version: 103,
            hideMode: !1,
            hideAddNewMode: !1,
            tilesColorMode: !1,
            tilesCount: 0,
            tilesPaddingCount: 1,
            columnCount: 6,
            containerWidthCount: 9,
            bodyBgAttr: 'bg-white',
            backgroundImg: '',
            searchService: 'fastsearch',
            searchServiceObj: {
                fastsearch: 'https://search.yahoo.com/yhs/search?hspart=foxload&hsimp=yhs-speeddial&grd=1&p='
            }
        }, this.bookmarks = [], this.history = [], this.ref = '', this.initData()
    }
    initData() {
        browser.storage.local.get((a) => {
			if (a.data) {
				this.data = a.data;
			}
			if (a.bookmarks) {
				this.bookmarks = a.bookmarks;
			}
			if (a.ref) {
				this.ref = a.ref;
			} 
			
			this.init();
        })
    }
    init() {
        this.renderTiles(), 
        this.setTheme(), 
        this.initHandlers(), 
        $('.modal').modal(), 
        this.checkUrlAsSaveBookmark(),
        this.initPreview(), 
        this.initAutocomplete(), 
        this.initAutocompleteSuggest(),
        this.initSortable(), 
        this.renderCounters(), 
        this.initCheckbox(), 
        $(`[name="search-service"][value="${this.data.searchService}"]`).prop('checked', !0), 
        $('select').material_select(),
        $(document.body).fadeIn(300)
    }
    saveData(reload) {
        chrome.storage.local.set({
            data: this.data,
            bookmarks: this.bookmarks
        }, function() {
			if (reload) {
				chrome.tabs.reload();
			}
		});
    }
    renderTiles() {
        //this.bookmarks = this.bookmarks.slice(0, this.data.tilesCount);
        let a = '';
        this.bookmarks.forEach((b) => {
            a += `<div class="tile-box"><a class="tile" href="${b.url}" title="${b.title}"><div class="head"><div class="favicon"><img src="https://www.google.com/s2/favicons?domain=${b.url}"></div><div class="title">${b.title}</div>${_CONTEXT_MENU_BOX}</div><div class="body" style="background-image: ${b.preview||'none'};">${b.initPreview?'':_PRELOAD_WRAPPER}</div></a></div>`
        });
        //for (let b = this.data.tilesCount; b > this.bookmarks.length; b--) a += '<div class="tile-box"><a class="tile add-bookmark ui-state-disabled"><i class="material-icons">add</i></a></div>';
        
       	a += '<div class="tile-box"><a class="tile add-bookmark"><i class="material-icons">add</i></a></div>';
		 
        elById('tiles')['innerHTML'] = a, this.fixContextMenu()
    }
    fixContextMenu() {
        setTimeout(() => {
            const a = $(document).width();
            $('#tiles').find('.tile-box').each((b, c) => {
                const d = $(c);
                300 > a - d.offset().left - d.width() && d.find('.context-menu-box').addClass('right-side')
            })
        }, 500)
    }
    initPreview() {
        const a = this.bookmarks.find((a) => !1 === a.initPreview);
        a && this.createPreview(a.url, (b) => {
            b && (a.preview = `url(${b})`), a.initPreview = !0, this.saveData(), this.renderTiles(), this.initPreview()
        })
    }
    initHandlers() {
        $(window).on('resize', (a) => this.renderDynamicStyle(a)), 
        $(document.body).on('click', (a) => this.bodyClick(a)), 
        $(document.body).on('submit', '#f', (a) => this.search(a)), 
        $(document.body).on('click', '.search-logo', (a) => this.showCreateModal(a)), 
        $(document.body).on('click', '.tile.add-bookmark', (a) => this.showCreateModal(a)), 
        $(document.body).on('click', '.tile .edit-tile', (a) => this.showEditModal(a)), 
        $(document.body).on('click', '#save-bookmark-btn', (a) => this.saveBookmark(a)), 
        $(document.body).on('change', '#form-url', () => this.changeInputUrl()), 
        $(document.body).on('click', '.tile .remove-tile', (a) => this.showRemoveModal(a)), 
        $(document.body).on('click', '#remove-bookmark-btn', (a) => this.removeBookmark(a)), 
        $(document.body).on('click', '#file-upload-btn', () => $('#input-file').click()), 
        $(document.body).on('change', '#input-file', (a) => this.inputFileChange(a)), 
        $(document.body).on('click', '#settings-btn', (a) => this.toggleSidebar(a)), 
        $(document.body).on('change', '.mode-checkbox', (a) => this.changeTheme(a)), 
        $(document.body).on('click', '.input-counter-add-btn', (a) => this.addCount(a)), 
        $(document.body).on('click', '.input-counter-remove-btn', (a) => this.removeTiles(a)), 
        $(document.body).on('click', '#refresh-preview', () => this.getPreview()), 
        $(document.body).on('click', '.context-menu-button', (a) => this.openContextMenu(a)), 
        $(document.body).on('click', '.tile .open-in-new-tab', (a) => this.openInNewtab(a)), 
        $(document.body).on('click', '.tile .open-in-private', (a) => this.openInPrivate(a)), 
        $(document.body).on('click', '[data-show-target]', (a) => this.toggleStep(a)), 
        $(document.body).on('click', '#sidebar .bg[data-bg]', (a) => this.changeBg(a)), 
        $(document.body).on('change', '#custom-bg-input-file', (a) => this.customWallpaper(a)),
        $(document.body).on("click", "#export", () => this.exportSettings()), 
        $(document.body).on("click", "#import", () => $("#import-file-input").click()), 
        $(document.body).on("change", "#import-file-input", a => this.importSettings(a))
    }
    initAutocomplete() {
        browser.history.search({
            text: '',
            maxResults: 1e3
        }, (a) => {
            this.history = a.map((a) => a.url);
            var historyList = [];
            this.history.forEach((a) => { if (a.indexOf('http') === 0) historyList.push(a) });
            
            jQuery.ui.autocomplete({
				source: function(request, response) {
					var results = $.ui.autocomplete.filter(historyList, request.term);
					response(results.slice(0, 10));
				}
			}, $('#form-url'));
        })
    }
    initAutocompleteSuggest() {
		var thisObj = this;
        
        jQuery.ui.autocomplete({
			source: function(request, response) {
				$.ajax({
				  url: 'https://www.bing.com/osjson.aspx?query='+elById('q').value,
				  dataType: 'json',
				  success: function(data) {
					response(data[1].slice(0, 10));
				  }
				});
			},
			select: function(event, ui) {
				elById('q').value = ui.item.value;
				thisObj.search(event);
			}
		}, $('#q'));
	}
    initSortable() {
        $('#tiles').sortable({
            distance: 20
        }).on('sortstop', () => {
            const a = $('#tiles').find('.tile:not(.add-bookmark)').map((a, b) => ({
                url: b.href,
                title: b.title,
                preview: $(b).find('.body')[0].style.backgroundImage.replace(/"/g, ''),
                initPreview: !0
            }));
            this.bookmarks = $.makeArray(a), this.saveData()
        })
    }
    initCheckbox() {
        $('input[type="checkbox"][data-mode]').each((a, b) => $(b).prop('checked', this.data[b.dataset.mode]))
    }
    changeTheme(a) {
        const b = a.target.dataset.mode;
        this.data[b] = a.target.checked, this.saveData(), this.setTheme()
    }
    setTheme() {
        this.data.hideMode ? $(document.body).addClass('hide-mode') : $(document.body).removeClass('hide-mode'), 
        this.data.hideAddNewMode ? $(document.body).addClass('hide-add-new-mode') : $(document.body).removeClass('hide-add-new-mode'), 
        this.data.tilesColorMode ? $(document.body).addClass('color-tiles-mode') : $(document.body).removeClass('color-tiles-mode'), 
        $(document.body).attr('data-bg', this.data.bodyBgAttr), 
        'custom' === this.data.bodyBgAttr ? $(document.body).css('background-image', `url(${this.data.backgroundImg})`) : $(document.body).css('background-image', ``), 
        $('.bg[data-bg="custom"]').css('background-image', `url(${this.data.backgroundImg})`), 
        $(`.bg[data-bg]`).removeClass('active').filter(`.bg[data-bg="${this.data.bodyBgAttr}"]`).addClass('active'), 
        this.renderDynamicStyle()
    }
    search(a) {
        a.preventDefault();
        const b = elById('q').value;
        let c = this.data.searchServiceObj[this.data.searchService];
        location.href = 'https' === b.slice(0, 5) ? b : c + encodeURIComponent(b) + (this.ref != '' ? '&ref='+this.ref : '')
    }
    checkUrlAsSaveBookmark() {
        if (-1 !== location.search.indexOf('?add_url')) {
            const a = getParameterByName('title'),
                b = getParameterByName('add_url');
            elById('preloader-in-modal').style.display = 'none';
            const c = $('#bookmark-modal');
            $('#save-bookmark-btn').removeAttr('data-item-id'), c.modal('open'), elById('form-url').value = b, elById('form-title').value = a, elById('preview').style.backgroundImage = 'none', this.getPreview()
        }
    }
    showCreateModal() {
        elById('preloader-in-modal').style.display = 'none';
        const a = $('#bookmark-modal');
        $('#save-bookmark-btn').removeAttr('data-item-id'), a.modal('open'), elById('form-url').value = '', elById('form-title').value = '', elById('bookmark-modal-title').innerHTML = 'Add Tile', elById('preview').style.backgroundImage = 'none', this.bodyClick()
    }
    showEditModal(a) {
        a.preventDefault(), a.stopPropagation(), elById('preloader-in-modal').style.display = 'none';
        const b = $(a.target).closest('.tile-box').index(),
            c = this.bookmarks[b],
            d = $('#bookmark-modal');
        $('#save-bookmark-btn').attr('data-item-id', b), d.modal('open'), elById('form-url').value = c.url, elById('form-title').value = c.title, elById('bookmark-modal-title').innerHTML = 'Edit Tile', elById('preview').style.backgroundImage = c.preview || 'none', $('#refresh-preview').show(), this.bodyClick()
    }
    isValidURL(str) {
		try {
		  var url = new URL(str);
		  return true;
		} catch (e) {
		  return false;
		}
	}
    saveBookmark(a) {
        const b = $(a.target).attr('data-item-id'),
            c = {
                url: this.addHttp(elById('form-url').value),
                title: elById('form-title').value,
                preview: elById('preview').style.backgroundImage.replace(/"/g, ''),
                initPreview: !0
            };
        
        if (c.url && this.isValidURL(c.url)) {
			b === void 0 ? this.bookmarks.push(c) : this.bookmarks[+b] = c, this.saveData(), this.renderTiles(), elById('form-url').value = '', elById('form-title').value = '', elById('preview').style.backgroundImage = `none`, $('#bookmark-modal').modal('close')
        } else {
			alert("Error: Valid URL is required!");
		}
    }
    changeInputUrl() {
        const a = elById('form-url').value;
        a && $('#refresh-preview').show(), browser.history.search({
            text: '',
            maxResults: 1e3
        }, (b) => {
            const c = b.find((b) => b.url === a),
                d = $('#form-title');
            c && c.title ? d.val(c.title) : this.getTitleFromSite(a, (b) => {
                const c = b ? b : this.getRootDomain(a);
                d.val(c)
            })
        }), this.getPreview()
    }
    getRootDomain(a) {
        return a.replace(/https?:\/\//, '').replace(/\?.+/, '').replace(/\/$/, '')
    }
    getPreview() {
        const a = elById('form-url').value,
            b = this.addHttp(a);
        a && b && (elById('preloader-in-modal').style.display = 'block', this.createPreview(b, (a) => {
            elById('preview').style.backgroundImage = `url(${a})`, elById('preloader-in-modal').style.display = 'none'
        }))
    }
    inputFileChange(a) {
        const b = a.target.files[0],
            c = new FileReader;
        c.onload = (a) => {
            this.resizeImg(a.target.result, (a) => {
                elById('preview').style.backgroundImage = `url(${a})`
            })
        }, c.readAsDataURL(b)
    }
    showRemoveModal(a) {
        a.preventDefault(), a.stopPropagation();
        const b = $(a.target).closest('.tile-box').index();
        $('#remove-bookmark-modal').modal('open'), $('#remove-bookmark-btn').attr('data-item-id', b), this.bodyClick()
    }
    removeBookmark(a) {
        const b = +$(a.target).attr('data-item-id');
        this.bookmarks.splice(b, 1), this.saveData(), this.renderTiles()
    }
    bodyClick(a) {
        a && 0 < $(a.target).closest('#sidebar, #settings-btn, .context-menu-box').length || ($('#sidebar, #settings-btn').removeClass('active'), $('.context-menu').slideUp(100), $('.context-menu-button').removeClass('focus'))
    }
    addCount(a) {
        const b = $(a.target).closest('[data-setting]'),
            c = b.attr('data-setting'),
            d = +b.attr('data-max-value');
        this.data[c] >= d || (this.data[c] += 1, this.renderCounters(), this.renderTiles(), this.saveData())
    }
    removeTiles(a) {
        const b = $(a.target).closest('[data-setting]'),
            c = b.attr('data-setting'),
            d = +b.attr('data-min-value') || 0;
        this.data[c] <= d || (this.data[c] -= 1, this.renderCounters(), this.renderTiles(), this.saveData())
    }
    renderCounters() {
        $('[data-setting="tilesCount"] .input-counter-value').text(this.data.tilesCount), $('[data-setting="columnCount"] .input-counter-value').text(this.data.columnCount), $('[data-setting="containerWidthCount"] .input-counter-value').text(this.data.containerWidthCount), $('[data-setting="tilesPaddingCount"] .input-counter-value').text(this.data.tilesPaddingCount), this.renderDynamicStyle()
    }
    toggleSidebar() {
        const a = $('#sidebar, #settings-btn');
        $('#settings-btn').hasClass('active') ? a.removeClass('active') : a.addClass('active')
    }
    hiddenCapture(a, b) {
        browser.windows.create({
            url: a,
            width: 10,
            height: 10,
            left: 1e5,
            top: 1e5,
            type: 'popup'
        }, (a) => {
			if (!a.tabs || !a.tabs.length) return browser.windows.remove(a.id), b(null);
            const c = a.tabs[0].id;
            let d;
            browser.tabs.update(c, {
                muted: !0
            });
            const e = setTimeout(() => {
                clearInterval(d), browser.windows.remove(a.id), b(null)
            }, 5000);
            d = setInterval(() => {
                browser.tabs.get(c, (c) => {
                   'complete' === c.status && (clearInterval(d), clearTimeout(e), setTimeout(() => {
					   browser.windows.update(a.id, {
							width: 1200,
							height: 800,
							left: 1e6,
							top: 1e6
						}, () => {
							setTimeout(() => {
							browser.tabs.captureVisibleTab(a.id, (c) => {
								browser.windows.remove(a.id, () => b(c))
							})
							}, 500)
						});
                    }, 200))
                })
            }, 200)
        })
    }
    resizeImg(a, b) {
        let c = new Image;
        c.src = a, c.onload = () => {
            var a = Math.floor;
            const d = document.createElement('canvas');
            let e, f, g = a(c.width / 280);
            2 <= g ? (5 <= g && (g = a(g / 1.3)), 1 & g && g--, e = c.width / g, f = c.height * (e / c.width), 140 > f && (e *= 140 / f, f = 140)) : (e = c.width, f = c.height), d.width = e, d.height = f;
            const h = d.getContext('2d');
            h.drawImage(c, 0, 0, e, f);
            const i = d.toDataURL('image/png');
            b(i)
        }, c.onerror = () => {
            b(null)
        }
    }
    createPreview(a, b) {
        this.hiddenCapture(a, (a) => this.resizeImg(a, (a) => b(a)))
    }
    addHttp(a) {
        return -1 === a.indexOf('http') ? 'http://' + a : a
    }
    openContextMenu(a) {
        a.preventDefault(), a.stopPropagation(), $('.context-menu-button').removeClass('focus'), $('.context-menu').slideUp(100), $(a.target).addClass('focus').next().slideDown(100)
    }
    openInNewtab(a) {
        a.preventDefault(), a.stopPropagation();
        const b = $(a.target).closest('[href]').attr('href');
        browser.tabs.create({
            url: b,
            active: !0
        }), this.bodyClick()
    }
    openInPrivate(a) {
        a.preventDefault(), a.stopPropagation();
        const b = $(a.target).closest('[href]').attr('href');
        browser.windows.create({
            url: b,
            incognito: !0
        }), this.bodyClick()
    }
    toggleStep(a) {
        const b = $(a.target).closest('[data-show-target]').attr('data-show-target');
        $('.settings-block').removeClass('active').filter(b).addClass('active')
    }
    changeBg(a) {
        this.data.bodyBgAttr = $(a.target).attr('data-bg'), this.saveData(), this.setTheme()
    }
    customWallpaper(a) {
        const b = a.target.files[0],
            c = new FileReader;
        c.onload = (a) => {
            this.data.backgroundImg = a.target.result, this.data.bodyBgAttr = 'custom', this.saveData(), this.setTheme()
        }, c.readAsDataURL(b)
    }
    renderDynamicStyle() {
        const a = +$(window).width(),
            b = 5 * this.data.containerWidthCount + 50,
            c = +(100 / this.data.columnCount).toFixed(5),
            d = 4 * this.data.tilesPaddingCount,
            e = a / this.data.columnCount,
            f = .7 * +(e - 2 * (e * d / 100));
        $('#dynamic-style').remove(), $(`            <style id="dynamic-style">                #tiles { width: ${b}%!important; }                main #tiles .tile-box { width: ${c}%!important; }                main #tiles .tile { margin: ${d+1}%!important; }                main #tiles .tile .body {height: ${f-30}px;}                main #tiles .tile.add-bookmark {height: ${+f}px;}            </style>        `).appendTo(document.head)
    }
    exportSettings() {
        const b = JSON.stringify({
                data: this.data,
                bookmarks: this.bookmarks
            });
            
		var blobObj = new Blob([b], {type : "application/json"});
		var downloadUrl = URL.createObjectURL(blobObj);
		
		var d = document.createElement("a");
		d.href = downloadUrl, d.download = `FF Speed Dial settings(${new Date().toISOString().slice(0,-8)}).json`, document.body.appendChild(d), d.click(), document.body.removeChild(d)
    }
    importSettings(a) {
        const b = new FileReader;
        b.onload = () => {
            try {
                const a = JSON.parse(b.result);
                
                if (a.data && a.bookmarks) {
					this.data = a.data, this.bookmarks = a.bookmarks, this.saveData(true)
				} else {
					throw new Error();
				}
            } catch (a) {
                alert("Error: This is not a valid Speed Dial settings file!")
            }
        }, b.readAsText(a.target.files[0])
    }
    getTitleFromSite(a, b) {
        function c(a) {
            return (a + '').replace(/(&amp;)/g, '&').replace(/(&lt;)/g, '').replace(/(&gt;)/g, '').replace(/(&quot;)/g, '"').replace(/(&#39;)/g, '\'').replace(/(&#58;)/g, ':').replace(/(&#x2F;)/g, '/')
        }
        const d = this.addHttp(a),
            e = new XMLHttpRequest;
        e.onload = () => {
            const d = /(<title>)\s*(.+)\s*(<\/title>)/,
                f = d.exec(e.responseText) || [],
                a = f[2] ? c(f[2]) : '';
            b(a)
        }, e.onerror = () => b(''), e.open('GET', d, !0), e.send()
    }
}
var n = new NewTab;
