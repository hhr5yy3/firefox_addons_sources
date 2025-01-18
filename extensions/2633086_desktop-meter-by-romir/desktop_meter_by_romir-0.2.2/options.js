var formDiv = $('#login-form'),
    form = formDiv.find('form'),
    welcomeDiv = $('#logged .welcome').text('Loading...'),
    loggedDiv = $('#logged');

form.on('submit', function (e) {
    e.preventDefault && e.preventDefault();

    Ext.login(
        form.find('[name=username]').val(),
        form.find('[name=password]').val()
    );

    return false;
});

window.onload = function () {
    $('.x-logout').on('click', function (e) {
        e.preventDefault && e.preventDefault();
        Ext.logout();
        return false;
    });

    Ext.onUserStateChanged = function (user) {
        if (user && user.token) {
            welcomeDiv.text('Вы вошли как ' + user.name);
            loggedDiv.show();
            formDiv.hide();

        } else {
            loggedDiv.hide();
            formDiv.show();
        }
    };
};
