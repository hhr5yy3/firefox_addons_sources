function UserConsentWindow(onInit)
{
    function SendLog(message)
    {
        ApiCall(browsersApi.runtime.sendMessage)
            .OnError(err => console.log(err)) 
            .Start({ command: "userConsent.log", log: message });
    }

    function SendCommand(command, onSuccess)
    {
        ApiCall(browsersApi.runtime.sendMessage)
            .OnSuccess(onSuccess)
            .OnError(err => SendLog(err.message))
            .Start({ command: command });
    }

    function Init()
    {
        document.body.className = browsersApi.i18n.getMessage("@@bidi_dir");
        const userConsentIframe = document.getElementById("UserConsentIframeId");
        userConsentIframe.src = browsersApi.runtime.getURL("/_locales/") + browsersApi.i18n.getMessage("UserConsentDialogFile");
        userConsentIframe.addEventListener("load", () =>
        {
            if (onInit)
                onInit(userConsentIframe.contentWindow.document);

            const dialog = userConsentIframe.contentWindow.document.getElementById("UserConsentDialog");
            document.getElementById("UserConsentIframeId").replaceWith(dialog);

            SetClickHandler("acceptButton", () =>
            {
                SendCommand("userConsent.accept", () => { window.close(); });
            });
            SetClickHandler("declineButton", () => SendCommand("userConsent.decline"), AvNs.EmptyFunc);
            SetClickHandler("privacyPolicyLink", () =>
            {
                ApiCall(browsersApi.tabs.create)
                    .OnError(err => SendLog(err.message))
                    .Start({ url: "https://addons.mozilla.org/firefox/addon/kaspersky-protection-2021/privacy/" });
            });
        });
    }

    this.Show = () => AvNs.RunModule(Init);
}

AvNs.UserConsentWindow = null;
if (window.location.href === browsersApi.extension.getURL("snapshot_resources/uc/user_consent_window.html"))
{
    AvNs.UserConsentWindow = new UserConsentWindow(null);
    AvNs.UserConsentWindow.Show();
}
