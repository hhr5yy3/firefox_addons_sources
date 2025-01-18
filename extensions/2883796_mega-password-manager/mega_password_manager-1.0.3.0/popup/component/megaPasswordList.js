class MegaPasswordList extends MegaView {
    constructor(options) {
        super(options);

        this.vaultPasswords = [];
        this.orderDir = '1';
        this.addClass('password-list-page');

        this.initPasswordList().then(() => {
            const verticalDivider = document.createElement('div');
            verticalDivider.className = 'vertical-divider';

            this.passwordItem = new MegaPasswordItemDetail();

            this.domNode.append(verticalDivider, this.passwordItem.domNode);
            mega.ui.pm.list = this;

            this.initEmptyState();
            this.initSkeletonLoading();
            this.loadList();
        });
    }

    /**
     * Initialize the password list.
     *
     * @returns {void}
     */
    async initPasswordList() {
        this.searchResultsDiv = document.createElement('div');
        this.searchResultsDiv.className = 'search-results hidden';
        this.searchResultsDiv.textContent = l.search_results;

        this.passwordPanel = document.createElement('div');
        this.passwordPanel.className = 'password-list-panel';
        this.passwordList = document.createElement('div');
        this.passwordList.className = 'password-list';
        this.passwordPanel.append(this.passwordList);

        this.domNode.append(this.passwordPanel);

        const {sortdata} = await mega.ui.pm.comm.getSortData();

        const _getSortedKey = () => {
            if (sortdata && sortdata[0]) {
                if (sortdata[1] === -1) {
                    return `${sortdata[0]}_r`;
                }

                return sortdata[0];
            }

            return 'name';
        };

        const dropdownItems = {
            'name': l.title_a_z,
            'name_r': l.title_z_a,
            'date_r': l.title_date_newest,
            'date': l.title_date_oldest
        };

        this.dropdown = new MegaDropdown({
            parentNode: this.passwordPanel,
            dropdownMenuParentNode: mainlayout,
            type: 'fullwidth',
            rightIcon: 'icon sprite-pm-ext-mono icon-chevron-down-thin-outline',
            text: l.sort_by_title,
            prepend: true,
            listContainerClass: 'sort-password-list',
            componentClassname: 'name-sort',
            dropdownItems,
            dropdownOptions: {},
            selected: _getSortedKey(),
            scrollTo: false,
            name: 'pwd-list-sorting',
            onSelected: async({currentTarget}) => {
                const sortdata = currentTarget.selected.split('_');
                sortdata[1] = sortdata[1] === 'r' ? -1 : 1;

                await mega.ui.pm.comm.setSortData(sortdata);
                await this.orderList();
                this.searchList(this.searchTerm);

                if (currentTarget.selected === 'name') {
                    eventlog(590002);
                }
                else if (currentTarget.selected === 'name_r') {
                    eventlog(590003);
                }
                else if (currentTarget.selected === 'date') {
                    eventlog(590005);
                }
                else if (currentTarget.selected === 'date_r') {
                    eventlog(590004);
                }

                return false;
            }
        });

        this.passwordPanel.prepend(this.searchResultsDiv);
    }

    /**
     * Initialize the empty state.
     *
     * @returns {void}
     */
    initEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';

        this.emptyStateTitle = document.createElement('h1');
        this.emptyStateCopy = document.createElement('p');
        this.emptyStateImage = document.createElement('div');

        emptyState.append(this.emptyStateImage, this.emptyStateTitle, this.emptyStateCopy);

        this.emptyStateAction = new MegaButton({
            parentNode: emptyState,
            text: l[1364],
            componentClassname: 'primary'
        });
        this.emptyStateAction.on('click', () => {
            this.removeClass('is-empty');
            this.loadList();
        });

        this.domNode.append(emptyState);
    }

    /**
     * Initialize the skeleton loading.
     *
     * @returns {void}
     */
    initSkeletonLoading() {
        for (let i = 0; i < 3; i++) {
            new MegaInteractable({
                parentNode: this.passwordList,
                componentClassname: 'password-item',
                type: 'fullwidth',
                text: 'a',
                subtext: 'b',
                icon: 'sk-elm',
                skLoading: true
            });
        }
    }

    /**
     * Load the password list.
     *
     * @returns {void}
     */
    async loadList() {
        this.vaultPasswords = [];
        const result = await mega.ui.pm.comm.loadVault();

        if (Array.isArray(result)) {
            this.vaultPasswords = result;

            if (!this.count) {
                return;
            }

            this.dropdown.removeClass('sk-loading');

            await this.orderList();
            this.searchList(this.searchTerm);
        }
        else if (typeof result === "number") {
            this.addClass('is-empty');
            this.emptyStateTitle.textContent = l.unable_to_load_items;
            this.emptyStateCopy.textContent = '';
            this.emptyStateCopy.append(parseHTML(l.error_fetching_items));
            this.emptyStateImage.className = 'error';
            this.emptyStateAction.show();
        }

        const searchBar = mega.ui.header.domNode.querySelector('.search-bar');
        searchBar.querySelector('.form-element').disabled = false;
        searchBar.classList.remove('disabled');
    }

    /**
     * Populate the password list with values from the vault.
     *
     * @returns {void}
     */
    drawList(filteredList) {
        const previousSelectedItem = this.selectedItem;
        let initial = null;
        this.selectedItem = null;
        const curDate = new Date();
        const sevenDaysAgoTime = curDate.setDate(curDate.getDate() - 7) / 1000;
        const groupedItems = [];
        const passwordNodes = filteredList || this.vaultPasswords;

        this.passwordList.textContent = '';

        if (passwordNodes.length === 0) {
            this.addClass('is-empty');
            this.emptyStateImage.className = 'empty-state empty-search-results';
            this.emptyStateTitle.textContent = l.no_search_results;
            this.emptyStateCopy.textContent = l.search_again;
            this.emptyStateAction.hide();

            return;
        }

        this.removeClass('is-empty');

        for (const passwordNode of passwordNodes) {
            const pwmItem = passwordNode.pwm;
            const passwordName = passwordNode.name || pwmItem.url;
            let passwordInitial = passwordName.toUpperCase().trim().slice(0, 1);

            if (this.order[0] === 'name') {
                const nonLangRegex = new RegExp(/[^\p{L}]/u);

                if (nonLangRegex.test(passwordInitial)) {
                    passwordInitial = '#';
                }

                if (initial !== passwordInitial) {
                    const header = new MegaComponent({
                        parentNode: this.passwordList,
                        componentClassname: 'list-header'
                    });
                    header.domNode.textContent = initial = passwordInitial;
                }
            }
            else if (this.order[0] === 'date') {
                let key = l[1301];
                const date = passwordNode.ts;
                const todayRange = calculateCalendar('d');

                if (todayRange.start <= date && date <= todayRange.end) {
                    key = l[1301];
                }
                else if (date >= sevenDaysAgoTime) {
                    key = l[1304];
                }
                else {
                    key = time2date(date, 3);
                }

                if (!groupedItems.includes(key)) {
                    const header = new MegaComponent({
                        parentNode: this.passwordList,
                        componentClassname: 'list-header'
                    });

                    header.domNode.textContent = key;
                    groupedItems.push(key);
                }
            }

            const item = new MegaInteractable({
                parentNode: this.passwordList,
                componentClassname: 'password-item',
                text: passwordName,
                subtext: pwmItem.u,
                type: 'fullwidth'
            });

            item.domNode.id = passwordNode.h;

            const outer = document.createElement('div');
            outer.className = 'favicon';
            const span = document.createElement('span');
            outer.append(span);

            item.domNode.prepend(outer);
            generateFavicon(passwordName, pwmItem.url, outer);

            item.on('click', ({currentTarget}) => {
                const elemId = currentTarget.domNode.id;
                if (this.selectedItem) {
                    if (this.selectedItem.domNode.id === elemId) {
                        return true;
                    }
                    this.selectedItem.active = false;
                }
                this.passwordItem.showDetail(elemId);
                this.selectedItem = item;
                item.active = true;
                mega.ui.pm.comm.saveLastSelected(elemId);
            });
        }

        this.setSelectedPasswordItem(previousSelectedItem);
    }

    /**
     * Order the password list.
     *
     * returns {void}
     */
    async orderList() {
        const {sortdata} = await mega.ui.pm.comm.getSortData();
        this.order = sortdata || ['name', 1];

        mega.ui.pm.sort.doSort();

        const sortComp = this.domNode.componentSelector('.name-sort');
        sortComp.domNode.querySelector('.primary-text').textContent =
            this.order[0] === 'name' ? l.sort_by_title : l[17023];
    }

    /**
     * Get the number of passwords in the list.
     *
     * @returns {Number} Number of passwords in the list.
     */
    get count() {
        if (this.vaultPasswords.length) {
            this.removeClass('is-empty');
        }
        else {
            this.addClass('is-empty');
            this.emptyStateImage.className = 'empty-state';
            this.emptyStateTitle.textContent = l.empty_list_title;
            this.emptyStateCopy.textContent = l.empty_list_copy;
            this.emptyStateAction.hide();
        }

        return this.vaultPasswords.length;
    }

    /**
     * Highlight the selected password item.
     *
     * @returns {void}
     */
    setSelectedPasswordItem(previousSelectedItem) {

        delay('setSelectedPass', async() => {

            const item = await mega.ui.pm.comm.getLastSelected();
            let itemid;

            if (item && item.lastSelectedItem) {
                const existNode = await M.getNodeByHandle(item.lastSelectedItem);
                itemid = existNode && existNode.h;
            }

            if (!itemid) {

                itemid = mega.ui.pm.list.vaultPasswords[0].h;

                if (itemid) {
                    mega.ui.pm.comm.saveLastSelected(itemid);
                }
            }

            if (itemid) {
                this.selectedItem = document.componentSelector(`[id="${itemid}"]`);
                if (this.selectedItem) {
                    this.selectedItem.active = true;
                    this.selectedItem.domNode.scrollIntoView(false);
                    if (previousSelectedItem !== this.selectedItem.domNode.id) {
                        this.passwordItem.showDetail(this.selectedItem.domNode.id);
                    }
                    if (this.passwordList.Ps) {
                        this.passwordList.Ps.update();
                    }
                    else {
                        this.passwordList.Ps = new PerfectScrollbar(this.passwordList);
                    }
                }
            }
        }, 200);
    }

    searchList(searchTerm = '') {
        this.searchTerm = searchTerm.toLowerCase();
        let searchResults = false;

        if (this.searchTerm) {
            searchResults = this.vaultPasswords.filter(item => {
                return item.name.toLowerCase().includes(this.searchTerm)
                    || item.pwm.u && item.pwm.u.toLowerCase().includes(this.searchTerm)
                    || item.pwm.url && fullDomainFromURL(item.pwm.url).includes(this.searchTerm);
            });
            this.searchResultsDiv.classList.remove('hidden');
        }
        else {
            this.searchResultsDiv.classList.add('hidden');
        }

        this.drawList(searchResults);
    }
}
