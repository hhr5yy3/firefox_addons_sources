class Options {
    constructor() {
        // binded functions
        this.handleDataToRemove = this.handleDataToRemove.bind(this);
        // start main logic
        this.getDomElements();
        this.markCheckedElements();
        this.initDomListeners();
        // this.renderFilters();
    }
    markCheckedElements() {
        try {
            this.getStorageData()
                .then(data => {
                    const { timePeriod, dataToRemove, autorefresh, floatbtn, cookie_settings } = data;
                    if (autorefresh) this.autorefresh.checked = true;
                    if(floatbtn) this.floatbtn.checked = true;
                    if (dataToRemove.length) {
                        dataToRemove.forEach(removeItem => {
                            for (let i = 0; i < this.removeDataItems.length; i++) {
                                const item = this.removeDataItems[i];
                                if (item.id === removeItem) {
                                    item.checked = true;
                                    break;
                                }
                            }
                        });
                    }
                    // set time period
                    for (let i = 0; i < this.timePeriodItems.length; i++) {
                        if (this.timePeriodItems[i].id === timePeriod) this.timePeriodItems[i].checked = true;
                    }
                    // cookie settings
                    const postfix = cookie_settings.inclusive ? '_yes' : '_no';
                    document.querySelector('#cookies_filter_inclusive' + postfix).checked = true;
                    this.renderFilters(cookie_settings);
                    this.showElement({ selector: '#main' });
                })
        } catch (error) {
            this.renderFilters(cookie_settings);
            this.showElement({ selector: '#main' });
        }
    }
    renderFilters(cookie_settings) {
        cookie_settings.filters.forEach(filterDomain => this.handleAddDomain(filterDomain))
    }
    getStorageData() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(store => {
                const timePeriod = store.timePeriod;
                const dataToRemove = JSON.parse(store.dataToRemove);
                const autorefresh = store.autorefresh;
                const floatbtn = store.floatbtn;
                const cookie_settings = JSON.parse(store.cookie_settings);
                resolve({timePeriod, dataToRemove, autorefresh, floatbtn, cookie_settings});
            });
        })
    }
    getDomElements() {
        this.autorefresh = document.querySelector('#autorefresh');
        this.floatbtn = document.querySelector('#floatbtn');
        // data to remove items
        this.removeDataItems = document.querySelectorAll('#remove-list li > input');
        this.timePeriodItems = document.querySelectorAll('#time-period input');
        this.cookieFilters = document.querySelector('a.filters');
        this.cookiesInclusiveInputs = document.querySelectorAll('#cookie-filters p input');
        this.addDomainBtn = document.querySelector('a.add');
    }
    initDomListeners() {
        this.autorefresh.addEventListener('change', this.handleCommonSettings);
        this.floatbtn.addEventListener('change', this.handleCommonSettings);
        [].forEach.call(this.removeDataItems, input => input.addEventListener('change', this.handleDataToRemove));
        [].forEach.call(this.timePeriodItems, input => input.addEventListener('change', this.handleTimePeriod));
        this.cookieFilters.addEventListener('click', this.handleFilters);
        [].forEach.call(this.cookiesInclusiveInputs, input => input.addEventListener('change', this.handleInclusiveInputs));
        this.addDomainBtn.addEventListener('click', ev => {
            ev.preventDefault();
            this.handleAddDomain('', true);
            return false;
        });
    }
    handleCommonSettings(ev) {
        chrome.storage.local.set({[ev.target.id]: ev.target.checked}, details => {});
    }
    handleDataToRemove(ev) {
        const removeData = [];
        [].forEach.call(this.removeDataItems, item => {
            if (item.checked) removeData.push(item.value);
        });
        chrome.storage.local.set({dataToRemove: JSON.stringify(removeData)}, details => {});
    }
    handleTimePeriod(ev) {
        chrome.storage.local.set({timePeriod: ev.target.value}, details => {});
    }
    handleFilters(ev) {
        ev.preventDefault();
        const cookiesLi = $(this).closest("li");
        const aside = $("aside", cookiesLi);
        aside.slideToggle();
        return false;
    }
    handleInclusiveInputs(ev) {
        chrome.storage.local.get(['cookie_settings'], data => {
            const filters = JSON.parse(data.cookie_settings);
            if (ev.target.value === 'no') {
                filters.inclusive = false;
            } else {
                filters.inclusive = true;
            }
            chrome.storage.local.set({cookie_settings: JSON.stringify(filters)}, details => {})
        })
        
    }
    handleAddDomain(value, isTrue) {
        value = value || "";
        const parent = $("#cookie-filters ol");
        parent.append(this.createFilterItem(value));
        const insertedLi = parent.find('li:last-child');
        insertedLi.hide();
        insertedLi.fadeIn(100, () => {
            insertedLi.removeClass("hidden");
            if (isTrue) $("input", insertedLi).focus();
        });
        insertedLi.find("a.remove").click(this.onDomainRemove.bind(this));
        insertedLi.find("input[type='text']").on("blur", {
            validate: true
        }, this.validateDomain).on("change", {
            validate: true
        }, this.validateDomain).on("keyup", {
            validate: false
        }, this.validateDomain);
    }
    
    createFilterItem(value) {
        const li = document.createElement('li');
        li.className = 'suboption hidden';
        const input = document.createElement('input');
        input.value = value;
        input.type = 'text';
        input.placeholder = 'e.g. ".domain.com" or "sub.domain.com"';
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'remove';
        link.textContent = 'remove';
        li.appendChild(input);
        li.appendChild(link);
        return li;
    }
    onDomainRemove(ev) {
        ev.preventDefault();
        const li = $(ev.target).closest("li");
        li.addClass('hidden');
        this.validateDomain();
        const outerLi = li.closest('li');
        outerLi.delay(200);
        outerLi.slideToggle(150, () => {
            $(outerLi).remove();
        })
        // li.closest('li').delay(200).slideUp(150, () => {
        //     $(this).remove();
        // })
        return false;

    }
    validateDomain(ev) {
        const domains = [];
        $("#cookie-filters input[type='text']").each(function () {
            if (!$(this).closest("li").hasClass("hidden")) {
                let value = this.value;
                if (value && "" !== value && value.length >= 3) {
                    if (!ev || ev.data.validate) {
                        $(this).removeClass("error");
                        const d = value.split('.');
                        if (d.length <= 1 && value !== "localhost") return void $(this).addClass("error");
                        d.length === 2 && d[1] !== "local"  && (value = "." + value);
                         this.value = value;
                    }
                    domains.push(value);
                }
            }
        });
        chrome.storage.local.get(['cookie_settings'], data => {
            const currentFilters = JSON.parse(data.cookie_settings);
            currentFilters.filters = domains;
            chrome.storage.local.set({cookie_settings: JSON.stringify(currentFilters)}, details => {});
        })
    }
    showElement(obj) {
        if (obj.selector) {
            document.querySelector(obj.selector).classList.remove('hidden');
        } else {
            element.classList.remove('hidden');
        }
    }
}

const guruOptions = new Options();