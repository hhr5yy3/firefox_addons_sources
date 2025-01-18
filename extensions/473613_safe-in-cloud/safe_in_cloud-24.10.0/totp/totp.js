var TOTP = (function createTOTP() {
    D.func();
    
    function getSecretKey(text) {
        D.func(text);
        var secretKey = {
            secret: "", 
            digits: 6,
            algorithm: "SHA1"
        };
        try {
            // otpauth://totp/user@example.com?secret=FFF...
            if (text.startsWith("otpauth")) {
                var url = new URL(text);
                if (url.href.startsWith("otpauth://totp")) { // workaround: url.host is null
                    var secret = url.searchParams.get("secret");
                    if (secret) {
                        secretKey.secret = base32ToHex(secret);
                    }
                    var algorithm = url.searchParams.get("algorithm");
                    if (algorithm) {
                        secretKey.algorithm = algorithm;
                    }
                    secretKey.digits = parseInt(url.searchParams.get("digits"));
                    if (secretKey.digits != 6 && secretKey.digits != 8) {
                        secretKey.digits = 6;
                    }
                }
            } else {
                secretKey.secret = base32ToHex(text);
            }
        } catch (error) {
            D.error(error);
        }
        return secretKey.secret ? secretKey : null;
    }

    function getPasscode(secretKey) {
        D.func();
        try {
            var epoch = Math.round(new Date().getTime() / 1000.0);
            var time = leftPad(decToHex(Math.floor(epoch / 30)), 16, "0");
            var algorithm = secretKey.algorithm.toUpperCase().replace("SHA", "SHA-");
            var sha = new jsSHA(algorithm, "HEX");
            sha.setHMACKey(secretKey.secret, "HEX");
            sha.update(time);
            var hmac = sha.getHMAC("HEX");
            var offset = hexToDec(hmac.substring(hmac.length - 1));
            var otp = (hexToDec(hmac.substr(offset * 2, 8)) & hexToDec("7fffffff")) + "";
            otp = otp.substr(otp.length - secretKey.digits, secretKey.digits);
            return otp;
        } catch (error) {
            D.error(error);
        }
        return null;
    }

    function decToHex(s) {
        return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    };

    function hexToDec(s) {
        return parseInt(s, 16);
    };

    function leftPad(s, l, p) {
        if(l + 1 >= s.length) {
            s = Array(l + 1 - s.length).join(p) + s;
        }
        return s;
    };

    function base32ToHex(base32) {
        var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var bits = "";
        var hex = "";
        base32 = base32.replace(/[\s-]/g, "");
        for (var i = 0; i < base32.length; i++) {
            var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            if (val == -1) {
                throw "Illegal Base32 character";
            }
            bits += leftPad(val.toString(2), 5, "0");
        }
        for (var i = 0; i + 4 <= bits.length; i += 4) {
            var chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16);
        }
        if (hex.length % 2 != 0) {
            hex = hex + "0";
        }
        return hex;
    }

    return {
        getSecretKey : function (text) {
            return getSecretKey(text);
        },

        getPasscode : function (secretKey) {
            return getPasscode(secretKey);
        }
    };
})();