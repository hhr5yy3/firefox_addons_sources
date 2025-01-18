/*
* anonymoX client
*   for Firefox
*
* Author 	Nils Hügelmann	<nils.h@anonymox.net>
* Author 	Christian Otto	<chris.o@anonymox.net>
*
* www.anonymox.net
*
* License: CC BY-NC-ND 3.0, see LICENSE.TXT or http://creativecommons.org/licenses/by-nc-nd/3.0/
*
* Use at your own risk
*
* This is the released, uncommented version of the code.
*/
function provideCredentialsSync(requestDetails) {

    if (requestDetails.isProxy && requestDetails.realm == "anonymox.net") {
        return {
            authCredentials: {
                username: base.UserData.username.toString(),
                password: base.UserData.passwordPlain
            }
        };
    }
}

browser.webRequest.onAuthRequired.addListener(
    provideCredentialsSync,
    {urls: ["<all_urls>"]},
    ["blocking"]
);
