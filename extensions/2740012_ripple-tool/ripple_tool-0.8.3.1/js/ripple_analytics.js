mixpanel.init("26ca64bde526ee64c0d15e285bd08e45");

// Setting up the user identity
var fetch_body_object = document.getElementsByTagName('body');
var user_id = fetch_body_object[0].getAttribute("data-user-id");
var version = fetch_body_object[0].getAttribute("data-version");
var from_url = fetch_body_object[0].getAttribute("data-from-url");
var search_string = fetch_body_object[0].getAttribute("data-search-string");
var search_digest = fetch_body_object[0].getAttribute("data-search-digest");
mixpanel.identify(user_id);
mixpanel.people.set_once('Extension installation date', new Date());

// When the tool is activated
mixpanel.track(
    "Extension Activated",{
        "ExtensionVersion": version,
        "SearchTermString": search_string,
        "SearchTermDigest": search_digest,
        "FromURL": from_url
    });

function mixpanelData(element) {
    const dataNames = Object.keys(element.dataset);
    return dataNames.reduce((out, name) => {
        const match = name.match(/mixpanel(.*)/);
        if (!match) return out;

        out[match[1]] = element.dataset[name];
        return out;
    }, {});
}

// When any link will clicked
function trackLink(element){
    const evtName = element.attributes["data-mixpanel-name"].value + ' clicked';
    mixpanel.track(evtName, {
        referrer: document.referrer,
        ...mixpanelData(element)
    });
}

// To track the scroll movement
var isScrolling;
function trackScroll(element){
    const evtName = element.attributes["data-mixpanel-name"].value + ' scrolled';
    window.clearTimeout( isScrolling );
    isScrolling = setTimeout(function() {
        mixpanel.track(
            evtName
        );
    }, 100);
}

//Disabled background scrolling
var domain = window.location.hostname;
var domain_elements = domain.split(".");
if (domain_elements.includes("bing") || domain_elements.includes("duckduckgo")){
    document.querySelector("html").style.overflow = "hidden";
}else{
    document.querySelector("body").style.overflow = "hidden";
}
