var fileupload = document.getElementById("FileUpload1");
var filePath = document.getElementById("spnFilePath");
var button = document.getElementById("btnFileUpload");
var removeFile = document.getElementById("removefile");
const searchBox = document.getElementById("search-box");
const searchTopBox = document.getElementById("search-top");
const suggestions = document.getElementById("suggestions");
const closeBtn = document.getElementById("closebtn");
let select = document.getElementById("file");


$('#footer').on('click', function () {  
  if ($(".setting").attr('id')) {
    $("#footer_ff").removeAttr('id', "none");
  } else {
    $(".setting").attr('id', 'footer_ff');
  }
})

$('#footerClose').on('click', function () {
  $(".setting").attr('id', 'footer_ff');
})

// add popup started

if (!localStorage.getItem('firstTime_using_online_tools__')) {
  localStorage.setItem('firstTime_using_online_tools__', true)
  document.getElementById('keep').style.display = 'block'
}

// =========================================== strat from here today

$('#popup').show()
$('#popup_2').hide()
$("#alert").hide()
$("#alert2").hide()
$('#ConvertFiles2').hide();
$('#ConvertFiles3').hide();
$('.loader4').hide();
$('#backToPopup1').click((e) => {
  e.preventDefault()
  $('#popup').show()
  $('#popup_2').hide()
  $('#file1').val('')
  $('#ConvertFiles').removeClass('showBtn');
  $('#ConvertFiles2').hide();
  $('#ConvertFiles3').hide();
  $("#alert").hide()
  $("#alert2").hide()
  $('.text').show()
  $('#fileName').html('')
})
$('.close_button').click(() => {
  $('#popup').hide()
  $('#popup_2').hide()
  $("#getList").html('')
  $("#addList1").html('')
  $("#addList2").html('')
  $("#addList3").html('')
  $('#file1').val('')
  $('#ConvertFiles').removeClass('showBtn');
  $('#ConvertFiles2').hide();
  $('#ConvertFiles3').hide();
  $("#alert").hide()
  $("#alert2").hide()
  $('.text').show()
  $('#fileName').html('')
})
$('#exampleModal1').on('hidden.bs.modal', function () {
  $('#popup').hide()
  $('#popup_2').hide()
  $(".getList").html('')
  $(".addList1").html('')
  $(".addList2").html('')
  $(".addList3").html('')
  $('#file1').val('')
  $("#alert").hide()
  $("#alert2").hide()
  $('#ConvertFiles').removeClass('showBtn');
  $('.text').show()
  $('#fileName').html('')
})
$('#closeAlert').click(() => {
  $('#alert').hide()
})
$('#closeAlert2').click(() => {
  $('#alert2').hide()
  $('#alertAdd').html("")
})
$('.openpop').click(() => {
  /* eslint-disable no-undef */
  if (document.getElementById('keep'))
    document.getElementById('keep').remove();
  $('#popup').show()
  $.ajax({
    url: 'supportFile.json',
    dataType: 'json',
    success: function (data) {
      const litsTitle = Object.keys(data).filter((item) => {
        return item
      })
      litsTitle.map((item, i) => {

        const removeUnder = item.split("_").join(' ');
        const getlistMainDiv = document.createElement('div');
        const getlistSubDiv = document.createElement('div');
        const getTitleDiv = document.createElement('div');
        const getlistH4 = document.createElement('h4');
        const getlistUl = document.createElement('ul');

        getlistMainDiv.classList.add('col-md-4', 'col-sm-6', 'col-12');
        getlistSubDiv.classList.add('listCard');
        getTitleDiv.classList.add('title');
        getlistH4.innerText = removeUnder
        getlistUl.classList.add(`addList${i + 1}`)
        getlistMainDiv.append(getlistSubDiv);
        getlistSubDiv.appendChild(getTitleDiv);
        getTitleDiv.appendChild(getlistH4);
        getlistSubDiv.appendChild(getlistUl);
        $('.getList').append(getlistMainDiv)
      })
      data.PDF_Tools.map((item, i) => {
        const addlistLi = document.createElement('li');
        const addlistImage = document.createElement('img');
        addlistImage.src = "./assets/image/popupArrow.svg"

        addlistLi.classList.add('click');

        addlistLi.innerText = item.name;
        addlistLi.prepend(addlistImage);

        $(".addList1").append(addlistLi)
        $(`li.click`).click((e) => {
          let value = e.target.innerText
          if (item.name == value) {
            $('.convertFileName').text(item.name)
            $('.convertFileTitle').text(item.subject)
            $('.convertFileDesc').text(item.desc)
          }
          if (value == "PDF to OCR" || value == "Repair PDF") {
            $('#passWord').hide()
          } else if (value == "Decrypt PDF") {
            $('#passWord').show()
            $('#decrypt').show()
            $('#encrypt').hide()
            $('#comprass').hide()
            $('#excel').hide()
          } else if (value == "Encrypt PDF") {
            $('#passWord').show()
            $('#decrypt').hide()
            $('#encrypt').show()
            $('#comprass').hide()
            $('#excel').hide()
          } else if (value == "Compress PDF") {
            $('#passWord').show()
            $('#decrypt').hide()
            $('#encrypt').hide()
            $('#comprass').show()
            $('#excel').hide()
          }
          $('#popup').hide()
          $('#popup_2').show()
        })
      })
      data.Convert_to_PDF.map((item, i) => {
        const addlistLi = document.createElement('li');
        const addlistImage = document.createElement('img');
        addlistImage.src = "./assets/image/popupArrow.svg"

        addlistLi.classList.add('click');

        addlistLi.innerText = item.name;
        addlistLi.prepend(addlistImage);

        $(".addList2").append(addlistLi)
        $(`li.click`).click((e) => {
          let value = e.target.innerText
          if (item.name == value) {
            $('.convertFileName').text(item.name)
            $('.convertFileTitle').text(item.subject)
            $('.convertFileDesc').text(item.desc)
          }
          if (value == "Word to PDF" || value == "Excel to PDF" || value == "PNG to PDF" || value == "JPG to PDF" || value == "Powerpoint to PDF") {
            $('#passWord').hide()
          }
          $('#popup').hide()
          $('#popup_2').show()
        })
      })
      data.Convert_from_PDF.map((item, i) => {
        const addlistLi = document.createElement('li');
        const addlistImage = document.createElement('img');
        addlistImage.src = "./assets/image/popupArrow.svg"

        addlistLi.classList.add('click');

        addlistLi.innerText = item.name;
        addlistLi.prepend(addlistImage);
        $(".addList3").append(addlistLi)
        $(`li.click`).click((e) => {
          let value = e.target.innerText
          if (item.name == value) {
            $('.convertFileName').text(item.name)
            $('.convertFileTitle').text(item.subject)
            $('.convertFileDesc').text(item.desc)
          }
          if (value == "PDF to PNG" || value == "PDF to JPG" || value == "PDF to Text") {
            $('#passWord').hide()
          } else if (value == "PDF to Excel") {
            $('#passWord').show()
            $('#decrypt').hide()
            $('#encrypt').hide()
            $('#comprass').hide()
            $('#excel').show()
          }
          $('#popup').hide()
          $('#popup_2').show()
        })
      })
    }
  })
})
const file = document.getElementById('file1')
$('#file1').change(() => {
  $('#ConvertFiles').addClass('showBtn');
  if ($('#file1')[0].files[0] != {}) {
    var fileName = $('#file1')[0].files[0]?.name
    $('.text').hide()
    $('#fileName').text(fileName)
  }
});
$('#fileUpload1').click(() => {
  file.click()
})
$('#ConvertFiles').click((e) => {
  e.preventDefault()
  let file = new FormData();
  file.append("file", $('#file1')[0].files[0])
  var file1 = $('#file1').val()
  var split = file1.split('.')
  var lastWord = split[split.length - 1]
  const checkApiWord = $('#popup_2 #exampleModalLabel')[0].innerText
  const word = checkApiWord.split(' ')
  let firstWord = word[0].toLowerCase()
  let secondWord = word[word.length - 1].toLowerCase()
  let ajaxURL = '';
  if (checkApiWord == "PDF to OCR" || checkApiWord == "Repair PDF") {
    if (lastWord == "pdf") {
      ajaxURL = checkApiWord == "PDF to OCR" ? `https://v2.convertapi.com/convert/${firstWord}/to/${secondWord}?Secret=42onVmj5G6Ykw4sS&StoreFile=true`
        : `https://v2.convertapi.com/convert/${secondWord}/to/${firstWord}?Secret=42onVmj5G6Ykw4sS&StoreFile=true`
    } else {
      $("#alert2").show();
      const mainSpanEle = document.createElement('span');
      const spanEle1 = document.createElement('span');
      spanEle1.innerText = " : Please enter ";
      const spanEle2 = document.createElement('span');
      spanEle2.innerText = " file...!";
      const strongEle1 = document.createElement('strong');
      strongEle1.innerText = "Warning";
      const strongEle2 = document.createElement('strong');
      strongEle2.innerText = "pdf";
      mainSpanEle.appendChild(strongEle1);
      mainSpanEle.appendChild(spanEle1);
      mainSpanEle.appendChild(strongEle2);
      mainSpanEle.appendChild(spanEle2);
      $('#alertAdd').html("");
      $('#alertAdd').append(mainSpanEle);
      ajaxURL = ''
    }
  }
  else if (checkApiWord == "Decrypt PDF") {
    decryptNumber = $("#getLetter").val();
    if (decryptNumber == '') {
      $("#alert").show()
      ajaxURL = ''
    } else {
      if (lastWord == "pdf") {
        ajaxURL = `https://v2.convertapi.com/convert/${secondWord}/to/${firstWord}?Secret=42onVmj5G6Ykw4sS&StoreFile=true&Password=${decryptNumber}`
      } else {
        $("#alert2").show();
        const mainSpanEle = document.createElement('span');
        const spanEle1 = document.createElement('span');
        spanEle1.innerText = " : Please enter ";
        const spanEle2 = document.createElement('span');
        spanEle2.innerText = " file...!";
        const strongEle1 = document.createElement('strong');
        strongEle1.innerText = "Warning";
        const strongEle2 = document.createElement('strong');
        strongEle2.innerText = secondWord;
        mainSpanEle.appendChild(strongEle1);
        mainSpanEle.appendChild(spanEle1);
        mainSpanEle.appendChild(strongEle2);
        mainSpanEle.appendChild(spanEle2);
        $('#alertAdd').html("");
        $('#alertAdd').append(mainSpanEle);
        ajaxURL = ''
      }
    }
  } else if (checkApiWord == "Encrypt PDF") {
    encryptNumber = $("#getLetter1").val();
    encryptNumber2 = $("#getLetter2").val();
    if (encryptNumber == "" && encryptNumber2 == "") {
      $("#alert").show()
      ajaxURL = ''
    } else {
      if (lastWord == "pdf") {
        ajaxURL = `https://v2.convertapi.com/convert/${secondWord}/to/${firstWord}?Secret=42onVmj5G6Ykw4sS&StoreFile=true&UserPassword=${encryptNumber}&OwnerPassword=${encryptNumber2}`
      } else {
        $("#alert2").show();
        const mainSpanEle = document.createElement('span');
        const spanEle1 = document.createElement('span');
        spanEle1.innerText = " : Please enter ";
        const spanEle2 = document.createElement('span');
        spanEle2.innerText = " file...!";
        const strongEle1 = document.createElement('strong');
        strongEle1.innerText = "Warning";
        const strongEle2 = document.createElement('strong');
        strongEle2.innerText = secondWord;
        mainSpanEle.appendChild(strongEle1);
        mainSpanEle.appendChild(spanEle1);
        mainSpanEle.appendChild(strongEle2);
        mainSpanEle.appendChild(spanEle2);
        $('#alertAdd').html("");
        $('#alertAdd').append(mainSpanEle);
        ajaxURL = ''
      }
    }
  } else if (checkApiWord == "Compress PDF") {
    var selectValue = $('#selectValue').find(":selected")[0].value
    if (lastWord == "pdf") {
      ajaxURL = `https://v2.convertapi.com/convert/${secondWord}/to/${firstWord}?Secret=42onVmj5G6Ykw4sS&StoreFile=true&Presets=${selectValue}`
    } else {
      $("#alert2").show();
      const mainSpanEle = document.createElement('span');
      const spanEle1 = document.createElement('span');
      spanEle1.innerText = " : Please enter ";
      const spanEle2 = document.createElement('span');
      spanEle2.innerText = " file...!";
      const strongEle1 = document.createElement('strong');
      strongEle1.innerText = "Warning";
      const strongEle2 = document.createElement('strong');
      strongEle2.innerText = secondWord;
      mainSpanEle.appendChild(strongEle1);
      mainSpanEle.appendChild(spanEle1);
      mainSpanEle.appendChild(strongEle2);
      mainSpanEle.appendChild(spanEle2);
      $('#alertAdd').html("");
      $('#alertAdd').append(mainSpanEle);
      ajaxURL = ''
    }
  } else if (checkApiWord == "Word to PDF" || checkApiWord == "Excel to PDF" || checkApiWord == "PNG to PDF" || checkApiWord == "JPG to PDF" || checkApiWord == "Powerpoint to PDF") {
    if (firstWord == "word") { firstWord = "docx" } else if (firstWord == "excel") { firstWord = "csv" } else if (firstWord == "powerpoint") { firstWord = "ppt" } else { firstWord }
    url = `https://v2.convertapi.com/convert/${firstWord}/to/${secondWord}?Secret=42onVmj5G6Ykw4sS&StoreFile=true`
    if (checkApiWord == "Word to PDF") {
      if (lastWord == "docx") {
        ajaxURL = url
      } else {
        $("#alert2").show();
        const mainSpanEle = document.createElement('span');
        const spanEle1 = document.createElement('span');
        spanEle1.innerText = " : Please enter ";
        const spanEle2 = document.createElement('span');
        spanEle2.innerText = " file...!";
        const strongEle1 = document.createElement('strong');
        strongEle1.innerText = "Warning";
        const strongEle2 = document.createElement('strong');
        strongEle2.innerText = firstWord;
        mainSpanEle.appendChild(strongEle1);
        mainSpanEle.appendChild(spanEle1);
        mainSpanEle.appendChild(strongEle2);
        mainSpanEle.appendChild(spanEle2);
        $('#alertAdd').html("");
        $('#alertAdd').append(mainSpanEle);
        ajaxURL = ''
      }
    } else if (checkApiWord == "Excel to PDF") {
      if (lastWord == "csv") {
        ajaxURL = url
      } else {
        $("#alert2").show()
        const mainSpanEle = document.createElement('span');
        const spanEle1 = document.createElement('span');
        spanEle1.innerText = " : Please enter ";
        const spanEle2 = document.createElement('span');
        spanEle2.innerText = " file...!";
        const strongEle1 = document.createElement('strong');
        strongEle1.innerText = "Warning";
        const strongEle2 = document.createElement('strong');
        strongEle2.innerText = firstWord;
        mainSpanEle.appendChild(strongEle1);
        mainSpanEle.appendChild(spanEle1);
        mainSpanEle.appendChild(strongEle2);
        mainSpanEle.appendChild(spanEle2);
        $('#alertAdd').html("");
        $('#alertAdd').append(mainSpanEle);
        ajaxURL = ''
      }
    } else if (checkApiWord == "PNG to PDF") {
      if (lastWord == "png") {
        ajaxURL = url
      } else {
        $("#alert2").show()
        $("#alert2").show()
        const mainSpanEle = document.createElement('span');
        const spanEle1 = document.createElement('span');
        spanEle1.innerText = " : Please enter ";
        const spanEle2 = document.createElement('span');
        spanEle2.innerText = " file...!";
        const strongEle1 = document.createElement('strong');
        strongEle1.innerText = "Warning";
        const strongEle2 = document.createElement('strong');
        strongEle2.innerText = firstWord;
        mainSpanEle.appendChild(strongEle1);
        mainSpanEle.appendChild(spanEle1);
        mainSpanEle.appendChild(strongEle2);
        mainSpanEle.appendChild(spanEle2);
        $('#alertAdd').html("");
        $('#alertAdd').append(mainSpanEle);
        ajaxURL = ''
      }
    } else if (checkApiWord == "JPG to PDF") {
      if (lastWord == "jpg" || lastWord == "jpeg") {
        ajaxURL = url
      } else {
        $("#alert2").show()
        $("#alert2").show()
        const mainSpanEle = document.createElement('span');
        const spanEle1 = document.createElement('span');
        spanEle1.innerText = " : Please enter ";
        const spanEle2 = document.createElement('span');
        spanEle2.innerText = " file...!";
        const strongEle1 = document.createElement('strong');
        strongEle1.innerText = "Warning";
        const strongEle2 = document.createElement('strong');
        strongEle2.innerText = firstWord;
        mainSpanEle.appendChild(strongEle1);
        mainSpanEle.appendChild(spanEle1);
        mainSpanEle.appendChild(strongEle2);
        mainSpanEle.appendChild(spanEle2);
        $('#alertAdd').html("");
        $('#alertAdd').append(mainSpanEle);
        ajaxURL = ''
      }
    } else {
      if (lastWord == "ppt") {
        ajaxURL = url
      } else {
        $("#alert2").show()
        $("#alert2").show()
        const mainSpanEle = document.createElement('span');
        const spanEle1 = document.createElement('span');
        spanEle1.innerText = " : Please enter ";
        const spanEle2 = document.createElement('span');
        spanEle2.innerText = " file...!";
        const strongEle1 = document.createElement('strong');
        strongEle1.innerText = "Warning";
        const strongEle2 = document.createElement('strong');
        strongEle2.innerText = firstWord;
        mainSpanEle.appendChild(strongEle1);
        mainSpanEle.appendChild(spanEle1);
        mainSpanEle.appendChild(strongEle2);
        mainSpanEle.appendChild(spanEle2);
        $('#alertAdd').html("");
        $('#alertAdd').append(mainSpanEle);
        ajaxURL = ''
      }
    }
  } else if (checkApiWord == "PDF to Excel") {
    if (secondWord == "excel") { secondWord = "csv" }
    filedSpector = $("#getLetter4").val();
    var replace = filedSpector.replace(",", '%2C')
    if (filedSpector == "") {
      $("#alert").show()
      ajaxURL = ''
    } else {
      if (lastWord == "pdf") {
        ajaxURL = `https://v2.convertapi.com/convert/${firstWord}/to/${secondWord}?Secret=42onVmj5G6Ykw4sS&StoreFile=true&Delimiter=${replace}`
      } else {
        $("#alert2").show()
        $("#alert2").show()
        const mainSpanEle = document.createElement('span');
        const spanEle1 = document.createElement('span');
        spanEle1.innerText = " : Please enter ";
        const spanEle2 = document.createElement('span');
        spanEle2.innerText = " file...!";
        const strongEle1 = document.createElement('strong');
        strongEle1.innerText = "Warning";
        const strongEle2 = document.createElement('strong');
        strongEle2.innerText = firstWord;
        mainSpanEle.appendChild(strongEle1);
        mainSpanEle.appendChild(spanEle1);
        mainSpanEle.appendChild(strongEle2);
        mainSpanEle.appendChild(spanEle2);
        $('#alertAdd').html("");
        $('#alertAdd').append(mainSpanEle);
        ajaxURL = ''
      }
    }
  } else if (checkApiWord == "PDF to PNG" || checkApiWord == "PDF to JPG" || checkApiWord == "PDF to Text") {
    if (secondWord == "text") { secondWord = "txt" }
    if (lastWord == "pdf") {
      ajaxURL = `https://v2.convertapi.com/convert/${firstWord}/to/${secondWord}?Secret=42onVmj5G6Ykw4sS&StoreFile=true`
    } else {
      $("#alert2").show()
      $("#alert2").show()
      const mainSpanEle = document.createElement('span');
      const spanEle1 = document.createElement('span');
      spanEle1.innerText = " : Please enter ";
      const spanEle2 = document.createElement('span');
      spanEle2.innerText = " file...!";
      const strongEle1 = document.createElement('strong');
      strongEle1.innerText = "Warning";
      const strongEle2 = document.createElement('strong');
      strongEle2.innerText = firstWord;
      mainSpanEle.appendChild(strongEle1);
      mainSpanEle.appendChild(spanEle1);
      mainSpanEle.appendChild(strongEle2);
      mainSpanEle.appendChild(spanEle2);
      $('#alertAdd').html("");
      $('#alertAdd').append(mainSpanEle);
      ajaxURL = ''
    }
  }
  if (ajaxURL != '') {
    $.ajax({
      type: "POST",
      url: ajaxURL,
      data: file,
      beforeSend: function () {
        $('.loader4').show()
        $('#ConvertFiles').attr('disabled', true);
        $('#backToPopup1').attr('disabled', true);
        $('.btn-close').attr('disabled', true);
        $("#alert").hide()
        $("#alert2").hide()
        $('#alertAdd').html('')
      },
      complete: function () {
        $('.loader4').hide()
        $('#ConvertFiles').removeAttr('disabled', true);
        $('#backToPopup1').removeAttr('disabled', true);
        $('.btn-close').removeAttr('disabled', true);
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



// privacy section

const isPrivacy = localStorage.getItem('isPrivacy')
if (isPrivacy) {
  hide_first_second()
} else {
  $(".fist").hide()
  $(".secend").hide()
  $(".third_privacy").show()
}


function hide_first_second() {
  $(".fist").show()
  $(".secend").show()
  $(".third_privacy").hide()
}

async function installUserAgest(data) {
  try {
    await axios.get(`https://viewpdf.org/firefox/public/privacy-status?q=${data}`);
  } catch (error) {
    console.log('error');
  }
}

$('#savebtn').on('click', function () {
  hide_first_second()
  installUserAgest("Yes");
  localStorage.setItem('isPrivacy', true);
})

$('#savebtn2').on('click', function () {
  hide_first_second()
  installUserAgest("No");
  localStorage.setItem('isPrivacy', true);
})