'use strict';

//////////////////////////////////////////////////////////////////////
// Convenience wrapper function.

function run_with_tabId_and_bgPage(callback) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.runtime.getBackgroundPage(function (bgpage) {
            callback(tabs[0].id, bgpage);
        });
    });
}

//////////////////////////////////////////////////////////////////////
// Button handlers.

function stop_this_tab_button_click_handler(ev) {
    run_with_tabId_and_bgPage(function (tab_id, bgpage) {
        bgpage.clear_reload(tab_id);
        window.close();
    });
}

function stop_all_tabs_button_click_handler(ev) {
    run_with_tabId_and_bgPage(function (tab_id, bgpage) {
        bgpage.clear_all_reloads();
        window.close();
    });
}

function custom_form_submit_handler(ev) {
    ev.preventDefault();
    run_with_tabId_and_bgPage(function (tab_id, bgpage) {
        let hours = parseInt($("#hours").val(), 10);
        let minutes = parseInt($("#minutes").val(), 10);
        let seconds = parseInt($("#seconds").val(), 10);

        if (hours < 0 || hours > 23) hours = 0;
        if (minutes < 0 || minutes > 59) hours = 0;
        if (seconds < 0 || seconds > 59) seconds = 0;

        let total = (60 * 60 * hours) + (60 * minutes) + seconds;
        if (total < 5) {
            alert(chrome.i18n.getMessage('total_min'));
            return false;
        }

        bgpage.set_reload(tab_id, total);
        window.close();
    });
    ev.stopPropagation();
    return false;
}

function inputRange() {
    let id = $(this).attr('id');

    let n = parseInt($(this).val(), 10);
    if (n < 10) n = '0' + n;
    $('#' + id + 'Val').text(n);
}


function setRange(id, val) {
    $('#' + id).val(val);

    let n = parseInt(val, 10);
    if (n < 10) n = '0' + n;
    $('#' + id + 'Val').text(n);
}

//////////////////////////////////////////////////////////////////////
// Initialization.

function init() {
    run_with_tabId_and_bgPage(function (tab_id, bgpage) {
        let total_reloads = bgpage.get_how_many_reloads_are_active();
        let interval_seconds = bgpage.get_reload(tab_id);
        let interval = bgpage.split_seconds(interval_seconds);

        $('#stop_all_tabs_button').val(chrome.i18n.getMessage('TEXT_STOP_ALL_TABS') + ' (' + total_reloads + ')')

        if (total_reloads > 1 || (total_reloads == 1 && interval_seconds == 0))
            $("#section_other").show();

        if (interval_seconds > 0)
            $("#section_this_tab").show();

        /* BUTTONS FORM START */
        setRange('hours', interval.hours);
        setRange('minutes', interval.minutes);
        setRange('seconds', interval.seconds);
        /* BUTTONS FORM END */

        $("#tabs tbody").empty();
        createTabsList(tab_id, bgpage);

        $("body")
            .on("click", ".stop-interval", function () {
                let el = $(this).parent().parent();
                let id = el.data("id");
                bgpage.clear_reload(id);

                let total_reloads = bgpage.get_how_many_reloads_are_active();
                $('#stop_all_tabs_button').val(chrome.i18n.getMessage('TEXT_STOP_ALL_TABS') + ' (' + total_reloads + ')')

                el.find("td").eq(2).text('');
                el.find("td").eq(3).text('');
                if (tab_id === id)
                    $("#section_this_tab").hide();

                if (!total_reloads)
                    $("#section_other").hide();
            })
            .on("click", "#tabs .set_cur", function () {
                let tr = $(this).parent();
                let id = tr.data("id");
                tr.parent().find('tr').removeClass('table-active');
                tr.addClass('table-active');

                chrome.tabs.update(id, {active: true});
            })
            .on("input", "#hours, #minutes, #seconds", inputRange)
            .on("submit", "#custom_form_range", custom_form_submit_handler)
            .on("click", "#stop_this_tab_button", stop_this_tab_button_click_handler)
            .on("click", "#stop_all_tabs_button", stop_all_tabs_button_click_handler)
            .on('click', 'a#copyright_link', function () {
                chrome.tabs.create({url: $(this).attr('href')});
                return false;
            });
    });
}

function createTabsList(cur_id, bgpage) {
    chrome.tabs.query({currentWindow: true}, function (tabs) {
        tabs.forEach(function (tab, idx) {
            let interval_seconds = bgpage.get_reload(tab.id);
            let interval = bgpage.split_seconds(interval_seconds);

            if (interval.hours < 10) interval.hours = '0' + interval.hours;
            if (interval.minutes < 10) interval.minutes = '0' + interval.minutes;
            if (interval.seconds < 10) interval.seconds = '0' + interval.seconds;

            let ico = tab.favIconUrl;
            let id = tab.id;
            let url = tab.url;
            let strInterval = (!interval_seconds ? '' : interval.hours + ':' + interval.minutes + ':' + interval.seconds);
            let stop = `
            <svg width="24px" height="24px" viewBox="0 0 16 16" class="bi bi-stop text-danger stop-interval" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"/>
            </svg>
            `;
            if (!interval_seconds)
                stop = '';

            let tabItem = `
            <tr` + (id === cur_id ? ' class="table-active"' : '') + ` data-id="${id}">
                <td>` + (ico ? `<img src="${ico}" width="16" height="16" alt="${id}"/>` : '') + `</td>
                <td class="set_cur">${url}</td>
                <td>${strInterval}</td>
                <td class="p-0">${stop}</td>
            </tr>`;
            $("#tabs tbody").append(tabItem);
        });

        //let $container = $('.tabs-h'), $scrollTo = $("#tabs .table-active");
        //$container.scrollTop(
        //    $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
        //);
    });

}

function localizeHtmlPage() {
    let objects = document.getElementsByTagName('html');
    for (let j = 0; j < objects.length; j++) {
        let obj = objects[j];

        let valStrH = obj.innerHTML.toString();
        let valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if (valNewH !== valStrH) {
            obj.innerHTML = valNewH;
        }
    }
}

$(document).ready(function () {
    localizeHtmlPage();
    init();
});

