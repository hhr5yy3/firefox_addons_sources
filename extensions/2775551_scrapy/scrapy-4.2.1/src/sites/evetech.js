let helper = new ScrapyHelper();
var defaultUrl = "https://api.scrapy.co.za/";

const currentDomain = 'evetech';
const websiteUrl = 'https://www.evetech.co.za/';
const productSelector = '[class*="ComponentCard_Products__Card"]';

window.addEventListener("load", function (event) {
    console.log('Evetech contributing');
    setTimeout(function () {
        var products = document.querySelectorAll(productSelector);
        var productsPost = [];
        if (products.length > 0) {
            products.forEach(product => {
                let p = helper.FormatEvetechProduct(product);
                productsPost.push(p);
            });

            if (productsPost.length > 0) {
                helper.SubmitProduct(defaultUrl, currentDomain, productsPost);
            }
        }
    }, 2000);
});