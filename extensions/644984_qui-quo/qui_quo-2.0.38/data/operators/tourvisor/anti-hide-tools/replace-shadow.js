window.ADDED_BUTTONS = new Map();

function createCell(row, action, getAsyncInfo) {
    let newCell = row.querySelector('.TVAddCartButton');
    if ( !newCell ) {
        newCell = document.createElement("div");
        newCell.className = "TVAddCartButton TVSize-M";
        row.append(newCell);
    }
    const shadow = newCell.attachShadow({mode: 'closed'});
    const floatingDiv = qqBtns({asyncFunc: getAsyncInfo, parentElement: row}, action, 'top: -16px;left: -18px;background: white;min-height: 40px;');
    floatingDiv.querySelectorAll("div").forEach(div => div.tourRow = row.closest('t-tr'));
    shadow.append(floatingDiv, appendStyleElement(document));
    window.ADDED_BUTTONS.set(row, {newCell, quiQuoNode: floatingDiv});
    return newCell;
}

function createModalCell(row, action, getAsyncInfo) {
    let newCell = row.querySelector('.TVTourCardActionAddToCart');
    if ( !newCell ) {
        newCell = document.createElement("div");
        newCell.className = "TVTourCardActionAddToCart TVButtonHover";
        row.append(newCell);
    }
    const shadow = newCell.attachShadow({mode: 'closed'});
    const floatingDiv = qqBtns({
        asyncFunc: getAsyncInfo,
        parentElement: row
    }, action);
    floatingDiv.querySelectorAll("div").forEach(div => div.tourRow = row.closest('.TVTourCardInfoContent'));
    shadow.append(floatingDiv, appendStyleElement(document));
    window.ADDED_BUTTONS.set(row, {newCell, quiQuoNode: floatingDiv});
    return newCell;
}

function createModalMobileCell(row, action, getAsyncInfo) {
    let newCell = row.querySelector('.TVTourCardAddToCart');
    if ( !newCell ) {
        newCell = document.createElement("div");
        newCell.className = "TVTourCardButton TVTourCardAddToCart";
        row.append(newCell);
    }
    const shadow = newCell.attachShadow({mode: 'closed'});
    const floatingDiv = qqBtns({
        asyncFunc: getAsyncInfo,
        parentElement: row
    }, action);
    floatingDiv.querySelectorAll("div").forEach(div => div.tourRow = row.closest('.TVTourCardContent'));
    shadow.append(floatingDiv, appendStyleElement(document));
    window.ADDED_BUTTONS.set(row, {newCell, quiQuoNode: floatingDiv});
    return newCell;
}


function injectData() {
    if ( typeof createInstruction === 'function' ) {
        createInstruction();
    }
    $$('.trv-observer-handled').forEach(elem => elem.classList.remove('trv-observer-handled'));

    const allButtons = [...window.ADDED_BUTTONS.entries()];
    for (const [div, {newCell}] of allButtons) {
        if ( newCell.offsetHeight === 0 ) {
            newCell.remove()
            window.ADDED_BUTTONS.delete(div);
        }
    }

    [...document.getElementsByClassName('TVTourResultItemCart')].forEach(div => {
        if ( !window.ADDED_BUTTONS.has(div) ) {
            const clonedElement = div.cloneNode(true);
            div.after(clonedElement)
            div.remove()
            createCell(clonedElement, createOptionVersion3, getAsyncInfo)
        }
    })

    const modal = document.querySelector('.TVTourCardWindow .TVTourCardWindowInfo, .TVTourCardWindow .TVTourCardInfoRightBlock');
    if ( modal ) {
        const buttonBuy = modal.querySelector('.TVActionButtons, .TVTourCardActionControl ');
        if ( buttonBuy.clientHeight > 0 && !window.ADDED_BUTTONS.has(buttonBuy) ) {
            createModalCell(buttonBuy, createModalOption, null);
        }
    }

    const mobileModal = document.querySelector('.TVMobilePanel .TVTourCardContent');
    const btns = mobileModal ? mobileModal.querySelector('.qq') : null;
    if ( btns && btns.clientHeight === 0 ) {
        btns.remove();
    }
    if ( mobileModal && mobileModal.clientHeight > 0 && !mobileModal.querySelector('.qq') ) {
        const cell = createModalMobileCell(mobileModal,createModalOption, null);
        cell.style.cssText = `
        position: fixed;
        left: 80%;
        top: 10%;
        zoom: 1.2;`
        mobileModal.append(cell);
    }

    $$('.TVResultItemBodyWrapper').forEach(div => {
        if ( !$1('.qq', div) ) {
            const {container, ratingBtn} = createOnlyRatingButtons(createRatingOption);
            container.style.position = 'absolute';
            container.style.right = '48px';
            container.style.top = '9px';
            ratingBtn.style.cssText = `
                transform: scale(1);
                font-size: 12px;
                line-height: 1.5em;
                position: absolute;
                font-weight: 600;
                font-size: 14px;
                padding: 0 5px;
                color: #fff !important;
                text-decoration: none;
                color: white;
                border-radius: 2px;
                min-width: 20px;
                `;

            div.append(container)
        }
    });



}
