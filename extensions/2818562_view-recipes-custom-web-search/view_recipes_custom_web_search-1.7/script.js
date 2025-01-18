let data = [
  {
    id: 1,
    title: "Add shortcut",
    line: "1",
    favicon: "fa-solid fa-plus",
    type: "1",
  },
];

if (!localStorage.getItem("shortcut_lists")) {
  localStorage.setItem("shortcut_lists", JSON.stringify(data));
}

var shortcut_data = JSON.parse(localStorage.getItem("shortcut_lists"));

if (!localStorage.getItem("toggle")) {
  localStorage.setItem('toggle', true)
}

$("#add-shortcut").on("submit", function (event) {
  const array = {};
  event.preventDefault();
  const name = $("#s-name").val();
  const url = $("#s-url").val();
  let urlId = url;
  if (!urlId.includes("www")) {
    if (urlId.includes("https://")) {
      urlId = urlId.replace("https://", '');
    }
    urlId = "www." + urlId;
  }
  if (!urlId.includes("https://")) {
    urlId = "https://" + urlId;
  }
  var data = [];
  data = JSON.parse(localStorage.getItem("shortcut_lists")) || [];
  const id = $("#s-id").val();
  if (id) {
    objIndex = shortcut_data.findIndex((obj => obj.id == id));
    shortcut_data[objIndex].title = name
    shortcut_data[objIndex].url = urlId
    shortcut_data[objIndex].favicon = urlId + "/favicon.ico";
    localStorage.setItem("shortcut_lists", JSON.stringify(shortcut_data));
  } else {
    array.id = data.length + 100000;
    array.title = name;
    array.line = 1;
    array.url = urlId;
    array.favicon = urlId + "/favicon.ico";
    array.type = "0";
    data.push(array);
    localStorage.setItem("shortcut_lists", JSON.stringify(data));
  }


  $("#exampleModal").modal("hide");
  location.reload();
  $("#s-name").val("");
  $("#s-url").val("");
});

function get_shortcut() {
  const shortcut = JSON.parse(localStorage.getItem("shortcut_lists"));
  for (let i = 0; i <= shortcut.length; i++) {
    if (i == shortcut.length) {
      $("#card").append(`<div class="col-md-3 col-4 mt-3">
            <a type="button" id="add-shortcut-btn" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="favicon fs-5 text-dark">
                    <i class="fa-solid fa-plus"></i>
                </div>
                <div class="title">
                    <span>Add shortcut</span>
                </div>
            </a>
        </div>`);
    }
    const element = shortcut[i];
    if (element && element.type == 0) {
      $("#card").append(`<div class="col-md-3 col-4 mt-3 add_shortcut">
        <a class="option_icon option_icon_${element.id
        }"><i class="fa-solid fa-ellipsis-vertical"></i></a>
        <div class="menu ${element.id}" style="display:none" id="${element.id
        }"> <ul><li class="setShortcutDataOnModelById" data-id="${element.id
        }"
      data-title="${element.title
        }"
      data-url="${element.url
        }" id="${element.id
        }"><i class="fa-solid fa-pencil"></i>&nbsp; Rename</li><li class="deleteById" data-id="${element.id
        }" ><i class="fa-solid fa-trash-can"></i>&nbsp; Delete</li> </ul> </div><a target="_blank" href="${element.url
        }" onClick="window.open('${element.url
        }', '_blank')" title='${element.title
        }'><div class="favicon"> <img width='24px' height='24px' src="${element && element.favicon
        }" alt="favicons">  </div> <div class="title"> <span>${element.title
        }</span>  </div>  </a> </div>`);
    }
  }
}
get_shortcut();


const searchManualBox = document.getElementsByClassName("modalSearchInput");
const searchBox = document.getElementById("search-box");
const searchTopBox = document.getElementById("search-top");
const suggestions = document.getElementById("suggestions");
const closeBtn = document.getElementById("closebtn");

