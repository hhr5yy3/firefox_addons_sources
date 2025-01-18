var Generator = (function createGenerator() {
    D.func();

    const MEMORABLE_TYPE = 0;
    const LETTERS_AND_NUMBERS_TYPE = 1;
    const RANDOM_TYPE = 2;
    const NUMBERS_ONLY_TYPE = 3;
    // alphabets
    const NUMBERS_ALPHABET = "23456789";
    const ALL_NUMBERS_ALPHABET = "1234567890";
    const LETTERS_ALPHABET = "abcdefghijkmnopqrstuvwxyz";
    const ALL_LETTERS_ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    const CAPITALS_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const ALL_CAPITALS_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function generatePassword(length, type) {
        D.func();
        // generate memorable password ?
        if (type === MEMORABLE_TYPE) {
            return getMemorablePassword(length);
        } else {
            return getRandomPassword(length, type);
        }
    }

    function getMemorablePassword(length) {
        const word1MaxLength = length / 2;
        // get word from dictionary
        const word1 = getDictionaryWord(word1MaxLength);
        // get character separator
        const separator = getSeparator();
        // get digit separator
        const numberMaxLength = length < 10 ? 1 : length < 12 ? 2 : length < 16 ? 3 : 4;
        const number = getRandomNumber(numberMaxLength);
        // make result
        let b = `${word1}${number}${separator}`;
        let lengthLeft = length - b.length;
        while (lengthLeft > 2) {
            let word = getDictionaryWord(lengthLeft);
            b += `${word}${separator}`;
            lengthLeft = length - b.length;
        }
        while (b.length < length) {
            b += separator;
        }
        return b.toString().substring(0, length);
    }

    function getRandomNumber(maxLength) {
        let b = "";
        const length = 1 + getSecureRandom(maxLength);
        for (let i = 0; i < length; i++) {
            let digit = "";
            do {
                digit = ALL_NUMBERS_ALPHABET.charAt(getSecureRandom(ALL_NUMBERS_ALPHABET.length));
            } while (digit == "0" && i == 0);
            b += digit;
        }
        return b.toString();
    }

    function getSeparator() {
        const separatorAlphabet = Settings.getAlphabet("separator_alphabet");
        // get random separator
        return separatorAlphabet.charAt(getSecureRandom(separatorAlphabet.length));
    }

    function getDictionaryWord(maxLength) {
        const count = DICTIONARY.length;
        const shift = getSecureRandom(count);
        for (let i = shift; i < shift + count; i++) {
            let word = DICTIONARY[i % count];
            if (word.length <= maxLength) {
                if (getSecureRandom(2) != 0) {
                    return word.substring(0, 1).toLocaleUpperCase() + word.substring(1);
                } else {
                    return word;
                }
            }
        }
        return null;
    }

    function getRandomPassword(length, type) {
        // get alphabets
        const alphabets = getAlphabets(type);
        // make password
        let usedAlphabets = [];
        let b = "";
        for (let i = 0; i < length; i++) {
            let alphabetIndex = 0;
            let unusedAlphabetCount = alphabets.length - usedAlphabets.length;
            let charsLeft = length - b.length;
            if (charsLeft > unusedAlphabetCount) {
                alphabetIndex = getSecureRandom(alphabets.length);
            } else {
                for (let j = 0; j < alphabets.length; j++) {
                    if (!usedAlphabets.includes(alphabets[j])) {
                        alphabetIndex = j;
                        break;
                    }
                }
            }
            let alphabet = alphabets[alphabetIndex];
            usedAlphabets.push(alphabets[alphabetIndex]);
            let c = alphabet.charAt(getSecureRandom(alphabet.length));
            b += c;
        }
        return b.toString();
    }

    function getAlphabets(type) {
        switch (type) {
            case NUMBERS_ONLY_TYPE:
                return [ALL_NUMBERS_ALPHABET];
            case LETTERS_AND_NUMBERS_TYPE:
                return getLettersAndNumbersAlphabets();
            case RANDOM_TYPE:
            default:
                const symbolsAlphabet = Settings.getAlphabet("symbols_alphabet");
                return [...getLettersAndNumbersAlphabets(), symbolsAlphabet];
        }
    }

    function getLettersAndNumbersAlphabets() {
        if (Settings.isExcludeSimilarCharacters()) {
            return [LETTERS_ALPHABET, CAPITALS_ALPHABET, NUMBERS_ALPHABET];
        } else {
            return [ALL_LETTERS_ALPHABET, ALL_CAPITALS_ALPHABET, ALL_NUMBERS_ALPHABET];
        }
    }

    function getSecureRandom(length) {
        // Uint16Array max value = 65 535
        return window.crypto.getRandomValues(new Uint16Array(1))[0] % length;
    }

    return {
        generatePassword: function(length, type) {
            return generatePassword(length, type);
        }
    };
})();