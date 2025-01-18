if (typeof browser === "undefined") {
    var browser = chrome;
}

const SUPPORTED_LOCALES = ['af','sq','ar','hy','az','eu','be','bn','bg','ca','zh-CN','zh-TW','hr','cs','da','nl','en','eo','et','tl','fi','fr','gl','ka','de','el','gu','ht','iw','hi','hu','is','id','ga','it','ja','kn','ko','la','lv','lt','mk','ms','mt','no','fa','pl','pt','ro','ru','sr','sk','sl','es','sw','sv','ta','te','th','tr','uk','ur','vi','cy','yi'];

let playingAudio = undefined;

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        browser.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
                resolve(null);
            } else {
                resolve(result[key]);
            }
        });
    });
};

const writeLocalStorage = async (key, value) => {
    return new Promise((resolve, reject) => {
        browser.storage.local.set({[key]: value}, function () {
            resolve();
        });
    });
};

function base64ToArrayBuffer(base64) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
};

browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (!request.buffers) return;
        const buffers = request.buffers.map(it => base64ToArrayBuffer(it));
        if (!buffers) return;

        playBufFunc = (index) => {
            if (index >= buffers.length) return;
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            let audioContext = new AudioContext;
            audioContext.decodeAudioData(buffers[index], (buffer => {
                let source = audioContext.createBufferSource();
                source.buffer = buffer; 
                source.connect(audioContext.destination); 
                source.start(); 
                playingAudio = source;
                source.addEventListener("ended", (function() {
                    if (index + 1 < buffers.length) {
                        playBufFunc(index + 1);
                    }
                }))
            }), (error => {
                // showMsg("Playback error. Try another word."), toggleSpeakAudioButton(e, "normal"), audio = null
            }));
        };
        playBufFunc(0);
    }
);

