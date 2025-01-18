// requires jquery

// events supported by the control
const PAGE_CHANGE_EVENT = 'page-change';
const eventNames = [PAGE_CHANGE_EVENT];

// button titles
const ELEMENT_PREV_PAGE_BUTTON_NAME = Messages.MULTIPAGE_PREV_PAGE_BUTTON || "Prev";
const ELEMENT_NEXT_PAGE_BUTTON_NAME = Messages.MULTIPAGE_NEXT_PAGE_BUTTON || "Next";
const ELEMENT_FIRST_PAGE_BUTTON_NAME = "⇤";
const ELEMENT_LAST_PAGE_BUTTON_NAME = "⇥";

class MultiPageCtrl {
    constructor(pageCount) {
        this.eventListeners = new Map()
        for (const eventName of eventNames) {
            this.eventListeners.set(eventName, []);
        }

        this.pageCount = pageCount;
        this.currentPage = 1;
        this.maxButtonCount = 0;

        this.rootElement = null;
    }

    // adds a listener to the given event
    addEventListener(eventName, listener) {
        // valid event name?
        if (!eventNames.includes(eventName)) {
            throw new Error(`MultiPageCtrl does not support the '${eventName}' event`);
        }
        this.eventListeners.get(eventName).push(listener);
    }

    removeEventListener(eventName, listener) {
        // valid event name?
        if (!eventNames.includes(eventName)) {
            throw new Error(`MultiPageCtrl does not support the '${eventName}' event`);
        }

        let array = this.eventListeners.get(eventName);
        if (typeof array !== 'undefined') {
            this.eventListeners.set(eventName, array.filter(item => item !== listener));
        }
    }

    emitEvent(eventName) {
        for (const listener of this.eventListeners.get(eventName)) {
            listener(this.currentPage);
        }
    }

    pageChange() {
        console.log(`Changed page to ${this.currentPage}`);
        this.emitEvent(PAGE_CHANGE_EVENT);
        this.refreshPageSelector();
    }

    changeToFirstPage() {
        if (this.currentPage > 1) {
            this.currentPage = 1;
            this.pageChange();
        }
    }

    changeToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.pageChange();
        }
    }

    changeToNextPage() {
        if (this.currentPage < this.pageCount) {
            this.currentPage++;
            this.pageChange();
        }
    }

    changeToLastPage() {
        if (this.currentPage < this.pageCount) {
            this.currentPage = this.pageCount;
            this.pageChange();
        }
    }

    changeToPage(pageNumber) {
        if (pageNumber != this.currentPage) {
            if (pageNumber > 0 && pageNumber <= this.pageCount) {
                this.currentPage = pageNumber;
                this.pageChange();
            } else {
                throw new Error(`Page number (${pageNumber}) is out of range `);
            }
        }
    }
}

class LegacyMultiPageCtrl extends MultiPageCtrl {

    // inserts the multi-page control in the HTML DOM
    insertInDom(parentElement) {
        // insert the control container element
        this.rootElement = $('<div>');
        this.rootElement.addClass('multiPageCtrlContainer');
        parentElement.append(this.rootElement);

        // Page navigation buttons and the text input page selector
        let firstPageBtnElement = $('<button id="multiPageFirst">').text(ELEMENT_FIRST_PAGE_BUTTON_NAME).addClass('multiPage left');
        firstPageBtnElement.click(() => { this.changeToFirstPage() });
        let prevPageBtnElement = $('<button id="multiPagePrev">').text(ELEMENT_PREV_PAGE_BUTTON_NAME).addClass('multiPage left');
        prevPageBtnElement.click(() => { this.changeToPreviousPage() });

        let pageSelectorElement = $('<div>').addClass('pageSelector');
        let pageSelectorTextInput = this.createPageSelectorTextInput();
        pageSelectorElement.append(pageSelectorTextInput);
        pageSelectorElement.append(`<span id="multiPagePageCount">&nbsp;/&nbsp;${this.pageCount}</span>`);

        let nextPageBtnElement = $('<button id="multiPageNext">').text(ELEMENT_NEXT_PAGE_BUTTON_NAME).addClass('multiPage right');
        nextPageBtnElement.click(() => { this.changeToNextPage() });
        let lastPageBtnElement = $('<button id="multiPageLast">').text(ELEMENT_LAST_PAGE_BUTTON_NAME).addClass('multiPage right');
        lastPageBtnElement.click(() => { this.changeToLastPage() });

        this.rootElement.append(firstPageBtnElement);
        this.rootElement.append(prevPageBtnElement);
        this.rootElement.append(pageSelectorElement);
        this.rootElement.append(nextPageBtnElement);
        this.rootElement.append(lastPageBtnElement);
        
        this.firstPageBtnElement = firstPageBtnElement;
        this.prevPageBtnElement = prevPageBtnElement;
        this.pageSelectorElement = pageSelectorElement;
        this.nextPageBtnElement = nextPageBtnElement;
        this.lastPageBtnElement = lastPageBtnElement;

        this.refreshPageSelector();
    }

