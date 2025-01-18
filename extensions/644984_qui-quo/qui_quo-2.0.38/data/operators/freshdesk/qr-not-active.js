let oldAlert = document.querySelector(".qq");
if ( oldAlert ) {
    oldAlert.remove();
}
addAddonMessageListener("init params", function (data) {
    let text = {
        off: `Быстрое бронирование не доступно на вашем тарифе, сменить тариф можно <a href="https://${window.AGENCY_DOMAIN}/agency/tariffs/active" target="_blank">здесь.</a>`,
        zeroBalance: `Быстрое бронирование не доступно, пополните баланс в <a href="https://${window.AGENCY_DOMAIN}/agency" target="_blank">личном кабинете.</a>`
    };
    if ( data.cannotMakeQuote === true ) {
        createNotify(text.zeroBalance);
        return undefined;
    }
    if ( data.isQuickReservationActive !== true ) {
        createNotify(text.off);
        return undefined;
    }
});
sendMessageToAddon("get init params");

function createNotify(text) {
    let div = document.createElement("div");

    div.style.color = "#0a0a0a";

    div.style.fontWeight = "bold";
    div.style.fontSize = "15px";

    div.style.borderStyle = "solid";
    div.style.borderRadius = "5px";
    div.style.borderColor = "red";

    div.style.textAlign = "center";
    div.classList.add("qq");
    div.innerHTML = text;
    document.querySelector(".article-body").prepend(div);
}
