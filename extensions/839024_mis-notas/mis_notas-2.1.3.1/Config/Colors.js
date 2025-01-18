var styleSheet;
var configOptions = null;

function loadColors(e) {
    if (e) {
        e.preventDefault();
    }
    backgroundScript.loadConfigOptions().then((opt) => {
        configOptions = opt;
        document.getElementById("username").value = configOptions.username;
        reloadControls();
    });
}

function reloadControls() {
    var main = document.getElementById("ColorConfig");

    while (main.firstChild) {
        main.removeChild(main.lastChild);
    }
    main.appendChild(loadAnnotationColors("sticky", "textbox", configOptions.sticky));
    main.appendChild(loadAnnotationColors("underline", "textSelection", configOptions.underline));
    main.appendChild(loadAnnotationColors("crossout", "textSelection", configOptions.crossout));
    main.appendChild(loadAnnotationColors("highlight", "textSelection", configOptions.highlight));
    main.appendChild(loadAnnotationColors("changeText", "textSelection", configOptions.changeText));
    main.appendChild(loadAnnotationColors("url", "textSelection", configOptions.url));
    main.appendChild(loadAnnotationColors("player", "player", configOptions.player));
}

//Load config color fieldset for each note 
function loadAnnotationColors(name, type, config) {
    var container = document.createElement("fieldset");
    container.classList.add("grid");

    var legend = document.createElement("legend");
    legend.innerText = browser.i18n.getMessage(name + "ConfigTitle");
    container.appendChild(legend);

    var example = createExample(name, type);

    for (var prop in config) {
        appendProperty(name, prop, isNaN(config[prop]) ? "color" : "range", config[prop], container);
        if (example) {
            container.appendChild(example);
            example = null;
        }
    }
    return container;
}

//Create the example note
function createExample(element, type) {
    var divMain = document.createElement("div");
    divMain.classList.add("ejemplo");

    if (type == "textSelection") {
        if (element == "changeText") {
            var div = createSelectionHTML(divMain, element + "Selection", type);
            divMain.style.gridRowStart = "span 8";
            div.style.backgroundColor = configOptions[element].selectionBackgroundColor;
            div.style.color = configOptions[element].selectionColor;
            changeOpacity(null, element + "Selection", div);
        } else {
            var div = createSelectionHTML(divMain, element, type);
        }
    }

    if (type == "textbox" || element == "changeText") {
        var div = createTextboxHTML(divMain, element, type);
    }

    if (type == "player") {
        var div = createPlayerHTML(divMain, element, type);
    }

    div.style.color = configOptions[element].color;
    div.style.backgroundColor = configOptions[element].backgroundColor;
    changeOpacity(null, element, div);
    return divMain;
}

//Button actions
function restoreDefault() {
    configOptions = backgroundScript.defaultConfigOptions();
    reloadControls();
    showMessage(browser.i18n.getMessage("DefautlValueMsg"))
}

function saveColors(e) {
    if (document.getElementById("formOptions").checkValidity()) {
        configOptions.username = document.getElementById("username").value;
        backgroundScript.saveConfigOptions(configOptions);
        showMessage(browser.i18n.getMessage("OptionsSavedMsg"), "green");
    } else {
        showMessage(browser.i18n.getMessage("OptionsValidationErrorMsg"), "red");
    }
    e.preventDefault();
}

//Config change actions
function colorChange(e, element, property, secondary) {
    if (e.target.value.match(/^#([0-9a-f]{3}){1,2}$/i)) {
        secondary.value = e.target.value;
        configOptions[element][property] = e.target.value;
        var objElem;
        if (element == "changeText" && property.startsWith("selection")) {
            objElem = document.getElementById(element + "Selection");
            opacity = configOptions[element].selectionOpacity;
        } else {
            objElem = document.getElementById(element);
            opacity = configOptions[element].opacity;
        }
        if (property.search("ackgroundColor") != -1) {
            objElem.style.backgroundColor = e.target.value;
            changeOpacity(null, element, objElem);
        } else {
            objElem.style.color = e.target.value;
            if (element == "player") {
                addCSSRule('#progressBar::-moz-progress-bar', 'background-color: ' + configOptions[element].color);
                addCSSRule('#volumen::-moz-range-thumb', 'background-color: ' + configOptions[element].color);
                addCSSRule('#volumen::-moz-range-track', 'background-color: ' + configOptions[element].color);
            }
        }
        e.target.setCustomValidity("");

    } else {
        e.target.setCustomValidity(browser.i18n.getMessage("InvalidColorMsg"));
    }
}

function rangeChange(e, element, property, secondary) {
    if (e.target.validity.valid) {
        secondary.value = e.target.value;
        configOptions[element][property] = e.target.value / 100;
        if (element == "changeText" && property.startsWith("selection")) {
            document.getElementById(element + "Selection").dispatchEvent(new Event("mouseout"));
        } else {
            document.getElementById(element).dispatchEvent(new Event("mouseout"));
        }
    }
}

//Functions to apply the config changes into the examples
function applyBackgroundOpacity(elem, level) {
    elem.style.opacity = level;
}

function applyBackgroundOpacitySelection(elem, level) {
    var color = elem.style.backgroundColor.match(/\d+(.\d+)?/g);
    var newColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + level + ")";

    elem.style.backgroundColor = newColor;
}

function addCSSRule(selector, rules, index) {
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleSheet);
        styleSheet = document.styleSheets[document.styleSheets.length - 1];
    }

    for (var i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].selectorText == selector) {
            styleSheet.cssRules[i].style = rules;
            return;
        }
    }

    if ("insertRule" in styleSheet) {
        styleSheet.insertRule(selector + "{" + rules + "}", index);
    } else if ("addRule" in styleSheet) {
        styleSheet.addRule(selector, rules, index);
    }
}

