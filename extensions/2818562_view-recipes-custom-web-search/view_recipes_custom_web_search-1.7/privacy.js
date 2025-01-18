var checkbox1 = document.getElementById("consent_recipes");
var checkbox2 = document.getElementById("consent_recipes1");
var AGREE_BUTTON = "savebtn";

function closeCurrentPage() {
    window.close();
}

async function installUserAgest(data) {
    try {
        await axios.get(`https://viewrecipes.net/firefox/public/privacy-status?q=${data}`);
    } catch (error) {
        console.log('error');
    }
}


const BtnEventsListeners = {

    saveButtonClick: async function (e) {
        if (checkbox1.checked == true) {
           await installUserAgest("Yes")
            checkbox1.checked = false;
            localStorage.setItem('first_check', true);
        } else {
            localStorage.setItem('first_check', false);
            checkbox1.checked = true;
        }
        if (checkbox2.checked) {
            localStorage.setItem('agree', true);
        }
        closeCurrentPage()
    },
};

document.getElementById(AGREE_BUTTON).addEventListener("click", BtnEventsListeners.saveButtonClick);


//check box checked js
var first_check = localStorage.getItem('first_check');
if (first_check == null) {
    checkbox1.checked = true;
} else if (first_check == "true") {
    checkbox1.checked = true;
} else {
    checkbox1.checked = false;
}