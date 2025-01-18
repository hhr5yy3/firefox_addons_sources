let helper = new ScrapyHelper();
var defaultUrl = "https://api.scrapy.co.za/";
const currentDomain = 'wootware';

console.log('Wootware contributing')
setTimeout(function () {
    var products = document.querySelectorAll('li.item');
    var productsPost = [];
    if (products.length > 0) {
        products.forEach(product => {
            let p = helper.FormatWootwareProduct(product);
            productsPost.push(p);
        });

        if (productsPost.length > 0) {
            helper.SubmitProduct(defaultUrl, currentDomain, productsPost);
        }
    }
}, 2000);