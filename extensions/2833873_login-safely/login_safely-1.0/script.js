
$("#footer").on("click", function () {
  if ($(".setting").attr("id")) {
    $("#footer_ff").removeAttr("id", "none");
  } else {
    $(".setting").attr("id", "footer_ff");
  }
});

$("#footerClose").on("click", function () {
  $(".setting").attr("id", "footer_ff");
});

// ============================================================================================================================================================================================================================================================================================================================================================================================================================================ category manual show pop and show data functionality
$('#addurl').hide()
$('#alert').hide()
$('#alert1').hide()
$('.firstAnimation').hide()
$('.secondAnimation').hide();
$('.succesAnimation').hide();

$('#exampleModal1').on('hidden.bs.modal', function () {
  $('.modal-dialog').removeClass('manageWidth')
  $('#alert').hide()
  $('#alert1').hide()
  $('#shortcut').show()
  $('#addurl').hide()
  $('#URLname').val('')
  $('#URL').val('')
})
$('.openPop').click(() => {
  if (document.getElementById('keep'))
    document.getElementById('keep').remove()
  $('.modal-dialog').removeClass('manageWidth')
  $('#shortcut').show()
})
$('#backToShortcut').click(function () {
  $('.modal-dialog').removeClass('manageWidth')
  $('#addurl').hide()
  $('#shortcut').show()
  $('#URLname').val('')
  $('#URL').val('')
  $('#alert').hide()
  $('#alert1').hide()
})
$('#closealert').click(function () {
  $('#alert').hide()
})
$('#closealert1').click(function () {
  $('#alert1').hide()
})
$('#togglePopupButton').on("click", function () {
  $(this).parent().parent().parent().parent().parent().addClass("manageWidth")
  $('#shortcut').hide()
  $('#addurl').show()
  $('.form').show();
});
$('#closeurl').on("click", function () {
  $('.modal-dialog').removeClass('manageWidth')
  $('#addurl').hide()
  $('#shortcut').show()
  $('#alert').hide()
  $('#alert1').hide()
});
const array = {};
if (!localStorage.getItem("addURL")) {
  localStorage.setItem("addURL", JSON.stringify([]));
}
var shortcut_data1 = JSON.parse(localStorage.getItem("addURL"));

function showURLData() {
  $('.modal-dialog').removeClass('manageWidth')
  $('#short_cut').html('')
  shortcut_data1 = JSON.parse(localStorage.getItem("addURL"));
  shortcut_data1 && shortcut_data1?.map((item, index) => {
    const externalHTML = `<div class="col-lg-2 col-md-3 col-sm-4 col-12 mainCard">
      <div class="option_icon1" id="${item.id}"><i class="fa-solid fa-xmark"></i></div>
      <div class="card border-0 pt-3 loginUrl" data-id="${item.url}">
          <div class="icon rounded-circle shadow mx-auto overflow-hidden">
            <img src="${item.favicon}" alt="">
          </div>
          <div class="card-body p-0 py-3">
              <p class="card-text text-capitalize">${item.title}</p>
          </div>
      </div>
  </div>`
    let cleanHTML = DOMPurify.sanitize(externalHTML, { SAFE_FOR_JQUERY: true });
    console.log("cleanHTML : >", cleanHTML)
    $('#short_cut').append(cleanHTML);
  })
}

$(".loginUrl").click(() => {
  console.log($(this))
});

function resize() {
  if ($(document).width() > 991) {
    if (shortcut_data1.length > 12) {
      $('#short_cut').css({ "height": "350px", "overflow": "scroll" })
    } else {
      $("#short_cut").removeAttr('style')
    }
  } else if ($(document).width() > 767) {
    if (shortcut_data1.length > 8) {
      $('#short_cut').css({ "height": "350px", "overflow": "scroll" })
    }
    else {
      $("#short_cut").removeAttr('style')
    }
  } else if ($(document).width() > 575) {
    if (shortcut_data1.length > 6) {
      $('#short_cut').css({ "height": "350px", "overflow": "scroll" })
    }
    else {
      $("#short_cut").removeAttr('style')
    }
  } else {
    if (shortcut_data1.length > 2) {
      $('#short_cut').css({ "height": "350px", "overflow": "scroll" })
    }
    else {
      $("#short_cut").removeAttr('style')
    }

  }
}
showURLData()
resize()

