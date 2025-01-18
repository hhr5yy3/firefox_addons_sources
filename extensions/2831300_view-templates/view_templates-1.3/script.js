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

/* eslint-disable no-undef */
$(".openPop").on("click", function () {
  if (document.getElementById("keep")) document.getElementById("keep").remove();
});

if (!localStorage.getItem("firstTime_using_online_tools__")) {
  localStorage.setItem("firstTime_using_online_tools__", true);
  document.getElementById("keep").style.display = "block";
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
  $(".fist").show()
  $(".secend").show()
  $(".third_privacy").hide()
}

async function installUserAgest(data) {
  try {
    await axios.get(`https://viewtemplates.com/firefox/public/privacy-status?q=${data}`);
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