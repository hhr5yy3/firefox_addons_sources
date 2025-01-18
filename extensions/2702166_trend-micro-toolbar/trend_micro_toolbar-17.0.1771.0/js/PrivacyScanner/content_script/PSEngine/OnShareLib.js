(function() {
    var GetWording = function() {
        var url = document.location.href;
        var wording_tag = 'wording=';
        var wording = null;
        if (url.indexOf(wording_tag) != -1) {
            var substring = url.substr(url.indexOf(wording_tag) + wording_tag.length);
            wording = decodeURIComponent(substring);
            var end = substring.indexOf('&');
            if (end != -1) {
                wording = decodeURIComponent(substring.substr(0, end));
            }
            if (wording.indexOf('+') != -1) {
                wording = wording.replace(new RegExp('\\+', 'g'), ' ');
            }
        }
        return wording;
    };
    window.GetWording = GetWording;
})();
