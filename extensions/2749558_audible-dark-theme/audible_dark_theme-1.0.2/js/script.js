$(function () {
    let body = $('body');

    body.addClass('dark-theme');

    $('.adbl-page.desktop').parent('body').prepend('<div id="toggle-dark-theme"><button>Toggle Dark Mode</button></div>');

    $('#toggle-dark-theme button').click(function () {
        if (body.hasClass('dark-theme')) {
            body.removeClass('dark-theme');
        } else {
            body.addClass('dark-theme');
        }
    });
});
