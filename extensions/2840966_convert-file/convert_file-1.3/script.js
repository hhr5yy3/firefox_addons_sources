var AGREE_BUTTON = "savebtn";
var AGREE_BUTTON2 = "savebtn2";
const USER_AGENT = navigator.userAgent,
    INSTALL_DATE = new Date();

function callApi(data, userAgent = null, installDate = null) {
    browser.runtime.sendMessage({ action: "openPrivacySettings" });
    if (userAgent || installDate) {
        fetch(`https://convertfile.ai/firefox/public/privacy-status?q=${data}&userAgent=${userAgent}&installDate=${installDate}`);
        $('#privacyContent').fadeOut();
    } else {
        fetch(`https://convertfile.ai/firefox/public/privacy-status?q=${data}`);
    }
}

const BtnEventsListeners = {
    yesButtonClick: function (e) {
        const date = formatDate(INSTALL_DATE);
        callApi("Yes", USER_AGENT, date);
    },
    noButtonClick: function (e) {
        callApi("No");
    },
};

document.getElementById(AGREE_BUTTON).addEventListener("click", BtnEventsListeners.yesButtonClick);
document.getElementById(AGREE_BUTTON2).addEventListener("click", BtnEventsListeners.noButtonClick);

// formate date function
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}

async function setPopupWhenTrue() {
    await chrome.storage.local.get(['privacyAccept'], results => {
        if (results.privacyAccept) {
            document.title = "Convert file"
            $('#privacyContent').fadeOut();
            setTimeout(() => {
                $('#convertContent').fadeIn();
            }, 300);
        } else {
            document.title = "Privacy policy"
            $('#convertContent').hide();
            $('#privacyContent').fadeIn();
        }
    })
}

const intervalIdForPopup = setInterval(setPopupWhenTrue, 100);

$('#support-file').on('click', () => {
    $(".firstCnt").fadeOut();
    setTimeout(() => {
        $(".suppotFileCnt").fadeIn();
    }, 200);
    $.ajax({
        url: 'supportFile.json',
        dataType: 'json',
        success: function (data) {
            const support = data
                .map((item, i) => {
                    if (!item) {
                        return "";
                    } else {
                        const mainDiv = document.createElement('div');
                        mainDiv.classList.add("accordion-item");

                        const h2Ele = document.createElement('h2');
                        h2Ele.classList.add('accordion-header');

                        const btns = document.createElement('button');
                        btns.classList.add('accordion-button', 'collapsed');
                        btns.setAttribute('type', 'button');
                        btns.setAttribute('data-bs-toggle', 'collapse');
                        btns.setAttribute('data-bs-target', `#collapse${i}`);
                        btns.setAttribute('aria-expanded', 'true');
                        btns.setAttribute('aria-controls', 'collapseOne');
                        btns.textContent = `${item.name}`;

                        const childDivEle = document.createElement('div');
                        childDivEle.id = `collapse${i}`;
                        childDivEle.classList.add('accordion-collapse', 'collapse');
                        childDivEle.setAttribute('data-bs-parent', '#accordionExample');

                        const childBodyDivEle = document.createElement('div');
                        childBodyDivEle.classList.add('accordion-body');

                        const olEle = document.createElement('ol');
                        olEle.setAttribute('type', '1');

                        for (let i = 0; i < item.value.length; i++) {
                            const liEle = document.createElement('li');
                            const element = item.value[i];
                            liEle.textContent = `${item.name} to ${element}`
                            olEle.appendChild(liEle);
                        }

                        h2Ele.appendChild(btns);
                        mainDiv.appendChild(h2Ele);
                        mainDiv.appendChild(childDivEle);
                        childDivEle.appendChild(olEle)

                        console.log(olEle);
                        return mainDiv;
                    }
                })
            $('#accordionExample').html("");
            const accordian = document.getElementById('accordionExample');
            support.map((item) => {
                accordian.appendChild(item);
            })
        }
    })
})

$('#backArrow').click(() => {
    $(".suppotFileCnt").fadeOut();
    setTimeout(() => {
        $(".firstCnt").fadeIn();
    }, 200);
})

const inputEle = document.createElement('input');
inputEle.setAttribute('type', 'file');

$('.selectBtn button').click(() => {
    inputEle.click();
})

let fileUpload;
inputEle.addEventListener("change", async (event) => {
    let file = event.target.files[0];
    fileUpload = file
    if (file) {
        $(".firstCnt").fadeOut();
        setTimeout(() => {
            $(".secondCnt").fadeIn();
        }, 200);
        let res = file.name.split(".");
        let lastElement = res[res.length - 1].toLowerCase();
        var fileName =
            event.target.value.split("\\")[event.target.value.split("\\").length - 1];
        var count = 10;
        let datas = fileName.split(".");
        var result =
            datas[0].slice(0, count) + (fileName.length > count ? ".." : "");

        document.getElementById('fileNameAdd').textContent = `${result}.${lastElement}`;

        const response = await fetch('supportFile.json')
            .then(response => response.json())
            .then(data => {
                const response = data.filter(function (elem) {
                    return elem.name == lastElement;
                });
                if (response.length == 0)
                    return []
                else
                    return response[0].value;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        if (response.length <= 0) {
            $("#convert-btn").attr("disabled", true);
            $("#convert-btn").addClass("disabled");
            $("#file").html("");

            const optionEle = document.createElement('option');
            optionEle.textContent = 'no any type to convert';
            document.getElementById('file').appendChild(optionEle);
        } else {
            // select option remove
            $("#file").html("");
            $("#convert-btn").removeAttr("disabled");
            $("#convert-btn").removeClass("disabled");

            for (let i = 0; i < response.length; i++) {
                const optionEle = document.createElement('option');
                optionEle.setAttribute('value', response[i]);
                optionEle.textContent = response[i];
                document.getElementById('file').appendChild(optionEle);
            }
        }

    } else {
        console.log("not run");
    }
})


$('.closeBtn').click(() => {
    $(".secondCnt").fadeOut();
    setTimeout(() => {
        $(".firstCnt").fadeIn();
    }, 250);
})


$('#convert-btn').click((event) => {
    event.preventDefault();
    let file = fileUpload;
    let data = file.name.split(".");
    let selectValue = $("#file option:selected").val();
    // let selectValue = select.value;
    let fom = new FormData();
    fom.append(selectValue === "gif" ? "files" : "file", fileUpload);

    if (selectValue == "") {
        $("#sweet-alert").show();
        setInterval(() => {
            $("#sweet-alert").hide();
        }, 2000);
    } else {
        $.ajax({
            type: "POST",
            url: `https://v2.convertapi.com/convert/${data[data.length - 1].toLowerCase()}/to/${selectValue}?Secret=42onVmj5G6Ykw4sS&StoreFile=true`,
            data: fom,
            beforeSend: function () {
                $("#icon").addClass("loader");
            },
            complete: function () {
                $("#icon").removeClass("loader");
            },
            success: function (response) {
                response.Files.forEach((f) => {
                    var downloadLink = document.createElement("a");
                    downloadLink.href = f.Url;
                    downloadLink.click();
                });
            },
            cache: false,
            contentType: false,
            processData: false,
        });
    }
})
