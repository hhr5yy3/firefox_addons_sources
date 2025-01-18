const wcag_rules_meta = {
    "1.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111#text-alternatives",
        "wcagLvl": "A",
        "bitv": "9.1.1.1",
        "principle": "perceivable",
        "urlBITV": "https://github.com/BIK-BITV/BIK-Web-Test/blob/master/Pr%C3%BCfschritte/de/9.1.1.1a%20Alternativtexte%20f%C3%BCr%20Bedienelemente.adoc",
        "function": {
            "documentOnly": false
        },
        "errors": {
            "svgSyntax": {
                "reference": "EA-R1"
            },
            "imgVeryLongAlt": {
                "reference": "EA-R10"
            },
            "imgLongAlt": {
                "reference": "EA-R11"
            },
            "svgNoAlt": {
                "reference": "EA-R2"
            },
            "svgShortAlt": {
                "reference": "EA-R3"
            },
            "svgVeryLongAlt": {
                "reference": "EA-R4"
            },
            "svgLongAlt": {
                "reference": "EA-R5"
            },
            "imgNoAlt": {
                "reference": "EA-R6"
            },
            "imgLinkRedundantAlt": {
                "reference": "EA-R7"
            },
            "imgLinkNoAlt": {
                "reference": "EA-R8"
            },
            "imgShortAlt": {
                "reference": "EA-R9"
            }
        }
    },
    "1.1.1": {
        "wcagLvl": "A",
        "principle": "perceivable",
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html",
        "bitv": "9.2.4.4",
        "urlBITV": "https://github.com/BIK-BITV/BIK-Web-Test/blob/master/Pr%C3%BCfschritte/de/9.2.4.4%20Aussagekr%C3%A4ftige%20Linktexte.adoc",
        "function": {
            "documentOnly": true
        },
        "errors": {
            "noLinkText": {
                "reference": "EA-R12"
            },
            "emptyLink": {
                "reference": "EA-R13"
            },
            "linkTextIsUrl": {
                "reference": "EA-R14"
            },
            "longLinkText": {
                "reference": "EA-R15"
            },
            "objNoAlt": {
                "reference": "EA-R16"
            },
            "svgNoAlt": {
                "reference": "EA-R2"
            },
            "svgShortAlt": {
                "reference": "EA-R3"
            },
            "inputImageNoAlt": {
                "reference": "EA-R33"
            },
            "decorativeImageExposed": {
                "reference": "EA-R70"
            }
        }
    },
    "1.2.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=123#audio-description-or-media-alternative-prerecorded",
        "wcagLvl": "A",
        "principle": "perceivable",
        "bitv": "9.1.2.1",
        "urlBITV": "https://github.com/BIK-BITV/BIK-Web-Test/blob/master/Pr%C3%BCfschritte/de/9.1.2.1%20Alternativen%20f%C3%BCr%20Audiodateien%20und%20stumme%20Videos.adoc",
        "manuelCheck": true,
        "function": {
            "documentOnly": false
        },
        "errors": {
            "audioDetected": {
                "reference": "EA-R17"
            },
            "videoDetected": {
                "reference": "EA-R18"
            }
        }
    },
    "1.3.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#info-and-relationships",
        "wcagLvl": "A",
        "principle": "perceivable",
        "bitv": "9.1.3.1a",
        "urlBITV": "https://github.com/BIK-BITV/BIK-Web-Test/blob/master/Pr%C3%BCfschritte/de/9.1.3.1a%20HTML-Strukturelemente%20f%C3%BCr%20%C3%9Cberschriften.adoc",
        "function": {
            "documentOnly": false
        },
        "errors": {
            "multipleH1": {
                "reference": "EA-R19"
            },
            "noVisibleH1": {
                "reference": "EA-R20"
            },
            "headingJump": {
                "reference": "EA-R21"
            },
            "wrongWrappedLi": {
                "reference": "EA-R22"
            },
            "noDisplayHeader": {
                "reference": "EA-R44"
            },
            "unassignedTableHeader": {
                "reference": "EA-R55"
            },
            "unassignedDataCell": {
                "reference": "EA-R60"
            },
            "requiredChildrenMissing": {
                "reference": "EA-R64"
            },
            "requiredParentMissing": {
                "reference": "EA-R65"
            },
            "missingReferencedHeader": {
                "reference": "EA-R69"
            },
            "regionMissingName": {
                "reference": "EA-R81"
            },
            "elementInvalidRole": {
                "reference": "EA-R82"
            }
        }
    },
    "1.3.4": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C143%2C144%2C148%2C1410#identify-input-purpose",
        "wcagLvl": "AA",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "restrictedOrientation": {
                "reference": "EA-R74"
            }
        }
    },
    "1.3.5": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C143%2C144%2C148%2C1410#identify-input-purpose",
        "wcagLvl": "AA",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "invalidAutocomplete": {
                "reference": "EA-R59"
            }
        }
    },
    "1.4.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C312%2C244#use-of-color",
        "wcagLvl": "A",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "linkHiddenInText": {
                "reference": "EA-R72"
            }
        }
    },
    "1.4.2": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C143#audio-control",
        "wcagLvl": "A",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "autoplay": {
                "reference": "EA-R49"
            }
        }
    },
    "1.4.3": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=143#contrast-minimum",
        "wcagLvl": "AA",
        "principle": "perceivable",
        "bitv": "9.1.4.3",
        "urlBITV": "https://github.com/BIK-BITV/BIK-Web-Test/blob/master/Pr%C3%BCfschritte/de/9.1.4.3%20Kontraste%20von%20Texten%20ausreichend.adoc",
        "function": {
            "documentOnly": true
        },
        "errors": {
            "lowContrast": {
                "reference": "EA-R23"
            },
            "lowContrastSVG": {
                "reference": "EA-R24"
            },
            "veryLowContrast": {
                "reference": "EA-R25"
            }
        }
    },
    "1.4.4": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C143%2C148%2C144#resize-text",
        "wcagLvl": "AA",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "preventZoom": {
                "reference": "EA-R54"
            }
        }
    },
    "1.4.6": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C244%2C312%2C221#contrast-enhanced",
        "wcagLvl": "AAA",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "lowContrast": {
                "reference": "EA-R23"
            },
            "veryLowContrast": {
                "reference": "EA-R25"
            },
            "contrastEnhanced": {
                "reference": "EA-R85"
            }
        }
    },
    "1.4.8": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=143%2C111#visual-presentation",
        "wcagLvl": "AAA",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "insufficientLineHeight": {
                "reference": "EA-R45"
            },
            "paragraphIsJustified": {
                "reference": "EA-R77"
            }
        }
    },
    "1.4.10": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C143%2C144%2C148%2C1410#reflow",
        "wcagLvl": "AA",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "preventZoom": {
                "reference": "EA-R54"
            }
        }
    },
    "1.4.12": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C143#text-spacing",
        "wcagLvl": "AA",
        "principle": "perceivable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "importantLetterSpacing": {
                "reference": "EA-R46"
            },
            "importantWordSpacing": {
                "reference": "EA-R47"
            },
            "importantLineSpacing": {
                "reference": "EA-R48"
            }
        }
    },
    "2.1.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C143#keyboard",
        "wcagLvl": "A",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "iframeNegativeTabindex": {
                "reference": "EA-R53"
            },
            "scrollableKeyboard": {
                "reference": "EA-R83"
            }
        }
    },
    "2.1.3": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C244%2C312%2C221#keyboard-no-exception",
        "wcagLvl": "AAA",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "scrollableKeyboard": {
                "reference": "EA-R83"
            }
        }
    },
    "2.2.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C312%2C244#timing-adjustable",
        "wcagLvl": "A",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "metaRefreshDelay": {
                "reference": "EA-R79"
            },
            "metaRefreshDelayAAA": {
                "reference": "EA-R80"
            }
        }
    },
    "2.2.2": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html",
        "wcagLvl": "A",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {}
    },
    "2.2.4": {
        "urlWCAG": "https://w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C312%2C244#interruptions",
        "wcagLvl": "AAA",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "metaRefreshDelay": {
                "reference": "EA-R79"
            },
            "metaRefreshDelayAAA": {
                "reference": "EA-R80"
            }
        }
    },
    "2.4.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html",
        "wcagLvl": "A",
        "principle": "operable",
        "bitv": "9.2.4.1",
        "urlBITV": "",
        "errors": {}
    },
    "2.4.2": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131%2C311#page-titled",
        "wcagLvl": "A",
        "principle": "operable",
        "bitv": "9.2.4.2",
        "urlBITV": "https://github.com/BIK-BITV/BIK-Web-Test/blob/master/Pr%C3%BCfschritte/de/9.2.4.2%20Sinnvolle%20Dokumenttitel.adoc",
        "function": {
            "documentOnly": false
        },
        "errors": {
            "noTitle": {
                "reference": "EA-R26"
            },
            "shortTitle": {
                "reference": "EA-R27"
            },
            "noTitleIFrame": {
                "reference": "EA-R28"
            }
        }
    },
    "2.4.4": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C312#link-purpose-in-context",
        "wcagLvl": "A",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "noLinkText": {
                "reference": "EA-R12"
            }
        }
    },
    "2.4.6": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html",
        "wcagLvl": "AA",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "noDisplayHeader": {
                "reference": "EA-R44"
            }
        }
    },
    "2.4.9": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C312#link-purpose-link-only",
        "wcagLvl": "AAA",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "noLinkText": {
                "reference": "EA-R12"
            }
        }
    },
    "2.5.3": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C244%2C312%2C221#label-in-name",
        "wcagLvl": "A",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "visibleLabel": {
                "reference": "EA-R84"
            }
        }
    },
    "2.5.8": {
        "urlWCAG": "https://w3c.github.io/wcag/understanding/target-size-minimum.html",
        "wcagLvl": "AA",
        "principle": "operable",
        "bitv": "",
        "urlBITV": "",
        "errors": {}
    },
    "3.1.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=131#language-of-page",
        "wcagLvl": "A",
        "principle": "understandable",
        "bitv": "9.3.1.1",
        "urlBITV": "https://github.com/BIK-BITV/BIK-Web-Test/blob/master/Pr%C3%BCfschritte/de/9.3.1.1%20Hauptsprache%20angegeben.adoc",
        "function": {
            "documentOnly": false
        },
        "errors": {
            "noLang": {
                "reference": "EA-R29"
            },
            "falseLang": {
                "reference": "EA-R30"
            },
            "invalidLang": {
                "reference": "EA-R50"
            },
            "nonMatchingLang": {
                "reference": "EA-R51"
            }
        }
    },
    "3.1.2": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111#language-of-parts",
        "wcagLvl": "AA",
        "principle": "understandable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "elementInvalidLang": {
                "reference": "EA-R71"
            }
        }
    },
    "3.1.4": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111#abbreviations",
        "wcagLvl": "AAA",
        "principle": "understandable",
        "bitv": "",
        "urlBITV": "",
        "function": {
            "documentOnly": false,
            "aaaTest": true
        },
        "errors": {
            "noAbbrev": {
                "reference": "EA-R31"
            }
        }
    },
    "3.2.5": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111%2C244%2C312%2C221#change-on-request",
        "wcagLvl": "AAA",
        "principle": "understandable",
        "bitv": "",
        "urlBITV": "",
        "errors": {
            "noAbbrev": {
                "reference": "EA-R31"
            },
            "metaRefreshDelay": {
                "reference": "EA-R79"
            },
            "metaRefreshDelayAAA": {
                "reference": "EA-R80"
            }
        }
    },
    "3.3.2": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html",
        "wcagLvl": "A",
        "principle": "understandable",
        "bitv": "",
        "urlBITV": "",
        "errors": {}
    },
    "4.1.1": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111#parsing",
        "wcagLvl": "A",
        "principle": "robust",
        "bitv": "",
        "urlBITV": "",
        "function": {
            "documentOnly": false
        },
        "errors": {
            "noUniqueId": {
                "reference": "EA-R32"
            }
        }
    },
    "4.1.2": {
        "urlWCAG": "https://www.w3.org/WAI/WCAG21/quickref/#name-role-value",
        "wcagLvl": "A",
        "principle": "robust",
        "bitv": "9.4.1.2",
        "urlBITV": "https://webtest.bitv-test.de/index.php?a=di&iid=295&s=n",
        "function": {
            "documentOnly": true
        },
        "errors": {
            "noLinkText": {
                "reference": "EA-R12"
            },
            "noTitleIFrame": {
                "reference": "EA-R28"
            },
            "inputImageNoAlt": {
                "reference": "EA-R33"
            },
            "resetInput": {
                "reference": "EA-R34"
            },
            "inputNoLabel": {
                "reference": "EA-R35"
            },
            "noButtonInfo": {
                "reference": "EA-R36"
            },
            "noAreaAlt": {
                "reference": "EA-R38"
            },
            "bodyAriaHidden": {
                "reference": "EA-R39"
            },
            "selectLabel": {
                "reference": "EA-R40"
            },
            "identicalIFrame": {
                "reference": "EA-R52"
            },
            "presentationalChildFocus": {
                "reference": "EA-R62"
            },
            "ariaHiddenElement": {
                "reference": "EA-R66"
            },
            "missingMenuitemName": {
                "reference": "EA-R73"
            }
        }
    },
    "Best Practice": {
        "urlWCAG": "",
        "principle": "bestPractice",
        "wcagLvl": "Best Practice",
        "bitv": "",
        "urlBITV": "",
        "function": {
            "documentOnly": false
        },
        "errors": {
            "imgVeryLongAlt": {
                "reference": "EA-R10"
            },
            "imgLongAlt": {
                "reference": "EA-R11"
            },
            "linkTextIsUrl": {
                "reference": "EA-R14"
            },
            "longLinkText": {
                "reference": "EA-R15"
            },
            "multipleH1": {
                "reference": "EA-R19"
            },
            "noVisibleH1": {
                "reference": "EA-R20"
            },
            "resetInput": {
                "reference": "EA-R34"
            },
            "svgVeryLongAlt": {
                "reference": "EA-R4"
            },
            "noUniqueAccKey": {
                "reference": "EA-R41"
            },
            "noTableHeadText": {
                "reference": "EA-R42"
            },
            "noTextInHeader": {
                "reference": "EA-R43"
            },
            "emptyHeading": {
                "reference": "EA-R43"
            },
            "svgLongAlt": {
                "reference": "EA-R5"
            },
            "invalidAria": {
                "reference": "EA-R56"
            },
            "notPermittedAria": {
                "reference": "EA-R57"
            },
            "invalidValueAria": {
                "reference": "EA-R58"
            },
            "noHeadings": {
                "reference": "EA-R61"
            },
            "decorativeElementFocus": {
                "reference": "EA-R63"
            },
            "smallFontSize": {
                "reference": "EA-R67"
            },
            "missingGroupName": {
                "reference": "EA-R68"
            },
            "imgLinkRedundantAlt": {
                "reference": "EA-R7"
            },
            "paragraphAllItalic": {
                "reference": "EA-R75"
            },
            "paragraphAllUppercase": {
                "reference": "EA-R76"
            },
            "textNotInLandmark": {
                "reference": "EA-R78"
            }
        }
    }
};