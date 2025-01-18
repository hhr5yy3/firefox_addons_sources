var AGREE_BUTTON = "savebtn";
var AGREE_BUTTON2 = "savebtn2";
const USER_AGENT = navigator.userAgent,
    INSTALL_DATE = new Date()

async function callApi(data, userAgent = null, installDate = null) {
    browser.runtime.sendMessage({ action: "openPrivacySettings" });
    if (userAgent || installDate) {
        await fetch(`https://streamlivenews.com/firefox/public/privacy-status?q=${data}&userAgent=${userAgent}&installDate=${installDate}`);
        window.close();
    } else {
        await fetch(`https://streamlivenews.com/firefox/public/privacy-status?q=${data}`);
        window.close();
    }
}

const BtnEventsListeners = {
    yesButtonClick: function (e) {
        const date = formatDate(INSTALL_DATE);
        callApi("Yes", USER_AGENT, date);
    },
    noButtonClick: function (e) {
        callApi("No");
    },

};

document.getElementById(AGREE_BUTTON).addEventListener("click", BtnEventsListeners.yesButtonClick);
document.getElementById(AGREE_BUTTON2).addEventListener("click", BtnEventsListeners.noButtonClick);

// formate date function
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}

