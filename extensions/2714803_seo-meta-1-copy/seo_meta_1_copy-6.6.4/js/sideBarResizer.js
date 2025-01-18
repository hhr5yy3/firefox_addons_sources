const resizerService = function(resizer_class) {
  function createResizer(resizingPanel, isSideBarLeft, minWidth, callback) {
    resizerDiv = createElement("div", {class:resizer_class});
    resizerStyle = resizerDiv.style;
    sideBarPanel = resizingPanel;
    previousSibling = sideBarPanel;
    nextSibling = sideBarPanel.nextSibling;
    panelPosition = isSideBarLeft ? "left" : "right";
    minPanelWidth = minWidth;
    callbackFn = callback;
    resizerDiv.addEventListener("mousedown", attachResizeListeners);
    resizerDiv.addEventListener("mouseup", detachResizeListeners);
    return resizerDiv;
  }
  function updatePanelPosition(isLeftPosition) {
    panelWidth = getIntValue(sideBarPanel.style.width);
    panelPosition = isLeftPosition ? "left" : "right";
    if (panelPosition === "left") {
      resizerDiv.style.left = panelWidth - RESIZER_WIDTH + "px";
      resizerDiv.style.right = "initial";
      sideBarPanel.style.paddingLeft = 0;
      sideBarPanel.style.paddingRight = RESIZER_WIDTH + "px";
      sideBarPanel.classList.add(panelPositionClassPrefix + panelPosition);
      sideBarPanel.classList.remove(`${panelPositionClassPrefix}right`);
    } else {
      resizerDiv.style.left = "initial";
      resizerDiv.style.right = panelWidth - RESIZER_WIDTH + "px";
      sideBarPanel.style.paddingLeft = RESIZER_WIDTH + "px";
      sideBarPanel.style.paddingRight = 0;
      sideBarPanel.classList.add(panelPositionClassPrefix + panelPosition);
      sideBarPanel.classList.remove(`${panelPositionClassPrefix}left`);
    }
  }
  function removeResizer() {
    resizerDiv.removeEventListener("mousedown", attachResizeListeners);
    resizerDiv.removeEventListener("mouseup", detachResizeListeners);
    detachResizeListeners();
  }
  function attachResizeListeners(mouseDownEvent) {
    contextWidth = window.innerWidth;
    initialXInResizer = panelPosition === "left" ? mouseDownEvent.pageX - panelWidth : mouseDownEvent.pageX;
    document.addEventListener("mousemove", dragResizer);
    document.addEventListener("mouseup", detachResizeListeners);
    sideBarPanel.addEventListener("mousemove", dragResizer);
    sideBarPanel.addEventListener("mouseup", detachResizeListeners);
  }
  function detachResizeListeners() {
    document.removeEventListener("mousemove", dragResizer);
    document.removeEventListener("mouseup", detachResizeListeners);
    sideBarPanel.removeEventListener("mousemove", dragResizer);
    sideBarPanel.removeEventListener("mouseup", detachResizeListeners);
    panelWidth = getIntValue(sideBarPanel.style.width);
  }
  function dragResizer(dragEvent) {
    dragEvent.preventDefault();
    const updatedPanelWidth = panelPosition === "left" ? dragEvent.pageX - initialXInResizer : panelWidth - dragEvent.pageX + initialXInResizer;
    if (contextWidth - updatedPanelWidth <= minPanelWidth || updatedPanelWidth <= minPanelWidth) {
      return;
    }
    sideBarPanel.style.width = updatedPanelWidth + "px";
    resizerStyle[panelPosition] = updatedPanelWidth - RESIZER_WIDTH + "px";
    resizerStyle[panelPosition === "left" ? "right" : "left"] = "auto";
    callbackFn && callbackFn(updatedPanelWidth, panelPosition);
  }
  function getIntValue(value) {
    return parseInt(value.replace(/\D/g, ""));
  }
  const RESIZER_WIDTH = 10;
  const panelPositionClassPrefix = "position-";
  const {createElement} = Util();
  let sideBarPanel;
  let initialXInResizer;
  let resizerDiv;
  let resizerStyle;
  let minPanelWidth;
  let panelWidth;
  let previousSibling;
  let nextSibling;
  let panelPosition;
  let contextWidth;
  let callbackFn;
  return {createResizer, removeResizer, updatePanelPosition};
};

