let helper = new ScrapyHelper();
var defaultUrl = "https://api.scrapy.co.za/";

const currentDomain = 'diyelectronics';
const websiteUrl = 'https://www.diyelectronics.co.za/';
const productSelector = '.product_list > .ajax_block_product > .product-container';

document.addEventListener("DOMContentLoaded", function (event) {
    console.log('Diyelectronics contributing')
    var products = document.querySelectorAll(productSelector);
    var productsPost = [];
    if (products.length > 0) {
        products.forEach(product => {
            let p = helper.FormatDiyElectronicsProduct(product);
            productsPost.push(p);
        });

        if (productsPost.length > 0) {
            helper.SubmitProduct(defaultUrl, currentDomain, productsPost);
        }
    }
});