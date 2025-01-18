var SelectFiller = (function createSelectFiller() {
    D.func();

    const DATA_ID_ATTR = "data-safeincloud_id";

    function createEvent(type) {
        return new Event(type, {bubbles: true, cancelable: true});
    }

    function fillMonthById(selectId, month) {
        D.func(month);
        const select = document.querySelector(`[${DATA_ID_ATTR}="${selectId}"]`);
        if (select && FindHelper.isSelect(select)) {
            for (var i = 0; i < select.options.length; i++) {
                var option = select.options[i];
                if (option.value == month || option.value == ("0" + month).slice(-2)) {
                    select.selectedIndex = i;
                    select.dispatchEvent(createEvent("change"));
                    return true;
                }
            }
            var index = parseInt(month) - 1;
            select.selectedIndex = (select.options.length - 12) + index;
            select.dispatchEvent(createEvent("change"));
            return true;
        }
        return false;
    }

    function fillYearById(selectId, year) {
        D.func(year);
        const select = document.querySelector(`[${DATA_ID_ATTR}="${selectId}"]`);
        if (select && FindHelper.isSelect(select)) {
            for (var i = 0; i < select.options.length; i++) {
                var option = select.options[i];
                if (option.value == year || option.value == year.slice(-2)) {
                    select.selectedIndex = i;
                    select.dispatchEvent(createEvent("change"));
                    return true;
                }
            }
        }
        return false;
    }

    return {
        fillMonthById: function(selectId, month) {
            return fillMonthById(selectId, month);
        },

        fillYearById: function(selectId, year) {
            return fillYearById(selectId, year);
        }
    };
})();