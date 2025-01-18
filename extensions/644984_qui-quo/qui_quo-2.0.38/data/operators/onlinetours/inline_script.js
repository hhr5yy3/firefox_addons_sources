(function() {
    const root = document.querySelector('#root');
    if(root) {
        root.dataset.qqReactData = getHotelData3(root);
    }
    document.querySelectorAll('section > .grid > div:not(.relative)').forEach(div => {
        const meta = div.querySelector('meta') || document.createElement('meta');
        meta.name = 'hotelData';
        meta.content = getHotelData1(div);
        div.prepend(meta);
    })
    document.querySelectorAll('#search > div:not([class]) > div:not([class]) > div[class]').forEach(div => {
        const meta = div.querySelector('meta') || document.createElement('meta');
        meta.name = 'hotelData';
        meta.content = getHotelData2(div);
        div.prepend(meta);
    })

    const flightSegments = Array.from(document.querySelectorAll('.fixed.left-0.top-0.w-full.h-full div:not([class]) > h2 ~ div'));

    if(flightSegments.length) {
        const data = {};
        flightSegments.forEach((segment, idx) => {
            const name = 'flight' + idx
            data[name] = getFlightData(segment);
        });
        const event = new CustomEvent('QQ_FLIGHT_GETTED', { detail: data });
        window.dispatchEvent(event);
    }

    function getReactProps(el) {
        const reactKey = Object.keys(el).find(key => key.match(/__reactEventHandlers\$|__reactContainer\$|__reactProps\$/));
        if (reactKey) return el[reactKey]
        return null;
    }

    function getHotelData1(el) {
        const props = getReactProps(el);
        
        if (!props) return null;
        
        const [part1, part2, part3, part4] = props.children.map(i => i.props);
        const [part21, part22, part23] = part2.children.map(i => i.props);
        return JSON.stringify(Object.assign({}, part1, part21, part22, part23, part3, part4));
    }

    function getHotelData2(el) {
        const props = getReactProps(el);

        if (!props) return null;

        const res = props?.children?.[0]?.props?.offer

        return res && JSON.stringify(res);
    }

    function getHotelData3(el) {
        const props = getReactProps(el);

        if (!props) return null;

        const res = props?.memoizedState?.element?.props?.state;

        return res && JSON.stringify(res);
    }

    function getFlightData(el) {
        const props = getReactProps(el);

        if (!props) return null;

        let res;

        if(props.children.length === 2) {
            res = props?.children?.[1]?.props?.flight?.flightSegments;
        }else if(props.children.length === 3) {
            res = props?.children?.[1].map(i => i.props.flightSegment);
        }

        return res && res.filter(i => i.type === 'flight');
    }
})()