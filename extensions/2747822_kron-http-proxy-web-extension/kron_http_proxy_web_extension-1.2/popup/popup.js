/**
 * Provides the pop-up functionality of the extension
 *
 * @author Deniz Mert Tecimer
 * 		Date 12/04/2022 04:16 PM
 */

let addOnActivated = false;

//Checks if browser api is available, thus checking the browser type
if (browser) {

    //Retrieves the activation status of the extension, when the extension pop-up is opened
    //and configures the button and its functionality accordingly
    browser.storage.sync.get("isActivated").then((result) => {
        let isActivated = result === undefined ? undefined : result.isActivated;
        if (isActivated !== undefined) {
            setButtonBGColor(isActivated);
            addOnActivated = isActivated;
            //console.log("Activation retrieved: " + addOnActivated);
        } else {
            browser.storage.sync.set({"isActivated": addOnActivated}).then(() => {
                setButtonBGColor(addOnActivated);
                //console.log("Addon is set to: " + addOnActivated);
            }, (e) => {
                console.log(e);
            });
        }

        //Controls the activation of the extension
        activateToggle.addEventListener("click", async () => {
            addOnActivated = !addOnActivated;
            browser.storage.sync.set({"isActivated": addOnActivated}).then(() => {
                setButtonBGColor(addOnActivated);
                //console.log("Activation changed as: " + addOnActivated);
            }, (e) => console.log(e));
        });
    }, (e) => {
        console.log(e);
    });
} else {
    console.log("Browser type is not compatible!");
}

function setButtonBGColor(activated) {
    if (activated) {
        activateToggle.style.backgroundColor = "#2C65F6";
        activateToggle.innerText = "Deactivate";
        activateToggle.style.color = "#FFF";
    } else {
        activateToggle.style.backgroundColor = "#7C807F";
        activateToggle.innerText = "Activate";
        activateToggle.style.color = "#FFF";
    }
}
