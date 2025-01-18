
let tHostname = window.location.hostname;
let sHostname = tHostname.split('.');

let domain = 'www.aliexpress.com';

if(sHostname.length == 2) {
    domain = sHostname[0] + '.' + sHostname[1];
} else if(sHostname == 3) {
    domain = sHostname[0] + sHostname[1] + '.' + sHostname[2];
}


const CURRENT_URL_DETAILS = {
    url: window.location.href,
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    domain
}

console.log("Current URL DETAILS ", CURRENT_URL_DETAILS);

const ROW_DELIMITER = ';';
const COLUMN_DELIMITER = '\n';

const TOOLTIP_MESSAGES = {
    'generate-fake-invoice': 'This functionality only works if you want to generate invoice from product list. If you want to generate from orders click "Get orders" and then "Generate Invoice"',
}