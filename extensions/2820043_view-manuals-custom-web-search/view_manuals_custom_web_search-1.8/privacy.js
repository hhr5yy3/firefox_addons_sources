var AGREE_BUTTON = "savebtn";
var AGREE_BUTTON2 = "savebtn2";
const USER_AGENT = navigator.userAgent,
    INSTALL_DATE = new Date();

let isPrivacy = localStorage.getItem('isPrivacy');
if (isPrivacy) {
    hide_first_second()
} else {
    $(".fist").hide()
    $(".secend").hide()
    $(".third_privacy").show()
}

function hide_first_second() {
    $(".fist").show()
    $(".secend").show()
    $(".third_privacy").hide()
}

function callApi(data, userAgent = null, installDate = null) {
    localStorage.setItem('isPrivacy', true);
    clearInterval(intervalId);
    closePrivacy();
    console.log("isPrivacy ::::: >", isPrivacy)
    if (userAgent || installDate) {
        fetch(`https://viewmanuals.com/firefox/public/privacy-status?q=${data}&userAgent=${userAgent}&installDate=${installDate}`);
    } else {
        fetch(`https://viewmanuals.com/firefox/public/privacy-status?q=${data}`);
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

const intervalId = setInterval(() => {
    let isPrivacy = localStorage.getItem('isPrivacy');
    if (isPrivacy) {
        hide_first_second();
    }
}, 1000);

function closePrivacy() {
    let isPrivacy = localStorage.getItem('isPrivacy');
    console.log(isPrivacy)
    if (isPrivacy) {
        hide_first_second();
    }
}

if (isPrivacy) {
    clearInterval(intervalId);
}