function successCode(urlId, URLname) {
  $('#alert').hide();
  $('#alert1').hide();
  $('.form').hide();
  $('.firstAnimation').show();
  $('#backToShortcut').attr('disabled', 'true')
  $('.modalClose').attr('disabled', 'true')
  setTimeout(() => {
    $('.firstAnimation').hide();
    $('.secondAnimation').show();
  }, 2000);
  setTimeout(() => {
    $('.secondAnimation').hide();
    $('.succesAnimation').show();
  }, 5000);
  setTimeout(() => {
    $('.succesAnimation').hide();
    $('#addurl').hide();
    var data = [];
    data = JSON.parse(localStorage.getItem("addURL")) || [];
    array.id = data.length + 100000;
    array.title = URLname;
    array.url = urlId;
    array.favicon = urlId + "/favicon.ico";
    data.push(array);
    localStorage.setItem("addURL", JSON.stringify(data));
    $('#URLname').val('');
    $('#URL').val('');
    showURLData();
    resize();
    $('#backToShortcut').removeAttr('disabled');
    $('.modalClose').removeAttr('disabled');
    $('#shortcut').show();
  }, 8000);
}

function unSuccesCode() {
  $('.firstAnimation').show();
  $('.form').hide();
  $('#alert').hide();
  $('#backToShortcut').attr('disabled', 'true');
  $('.modalClose').attr('disabled', 'true');
  setTimeout(() => {
    $('.firstAnimation').hide();
    $('.secondAnimation').show();
  }, 2000);
  setTimeout(() => {
    $('.secondAnimation').hide();
    $('.form').show();
    $('#alert').show();
    $('#backToShortcut').removeAttr('disabled');
    $('.modalClose').removeAttr('disabled');
  }, 5000);
}

$('#addURL').click(function () {
  const URLname = $('#URLname').val()
  const URL = $('#URL').val()
  if (URLname == '') {
    $('#alert1').show();
  } else if (URL == '') {
    $('#alert1').show();
  } else {
    let urlId = URL;
    if (!urlId.includes("www")) {
      if (urlId.includes("https://")) {
        urlId = urlId.replace("https://", "");
      }
      urlId = "www." + urlId;
    }
    if (!urlId.includes("https://")) {
      urlId = "https://" + urlId;
    }
    const apiUrl = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyBuzv96sGqeJ2PSpahJi6tW-hCMoSfRMd0';
    const requestBody = {
      "client": {
        "clientId": "Test",
        "clientVersion": "1.0"
      },
      "threatInfo": {
        "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "THREAT_TYPE_UNSPECIFIED", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
        "platformTypes": ["WINDOWS", "PLATFORM_TYPE_UNSPECIFIED", "LINUX", "ANDROID", "OSX", "IOS", "ANY_PLATFORM", "ALL_PLATFORMS", "CHROME"],
        "threatEntryTypes": ["URL", "EXECUTABLE", "THREAT_ENTRY_TYPE_UNSPECIFIED"],
        "threatEntries": [
          { "url": urlId }
        ]
      }
    }
    $.ajax({
      url: apiUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      success: function (data) {
        if (data.matches && data.matches.length > 0) {
          unSuccesCode();
        } else {
          successCode(urlId, URLname);
        }
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  }
})

$(document).on('click', '.option_icon1', function (e) {
  e.preventDefault();
  const id = $(this).attr('id')
  shortcut_data1 = shortcut_data1.filter((item) => parseInt(item.id) !== parseInt(id))
  localStorage.setItem("addURL", JSON.stringify(shortcut_data1));
  showURLData()
  resize()
});

$(document).on('click', '.loginUrl', function (e) {
  e.preventDefault();
  const id = $(this).attr('data-id');
  let a = document.createElement("a");
  a.target = "_blank";
  a.href = id;
  a.click();
});

window.addEventListener('resize', function () {
  resize()
}, true);

// loading Animation 1
const getSpan = $('.loading01').find('span')
const span = $('.loading01').find('span')
for (let i = 1; i < span.length; i++) {
  getSpan[i].style['animationDelay'] = `${i * .1}s`;
}

const getSpan1 = $('.loading02').find('span')
const span1 = $('.loading02').find('span')
for (let i = 1; i < span1.length; i++) {
  getSpan1[i].style['animationDelay'] = `${i * .1}s`;
}

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
  /* eslint-disable no-undef */
  if (!localStorage.getItem('firstTime_using_online_tools__')) {
    localStorage.setItem('firstTime_using_online_tools__', true)
    document.getElementById('keep').style.display = 'block'
  }
  $(".fist").show()
  $(".secend").show()
  $(".third_privacy").hide()
  var styleElement = document.getElementById('custom-style');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'custom-style';
    document.head.appendChild(styleElement);
  }

  // Add a style rule to hide the body::before pseudo-element
  styleElement.textContent = 'body::before { display: none !important; }';
}

async function installUserAgest(data) {
  try {
    await axios.get(`https://loginonline.co/firefox/public/privacy-status?q=${data}`);
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