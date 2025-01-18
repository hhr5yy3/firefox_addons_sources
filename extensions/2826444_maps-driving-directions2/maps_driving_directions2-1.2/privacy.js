var AGREE_BUTTON = "savebtn";
var AGREE_BUTTON2 = "savebtn2";

function closeCurrentPage() {
    window.close();
}

const BtnEventsListeners = {

    saveButtonClick: function (e) {
        closeCurrentPage()
    },
};

document.getElementById(AGREE_BUTTON).addEventListener("click", BtnEventsListeners.saveButtonClick);
document.getElementById(AGREE_BUTTON2).addEventListener("click", BtnEventsListeners.saveButtonClick);
