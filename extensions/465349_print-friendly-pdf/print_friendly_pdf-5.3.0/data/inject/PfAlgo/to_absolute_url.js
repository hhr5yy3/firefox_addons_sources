var toAbsoluteUrl = (function() {
  var absoluteUrlRegexp = /^https?:\/\//i;
  return function(src, pfConfigLocation) {
    if(!src) { return src; }
    var js = ['javascript', ':'].join('');

    if (src.startsWith(js)) {
      return src;
    } else if (src.startsWith('#')) {
      return src;
    } else if (absoluteUrlRegexp.test(src)) {
      return src;
    } else if (src.startsWith('//')) {
      return pfConfigLocation.protocol + src;
    } else {
      var imageDomain = pfConfigLocation.protocol + '//' + pfConfigLocation.host;
      if (!src.startsWith('/')) { src = '/' + src; }
      return imageDomain + src;
    }
  };
})();
