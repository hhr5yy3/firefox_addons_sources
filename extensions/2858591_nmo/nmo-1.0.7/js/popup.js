var directUrl;

var pain = "Маша, я не знаю как такое произошло, но я в тебя влюбился... Ты действительно мне нравишься и я схожу с ума по тебе последнее время. Может быть это пройдёт (что будет лучше для нас двоих), но я видел как это могло бы выглядеть и это очень круто))) Я тебя люблю, и эти слова никто и никогда не найдёт. Может когда-то у меня получится тебе это показать и ты в дальнейшем будешь открывать консоль и вводить туда pain чтобы снова представить мой голос, если со мной что-то случится) Я хочу, чтобы ты была счастлива! А со мной или без меня это уже не важно) С любовью Дима <3";


browser.storage.local.get([ 'timeSleep' ]).then((time) => {
  document.getElementById('timeSleep').value = `${time.timeSleep}`
})

const timeInput = document.getElementById('timeSleep')
timeInput.addEventListener('change', () => {
  let parser = parseInt(timeInput.value)
  if (parser && parser > 0) {
    browser.storage.local.set({ timeSleep: parser })
  } else {
    browser.storage.local.set({ timeSleep: 1 })
    timeInput.value = 1
  }
})

class MessageSet {
  async send(word, callback) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await browser.tabs.query(queryOptions);
    let message = { name: word };
    browser.tabs.sendMessage(tab[0].id, message, callback);
  }
}


const globalOperand = new MessageSet()


const buttonGetInfo = document.getElementById("getIt"); // кнопка "Взять информацию"
buttonGetInfo.onclick = () => {
  globalOperand.send("getQ", (response) => {
    if (response) {
      buttonGetInfo.style.backgroundColor = "#AADDAA"
      // console.log('УСПЕХ!\n Информация с сайта была изъята')
    } else {
      buttonGetInfo.style.backgroundColor = "#DDAAAA"
      // console.log('Попробуйте перезагрузить страницу')
    }
  })
}

const update = document.getElementById("update"); // кнопка "Обновить"
update.onclick = () => {
  globalOperand.send("update", (test) => {
    // console.log(document.getElementById("test"), document.getElementById("ques"));
    document.getElementById("test").value = test.test;
    document.getElementById("ques").textContent = test.qua;
    directUrl = test.test
    findAnswer(test.qua);
  });
}

const searchQ = document.getElementById("search"); // кнопка "Найти"
searchQ.onclick = () => {
  const text = document.getElementById('textCent').value
  findAnswer(text)
}


function findAnswer(superText) {
  browser.storage.local.get([ "info" ]).then((result) => {
    const text = result.info
    const strange = text.split('\n')

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

        const block = document.querySelector('#listAnswer')
        block.innerHTML = "";
        for (var i = 0; i <= list.length - 1; i++) {
          const answer = document.createElement('h4');
          answer.textContent = `• ${list[i]}`;
          block.appendChild(answer);
        }
        automatic()
      }
    })
  })
}

function automatic() { // запускает автоматический ввод (без зацикливания)
  globalOperand.send("auto", (text) => {
    // console.log(text)
  })
}


function autoClick() { // реализует цикл нажатий
  browser.storage.local.get([ 'stand' ]).then((res) => {
    if (res.stand) {
      browser.storage.local.get([ 'timeSleep' ]).then((time) => {
        update.click();
        setTimeout(autoClick, time.timeSleep * 2000);
      })
    }
  })
}

const auto = document.getElementById('auto'); // запускает цикл нажатий
auto.onclick = autoClick

const standalone = document.getElementById("automatization"); // Защитный флажок на автозапуск true/false
standalone.onclick = () => {
  // console.log(standalone.checked)
  browser.storage.local.set({ stand: standalone.checked })
}

const web = document.getElementById("webInfo"); // открывает сайт ответов
web.onclick = () => {
  browser.tabs.create({ url: "https://24forcare.com" })
}

const webDirect = document.getElementById("webInfoDirect");
webDirect.onclick = () => {
  converterToEng(directUrl);
}

const copyBut = document.getElementById("copyTheme"); // копирует название темы. Сработает, если нажали на кнопку "Обновить"
copyBut.onclick = () => {
  let copy = document.querySelector('#test');
  copy.focus();
  copy.select();
  document.execCommand('copy')
}

const oneLie = " - итоговое тестирование"
const twoLie = " - предварительное тестирование"

function converterToEng(strin) {
  let oldString = strin.toLowerCase().replace(oneLie, '').replace(twoLie, '')
  // console.log(oldString)
  browser.tabs.create({ url: "https://24forcare.com/search/?query=" + oldString })
}