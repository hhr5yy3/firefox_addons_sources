let limit = 1;
let currentPage = 1;
let isLoading = false;

var randomNumber = Math.floor(Math.random() * 100) + 1;
$("#categoryPop").show();
$("#listOfcategoryPop").hide();
$("#templatePop").hide();
$("#masonry").html("");
$("#notFound").html("");
$("#showImage").html("");

$("#exampleModal1").on("hidden.bs.modal", function () {
  $("#modalsuggestions").addClass("clo");
  $("#categoryPop").show();
  $("#listOfcategoryPop").hide();
  $("#templatePop").hide();
  $("#masonry").html("");
  $("#notFound").html("");
  $("#showImage").html("");
  $("#categorySearch").val("");
  $("#modalsuggestions").html("");
});

$("#backtoCategoty").click(function () {
  $("#categoryPop").show();
  limit = 1;
  currentPage = 1;
  $("#listOfcategoryPop").hide();
  $("#masonry").html("");
  $("#notFound").html("");
  $("#searchIcon").removeAttr("data-id");
  $("#searchIcon").removeAttr("object-id");
  isLoading = false;
  $(".spinner-border").attr("hidden", true);
});

$("#backtoList").click(function () {
  const id = $(this).attr("data-id");
  if (id) {
    $('#backtoList').removeAttr('data-id')
    $("#categoryPop").show();
    $("#templatePop").hide();
  } else {
    $("#listOfcategoryPop").show();
    $("#templatePop").hide();
    $("#showImage").html("");
  }
});
$("#closeList").click(function () {
  $("#masonry").html("");
  $("#notFound").html("");
});

$.ajax({
  url: "https://viewtemplates.com/firefox/public/get_templates?q=get-category",
  success: function (result) {
    const data = JSON.parse(result).data;
    data.map((item) => {
      const title = item.type.replaceAll("-", " ");
      const mainDiv = document.createElement('div');
      const subDivmain = document.createElement('div')
      const image = document.createElement('img');
      const subDiv = document.createElement('div')

      image.src = item.url;
      image.alt = "image";
      subDivmain.appendChild(image);

      subDivmain.appendChild(subDiv);
      subDivmain.setAttribute("data-id", item.type);
      subDivmain.classList.add("card",);

      subDiv.classList.add('title', 'text-capitalize', 'text-center', 'd-flex', 'align-items-center', 'justify-content-center', 'mt-2')
      subDiv.textContent = title;

      mainDiv.appendChild(subDivmain);

      mainDiv.classList.add('col-xl-2', 'col-lg-3', 'col-md-4', 'col-sm-4', 'col-12');
      let cleanHTML = DOMPurify.sanitize(mainDiv, { SAFE_FOR_JQUERY: true });
      $("#cards").append(cleanHTML);
    });
  },
});


