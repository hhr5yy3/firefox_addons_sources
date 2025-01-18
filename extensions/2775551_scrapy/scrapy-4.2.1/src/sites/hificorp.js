let helper = new ScrapyHelper();
var defaultUrl = "https://api.scrapy.co.za/";

const currentDomain = 'hificorp';
const websiteUrl = 'https://www.hificorp.co.za/';
const productSelector = '.product-item';

console.log('HiFi contributing')
setTimeout(function () {
    var products = document.querySelectorAll(productSelector);
    var productsPost = [];
    if (products.length > 0) {
        products.forEach(product => {
            let p = helper.FormatHiFiProduct(product);
            productsPost.push(p);
        });

        if (productsPost.length > 0) {
            helper.SubmitProduct(defaultUrl, currentDomain, productsPost);
        }
    }
}, 2000);