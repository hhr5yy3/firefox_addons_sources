document.querySelector("form").addEventListener("submit", function openSettings()
{
    try
    {
        let sending_promise = browser.runtime.sendMessage( { id: "__stubRedirectSettingsPage" } );

        if(sending_promise != null)
        {
            sending_promise.then((message) => {}, (error) =>
            {
                console.error(`ui/stubs/settings/redirect/index.js: ${error}`);
            });
        }
        else
        {
            console.error(`ui/stubs/settings/redirect/index.js: browser.runtime.sendMessage() returned null`);
        }
    }
    catch(e)
    {
        console.error(`Exception while opening AVD Settings page: ${e}`);
    }
});