class Content {
    constructor() {
        this.storage = null, this.selectedFullObject = null, this.selectBounding = null, this.selectedText = null, this.translateButton = null, this.translateTooltip = null, this.tooltipHeader = null, this.translatedText = null, this.audioElement = null, this.translatedLang = null; 
        this.speechLinks = {
            translatedLangLinks: [],
            titleLangLinks: []
        };
        this.speech200Texts = {
            translatedLangLinks: [],
            titleLangLinks: []
        };
        this.start();

        this.ctrlPressed = false;
        function cacheIt(event) {
            this.ctrlPressed = event.shiftKey;
        }
        document.onkeydown = cacheIt;
        document.onkeyup = cacheIt;
    }
    start() {
        this.initializeStorage().then(() => {
            this.insertDOMElements(), this.bindMethods(), this.initListeners()
        }).catch(a => console.error(a))
    }
    getUserID() {
        if (this.uid) return this.uid;
        else {
            let newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
                var randomNumber = 0 | 16 * Math.random(),
                    replacedNumber = "x" == char ? randomNumber : 8 | 3 & randomNumber;
                return replacedNumber.toString(16)
            });
            writeLocalStorage("translator_uid", newUuid);
            return newUuid;
        }
    }
    unifyLanguage(language) {
        if (SUPPORTED_LOCALES.includes(language)) return language;
        const lanPrefix = language.split('-');
        if (SUPPORTED_LOCALES.includes(lanPrefix)) return lanPrefix;
        return "en";
    }
    initializeStorage() {
        return new Promise(resolve => {
            readLocalStorage("translator_config").then((config) => {
                if (config) {
                    this.storage = config;
                    resolve();
                }
                else {
                    const defaultConfig = {
                        tl: this.unifyLanguage(browser.i18n.getUILanguage()),
                        vm: "ognt",
                        ft: true,
                        uid: this.getUserID(),
                        extId: browser.runtime.id,
                        date_install: new Date().getTime(),
                        double_click: "double_click_true"
                    };
                    this.storage = defaultConfig;
                    writeLocalStorage("translator_config", defaultConfig);
                    resolve();
                }
                resolve();
            });
        })
    }
    insertDOMElements() {
        this.insertUIElements(), this.createAudio()
    }
    insertUIElements() {
        document.body.insertAdjacentHTML("afterbegin", `<span class="translate-button-mtz translator-hidden"></span>`), document.body.insertAdjacentHTML("afterbegin", `<div class="translate-tooltip-mtz translator-hidden">
                    <div class="header">
                        <div class="header-controls">
                            Translator
                        </div>
                        <div class="header-controls">
                            <span class="support"></span>
                        </div>
                        <div class="header-controls">
                            <span class="settings"></span>
                        </div>
                    </div>
                    <div class="translated-text">
                        <div class="words"></div>
                        <div class="sentences"></div>
                    </div>
                </div>`)
    }
    createAudio() {
        const audioNode = document.createElement("audio");
        audioNode.className = "audio-for-speech";
        this.audioElement = audioNode;
        this.audioElement.src = "";
        document.body.insertAdjacentElement("afterbegin", audioNode);
    }
    bindMethods() {
        this.handleSelection = this.handleSelection.bind(this), this.handleTranslateClick = this.handleTranslateClick.bind(this), this.regulateTooltipVisibility = this.regulateTooltipVisibility.bind(this), this.handleHeaderClick = this.handleHeaderClick.bind(this), this.handletranslatedTextClick = this.handletranslatedTextClick.bind(this), this.handleDblClick = this.handleDblClick.bind(this)
    }
    initListeners() {
        this.initDOMListeners(), this.initStorageListeners()
    }
    initStorageListeners() {
        browser.storage.onChanged.addListener(a => {
            readLocalStorage("translator_config").then((config) => {
                this.storage = config;
            });
        })
    }
    initDOMListeners() {
        document.addEventListener("mouseup", this.handleSelection);
        document.addEventListener("mousedown", event => {
            this.regulateTooltipVisibility(event);
            this.regulateTranslateButtonVisibility(event);
        });
        document.addEventListener("dblclick", this.handleDblClick);
        this.initUIListeners();
    }
    initUIListeners() {
        this.translateButton = document.querySelector(".translate-button-mtz"), this.translateTooltip = document.querySelector(".translate-tooltip-mtz"), this.tooltipHeader = this.translateTooltip.querySelector(".header"), this.translatedText = this.translateTooltip.querySelector(".translated-text"), this.translateButton.addEventListener("mousedown", this.handleTranslateClick), this.tooltipHeader.addEventListener("click", this.handleHeaderClick), this.translatedText.addEventListener("click", this.handletranslatedTextClick)
    }
    handleTranslateClick() {
        this.speechLinks = {
            translatedLangLinks: [],
            titleLangLinks: []
        }; 
        this.speech200Texts = {
            translatedLangLinks: [],
            titleLangLinks: []
        };
        this.hideElement(this.translateButton); 
        this.selectedText = this.selectedFullObject.toString();
    
        if (this.selectedText) {
            this.selectedText = DOMPurify.sanitize(this.selectedText);
        }
    
        const textChunks = this.getTextChunks(this.selectedText);
        this.translateText(textChunks);
    }
    handleHeaderClick(event) {
        const targetElement = event.target;
        if (targetElement.classList.contains("support")) {
            this.sendMessage({
                "action": "openSupport"
            });
        }
        targetElement.classList.contains("settings") ? this.sendMessage({
            action: "openSettings"
        }) : targetElement.classList.contains("sound-translate") && this.speechNativeText();
    }
    speechNativeText() {
        this.areTranslatedSentences() ? this.speechSentences("translatedLangLinks") : this.speechWord(this.selectedText.trim(), this.translatedLang)
    }
    handletranslatedTextClick(event) {
        const clickedClassList = event.target.classList;
        const wordText = event.target.closest(".sound-anchor").querySelector(".word-text").textContent;
    
        if (clickedClassList.contains("sound")) {
            this.areTranslatedSentences() 
                ? this.speechSentences("titleLangLinks")
                : this.speechWord(wordText, this.storage.tl);
        }
        if (clickedClassList.contains("soundnative")) {
            this.speechNativeText();
        } else if (clickedClassList.contains("copy")) {
            if (clickedClassList.contains("copied")) return;
            const copiedText = this.translateTooltip.querySelector(".copied");
            copiedText && copiedText.classList.remove("copied");
            this.copyTextToClipboard(wordText);
            clickedClassList.add("copied");
        }
    }
    speechSentences(a) {
        const texts200 = this.speech200Texts[a];
        this.sendMessage({
            action: "sendRequestTry",
            texts: texts200
        });
    }
    speechWord(a, b) {
        const c = encodeURI(a);
        const texts200 = [[b, c]];
        this.sendMessage({
            action: "sendRequestTry",
            texts: texts200
        });
    }
    copyTextToClipboard(textToCopy) {
        const inputNode = document.createElement("input");
        inputNode.style.position = "fixed", inputNode.style.opacity = 0, inputNode.value = DOMPurify.sanitize(textToCopy);
        document.body.appendChild(inputNode);
        inputNode.select();
        document.execCommand("Copy");
        document.body.removeChild(inputNode)
    }
    
    regulateTooltipVisibility(event) {
        this.translateButton.classList.contains("translator-hidden") || this.hideElement(this.translateButton);
       this.translateTooltip.classList.contains("translator-hidden") || 
        event.target.closest(".translate-tooltip-mtz") || 
        (this.hideElement(this.translateTooltip), 
        this.translateTooltip.querySelector(".words").innerHTML = "",
        this.translateTooltip.querySelector(".sentences").innerHTML = "",
        this.audioElement.pause())
    }
    regulateTranslateButtonVisibility() {
        this.translateButton.classList.contains("translator-hidden") || this.hideElement(this.translateButton)
    }
    handleDblClick(event) {
        if (event.altKey) {
            this.speechLinks = {
                translatedLangLinks: [],
                titleLangLinks: []
            };
            this.speech200Texts = {
                translatedLangLinks: [],
                titleLangLinks: []
            };
            "double_click_false" === this.storage.double_click || !this.isSelection() || 
            this.isSelectedTextForbidden(event.target.tagName) || 
            (this.hideElement(this.translateButton), this.handleTranslateClick(event))
        }
    }
    handleSelection(event) {
        !this.isSelection() || this.isSelectedTextForbidden(event.target.tagName) || this.showTranslateButton()
    }
    isSelectedTextForbidden(tagName) {
        tagName = tagName.toLowerCase();
        const isForbidden = ["input", "textarea"].some(tag => tag === tagName);
        return isForbidden
    }
    isSelection() {
        this.selectedFullObject = window.getSelection();
        return !!this.selectedFullObject.toString().trim()
    }
    showTranslateButton() {
        this.setButtonPosition();
        this.showElement(this.translateButton)
    }
    setButtonPosition() {
        const { top: btnTop, left: btnLeft } = this.getTranslateButtonPosition(this.selectedFullObject);
        this.applyStylesToElement(this.translateButton, {
            top: btnTop + "px",
            left: btnLeft + "px"
        });
    }
    getTranslateButtonPosition() {
        const selectedRange = this.selectedFullObject.getRangeAt(0);
        this.selectBounding = selectedRange.getBoundingClientRect();
        let topPosition, leftPosition = this.selectBounding.left + this.selectBounding.width / 2 + window.scrollX - 25 / 2;
        return topPosition = this.selectBounding.top + this.selectBounding.height + 10 + 25 > window.innerHeight ? this.selectBounding.top - 10 - 25 + window.scrollY : this.selectBounding.top + this.selectBounding.height + 10 + window.scrollY, {
            top: topPosition,
            left: leftPosition
        }
    }
    showElement(element) {
        const elementClassList = element.classList;
        elementClassList.contains("translator-hidden") && elementClassList.remove("translator-hidden")
    }
    hideElement(element) {
        const elementClassList = element.classList;
        elementClassList.contains("translator-hidden") || elementClassList.add("translator-hidden")
    }
    applyStylesToElement(element, styleObject) {
        const styleKeys = Object.keys(styleObject);
        let styleString = "";
        styleKeys.forEach(key => styleString += `${key}: ${styleObject[key]};`), element.setAttribute("style", styleString)
    }
    getTextChunks(text) {
        const textArray = text.split(" "),
            chunks = [""];
        for (let chunk, i = 0, textLength = textArray.length, chunkIndex = 0; i < textLength; ++i) chunk = chunks[chunkIndex] + " " + textArray[i], chunk.length < 1e3 ? chunks[chunkIndex] = chunk.trim() : (++chunkIndex, chunks[chunkIndex] = textArray[i]);
        return chunks
    }
    translateText(inputText) {
        const requestTranslation = index => {
            $.ajax({
                url: "https://translate.googleapis.com/translate_a/single?dt=t&dt=bd&dt=qc&dt=rm&dt=ex",
                type: "GET",
                dataType: "json",
                headers: {
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
                },
                data: {
                    client: "gtx",
                    hl: this.storage.tl,
                    sl: "auto",
                    tl: this.storage.tl,
                    q: inputText[index],
                    dj: 1
                },
                success: response => {
                    this.showTranslatedChunk(response), 
                    currentRequest++, 
                    currentRequest < totalRequests && requestTranslation(currentRequest)
                },
                error: () => {}
            })
        },
        totalRequests = inputText.length;
        let currentRequest = 0;
        requestTranslation(currentRequest);
    }
    setElementInnerHTML(element, innerHTML) {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(innerHTML, `text/html`);
        const tags = parsed.getElementsByTagName(`body`);

        element.innerHTML = ``;
        for (const tag of tags) {
            tag.innerHTML = DOMPurify.sanitize(tag.innerHTML);
            element.appendChild(tag);
        }
    }
    showTranslatedChunk(data) {
        const isTextNotLong = this.selectedText.length < 30 && this.concatSentencesText(data.sentences).length < 25;
        if (this.translatedLang = data.src, this.setFlags(this.translatedLang), data.dict || isTextNotLong) {
            const wordsLayout = this.generateWordsLayout(data);
            const tooltipWords = this.translateTooltip.querySelector(".words");
            this.setElementInnerHTML(tooltipWords, wordsLayout);
        } else if (data.sentences) {
            this.renderSentences(data), this.createSentencesSpeechLinks(data.sentences);
        } else;
        this.setTooltipPosition(), this.showElement(this.translateTooltip)
    }
    renderSentences(data) {
        if (this.areTranslatedSentences()) {
            const translatedSentence = this.translateTooltip.querySelector(".translated-sentence");
            translatedSentence.textContent += this.concatSentencesText(data.sentences);
            const translit = this.translateTooltip.querySelector(".translit");
            if (!translit) return;
            const lastSentenceIndex = data.sentences.length - 1;
            translit.textContent += data.sentences[lastSentenceIndex].translit || data.sentences[lastSentenceIndex].src_translit
        } else {
            const sentences = this.translateTooltip.querySelector(".sentences");
            const sentencesLayout = this.generateSentencesLayout(data);
            this.setElementInnerHTML(sentences, sentencesLayout);
        }
    }
    setFlags(translatedLang) {
    }
    createSentencesSpeechLinks(sentences) {
        sentences.forEach(sentence => {
            sentence.translit || sentence.src_translit || (this.createSentenceParts(sentence.orig, this.translatedLang, "translatedLangLinks"), this.createSentenceParts(sentence.trans, this.storage.tl, "titleLangLinks"))
        });
    }
    createSentenceParts(text, translatedLang, linkKey) {
        let processedText = "";
        if (text.length > 200) {
            const textMatches = text.match(/.*?[\.\s]+?/g);
            for (let text = 0; text < textMatches.length; text++)
                if (processedText.length + textMatches[text].length < 200) {
                     processedText += textMatches[text];
                }
                else {
                    const textUrl = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${translatedLang}&q=${encodeURI(processedText)}`;
                    this.speechLinks[linkKey].push(textUrl);
                    this.speech200Texts[linkKey].push([translatedLang, encodeURI(processedText)]);
                    processedText = "";
                }
                if (processedText.length) {
                    this.speechLinks[linkKey].push(`https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${translatedLang}&q=${encodeURI(processedText)}`);
                    this.speech200Texts[linkKey].push([translatedLang, encodeURI(processedText)]);
                }
        } else {
            this.speechLinks[linkKey].push(`https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${translatedLang}&q=${encodeURI(text)}`);
            this.speech200Texts[linkKey].push([translatedLang, encodeURI(text)]);
        }
    }
    generateWordsLayout(wordData) {
        const layoutContent = `
            <div class="main-source-word sound-anchor">
                <div class="ananas">
                    <span class="main-word translator-bold word-text">${DOMPurify.sanitize(capitalizeWord(this.selectedText))}</span>
                </div>
                <div class="translator-buttons">
                    <span class="copy"></span>
                    <span class="soundnative"></span>
                </div>
            </div>
            <div class="main-translate-word sound-anchor">
                <div class="ananas">
                    <span class="main-word translator-bold word-text">${DOMPurify.sanitize(capitalizeWord(wordData.sentences[0].trans))}</span>
                </div>
                <div class="translator-buttons">
                    <span class="copy"></span>
                    <span class="sound"></span>
                </div>
            </div>
            ${this.checkForTranslit(wordData.sentences)}
            <div class="translated-categories">${this.generateWordCategoriesLayout(wordData.dict)}</div>
        `;
        return layoutContent
    }
    checkForTranslit(sentencesData) {
        let translit, hasTranslit = false;
        sentencesData.forEach(sentence => {
            sentence.hasOwnProperty("translit") && (hasTranslit = true, translit = sentence.translit), sentence.hasOwnProperty("src_translit") && (hasTranslit = true, translit = sentence.src_translit)
        });
        return ""
    }
    generateSentencesLayout(sentenceData) {
        const layoutContent = `
            <div class="translated-sentence-wrapper sound-anchor">
                <div class="translated-sentence word-text">${this.concatSentencesText(sentenceData.sentences)}</div>
                <div class="translator-buttons">
                    <span class="copy"></span>
                    <span class="sound"></span>
                </div>
            </div>
            ${this.checkForTranslit(sentenceData.sentences)}
        `;
        return layoutContent
    }
    concatSentencesText(sentences) {
        let sentenceTranslation = "";
        sentences.forEach(sentence => {
            sentence.hasOwnProperty("translit") || sentence.hasOwnProperty("src_translit") || (sentenceTranslation += sentence.trans)
        });
        return sentenceTranslation ? sentenceTranslation : ""
    }
    setTooltipPosition() {
        let horizontalPosition, verticalPosition;
        const tooltipHeight = 340;
        horizontalPosition = window.scrollX + this.selectBounding.left + this.selectBounding.width / 2 - 150, 0 > horizontalPosition && (horizontalPosition = 0), verticalPosition = window.scrollY + this.selectBounding.top + 30, verticalPosition > document.body.clientHeight - tooltipHeight && (verticalPosition = window.scrollY + this.selectBounding.top - tooltipHeight - 30);
        const tooltipStyles = {
            left: horizontalPosition + "px",
            top: verticalPosition + "px"
        };
        this.applyStylesToElement(this.translateTooltip, tooltipStyles)
    }
    generateWordCategoriesLayout(wordCategories) {
        let categoryLayout = "";
        if (wordCategories == undefined || wordCategories == null) {
            return "";
        }
        wordCategories.forEach(categoryData => {
            let categoryHeader = `<h2 class="word-category">${DOMPurify.sanitize(capitalizeWord(categoryData.pos))}</h2>`,
                categoryEntries = "";
            categoryData.entry.forEach(entryData => {
                let reverseTranslation = entryData.reverse_translation;
                3 < reverseTranslation.length && (reverseTranslation = reverseTranslation.slice(3));
                let entryLayout = `
                    <div class="translated-word">
                        <span class="translator-bold word-text">${DOMPurify.sanitize(entryData.word)}</span>
                        <div class="translator-buttons">
                            <span class="copy"></span>
                            <span class="sound"></span>
                        </div>
                    </div>
                    <span class="reverse-translates"> ${DOMPurify.sanitize(reverseTranslation.join(", "))} </span>`;
                categoryEntries += `<div class="translates sound-anchor">${entryLayout}</div>`
            }), categoryLayout += `
                <div class="translated-category">
                    ${categoryHeader+categoryEntries}
                </div>`
        });
        return categoryLayout;
    }
    sendMessage(message, callback = () => {}) {
        browser.runtime.sendMessage(message, callback)
    }
    areTranslatedSentences() {
        return !!this.translateTooltip.querySelector(".translated-sentence-wrapper")
    }
}
const content = new Content;