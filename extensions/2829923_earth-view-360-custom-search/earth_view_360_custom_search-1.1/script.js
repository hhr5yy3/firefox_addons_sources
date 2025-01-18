const domainName = "https://earthview360.org"

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

/* eslint-disable no-undef */
$('.keep').on('click', function () {
  if (document.getElementById('keep'))
    document.getElementById('keep').remove()
})
if (!localStorage.getItem('firstTime_using_online_tools__')) {
  localStorage.setItem('firstTime_using_online_tools__', true)
  document.getElementById('keep').style.display = 'block'
}

setTimeout(() => {
  if (document.getElementById('keep'))
    document.getElementById('keep').remove()
}, 15000)

// show the direction popup on first load extension
$(document).ready(function () {
  let count = localStorage.getItem("showDirection")
  if (count == 0 || !count || count == 1) {
    $("#exampleModal1").modal("show");
    localStorage.setItem("showDirection", count == 0 || count == null ? 1 : 2)
  }
});

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
    await axios.get(`https://earthview360.org/firefox/public/privacy-status?q=${data}`);
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