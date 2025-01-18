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

if (!localStorage.getItem('firstTime_using_online_tools__')) {
  $('#keep').addClass('blockKeep')
}

// ============================================================================================================================================================================================================================================================================================================================================================================================================================================ category manual show pop and show data functionality

$('.pop2').hide()
$('.pop3').hide()
$('#inputloader').hide()

$('#backtopop1').click(() => {
  $('.pop2').hide()
  $('.pop1').show()
  $('#categoryList').html("")
  $('#addnumer').html('')
  $('#addnumer1').html('')
  $('#addnumer2').html('')
  $('#manualNameHeading').html("")
})

$('.closeBtn').click(() => {
  $('.pop1').hide()
  $('.pop2').hide()
  $('.pop3').hide()
  $('#manual_list').html("")
  $('#categoryList').html("")
  $('#allDetailsPage').html("")
  $('.modalSearchInput').val('')
  $('.modal_search_results').addClass('clo')
  $('#modalsuggestions').html("")
  $('.paginationBtn').html('')
})
$('.modal').click(() => {
  $('.modal_search_results').addClass('clo');
  $('.modal_search_results').removeClass('open');
})
$('#backtopop3').click(() => {
  if ($("#categoryList div").length == 0) {
    $('.pop3').hide()
    $('.pop2').hide()
    $('.pop1').show()
    $('#allDetailsPage').html("")
    $('.pagination').html('')
    $('.paginationBtn').html('')
  }
  else {
    $('.pop3').hide()
    $('.paginationBtn').html('')
    $('.pop2').show()
    $('.pagination').html('')
    $('#allDetailsPage').html("")
  }
})
$('#exampleModal1').on('hidden.bs.modal', function () {
  $('.pop1').show()
  $('.pop2').hide()
  $('.pop3').hide()
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
})

// ========== open popup 1 and call api for get list of category

