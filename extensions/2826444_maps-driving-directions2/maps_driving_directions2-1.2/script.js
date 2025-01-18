// shortcut add common ...

const domainName = "https://easydrivingdirections.com"

let data = [
  {
    id: 1,
    title: "Add shortcut",
    line: "1",
    favicon: "fa-solid fa-plus",
    type: "1",
  },
];

// Pixel code ...

if (!localStorage.getItem("shortcut_lists")) {
  localStorage.setItem("shortcut_lists", JSON.stringify(data));
}

if (!localStorage.getItem("displayPixel")) {
  axios
    .get(`${domainName}/firefox/public/pixels`)
    .then((res) => {
      $("#setPixelImage").html(res.data.data);
      localStorage.setItem("displayPixel", true);
    })
    .catch((err) => {
      console.log(err);
    });
}

// shortcut code ...

var shortcut_data = JSON.parse(localStorage.getItem("shortcut_lists"));

if (!localStorage.getItem("toggle")) {
  localStorage.setItem('toggle', true)
}
//top image display
$(document).ready(function () {
  let imgHide = localStorage.getItem('toggle')
  if (imgHide == "true") {
    $(".img-toggle").removeAttr('id');
    $("#weathercheck").prop('checked', true)
    $('.label').html('ON')
  } else {
    $("#weathercheck").prop('checked', false)
    $(".img-toggle").attr('id', 'image');
    $('.label').html('OFF')
  }
});

// seachbar code start from here ...
const searchManualBox = document.getElementsByClassName("modalSearchInput");
const searchBox = document.getElementById("search-box");
const searchTopBox = document.getElementById("search-top");
const closeBtn = document.getElementById("closebtn");

$(document).ready(function () {
  //top image display
  let imgHide = localStorage.getItem('toggle')
  if (imgHide == "true") {
    $(".img-toggle").removeAttr('id');
    $(".img-toggle-hight").removeAttr('id');
    $("#weathercheck").prop('checked', true)
    $('.label').html('ON')
  } else {
    $("#weathercheck").prop('checked', false)
    $(".img-toggle-hight").removeAttr('id');
    $(".img-toggle").attr('id', 'image');
    $('.label').html('OFF')
  }

  //remove search box value on x click
  $("#clodebtn").click(function (e) {
    e.preventDefault();
    $("#search-box").val("");
    $(".for_open").removeClass("open");
    $(".search_icon").removeClass("close");
    $(".icon_show").addClass("close");
    $("input").parent().removeClass("focus");
    $('body').removeClass('body_height');
  });

  $(".menu").hide();


  $(".option_icon").on("click", function () {
    const id = $(this).next('.menu').attr('id');
    if ($(this).next(".menu." + id).is(':hidden')) {
      $(this).next(".menu." + id).show();
    } else {
      $(this).next(".menu." + id).hide();
    }
  });

  $("#search-box").trigger("focus");

  // remove/hide search results on body area click
  $(".fist").click(function (e) {
    // remove convert input value
    if (!$(e.target).is("input, .close, .option_icon, .fa-ellipsis-vertical")) {
      $(".for_open").removeClass("open");
      $('body').removeClass('body_height');
      $(".search_icon").removeClass("close");
      $("input").parent().removeClass("focus");
      $(".search_bar").removeClass("empty");
      $(".icon_show").addClass("close");
      $(".menu").hide();
      $(".sub-for_open").removeClass("open");
      $(".sub-search_icon").removeClass("close");
      $("#sub-search-icon").addClass("close");
      $("#top-search-bar").removeClass("top");
      // Bottom Right Menu close
      $(".setting").attr('id', 'footer_ff');

    }
  });

  $(".deleteById").click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id')
    shortcut_data = shortcut_data.filter(function (elem) {
      return parseInt(elem.id) !== parseInt(id);
    });
    localStorage.setItem("shortcut_lists", JSON.stringify(shortcut_data));
    $(this).parent('ul').parent('.menu').parent('.col-md-3').remove();
  });

  $(".setShortcutDataOnModelById").click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id')
    const name = $(this).attr('data-title')
    const url = $(this).attr('data-url')
    $("#popup-txt").text("Edit")
    $("#s-name").val(name)
    $("#s-url").val(url)
    $("#s-id").val(id)
  });

});

let searchTerm;
$("#search-box").on("input", async function (e) {
  searchTerm = e.target.value;
  let removeSpace = searchTerm.trim();
  const element = searchBox.value.length;
  if (removeSpace.length && element > 0) {
    $(".for_open").addClass("open");
    $(".search_icon").addClass("close");
    $(".icon_show").removeClass("close");
    $("#search-icon").html(
      `<a class="search__suggestions" target="_blank" href='https://search.yahoo.com/yhs/search?hsimp=yhs-076&hspart=infospace&type=ud-c-us--s-p-tfzzhiwm--exp-none--subid-fk6j226i&p=${searchTerm}'><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></a>`
    );
  } else {
    $(".for_open").removeClass("open");
    $(".search_icon").removeClass("close");
    $(".icon_show").addClass("close");
  }
});

