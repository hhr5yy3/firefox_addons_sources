var defClipRect = null
browser.runtime.sendMessage('get_last_image', function (ii) {
    img.src = ii.img
    defClipRect = ii.rect
})

var img = new Image()
var canvas = $("#canvas")
var ctx = canvas.getContext("2d")

img.crossOrigin = ''
img.onload = function () {
    if (defClipRect) {
        canvas.width = defClipRect.w
        canvas.height = defClipRect.h
        ctx.drawImage(img, defClipRect.x, defClipRect.y, defClipRect.w, defClipRect.h, 0, 0, defClipRect.w, defClipRect.h)
        defClipRect = null
    } else {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
    }

    decodeOffline()
}

var qr = qrcode//new QrCode();
qr.callback = function (/*err,*/ result) {
    // debugger
    if (result === 'error decoding QR Code') {
        setResult("ERROR! \n"/* + err*/, false);
        // throw result
    } else {
        // result.points
        // setResult(result.result, true);
        setResult(result, true);
    }
}

var clickToOpen = $('#clickToOpen');
clickToOpen.addEventListener('click', function () {
    var url = $('#result').value;
    if (!/^[a-z]+:/i.test(url)) url = 'http://' + url;
    window.open(url, '_blank');
}, false);

function setResult(result, success) {
    var info = $('#info')

    if (success) info.classList.remove('is-failed');
    else info.classList.add('is-failed');

    $('#result').value = result;

    if (success) {
        $('#clip').style.display = 'none';
        if (/^(?:[a-z-]+\:.+|\w+\.\w+)/i.test(result)) {
            clickToOpen.style.display = '';
        } else {
            clickToOpen.style.display = 'none';
        }
    }
}

function decodeOffline() {
    var dataURL = canvas.toDataURL("image/png");
    qr.decode(dataURL);
}

function decodeOnline() {
    var e = $('#decodeOnline');
    e.disabled = true;
    e.textContent = 'Decoding...';
    function reset() {
        e.disabled = false;
        e.textContent = 'Decode Online';
    }

    canvas.toBlob(function (blob) {
        var formData = new FormData();
        formData.append("f", blob);

        var request = new XMLHttpRequest();
        request.onerror = function () {
            reset();
            setResult("Failed to decode online.\nNetwork error.", false);
        }
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                reset();
                t = request.responseText;
                if (t.indexOf('<pre>') === -1) {
                    setResult("Failed to decode online.", false);
                } else {
                    t = t.substr(t.indexOf('<pre>') + 5);
                    t = t.substr(0, t.indexOf('</pre>'));
                    t = t.replace(/&(#?\w+);?/g, function (w, k) {
                        k = k.toLowerCase();
                        if (k == 'nbsp') return ' '
                        if (k == 'amp') return '&'
                        if (k == 'lt') return '<'
                        if (k == 'gt') return '>'
                        if (k.indexOf('#x') == 0) return String.fromCharCode(parseInt(k.substr(2), 16))
                        if (k.indexOf('#') == 0) return String.fromCharCode(parseInt(k.substr(1)))
                        return w
                    })
                    setResult(t, true);
                }
            }
        }
        request.open("POST", "http://zxing.org/w/decode");
        request.send(formData);
    }, "image/png")
}

$('#decodeOnline').addEventListener('click', decodeOnline, false);

// function to open clip-n-chop window
var clipImage = (function () {

    var clip = $('#clip');
    var zoom = 1;
    var canvas = $('#clip-canvas');
    var ctx = canvas.getContext("2d");

    var x1 = -1, y1 = -1, x2, y2;
    var x, y, w, h;

    function calcXYWH() {
        w = x2 - x1, h = y2 - y1;
        if (w < 0) { x = x2; w = -w } else { x = x1 }
        if (h < 0) { y = y2; h = -h } else { y = y1 }
    }

    canvas.addEventListener('mousedown', function (ev) {
        if (!(ev.buttons & 1)) return;

        x1 = ev.offsetX;
        y1 = ev.offsetY;
    }, false)

    canvas.addEventListener('mousemove', function (ev) {
        if (!(ev.buttons & 1)) return;

        x2 = ev.offsetX;
        y2 = ev.offsetY;
        calcXYWH();

        ctx.fillStyle = "#FFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (prefs.getBoolPref('otsu')) imgproc.otsu(ctx, x, y, w, h);
        if (prefs.getBoolPref('inv')) imgproc.invert(ctx, x, y, w, h);

        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "green";
        ctx.rect(x, y, w, h);
        ctx.stroke();
    }, false)

    canvas.addEventListener('mouseup', function (ev) {
        if (ev.button != 0) return;

        x2 = ev.offsetX;
        y2 = ev.offsetY;
        calcXYWH();

        window.canvas.width = w;
        window.canvas.height = h;
        window.ctx.drawImage(canvas, -x, -y);

        decodeOffline();
        clip.style.display = 'none';
        // ctx.font = "12pt";
        // ctx.fillStyle = "#0F0";
        // ctx.fillText("Please retry", x, y);
    }, false)

    clip.addEventListener('wheel', function (ev) {
        var d = ev.deltaY;
        var v = zoom;

        if (d < 0) v += .1;
        if (d > 0) v -= .1;

        if (v < .2) v = .2;
        if (v > 2.) v = 2.;
        zoom = v;

        afterZoomUpdated();

        ev.preventDefault();
        ev.stopPropagation();
    }, true)

    function afterZoomUpdated() {
        canvas.width = zoom * img.width;
        canvas.height = zoom * img.height;
        ctx.fillStyle = "#FFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    function startClip() {
        zoom = 1;
        afterZoomUpdated();
        clip.style.display = '';
    }

    return startClip;
})();

// auto close

setTimeout(function () {
    window.onblur = function () { prefs.getBoolPref('autoclose') && window.close() };
}, 50);

document.addEventListener('keyup', function (ev) {
    if ((ev.keyCode || ev.which) == 27) window.close()
}, false)


$$each('[ev-close]', function (b) {
    b.addEventListener('click', function () { window.close() }, false);
})

$$each('[ev-clip]', function (b) {
    b.addEventListener('click', function () { clipImage() }, false);
})
