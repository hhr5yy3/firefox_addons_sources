class Content {

    get tplFlplSidebar() {
        const flashesOnPageCount = this.flashesOnPage.length;

        return `
            <div class="flpl myFlashes">
                <div class="flpl-header">
                    <div class="flpl-logo-box">
                        <div class="flpl-logo"></div>
                        <div class="flpl-logo-title">Flash Player Plus</div>
                    </div>
                    <div class="flpl-menu">
                        <span class="flpl-menu-link active" data-tab="myFlashes">My Playlist</span>
                        <span class="flpl-menu-link" data-tab="flashesOnPage">Flashes on Current Page 
                            (<span id="flpl-flashes-count">${flashesOnPageCount}</span>)
                        </span>
                        <div class="flpl-close-icon"></div>
                    </div>
                </div>
                <div class="flpl-body">
                    <div class="flpl-embed-box"></div>
                    <ul class="flpl-flashes-ul"></ul>
                    <div class="flpl-add-by-url">+ Add Flash By URL</div>
                </div>
            </div>
        `;
    }

    constructor() {
        this.flashesOnPage = [];
        this.myFlashes = [];
        this.initHandlers();
        this.initOnMessageListener();
        this.initMyFlashes();
    }

    initHandlers() {
        const $b = $(document.body);
        $b.on('click', '.flpl-close-icon',         e => this.removeFlpl(e));
        $b.on('click', '.flpl-flash-title',        e => this.showFlash(e));
        $b.on('click', '.flpl-icon.flpl-download', e => this.downloadFlash(e));
        $b.on('click', '.flpl-icon.flpl-link',     e => this.openSite(e));
        $b.on('click', '.flpl-icon.flpl-edit',     e => this.showModal(e, true));
        $b.on('click', '.flpl-icon.flpl-remove',   e => this.showConfirmModal(e));
        $b.on('click', '.flpl-add-btn',            e => this.addToMyFlashes(e));
        $b.on('click', '.flpl-add-by-url',         e => this.showModal(e));
        $b.on('click', '.flpl-modal-close-icon',   e => this.closeModal(e));
        $b.on('click', '.flpl-modal-btn-cancel',   e => this.closeModal(e));
        $b.on('click', '.flpl-modal-btn-create',   e => this.createFlash(e));
        $b.on('click', '.flpl-modal-btn-save',     e => this.updateFlash(e));
        $b.on('click', '.flpl-modal-btn-remove',   e => this.removeFlash(e));
        $b.on('click', '.flpl-menu-link',          e => this.changeTab($(e.target).attr('data-tab')));
    }

    initOnMessageListener() {
        chrome.runtime.onMessage.addListener(msg => {
            if(msg['action'] === 'renderFlplSidebar') this.renderFlplSidebar();
            if(msg['action'] === 'flashFinder') this.pushFlashesOnPage(msg.flash);
        });
    }

    initMyFlashes() {
        chrome.storage.local.get('myFlashes', res => {this.myFlashes = res['myFlashes'] || []});
    }

    saveFlashes() {
        chrome.storage.local.set({'myFlashes': this.myFlashes});
    }

    pushFlashesOnPage(flash) {
        //console.log(flash);
        this.flashesOnPage.push(flash);
        this.setBadge(this.flashesOnPage.length);
    }

    setBadge(value) {
        chrome.runtime.sendMessage({action: 'setBadge', value: value});
    }

    renderFlplSidebar() {
        $('.flpl').remove();
        $(this.tplFlplSidebar).appendTo(document.body);
        this.renderEmbedBox();
        this.renderFlashesMenu();
        setTimeout(() => {$('.flpl').addClass('active');}, 300);
        if(this.flashesOnPage.length) this.changeTab('flashesOnPage');
    }

    /** _____________________ Renders _____________________ **/
    renderEmbedBox() {
        const flashesOnPageCount = this.flashesOnPage.length;
        const myFlashesCount     = this.myFlashes.length;
        // const needIFrame         = location.protocol === 'https:';

        $('.flpl-embed-box').html(`
            <div class="flpl-embed-msg flpl-embed-msg-select-flash">
                ${myFlashesCount ? 'Select flash for play.' : 'You flash playlist empty'}
            </div>
            <div class="flpl-embed-msg flpl-embed-msg-flashesOnPage">
                ${flashesOnPageCount ? 'Select flash for play.' : 'No flashes on this page'}
            </div>
        `);
    }

    renderEmbed(flash) {
        $('.flpl-embed-box .flpl-embed-target').remove();
        const url    = flash.url;
        const src    = location.protocol === 'https:' ? `https://greatapptst.com/redirect.php?url=${url}` : url;
        $(`<embed class="flpl-embed-target flpl_initiated"
                   src="${src}"
                   width="100%" height="100%"
                   allowscriptaccess="always"
                   type="application/x-shockwave-flash"
                   pluginspage="http://www.adobe.com/go/getflashplayer"
                   ${flash.base ? `base="${flash.base}"` : ''}
        >`).appendTo('.flpl-embed-box');
    }

    renderFlashesMenu(target) {
        target = target || 'myFlashes';
        let html = '';

        if(target === 'myFlashes') {
            html = this.myFlashes.map((f, i) => `
            <li data-target="myFlashes" data-index="${i}">
                <span class="flpl-flash-title">${f.name}</span>
                <div class="flpl-btns">
                    <span class="flpl-icon flpl-download"></span>
                    ${f.site ? '<span class="flpl-icon flpl-link"></span>' : ''}
                    <span class="flpl-icon flpl-edit"></span>
                    <span class="flpl-icon flpl-remove"></span>
                </div>
            </li>
            `).join('');

        } else {
            html = DOMPurify.sanitize(this.flashesOnPage.map((f, i) => `
            <li data-target="flashesOnPage" data-index="${i}">
                <span class="flpl-flash-title">${f.name}</span>
                <div class="flpl-btns">
                    <span class="flpl-add-btn">Add to Playlist</span>
                </div>
            </li>
            `).join(''), { SAFE_FOR_JQUERY: true });
        }

        $('.flpl-flashes-ul').html(html);
    }

    /** _____________________ Handlers  ___________________________ **/
    removeFlpl() {
        $('.flpl').removeClass('active');
        setTimeout(() => {$('.flpl').remove();}, 300);
    }

    showFlash(e) {
        const $li    = $(e.target).closest('[data-index]');
        if($li.hasClass('active')) return;
        $('.flpl-flashes-ul li').removeClass('active');
        $li.addClass('active');
        const index  = +$li.attr('data-index');
        const target = $li.attr('data-target');
        const flash  = this[target][index];
        this.renderEmbed(flash);
        //console.log(flash);
    }

    downloadFlash(e) {
        const index = +$(e.target).closest('[data-index]').attr('data-index');
        const url   = this.myFlashes[index].url;
        chrome.runtime.sendMessage({action: 'downloadFlash', url: url});
    }

    openSite(e) {
        const index = +$(e.target).closest('[data-index]').attr('data-index');
        const site  = this.myFlashes[index].site;
        open(site);
    }

    showModal(e, editMode, flash) {
        const okBtnClass = editMode ? 'flpl-modal-btn-save' : 'flpl-modal-btn-create';
        const modalTitle = editMode ? 'Edit Flash'          : 'Add Flash';
        let index        = null;
        let flashName    = '';
        let flashUrl     = '';
        let flashSite    = '';
        let flashBase    = '';

        if(editMode) {
            index      = +$(e.target).closest('[data-index]').attr('data-index');
            flashName  = this.myFlashes[index].name;
            flashUrl   = this.myFlashes[index].url;
            flashSite  = this.myFlashes[index].site || '';
            flashBase  = this.myFlashes[index].base || '';
        }

        if(flash) { // Добавлние флешки с flashesOnPage
            flashUrl  = flash.url;
            flashName = flash.name;
            flashSite = location.href;
            flashBase = flash.base;
        }

        const tpl = `
            <div class="flpl-modal-overlay">
                <div class="flpl-modal">
                    <div class="flpl-modal-close-icon"></div>
                    <div class="flpl-modal-header">${modalTitle}</div>
                    <div class="flpl-modal-body">
                        <div class="flpl-input-box">
                            <label>Name</label>
                            <input type="text" id="flpl-name-input" value="${flashName}">
                        </div>
                        <div class="flpl-input-box">
                            <label>Url</label>
                            <input type="text" id="flpl-url-input" value="${flashUrl}">
                        </div>
                        <input type="hidden" id="flpl-site-input" value="${flashSite}">
                        <input type="hidden" id="flpl-base-input" value="${flashBase}">
                    </div>
                    <div class="flpl-modal-footer">
                        <button class="flpl-modal-btn flpl-modal-btn-cancel">Cancel</button>
                        <button class="flpl-modal-btn flpl-modal-btn-ok ${okBtnClass}" data-index="${index}">Save</button>
                    </div>
                </div>
            </div>`;

        $(DOMPurify.sanitize(tpl, { SAFE_FOR_JQUERY: true })).appendTo('.flpl');
    }

    showConfirmModal(e) {
        const index = +$(e.target).closest('[data-index]').attr('data-index');
        const tpl = `
            <div class="flpl-modal-overlay">
                <div class="flpl-modal flpl-remove-modal">
                    <div class="flpl-modal-close-icon"></div>
                    <div class="flpl-modal-header">Remove flash</div>
                    <div class="flpl-modal-body">You are sure?</div>
                    <div class="flpl-modal-footer">
                        <button class="flpl-modal-btn flpl-modal-btn-cancel">Cancel</button>
                        <button class="flpl-modal-btn flpl-modal-btn-ok flpl-modal-btn-remove" data-index="${index}">Remove</button>
                    </div>
                </div>
            </div>`;

        $(tpl).appendTo('.flpl');
    }

    addToMyFlashes(e) {
        const index = +$(e.target).closest('[data-index]').attr('data-index');
        const flash = this.flashesOnPage[index];
        if (!flash) { console.log('!flash', index, this.flashesOnPage); return;}
        this.showModal(e, null, flash);
    }

    closeModal(){
        $('.flpl-modal-overlay').remove();
    }

    get flashFromForm() {
        let urlInputVal = $('#flpl-url-input').val();
        if(urlInputVal.slice(0, 2) === '//') urlInputVal = 'https:' + urlInputVal;
        return {
            name: $('#flpl-name-input').val() || 'no-name',
            url:  urlInputVal,
            site: $('#flpl-site-input').val() || '',
            base: $('#flpl-base-input').val() || '',
        };
    }

    createFlash() {
        const flash = this.flashFromForm;
        this.myFlashes.push(flash);
        this.saveFlashes();
        this.closeModal();
        this.changeTab('myFlashes');
    }

    updateFlash(e) {
        const index = +$(e.target).attr('data-index');
        this.myFlashes[index] = this.flashFromForm;
        this.saveFlashes();
        this.closeModal();
        this.renderFlashesMenu();
    }

    removeFlash(e) {
        const index = +$(e.target).attr('data-index');
        this.myFlashes.splice(index, 1);
        this.saveFlashes();
        this.closeModal();
        this.renderFlashesMenu();
    }

    changeTab(tab) {
        this.renderFlashesMenu(tab);
        this.renderEmbedBox();
        $('.flpl-menu-link').removeClass('active').filter(`[data-tab="${tab}"]`).addClass('active');
        $('.flpl').removeClass('flashesOnPage myFlashes').addClass(tab);
    }

}

// noinspection JSUnusedGlobalSymbols
const c = new Content();
