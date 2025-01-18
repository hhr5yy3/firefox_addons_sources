function findDOMElement(element, classes) {
  var p = 0;
  while (
    p < classes.length &&
    !document.querySelectorAll(element + '[class*="' + classes[p] + '"]').length
  ) {
    p++;
  }
  return p;
}

function partslink() {
  var classes = ["text-truncate text-primary"];
  var i = 2;
  element = "div";
  var detailsComponent;
  var model = "";
  var vinNumber = "";
  var category;
  var carBrand;

  if (window.location.href.includes("vin")) {
    if (document.getElementsByClassName("breadcrumb dlgKeeper").length > 0) {
      detailsComponent = document.getElementsByClassName(
        "breadcrumb dlgKeeper"
      );
      category = detailsComponent[detailsComponent.length - 2].title;
      model += detailsComponent[1].title.split(" - ")[1];
      vinNumber = detailsComponent[1].title.split(" - ")[0];
    }
  } else {
    if (!window.location.href.includes("startup.do")) {
      const regex = /\w+_parts/;
      const match = regex.exec(window.location.href);
      carBrand = match[0].split("_")[0];

      if (
        document.querySelectorAll(
          ".p5_breadcrumb.link:not(.p5_breadcrumb_prevnext)"
        ).length > 0
      ) {
        detailsComponent = document.querySelectorAll(
          ".p5_breadcrumb.link:not(.p5_breadcrumb_prevnext)"
        );
        var i;
        category = detailsComponent[detailsComponent.length - 1].innerText;
        if (document.getElementsByClassName("p5_vehicle_info_vin")[0]) {
          i = 2;
          vinNumber = document.getElementsByClassName("p5_vehicle_info_vin")[0]
            .innerText;
        } else {
          i = 1;
        }
        var modelLength = document.getElementsByClassName(
          "p5_vehicle_info_vin"
        )[0]
          ? 3
          : 2;
        for (i; i < modelLength; i++) {
          model += detailsComponent[i].innerText + " ";
        }
      }
      if (document.getElementsByClassName("breadcrumb dlgKeeper").length > 0) {
        detailsComponent = document.getElementsByClassName(
          "breadcrumb dlgKeeper"
        );
        category = detailsComponent[detailsComponent.length - 2].title;
        var i = 1;
        for (i; i < 2; i++) {
          model += detailsComponent[i].title + " ";
        }
      }
    }
  }

  p = findDOMElement(element, classes);
  arr[0] = "OE";
  if (p < classes.length) {
    el = document.querySelectorAll(element + '[class*="' + classes[p] + '"]');
    var arr = new Array(el.length > 0 ? el.length : 1);
    j = 1;
    for (; i < el.length; i++) {
      if (
        el[i].innerText.length &&
        el[i].innerText &&
        el[i].innerText != undefined &&
        !el[i].innerText.toUpperCase().includes("NUMER")
      ) {
        arr[j] = el[i].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=PARTS_LINK" +
            "&carBrand=" +
            carBrand +
            "&category=" +
            category +
            "&vin=" +
            vinNumber +
            "&model=" +
            model +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  }
}

/*
zrobione
działa ikony + zliczanie
*/
function renderIconForPartsLink() {
  const browserName = navigator.userAgent;

  if (browserName.includes("Firefox")) {
    return `<span style="color: #3a93d0;font-size: 18px;font-weight: bold;">M</span>`;
  } else {
    return `<img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png" />`;
  }
}
const observer = new MutationObserver(() => {
  if (window.location.href.includes("partslink24.com")) {
    setTimeout(function () {
      var detailsComponent;
      var model = "";
      var vinNumber = "";
      var category;
      var carBrand;

      if (window.location.href.includes("vin")) {
        if (
          document.getElementsByClassName("breadcrumb dlgKeeper").length > 0
        ) {
          detailsComponent = document.getElementsByClassName(
            "breadcrumb dlgKeeper"
          );
          category = detailsComponent[detailsComponent.length - 2].title;
          model += detailsComponent[1].title.split(" - ")[1];
          vinNumber = detailsComponent[1].title.split(" - ")[0];
        }
      } else {
        if (!window.location.href.includes("startup.do")) {
          const regex = /\w+_parts/;
          const match = regex.exec(window.location.href);
          carBrand = match[0].split("_")[0];

          if (
            document.querySelectorAll(
              ".p5_breadcrumb.link:not(.p5_breadcrumb_prevnext)"
            ).length > 0
          ) {
            detailsComponent = document.querySelectorAll(
              ".p5_breadcrumb.link:not(.p5_breadcrumb_prevnext)"
            );
            var i;
            category = detailsComponent[detailsComponent.length - 1].innerText;
            if (document.getElementsByClassName("p5_vehicle_info_vin")[0]) {
              i = 1;
              vinNumber = document.getElementsByClassName(
                "p5_vehicle_info_vin"
              )[0].innerText;
            } else {
              i = 1;
            }

            for (i; i < 2; i++) {
              model += detailsComponent[i].innerText + " ";
            }
          }
          if (
            document.getElementsByClassName("breadcrumb dlgKeeper").length > 0
          ) {
            detailsComponent = document.getElementsByClassName(
              "breadcrumb dlgKeeper"
            );
            category = detailsComponent[detailsComponent.length - 2].title;
            var i = 1;
            for (i; i < 2; i++) {
              model += detailsComponent[i].title + " ";
            }
          }
        }
      }
      if (
        window.location.href.includes("toyota") ||
        window.location.href.includes("lexus")
      ) {
        el = document.getElementsByClassName(
          "p5_table_cell p5t1_partno cp_selectable"
        );

        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "OE";
        j = 1;
        i = 0;
        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (!el[i].innerHTML.includes("app.motorro.eu")) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
      if (window.location.href.includes("spa")) {
        el = document.getElementsByClassName("portnoFormatted tc-mcell ");
        var arr = new Array(el.length > 0 ? el.length : 1);

        arr[0] = "OE";
        j = 1;
        i = 1;
        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (!el[i].innerHTML.includes("app.motorro.eu")) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
      if (window.location.href.includes("fiatspa")) {
        el = document.getElementsByClassName("partnoHtml tc-mcell  dynaheight");
        var arr = new Array(el.length > 0 ? el.length : 1);

        arr[0] = "OE";
        j = 1;
        i = 1;
        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (!el[i].innerHTML.includes("app.motorro.eu")) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
      if (window.location.href.includes("iveco")) {
        el = document.getElementsByClassName("partno tc-mcell ");
        var arr = new Array(el.length > 0 ? el.length : 1);

        arr[0] = "OE";
        j = 1;
        i = 1;
        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (!el[i].innerHTML.includes("app.motorro.eu")) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
      if (window.location.href.includes("daimler")) {
        el = document.getElementsByClassName("tc-mcell partnoFormattedHTML");
        var arr = new Array(el.length > 0 ? el.length : 1);

        arr[0] = "OE";
        j = 1;
        i = 1;
        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (!el[i].innerHTML.includes("app.motorro.eu  ")) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
      if (window.location.href.includes("opel")) {
        el = document.getElementsByClassName("gmNo tc-mcell ");
        var arr = new Array(el.length > 0 ? el.length : 1);

        arr[0] = "OE";
        j = 1;
        i = 1;
        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (!el[i].innerHTML.includes("app.motorro.eu")) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
      if (
        window.location.href.includes("volvo") ||
        window.location.href.includes("citroen") ||
        window.location.href.includes("peugeot")
      ) {
        el = document.getElementsByClassName("portnoFormatted tc-mcell ");
        var arr = new Array(el.length > 0 ? el.length : 1);

        arr[0] = "OE";
        j = 1;
        i = 1;
        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (!el[i].innerHTML.includes("app.motorro.eu")) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
      if (
        window.location.href.includes("ford") ||
        window.location.href.includes("hyundai-kia-automotive-group") ||
        window.location.href.includes("nissan") ||
        window.location.href.includes("mitsubishi")
      ) {
        el = document.getElementsByClassName("tc-mcell finis");
        var arr = new Array(el.length > 0 ? el.length : 1);

        el_for_click = document.getElementsByClassName("tc-row tc-data-row ");

        let i = 0;
        for (; i < el_for_click.length; i++) {
          el_for_click[i].addEventListener("click", function () {
            setTimeout(function () {
              el = document.getElementsByClassName("tc-mcell partno");
              var arr = new Array(el.length > 0 ? el.length : 1);
              arr[0] = "EXTENSION";
              j = 1;
              for (var i = 2; i < el.length; i++) {
                arr[j] = el[i].innerText;
                j += 1;
                if (!el[i].innerHTML.includes("app.motorro.eu") || arr[j]) {
                  el[i].innerHTML +=
                    '<a target="_blank" style="color: white;" href="' +
                    "https://app.motorro.eu/dashboard/search?value=" +
                    el[i].innerText.replace("/", "").replace(/\s/g, "") +
                    "&searchType=" +
                    arr[0] +
                    "&catalogName=PARTS_LINK" +
                    "&carBrand=" +
                    carBrand +
                    "&category=" +
                    category +
                    "&vin=" +
                    vinNumber +
                    "&model=" +
                    model +
                    '">' +
                    renderIconForPartsLink() +
                    "</a>";
                }
              }
            }, 1000);
          });
        }
      }
      if (
        window.location.href.includes("dacia") ||
        window.location.href.includes("renault") ||
        window.location.href.includes("man")
      ) {
        el = document.getElementsByClassName("bomPartno tc-mcell");
        var arr = new Array(el.length > 0 ? el.length : 1);

        arr[0] = "OE";
        j = 1;
        i = 0;
        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (!el[i].innerHTML.includes("app.motorro.eu")) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
      var classes = ["portno", "partno", "Partno", "gmNo", "partnoHtml"];
      var i = 2;

      element = "div";

      p = findDOMElement(element, classes);

      if (p >= classes.length) {
        p = findDOMElement(element, classes);
        element = "div";
        i = 1;
      }
      if (p < classes.length) {
        el = document.querySelectorAll(
          element + '[class*="' + classes[p] + '"]'
        );
        var arr = new Array(el.length > 0 ? el.length : 1);

        arr[0] = "OE";
        j = 1;

        for (; i < el.length; i++) {
          if (
            el[i].innerText.length &&
            el[i].innerText &&
            el[i].innerText !== "" &&
            el[i].innerText != undefined &&
            !el[i].innerText.toUpperCase().includes("NUMER")
          ) {
            arr[j] = el[i].innerText;
            j += 1;
            if (
              !el[i].innerHTML.includes("app.motorro.eu") &&
              el[i].innerText.trim().length > 0
            ) {
              el[i].innerHTML +=
                '<a target="_blank" style="color: white; margin-left:5px;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=PARTS_LINK" +
                "&carBrand=" +
                carBrand +
                "&category=" +
                category +
                "&vin=" +
                vinNumber +
                "&model=" +
                model +
                '">' +
                renderIconForPartsLink() +
                "</a>";
            }
          }
        }
      }
    }, 1000);
  } else if (window.location.href.includes("oferta.gordon")) {
    var el = document.getElementsByClassName(
      "c-product-criteria__item font-weight-bold"
    );
    var el_on_product_card = document.getElementsByClassName(
      "grid-article-page__details"
    );
    var el_sub = document.getElementsByClassName("c-product__display-code");
    var arr = new Array(el.length > 0 ? el.length : 1);
    var arr_sub = new Array(el_sub.length > 0 ? el_sub.length : 1);
    arr[0] = "EXTENSION";
    if (el_on_product_card.length > 0) {
      if (
        !el_on_product_card[0].children[1].children[1].innerHTML.includes(
          "app.motorro.eu"
        )
      ) {
        el_on_product_card[0].children[1].children[1].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el_on_product_card[0].children[1].children[1].innerText
            .replace("/", "")
            .replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=GORDON" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"</a>';
      }
    }
    if (arr_sub) {
      var m = 1;
      for (var k = 0; k < el_sub.length; k++) {
        arr_sub[m] = el_sub[k].children[0].innerText;
        m += 1;
        if (!el_sub[k].innerHTML.includes("motorro")) {
          (function (index) {
            var onClickHandler = function (event) {
              event.stopPropagation();
              event.preventDefault();
              window
                .open(
                  "https://app.motorro.eu/dashboard/search?value=" +
                    el_sub[index].children[0].innerText
                      .replace("/", "")
                      .replace(/\s/g, "") +
                    "&searchType=" +
                    arr[0] +
                    "&catalogName=AUTO_GH"
                )
                .focus();
            };

            el_sub[index].innerHTML +=
              '<a id="motorro" target="_blank" style="color: white;"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"</a>';

            el_sub[index].addEventListener("click", onClickHandler);
          })(k);
        }
      }
    }
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText.split(":")[1];
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.split(":")[1].replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=GORDON" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"</a>';
      }
    }
  } else if (window.location.href.includes("katalog.motorol")) {
    if (window.location.href.includes("replacements")) {
      var article_index = document.getElementsByClassName(
        "d-flex flex-column mb-3"
      )[0].children[1];
      var article_subs = document.getElementsByClassName(
        "row no-gutters row--hover row--pointer px-3 py-2"
      );
      var arr = new Array(article_subs.length > 0 ? article_subs.length : 1);
      arr[0] = "EXTENSION";
      j = 1;
      if (!article_index.innerHTML.includes("motorro")) {
        var onClickHandler = function (event) {
          event.stopPropagation();
          window
            .open(
              "https://app.motorro.eu/dashboard/search?value=" +
                article_index.innerText.replace("/", "").replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=MOTOROL_KATALOG",
              "_blank"
            )
            .focus();
        };

        article_index.innerHTML +=
          '<a id="motorro" target="_blank" style="color: white;"><img style="max-width: 25px;margin-left:10px; cursor:pointer;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';

        article_index.addEventListener("click", onClickHandler);
      }
      for (var i = 0; i < article_subs.length; i++) {
        arr[j] = article_subs[i].children[1].children[1].innerText;
        j += 1;
        if (
          !article_subs[i].children[1].children[1].innerHTML.includes("motorro")
        ) {
          (function (index) {
            var onClickHandler = function (event) {
              event.stopPropagation();
              window
                .open(
                  "https://app.motorro.eu/dashboard/search?value=" +
                    article_subs[index].children[1].children[1].innerText
                      .replace("/", "")
                      .replace(/\s/g, "") +
                    "&searchType=" +
                    arr[0] +
                    "&catalogName=MOTOROL_KATALOG",
                  "_blank"
                )
                .focus();
            };

            article_subs[index].children[1].children[1].innerHTML +=
              '<a id="motorro" target="_blank" style="color: white;"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';

            article_subs[index].children[1].children[1].addEventListener(
              "click",
              onClickHandler
            );
          })(i);
        }
      }
    } else if (
      window.location.href.includes("wyniki-wyszukiwania") ||
      window.location.href.includes("czesci-samochodowe") ||
      window.location.href.includes("oleje") ||
      window.location.href.includes("wyposazenie") ||
      window.location.href.includes("nowosci")
    ) {
      var el = document.getElementsByClassName(
        "u-text--5 u-text--medium u-text--underline u-text--secondary mb-0"
      );
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=MOTOROL_KATALOG" +
            '"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else if (document.location.href.includes("katalog-vin")) {
      var el = document.getElementsByClassName(
        "u-text--5 u-text--medium u-text--underline u-text--secondary mb-0"
      );

      var el_in_list = document.getElementsByClassName(
        "u-text--13 u-text--h16 d-block"
      );

      var arr_for_list = new Array(
        el_in_list.length > 0 ? el_in_list.length : 1
      );
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr_for_list[0] = "EXTENSION";
      arr[0] = "EXTENSION";

      var k = 1;
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=MOTOROL_KATALOG" +
            '"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"</a>';
        }
      }
      for (var m = 0; m < el_in_list.length; m++) {
        arr_for_list[k] = el_in_list[m].innerText.split("-")[1];
        k += 1;
        if (
          !el_in_list[m].innerHTML.includes("app.motorro.eu") &&
          el_in_list[m].innerText.split("-").length > 2 &&
          !el_in_list[m].innerText.includes("nie dla tego modelu")
        ) {
          el_in_list[m].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el_in_list[m].innerText
              .split("-")[1]
              .replace("/", "")
              .replace(/\s/g, "") +
            "&searchType=" +
            arr_for_list[0] +
            "&catalogName=MOTOROL_KATALOG" +
            '"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"</a>';
        }
      }
    } else {
      var el_main = document.getElementsByClassName(
        "d-flex flex-column mb-3"
      )[0].children[1];
      var el = document.getElementsByClassName("u-text--gray-darker mb-0");
      var arr = new Array(el.length > 0 ? el.length : 1);
      arr[0] = "EXTENSION";

      if (!el_main.innerHTML.includes("app.motorro.eu")) {
        el_main.innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el_main.innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=MOTOROL_KATALOG" +
          '"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }

      var j = 1;

      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("motorro")) {
          (function (index) {
            var onClickHandler = function (event) {
              event.stopPropagation();
              window
                .open(
                  "https://app.motorro.eu/dashboard/search?value=" +
                    el[index].innerText.replace("/", "").replace(/\s/g, "") +
                    "&searchType=" +
                    arr[0] +
                    "&catalogName=MOTOROL_KATALOG",
                  "_blank"
                )
                .focus();
            };

            el[index].innerHTML +=
              '<a id="motorro" target="_blank" style="color: white;"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';

            el[index].addEventListener("click", onClickHandler);
          })(i);
        }
      }
    }
  } else if (
    window.location.href.includes("katalog.profiauto.net") ||
    window.location.href.includes("https://matusiewicz.profiauto.net")
  ) {
    var el, i, j;

    if (window.location.href.includes("artykuly")) {
      el = document.getElementsByClassName("m-products_index");
      var arr = new Array(el.length > 0 ? el.length : 1);
      arr[0] = "EXTENSION";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].children[1].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          var onClick =
            "window.open('https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=MOTO_PROFIL" +
            "','_blank').focus();";

          el[i].innerHTML +=
            '<a onClick="' +
            onClick +
            '" target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=MOTO_PROFIL" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png">/></a>';
        }
      }
    }
  } else if (window.location.href.includes("katalog.autopartner.pl")) {
    var el, i, j;

    el = document.getElementsByClassName("marked name-labels");
    var arr = new Array(el.length > 0 ? el.length : 1);
    arr[0] = "EXTENSION";
    j = 1;

    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText.split("PROMOCJA")[0];
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText
            .split("PROMOCJA")[0]
            .replace("/", "")
            .replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=AUTO_PARTNER_GDANSK" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("ap.webkatalog.pl")) {
    var el, j, el_for_icon;
    el = document.getElementsByClassName("tow-lista-naglowek-pozycji");

    el_for_icon = document.getElementsByClassName("tow-lista-naglowek-pozycji");
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "EXTENSION";
    j = 1;
    for (var i = 0; i < el.length; i++) {
      if (
        window.location.href.includes("ListaPojazd") ||
        window.location.href.includes("Artykul") ||
        window.location.href.includes("artykul")
      ) {
        arr[j] = el[i].children[1].children[4].innerText;
        j += 1;

        var onClick =
          "window.open('https://app.motorro.eu/dashboard/search?value=" +
          el[i].children[1].children[4].innerText
            .replace("/", "")
            .replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=AP_WEBKATALOG" +
          "','_blank').focus();";

        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          console.log("nie zawiera");
          console.log(onClick.split("window"));
          el[i].innerHTML +=
            '<a onClick="' +
            onClick +
            '"><img style="max-width: 25px;cursor:pointer;margin-left:10px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      } else if (window.location.href.includes("ListaKU")) {
        var onClick =
          "window.open('https://app.motorro.eu/dashboard/search?value=" +
          el[i].children[1].children[4].innerText
            .replace("/", "")
            .replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "','_blank').focus();";

        arr[j] = el[i].children[1].children[4].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a onClick="' +
            onClick +
            '"><img style="max-width: 25px;cursor:pointer;margin-left:10px;" src="https://files.motorro.eu/img/icons/iconsquare.png"></a>';
        }
      }
    }
  } else if (window.location.href.includes("katalog.elitpolska.pl")) {
    var el = document.getElementsByClassName("ni");
    var el_for_icon = document.getElementsByClassName("photo has-border");
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "EXTENSION";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText;

      j += 1;
    }
    for (var i = 0; i < el_for_icon.length; i++) {
      arr[j] = el[i].innerText;

      j += 1;
      if (!el_for_icon[i].innerHTML.includes("app.motorro.eu")) {
        el_for_icon[i].innerHTML +=
          '<br/><a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=ELIT" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("katalog.hipol.pl")) {
    var el = document.getElementsByClassName("marked name-labels");
    var el_producer = document.getElementsByClassName("item-name");

    var arr = new Array(el.length > 0 ? el.length : 1);
    arr[0] = "EXTENSION";
    var j = 1;

    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText;
      if (el[i].childElementCount > 0)
        arr[j] = arr[j].replace(el[i].children[0].innerText, "");
      j += 1;
      var tempProducer = "";

      if (el_producer[i].childElementCount === 1) {
        tempProducer = el_producer[i].children[0].innerText;
      }
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=HIPOL" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("ezamowienia.motorol.pl")) {
    var el, j, el_sub;
    if (window.location.href.includes("searcharticleswithstate")) {
      el = document.getElementsByClassName("code");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=MOTOROL_EZAMOWIENIA" +
            '"><img style="max-width: 25px;cursor:pointer;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
        chrome.runtime.sendMessage({ method: "setInfo", info: arr });
      }
    } else if (window.location.href.includes("articledetail")) {
      el = document.getElementById(
        "ctl00_pagecontext_ordercontrol1_PanelArticle"
      ).children[0].children[1];
      el_sub = document.getElementsByClassName("code");
      var arr = new Array(el.length > 0 ? el.length : 1);
      var arr_sub = new Array(el_sub.length > 0 ? el_sub.length : 1);

      arr[0] = "EXTENSION";
      j = 1;
      if (!el.innerHTML.includes("app.motorro.eu")) {
        var onClick =
          "window.open('https://app.motorro.eu/dashboard/search?value=" +
          el.innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=MOTOROL_EZAMOWIENIA" +
          "','_blank').focus();";

        if (!el.innerHTML.includes("app.motorro.eu")) {
          el.innerHTML +=
            '<a onClick="' +
            onClick +
            '"><img style="max-width: 25px;cursor:pointer;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
        for (var i = 0; i < el_sub.length; i++) {
          arr_sub[j] = el_sub[i].innerText;
          j += 1;
          if (!el_sub[i].innerHTML.includes("motorro")) {
            (function (index) {
              var onClickHandler = function (event) {
                event.preventDefault();
                event.stopPropagation();
                window
                  .open(
                    "https://app.motorro.eu/dashboard/search?value=" +
                      el_sub[index].innerText
                        .replace("/", "")
                        .replace(/\s/g, "") +
                      "&searchType=" +
                      arr[0] +
                      "&catalogName=MOTOROL_EZAMOWIENIA"
                  )
                  .focus();
              };

              el_sub[index].innerHTML +=
                '<a id="motorro" target="_blank" style="color: white;"><img style="max-width: 25px;margin-left:10pxcursor:pointer;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';

              el_sub[index].addEventListener("click", onClickHandler);
            })(i);
          }
        }
      }
    } else if (window.location.href.includes("crossreference")) {
      el = document.getElementsByClassName("code");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerHTML;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=MOTOROL_EZAMOWIENIA" +
            '"><img style="max-width: 25px;cursor:pointer;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
        chrome.runtime.sendMessage({ method: "setInfo", info: arr });
      }
    } else {
      el = document.getElementsByClassName("partscontrol-box-detail-link");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerHTMLF;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=MOTOROL_EZAMOWIENIA" +
            '"><img style="max-width: 25px;cursor:pointer;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("tecalliance.net")) {
    setTimeout(function () {
      partslink();
      document.addEventListener("DOMNodeInserted", function () {
        partslink();
      });
    }, 1000);
  } else if (window.location.href.includes("katalog.gordon.com.pl")) {
    var el = document.getElementsByClassName("in_03");
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "EXTENSION";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText.replace(el[i].innerText.split(" ").pop(), "");
      if (el[i].childElementCount > 0)
        arr[j] = arr[j].replace(el[i].children[0].innerText, "");
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText
            .replace(el[i].innerText.split(" ").pop(), "")
            .replace("/", "")
            .replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=GORDON" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("realoem.com")) {
    var el, j;
    if (window.location.href.includes("showparts")) {
      el = document.getElementsByClassName("inline-a");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "OE";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText;
        if (el[i].childElementCount > 0)
          arr[j] = arr[j].replace(el[i].children[0].innerText, "");
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=REAL_OEM" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
    if (window.location.href.includes("part?")) {
      el = document.getElementsByClassName("content");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "OE";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText.split("\n")[0];
        if (el[i].childElementCount > 0)
          arr[j] = arr[j].replace(el[i].children[0].innerText, "");
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=REAL_OEM" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("japancars.ru")) {
    var el, j;
    if (window.location.href.includes("blk_id")) {
      if (
        window.location.href.includes("mazda") ||
        window.location.href.includes("mitsubishi")
      ) {
        el = document.getElementsByClassName("list")[0].children[1];
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "OE";
        j = 1;
        for (var i = 0; i < el.childElementCount; i++) {
          arr[j] = el.children[i].children[2].innerText.split("\n")[0];
          j += 1;
          if (
            !el.children[i].children[2].innerHTML.includes("app.motorro.eu")
          ) {
            el.children[i].children[2].innerHTML +=
              '<a target="_blank" style="color: white;" href="' +
              "https://app.motorro.eu/dashboard/search?value=" +
              el.children[i].children[2].innerText
                .split("\n")[0]
                .replace("/", "")
                .replace(/\s/g, "") +
              "&searchType=" +
              arr[0] +
              "&catalogName=JAPAN_CARS" +
              '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          }
        }
      } else if (window.location.href.includes("toyota")) {
        el = document.getElementsByClassName("list")[1].children[1];
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "OE";
        j = 1;
        for (var i = 0; i < el.childElementCount; i++) {
          arr[j] = el.children[i].children[2].innerText.split("\n")[0];
          j += 1;
          if (
            !el.children[i].children[2].innerHTML.includes("app.motorro.eu")
          ) {
            el.children[i].children[2].innerHTML +=
              '<a target="_blank" style="color: white;" href="' +
              "https://app.motorro.eu/dashboard/search?value=" +
              el.children[i].children[2].innerText
                .split("\n")[0]
                .replace("/", "")
                .replace(/\s/g, "") +
              "&searchType=" +
              arr[0] +
              "&catalogName=JAPAN_CARS" +
              '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          }
        }
      } else if (window.location.href.includes("nissan")) {
        el = document.getElementsByClassName("list")[1].children[1];
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "OE";
        j = 1;
        for (var i = 0; i < el.childElementCount; i++) {
          arr[j] = el.children[i].children[2].innerText.split("\n")[0];
          j += 1;
          if (
            !el.children[i].children[2].innerHTML.includes("app.motorro.eu")
          ) {
            el.children[i].children[2].innerHTML +=
              '<a target="_blank" style="color: white;" href="' +
              "https://app.motorro.eu/dashboard/search?value=" +
              el.children[i].children[2].innerText
                .split("\n")[0]
                .replace("/", "")
                .replace(/\s/g, "") +
              "&searchType=" +
              arr[0] +
              "&catalogName=JAPAN_CARS" +
              '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          }
        }
      } else if (window.location.href.includes("kia")) {
        el = document.getElementsByClassName("list")[0].children[1];
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "OE";
        j = 1;
        for (var i = 0; i < el.childElementCount; i++) {
          arr[j] = el.children[i].children[1].innerText;
          j += 1;
          if (
            !el.children[i].children[1].innerHTML.includes("app.motorro.eu")
          ) {
            el.children[i].children[1].innerHTML +=
              '<a target="_blank" style="color: white;" href="' +
              "https://app.motorro.eu/dashboard/search?value=" +
              el.children[i].children[1].innerText
                .replace("/", "")
                .replace(/\s/g, "") +
              "&searchType=" +
              arr[0] +
              "&catalogName=JAPAN_CARS" +
              '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          }
        }
      }
    } else if (
      window.location.href.includes("honda") &&
      window.location.href.includes("blk")
    ) {
      el = document.getElementsByClassName("list")[0].children[1];
      var arr = new Array(el.length > 0 ? el.length : 1);
      arr[0] = "OE";
      j = 1;
      for (var i = 0; i < el.childElementCount; i++) {
        arr[j] = el.children[i].children[2].innerText;
        j += 1;
        if (!el.children[i].children[2].innerHTML.includes("app.motorro.eu")) {
          el.children[i].children[2].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el.children[i].children[2].innerText

              .replace("/", "")
              .replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=JAPAN_CARS" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else if (window.location.href.includes("epc")) {
      if (
        window.location.href.includes("suzuki") ||
        window.location.href.includes("isuzu")
      ) {
        el = document.getElementsByClassName("article");
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "OE";
        j = 1;
        for (var i = 0; i < el.length; i++) {
          var onClick =
            "window.open('https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "','_blank').focus();";

          arr[j] = el[i].innerText;
          j += 1;
          if (!el[i].innerHTML.includes("app.motorro.eu")) {
            el[i].innerHTML +=
              '<a onClick="' +
              onClick +
              '" target="_blank" style="color: white;" href="' +
              "https://app.motorro.eu/dashboard/search?value=" +
              el[i].innerText.replace("/", "").replace(/\s/g, "") +
              "&searchType=" +
              arr[0] +
              "&catalogName=JAPAN_CARS" +
              '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          }
        }
      } else if (window.location.href.includes("hyundai")) {
        el = document.getElementsByClassName("article");
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "OE";
        j = 1;
        for (var i = 0; i < el.length; i++) {
          var onClick =
            "window.open('https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "','_blank').focus();";

          arr[j] = el[i].innerText;
          j += 1;
          if (!el[i].innerHTML.includes("app.motorro.eu")) {
            el[i].innerHTML +=
              '<a onClick="' +
              onClick +
              '" target="_blank" style="color: white;" href="' +
              "https://app.motorro.eu/dashboard/search?value=" +
              el[i].innerText.replace("/", "").replace(/\s/g, "") +
              "&searchType=" +
              arr[0] +
              "&catalogName=JAPAN_CARS" +
              '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          }
        }
      } else if (window.location.href.includes("subaru/#cm")) {
        el = document.getElementsByClassName("over");
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "OE";
        j = 1;
        for (var i = 0; i < el.length; i++) {
          var onClick =
            "window.open('https://app.motorro.eu/dashboard/search?value=" +
            el[i].children[1].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "','_blank').focus();";

          arr[j] = el[i].children[1].innerText;
          j += 1;
          if (!el[i].children[1].innerHTML.includes("app.motorro.eu")) {
            el[i].children[1].innerHTML +=
              '<a onClick="' +
              onClick +
              '" target="_blank" style="color: white;" href="' +
              "https://app.motorro.eu/dashboard/search?value=" +
              el[i].children[1].innerText.replace("/", "").replace(/\s/g, "") +
              "&searchType=" +
              arr[0] +
              "&catalogName=JAPAN_CARS" +
              '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          }
        }
      }
    }
  } else if (window.location.href.includes("zzap.ru")) {
    varel = document.getElementsByClassName("f-sel");
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "OE";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText;
      if (el[i].childElementCount > 0)
        arr[j] = arr[j].replace(el[i].children[0].innerText, "");
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=ZZAP" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("apnext")) {
    var el = document.getElementsByClassName("product-name-code");
    var arr = new Array(el.length > 0 ? el.length : 1);
    arr[0] = "EXTENSION";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText;
      if (el[i].childElementCount > 0)
        arr[j] = arr[j].replace(el[i].children[0].innerText, "");
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=AP_NEXT" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("parts.autoxp.ru")) {
    var el = document.getElementsByClassName("TD3");
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "OE";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      if (i % 2) {
        arr[j] = el[i].innerText;
        if (el[i].childElementCount > 0)
          arr[j] = arr[j].replace(el[i].children[0].innerText, "");
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=AUTO_XP" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("intercars.eu")) {
    el = document.getElementsByClassName(
      "activenumber activenumber--listingcollapsed js-onboarding-cart-product-name js-clk-product-page-trigger tooltip js-lazy-load-tooltip tooltipstered is-inited is-active"
    );

    var ic_code_search = document.getElementsByClassName(
      "productfeaturesinline"
    );

    el_substitutes = document.getElementsByClassName(
      "multitoggle__toggle js-multi-toggle-trigger js-keyboardable-cross-references"
    );

    var arr = new Array(el.length > 0 ? el.length : 1);
    var arr_ic_codes = new Array(
      ic_code_search.length > 0 ? ic_code_search.length : 1
    );

    arr[0] = "EXTENSION";
    j = 1;

    var inter_cars_code = document.getElementsByClassName(
      "datatable__item datatable__item--xsmallhidden"
    );

    if (inter_cars_code[0]) {
      if (!inter_cars_code[0].innerHTML.includes("motorro")) {
        var onClickHandler = function (event) {
          event.preventDefault();
          window
            .open(
              "https://app.motorro.eu/dashboard/search?value=" +
                inter_cars_code[0].innerText
                  .replace("/", "")
                  .replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=INTER_CARS",
              "_blank"
            )
            .focus();
        };

        inter_cars_code[0].addEventListener("click", onClickHandler);

        inter_cars_code[0].innerHTML +=
          '<a id="motorro" style="display: block !important;cursor: pointer; color: white;"><img style="display:block !important;max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }

    Array.from(el).forEach((element) => {
      arr[j] = element.getAttribute("data-id");
      j += 1;
      if (
        !element.parentElement.parentElement.children[1].children[0].innerHTML.includes(
          "app.motorro.eu"
        )
      ) {
        element.parentElement.parentElement.children[1].children[0].innerHTML +=
          '<a target="_blank" style="color: white;display: block !important" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          element.getAttribute("data-id").replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=INTER_CARS" +
          '"><img style="max-width: 25px !important ;display: block !important" src="https://files.motorro.eu/img/icons/iconsquare.png"</a>';
      }
    });

    var g = 0;

    for (var h = 0; h < ic_code_search.length; h++) {
      if (ic_code_search[h]) {
        arr_ic_codes[g] =
          ic_code_search[h].children[
            ic_code_search[h].childElementCount - 1
          ].children[1].innerText;
        g += 1;

        if (
          !ic_code_search[h].children[
            ic_code_search[h].childElementCount - 1
          ].children[2].innerHTML.includes("motorro")
        ) {
          (function (index) {
            var onClickHandler = function (event) {
              event.preventDefault();
              window
                .open(
                  "https://app.motorro.eu/dashboard/search?value=" +
                    ic_code_search[index].children[
                      ic_code_search[index].childElementCount - 1
                    ].children[1].innerText
                      .replace("/", "")
                      .replace(/\s/g, "") +
                    "&searchType=" +
                    arr[0] +
                    "&catalogName=INTER_CARS",
                  "_blank"
                )
                .focus();
            };

            ic_code_search[index].children[
              ic_code_search[index].childElementCount - 1
            ].children[2].addEventListener("click", onClickHandler);

            ic_code_search[index].children[
              ic_code_search[index].childElementCount - 1
            ].children[2].innerHTML +=
              '<a id="motorro" style="display: block !important;cursor: pointer; color: white;"><img style="display:block !important;max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          })(h);
        }
      }
    }
  } else if (window.location.href.includes("zzap.acat.online")) {
    var el = document.getElementsByClassName(
      "acat-number_data-number body1 d-flex align-items-center"
    );
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "OE";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText;
      if (el[i].childElementCount > 0)
        arr[j] = arr[j].replace(el[i].children[0].innerText, "");
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=ZZAP_ACAT" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("epcdata.ru")) {
    var el = document.getElementsByClassName("parts-in-stock-widget_part-oem");
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "OE";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText;
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=EPC_DATA" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("store.hartphp.com.pl")) {
    if (
      window.location.href.includes("SearchPart/Search") ||
      window.location.href.includes("CzesciUniwersalne") ||
      window.location.href.includes("KatalogMotoUniwersalne") ||
      window.location.href.includes("KatalogAciMoto") ||
      window.location.href.includes("KatalogAci") ||
      window.location.href.includes("OUTLET")
    ) {
      el = document.getElementsByClassName("product-card__features-list");
      var arr = new Array(el.length > 0 ? el.length : 1);
      el_substitutes = document.getElementsByClassName("text-center towkod");
      arr[0] = "EXTENSION";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText.split(":")[1];
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].children[0].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].children[0].innerText
              .split(":")[1]
              .replace("/", "")
              .replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=HART_STORE" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
      for (var i = 0; i < el_substitutes.length; i++) {
        arr[j] = el_substitutes[i].innerText;
        j += 1;

        if (!el_substitutes[i].innerHTML.includes("app.motorro.eu")) {
          el_substitutes[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el_substitutes[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=HART_STORE" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else if (window.location.href.includes("TecDocCatalog")) {
      var el = document.getElementsByClassName("zamiennik-row");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].children[2].innerText;
        j += 1;
        if (!el[i].children[2].innerHTML.includes("motorro")) {
          (function (index) {
            var onClickHandler = function (event) {
              event.preventDefault();
              event.stopPropagation();
              window
                .open(
                  "https://app.motorro.eu/dashboard/search?value=" +
                    el[index].children[2].innerText
                      .replace("/", "")
                      .replace(/\s/g, "") +
                    "&searchType=" +
                    arr[0] +
                    "&catalogName=HART_STORE"
                )
                .focus();
            };

            el[index].children[2].innerHTML +=
              '<a id="motorro" target="_blank" style="color: white;"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';

            el[index].children[2].addEventListener("click", onClickHandler);
          })(i);
        }
      }
    } else if (window.location.href.includes("Article")) {
      el = document.getElementsByClassName("product__meta");
      el_substitutes = document.getElementsByClassName(
        "zamiennik-row HartPaginationRow"
      );
      var arr = new Array(
        el_substitutes.length > 0 ? el_substitutes.length + 1 : 1
      );

      arr[0] = "EXTENSION";
      arr[1] = el[1].children[0].children[0].innerText;

      if (!el[1].children[0].children[0].innerHTML.includes("app.motorro.eu")) {
        el[1].children[0].children[0].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[1].children[0].children[0].innerText
            .replace("/", "")
            .replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=HART_STORE" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
      j = 2;
      for (var i = 0; i < el_substitutes.length; i++) {
        arr[j] = el_substitutes[i].children[0].innerText;
        j += 1;

        if (
          !el_substitutes[i].children[0].innerHTML.includes("app.motorro.eu")
        ) {
          el_substitutes[i].children[0].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el_substitutes[i].children[0].innerText
              .replace("/", "")
              .replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=HART_STORE" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else if (window.location.href.includes("WyszukiwarkaVin")) {
      if (window.location.href.includes("TreeParts")) {
        el = document.getElementsByClassName(
          "table table-borderles table-striped table-hover table-sm text-center table-xs w-100"
        );
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "EXTENSION";
        j = 1;

        for (var i = 0; i < el.length; i++) {
          for (var k = 0; k < el[i].children[1].childElementCount; k++) {
            arr[j] = el[i].children[1].children[k].children[1].innerText;
            j += 1;
            if (
              !el[i].children[1].children[k].innerHTML.includes(
                "app.motorro.eu"
              )
            ) {
              el[i].children[1].children[k].children[1].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].children[1].children[k].children[1].innerText
                  .replace("/", "")
                  .replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=HART_STORE" +
                '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"</a>';
            }
          }
        }
      } else if (window.location.href.includes("TreeImageParts")) {
        el = document.getElementsByClassName(
          "table table-borderles table-striped table-hover table-sm text-center table-xs w-100"
        );
        var arr = new Array(el.length > 0 ? el.length : 1);
        arr[0] = "EXTENSION";
        j = 1;

        for (var i = 0; i < el.length; i++) {
          for (var k = 0; k < el[i].children[1].childElementCount; k++) {
            arr[j] = el[i].children[1].children[k].children[2].innerText;
            j += 1;
            if (
              !el[i].children[1].children[k].innerHTML.includes(
                "app.motorro.eu"
              )
            ) {
              el[i].children[1].children[k].children[2].innerHTML +=
                '<a target="_blank" style="color: white;" href="' +
                "https://app.motorro.eu/dashboard/search?value=" +
                el[i].children[1].children[k].children[2].innerText
                  .replace("/", "")
                  .replace(/\s/g, "") +
                "&searchType=" +
                arr[0] +
                "&catalogName=HART_STORE" +
                '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"</a>';
            }
          }
        }
      }
    }
  } else if (window.location.href.includes("auto-france")) {
    if (window.location.href.includes("wyszukiwarka-vin")) {
      var el = document.getElementsByClassName(
        "col-md-3 col-12 d-flex align-items-center"
      );
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=AUTO_FRANCE" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else {
      var el = document.getElementsByClassName("col c-product__display-code");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].children[0].innerText;
        j += 1;
        if (!el[i].children[0].innerHTML.includes("app.motorro.eu")) {
          el[i].children[0].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].children[0].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=AUTO_FRANCE" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  }
  //https://sklep.motores.pl/partscatalogue/default.aspx
  else if (window.location.href.includes("sklep.motores")) {
    var el = document.getElementsByClassName("col-12 col-sm");
    var el_sub = document.getElementsByClassName(
      "c-product__display-code d-flex u-text--gray"
    );
    var arr = new Array(el.length > 0 ? el.length : 1);
    var arr_sub = new Array(el_sub.length > 0 ? el_sub.length : 1);

    arr_sub[0] = "EXTENSION";
    var h = 1;
    for (var k = 0; k < el_sub.length; k++) {
      arr_sub[h] = el_sub[k].children[1].innerText.split(":")[1];
      h += 1;
      if (!el_sub[k].children[1].innerHTML.includes("motorro")) {
        (function (index) {
          var onClickHandler = function (event) {
            event.stopPropagation();
            window
              .open(
                "https://app.motorro.eu/dashboard/search?value=" +
                  el_sub[index].children[1].innerText
                    .split(":")[1]
                    .replace("/", "")
                    .replace(/\s/g, "") +
                  "&searchType=" +
                  arr_sub[0] +
                  "&catalogName=MOTOROL_KATALOG",
                "_blank"
              )
              .focus();
          };

          el_sub[index].children[1].innerHTML +=
            '<a id="motorro" target="_blank" style="color: white;cursor:pointer;"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
          el_sub[index].children[1].addEventListener("click", onClickHandler);
        })(k);
      }
    }
    arr[0] = "EXTENSION";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      if (i % 2 == 0) {
        arr[j] = el[i].children[1].children[1].innerText;
        j += 1;
        if (
          !el[i].children[1].children[1].innerHTML.includes("app.motorro.eu")
        ) {
          el[i].children[1].children[1].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].children[1].children[1].innerText
              .replace("/", "")
              .replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=MOTORES" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("lsd.intervito")) {
    var el = document.getElementsByClassName("IVArtCellRefHead");
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "EXTENSION";
    var j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText;
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=INTERVITO" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (
    window.location.href.includes("auto-zatoka.webterminal.com.pl") ||
    window.location.href.includes("ipterminal")
  ) {
    var el, j;
    var activeCatalog;

    if (window.location.href.includes("ipterminal")) {
      activeCatalog = "INTER_PARTS";
    } else {
      activeCatalog = "AUTO_ZATOKA";
    }

    if (
      window.location.href.includes("tecdoc") ||
      window.location.href.includes("productsearch")
    ) {
      el = document.getElementsByClassName("marked name-labels");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].childNodes[0].data;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].childNodes[0].data.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=" +
            activeCatalog +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else if (window.location.href.includes("product")) {
      el = document.getElementsByClassName("marked name-labels");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      j = 2;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].childNodes[0].data;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].childNodes[0].data.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=" +
            activeCatalog +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("motogama.webterminal.com.pl")) {
    var el, j;
    el = document.getElementsByClassName("marked name-labels");
    var arr = new Array(el.length > 0 ? el.length : 1);

    arr[0] = "EXTENSION";
    j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].childNodes[0].data;
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].childNodes[0].data.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=MOTOGAMA" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("rollsc.pl")) {
    var el, j;
    if (window.location.href.includes("shop"))
      el = document.getElementsByClassName(
        "single-post-title product_title entry-title"
      );
    else el = document.getElementsByClassName("title");

    var arr = new Array(el.length > 0 ? el.length : 1);
    arr[0] = "EXTENSION";
    j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText;
      if (el[i].childElementCount > 0)
        arr[j] = arr[j].replace(el[i].children[0].innerText, "");
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=ROLL_SC" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("katalog.tedgum.pl")) {
    var el, j;
    el = document.getElementsByClassName("article_index_link");
    var arr = new Array(el.length > 0 ? el.length : 1);
    arr[0] = "EXTENSION";
    j = 1;
    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText.split(" ")[0];
      if (el[i].childElementCount > 0)
        arr[j] = arr[j].replace(el[i].children[0].innerText, "");
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText.split(" ")[0].replace("/", "").replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=TEDGUM" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
    if (document.getElementsByClassName("article_index_link").length === 0) {
      el = document.getElementsByClassName("diagram-card-section2");
      var arr = new Array(el.length > 0 ? el.length : 1);
      arr[0] = "EXTENSION";
      j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] =
          el[i].children[0].innerText.split("\n")[
            el[i].children[0].innerText.split("\n").length - 1
          ];
        j += 1;
        if (!el[i].children[0].innerHTML.includes("app.motorro.eu")) {
          el[i].children[0].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].children[0].innerText
              .split("\n")
              [el[i].children[0].innerText.split("\n").length - 1].replace(
                "/",
                ""
              )
              .replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=TEDGUM" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (
    window.location.href.includes("webshop.auto-gh.pl") ||
    window.location.href.includes("gh-parts.eu")
  ) {
    if (
      window.location.href.includes("searcharticleswithstate") ||
      window.location.href.includes("clientsearchresult") ||
      window.location.href.includes("wyniki-wyszukiwania")
    ) {
      var el = document.getElementsByClassName("code");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("motorro")) {
          (function (index) {
            var onClickHandler = function (event) {
              event.stopPropagation();
              event.preventDefault();
              window
                .open(
                  "https://app.motorro.eu/dashboard/search?value=" +
                    el[index].innerText.replace("/", "").replace(/\s/g, "") +
                    "&searchType=" +
                    arr[0] +
                    "&catalogName=AUTO_GH"
                )
                .focus();
            };

            el[index].innerHTML +=
              '<a id="motorro" target="_blank" style="color: white;"><img style="max-width: 25px;margin-left:10px" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';

            el[index].addEventListener("click", onClickHandler);
          })(i);
        }
      }
    } else if (
      window.location.href.includes("custompage") ||
      window.location.href.includes("katalog-produktow-koszyk")
    ) {
      var el = document.getElementsByClassName("mt-1 d-block");
      var arr = new Array(el.length > 0 ? el.length : 1);
      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i];
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=AUTO_GH" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else {
      var el = document.querySelectorAll('[itemprop="productID"]');
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i];
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=AUTO_GH" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("autoeuro.webterminal.com.pl")) {
    var el, i, j;

    el = document.getElementsByClassName("marked name-labels");
    var arr = new Array(el.length > 0 ? el.length : 1);
    arr[0] = "EXTENSION";
    j = 1;

    for (var i = 0; i < el.length; i++) {
      arr[j] = el[i].innerText
        .replace("PROMOCJA", "")
        .replace("WYPRZEDAŻ", "")
        .replace("BMZ", "");
      j += 1;
      if (!el[i].innerHTML.includes("app.motorro.eu")) {
        el[i].innerHTML +=
          '<a target="_blank" style="color: white;" href="' +
          "https://app.motorro.eu/dashboard/search?value=" +
          el[i].innerText
            .replace("PROMOCJA", "")
            .replace("WYPRZEDAŻ", "")
            .replace("BMZ", "")
            .replace("/", "")
            .replace(/\s/g, "") +
          "&searchType=" +
          arr[0] +
          "&catalogName=AUTO_EURO" +
          '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
      }
    }
  } else if (window.location.href.includes("baselinker")) {
    if (window.location.href.includes("order:")) {
      var el = document.querySelectorAll("[data-tid=saleItems]");
      var arr = new Array(el.length > 0 ? el.length : 1);
      var skuPattern = /\[SKU (.*?)\]/;

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = skuPattern.exec(el[i].children[2].innerText)[1];
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].children[2].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            skuPattern.exec(el[i].children[2].innerText)[1] +
            "&searchType=" +
            arr[0] +
            "&catalogName=BASELINKER" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else if (window.location.href.includes("inventory_products")) {
      var el = document.getElementsByClassName("adt-info");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        if (el[i].childElementCount > 2) arr[j] = el[i].children[4].innerText;

        j += 1;
        if (
          !el[i].innerHTML.includes("app.motorro.eu") &&
          el[i].childElementCount > 2
        ) {
          el[i].children[4].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].children[4].innerText +
            "&searchType=" +
            arr[0] +
            "&catalogName=BASELINKER" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("e-partsbmw")) {
    if (window.location.href.includes("level4")) {
      var el, i, j;

      el = document.getElementsByClassName("sf-heading__title h3");
      var arr = new Array(el.length > 0 ? el.length : 1);
      arr[0] = "EXTENSION";
      j = 1;

      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].innerText;
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=BMW_ZDUNEK" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("jadar")) {
    if (window.location.href.includes("oem-embedded")) {
      var el = document.getElementsByClassName("v-list__tile__sub-title");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].children[0].innerText;
        j += 1;
      }
      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].children[0].innerText;

        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white; margin-bottom: -5px; margin-left:5px" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].children[0].innerText.replace("/", "").replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=JADAR" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else {
      var el = document.getElementsByClassName("manufacturer-code");
      var el_for_icon = document.getElementsByClassName("code");
      var arr = new Array(el.length > 0 ? el.length : 1);

      arr[0] = "EXTENSION";
      var j = 1;
      for (var i = 0; i < el.length; i++) {
        arr[
          j
        ] = `${el[i].children[0].innerText} ${el[i].children[1].innerText}`;
        j += 1;
      }
      for (var i = 0; i < el_for_icon.length; i++) {
        arr[
          j
        ] = `${el[i].children[0].innerText} ${el[i].children[1].innerText}`;

        j += 1;
        if (!el_for_icon[i].innerHTML.includes("app.motorro.eu")) {
          el_for_icon[i].innerHTML +=
            '<a target="_blank" style="color: white; margin-bottom: -5px; margin-left:5px" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            `${el[i].children[0].innerText} ${el[i].children[1].innerText}`
              .replace("/", "")
              .replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=JADAR" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  } else if (window.location.href.includes("auto-land")) {
    var el, i, j;

    if (
      window.location.href.includes("search") ||
      window.location.href.includes("tecdoc") ||
      window.location.href.includes("vin")
    ) {
      el = document.getElementsByClassName("marked name-labels");
      var arr = new Array(el.length > 0 ? el.length : 1);
      arr[0] = "EXTENSION";
      j = 1;

      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].childNodes[0].data.toString();
        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].childNodes[0].data
              .toString()
              .replace("/", "")
              .replace(/\s/g, "") +
            "&searchType=" +
            arr[0] +
            "&catalogName=AUTO_LAND" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    } else {
      el = document.getElementsByClassName("reference");
      var arr = new Array(el.length > 0 ? el.length : 1);
      arr[0] = "EXTENSION";
      j = 1;

      for (var i = 0; i < el.length; i++) {
        arr[j] = el[i].childNodes[0].data.toString();

        j += 1;
        if (!el[i].innerHTML.includes("app.motorro.eu")) {
          el[i].innerHTML +=
            '<a target="_blank" style="color: white;" href="' +
            "https://app.motorro.eu/dashboard/search?value=" +
            el[i].childNodes[0].data.toString();
          "&searchType=" +
            arr[0] +
            "&catalogName=AUTO_LAND" +
            '"><img style="max-width: 25px;" src="https://files.motorro.eu/img/icons/iconsquare.png"/></a>';
        }
      }
    }
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
  characterData: true,
  attributeOldValue: true,
  characterDataOldValue: true,
});
