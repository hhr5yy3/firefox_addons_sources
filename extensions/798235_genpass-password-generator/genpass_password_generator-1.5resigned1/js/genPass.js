document.addEventListener("DOMContentLoaded", function(){

// console.log(ScriptEngineMinorVersion());
//var form_genPassword = document.querySelectorAll("form"); 
var form_genPassword = document.forms.form_genPassword,
    genPass = document.getElementById("genPass"),
    genOutput = document.getElementById("genOutput"),
    saveText = document.getElementById("saveTextAsFile"),
    defaultRange = parseInt(document.getElementById('gp_len_range_1').value||0),
    fields = {};

for(var i=0; i<form_genPassword.length; i++) {

    if(form_genPassword[i].type == "text" || form_genPassword[i].type == "hidden"){
        if(fields[form_genPassword[i].name] == undefined){
            //fields[form_genPassword[i].name] = {};
        }
        fields[form_genPassword[i].name] = form_genPassword[i].value;
        form_genPassword[i].disabled = true;
    }

    if(form_genPassword[i].type == "range"){
        var range = form_genPassword;
        
        if(fields[range[i].name] == undefined){
            fields[range[i].name] = {};
        }
        fields[range[i].name][range[i].dataset.value ||0] = range[i].value;

        if(range[i]) {
            document.getElementById(range[i].name.slice(0, -(range[i].type.length+1)) + '_count_' + (range[i].dataset.value ||0)).innerHTML = '<b>' + range[i].value +'</b>';
            range[i].addEventListener('input',handleEvent,false);
            range[i].addEventListener('change',handleEvent,false);
        }
    }

    if(form_genPassword[i].type == "checkbox"){
        if(fields[form_genPassword[i].name] == undefined){
            fields[form_genPassword[i].name] = {};
        }
        fields[form_genPassword[i].name][form_genPassword[i].value] = form_genPassword[i].checked ? 1 : 0;
    }

    if(form_genPassword[i].type == "radio"){
        form_genPassword[i].disabled = true;
    }

    form_genPassword[i].onclick = function(e) {
        if(e.target.type == "checkbox"){
            fields[this.name][this.value] = this.checked ? 1 : 0;
            genPass.click();               
            // console.log(fields);
            if(this.value == "phrase") {
                var inputId = document.getElementsByName(this.name + '_' + (this.dataset.value || this.value))[0];
                var radioId = document.getElementsByName(this.name + '_' + (this.dataset.value || this.value) + '_mode');
                if(inputId) {
                    inputId.disabled = this.checked ? false : true;
                    inputId.style.borderColor = this.checked ? "#44A047" : '';
                    inputId.focus();
                }
                if(radioId){
                    for(var n in radioId){
                        radioId[n].disabled = this.checked ? false : true;
                    }
                }
            }
        }
    }

    form_genPassword[i].onchange = function(e) {      
        if(e.target.type == "radio"){
            fields[this.name] = this.value;
            genPass.click();
        }
    }    

    //input данные
    form_genPassword[i].onkeyup = function(e){
        //коррекция значений полей ввода
        e.target.value = trim(this.value);
        if(e.target.type == "text"){
            fields[this.name] = this.value;
            if(fields['gp']['phrase']) {
                genPass.click();
            }
        }
    }
}

//случайный пароль   
window.onload = function(){
    genPass.click();//или genPass.click=function; без onload
    saveText.onclick = saveTextAsFile;//скачать файлом запуск функции

    //=================================================
    //copyToClipboard при клике & выделении [IE 10+, Chrome 43+ и Opera 29+]
    copyToClipboard = function(){};
    copyToClipboard.prototype = {
        init: {
                "selection": null,
                "seltext": '',
                "thisSelected": false,
                "range": null
            },

        initialiize: function(data){
            // this.init = data || {};
            for(var n in data){
                this.init[n] = data[n];
            }
        },

        selection: function(e){//выделении текста мышью
            var thisSelected = false, seltext, selection;
            //если используем выделение (сперва эта проверка!)
            if(window.getSelection){//метод для всех
                selection = window.getSelection();
                seltext = selection.toString();
                if(seltext.length > 0) {//выделение
                    if(~navigator.sayswho.indexOf('IE')+1)//если не IE, т.к. баг он не вставляет перенос строки в переносе текста на новую строку => копируем все строки
                        thisSelected = true;
                }
            } else {//IE8-, исп. объект selection
                selection = document.selection.createRange();
                seltext = selection.text;
                if(seltext.length > 0) {
                    thisSelected = true;
                }
            }
            //this.init([selection, seltext, thisSelected]);
            this.initialiize({
                "selection": selection,
                "seltext": seltext,
                "thisSelected": thisSelected
            });

            this.copy(e);
        },

        range: function(e){//выделение при клике
            // this.selection(e);
            //выделяем кликнутую область
            if(document.body.createTextRange && document.body.createTextRange() != undefined) {//TextRange для IE
                var range = document.body.createTextRange();
                range.moveToElementText(e.target);
                // if(window.getSelection().toString().length == 0) 
                range.select();//range.text
            } else {//Range
                var range = document.createRange(); 
                range.selectNode(e.target);
                if(window.getSelection){//метод для всех
                    if(window.getSelection().toString().length == 0) //это не выделение символов/строк
                        window.getSelection().addRange(range);
                }
            }
            this.init['range'] = range;
            this.copy(e);
        },

        copy: function(e){//копируем в буфер выделенную область

            try {
                if(window.clipboardData) {
                    if(this.init['thisSelected'])
                        var successful = window.clipboardData.setData("Text", this.init['seltext']);//IE
                    else
                        var successful = window.clipboardData.setData("Text", this.init['range'].text);//IE
                    //range.execCommand("ForeColor", false, "#ff0033");
                } else if(e.clipboardData) {
                    var successful = e.clipboardData.setData("Text", this.init['range'].text);//others
                }
                if(successful == true) {
                    if(this.init['thisSelected'])
                        // console.log('"'+this.init['seltext']+'" скопирован в буфер!', [this.init['selection'].anchorNode.parentNode.dataset.num, this.init['selection'].focusNode.parentNode.dataset.num]);
                         this.showTip(e, '"'+this.init['seltext']+'" скопирован в буфер!', [this.init['selection'].anchorNode.parentNode.dataset.num, this.init['selection'].focusNode.parentNode.dataset.num]);
                    else
                        // console.log('"'+this.init['range'].text+'" скопирован в буфер!');
                         this.showTip(e, '"'+this.init['range'].text+'" скопирован в буфер!');
                } else {
                    //пытаемся скопировать современным способом
                    if(!document.queryCommandSupported('copy')) console.log('Копирование не поддерживается'); //проверка поддержки
                    //выбрали текст ссылки, выполним команду копирования
                    var successful = document.execCommand('copy');  
                    if(successful == true) {
                        if(this.init['thisSelected'])
                            // console.log('"'+this.init['seltext']+'" скопирован в буфер!', [this.init['selection'].anchorNode.parentNode.dataset.num, this.init['selection'].focusNode.parentNode.dataset.num]);
                             this.showTip(e, '"'+this.init['seltext']+'" скопирован в буфер!', [this.init['selection'].anchorNode.parentNode.dataset.num, this.init['selection'].focusNode.parentNode.dataset.num]);
                        else
                            // console.log('"'+this.init['range'].toString()+'" скопирован в буфер!');
                             this.showTip(e, '"'+this.init['range'].toString()+'" скопирован в буфер!');
                    } else 
                        //console.log('Ошибка копирования в буфер.');
                         this.showTip(e, 'Ошибка копирования в буфер.');
                }

            } catch(err) { 
                console.log(err);
                console.log('Копирования в буфер не поддерживается.');
                this.showTip(e, 'Копирования в буфер не поддерживается.');
            }
        },

        //показ.всплывающего тултипа
        showTip: function(e, msg, range) {
            e = e || window.event;
            msg = msg || "Скопировано";
            var range = range || [];
            var that = e.target;

            if(range[0] != range[1] && range[0] != undefined && range[1] != undefined && that.children.length >0) {//нес-ко строк
                that = that.children[range[0]];
            }

            that.dataset.tooltips = msg.replace(/\n/g, " ");
            // if(navigator.sayswho.indexOf('IE')+1)
            that.setAttribute("data-tooltips", msg.replace(/\n/g, " "));
            that.className = 'view';
            //убираем
            setTimeout(function(){
                that.dataset.tooltips = "";
                that.setAttribute("data-tooltips", '');
                that.className = 'hide';
            }, 2000);
        }

    };//copyToClipboard

    obj = new copyToClipboard();



    genOutput.onclick = function(e){
        if((e.target.nodeName == 'LI' && e.target.tagName == 'LI' && e.target.localName == 'li')
            || (e.target.nodeName == 'OL' && e.target.tagName == 'OL' && e.target.localName == 'ol')
            || (e.target.nodeName == 'UL' && e.target.tagName == 'UL' && e.target.localName == 'ul')
            ){
            // console.log('click');
            obj.range(e);
            // console.log([obj.init['selection'],obj.init['seltext'],obj.init['thisSelected']]);
        }
    }

}//window.onload 


function handleEvent(slider) {
    var slider = this;
    if(fields[slider.name] == undefined){
        fields[slider.name] = {};
    }
    if(fields[slider.name][slider.dataset.value || 0] == slider.value) return;// обработчик уж вызывался или убрать change событие

    fields[slider.name][slider.dataset.value || 0] = slider.value;//до формулы (глоб.видимость)
    //console.log(fields);
    //вывод значения range ползунка
    var inputName = slider.name.slice(0, -(slider.type.length+1));//slider.type="range"
    if(fields[inputName] == undefined){
        fields[inputName] = {};
    }
    var countName = document.getElementById(inputName + '_count_' + (slider.dataset.value ||0));
    if(countName) {
        countName.innerHTML = '<b>' + slider.value +'</b>';
        var inputId = document.getElementById(inputName + '[' + (slider.dataset.value ||0) + ']');
        if(inputId) {
            inputId.value = slider.value;
            if(slider.value >0) {
                // fields[inputName][slider.dataset.value || 0] = slider.value;
                fields[inputName] = slider.value;
                inputId.disabled = false;
            } else {
                // delete fields[inputName][slider.dataset.value || 0];
                delete fields[inputName];
                inputId.disabled = true;
            }
        }
    }
    // console.log(fields);
    genPass.click();
    //fireClick(genPass);//эмулируем событие клика
}
    // console.log(fields);

    //удаление пробелов
    var trim = function(str){
         return str.replace(/\s+/g,"");
    }

    //запуск генератора
    genPass.onclick = function(){
        genOutput.style.opacity = 0;
        saveText.disabled = true;
        var count = fields['gp_count'] || 1;
        var length = fields['gp_len'];
        // alert(fields['gp'].indexOf("@"));
        // if(fields['gp'].indexOf(1)+1) return false;
        if(isNaN(length) || length == 0) return false;

        generatePassword(length, count);
        //console.log(ArrPassword);

        if(fields['gp']['phrase'] == true) {
            if(fields['gp_phrase'].length > 0) {
                var phraseConvert = [];
                for(var c = 0, len = ArrPassword.length; c < len; c++) {
                    phraseConvert.push(LetterCaseConverter(fields['gp_phrase'], 6));
                }
                mixPassword(phraseConvert, fields['gp_phrase_mode'] || 'lr', ArrPassword);//после generatePassword()
            }
        }

        var ul = document.createElement('ol');
        for (var n in ArrPassword) {
            var newLi = document.createElement('li');
            if(document.all){//испр. бага Firefox 42
                newLi.innerText = ArrPassword[n];
                newLi.setAttribute("data-tooltips", '');
                newLi.setAttribute("data-num", n);
            } else{
                newLi.textContent = ArrPassword[n];
                newLi.setAttribute("data-tooltips", '');
                newLi.setAttribute("data-num", n);
            }
            ul.appendChild(newLi);
        }

        if(self.genOutput){//если есть
            if(genOutput.children.length>0)
                genOutput.removeChild(genOutput.children[0]);            
            genOutput.appendChild(ul);//показываем их в дереве
            genOutput.style.opacity = 1;
            saveText.disabled = false;
        }
    }

    //passwordgenerator [https://gist.github.com/gehaxelt/2853700]
    var charset="";
    function generatePassword(length, count) {
        var length = length || 7; var count = count || 1;
        setCharset();
        ArrPassword = [];
        for(var i=0;i<count;i++) {
            ArrPassword.push(genRandomPass(length));
        }
    }
    function genRandomPass(len) {
        var pass="";
        for(var i=0;i<len;i++)
            pass=pass+charset.charAt(randomNum(0,charset.length));
        return pass;    
    }
    function setCharset() {
        charset="";
        if(fields['gp']['big'] == true) {
            for(var i=65;i<=90;i++) 
                charset=charset+String.fromCharCode(i);
            }
        if(fields['gp']['small'] == true) {
            for(var i=97;i<=122;i++) 
                charset=charset+String.fromCharCode(i);
            }
        if(fields['gp']['nums'] == true) {
            for(var i=48;i<=57;i++) 
                charset=charset+String.fromCharCode(i);
            }
        if(fields['gp']['extra'] == true) {
            for(var i=33;i<=47;i++) 
                if(!(i==34||i==39||i==47))
                        charset=charset+String.fromCharCode(i);
            for(var i=58;i<=64;i++) 
                charset=charset+String.fromCharCode(i);
            for(var i=91;i<=96;i++) 
                if(!(i==92||i==96))
                    charset=charset+String.fromCharCode(i);
            for(var i=123;i<=126;i++) 
                charset=charset+String.fromCharCode(i);
            }
    }
    function randomNum(min,max) {
        return Math.floor(Math.random()* (max-min) + min);
    }

    //смешивание с фразой
    function mixPassword(arrPhrase, mode, arrPass){
        //var arrPass = typeof arrPass !== 'undefined' ?  arrPass : [];
        var arrPass = arrPass || [];
        switch(mode){
            case 'l'://слева
                ArrPassword = arrPass.map(function(val, index) {
                  return arrPhrase[index] + val;
                });
            break;

            case 'r'://справа
                ArrPassword = arrPass.map(function(val, index) {
                  return val + arrPhrase[index];
                });
            break;

            default://lr с обеих сторон
                ArrPassword = arrPass.map(function(val, index) {
                    var pos = val.length/2|0;
                  return val.substring(0, pos) + arrPhrase[index] + val.substring(pos);
                });
            break;
        }
    //return ArrPassword;
    }

    //преобразование регистра
    function LetterCaseConverter(oldText, mode) {
        var i, convert, newstr, symbol;
        switch(mode){
            case 1://ВЕРХНИЙ РЕГИСТР
                oldText = oldText.toUpperCase();
            break;

            case 2://НИЖНИЙ РЕГИСТР
                oldText = oldText.toLowerCase();
            break;

            case 3://первый символ слова в предложении
                oldText = oldText.toLowerCase();
                newstr = true;
                convert = '';
                for (i = 0; i < oldText.length; i++) {
                    symbol = oldText.charAt(i);
                    if (/\.|\!|\?|\n|\r/ .test(symbol)) {
                        newstr = true;
                    } else {
                        if (!(/\s+|\n|\r/ .test(symbol)) && (newstr)) {
                            symbol = symbol.toUpperCase();
                            newstr = false;
                        };
                    };
                    convert += symbol;
                };
                oldText = convert;
            break;

            case 4://Каждое Слово С Заглавной Буквы
                newstr = true;
                convert = '';
                for (i = 0; i < oldText.length; i++) {
                    symbol = oldText.charAt(i);
                    if (/\.|\!|\,|\;|\:|\s+|\?|\n|\r/ .test(symbol)) {
                        newstr = true;
                    } else {
                        if (newstr) {
                            symbol = symbol.toUpperCase();
                            newstr = false;
                        };
                    };
                    convert += symbol;
                };
                oldText = convert;
            break;            

            case 5://чЕрЕдОвАнИе рЕгИсТрОв
                oldText = oldText.toLowerCase();
                convert = '';
                for (i = 0; i < oldText.length; i++) {
                    symbol = oldText.charAt(i);
                    if (i % 2) {
                        convert += symbol.toUpperCase();
                    } else {
                        convert += symbol;
                    };
                };
                oldText = convert;
            break;

            case 6://ПРоиЗВольнАЯ тРансФОРмАциЯ
                convert = '';
                for (i = 0; i < oldText.length; i++) {
                    if (Math.random() > 1 / 2) {
                        convert += oldText.charAt(i).toUpperCase();
                    } else {
                        convert += oldText.charAt(i).toLowerCase();
                    };
                };
                oldText = convert;
            break;            

        }
        return oldText;
    }

    //save text, скачать файлом
    function saveTextAsFile() {
        var blob = new Blob([genOutput.innerText.replace(/\n/g, "\r\n")], {
            type: 'text/plain;charset=utf-8'
        });
        var filename = 'Password.txt';
        if(navigator.sayswho.indexOf('IE')+1){
            window.navigator.msSaveBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.innerHTML = 'Download File' + filename;
            if (window.webkitURL != null) {
                a.href = window.webkitURL.createObjectURL(blob);
            } else {
                a.href = window.URL.createObjectURL(blob);
                a.style.display = 'none';
                document.body.appendChild(a);
            };
            a.click();
        }
    };

    //опр.браузера
    navigator.sayswho = (function(){
        var ua= navigator.userAgent, tem, 
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })();

});
