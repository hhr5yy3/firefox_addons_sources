let action = {};

action.string = function () {
  let tmp = {};
  tmp[this.id] = this.value;
  chrome.storage.local.set(tmp);
};

action.number = function () {
  let tmp = {};
  tmp[this.id] = Number(this.value);
  chrome.storage.local.set(tmp);
};

action.boolean = function () {
  let tmp = {};
  tmp[this.id] = this.checked;
  chrome.storage.local.set(tmp);
};

action.load = function () {
  const scaling = document.getElementById("scaling");
  const marginTop = document.getElementById("marginTop");
  const marginLeft = document.getElementById("marginLeft");
  const headerLeft = document.getElementById("headerLeft");
  const footerLeft = document.getElementById("footerLeft");
  const paperWidth = document.getElementById("paperWidth");
  const shrinkToFit = document.getElementById("shrinkToFit");
  const footerRight = document.getElementById("footerRight");
  const headerRight = document.getElementById("headerRight");
  const marginRight = document.getElementById("marginRight");
  const orientation = document.getElementById("orientation");
  const paperHeight = document.getElementById("paperHeight");
  const headerCenter = document.getElementById("headerCenter");
  const marginBottom = document.getElementById("marginBottom");
  const footerCenter = document.getElementById("footerCenter");
  const paperSizeUnit = document.getElementById("paperSizeUnit");
  const showBackgroundColors = document.getElementById("showBackgroundColors");
  const showBackgroundImages = document.getElementById("showBackgroundImages");
  /*  */
  footerLeft.addEventListener("change", action.string);
  headerLeft.addEventListener("change", action.string);
  headerRight.addEventListener("change", action.string);
  footerRight.addEventListener("change", action.string);
  footerCenter.addEventListener("change", action.string);
  headerCenter.addEventListener("change", action.string);
  /*  */
  scaling.addEventListener("change", action.number);
  marginTop.addEventListener("change", action.number);
  paperWidth.addEventListener("change", action.number);
  marginLeft.addEventListener("change", action.number);
  marginRight.addEventListener("change", action.number);
  orientation.addEventListener("change", action.number);
  paperHeight.addEventListener("change", action.number);
  marginBottom.addEventListener("change", action.number);
  paperSizeUnit.addEventListener("change", action.number);
  /*  */
  shrinkToFit.addEventListener("change", action.boolean);
  showBackgroundColors.addEventListener("change", action.boolean);
  showBackgroundImages.addEventListener("change", action.boolean);
  /*  */
  chrome.storage.local.get(null, function (storage) {
    let scaling_tmp = ("scaling" in storage) ? storage["scaling"] : 1;
    let marginTop_tmp = ("marginTop" in storage) ? storage["marginTop"] : 0.5;
    let paperWidth_tmp = ("paperWidth" in storage) ? storage["paperWidth"] : 8.5;
    let marginLeft_tmp = ("marginLeft" in storage) ? storage["marginLeft"] : 0.5;
    let headerLeft_tmp = ("headerLeft" in storage) ? storage["headerLeft"] : "&T";
    let orientation_tmp = ("orientation" in storage) ? storage["orientation"] : 0;
    let footerLeft_tmp = ("footerLeft" in storage) ? storage["footerLeft"] : "&PT";
    let paperHeight_tmp = ("paperHeight" in storage) ? storage["paperHeight"] : 11;
    let marginRight_tmp = ("marginRight" in storage) ? storage["marginRight"] : 0.5;
    let headerRight_tmp = ("headerRight" in storage) ? storage["headerRight"] : "&U";
    let footerRight_tmp = ("footerRight" in storage) ? storage["footerRight"] : "&D";
    let shrinkToFit_tmp = ("shrinkToFit" in storage) ? storage["shrinkToFit"] : true;
    let footerCenter_tmp = ("footerCenter" in storage) ? storage["footerCenter"] : '';
    let headerCenter_tmp = ("headerCenter" in storage) ? storage["headerCenter"] : '';
    let marginBottom_tmp = ("marginBottom" in storage) ? storage["marginBottom"] : 0.5;
    let paperSizeUnit_tmp = ("paperSizeUnit" in storage) ? storage["paperSizeUnit"] : 0;
    let showBackgroundColors_tmp = ("showBackgroundColors" in storage) ? storage["showBackgroundColors"] : false;
    let showBackgroundImages_tmp = ("showBackgroundImages" in storage) ? storage["showBackgroundImages"] : false;
    /*  */
    scaling.value = scaling_tmp;
    marginTop.value = marginTop_tmp;
    paperWidth.value = paperWidth_tmp;
    marginLeft.value = marginLeft_tmp;
    headerLeft.value = headerLeft_tmp;
    footerLeft.value = footerLeft_tmp;
    orientation.value = orientation_tmp;
    paperHeight.value = paperHeight_tmp;
    marginRight.value = marginRight_tmp;
    headerRight.value = headerRight_tmp;
    footerRight.value = footerRight_tmp;
    shrinkToFit.checked = shrinkToFit_tmp;
    footerCenter.value = footerCenter_tmp;
    headerCenter.value = headerCenter_tmp;
    marginBottom.value = marginBottom_tmp;
    paperSizeUnit.value = paperSizeUnit_tmp;
    showBackgroundColors.checked = showBackgroundColors_tmp;
    showBackgroundImages.checked = showBackgroundImages_tmp;
  });
  /*  */
  window.removeEventListener("load", action.load, false);
};

window.addEventListener("load", action.load, false);