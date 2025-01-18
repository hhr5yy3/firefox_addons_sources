var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var iconv;
var SSS;
(function (SSS_1) {
    const DEBUG = false;
    if (DEBUG) {
        var log = console.log;
    }
    class SearchEngine {
    }
    SSS_1.SearchEngine = SearchEngine;
    class SearchEngine_SSS extends SearchEngine {
    }
    SSS_1.SearchEngine_SSS = SearchEngine_SSS;
    class SearchEngine_SSS_Copy extends SearchEngine_SSS {
    }
    SSS_1.SearchEngine_SSS_Copy = SearchEngine_SSS_Copy;
    class SearchEngine_NonSSS extends SearchEngine {
    }
    SSS_1.SearchEngine_NonSSS = SearchEngine_NonSSS;
    class SearchEngine_Custom extends SearchEngine_NonSSS {
    }
    SSS_1.SearchEngine_Custom = SearchEngine_Custom;
    class SearchEngine_BrowserSearchApi extends SearchEngine_NonSSS {
    }
    SSS_1.SearchEngine_BrowserSearchApi = SearchEngine_BrowserSearchApi;
    class SearchEngine_Group extends SearchEngine_NonSSS {
    }
    SSS_1.SearchEngine_Group = SearchEngine_Group;
    class Settings {
    }
    SSS_1.Settings = Settings;
    class ActivationSettings {
    }
    SSS_1.ActivationSettings = ActivationSettings;
    class ContentScriptSettings {
    }
    SSS_1.ContentScriptSettings = ContentScriptSettings;
    class SSSIconDefinition {
        constructor() {
            this.isInteractive = true;
        }
    }
    SSS_1.SSSIconDefinition = SSSIconDefinition;
    class SSS {
    }
    const sssIcons = {
        copyToClipboard: {
            name: "Copy to clipboard",
            description: "[SSS] Adds a \"Copy selection to clipboard\" icon to the popup.",
            iconPath: "res/sss-engine-icons/copy.png",
            isInteractive: true,
        },
        openAsLink: {
            name: "Open as link",
            description: "[SSS] Adds an \"Open selection as link\" icon to the popup.",
            iconPath: "res/sss-engine-icons/open-link.png",
            isInteractive: true,
        },
        separator: {
            name: "Separator",
            description: "[SSS] Adds a separator.",
            iconPath: "res/sss-engine-icons/separator.png",
            isInteractive: false,
        }
    };
    let uniqueIdToEngineDictionary = {};
    const defaultSettings = {
        useDarkModeInOptionsPage: false,
        searchEngineIconsSource: "favicon-kit",
        popupOpenBehaviour: "auto",
        middleMouseSelectionClickMargin: 14,
        popupLocation: "cursor",
        popupDelay: 0,
        minSelectedCharacters: 0,
        maxSelectedCharacters: 0,
        allowPopupOnEditableFields: false,
        hidePopupOnPageScroll: true,
        hidePopupOnRightClick: true,
        hidePopupOnSearch: true,
        useEngineShortcutWithoutPopup: false,
        mouseLeftButtonBehaviour: "this-tab",
        mouseRightButtonBehaviour: "this-tab",
        mouseMiddleButtonBehaviour: "new-bg-tab-next",
        shortcutBehaviour: "new-bg-tab-next",
        popupAnimationDuration: 100,
        autoCopyToClipboard: "off",
        websiteBlocklist: "",
        showSelectionTextField: true,
        selectionTextFieldLocation: "top",
        useSingleRow: true,
        nPopupIconsPerRow: 4,
        iconAlignmentInGrid: "middle",
        popupItemSize: 24,
        popupSeparatorWidth: 60,
        popupItemPadding: 2,
        popupItemVerticalPadding: 1,
        popupItemHoverBehaviour: "highlight-and-move",
        popupItemBorderRadius: 0,
        popupBackgroundColor: "#FFFFFF",
        popupHighlightColor: "#3399FF",
        popupPaddingX: 3,
        popupPaddingY: 1,
        popupOffsetX: 0,
        popupOffsetY: 0,
        popupBorderRadius: 4,
        useCustomPopupCSS: false,
        customPopupCSS: "",
        enableEnginesInContextMenu: true,
        contextMenuItemBehaviour: "new-tab-next",
        contextMenuItemRightButtonBehaviour: "new-tab-next",
        contextMenuItemMiddleButtonBehaviour: "new-bg-tab-next",
        contextMenuString: "Search for “%s”",
        searchEngines: [
            createDefaultEngine({
                type: "sss",
                id: "copyToClipboard",
                isPlainText: false,
            }),
            createDefaultEngine({
                type: "sss",
                id: "openAsLink",
            }),
            createDefaultEngine({
                type: "sss",
                id: "separator",
            }),
            createDefaultEngine({
                name: "Google",
                searchUrl: "https://www.google.com/search?q={searchTerms}",
                iconUrl: "https://www.google.com/favicon.ico",
            }),
            createDefaultEngine({
                name: "Bing",
                searchUrl: "https://www.bing.com/search?q={searchTerms}",
                iconUrl: "https://www.bing.com/sa/simg/favicon-2x.ico",
                isEnabled: false,
            }),
            createDefaultEngine({
                name: "DuckDuckGo",
                searchUrl: "https://duckduckgo.com/?q={searchTerms}",
                iconUrl: "https://duckduckgo.com/favicon.ico",
            }),
            createDefaultEngine({
                name: "Yandex.ru",
                searchUrl: "https://yandex.ru/search/?text={searchTerms}",
                iconUrl: "https://yastatic.net/iconostasis/_/8lFaTHLDzmsEZz-5XaQg9iTWZGE.png",
                isEnabled: false,
            }),
            createDefaultEngine({
                name: "Baidu",
                searchUrl: "https://www.baidu.com/s?wd={searchTerms}",
                iconUrl: "https://www.baidu.com/favicon.ico",
                isEnabled: false,
            }),
            createDefaultEngine({
                name: "YouTube",
                searchUrl: "https://www.youtube.com/results?search_query={searchTerms}",
                iconUrl: "https://www.youtube.com/yts/img/favicon_144-vfliLAfaB.png",
            }),
            createDefaultEngine({
                name: "IMDB",
                searchUrl: "https://www.imdb.com/find?s=all&q={searchTerms}",
                iconUrl: "https://www.imdb.com/favicon.ico",
            }),
            createDefaultEngine({
                name: "Wikipedia (en)",
                searchUrl: "https://en.wikipedia.org/wiki/Special:Search?search={searchTerms}",
                iconUrl: "https://www.wikipedia.org/favicon.ico",
            }),
            createDefaultEngine({
                name: "Amazon.com",
                searchUrl: "https://www.amazon.com/s?url=search-alias%3Daps&field-keywords={searchTerms}",
                iconUrl: "https://www.amazon.com/favicon.ico",
            }),
            createDefaultEngine({
                name: "eBay.com",
                searchUrl: "https://www.ebay.com/sch/{searchTerms}",
                iconUrl: "https://www.ebay.com/favicon.ico",
            }),
            createDefaultEngine({
                name: "Translate to EN",
                searchUrl: "https://translate.google.com/?sl=auto&tl=en&op=translate&text={searchTerms}",
                iconUrl: "https://translate.google.com/favicon.ico",
            }),
            createDefaultEngine({
                name: "Google Maps",
                searchUrl: "https://www.google.com/maps/search/{searchTerms}",
                iconUrl: "https://www.google.com/images/branding/product/ico/maps15_bnuw3a_32dp.ico",
                isEnabled: false,
            }),
            createDefaultEngine({
                name: "Steam",
                searchUrl: "https://store.steampowered.com/search/?term={searchTerms}",
                iconUrl: "https://store.steampowered.com/favicon.ico",
                isEnabled: false,
            }),
            createDefaultEngine({
                name: "(Example) Search current site on Google",
                searchUrl: "https://www.google.com/search?q={searchTerms} site:{hostname}",
                iconUrl: "https://www.google.com/favicon.ico",
                isEnabled: false,
            }),
        ],
        searchEnginesCache: {
            "https://www.google.com/favicon.ico": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEHklEQVRYhb2WXWwUVRTH56XBotQn33wQBXlTov3gQWtErKB9IGkptPYBxYox6INRa0LQQELRYqEJ8NAPLMQ0bCuBVqzQZhGpH91YJGYJaYMW0O1XZnb6xc7u7Nxz9u+D203vzGx3tlZPcl723j2///m4d66ieDRd1/OIqIqIWolokJl1ZraSHiaiweRapa7reV7jZjTTNNcRURszx+DRmDlKRCdN01y7ZDCAlUKIBmYmr2AXIUIIcTgUCuVmm/XjzHxzqWAXIUHTNNd4gluW9RQza26BaHwURvsXmHn/bYS3bYZasgHqi0UIl5Vg+r23YJxuBo3+lU6ECmC9l8wdcJoYw+z+j6BuKoT6QsHivqkQs598CJoYcxWRthKTk5P3u5U91tcD7ZXizGCba6XPwbzS59oO15kQQjTYNxtnTmUNXuhz9ftd2yGEqLeXfp192mN9PWkDT9VUItJyDLFvziHWcx6RluOYerNKhh+pAxKJdPMgpFYQUZvU8/FRaC8/6wDr1VsRvxZwDQoA8cEBhHeU4t7xz9PuSTGIWhVFURQAD9ovmUjjOw749J7XkJibyxg4YUQy7gEAZjY0TVulEFGVFCA6AtG7ArO1j6Tg4W2bwTNTngJnY0S0XSGiVknZnToIfw6EPwfGsYegbclH7NKFZYcnBTQpRDQo/fhrSUqA8Ocgfm41IMR/JSCgMLO+8EfR/7AkgG5ULhpk48GIZ79yU06EmVWFmS1JwOUVkgD+Y9+yCWj/SUKBmeP/q4C2q3FXAWFJgL0FwR3LJqAz4KiA6hzC6y9JAkb7n4DF2Q/hbZUdAq4OyXGIKOByDD9NwS/0rMYzvq3oGvFnLcA3YDkETMzIV/P8MZTGPBG9g6g/F3VdTyPfV4Z8XxlKul5HODbtGX4vlkB5oyHBdzZFHfuIqELRdT2PmaXVowMHUvB5r+79ADPxzFexRUDtmZgj+w5n/w0AD8x/jE4uXByPqCg++6pDROnXu9E/di0t/Nb0Xezq9mHjwVkJXt5oIBp3lL954ed4LbM8aRfv9jsEzHv5t++i4XobOm9dxFe/X8KJYDve8O9Fga8c+b4yFJ2qxfOfhVICfhiW37XMbJmm+Zj9QXLYntGXw91pRWTygvadKD7yi+PsA4AQ4pDjRQRgJTPfsG/u/fNHFJ+tzlpAUUcFWoLdDjgz/wbgvnSP0jXJ16tkE4aGvT8fRWFHuSf47u8+xtDUiBt8EsCjrvAFlVjvJgL4ZzhPD53Hnu8PYEt3DTZ0VqCoowIlXbtQc3kfTgTbMTx12+2vYOZJy7KeXBRuq0TQNdISLFn2xTO3WygUyhVC1NtPR5ZgSwhxCOl67rUaRNSavDi8gg0ianYctX9jmqatIqLtRNRERAFmVpk5nnSViALJtQrM33Ae7G92y3s6IRzKLQAAAABJRU5ErkJggg==",
            "https://duckduckgo.com/favicon.ico": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFnklEQVRYhcVXb0wTZxzmEyZsbovJnG7xw0j2wZm55K4jWzQh0wwkZFsMgetVMhVB0Bm3ocEMo2MoEZcwkzlYLIHJUIGJdraoiAwq2yRz0TEcTgz3p73SUQo97or0P88+dDutvXqd27I3edP70N/7/N7n97y/PykpSS5U5adyhoxshibqOYrsZyjdKEMR3ujWjXIU2c/QRD1nyMhGVX5qsudqrpFNK5ZwFNnA0DqJ1ZNwVBbC3VwL0dQE2WqGbDVDNDXB3VwLR2UhWD0JhtZJHEU2jGxaseSRgZGTs4AvIKs5mpi178iF1N2O0LQLwQkBcp8Jnk4j3I01cDfWwNNphNxnQnBCQGjaBam7HfYdueBoYpYvIKuRk7PgEW5NDPJFmZixtCLslSCaWyDsLgCrJx+6hd0FEM0tCHslzFhawW3OBEcRg0mzwdLESobWCUJ5HoJOG+SBLti2rdMEfnDbtq2DPNCFoNMGoTwPDK0ThA3kS5o3Z2id4KwuRVgS4TYeBKsnMb6/CFJ3B6Tes5g++RnsO99O2hG38SDCkghndSkYWickZAI5OQs4ihgUyvOiBjXblUM8HV8gLHlw//L9dgNCeV5STjhrtiMsiRDK88BRxKCqJvgCspovykTQaVNurtBZlg1bWTZcR/fCPzaiOBGWRbiNB8AXr9FmorEGQacNfFEm+AKyOl50NDE7Y2mFfMUSZ8xveR13b3yHRCvsnYHz4xJNJ+SBrqgwaWI2JhQcRTbYd+Qi7JVUBecf+zUhuOKEOAW+9A1NYYa9UvSJUmRDNPZV+akMrZOk7naI547HGU0cqQAAcOMeXP2Zx5w/FAd+i3HhwsBtOCwdmiyI5hZI3e1gaJ2EqvzUFM6Qkc3qSYSmXarvfOZiGwDg+ohDk4VIwAe+ZK1mnghNu8DqSXCGjOwUhibqHZWFCE4Iqgaz1/oVgEAwDFH2qYK3fHMdg0M2uI7u1WQhOCHAUVkIhibqUziK7Hc3H4bcZ1IXjtWigBTv68T6nV/BF4gPQ/4HJ/BJkxVSz2ltMfaZ4G6uBUeR/SkMpRsVTU3wdBpV/+w506iAtJ0fwv6jPaoMzM9Hf2Xrn6/IQMJZsRyexmWY+fI5jO968d6ZnUaIpiYwlG40haEIr2w1w91Yo+rARN1uzdhjfg7w3QS8vZjrN2D2zGKEf3ockeE0RIbTEPzhCTgrlsfkBNlqBkMRXk0HbO/mPgTYj3nnLkRuPqmAKfuXNNw1Pw3XgRfAbohPSrLVDIbWyZohYPVkXBpW8IWSKNjQY5BOLYW3YwnktqWYqkuHbevLCc+LCUFUhLUJRcjqyYRZcF4oRmQ4Db5LizSFl1iEGs+Q1ZPwnD6mHoKwiLnL6YgMp2HWtBhTdelwH07H1KfPY6blWfguLULo2kLYy1Y+5BlqJCJWT+L3w+8llIH9/fWwl67EVF06vJ3PIDDwFELXFsLXswieY8tgL40Fj0tEManY3KLqAF+yNqEDQgX1t+iPS8XJFCNWTyI4Oa7qwOTn+5IGVy1GceV4oEvV2HtVPQE9WL5vF+rA0AnEl6gcazUkrJ7EVOsRAAAj3cJ57hQm56KMRO56wRa+ijFahxOHVmN7dxa697wWZ+82HkTQaQO3WaUh0WrJWD2J8Y+2AACuOLpQ0puFrd9m49CPu7CzLx9ll9Zh79drUNKbhZLeLLTXrI6xTaoli2lKD8Q2payeBPfOKsxHwrjq7FGADJYs5bu49953a+3qmJsn1ZT+teLa8isWRZgB/g6G3IMK0Mbzb8LQlYWii2+h7dRGVJ2MsnC6etWjteUxonxwMDl3HN7By3DNjWPP94W4wLfDH55TxBhwcGDpV8B8SMFj+QeDyf2aUBvNQqIbfv4O/PwoAvYxBOxj8POj8PN3EJp0/jujWTwb/8NwGsfIfzSe/wEDn3UUirFnMwAAAABJRU5ErkJggg==",
            "https://www.youtube.com/yts/img/favicon_144-vfliLAfaB.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAA0klEQVRoge2YwQ2EIBREfwmUYCmWYCmWsB1YgqVQEiXMXiDxgCskCEx2XjJHdR75UcFMCCGEqABmDmYrzD4x/hIU5npNus8KM9eyaGmZLqkpXrOSveOfyh8TlHzKQTM2VeMEs210sYpsOYEwQbHSBNrxSZHA6LwnAAAhkAsk9p1cIOEcuUCCXgAAzpNcILEsEtAIVQu0ekZ3AdrXKO2HjPpXolMkMDo5AfotJfemnmmMsuWjAPfBVpTwE5S8i/9ZfuZxKi5eKPfK8XrTkkIIIf6CLwP44M2GNwfzAAAAAElFTkSuQmCC",
            "https://www.imdb.com/favicon.ico": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAE20lEQVRogdWVyW+TVxTFL0hGLKh1LVVCCtgk7226qdRFV911A5VA6qJAQklLNyUQoFIRkxgKAcQkiELiKAlx4ozEGezEsePY2NgJBAJpQqJMTQhVW3VUp3/hdFH5q5/fF7LtW/wWPu/e8875ZH+mZz0Mk6HxbsbfS9JIxrsZ9DTA+OsbaSRPAwx60sX4c0EayZMuBo11Mv6Yk0Yy1smgxx2M32elkTzuYNBoO+O3GWkko+0MGmlj/DotjWSkjUEjLYxfpqSRjLQwKONn/DwpjSTjZ1C6mfHThDSSdDOD0k2MH59LI0k3MSjlY/wwLo0k5WNQspHx/VNpJMlGBj1oYHw3Jo3kQQOD4vWMbx9JI4nXM2i4jvFqVFpMRoogPA6L/R868WpUwluxWdFzz16NSu1MeByr6sLjwBefuZBo91j7+f7eis1KLjuG6xg0XMtYyUiLRKsHRGRR5HZgJSNx7IBL0YkIGxzrsJKRmE8I7YyIsJKRtnouxw64bP2z+usYrmVQzMt4mZYW8Ra9wMu0fQEist3JPVurQHbOrkDW++twkZIxS8zLoKEaxnJKWgz79QLLKYmjn9oXGPZ7Vj1bTukFllMSGxzr1vR49+2NypzzjfVKzuWUxFANg4aqGUtJaRFr1gssJSWOfmIf8u6Fzdj5/ibbs6WkXmApKVHkdiharNmzqn8uXx17U8k6VM2gyF3GYkJaRH15BbY6sJiQOFKqXuDctB5EhCOlLhRtdShalsWEXmAxIa35LFGfR/Mv2eVEyS6noh0pdSlZI3cZNFjFWIhLi2ijXmAhLlGed0E2RG6Y/GALcb3AQtymQKNH8y8vddlquVkHqxgUrmTMx6RFpEEtULjVgfmYRPl+1ax4579PJ/d7mtWyzMf0AvMxicK8ApEGj+Zfvt9lq+VmDVcyaOAOYy4qLQbr9QJzUYnDH6tm+Z/ttLmoXmAuqhcYrPfY+ttpuVkH7jCo/zZjNiIswnVutcAWB2YjAof3qWb+6wXabyJ/Zjai/z/MRgQKt6gFwnVubffwPpetlpu1/zaDQrcYM2Fh0V+rF5gJCxwqUc3s5vJnZsJ6gZmwXqC/1q3tHipx2Wq5WUO3GBS8yZgeEBb9Xj3Y9IBAWZ7Z9IAabs8HzjVnsppWwOvWdstKXLZabtbgTQb13WC8CAmLUI1e4EVIoKxYNXsRUsOVFbvWnMlq+a/bUI1b27XzKyt2KVn7bjCo9zpjKigsgtVqgW0FDkwFBQ7uVc2mggLbCv57ksFqt+1MfoH88ESETGuhtrt7hxO7d6hvtYN7XUrW3usM6rnGmOwVFn1VeoHJXoGDe9QLJnvVAn1VbtuZ/LB22Pnbca+iQMnac41BgauMiW5h0VOpF5joFvh8t3pBvrbazOsCvfPWRqSaCm13P9ruVP5jtr+3Sck50S0QuMqgwBXG84D439Jd6UbSV2h7FrjCoK7LjGddwki6LjPofgVjvFMYyf0KBnVeYjxpF0bSeYlBHRcZY23CSDouMqj9AuNxizCS9gsMajvPeOQXRtJ2nkGt5xijTcJIWs8xqOUsY8QnjKTlLIP8Zxjpe8JI/GcY1Hya8bBeGEnzaQY1nWKk6oSRNJ1ikO8kI1krjMR3kkGNJxgPvMJIGk8wqOE4I14tjKThOIPqv2SYzD/ZLZPkdY1wuAAAAABJRU5ErkJggg==",
            "https://www.wikipedia.org/favicon.ico": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADH0lEQVRoge1Z7Y3sIAwkVdAGXdACHaQDWkgFFJEKUgIl0AJV4PdrIuAIOMmusnvvTrJ00jrB4xl/oAjR+Usp0SdYL8aPDfoSmKeDuwXi6aBugXg6mNsgng7k/wbwdBC3QTwdwB+ApwP4A4B/tNaklCKlFGmtyRhTWP67tZZSSmx/7z2t63roD9/Re+FnjPkJwHtP1lpSStE0TU2TUtKyLOS9p5QSbdtG8zwXPkIIEkLQNE00zzOt60opJQohkHOOtNY//LXW5JyjEMLhe/Pz4deUUIyRrLV7EPnDMcYmjeu6kpSyeGZZlqZvCKFIknPuUB7Lsux+Wuvm+c0aiDGSMaYAkNPWMmttwQDk0Hu3tfYwKUgMkpdnnVXE27YVWVVKdQ/z3heZPWLMe09SSlJKHQYFc86REOKQzS6AGCPN87xnVAhB27axWOjJY1kWEkLstdE7H0WLmjsFoNa2EIKUUt1DoW+wVrOA7B/puVZAT4osAMhCzkIvGy0WcvrRWTjZN8aQlHLI+nCQOeeKgLTWQxaklHtBgwXvPasZgCmu7xBAjHGXBWxUfHUPt9ayM4o64TDFApDLAgBGmQELeS1gsHEShi7FiY0FIJcFbFSExphisPV6eUuyvQF3GgACygGMshlCKNaF3iTPDdnn+J4CgBbIWS2OQI9a4rquw8F1GUBKaZ+0kMbooLqYR9NXa81m6hKAbdsKWfQKLZcQhwXvPQkhWIV+GQA0msvoqNggHyxk+RxpsQB/TqHfAoAFC9YabBhEyCY60pH0wBZncN0GkLOA7lIPnFrLdUeqawG1cjb7lwFgo2zdFdBJamnVHQm/Y3CNVpSXAsChkIWUcl/ysALXnQSyyjtSjHFfG0ZL4ksBpJSKayd6N6Zoa4fB/aJmARf4q3FcBhBCKIpZSjnc9fM2jC7Gudy8BUDr3jxNU3fbxDM58DNrw0sBtHTNGUL1XOAubW8BgBsb5MDZ9XPmuBvq2wAgo5y7a24o9jPPvA1ACIGstafaIDrS1db5UgBP21d/pfkd38h+BYBvBNH6WP81IJrBfwuIbvCfCqYX4z8UwrBWOPp89wAAAABJRU5ErkJggg==",
            "https://www.amazon.com/favicon.ico": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEq0lEQVRogc1aQWvjRhQWWPoFPq6V00LZQ8HJrZcUEvu0lwSkubfQ5J6Cf8Cy9XkXKws9hQiKfVh3nb000Mop5BTvmN1LqNVC20MjqGGxkbuFzWG/HsbjleSZsSXHdh884jh60vfNfO/NG2U0TWAAHgI4AfAa6zcK4FsAZRHWJPBPAVytF6/SLgHcl4F/CGC0ZoDz2BDA50nwRQD/LnJX3/dRcxzYhMAmBDldh24Y0A0Du+UybEJQcxxQSu+KxCccfA4LaN05PkZxcxO6YSA3dl3gucjP4uYmWmdni5K45ASsLNG+70+A6wLgMiJRt2wbYRguQmJHA9DIAv6eaaYCK5uRUrmM0Shz6j3TALxNExEEAQobG6kBx8DrekxuNcfJSuB3LW1EpVJZCLzI75lmVgLvUxEIgkCdoLo+SVBKKSilqDkOChG5yTxrdUpF4PT0VEmgUqkI43zfF5KI5k5WGaUiYBEiBJEzDBRMU5mMlUpFmewrIVA7PpYCODg8VMc6jrJqyWbvTglwG41GMY3XHAe+7ytj2u22sqTahKyOQBajlMZWY570nMT/hoDv+7GZsca9UXTVFvnaCARBANd1Ydl29oVtHQTCMBQuaqpmTlWFVkqAUhrrheYhMYuYZdurISCrJqrRtQjBbqmkvH4lBIIgQME0hXJIVhTP82ILW7fbVc7MSiQka+Q4iIJpwvM8YWy3211vFQrDcDLyMrm4riuNrzmOdNOzkirUOjtTJm1hRkscJSAaAGvZBKK9TBYJzNpHLH0Gvjo4UI/gjCqy9pXYHrfSye0g91K5LI190WrNXI11w8DNzc3yCHxTrSofnjPEu6owDGfuyPhgPK5Wl0dgVg7wMholQSmdks6sliLt1nJuAr7vzyUDTkRWLkXfR724tbUcAgBib+BkMkjjopi0byhSEfA8by7wMpm4rovi1pb0ut1SKfWbutTNXDKZZT1RFFzBNPGi1QIgl+LB4WGm14yZ2mnXdZWVJUrKIgRBEMTik2U164Y+MwGAbexd14VFyGRvwFsKmxA8rlbR6/Wk8e12GzYhyv4Jf3eY9zvAP+I1Ik5g2AP+/D4ToTuz/ivg8kugrjFvjL2uMXwJixMY9NjF7T3gXfpVcWEb9BjQi33g8gvg+gnQOfpIpv9qKmRaQn/9CDTzjMjVkXTqVmoX+4zAu2DqT+IcGPYYCc58lURuQzbyzTybBYB9buaFl8uTeNADzrcnJD7Ux9L6o8kectd281NcLg2NPYvLqvO1KOq9BqAvveltyG7KkyiaVBd7wPVToS7nskGPAbw6App5NkD8/s08IwQAv56w78QK+E0D8N3Mh/G8qGvxGWlEHvryASP15hEjdv0k4U+ZJNp7QCMRH/3c3otr/WKfxYvtmQZgf64Ruw0ZiOf5j7MQ9boATOLvH5KzGL325QNxCVfn3g7/T+X8PSxPsuf5acB1BeDkddzPt7OuPV7yiMEw9S144jXzUzMxBT76+/k2GwTBwjSn9ZE8cgBgB4scNRj8wnKF671zxPT8epwT/glL+MUr2FsAn8nOS9wH8POiT1ii/QBgY55TK2WwIy4U6z0AMhxjqCF5wGNs/wEm1A75lp2QYwAAAABJRU5ErkJggg==",
            "https://www.ebay.com/favicon.ico": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuElEQVQ4jWNgwAKuX7+uFhgYuJaPj+8DHx/fh8DAwLXXr19Xw6YWq2YxMbEX7e3t5e/eveN/9+4df3t7e7mYmNgLogwJDAxc297eXo4u3t7eXh4YGLiWoAF8fHwftm/f7o4uvnXrVg8+Pr4PWDU9NbL4D8MMKZdQ8Nf1TP+/rmf6/2UdhG7bIQ7HJBkAw6MGjBqA04BnHj6PSTVg0n79x3ADvh875QwzhBgDJu3Xf3zn9QFHBgYGBgBTkbt/nS2hPQAAAABJRU5ErkJggg==",
            "https://translate.google.com/favicon.ico": "data:image/png;base64,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",
        }
    };
    if (DEBUG) {
        log("Startup time is: " + new Date().toLocaleString());
    }
    let isFirstLoad = true;
    let browserVersion = 0;
    const sss = new SSS();
    browser.runtime.onInstalled.addListener(details => {
        if (details.reason == "install") {
            browser.tabs.create({ url: "/res/msg-pages/sss-intro.html" });
        }
    });
    browser.runtime.getBrowserInfo().then(browserInfo => {
        browserVersion = parseInt(browserInfo.version.split(".")[0]);
        if (DEBUG) {
            log("Firefox is version " + browserVersion);
        }
        browser.runtime.onMessage.addListener(onContentScriptMessage);
        browser.storage.onChanged.addListener(onSettingsChanged);
        browser.storage.local.get().then(onSettingsAcquired, getErrorHandler("Error getting settings for setup."));
    });
    function onSettingsAcquired(settings) {
        let doSaveSettings = false;
        if (settings === undefined || isObjectEmpty(settings)) {
            if (DEBUG) {
                log("Empty settings! Using defaults.");
            }
            settings = defaultSettings;
            doSaveSettings = true;
        }
        else if (isFirstLoad) {
            doSaveSettings = runBackwardsCompatibilityUpdates(settings);
        }
        if (doSaveSettings) {
            browser.storage.local.set(settings);
            return;
        }
        uniqueIdToEngineDictionary = {};
        for (const engine of settings.searchEngines) {
            uniqueIdToEngineDictionary[engine.uniqueId] = engine;
        }
        sss.settings = settings;
        sss.activationSettingsForContentScript = getActivationSettingsForContentScript(settings);
        sss.settingsForContentScript = getPopupSettingsForContentScript(settings);
        sss.blockedWebsitesCache = buildBlockedWebsitesCache(settings.websiteBlocklist);
        if (isFirstLoad) {
            if (DEBUG) {
                log("loading ", settings);
            }
        }
        setup_ContextMenu();
        setup_Commands();
        setup_Popup();
        if (isFirstLoad) {
            if (DEBUG) {
                log("Swift Selection Search has started!");
            }
            isFirstLoad = false;
        }
    }
    function getActivationSettingsForContentScript(settings) {
        const activationSettings = new ActivationSettings();
        activationSettings.useEngineShortcutWithoutPopup = settings.useEngineShortcutWithoutPopup;
        activationSettings.popupLocation = settings.popupLocation;
        activationSettings.popupOpenBehaviour = settings.popupOpenBehaviour;
        activationSettings.middleMouseSelectionClickMargin = settings.middleMouseSelectionClickMargin;
        activationSettings.popupDelay = settings.popupDelay;
        activationSettings.browserVersion = browserVersion;
        return activationSettings;
    }
    function getPopupSettingsForContentScript(settings) {
        const contentScriptSettings = new ContentScriptSettings();
        contentScriptSettings.settings = Object.assign({}, settings);
        contentScriptSettings.settings.searchEngines = settings.searchEngines.filter(engine => engine.isEnabled);
        contentScriptSettings.settings.searchEnginesCache = {};
        contentScriptSettings.sssIcons = sssIcons;
        for (const engine of contentScriptSettings.settings.searchEngines) {
            if (engine.type !== "sss") {
                const iconCache = settings.searchEnginesCache[engine.iconUrl];
                if (iconCache) {
                    contentScriptSettings.settings.searchEnginesCache[engine.iconUrl] = iconCache;
                }
            }
        }
        return contentScriptSettings;
    }
    function buildBlockedWebsitesCache(websitesBlocklistText) {
        websitesBlocklistText = websitesBlocklistText.trim();
        const websites = websitesBlocklistText.split("\n");
        const websiteRegexes = [];
        for (let i = 0; i < websites.length; i++) {
            const website = websites[i].trim();
            if (website.length == 0)
                continue;
            let regexStr;
            if (website.startsWith("/") && website.endsWith("/")) {
                regexStr = website.substr(1, website.length - 2);
            }
            else if (website.includes("*")) {
                regexStr = escapeRegexString(website);
                regexStr = "^" + regexStr.replace("\\*", "(.*?)");
            }
            else {
                regexStr = "^" + escapeRegexString(website);
            }
            try {
                const regex = new RegExp(regexStr);
                websiteRegexes.push(regex);
            }
            catch (e) {
                console.warn("[WARNING] [Swift Selection Search]\nRegex parse error in \"Website blocklist\". Problematic regex is:\n\n\t" + website + "\n\n" + e);
            }
        }
        return websiteRegexes;
    }
    function escapeRegexString(str) {
        return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    }
    function runBackwardsCompatibilityUpdates(settings) {
        let shouldSave = false;
        if (createSettingIfNonExistent(settings, "popupItemVerticalPadding"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "allowPopupOnEditableFields"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "popupBorderRadius"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "popupItemBorderRadius"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "minSelectedCharacters"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "middleMouseSelectionClickMargin"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "hidePopupOnRightClick"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "popupSeparatorWidth"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "iconAlignmentInGrid"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "popupDelay"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "maxSelectedCharacters"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "contextMenuString"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "showSelectionTextField"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "useCustomPopupCSS"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "customPopupCSS"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "selectionTextFieldLocation"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "websiteBlocklist"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "useDarkModeInOptionsPage"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "mouseRightButtonBehaviour"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "contextMenuItemRightButtonBehaviour"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "contextMenuItemMiddleButtonBehaviour"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "searchEngineIconsSource"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "shortcutBehaviour"))
            shouldSave = true;
        if (createSettingIfNonExistent(settings, "useEngineShortcutWithoutPopup"))
            shouldSave = true;
        for (const engine of settings.searchEngines) {
            if (engine.type === "browser") {
                const customEngine = engine;
                if (customEngine.iconUrl === undefined) {
                    customEngine.iconUrl = customEngine["iconSrc"];
                    delete customEngine["iconSrc"];
                    delete customEngine["id"];
                }
                customEngine.type = "custom";
                shouldSave = true;
            }
        }
        for (const engine of settings.searchEngines) {
            if (engine.isEnabledInContextMenu === undefined) {
                engine.isEnabledInContextMenu = engine.type !== "sss" && (engine.isEnabled || settings.contextMenuEnginesFilter === "all");
                shouldSave = true;
            }
        }
        for (const engine of settings.searchEngines) {
            if (engine.uniqueId === undefined) {
                engine.uniqueId = generateUniqueEngineId(engine);
                shouldSave = true;
            }
        }
        return shouldSave;
    }
    function createSettingIfNonExistent(settings, settingName) {
        if (settings[settingName] === undefined) {
            settings[settingName] = defaultSettings[settingName];
            return true;
        }
        return false;
    }
    function generateUniqueEngineId(engine = null) {
        let uniqueId = null;
        let isUnique = false;
        while (!isUnique) {
            uniqueId = Math.random().toString(36).substring(2);
            isUnique = uniqueIdToEngineDictionary[uniqueId] === undefined;
        }
        if (engine !== null) {
            uniqueIdToEngineDictionary[uniqueId] = engine;
        }
        return uniqueId;
    }
    function onSettingsChanged(changes, area) {
        if (area !== "local" || isObjectEmpty(changes))
            return;
        if (DEBUG) {
            log("onSettingsChanged in " + area);
        }
        if (DEBUG) {
            log(changes);
        }
        browser.storage.local.get()
            .then(onSettingsAcquired, getErrorHandler("Error getting settings after onSettingsChanged."))
            .then(updateSettingsOnAllTabs, getErrorHandler("Error updating settings on all tabs."));
    }
    function updateSettingsOnAllTabs() {
        browser.tabs.query({}).then(tabs => {
            for (const tab of tabs) {
                activateTab(tab);
            }
        }, getErrorHandler("Error querying tabs."));
    }
    function activateTab(tab) {
        browser.tabs.sendMessage(tab.id, {
            type: "activate",
            activationSettings: sss.activationSettingsForContentScript,
            isPageBlocked: isPageBlocked(tab),
        }).then(() => { }, () => { });
    }
    function isPageBlocked(tab) {
        if (sss.blockedWebsitesCache === undefined)
            return false;
        if (sss.blockedWebsitesCache.length == 0)
            return false;
        if (!tab.url)
            return false;
        const index = tab.url.indexOf("://");
        const url = index >= 0 ? tab.url.substr(index + 3) : tab.url;
        for (const regex of sss.blockedWebsitesCache) {
            if (url.match(regex)) {
                if (DEBUG) {
                    log("regex " + regex + " matches this URL. BLOCKED " + url);
                }
                return true;
            }
        }
        return false;
    }
    function getErrorHandler(text) {
        if (DEBUG) {
            return error => { log(`${text} (${error})`); };
        }
        else {
            return undefined;
        }
    }
    function isObjectEmpty(obj) {
        for (let _ in obj) {
            return false;
        }
        return true;
    }
    function onContentScriptMessage(msg, sender, callbackFunc) {
        if (DEBUG) {
            if (msg.type !== "log") {
                log("msg.type: " + msg.type);
            }
        }
        switch (msg.type) {
            case "getPopupSettings":
                callbackFunc(sss.settingsForContentScript);
                break;
            case "engineClick":
                onSearchEngineClick(msg.engine, msg.openingBehaviour, msg.selection, msg.href, null);
                break;
            case "log":
                if (DEBUG) {
                    log("[content script log]", msg.log);
                }
                break;
            case "getDataForSettingsPage":
                callbackFunc({
                    DEBUG: DEBUG,
                    browserVersion: browserVersion,
                    sssIcons: sssIcons,
                    defaultSettings: defaultSettings
                });
                break;
            case "runBackwardsCompatibilityUpdates":
                runBackwardsCompatibilityUpdates(msg.settings);
                callbackFunc(msg.settings);
                break;
            case "generateUniqueEngineId":
                callbackFunc(generateUniqueEngineId());
                break;
            default: break;
        }
    }
    function createDefaultEngine(engine) {
        engine.uniqueId = generateUniqueEngineId(engine);
        if (engine.type === undefined) {
            engine.type = "custom";
        }
        if (engine.isEnabled === undefined) {
            engine.isEnabled = true;
        }
        if (engine.isEnabledInContextMenu === undefined) {
            engine.isEnabledInContextMenu = engine.isEnabled;
        }
        return engine;
    }
    function setup_ContextMenu() {
        browser.contextMenus.onClicked.removeListener(onContextMenuItemClicked);
        browser.contextMenus.removeAll();
        if (sss.settings.enableEnginesInContextMenu !== true)
            return;
        browser.contextMenus.create({
            id: "sss",
            title: sss.settings.contextMenuString,
            contexts: ["selection"],
        });
        const engines = sss.settings.searchEngines;
        for (let i = 0; i < engines.length; i++) {
            const engine = engines[i];
            if (!engine.isEnabledInContextMenu)
                continue;
            const contextMenuOption = {
                id: undefined,
                title: undefined,
                type: undefined,
                parentId: "sss",
                icons: undefined,
            };
            if (engine.type === "sss") {
                const concreteEngine = engine;
                if (concreteEngine.id === "separator") {
                    contextMenuOption.type = "separator";
                    browser.contextMenus.create(contextMenuOption);
                    continue;
                }
                contextMenuOption.title = sssIcons[concreteEngine.id].name;
            }
            else {
                const concreteEngine = engine;
                contextMenuOption.title = concreteEngine.name;
            }
            let icon;
            if (engine.type === "sss") {
                const concreteEngine = engine;
                icon = sssIcons[concreteEngine.id].iconPath;
            }
            else {
                const iconUrl = engine.iconUrl;
                if (iconUrl.startsWith("data:")) {
                    icon = iconUrl;
                }
                else {
                    icon = sss.settings.searchEnginesCache[iconUrl];
                    if (icon === undefined) {
                        icon = iconUrl;
                    }
                }
            }
            contextMenuOption.icons = { "32": icon };
            contextMenuOption.id = "" + i;
            browser.contextMenus.create(contextMenuOption);
        }
        browser.contextMenus.onClicked.addListener(onContextMenuItemClicked);
    }
    function onContextMenuItemClicked(info, tab) {
        var _a, _b;
        const menuId = parseInt(info.menuItemId);
        const selectedEngine = sss.settings.searchEngines[menuId];
        const button = (_a = info === null || info === void 0 ? void 0 : info.button) !== null && _a !== void 0 ? _a : 0;
        onSearchEngineClick(selectedEngine, getOpenResultBehaviourForContextMenu(button), (_b = info.selectionText) !== null && _b !== void 0 ? _b : info.linkText, info.pageUrl, info.linkText);
    }
    function getOpenResultBehaviourForContextMenu(button) {
        if (button === 0)
            return sss.settings.contextMenuItemBehaviour;
        if (button === 1)
            return sss.settings.contextMenuItemMiddleButtonBehaviour;
        return sss.settings.contextMenuItemRightButtonBehaviour;
    }
    function setup_Commands() {
        if (browser.commands.onCommand.hasListener(onCommand)) {
            browser.commands.onCommand.removeListener(onCommand);
        }
        if (sss.settings.popupOpenBehaviour !== "off") {
            browser.commands.onCommand.addListener(onCommand);
        }
    }
    function onCommand(command) {
        switch (command) {
            case "open-popup":
                onOpenPopupCommand();
                break;
            case "toggle-auto-popup":
                onToggleAutoPopupCommand();
                break;
        }
    }
    function onOpenPopupCommand() {
        if (DEBUG) {
            log("open-popup");
        }
        getActiveTab().then(tab => browser.tabs.sendMessage(tab.id, { type: "showPopup" }));
    }
    function onToggleAutoPopupCommand() {
        if (DEBUG) {
            log("toggle-auto-popup, sss.settings.popupOpenBehaviour: " + sss.settings.popupOpenBehaviour);
        }
        if (sss.settings.popupOpenBehaviour === "auto") {
            browser.storage.local.set({ popupOpenBehaviour: "keyboard" });
        }
        else if (sss.settings.popupOpenBehaviour === "keyboard") {
            browser.storage.local.set({ popupOpenBehaviour: "auto" });
        }
    }
    function setup_Popup() {
        browser.webNavigation.onDOMContentLoaded.removeListener(onDOMContentLoaded);
        if (sss.settings.popupOpenBehaviour !== "off" || sss.settings.useEngineShortcutWithoutPopup) {
            browser.webNavigation.onDOMContentLoaded.addListener(onDOMContentLoaded);
            browser.tabs.query({}).then(installOnOpenTabs, getErrorHandler("Error querying tabs."));
        }
        if (browser.webRequest) {
            registerCSPModification();
        }
    }
    function onDOMContentLoaded(details) {
        injectContentScript(details.tabId, details.frameId, false);
    }
    function installOnOpenTabs(tabs) {
        if (DEBUG) {
            log("installOnOpenTabs");
        }
        for (const tab of tabs) {
            injectContentScriptIfNeeded(tab.id, undefined, true);
        }
    }
    function injectContentScriptIfNeeded(tabId, frameId, allFrames = false) {
        browser.tabs.sendMessage(tabId, { type: "isAlive" }).then(msg => {
            if (msg === undefined) {
                injectContentScript(tabId, frameId, allFrames);
            }
        }, () => injectContentScript(tabId, frameId, allFrames));
    }
    function injectContentScript(tabId, frameId, allFrames = false) {
        if (DEBUG) {
            log("injectContentScript " + tabId + " frameId: " + frameId + " allFrames: " + allFrames);
        }
        const errorHandler = getErrorHandler(`Error injecting page content script in tab ${tabId}.`);
        const executeScriptOptions = {
            runAt: "document_start",
            frameId: frameId,
            allFrames: allFrames,
            file: undefined,
            code: undefined,
        };
        const injectPageScript = () => {
            executeScriptOptions.file = "/content-scripts/selectionchange.js";
            browser.tabs.executeScript(tabId, executeScriptOptions).then(() => {
                executeScriptOptions.file = "/content-scripts/page-script.js";
                browser.tabs.executeScript(tabId, executeScriptOptions)
                    .then(() => browser.tabs.get(tabId).then(activateTab), errorHandler);
            }, errorHandler);
        };
        if (DEBUG) {
            executeScriptOptions.code = "var DEBUG_STATE = " + DEBUG + ";",
                browser.tabs.executeScript(tabId, executeScriptOptions).then(injectPageScript, errorHandler);
            executeScriptOptions.code = undefined;
        }
        else {
            injectPageScript();
        }
    }
    function registerCSPModification() {
        browser.webRequest.onHeadersReceived.removeListener(modifyCSPRequest);
        if (DEBUG) {
            log("registering with onHeadersReceived");
        }
        browser.webRequest.onHeadersReceived.addListener(modifyCSPRequest, { urls: ["http://*/*", "https://*/*"], types: ["main_frame"] }, ["blocking", "responseHeaders"]);
    }
    function modifyCSPRequest(details) {
        for (const responseHeader of details.responseHeaders) {
            const headerName = responseHeader.name.toLowerCase();
            if (headerName !== "content-security-policy" && headerName !== "x-webkit-csp")
                continue;
            const CSP_SOURCE = "style-src ";
            if (responseHeader.value.includes(CSP_SOURCE)) {
                if (DEBUG) {
                    log("CSP is: " + responseHeader.value);
                }
                responseHeader.value = responseHeader.value.replace(CSP_SOURCE, CSP_SOURCE + "'unsafe-inline' ");
                if (DEBUG) {
                    log("modified CSP to include style-src 'unsafe-inline': " + responseHeader.value);
                }
            }
        }
        return details;
    }
    function onSearchEngineClick(selectedEngine, openingBehaviour, searchText, href, linkText) {
        return __awaiter(this, void 0, void 0, function* () {
            if (selectedEngine.type === "sss") {
                const engine_SSS = selectedEngine;
                if (engine_SSS.id === "copyToClipboard") {
                    if (searchText === linkText) {
                        navigator.clipboard.writeText(linkText);
                    }
                    else {
                        copyToClipboard(selectedEngine);
                    }
                }
                else if (engine_SSS.id === "openAsLink") {
                    const url = getOpenAsLinkSearchUrl(searchText);
                    yield createTabForSearch(openingBehaviour, 0, url);
                    if (DEBUG) {
                        log("open as link: " + url);
                    }
                }
                return;
            }
            let engines;
            if (selectedEngine.type === "group") {
                function fillWithGroupEngines(expandedEngines, groupEngine) {
                    for (const engineId of groupEngine.enginesUniqueIds) {
                        const engine = uniqueIdToEngineDictionary[engineId];
                        if (engine.type === "group") {
                            fillWithGroupEngines(expandedEngines, engine);
                        }
                        else {
                            expandedEngines.push(engine);
                        }
                    }
                }
                engines = [];
                fillWithGroupEngines(engines, selectedEngine);
            }
            else {
                engines = [selectedEngine];
            }
            let tabIndexOffset = 0;
            for (let i = 0; i < engines.length; i++) {
                const engine = engines[i];
                if (i == 1) {
                    switch (openingBehaviour) {
                        case "this-tab":
                            openingBehaviour = "new-bg-tab-next";
                            break;
                        case "new-tab":
                            openingBehaviour = "new-bg-tab";
                            break;
                        case "new-bg-tab": break;
                        case "new-tab-next":
                            openingBehaviour = "new-bg-tab-next";
                            break;
                        case "new-bg-tab-next": break;
                        case "new-window":
                            openingBehaviour = "new-bg-tab-next";
                            break;
                        case "new-bg-window":
                            openingBehaviour = "new-bg-tab-next";
                            break;
                    }
                }
                if (engine.type === "custom") {
                    const engine_Custom = engine;
                    let openingBehaviourBeforeDiscard;
                    if (engine_Custom.discardOnOpen) {
                        openingBehaviourBeforeDiscard = openingBehaviour;
                        openingBehaviour = "new-bg-tab-next";
                    }
                    const query = getSearchQuery(engine_Custom, searchText, new URL(href));
                    const tab = yield createTabForSearch(openingBehaviour, tabIndexOffset, query);
                    if (engine_Custom.discardOnOpen) {
                        yield new Promise(finish => setTimeout(finish, 50));
                        yield browser.tabs.remove(tab.id);
                        openingBehaviour = openingBehaviourBeforeDiscard;
                        if (openingBehaviour === "new-bg-tab-next")
                            tabIndexOffset--;
                    }
                }
                else if (engine.type === "browser-search-api") {
                    const engine_BrowserSearchApi = engine;
                    const tab = yield getActiveTab();
                    yield browser.search.search({
                        engine: engine_BrowserSearchApi.name,
                        query: cleanSearchText(searchText),
                        tabId: openingBehaviour === "this-tab" ? tab.id : undefined,
                    });
                }
                if (openingBehaviour === "new-bg-tab-next")
                    tabIndexOffset++;
            }
        });
    }
    function copyToClipboard(engine) {
        if (engine.isPlainText) {
            copyToClipboardAsPlainText();
        }
        else {
            copyToClipboardAsHtml();
        }
    }
    function copyToClipboardAsHtml() {
        getActiveTab().then(tab => browser.tabs.sendMessage(tab.id, { type: "copyToClipboardAsHtml" }));
    }
    function copyToClipboardAsPlainText() {
        getActiveTab().then(tab => browser.tabs.sendMessage(tab.id, { type: "copyToClipboardAsPlainText" }));
    }
    function getOpenAsLinkSearchUrl(link) {
        link = link.trim();
        if (!link.includes("://") && !link.startsWith("about:")) {
            link = "http://" + link;
        }
        return link;
    }
    function cleanSearchText(searchText) {
        return searchText.trim().replace("\r\n", " ").replace("\n", " ");
    }
    function getSearchQuery(engine, searchText, url) {
        searchText = cleanSearchText(searchText);
        const hasCustomEncoding = engine.encoding && engine.encoding !== "utf8";
        if (hasCustomEncoding) {
            const buffer = iconv.encode(searchText, engine.encoding);
            searchText = "%" + buffer.toString("hex").toUpperCase().replace(/([A-Z0-9]{2})\B/g, "$1%");
        }
        let query = engine.searchUrl;
        if (/\{hash/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "hash", url.hash, false);
        }
        if (/\{hostname/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "hostname", url.hostname, false);
        }
        if (/\{host/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "host", url.host, false);
        }
        if (/\{href/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "href", url.href, false);
        }
        if (/\{origin/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "origin", url.origin, false);
        }
        if (/\{password/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "password", url.password, false);
        }
        if (/\{pathname/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "pathname", url.pathname, false);
        }
        if (/\{port/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "port", url.port, false);
        }
        if (/\{protocol/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "protocol", url.protocol, false);
        }
        if (/\{search/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "search", url.search, false);
        }
        if (/\{username/i.test(query)) {
            query = SearchVariables.modifySearchVariable(query, "username", url.username, false);
        }
        query = SearchVariables.modifySearchVariable(query, "searchTerms", searchText, !hasCustomEncoding);
        return query;
    }
    function createTabForSearch(openingBehaviour, tabIndexOffset, searchUrl = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield getActiveTab();
            const lastTabIndex = 9999;
            const options = {};
            if (searchUrl !== null) {
                options["url"] = searchUrl;
            }
            if (openingBehaviour !== "this-tab"
                && openingBehaviour !== "new-window"
                && openingBehaviour !== "new-bg-window") {
                options["openerTabId"] = tab.id;
            }
            switch (openingBehaviour) {
                case "this-tab":
                    if (searchUrl !== null) {
                        yield browser.tabs.update(tab.id, options);
                    }
                    return tab;
                case "new-tab":
                    options["index"] = lastTabIndex + 1;
                    return browser.tabs.create(options);
                case "new-bg-tab":
                    options["index"] = lastTabIndex + 1;
                    options["active"] = false;
                    return browser.tabs.create(options);
                case "new-tab-next":
                    options["index"] = tab.index + 1 + tabIndexOffset;
                    return browser.tabs.create(options);
                case "new-bg-tab-next":
                    options["index"] = tab.index + 1 + tabIndexOffset;
                    options["active"] = false;
                    return browser.tabs.create(options);
                case "new-window":
                    return browser.windows.create(options).then(window => window.tabs[0]);
                case "new-bg-window":
                    return browser.windows.create(options).then(window => window.tabs[0]);
            }
        });
    }
    function getActiveTab() {
        return browser.tabs.query({ currentWindow: true, active: true }).then(tabs => tabs[0]);
    }
})(SSS || (SSS = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpZnQtc2VsZWN0aW9uLXNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN3aWZ0LXNlbGVjdGlvbi1zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBZ0JBLElBQUksS0FBSyxDQUFDO0FBRVYsSUFBVSxHQUFHLENBeTJDWjtBQXoyQ0QsV0FBVSxLQUFHO0lBUVosTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRXBCLElBQUksS0FBSyxFQUFFO1FBQ1YsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztLQUN0QjtJQUdELE1BQXNCLFlBQVk7S0FPakM7SUFQcUIsa0JBQVksZUFPakMsQ0FBQTtJQUlELE1BQWEsZ0JBQWlCLFNBQVEsWUFBWTtLQUdqRDtJQUhZLHNCQUFnQixtQkFHNUIsQ0FBQTtJQUdELE1BQWEscUJBQXNCLFNBQVEsZ0JBQWdCO0tBRzFEO0lBSFksMkJBQXFCLHdCQUdqQyxDQUFBO0lBR0QsTUFBYSxtQkFBb0IsU0FBUSxZQUFZO0tBSXBEO0lBSlkseUJBQW1CLHNCQUkvQixDQUFBO0lBSUQsTUFBYSxtQkFBb0IsU0FBUSxtQkFBbUI7S0FLM0Q7SUFMWSx5QkFBbUIsc0JBSy9CLENBQUE7SUFJRCxNQUFhLDZCQUE4QixTQUFRLG1CQUFtQjtLQUVyRTtJQUZZLG1DQUE2QixnQ0FFekMsQ0FBQTtJQUlELE1BQWEsa0JBQW1CLFNBQVEsbUJBQW1CO0tBSTFEO0lBSlksd0JBQWtCLHFCQUk5QixDQUFBO0lBRUQsTUFBYSxRQUFRO0tBNkRwQjtJQTdEWSxjQUFRLFdBNkRwQixDQUFBO0lBRUQsTUFBYSxrQkFBa0I7S0FTOUI7SUFUWSx3QkFBa0IscUJBUzlCLENBQUE7SUFFRCxNQUFhLHFCQUFxQjtLQUlqQztJQUpZLDJCQUFxQix3QkFJakMsQ0FBQTtJQUVELE1BQWEsaUJBQWlCO1FBQTlCO1lBS0Msa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDL0IsQ0FBQztLQUFBO0lBTlksdUJB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