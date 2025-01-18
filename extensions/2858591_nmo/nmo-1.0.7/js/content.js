const blogQuastionSelector = '.mw-820';
const testName = '.mat-card-title-quiz-custom'
const testName2 = '.mat-expansion-panel-header-title'
const blockQ = '.question'
const quastion = '.question-title-text';
const variant = '.question-inner-html-text'
var variantSelector = '.mat-radio-2-input'
var startButton = false
var superButton;

var pain = "Маша, я не знаю как такое произошло, но я в тебя влюбился... Ты действительно мне нравишься и я схожу с ума по тебе последнее время. Может быть это пройдёт (что будет лучше для нас двоих), но я видел как это могло бы выглядеть и это очень круто))) Я тебя люблю, и эти слова никто и никогда не найдёт. Может когда-то у меня получится тебе это показать и ты в дальнейшем будешь открывать консоль и вводить туда pain чтобы снова представить мой голос, если со мной что-то случится) Я хочу, чтобы ты была счастлива! А со мной или без меня это уже не важно) С любовью Дима <3";

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name === "getQ") {
      let result = getInfoFrom24();
      sendResponse({ status: result });
    }
  }
);

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name === "update") {
      let result = tryInfoFromNMO();
      // console.log(result.var1, result.var2)
      sendResponse({ test: result.var1, qua: result.var2 });
    }
  }
);

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name === "auto") {
      let result = pointer();
      sendResponse({ text: result });
    }
  }
);

function tryInfoFromNMO() {
  let test;
  if (document.querySelector(testName)) {
    test = document.querySelector(testName).innerText;
  } else if (document.querySelector(testName2)) {
    test = document.querySelector(testName2).innerText;
  } else {
    test = "Ошибка";
  }
  let qua = document.querySelector(quastion) ? document.querySelector(quastion).innerText : "Ошибка";
  return { var1: test, var2: qua }
}

function getInfoFrom24() {
  try {
    const blog = document.querySelector(blogQuastionSelector).innerText;
    let newBlog = "";
    for (let i = 0; i < blog.length; i++) {
      if (blog[i] === "a") {
        newBlog += "а";
      } else if (blog[i] === "o") {
        newBlog += "о";
      } else if (blog[i] === "A") {
        newBlog += "А";
      } else if (blog[i] === "O") {
        newBlog += "О";
      } else if (blog[i] === "e") {
        newBlog += "е";
      } else if (blog[i] === "E") {
        newBlog += "Е";
      } else {
          newBlog += blog[i];
      }
    }
    chrome.storage.local.set({ info: newBlog })
    const propusk = document.getElementById("superButton24")
    if (propusk) {
      propusk.style.backgroundColor = "#0ca21c"
      propusk.innerText = "Информация взята"
    }
    return true
  } catch (e) { 
    return false 
  }
}

function pointer() {
  browser.storage.local.get([ 'answer' ]).then((response) => {
    const qwerty = response.answer
    // console.log(qwerty)
    try {
      if (qwerty.length == 1) {
        clickOnTrueButton(qwerty[0])
      } else {
        for (var i = 0; i <= qwerty.length - 1; i++) {
          clickOnTrueButton(qwerty[i])
        }
      }
      browser.storage.local.get([ 'stand' ]).then((res) => {
        if (res.stand) {
          browser.storage.local.get([ 'timeSleep' ]).then((time) => {
            setTimeout(clickNext, time.timeSleep * 1000);
          })
        }
      })
    } catch(e) {
      browser.storage.local.set({ stand: false })
      browser.storage.local.set({ onclient: false })
      superButton.style.backgroundColor = "#a21b47"
    }
  })
  return 'OK'
}

function clickOnTrueButton(answerLonely) {
  const elements = document.querySelectorAll('*');
  let foundElement = null;
  // console.log(answerLonely)
  elements.forEach(element => {
    if (element && element.innerText && element.innerText.includes(answerLonely)) {
      foundElement = element;
    }
  });

  foundElement.style.backgroundColor = '#12CC12';

  // console.log(foundElement)

  const parentElement = foundElement.parentNode;
  const previousElement = parentElement.previousElementSibling;
  const button = previousElement.querySelector('input')

  console.log(button.checked)
  if (!button.checked) {
    button.click();
  }
}