    createPageSelectorTextInput() {
        let input = $('<input id="multiPageCurrentPage" title="Current page">');
        input.val(this.currentPage);
        input.change(() => {
            var pageNumberInput = parseInt(input.val());
            if (!Number.isNaN(pageNumberInput)) {
                if (pageNumberInput < 1) {
                    pageNumberInput = 1;
                } else if (pageNumberInput > this.pageCount) {
                    pageNumberInput = this.pageCount;
                }
            } else {
                pageNumberInput = this.currentPage;
            }
            input.val(pageNumberInput); // in case corrections were necessary
            this.changeToPage(pageNumberInput);
        });
        return input
    }

    refreshPageSelector() {
        this.pageSelectorElement.find('#multiPageCurrentPage').val(this.currentPage);

        // update page navigation buttons
        this.firstPageBtnElement.prop('disabled', (this.currentPage == 1));
        this.prevPageBtnElement.prop('disabled', (this.currentPage == 1));
        this.nextPageBtnElement.prop('disabled', (this.currentPage == this.pageCount));
        this.lastPageBtnElement.prop('disabled', (this.currentPage == this.pageCount));
    }
}

class PaginationMultiPageCtrl extends MultiPageCtrl {

    // inserts the multi-page control in the HTML DOM
    insertInDom(parentElement) {

        // see how much space is available
        const availableWidth = parentElement.innerWidth();

        // insert the control container element
        // we query its width to determine how many and which buttons will fit in it
        this.rootElement = $('<div>');
        this.rootElement.addClass('multiPageCtrlContainer');
        parentElement.append(this.rootElement);

        // Large 'prev' and 'next' buttons and the tweener page selector
        let prevPageBtnElement = $('<button>').text(ELEMENT_PREV_PAGE_BUTTON_NAME).addClass('multiPage left');
        prevPageBtnElement.click((e) => { 
            e.preventDefault(); // workaround for Barclays' site tying the button with a form submit action
            this.changeToPreviousPage();
        });
        
        let pageSelectorElement = $('<div>').addClass('pageSelector');
        
        let nextPageBtnElement = $('<button>').text(ELEMENT_NEXT_PAGE_BUTTON_NAME).addClass('multiPage right');
        nextPageBtnElement.click((e) => { 
            e.preventDefault(); // workaround for Barclays' site tying the button with a form submit action
            this.changeToNextPage() 
        });

        this.rootElement.append(prevPageBtnElement);
        this.rootElement.append(pageSelectorElement);
        this.rootElement.append(nextPageBtnElement);

        this.pageSelectorElement = pageSelectorElement;


        // Test how many page buttons fit in the provided space
        // - add buttons one by one and compare the current width with the width of the parent element
        let i = 1;
        while (i <= this.pageCount) {
            let buttonElement = this.createPageButton(i, (i == this.currentPage));
            pageSelectorElement.append(buttonElement);

            if (this.rootElement.outerWidth() > availableWidth) {
                i--;
                break;
            }
            i++;
        }
        this.maxButtonCount = i;
        console.log(`MultiPageCtrl: can fit ${this.maxButtonCount} page buttons in the provided element (available width is ${availableWidth}px)`)
        this.refreshPageSelector();
    }

