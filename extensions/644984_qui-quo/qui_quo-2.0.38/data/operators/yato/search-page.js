window.OPERATOR_NAME = "Я туроператор";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('.closest-table tr .tar').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    return createYaToOption(img);
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
