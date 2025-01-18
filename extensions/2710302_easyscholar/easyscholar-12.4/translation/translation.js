let default_translateWhere = "googleMirro";
let default_translateKeycode = "84";
let default_translateHideKeycode = "89";
let default_translateColor = "#55aaff";
let default_translatePosition = "after";
let default_translateOpen = true;

let translateWhere;
let translateKeycode;
let translateColor;
let translatePosition;
let translateHideKeycode;
let translateOpen;

let copy_svg = "<svg t=\"1712068889598\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5365\" width=\"16\" height=\"16\"><path d=\"M866.133333 919.466667h-405.333333c-29.866667 0-53.333333-23.466667-53.333333-53.333334v-618.666666c0-29.866667 23.466667-53.333333 53.333333-53.333334h405.333333c29.866667 0 53.333333 23.466667 53.333334 53.333334v618.666666c0 29.866667-23.466667 53.333333-53.333334 53.333334z\" fill=\"#69C0FF\" p-id=\"5366\"></path><path d=\"M770.133333 428.8h-213.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333334h213.333333c12.8 0 21.333333 8.533333 21.333334 21.333334s-10.666667 21.333333-21.333334 21.333333zM770.133333 556.8h-213.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333334h213.333333c12.8 0 21.333333 8.533333 21.333334 21.333334s-10.666667 21.333333-21.333334 21.333333zM770.133333 684.8h-213.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333334h213.333333c12.8 0 21.333333 8.533333 21.333334 21.333334s-10.666667 21.333333-21.333334 21.333333z\" fill=\"#FFFFFF\" p-id=\"5367\"></path><path d=\"M567.466667 834.133333h-405.333334c-29.866667 0-53.333333-23.466667-53.333333-53.333333v-618.666667c0-29.866667 23.466667-53.333333 53.333333-53.333333h405.333334c29.866667 0 53.333333 23.466667 53.333333 53.333333v618.666667c0 29.866667-23.466667 53.333333-53.333333 53.333333z\" fill=\"#1890FF\" p-id=\"5368\"></path><path d=\"M471.466667 343.466667h-213.333334c-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333h213.333334c12.8 0 21.333333 8.533333 21.333333 21.333333s-10.666667 21.333333-21.333333 21.333334zM471.466667 471.466667h-213.333334c-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333h213.333334c12.8 0 21.333333 8.533333 21.333333 21.333333s-10.666667 21.333333-21.333333 21.333334zM471.466667 599.466667h-213.333334c-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333h213.333334c12.8 0 21.333333 8.533333 21.333333 21.333333s-10.666667 21.333333-21.333333 21.333334z\" fill=\"#FFFFFF\" p-id=\"5369\"></path></svg>"

$(function () {
    chrome.storage.local.get({
        "translateWhere": default_translateWhere, "translateKeycode": default_translateKeycode,
        "translateColor": default_translateColor, "translatePosition": default_translatePosition,
        "translateHideKeycode": default_translateHideKeycode, "translateOpen": default_translateOpen
    }, function (items) {
        translateWhere = items.translateWhere;
        translateKeycode = items.translateKeycode;
        translateHideKeycode = items.translateHideKeycode;
        translateColor = items.translateColor;
        translatePosition = items.translatePosition;
        translateOpen = items.translateOpen;
    });
});

$(document).keydown(
    function (e) {
        if (translateOpen) {
            let keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
            if (keyCode == parseInt(translateKeycode)) {
                let userSelection = window.getSelection();
                let userSelectionNode = window.getSelection().anchorNode.parentElement;
                if (!userSelectionNode.closest('[contenteditable="true"], [contenteditable=""]')
                && $(userSelectionNode).find("textarea").length == 0
                && $(userSelectionNode).find("input").length == 0) {
                    let userSelection_string = removeSomeTranslate(userSelection.toString());
                    if (userSelection_string.length > 0 && userSelection_string.length < 30000) {
                        getTranslate(userSelection_string);
                    }
                }
            } else if (keyCode == parseInt(translateHideKeycode)) {
                if ($(".easyScholarTranslationResult").length > 0) {
                    hideTranslateResult();
                }
            }
        }
    });

function removeSomeTranslate(userSelection_string){
    let result_list = $("span.easyscholar-ranking");
    if(!result_list){
        return userSelection_string;
    }
    for(let i = 0; i <= result_list.length; i++){
        let single = result_list[i];
        let text = $(single).text();
        if (!text){
            continue;
        }
        if(text.length <= 4 && text !== "简介"){
            continue;
        }
        userSelection_string = userSelection_string.replace(text, "");
    }
    return userSelection_string;
}

