function agree_click_hander() {
    window.close();
    return false;
};

function decline_click_hander() {
    browser.management.uninstallSelf();
    window.close();
    return false;
};

window.onload = function() {
    document.getElementById("agree_button").addEventListener("click", agree_click_hander);
    document.getElementById("decline_button").addEventListener("click", decline_click_hander);
};

window.onbeforeunload = function() {
    return null;
};
