var Cipher = (function createChiper() {
    D.func();
    
    var FROM_STRING = 0;
    var FROM_BASE64 = 1;
    var TO_STRING = 2;
    var TO_BASE64 = 4;

    function encryptString(input, key, iv) {
        if (!input) {
            return input;
        }
        return cryptoTransformString(input, FROM_STRING | TO_BASE64, function transform(bytes){
            return SlowAES.encrypt(bytes, SlowAES.modeOfOperation.CBC,
                Base64.decode(key), Base64.decode(iv));
        });
    }

    function decryptString(input, key, iv) {
        if (!input) {
            return input;
        }
        return cryptoTransformString(input, FROM_BASE64 | TO_STRING, function transform(bytes){
            return SlowAES.decrypt(bytes, SlowAES.modeOfOperation.CBC,
                Base64.decode(key), Base64.decode(iv));
        });
    }

    function cryptoTransformString(input, flags, transform) {
        var bytes;
        if (flags & FROM_BASE64) {
            bytes = Base64.decode(input);
        } else {
            bytes = Utf8.getBytes(input);
        }
        var buf = transform(bytes);
        return flags & TO_BASE64 ? Base64.encode(buf) : Utf8.getString(buf);
    }

    return {
        encryptString : function (input, key, iv) {
            return encryptString(input, key, iv);
        },

        decryptString : function (input, key, iv) {
            return decryptString(input, key, iv);
        }

    };
})();