function getTranslate(row_data) {
    chrome.storage.local.get({
        "translateWhere": default_translateWhere, "translateKeycode": default_translateKeycode,
        "translateColor": default_translateColor, "translatePosition": default_translatePosition,
        "translateHideKeycode": default_translateHideKeycode, "translateOpen": default_translateOpen
    }, function (items) {
        translateWhere = items.translateWhere;
        translateKeycode = items.translateKeycode;
        translateHideKeycode = items.translateHideKeycode;
        translateColor = items.translateColor;
        translatePosition = items.translatePosition;
        translateOpen = items.translateOpen;
        // 确定翻译源
        let actionNormal = "谷歌翻译";
        let action = "trans_google";
        if (translateWhere == "keyan") {
            action = "trans_keyan";
            actionNormal = "棵岩阅读";
        }else if (translateWhere == "sougou"){
            action = "trans_sougou";
            actionNormal = "搜狗翻译";
        }else if (translateWhere == "youdao"){
            action = "trans_youdao";
            actionNormal = "有道翻译";
        }else if (translateWhere == "caiyunweb"){
            action = "trans_caiyunweb";
            actionNormal = "彩云小译";
        }else if (translateWhere == "googleMirro"){
            action = "trans_google_mirro";
            actionNormal = "谷歌翻译镜像";
        }else if (translateWhere == "xiaoniu"){
            action = "trans_xiaoniu";
            actionNormal = "小牛翻译";
        }else if (translateWhere == "reverso"){
            action = "trans_reverso";
            actionNormal = "Reverso翻译";
        }else if (translateWhere == "yandex"){
            action = "trans_yandex";
            actionNormal = "Yandex翻译";
        }else if (translateWhere == "google"){
            action = "trans_google";
            actionNormal = "谷歌翻译";
        }

        // 确定翻译位置
        let userSelection = window.getSelection();
        let range = userSelection.getRangeAt(0);
        if (translatePosition == "after") {
            range.collapse(false);
        } else {
            range.collapse(true);
        }

        // 找出最大的value值
        let TranslationResultSpanVlue = 0;
        $(".easyScholarTranslationResult").each(
            function () {
                let temp = parseInt($(this).attr("value"));
                if (temp > TranslationResultSpanVlue) {
                    TranslationResultSpanVlue = temp;
                }
            }
        );
        TranslationResultSpanVlue += 1;
        //
        let random = Math.floor(Math.random() * 100000);
        let id = "easyScholarTranslationResult" + random;


        let copy = $('<span  class="easyScholarDOI" href="Javascript:void(0)">' + copy_svg + '</>');
        $(copy).attr("class", "easyScholarTranslationResult");
        $(copy).css("cursor", "pointer");
        $(copy).attr("value", TranslationResultSpanVlue);
        $(copy).click(function (){
            let text = document.getElementById(id);
            copy_function(text.innerText.trim());
        });
        range.insertNode($(copy).get(0));


        let el = document.createElement("span");
        el.textContent = actionNormal + "正在翻译... ";
        $(el).attr("id", id);
        $(el).css("color", translateColor);
        $(el).css("font-weight", "bold");
        $(el).attr("class", "easyScholarTranslationResult");
        $(el).attr("value", TranslationResultSpanVlue);
        range.insertNode(el);

        chrome.runtime.sendMessage({
                action: action,
                data: row_data
            },
            function (data) {
                if (data == undefined) {
                    el.textContent = "  " + actionNormal + "服务暂时不可用，请稍后再试" + "  ";
                } else {
                    if(action == "trans_keyan"){
                        el.textContent = "  " + data + "  ";
                        $(el).append($("<a href='https://www.keyanyuedu.com/?channel=easyscholar' target='_blank'>棵岩阅读一键翻译全文</a>"));
                    }else if (action == "trans_sougou"){
                        el.textContent = "  " + $(data).find("#trans-result").text() + "  ";
                    }else {
                        el.textContent = "  " + data;
                    }
                }
            })
    });

};

function hideTranslateResult() {
    let TranslationResultSpanVlue = 0;
    $(".easyScholarTranslationResult:visible").each(
        function () {
            let temp = parseInt($(this).attr("value"));
            if (temp > TranslationResultSpanVlue) {
                TranslationResultSpanVlue = temp;
            }
        }
    );
    $(".easyScholarTranslationResult[value=" + TranslationResultSpanVlue + "]").hide();
};

function copy_function(text) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    document.execCommand('copy');
    infoNotice("复制成功", "success", "3000");
    document.body.removeChild(input);
};



function infoNotice(text, type, timer = 6000, showConfirmButton = false, showDenyButton = false) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: showConfirmButton,
        confirmButtonText: "好的",

        showDenyButton: showDenyButton,
        denyButtonText: '已阅，一日内不再弹出',

        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


    chrome.storage.local.get({
        "dialog_check_time": "2022-1-02",
    }, function (items) {
        let lastTime = new Date(items["dialog_check_time"]);
        let date = new Date();
        let curTimeSimple = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        let curTime = new Date(curTimeSimple);
        let days = parseInt(Math.abs(curTime - lastTime) / 1000 / 60 / 60 / 24); //把差的毫秒数转换为天数
        // 点击一日内不弹出，会重置为当前的时间。当差值>=1时，会弹出
        if (days >= 1) {
            Toast.fire({
                icon: type,
                title: "easyScholar提示您：" + text
            }).then((result) => {
                if (result.isDenied) {
                    console.log(curTimeSimple)
                    chrome.storage.local.set({
                        "dialog_check_time": curTimeSimple,
                    });
                }
            });
        }
    });
};