function createCell(action, getAsyncInfo) {
    let newTd = document.createElement("td");
    newTd.classList.add("qq");
    newTd.style.position = "initial";
    newTd.style.top = "initial";
    newTd.style.left = "initial";
    newTd.style.setProperty("width", "48px");
    newTd.appendChild(qqBtns({asyncFunc: getAsyncInfo}, action));
    return newTd;
}

function injectData() {
    if ( typeof createInstruction === 'function' ) {
        createInstruction();
    }
    let headers = document.querySelectorAll(".TVSRPriceContainer>table>thead>tr");
    if ( headers.length !== 0 ) {
        for (let i = 0; i < headers.length; i++) {
            if ( headers[i].querySelector(".qq") == null && headers[i].querySelector("th") != null ) {
                headers[i].appendChild(createHeader());
            }
        }
        let trs = document.querySelectorAll(".TVSRPriceContainer>table>tbody>tr, .TVResultToursContent .TVTourResultItem, .TVResultToursContent .TVSTourResultItem");
        for (let i = 0; i < trs.length; i++) {
            if ( trs[i].querySelector(".qq") == null && trs[i].querySelector("td") != null ) {
                trs[i].addEventListener('mousedown', saveTourId);
                trs[i].appendChild(createCell(createOption, getAsyncInfo));
            }
        }
    } else {
        let trs = querySelectorAll(document, ".TVSRPriceContainer>table>tbody>tr, .TVResultToursContent .TVTourResultItem, .TVResultToursContent .TVSTourResultItem");
        trs.filter(tr => {
            return tr.querySelector("th");
        }).forEach(tr => {
            if ( tr.querySelector(".qq") === null ) {
                tr.appendChild(createHeader());
            }
        });
        trs.filter(tr => {
            return !tr.querySelector("th");
        }).forEach(tr => {
            if ( tr.querySelector(".qq") === null ) {
                tr.addEventListener('mousedown', saveTourId);
                tr.appendChild(createCell(createOptionVersion3, getAsyncInfo));
            }
        });
    }

    const modal = document.querySelector('.TVTourCardWindow .TVTourCardWindowInfo, .TVTourCardWindow .TVTourCardInfoRightBlock');
    if ( modal && !modal.querySelector('.qq') && !modal.querySelector('.TVPreview') ) {
        // const sliderItem = $first('.TVPhotoSliderItem');
        const buttonBuy = modal.querySelector('.TVActionButtons, .TVTourCardActionControl ');
        const cell = createCell(createModalOption, null);
        buttonBuy.append(cell);
        const checkBtnVisibility = setInterval(() => {
            if ( cell.offsetHeight === 0 ) {
                cell.remove();
                clearInterval(checkBtnVisibility);
            }
        }, 1000);
    }

    const mobileModal = document.querySelector('.TVMobilePanel .TVTourCardContent');
    const btns = mobileModal ? mobileModal.querySelector('.qq') : null;
    if ( btns && btns.clientHeight === 0 ) {
        btns.remove();
    }
    if ( mobileModal && mobileModal.clientHeight > 0 && !mobileModal.querySelector('.qq') ) {
        const cell = createCell(createModalOption, null);
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
