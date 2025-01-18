let i18n = chrome.i18n;
let browserCode = getBrowserCode();


function localizeHTML() {
    $('[data-i18n]').each(function () {
        let msg = i18n.getMessage(this.getAttribute('data-i18n'));
        if (!msg) return;

        if (this.tagName === 'INPUT') {
            if (this.getAttribute('placeholder')) {
                this.setAttribute('placeholder', msg);
            } else if (this.value) {
                this.value = msg;
            }
        } else {
            this.innerHTML = msg;
        }
    });

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

function createTableProxy() {
    let proxy_list_tbody = $('table.proxy_list tbody');
    proxy_list_tbody.empty();
    $('[name="import_proxy"]').val(Proxy.get_proxylist_to_textarea());

    let cp = Proxy.get_current_proxy()
    let btn_reset = $('button.resetProxy');
    if (cp) {
        btn_reset.removeClass('d-none');
    } else {
        btn_reset.addClass('d-none');
    }

    let proxy_list = Proxy.get_proxylist();
    if (proxy_list.length) {
        for (let i in proxy_list) {
            let el = proxy_list[i];
            let te = false; // this_enabled
            if (cp !== false) {
                if (cp.ip === el.ip && cp.port === el.port && cp.user === el.user && cp.pass === el.pass) {
                    te = true;
                    cp = false; // Cancel comparison
                }
            }

            proxy_list_tbody.append(`
                <tr>
                    <td class="py-0 px-1 align-middle` + (te ? '' : ' text-secondary') + `">
                        <a href="#" class="text-success proxy_` + (te ? 'current' : 'select') + `">
                            <i class="bi bi-` + (te ? 'check-circle-fill' : 'circle') + `"></i>
                        </a>
                    </td>
                    <td class="p-0">
                        <input class="form-control form-control-sm i_ip" value="` + el.ip + `" readonly>
                    </td>
                    <td class="p-0">
                        <input class="form-control form-control-sm i_port" value="` + el.port + `" readonly>
                    </td>
                    <td class="p-0">
                        <input class="form-control form-control-sm i_user" value="` + el.user + `" readonly>
                    </td>
                    <td class="p-0">
                        <input class="form-control form-control-sm i_pass" value="` + el.pass + `" readonly>
                    </td>
                </tr>
            `);
        }
    } else {
        setTimeout(() => {
            $('#collapse_import').collapse('toggle')
        }, 250);
    }
}

function init() {
    localizeHTML();

    $("body")
        .on('click', 'a#copyright_link', function () {
            chrome.tabs.create({url: $(this).attr('href')});
            return false;
        })
        .on('mouseenter', '.proxy_list a.proxy_select', function () {
            $(this).find('i').removeClass('bi-circle').addClass('bi-check-circle');
        })
        .on('mouseleave', '.proxy_list a.proxy_select', function () {
            $(this).find('i').removeClass('bi-check-circle').addClass('bi-circle');
        })
        .on('click', '.proxy_list a.proxy_current, button.resetProxy', function () {
            Proxy.reset_proxy();
            createTableProxy();
        })
        .on('click', '.proxy_list a.proxy_select', function () {
            let tr = $(this).closest('tr');
            let ip = tr.find('.i_ip').val();
            let port = tr.find('.i_port').val();
            let user = tr.find('.i_user').val();
            let pass = tr.find('.i_pass').val();
            Proxy.set_proxy(ip, port, user, pass);


            // Reload only active
            if (get_option('reload_current_tab')) {
                chrome.windows.getAll({populate: true}, function (windows) {
                    windows.forEach(function (window) {
                        for (const tab of window.tabs) {
                            if (tab.active === false) continue;
                            chrome.tabs.reload(tab.id);
                        }
                    });
                });
            }

            // Reload only inactive
            if (get_option('reload_other_tabs')) {
                chrome.windows.getAll({populate: true}, function (windows) {
                    windows.forEach(function (window) {
                        for (const tab of window.tabs) {
                            if (tab.active === true) continue;
                            chrome.tabs.reload(tab.id);
                        }
                    });
                });
            }

            /*
            chrome.cookies.getAll({}, function (cookies) {
                for (const cookie of cookies) {
                    console.log(cookie)
                    chrome.cookies.remove({name: cookie.name, url: extrapolateUrlFromCookie(cookie)})
                }
            });
            */

            if (get_option('remove_cookies')) {
                chrome.browsingData.removeCookies({});
                /*
                chrome.browsingData.removeIndexedDB({});
                chrome.browsingData.removeLocalStorage({});
                chrome.browsingData.removeWebSQL({});
                */
            }

            if (get_option('remove_cache')) {
                chrome.browsingData.removeCache({});
                if (browserCode === 'chrome') {
                    chrome.browsingData.removeAppcache({});
                    chrome.browsingData.removeCacheStorage({});
                }
            }

            createTableProxy();
        })
        .on('click', '.saveProxy', function () {
            let textarea = $('[name="import_proxy"]');
            if (!textarea.length)
                return false;

            Proxy.save_proxylist_from_import(textarea.val());
            createTableProxy();
            $('#collapse_list').collapse('toggle');
        })
        .on('change', 'input[name="reload_current_tab"]', function () {
            set_option('reload_current_tab', this.checked);
        })
        .on('change', 'input[name="reload_other_tabs"]', function () {
            set_option('reload_other_tabs', this.checked);
        })
        .on('change', 'input[name="remove_cookies"]', function () {
            set_option('remove_cookies', this.checked);
        })
        .on('change', 'input[name="remove_cache"]', function () {
            set_option('remove_cache', this.checked);
        })

    if (get_option('reload_current_tab')) $('input[name="reload_current_tab"]').prop('checked', true);
    if (get_option('reload_other_tabs')) $('input[name="reload_other_tabs"]').prop('checked', true);
    if (get_option('remove_cookies')) $('input[name="remove_cookies"]').prop('checked', true);
    if (get_option('remove_cache')) $('input[name="remove_cache"]').prop('checked', true);

    createTableProxy();
    document.body.style.display = '';
}

document.addEventListener('DOMContentLoaded', init);