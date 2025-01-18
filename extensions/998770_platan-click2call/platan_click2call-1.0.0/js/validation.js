var validation = {
    hasNumbers: function (string) {
        var regex = /\d/g;
        return regex.test(string);
    },
    unacceptableString: function (string) {
        return [
            /regon/i,
            /nip/i,
            /krs/i,
            /fax/i,
            /kapitał/i,
            /bdo/i,
            /([0-9]{2}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4})/,
        ].some(function (regexp) {
            return regexp.test(string);
        });
    },
    acceptableNumber: function (number) {
        return [
            /[\+\[]?[\s0-9]([\-\)\.\/-\]]?\s?\–?\(?[0-9\s]){8,20}?/,
            /^([\+\[]?[\(\)]?[\s0-9]([\-\)\.\/-\]]?\s?\–?\(?\d){8,20})$/,
            /(\+?[\s\-]?\d*[\s\.\-\\\/]?)?([\(\[][\d]*[\)\]])?[\s\.\-\\\/]?[\d]*[\s\.\-\\\/]?[\d]{3,4}?[\s\.\-\\\/]?[\d]+(([\s\.\-\\\/]?[\D]{1,8}?[\s\.\-\\\/]|\,)?[\d]+)?/g,
            /(([\+][\d]{1,3})?([\D])?[\d]{3,5}([\D])?[\d]{3,4}([\D])?[\d]{3,4})/g,
        ].some(function (regexp) {
            return regexp.test(number);
        });
    },
    unacceptableNumber: function (number) {
        return [
            /([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/,
            /([0-9A-Fa-f]{4}[.]){2}([0-9A-Fa-f]{4})/,
            /([0-9]{4})[\.\/\-]([0-9]{2})[.\/-]([0-9]{2})/,
            /([0-9][0-9]?[\.\/\-]){2}([0-9]{4})/,
            /([0-9]\D|[0-9]{2}\D).*[0-9]{4}.*[:]/,
            /^([1-9][^\d]|[0-3]\d[^\d])[^\d]?(\D{2,14}|(\d[^\d]|[0-3]\d[^\d]))[^\d]{1}([\w]\d{1,3})/,
            /^([0-9]{4})[\s][\.\/\-][\s]([0-9]{2})$/,
            /[1-2]([0-9]{3})[\s]?[\-\:][\s]?[1-2]([0-9]{3})/,
            /(([1-2][0-9][0-9]|[1-9][0-9]|[0-9])[.]){3}([1-2][0-9][0-9]|[1-9][0-9]|[0-9])/,
            /([0-2][0-9]|[0-9])[:]([0-9]{2})[\s]?[\.\/\-][\s]?([0-2][0-9]|[0-9])[:]([0-9]{2})/,
            /([0-2][0-9]|[0-9])[.]([0-9]{2})[\s]?[\.\/\-][\s]?([0-2][0-9]|[0-9])[.]([0-9]{2})/,
            /[\£\$\؋\ƒ\៛\¥\₡\₱\€\¢\₭\д\₮\₦\₩\﷼\฿\₴\л\₫]/,
            /([0-9]{1,3}\,)+[0-9]{1,3}/,
            /[0-9]+(\.[0-9]+)+/,
            /\/[0-9]+\//,
        ].some(function (regexp) {
            return regexp.test(number);
        });
    },
};

function isValidNumber(number, countries) {
    var cleanNumber = number
        .replace(/[a-zA-Z]+/g, ",")
        .replace(/[^0-9\+\,]/g, "");
    var result1 = validation.unacceptableNumber(number);
    var result2 = libphonenumber.isValidNumber(cleanNumber);
    var result3 = libphonenumber.isValidNumber(cleanNumber, countries);
    var result4 = validation.acceptableNumber(number);

    if (
        (result2 && !result1) ||
        (result4 && !result1) ||
        (result3 && !result1)
    ) {
        if (cleanNumber.length > 15) return false;
        else return true;
    }
    return false;
}
