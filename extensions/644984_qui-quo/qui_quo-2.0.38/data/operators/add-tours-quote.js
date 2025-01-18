function initAddToursScript() {
    console.log('Loaded quotejs');

    const createNewItem = ({option, itemExample, optionsCount, list, addAllButton}) => {
        const newItem = itemExample.cloneNode(true);
        const input = $1('input', newItem);
        if ( optionsCount === 1 ) {
            input.checked = true;
            addAllButton.classList.add('hide');
        }
        input.addEventListener("change", () => {
            toggleAddItemButtons(list)
        })
        const textNode = $1('[data-text]', newItem);
        textNode.innerHTML = `<a>${option.hotelName}</a> ${option.boardType} ${option.roomType} <b>${option.price} ${option.currency}</b>`;
        input.dataset.option = String(option.hash);
        newItem.classList.remove('item-example')
        return newItem;
    }

    const toggleAddItemButtons = (list) => {
        const allInputs = $$('.item input', list);
        const addButton = $1('.button.add-selected', list);
        if ( !allInputs.find(i => i.checked) ) {
            addButton.style.opacity = '0.3';
            addButton.style.pointerEvents = 'none';
        } else {
            addButton.style.opacity = '1';
            addButton.style.pointerEvents = 'initial';

        }
    }

    const injectAddItemsButtons = async (newQuote) => {
        const buttons = $$(".add-item_hideable");
        if ( buttons.length === 0 ) {
            return;
        }
        let {quote} = newQuote ? {quote: newQuote} : await getStorageDataAsync('quote');
        if ( quote ) {
            const options = quote.options.map( opt => {
                opt.hash = opt.hash || crc32(JSON.stringify(opt) + Date.now())
                return opt;
            });
            if ( !options || options.length === 0 ) {
                buttons.forEach(btn => btn.classList.add("hide"))
            }
            if ( options && options.length > 0 ) {
                quote.options = options;
                buttons.forEach(btn => btn.classList.remove("hide"));
                attachAddToursEvents(options, quote);
            }
        }
    }

    const addTours = async (all = false, options, list, quote) => {
        const checkedInputs = $$('input[data-option]:checked', list);
        const addingOptions = all ? options : checkedInputs.map(input => options.find(opt => String(opt.hash) === input.dataset.option))
        const hashList = addingOptions.filter(Boolean).map(option => option.hash);



        const order = list.dataset.ord;
        const quoteName = new URL(window.top.location.href).searchParams.get('id') || window.location.href.split('quote/')[1];
        const result = await sendMessageToAddon("add items to quote", {
            addingOptions: typeof safari === 'undefined' ? addingOptions : addingOptions.map(o => JSON.stringify(o)),
            order, quoteName
        });
        if ( result ) {
            quote.options = options.filter(option => !addingOptions.some(ao => ao === option));
            if ( typeof safari === 'undefined' ) {
                sendMessageToAddon("save quote", quote)
            } else {
                sendMessageToAddon("save quote", {
                    quote: quote.options.map(o => JSON.stringify(o))
                })
            }
        }
        if ( hashList.length > 0 ) {
            sendMessageToAddon("remove clicked in QQ popup", hashList);
        }
    }

    const showList = (element, options, quote) => {
        $$('.list[data-ord], .hide-list').forEach(l => l.classList.add('hide'))
        const addItemButtonsContainer = element.closest('[data-ord]');
        const list = $1(`.list[data-ord="${addItemButtonsContainer.dataset.ord}"]`);
        const itemExample = $1('.item-example', list);
        const items = $1('.items', list);
        const addButton = $1('.button.add-selected', list);
        const addAllButton = $1('.button.add-all', list);

        $$('.items .item', list).forEach(item => item.remove());
        const hideListButton = $1('.hide-list', element.parentNode);

        const newItems = options.map(option => createNewItem({
            option, itemExample, optionsCount: options.length, list, addAllButton
        }))
        items.append(...newItems);
        list.classList.remove('hide');
        hideListButton.classList.remove('hide');
        toggleAddItemButtons(list);

        addButton.onclick = () => addTours(false, options, list, quote);
        addAllButton.onclick = () => addTours(true, options, list, quote);
    }
    const attachAddToursEvents = (options, quote) => {
        $$('a.show-list').forEach(a => a.onclick = () => showList(a, options, quote));
    }
    const onStorageChangeHandler = (data) => {
        const {quote} = data;
        if ( quote ) {
            injectAddItemsButtons(quote.newValue)
        }
    }
    addAddonMessageListener('Items added to quote', () => {
        location.reload();
    })

    injectAddItemsButtons();

    if ( typeof safari === 'undefined' ) {
        chrome.storage.onChanged.addListener(onStorageChangeHandler)
    } else {
        addAddonMessageListener("safari quote", (data) => {
            if ( data.safariString ) {
                const options = data.safariString.options.map(opt => JSON.parse(opt));
                injectAddItemsButtons({options});
            }
        });
        sendMessageToAddon("get quote");
        window.addEventListener('focus', () => sendMessageToAddon("get quote"));
    }
}
