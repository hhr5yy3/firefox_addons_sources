var ZxcvbnHelper = (function createZxcvbnHelper() {
    D.func();

    function getCrackTime(zxcvbnResult) {
        D.func();
        const seconds = entropyToSeconds(zxcvbnResult.entropy);
        return secondsToCrackTime(seconds);
    }

    function getStrengthScore(zxcvbnResult) {
        D.func();
        const seconds = entropyToSeconds(zxcvbnResult.entropy);
        return secondsToScore(seconds);
    }

    function secondsToScore(seconds) {
        D.func();
        if (seconds < Math.pow(10, 2)) {
            return 0;
        }
        if (seconds < Math.pow(10, 4)) {
            return 1;
        }
        if (seconds < Math.pow(10, 6)) {
            return 2;
        }
        if (seconds < Math.pow(10, 8)) {
            return 3;
        }
        return 4;
    }

    function entropyToSeconds(entropy) {
        D.func();
        const singleGuess = .010;
        const numAttackers = 100;
        const secondsPerGuess = singleGuess / numAttackers;
        return 0.5 * Math.pow(2, entropy) * secondsPerGuess;
    }

    function secondsToCrackTime(seconds) {
        D.func();
        let b = "";
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 31;
        const year = month * 12;
        const century = year * 100;
        if (seconds < minute) {
            b += Strings.get("instant_text");
        } else if (seconds < hour) {
            b += Math.ceil(seconds / minute) + " " + Strings.get("minutes_text");
        } else if (seconds < day) {
            b += Math.ceil(seconds / hour) + " " + Strings.get("hours_text");
        } else if (seconds < month) {
            b += Math.ceil(seconds / day) + " " + Strings.get("days_text");
        } else if (seconds < year) {
            b += Math.ceil(seconds / month) + " " + Strings.get("months_text");
        } else if (seconds < century) {
            b += Math.ceil(seconds / year) + " " + Strings.get("years_text");
        } else {
            b += Strings.get("centuries_text");
        }
        return b.toString();
    }

    return {
        getCrackTime: function(zxcvbnResult) {
            return getCrackTime(zxcvbnResult);
        },

        getStrengthScore: function(zxcvbnResult) {
            return getStrengthScore(zxcvbnResult);
        }
    };
})();