function fetchData(categoryType) {
  $("#notFound").html("");
  if (isLoading) return;
  isLoading = true;
  $(".spinner-border").attr("hidden", false);

  $("#modalsuggestions").addClass("clo");
  const title = categoryType.replaceAll("-", " ");
  $("#categoryPop").hide();
  $("#listOfcategoryPop").show();

  if (currentPage <= limit) {
    if ($("#searchIcon").attr("data-id")) {
      url1 = `https://viewtemplates.com/firefox/public/get_templates?q=search&value=${categoryType}&page=${currentPage}`;
      $("#listOfcategoryPopTitle").text("Search results");
    } else if ($("#searchIcon").attr("object-id")) {
      url1 = `https://viewtemplates.com/firefox/public/get_templates?q=search&value=${categoryType}&page=${currentPage}`;
      $("#listOfcategoryPopTitle").text("Search results");
    } else {
      $("#listOfcategoryPopTitle").text(title);
      url1 = `https://viewtemplates.com/firefox/public/get_templates?q=get-category-list&category=${categoryType}&page=${currentPage}`;
    }
    $.ajax({
      url: url1,
      success: function (result) {
        isLoading = false;
        $(".spinner-border").attr("hidden", true);
        const data = JSON.parse(result);
        limit = data.leangth;
        console.log("data?.data.", data?.data);
        console.log("data?.data.length", data?.data.length);
        if (data?.data.length === 0) {
          const pEle = document.createElement("p");
          pEle.textContent = "No data found";
          let cleanHTMLpEle = DOMPurify.sanitize(pEle, { SAFE_FOR_JQUERY: true });
          $("#notFound").append(cleanHTMLpEle);
        }
        data?.data?.map((item) => {
          console.log("item::::::::::::::::::>",item);
          const demo = item?.imgurl.split("/");
          const lastElemnt = demo[demo.length - 1];
          const prefix = lastElemnt.split(".");
          const lastElement1 = prefix[prefix.length - 1];

          const masonryDiv = document.createElement('div');
          const masonryvideo = document.createElement('video');
          const masonrysource = document.createElement('source');
          const masonryimg = document.createElement('img')

          masonryDiv.classList.add('mItem');
          masonryDiv.setAttribute("data-id", item.title);
          masonryDiv.setAttribute("data-title", item?.dowUrl)
          masonryDiv.setAttribute('id', item?.imgurl)
          masonryDiv.setAttribute('version', randomNumber)

          
          masonryvideo.classList.add('play')
          masonrysource.src = item?.imgurl
          masonrysource.setAttribute('version', randomNumber)
          masonrysource.setAttribute('type', "video/mp4")
          masonryimg.src = item?.imgurl
          masonryimg.alt = "image"
          masonryDiv.setAttribute('version', randomNumber)
          console.log("masonaryDiv::::::>>>>>", masonryDiv);
          
          
          
          if (lastElement1 == "mp4") {
            masonryDiv.appendChild(masonryvideo);
            masonryvideo.appendChild(masonrysource)
          } else {
            masonryDiv.appendChild(masonryimg);
          }
          let cleanHTMLmasonary = DOMPurify.sanitize(masonryDiv, { SAFE_FOR_JQUERY: true });
          $("#masonry").append(cleanHTMLmasonary);

        });
        isLoading = false;
        currentPage += 1;
      },
    });
  } else {
    isLoading = false;
    $(".spinner-border").attr("hidden", true);
  }
  $("#categorySearch").val("");
}

$(document).on("click", ".card", function () {
  const categoryType = $(this).attr("data-id");
  fetchData(categoryType);
});

var modal = $("#galleryMain");

modal.on("scroll", function () {
  if (modal.scrollTop() + modal.innerHeight() >= modal[0].scrollHeight - 1) {
    if ($("#searchIcon").attr("data-id")) {
      categoryType = $("#searchIcon").attr("data-id");
      fetchData(categoryType);
    } else if ($("#searchIcon").attr("object-id")) {
      categoryType = $("#searchIcon").attr("object-id");
      fetchData(categoryType);
    } else {
      let categoryType = $(
        "#listOfcategoryPopTitle"
      )[0].innerText.toLowerCase();
      categoryType = categoryType.replaceAll(" ", "-");
      fetchData(categoryType);
    }
  }
});

$(document).on("click", ".mItem", function () {
  var templateTitle = $(this).attr("data-id");
  var templateDow = $(this).attr("data-title");
  var templateUrl = $(this).attr("id");
  var paste = templateTitle.replaceAll("-", " ");
  var txtCapital = paste.substring(0, 1).toUpperCase() + paste.substring(1);
  $("#templatesTxt").text(txtCapital);
  $("#templatePop").show();
  $("#listOfcategoryPop").hide();
  const demo = templateUrl.split("/");
  const lastElemnt = demo[demo.length - 1];
  const prefix = lastElemnt.split(".");
  const lastElement1 = prefix[prefix.length - 1];
  if (lastElement1.includes("mp4")) {
    $("#showImage").html("");
    const videoEle = document.createElement("video");
    const sourceEle = document.createElement("source");
    videoEle.setAttribute("controls", "true")
    sourceEle.src = templateUrl;
    sourceEle.type = "video/mp4";
    videoEle.appendChild(sourceEle);
    let cleanHTMLvideoEle = DOMPurify.sanitize(videoEle, { SAFE_FOR_JQUERY: true });
    $("#showImage").append(cleanHTMLvideoEle);
    
  } else {
    $("#showImage").html("");
    const imgEle = document.createElement('img');
    imgEle.src = templateUrl;
    imgEle.alt = "image";
    let cleanHTMLimgEle = DOMPurify.sanitize(imgEle, { SAFE_FOR_JQUERY: true });
    $("#showImage").append(cleanHTMLimgEle);
  }
  $("#btn-main").html("");
  const buttonEle = document.createElement("a");
  buttonEle.className = "btn mb-2";
  buttonEle.href = templateDow;
  buttonEle.textContent = "Download";
  let cleanHTMLbuttonEle = DOMPurify.sanitize(buttonEle, { SAFE_FOR_JQUERY: true });
  $("#btn-main").append(cleanHTMLbuttonEle);
});

