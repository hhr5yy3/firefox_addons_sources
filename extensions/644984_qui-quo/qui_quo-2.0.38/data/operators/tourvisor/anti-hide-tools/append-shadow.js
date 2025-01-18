window.ADDED_BUTTONS = new Map();

function createCell(row, action, getAsyncInfo) {
    const newCell = row.childNodes[0].cloneNode(false)
    const shadow = newCell.attachShadow({mode: 'closed'});
    const floatingDiv = qqBtns({asyncFunc: getAsyncInfo, parentElement: row}, action);
    floatingDiv.querySelectorAll("div").forEach(div => div.tourRow = row);
    shadow.append(floatingDiv, appendStyleElement(document));
    row.append(newCell);
    window.ADDED_BUTTONS.set(row, {newCell, quiQuoNode: floatingDiv});
    return newCell;
}

function injectData() {
    if ( typeof createInstruction === 'function') {
        createInstruction();
    }
    const allButtons = window.ADDED_BUTTONS.entries();
    for (const [div, {newCell}] of allButtons) {
         if ( newCell.offsetHeight === 0 ) {
             newCell.remove()
             window.ADDED_BUTTONS.delete(div);
         }
    }

    [...document.getElementsByClassName('TVTourResultItem')].forEach(div => {
        if ( !window.ADDED_BUTTONS.has(div) ) {
            createCell(div, createOptionVersion3, getAsyncInfo)
        }
    })

    const modal = document.querySelector('.TVTourCardWindow .TVTourCardWindowInfo, .TVTourCardWindow .TVTourCardInfoRightBlock');
    if ( modal ) {
        const buttonBuy = modal.querySelector('.TVActionButtons, .TVTourCardActionControl ');
        if ( buttonBuy.clientHeight > 0 &&  !window.ADDED_BUTTONS.has(buttonBuy) ) {
            createCell(buttonBuy, createModalOption, null);
        }
    }

    const mobileModal = document.querySelector('.TVMobilePanel .TVTourCardContent');
    const btns = mobileModal ? mobileModal.querySelector('.qq') : null;
    if ( btns && btns.clientHeight === 0 ) {
        btns.remove();
    }
    if ( mobileModal && mobileModal.clientHeight > 0 &&  !window.ADDED_BUTTONS.has(mobileModal) ) {
        const cell = createCell(mobileModal, createModalOption);
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
