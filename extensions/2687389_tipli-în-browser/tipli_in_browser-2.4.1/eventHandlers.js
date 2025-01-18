
export const TipliEvents = {
  CONTROL_CLICK: 'tipli:controlclick',
  STICKER_CLICK: 'tipli:stickerclick',
};

export function handleStickerClick(item) {
  return event => {
    event.stopImmediatePropagation();
    navigator.clipboard.writeText(event.detail);
    item.classList.remove('sales-item--activated');
    item.classList.add('sales-item--done');
    setTimeout(() => {
      item.classList.add('sales-item--activated');
      item.classList.remove('sales-item--done')
    }, 3000);
    return false;
  };
}

export function dispatchStickerClick(sticker) {
  return event => {
    event.stopImmediatePropagation();
    event.preventDefault();
    sticker.dispatchEvent(new CustomEvent(TipliEvents.STICKER_CLICK, {
      bubbles: true,
      detail: sticker.innerText
    }));
    return false;
  };
}

export function handleConditionsMoreTextClick(item) {
  return event => {
    event.stopImmediatePropagation();
    item.parentNode.classList.add('sales-item__shop-conditions-text--open');
    return false;
  };
}

export function dispatchControlClick(control, doConfirm = () => true) {

  return event => {
    event.stopImmediatePropagation();
    event.preventDefault();

    const { controlType } = control.dataset;
    if (!doConfirm(controlType)) return false;

    document.dispatchEvent(new CustomEvent(TipliEvents.CONTROL_CLICK, {
      bubbles: true,
      detail: { type: controlType }
    }));
    return false;
  }
}
