window.OPERATOR_NAME = "Амиго-С";
window.showTopHotelsRating = false;
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".fui-order-top-holder").forEach(div => {
        if (!document.querySelector(".qq")) {
            const container = createQQContainer('top: 30px;position: sticky;max-width:185px;justify-content: center;z-index: 99999;');
            const qqBtns = container.querySelector('.qq-box');
            qqBtns.style.display = 'none';
            div.previousElementSibling.after(container);
        }
    });
}
