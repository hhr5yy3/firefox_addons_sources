let helper = new ScrapyHelper();
var defaultUrl = "https://api.scrapy.co.za/";

const currentDomain = 'geewiz';
const websiteUrl = 'https://www.geewiz.co.za/';
const productSelector = 'article.product-miniature';

document.addEventListener("DOMContentLoaded", function (event) {
    console.log('Geewiz contributing')
    setTimeout(function () {
        var products = document.querySelectorAll(productSelector);
        var productsPost = [];
        if (products.length > 0) {
            products.forEach(product => {
                let p = helper.FormatGeewizProduct(product);
                productsPost.push(p);
            });

            if (productsPost.length > 0) {
                helper.SubmitProduct(defaultUrl, currentDomain, productsPost);
            }
        }
    }, 2000);
});