function changeOpacity(e, element, obj) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    var opacitiyValue;

    if (element.endsWith("Selection")) {
        opacitiyValue = e && e.type == "mouseover" ? configOptions.changeText.selectionHoverOpacity : configOptions.changeText.selectionOpacity;
    } else {
        opacitiyValue = e && e.type == "mouseover" ? configOptions[element].hoverOpacity : configOptions[element].opacity;
    }
    if (obj.classList.contains("selection")) {
        applyBackgroundOpacitySelection(obj, opacitiyValue)
    } else {
        applyBackgroundOpacity(obj, opacitiyValue);
    }
}

//Create HTML elements

function appendProperty(element, property, type, value, container) {

    var label = document.createElement("label");
    label.innerText = browser.i18n.getMessage(property);
    var dummyDiv = document.createElement("div");
    dummyDiv.appendChild(label);
    container.appendChild(dummyDiv);


    if (type == "color") {
        var input = document.createElement("input");
        input.type = type;
        input.id = element + property;
        input.value = value;
        dummyDiv = document.createElement("div");
        dummyDiv.appendChild(input);
        container.appendChild(dummyDiv);


        var input2 = document.createElement("input");
        input2.type = "text";
        input2.id = element + property + "Text";
        input2.value = value;
        input2.style.width = "100%";
        dummyDiv = document.createElement("div");
        dummyDiv.appendChild(input2);
        container.appendChild(dummyDiv);

        input.addEventListener("change", function(e) {
            colorChange(e, element, property, input2)
        });
        input2.addEventListener("change", function(e) {
            colorChange(e, element, property, input)
        });
    } else {
        var input = document.createElement("input");
        input.type = "number";
        input.id = element + property + "Text";
        input.min = 0;
        input.max = 100;
        input.step = 1;
        input.style.width = "100%";
        input.style.marginLeft = "0px";
        input.value = value * 100;
        dummyDiv = document.createElement("div");
        dummyDiv.appendChild(input);
        container.appendChild(dummyDiv);

        var input2 = document.createElement("input");
        input2.type = type;
        input2.id = element + property;
        input2.min = 0;
        input2.max = 100;
        input2.step = 1;
        input2.style.width = "100%";
        input2.value = value * 100;
        dummyDiv = document.createElement("div");
        dummyDiv.appendChild(input2);
        container.appendChild(dummyDiv);

        input.addEventListener("change", function(e) {
            rangeChange(e, element, property, input2)
        });
        input2.addEventListener("change", function(e) {
            rangeChange(e, element, property, input)
        });
    }
}



function createSelectionHTML(divMain, element, type) {
    var div = document.createElement("div");
    div.classList.add(type);
    div.classList.add("selection");
    div.id = element;
    divMain.appendChild(document.createTextNode(browser.i18n.getMessage("ExampleTextSplitted1")));

    div.classList.add("selection");
    div.innerText = browser.i18n.getMessage("ExampleText" + element);
    divMain.appendChild(div);

    divMain.appendChild(document.createTextNode(browser.i18n.getMessage("ExampleTextSplitted2")));

    div.addEventListener("mouseover", function(e) {
        changeOpacity(e, element, div);
    });
    div.addEventListener("mouseout", function(e) {
        changeOpacity(e, element, div);
    });

    return div;
}

function createTextboxHTML(divMain, element, type) {
    var div = document.createElement("div");
    div.classList.add(type);
    div.classList.add(element);
    div.id = element;
    if (element == "changeText") {
        arrow = document.createElement("span");
        arrow.innerText = "▲";
        div.appendChild(arrow);
    }

    div.appendChild(document.createTextNode(browser.i18n.getMessage("FullExampleText")));
    div.addEventListener("mouseover", function(e) {
        changeOpacity(e, element, div);
    });
    div.addEventListener("mouseout", function(e) {
        changeOpacity(e, element, div);
    });
    divMain.appendChild(div);
    return div;

}

function createPlayerHTML(divMain, element, type) {
    var div = document.createElement("div");
    div.classList.add(type);
    div.classList.add(element);
    div.id = element;

    var i = document.createElement("i");
    i.classList.add("hideBtn");
    i.classList.add("material-icons");
    i.innerText = "keyboard_arrow_up";
    div.appendChild(i);

    var progress = document.createElement("progress");
    progress.id = "progressBar";
    progress.classList.add("progressBar");
    progress.max = 100;
    progress.value = 50;
    div.appendChild(progress);

    var controls = document.createElement("div");
    controls.classList.add("controlBar");
    div.appendChild(controls);

    var play = document.createElement("i");
    play.classList.add("material-icons");
    play.innerText = "play_arrow";
    controls.appendChild(play);

    var stop = document.createElement("i");
    stop.classList.add("material-icons");
    stop.innerText = "stop";
    controls.appendChild(stop);

    var fullscreen = document.createElement("i");
    fullscreen.classList.add("leftMediaButton");
    fullscreen.classList.add("material-icons");
    fullscreen.innerText = "fullscreen";
    controls.appendChild(fullscreen);

    var volume = document.createElement("input");
    volume.type = "range";
    volume.id = "volumen";
    volume.classList.add("volume");
    controls.appendChild(volume);

    var mute = document.createElement("i");
    mute.classList.add("leftMediaButton");
    mute.classList.add("material-icons");
    mute.innerText = "volume_up";
    controls.appendChild(mute);

    div.addEventListener("mouseover", function(e) {
        changeOpacity(e, element, div);
    });
    div.addEventListener("mouseout", function(e) {
        changeOpacity(e, element, div);
    });

    divMain.appendChild(div);

    return div;
}