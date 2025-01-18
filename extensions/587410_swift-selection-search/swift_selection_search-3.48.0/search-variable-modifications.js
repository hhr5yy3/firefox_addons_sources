var SearchVariables;
(function (SearchVariables) {
    function modifySearchVariable(url, variableName, text, encode) {
        text = text.trim();
        let searchIndex = 0;
        const queryParts = [];
        while (true) {
            const variableModifications = getSearchVariableReplacements(url, variableName, searchIndex);
            if (variableModifications.searchVariableEndIndex == -1) {
                break;
            }
            queryParts.push(url.substring(searchIndex, variableModifications.searchVariableStartIndex));
            let replacedText = replace(text, variableModifications.modifications);
            if (encode && !variableModifications.containsDisableURIEncoding()) {
                replacedText = encodeURIComponent(replacedText);
            }
            queryParts.push(replacedText);
            searchIndex = variableModifications.searchVariableEndIndex;
        }
        queryParts.push(url.substring(searchIndex));
        return queryParts.join("");
    }
    SearchVariables.modifySearchVariable = modifySearchVariable;
    class SearchVariableModification {
    }
    class SearchVariableSlice extends SearchVariableModification {
        constructor(startIndex, endIndex) {
            super();
            this.startIndex = startIndex;
            this.endIndex = endIndex;
        }
        apply(text) {
            let endIndex = this.endIndex;
            if (endIndex === null) {
                endIndex = text.length;
            }
            else if (endIndex < 0) {
                endIndex += text.length;
            }
            let startIndex = this.startIndex;
            if (startIndex === null) {
                startIndex = 0;
            }
            else if (startIndex < 0) {
                startIndex += text.length;
                if (endIndex === 0) {
                    endIndex = text.length;
                }
            }
            try {
                return text.substring(startIndex, endIndex);
            }
            catch (_a) {
                return text;
            }
        }
    }
    SearchVariables.SearchVariableSlice = SearchVariableSlice;
    class SearchVariableReplacement extends SearchVariableModification {
        constructor(source, target) {
            super();
            this.source = source;
            this.target = target;
        }
        apply(text) {
            return text.split(this.source).join(this.target);
        }
    }
    SearchVariables.SearchVariableReplacement = SearchVariableReplacement;
    class SearchVariableRegexReplacement extends SearchVariableModification {
        constructor(source, flags, target) {
            super();
            this.source = source;
            this.flags = flags;
            this.target = target;
        }
        apply(text) {
            try {
                const regex = new RegExp(this.source, this.flags);
                return text.replace(regex, this.target);
            }
            catch (_a) {
                return text;
            }
        }
    }
    SearchVariables.SearchVariableRegexReplacement = SearchVariableRegexReplacement;
    class SearchVariableRegexMatch extends SearchVariableModification {
        constructor(source, flags) {
            super();
            this.source = source;
            this.flags = flags;
        }
        apply(text) {
            try {
                const regex = new RegExp(this.source, this.flags);
                const match = text.match(regex);
                return match !== null ? match.join("") : text;
            }
            catch (_a) {
                return text;
            }
        }
    }
    SearchVariables.SearchVariableRegexMatch = SearchVariableRegexMatch;
    class SearchVariableFunction extends SearchVariableModification {
        constructor(functionName) {
            super();
            this.functionName = functionName;
        }
        apply(text) {
            const name = this.functionName.toLowerCase();
            switch (name) {
                case "lowercase": return text.toLowerCase();
                case "uppercase": return text.toUpperCase();
                case "encodeuricomponent": return encodeURIComponent(text);
                case "disableuriencoding": return text;
                default: return text;
            }
        }
    }
    SearchVariables.SearchVariableFunction = SearchVariableFunction;
    class SearchVariableModifications {
        constructor(modifications, searchVariableStartIndex, searchVariableEndIndex) {
            this.modifications = modifications;
            this.searchVariableStartIndex = searchVariableStartIndex;
            this.searchVariableEndIndex = searchVariableEndIndex;
        }
        static createDefault() {
            return new SearchVariableModifications([], -1, -1);
        }
        containsDisableURIEncoding() {
            return this.modifications.find(mod => (mod instanceof SearchVariableFunction) && mod.functionName.toLowerCase() == "disableuriencoding") !== undefined;
        }
    }
    SearchVariables.SearchVariableModifications = SearchVariableModifications;
    function getSearchVariableReplacements(url, variableName, startIndexForIndexOf) {
        const startString = "{" + variableName;
        var regex = new RegExp("\\" + startString, "i");
        let startIndex = url.substring(startIndexForIndexOf).search(regex);
        if (startIndex === -1) {
            return SearchVariableModifications.createDefault();
        }
        const modifications = SearchVariableModifications.createDefault();
        startIndex += startIndexForIndexOf;
        let index = startIndex + startString.length;
        if (url[index] == "}") {
            modifications.searchVariableStartIndex = startIndex;
            modifications.searchVariableEndIndex = index + 1;
            return modifications;
        }
        let state = 0;
        let replacementSource;
        let replacementTarget;
        let isEscaped = false;
        let regexSource;
        let regexFlags;
        let functionName;
        let rangeStartIndexString;
        let rangeEndIndexString;
        for (; index < url.length; index++) {
            const c = url[index];
            switch (state) {
                case 0: {
                    if (c === "}") {
                        modifications.searchVariableStartIndex = startIndex;
                        modifications.searchVariableEndIndex = index + 1;
                        return modifications;
                    }
                    else if (c === "{") {
                        state = 1;
                        replacementSource = "";
                    }
                    else if (c === "[") {
                        state = 7;
                        rangeStartIndexString = "";
                    }
                    else if (c === "(") {
                        state = 6;
                        functionName = "";
                    }
                    else if (c !== " ") {
                        return SearchVariableModifications.createDefault();
                    }
                    break;
                }
                case 1: {
                    if (index < url.length - 2 && c === "r" && url[index + 1] === "e" && url[index + 2] === "/") {
                        state = 2;
                        regexSource = "";
                        index += 2;
                    }
                    else {
                        state = 4;
                        index--;
                    }
                    break;
                }
                case 2: {
                    if (c === "/") {
                        state = 3;
                        regexFlags = "";
                    }
                    else {
                        regexSource += c;
                    }
                    if (c === "\\" && index < url.length - 1 && url[index + 1] === "/") {
                        regexSource += "/";
                        index += 1;
                    }
                    break;
                }
                case 3: {
                    if (c === "|") {
                        state = 5;
                        replacementTarget = "";
                    }
                    else if (c === "{") {
                        return SearchVariableModifications.createDefault();
                    }
                    else if (c === "}") {
                        modifications.modifications.push(new SearchVariableRegexMatch(regexSource, regexFlags));
                        state = 0;
                    }
                    else {
                        regexFlags += c;
                    }
                    break;
                }
                case 4: {
                    if (!isEscaped && c === "\\") {
                        isEscaped = true;
                        continue;
                    }
                    if (!isEscaped && c === "|") {
                        state = 5;
                        replacementTarget = "";
                    }
                    else if (!isEscaped && c === "{") {
                        return SearchVariableModifications.createDefault();
                    }
                    else if (!isEscaped && c === "}") {
                        return SearchVariableModifications.createDefault();
                    }
                    else {
                        replacementSource += c;
                    }
                    break;
                }
                case 5: {
                    if (!isEscaped && c === "\\") {
                        isEscaped = true;
                        continue;
                    }
                    if (!isEscaped && c === "}") {
                        if (regexSource && regexSource.length > 0) {
                            modifications.modifications.push(new SearchVariableRegexReplacement(regexSource, regexFlags, replacementTarget));
                        }
                        else {
                            modifications.modifications.push(new SearchVariableReplacement(replacementSource, replacementTarget));
                        }
                        state = 0;
                    }
                    else if (!isEscaped && (c === "|" || c === "}")) {
                        return SearchVariableModifications.createDefault();
                    }
                    else {
                        replacementTarget += c;
                    }
                    break;
                }
                case 6: {
                    if (c === ")") {
                        modifications.modifications.push(new SearchVariableFunction(functionName));
                        state = 0;
                    }
                    else {
                        functionName += c;
                    }
                    break;
                }
                case 7: {
                    if (c === "]") {
                        const rangeStartIndex = rangeStartIndexString.length > 0 ? Number(rangeStartIndexString) : NaN;
                        if (isNaN(rangeStartIndex)) {
                            return SearchVariableModifications.createDefault();
                        }
                        else {
                            modifications.modifications.push(new SearchVariableSlice(rangeStartIndex, rangeStartIndex + 1));
                        }
                        state = 0;
                    }
                    else if (c === ":") {
                        state = 8;
                        rangeEndIndexString = "";
                    }
                    else {
                        rangeStartIndexString += c;
                    }
                    break;
                }
                case 8: {
                    if (c === "]") {
                        state = 0;
                        const rangeStartIndex = rangeStartIndexString.length > 0 ? Number(rangeStartIndexString) : null;
                        const rangeEndIndex = rangeEndIndexString.length > 0 ? Number(rangeEndIndexString) : null;
                        if (rangeStartIndex === NaN || rangeEndIndex === NaN) {
                            return SearchVariableModifications.createDefault();
                        }
                        else {
                            modifications.modifications.push(new SearchVariableSlice(rangeStartIndex, rangeEndIndex));
                        }
                    }
                    else {
                        rangeEndIndexString += c;
                    }
                    break;
                }
            }
            if (isEscaped) {
                isEscaped = false;
            }
        }
        return SearchVariableModifications.createDefault();
    }
    SearchVariables.getSearchVariableReplacements = getSearchVariableReplacements;
    function replace(text, modifications) {
        for (let i = 0; i < modifications.length; i++) {
            const modification = modifications[i];
            text = modification.apply(text);
        }
        return text;
    }
})(SearchVariables || (SearchVariables = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXZhcmlhYmxlLW1vZGlmaWNhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWFyY2gtdmFyaWFibGUtbW9kaWZpY2F0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFXQSxJQUFVLGVBQWUsQ0E4WXhCO0FBOVlELFdBQVUsZUFBZTtJQUV4QixTQUFnQixvQkFBb0IsQ0FBQyxHQUFXLEVBQUUsWUFBb0IsRUFBRSxJQUFZLEVBQUUsTUFBZTtRQUVwRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5CLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztRQUM1QixNQUFNLFVBQVUsR0FBYSxFQUFFLENBQUM7UUFFaEMsT0FBTyxJQUFJLEVBQ1g7WUFDQyxNQUFNLHFCQUFxQixHQUFHLDZCQUE2QixDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFNUYsSUFBSSxxQkFBcUIsQ0FBQyxzQkFBc0IsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDdkQsTUFBTTthQUNOO1lBRUQsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFFNUYsSUFBSSxZQUFZLEdBQVcsT0FBTyxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUc5RSxJQUFJLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLDBCQUEwQixFQUFFLEVBQUU7Z0JBQ2xFLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNoRDtZQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUIsV0FBVyxHQUFHLHFCQUFxQixDQUFDLHNCQUFzQixDQUFDO1NBQzNEO1FBRUQsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FB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