window.OPERATOR_NAME = "raiffeisen";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);
window.HIDE_SBP = localStorage.getItem('hideSBP');


function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const filterSBP = $1('div[data-testid="stmt-scrollerFilter"]>div:last-child');
    if (filterSBP && !$1('.qq')) {
        filterSBP.append(createFilterNode());
    }

    $$('td[data-column="inn"]')
        .filter(td => getText(td) === "7744000302")
        .forEach(td => {

            if (window.HIDE_SBP === '1') {
                td.closest('tr').style.display = 'none';
                return;
            }
            if (!window.HIDE_SBP || window.HIDE_SBP === '0' ) {
                td.closest('tr').style.display = 'table-row';
            }
        });

}

function createFilterNode() {
    const div = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    div.classList.add('qq');

    div.style.cssText = `
        display:  flex;
        position: relative;
        margin-left: 20px;
        padding: 10px;
        background-color: #FEE600;
        font-weight: 500;
        border-radius: 8px;
        font-family: &quot;ALS Hauss&quot;, Helvetica, &quot;Helvetica New&quot;, Arial, ui-sans-serif;
        color: #2b2d33;
     `;

    input.style.cssText = `
          margin-right: 8px;
          cursor: pointer;
     `;
    input.id = 'hideSBP';
    input.type = 'checkbox';
    input.name = 'hideSBP';
    input.checked = window.HIDE_SBP === '1';
    label.for = 'hideSBP';
    label.style.cursor = 'pointer';
    label.textContent = 'Скрыть платежи СБП';
    input.addEventListener('change', ()=> {
          if ( input.checked === true ) {
              localStorage.setItem('hideSBP', '1')
              window.HIDE_SBP = '1'
          } else {
              localStorage.setItem('hideSBP', '0')
              window.HIDE_SBP = '0'
          }
    })
    div.append(input, label);
    return div;


}

function createOption(img) {
    let option = {
        checkinDt: "",
        nights: "",
        hotelName: "",
        hotel_desc: "",
        href: "",
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        price: "",
        currency: "",
        city_from: "",
        operator: "",
        thumbnail: "",
        occupancy: "",
        excursion: "",
    };
    return option;
}

function getHotelRowByImage(img) {
    return null;
}