    // Returns an interval (left bound, right bound) of page numbers that fits the parameters
    // (total number of pages, currently selected page and the number of buttons available)
    calculatePagingBounds(pageCount, currentPage, buttonCount) {

        if (typeof pageCount !== "number" || typeof currentPage !== "number" || typeof buttonCount !== "number") {
            throw new Error('Invalid parameter');
        }

        if (buttonCount < 7) {
            throw new Error('Not enough buttons for pagination (need at least 7)');
        }

        let left = 1;
        let right = pageCount;

        if (pageCount <= buttonCount) {
            // no need for any special calculation
            return { left, right };
        }

        let midpoint = Math.round(buttonCount / 2);

        if (currentPage <= midpoint) {
            // the current page is close to the beginning 
            left = 1;
            right = buttonCount;
            // ellipsis on right?
            if (pageCount > buttonCount) {
                right -= 2;
            }
        } else if (currentPage >= pageCount - (buttonCount - midpoint)) {
            // the current page is close to the end 
            right = pageCount;
            left = right - buttonCount + 1;
            // ellipsis on left?
            if (pageCount > buttonCount) {
                left += 2;
            }
        } else {
            // the current page is somewhere in between
            left = Math.max(4, currentPage - midpoint + 3);
            right = Math.min(pageCount - 3, currentPage + (buttonCount - midpoint) - 2);
        }

        return { left, right };
    }

    refreshPageSelector() {
        this.pageSelectorElement.empty();

        // update prev / next buttons
        let prev = this.rootElement.find('.multiPage.left');
        prev.prop('disabled', (this.currentPage == 1));

        let next = this.rootElement.find('.multiPage.right');
        next.prop('disabled', (this.currentPage == this.pageCount));

        // The number of pages is at most the number of the available buttons
        if (this.pageCount <= this.maxButtonCount) {
            console.log('MultiPageCtrl: There is enough space for simple pagination (all page buttons are displayed)');

            // just insert the page buttons
            for (let i = 1; i <= this.pageCount; i++) {
                let button = this.createPageButton(i);
                if (i == this.currentPage) {
                    button.addClass('selected');
                }
                this.pageSelectorElement.append(button);
            }

            return;
        }

        // The number of pages exceeds the number of the available buttons
        // and the number of buttons is sufficient for pagination with ellipsis
        // (minimum of 7 buttons needed, not counting Prev and Next buttons)
        // |first|...|n|n+1|n+2|...|last|
        if (this.maxButtonCount >= 7) {
            console.log('MultiPageCtrl: There is enough space for pagination with ellipsis');

            // calculate the interval of page buttons
            const bounds = this.calculatePagingBounds(this.pageCount, this.currentPage, this.maxButtonCount);
            console.log(`MultiPageCtrl: Pagination bounds :  ${bounds.left}, ${bounds.right}`);

            if (bounds.left > 1) {
                this.pageSelectorElement.append(this.createPageButton(1));
                this.pageSelectorElement.append(this.createEllipsisButton());
            }
            for (let j = bounds.left; j <= bounds.right; j++) {
                let button = this.createPageButton(j);
                if (j == this.currentPage) {
                    button.addClass('selected');
                }
                this.pageSelectorElement.append(button);
            }
            if (bounds.right < this.pageCount) {
                this.pageSelectorElement.append(this.createEllipsisButton);
                this.pageSelectorElement.append(this.createPageButton(this.pageCount));
            }
            return;
        }

        // There's not enough buttons for pagination with ellipsis
        // Use a combo box instead of buttons
        console.log('MultiPageCtrl: There is space only for a drop-down menu with page numbers');
        let comboBox = this.createPageComboBox(this.pageCount, this.currentPage);
        this.pageSelectorElement.append(comboBox);
    }

    createPageComboBox(pageCount, selectedPage) {
        let comboBoxElement = $(`<select type="text" class="multiPage"/>`);
        for (let i = 1; i <= pageCount; i++) {
            let optionElement = $(`<option value="${i}">Page ${i} of ${pageCount}</option>`);
            if (i == selectedPage) {
                optionElement.prop('selected', true);
            }
            comboBoxElement.append(optionElement);
        }

        // change page on value selection
        comboBoxElement.change(() => this.changeToPage(parseInt(comboBoxElement.val())));

        return comboBoxElement;
    }
    
    createPageButton(pageNumber, selected = false) {
        let buttonElement = $(`<button class="multiPage between">${pageNumber}</button>`);
        buttonElement
        if (selected) {
            buttonElement.addClass('selected');
        }
        buttonElement.click((e) => { 
            e.preventDefault(); // workaround for Barclays' site tying the button with a form submit action
            this.changeToPage(pageNumber);
        });
        return buttonElement;
    }

    createEllipsisButton() {
        let buttonElement = $('<button class="multiPage between ellipsis">...</button>');
        buttonElement.click((e) => {
            e.preventDefault(); // workaround for Barclays' site tying the button with a form submit action
        });
        return buttonElement;
    }
}

// access from Node.js
if (typeof module !== 'undefined') {
    module.exports = { MultiPageCtrl }
}