function clickNext() {
  const elements = document.querySelectorAll('*');
  let foundElement = null;
  elements.forEach(element => {
    if (element && element.innerText && element.innerText.includes("Следующий вопрос")) {
      foundElement = element;
    }
  });

  // console.log(foundElement)
  if (foundElement == null) {
    superButton.style.backgroundColor = "#199e70"
    superButton.innerText = "Тест пройден"
    return
  }
  const eee = foundElement.parentNode
  // console.log(eee)
  eee.style.backgroundColor = "#000000"
  eee.click()

  browser.storage.local.get([ 'onclient' ]).then((res) => {
    if (res.onclient) {
      browser.storage.local.get([ 'timeSleep' ]).then((time) => {
        setTimeout(loper, time.timeSleep * 1000);
      })
    }
  })
}









function butbut() {
  var panel = document.querySelector(".mat-mdc-card-actions")
  var panel24 = document.querySelectorAll("#breadcrumbs")
  if (panel) {
    var newButton = document.createElement("button")
    newButton.classList.add("quiz-buttons-primary")
    newButton.classList.add("mdc-button")
    newButton.classList.add("mdc-button--raised")
    newButton.classList.add("mat-mdc-raised-button")
    newButton.classList.add("mat-primary")
    newButton.classList.add("mat-mdc-button-base")
    newButton.id = "superButtonSamReshala"
    newButton.innerText = "Пусть сам решается"
    panel.appendChild(newButton)

    var newButton2 = document.createElement("button")
    newButton2.classList.add("quiz-buttons-primary")
    newButton2.classList.add("mdc-button")
    newButton2.classList.add("mdc-button--raised")
    newButton2.classList.add("mat-mdc-raised-button")
    newButton2.classList.add("mat-primary")
    newButton2.classList.add("mat-mdc-button-base")
    newButton2.id = "superButtonLetsGo"
    newButton2.innerText = "Прямая ссылка"
    panel.appendChild(newButton2)

    superStart()
  } else if (panel24) {
    var newButton = document.createElement("button")
    newButton.id = "superButton24"
    newButton.style.marginTop = '5vh'
    newButton.style.width = '100%'
    newButton.innerText = "Взять информацию"
    panel24[0].parentNode.insertBefore(newButton, panel24[0]);

    getInfoFrom24()
  }
}
setTimeout(butbut, 1000)

function superStart() {
  const superButtonLetsGo = document.getElementById("superButtonLetsGo")
  superButtonLetsGo.onclick = () => {
    const oneLie = " - итоговое тестирование"
    const twoLie = " - предварительное тестирование"
    const namename = tryInfoFromNMO()
    var strin = namename.var1
    let oldString = strin.toLowerCase().replace(oneLie, '').replace(twoLie, '')
    // browser.tabs.create({ url: "https://24forcare.com/search/?query=" + oldString })
    window.open("https://24forcare.com/search/?query=" + oldString);
  }
  superButton = document.getElementById("superButtonSamReshala")
  superButton.onclick = () => {
    startButton = !startButton
    console.log(startButton)
    if (startButton) {
      browser.storage.local.set({ stand: true })
      browser.storage.local.set({ onclient: true })
      superButton.style.backgroundColor = "#2aa631"
      loper()
    } else {
      browser.storage.local.set({ stand: false })
      browser.storage.local.set({ onclient: false })
      superButton.style.backgroundColor = "#1b60a2"
      superButton.innerText = "Пусть сам решается"
    }
  }
}

async function loper() {
  console.log("1")
  const po = tryInfoFromNMO()
  try {
    findAnswer(po.var2)
  } catch(e) {
    // statements
    browser.storage.local.set({ stand: false })
    browser.storage.local.set({ onclient: false })
    superButton.style.backgroundColor = "#a21b47"
  }
  
}

function findAnswer(superText) {
  console.log("2")
  browser.storage.local.get([ "info" ]).then((result) => {
    const textIN = result.info
    const strange = textIN.split('\n')

    strange.forEach((str, index) => {
      if (str.toLowerCase().includes(superText.toLowerCase())) {
        // console.log(`\nТекст найден на строке ${index + 1}: ${str}\n`);

        var strForIndex;

        for (var i = 0; i < 5; i++) {
          var ing = strange[index + i + 4].charAt(1)
          if (ing != ")" && ing != "") {
            if (ing == ".") {
              strForIndex = index + i + 3
              break
            }
          } else {
            strForIndex = index + i + 4
          }
        }

        var list = [];

        for (var i = 2; i < (strForIndex - index); i++) {
          if (strange[index + i].charAt(strange[index + i].length - 1) == "+") {
            list.push(`${strange[index + i].substring(3, strange[index + i].length - 2)}`)
          }
        }
        browser.storage.local.set({ answer: list })
      }
    })
    pointer()
  })
}