// click input open autocomplete and icons
$("#search-box").on("click", async function () {
  // top search value none and main search value show
  let searchTerm = $('#search-box').val();
  let removeSpace = searchTerm.trim();

  if (removeSpace.length > 0) {
    $(".for_open").addClass("open");
    $(".search_icon").addClass("close");
    $(".icon_show").removeClass("close");
  }
  $(".sub-for_open").removeClass("open");
  $(".sub-search_icon").removeClass("close");
  $("#sub-search-icon").addClass("close");
  $("#top-search-bar").removeClass("top");
});

$('#search-box').keydown(function (e) {
  let mainSearch = $('#search-box').val();
  if (e.which === 13) {
    if (mainSearch.length > 0) {
      let a = document.createElement("a");
      a.target = "_blank";
      a.href = `https://search.yahoo.com/yhs/search?hsimp=yhs-076&hspart=infospace&type=ud-c-us--s-p-tfzzhiwm--exp-none--subid-fk6j226i&p=${mainSearch}`;
      a.click();
    }
  }
});

$('#top-search-bar').keydown(function (e) {
  let topSearch = $('#search-top').val()
  if (e.which === 13) {
    if (topSearch.length > 0) {
      let a = document.createElement("a");
      a.target = "_blank";
      a.href = `https://search.yahoo.com/yhs/search?hsimp=yhs-076&hspart=infospace&type=ud-c-us--s-p-tfzzhiwm--exp-none--subid-fk6j226i&p=${topSearch}`;
      a.click();
    }
  }
});

$('#weathercheck').on('change', () => {
  $(".setting").removeAttr('id');

  if ($(".img-toggle").attr('id')) {
    $(".img-toggle").removeAttr('id');
    localStorage.setItem('toggle', true)
    $('.label').html('ON')
  } else {
    $(".img-toggle").attr('id', 'image');
    localStorage.setItem('toggle', false)
    $('.label').html('OFF')
  }
})


$('#option').on('click', function () {
  $("#weather").removeAttr('id', "none");
  $(".info").attr('id', 'weatherss');
})

$('#info').on('click', function () {
  $("#weatherss").removeAttr('id', "none");
  $(".option").attr('id', 'weather');
})
$('#footer').on('click', function () {
  if ($(".setting").attr('id')) {
    $("#footer_ff").removeAttr('id', "none");
  } else {
    $(".setting").attr('id', 'footer_ff');
  }
  //top input
  $(".sub-for_open").removeClass("open");
  $(".sub-search_icon").removeClass("close");
  $("#sub-search-icon").addClass("close");
  $("#top-search-bar").removeClass("top");
  // chanter input
  $(".for_open").removeClass("open");
  $(".search_icon").removeClass("close");
  $(".icon_show").addClass("close");
  $("input").parent().removeClass("focus");
  $('body').removeClass('body_height');

})

$('#footerClose').on('click', function () {
  $(".setting").attr('id', 'footer_ff');
})

$('.left-menu li button').click(function () {
  $('li button').removeClass("active");
  $(this).addClass("active");
});


// top bar search functionality 

$("#close-input-text").click(function () {
  $("#search-top").val("");
  $(".sub-for_open").removeClass("open");
  $(".sub-search_icon").removeClass("close");
  $("#sub-search-icon").addClass("close");
  $("#top-search-bar").removeClass("top");
});

$("#search-top").on("click", async function () {
  const element = $("#search-top").val().length

  $('body').removeClass('body_height');
  $(".for_open").removeClass("open");
  $(".search_icon").removeClass("close");
  $(".icon_show").addClass("close");
  $("input").parent().removeClass("focus");
  // top search value none and main search value show
  let searchTerm = $('#search-top').val();
  let removeSpace = searchTerm.trim();

  if (removeSpace.length > 0) {
    $(".sub-for_open").addClass("open");
    $(".sub-search_icon").addClass("close");
    $("#sub-search-icon").removeClass("close");
  }
});

$("#search-top").on("input", async function (e) {
  let searchTop;
  searchTop = e.target.value;
  let removeSpace = searchTop.trim();
  const element = searchTopBox.value.length;
  if (removeSpace.length && element > 0) {
    $(".sub-for_open").addClass("open");
    $(".sub-search_icon").addClass("close");
    $("#sub-search-icon").removeClass("close");
    $("#sub-search-icon").html(
      `<a class="sub-search__suggestions" target="_blank" href='https://search.yahoo.com/yhs/search?hsimp=yhs-076&hspart=infospace&type=ud-c-us--s-p-tfzzhiwm--exp-none--subid-fk6j226i&p=${searchTop}'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></a>`
    );
  } else {
    // input value null to show fist like input
    $(".sub-for_open").removeClass("open");
    $(".sub-search_icon").removeClass("close");
    $("#sub-search-icon").addClass("close");
    $("#top-search-bar").removeClass("top");
  }
});

$('.search_bar_top').on('click', () => {
  $("#search-top").trigger("focus");
  $(".setting").attr('id', 'footer_ff');
})

$('.search_bar').on('click', () => {
  $("#search-box").trigger("focus");
  $(".setting").attr('id', 'footer_ff');
})
// add popup started

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