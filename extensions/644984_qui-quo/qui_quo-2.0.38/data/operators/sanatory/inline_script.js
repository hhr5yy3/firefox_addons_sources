(function() {

    const form = document.querySelector('.sticky-inner-wrapper form');

    if(form) {
        const reactKey = Object.keys(form).find(key => key.startsWith("__reactFiber$"));
        
        if (reactKey) {
            const passengers = form[reactKey].memoizedProps.children.props.children.props.children[2].props.formData.slots;
            const specialization = form[reactKey].memoizedProps.children.props.children.props.children[2].props.hotel.specializations.map(i => i.name);

            const meta = document.head.querySelector('meta') || document.createElement('meta');
            meta.name = 'specialization';
            meta.content = JSON.stringify({ specialization });
            document.head.append(meta);

            const event = new CustomEvent('_QQ_PASSENGER_DATA', { detail: passengers });
            window.dispatchEvent(event);
        }
        
        return null;
    };

    document.querySelectorAll('.ReactVirtualized__Grid__innerScrollContainer > div').forEach(div => {

        if(location.origin === 'https://agency.sanatory.ru') {

            const metaAddress = div.querySelector('meta[name="address"]') || document.createElement('meta');
            metaAddress.name = 'address';
            metaAddress.content = getReactData(div).children.props.hotel.address.location;
            div.prepend(metaAddress);

            const metaSpecialization = div.querySelector('meta[name="specialization"]') || document.createElement('meta');
            metaSpecialization.name = 'specialization';
            metaSpecialization.content = getReactData(div).children.props.hotel.specializations.map(i => i.name).join('::');
            div.prepend(metaSpecialization);
        
        }

        else {

            const { address, meal_options, pricing, specializations, name, star } = getReactData(div).children.props.data;
            const meta = div.querySelector('meta[name="reactData"]') || document.createElement('meta');
            meta.name = 'reactData';
            meta.content = JSON.stringify({ address, meal_options, pricing, specializations, name, star });
            div.prepend(meta);

        }
        
    })

    function getReactData(element) {
        const reactKey = Object.keys(element).find(key => key.startsWith("__reactProps$"));
        
        if (reactKey) {
            return element[reactKey];
        }
        
        return null;
    }

})()