$("input#categorySearch").on("input", function (e) {

  const val = $(this).val().toLowerCase();
  let removeSpace = val.trim();
  $.ajax({
    url: `https://viewtemplates.com/firefox/public/get_templates?q=search&value=${val}`,
    success: function (result) {
      const data = JSON.parse(result).data;
      $("#modalsuggestions").html("");
      if (removeSpace.length > 0) {
        data?.forEach(function (item) {
          var paste = item.title.replaceAll("-", " ");
          var resultElement = item.title.replaceAll("-", " ");
          var txtCapital =
            resultElement.substring(0, 1).toUpperCase() + paste.substring(1);

          const modalsuggestionLi = document.createElement('li');
          const modalsuggestionA = document.createElement('a');
          const modalsuggestionI = document.createElement('i');
          const modalsuggestionP = document.createElement('p');

          modalsuggestionLi.classList.add('autocomplete-modal');
          modalsuggestionA.setAttribute('data-id', txtCapital);
          modalsuggestionI.classList.add('fa-solid', 'fa-magnifying-glass', 'me-2')

          modalsuggestionP.textContent = txtCapital

          modalsuggestionLi.appendChild(modalsuggestionA);
          modalsuggestionLi.appendChild(modalsuggestionP);
          modalsuggestionA.appendChild(modalsuggestionI);
          // console.log('modalsuggestions',modalsuggestionLi);

          let cleanmodalsuggestionLi = DOMPurify.sanitize(modalsuggestionLi, { SAFE_FOR_JQUERY: true });
          $("#modalsuggestions").append(cleanmodalsuggestionLi);

          $("#modalsuggestions").removeClass("clo");
        });
      } else {
        $("#modalsuggestions").html("");
        $("#modalsuggestions").addClass("clo");
      }
    },
  });
});

var li1 = $(".autocomplete-modal");
var liSelect;
$("input#categorySearch").keydown(function (e) {
  let val = $(".select>a").attr("data-id");
  li1 = $(".autocomplete-modal");
  let topSearch = $("#categorySearch").val();
  let top = $("#modalsuggestions li").length;
  if (e.which === 40) {
    if (liSelect) {
      liSelect.removeClass("select");
      next = liSelect.next();
      if (next.length > 0) {
        liSelect = next.addClass("select");
        $("#categorySearch").val(liSelect.text());
      } else {
        liSelect = li1.eq(0).addClass("select");
        $("#categorySearch").val(liSelect.text());
      }
    } else {
      liSelect = li1.eq(0).addClass("select");
      $("#categorySearch").val(li1.eq(0).text());
    }
  } else if (e.which === 38) {
    if (liSelect) {
      liSelect.removeClass("select");
      next = liSelect.prev();
      if (next.length > 0) {
        liSelect = next.addClass("select");
        $("#categorySearch").val(liSelect.text());
      } else {
        liSelect = li1.last().addClass("select");
        $("#categorySearch").val(liSelect.text());
      }
    } else {
      liSelect = li1.last().addClass("select");
      $("#categorySearch").val(li1.last().text());
    }
  } else if (e.which === 27) {
    $("#categorySearch").val("");
    $("#modalsuggestions").html("");
    return false;
  } else if (e.which === 13) {
    if (top > 0) {
      if (val) {
        $(".spinner-border").attr("hidden", false);
        $.ajax({
          url: `https://viewtemplates.com/firefox/public/get_templates?q=search&value=${val.toLowerCase()}`,
          success: function (result) {
            $(".spinner-border").attr("hidden", true);
            const data = JSON.parse(result).data;
            $("#backtoList").attr("data-id", "1");
            let title = val.replaceAll("-", " ");
            var txtCapital =
              title.substring(0, 1).toUpperCase() + title.substring(1);
            $("#templatesTxt").text(txtCapital);
            $("#categoryPop").hide();
            $("#templatePop").show();
            $("#listOfcategoryPop").hide();
            console.log("data", data)
            data.map((item) => {
              console.log("run run", item)

              const demo = item.imgurl.split("/");
              const lastElemnt = demo[demo.length - 1];
              const prefix = lastElemnt.split(".");
              const lastElement1 = prefix[prefix.length - 1];
              if (lastElement1 == "mp4") {
                $("#showImage").html("");
                const videoEle = document.createElement("video");
                const sourceEle = document.createElement("source");
                videoEle.setAttribute("controls", "true")
                sourceEle.src = `${item.imgurl}?version=${randomNumber}`;
                sourceEle.type = "video/mp4";
                videoEle.appendChild(sourceEle);
                let cleanHTMLvideoEle = DOMPurify.sanitize(videoEle, { SAFE_FOR_JQUERY: true });
                $("#showImage").append(cleanHTMLvideoEle);
                
              } else {
                $("#showImage").html("");
                const imgEle = document.createElement('img');
                imgEle.src = `${item.imgurl}?version=${randomNumber}`;
                imgEle.alt = "image";
                let cleanHTMLimgEle = DOMPurify.sanitize(imgEle, { SAFE_FOR_JQUERY: true });
                $("#showImage").append(cleanHTMLimgEle);
              }
              $("#btn-main").html("");
              const buttonEle = document.createElement("a");
              buttonEle.className = "btn mb-2";
              buttonEle.href = item.dowUrl;
              buttonEle.textContent = "Download";
              let cleanHTMLbuttonEle = DOMPurify.sanitize(buttonEle, { SAFE_FOR_JQUERY: true });
              $("#btn-main").append(cleanHTMLbuttonEle);
            });
          },
        });
      } else if (topSearch) {
        var change = topSearch.toLowerCase();
        $("#searchIcon").attr("object-id", topSearch);
        fetchData(change);
      }
    }
  }
});