$(document).ready(function () {

  //remove search box value on x click
  $("#closebtn").click(function (e) {
    e.preventDefault();
    $(".modal_search_results").removeClass("open");
  });

  $("#add-shortcut-btn").click(function (e) {
    e.preventDefault();
    $("#s-name").val("")
    $("#s-url").val("")
    $("#s-id").val("")
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

  // remove/hide search results on body area click
  $(".fist").click(function (e) {
    // remove convert input value
    if (!$(e.target).is("input, .close, .option_icon, .fa-ellipsis-vertical")) {
      $(".modal_search_results").removeClass("open");
      $(".for_open").removeClass("open");
      $(".search_icon").removeClass("close");
      $("input").parent().removeClass("focus");
      $(".search_bar").removeClass("empty");
      $(".icon_show").addClass("close");
      $(".menu").hide();
      // top search-bar input remove value
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
    $("#exampleModal").modal("show");
    $("#popup-txt").text("Edit")
    $("#s-name").val(name)
    $("#s-url").val(url)
    $("#s-id").val(id)
  });

});

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
  // chanter input
  $(".modal_search_results").removeClass("open");
  $(".for_open").removeClass("open");
  $(".search_icon").removeClass("close");
  $(".icon_show").addClass("close");

})

$('#footerClose').on('click', function () {
  $(".setting").attr('id', 'footer_ff');
})


// top bar search functionality 
$("#close-input-text").click(function () {
  $("#search-top").val("");
  let node = $("#sub-suggestions");
  node.text(`&nbsp;`);
  $(".sub-for_open").removeClass("open");
  $(".sub-search_icon").removeClass("close");
  $("#sub-search-icon").addClass("close");
});

// add popup started

if (!localStorage.getItem('firstTime_using_online_tools__')) {
  localStorage.setItem('firstTime_using_online_tools__', true)
  $('#keep').addClass('blockKeep')
}

// ============================================================================================================================================================================================================================================================================================================================================================================================================================================ 




$('.pop3').hide()
$('.modal-dialog').removeClass('pop3Width')
$('#inputloader').hide()
$("#inputloaderLast").hide();
$('.closeBtn').click(() => {
  $('.pop1').hide()
  $('.pop3').hide()
  $('.modal-dialog').removeClass('pop3Width')
  $('#manual_list').html("")
  $('#categoryList').html("")
  $('#allDetailsPage').html("")
  $('.modalSearchInput').val('')
  $('.modal_search_results').addClass('clo')
  $('#modalsuggestions').html("")
  $('#TitleOfRecipes').html('')
})
$('.modal').click(() => {
  $('.modal_search_results').addClass('clo');
  $('.modal_search_results').removeClass('open');
})
$('#backtopop3').click(() => {
  $('.pop3').hide()
  $('.pop1').show()
  $('#allDetailsPage').html("")
  $('.modal-dialog').removeClass('pop3Width')
})
$('#exampleModal1').on('hidden.bs.modal', function () {
  $('.pop1').show()
  $('.pop3').hide()
  $('.modal-dialog').removeClass('pop3Width')
  $('#inputloader').hide()
  $('#categoryList').html("")
  $('#allDetailsPage').html("")
  $('.modal_search_results').addClass('clo')
  $('#modalsuggestions').html("")
  $('.modalSearchInput').val('')
  $('#manual_list').html('')
  $('#TitleOfRecipes').html('')
})

// ========== open popup 1 and call api for get list of category

$('.openPop').click(() => {
  if (document.getElementById('keep'))
    document.getElementById('keep').remove()
  $('.pop1').show()
  $.ajax({
    url: 'https://api2.bigoven.com/recipes/top25random?photos=true&api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP',
    dataType: 'json',
    beforeSend: function () {
      $(".loader").show();
    },
    complete: function () {
      $(".loader").hide();
    },
    success: function (data) {
      $('#manual_list').html('')
      $('#TitleOfRecipes').html('')
      var month = new Date().toLocaleString("en-US", { month: "long" })
      var date = new Date().getDate()
      if (date == 1 || date == 21 || date == 31) {
        date += "<sup>st</sup>"
      } else if (date == 2 || date == 22) {
        date += "<sup>nd</sup>"
      } else if (date == 3 || date == 23) {
        date += "<sup>rd</sup>"
      } else {
        date += "<sup>th</sup>";
      }

      data.Results.map((item, i) => {
        const name1 = item.Title
        const characterLimit = 50;
        const name = truncateAndAddEllipsis(name1, characterLimit);
        // pop 1 data append here
        return $('#manual_list').append(
          `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-11">
            <div class="categoryCard text-capitalize text-center mb-3" id="${item.RecipeID}">
                        <img src="${item.PhotoUrl}" alt="${item.Title}">
                        <p>${name}</p>
                        </div>
                        </div>
                    `
        )
      })
      $('#TitleOfRecipes').append(`Top ${data.Results.length} Recipes For ${month} ${date}`)

      $('.categoryCard').click(function (e) {
        $('.pop3').attr('data-id', "1")
        e.preventDefault();
        const TitleName = $(this)[0].innerText
        const RecipId = $(this).attr("id")
        if ($('.modal-dialog').find('.pop3').attr('data-id')) {
          $('.modal-dialog').addClass('pop3Width')
        }
        $('.pop1').hide();
        $('.pop3').show();
        $.ajax({
          url: "https://api2.bigoven.com/recipe/steps/" + RecipId + "?api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP",
          dataType: 'json',
          beforeSend: function () {
            $("#inputloaderLast").show();
          },
          complete: function () {
            $("#inputloaderLast").hide();
          },
          success: function (data) {
            $('#allDetailsPage').append(
              `
              <div class="row">
                <div class="col-lg-7 col-md-6 cnt">
                    <h3 id="categoryNameHeading" class="d-inline">${TitleName}</h3><img class="print float-end" src="../assests/image/print_page.png" alt="Print">
                      <p class="text-uppercase Title mt-3">Instructions</p>
                      <h6 id="instruction">${data.Instructions}</h6>
                      <p class="text-uppercase Title">INGREDIENTS</p>
                      <ul id="itemList"></ul>
                  </div>
                <div class="col-md-5">
                <div class="imagecard">
                    <img src="${data.ImageURL == null ? "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg/recipe-no-image.jpg" : data.ImageURL}"
                        alt="">
                </div>
                <div class="bg_color"></div>
                <div class="bg_color_1"></div>
                </div>
              </div>
              `
            )

            if ($('#instruction').height() >= 90) {
              $('#instruction').css("height", "90px")
              $('#instruction').css("overflow-y", "scroll")
            }

            data.Ingredients.map((item) => {
              $('#itemList').append(
                `
                <li><i class="fa-solid fa-square-check me-1"></i>${item.DisplayQuantity}  ${item.Name}</li>
                `
              )
              if (data.Ingredients.length > 5) {
                $('ul#itemList').css("height", "175px")
                $('ul#itemList').css("overflow-y", "scroll")
              }
            })
          }
        })
      })
    }
  })
})


$('.modalSearchBtn').click(() => {
  serachValue1 = $('.modalSearchInput').val()
  let serachValueLenght = $('.modalSearchInput').val().length
  $('#manualNameHeading').text('manuals')
  if (serachValueLenght >= 1) {
    $.ajax({
      url: 'https://api2.bigoven.com/recipes?api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP&any_kw=' + serachValue1,
      dataType: 'json',
      beforeSend: function () {
        $("#inputloader").show();
      },
      complete: function () {
        $("#inputloader").hide();
      },
      success: function (data) {
        if (data.Results.length != 0) {
          $('#TitleOfRecipes').html('')
          var month = new Date().toLocaleString("en-US", { month: "long" })
          var date = new Date().getDate()
          if (date == 1 || 21 || 31) {
            date += "<sup>st</sup>"
          } else if (date == 2 || 22) {
            date += "<sup>nd</sup>"
          } else if (date == 3 || 23) {
            date += "<sup>rd</sup>"
          } else {
            date += "<sup>th</sup>";
          }

          $('#manual_list').html('')
          data.Results.map((item, i) => {

            // pop 1 data append here
            const name1 = item.Title
            const characterLimit = 50;
            const name = truncateAndAddEllipsis(name1, characterLimit);
            return $('#manual_list').append(
              `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-11">
            <div class="categoryCard text-capitalize text-center mb-3" id="${item.RecipeID}">
                        <img src="${item.PhotoUrl}" alt="${item.Title}">
                        <p>${name}</p>
                        </div>
                        </div>
                    `
            )
          })
          $('#TitleOfRecipes').append(`Top ${data.Results.length} Recipes For ${month} ${date}`)

          $('.categoryCard').click(function (e) {
            $('.pop3').attr('data-id', "1")
            e.preventDefault();
            const TitleName = $(this)[0].innerText
            const RecipId = $(this).attr("id")
            if ($('.modal-dialog').find('.pop3').attr('data-id')) {
              $('.modal-dialog').addClass('pop3Width')
            }
            $('.pop1').hide();
            $('.pop3').show();
            $.ajax({
              url: "https://api2.bigoven.com/recipe/steps/" + RecipId + "?api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP",
              dataType: 'json',
              beforeSend: function () {
                $("#inputloaderLast").show();
              },
              complete: function () {
                $("#inputloaderLast").hide();
              },
              success: function (data) {
                $('#allDetailsPage').append(
                  `
                <div class="row">
                  <div class="col-lg-7 col-md-6 cnt">
                      <h3 id="categoryNameHeading" class="d-inline">${TitleName}</h3><img class="print float-end" src="../assests/image/print_page.png" alt="Print">
                        <p class="text-uppercase Title mt-3">Instructions</p>
                        <h6 id="instruction">${data.Instructions}</h6>
                        <p class="text-uppercase Title">INGREDIENTS</p>
                        <ul id="itemList"></ul>
                    </div>
                  <div class="col-md-5">
                  <div class="imagecard">
                      <img src="${data.ImageURL == null ? "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg/recipe-no-image.jpg" : data.ImageURL}"
                          alt="">
                  </div>
                  <div class="bg_color"></div>
                  <div class="bg_color_1"></div>
                  </div>
                </div>
                `
                )

                if ($('#instruction').height() >= 90) {
                  $('#instruction').css("height", "90px")
                  $('#instruction').css("overflow-y", "scroll")
                }

                data.Ingredients.map((item) => {
                  $('#itemList').append(
                    `
                  <li><i class="fa-solid fa-square-check me-1"></i>${item.DisplayQuantity}  ${item.Name}</li>
                  `
                  )
                  if (data.Ingredients.length > 5) {
                    $('ul#itemList').css("height", "175px")
                    $('ul#itemList').css("overflow-y", "scroll")
                  }
                })
              }
            })
          })
        } else {
          $('#manual_list').html('')
          $('#TitleOfRecipes').html('')
          return $('#manual_list').append(
            ` <div class="d-flex justify-content-center align-items-center">
                  <div class="text-center">
                  <i class="fa-solid fa-box-open fs-1"></i>
                  <p class="fs-4">No Record Found</p>
                  </div>
                </div>`
          )
        }
      }
    })
  }
})



var li3 = $(".modalAutocomplete");
var liSelect1;
$('#manualSearch').keydown(function (e) {
  let data = $('.selectManuals').attr('data-id')
  li3 = $(".modalAutocomplete");
  if (e.which === 40) {
    if (liSelect1) {
      liSelect1.removeClass("selectManuals");
      next = liSelect1.next();
      if (next.length > 0) {
        liSelect1 = next.addClass("selectManuals");
        $('#manualSearch').val(liSelect1.text())
      } else {
        liSelect1 = li3.eq(0).addClass("selectManuals");
        $('#manualSearch').val(liSelect1.text())
      }
    } else {
      liSelect1 = li3.eq(0).addClass("selectManuals");
      $('#manualSearch').val(li3.eq(0).text())
    }
  } else if (e.which === 38) {
    if (liSelect1) {
      liSelect1.removeClass("selectManuals");
      next = liSelect1.prev();
      if (next.length > 0) {
        liSelect1 = next.addClass("selectManuals");
        $('#manualSearch').val(liSelect1.text())
      } else {
        liSelect1 = li3.last().addClass("selectManuals");
        $('#manualSearch').val(liSelect1.text())
      }
    } else {
      liSelect1 = li3.last().addClass("selectManuals");
      $('#manualSearch').val(li3.last().text())
    }
  } else if (e.which === 13) {
    if (!data) {
      $('.modal_search_results').removeClass('open')
      $('.modal_search_results').addClass('clo')
      let serachValue = $(this).val();
      let searchLenght = $(this).val().length;
      if (searchLenght >= 1) {
        $.ajax({
          url: 'https://api2.bigoven.com/recipes?api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP&any_kw=' + serachValue,
          dataType: 'json',
          beforeSend: function () {
            $("#inputloader").show();
          },
          complete: function () {
            $("#inputloader").hide();
          },
          success: function (data) {
            if (data.Results.length != 0) {
              $('#manual_list').html('')
              $('#TitleOfRecipes').html('')
              var month = new Date().toLocaleString("en-US", { month: "long" })
              var date = new Date().getDate()
              if (date == 1 || 21 || 31) {
                date += "<sup>st</sup>"
              } else if (date == 2 || 22) {
                date += "<sup>nd</sup>"
              } else if (date == 3 || 23) {
                date += "<sup>rd</sup>"
              } else {
                date += "<sup>th</sup>";
              }

              data.Results.map((item, i) => {

                // pop 1 data append here
                const name1 = item.Title
                const characterLimit = 50;
                const name = truncateAndAddEllipsis(name1, characterLimit);
                return $('#manual_list').append(
                  `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-11">
                <div class="categoryCard text-capitalize text-center mb-3" id="${item.RecipeID}">
                            <img src="${item.PhotoUrl}" alt="${item.Title}">
                            <p>${name}</p>
                            </div>
                            </div>
                        `
                )
              })

              $('#TitleOfRecipes').append(`Top ${data.Results.length} Recipes For ${month} ${date}`)

              $('.categoryCard').click(function (e) {
                $('.pop3').attr('data-id', "1")
                e.preventDefault();
                const TitleName = $(this)[0].innerText
                const RecipId = $(this).attr("id")
                if ($('.modal-dialog').find('.pop3').attr('data-id')) {
                  $('.modal-dialog').addClass('pop3Width')
                }
                $('.pop1').hide();
                $('.pop3').show();
                $.ajax({
                  url: "https://api2.bigoven.com/recipe/steps/" + RecipId + "?api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP",
                  dataType: 'json',
                  beforeSend: function () {
                    $("#inputloaderLast").show();
                  },
                  complete: function () {
                    $("#inputloaderLast").hide();
                  },
                  success: function (data) {
                    $('#allDetailsPage').append(
                      `
                    <div class="row">
                      <div class="col-lg-7 col-md-6 cnt">
                          <h3 id="categoryNameHeading" class="d-inline">${TitleName}</h3><img class="print float-end" src="../assests/image/print_page.png" alt="Print">
                            <p class="text-uppercase Title mt-3">Instructions</p>
                            <h6 id="instruction">${data.Instructions}</h6>
                            <p class="text-uppercase Title">INGREDIENTS</p>
                            <ul id="itemList"></ul>
                        </div>
                      <div class="col-md-5">
                      <div class="imagecard">
                          <img src="${data.ImageURL == null ? "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg/recipe-no-image.jpg" : data.ImageURL}"
                              alt="">
                      </div>
                      <div class="bg_color"></div>
                      <div class="bg_color_1"></div>
                      </div>
                    </div>
                    `
                    )

                    if ($('#instruction').height() >= 90) {
                      $('#instruction').css("height", "90px")
                      $('#instruction').css("overflow-y", "scroll")
                    }

                    data.Ingredients.map((item) => {
                      $('#itemList').append(
                        `
                      <li><i class="fa-solid fa-square-check me-1"></i>${item.DisplayQuantity}  ${item.Name}</li>
                      `
                      )
                      if (data.Ingredients.length > 5) {
                        $('ul#itemList').css("height", "175px")
                        $('ul#itemList').css("overflow-y", "scroll")
                      }
                    })
                  }
                })
              })
            } else {
              $('#manual_list').html('')
              $('#TitleOfRecipes').html('')
              return $('#manual_list').append(
                ` <div class="d-flex justify-content-center align-items-center">
                  <div class="text-center">
                  <i class="fa-solid fa-box-open fs-1"></i>
                  <p class="fs-4">No Record Found</p>
                  </div>
                </div>`
              )
            }
          }
        })
      }
    }
    else {
      let mainheading = $('.selectManuals')[0].innerText
      let RecipId = $('.selectManuals').attr('id')
      $('.pop3').attr('data-id', "1")
      if ($('.modal-dialog').find('.pop3').attr('data-id')) {
        $('.modal-dialog').addClass('pop3Width')
      }
      $('.pop1').hide();
      $('.pop3').show();
      $.ajax({
        url: "https://api2.bigoven.com/recipe/steps/" + RecipId + "?api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP",
        dataType: 'json',
        beforeSend: function () {
          $("#inputloader").show();
        },
        complete: function () {
          $("#inputloader").hide();
        },
        success: function (data) {
          $('#allDetailsPage').append(
            `
                <div class="row">
                  <div class="col-lg-7 col-md-6 cnt">
                      <h3 id="categoryNameHeading" class="d-inline">${mainheading}</h3><img class="print float-end" src="../assests/image/print_page.png" alt="Print">
                        <p class="text-uppercase Title mt-3">Instructions</p>
                        <h6 id="instruction">${data.Instructions}</h6>
                        <p class="text-uppercase Title">INGREDIENTS</p>
                        <ul id="itemList"></ul>
                    </div>
                  <div class="col-md-5">
                  <div class="imagecard">
                      <img src="${data.ImageURL == null ? "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg/recipe-no-image.jpg" : data.ImageURL}"
                          alt="">
                  </div>
                  <div class="bg_color"></div>
                  <div class="bg_color_1"></div>
                  </div>
                </div>
                `
          )

          if ($('#instruction').height() >= 90) {
            $('#instruction').css("height", "90px")
            $('#instruction').css("overflow-y", "scroll")
          }

          data.Ingredients.map((item) => {
            $('#itemList').append(
              `
                  <li><i class="fa-solid fa-square-check me-1"></i>${item.DisplayQuantity}  ${item.Name}</li>
                  `
            )
            if (data.Ingredients.length > 5) {
              $('ul#itemList').css("height", "175px")
              $('ul#itemList').css("overflow-y", "scroll")
            }
          })
        }
      })
      $('#manualSearch').val('')
    }
  }
});

let searchTermManual;
let modalSuggetion = $('#modalsuggestions')
$(".modalSearchInput").on("input", async function (e) {
  console.log("modalSuggetion ::::: >", modalSuggetion)
  searchTermManual = e.target.value;
  let removeSpace = searchTermManual.trim();
  if (removeSpace.length > 0) {
    const rawResponse = await axios
      .get(
        "https://api2.bigoven.com/recipes?api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP&rpp=10&any_kw=" + searchTermManual,
      );
    const data = await rawResponse.data.Results;
    // // // Display search suggestions
    modalSuggetion.html("");
    data.map((suggestion) => {
      // return `<li class="modalAutocomplete" data-id='${searchTermManual}' id="${suggestion.RecipeID}"><img src="${suggestion.PhotoUrl}" width="25px" height="25px"/>${suggestion.Title}</li>`;
      // }).join("");
      let li = document.createElement("li");
      li.className = 'modalAutocomplete';
      li.id = suggestion.RecipeID;
      li.setAttribute('data-id', `${searchTermManual}`)

      let img = document.createElement("img");
      img.src = suggestion.PhotoUrl
      img.width = 25
      img.height = 25

      li.appendChild(img)
      var text = document.createTextNode(`${suggestion.Title}`);
      li.appendChild(text);

      console.log("check li ::::::::: >", li)

      modalSuggetion.append(li);
    });
  }
  const element = searchTermManual.length;
  if (removeSpace.length && element > 0) {
    $(".modal_search_results").addClass("open");
    $(".modalSuggetion").removeClass('clo')
    $(".modalSuggetion").removeClass('closed')
  } else {
    // input value null to show fist like input
    $(".modalSuggetion").addClass('closed')
    $(".modal_search_results").removeClass("open");
  }

  $(".modalAutocomplete").click(function () {
    let mainheading = $(this)[0].innerText
    let RecipId = $(this).attr('id')
    $('.pop3').attr('data-id', "1")
    if ($('.modal-dialog').find('.pop3').attr('data-id')) {
      $('.modal-dialog').addClass('pop3Width')
    }
    $('.pop1').hide();
    $('.pop3').show();
    $.ajax({
      url: "https://api2.bigoven.com/recipe/steps/" + RecipId + "?api_key=q2O79q80h70JpwviLq96pk40J8Gp6crP",
      dataType: 'json',
      beforeSend: function () {
        $("#inputloader").show();
      },
      complete: function () {
        $("#inputloader").hide();
      },
      success: function (data) {
        $('#allDetailsPage').append(
          `
                <div class="row">
                  <div class="col-lg-7 col-md-6 cnt">
                      <h3 id="categoryNameHeading" class="d-inline">${mainheading}</h3><img class="print float-end" src="../assests/image/print_page.png" alt="Print">
                        <p class="text-uppercase Title mt-3">Instructions</p>
                        <h6 id="instruction">${data.Instructions}</h6>
                        <p class="text-uppercase Title">INGREDIENTS</p>
                        <ul id="itemList"></ul>
                    </div>
                  <div class="col-md-5">
                  <div class="imagecard">
                      <img src="${data.ImageURL == null ? "https://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg/recipe-no-image.jpg" : data.ImageURL}"
                          alt="">
                  </div>
                  <div class="bg_color"></div>
                  <div class="bg_color_1"></div>
                  </div>
                </div>
                `
        )

        if ($('#instruction').height() >= 90) {
          $('#instruction').css("height", "90px")
          $('#instruction').css("overflow-y", "scroll")
        }

        data.Ingredients.map((item) => {
          $('#itemList').append(
            `
                  <li><i class="fa-solid fa-square-check me-1"></i>${item.DisplayQuantity}  ${item.Name}</li>
                  `
          )
          if (data.Ingredients.length > 5) {
            $('ul#itemList').css("height", "175px")
            $('ul#itemList').css("overflow-y", "scroll")
          }
        })
      }
    })
    $('#manualSearch').val('')
  });
});

$("body").delegate(".print", "click", function () {
  $('.printPage').print()
});

$(document).keydown((e) => {
  if (e.which === 27) {
    $('#inputloader').hide()
    $('#categoryList').html("")
    $('#addnumer').html('')
    $('#addnumer1').html('')
    $('#addnumer2').html('')
    $('#manual_list').html("")
    $('#allDetailsPage').html("")
    $('.modal_search_results').addClass('clo')
    $('#modalsuggestions').html("")
    $('.pagination').html('')
    $('.modalSearchInput').val('')
    $('.paginationBtn').html('')
    return false;
  }
})

// character count function
function truncateAndAddEllipsis(str, limit) {
  if (str.length > limit) {
    return str.slice(0, limit) + '...';
  } else {
    return str;
  }
}

// privacy condition code here ....

function checkForLocalStorageChanges() {
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const oldValue = localStorage.getItem(key);
      const newValue = JSON.parse(localStorage.getItem(key));
      if (newValue !== oldValue) {
        chekcValurOfagreeAndShowHide()
      }
    }
  }
}
const checkInterval = 100;
setInterval(checkForLocalStorageChanges, checkInterval);

function showAgreePop() {
  ShowDetailPage()
  $('.search-bar').addClass('hideOnSearchPermission');
  $('#accept-prompt').addClass('showAgreeCard'); //showing permision
}

function hideAgreePop() {
  ShowDetailPage()
  $('.search-bar').removeClass('hideOnSearchPermission');
  $('#accept-prompt').removeClass('showAgreeCard');
}

function ShowDetailPage() {
  $('.allow-widget').show()
}
function chekcValurOfagreeAndShowHide() {
  const agree_check = JSON.parse(localStorage.getItem("agree"));
  var detail = $('#allDetailsPage div').length;
  if (detail > 0 || agree_check) {
    $('#accept-prompt').attr("style", "display: none !important");
  } else {
    $('#accept-prompt').attr("style", "display: block !important");
  }
  if (agree_check) {
    hideAgreePop()
  } else {
    showAgreePop()
  }
}

var OPTIN_PAGE = chrome.runtime.getURL("./privacy.html");

$('#acceptTerms').click(function () {
  window.open(OPTIN_PAGE);
})

var denyTerms = $('#denytTerms');

denyTerms.on('click', function (e) {
  closePiiWidget();
});

function closePiiWidget() {
  $('#exampleModal1').modal('hide');
}