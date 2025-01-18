
const userConsentUrl = browsersApi.extension.getURL("snapshot_resources/uc/user_consent_window.html");

function WaitUserConsentAccept()
{
    function OnMessage(message, sender)
    {
        try
        {
            CheckLastError();

            if (message.command === "userConsent.accept")
                OnAccept(AvNs.IsSenderPopup(sender));
            else if (message.command === "userConsent.decline")
                browsersApi.management.uninstallSelf();
            else if (message.command === "userConsent.log")
                AvNs.SessionLog(message.log)
        }
        catch (e)
        {
            AvNs.SessionError(e, "consent");
        }
    }

    function OnAccept(isSenderPopup)
    {
        browsersApi.runtime.onMessage.removeListener(OnMessage);
        browsersApi.storage.local.set({ hasUserConsent: true });
        AvNs.GetToolbarButton().Reset();
        if (isSenderPopup)
        {
            ApiCall(browsersApi.tabs.query)
                .OnSuccess(tabs =>
                    {
                        if (tabs.length === 0)
                        {
                            AvNs.SessionLog("Not found user consent tab");
                            return;
                        }
                        for (const tab of tabs)
                        {
                            ApiCall(browsersApi.tabs.remove)
                                .OnError(err => AvNs.SessionLog(`tabs.remove failed with error ${err.message}`))
                                .Start(tab.id);
                        }
                    })
                .OnError(err => AvNs.SessionLog(`tabs.query failed with error ${err.message}`))
                .Start({ url: userConsentUrl });
        }
        AvNs.StartSession();
    }

    browsersApi.runtime.onMessage.addListener(OnMessage);
}

function UserConsent(isNeedToShowPrompt)
{
    browsersApi.storage.local.set({ hasUserConsent: !isNeedToShowPrompt });
    if (isNeedToShowPrompt)
    {
        AvNs.GetToolbarButton().SetDefaultState({iconId: "no_consent"});
        ApiCall(browsersApi.tabs.create)
            .OnError(err => AvNs.SessionError(err))
            .Start({ url: userConsentUrl });
    }
}

browsersApi.runtime.onInstalled.addListener(details =>
{
    if (details.reason === "install")
    {
        browsersApi.storage.managed.get("isNeedPrompt").then(
            value => {
                UserConsent((typeof value === "object" && typeof value.isNeedPrompt === "boolean") ? value.isNeedPrompt : true);
            }
        )
        .catch(
            e => {
                UserConsent(true);
            }
        );
    }
});

browsersApi.storage.local.get(["hasUserConsent"], result =>
{
    if (result.hasUserConsent)
    {
        AvNs.GetToolbarButton().Reset();
        AvNs.StartSession();
    }
    else
    {
        WaitUserConsentAccept();
        AvNs.GetToolbarButton().SetDefaultState({iconId: "no_consent"});
        AvNs.SessionLog("No user consent at extension startup");
    }
});