$(document).on("click", ".autocomplete-modal", function () {
  $(".spinner-border").attr("hidden", false);
  const liValue = $(this).find("a").attr("data-id");
  const change = liValue.replaceAll(" ", "-").toLowerCase();
  $.ajax({
    url: `https://viewtemplates.com/firefox/public/get_templates?q=search&value=${change}`,
    success: function (result) {
      $(".spinner-border").attr("hidden", true);
      const data = JSON.parse(result).data;
      $("#backtoList").attr("data-id", "1");
      let title = liValue.replaceAll("-", " ");
      var txtCapital =
        title.substring(0, 1).toUpperCase() + title.substring(1);
      $("#templatesTxt").text(txtCapital);
      $("#categoryPop").hide();
      $("#templatePop").show();
      $("#listOfcategoryPop").hide();
      const item = data[0];
      const demo = item.imgurl.split("/");
      const lastElemnt = demo[demo.length - 1];
      const prefix = lastElemnt.split(".");
      const lastElement1 = prefix[prefix.length - 1];
      if (lastElement1 == "mp4") {
        $("#showImage").html("");
        const videoEle = document.createElement("video");
        const sourceEle = document.createElement("source");
        videoEle.setAttribute("controls", "true")
        sourceEle.src = `${item.imgurl}?version=${randomNumber}`;
        sourceEle.type = "video/mp4";
        videoEle.appendChild(sourceEle);
        let cleanHTMLvideoEle = DOMPurify.sanitize(videoEle, { SAFE_FOR_JQUERY: true });
        $("#showImage").append(cleanHTMLvideoEle);
      } else {
        $("#showImage").html("");
        const imgEle = document.createElement('img');
        imgEle.src = `${item.imgurl}?version=${randomNumber}`;
        imgEle.alt = "image";
        let cleanHTMLimgEle = DOMPurify.sanitize(imgEle, { SAFE_FOR_JQUERY: true });
        $("#showImage").append(cleanHTMLimgEle);
      }
      $("#btn-main").html("");
      const buttonEle = document.createElement("a");
      buttonEle.className = "btn mb-2";
      buttonEle.href = item.dowUrl;
      buttonEle.textContent = "Download";
      let cleanHTMLbuttonEle = DOMPurify.sanitize(buttonEle, { SAFE_FOR_JQUERY: true });
      $("#btn-main").append(cleanHTMLbuttonEle);
    },
  });
});

$(document).on("click", "#searchIcon", function () {

  let categoryType = $("#categorySearch")
    .val()
    .replaceAll(" ", "-")
    .toLowerCase();
  if (categoryType.length > 0) {
    $("#searchIcon").attr("data-id", categoryType);
    fetchData(categoryType);
  }
});

$(document).on("click", "input#categorySearch", function () {
  $("#modalsuggestions").addClass("open");
  $("#modalsuggestions").removeClass("closed");
  $("#modalsuggestions").html("");
});

$(".modal").click(() => {
  $("#modalsuggestions").addClass("closed");
});
