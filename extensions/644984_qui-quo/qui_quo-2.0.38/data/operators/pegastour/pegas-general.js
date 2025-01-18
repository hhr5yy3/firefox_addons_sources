function waitingForElement(selector, callback, firstLoad) {
    const observer = new MutationObserver((mutations, obs) => {
        const targetElement = $1(selector);
        if (targetElement && firstLoad) {
            obs.disconnect();
            callback();
        }
        if ((targetElement && !firstLoad)) {
            targetElement.addEventListener('mousedown', () => {
                waitingForElement('[data-qa="search__guests-input"]', findOccupancy, true);
            });
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

let adultsCount;
let childrenCount;
let childAges = null;

async function findOccupancy () {
    const adultsElem = await waitingFor(findAdultsElemInModal, 100, 5);
    let modalWithPassengers = null;
    if (adultsElem) {
        modalWithPassengers = adultsElem.closest('.modal-content');
    }
    let adultsSelector = null;
    let childrenSelector = null;
    if (modalWithPassengers) {
        adultsSelector = $1('.tourists-selector__adults', modalWithPassengers);
        childrenSelector = $1('.tourists-selector__children-counter', modalWithPassengers);
    }
    let adultsCountCounter = $1('.counter__display', adultsSelector);
    let childrenCountCounter = $1('.counter__display', childrenSelector);
    if (adultsSelector && childrenSelector && adultsCountCounter && childrenCountCounter) {
        adultsCount = parseInt(getText(adultsCountCounter));
        childrenCount = parseInt(getText(childrenCountCounter));
    }
    if (childrenCount !== 0) {
        const childAgesArray = $$('.tourists-selector__child', modalWithPassengers)
            .map(item => $1('input', item).value);
        childAges = childAgesArray.map(item => item.split(' ')[0]).join(', ');
    }else {
        childrenCount = null;
    }
    $1('.modal__close-button', modalWithPassengers).click();
}

function collectOccupancy () {
    return {
        adultsCount,
        childrenCount,
        childAges
    }
}