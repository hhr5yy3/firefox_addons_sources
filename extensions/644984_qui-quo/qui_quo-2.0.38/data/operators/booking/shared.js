function initializeSearchCriteria() {
    const occupancy = getOccupancy()
    return {occupancy};
}

function getSearchButton() {
    return $$('[type="submit"]')
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    const occupancyText = $$('[data-testid="occupancy-config"]').reverse().extractNodesText()[0];
    if ( !occupancyText ) {
        return null;
    }

    const adults = occupancyText.match(/(\d+)\s*взр/);
    const children = occupancyText.match(/(\d+)\s*[детрб]/);
    occupancy.adultsCount = adults ? Number(adults[1]) : null;
    occupancy.childrenCount = children ? Number(children[1]) : null;
    return occupancy;
}

function getDates() {
    try {
        const params = new URLSearchParams(location.search)
        if ( params.get('checkin') ) {
            const dateStart = params.get('checkin').split('-').reverse().join('.');
            const dateEnd = params.get('checkout').split('-').reverse().join('.');
            return [dateStart, dateEnd]
        }

        if ( params.get('all_sr_blocks') ) {
            const allBlocks = Object.fromEntries(params.get('all_sr_blocks').split(';').map(str => str.split('=')))
            const dateStart = allBlocks['checkin'].split('-').reverse().join('.');
            const dateEnd = allBlocks['checkout'].split('-').reverse().join('.');
            return [dateStart, dateEnd]
        }

        if ( params.get('checkin_month') ) {
            const dateStart = `${params.get('checkin_monthday')}.${params.get('checkin_month')}.${params.get('checkin_year')}`;
            const dateEnd = `${params.get('checkout_monthday')}.${params.get('checkout_month')}.${params.get('checkout_year')}`;
            return [dateStart, dateEnd]
        }

        return [getNodeData('.xp__dates__checkin [data-date-format], [data-testid="date-display-field-start"]'),
            getNodeData('.xp__dates__checkout [data-date-format], [data-testid="date-display-field-end"]')].extractNodesText()
            .map(str => dateFromDayAndMonthName(...str.split(/\s+|,/).slice(2)))
    } catch (e) {
        console.log(e);
        throw new QuiQuoError(e.message,'Не выбраны даты, невозможно добавить в подборку.')
    }

}
