var SearchHelper = (function createSearchHelper() {
    D.func();

    function stripAccents(string) {
        D.func();
        // TODO: adapt for different languages
        // decomposition
        let normalString = string.normalize("NFD");
        // strip accents
        normalString = normalString.replace(/[\u0300-\u036f]/g, "");
        // reverse composition
        normalString = normalString.normalize("NFC");
        return normalString;
    }

    function getFilteredAccounts(accounts, query) {
        D.func();
        // search query is empty ?
        if (query === "") {
            return accounts;
        }
        // split query into words
        const searchWords = getSearchWords(query);
        // filter accounts
        const filteredAccounts = accounts.filter(account => {
            // sought account ?
            if (satisfiesSearch(account, searchWords)) {
                return account;
            }
        });
        return filteredAccounts;
    }

    function satisfiesSearch(account, searchWords) {
        D.func();
        for (let i = 0; i < searchWords.length; i++) {
            if (!containsWord(account, searchWords[i])) {
                return false;
            }
        }
        return true;
    }

    function containsWord(account, word) {
        D.func();
        // title
        if (easyContains(account.title2, word)) {
            return true;
        }
        // login
        if (easyContains(account.login, word)) {
            return true;
        }
        return false;
    }

    function easyContains(haystack, needle) {
        D.func();
        if (haystack && needle) {
            // strip accents
            let strippedHaystack = stripAccents(haystack);
            let strippedHNeedle = stripAccents(needle);
            // to lower case
            strippedHaystack = strippedHaystack.toLocaleLowerCase();
            strippedHNeedle = strippedHNeedle.toLocaleLowerCase();
            return strippedHaystack.includes(strippedHNeedle);
        }
        return false;
    }

    function getSearchWords(string) {
        D.func();
        const words = string.split(/\s+/).filter(word => word !== "");
        return words;
    }

    function easyIndexOf(haystack, needle) {
        D.func();
        // strip accents
        let strippedHaystack = stripAccents(haystack);
        let strippedHNeedle = stripAccents(needle);
        // to lower case
        strippedHaystack = strippedHaystack.toLocaleLowerCase();
        strippedHNeedle = strippedHNeedle.toLocaleLowerCase();
        return strippedHaystack.indexOf(strippedHNeedle);;
    }

    function getHighlights(text, words) {
        D.func();
        let highlights = [];
        // go through all words
        for (let i = 0; i < words.length; i++) {
            // find the boundaries of the word
            let wordStartIndex = easyIndexOf(text, words[i]);
            if (wordStartIndex !== -1) {
                let wordEndIndex = wordStartIndex + words[i].length;
                // push word boundaries
                highlights.push({ start: wordStartIndex, end: wordEndIndex });
            }
        }
        return highlights;
    }

    function isHighlightedLetter(index, highlights) {
        D.func();
        for (let i = 0; i < highlights.length; i++) {
            let highlight = highlights[i];
            // belongs to interval ?
            if (index >= highlight.start && index < highlight.end) {
                return true;
            }
        }
        return false;
    }

    function getHighlightedChunks(text, words) {
        D.func();
        // get highlights
        const highlights = getHighlights(text, words);
        // go through letters in text
        let chunks = [];
        for (let i = 0; i < text.length; i++) {
            addHighlightedLetter(chunks, text[i], isHighlightedLetter(i, highlights));
        }
        return chunks;
    }

    function addHighlightedLetter(chunks, letter, isHighlighted) {
        const lastChunk = chunks.length > 0 ? chunks[chunks.length - 1] : null;
        if (lastChunk && lastChunk.highlighted === isHighlighted) {
            lastChunk.text += letter;
        } else {
            chunks.push({
                text: letter,
                highlighted: isHighlighted
            });
        }
    }

    function setHighlightedText(element, text, searchQuery) {
        D.func();
        // clear element
        clearNode(element);
        // set text
        if (searchQuery && searchQuery.length !== 0 && text.length !== 0) {
            const searchWords = getSearchWords(searchQuery);
            const chunks = getHighlightedChunks(text, searchWords);
            for (let chunk of chunks) {
                if (chunk.highlighted) {
                    let markElement = document.createElement("mark");
                    markElement.textContent = chunk.text.toString();
                    element.appendChild(markElement);
                } else {
                    let spanElement = document.createElement("span");
                    spanElement.textContent = chunk.text.toString();
                    element.appendChild(spanElement);
                }
            }
        } else {
            element.textContent = text || "-";
        }
    }

    function clearNode(element) {
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

    return {
        getFilteredAccounts: function(accounts, query) {
            return getFilteredAccounts(accounts, query);
        },

        getSearchWords: function(string) {
            return getSearchWords(string);
        },

        setHighlightedText: function(element, text, searchQuery) {
            return setHighlightedText(element, text, searchQuery);
        }
    };
})();