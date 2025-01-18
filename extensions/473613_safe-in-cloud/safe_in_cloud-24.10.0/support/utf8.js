var Utf8 = {
    getBytes: function(string) {
        var byteArray = [];
        for (var i = 0; i < string.length; i++) {
            if (string.charCodeAt(i) <= 0x7F)
                byteArray.push(string.charCodeAt(i));
            else {
                var h = encodeURIComponent(string.charAt(i)).substr(1).split("%");
                for (var j = 0; j < h.length; j++) {
                    byteArray.push(parseInt(h[j], 16));
                }
            }
        }
        return byteArray;
    },

    getString: function(bytes) {
        var string = "";
        for (var i = 0; i < bytes.length; i++) {
            string += bytes[i] <= 0x7F ? bytes[i] === 0x25 ? "%25" : // %
                String.fromCharCode(bytes[i]) : 
                "%" + bytes[i].toString(16).toUpperCase();
        }
        return decodeURIComponent(string);
    }
};
