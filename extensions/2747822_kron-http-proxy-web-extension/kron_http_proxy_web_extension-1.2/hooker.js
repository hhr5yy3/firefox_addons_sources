/**
 * Contains the code that gets the session id value from the login page and saves it in browser storage
 *
 * @author Deniz Mert Tecimer
 * 		Date 12/04/2022 04:16 PM
 */

const headerName = "x-kron-sessionid";
//console.log("Hooker ran!");
let sessionId = document.getElementById("token").value;
if (browser) {
    if (sessionId !== undefined && sessionId !== null) {
        browser.storage.sync.set({[headerName]: sessionId}).then(
            () => {
                //console.log("SessionId retrieved!");
            }, (e) => {
                console.log(e);
            }
        );
    }
}
