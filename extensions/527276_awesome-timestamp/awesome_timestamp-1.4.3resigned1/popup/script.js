let timestamp, from, showMs, interval;

/* get data from ls */
browser.storage.local.get().then((response) => {
    showMs = response.showMs || false;

    document.getElementById('showMs').checked = showMs;

    /* init view */
    updateLiveView();
    setPlaceholder();
    startUpdate();
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('timeInput').addEventListener('change', function() {
        convert();
    });
    document.getElementById('timeInput').addEventListener('keyup', function() {
        convert();
    });
    document.getElementById('showMs').addEventListener('change', function() {
        showMs = this.checked;
        browser.storage.local.set({
            showMs
        });

        stopUpdate();
        startUpdate();
        setPlaceholder();
        convert();
    });
    document.getElementById('dateFormat').addEventListener('click', function() {
        this.select();
        document.execCommand("copy");
        showHint();
    });
    document.getElementById('timestampFormat').addEventListener('click', function() {
        this.select();
        document.execCommand("copy");
        showHint();
    });
    document.getElementById('dateFormatConverted').addEventListener('click', function() {
        this.select();
        document.execCommand("copy");
        showHint();
    });
});

function startUpdate() {
    interval = window.setInterval(function() {
        updateLiveView();
    }, showMs ? 1 : 1000);
}

function stopUpdate() {
    window.clearInterval(interval);
}

function setPlaceholder() {
    document.getElementById('timeInput').setAttribute('placeholder', showMs ? 'microtimestamp or dd/mm/yyyy h:m:s.ms' : 'timestamp or dd/mm/yyyy h:m:s');
}

function showHint() {
    document.getElementById('hint').className = 'hint show';
    window.setTimeout(function() {
        document.getElementById('hint').className = 'hint';
    }, 2000);
}

function convert() {
    var dataFromForm = document.getElementById('timeInput').value;

    if (dataFromForm.search('/') != -1) {
        if (dataFromForm.search(' ') != -1) {
            var dataSplited = dataFromForm.split(' '),
                dataData = dataSplited[0],
                dataTime = dataSplited[1],
                a = dataData.split('/'),
                b = dataTime.split(':')
                ms = 0;

                if (showMs && b.length === 3) {
                    var c = b[2].split('.');
                    ms = c[1];
                }
        } else {
            var a = dataFromForm.split('/'),
                b = '';
        }
        var dataToSearch = new Date();
        dataToSearch.setFullYear(a[2]);
        dataToSearch.setMonth(a[1] - 1);
        dataToSearch.setDate(a[0]);
        if (b[0] != undefined) {
            dataToSearch.setHours(b[0]);
        }
        if (b[1] != undefined) {
            dataToSearch.setMinutes(b[1]);
        }
        if (b[2] != undefined) {
            dataToSearch.setSeconds(b[2]);
        }
        dataToSearch.setMilliseconds(ms);
        timestamp = showMs ? dataToSearch.getTime() : dataToSearch.getTime() / 1000 | 0,
        from = 'data';
    } else {
        timestamp = dataFromForm,
        from = 'timestamp';
    }
    var date = timestamp2date(timestamp);

    if (from == 'timestamp') {
        if (document.getElementById('timeInput').value != '' && !isNaN(date.day)) {
            document.getElementById('dateFormatConverted').value = date.day + '/' + date.month + '/' + date.year + ' ' + date.hour + ':' + date.minute + ':' + date.second + (showMs ? '.' + date.ms : '');
        } else {
            document.getElementById('dateFormatConverted').value = '';
        }
    } else {
        if (!isNaN(timestamp)) {
            document.getElementById('dateFormatConverted').value = timestamp;
        } else {
            document.getElementById('dateFormatConverted').value = '';
        }
    }
}

function timestamp2date(ts) {
    let date = new Date(showMs ? parseInt(ts) : ts * 1000),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        ms = date.getMilliseconds();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (second < 10) {
        second = '0' + second;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (ms < 10) {
        ms = '00' + ms;
    } else if (ms < 100) {
        ms = '0' + ms;
    }

    return {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute: minute,
        second: second,
        ms: ms
    };
}

function updateLiveView() {
    timestamp = showMs ? new Date().getTime() : new Date().getTime() / 1000 | 0;
    let date = timestamp2date(timestamp);

    document.getElementById('dateFormat').value = date.day + '/' + date.month + '/' + date.year + ' ' + date.hour + ':' + date.minute + ':' + date.second + (showMs ? '.' + date.ms : '');
    document.getElementById('timestampFormat').value = timestamp;
}