$('.openPop').click(() => {
  localStorage.setItem('firstTime_using_online_tools__', true)
  if (document.getElementById('keep'))
    document.getElementById('keep').remove()
  $('.pop1').show()
  $.ajax({
    url: 'https://manuals.viewmanuals.com/get_manuals.php?q=get-category',
    dataType: 'json',
    beforeSend: function () {
      $(".loader").show();
    },
    complete: function () {
      $(".loader").hide();
    },
    success: function (data) {
      data.data.map((item, i) => {
        // pop 1 data append here
        let appendHTML = `<div class="col-xl-2 col-md-3 col-sm-5 col-10">
          <div class="categoryCard text-capitalize text-center mb-3" id="${item.category}">
          <img src="assets/image/${i + 1}.svg?version=1" alt="${item.category}">
          <p>${item.category}</p>
          </div>
          </div>
        `;
        let cleanHTML = DOMPurify.sanitize(appendHTML, { SAFE_FOR_JQUERY: true });
        return $('#manual_list').append(cleanHTML);
      })

      // ========== open popup 2 and call api for get data of when they click on card 

      $(".categoryCard").click(function (e) {
        e.preventDefault();
        $("#categoryList").html("");
        manualName = $(this).attr('id');
        numberNoHyphens = manualName.replace(/-/g, " ");
        let printManual = numberNoHyphens.replace(/&amp;/g, '&')

        $('#manualNameHeading').text(printManual)
        $('.pop1').hide()
        $('.pop2').show()
        $.ajax({
          url: `https://manuals.viewmanuals.com/get_manuals.php?q=get-manuals&category=${manualName}&page=1`,
          dataType: 'json',
          beforeSend: function () {
            $(".loader").show();
          },
          complete: function () {
            $(".loader").hide();
          },
          success: function (data) {
            $("#categoryList").html("");
            totalPage = data.leanth
            if (totalPage > 1) {
              function ccgetPageList(ctotalPages, cpage, cmaxLength) {
                function range(start, end) {
                  return Array.from(Array(end - start + 1), (_, i) => i + start);
                }
                const csideWidth = cmaxLength < 9 ? 1 : 2;
                const cleftWidth = (cmaxLength - csideWidth * 2 - 3) >> 1;
                const crightWidth = (cmaxLength - csideWidth * 2 - 3) >> 1;
                if (ctotalPages <= cmaxLength) {
                  return range(1, ctotalPages);
                }
                if (cpage <= cmaxLength - csideWidth - 1 - crightWidth) {
                  return range(1, cmaxLength - csideWidth - 1).concat(0, range(ctotalPages - csideWidth + 1, ctotalPages));
                }
                if (cpage >= ctotalPages - csideWidth - 1 - crightWidth) {
                  return range(1, csideWidth).concat(0, range(ctotalPages - csideWidth - 1 - crightWidth - cleftWidth, ctotalPages));
                }
                return range(1, csideWidth).concat(0, range(cpage - cleftWidth, cpage + crightWidth), 0, range(ctotalPages - csideWidth + 1, ctotalPages));
              }
              $(function () {
                const cnumberOfItems = totalPage;
                const ctotalPages = cnumberOfItems;
                const cpaginationSize = 5; //How many page elements visible in the pagination
                var ccurrentPage;
                function ccshowPage(cwhichPage) {
                  if (cwhichPage < 1 || cwhichPage > ctotalPages) return false;
                  ccurrentPage = cwhichPage;
                  $.ajax({
                    url: `https://manuals.viewmanuals.com/get_manuals.php?q=get-manuals&category=${manualName}&page=${cwhichPage}`,
                    dataType: 'json',
                    beforeSend: function () {
                      $(".loader").show();
                    },
                    complete: function () {
                      $(".loader").hide();
                    },
                    success: function (data) {
                      $("#categoryList").html("");
                      $("#categoryList").html("");
                      data.data.map((item) => {

                        // pop 2 data append here
                        let appendHTML = `
                        <div class="col-xl-2 col-md-3 col-sm-5 col-10 text-center text-light mb-3" id="show">
                            <div class="card1 text-dark openpop3" id="${item.id}">
                                <img src="${item.image}" class="w-100" alt="">
                                <div class="content-2">
                                    <div class="branding">
                                        <span class="d-block">${item.brand} ${item.model}</span>
                                        <h4 id="${item.pages}">${item.pages} Pages</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                        let cleanHTML = DOMPurify.sanitize(appendHTML, { SAFE_FOR_JQUERY: true });
                        $('#categoryList').append(cleanHTML)
                      })

                      // open pop 3 and get pages of when the click on card

                      $('.openpop3').click(function (e) {
                        e.preventDefault();
                        $('.pop2').hide();
                        $('.pop3').show();
                        const pageCount = $(this).find('.content-2').find('h4').attr('id');
                        console.log("checkcheck:::>", $(this).find('.content-2').find('span')[0])
                        const pageCategory = $(this).find('.content-2').find('span')[0].innerText;
                        numberNoHyphens = pageCategory.replace("-", " ");
                        const printCategory = numberNoHyphens.replace(/&amp;/g, '&')
                        $('#categoryNameHeading').text(printCategory)
                        itemId = $(this).attr('id');


                        // check pages and show pagination 

                        if (pageCount > 1) {
                          function getPageList(totalPages, page, maxLength) {
                            function range(start, end) {
                              return Array.from(Array(end - start + 1), (_, i) => i + start);
                            }
                            const sideWidth = maxLength < 9 ? 1 : 2;
                            const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
                            const rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
                            if (totalPages <= maxLength) {
                              return range(1, totalPages);
                            }
                            if (page <= maxLength - sideWidth - 1 - rightWidth) {
                              return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
                            }
                            if (page >= totalPages - sideWidth - 1 - rightWidth) {
                              return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
                            }
                            return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
                          }
                          $(function () {
                            const numberOfItems = pageCount;
                            const totalPages = numberOfItems;
                            const paginationSize = 5; //How many page elements visible in the pagination
                            var currentPage;
                            function showPage(whichPage) {
                              if (whichPage < 1 || whichPage > totalPages) return false;
                              currentPage = whichPage;
                              let appendHTML = `
                              <div class="card">
                              <div class="card-image"><img id="print_img" src="https://manuals.viewmanuals.com/manuals/${itemId}/${whichPage}.jpg" alt="">
                              </div>
                              </div>
                            `;
                              let cleanHTML = DOMPurify.sanitize(appendHTML, { SAFE_FOR_JQUERY: true });
                              $('#allDetailsPage').append(cleanHTML);
                              $(".card-content .card").show().addClass('printPage');
                              $(".pagination li").slice(1, -1).remove();
                              getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                                $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                                  .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
                                    .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
                              });
                              $(".previous-page").toggleClass("disable", currentPage === 1);
                              $(".next-page").toggleClass("disable", currentPage === totalPages);
                              return true;
                            }
                            $(".pagination").append(
                              $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
                              $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
                            );
                            let appendBackwardHTML = "<i class='fa-solid fa-backward'></i>";
                            let appendForwardHTML = "<i class='fa-solid fa-forward'></i>";
                            let backwardCleanHTML = DOMPurify.sanitize(appendBackwardHTML, { SAFE_FOR_JQUERY: true });
                            let forwardCleanHTML = DOMPurify.sanitize(appendForwardHTML, { SAFE_FOR_JQUERY: true });
                            $(".paginationBtn").append(
                              $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).html(backwardCleanHTML)),
                              $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).html(forwardCleanHTML))
                            );
                            $(".card-content").show();
                            showPage(1);
                            $(document).on("click", ".pagination li.current-page:not(.active)", function () {
                              $(".card-content .card").removeClass('printPage').remove()
                              showPage(+$(this).text());
                            });
                            $(".next-page").on("click", function () {
                              if (currentPage == totalPages) {

                                $(".previous-page").toggleClass("disable");
                              } else {
                                $(".card-content .card").removeClass('printPage').remove()
                                showPage(currentPage + 1);
                              }
                            });
                            $(".previous-page").on("click", function () {
                              if (currentPage == 1) {
                                $(".previous-page").toggleClass("disable");
                              } else {
                                $(".card-content .card").removeClass('printPage').remove()
                                showPage(currentPage - 1);
                              }
                            });
                          });
                        }

                        // get page count 1 then show this

                        else {
                          $(".card-content").show();
                          let appendHTML = `
                          <div class="card printPage">
                          <div class="card-image"><img id="print_img" src="https://manuals.viewmanuals.com/manuals/${itemId}/1.jpg" alt="">
                          </div>
                          </div>
                        `
                          let cleanHTML = DOMPurify.sanitize(appendHTML, { SAFE_FOR_JQUERY: true });
                          $('#allDetailsPage').append(cleanHTML);
                        }
                      })
                    }
                  })
                  $("#categoryList #show").hide();
                  $("#addnumer li").slice(1, -1).remove();
                  ccgetPageList(ctotalPages, ccurrentPage, cpaginationSize).forEach(citem => {
                    $("<li>").addClass("page-item").addClass(citem ? "current-page" : "dots")
                      .toggleClass("active", citem === ccurrentPage).append($("<a>").addClass("page-link")
                        .attr({ href: "javascript:void(0)" }).text(citem || "...")).insertBefore(".next_page");
                  });
                  $(".previous-page").toggleClass("disable", ccurrentPage === 1);
                  $(".next_page").toggleClass("disable", ccurrentPage === ctotalPages);
                  return true;
                }
                $("#addnumer").append(
                  $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
                  $("<li>").addClass("page-item").addClass("next_page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
                );
                $("#categoryList").html("");
                $("#categoryList").show();
                ccshowPage(1);
                $(document).on("click", "#addnumer li.current-page:not(.active)", function () {
                  $('#categoryList').html("")
                  return ccshowPage(+$(this).text());
                });
                $(".next_page").on("click", function () {
                  if (ccshowPage(ccurrentPage + 1)) {
                    $('#categoryList').html("")
                  }
                });
                $(".previous-page").on("click", function () {
                  if (ccshowPage(ccurrentPage - 1)) {
                    $('#categoryList').html("")
                  }
                });
              });
            }

            // then get only 18 product or less then so this 

            else {
              $.ajax({
                url: `https://manuals.viewmanuals.com/get_manuals.php?q=get-manuals&category=${manualName}&page=1`,
                dataType: 'json',
                success: function (data) {
                  $('#categoryList').html('')
                  data.data.map((item) => {
                    // setTimeout(() => {
                    $("#inputloader").hide();
                    // }, 1000);
                    $('.pop1').hide();
                    let appendHTML = `
                    <div class="col-xl-2 col-md-3 col-sm-5 col-10 text-center text-light mb-3" id="show">
                        <div class="card1 text-dark openpop3" id="${item.id}">
                            <img src="${item.image}" class="w-100" alt="">
                            <div class="content-2">
                                <div class="branding">
                                    <span class="d-block">${item.brand} ${item.model}</span>
                                    <h4 id="${item.pages}">${item.pages} Pages</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    let cleanHTML = DOMPurify.sanitize(appendHTML, { SAFE_FOR_JQUERY: true });
                    $('#categoryList').append(cleanHTML);
                    $('.pop2').show();
                  })
                  $('.openpop3').click(function (e) {
                    e.preventDefault();
                    $('.pop2').hide();
                    $('.pop3').show();
                    const pageCount = $(this).find('.content-2').find('h4').attr('id');
                    const pageCategory = $(this).find('.content-2').find('span')[0].innerText;
                    numberNoHyphens = pageCategory.replace("-", " ");
                    const printCategory = numberNoHyphens.replace(/&amp;/g, '&')
                    $('#categoryNameHeading').text(printCategory)
                    itemId = $(this).attr('id');
                    if (pageCount > 1) {
                      function getPageList(totalPages, page, maxLength) {
                        function range(start, end) {
                          return Array.from(Array(end - start + 1), (_, i) => i + start);
                        }
                        const sideWidth = maxLength < 9 ? 1 : 2;
                        const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
                        const rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
                        if (totalPages <= maxLength) {
                          return range(1, totalPages);
                        }
                        if (page <= maxLength - sideWidth - 1 - rightWidth) {
                          return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
                        }
                        if (page >= totalPages - sideWidth - 1 - rightWidth) {
                          return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
                        }
                        return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
                      }
                      $(function () {
                        const numberOfItems = pageCount;
                        const limitPerPage = 1; //How many card items visible per a page
                        const totalPages = numberOfItems;
                        const paginationSize = 5; //How many page elements visible in the pagination
                        var currentPage;
                        function showPage(whichPage) {
                          if (whichPage < 1 || whichPage > totalPages) return false;
                          currentPage = whichPage;
                          let appendHTML = `
                          <div class="card">
                          <div class="card-image"><img id="print_img" src="https://manuals.viewmanuals.com/manuals/${itemId}/${whichPage}.jpg" alt="">
                          </div>
                          </div>
                        `;
                          let cleanHTML = DOMPurify.sanitize(appendHTML, { SAFE_FOR_JQUERY: true });
                          $('#allDetailsPage').append(cleanHTML);
                          $(".card-content .card").show().addClass('printPage');
                          $(".pagination li").slice(1, -1).remove();
                          getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                              .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
                                .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
                          });
                          $(".previous-page").toggleClass("disable", currentPage === 1);
                          $(".next-page").toggleClass("disable", currentPage === totalPages);
                          return true;
                        }
                        $(".pagination").append(
                          $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Prev")),
                          $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("Next"))
                        );
                        let appendBackwardHTML = "<i class='fa-solid fa-backward'></i>";
                        let appendForwardHTML = "<i class='fa-solid fa-forward'></i>";
                        let backwardCleanHTML = DOMPurify.sanitize(appendBackwardHTML, { SAFE_FOR_JQUERY: true });
                        let forwardCleanHTML = DOMPurify.sanitize(appendForwardHTML, { SAFE_FOR_JQUERY: true });
                        $(".paginationBtn").append(
                          $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).html(backwardCleanHTML)),
                          $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).html(forwardCleanHTML))
                        );
                        $(".card-content").show();
                        showPage(1);
                        $(document).on("click", ".pagination li.current-page:not(.active)", function () {
                          $(".card-content .card").removeClass('printPage').remove()
                          showPage(+$(this).text());
                        });
                        $(".next-page").on("click", function () {
                          if (currentPage == totalPages) {

                            $(".previous-page").toggleClass("disable");
                          } else {
                            $(".card-content .card").removeClass('printPage').remove()
                            showPage(currentPage + 1);
                          }
                        });
                        $(".previous-page").on("click", function () {
                          if (currentPage == 1) {
                            $(".previous-page").toggleClass("disable");
                          } else {
                            $(".card-content .card").removeClass('printPage').remove()
                            showPage(currentPage - 1);
                          }
                        });
                      });
                    } else {
                      let appendHTML = `
                      <div class="card printPage">
                      <div class="card-image"><img id="print_img" src="https://manuals.viewmanuals.com/manuals/${itemId}/1.jpg" alt="">
                      </div>
                      </div>
                    `;
                      let cleanHTML = DOMPurify.sanitize(appendHTML, { SAFE_FOR_JQUERY: true });
                      $('#allDetailsPage').append(cleanHTML);
                    }
                  })
                }
              })
            }
          }
        })
        $('#manualNameHeading').val('')
      });
    }
  })
})

$('.print').click(() => {
  if ($('.card').find("printPage")) {
    $('.printPage .card-image img').print()
  }
})

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